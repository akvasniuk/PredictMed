import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Reaptcha from 'reaptcha';

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Alert
} from '@mui/material';

import * as Yup from 'yup';
import {Formik} from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';
import {strengthColor, strengthIndicator} from 'utils/password-strength';
import {authService} from "../../../services";
import {handleResponse} from "../../../helpers";

import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import UserAvatar from "../../../components/UserAvatar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import {REACT_APP_SITEKEY} from "../../../configs";

const AuthRegister = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [response, setResponse] = useState("");
    const [image, setImage] = useState();
    const [chooseAvatar, setChooseAvatar] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [isVerify, setIsVerify] = useState(false);

    const captchaRef = useRef();

    const verify = () => {
        captchaRef.current.getResponse().then(res => {
            setIsVerify(true);
        })
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
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
        const {email, password, firstname, lastname, avatar} = values;

        try {
            let responseData;
            if(chooseAvatar && selectedFile){
                const formData = new FormData();
                formData.append("avatar", avatar);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('firstname', firstname);
                formData.append('lastname', lastname);
                responseData = await authService.register(formData);
            }else if(!chooseAvatar) {
                responseData = await authService.register({
                    email, password, firstname, lastname, avatar: image
                });
            }

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
        let time;

        if (response && !response?.isError) {
            time = setTimeout(() => {
                navigate("/login");
            }, 5000)
        }

        return () => {
            clearTimeout(time);
        }
    }, [response?.isError]);

    return (
        <>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    company: "",
                    avatar: null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required').test('is-strong-password', 'Password level must be good or above',
                        function (value) {
                            const temp = strengthIndicator(value ?? 0);
                            const passwordLevel = strengthColor(temp);
                            return passwordLevel?.label === 'Good' || passwordLevel?.label === 'Strong';
                        }),
                    avatar: Yup.mixed()
                        .test('fileFormat', 'Only images are allowed', value => {
                            if (value) {
                                const supportedFormats = ['jpeg', 'png', 'gif'];
                                return supportedFormats.includes(value.name.split('.').pop());
                            }
                            return true;
                        })
                        .test('fileSize', 'File size must be less than 1GB', value => {
                            if (value) {
                                return value.size <= 1073741824; // 1GB in bytes
                            }
                            return true
                        })
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
                                    <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
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
                                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
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
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid container spacing={2} sx={{marginTop: 2}}>
                                <Grid item xs={6}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setChooseAvatar(false)}
                                    >
                                        Choose Avatar
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setChooseAvatar(true)}
                                    >
                                        Upload Avatar
                                    </Button>
                                </Grid>
                            </Grid>
                            {!chooseAvatar && <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="image-change">Avatar</InputLabel>
                                    <UserAvatar saveImage={saveImage}/>
                                </Stack>
                            </Grid>
                            }
                            {
                                chooseAvatar &&
                                <div style={{"marginTop": "15px"}}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon/>}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput type="file"
                                                             id={`body--coreSheet2--avatar`}
                                                             name="avatar"
                                                             onChange={(e) => {
                                                                 handleFileChange(e);
                                                                 const file = e.target.files[0];
                                                                 handleChange({
                                                                     target: {
                                                                         name: "avatar",
                                                                         value: file
                                                                     }
                                                                 });
                                                             }}/>
                                    </Button>
                                    {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                                </div>
                            }

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
                            <div style={{"margin": "0 auto", "marginTop": "15px"}}>
                                <Reaptcha ref={captchaRef} sitekey={REACT_APP_SITEKEY} onVerify={verify}></Reaptcha>
                            </div>

                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting || !isVerify} fullWidth size="large"
                                            type="submit" variant="contained" color="primary">
                                        Create Account
                                    </Button>
                                </AnimateButton>
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
        </>
    );
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default AuthRegister;
