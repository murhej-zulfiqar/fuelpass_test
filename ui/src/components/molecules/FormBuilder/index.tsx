import {FormObject} from "@/interfaces/common";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps, FormikValues} from "formik";
import Typography from "@mui/material/Typography";
import {FormControl, Grid, TextField} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import * as Yup from 'yup';
import moment from "moment/moment";
import {DatePicker} from "@mui/x-date-pickers";
import {PickerValue} from "@mui/x-date-pickers/internals";
import {FieldType} from "@/constants";


interface FormBuilderProps {
    formObject: FormObject[];
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    formTitle: string;
    validationSchema: Record<string, Yup.StringSchema | Yup.NumberSchema>;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
                                                     formTitle,
                                                     formObject,
                                                     onSubmit,
                                                     validationSchema
                                                 }: FormBuilderProps) => {


    const generateInitialValues = (formObjects: FormObject[]): FormikValues => {
        const initialValues: FormikValues = {}
        formObjects.forEach((formObject: FormObject) => {
            switch (formObject.fieldType) {
                case FieldType.NUMBER:
                    initialValues[formObject.fieldName] = ''
                    break;
                case FieldType.DATE:
                    initialValues[formObject.fieldName] = moment()
                    break;
                default:
                    initialValues[formObject.fieldName] = ''
            }
        })
        return initialValues;
    }

    const renderFormFields = (formObject: FormObject, setFieldValue: (field: string, value: string | PickerValue, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<FormikValues>>, errors: string[] | string, value: object): React.ReactNode => {

        let error = ""
        let hasErrors = false;

        if (errors !== undefined) {
            if (Array.isArray(errors)) {
                error = errors.join(" , ")
                hasErrors = errors.length > 0
            } else {
                error = errors as string
                hasErrors = (errors as string).length > 0
            }
        }
        switch (formObject.fieldType) {
            case FieldType.NUMBER:
                return <TextField variant="outlined" label={formObject.fieldLabel}
                                  fullWidth name={formObject.fieldName}
                                  type="number"
                                  value={value}
                                  onChange={(e) => setFieldValue(formObject.fieldName, e.target.value)}
                                  error={error.length > 0} helperText={error}/>
            case FieldType.TEXT:
                return <TextField value={value} variant="outlined" label={formObject.fieldLabel} fullWidth
                                  name={formObject.fieldName} type="text"
                                  onChange={(e) => setFieldValue(formObject.fieldName, e.target.value)}
                                  error={hasErrors} helperText={error}/>

            case FieldType.DATE:
                return <DatePicker label={formObject.fieldLabel} name={formObject.fieldName} onChange={(value) => {
                    setFieldValue(formObject.fieldName, moment(value).unix())
                }}/>
        }
        return null
    }

    return (
        <Formik initialValues={generateInitialValues(formObject)} onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {(formik: FormikProps<FormikValues>) => (
                <Form>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid size={6}>
                            <Grid container spacing={3} >
                                <Typography variant="h4">{formTitle}</Typography>
                                {formObject.map((formObject) =>
                                    <Grid size={12} key={formObject.fieldName}>
                                        <FormControl fullWidth>
                                            {renderFormFields(formObject, formik.setFieldValue, formik.errors[formObject.fieldName] , formik.values[formObject.fieldName])}
                                        </FormControl>
                                    </Grid>
                                )}
                                <Grid size={8}>
                                    <Button fullWidth variant="contained" type="submit">Request</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default FormBuilder