import Landing from "../components/Landing/Landing";
import Slider from "../components/Landing/Slider";
import { QUERY_PROJECTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
const LandingPage = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];
  return (
    <>
      <Landing />
      <Slider slides={projects} />
    </>
  );
};

export default LandingPage;
