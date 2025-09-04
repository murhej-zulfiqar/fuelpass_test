"use client"
import FormBuilder from "@/components/molecules/FormBuilder";
import {generateValidationSchema} from "@/components/molecules/FormBuilder/validationSchemaGenerator";
import {useOrder, useRequestForm} from "@/hooks/orderHooks";
import {FormikValues} from "formik";
import {useAuth} from "@/hooks/useAuth";
import {BasicRoles} from "@/constants";
import {OrderBasicInfo} from "@/interfaces/orders";
import * as React from "react";
import SkeletonLoader from "@/components/molecules/SkeletonLoader";
import {showToast} from "@/utils/toasts";

/**
 * A component to render the form for requesting fuel
 * @constructor
 */
const RequestFuel: React.FC = () => {

   useAuth(BasicRoles.AIRCRAFT_OPERATOR)

    const order =  useOrder()
    const requestForm = useRequestForm()
    if(requestForm.isLoading || order.isPending) {
        return  <SkeletonLoader />
    }

    if(requestForm.isError) {
        const message = requestForm.error.message || "Failed to update order";
        showToast(message,"error");
        console.error(requestForm.error)
        return null
    }


    if(requestForm.isSuccess && requestForm.data !== undefined){
        const validationSchema = generateValidationSchema(requestForm.data.data || [])
        const submitRequest =  (values: FormikValues) => {
            order.mutate(values as OrderBasicInfo)
        }
        return <FormBuilder formObject={requestForm.data.data || []} onSubmit={submitRequest} formTitle='Request Fuel' validationSchema={validationSchema}/>
    }
    return null

}
export default RequestFuel



