import * as React from "react";
import {JwtPayload} from "jwt-decode";
import {Order} from "@/interfaces/orders";
import {JSX} from "react";

export type UrlData  = {
    params?: { [key: string]: string };
    query?: string | string[][] | Record<string, string> | URLSearchParams | undefined;
}


export type FormObject = {
    fieldName: string,
    fieldLabel: string,
    fieldType: string,
    validation: {
        required: boolean,
        minValue?: number,
        maxValue?: number,
        maxLength?: number,
        minLength?: number,
        length?: number,

    }
}


export interface BasicRow{
    id: string,
}
export type DataRow =  {
    [key: string]: number | string | boolean | null | undefined | unknown;
}

export interface Action {
    render: (dataRow: DataRow) => React.ReactNode;
}

export interface Column<T extends DataRow> {
    field: string;
    label: () => React.ReactNode;
    hidden?: boolean;
    render: (dataRow: T) => React.ReactNode;
}

export interface Filter {
    field: string;
    render: () => React.ReactNode;
}

export type TableOrderType = 'asc' | 'desc';

export interface Token extends JwtPayload {
    id: string;
    role: {
        id: string;
        name: string;
        canonicalName: string;
    };

}

export type OrderTableFilter = (
    orders: Order[],
    value: { [key: string]: string },
    handleChange: (data: unknown) => void
) => {
    field: string;
    render: () => JSX.Element;
};