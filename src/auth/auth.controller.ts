import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto){
    return this.authService.register(body.login, body.password)
  }

  @Post('login')
  async login(@Body() body: LoginDto){
    return this.authService.login(body.login, body.password)
  }
}
