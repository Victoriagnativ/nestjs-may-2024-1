import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '../../common/decorator/password.decorator';
import { IsCityAllowed } from '../../common/decorator/city.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim())
  email: string;
  @IsOptional()
  @ApiProperty({ required: true })
  firstName: string;
  @ApiProperty()
  lastName: string;
  @IsCityAllowed({
    groups: ['Lviv', 'Kharkiv', 'Odessa'],
    message: 'Місто не дозволене!',
  })
  city: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  age: number;
}
export class PersonalDto {
  dateBirth: string;
  lang: string;
}
export class ForgotPassword {
  @IsString()
  @Matches(' /\\s*;\\s*/')
  password: string;
  @IsNotEmpty()
  @Match('password', { message: 'Password must match' })
  repeatPassword: string;
}
export class AccountResponseDto extends IntersectionType(
  CreateUserDto,
  PersonalDto,
) {
  @ApiProperty()
  status: boolean;
}

export class UserQueryDto {
  @ApiProperty()
  limit: string;
  sort: string;
  page: string;
}
export class UpdateUserDto {}

export class SingUpDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
}