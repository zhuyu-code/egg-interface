'use strict';

const Controller=require('egg').Controller;

class ShowController extends Controller{
     /**
   * @router GET /product
   * @desc: 这是获取全部产品
   * @acess 允许访问
   */
    async findProductAll(){
        this.ctx.body=await this.service.show.findProductAll(); 
    }
 /**
   * @router  POST/product
   * @desc: 这是获取全部项目
   * @acess 允许访问
   */
    async addProduct(){
      this.ctx.body=await this.service.show.addProduct();
    }

     /**
   * @router  GET/project
   * @desc: 这是获取全部项目
   * @acess 允许访问
   */
  async findProjectAll(){
      this.ctx.body=await this.service.show.findProjectAll();
  }

  async addProject(){
    this.ctx.body=await this.service.show.addProject();
  }
}
module.exports=ShowController;