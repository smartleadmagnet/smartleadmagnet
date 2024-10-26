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

| Variable Name | Description | Example Value |
|---|---|---|
| `PRISMA_DATABASE_URL` | MongoDB connection URL | `mongodb://root:prisma@localhost:27017/prisma-mongo?authSource=admin` |
| `LLM_TYPE` | Type of Large Language Model (LLM) used | `groq` |
| `LLM_MODEL` | Model of the LLM | `llama-3.2-90b-text-preview` |
| `LLM_API_KEY` | API key for accessing the LLM | `your_llm_api_key` |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID | `your_google_auth_id` |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret | `your_google_auth_secret` |
| `AUTH_SECRET` | Secret used for authentication | `your_auth_secret` |
| `AUTH_URL` | URL for authentication callback | `http://localhost:3000` |
| `MONGO_USERNAME` | MongoDB username | `root` |
| `MONGO_PASSWORD` | MongoDB password | `prisma` |
| `S3_UPLOAD_KEY` | AWS S3 Upload Key | `your_s3_upload_key` |
| `S3_UPLOAD_SECRET` | AWS S3 Upload Secret | `your_s3_upload_secret` |
| `S3_UPLOAD_BUCKET` | AWS S3 Upload Bucket | `your_s3_upload_bucket` |
| `S3_UPLOAD_REGION` | AWS S3 Upload Region | `your_s3_upload_region` |
| `NEXT_PUBLIC_MEDIA_CDN_NAME` | Media CDN URL | `your_media_cdn_url` |
| `BEDROCK_AWS_REGION` | Bedrock AWS Region | `your_bedrock_aws_region` |
| `BEDROCK_AWS_ACCESS_KEY_ID` | Bedrock AWS Access Key ID | `your_bedrock_aws_access_key_id` |
| `BEDROCK_AWS_SECRET_ACCESS_KEY` | Bedrock AWS Secret Access Key | `your_bedrock_aws_secret_access_key` |
| `OPEN_AI_KEY` | OpenAI API Key | `your_open_ai_key` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | `your_upstash_redis_rest_url` |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token | `your_upstash_redis_rest_token` |
| `EMAIL_SERVER_USER` | Email Server User | `your_email_server_user` |
| `EMAIL_SERVER_PASSWORD` | Email Server Password | `your_email_server_password` |
| `EMAIL_SERVER_HOST` | Email Server Host | `your_email_server_host` |
| `EMAIL_SERVER_PORT` | Email Server Port | `your_email_server_port` |
| `EMAIL_FROM` | Email From Address | `your_email_from_address` |
| `EMAIL_SERVER_USER_TO_UNREGISTER_USER` | Email Server User for Unregistering Users | `your_email_server_user_to_unregister_user` |
| `EMAIL_SERVER_PASSWORD_TO_UNREGISTER_USER` | Email Server Password for Unregistering Users | `your_email_server_password_to_unregister_user` |
| `EMAIL_SERVER_HOST_TO_UNREGISTER_USER` | Email Server Host for Unregistering Users | `your_email_server_host_to_unregister_user` |
| `EMAIL_SERVER_PORT_TO_UNREGISTER_USER` | Email Server Port for Unregistering Users | `your_email_server_port_to_unregister_user` |
| `EMAIL_FROM_TO_UNREGISTER_USER` | Email From Address for Unregistering Users | `your_email_from_address_to_unregister_user` |
| `TOGETHER_AI_KEY` | Together AI Key | `your_together_ai_key` |
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API Key | `your_google_gemini_api_key` |
| `STRIPE_SECRET_KEY` | Stripe Secret Key | `your_stripe_secret_key` |
| `STRIPE_ENDPOINT_SECRET` | Stripe Endpoint Secret | `your_stripe_endpoint_secret` |
| `STRIPE_SMARTLEADMAGNET_ONE_TIME` | Stripe SmartLeadMagnet One-Time Price | `your_stripe_smartleadmagnet_one_time_price` |
| `STRIPE_SMARTLEADMAGNET_LIFE_TIME` | Stripe SmartLeadMagnet Life-Time Price | `your_stripe_smartleadmagnet_life_time_price` |
| `STRIPE_SMARTLEADMAGNET_MONTHLY_SUBSCRIPTION` | Stripe SmartLeadMagnet Monthly Subscription Price | `your_stripe_smartleadmagnet_monthly_subscription_price` |
| `STRIPE_SMARTLEADMAGNET_250_CREDIT` | Stripe SmartLeadMagnet 250 Credit Price | `your_stripe_smartleadmagnet_250_credit_price` |
| `STRIPE_SMARTLEADMAGNET_500_CREDIT` | Stripe SmartLeadMagnet 500 Credit Price | `your_stripe_smartleadmagnet_500_credit_price` |
| `STRIPE_SMARTLEADMAGNET_750_CREDIT` | Stripe SmartLeadMagnet 750 Credit Price | `your_stripe_smartleadmagnet_750_credit_price` |
| `STRIPE_SMARTLEADMAGNET_1000_CREDIT` | Stripe SmartLeadMagnet 1000 Credit Price | `your_stripe_smartleadmagnet_1000_credit_price` |
| `HOST_URL` | Host URL | `your_host_url` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `your_site_url` |
| `SENTRY_AUTH_TOKEN` | Sentry Auth Token | `your_sentry_auth_token` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics ID | `your_google_analytics_id` |
| `NEZT_PUBLIC_GOOGLE_TAG_MANGER_ID` | Google Tag Manager ID | `your_google_tag_manager_id` |
| `NEXT_PUBLIC_CRISP_ID` | Crisp ID | `your_crisp_id` |
| `NEXT_PUBLIC_ENABLE_TOAST_SOCIAL_PROOF` | Enable Toast Social Proof | `your_enable_toast_social_proof` |
| `NEXT_PUBLIC_WORDPRESS_BLOG_URL` | WordPress Blog URL | `your_wordpress_blog_url` |


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

## Step 6: Generating Prisma Schema

After setting up MongoDB and environment variables, you need to generate the Prisma schema. Run the following command from the root of the project to generate the Prisma client:

```bash
bun run migrate:prisma:generate
```

## Step 7: Running the Development Server

Run your development server using the following command:

```bash
bun run dev
```

This will start the development server for the **SmartLeadMagnet** project.
