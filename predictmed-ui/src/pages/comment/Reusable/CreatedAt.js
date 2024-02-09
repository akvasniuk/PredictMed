import {Typography} from "@mui/material";
import React from "react";
import {formatDistanceToNow} from "date-fns";

const CreatedAt = ({createdAt}) => {
  const formatTimestamp = (timestamp = new Date()) => {
    const parsedDate =  new Date(timestamp);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  const formattedData = formatTimestamp(createdAt);

    return (
        <Typography sx={{color: "neutral.grayishBlue"}}>{formattedData}</Typography>
    );
};

export default CreatedAt;
