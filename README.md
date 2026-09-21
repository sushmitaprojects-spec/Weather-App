# ThermalGuard AI

ThermalGuard AI is an early-warning system for extreme heat. It helps citizens understand their personal heat risk and helps government teams monitor wards, vulnerable populations, cooling centres, forecasts, alerts, and Heat Action Plans.

The project has a React dashboard and a live serverless backend deployed on Microsoft Azure.

## Quick access

| Service | Address |
| --- | --- |
| Local dashboard | [http://localhost:5173](http://localhost:5173) |
| Live API health check | [https://fn-thermalguard-617db5.azurewebsites.net/api/health](https://fn-thermalguard-617db5.azurewebsites.net/api/health) |
| Azure resource group | [Open `rg-thermalguard-dev` in Azure Portal](https://portal.azure.com/#@/resource/subscriptions/617db570-27f6-43a2-8d98-7b067bc2336b/resourceGroups/rg-thermalguard-dev/overview) |

If the local dashboard is not running, follow [Start the dashboard](#start-the-dashboard).

## What the application does

### Citizen view

Citizens can:

1. Select their ward.
2. See live temperature, humidity, wind, solar radiation, AQI, and UV conditions.
3. Enter their age group, occupation, physical activity, environment, and health conditions.
4. Receive a personalized heat-risk score.
5. View UTCI and WBGT thermal-stress values.
6. Receive safety guidance.
7. Create an SMS, WhatsApp, or IVR alert request.

### Government view

Government teams can:

1. Compare heat risk across wards.
2. View elderly residents, outdoor workers, children, and unhoused populations at risk.
3. Inspect cooling centres and their capacity.
4. Review a live five-day thermal forecast.
5. View recommended Heat Action Plan actions.
6. Execute a Heat Action Plan and create an audit record.

## How it works

```text
Citizen or government user
            │
            ▼
React dashboard in the browser
            │
            ▼
Azure Functions API
     ┌──────┼───────────────┐
     ▼      ▼               ▼
Open-Meteo  Risk engine     Cosmos DB
weather     UTCI/WBGT       wards and audit records
and AQI     calculation
            │
            ▼
Azure Communication Services
SMS delivery when a sender number is configured
```

The main request flow is:

1. The browser requests ward information from the Azure Functions API.
2. The backend requests current weather and AQI data from Open-Meteo.
3. The backend calculates UTCI, WBGT, forecast risk, and personalized risk.
4. Ward details, alert requests, and Heat Action Plan executions are stored in Cosmos DB.
5. Application Insights records API health, failures, and performance.
6. Azure Communication Services sends SMS messages when an approved sender number is configured.

If the live weather provider is temporarily unavailable, the API returns bundled fallback data so the dashboard remains usable.

## Start the dashboard

### Requirements

- Node.js 20 or newer
- npm
- Internet access for the live Azure API

### Steps

Open PowerShell in the project folder:

```powershell
cd "D:\weather app\weather app"
npm install
npm run dev
```

Wait until Vite prints an address similar to:

```text
Local: http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in a browser.

The frontend reads the live API address from `.env`:

```text
VITE_API_BASE_URL=https://fn-thermalguard-617db5.azurewebsites.net/api
```

## Test the Citizen view

1. Open [http://localhost:5173](http://localhost:5173).
2. Select **Citizen View** in the header.
3. Select a ward from the location menu.
4. Change the personal-risk fields:
   - Age group
   - Occupation
   - Physical exertion
   - Environment
   - Pre-existing health risk
5. Confirm that the score, risk category, UTCI, WBGT, and advice update.
6. Click **Send SMS / WhatsApp Alert**.
7. Select a delivery channel, enter a number, and click **Dispatch Now**.

The request is saved in Cosmos DB. SMS delivery only occurs after an Azure Communication Services sender number is configured. WhatsApp and IVR requests are currently stored for a future approved provider integration.

## Test the Government view

1. Open [http://localhost:5173](http://localhost:5173).
2. Select **Government View** in the header.
3. Select different ward cards on the heatmap.
4. Turn vulnerable-population overlays on and off.
5. Review the ward's population, recommended actions, cooling centres, and forecast.
6. Click **Execute Heat Action Plan (HAP)**.
7. Confirm that the success message appears.

The HAP execution is saved as an auditable Cosmos DB record.

## Test the live API

Open PowerShell and define the API address:

```powershell
$api = "https://fn-thermalguard-617db5.azurewebsites.net/api"
```

### Check API health

```powershell
Invoke-RestMethod "$api/health"
```

Expected result:

```text
status   : ok
service  : thermalguard-api
database : cosmos
```

### List wards

```powershell
Invoke-RestMethod "$api/wards"
```

### Get live weather

```powershell
Invoke-RestMethod "$api/weather/ward-7"
```

Look for `source: Open-Meteo live` and current environmental readings.

### Get the five-day forecast

```powershell
Invoke-RestMethod "$api/forecast/ward-7"
```

### Calculate personalized risk

```powershell
$riskProfile = @{
    tempC = 42.4
    rhPercent = 58
    windMs = 2.1
    solarRadiation = 940
    aqi = 245
    ageGroup = "elderly"
    occupation = "construction"
    activityLevel = "heavy"
    exposure = "outdoor_sun"
    hasComorbidities = $true
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Uri "$api/risk" `
    -ContentType "application/json" `
    -Body $riskProfile
```

This high-exposure example should return `critical` with a score of `100`.

### Create a test alert record

Use a clearly fake number when testing recorded alerts:

```powershell
$alert = @{
    wardId = "ward-7"
    channel = "whatsapp"
    phone = "+91 90000 00000"
    message = "ThermalGuard test alert"
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Uri "$api/alerts" `
    -ContentType "application/json" `
    -Body $alert
```

The response should contain `deliveryStatus: recorded`.

### Execute a test Heat Action Plan

```powershell
Invoke-RestMethod `
    -Method Post `
    -Uri "$api/hap/ward-7" `
    -ContentType "application/json" `
    -Body "{}"
```

### View alert and HAP audit records

```powershell
Invoke-RestMethod "$api/actions"
```

## API reference

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | API and database health |
| `GET` | `/api/wards` | Ward, shelter, and vulnerable-population data |
| `GET` | `/api/weather/{wardId}` | Live weather, AQI, UTCI, and WBGT |
| `GET` | `/api/forecast/{wardId}` | Five-day thermal-risk forecast |
| `POST` | `/api/risk` | Personalized risk calculation |
| `POST` | `/api/alerts` | Send or record an alert request |
| `POST` | `/api/hap/{wardId}` | Execute and record a Heat Action Plan |
| `GET` | `/api/actions` | Recent alert and HAP audit records |

Available ward IDs are `ward-4`, `ward-7`, `ward-9`, and `ward-12`.

## Access the Azure resources

Sign in to [Azure Portal](https://portal.azure.com) with the account that owns **Azure subscription 1**, then open the [`rg-thermalguard-dev` resource group](https://portal.azure.com/#@/resource/subscriptions/617db570-27f6-43a2-8d98-7b067bc2336b/resourceGroups/rg-thermalguard-dev/overview).

| Azure resource | Resource name | What to inspect |
| --- | --- | --- |
| Function App | `fn-thermalguard-617db5` | Functions, configuration, logs, and API health |
| Cosmos DB | `cosmos-thermalguard-617db5` | Data Explorer → `thermalguard` → `records` |
| Application Insights | `fn-thermalguard-617db5` | Failures, requests, performance, and live metrics |
| Communication Services | `acs-thermalguard-617db5` | SMS configuration and sender-number setup |
| Storage account | `stthermalguard617db5` | Function deployment and runtime storage |

You can list the same resources with Azure CLI:

```powershell
az login
az account set --subscription "617db570-27f6-43a2-8d98-7b067bc2336b"
az resource list --resource-group rg-thermalguard-dev --output table
```

View recent Function logs:

```powershell
az monitor app-insights query `
    --app fn-thermalguard-617db5 `
    --resource-group rg-thermalguard-dev `
    --analytics-query "requests | order by timestamp desc | take 20" `
    --output table
```

## Backend development

The deployed backend is in `backend/`. To run it locally, install Azure Functions Core Tools and copy the example configuration:

```powershell
cd "D:\weather app\weather app\backend"
Copy-Item local.settings.example.json local.settings.json
npm install
npm start
```

Do not commit `local.settings.json`; it is ignored because it may contain credentials.

Without Cosmos settings, the backend uses bundled ward data and in-memory action records. To make the frontend use a local backend, temporarily remove `VITE_API_BASE_URL` from `.env` and restart Vite. The Vite proxy will forward `/api` requests to `http://localhost:7071`.

## Validate the project

Run the frontend checks:

```powershell
cd "D:\weather app\weather app"
npm run build
npm run lint
```

Run the backend tests:

```powershell
cd "D:\weather app\weather app\backend"
npm test
npm run lint
```

## Troubleshooting

### The dashboard does not open

Run `npm run dev` from the project root and open the exact URL printed by Vite.

### The dashboard shows bundled values

Check the API health endpoint. If it is healthy, refresh the dashboard. The backend intentionally falls back to bundled values when its weather provider cannot be reached.

### API calls fail from the browser

Confirm `.env` contains the correct API address, restart Vite, and verify that [the health endpoint](https://fn-thermalguard-617db5.azurewebsites.net/api/health) opens directly.

### An alert says `recorded` instead of `sent`

This is expected until an approved ACS phone number is purchased and added to the Function App as `ACS_SMS_FROM`. The Communication Services connection itself is already configured.

### First API call is slow

The Function App uses a consumption plan. A request after a period of inactivity may experience a short cold start.

## Current production limitations

- SMS requires an approved Azure Communication Services sender number.
- WhatsApp and IVR require an approved external provider integration.
- API authentication and role-based access must be enabled before public production use.
- The risk calculations are decision-support estimates and are not a medical diagnosis.
"# Weather-App" 
