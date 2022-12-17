/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PICTURE } from "../../utils/mutations";


import Auth from "../../utils/auth";
import classes from "./ProfileContainer.module.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";

const ProfileContainer = ({ user }) => {
  const [imageFile, setImageFile] = useState("");

  const [addPicture, { error }] = useMutation(
    ADD_PICTURE
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
    const value = document.getElementById("fileInput").files[0];
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
    console.log(cloudinaryUrl);
    await addPicture({
      variables: {
        picture: cloudinaryUrl,
      },
    });
    setImageFile("");
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profile_top}>
        <div className={classes.profile_container}>
          <Cover />
          <ProfilePictureInfos />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
