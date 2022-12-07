import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from './components/Landing/Landing';
import Project from './pages/Project/Project';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="full-container">
          <Routes>
            {/* <Route path="/" element={<Landing />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/project" element={<Project />} />
            {/* <Route path="/friends" element={<Friends />} /> */}
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
