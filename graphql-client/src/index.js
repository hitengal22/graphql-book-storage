import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ListBooks from './Component/Books/ListBooks';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:4200/graphql/',
  cache: new InMemoryCache(),
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <ListBooks />
  }
])

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
