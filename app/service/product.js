'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
const Status=require('../util/httpStatus');
const moment=require('moment');
class showService extends Service {
  /* 查询所有的产品信息 */
  async findProductAll(userId,page,pageSize) {
    const limitSize=parseInt(pageSize);
    const offsetSize=(parseInt(page)-1)*pageSize;
    const productList = await this.app.mysql.select('product',
    {
      where:{
        userId:userId
      },
      orders:[['updateTime','desc']],
      limit:limitSize,
      offset:offsetSize
    });
    const selectAll=await this.app.mysql.select('product',{
      where:{
        userId:userId
      }
    });
    const length=selectAll.length;
    return {
      list:productList,
      total:length
    };
  }
  /**产品模糊查询接口 */
  async findProductSearch(userId,target,page,pageSize){
    const sql=`select * from product where productName like "%${target}%" AND userId='${userId}' ORDER BY 'updateTime' DESC LIMIT ${page-1},${pageSize}`;
    const content= await this.app.mysql.query(sql);
    const selectAll=await this.app.mysql.query(`select * from product where productName like "%${target}%" AND userId='${userId}' ORDER BY 'updateTime' DESC`);
    const length=selectAll.length;
    return {
      list:content,
      total:length
    };
  }


  /* 增加产品信息*/
  async addProduct(userId,productName, productDesc, productCategory,createPerson) {
    // 防止产品名为空
    if (!productName) {
      return {
        code: Status.addError,
        message: '产品名不能为空',
      };
    }
    // 查询产品名是否重复，因为产品名必须不能一样，做一个检查。
    const selectProductName = await this.app.mysql.select('product', {
      where:{
        userId:userId,
        productName,
      }
    });
    console.log(selectProductName);
    if (selectProductName.length!==0) {
      return {
        code: Status.addError,
        message: '已经有相同的产品名',
      };
    }
    // 将前端的产品信息插入到product表中
    //生成32位uuid的Id
  const productId=uuidv1();
  const createTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const updateTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const insertProduct = await this.app.mysql.insert('product', {
      productName,
      productDesc,
      productCategory,
      createPerson,
      productId,
      createTime,
      updateTime,
      userId
    });
    // 判断是否插入成功
    if (insertProduct.affectedRows === 1) {
      return {
        code: Status.addSuccess,
        message: '添加成功',
      };
    }
    return {
      code: Status.addError,
      message: '添加失败',
    };

  }
  /* 更新产品信息 */
  async updateProduct(productId,productName, productDesc, productCategory) {

    // 首先查询产品名是否存在，如果存在就不能修改
    const selectProduct = await this.app.mysql.get('product', {
      productName,
    });
    console.log("打印")
    console.log(selectProduct);
    if (selectProduct) {
      return {
        code: Status.updateError,
        message: '你上传产品名和已有的重复，请重新修改',
      };
    }
    const updateTime=new Date();
    const row = {
      productName,
      productDesc,
      productCategory,
      updateTime
    };
    const options = {
      where: {
        productId,
      },
    };

    const result = await this.app.mysql.update('product', row, options);
    if (result.affectedRows === 1) {

      return {
        code: Status.updateSuccess,
        message: '更新成功',
      };
    }

   else{
    console.log("返回值3")
    return {
      code: Status.updateError,
      message: '更新失败',
    };
   }
  }

  async deleteProduct(productId) {
    const result = await this.app.mysql.delete('product', {
      productId,
    });
    if (result.affectedRows === 1) {
      return {
        code: Status.deleteSuccess,
        message: '删除成功',
      };
    }
    return {
      code: Status.deleteError,
      message: '删除失败',
    };

  }
}
module.exports = showService;
