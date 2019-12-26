'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path=require("path");
const sendToWormhole = require('stream-wormhole');
var pump = require('pump')//用于处理pipe结束回调函数处理
class SearchController extends Controller {

  /**
   * @router POST /fileload
   * @desc: 这是单个文件上传controller
   * @acess 允许访问
   */
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = path.basename(file.filename);//取出末尾文件名和扩展名
    const file_path=file.filepath;//临时文件路径
    try {
      // 读取文件
     let filek = fs.readFileSync(file_path) ;
     // 将文件存到指定位置
     const abpath=path.resolve(path.dirname("./"),`./app/public/${name}`)
     fs.writeFileSync(abpath, filek);//还原到指定public静态资源目录
     const result=await this.service.search.upload(name,abpath);
     ctx.body = {
      code:200,
      message:result
    };
    } catch{
      ctx.body={
        code:404,
        message:"上传文件失败"
      }
    }
    finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath);
    }
  }

  /**
   * @router POST /fileloads
   * @desc: 这是多个文件上传controller
   * @acess 允许访问
   */
    async uploads(){
    const { ctx } = this;
    for (const file of ctx.request.files) {
      try {
        // 依次读取文件
     let filek = fs.readFileSync(file.filepath) ;
      // 依次将文件存到指定位置
      const abpath=path.resolve(path.dirname("./"),`./app/public/${path.basename(file.filename)}`);
      fs.writeFileSync(abpath, filek);//还原到指定public静态资源目录
       const result=await this.service.search.upload(file.filename,abpath);
        ctx.body = {
          code:200,
          message:result
        };
      } finally {
        // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
    }
}


  /**
   * @router POST /fileloadStream
   * @desc: 这是单个文件流上传controller
   * @acess 允许访问
   */
   async uploadStream(){
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);
    const target=path.resolve("./app/public",`${name}`);
    const writeStream=fs.createWriteStream(target);
    await this.service.search.makeFile(stream,writeStream,name,target);
   }


  /**
   * @router POST /fileloadsStream
   * @desc: 这是多个文件流上传controller
   * @acess 允许访问
   */
  async uploadsStream(){
    const ctx = this.ctx;
    const parts = ctx.multipart();
    //调用处理多文件的service的内容
    await this.service.search.makeFiles(parts);
  }
}


module.exports = SearchController;
