import { Controller, Post, Body, ConflictException, Get, Param, UseGuards } from '@nestjs/common';
import { RoleDto } from 'dtos/role.dto';
import { RoleService } from '../services/role.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Post('')
    public async addRole(@Body() roleDto: RoleDto): Promise<void> {
        const result = await this.roleService.add(
        roleDto.role
        );
        if (!result) {
        throw new ConflictException();
        }
    } 

    @Get('')
    @UseGuards(AuthGuard)
    async findAll(): Promise<RoleDto> {
        return await this.roleService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findById(@Param('id') id: string): Promise<RoleDto> {
        return await this.roleService.findById(id);
    }
}
