import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorHandler {
    static throwDefaultInternalServerError(error?: any): HttpException {
        throw new HttpException({
            message: 'Ha ocurrido un error, por favor intente de nuevo.',
            error
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    static throwNotFoundError(entity?: 'User' | 'Role' | 'Country' | 'Region', error?: any): HttpException{
        throw new HttpException({
            message: `${entity} no existe.`,
            error
        }, HttpStatus.BAD_REQUEST);
    }

    static throwCustomError(message: string, statusCode?: HttpStatus, error?: any): HttpException {
        throw new HttpException({
            message,
            error,
            statusCode
        }, statusCode);
    }
}