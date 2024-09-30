import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcryptjs';
import UserInput from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async deleteUser(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    await user.destroy();
    return true;
  }

  async addUser(userInput: UserInput): Promise<User | null> {
    const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
      userInput;
    const existingUser = await this.userModel.findOne({ where: { email } });

    if (existingUser) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth: dateOfBirth ?? null,
      phoneNumber: phoneNumber ?? null,
    });

    return user;
  }

  async getUser(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count, rows: users } = await this.userModel.findAndCountAll({
      offset,
      limit,
    });

    if (users.length === 0) {
      return null;
    }

    const totalPages = Math.ceil(count / limit);
    return {
      users,
      currentPage: page,
      totalPages,
      pageSize: limit,
      total: count,
    };
  }

  async editUser(userInput: UserInput): Promise<User | null> {
    const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
      userInput;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (firstName !== undefined) {
      user.firstName = firstName;
    }
    if (lastName !== undefined) {
      user.lastName = lastName;
    }
    if (dateOfBirth !== undefined) {
      user.dateOfBirth = dateOfBirth;
    }
    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber;
    }

    await user.save();
    return user;
  }
}
