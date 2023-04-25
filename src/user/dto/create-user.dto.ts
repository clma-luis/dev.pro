import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserDto } from "./user.dto";
import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class CreateUserDto implements UserDto {
  id: string;

  @ApiProperty({
    title: "firstName",
    description: "The firstName for user",
    type: String,
    uniqueItems: false,
  })
  @Expose()
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    title: "lastName",
    description: "The lastName for user",
    type: String,
    uniqueItems: false,
  })
  @Expose()
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    title: "userName",
    description: "The userName for user",
    type: String,
    minLength: 3,
    uniqueItems: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    title: "email",
    description: "The email user",
    type: String,
  })
  @Expose()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    title: "password",
    description: "The password",
    type: String,
    minLength: 7,
    maxLength: 20,
  })
  @Expose()
  @MinLength(7)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "password too weak" })
  password: string;

  @ApiProperty({
    title: "active",
    description: "The active is to control the state of user, it's not required Db create automatically",
    type: Boolean,
    default: true,
    required: false,
  })
  @Expose()
  active?: boolean;
}
