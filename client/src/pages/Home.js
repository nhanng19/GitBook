import React from "react";
import ProjectView from "../components/Project/ProjectView";
import { QUERY_PROJECTS } from "../utils/queries";
import ProjectList from "../components/Project/ProjectList";
import { useQuery } from "@apollo/client";
const Home = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];
  return (
    <ProjectList
      projects={projects}
      title="All GitBook"
    />
  );
};

export default Home;

