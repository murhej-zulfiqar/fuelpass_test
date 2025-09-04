"use client"
import Typography from "@mui/material/Typography";
import {Order} from "@/interfaces/orders";
import moment from "moment/moment";
import {Column} from "@/interfaces/common";

/**
 * define the columns of the orders table
 * field should be matched with data from backend
 * label to render the header of the column
 * render to render the value of the cell
 */
export const OrderTableColumns: Column<Order>[] = [

    {
        field: 'icao',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Airport ICAO </Typography>,
        render: ( {icao}:Order) => <Typography>{icao} </Typography>
    },
    {
        field: 'tailNumber',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Tail Number </Typography>,
        render: ( {tailNumber}:Order) => <Typography>{tailNumber} </Typography>
    },
    {
        field: 'requestedVolume',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Requested Volume</Typography>,
        render: ( {requestedVolume}:Order) => <Typography>{requestedVolume.toFixed(1)} </Typography>
    },
    {
        field: 'startDate',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Requested From </Typography>,
        render: ( {startDate}:Order) => <Typography>{moment(startDate).format("YYYY-MM-DD")} </Typography>
    },
    {
        field: 'endDate',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Requested To </Typography>,
        render: ( {endDate}:Order) => <Typography>{moment(endDate).format("YYYY-MM-DD")} </Typography>
    },
    {
        field: 'createdAt',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Requested At </Typography>,
        render: ( {createdAt}:Order) => <Typography>{moment(createdAt).format("YYYY-MM-DD")} </Typography>
    },
    {
        field: 'user',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Requested by </Typography>,
        render: ( {user}:Order) => <Typography>{user?.username} </Typography>
    },
    {
        field: 'status',
        hidden: false,
        label: ()=> <Typography variant="h6" fontWeight="bold">Status </Typography>,
        render: ( {status}:Order) => <Typography>{status} </Typography>
    },
]