'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path=require("path");
const sendToWormhole = require('stream-wormhole');
class SearchController extends Controller {

  /**
   * @router POST /fileload
   * @desc: 这是单个文件上传controller
   * @acess 允许访问
   */
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = 'egg-zhuyu-file/' + path.basename(file.filename);
    const file_path=file.filepath;//临时文件路径
    try {
      // 读取文件
     let filek = fs.readFileSync(file_path) 
     // 将文件存到指定位置
     fs.writeFileSync("./app/public/zhuyu.jpg", filek);
     const result=await this.service.search.upload(name,file_path);
     ctx.body = {
      code:200,
      message:result
    };
    }catch{
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
       const result=await this.service.search.upload(file.filename,file.filepath);
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
    console.log(stream);
    const name = 'egg-multipart-test/' + path.basename(stream.filename);
    // 文件处理，上传到云存储等等
    try {
      const result=await this.service.search.upload(stream.filename,stream.filepath);
      ctx.body = {
        code:200,
        message:result
      };
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
   }
  /**
   * @router POST /fileloadsStream
   * @desc: 这是多个文件流上传controller
   * @acess 允许访问
   */
  async uploadsStream(){

  }
}


module.exports = SearchController;
