import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminRegistrationDto } from 'dtos/auth/admin-registration.dto';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('')
    @ApiOperation({ summary: 'Add new user.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User has been added successful.',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'User already exists.',
    })
    public registerUser(@Body() model: AdminRegistrationDto): Promise<any> {
        const result = this.adminService.addUser(model.userModel,model.userRole);
        return result;
    }
 }
