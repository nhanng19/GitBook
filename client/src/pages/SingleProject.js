import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import ProjectView from "../components/Project/ProjectView";

const SingleProject = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    // pass URL parameter
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  return (
    <>
      <ProjectView
        name={project.projectName}
        description={project.projectDescription}
        date={project.createdAt}
        owner={project.projectOwner}
        repo={project.projectRepo}
      />
    </>
  );
};

export default SingleProject;
