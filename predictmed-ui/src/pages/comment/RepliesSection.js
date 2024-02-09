import {Box, Card, Stack, Typography, Avatar, Button} from "@mui/material";
import React, {useState} from "react";
import replyArrow from "../../assets/images/icons/icon-reply.svg";
import AddReply from "./AddReply";
import OwnReply from "./OwnReply";
import {formatDistanceToNow} from "date-fns";
import {useAuth} from "../../hooks/useAuth";
import {commentService} from "../../services";

const RepliesSection = ({onReplies, onClicked, onTar, setClicked: clickedFun, id}) => {
    const authUser = useAuth().getUser();
    const [repliess, setReplies] = useState(onReplies);
    const [clicked, setClicked] = useState(false);
    const [reply, setReply] = useState();

    const addReply = async (data) => {
        let replyMessage;
        if (!reply) {
            try {
                const response = await commentService.createReplyComment(authUser._id, id, {
                    reply: data,
                    username: `${authUser.firstname} ${authUser.lastname}`
                })
                replyMessage = response.data;
            } catch (e) {
                console.log(e);
            }
        }else{
            try {
                const response = await commentService.createReplyComment(authUser._id, id, {
                    reply: data,
                    username: `${authUser.firstname} ${authUser.lastname}`,
                    replyCommentId: reply.user._id
                })
                replyMessage = response.data;
            } catch (e) {
                console.log(e);
            }
        }

        const replyObj = {
            _id: replyMessage.replies[replyMessage.replies.length - 1]._id,
            commentId: replyMessage._id,
            reply: replyMessage.replies[replyMessage.replies.length - 1].reply,
            createdAt: new Date(),
            score: replyMessage.replies[replyMessage.replies.length - 1].score,
            username: `${authUser.firstname} ${authUser.lastname}`,
            userId: authUser._id,
            user: {...authUser},
            answerToUser: replyMessage.replies[replyMessage.replies.length - 1].answerToUser ?? null
        }

        setReplies([
            ...repliess,
            replyObj,
        ]);
    };
    const deleteReply = async (idReply) => {
        try {
            setReplies(repliess.filter((reply) => reply._id !== idReply));
            await commentService.deleteReplyComment(authUser._id, id, idReply);
        }catch (e){
            console.log(e);
        }
    };

    const formatTimestamp = (timestamp) => {
        const parsedDate = new Date(timestamp);
        return formatDistanceToNow(parsedDate, {addSuffix: true});
    };

    return (
        <Stack spacing={2} width="800px" alignSelf="flex-end">
            {repliess.map((rep) => {
                let {reply, createdAt, score, username, userId, answerToUser} = rep;
                const createdData = formatTimestamp(createdAt);

                return userId === authUser?._id ? (
                    <OwnReply
                        key={rep._id}
                        comId={rep._id}
                        onContent={reply}
                        onTime={createdAt}
                        onCount={score}
                        onTar={answerToUser ? answerToUser : onTar}
                        onDel={deleteReply}
                        userId={rep?.userId}
                        user={rep?.user}
                        id={id}
                    />
                ) : (
                    <Card key={rep._id}>
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
                                            <Avatar src={rep?.user?.avatar}></Avatar>
                                            <Typography
                                                fontWeight="bold"
                                                sx={{color: "neutral.darkBlue"}}
                                            >
                                                {username}
                                            </Typography>
                                            <Typography sx={{color: "neutral.grayishBlue"}}>
                                                {createdData}
                                            </Typography>
                                        </Stack>
                                        {authUser && <Button
                                            variant="text"
                                            onClick={() => {
                                                setReply(rep)
                                                setClicked(!clicked)
                                            }}
                                            sx={{
                                                fontWeight: 500,
                                                textTransform: "capitalize",
                                                color: "custom.moderateBlue",
                                            }}
                                            startIcon={<img src={replyArrow} alt="reply sign"/>}
                                        >
                                            Reply
                                        </Button>}
                                    </Stack>
                                    <Typography
                                        component="div"
                                        sx={{color: "neutral.grayishBlue", p: "20px 0"}}
                                    >
                                        <Typography
                                            sx={{
                                                color: "custom.moderateBlue",
                                                width: "fit-content",
                                                display: "inline-block",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {`@${answerToUser ? answerToUser : onTar}`}
                                        </Typography>{" "}
                                        {reply}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                );
            })}
            {onClicked ? <AddReply onAdd={addReply} setClicked={clickedFun}/> : null}
            {clicked ? <AddReply onAdd={addReply} setClicked={setClicked}/> : null}
        </Stack>
    );
};

export default RepliesSection;
