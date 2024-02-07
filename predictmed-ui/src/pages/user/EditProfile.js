import {
    Alert, Box,
    Button, FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack, Typography,
} from '@mui/material';

import MainCard from 'components/MainCard';
import {Formik} from "formik";
import * as Yup from "yup";
import AnimateButton from "../../components/@extended/AnimateButton";
import {useEffect, useState} from "react";
import {authService, userService} from "../../services";
import {handleResponse} from "../../helpers";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import UserAvatar from "../../components/UserAvatar";
import {strengthColor, strengthIndicator} from "../../utils/password-strength";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

const EditProfile = () => {
    const [response, setResponse] = useState("");
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const {getUser, userLogout} = useAuth();
    const user = getUser();
    const [image, setImage] = useState(user?.avatar);

    const saveImage = (image) => {
        setImage(image);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const handleSubmit = async (values) => {
        const {firstname, lastname, password} = values;

        try {
            const responseData = await userService.updateUser(user?._id, {
                firstname, lastname, password, avatar: image
            });
            setResponse(handleResponse(responseData));
        } catch (e) {
            setResponse(handleResponse(e));
        }

    }

    useEffect(() => {
        changePassword("");
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        if(response && !response?.isError) {
            userLogout();
            navigate("/login")
        }
    }, [response?.isError]);


    return (
        <MainCard title="User Profile">
            <Formik
                initialValues={{
                    firstname: user?.firstname,
                    lastname: user?.lastname,
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    try {
                        setStatus({success: false});
                        setSubmitting(false);
                        await handleSubmit(values);
                    } catch (err) {
                        console.error(err);
                        setStatus({success: false});
                        setErrors({submit: err.message});
                        setSubmitting(false);
                    }
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">First Name</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.firstname && errors.firstname)}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="image-change">Avatar</InputLabel>
                                    <UserAvatar saveImage={saveImage}/>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{mt: 2}}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{
                                                bgcolor: level?.color,
                                                width: 85,
                                                height: 8,
                                                borderRadius: '7px'
                                            }}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>

                            {(errors.submit) && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                </Stack>
                            </Grid>

                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item xs={3}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Update Account
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                </Stack>
                            </Grid>

                            {response && response?.isError
                                && <Grid item xs={12}>
                                    <Alert severity="error">{response?.message || response}</Alert>
                                </Grid>}

                            {response && !response?.isError
                                && <Grid item xs={12}>
                                    <Alert severity="success">{response?.message}</Alert>
                                </Grid>}
                        </Grid>
                    </form>
                )}
            </Formik>
        </MainCard>
    )
}

export default EditProfile;
