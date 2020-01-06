'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
const Status=require('../util/httpStatus');
const moment=require('moment');
class ProjectService extends Service {
  // 查询所有的项目信息
  async findProjectAll(productId,page,pageSize) {
    const limitSize=parseInt(pageSize);
    const offsetSize=(parseInt(page)-1)*pageSize;
    const projectList =await this.app.mysql.select('project', {
      where: { productId },
      orders:[['updateTime','desc']],
      limit:limitSize,
      offset:offsetSize
    });
    const selectProjectAll=await this.app.mysql.select('project',{
      where:{
        productId:productId
      }
    });
    const length=selectProjectAll.length;
    return {
      list:projectList,
      total:length
    };
  }
  // 模糊查询产品信息
  async findProjectSearch(productId,target,page,pageSize){
    const selectProjectSearch=await this.app.mysql.query(`select * from project
    where productId=? AND projectName like '%${target}%'`,[productId]);
    const length=selectProjectSearch.length;
    const content=await this.app.mysql.query(`select * from project where productId=? AND projectName
     like '%${target}%' ORDER BY 'updateTime' Desc LIMIT ${page-1},${pageSize}`,[productId]);
    return {
      list:content,
      total:length
    };
  }

  //返回错误列表
  async findProjectSort(arr,projectId){
    console.log(arr);
    const a=arr[0];
    const b=arr[1].replace(/\b(0+)/gi,"")-1;
    const c=arr[2].replace(/\b(0+)/gi,"");
    const date1=moment(new Date(a,b,c,0)).format("YYYY-MM-DD HH:MM:SS");
    const date2=moment(new Date(a,b,c,23)).format("YYYY-MM-DD HH:MM:SS");
    const data=await this.app.mysql.query(`SELECT
    DATE_FORMAT(error.createTime, '%H') Hours,
    COUNT(error.errorId) Count
  FROM
   version INNER JOIN error on version.versionId=error.versionId
  WHERE
	  version.projectId='${projectId}' AND
    error.createTime BETWEEN '${date1}'
  AND '${date2}'
  GROUP BY Hours`)
    return data
  }

  // 增加一个项目信息
  async addProject(userId,createPerson,productId,projectName, projectApp, projectDesc) {

    if (!projectName) {
      return {
        code:Status.addError,
        message:'项目名不能为空'
      };
    }
    const selectProjectName = await this.app.mysql.select('project', {
      where: {
        productId,
        projectName,
      },
    });
    if (selectProjectName.length !== 0) {
      return {
        code:Status.addError,
        message:'此产品已经有和你一样的项目名存在了'
      };
    }
    const projectId=uuidv1();
    const createTime=new Date();
    const updateTime=new Date();
    const insertProject = await this.app.mysql.insert('project', {
      projectName,
      projectDesc,
      productId,
      projectApp,
      projectId,
      createTime,
      updateTime,
      userId,
      createPerson
    });
    if (insertProject.affectedRows === 1) {
      return {
        code:Status.addSuccess,
        message:"添加项目成功"
      };
    }else{
      return {
        code:Status.addError,
        message:'添加项目失败'
      };
    }


  }
  //更新产品信息
  async updateProject(projectId,projectName, projectApp, projectDesc,productId) {

    if (!projectName) {
      return {
        code:Status.updateError,
        message:'项目名不能修改为空'
      };
    }
    console.log(productId);
    console.log(projectName);
    // 查询指定产品里面是否项目名重复
    const selectProject = await this.app.mysql.select('project', {
      where: {
        productId,
        projectName,
      },
    });
    console.log("内容")
    console.log(selectProject);
    if (selectProject.length !== 0) {
      return {
        code:Status.updateError,
        message:'在此产品中已经有相同的项目名了，请重新输入修改'
      };
    }
    // 根据信息修改project表;
    const row = {
      projectName,
      projectApp,
      projectDesc,
    };
    const options = {
      where: {
        projectId,
      },
    };
    const result = await this.app.mysql.update('project', row, options);
    if (result.affectedRows === 1) {
      return {
        code:Status.updateSuccess,
        message:'更新成功'
      };
    }
    return {
      code:Status.updateError,
      message:'更新失败'
    };

  }
    //根据指定projectId删除指定项目。
  async deleteProject(projectId) {

    const result = await this.app.mysql.delete('project', {
      projectId,
    });
    if (result.affectedRows === 1) {
      return {
        code:Status.deleteSuccess,
        message:'删除成功'
      };
    }
    return {
      code:Status.deleteError,
      message:'删除失败，请检查上传的projectId'
    };
  }

}
module.exports = ProjectService;
