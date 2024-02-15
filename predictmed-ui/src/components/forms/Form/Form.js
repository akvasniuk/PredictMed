import * as Yup from "yup";
import {Formik} from "formik";

import IconButton from "@mui/material/IconButton";
import {InfoCircleOutlined} from "@ant-design/icons"

import "./Form.scss";
import {FormHelperText, InputLabel, OutlinedInput} from "@mui/material";
import Button from "@mui/material/Button";
import "./SubmitButton.scss";
import {useState} from "react";
import {diseaseService} from "../../../services";
import {useAuth} from "../../../hooks/useAuth";

const Form = ({fields, name: diseaseName, setResultPage, photo, id}) => {
    const [name, setName] = useState(null);
    const user = useAuth().getUser();

    const handleIconClick = (clickedName) => {

        if(clickedName === name) {
            setName(null);
        }else{
            setName(clickedName);
        }
    }

    const handleSubmit = async (values) => {
        try {
            const prediction = await diseaseService.predictDisease(diseaseName, values);
            await diseaseService.createDiseaseHistory(user._id, id, prediction.data);
            setResultPage(prediction.data, diseaseName, photo);
        }catch (e){
            console.log(e);
        }
    }

    const validationSchema = Yup.object().shape(
        fields.reduce((schema, field) => {
            if (field.dataType === "number") {
                schema[field.fieldName] = Yup.number()
                    .max(+field.constraints[0].max)
                    .min(+field.constraints[0].min)
                    .required(`${field.name} is required`);
            } else {
                schema[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
            }

            return schema;
        }, {})
    )

    console.log(fields.reduce((schema, field) => {
        if (field.dataType === "number") {
            schema[field.fieldName] = Yup.number()
                .max(+field.constraints[0].max)
                .min(+field.constraints[0].min)
                .required(`${field.fieldName} is required`);
        } else {
            schema[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
        }

        return schema;
    }, {}))

    return (
        <div>
            <Formik
                initialValues={fields.reduce((initialValues, field) => {
                    initialValues[field.fieldName] = "";
                    return initialValues;
                }, {})}
                validationSchema={validationSchema}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    try {
                        await handleSubmit(values);
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit,  touched, values}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <div key={field.fieldName} className="body--coreSheet2">
                                <div>
                                    {name === field.name ? <p>{field.description}</p> : null}
                                    <div>
                                        <InputLabel htmlFor={field.fieldName}>{`${field.name}*`}
                                            <IconButton onClick={() => handleIconClick(field.name)}><InfoCircleOutlined /></IconButton>
                                        </InputLabel>
                                        <OutlinedInput
                                            required
                                            id={`body--coreSheet2--${field.fieldName}`}
                                            name={field.fieldName}
                                            defaultValue=""
                                            placeholder={`Your Answer for ${field.name}`}
                                            variant="standard"
                                            fullWidth
                                            onChange={(e) => handleChange(field.fieldName)(e)}
                                        />
                                        {touched[field.fieldName] && errors[field.fieldName] && (
                                            <FormHelperText error id="helper-text-firstname-signup">
                                                {errors[field.fieldName]}
                                            </FormHelperText>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="formBody">
                            <div className="formBody--Submit">
                                <Button type="submit" variant="contained">Submit</Button>
                            </div>
                            <p className="formBody--info3">Predict <span className="formBody--info4">Forms</span></p>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Form;