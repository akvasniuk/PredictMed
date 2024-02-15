import {Avatar, Card, Stack, Box, ThemeProvider} from "@mui/material";
import React, {useState} from "react";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import SendButton from "./Reusable/Buttons/BgButtons/SendButton";
import theme from "./style";
import {useAuth} from "../../hooks/useAuth";

const AddComment = () => {
    const [commentTxt, setCommentTxt] = useState("");
    const user = useAuth().getUser();

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <Box sx={{p: "15px"}}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Avatar src={user?.avatar} variant="rounded" alt="user-avatar"/>
                        <EditableCommentField
                            commentText={commentTxt}
                            setCommentText={setCommentTxt}
                            placeHolder="Add a comment"
                        />
                        <SendButton commentTxt={commentTxt} setCommentTxt={setCommentTxt}/>
                    </Stack>
                </Box>
            </Card>
        </ThemeProvider>
    );
};

export default AddComment;
