import React from "react";
import Profile from "../components/Profile/Profile";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const MyProfile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is your
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/Profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {!userParam && <Profile />}
      {/* <Profile /> */}
    </>
  );
};

export default MyProfile;
