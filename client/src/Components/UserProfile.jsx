import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  updateUserProfile,
  createUserProfile,
} from "../lib/features/userProfile/userProfileActions";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { selectUserProfileById } from "../lib/features/userProfile/userProfileSelectors";

const schema = yup.object().shape({
  userName: yup
    .string()
    .max(35, `Username must be at most ${35} characters`)
    .required("Username is required"),
  firstName: yup
    .string()
    .max(35, `Username must be at most ${50} characters`)
    .required("First Name is required"),
  lastName: yup
    .string()
    .max(35, `Username must be at most ${50} characters`)
    .required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  bio: yup.string().max(250, `Username must be at most ${250} characters`),
  image: yup.string(),
});

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const user =
    useSelector((state) => selectUserProfileById(state, userId)) || {};

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: user.userName || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
      image: `${baseURL}/files/${user.proPic}` || "",
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const apiRequestData = new FormData();
      apiRequestData.append("bio", data.bio);
      apiRequestData.append("email", data.email);
      apiRequestData.append("lastName", data.lastName);
      apiRequestData.append("userName", data.userName);
      apiRequestData.append("firstName", data.firstName);
      if (profileImage) apiRequestData.append("image", profileImage);

      let action;

      if (userId) {
        action = updateUserProfile({ userProfile: apiRequestData, userId });
      } else {
        action = createUserProfile(apiRequestData);
      }

      const resultAction = dispatch(action);
      if (resultAction) {
        reset({
          userName: resultAction.userName,
          firstName: resultAction.first_name,
          lastName: resultAction.last_name,
          email: resultAction.email,
          bio: resultAction.bio,
          image: resultAction.profile_image,
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Error handling profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10vh" }}>
      <Typography variant="h4" gutterBottom>
        {userId ? "Update" : "Add"} User Profile
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <ProfilePicture
          setProfileImage={setProfileImage}
          profileImageURL={`${baseURL}/files/${user.proPic}` || ""}
        />

        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.userName}
              helperText={errors?.userName?.message}
              label="Username"
              variant="outlined"
            />
          )}
        />

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              label="First Name"
              variant="outlined"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              label="Last Name"
              variant="outlined"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-6"
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              variant="outlined"
            />
          )}
        />

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              rows={4}
              error={!!errors.bio}
              helperText={errors?.bio?.message}
              label="Bio"
              variant="outlined"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formState.isValid || loading}
          startIcon={loading && <CircularProgress size={24} />}
        >
          {userId
            ? loading
              ? "Updating..."
              : "Update Profile"
            : loading
            ? "Adding..."
            : "Add Profile"}
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
