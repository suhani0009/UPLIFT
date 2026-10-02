# UPLIFT – NGO Donor & Donation Management Platform

UPLIFT is a full-stack platform for managing NGO donors, donations, transactions, contributions, communications, and engagement data in one centralized system.

## Features

* Donor management and Donor 360°
* Donation and contribution tracking
* CSV donor data import with duplicate detection
* Payment transaction verification and reconciliation
* Communication and engagement tracking
* Dashboard with donor and donation statistics

## Technology Stack

**Backend**

* Java 21
* Spring Boot
* Spring Data JPA
* REST APIs
* Maven

**Database**

* PostgreSQL

**Frontend**

* React
* Vite
* JavaScript
* Axios

**Tools**

* Git, GitHub, Postman

## Architecture

```text
React Frontend
      ↓
   REST APIs
      ↓
Spring Boot Backend
      ↓
Spring Data JPA
      ↓
 PostgreSQL
```

## Main Modules

```text
Donors
Donations
Transactions
Contributions
Communications
Engagements
Data Import
Dashboard
```

## API Examples

```text
GET  /api/donors
POST /api/donors
GET  /api/donors/{id}/360

GET  /api/donations
POST /api/donations

GET  /api/transactions
PUT  /api/transactions/{id}/status
```

## Running Locally

### Backend

```bash
cd uplift-backend
mvnw.cmd spring-boot:run
```

Runs on `http://localhost:8080`

### Frontend

```bash
cd uplift-frontend
npm install
npm run dev
```

Runs through Vite, normally on `http://localhost:5173`

Database credentials and local testing files are excluded from the repository.

## Project Status

Functional prototype demonstrating centralized NGO donor, donation, transaction, contribution, communication, engagement, and data import management.

