import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import client from "./apolloClient";
import App from "./App.jsx";

import { createRoot } from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css';


createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
