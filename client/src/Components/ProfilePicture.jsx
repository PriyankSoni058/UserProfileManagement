import { Avatar, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { HiddenInput, ProfilePictureContainer } from "./styles";

const ProfilePicture = ({ setProfileImage, profileImageURL }) => {
  const hiddenInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleUploadedFile = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
      setProfileImage(file);
    }
  };

  const onUpload = () => {
    hiddenInputRef.current?.click();
  };

  const uploadButtonLabel = preview ? "Change" : "Upload";

  return (
    <ProfilePictureContainer>
      <HiddenInput
        type="file"
        name="profilePicture"
        style={{ display: "none" }}
        onChange={(e) => handleUploadedFile(e)}
        ref={(e) => {
          hiddenInputRef.current = e;
        }}
      />

      <Avatar
        src={preview ? preview : profileImageURL}
        sx={{ width: 100, height: 100 }}
      />

      <Button
        variant="text"
        sx={{ color: "#000", marginLeft: "12px", marginTop: "5px" }}
        onClick={onUpload}
      >
        {uploadButtonLabel}
      </Button>
    </ProfilePictureContainer>
  );
};

export default ProfilePicture;
