# Task Management API

This is a REST API for managing tasks. It allows users to create, update, delete, assign and filter tasks by various parameter like assignedTo, status and dueDate. The API is built with Node.js, Express, and MongoDB. A secured authentication system with jsonwebtoken has been implemented for login, registration and to protect the private routes

# [Documentation is Here](https://documenter.getpostman.com/view/13806607/2s93sZ6ZEy)

## Prerequisites

- Node.js (version 12 or higher)
- MongoDB Atlas account or local MongoDB server
- Postman (optional, for API testing)

## Installation

1. Clone the repository:

```shell
git clone <repository-url>
cd task-management-api
```

2. Install the dependencies:

```shell
npm install
```

3. Configuration:

- Create a `.env` file in the root directory.
- Set the following environment variables in the `.env` file:

```
PORT=5000
MONGO_URL=mongodb+srv://ankur:ankur@cluster0.5lt1r.mongodb.net/taskapi?retryWrites=true&w=majority
JWT_SECRET=task123
```

4. Start the API:

```shell
npm start
```

The API will start running on `http://localhost:5000`.

## API Documentation

You can find the API documentation in [this link](https://documenter.getpostman.com/view/13806607/2s93sZ6ZEy)

## Testing the API

You can use Postman or any other REST API client to test the API endpoints. Import the provided Postman collection (`Task Management API.postman_collection.json`) to quickly set up the API requests in Postman.

## Author

# Nahid Karim Ankur

## License

This project is licensed under the [MIT License](LICENSE).

---
