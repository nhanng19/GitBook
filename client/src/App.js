import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import socketIO from 'socket.io-client';

import LandingPage from "./pages/LandingPage";
// import Project from './pages/Project/Project';
import Home from "./pages/Home";
// import Container from './components/UI/Container';
import "./App.css";
import Auth from "./utils/auth";

// const socket = socketIO.connect('http://localhost:3000');

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorizatoin: token ? `Bearer ${token}` : "",
    },
  };
});

//create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  let routes;

  if (Auth.loggedIn()) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/friends" element={<Friends />} /> */}
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </>
    );
  }
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Router>
          <>
            <div className="full-container">{routes}</div>
          </>
        </Router>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
