import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import AddProject from "../components/Project/AddProject";
import ProjectList from "../components/Project/ProjectList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user)
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/Profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {!userParam && (
            <AddProject />
        )}
          <ProjectList
            projects={user.projects}
            title={user.username}
            showUsername={false}
          />
    </div>
  );
};

export default Profile;