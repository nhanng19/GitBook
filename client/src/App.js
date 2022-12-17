import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from "./reducers";
// const store = createStore(rootReducer, composeWithDevTools());

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { io } from "socket.io-client";

import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
// import MyProfile from "./pages/MyProfile";
// import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import SingleProject from "./pages/SingleProject";

import Auth from "./utils/auth";

import LoadingSpinner from "./components/UI/LoadingSpinner";
import Main from "./components/UI/Main";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  let routes;

  if (Auth.loggedIn()) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          {/* <Route path="/friends" element={<Friends />} /> */}
          {/* <Route path="/chat" element={<ChatPage socket={socket} />} /> */}
          {/* < Route path="/Donation" element={<DonationPage />} /> */}
          <Route path="/About" element={<About />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profiles/:username" element={<Profile />} />
          <Route
            path="/projects/:projectId"
            element={<SingleProject socket={socket} />}
          />
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
            <Main>{socket ? <div>{routes}</div> : <LoadingSpinner />}</Main>
          </>
        </Router>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
