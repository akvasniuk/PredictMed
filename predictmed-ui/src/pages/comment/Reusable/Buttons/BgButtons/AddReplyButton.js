import {Button} from "@mui/material";
import React from "react";

const AddReplyButton = ({setReplyText, onAdd, replyText, setClicked, clickedFun}) => {
    return (
        <Button
            size="large"
            sx={{
                bgcolor: "custom.moderateBlue",
                color: "neutral.white",
                p: "8px 25px",
                "&:hover": {
                    bgcolor: "custom.lightGrayishBlue",
                },
            }}
            onClick={(e) => {
                !replyText.trim() ? e.preventDefault() : onAdd(replyText);
                setReplyText("");
                setClicked && setClicked(false);
                clickedFun && clickedFun(false);
            }}
        >
            Reply
        </Button>
    );
};

export default AddReplyButton;
