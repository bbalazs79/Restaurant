import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GetProfileDto } from 'dtos/profile/get-frofile.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/schemas/user.schema';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Get('')
    @UseGuards(AuthGuard)
    public getProfile(@CurrentUser() user): Promise<User> {
        return user;
    }

    @Post('getMyName')
    @UseGuards(AuthGuard)
    public async getMyName(@Body()body: GetProfileDto): Promise<string | boolean> {
        const myName =  await this.profileService.getFullname(body.username);
        if(!myName){
            return false;
        }
        return myName;
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    public async updateProfile(@Param('id') id: string, @Body() body: Partial<User>): Promise<User | boolean> {
        const user =  await this.profileService.updateUserProfile(id,body);
        if(!user){
            return false;
        }
        return user;
    }

}