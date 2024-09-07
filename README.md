
# Project Setup

This repository contains both the front-end and back-end components of the project. Follow the instructions below to set up and run both parts of the application.

## Front-End Setup (React)

### Getting Started

1. **Install Dependencies**

   Navigate to the front-end directory and install the required dependencies:

   ```sh
   cd path/to/front-end
   yarn install
   ```

2. **Start Development Server**

   To start the front-end application in development mode, use:

   ```sh
   yarn start
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

3. **Run Tests**

   To run the tests in interactive watch mode, execute:

   ```sh
   yarn test
   ```

4. **Build for Production**

   To build the front-end application for production, run:

   ```sh
   yarn build
   ```

   The optimized build will be saved in the `build` folder.

5. **Eject Configuration**

   If you need to customize the build configuration, you can eject with:

   ```sh
   yarn eject
   ```

   **Note:** This is a one-way operation and cannot be undone.

### Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)

## Back-End Setup (Node.js / Express)

### Development Environment Setup


1. **Install Dependencies**

   Navigate to the back-end directory and install the required dependencies:

   ```sh
   cd path/to/back-end
   yarn install
   ```

2. **Environment Configuration**

   - Create a `.env` file from the `.env.example` file:

     ```sh
     cp .env.example .env
     ```

   - Update the `.env` file with the necessary environment variables.

### Running the Back-End

- **Start the Server**

  To start the back-end server in development mode, use:

  ```sh
  yarn start
  ```

## Combined Front-End and Back-End Setup

1. **Install Front-End Dependencies**

   ```sh
   cd path/to/front-end
   yarn install
   ```

2. **Install Back-End Dependencies**

   ```sh
   cd path/to/back-end
   yarn install
   ```

3. **Configure Environment**

   - For the front-end, ensure all necessary `.env` variables are set.
   - For the back-end, create and configure your `.env` file with the required values.

4. **Start Both Servers**

   - **Front-End Server:**

     ```sh
     cd path/to/front-end
     yarn start
     ```

   - **Back-End Server:**

     ```sh
     cd path/to/back-end
     yarn start
     ```

## Deployment

For deployment instructions, consult the deployment sections in the following documentation:

- [Create React App Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Node.js/Express Deployment](https://expressjs.com/en/starter/faq.html)

## Troubleshooting

For help with common issues, refer to:

- [Create React App Troubleshooting](https://facebook.github.io/create-react-app/docs/troubleshooting)
- [Node.js/Express Troubleshooting](https://expressjs.com/en/starter/faq.html)
```
