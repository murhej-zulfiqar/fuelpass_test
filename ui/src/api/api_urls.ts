
import {UrlData} from "@/interfaces/common";
export const endPoints: Readonly<{[key: string] : string}> =  Object.freeze({

    LOGIN: 'login',
    CREATE_ORDER: '',
    FETCH_ORDERS: '',
    FETCH_REQUEST_FORM: 'requestForm',
    UPDATE_ORDER_STATUS: ':orderId/changeStatus'
})


export const getRestApi = (
    service: string,
    endpoint: string,
    endpointData: UrlData = { params: {}, query: {} }
): string => {
    const { params = {}, query } = endpointData;

    let url = Object.keys(params).reduce(
        (prev, current) => prev.replace(new RegExp(`{${current}}`, 'g'), params[current]),
        endPoints[endpoint]
    );
    if (query) {
        const qs = new URLSearchParams(query).toString();
        url += `?${qs}`;
    }
    return `/${service}/${url}`;
};

export default getRestApi;