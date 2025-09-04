import {BasicRow, Column, DataRow, TableOrderType} from "@/interfaces/common";
import * as React from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";



interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataRow) => void;
    order: TableOrderType;
    orderBy: string;
    sortable?: boolean;
    columns: Column<DataRow>[];
}

/**
 * renders the header of the table depending on the columns names and style
 * each column will have a label function to render the header with the appropriate style
 *
 * @param column
 * @param sortBy
 * @param sortDirection
 * @param changeSortHandler
 * @param sortable
 */
const renderTableHeader = (column: Column<DataRow>,
                           sortBy: string,
                           sortDirection: TableOrderType,
                           changeSortHandler: (field: keyof DataRow) => (event: React.MouseEvent<unknown>) => void,
                           sortable?: boolean
) => {

    if (sortable) {
        return <TableSortLabel
            active={sortBy === column.field}
            direction={sortBy === column.field ? sortDirection : 'asc'}
            onClick={changeSortHandler(column.field)}
        >
            {column.label()}
            {sortBy === column.field ? (
                <Box component="span" sx={visuallyHidden}>
                    {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
            ) : null}
        </TableSortLabel>
    }
    return column.label()
}

/**
 * A component uses renderTableHeader to render the columns header
 * add the Action column header if there is any action
 * support the sorting mechanism
 * @param order
 * @param orderBy
 * @param onRequestSort
 * @param columns
 * @param sortable
 * @constructor
 */
function TableHeader({order, orderBy, onRequestSort, columns, sortable}: Readonly<TableHeaderProps>) {
    const createSortHandler =
        (property: keyof DataRow) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    !column.hidden && <TableCell
                        key={column.field}
                        sortDirection={orderBy === column.field ? order : false}
                    >
                        {renderTableHeader(column, orderBy, order, createSortHandler, sortable)}
                    </TableCell>
                ))}
                <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                        Actions
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;