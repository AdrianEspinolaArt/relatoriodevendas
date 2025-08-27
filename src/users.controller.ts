import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResponseDto } from './dto/users-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('limit') limit?: string,
    @Query('skip') skip?: string,
  ): Promise<UsersResponseDto> {
    const lim = limit ? Number(limit) : 100;
    const sk = skip ? Number(skip) : 0;
    return await this.usersService.findAll(lim, sk);
  }
}
