'use strict';

const Controller=require('egg').Controller;
const Status=require('../util/httpStatus');
const moment=require('moment');
class ShowController extends Controller{
     /**
   * @router GET /product
   * @desc: 这是获取全部产品
   * @acess 允许访问
   */
    async findProductAll(){
      console.log(this.ctx.path);
     const {userId,page,pageSize}=this.ctx.query;
     console.log(userId);
        const data=await this.service.product.findProductAll(userId,page,pageSize);
        this.ctx.body={
          code:Status.selectSuccess,
          message:"查询成功",
          data:data
        }
        this.ctx.status=200;
    }


       /**
   * @router GET /product/search
   * @desc: 模糊查询产品
   * @acess 允许访问
   */
    async findProductSearch(){
      const {userId,target,page,pageSize}=this.ctx.query;
      console.log(target,page,pageSize);
      const data=await this.service.product.findProductSearch(userId,target,page,pageSize);
      this.ctx.body={
        code:Status.selectSuccess,
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
      const {userId,createPerson}=this.ctx.query;
      this.ctx.validate({userId:'string',createPerson:'string'},this.ctx.query)
      const { productName, productDesc, productCategory } = this.ctx.request.body;
      //做校验
      const validateRules={
        productName:'string',
        productDesc:'string',
        productCategory:'string',
      }
        this.ctx.validate(validateRules);
        this.ctx.body=await this.service.product.addProduct(userId,productName, productDesc, productCategory,createPerson);
        this.ctx.status=201;
    }
 /**
   * @router  PUT/product/:productId
   * @desc: 修改指定产品
   * @acess 允许访问
   */
    async updateProduct(){
      const productId = this.ctx.params.productId;
      this.ctx.validate({productId:'string'},this.ctx.params)
      const { productName, productDesc, productCategory} = this.ctx.request.body;
      console.log(productId,productName,productDesc,productCategory)
      this.ctx.validate({
        productName:'string',
        productDesc:'string',
        productCategory:'string'
      })
       this.ctx.body=await this.service.product.updateProduct(productId,productName, productDesc, productCategory);
        this.ctx.status=200
    }


     /**
   * @router  Delete/product/:productId
   * @desc: 删除指定产品
   * @acess 允许访问
   */

    async deleteProduct(){
        const productId = this.ctx.params.productId;
        this.ctx.validate({productId:'string'},this.ctx.params);
        this.ctx.body=await this.service.product.deleteProduct(productId);
        this.ctx.status=200;
    }

}
module.exports=ShowController;
