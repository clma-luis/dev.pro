import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
 // TODO: import { EmailNotRegistered } from "src/common/decorators/is-unique-email";


export class LoginUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
   // TODO: @EmailNotRegistered({ message: 'email already registered' })
    email: string;



    @MinLength(7)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "password too weak" })
    password: string;


}