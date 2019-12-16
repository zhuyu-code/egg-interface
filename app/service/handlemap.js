'use strict'
const fs=require("fs");
const sourceMap=require("source-map");
const Service=require("egg").Service;

class HandlemapService extends Service{
  async insertError(results,appid,versionid){
    const result = await this.app.mysql.insert('error', 
    { 
      appid:appid,
      versionid:versionid,
      filename: results.source,
      colno:results.column,
      lineno:results.line,
      message:results.message
    }); 
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      return true;
    }else{
      return false;
    }
  }
    async findmap(){
      console.log(this.ctx.request.body);
        let {filename,lineno,colno,message,appid,versionid}=this.ctx.request.body;
        console.log(appid);
        const post = await this.app.mysql.get('map', 
        {
          appid:appid,
          versionid:versionid,
          filename:filename
        });
        console.log(post);
        let file=fs.readFileSync(post.path);
        let rawSourceMap=JSON.parse(file);

        const SourceMapConsumer=sourceMap.SourceMapConsumer;

        const result = await new Promise(resolve => {
          const source = SourceMapConsumer.with(rawSourceMap, null,  consumer => {
          let origin= consumer.originalPositionFor({
              line: lineno,
              column: colno
            })
            console.log("进入打印了------------")
            console.log(origin)
            consumer.destroy();
            resolve(origin);
          });
        });
        console.log(result);
        result.message=message;
       let log=await this.service.handlemap.insertError(result,appid,versionid);
       if(log){
        return result
       }
        return {message:"错误"};
    }
}
module.exports=HandlemapService