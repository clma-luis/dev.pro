import { HttpStatus, Param, ParseUUIDPipe } from "@nestjs/common";

export function IsUUIDParam(property: string): ParameterDecorator {
    return Param(
        property,
        new ParseUUIDPipe({
            errorHttpStatusCode: HttpStatus.BAD_REQUEST,
            exceptionFactory: () => {
              return {
                statusCode: 400,
                message: "This is not a valid Id, It should be a UUID",
              };
            },
          })
    )
}