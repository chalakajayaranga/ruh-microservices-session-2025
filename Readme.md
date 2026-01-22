# RUH Microservices Session 2025

This repository contains two microservices (`invoicing-service` and `payment-service`) and a web application (`invoicing-web`). The services communicate with each other using RabbitMQ for message passing.

## Running the Services

### Prerequisites

- Docker (https://www.docker.com/get-started/)
- Docker Compose

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/ChalakaKasthuriArachchi/ruh-microservices-session-2025
   cd RUH-MICROSERVICES-SESSION-2025

2. Build & run the services using Docker Compose
    If you 
    ```
    docker compose up --build -d

3. Access the services:
    - **Invoice Service Home**: http://localhost:8080
    - **Swagger API Documentation**: http://localhost:8080/doc
    - **Invoice Manager Web App**: http://localhost:5173

4. Stop all services
    ```
    docker compose down


## Services

### Invoicing Service

The `invoicing-service` is responsible for managing invoices. It provides endpoints to create and retrieve invoices.

- **Endpoints:**
  - `GET /Invoice`: Retrieve all invoices.
  - `GET /Invoice/{id}`: Retrieve a specific invoice by ID.
  - `POST /Invoice`: Create a new invoice.

- **Technologies:**
  - .NET 8
  - Entity Framework Core (In-Memory Database)
  - RabbitMQ

- **Key Files:**
  - [InvoiceController.cs](invoicing-service/Controllers/InvoiceController.cs)
  - [PaymentRequestService.cs](invoicing-service/Services/PaymentRequestService.cs)
  - [PaymentAckConsumer.cs](invoicing-service/Services/PaymentAckConsumer.cs)
  - [AppDbContext.cs](invoicing-service/Models/AppDbContext.cs)

### Payment Service

The `payment-service` is responsible for processing payments. It listens for payment requests and sends payment acknowledgments.

- **Technologies:**
  - .NET 8
  - RabbitMQ
  - React

- **Key Files:**
  - [PaymentRequestConsumer.cs](payment-service/Services/PaymentRequestConsumer.cs)
  - [PaymentAckService.cs](payment-service/Services/PaymentAckService.cs)

### Invoicing Web Application

The `invoicing-web` is a modern React application that provides a user-friendly interface for managing invoices.

- **Features:**
  - Table view for displaying all invoices with status badges
  - Create new invoices with auto-focused input field
  - View detailed invoice information
  - Real-time updates with automatic polling (every 500ms)
  - Keyboard shortcut (F1) to quickly create invoices
  - Responsive design for desktop and mobile

- **Technologies:**
  - React 19
  - TypeScript
  - Vite
  - TanStack Query
  - Tailwind CSS
  - Nginx (for production Docker deployment)

- **Key Files:**
  - [InvoiceList.tsx](invoicing-web/src/components/InvoiceList.tsx) - Table view component
  - [CreateInvoiceForm.tsx](invoicing-web/src/components/CreateInvoiceForm.tsx) - Invoice creation form
  - [InvoiceDetail.tsx](invoicing-web/src/components/InvoiceDetail.tsx) - Invoice details view
  - [Dockerfile](invoicing-web/Dockerfile) - Docker configuration

## Appendix

### Some importat docker commands which are going to be used in the demostration

- View running docker containers : `docker ps`
- View all docker containers : `docker ps -a`
- View logs of a docker container : `docker logs <container_id/container_name>`
- Follow the last 50 lines of the logs of a docker container : `docker --tail -f 50 -a <container_id/container_name>`
- Stop a docker container : `docker stop <container_id/container_name>`
- Start a docker container : `docker start <container_id/container_name>`
