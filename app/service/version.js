'use strict';

// app/service/home.js
const Service = require('egg').Service;

class VersionService extends Service {

  // 根据projectId查询指定version
  async findVersionAll(projectId,page,pageSize) {
    const limitSize=parseInt(pageSize);
    const offsetSize=(parseInt(page)-1)*parseInt(pageSize);
    const selectVersion = this.app.mysql.select('version', {
      where: {
        projectId,
      },
      orders:[['versionId','asc']],
      limit:limitSize,
      offset:offsetSize
    });
    const selectVersionAll=await this.app.mysql.select('version');
    const length=selectVersionAll.length;
    return {
      list:selectVersion,
      total:length
    };
  }
}

module.exports = VersionService;
