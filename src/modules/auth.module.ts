import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './../controllers/auth.controller';
import { AuthService } from './../services/auth.service';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
