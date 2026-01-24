# BentoBuilder Backend API Docs

This document provides the complete API documentation for the BentoBuilder backend (Express + MongoDB + JWT) and matches the portfolio builder data model.

---

## Base URL

* Local: `http://localhost:5000`
* All endpoints are prefixed with: `/api`

---

## Auth

Authentication uses **JWT Bearer tokens**.

```
Authorization: Bearer <token>
```

---

## Content-Type

All JSON requests must include:

```
Content-Type: application/json
```

---

# 1) Health

### `GET /health`

Check server status.

**Response 200**

```json
{ "ok": true }
```

---

# 2) Auth Endpoints

## 2.1 Register

### `POST /api/auth/register`

Creates a new user and auto-creates a default profile.

**Body**

```json
{
  "name": "Ahmad Raza",
  "email": "ahmad@example.com",
  "password": "your_password"
}
```

**Response 201**

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "65f...",
    "name": "Ahmad Raza",
    "email": "ahmad@example.com"
  },
  "handle": "ahmad-raza"
}
```

**Errors**

* `400` missing fields
* `409` email already used

---

## 2.2 Login

### `POST /api/auth/login`

**Body**

```json
{
  "email": "ahmad@example.com",
  "password": "your_password"
}
```

**Response 200**

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "65f...",
    "name": "Ahmad Raza",
    "email": "ahmad@example.com"
  },
  "handle": "ahmad-raza"
}
```

**Errors**

* `400` missing fields
* `401` invalid credentials

---

## 2.3 Current User

### `GET /api/auth/me` ✅ (Auth Required)

**Headers**

```
Authorization: Bearer <token>
```

**Response 200**

```json
{
  "user": {
    "_id": "65f...",
    "name": "Ahmad Raza",
    "email": "ahmad@example.com",
    "createdAt": "2026-01-23T10:00:00.000Z"
  }
}
```

**Errors**

* `401` unauthorized
* `404` user not found

---

# 3) Profile Endpoints

## 3.1 Get My Profile

### `GET /api/profiles/me` ✅ (Auth Required)

**Headers**

```
Authorization: Bearer <token>
```

**Response 200**

```json
{
  "version": 2,
  "handle": "ahmad-raza",
  "profile": {
    "displayName": "Ahmad Raza",
    "headline": "Portfolio",
    "bio": "",
    "location": "",
    "avatar": { "type": "url", "value": "https://..." }
  },
  "theme": {
    "mode": "system",
    "accentColor": "#111827",
    "cardStyle": "solid",
    "surface": { "light": "#ffffff", "dark": "#0b1220" },
    "background": { "light": "#f7f7f7", "dark": "#050913" },
    "fontScale": 1
  },
  "layout": {
    "page": { "maxWidth": 1040, "sectionGap": 18, "contentPaddingX": 20, "contentPaddingY": 28 },
    "navbar": {},
    "hero": {}
  },
  "blocks": [],
  "published": true,
  "createdAt": "2026-01-23T10:00:00.000Z",
  "updatedAt": "2026-01-23T10:00:00.000Z"
}
```

---

## 3.2 Update My Profile (Autosave)

### `PUT /api/profiles/me` ✅ (Auth Required)

**Body (partial update)**

```json
{
  "profile": {
    "displayName": "Ahmad Raza",
    "headline": "Full-stack Engineer"
  },
  "theme": {
    "mode": "dark"
  }
}
```

**Notes**

* Cannot change `owner`, `createdAt`, `updatedAt`
* `handle` is normalized and must be unique

---

## 3.3 Delete My Profile

### `DELETE /api/profiles/me` ✅ (Auth Required)

**Response 200**

```json
{ "ok": true }
```

---

## 3.4 Public Portfolio by Handle

### `GET /api/u/:handle`

Fetch public portfolio data.

---

# Error Format

```json
{ "message": "Something went wrong" }
```

---

# Example Requests (cURL)

## Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ahmad Raza","email":"ahmad@example.com","password":"pass1234"}'
```

## Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmad@example.com","password":"pass1234"}'
```

## Get My Profile

```bash
curl http://localhost:5000/api/profiles/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Update My Profile

```bash
curl -X PUT http://localhost:5000/api/profiles/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"profile":{"headline":"Full-stack Engineer"},"theme":{"mode":"dark"}}'
```

## Public Profile

```bash
curl http://localhost:5000/api/u/ahmad-raza
```

---

# Frontend Usage Pattern

* Load builder: `GET /api/profiles/me`
* Autosave (debounced): `PUT /api/profiles/me`
* Public page: `GET /api/u/:handle`

---

## Optional

* Swagger/OpenAPI 3.0
* Postman Collection JSON
