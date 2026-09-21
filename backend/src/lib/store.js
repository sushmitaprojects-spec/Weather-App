import { CosmosClient } from '@azure/cosmos';
import { wards } from '../data/wards.js';

let containerPromise;
const memoryActions = [];

async function getContainer() {
  if (!process.env.COSMOS_ENDPOINT || !process.env.COSMOS_KEY) return null;
  if (!containerPromise) {
    containerPromise = (async () => {
      const client = new CosmosClient({ endpoint: process.env.COSMOS_ENDPOINT, key: process.env.COSMOS_KEY });
      const { database } = await client.databases.createIfNotExists({ id: process.env.COSMOS_DATABASE || 'thermalguard' });
      const { container } = await database.containers.createIfNotExists({
        id: process.env.COSMOS_CONTAINER || 'records', partitionKey: { paths: ['/type'] }
      });
      return container;
    })();
  }
  return containerPromise;
}

export async function seedWards() {
  const container = await getContainer();
  if (!container) return wards;
  await Promise.all(wards.map(ward => container.items.upsert({ ...ward, type: 'ward' })));
  return wards;
}

export async function listWards() {
  const container = await getContainer();
  if (!container) return wards;
  const { resources } = await container.items.query({ query: 'SELECT * FROM c WHERE c.type = @type', parameters: [{ name: '@type', value: 'ward' }] }).fetchAll();
  return resources.length ? resources : seedWards();
}

export async function findWard(id) {
  const all = await listWards();
  return all.find(ward => ward.id === id);
}

export async function saveAction(action) {
  const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'accepted', ...action };
  const container = await getContainer();
  if (container) await container.items.create(record);
  else memoryActions.unshift(record);
  return record;
}

export async function listActions(limit = 50) {
  const container = await getContainer();
  if (!container) return memoryActions.slice(0, limit);
  const { resources } = await container.items.query({
    query: 'SELECT TOP @limit * FROM c WHERE c.type IN ("alert", "hap") ORDER BY c.createdAt DESC',
    parameters: [{ name: '@limit', value: Math.min(100, Math.max(1, limit)) }]
  }).fetchAll();
  return resources;
}
