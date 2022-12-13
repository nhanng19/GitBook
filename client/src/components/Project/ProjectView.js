import React, { useState } from "react";
import classes from "./ProjectView.module.css";
import Container from "../UI/Container";
import ProjectInfo from "./ProjectInfo";
import Kanban from "../Kanban/Kanban";
import { addImage } from "../../api/profile";

const ProjectView = () => {
  
  const userIdtest = "6396a61241a1852015174838";
  
  const handleSubmit = async (data) => {
    await addImage(userIdtest, data);
    console.log(data);
  };
  const handleSubmit2 = async (e) => {

    e.preventDefault();
    const imageFile = e.target[0].files[0]
    const formData = await new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'profileImgs');
    const cloudName = "dc2xiz0gi";
    const data = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    const cloudinaryUrl = data.url;
    handleSubmit(cloudinaryUrl)
    
    
  };
  

  const DUMMY_DESCRIPTION = `project description test, dummy description.`;
  
  return (
    <Container>
      <ProjectInfo
        title="project title"
        date="2022/12/27"
        description={DUMMY_DESCRIPTION}
      />
      <Kanban />
      <form onSubmit={handleSubmit2}>
        <input type="file"
        name="profile"
        // onChange={handleChange}
        label="Select profile picture"
        accept="image/jpg, image/jpeg, image/png" />
        <button type="submit">Submit</button>
      </form>
      <div className={classes.chatBox}>
        <div className={classes.chat}>
          <p>Richard : blah blah blah</p>
          <p>Nhan : lahb lahb lahb</p>
          <p>Dat : ahbl ahbl ahbl</p>
          <p>Lydia : hbla hbla hbla</p>
        </div>
        <form className={classes.chatForm}>
          <textarea className={classes.chatInput}></textarea>
          <button className={` ${classes.sendBtn}`}>Send</button>
        </form>
      </div>
    </Container>
  );
};

export default ProjectView;
