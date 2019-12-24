"use strict";

const Service = require("egg").Service;

const sendToWormhole = require("stream-wormhole");
const path = require("path");
const fs = require("fs");
const pump = require("pump");
const uuidv1 = require("uuid/v1");

class SearchService extends Service {
  //通过productName查询表中的productId
  async findCascade(productName, projectName, versionName, versionDesc, obj) {
    //通过productName查询表中的productId
    const productIds = await this.app.mysql.select("product", {
      where: { productName: productName },
      columns: ["productId"]
    });
    if (productIds.length == 0) {
      return "没有注册此产品";
    }
    const productId = productIds[0].productId;
    const projectIds = await this.app.mysql.select("project", {
      where: { productId: productId, projectName: projectName },
      columns: ["projectId"]
    });
    if (projectIds.length == 0) {
      return "没有注册此项目";
    }
    const projectId = projectIds[0].projectId;

    const isExistVersionName = await this.app.mysql.get("version", {
      versionName: versionName,
      projectId:projectId
    });
    console.log(isExistVersionName);
    if (isExistVersionName) {
      return `${versionName}已经上传了sourcemap文件了`;
    }
    //注册自动事务
    const resultTran = await this.app.mysql.beginTransactionScope(
      async conn => {
        //操作1
        await conn.insert("version", {
          projectId: projectId,
          versionName: versionName,
          versionDesc
        });
       const versionIds=await conn.select("version",{
         where:{ 
           versionName: versionName,
          projectId:projectId},
          columns:["versionId"]
       })
       console.log(versionIds);
       const versionId=versionIds[0].versionId;
        // 操作2
        const tasks = Object.keys(obj).map(key => {
          return conn.insert("file", {
            fileName: key,
            sourceMap: obj[key],
            versionId: versionId
          });
        });
        await Promise.all(tasks);
        return { success: true };
      },
      this.ctx
    );
    if(resultTran.success){
      return resultTran
    }else{
      return '插入失败'
    }
  }

  async makeFile(stream, writeStream, name, target) {
    // 文件和数据库处理
    try {
      await pump(stream, writeStream); //promise执行成功才会执行插入数据库操作。
      const result = await this.service.search.upload(stream.filename, target);
      this.ctx.body = {
        code: 200,
        message: stream.fields
      };
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
  }

  async makeFiles(parts) {
    // parts() 返回 promise 对象
    let part,
      productName,
      projectName,
      versionName,
      versionDesc,
      obj = {};
    while ((part = await parts()) != null) {
      if (part.length) {
        if (part[0] === "productName") {
          productName = part[1];
        } else if (part[0] === "projectName") {
          projectName = part[1];
        } else if (part[0] === "versionName") {
          versionName = part[1];
        } else if (part[0] === "versionDesc") {
          versionDesc = part[1];
        }
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          throw new Error("没有选择文件就上传了");
        }
        try {
          const target = path.resolve(
            "./app/public",
            `${uuidv1().slice(0, 10)}-${part.filename}`
          );
          const writeStream = fs.createWriteStream(target);
          await pump(part, writeStream); //将回调函数变成一个promise,
          obj[path.basename(part.filename, ".map")] = target;
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
    }
    console.log(obj);
    const message = await this.service.search.findCascade(
      productName,
      projectName,
      versionName,
      versionDesc,
      obj
    );
    this.ctx.body = {
      message: message
    };
  }
}

module.exports = SearchService;
