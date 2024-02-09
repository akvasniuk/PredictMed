import {Box, IconButton, Typography} from "@mui/material";
import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ScoreChanger = ({onScore, isReply, commentId, replyId, user, authUser}) => {
    const [score, setScore] = useState(onScore);

    const handleOnClick = (isPlus) => {
        if (user._id !== authUser._id) {
            setScore(isPlus ? score + 1 : score - 1);
        }
    }

    return (
        <Box
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
                backgroundColor: "hsl(228, 33%, 97%)",
                borderRadius: "5px",
                "& svg": {
                    color: "hsl(239, 57%, 85%)",
                    "&:hover": {
                        color: "hsl(238, 40%, 52%)",
                    },
                },
            }}
        >
            <IconButton
                disableRipple
                aria-label="increase score"
                onClick={() => handleOnClick(true)}
            >
                <AddIcon sx={{height: "20px", width: " 20px"}}/>
            </IconButton>
            <Typography sx={{color: "custom.moderateBlue", fontWeight: 500}}>
                {score}
            </Typography>
            <IconButton
                disableRipple
                aria-label="decrease score"
                onClick={() => handleOnClick(false)}
            >
                <RemoveIcon sx={{height: "20px", width: " 20px"}}/>
            </IconButton>
        </Box>
    );
};

export default ScoreChanger;
