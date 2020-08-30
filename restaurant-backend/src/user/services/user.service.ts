import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findAllUsers(): Promise<User[]> {
    const result = await this.userModel.find().exec();

    return result;
  }
}
