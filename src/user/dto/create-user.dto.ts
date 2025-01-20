import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  age: number;
}
export class AccountResponseDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  age: number;
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
