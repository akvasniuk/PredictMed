import React, {useEffect, useState} from "react";
import {Box, Card, Stack, Avatar} from "@mui/material";
import ConfirmDelete from "./ConfirmDelete";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import ReplyText from "./Reusable/Reply/ReplyText";
import UpdateReplyButton from "./Reusable/Buttons/BgButtons/UpdateReplyButton";
import EditableReplyField from "./Reusable/Reply/EditableReplyField";
import {commentService} from "../../services";

const OwnReply = ({onContent, onCount, onTar, onDel, comId, user, onTime, id}) => {
    const [clicked, setClicked] = useState(false);
    const [editingRep, setEditingRep] = useState(false);
    const [repText, setRepText] = useState(onContent);
    const [openModal, setOpenModal] = useState(false);
    const [updatedClicked, setUpdatedClicked] = useState(false);

    useEffect(() => {
        const handleEdit = async () => {
            try {
                if (updatedClicked) {
                    await commentService.editReplyComment(user._id, id, comId, {
                        username: `${user.firstname} ${user.lastname}`,
                        reply: repText
                    })
                    setUpdatedClicked(false);
                }
            } catch (e) {
                console.log(e);
            }
        }

        handleEdit();
    });

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleEdit = () => {
        setClicked(!clicked);
        setEditingRep(!editingRep);
    };

    return (
        <>
            <ConfirmDelete
                onOpen={openModal}
                onClose={handleClose}
                comId={comId}
                onDel={onDel}
            />
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
                                    <Username username={`${user.firstname} ${user.lastname}`}/>
                                    <CreatedAt createdAt={onTime}/>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <DeleteButton functionality={() => handleOpen()}/>
                                    <EditButton
                                        editingComm={clicked}
                                        functionality={handleEdit}
                                    />
                                </Stack>
                            </Stack>
                            {editingRep ? (
                                <>
                                    <EditableReplyField
                                        repText={repText}
                                        setText={setRepText}
                                        content={onContent}
                                        placeHolder="Don't leave this blank!"
                                    />
                                    <UpdateReplyButton
                                        clicked={clicked}
                                        editingRep={editingRep}
                                        repText={repText}
                                        setClicked={setClicked}
                                        setEditingRep={setEditingRep}
                                        setUpdatedClicked={setUpdatedClicked}
                                    />
                                </>
                            ) : (
                                <ReplyText onTar={onTar} repText={repText} user={user}/>
                            )}
                        </Box>
                    </Stack>
                </Box>
            </Card>
        </>
    );
};

export default OwnReply;
