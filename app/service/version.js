'use strict';

// app/service/home.js
const Service = require('egg').Service;

class VersionService extends Service {

  // 根据projectId查询指定version
  async findVersionAll(projectId) {
    const selectVersionAll = this.app.mysql.select('version', {
      where: {
        projectId,
      },
    });
    return selectVersionAll;
  }
}

module.exports = VersionService;
