import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {createOrderApi, fetchOrderRequestFormApi} from "@/api";
import type {AxiosResponse} from "axios";
import {Order, OrderBasicInfo, RequestFormFieldType} from "@/interfaces/orders";

export const useOrder =  () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<Order>, Error, OrderBasicInfo >({
        mutationFn: createOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey :['newOrder']});
        },
    });
}

export const useGetOrders = () => {}

export const  useRequestForm =  () => {
    return useQuery<AxiosResponse<RequestFormFieldType[]>, Error, RequestFormFieldType[] >({
        queryKey :['orderRequestForm'],
        queryFn: fetchOrderRequestFormApi,
    });
}