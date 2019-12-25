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

async addProject(){
  this.ctx.body=await this.service.project.addProject();
}
}
module.exports=ProjectController