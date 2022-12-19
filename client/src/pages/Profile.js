import ProfileContainer from "../components/Profile/ProfileContainer";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import Content from "../components/UI/Content";
import SideBar from "../components/UI/SideBar";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Main from "../components/UI/Main";
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  let visitor = !userParam
    ? false
    : Auth.loggedIn() && Auth.getProfile().data.username === userParam
    ? false
    : true;

  return (
    <Main profile ="true">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <> {<ProfileContainer user={user} visitor={visitor} />}</>
      )}
    </Main>
  );
};

export default Profile;
