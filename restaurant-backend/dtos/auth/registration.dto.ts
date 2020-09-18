import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  password: string;
  first_name: string;
  last_name: string;

  @IsEmail()
  email: string;
  phone_number: number;
  zip_code: number;
  city: string;
  street: string;
  house_number: number;
  storey: number;
  door_number: number;
  doorbell: number;
  role: string;
}
