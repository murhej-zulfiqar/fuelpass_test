// A Dynamic component to generate form based on json file
import {FormObject} from "@/interfaces/common";
import {Form, Formik, FormikErrors, FormikHelpers, FormikProps, FormikValues} from "formik";
import Typography from "@mui/material/Typography";
import {FormControl, Grid, TextField} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import moment from "moment/moment";
import {DatePicker} from "@mui/x-date-pickers";
import {PickerValue} from "@mui/x-date-pickers/internals";
import {FieldType} from "@/constants";
import {AnyObject, ObjectSchema} from "yup";


/**
 *
 * @param formObject
 * @param setFieldValue
 * @param errors
 * @param value
 *
 * Renders each element of the form depending on its type
 *
 * add errors and changes to the generated components
 *
 */
const renderFormFields = (formObject: FormObject, setFieldValue: (field: string, value: string | PickerValue, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<FormikValues>>, errors: string[] | string, value: object): React.ReactNode => {

    let error = ""
    let hasErrors = false;

    if (errors !== undefined) {
        if (Array.isArray(errors)) {
            error = errors.join(" , ")
            hasErrors = errors.length > 0
        } else {
            error = errors
            hasErrors = errors.length > 0
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
                setFieldValue(formObject.fieldName, moment(value).valueOf().toString())
            }}/>
    }
    return null
}

interface FormBuilderProps {
    formObject: FormObject[];
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    formTitle: string;
    validationSchema: ObjectSchema<{     [x: string]: string | number | undefined; }, AnyObject, {     [x: string]: undefined; }, "">;
}

/**
 *
 * @param formTitle
 * @param formObject
 * @param onSubmit
 * @param validationSchema
 * @constructor
 *
 * A component to render a form depending on a JSON OBJECT using Formik
 *
 * add the validation schema to the form using YUP
 * handle submit form
 */
const FormBuilder: React.FC<FormBuilderProps> = ({
                                                     formTitle,
                                                     formObject,
                                                     onSubmit,
                                                     validationSchema
                                                 }: FormBuilderProps) => {


    /**
     * generate the initial values of the form
     * @param formObjects
     */
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



    return (
        <Formik initialValues={generateInitialValues(formObject)} onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {(formik: FormikProps<FormikValues>) => (
                <Form>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid size={6}>
                            <Grid container spacing={3}>
                                <Typography variant="h4">{formTitle}</Typography>
                                {formObject.map((formObject) =>
                                    <Grid size={12} key={formObject.fieldName}>
                                        <FormControl fullWidth>
                                            {renderFormFields(formObject, formik.setFieldValue,
                                                formik.errors[formObject.fieldName] as string | string[],
                                                formik.values[formObject.fieldName])}
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