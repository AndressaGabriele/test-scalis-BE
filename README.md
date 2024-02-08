
# README for Test-Scalis-Backend

## Overview

This project is a backend application built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. The application features an accounts management system, where users can create accounts, fetch account details, and transfer funds between accounts. It utilizes TypeORM for ORM (Object-Relational Mapping) with a SQLite database running in memory for data persistence, making it easy to test and demonstrate without the need for external database setup.

## Technologies Used

- **NestJS**: A framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and supports the TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.

## Getting Started

To run this project, ensure that you have Node.js and npm installed on your system. Follow these steps to get the application up and running:

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

- To start the application in development mode with hot-reload:
  ```sh
  npm run start:dev
  ```
- The application will be available at `http://localhost:3002`.

### Testing

- Run unit tests with Jest:
  ```sh
  npm test
  ```
- To watch files for changes and rerun tests related to changed files:
  ```sh
  npm run test:watch
  ```
- For test coverage:
  ```sh
  npm run test:cov
  ```

### API Endpoints

- **POST /accounts**: Create a new account with username, checking, and savings balance.
- **GET /accounts**: Fetch all accounts.
- **GET /accounts/:id**: Fetch an account by its ID.
- **POST /accounts/transfer**: Transfer funds from one account to another.

## How It Works

The application uses NestJS modules to organize code related to accounts management. The `AccountsModule` encapsulates the accounts logic, including controllers for handling HTTP requests, services for business logic, and entities for database interaction. It utilizes TypeORM for database operations, allowing for easy data manipulation and querying. The SQLite in-memory database is configured for ease of demonstration and testing, requiring no external database setup.

This setup demonstrates a microservice or backend service architecture, focusing on domain-driven design principles and clean architecture, suitable for scaling and maintenance in enterprise applications.

## Conclusion

This README provides a basic guide to getting started with the test project for Scalis.ai. It outlines the technology stack used, steps for installation, running the application, and testing. This project demonstrates proficiency in backend development, particularly with NestJS, TypeORM, and testing with Jest.
