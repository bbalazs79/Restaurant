import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../schemas/role.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { hashPassword } from '../utils/hash-password';

@Injectable()
export class AdminService { 
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>, 
  ) {}

  async addUser(user: Partial<User>, role: string): Promise<any>{
    if (await this.userModel.findOne({ username: user.username })) {
      throw new ConflictException();
      }
    if (await this.userModel.findOne({ email: user.email })) {
      throw new ConflictException();
    }

    const response = await this.roleModel.findOne({ role: role });
    console.log(response);
    user.role = response._id;
    if(!response){
      throw new NotFoundException();
    }

    user.password = await hashPassword(user.password);
    
    const addUser = new this.userModel(user);
    return !!addUser.save();
  };
}
