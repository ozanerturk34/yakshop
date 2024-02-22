# [Yakshop]

This project is built using the Nx monorepo approach, integrating NestJS for the backend API and Next.js for the frontend. Nx provides a smart, extensible build framework to help developers build better, more scalable applications. NestJS is employed for its efficient, server-side architecture, while Next.js offers a powerful platform for building server-rendered React applications.

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- pnpm
- Nx CLI (Install globally with `npm install -g nx` or `yarn global add nx`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ozanerturk34/yakshop
```

2. Install dependencies:

```bash
pnpm i
```

3. Serve the application locally:

#### Backend

```bash
npx nx start:dev yakshop-api
```

NestJS Backend service runs on http://localhost:3001/

#### Frontend

```bash
npx nx dev yakshop-ui
```

To re-initiate the build:

```bash
npx nx affected:build
```

NestJS frontend service runs on http://localhost:3000/

4. Project Structure
   root/
   ├── apps/
   │ ├── [yakshop-api]/ # Main API handler using NestJS
   │ └── [yakshop-ui]/ # Small UI app using NextJS
   ├── libs/
   │ ├── [shared-types]/ # Shared typings for backend & frontend
   │ ├── [xml-herd-builder]/ # Small app to read xml files
   └── ...

5. Installing Postgres DB with Docker on local machine:

- Install docker
- Create docker db container

```bash
docker run --name yak-shop -e POSTGRES_PASSWORD=yakshop123 -d -p 5432:5432 postgres:14.5
```

- Install pgAdmin4
- Connect to db with pgAdmin4
