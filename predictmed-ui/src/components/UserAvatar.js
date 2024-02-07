import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, Paper} from '@mui/material';

import {useAuth} from "../hooks/useAuth";
import {AVATAR_URL} from "../configs";

const UserAvatar = ({saveImage}) => {
    const [state, setState] = useState({
        username: '',
        avatar: '',
        originalAvatar: '',
        imageLoading: false
    });

    const {getUser} = useAuth();

    useEffect(() => {
        const {avatar} = getUser();

        setState((prevState) =>
            ({...prevState, avatar, originalAvatar: avatar}));
    }, []);

    const handleShuffle = () => {
        setState((prevState) => ({...prevState, imageLoading: true}));
        const avatar = Math.floor(Math.random() * 1000) + 1;

        setState((prevState) => ({...prevState, avatar}));
    };

    const handleImageLoad = () => {
        setState((prevState) => ({...prevState, imageLoading: false}));
    };

    const handleSave = (avatarURL) => {
        saveImage(avatarURL);
    }

    const {avatar, imageLoading} = state;

    const avatarImage = !avatar ? <></> :
        <img src={`${AVATAR_URL}${avatar}`} onLoad={handleImageLoad} alt='user-avatar'/>;

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <Paper sx={{p: 3, width: 330}}>
                        <div style={{height: 300}}>
                            {avatarImage}
                        </div>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <Button fullWidth onClick={handleShuffle} size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={imageLoading}>
                                    Shuffle
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleSave(avatarImage.props.src)
                                        }
                                        }>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserAvatar;