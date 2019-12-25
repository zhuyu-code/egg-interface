'use strict';

const Service=require('egg').Service;

class showService extends Service{
    /*查询所有的产品信息*/
    async findProductAll(){
        const productList=this.app.mysql.select('product');
        return productList;
    }

    /*增加产品信息*/
    async addProduct(){
        const {productName,productDesc,productCategory}=this.ctx.request.body;

        //防止产品名为空
        if(!productName){
            return {
                code:400,
                message:"产品名不能为空"
            }
        }
        //查询产品名是否重复，因为产品名必须不能一样，做一个检查。
        const selectProductName=await this.app.mysql.get('product',{productName:productName});
        if(selectProductName){
            return {
                code:400,
                message:"已经有相同的产品名"
            } 
            
        }
        //将前端的产品信息插入到product表中
        const insertProduct=await this.app.mysql.insert('product',{
            productName:productName,
            productDesc:productDesc,
            productCategory:productCategory
        })
        //判断是否插入成功
        if(insertProduct.affectedRows===1){
            return {
                code:200,
                message:"添加成功"
            }
        }else{
            return {
                code:400,
                message:"添加失败"
            }
        }
    }
   /*更新产品信息 */
    async updateProduct(){
        const productId=this.ctx.params.productId;
        const {productName,productDesc,productCategory}=this.ctx.request.body;
        console.log(productName,productDesc,productCategory);
        //首先查询产品名是否存在，如果存在就不能修改
        const selectProduct=await this.app.mysql.get('product',{
            productName:productName
        })
        if(selectProduct){
            return {
                code:400,
                message:"你上传产品名和已有的重复，请重新修改"
            }
        }
        const row={
            productName:productName,
            productDesc:productDesc,
            productCategory:productCategory
        }
        const options = {
            where: {
              productId: productId
            }
          };
        const result = await this.app.mysql.update('product',row,options);
       if(result.affectedRows===1){
           return {
               code:200,
               message:"更新成功"
           }
       }else{
           return {
               code:400,
               message:"更新失败"
           }
       }
    }

    async deleteProduct(){
        const productId=this.ctx.params.productId;
  
        const result = await this.app.mysql.delete('product', {
            productId: productId,
          });
          console.log(result);
          if(result.affectedRows===1){
              return {
                  code:200,
                  message:"删除成功"
              }
          }else{
              return {
                  code:400,
                  message:"删除失败"
              }
          }
    }
}
module.exports=showService;