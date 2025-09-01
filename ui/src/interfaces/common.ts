export type UrlData  = {
    params?: { [key: string]: string };
    query?: string | string[][] | Record<string, string> | URLSearchParams | undefined;
}


export type FormObject = {
    fieldName: string,
    fieldLabel: string,
    fieldType: string,
    validation: {
        required: boolean,
        minValue?: number,
        maxValue?: number,
        maxLength?: number,
        minLength?: number,

    }
}