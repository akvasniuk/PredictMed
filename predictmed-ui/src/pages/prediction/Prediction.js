import {useParams} from "react-router-dom";
import FormSheet from "../../components/forms/FormSheet";
import {useEffect, useState} from "react";
import {diseaseService} from "../../services";

const Prediction = ({setResultPage}) => {
    const {predictionId} = useParams();
    const [disease, setDisease] = useState()

    useEffect(() => {
        const getDisease = async () => {
            try {
                const {data} = await diseaseService.getDisease(predictionId);
                setDisease(data.disease);
            }catch (e){
                console.log(e);
            }
        }
        getDisease();

    }, [predictionId]);

    return (
        <>
            {disease && <FormSheet disease={disease} setResultPage={setResultPage}/>}
        </>
    )
}

export default Prediction;