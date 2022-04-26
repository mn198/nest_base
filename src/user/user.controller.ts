import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUser } from './interfaces/user.interface';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id.pipe';
import { UserResponseDto } from './dtos/user-response.dto';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid object id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findOneById(id);
    if (user) {
      return plainToInstance(UserResponseDto, user);
    }
    throw new BadRequestException('Object id not found');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(UserResponseDto, users);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid object id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.update(id, updateUserDto);
    if (user) {
      return plainToInstance(UserResponseDto, user);
    }
    throw new BadRequestException('Object id not found');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid object id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.remove(id);
    if (user) {
      return plainToInstance(UserResponseDto, user);
    }
    throw new BadRequestException('Object id not found');
  }
}
