import { Inject, Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { AuthService } from "src/auth/auth.service";


@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true  })
 @Injectable()
export class IsEmailNotRegistered implements ValidatorConstraintInterface {
  constructor(
    @Inject(AuthService)
  private readonly userService: AuthService) {}

  async validate(email: any) {
    return await this.userService.findByEmail(email).then((user) => {
      return user === undefined;
    });
  }
}

export function EmailNotRegistered(validationOptions?: any) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotRegistered,
    });
  };
}