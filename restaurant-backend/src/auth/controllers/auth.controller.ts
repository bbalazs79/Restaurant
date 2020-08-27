import {
  Controller,
  Post,
  UnauthorizedException,
  ConflictException,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BasicAuthDto } from 'dtos/auth/basic-auth.dto';
import { AuthService } from '../services/auth.service';
import { LoginResponseDto } from 'dtos/auth/login-response.dto';
import { AuthGuard } from '../guards/auth.guard';
import { extractAuthorizationHeader } from '../utils/extract-authorization';
import { RegistrationDto } from 'dtos/auth/registration.dto';

/**
 * Authentikációs végpontok.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // POST /auth/login
  // @Body(): Ha ezzel felannotáljuk a paramétert, akkor a request body tartalma kerül a paraméterbe.
  // Itt egy username és egy password van a DTO interface-jében, tehát ezeket várjuk.
  // Az egyes DTO interface-ek a dtos/auth-ban vannak.
  @Post('login')
  public async login(@Body() authDto: BasicAuthDto): Promise<LoginResponseDto> {
    const token = await this.authService.login(
      authDto.username,
      authDto.password,
    );
    if (!token) {
      // A szabványos HTTP kódokhoz tartozik egy-egy exception.
      // Ha a request kezelésének során egy ilyen HttpException feldobódik,
      // akkor a megfelelő hibakóddal visszaküld egy választ a végpont.
      // Egyszerűbb, mint manuálisan összerakosgatni a választ.
      throw new UnauthorizedException();
    }

    return {
      token,
    };
  }

  // POST /auth/register
  @Post('registerUser')
  public async registerUser(@Body() regDto: RegistrationDto): Promise<void> {
    const result = await this.authService.registerUser(
      regDto.username,
      regDto.password,
      regDto.first_name,
      regDto.last_name,
      regDto.email,
      regDto.phone_number,
      regDto.zip_code,
      regDto.city,
      regDto.street,
      regDto.house_number,
      regDto.storey,
      regDto.door_number,
      regDto.doorbell,
    );
    if (!result) {
      throw new ConflictException();
    }
  }

  // GET /auth/logout
  @Get('logout')
  @UseGuards(AuthGuard)
  public async logout(@Request() request: Request): Promise<void> {
    const authorization = extractAuthorizationHeader(request);
    if (!this.authService.logout(authorization.token)) {
      throw new UnauthorizedException();
    }
  }

  
}
