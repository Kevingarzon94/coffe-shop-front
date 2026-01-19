# Coffee Shop Frontend

A modern, responsive React application for a coffee shop, featuring a full customer shopping experience and a comprehensive admin panel for management. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

### Customer Features
- **Product Catalog**: Browse coffee products with search, pagination, and sorting.
- **Product Details**: Detailed view with descriptions, stock status, and add-to-cart functionality.
- **Shopping Cart**: Real-time cart management with persistence.
- **Checkout Flow**: Streamlined checkout process with order summary and validation.

### Admin Panel
- **Dashboard**: Real-time analytics including revenue, sales count, top products, and low stock alerts. Visualization with interactive charts.
- **Product Management**: Full CRUD capabilities for products with image support.
- **Sales Management**: View and filter sales history by date range and view detailed order information.
- **Customer Management**: Customer profiles, purchase history, and spending analytics.

## Tech Stack
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: 
  - `Zustand` (Global client state like Cart)
  - `TanStack Query` (React Query) (Server state and caching)
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form
- **UI Components**: Custom components built with Tailwind
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file in the root directory (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:3000/api
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for deployment:

```bash
npm run build
```

Previews the production build:

```bash
npm run preview
```

## Project Structure

The project follows a feature-based architecture:

```
src/
├── features/           # Feature-specific code
│   ├── admin/          # Admin panel features (dashboard, products, etc.)
│   ├── cart/           # Shopping cart functionality
│   ├── catalog/        # Product browsing and searching
│   ├── checkout/       # Checkout process
│   └── home/           # Landing page
├── shared/             # Shared code used across features
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Shared custom hooks
│   ├── types/          # Shared TypeScript interfaces
│   └── utils/          # Utility functions
├── routes/             # App routing configuration
└── assets/             # Static assets
```
