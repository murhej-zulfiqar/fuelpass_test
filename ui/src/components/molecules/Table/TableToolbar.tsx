import {DataRow, OrderTableFilter} from "@/interfaces/common";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Grid} from "@mui/material";
import {Order} from "@/interfaces/orders";

interface TableToolbarProps {
    tableTitle: string;
    filters: ()=>OrderTableFilter[];
    filterData: {[key: string]: string};
    setFilterData: (date: React.ChangeEvent<HTMLInputElement> ) => void;
    data: DataRow[];
}

/**
 * a component to render the toolbar for the table which contains the Title and the filters
 *
 * the filters object is an array of functions each function represent a filter and pass its data to a specific function to render
 * @param tableTitle
 * @param filters
 * @param filterData
 * @param setFilterData
 * @param data
 * @constructor
 */
function TableToolbar({tableTitle,filters, filterData,setFilterData,data}: Readonly<TableToolbarProps>) {
    return (
        <Toolbar
            sx={[
                {
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                    width: '100%'
                },
            ]}
        >
            <Typography
                sx={{flex: '1 1 80%'}}
                variant="h4"
                fontWeight="bold"
                id="tableTitle"
                component="div"
            >
                {tableTitle}
            </Typography>
            <Grid container spacing={2}>
                <Grid size={12}>
                    {filters().map((filter) => (
                        /* I used ts-ignore here because of the complexity of the filter object and the setFilterData */
                        // eslint-disable-next-line
                        // @ts-ignore
                        filter(data as Order[], filterData, setFilterData ).render()
                    ))

                    }
                </Grid>
            </Grid>

        </Toolbar>
    );
}

export default TableToolbar