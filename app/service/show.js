'use strict';

const Service=require('egg').Service;

class showService extends Service{
    //查询所有的产品信息
    async findProductAll(){
        const productList=this.app.mysql.select('product');
        return productList;
    }
    //查询所有的项目信息
    async findProjectAll(){
        const projectList=this.app.mysql.select('project');
        return projectList
    }
}
module.exports=showService;