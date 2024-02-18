import React, {useEffect, useState} from "react";

import Graph from "./Graph";
import {useAuth} from "../../hooks/useAuth";

import {
    Grid,
    Container,
    Modal,
    Stack,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Button
} from '@mui/material';
import AppWidgetSummary from "./WidgetSummary";
import * as Yup from "yup";
import AnimateButton from "../../components/@extended/AnimateButton";
import {Formik} from "formik";
import {userService} from "../../services";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const HealthTracker = () => {
    const user = useAuth().getUser();
    const username = `${user.firstname} ${user.lastname}`;
    const [fitnessData, setFitnessData] = useState();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUserHealth = async () => {
        try {
            const { data } = await userService.getUserHealth(user._id);
            setFitnessData(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async (values) => {
        try {
            await userService.createUserHealth(user._id, values);
            handleClose();
            await getUserHealth();
        }catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUserHealth();
    }, []);

    const chartLabels = fitnessData?.latestSevenDays.map((data) => {
        const date = new Date(data.createdAt);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    });

    const chartDataStepCount = [
        {
            name: username,
            type: 'column',
            fill: 'solid',
            data: fitnessData?.latestSevenDays.map((data) => data.stepCount),
        },
    ];

    const chartDataGlucoseLevel = [
        {
            name: username,
            type: 'column',
            fill: 'solid',
            data: fitnessData?.latestSevenDays.map((data) => data.glucoseLevel),
        },
    ];

    const chartDataBodyFat = [
        {
            name: username,
            type: 'column',
            fill: 'solid',
            data: fitnessData?.latestSevenDays.map((data) => data.bodyFat),
        },
    ];


    return (
        <>
            <Modal open={open}
                   onClose={handleClose}
            >
                <Formik
                    initialValues={{
                        glucoseLevel: '',
                        height: '',
                        weight: '',
                        bloodPressure: '',
                        stepCount: "",
                        heartRate: "",
                        bodyFat: ""
                    }}
                    validationSchema={Yup.object().shape({
                        glucoseLevel: Yup.number().max(200).min(10).required('Glucose level is required'),
                        height: Yup.number().max(260).min(50).required('Height is required'),
                        weight: Yup.number().max(300).min(20).required('Weight is required'),
                        bloodPressure: Yup.string()
                            .test(
                                'isValidBloodPressure',
                                'Invalid blood pressure format. Use the format "120/80".',
                                (value) => {
                                    if (!value) {
                                        return false;
                                    }

                                    const regex = /^\d{2,3}\/\d{2,3}$/;
                                    return regex.test(value);
                                }
                            )
                            .required('Blood Pressure is required'),
                        stepCount: Yup.number().max(255).min(0).required('Step count is required'),
                        heartRate: Yup.number().min(10).max(300).required('Heart rate is required'),
                        bodyFat: Yup.number().min(10).max(300).required('Body fat is required'),
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
                            <Grid container spacing={3} sx={style}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="glucoseLevel">Glucose Level*</InputLabel>
                                        <OutlinedInput
                                            id="glucoseLevel"
                                            type="glucoseLevel"
                                            value={values.glucoseLevel}
                                            name="glucoseLevel"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter glucose Level"
                                            fullWidth
                                            error={Boolean(touched.glucoseLevel && errors.glucoseLevel)}
                                        />
                                        {touched.glucoseLevel && errors.glucoseLevel && (
                                            <FormHelperText error id="helper-text-glucoseLevel">
                                                {errors.glucoseLevel}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="lastname-signup">Height*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.height && errors.height)}
                                            id="height-signup"
                                            type="height"
                                            value={values.height}
                                            name="height"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter height"
                                            inputProps={{}}
                                        />
                                        {touched.height && errors.height && (
                                            <FormHelperText error id="helper-text-height">
                                                {errors.height}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="weight">Weight*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.weight && errors.weight)}
                                            id="weight"
                                            type="weight"
                                            value={values.weight}
                                            name="weight"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter weight"
                                        />
                                        {touched.weight && errors.weight && (
                                            <FormHelperText error id="helper-text-weight-signup">
                                                {errors.weight}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="bloodPressure">Blood Pressure*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.bloodPressure && errors.bloodPressure)}
                                            id="bloodPressure"
                                            type="bloodPressure"
                                            value={values.bloodPressure}
                                            name="bloodPressure"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter blood pressure"
                                        />
                                        {touched.bloodPressure && errors.bloodPressure && (
                                            <FormHelperText error id="helper-text-bloodPressure">
                                                {errors.bloodPressure}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="stepCount">Step count*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.stepCount && errors.stepCount)}
                                            id="stepCount"
                                            type="stepCount"
                                            value={values.stepCount}
                                            name="stepCount"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter step count"
                                        />
                                        {touched.stepCount && errors.stepCount && (
                                            <FormHelperText error id="helper-text-stepCount">
                                                {errors.stepCount}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="heartRate">Heart rate*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.heartRate && errors.heartRate)}
                                            id="heartRate"
                                            type="heartRate"
                                            value={values.heartRate}
                                            name="heartRate"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter heart rate"
                                        />
                                        {touched.heartRate && errors.heartRate && (
                                            <FormHelperText error id="helper-text-heartRate">
                                                {errors.heartRate}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="bodyFat">Body fat*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.bodyFat && errors.bodyFat)}
                                            id="bodyFat"
                                            type="bodyFat"
                                            value={values.bodyFat}
                                            name="bodyFat"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter body fat"
                                        />
                                        {touched.bodyFat && errors.bodyFat && (
                                            <FormHelperText error id="helper-text-bodyFat">
                                                {errors.bodyFat}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={6}>
                                    <AnimateButton md={6}>
                                        <Button disableElevation disabled={isSubmitting} fullWidth size="large"
                                                type="submit" variant="contained" color="primary">
                                            Create health data
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={3}>
                                    <AnimateButton md={6}>
                                        <Button disableElevation onClick={handleClose} fullWidth size="large"
                                                variant="contained" color="primary">
                                            Close modal
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Modal>

            <Container maxWidth="xl">
                <Button disableElevation onClick={handleOpen} fullWidth size="large "
                        variant="contained" color="primary" style={{width: '190px', marginBottom: '30px'}}>
                    Create health record
                </Button>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Height" total={fitnessData && `${fitnessData.latestUserHealth.height} cm`} icon={'game-icons:body-height'}/>
                    </Grid>


                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Weight" total={fitnessData && `${fitnessData.latestUserHealth.weight} kg`} color="info"
                                          icon={'fa6-solid:weight-scale'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Blood Pressure" total={fitnessData && `${fitnessData.latestUserHealth.bloodPressure} mmHg`} color="warning"
                                          icon={'material-symbols:blood-pressure-sharp'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Step Count" total={fitnessData && `${fitnessData.latestUserHealth.stepCount}`} color="error" icon={'material-symbols:steps'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Heart Rate" total={fitnessData && `${fitnessData.latestUserHealth.heartRate} bpm`} color="error"
                                          icon={'streamline:heart-rate-pulse-graph-solid'}/>
                    </Grid>
                </Grid>
                <br/>
                <Grid item xs={12} md={6} lg={8}>
                    {fitnessData && <Graph
                        title="Activity Step Count"
                        chartLabels={chartLabels}
                        chartData={chartDataStepCount}
                        format="Step Count"
                    />}

                </Grid>
                <br/>
                <Grid item xs={12} md={6} lg={8}>
                    {
                        fitnessData && <Graph
                            title="Activity Glucose Level"
                            chartLabels={chartLabels}
                            chartData={chartDataGlucoseLevel}
                            format="Glucose level"
                        />
                    }
                </Grid>
                <br/>
                <Grid item xs={12} md={6} lg={8}>
                    {fitnessData &&
                        <Graph
                            title="Activity Body Fat"
                            chartLabels={chartLabels}
                            chartData={chartDataBodyFat}
                            format="Body fat"
                        />
                    }
                </Grid>
            </Container>
        </>
    );
};

export default HealthTracker;