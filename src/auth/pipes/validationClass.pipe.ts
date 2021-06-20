import { ArgumentMetadata, BadRequestException, HttpStatus, ValidationPipe } from "@nestjs/common"
import { ErrorHandler } from "src/utils/errors";

export class ValidationClass extends ValidationPipe {
    public async transform(value, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata)
        } catch (e) {
            if (e instanceof BadRequestException) {
                console.log(e.message)
                throw ErrorHandler
                    .throwCustomError(
                        'No se ha enviado la información suficiente.',
                        HttpStatus.BAD_REQUEST
                        , {
                            code: 'VALIDATION_ERROR_MISSING_FIELDS'
                        }
                    );
            }
        }
    }
}