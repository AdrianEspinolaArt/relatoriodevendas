import { Injectable } from '@nestjs/common';
import { MongooseService } from './mongoose/mongoose.service';
import { UsersResponseDto } from './dto/users-response.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly mongooseService: MongooseService) {}

  async findAll(limit = 100, skip = 0): Promise<UsersResponseDto> {
    const db = this.mongooseService.getConnection().db;
    if (!db) {
      throw new Error('Database connection is not available.');
    }
    const usersCol = db.collection('users');

    const [rawUsers, totalCount] = await Promise.all([
      usersCol.find({}).skip(skip).limit(limit).toArray(),
      usersCol.countDocuments({}),
    ]);

    // Mapeia para o DTO, convertendo _id para string
    const users: UserDto[] = rawUsers.map((u: any) => ({
      _id: u._id?.toString(),
      name: u.name,
      email: u.email,
      cpf: u.cpf,
      telefone: u.telefone,
      createdAt: u.createdAt,
      // Adicione outros campos conforme necessário
    }));

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last7days = new Date(now); last7days.setDate(now.getDate() - 7);
    const last30days = new Date(now); last30days.setDate(now.getDate() - 30);

    const [todayCount, last7daysCount, last30daysCount] = await Promise.all([
      usersCol.countDocuments({ createdAt: { $gte: startOfToday } }),
      usersCol.countDocuments({ createdAt: { $gte: last7days } }),
      usersCol.countDocuments({ createdAt: { $gte: last30days } }),
    ]);

    return {
      totalCount,
      limit,
      skip,
      todayCount,
      last7daysCount,
      last30daysCount,
      users: users as UserDto[],
    };
  }
}
