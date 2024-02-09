import {Button} from "@mui/material";
import React from "react";
import {useAuth} from "../../../../../hooks/useAuth";
import {commentService} from "../../../../../services";

const SendButton = ({setCommentTxt, commentTxt}) => {
    const user = useAuth().getUser();
    const username = `${user.firstname} ${user.lastname}`;
    const handleSendButton = async (e) => {

        if (!commentTxt.trim()) {
            e.preventDefault()
        } else {
            try {
                await commentService.createComment(user._id, {
                    comment: commentTxt.trim(),
                    username
                })

                // eslint-disable-next-line no-restricted-globals
               location.href = "/feedback"
            } catch (e) {
                console.log(e);
            }
        }

        setCommentTxt("");
    };

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
            onClick={handleSendButton}
        >
            Send
        </Button>
    );
};

export default SendButton;
