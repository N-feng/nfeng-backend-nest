import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RoleAccess as RoleAccessSchema } from '../../model/role-access.model';
import { CreateRoleAccessDto } from '../../dto/create-role-access.dto'
import { AdminService } from '../admin/admin.service';
import { AccessService } from '../access/access.service';
import * as mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


@Injectable()
export class RoleAccessService {
  constructor(
    @InjectModel(RoleAccessSchema) private readonly roleAccessModel: ModelType<RoleAccessSchema>,
    private readonly adminService: AdminService,
    private readonly accessService: AccessService
  ) { }

  async find(body?) {
    return await this.roleAccessModel.find(body)
  }

  async create(body) {
    return await this.roleAccessModel.create(body)
  }

  async update(id, body:CreateRoleAccessDto) {
    return await this.roleAccessModel.findByIdAndUpdate(id, body)
  }

  async deleteMany(body) {
    return await this.roleAccessModel.deleteMany(body)
  }

  async checkAuth(id) {
    /*
      1、获取当前用户的角色    （如果超级管理员跳过权限判断 is_super=1）
      2、根据角色获取当前角色的权限列表
      3、获取当前访问的url 对应的权限id
      4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    // 1、获取当前用户的角色

    const role_id = id

    // if (userInfo.is_super == 1) {
    //   return true;
    // }

    // 2、根据角色获取当前角色的权限列表

    const roleAccessResult = await this.roleAccessModel.find({ role_id: new ObjectId(role_id) })

    const roleAccessArray = []

    roleAccessResult.forEach((value) => {
      roleAccessArray.push(value.access_id.toString())
    });

    console.log(roleAccessArray);
    const url: string = 'url'

    // 3、获取当前访问的url 对应的权限id

    const accessResult = await this.accessService.find({ url });

    if (accessResult.length > 0) {

      // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中

      if (roleAccessArray.indexOf(accessResult[0]._id.toString()) != -1) {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }

  }
}
