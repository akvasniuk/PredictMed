import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    commentSection: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setCommentSection: (state, action) => {
            state.commentSection = action.payload;
        },
        editComment: (state, action) => {
            console.log(action)
            state.commentSection.comments.push({
                id: action.payload._id,
                content: action.payload.comment,
                createdAt: action.payload.createdAt,
                score: action.payload.score,
                replies: action.payload.replies,
                user: {username: "juliusomo"},
            });
        },
        deleteComment: (state, action) => {
            state.commentSection.comments = state.commentSection.comments.filter(
                (comment) => comment._id !== action.payload
            );
        },
        addReply: (state, action) => {
            const commentsIdx = state.commentSection.comments.findIndex(comment =>
                comment._id === action.payload.id
            );

            state.commentSection.comments[commentsIdx].replies.push(action.payload.reply);
        },
        deleteReply: (state, action) => {
            // Implement deleting a reply if needed
        },
    },
});

export const {
    setCommentSection,
    addComment,
    deleteComment,
    deleteReply,
} = commentSlice.actions;

export default commentSlice.reducer;
