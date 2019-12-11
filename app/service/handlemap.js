'use strict'
const fs=require("fs");
const sourceMap=require("source-map");
const Service=require("egg").Service;

class HandlemapService extends Service{
    async findmap(){
        let {filename,lineno,colno}=this.ctx.request.body;
        console.log(filename+lineno+colno);
        const post = await this.app.mysql.get('file', {name:filename});
        let file=fs.readFileSync(post.file_path);
        let rawSourceMap=JSON.parse(file);

        const SourceMapConsumer=sourceMap.SourceMapConsumer;

        const result = await new Promise(resolve => {
          const source = SourceMapConsumer.with(rawSourceMap, null,  consumer => {
          let origin= consumer.originalPositionFor({
              line: 1,
              column: 985
            })
            console.log("------------")
            console.log(origin)
            consumer.destroy();
            resolve(origin);
          });
        });
        console.log(result);
        return result;
    }
}
module.exports=HandlemapService