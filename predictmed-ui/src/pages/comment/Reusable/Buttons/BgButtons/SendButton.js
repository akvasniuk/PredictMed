import {Button} from "@mui/material";
import React from "react";
import {useAuth} from "../../../../../hooks/useAuth";
import {commentService} from "../../../../../services";
import {useDispatch} from "react-redux";
import {addComment} from "../../../../../store/reducers/commentSlice"

const SendButton = ({setCommentTxt, commentTxt}) => {
    const user = useAuth().getUser();
    const username = `${user?.firstname} ${user?.lastname}`;
    const dispatch = useDispatch();

    const handleSendButton = async (e) => {

        if (!commentTxt.trim()) {
            e.preventDefault()
        } else {
            try {
                const {data} = await commentService.createComment(user?._id, {
                    comment: commentTxt.trim(),
                    username
                });
                console.log(data)
                // eslint-disable-next-line no-restricted-globals
               dispatch(addComment({...data, user}));
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
