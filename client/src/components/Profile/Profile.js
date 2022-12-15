/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PICTURE } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import classes from "./Profile.module.css";

const Profile = () => {
  const [imageFile, setImageFile] = useState("");

  const [addPicture, { error }] = useMutation(ADD_PICTURE
    // , {
    // update(cache, { data: { addPicture } }) {
    //   try {
    //     const { user } = cache.readQuery({ query: QUERY_USER });

    //     cache.writeQuery({
    //       query: QUERY_USER,
    //       data: { user: [addPicture, ...user] },
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
  // }
  );

  const handleFileChange = () => {
    const value = document.getElementById('fileInput').files[0]
    setImageFile(value);
  };

  const submitPicture = async (e) => {
    e.preventDefault();
    
    const formData = await new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "profileImgs");
    const cloudName = "dc2xiz0gi";
    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    const cloudinaryUrl = data.url;
    console.log(cloudinaryUrl)
    await addPicture({ variables: {
      picture: cloudinaryUrl
    }});
    setImageFile("")

  };

  return (
    <>
      <div className={classes.flex_container}>
        <div>
          <img
            className={classes.profileImage}
            src="https://res.cloudinary.com/dc2xiz0gi/image/upload/v1670957376/profileImgs/Untitled_design_4_usytaj.png"
          />
        </div>
        <div className={classes.profileHeader}>
          <h1>Username</h1>
          <h1>Github Link</h1>
        </div>
      </div>
      <div className={classes.flex_container}>
        <div className={classes.btns_container}>
          <form onSubmit={submitPicture}
          onChange={handleFileChange}
          >
            
              <input
                id="fileInput"
                type="file"
                name="profile"
                label="Select profile picture"
                accept="image/jpg, image/jpeg, image/png"
              />
            
            <button type="submit">submit image</button>
          </form>
        </div>
        <div className={classes.btns_container}>
          <button>Change Password</button>
          <button>SomethingMore</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
