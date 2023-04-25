import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import * as uuid from 'uuid';
  
  @Injectable()
  export class ValidateUUIDPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      if (uuid.validate(value)) {
        return value;
      } else {
        throw new BadRequestException('Invalid UUID');
      }
    }
  }
  