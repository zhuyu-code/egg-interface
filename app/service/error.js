'use strict';

const Service = require('egg').Service;

class ErrorService extends Service {
  async findAllError(versionId,page,pageSize) {
    const limitSize=parseInt(pageSize);
    const offsetSize=(parseInt(page)-1)*parseInt(pageSize);
    const selectError = await this.app.mysql.select('error', {
      where:{
        versionId
      },
      orders:[['createTime','desc']],
      limit:limitSize,
      offset:offsetSize
    });
    const selectErrorAll=await this.app.mysql.select('error');
    const length=selectErrorAll.length;
    return {
      list:selectError,
      total:length
    };
  }
}

module.exports = ErrorService;
