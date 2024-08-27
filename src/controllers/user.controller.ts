import { Controller, Post, Delete, Get, Put, Body, Query, Res } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { Response } from 'express';
import UserInput from 'src/interfaces/user.interface';
import { SuccessResponse, ErrorResponse, CreatedResponse, NotFoundResponse, ConflictResponse } from 'src/common/response';
import { USER_CONTANTS } from 'src/constants/user.constants';
import { AUTH_CONTANTS } from 'src/constants/auth.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('delete')
  async deleteUser(@Body() body: { email: string }, @Res() res: Response) {
    try {
      const isDeleted = await this.userService.deleteUser(body.email);
      if (!isDeleted) {
        return NotFoundResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
      }
      return SuccessResponse(res, {}, USER_CONTANTS.USER_DELETED);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Post('add')
  async addUser(@Body() userInput: UserInput, @Res() res: Response) {
    try {
      const user = await this.userService.addUser(userInput);
      if (!user) {
        return ConflictResponse(res, AUTH_CONTANTS.USER_EXISTS);
      }
      return CreatedResponse(res, user, AUTH_CONTANTS.REGISTER_SUCCESS);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('get')
  async getUser(@Query('page') page: string, @Query('limit') limit: string, @Res() res: Response) {
    const pageNumber = parseInt(page || '1', 10);
    const limitNumber = parseInt(limit || '10', 10);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return ErrorResponse(res, "Invalid pagination parameters.");
    }

    try {
      const userResult = await this.userService.getUser(pageNumber, limitNumber);
      if (!userResult) {
        return NotFoundResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
      }
      return SuccessResponse(res, userResult, USER_CONTANTS.USER_FOUND);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Put('update')
  async editUser(@Body() userInput: UserInput, @Res() res: Response) {
    try {
      const user = await this.userService.editUser(userInput);
      if (!user) {
        return NotFoundResponse(res, AUTH_CONTANTS.USER_NOT_EXISTS);
      }
      return SuccessResponse(res, user, USER_CONTANTS.UPDATE_SUCCESS);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
