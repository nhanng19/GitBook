import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from "./reducers";
// const store = createStore(rootReducer, composeWithDevTools());
import { Provider } from "react-redux";
import store from "./store/store";
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
import Aos from "aos";
import "aos/dist/aos.css";
import SingleProject from "./pages/SingleProject";

import Auth from "./utils/auth";

import LoadingSpinner from "./components/UI/LoadingSpinner";
import Main from "./components/UI/Main";
import "./App.css";
import ProfileProjects from "./components/ProfileProjects/ProfileProjects";
import ProfileAbout from "./components/ProfileAbout/ProfileAbout";
import { connectWithSocketServer } from "./realtimeCommunication/socketConnection";

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

// need to change localhost to heroku link
function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const jwttoken = Auth.getToken();
    const newSocket = io(`https://calm-shelf-74011.herokuapp.com/`, {
      auth: {
        token: jwttoken,
      },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("succesfully connected with socket.io server");
      console.log("frontend socket connection", newSocket);
    });

    Aos.init({ duration: 1000 });
  }, []);

  let routes;

  if (Auth.loggedIn()) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="projects" element={<ProfileProjects />} />
            <Route path="about" element={<ProfileAbout />} />
          </Route>
          <Route path="/profile/:username" element={<Profile />}>
            <Route path="projects" element={<ProfileProjects />} />
            <Route path="about" element={<ProfileAbout />} />
          </Route>
          {/* <Route path="/friends" element={<Friends />} /> */}
          {/* <Route path="/chat" element={<ChatPage socket={socket} />} /> */}
          {/* < Route path="/Donation" element={<DonationPage />} /> */}
          <Route path="/about" element={<About />} />
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
      <Provider store={store}>
        <Router>
          <div>{routes}</div>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
