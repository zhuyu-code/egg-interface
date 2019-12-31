'use strict';

const Service = require('egg').Service;

class ErrorService extends Service {
  async findAllError(versionId) {
    const selectError = await this.app.mysql.select('error', {
      where:{
        versionId
      },
    });
    return selectError;
  }
}

module.exports = ErrorService;
