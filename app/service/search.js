'use strict';

const Service = require('egg').Service;

class SearchService extends Service {
  async upload(name,file_path) {
    const result = await this.app.mysql.insert('file', { name: name ,file_path:file_path}); 
    // 判断插入成功
  const insertSuccess = result.affectedRows === 1;
  if(insertSuccess){
    return '成功';
  }else{
    return '失败';
  }
  }
}

module.exports = SearchService;
