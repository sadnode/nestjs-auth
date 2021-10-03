import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return { ...createdUser, password: undefined };
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
