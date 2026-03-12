import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso. Retorna el access_token.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada mal formados (ValidationPipe).' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register') 
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  
}