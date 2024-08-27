import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module'; // Đảm bảo AuthModule được import đúng
import { User } from './models/user.model';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'apartment_management',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      logging: console.log
    }),
    ConfigModule.forRoot(),
    AuthModule,UserModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
