import React, { useEffect } from "react";
import ProfileContainer from "../components/Profile/ProfileContainer";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  let visitor = data?.me ? false : true;
  

  // navigate to personal profile page if username is your
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{<ProfileContainer user={user} visitor={visitor} />}</>;
};

export default Profile;
