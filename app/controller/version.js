'use strict';

const Controller = require('egg').Controller;

class VersionController extends Controller {
  async findVersionAll() {
    this.ctx.body = await this.service.version.findVersionAll();
  }
  
}

module.exports = VersionController;
