import "./FormSheet.scss";
import Form from "./Form/Form";

import {RollbackOutlined} from "@ant-design/icons";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";

const splitAndConcat = (name) => {
    const substrings = name.split(/[^a-zA-Z]/).filter(Boolean);
    return substrings.join(' ').replace(/^(.)/, (match, firstLetter) => firstLetter.toUpperCase())
}

const FormSheet = ({disease, setResultPage}) => {
    const {name, photo, fields, _id: id} = disease;
    const navigate = useNavigate();

    return (
        <div className="body">
            <div className="return">
                <IconButton onClick={() => navigate(-1)}>
                    <RollbackOutlined/>
                </IconButton>
            </div>
            <img src={photo} alt={name} width="100%" />
            <div className="body--coreSheet">
                <h1 className="body--coreSheet--header">
                    {`${splitAndConcat(name)} prediction form`}
                </h1>
            </div>
            <Form fields={fields} name={name} setResultPage={setResultPage} photo={photo} id={id} />
        </div>
    );
};

export default FormSheet;