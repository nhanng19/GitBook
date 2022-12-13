import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import search from "../utils/API";
import AddProject from "../components/Project/AddProject";
import ProjectList from "../components/Project/ProjectList";
import { useState, useEffect } from "react";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Dashboard = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const [projects, setProjects] = useState("");
  const user = data?.me || data?.user || {};

  const searchRepo = async (query) => {
    const response = await search(query);
    setProjects(response.data);
  };

  useEffect(() => {
    searchRepo(user.username);
  }, [user.username]);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/Profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!userParam && <AddProject />}
      <ProjectList
        repoProjects={projects}
        projects={user.projects}
        title={user.username}
        showUsername={false}
      />
    </div>
  );
};

export default Dashboard;
