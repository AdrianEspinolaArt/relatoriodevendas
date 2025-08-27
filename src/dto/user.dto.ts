export class UserDto {
  _id?: string;
  email?: string;
  password?: string;
  salt?: string;
  full_name?: string;
  cellphone?: string;
  roles?: string[];
  addresses?: any[];
  isEmailVerified?: boolean;
  tenant?: string[];
  system?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  anonymizedDeleted?: boolean;
  migrated_to_modern_auth?: boolean;
}
