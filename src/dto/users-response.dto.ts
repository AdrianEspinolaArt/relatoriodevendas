import { UserDto } from "./user.dto";

export class UsersResponseDto {
  totalCount: number;
  limit: number;
  skip: number;
  todayCount: number;
  last7daysCount: number;
  last30daysCount: number;
  users: UserDto[];
}
