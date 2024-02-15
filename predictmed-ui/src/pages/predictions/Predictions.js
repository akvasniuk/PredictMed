import React, {useEffect, useState} from "react";
import {Container, Stack, Pagination, PaginationItem} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {
    setDiseaseSection,
} from "../../store/reducers/diseaseSlice";
import {diseaseService} from "../../services";
import {useAuth} from "../../hooks/useAuth";
import {Diseases} from "../../components/diseases/Diseases";

const Predictions = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useAuth().userIsAuthenticated();

    const [page, setPage] = useState(
        parseInt(location?.search?.split("=")[1] || 1)
    );

    const [pageQty, setPageQty] = useState();

    const {diseases} = useSelector((state) => state.disease.diseaseSection);

    useEffect(() => {
        const getDiseases = async () => {
            try {
                const {data} = await diseaseService.getDiseases(page);
                dispatch(setDiseaseSection(data));
                setPageQty(data.pages);
                setPage(data.page)

                if (data.pages < page) {
                    setPage(1);
                    navigation("/prediction", {replace: true})
                }
            } catch (e) {
                console.log(e)
            }
        }

        getDiseases();
    }, [page, pageQty, location.search, navigation]);
    console.log(location)

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
                            sx={{marginY: 2, marginX: "auto"}}
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
                    {diseases.length > 0 && <Diseases diseases={diseases}/>}
                </Stack>
            </Container>
        )
    );
};

export default Predictions;
