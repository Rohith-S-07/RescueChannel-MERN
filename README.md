# Rescue Channel

Rescue Channel is a web application developed using the MERN (MongoDB, Express, React, Node.js) stack that allows agencies to register, manage resources, and coordinate rescue operations. Victims can use this platform to report emergencies and track rescue efforts.

## Project Structure

- **Frontend**: Built with React, Bootstrap for UI design, and several other libraries.
- **Backend**: Powered by Node.js with Express, MongoDB for the database, and multiple middlewares for handling sessions, security, and file uploads.

## Features

- **Agency Registration**: Agencies can register and manage resources such as fire extinguishers, ladders, and trucks.
- **SOS Form**: Victims can submit reports in case of an emergency, which will be processed by the relevant agencies.
- **Resource Management**: Agencies can add, edit, and delete resources like equipment, tracking availability and use.
- **Notifications**: Victims and agencies receive updates on rescue operations.
- **Chatroom**: Agencies can collaborate in real-time via group chat.
- **Location Tracking**: Victims' locations are captured and displayed to agencies.

## Technologies Used

### Frontend
- React: ^18.3.1
- Bootstrap: ^5.3.3
- Bootstrap Icons: ^1.11.3
- React Router: ^6.25.1
- Axios: ^1.7.3
- Google Maps API: ^2.19.3
- Three.js: ^0.167.1

### Backend
- Node.js: ^18.x
- Express: ^4.19.2
- MongoDB: ^8.5.2 (via Mongoose ORM)
- JSON Web Tokens (JWT) for authentication
- Multer for file uploads (e.g., licenses)

### Development Tools
- Nodemon for auto-restarting the backend server during development

## Installation

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js: ^18.x
- MongoDB

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/rescuechannel.git
    ```

2. Navigate to the project directory:
    ```bash
    cd rescuechannel
    ```

3. Install dependencies for the frontend:
    ```bash
    cd frontend
    npm install
    ```

4. Install dependencies for the backend:
    ```bash
    cd ../backend
    npm install
    ```

5. Set up environment variables for the backend:
    - Create a `.env` file in the `backend` directory with the following contents:
      ```plaintext
      MONGO_URI=your_mongodb_connection_string
      ```

6. Start the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```

7. Start the backend server:
    ```bash
    cd ../backend
    npm run server
    ```

8. Open your browser and navigate to `http://localhost:3000` to access the application.

## Folder Structure

