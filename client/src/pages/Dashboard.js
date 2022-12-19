import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AddProject from "../components/Project/AddProject";
import ProjectList from "../components/Project/ProjectList";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Main from "../components/UI/Main";
const Dashboard = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/Profile" />;
  // }

  return (
    <>
      <Main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {!userParam && <AddProject />}
            <ProjectList
              projects={user.projects}
              title={user.username}
              showUsername={false}
            />
          </div>
        )}
      </Main>
    </>
  );
};

export default Dashboard;
