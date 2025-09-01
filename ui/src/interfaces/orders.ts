import {FieldType, OrderStatus} from "@/constants";
import {User} from "@/interfaces/users";
import {BasicRow} from "@/components/molecules/Table";

export type OrderStatusKeys = keyof typeof OrderStatus;

export interface OrderBasicInfo  {
    icao: string,
    tailNumber: string,
    startDate: number,
    endDate: number,
    requestedVolume:  number
}

export interface Order extends  OrderBasicInfo, BasicRow{
    id: string,
    createdAt: number,
    updatedAt: number,
    status: OrderStatusKeys,
    createdBy: Omit<User,"password" | "token">,
}

export type UpdateOrderRequest = {
    id: string,
    status: OrderStatusKeys,
}

export type RequestFormFieldType = {
    fieldLabel: string,
    fieldType: keyof typeof FieldType,
    validation: {
        required: boolean,
        length?: number,
        maxValue?: number,
        minValue?: number,
        maxLength?: number,
        minLength?: number,
    },
    fieldName: string,
}