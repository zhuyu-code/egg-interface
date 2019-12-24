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
        if(!productName){
            return "产品名不能为空"
        }
        //查询产品名是否重复，因为产品名必须不能一样，做一个检查。
        const selectProductName=await this.app.mysql.select('product',{productName:productName});
        console.log("-----------")
       console.log(selectProductName);
        if(selectProductName){
            return "已经有相同的产品名"
        }
        const insertProduct=await this.app.mysql.insert('product',{
            productName:productName,
            productDesc:productDesc,
            productCategory:productCategory
        })
        console.log(insertProduct);
        if(insertProduct.affectedRows===1){
            return "添加成功"
        }else{
            return "添加失败"
        }
    }
    //查询所有的项目信息
    async findProjectAll(){
        const projectList=this.app.mysql.select('project');
        return projectList
    }
    //增加一个项目信息
    async addProject(){
        const {productId,projectName,projectApp,projectDesc}=this.ctx.request.body;
        if(!projectName){
            return "项目名不能为空";
        }
        const selectProjectName=this.app.mysql.select('project',{
            productId:productId,
            projectName:projectName
        })
        if(selectProjectName){
            return "已经有相同的项目名存在了"
        }
        const insertProject=await this.app.mysql.insert('project',{
            projectName:projectName,
            projectDesc:projectDesc,
            productId:productId,
            projectApp:projectApp
        })
        if(insertProject.affectedRows===1){
            return "添加项目成功";
        }else{
            return "添加项目失败";
        }
    }
}
module.exports=showService;