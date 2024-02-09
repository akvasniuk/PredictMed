import { Typography } from "@mui/material";
import React from "react";
import YouTag from "../YouTag";
import {useAuth} from "../../../hooks/useAuth";

const Username = ({ username }) => {
  const user = useAuth().user;
  const userUsername = `${user.firstname} ${user.lastname}`;


  return (
    <>
      <Typography fontWeight="bold" sx={{ color: "neutral.darkBlue" }}>
        {username}
      </Typography>
        {username === userUsername ? <YouTag /> : null}
    </>
  );
};

export default Username;
