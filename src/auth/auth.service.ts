import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { CreateUserDto, LoginUserDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({ ...userData, password: bcrypt.hashSync(password, 10) });
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (err) {
      this.handleDBErrors(err);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });
    console.log("hola", bcrypt.compareSync(password, user.password))
    if(!user){
      throw new UnauthorizedException('Credentials are not valid (email)')
    }
    if(!bcrypt.compareSync(password, user.password)){
      throw new UnauthorizedException('Credentials are not valid (password)')
    }
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handleDBErrors(error: any): never {
    console.log({ error });
    if (error.code === "23505") {
      throw new BadRequestException("Email already exist", error.datail);
    }

    console.log(error);

    throw new InternalServerErrorException("Please check server logs");
  }
}
