'use strict';

const Service = require('egg').Service;

class ErrorService extends Service {

  //根据projectId查询错误
  async findProjectIdError(projectId){
    const results = await this.app.mysql.query('select * from version a join error b on a.versionId=b.versionId where projectId=?', [projectId]);
   if(results){
     return {
       code:600,
       data:results,
       message:"查询成功"
     }
   }else{
     return {
       code:601,
       data:"",
       message:"查询失败"
     }
   }

  }
  //根据versionId查询错误
  async findAllError(versionId,page,pageSize) {
    const limitSize=parseInt(pageSize);
    const offsetSize=(parseInt(page)-1)*parseInt(pageSize);
    const selectError = await this.app.mysql.select('error', {
      where:{
        versionId
      },
      orders:[['createTime','desc']],
      limit:limitSize,
      offset:offsetSize
    });
    const selectErrorAll=await this.app.mysql.select('error',{
      where:{
        versionId:versionId
      }
    });
    const length=selectErrorAll.length;
    return {
      list:selectError,
      total:length
    };
  }

  //根据日期选择
  async findErrorSort(versionId,page,pageSize,date1,date2){
    const sql=`select * from error where versionId=${versionId} AND createTime BETWEEN '${date1}' and '${date2}' limit ${page-1},${page*pageSize}`;
    const data=await this.app.mysql.query(sql);
    return data
  }
}

module.exports = ErrorService;
