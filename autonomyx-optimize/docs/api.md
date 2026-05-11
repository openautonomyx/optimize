# API Documentation

This document describes the current API surface for the Autonomyx Optimize MVP.

Base URL for local development:

```txt
http://localhost:4000
```

## Authentication

Most endpoints require a bearer token returned by `POST /auth/login`.

```http
Authorization: Bearer <token>
```

Protected routes are also tenant-scoped through the authenticated user's tenant context.

## Public endpoints

### `GET /health`

Returns a basic health response.

Example response:

```json
{
  "status": "ok",
  "service": "api"
}
```

### `GET /ready`

Returns readiness status.

Example response:

```json
{
  "ready": true
}
```

### `POST /auth/login`

Authenticates a user and returns a JWT.

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "token": "<jwt>"
}
```

Validation:

- `email` must be a valid email address.
- `password` must be at least 8 characters.

## Protected endpoints

All endpoints below require `Authorization: Bearer <token>`.

### `GET /dashboard/summary`

Returns summary metrics for the current tenant.

Example response shape:

```json
{
  "totalSpend": 0,
  "recommendations": 0,
  "renewalsDue": 0,
  "identifiedSavings": 0,
  "realizedSavings": 0
}
```

### `GET /recommendations`

Returns recommendations for the current tenant, ordered by newest first.

### `POST /recommendations/run`

Runs recommendation rules for the current tenant.

Example response:

```json
{
  "status": "queued"
}
```

### `GET /benchmarks`

Returns benchmark records for the current tenant.

### `GET /tco/scenarios`

Returns TCO scenarios for the current tenant, including scenario components.

### `GET /renewals`

Returns renewals for the current tenant, ordered by due date and including contract/vendor details.

### `POST /imports`

Uploads a CSV import file for the current tenant.

Content type:

```txt
multipart/form-data
```

Fields:

| Field | Required | Description |
| --- | --- | --- |
| `file` | Yes | CSV file to import. |
| `sourceType` | No | Import source type. Defaults to `saas-contracts-csv`. |

Example using `curl`:

```bash
curl -X POST http://localhost:4000/imports \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@contracts.csv" \
  -F "sourceType=saas-contracts-csv"
```

Example response shape:

```json
{
  "job": {
    "id": "..."
  }
}
```

### `GET /workflows`

Returns workflows for the current tenant, including workflow tasks.

## Error handling

The API uses Fastify error responses. Authentication failures return unauthorized responses, validation errors return request validation failures, and missing multipart files return bad request responses.

## Notes

- The API is currently an MVP surface and may change.
- Tenant scoping is derived from the JWT payload.
- CSV import storage is local temporary storage in the MVP.
- Production deployments should use durable object storage and hardened authentication.
