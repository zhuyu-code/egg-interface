'use strict';

const Service = require('egg').Service;

const sendToWormhole = require('stream-wormhole');
const path=require("path");
const fs=require("fs");
const pump=require("pump");

class SearchService extends Service {

  async upload(appid,versionid,name,file_path) {
    const post = await this.app.mysql.get('map', 
    { appid:appid,
      versionid:versionid,
      filename: name ,
      path:file_path});
      if(post){
        return "数据库已经有数据了"
      }
    const result = await this.app.mysql.insert('map', 
    { 
      appid:appid,
      versionid:versionid,
      filename: name ,
      path:file_path}); 
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      return '上传source-map成功';
    }else{
      return '上传source-map失败';
    }
    }

  async makeFile(stream,writeStream,name,target){
      // 文件和数据库处理
      try {
        await pump(stream,writeStream);//promise执行成功才会执行插入数据库操作。
        const result=await this.service.search.upload(stream.filename,target);
        this.ctx.body = {
          code:200,
          message:stream.fields
        };
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(stream);
        throw err;
      }
  }

  async makeFiles(parts){
        // parts() 返回 promise 对象
        let part,appid,versionid
        while ((part = await parts()) != null) {
          if (part.length) {
            if(part[0]==="appid"){
              appid=part[1]
            }else if(part[0]==="versionid"){
              versionid=part[1]
            }
          } else {
            if (!part.filename) {
              // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
              throw new Error("没有选择文件就上传了")
            }
            try {
              
         
              const target=path.resolve("./app/public",`${appid}-${versionid}-${part.filename}`);
              const writeStream=fs.createWriteStream(target);
              await pump(part,writeStream);//将回调函数变成一个promise,
              const message=await this.service.search.upload(appid,versionid,path.basename(part.filename,".map"),target);
              this.ctx.body={
                code:200,
                message:message
              }
            } catch (err) {
              // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
              await sendToWormhole(part);
              throw err;
            }
          }
        }
  }
}

module.exports = SearchService;
