import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import ProjectView from "../components/Project/ProjectView";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Main from "../components/UI/Main";
const SingleProject = ({ socket }) => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });
  const project = data?.project || {};
  return (
    <>
      <Main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProjectView
            name={project.projectName}
            description={project.projectDescription}
            date={project.createdAt}
            owner={project.projectOwner}
            repo={project.projectRepo}
            projectId={project._id}
            project={project}
            socket={socket}
          />
        )}
      </Main>
    </>
  );
};

export default SingleProject;
