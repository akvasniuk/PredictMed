import {Disease} from "./Disease/Disease";

import "./Diseases.module.css";

const Diseases = ({diseases}) => {

    return (
        <div>
            {diseases.map(disease => <Disease key={disease.id} disease={disease}/>)}
        </div>
    );
};

export {Diseases};