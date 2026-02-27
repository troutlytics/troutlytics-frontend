# Troutlytics Frontend

Public site: [troutlytics.com](https://troutlytics.com)  
Backend repository: [troutlytics-backend](https://github.com/troutlytics/troutlytics-backend)

Troutlytics Frontend is a Next.js app that turns Washington State trout stocking records into an interactive product for anglers, hatchery teams, and fisheries stakeholders.

## Project Purpose

This README is written for contributors and maintainers.

### Problem

- WDFW trout plant records are public, but raw reports are hard to filter and compare quickly.
- It is difficult to understand statewide stocking patterns (time, species, hatchery, location) from spreadsheets alone.

### Solution

- Centralized, filterable UI for recent and historical stocking activity.
- Interactive analytics (time series, composition, distribution, rankings).
- Geospatial map experience with clustered markers and route links.
- Hatchery-level profiles that aggregate long-range production patterns.

## Routes + Features

- `/` Home/marketing landing page
- `/dashboard` Date-range analytics workspace
- `/map` Interactive statewide stocking map
- `/hatcheries` Hatchery explorer with all-time insights
- `/about` Mission and context
- `/contact` Maintainer contact

### Dashboard modules

- Total stocked over time
- Cumulative stocking progress
- Top species trendlines
- Species composition pie
- Top waters bar chart
- Release-size histogram
- Average fish weight trend
- Sortable release table

### Map experience

- Leaflet + marker clustering + fullscreen support
- Popups grouped by coordinate with release details
- “Get Directions” outbound links per water body

### Hatchery explorer

- Search/filter hatchery names
- All-time aggregate totals by hatchery
- Species and top-water breakdowns
- First/most recent stocking dates + recent events table

## Architecture Overview

- Framework: Next.js (Pages Router), React 19, TypeScript
- Styling: Tailwind CSS 4 + custom global theme styles
- Data layer: SWR + context providers
- Charts: Chart.js via `react-chartjs-2`
- Map: Leaflet + `leaflet.markercluster` + `leaflet-fullscreen`

### Data flow

1. `ApiDataProvider` owns the active date range state.
2. `DateRangePicker` updates that range.
3. `useApiData` fetches filtered API resources via SWR.
4. Dashboard and map components consume shared context data.
5. Hatchery page uses `HatcheryDataProvider` for all-time aggregation logic.

## Backend API Usage

The frontend reads from the Troutlytics backend API.

Current endpoints used:

- `/stocked_lakes_data` (date-range filtered)
- `/hatchery_totals` (date-range filtered)
- `/total_stocked_by_date_data` (date-range filtered)
- `/stocked_lakes_data_all_time`
- `/hatchery_names`
- `/date_data_updated`
- `/derby_lakes_data` (fetched but not currently surfaced in UI)

Environment-controlled API base:

- `NEXT_PUBLIC_ENVIRONMENT=dev` -> `http://localhost:8080`
- any other value -> `https://xtczssso08.execute-api.us-west-2.amazonaws.com`

## Local Development

### Prerequisites

- Node.js (18+ recommended)
- npm
- Running Troutlytics backend service (local or remote)

### Setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Configure environment in `.env.local`.

   ```bash
   NEXT_PUBLIC_ENVIRONMENT="dev"
   ```

3. Start the frontend.

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_ENVIRONMENT`
  - `dev` uses local backend (`http://localhost:8080`)
  - anything else uses production API Gateway endpoint
- `NEXT_PUBLIC_HATCHERY_DATA_START` (optional)
  - Used by hatchery analytics context
  - Defaults to `2010-01-01` if not provided

## Available Scripts

- `npm run dev` Start local dev server (Turbopack)
- `npm run build` Build production bundle
- `npm run start` Start production server
- `npm run lint` Run Next.js lint checks
- `npm test` Run Jest tests

## Testing

- Jest + Testing Library are configured for component tests.
- Chart rendering is mocked in tests to avoid JSDOM canvas limitations.
- Current suite can be run with:

  ```bash
  npm test
  ```

## Deployment

### Current production setup

- Frontend host: AWS Amplify (serving `troutlytics.com`)
- Backend API: AWS API Gateway endpoint consumed by this frontend
- Domain routing: `troutlytics.com` points at Amplify-hosted frontend

### Contributor deployment notes

- This repo does not include infrastructure-as-code for Amplify configuration.
- Amplify environment variables must include `NEXT_PUBLIC_ENVIRONMENT` set to a non-`dev` value (commonly `prod`).
- If new required env vars are added in code, add them to Amplify before shipping.
- Validate production build locally before release:

  ```bash
  npm run build
  npm run start
  ```

### Release checklist

1. Run `npm run lint`
2. Run `npm test`
3. Run `npm run build`
4. Confirm API reads production endpoint when `NEXT_PUBLIC_ENVIRONMENT` is not `dev`
5. Merge/deploy through the Amplify-connected branch workflow

## Data Source

- Washington Department of Fish and Wildlife trout plant reports:  
  [https://wdfw.wa.gov/fishing/reports/stocking/trout-plants](https://wdfw.wa.gov/fishing/reports/stocking/trout-plants)
