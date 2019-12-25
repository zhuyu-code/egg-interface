'use strict';

const Controller = require('egg').Controller;

class ErrorController extends Controller {
  async findAllError(){
    this.ctx.body=await this.service.error.findAllError();
  }
}

module.exports = ErrorController;
