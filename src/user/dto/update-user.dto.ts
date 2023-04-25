import { UserDto } from './user.dto';

export class UpdateUserDto implements UserDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    active: boolean;
}
