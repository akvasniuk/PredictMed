import {Avatar, Card, Stack, ThemeProvider, Box} from "@mui/material";
import React, {useState} from "react";
import AddReplyButton from "./Reusable/Buttons/BgButtons/AddReplyButton";
import EditableReplyField from "./Reusable/Reply/EditableReplyField";
import theme from "./style";
import {useAuth} from "../../hooks/useAuth";

const AddReply = ({onAdd, setClicked, clickedFun}) => {
    const user = useAuth().user;

    const [replyText, setReplyText] = useState("");
    return (
        <ThemeProvider theme={theme}>
            <Card>
                <Box sx={{p: "15px"}}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Avatar src={user.avatar} variant="rounded" alt="user-avatar"/>
                        <EditableReplyField
                            placeHolder="Add a reply"
                            setText={setReplyText}
                            text={replyText}
                        />
                        <AddReplyButton
                            onAdd={onAdd}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            setClicked={setClicked}
                            clickedFun={clickedFun}
                        />
                    </Stack>
                </Box>
            </Card>
        </ThemeProvider>
    );
};

export default AddReply;
