'use strict';

const Controller = require('egg').Controller;
const Status=require('../util/httpStatus')
class VersionController extends Controller {
  async findVersionAll() {
    const projectId = this.ctx.params.projectId;
    const {page,pageSize}=this.ctx.query;
    const data= await this.service.version.findVersionAll(projectId,page,pageSize);
    this.ctx.body={
      code:Status.selectSuccess,
      message:"查询版本成功",
      data:data
    }
    this.ctx.status=200;
  }

}

module.exports = VersionController;
