import { Button } from "@mui/material";
import React from "react";
import {useAuth} from "../../../../../hooks/useAuth";
import {commentService} from "../../../../../services";

const UpdateButton = ({ commentText, editingComm, setEditingComm, commentId }) => {
    const user = useAuth().getUser();

    const handleEditButton = async () => {
        try {
            if(commentText.trim()){
                setEditingComm(!editingComm);
                console.log("DASDAD")
                await commentService.editComment(user._id, commentId, {comment: commentText});
            }else{
                alert("If  you want to remove the comment text, just delete the comment.");
            }


        }catch (e){
            console.log(e);
        }
    }

  return (
    <Button
      sx={{
        float: "right",
        bgcolor: "custom.moderateBlue",
        color: "neutral.white",
        p: "8px 25px",
        "&:hover": {
          bgcolor: "custom.lightGrayishBlue",
        },
      }}
      onClick={handleEditButton}
    >
      Update
    </Button>
  );
};

export default UpdateButton;
