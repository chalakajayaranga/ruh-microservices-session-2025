# Invoicing Web Application

A modern React application for managing invoices, built with Vite, TypeScript, TanStack Query, and Tailwind CSS.

## Features

- **Table View for Invoices**: View all invoices in a clean, organized table format with sortable columns
- **Status Badges**: Color-coded status indicators (SUCCESS/PAID, PENDING, FAILED) for quick visual identification
- **Create Invoice**: Create new invoices with a simple, intuitive form
  - Auto-focused input field for quick data entry
  - Keyboard shortcut (F1) to quickly navigate to create invoice page
- **View Invoice Details**: View detailed information about individual invoices
- **Real-time Updates**: Automatic polling ensures you always see the latest invoice data (updates every 500ms)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Docker Support**: Fully containerized with multi-stage Docker build and nginx for production

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Data fetching and state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **date-fns** - Date formatting

## Prerequisites

### For Local Development

- Node.js 18+ (20+ recommended)
- npm or yarn
- The invoicing-service backend running on `http://localhost:8080`

### For Docker Deployment

- Docker and Docker Compose
- All services will be started together via docker-compose

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

## Build

Build for production:

```bash
npm run build
```

## Docker Deployment

The application can be built and run using Docker:

### Using Docker Compose (Recommended)

From the project root directory:

```bash
docker-compose up --build
```

This will build and start all services including the web application. The web app will be available at `http://localhost:5173`.

### Manual Docker Build

```bash
# Build the image
docker build -t invoicing-web .

# Run the container
docker run -p 5173:80 invoicing-web
```

### Environment Variables

The API base URL can be configured using the `VITE_API_BASE_URL` environment variable:

```bash
# For Docker build
docker build --build-arg VITE_API_BASE_URL=http://localhost:8080 -t invoicing-web .

# For local development, create a .env file:
VITE_API_BASE_URL=http://localhost:8080
```

## Project Structure

```
invoicing-web/
├── src/
│   ├── components/          # React components
│   │   ├── InvoiceList.tsx      # Table view for all invoices
│   │   ├── InvoiceCard.tsx      # Individual invoice card (legacy, used in other contexts)
│   │   ├── InvoiceDetail.tsx    # Single invoice view
│   │   ├── CreateInvoiceForm.tsx # Create invoice form with auto-focus
│   │   └── Layout.tsx           # Main layout with navigation and F1 shortcut
│   ├── hooks/               # Custom React hooks
│   │   └── useInvoices.ts       # TanStack Query hooks
│   ├── services/            # API services
│   │   └── api.ts              # API client with environment variable support
│   ├── types/               # TypeScript types
│   │   └── invoice.ts          # Invoice type definitions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── Dockerfile              # Multi-stage Docker build configuration
├── nginx.conf              # Nginx configuration for production
└── .dockerignore           # Docker ignore file
```

## API Integration

The app connects to the invoicing service API. The base URL can be configured via the `VITE_API_BASE_URL` environment variable (defaults to `http://localhost:8080`).

**API Endpoints:**
- `GET /Invoice` - Fetch all invoices
- `GET /Invoice/{id}` - Fetch single invoice
- `POST /Invoice` - Create new invoice

**Note:** After creating an invoice, the app automatically navigates to the invoices table view.

## Features in Detail

### Rapid Polling

The invoice list automatically refreshes every 500ms to show real-time updates. This is perfect for demonstrating how the microservices work together, as you can see invoice status changes as they happen.

### Date Formatting

All dates are displayed in IST (Indian Standard Time) timezone with the format `yyyy-MM-dd HH:mm:ss`.

### Status Colors

The application displays invoice status with color-coded badges:

- **SUCCESS/PAID** - Green badge (`bg-green-100 text-green-800`)
- **PENDING** - Yellow badge (`bg-yellow-100 text-yellow-800`)
- **FAILED** - Red badge (`bg-red-100 text-red-800`)
- **Other statuses** - Gray badge (default)

### Keyboard Shortcuts

- **F1** - Navigate to Create Invoice page (available from anywhere in the app)

### User Experience Enhancements

- **Auto-focus**: The total amount input field is automatically focused when the Create Invoice page loads
- **Table View**: All invoices are displayed in a clean table format instead of cards for better scalability
- **Clickable Rows**: Click any row in the invoice table to view detailed information

## License

MIT
