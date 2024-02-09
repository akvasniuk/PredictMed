import { TextField } from "@mui/material";
import React from "react";

const EditableReplyField = ({setText, placeHolder, content, repText }) => {
  return (
    <TextField
      sx={{ p: "20px 1" }}
      multiline
      fullWidth
      minRows={4}
      id="outlined-multilined"
      placeholder={placeHolder}
      value={repText}
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
};

export default EditableReplyField;
