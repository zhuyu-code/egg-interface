'use strict';

const Service=require('egg').Service;

class EditorService extends Service{
  async findEditorAll(projectId){
    const target=this.app.mysql.query("select editor from project where projectId=?",[projectId])
    return target;
  }
  async uploadEditor(projectId,htmlContent){
    const results = await this.app.mysql.query('update project set editor= ? where projectId = ?', [htmlContent, projectId]);
    return results;
  }
}

module.exports=EditorService;
