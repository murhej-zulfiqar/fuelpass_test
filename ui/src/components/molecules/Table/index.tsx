"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof DataRow>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | boolean | null | undefined },
    b: { [key in Key]: number | string | boolean | null | undefined },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
export interface BasicRow{
    tableRow?: string;
}
type DataRow =  {
    [key: string]: number | string | boolean | null | undefined;
}

interface Action {
    render: (dataRow: DataRow) => React.ReactNode;
}

export interface Column<T extends BasicRow> {
    field: string;
    label: () => React.ReactNode;
    hidden?: boolean;
    render: (dataRow: T) => React.ReactNode;
}

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataRow) => void;
    order: Order;
    orderBy: string;
    sortable?: boolean;
    columns: Column<BasicRow>[];
    hasActions: boolean;
}

const renderTableHeader = (column: Column<BasicRow>,
                           sortBy: string,
                           sortDirection: 'asc' | 'desc',
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

function TableHeader({order, orderBy, onRequestSort, columns, hasActions, sortable}: TableHeaderProps) {
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
                {hasActions &&
                    <TableCell>
                        Actions
                    </TableCell>
                }
            </TableRow>
        </TableHead>
    );
}

interface TableToolbarProps {
    tableTitle: string;
}

function TableToolbar({tableTitle}: TableToolbarProps) {
    return (
        <Toolbar
            sx={[
                {
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                },
            ]}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {tableTitle}
            </Typography>
        </Toolbar>
    );
}

interface TableProps {
    data: DataRow[];
    columns: Column<BasicRow>[];
    actions: Action[];
    sortable?: boolean;
    tableTitle: string;
}

export default function FuelpassTable({data, columns, actions, sortable, tableTitle}: TableProps) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DataRow>('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof DataRow,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const columnsMap = new Map<string, Column<BasicRow>>();
    columns.forEach(column => {
        columnsMap.set(column.field, column);
    })

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...data]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );


    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableToolbar tableTitle={tableTitle}/>
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
                            hasActions={actions.length > 0}
                            sortable={sortable}

                        />
                        <TableBody>
                            {visibleRows.map((row, rowIndex) => {
                                const labelId = `table-body-${rowIndex}`;
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={`row-key-${rowIndex}`}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        {Object.keys(row).map((columnKey, index) => {
                                            const col = columnsMap.get(columnKey)
                                            if (col && !col.hidden) {
                                                return (<TableCell
                                                    component="td"
                                                    id={labelId}
                                                    key={`${columnKey}-${rowIndex}-${index}`}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {col.render(row)}
                                                </TableCell>)
                                            }
                                            return null
                                        })

                                        }
                                    </TableRow>
                                );
                            })}
                            {/*{emptyRows > 0 && (*/}
                            {/*    <TableRow*/}
                            {/*        style={{*/}
                            {/*            height: (dense ? 33 : 53) * emptyRows,*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <TableCell colSpan={6} />*/}
                            {/*    </TableRow>*/}
                            {/*)}*/}
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
            </Paper>
        </Box>
    );
}