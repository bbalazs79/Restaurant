import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from 'dtos/user/user-update';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ProfileService { 
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    public async getCurrentUserProfile(username:string): Promise<User>{
        return await this.userModel.findOne({username: username}).exec();
    }

    public async getFullname(username: string): Promise<string | boolean>{
        const user = await this.userModel.findOne({username: username}).exec();

        if(!user){
            return false;
        }

        return user.first_name + " " + user.last_name;
    }

    public async updateUserProfile(id: string, user: UpdateUserDto): Promise<User>{
        await this.userModel.update({_id: id}, {user});
        return await this.userModel.findOne({_id: id});
    }
}
