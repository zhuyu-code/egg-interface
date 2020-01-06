'use strict';

const Service = require('egg').Service;

class ErrorService extends Service {
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

  async findErrorSort(versionId,page,pageSize,date1,date2){
    const sql=`select * from error where versionId=${versionId} AND createTime BETWEEN '${date1}' and '${date2}' limit ${page-1},${page*pageSize}`;
    const data=await this.app.mysql.query(sql);
    return data
  }
}

module.exports = ErrorService;
