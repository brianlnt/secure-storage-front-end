import { IResponse } from "../models/IResponse";

export const baseUrl = 'http://localhost:8085/user';

export const isJsonContentType = (headers: Headers) => ['application/vnd.api+json', 'application/json', 'application/vnd/hal+json', 'application/pdf', 'multipart/form-data']
.includes(headers.get('content-type')?.trimEnd()!);

export const processResponse =  <T>(response: IResponse<T>, meta: any): IResponse<T> => {
    const { request } = meta;
    if(request.url.includes('logout')) { localStorage.removeItem('login'); }
    if(!request.url.includes('profile')) {
        // Show toast notification
    }
    console.log({ response });
    return response;
}

export const processError = (error: { status: number; data: IResponse<void> }): { status: number; data: IResponse<void> } => {
    if(error.data.code === 401 && error.data.status === 'UNAUTHORIZED' && error.data.message === 'You are not logged in') {
        localStorage.setItem('login', 'false');
    }
    // Show toast notification
    console.log({ error });
    return error;
}