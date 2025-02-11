# Frontend

## Description

This is the frontend of the Workspace Manager application, built using Next.js and React. It connects to the backend API for user authentication, workspace management, and offers a rich user interface for interacting with the workspaces.

## Getting Started

### Prerequisites

- Node.js (>=18.18.0)
- npm or yarn

> **Note**: You are using Node.js version 18.17.0. For Next.js, Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required. Please upgrade your Node.js version for compatibility with Next.js.

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/AnushMirzoyaan/mern-workspace-manager/tree/master/client
   cd <frontend_directory>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

   Or, if you prefer `yarn`:

   ```bash
   yarn install
   ```

3. Set up environment variables

   - Copy the `.env.example` file to create a `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file with the appropriate values. For example:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```

4. Run the development server
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev`: Starts the frontend in development mode.
- `npm run build`: Builds the frontend for production.
- `npm run start`: Starts the production build of the frontend.

### Features

- **Authentication**: Sign up, sign-in, and logout functionality.
- **Workspace Management**: Create, view, edit, and delete workspaces.
- **Slug Suggestions**: Automatically generates slug suggestions based on workspace name.
- **Responsive UI**: Fully responsive design for mobile and desktop views.

