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
    Typography,
    Button,
    LinearProgress,
    Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import MainCard from 'components/MainCard';
import {red} from "@ant-design/colors";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {diseaseService} from "../../services";

const formatDate = (date) => {
    date = date ? new Date(date) : new Date();
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

const PredictionResult = ({diseaseName, predictionResult, photo}) => {
    const user = useAuth().getUser();
    const navigate = useNavigate();

    const [analyse, setAnalyse] = useState();
    const [clicked, setClicked] = useState(false);
    const [clickedHistory, setClickedHistory] = useState(false);
    const [diseaseHistory, setDiseaseHistory] = useState();

    const handleOnAnalyse = async () => {
        try {
            setClicked(true);
            const {data} = await diseaseService.analyse(diseaseName);
            setAnalyse(data.analyse);
        } catch (e) {
            console.log(e);
        } finally {
            setClicked(false);
        }
    }

    const handleOnHistory = async () => {
        try {
            if (!clickedHistory) {
                const {data} = await diseaseService.getDiseaseHistory(user._id);
                setDiseaseHistory(data.diseasesHistory);
                console.log(data)
            }
            setClickedHistory(!clickedHistory);
        } catch (e) {
            console.log(e);
        }
    }

    const isNumber = (value) => {
        return /^\d+$/.test(value);
    }

    return (
        <MainCard title={`${diseaseName} prediction result`}>
            <Grid container justifyContent="center" alignItems="center">
                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        avatar={
                            <Avatar src={user?.avatar} sx={{bgcolor: red[500]}} aria-label="recipe"/>
                        }
                        title={`${user?.firstname} ${user?.lastname}`}
                        subheader={formatDate()}
                    />
                    <CardMedia
                        component="img"
                        image={photo}
                        alt={diseaseName}
                    />
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            Your prediction of {diseaseName} disease is
                            {isNumber(predictionResult.prediction) ?
                                +predictionResult.prediction === 0 ? " you are healthy" : " unfortunate news."
                             : ` ${predictionResult.prediction}`}
                        </Typography>
                        {(clicked && !analyse) && <LinearProgress/>}
                        {analyse &&
                            <Typography variant="body2" color="text.secondary">
                                {analyse}
                            </Typography>}

                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="home" onClick={() => navigate("/")}>
                            <HomeIcon/>
                        </IconButton>
                        <Button type="submit" variant="contained" onClick={handleOnAnalyse}>Analyse</Button>
                        <IconButton aria-label="disease history" onClick={handleOnHistory}>
                            <ArrowDropDownCircleIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <br/>
            {clickedHistory && diseaseHistory.length > 0 &&  diseaseHistory.map(disease => (
                <>
                    <Divider/>
                <Grid container justifyContent="center" alignItems="center" key={disease._id} >
                    <Card sx={{maxWidth: 345}}>
                        <CardHeader
                            avatar={
                                <Avatar src={user?.avatar} sx={{bgcolor: red[500]}} aria-label="recipe"/>
                            }
                            title={`${user?.firstname} ${user?.lastname}`}
                            subheader={formatDate(disease.createdAt)}
                        />
                        <CardMedia
                            component="img"
                            image={disease.diseaseId.photo}
                            alt={disease.diseaseId.name}
                        />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                Your prediction of {disease.diseaseId.name} disease is
                                {disease.prediction === 0 ? " you are healthy" : " unfortunate news."}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <br/>
                </>
            ))}

        </MainCard>
    )
}

export default PredictionResult;
