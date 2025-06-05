# Portfolio Contact Server

This is the backend API for the portfolio contact form, deployed on Vercel.

## Current Issue & Solution

### The Problem

The contact form is currently returning a 500 error because the required environment variables are not properly configured on the Vercel deployment.

### Required Environment Variables

To fix the contact form, you need to set up these environment variables in your Vercel dashboard:

1. **SENDGRID_API_KEY**: Your SendGrid API key

   - Go to [SendGrid Console](https://app.sendgrid.com/)
   - Navigate to Settings > API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the API key

2. **TO_EMAIL**: Your email address where contact messages should be sent

   - Example: `krishnamahato021@gmail.com`

3. **FROM_EMAIL**: The email address that will appear as the sender
   - Example: `noreply@yourdomain.com` or `krishnamahato021@gmail.com`

### Setting Up Environment Variables on Vercel

1. Go to your Vercel dashboard
2. Select your project (`portofoli-email-server`)
3. Go to Settings > Environment Variables
4. Add the following variables:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   TO_EMAIL=krishnamahato021@gmail.com
   FROM_EMAIL=krishnamahato021@gmail.com
   ```
5. Save and redeploy the project

### Alternative Solutions Implemented

Even if the server isn't working, the contact form now includes:

1. **Better Error Handling**: Clear error messages for users
2. **Fallback Email Option**: When the server fails, users get a "mailto" link that opens their email client
3. **Improved UX**: The form shows a helpful alternative contact method when the server is down

### Local Development

To run the server locally:

```bash
cd server
npm install
npm run dev
```

Make sure to create a `.env` file in the server directory:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
TO_EMAIL=your_email@gmail.com
FROM_EMAIL=your_email@gmail.com
PORT=3001
```

### API Endpoints

- `POST /api/contact` - Send contact form email
- `GET /api/health` - Health check endpoint

### SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Verify your sender identity (email address)
3. Create an API key with "Mail Send" permissions
4. Add the API key to your environment variables

Once these environment variables are set up correctly, the contact form will work perfectly! 🚀

## Features

- **Express.js API** with TypeScript
- **SendGrid Integration** for email delivery
- **Rate Limiting** with varying limits for different endpoints
- **Environment Variables** for secure configuration
- **Form Validation** using express-validator
- **CORS Support** for cross-origin requests

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=3001
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sender_email
TO_EMAIL=email_to_receive_contact_messages
```

3. Get a SendGrid API key:
   - Sign up at [SendGrid](https://sendgrid.com/)
   - Create an API key with email sending permissions
   - Verify a sender identity for your FROM_EMAIL

## Development

Start the development server with hot reload:

```bash
npm run dev
```

## Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

### POST /api/contact

Sends an email with the contact form data.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch!",
  "subject": "Contact Inquiry" // Optional
}
```

**Success Response**: `200 OK`

```json
{
  "message": "Email sent successfully"
}
```

**Error Response**: `400 Bad Request`

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- General API limit: 100 requests per 15 minutes per IP
- Contact form submissions: 5 requests per hour per IP
