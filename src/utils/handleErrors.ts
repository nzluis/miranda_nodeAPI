export class ApiError extends Error {
    status: number
    message: string
    constructor(status: number = 500, message: string = 'Internal Server Error') {
        super(message)
        this.status = status;
        this.message = message
    }
}