import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import Project from './pages/Project/Project';
// import Container from './components/UI/Container';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorizatoin: token? `Bearer ${token}` : '',
    }
  };
});

//create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Router>
          <div className="full-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/project" element={<Project />} />
              {/* <Route path="/friends" element={<Friends />} /> */}
            </Routes>
          </div>
        </Router>
      </React.Fragment>
    </ApolloProvider>
    
  );
}

export default App;
