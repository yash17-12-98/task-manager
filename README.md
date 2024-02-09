# Task Manager API

This Node.js project implements a RESTful API for a simple task manager application.

The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks.

The tasks are stored in an in-memory data store (Array)

The project utilizes Node.js, Express.js, and various NPM packages.

## Features

Create Task: Users can create a new task by sending a POST request to the appropriate endpoint with the task details, including title, description, and completion status.

Read Task: Tasks can be retrieved by sending a GET request to the respective endpoint. Users can retrieve all tasks or a specific task by providing its unique identifier.

Update Task: To update a task, users can send a PUT request to the relevant endpoint with the task's unique identifier and the updated details.

Delete Task: Tasks can be deleted by sending a DELETE request to the appropriate endpoint, providing the task's unique identifier.

## Installation

Clone the repository:

```bash
  git clone https://github.com/yash17-12-98/task-manager.git
```

Navigate to the project directory:

```bash
  cd task-manager
```

Install dependencies:

```bash
  npm install
```

## Endpoints

- GET /tasks: Retrieve all tasks.

- GET /tasks/:id: Retrieve a specific task by ID.

- POST /tasks: Create a new task.

- PUT /tasks/:id: Update a task by ID.

- DELETE /tasks/:id: Delete a task by ID.

## Usage

Start the server:

```bash
  node app.js
```

The API will be accessible at

```bash
  http://localhost:3000
```
