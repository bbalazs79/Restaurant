import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../schemas/role.schema';
import { RoleDto } from 'dtos/role.dto';

@Injectable()
export class RoleService {

    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
      ) { }

    public async add(role: string): Promise<boolean> {
        if (await this.roleModel.findOne({ role })) {
          return false;
        }
    
        const newRole = new this.roleModel({role });
        return !!newRole.save();
    }

    public async findAll(): Promise<any> {
        return await this.roleModel.find().exec();
    }

    /* public findOne(id:string): Promise<any> {
        this.roleModel.findOne({ _id: id }).then((result) => {
            return {result.role};
        });
    } */
}
