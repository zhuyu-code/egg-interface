'use strict'

const Controller=require('egg').Controller;
const Status=require('../util/httpStatus')

class ProjectController extends Controller{

  async findProjectOne(){
    const projectId=this.ctx.params.projectId
    this.ctx.body=await this.service.project.findProjectOne(projectId);
  }
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

async findProjectSort(){
  const {projectId}=this.ctx.params;
  const {date}=this.ctx.query;
  const dateArr=date.split('-');
  const data=await this.service.project.findProjectSort(dateArr,projectId);
  this.ctx.body= {
    code:Status.selectSuccess,
    data:data
  }
  this.ctx.status=200;
}

async addProject(){
  const {userId,createPerson}=this.ctx.query;
  const productId = this.ctx.params.productId;
  const { projectName, projectColor,projectApp, projectDesc } = this.ctx.request.body;
  this.ctx.body=await this.service.project.addProject(userId,createPerson,productId,projectName,projectColor, projectApp, projectDesc);
  this.ctx.status=201;
}


async updateProject(){
  const { projectId } = this.ctx.params;
  const { projectName, projectColor, projectApp, projectDesc,productId } = this.ctx.request.body;
    this.ctx.body=await this.service.project.updateProject(projectId,projectName,projectColor, projectApp, projectDesc,productId);
    this.ctx.status=200
}

async deleteProject(){
    const projectId = this.ctx.params.projectId;
    this.ctx.body=await this.service.project.deleteProject(projectId);
    this.ctx.stauts=200
}

}
module.exports=ProjectController
