'use strict';

const Controller=require('egg').Controller;

class ShowController extends Controller{
     /**
   * @router GET /product
   * @desc: 这是获取全部产品
   * @acess 允许访问
   */
    async findProductAll(){
        const data=await this.service.product.findProductAll(); 
        this.ctx.body={
          code:200,
          message:"查询成功",
          data:data
        }
    }
 /**
   * @router  POST/product
   * @desc: 这是添加产品信息
   * @acess 允许访问
   */
    async addProduct(){
      this.ctx.body=await this.service.product.addProduct();
    }
 /**
   * @router  PUT/product/:productId
   * @desc: 修改指定产品
   * @acess 允许访问
   */
    async updateProduct(){
        this.ctx.body=await this.service.product.updateProduct();
    }


     /**
   * @router  Delete/product/:productId
   * @desc: 删除指定产品
   * @acess 允许访问
   */

    async deleteProduct(){
        this.ctx.body=await this.service.product.deleteProduct();
    }
   
}
module.exports=ShowController;