import { Body, Controller, Delete, Get, Patch, Post , UsePipes, ValidationPipe} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { IsUUIDParam } from "src/common/decorators/is-uuid-param";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";


@ApiTags('User')
@Controller("user")
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({status: 201, description: 'User was created'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'Forbidden. Token reated'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({status: 201, description: 'User was created'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'Forbidden. Token reated'})
  findAll(): UserDto[] {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiResponse({status: 201, description: 'User was created'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'Forbidden. Token reated'})
  findOne(@IsUUIDParam("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({status: 400, description: 'Bad request'})
  update(@IsUUIDParam("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiResponse({status: 400, description: 'Bad request'})
  remove(@IsUUIDParam("id") id: string) {
    return this.userService.remove(id);
  }
}
