'use strict'
const fs=require("fs");
const sourceMap=require("source-map");
const Service=require("egg").Service;

class HandlemapService extends Service{
  async insertError(results,versionId){
    const result = await this.app.mysql.insert('error', 
    { 
      newfilename:results.source,
      versionId:versionId,
      colno:results.column,
      lineno:results.line,
      message:results.message,
      createTime:new Date()
    }); 
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      return true;
    }else{
      return false;
    }
  }
  //查询versionId
  async findVersionId(productName,projectName,versionName){
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
    const versionIds=await this.app.mysql.select("version",{
      where:{projectId:projectId,versionName:versionName},
      columns:["versionId"]
    })
    const versionId=versionIds[0].versionId;
    return versionId;
  }
    async findmap(){
        let {filename,lineno,colno,message,productName,projectName,versionName}=this.ctx.request.body;
        //通过productName,projectName,versionName找到版本id
        const versionId=await this.service.handlemap.findVersionId(productName,projectName,versionName);
        const post = await this.app.mysql.get('file', 
        {
          versionId:versionId,
          fileName:filename
        });
        let file=fs.readFileSync(post.sourceMap);
        let rawSourceMap=JSON.parse(file);
        const SourceMapConsumer=sourceMap.SourceMapConsumer;

        const result = await new Promise(resolve => {
          const source = SourceMapConsumer.with(rawSourceMap, null,  consumer => {
          let origin= consumer.originalPositionFor({
              line: lineno,
              column: colno
            })
            consumer.destroy();
            resolve(origin);
          });
        });
     
        result.message=message;
        console.log(result);
        //将结果放入数据库error表中存储起来
       let log=await this.service.handlemap.insertError(result,versionId );
       if(log){
        return result
       }
        return {message:"插入错误"};
    }
}
module.exports=HandlemapService