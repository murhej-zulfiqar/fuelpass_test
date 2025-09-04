import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {changeOrderStatusApi, createOrderApi, fetchOrderRequestFormApi, fetchOrdersApi} from "@/api";
import type {AxiosResponse} from "axios";
import {Order, OrderBasicInfo, RequestFormFieldType, UpdateOrderRequest} from "@/interfaces/orders";
import {showToast} from "@/utils/toasts";

/**
 * A hook to create new Order to the database
 */
export const useOrder =  () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<Order>, Error, OrderBasicInfo >({
        mutationFn: createOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey :['ordersList']});
        },
        onError: (error) => {
            const message = error.message || "Failed to create order";
            showToast(message,"error");
            console.log(error);
        }

    });
}

/**
 * A hook to update the status of an order from pending-> confirmed -> completed
 */
export const useUpdateOrder =  () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<Order>, Error, UpdateOrderRequest >({
        mutationFn: changeOrderStatusApi,
        onSuccess: () => {
            showToast("Order updated successfully.");
            queryClient.invalidateQueries({queryKey :['ordersList']});
        },
        onError: (error) => {
            const message = error.message || "Failed to update order";
            showToast(message,"error");
            console.error(error);
        }
    });
}

/**
 * A hook to list all the orders in the database
 */
export const useOrders = () => {

    return useQuery<AxiosResponse<Order[]>, Error, {data: Order[]} >({
        queryKey :['ordersList'],
        queryFn: fetchOrdersApi,
        refetchInterval: false,

    });
}

/**
 * A hook to call an api to generate the request form depending on the database model
 */
export const  useRequestForm =  () => {
    return useQuery<AxiosResponse<RequestFormFieldType[]>, Error, {data: RequestFormFieldType[]} >({
        queryKey :['orderRequestForm'],
        queryFn: fetchOrderRequestFormApi,
        refetchInterval: false
    });
}