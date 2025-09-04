import {DataRow, TableOrderType} from "@/interfaces/common";


export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator<Key extends keyof DataRow>(
    order: TableOrderType,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | boolean | null | undefined | unknown },
    b: { [key in Key]: number | string | boolean | null | undefined | unknown },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const applyFilters = (
    data: DataRow[],
    filters: { [key: string]: string },
): DataRow[] => {

    const result =  data.filter((row) =>
        Object.entries(filters)
            .filter(([key, value]) => value !== "" ) // ignore empty filters & restrict to fields
            .every(([key, value]) => {
                const cellValue = row[key];
                return String(cellValue).toLowerCase() === value.toLowerCase(); // case-insensitive match
            })
    );
    return result;
};