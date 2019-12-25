'use strict';

const Service = require('egg').Service;

class ErrorService extends Service {
  async findAllError(){
    const {versionId}=this.ctx.request.body;
    const selectError=await this.app.mysql.select('error',{
      versionId:versionId
    });
    return selectError;
  }
}

module.exports = ErrorService;
