import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
    statusCode: number
    status: string
    message: string
    constructor(statusCode: number = 500, message: string = 'Internal Server Error') {
        super(message)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.message = message
        Error.captureStackTrace(this, this.constructor)
    }
}

const castErrorHandler = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new ApiError(400, message)
}

const duplicateErrorHandler = (err: any) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0]
    const message = `field value:${value} already exist. please use another`
    return new ApiError(400, message)
}

export const validationErrorHandler = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new ApiError(400, message);
}

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    error.message = error.message || 'Internal Server Error'
    const fullError = error
    if (error.name === "CastError") error = castErrorHandler(error)
    if (error.code === 11000) error = duplicateErrorHandler(error)
    if (error.name === "ValidationError") error = validationErrorHandler(error)
    res.status(error.statusCode).json({
        status: error.status,
        error: fullError,
        message: error.message,
        stack: error.stack,
    });
}