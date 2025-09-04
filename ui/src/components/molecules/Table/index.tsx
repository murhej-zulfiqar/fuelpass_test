"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Action, Column, DataRow, TableOrderType, OrderTableFilter} from "@/interfaces/common";
import {Grid} from "@mui/material";
import {applyFilters, getComparator} from "@/utils";
import TableHeader from "@/components/molecules/Table/Header";
import TableToolbar from "@/components/molecules/Table/TableToolbar";
import {Order} from "@/interfaces/orders";


interface TableProps {
    data: DataRow[];
    columns: Column<DataRow | Order>[];
    actions: (...args: unknown[]) => Action[];
    sortable?: boolean;
    tableTitle: string;
    filters: () => OrderTableFilter[],
    filteredFields: string[]
}

/**
 * the table component - dynamic for number of columns and filters
 * accepts columns that define the structure of the table and data must be matched with columns
 * actions added to each row depending on its render function
 * filters are passed to the toolbar to filter the data
 *
 * @param data
 * @param columns
 * @param actions
 * @param sortable
 * @param tableTitle
 * @param filters
 * @constructor
 */
export default function FuelpassTable({data, columns, actions, sortable, tableTitle, filters}: Readonly<TableProps>) {
    const [order, setOrder] = React.useState<TableOrderType>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DataRow>('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const state: { [key: string]: string } = {}
    columns.forEach((item) => state[item.field] = '')
    const [filterData, setFilterData] = React.useState<{ [key: string]: string }>(state);


    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({...filterData, [event.target.name]: event.target.value});
    }
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof DataRow,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const visibleRows = React.useMemo(
        () =>
            applyFilters([...data], filterData)
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, data, filterData],
    );


    return (
        <Grid size={12}>

            <TableToolbar tableTitle={tableTitle} filters={filters} filterData={filterData} data={data}  setFilterData={handleFilterChange}/>
            <TableContainer>
                <Table
                    sx={{minWidth: 750}}
                    aria-labelledby="tableTitle"
                >
                    <TableHeader
                        columns={columns}
                        order={order}
                        orderBy={orderBy as string}
                        onRequestSort={handleRequestSort}
                        sortable={sortable}

                    />
                    <TableBody>
                        {visibleRows.map((row, rowIndex) => {
                            const rowActions = actions()
                            const labelId = `table-body-${rowIndex}`;
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={`row-key-${rowIndex.toString()}`}
                                    sx={{cursor: 'pointer'}}
                                >
                                    {columns.map((column, index) => {

                                        if (!column.hidden) {
                                            return (<TableCell
                                                component="td"
                                                id={labelId}
                                                key={`${column.field}-${rowIndex}-${index}`}
                                                scope="row"
                                                sx={{padding: 3}}
                                            >
                                                {column.render(row)}
                                            </TableCell>)
                                        }
                                        return null;
                                    })}
                                    {rowActions.length > 0 &&

                                        rowActions.map((action, index) => (
                                            <TableCell
                                                component="td"
                                                id={labelId}
                                                key={`action-${rowIndex}-${index}`}
                                                scope="row"
                                                sx={{padding: 3}}
                                            >
                                                {action.render(row)}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
    );
}