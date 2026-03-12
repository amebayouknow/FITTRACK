export interface IServerResponse<T> {
    message: string;
    success: boolean;
    body: T | null;
    status: number;
}

export class ApiError extends Error{
    code: string;

    constructor(code: string, message: string){
        super(message)
        this.code = code
    }
}