# SmartLeadMagnet Turbo Repo Project Setup

This project works on **Bun** and requires **Node.js 18 or higher**. Follow the instructions below to set up the environment and run the project.

## Step 1: Prerequisites

Before you start, ensure that you have the following installed:

1. **Bun**  
   Bun is a fast JavaScript runtime. You can install it by following the instructions on the official website:  
   [Bun Installation Guide](https://bun.sh/docs/install)

2. **Node.js 18 or higher**  
   You can download and install Node.js from the official website:  
   [Node.js Downloads](https://nodejs.org/)

3. **Docker**  
   Docker is required to run MongoDB using Docker Compose. You can download and install Docker from the official website:  
   [Docker Downloads](https://www.docker.com/get-started)

4. **MongoDB (via Docker Compose)**  
   The project uses MongoDB, and there is a Docker Compose configuration available to start MongoDB easily.

## Step 2: Setting Up MongoDB Using Docker Compose

To set up MongoDB locally using Docker Compose, follow these steps:

1. Ensure Docker is installed and running on your machine.
2. Start the MongoDB container by running the following command in your terminal:

```bash
docker-compose up -d
```

This will start a MongoDB container with the username `root` and password `prisma`, accessible on port `27017`. The MongoDB instance will be available locally at `mongodb://root:prisma@localhost:27017/prisma-mongo?authSource=admin`.

You can stop the container anytime by running:

```bash
docker-compose down
```

## Step 3: Environment Setup

You need to create and fill the `.env` file in the root of the project with the following environment variables:

| Variable Name         | Description                                        | Example Value                              |
|-----------------------|----------------------------------------------------|--------------------------------------------|
| `DATABASE_URL`         | MongoDB connection URL                            | `mongodb://root:prisma@localhost:27017/prisma-mongo?authSource=admin` |
| `LLM_TYPE`            | Type of Large Language Model (LLM) used            | `groq`                                     |
| `LLM_MODEL`           | Model of the LLM                                   | `llama-3.2-90b-text-preview`               |
| `LLM_API_KEY`         | API key for accessing the LLM                      | `your_llm_api_key`                         |
| `AUTH_GOOGLE_ID`      | Google OAuth Client ID                             | `your_google_auth_id`                      |
| `AUTH_GOOGLE_SECRET`  | Google OAuth Client Secret                         | `your_google_auth_secret`                  |
| `AUTH_SECRET`         | Secret used for authentication                     | `your_auth_secret`                         |
| `AUTH_URL`            | URL for authentication callback                    | `http://localhost:3000`                    |

## Step 4: Project Structure

The **SmartLeadMagnet** project is structured as a monorepo using Turbo Repo. Below is the structure of apps and shared packages:

### Apps and Packages

- **`docs`**: a [Next.js](https://nextjs.org/) app for documentation.
- **`web`**: the main [Next.js](https://nextjs.org/) app.
- **`@smartleadmagnet/ui`**: a shared React component library used by both `web` and `docs`.
- **`@smartleadmagnet/eslint-config`**: shared `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- **`@smartleadmagnet/typescript-config`**: shared TypeScript configuration files used throughout the monorepo.

## Step 5: Installing Dependencies

Once you have the environment variables set up, install the dependencies for the project.

Run the following command in the root of the project:

```bash
bun install
```

## Step 6: Running the Development Server

If you are working with Next.js 15 beta, you may encounter an issue with the `next dev --turbo` command. To avoid this, you can navigate to the `apps/web` directory and run the following command instead:

```bash
cd apps/web
next dev
```

This will start the development server for the **SmartLeadMagnet** project.
