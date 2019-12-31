'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
const Status=require('../util/httpStatus')
class showService extends Service {
  /* 查询所有的产品信息 */
  async findProductAll() {
    const productList = this.app.mysql.select('product');
    return productList;
  }

  /* 增加产品信息*/
  async addProduct(productName, productDesc, productCategory,createPerson) {

    // 防止产品名为空
    if (!productName) {
      return {
        code: Status.addError,
        message: '产品名不能为空',
      };
    }
    // 查询产品名是否重复，因为产品名必须不能一样，做一个检查。
    const selectProductName = await this.app.mysql.get('product', {
      productName,
    });
    if (selectProductName) {
      return {
        code: Status.addError,
        message: '已经有相同的产品名',
      };
    }
    // 将前端的产品信息插入到product表中
    //生成32位uuid的Id
  const productId=uuidv1();
  const createTime=new Date();
  const updateTime=new Date();
  const createPersonId=uuidv1();
    const insertProduct = await this.app.mysql.insert('product', {
      productName,
      productDesc,
      productCategory,
      createPerson,
      productId,
      createTime,
      updateTime,
      createPersonId
    });
    // 判断是否插入成功
    if (insertProduct.affectedRows === 1) {
      return {
        code: 200,
        message: '添加成功',
      };
    }
    return {
      code: 400,
      message: '添加失败',
    };

  }
  /* 更新产品信息 */
  async updateProduct(productId,productName, productDesc, productCategory) {

    // 首先查询产品名是否存在，如果存在就不能修改
    const selectProduct = await this.app.mysql.get('product', {
      productName,
    });
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
    return {
      code: Status.updateError,
      message: '更新失败',
    };

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
