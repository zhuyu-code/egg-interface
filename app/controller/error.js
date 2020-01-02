'use strict';

const Controller = require('egg').Controller;
const Status=require('../util/httpStatus')
class ErrorController extends Controller {
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
}

module.exports = ErrorController;
