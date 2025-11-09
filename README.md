# UPA Web App

This is a full-stack web application to display and visualize UPA (Unidade de Pronto Atendimento) locations.

## Project Structure

- `backend/`: Contains the Flask API to serve location data.
- `frontend/`: Contains the React application for the user interface.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm (or yarn)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows: venv\Scripts\activate
    ```
3.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the Flask API:
    ```bash
    gunicorn app:app -b 0.0.0.0:5000
    # Or for development with debug mode:
    # python app.py
    ```
    The API will be available at `http://localhost:5000`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install Node.js dependencies:
    ```bash
    npm install
    ```
3.  Run the React development server:
    ```bash
    npm start
    ```
    The React app will be available at `http://localhost:3000`.

## Deployment

This application is designed to be deployed on platforms like Render.com.

### Render.com Configuration

#### Backend Service

-   **Runtime:** Python 3
-   **Build Command:** `pip install -r requirements.txt`
-   **Start Command:** `gunicorn app:app -b 0.0.0.0:$PORT`
-   **Root Directory:** `backend`

#### Frontend Service

-   **Runtime:** Node.js
-   **Build Command:** `npm install && npm run build`
-   **Start Command:** `serve -s build` (You might need to add `serve` to `package.json` dependencies or install globally)
-   **Root Directory:** `frontend`

## Data

The location data is stored in `backend/data.json`.

## Contributing

Feel free to contribute to this project.
