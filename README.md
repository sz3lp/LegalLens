# LegalLens

LegalLens is a demo application that explains legal PDFs using OpenAI. It features a FastAPI backend and a React + Vite frontend.

## Setup

Install dependencies using the setup script (requires internet access):

```bash
./run/setup.sh
```

Copy `.env.example` to `.env` and supply your OpenAI key.

## Development

### Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to view the app.

## API

### `POST /upload`

Upload a PDF with `multipart/form-data`. The response contains extracted
clauses as a list of dictionaries with `id` and `text` fields:

```json
{
  "clauses": [
    {"id": 1, "text": "Clause text..."}
  ]
}
```

### `POST /explain`

Send a JSON payload with a list of clauses to receive plain-English
explanations. Example request body:

```json
{
  "clauses": [
    {"id": 1, "text": "Clause text..."}
  ]
}
```

The response mirrors the input IDs and includes an `explanation` field:

```json
{
  "clauses": [
    {"id": 1, "original": "Clause text...", "explanation": "..."}
  ]
}
```

## Environment Variables
See `.env.example` for all configuration options including Firebase auth and Stripe.

## Docker
You can run the entire stack with Docker:

```bash
docker-compose up --build
```

The frontend will be available on `http://localhost:5173` and the backend on `http://localhost:8000`.

### CI/CD
GitHub Actions pipeline (`.github/workflows/deploy.yml`) installs dependencies, runs lint checks and deploys to Render/Vercel using repository secrets.

### Logging
Server events such as uploads, explanations, reanalysis and exports are logged daily in JSON format under `logs/`.

## Exporting Data
Use the **Export JSON** button while viewing clauses to download a JSON file containing the text, explanations, tags, summaries, severity, and tone for each clause. An API placeholder exists at `GET /export/{session_id}`.

## Billing
`/billing` endpoints provide mocked Stripe checkout and usage routes. Integrate your Stripe keys when moving to production.
