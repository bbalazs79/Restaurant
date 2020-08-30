import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoleDto } from 'dtos/auth/role.dto';
import { RoleService } from '../services/role.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  public async addRole(@Body() roleDto: RoleDto): Promise<void> {
    const result = await this.roleService.add(roleDto.role);
    if (!result) {
      throw new ConflictException();
    }
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get all roles.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data has been sent.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: '',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<RoleDto> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async findById(@Param('id') id: string): Promise<RoleDto> {
    return await this.roleService.findById(id);
  }
}
