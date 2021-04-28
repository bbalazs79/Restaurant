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
        const user = await this.userModel.findOne({username: username}).populate('role').exec(); 
        return user;
    }

    public async getFullname(username: string): Promise<string | boolean>{
        const user = await this.userModel.findOne({username: username}).exec();

        if(!user){
            return false;
        }

        return user.first_name + " " + user.last_name;
    }

    async updateUserProfile(id: string, model: Partial<User>): Promise<any>{
        //mert átadható neki id, és az id nem változhat
        const original = await this.userModel.findById(id);
        model._id = original.id;
        this.userModel.updateOne({_id: id},model).exec();
        return await this.userModel.findById(id);
    }
}
