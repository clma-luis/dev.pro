import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
 // TODO: import { EmailNotRegistered } from "src/common/decorators/is-unique-email";

 @Exclude()
export class CreateUserDto {
    @Expose()
    @IsString()
    @IsEmail()
   // TODO: @EmailNotRegistered({ message: 'email already registered' })
    email: string;


     @Expose()
    @MinLength(7)
    @MaxLength(20)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "password too weak" })
    password: string;

    @Expose()
    @IsString()
    @MinLength(1)
    fullName: string;
}