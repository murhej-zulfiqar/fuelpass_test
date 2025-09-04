// contains the functions that represents the api

import {AxiosResponse} from "axios";
import axios from "@/api/instance"
import {User, LoginRequest} from "@/interfaces/users";
import getRestApi from "@/api/api_urls";
import {Order, OrderBasicInfo, RequestFormFieldType, UpdateOrderRequest} from "@/interfaces/orders";


export const loginApi =(loginRequest: LoginRequest):Promise<AxiosResponse<User>> =>
    axios.post(getRestApi("users", "LOGIN"), {...loginRequest})

export const createOrderApi = (orderRequest: OrderBasicInfo): Promise<AxiosResponse<Order>> =>
    axios.post(getRestApi("orders","CREATE_ORDER"), {...orderRequest})

export const fetchOrdersApi = (): Promise<AxiosResponse<Order[]>> =>
    axios.get(getRestApi("orders","FETCH_ORDERS"))
export const fetchOrderRequestFormApi = (): Promise<AxiosResponse<RequestFormFieldType[]>> =>
    axios.get(getRestApi("orders","FETCH_REQUEST_FORM"))

export const changeOrderStatusApi = (udpateOrderRequest:  UpdateOrderRequest): Promise<AxiosResponse<Order>> =>
    axios.put(getRestApi("orders","CHANGE_ORDER_STATUS",{params: {orderId: udpateOrderRequest.id}}), {status: udpateOrderRequest.status})