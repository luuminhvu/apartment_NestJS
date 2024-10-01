import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { User } from './models/user.model';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { Posts } from './models/posts.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost', // Lấy từ biến môi trường
      port: +process.env.DB_PORT || 3306, // Lấy từ biến môi trường
      username: process.env.DB_USER || 'root', // Lấy từ biến môi trường
      password: process.env.DB_PASSWORD || '123456', // Lấy từ biến môi trường
      database: process.env.DB_NAME || 'apartment_management', // Lấy từ biến môi trường
      models: [User, Posts],
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
