"use client"
import * as React from 'react';
import EnhancedTable from "@/components/molecules/Table";
import {Order} from "@/interfaces/orders";
import {OrderTableColumns} from "@/components/organisms/Orders/columns";
import {useAuth} from "@/hooks/useAuth";
import {useOrders, useUpdateOrder} from "@/hooks/orderHooks";
import {Box} from "@mui/material";
import {getTableActions} from "@/components/organisms/Orders/actions";
import {BasicRoles, OrderStatus} from "@/constants";
import {orderTableFilters} from "@/components/organisms/Orders/filters";
import SkeletonLoader from "@/components/molecules/SkeletonLoader";
import {showToast} from "@/utils/toasts";

/**
 * A component to render the data retrieved from the backend
 * and handle update order status
 * @constructor
 */
export default function Orders() {
    useAuth(BasicRoles.OPERATIONS_MANAGER);

    const {data, isError, isLoading, error} = useOrders();

    const updateOrder = useUpdateOrder()

    const updateOrderStatusCallback = ({id, status}:Order) => {

        switch (status) {
            case OrderStatus.PENDING:
                updateOrder.mutate({id, status: "CONFIRMED"})
                break
            case OrderStatus.CONFIRMED:
                updateOrder.mutate({id, status: "COMPLETED"})
                break
        }
    }
    if((isLoading || updateOrder.isPending))
        return <SkeletonLoader />
    if (isError) {
        const message = error.message || "Failed to retrieve orders";
        showToast(message,"error");
        console.error(error)
        return null;
    }
    return (
        <Box sx={{height: 400, width: '100%'}}>
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            {!isLoading && !isError && data && <EnhancedTable data={data.data} filters={orderTableFilters } columns={OrderTableColumns} actions={
                    () => getTableActions(updateOrderStatusCallback) } tableTitle="Orders" sortable/>}
        </Box>
    );
}

