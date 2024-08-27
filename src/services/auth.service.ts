import { verifyRefreshToken } from './../utils/verifyToken';
import { RegisterDto } from './../dtos/register.dto';
import { LoginDto } from './../dtos/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { AUTH_CONTANTS } from 'src/constants/auth.constants';
import {Logger} from "@nestjs/common";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, dateOfBirth, phoneNumber } =
      registerDto;
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      return { message: AUTH_CONTANTS.USER_EXISTS };
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

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new Error(AUTH_CONTANTS.USER_NOT_EXISTS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(AUTH_CONTANTS.INVALID_PASSWORD);
    }

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error(AUTH_CONTANTS.MISSING_TOKEN);
    }

    const userData = verifyRefreshToken(refreshToken);
    if (!userData) {
      throw new Error(AUTH_CONTANTS.INVALID_TOKEN);
    }

    const user = await this.userModel.findByPk(userData.id);
    if (!user) {
      throw new Error(AUTH_CONTANTS.USER_NOT_EXISTS);
    }

    const newAccessToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
