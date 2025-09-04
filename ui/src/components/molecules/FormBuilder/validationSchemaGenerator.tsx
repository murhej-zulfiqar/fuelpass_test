import * as Yup from 'yup';
import {FormObject} from "@/interfaces/common";
import {FieldType} from "@/constants";

/**
 * A function to generate the validation schema for the form depending on the json object
 *
 * @param formObjects
 */
export const generateValidationSchema =  (formObjects: FormObject[]) => {
    const shape: Record<string, Yup.StringSchema | Yup.NumberSchema> =  {}
    formObjects.forEach((formObject) => {
        let validator: Yup.NumberSchema | Yup.StringSchema
        switch (formObject.fieldType){
            case FieldType.NUMBER:
                validator = Yup.number()
                break;
            default:
                validator = Yup.string()
        }
        Object.keys(formObject.validation).forEach((validation) => {

            switch (validation) {
                case "length":
                    if(validator instanceof Yup.StringSchema)
                        validator = validator.transform(value => value?.trim()).length(parseInt(formObject.validation[validation]?.toString() as string, 10) , `${formObject.fieldLabel} must contains ${formObject.validation[validation]} characters`)
                    break;
                case "minLength":
                    if(validator instanceof Yup.StringSchema)
                        validator = validator.min(parseInt(formObject.validation[validation]?.toString() as string, 10) , `${formObject.fieldLabel} must contains at least ${formObject.validation[validation]} characters`)
                    break;
                case "maxLength":
                    if(validator instanceof Yup.StringSchema)
                        validator = validator.max(parseInt(formObject.validation[validation]?.toString() as string, 10) , `${formObject.fieldLabel} must contains at most ${formObject.validation[validation]} characters`)
                    break;
                case "minValue":
                    validator = validator.min(parseInt(formObject.validation[validation]?.toString() as string, 10) , `${formObject.fieldLabel} minimum value is ${formObject.validation[validation]}`)
                    break;
                case "maxValue":
                    validator = validator.max(parseInt(formObject.validation[validation]?.toString() as string, 10) , `${formObject.fieldLabel} maximum value is ${formObject.validation[validation]}`)
                    break;
            }
            if(validation === "required"){
                if(formObject.validation[validation]){
                    validator = validator.required(`${formObject.fieldLabel} is required`)
                }
            }

        })
        shape[formObject.fieldName] = validator;
    })
    return Yup.object().shape(shape);
}