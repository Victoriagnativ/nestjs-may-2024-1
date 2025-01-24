import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto, ForgotPassword } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../datebase/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async singUpUser(data: CreateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (findUser) {
        throw new BadRequestException('User with this email already exist.');
      }
      const password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.save(
        this.userRepository.create({
          ...data,
          password,
        }),
      );
      console.log('Hashed password:', password);
      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
  create(data: ForgotPassword) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
