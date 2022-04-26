import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUser } from './interfaces/user.interface';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id.pipe';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateUserResponseDto })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user: IUser = {
      provider: null,
      providerId: null,
      email: null,
      picture: null,
      photos: null,
      ...createUserDto,
    };
    const createdUser = await this.userService.create(user);
    return plainToInstance(CreateUserResponseDto, createdUser);
  }

  @Get(':id')
  findAll(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.userService.findOneById(id);
  }

  @Get()
  findOne() {
    return this.userService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.userService.remove(id);
  }
}
