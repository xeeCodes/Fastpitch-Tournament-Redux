# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# -----------------------------------------------------------------

# Dependencies

# Frontend
1- created vite app
2- installed tailwind css (for styling)
3- install react-redux (to manage global states)
4- axios (to make requests)

# Backend
1- installed mongoose,express,dotenv,mongoose-sequence

# Setup Instructions

- navigate to backend
- install dependencies
- run npm start
- navigate to frontend
- install dependencies
- start the development server ( npm run dev)
- created .env file in the backend


# Redux 
Redux is used to manage the global states and for handeling asynchronous opeartions in react.
It is a uni directional data flow.
- The component dispatches the action using use Dispatch hook when an event ooccures.
- The saga watcher function in saga file listens the action and as soon as it receives an action ,watcher calls the worker function in the saga file.
- The worker saga performs the asynchronous tasks such as API calls and is dispatches success or failure depending on success or failure of the request.
- The reducer listens for success or failure actions and updated the store.
- Then react component use useSelector to read the updtaed state from the store.


# Design Decisions
- The design is fully responsive using Tailwind CSS utility classes.
- Layouts adjust automatically across breakpoints.
