'use strict';

// app/service/home.js
const Service = require('egg').Service;

/**
 * 指定users表格式
  {
        "id": 0,
        "name": "zhuyu",
        "age": 21,
        "comment": "极其优秀",
        "school": "西南石油大学"
    }
 */

class UserService extends Service {

  //查询全部的用户信息
  async findAll() {
    return await this.app.mysql.query("select * from users")
    // this.success("该邮箱未注册")
  }

  //查询指定用户的信息
  async findOne(){
    return await this.app.mysql.get('users', { id: this.ctx.params.id });
  }

  //增加指定用户信息
  async add(){
  const result = await this.app.mysql.insert('users', this.ctx.request.body);
  // 判断插入成功
  const insertSuccess = result.affectedRows === 1;
      if(insertSuccess){
  return "插入成功"
  }
 }
 //修改指定用户信息
async update(){
  const row = this.ctx.request.body;
  const options = {
    where: {
      id:this.ctx.params.id
    }
};
const result = await this.app.mysql.update('users', row, options); // 更新 users 表中的记录

// 判断更新成功
const updateSuccess = result.affectedRows === 1;
  if(updateSuccess){
    return "修改成功";
  }else{
    return "修改失败";
  }
  }


 //删除指定用户信息
  async delete(){
    const result= await this.app.mysql.delete('users', {id:this.ctx.params.id});
    if(result.affectedRows===1){
    return "删除成功";
    }else{
    return "删除失败";
  }
 }
}

module.exports = UserService;
