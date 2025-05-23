import status from "http-status";
import { ErrorTypes } from "~/types/error";

export const handleCatchError = (message: string, err: unknown) => {
    const errorString = String(err).replace('Error: ', ''); 
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    Object.entries(ErrorTypes).forEach(([key, value]) => {
        if (value === errorString) {
            statusCode = key as number;
        }
    });

    throw createError({
        message,
        statusCode,
        data: { 
            rawError: err 
        },
    });
};

export const checkParam = (event, param: string) => {
    const foundParam = event.context.params?.[param];
    if (!foundParam) {
        throw new Error(ErrorTypes[status.BAD_REQUEST]);
    }

    return foundParam;
};

