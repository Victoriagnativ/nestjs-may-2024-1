import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
} from './dto/create-user.dto';

@Injectable()
export class UserService {
  private userList = [];
  create(createUserDto: CreateUserDto) {
    const index = new Date().valueOf();
    this.userList.push({
      ...createUserDto,
      id: index,
    });
    return createUserDto[0];
  }

  findAll(data: UserQueryDto) {
    return this.userList;
  }

  findOne(id: string) {
    return this.userList.find((user) => user.id == id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
