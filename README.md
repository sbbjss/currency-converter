# Currency Conversion Tool

## Project Overview
This project involves the creation of a simple full-stack application using NestJS for the backend and Nuxt for the frontend. The goal is to build a tool that retrieves and converts the amount of a specified transaction from one currency to a selected currency using a mock database. This task will demonstrate your ability to work with both frontend and backend technologies, apply RESTful principles, and implement clean, scalable code.

You should approach this as if you were starting a new project that is expected to grow to support multiple developers working on it at once. Therefore, you are expected to take care to make thoughtful decisions about the project architecture.

The frontend and backend base projects have been provided in the `nuxt` and `nest` directories of this repository to save time bootstrapping.

## Technical Requirements
- **Backend**: Develop a RESTful API using NestJS with TypeScript. The API will serve transaction data from a provided JSON file simulating a database and perform currency conversions.
- **Frontend**: Build a user interface using Nuxt 3 and the Vue Composition API with TypeScript. The interface will include a form to input a transaction ID and select a currency for conversion. The frontend should validate the transaction ID as a valid UUID before submission and handle user inputs and API responses effectively.
- **Typescript**: Please do not use `any` or `unknown` types. Please do not edit the `tsconfig` files, and do not disable the linter.

## Backend Specifications
1. **API Endpoints**:
   - `GET /transactions/{id}`: Returns the transaction details by ID.
   - `POST /transactions/{id}/convert`: Converts the transaction amount to the specified currency (currency should be passed as JSON in the body of the POST request) and returns the original and converted amounts.
2. **Data Management**:
   - Load and manage transaction data from the provided JSON file (at `nest/src/db/transactions-repository.ts`)
   - Ensure proper handling of non-existent transaction IDs and unsupported currencies with appropriate error messages.
   - Validation should be accomplished with a combination of NestJS pipes and the class-validator library
3. **SOLID Principles**:
   - Implement and demonstrate the use of Single Responsibility and Dependency Inversion principles in your code architecture.

### Backend Dependencies

#### The Conversion API
You will make server to server calls to the [FreecurrencyAPI](https://freecurrencyapi.com/docs/#authentication-api-key-information) to accomplish the currency conversions.

You will be given an API key separately to authenticate with the API. **This key should not be exposed in your git repo nor the frontend client**. It is your responsibility to manage the secret.

Please do not use FreecurrencyAPI's javascript client, you should manage the authentication and API calls.

#### Other Backend Libraries
You may use any package from the @nestjs package family, for example `@nestjs/swagger`. Please refrain from adding any non-NestJS packages on the backend that are not included in the NestJS core.

## Frontend Specifications
1. **Design**:
[Link to Figma](https://www.figma.com/file/v8FkhEzRuONbIx9plY0KCO/Pagos247-Fullstack-Challenge-Apr-2024?type=design&node-id=0-1&mode=design&t=pkeSvGfAwY0HD7g1-0)
2. **Form Handling**:
   - Implement a form based on the provided design
   - Validate the transaction ID field on the client side to ensure it is a valid UUID.
   - Display clear error messages for validation failures and handle API response errors gracefully.
3. **User Interface**:
   - The designs provided are for desktop devices. The mobile designs have been intentionally left out to assess your flexibility with ambiguous designs. Your solution should be both mobile and desktop-friendly.
   - You may add additional components to the frontend design to improve the UX at your discretion (for example, toasts, loading animations, etc.)
   - Consider, in the context of a new codebase, that form elements and API calls that you create may be required in other parts of the application later.

### Frontend Dependencies
Tailwind has been added to the Nuxt configuration if you would like to leverage it. You may also use vanilla CSS, SCSS, or another css processor but please refrain from adding any other UI libraries or preconfigured stylesheets.


You may utilize the `zod` and `vee-validate` libraries for form validation (they have not been added to the bootstrapped project by default)

## Project Delivery
- Create a branch called `submission` on this repository, push your code to the `submission` branch, and when you are ready to submit your final application, create a pull request to `main` from your branch (do not merge)
- Include a README file with instructions on how to set up and run the project locally.
- Ensure that the application is easy to set up with minimal configurations needed.

## Evaluation Criteria
- Code cleanliness and organization.
- Adherence to RESTful practices and SOLID principles.
- Effective implementation of the frontend according to the design and functional specifications.
- Proper handling of edge cases and errors both on the frontend and backend.

## Extra Credit
If you finish early or want to showcase additional skillsets, you may consider adding the following:
- Unit tests
- Dockerization (utilizing docker-compose)
- API documentation with the @nestjs/swagger package
- Pinia for frontend state management
- Support for internationalization
- API rate limiting

This project should take approximately 3-4 hours to complete, focusing on core functionalities without over-engineering the solution. It’s designed to assess your proficiency in using modern development frameworks and your approach to building functional, user-centric applications.
