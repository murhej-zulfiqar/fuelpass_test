"use client"
import {Column} from "@/components/molecules/Table";
import Typography from "@mui/material/Typography";
import {Order} from "@/interfaces/orders";


export const OrderTableColumns: Column<Order>[] = [

    {
        field: 'icao',
        hidden: false,
        label: ()=> <Typography>Airport ICAO </Typography>,
        render: ( {icao}:Order) => <Typography>{icao} </Typography>
    },
    {
        field: 'status',
        hidden: false,
        label: ()=> <Typography>Status </Typography>,
        render: ( {status}:Order) => <Typography>{status} </Typography>
    },
]