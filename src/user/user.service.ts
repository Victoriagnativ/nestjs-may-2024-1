import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../datebase/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseQueryDto } from '../common/validator/base.query.validator';
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private userList = [];
  create(createUserDto: CreateUserDto) {
    const index = new Date().valueOf();
    this.userList.push({
      ...createUserDto,
      id: index,
    });
    return createUserDto[0];
  }

  async findAll(query?: BaseQueryDto): Promise<any> {
    const option = {
      page: query?.page || 1,
      limit: query?.limit || 10,
    };
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder
      .select('email,"firstName" id, age,"createdAt"')
      .where({ isActive: false });
    if (query.search) {
      queryBuilder.andWhere(`LOWER("firstName") LIKE %${query.search}`);
    }
    const [pagination, rawEntities] = await paginateRawAndEntities(
      queryBuilder,
      option,
    );
    return {
      page: pagination.meta.currentPage,
      pages: pagination.meta.totalItems,
      countItems: pagination.meta.totalItems,
      entities: rawEntities,
    };
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
