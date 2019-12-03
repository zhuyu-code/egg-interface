'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async findAll() {
    this.ctx.body = await this.service.user.findAll();
  }
  async findOne() {
    this.ctx.body = await this.service.user.findOne();
  }
  async add() {
    this.ctx.body = await this.service.user.add();
  }
  async update() {
    this.ctx.body = await this.service.user.update();
  }
  async delete() {
    this.ctx.body = await this.service.user.delete();
  }
}

module.exports = UserController;
