import * as Yup from 'yup';
import {FormObject} from "@/interfaces/common";
import {FieldType} from "@/constants";

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
            if(validation === "minLength" || validation === "minValue"){
                validator = validator.min(formObject.validation[validation] as number, "Min value ")
            }
            else if(validation === "maxLength" ||  validation === "maxValue"){
                validator = validator.max(formObject.validation[validation] as number, "Max value ")
            }
            else if(validation === "required"){
                if(formObject.validation[validation]){
                    validator = validator.required("This field is required")
                }
            }

        })
        shape[formObject.fieldName] = validator;
    })
    return Yup.object().shape(shape);
}