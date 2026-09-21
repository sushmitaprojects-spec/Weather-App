import { app } from '@azure/functions';
import { SmsClient } from '@azure/communication-sms';
import { calculateRisk } from '../lib/thermal.js';
import { findWard, listActions, listWards, saveAction, seedWards } from '../lib/store.js';
import { getForecast, getLiveWeather } from '../lib/weather.js';

const json = (body, status = 200) => ({ status, jsonBody: body, headers: { 'Cache-Control': 'no-store' } });
const wrap = handler => async (request, context) => {
  try { return await handler(request, context); }
  catch (error) { context.error(error); return json({ error: error.message || 'Internal server error' }, 500); }
};

app.http('health', { methods: ['GET'], authLevel: 'anonymous', route: 'health', handler: wrap(async () => json({ status: 'ok', service: 'thermalguard-api', timestamp: new Date().toISOString(), database: process.env.COSMOS_ENDPOINT ? 'cosmos' : 'memory' })) });

app.http('wards', { methods: ['GET'], authLevel: 'anonymous', route: 'wards', handler: wrap(async () => json(await listWards())) });

app.http('seed', { methods: ['POST'], authLevel: 'function', route: 'admin/seed', handler: wrap(async () => json({ seeded: (await seedWards()).length }, 201)) });

app.http('weather', { methods: ['GET'], authLevel: 'anonymous', route: 'weather/{wardId}', handler: wrap(async request => {
  const ward = await findWard(request.params.wardId);
  if (!ward) return json({ error: 'Ward not found' }, 404);
  try { return json({ wardId: ward.id, ...(await getLiveWeather(ward)) }); }
  catch (error) { return json({ wardId: ward.id, source: 'fallback', warning: error.message, ...ward }); }
}) });

app.http('forecast', { methods: ['GET'], authLevel: 'anonymous', route: 'forecast/{wardId}', handler: wrap(async request => {
  const ward = await findWard(request.params.wardId);
  return ward ? json(await getForecast(ward)) : json({ error: 'Ward not found' }, 404);
}) });

app.http('risk', { methods: ['POST'], authLevel: 'anonymous', route: 'risk', handler: wrap(async request => {
  const body = await request.json();
  try { return json(calculateRisk(body)); } catch (error) { return json({ error: error.message }, 400); }
}) });

app.http('alerts', { methods: ['POST'], authLevel: 'anonymous', route: 'alerts', handler: wrap(async request => {
  const body = await request.json();
  if (!body.phone || !body.message || !body.wardId) return json({ error: 'phone, message and wardId are required' }, 400);
  let deliveryStatus = 'recorded';
  let providerId = null;
  if (body.channel === 'sms' && process.env.ACS_CONNECTION_STRING && process.env.ACS_SMS_FROM) {
    const result = await new SmsClient(process.env.ACS_CONNECTION_STRING).send({ from: process.env.ACS_SMS_FROM, to: [body.phone.replace(/\s/g, '')], message: body.message });
    deliveryStatus = result[0]?.successful ? 'sent' : 'failed';
    providerId = result[0]?.messageId;
  }
  const record = await saveAction({ type: 'alert', wardId: body.wardId, channel: body.channel || 'sms', recipient: body.phone, message: body.message, deliveryStatus, providerId });
  return json(record, 202);
}) });

app.http('hap', { methods: ['POST'], authLevel: 'anonymous', route: 'hap/{wardId}', handler: wrap(async request => {
  const ward = await findWard(request.params.wardId);
  if (!ward) return json({ error: 'Ward not found' }, 404);
  const record = await saveAction({ type: 'hap', wardId: ward.id, wardName: ward.name, actions: ward.hapTriggers, affectedWorkers: ward.vulnerablePop.outdoorWorkers, executedBy: request.headers.get('x-user-name') || 'dashboard-user' });
  return json(record, 202);
}) });

app.http('actions', { methods: ['GET'], authLevel: 'anonymous', route: 'actions', handler: wrap(async request => json(await listActions(Number(request.query.get('limit') || 50)))) });
