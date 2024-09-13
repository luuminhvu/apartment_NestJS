import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module'; // Đảm bảo AuthModule được import đúng
import { User } from './models/user.model';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { Posts } from './models/posts.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'apartment_management',
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
