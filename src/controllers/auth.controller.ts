import { AuthService } from './../services/auth.service';
import { RegisterDto } from './../dtos/register.dto';
import { Controller, Post, Body } from '@nestjs/common';

import { LoginDto } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      message: 'User logged in successfully',
      data: result,
    };
  }

  @Post('refresh-token')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    console.log("refreshToken");
    const result = await this.authService.refreshAccessToken(refreshToken);
    return {
      message: 'Token refreshed successfully',
      data: result,
    };
  }
}
