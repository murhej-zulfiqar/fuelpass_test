"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import EnhancedTable from "@/components/molecules/Table";
import {Order} from "@/interfaces/orders";
import {OrderTableColumns} from "@/components/organisms/Orders/columns";
import {useAuth} from "@/hooks/useAuth";

const data: Order[] =[
    {
        icao: 'DXB',
        status: "PENDING",
        id: "",
        createdAt: 1234,
        createdBy: {username: "", id: "", role: ""},
        endDate: 13213,
        startDate: 12313,
        requestedVolume: 23,
        tailNumber: "12313",
        updatedAt: 12313,
    },
    {
        icao: 'DAM',
        status: "COMPLETED",
        id: "",
        createdAt: 1234,
        createdBy: {username: "", id: "", role: ""},
        endDate: 13213,
        startDate: 12313,
        requestedVolume: 23,
        tailNumber: "12313",
        updatedAt: 12313,
    }

    ]
export default function Orders() {
    useAuth("operations_manager");
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <EnhancedTable data={data} columns={OrderTableColumns} actions={[]} tableTitle="Orders" sortable />
        </Paper>
    );
}

