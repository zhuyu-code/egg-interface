'use strict'

const Controller=require('egg').Controller;

class ProjectController extends Controller{
    /**
   * @router  GET/project
   * @desc: 这是获取全部项目
   * @acess 允许访问
   */
  async findProjectAll(){
    this.ctx.body=await this.service.project.findProjectAll();
}
/**
* @api {post} /api/User/register 用户注册
* @apiDescription 用户注册
* @apiName Register
* @apiGroup User
* @apiParam {string} name 用户名
* @apiParam {string} password 密码
* @apiVersion 1.0.0
*/
async addProject(){
  this.ctx.body=await this.service.project.addProject();
}

async updateProject(){
    this.ctx.body=await this.service.project.updateProject();
}

async deleteProject(){
    this.ctx.body=await this.service.project.deleteProject();
} 

}
module.exports=ProjectController