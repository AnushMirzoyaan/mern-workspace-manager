# Server

## Description
This is the backend server for the application, built using Express, TypeScript, and MongoDB. It handles user authentication, workspace management, and provides necessary API endpoints.

## Getting Started

### Prerequisites

- Node.js (>=18.18.0)
- MongoDB
- TypeScript

> **Note**:For Next.js, Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required. Please upgrade your Node.js version for compatibility with Next.js.

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/AnushMirzoyaan/mern-workspace-manager/tree/master/server
    cd <project_directory>
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Set up environment variables
    - Copy the `.env.example` file to create a `.env` file:
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file with the appropriate values. For example:
      ```env
      MONGO_URI=mongodb://127.0.0.1:27017/workspace-manager
      PORT=5000
      JWT_SECRET=mysecretkey
      ```

4. Run the development server
    ```bash
    npm run dev
    ```

### Available Scripts

- `npm run dev`: Starts the server in development mode using `nodemon` and `ts-node`.
- `npm start`: Starts the server in production mode.
