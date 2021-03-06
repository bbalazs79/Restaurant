import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  public async add(role: string): Promise<boolean> {
    if (await this.roleModel.findOne({ role })) {
      return false;
    }

    const newRole = new this.roleModel({ role });
    return !!newRole.save();
  }

  public async findAll(): Promise<any> {
    return await this.roleModel.find().exec();
  }

  public async findById(id: string): Promise<any> {
    const result = await this.roleModel.findOne({ _id: id });
    return result.role;

    /* return {
            rolename: result.role, 
            roleId: result._id
        }; */
  }
}
