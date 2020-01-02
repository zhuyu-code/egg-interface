'use strict'

const Controller=require('egg').Controller;
const Status=require('../util/httpStatus')

class ProjectController extends Controller{
    /**
   * @router  GET/project
   * @desc: 这是获取全部项目
   * @acess 允许访问
   */
  async findProjectAll(){
    const productId = this.ctx.params.productId;
    const {page,pageSize}=this.ctx.query;
    const data=await this.service.project.findProjectAll(productId,page,pageSize);
    this.ctx.body={
      code:Status.selectSuccess,
      message:"查询成功",
      data:data
    };
    this.ctx.status=200;
}

async findProjectSearch(){
  const productId = this.ctx.params.productId;
  const {target,page,pageSize}=this.ctx.query;
  const data=await this.service.project.findProjectSearch(productId,target,page,pageSize);
  this.ctx.body={
    code:Status.selectSuccess,
    message:"查询成功",
    data:data
  };
  this.ctx.status=200;
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
  const productId = this.ctx.params.productId;
  const { projectName, projectApp, projectDesc } = this.ctx.request.body;
  this.ctx.body=await this.service.project.addProject(productId,projectName, projectApp, projectDesc);
  this.ctx.status=201;
}


async updateProject(){
  const { projectId } = this.ctx.params;
  const { projectName, projectApp, projectDesc,productId } = this.ctx.request.body;
    this.ctx.body=await this.service.project.updateProject(projectId,projectName, projectApp, projectDesc,productId);
    this.ctx.status=200
}

async deleteProject(){
    const projectId = this.ctx.params.projectId;
    this.ctx.body=await this.service.project.deleteProject(projectId);
    this.ctx.stauts=200
}

}
module.exports=ProjectController
