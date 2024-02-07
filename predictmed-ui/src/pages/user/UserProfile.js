import {
    Alert,
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import MainCard from 'components/MainCard';
import {red} from "@ant-design/colors";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {userService, authService} from "../../services";
import {handleResponse} from "../../helpers";


const UserProfile = () => {
    const user = useAuth().getUser();
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
    const formattedDate = new Date(user?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const handleOnDelete = async () => {
    try {
        const responseData = await userService.deleteUser(user?._id);
        setResponse(handleResponse(responseData));
        authService.deleteToken();
        navigate("/login");
    }catch (e){
        setResponse(handleResponse(e));
    }

    }

    return (
        <MainCard title="User Profile">
            <Grid container justifyContent="center" alignItems="center">
                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        avatar={
                            <Avatar src={user?.avatar} sx={{bgcolor: red[500]}} aria-label="recipe"/>
                        }
                        title={`${user?.firstname} ${user?.lastname}`}
                        subheader={formattedDate}
                    />
                    <CardMedia
                        component="img"
                        image={user?.avatar}
                        alt="User Avatar"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Embark on an exciting journey into predictive analytics, where you can unravel the mysteries
                            of the future with our cutting-edge forecasting tools. Just like crafting the perfect
                            paella, make informed decisions, and stay ahead of the curve.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="delete account" onClick={handleOnDelete}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="edit user" onClick={() => navigate("/edit")}>
                            <EditIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
                {response && response?.isError
                    && <Grid item xs={12}>
                        <Alert severity="error">{response?.message || response}</Alert>
                    </Grid>}
            </Grid>
        </MainCard>
    )
}

export default UserProfile;
