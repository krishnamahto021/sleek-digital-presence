# Contact Form API Server

A simple Express server built with TypeScript that handles contact form submissions and sends emails using SendGrid.

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
