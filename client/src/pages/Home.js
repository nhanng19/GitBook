import React from "react";
// import Container from "../../components/UI/Container";
import NavBar from "../components/NavBar/NavBar";
import Content from "../components/UI/Content";
import SideBar from "../components/UI/SideBar";
import Main from "../components/UI/Main";
import ProjectView from "../components/Project/ProjectView";

const Project = () => {
  return (
    <>
      <NavBar />
      <Content>
        <SideBar></SideBar>
        <Main>
          <ProjectView />

        </Main>
      </Content>
    </>
  );
};

export default Project;