import {useState} from "react";
import Prediction from "./Prediction";
import PredictionResult from "./PredictionResult";

const PredictionSteps = () => {
    const [activeStep, setActiveStep] = useState(0);
    let content;
    const [result, setResult] = useState({});

    const setResultPage = (predictionResult, diseaseName, photo) => {
        setActiveStep(1);
        setResult({
            predictionResult,
            diseaseName,
            photo
        });
    }

    switch (activeStep) {
        case 0:
            content = <Prediction setResultPage={setResultPage}/>
            break;
        case 1:
            content = <PredictionResult diseaseName={result.diseaseName}
                                        predictionResult={result.predictionResult}
                                        photo={result.photo}/>
            break;
    }

    return (
        <>
            {content}
        </>
    );
};

export default PredictionSteps;