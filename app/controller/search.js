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
    // 文件处理，上传到云存储等等
    try {
      const target=path.resolve("./app/public",`${name}`);
      const writeStream=fs.createWriteStream(target);
      stream.pipe(writeStream);
      const result=await this.service.search.upload(stream.filename,target);
      ctx.body = {
        code:200,
        message:stream.fields
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
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
       console.log(part);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }

        try {
          const target=path.resolve("./app/public",`${part.filename}`);
          const writeStream=fs.createWriteStream(target);
          part.pipe(writeStream);
          this.service.search.upload(part.filename,target);
          ctx.body={
            code:200,
            message:part.fieldname
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


module.exports = SearchController;
