import { Exclude, Expose } from 'class-transformer';
import { UserInterface } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements UserInterface {

  
  id!: string;
  firstName: string;
  lastName: string;
  userName: string;
  @ApiProperty({
    title: 'Email',
    description: 'The email user'
  })
  @Expose()
  email: string;
  @Exclude()
  password: string
}
