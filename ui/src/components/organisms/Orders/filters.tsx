"use client"
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Order} from "@/interfaces/orders";
import * as React from "react";
import {OrderTableFilter} from "@/interfaces/common";


/**
 * define the filters of the table
 * each filter contains of value , callback, data to define its behaviour
 *
 * field is column to filter
 * render is to render the filter
 */
export const orderTableFilters = (): OrderTableFilter[] =>  [ (orders: Order[],
                                           value: {[key: string]: string},
                                           handleChange: (data: unknown) => void ) => {
    const options = [...new Set(orders.map( ( item: Order ) => item.icao))]
    return {
        field: 'icao',
        render: () => <FormControl key={"icao"} fullWidth sx={{m: 1, minWidth: 120}}>
            <InputLabel id="icao_filter">Airport ICAO</InputLabel>
            <Select
                name="icao"
                id="demo-simple-select-helper"
                value={value['icao']}
                label="Age"
                fullWidth
                onChange={handleChange}
            >
                {options.map((option, index) => <MenuItem key={`option-${index.toString()}`} value={option}>{option.toUpperCase()}</MenuItem>)}
            </Select>
        </FormControl>
    }
}
]