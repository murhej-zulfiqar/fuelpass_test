import {Action, DataRow} from "@/interfaces/common";
import {Order} from "@/interfaces/orders";
import Button from "@mui/material/Button";


const renderActionByStatus =  (order: Order, callback: (order: Order) => void) => {
    switch (order.status){
        case "PENDING":
            return <Button variant="contained" onClick={() => callback(order)}>Confirm</Button>
        case "CONFIRMED":
            return <Button variant="contained" onClick={() => callback(order)}>Complete</Button>
        default: return null;
    }
}

/**
 * A function to define the actions for the orders table
 * the render function will be execution inside the table component to get the action component
 * @param callback
 */
export const getTableActions = (callback: (data: Order) => void ) => {
    const actions: Action[] = []

    actions.push({

        render: (order: DataRow) => renderActionByStatus(order as Order, callback)
    })

    return actions


}