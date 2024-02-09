import React, {useState} from "react";
import {Avatar, Card, Stack, ThemeProvider, Box} from "@mui/material";
import RepliesSection from "./RepliesSection";
import ConfirmDelete from "./ConfirmDelete";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import CommentText from "./Reusable/Comment/CommentText";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import ReplyButton from "./Reusable/Buttons/TextButtons/ReplyButton";
import UpdateButton from "./Reusable/Buttons/BgButtons/UpdateButton";
import {useAuth} from "hooks/useAuth";
import theme from "./style";

const Comment = ({onPass}) => {
    const authUser = useAuth().getUser();
    const {userIsAuthenticated} = useAuth();

    const {_id, comment, createdAt, replies, username, user} = onPass;

    const [clicked, setClicked] = useState(false);
    const [editingComm, setEditingComm] = useState(false);
    const [commentText, setCommentText] = useState(comment);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <ConfirmDelete onOpen={openModal} onClose={handleClose} id={_id}/>
            <Card>
                <Box sx={{p: "15px"}}>
                    <Stack spacing={2} direction="row">
                        <Box sx={{width: "100%"}}>
                            <Stack
                                spacing={2}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Avatar src={user?.avatar}></Avatar>
                                    <Username username={username}/>
                                    <CreatedAt createdAt={createdAt}/>
                                </Stack>
                                {user?._id === authUser?._id ? (
                                    <Stack direction="row" spacing={1}>
                                        <DeleteButton functionality={() => handleOpen()}/>
                                        <EditButton
                                            functionality={() => setEditingComm(!editingComm)}
                                            editingComm={editingComm}
                                        />
                                    </Stack>
                                ) : (
                                    userIsAuthenticated() ? (
                                        <ReplyButton functionality={() => setClicked(!clicked)}/>
                                    ) : null
                                )}
                            </Stack>
                            {editingComm ? (
                                <>
                                    <EditableCommentField
                                        commentText={commentText}
                                        setCommentText={setCommentText}
                                        placeHolder="Don't leave this blank!"
                                    />
                                    <UpdateButton
                                        commentText={commentText}
                                        editingComm={editingComm}
                                        setEditingComm={setEditingComm}
                                        commentId={_id}
                                    />
                                </>
                            ) : (
                                <CommentText commentText={commentText}/>
                            )}
                        </Box>
                    </Stack>
                </Box>
            </Card>
            {replies ? (
                <RepliesSection
                    onReplies={replies}
                    onClicked={clicked}
                    onTar={username}
                    userId={user?._id}
                    setClicked={setClicked}
                    id={_id}
                />
            ) : null}
        </ThemeProvider>
    );
};
export default Comment;
