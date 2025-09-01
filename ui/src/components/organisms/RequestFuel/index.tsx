"use client"
import FormBuilder from "@/components/molecules/FormBuilder";
import {generateValidationSchema} from "@/components/molecules/FormBuilder/validationSchemaGenerator";
import {useOrder, useRequestForm} from "@/hooks/orderHooks";
import {FormikValues} from "formik";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";

const form  = [
    {
        fieldLabel: 'Airport ICAO',
        fieldType: 'string',
        validation: {
            required: true,
            maxLength: 4,
        },
        fieldName: 'icao',
    },
    {
        fieldLabel: 'Tail Number',
        fieldType: 'string',
        validation: {
            required: true,
        },
        fieldName: 'tailNumber',
    },
    {
        fieldLabel: 'Requested Volume',
        fieldType: 'number',
        validation: {
            required: true,
            minValue: 0,
            maxValue: 100,
        },
        fieldName: "requestedVolume",
    },
    {
        fieldLabel: 'Request From',
        fieldType: 'date',
        validation: {
            required: true,
        },
        fieldName: 'startDate',
    },
    {
        fieldLabel: 'Expires At',
        fieldType: 'date',
        validation: {
            required: true,
        },
        fieldName: 'endDate',
    }
]
const RequestFuel: React.FC = ({}) => {

   useAuth("operation_manager")

    const order =  useOrder()
    const requestForm = useRequestForm()
    if(requestForm.isLoading)
        return null

    if(requestForm.isError)
        return null
    if(requestForm.isSuccess && requestForm.data !== undefined && requestForm.data.data !== undefined){
        console.log("sdasdad ", requestForm.data.data)
        const validationSchema = generateValidationSchema(requestForm.data.data || [])


        const submitRequest =  (values: FormikValues) => {
            order.mutate(values)

        }

        return <FormBuilder formObject={requestForm.data.data || []} onSubmit={submitRequest} formTitle='Request Fuel' validationSchema={validationSchema}/>
    }
    return null

}
export default RequestFuel



