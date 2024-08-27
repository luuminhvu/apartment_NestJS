import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Đưa model User vào SequelizeModule
  providers: [UserService], // Cung cấp UserService
  controllers: [UserController], // Đưa UserController vào
  exports: [UserService], // Xuất UserService để có thể sử dụng ở các module khác
})
export class UserModule {}
