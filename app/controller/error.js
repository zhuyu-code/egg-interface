'use strict';

const Controller = require('egg').Controller;
const Status=require('../util/httpStatus')
class ErrorController extends Controller {

  //根据projectId筛选出所有的错误
  async findProjectIdError(){
      const {projectId}=this.ctx.params;
      this.ctx.body=await this.service.error.findProjectIdError(projectId);
  }
  async findAllError(){
    const { versionId } = this.ctx.params;
    const {page,pageSize}=this.ctx.query;
    const data=await this.service.error.findAllError(versionId,page,pageSize);
    this.ctx.body={
      code:Status.selectSuccess,
      message:"查询版本成功",
      data:data
    }
  }

  async findErrorSort(){
    const {versionId}=this.ctx.params;
    const {page,pageSize,date1=0,date2=0}=this.ctx.query;
    console.log('-------')
    console.log(date1,date2)
    this.ctx.body=await this.service.error.findErrorSort(versionId,page,pageSize,date1,date2);
  }
}

module.exports = ErrorController;
