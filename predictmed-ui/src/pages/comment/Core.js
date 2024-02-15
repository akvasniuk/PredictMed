import React, {useEffect, useState} from "react";
import {Container, Stack, Pagination, PaginationItem} from "@mui/material";
import Comment from "./Comment";
import AddComment from "./AddComment";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {
    setCommentSection,
} from "../../store/reducers/commentSlice";
import {commentService} from "../../services";
import {useAuth} from "../../hooks/useAuth";

const Core = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useAuth().userIsAuthenticated();

    const [page, setPage] = useState(
        parseInt(location?.search?.split("=")[1] || 1)
    );

    const [pageQty, setPageQty] = useState();

    const {comments} = useSelector((state) => state.comment.commentSection);

    useEffect(() => {
        const getComments = async () => {
            try {
                const {data} = await commentService.getComments(page);
                dispatch(setCommentSection(data));
                setPageQty(data.pages);
                setPage(data.page)

                if (data.pages < page) {
                    setPage(1);
                    navigation("/feedback", {replace: true})
                }
            } catch (e) {
                console.log(e)
            }
        }

        getComments();
    }, [page, pageQty, location.search, navigation]);
    console.log(comments)

    return (
        pageQty && pageQty > 0 && (
            <Container maxWidth="md">
                <Stack spacing={1} alignItems="center" mb="10px">
                    {!!pageQty && (
                        <Pagination
                            count={pageQty}
                            page={page}
                            onChange={(_, num) => setPage(num)}
                            showFirstButton
                            showLastButton
                            sx={{ marginY: 2, marginX: "auto" }}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`?page=${item.page}`}
                                    {...item}
                                />
                            )}
                        />
                    )}
                </Stack>

                <Stack spacing={3}>
                    {comments.length > 0 && comments.map((comment) => (
                        <Comment key={comment._id} onPass={comment} />
                    ))}
                    {page === 1 && isAuthenticated ? <AddComment /> : <></>}
                </Stack>
            </Container>
        )
    );
};

export default Core;
