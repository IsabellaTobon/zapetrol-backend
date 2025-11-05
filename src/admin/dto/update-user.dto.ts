import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { USER_ROLES } from '../../users/user.entity';
import type { UserRole } from '../../users/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(USER_ROLES, { message: 'Role must be either admin or user' })
  @IsOptional()
  role?: UserRole;
}
