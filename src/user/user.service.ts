import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  public users: User[];

  constructor() {
    this.users = [{
      firstName: "asdf",
      lastName: "lastname",
      userName: "username",
      email: "carlos@test.com",
      password: "1234",
      id: randomUUID()
  }];

  }

  private convertToUser(createUser: CreateUserDto): UserDto {
    const user = new UserDto();
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.userName = createUser.userName;
    user.email = createUser.email;
    user.password = createUser.password;
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const users = this.users.find((item) => item.email === `${createUserDto.email}`);
    if(users) {
      throw new UnprocessableEntityException('Email already exists');
    }
    const user = this.convertToUser(createUserDto);
    user.id = randomUUID();
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash
    this.users.push(user);
    return plainToInstance(UserDto, user) 
  }

  findAll() {
    const users = this.users;
    const result = plainToInstance(UserDto, users) 
    return result
  }

  findOne(id: string): User {
    const user = this.users.find((item) => item.id === `${id}`);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return plainToInstance(UserDto, user) 
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userInStore = this.users.find((item) => item.id === `${id}`);

    if (!userInStore) {
     return  new HttpException('User not found', HttpStatus.NOT_FOUND);
      
    }

    const userUpdated = this.convertToUser(updateUserDto);
    const userIndex = this.users.findIndex((item) => item.id === `${id}`);
    this.users[userIndex] = userUpdated;

    return userUpdated;
  }

  remove(id: string) {
    const userInStore = this.users.find((item) => item.id === `${id}`);

    if (!userInStore) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const index = this.users.findIndex((item) => item.id === id);
    this.users.splice(index, 1);

    return userInStore;
  }

}
