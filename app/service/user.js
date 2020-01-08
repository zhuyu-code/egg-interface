'use strict'

const Service=require('egg').Service;
const JWT = require('jsonwebtoken');
const utility = require("utility")//密码加密
const uuidv1 = require('uuid/v1');

class UserService extends Service{
  async register(registerMsg){
    const {userName}=registerMsg;
    console.log(userName);
    let res={};
    const content=await this.app.mysql.get('user',{
      userName:userName
    })
    if(content){
      res.code=-2;
      res.msg='注册失败,已经有相同的用户名了';
      res.data={};
      res.status='error'
    }else{
      registerMsg.password=utility.md5(registerMsg.password);
      registerMsg.userId=uuidv1();
      const result=await this.app.mysql.insert('user',registerMsg);
      if(result.affectedRows===1){
          res.code=1;
          res.msg='注册成功';
          res.data={};
          res.status='sucess'
      }else{
          res.code=-1;
          res.msg='注册失败';
          res.data={};
          res.status='error'
    }
    }
    return res;
  }
  async login(loginMsg) {
    const res = {};
    // 在当前数据库中验证此用户思否存在
    const queryResult = await this.app.mysql.get('user',{
      userName: loginMsg.userName,
    });
    if (!queryResult) {
      res.code = -2;
      res.msg = '用户不存在，请前去注册';
      res.data = {};
      res.status = 'failed';
    } else {
      const result = await this.app.mysql.get('user',loginMsg);
      if (!result) {
        res.code = -1;
        res.msg = '用户信息不正确';
        res.data = {};
        res.status = 'failed';
      } else {
      // 签发token
        const token = JWT.sign({
          userName: result.userName,
        },
        this.config.jwt.secret, {
          expiresIn: 600 * 600,
        });
        res.data = result.userName;
        res.code = 1;
        res.token = token;
        res.data=result;
        res.message = '登录成功';
      }
    }
    return res;
  }
}
module.exports=UserService
