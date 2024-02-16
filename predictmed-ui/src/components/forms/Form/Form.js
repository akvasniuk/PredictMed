import * as Yup from "yup";
import {Formik} from "formik";

import IconButton from "@mui/material/IconButton";
import {InfoCircleOutlined} from "@ant-design/icons"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import "./Form.scss";
import {FormHelperText, InputLabel, OutlinedInput} from "@mui/material";
import "./SubmitButton.scss";
import {useState} from "react";
import { diseaseService} from "../../../services";
import {useAuth} from "../../../hooks/useAuth";
import styled from "styled-components";

const Form = ({fields, name: diseaseName, setResultPage, photo, id}) => {
    const [name, setName] = useState(null);
    const user = useAuth().getUser();
    const [selectedFile, setSelectedFile] = useState(undefined);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleIconClick = (clickedName) => {

        if (clickedName === name) {
            setName(null);
        } else {
            setName(clickedName);
        }
    }

    const handleSubmit = async (values) => {
        try {
            let prediction;
            if(selectedFile){
                const formData = new FormData();
                formData.append("file", values.file);
                prediction = await diseaseService.predictDiseasePhoto(diseaseName, formData);
            }else{
                prediction = await diseaseService.predictDisease(diseaseName, values);
            }
            await diseaseService.createDiseaseHistory(user._id, id, prediction.data);
            setResultPage(prediction.data, diseaseName, photo);
            console.log(values)
        } catch (e) {
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
            } else if (field.dataType === "file") {
                schema[field.fieldName] = Yup.mixed()
                    .required(`${field.fieldName} is required`)
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
            } else {
                schema[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
            }

            return schema;
        }, {})
    )

    return (
        <div>
            <Formik
                initialValues={fields.reduce((initialValues, field) => {
                    initialValues[field.fieldName] = null;
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
                {({errors, handleBlur, handleChange, handleSubmit, touched, values}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <div key={field.fieldName} className="body--coreSheet2">
                                <div>
                                    {name === field.name ? <p>{field.description}</p> : null}
                                    <div>
                                        <InputLabel htmlFor={field.fieldName}>{`${field.name}*`}
                                            <IconButton
                                                onClick={() => handleIconClick(field.name)}><InfoCircleOutlined/></IconButton>
                                        </InputLabel>
                                        {field.fieldName === "file" ?
                                            <div>
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon/>}
                                                >
                                                    Upload file
                                                    <VisuallyHiddenInput type="file"
                                                                         id={`body--coreSheet2--${field.fieldName}`}
                                                                         name={field.fieldName}
                                                                         onChange={(e) => {
                                                                             handleFileChange(e);
                                                                             const file = e.target.files[0];
                                                                             handleChange({ target: { name: field.fieldName, value: file } });
                                                                         }}/>
                                                </Button>
                                                {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                                            </div>
                                            : <OutlinedInput
                                                required
                                                id={`body--coreSheet2--${field.fieldName}`}
                                                name={field.fieldName}
                                                defaultValue=""
                                                placeholder={`Your Answer for ${field.name}`}
                                                variant="standard"
                                                fullWidth
                                                onChange={(e) => handleChange(field.fieldName)(e)}
                                            />
                                        }
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
}

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

export default Form;