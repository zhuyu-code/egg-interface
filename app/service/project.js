'use strict';

const Service=require('egg').Service;

class ProjectService extends Service{
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
module.exports=ProjectService;