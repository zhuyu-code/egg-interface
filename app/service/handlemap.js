'use strict';
const fs = require('fs');
const sourceMap = require('source-map');
const Service = require('egg').Service;

class HandlemapService extends Service {
  async insertError(results, versionId) {
    const result = await this.app.mysql.insert('error',
      {
        newfilename: results.source,
        versionId,
        colno: results.column,
        lineno: results.line,
        message: results.message,
        createTime: new Date(),
      });
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) {
      return true;
    }
    return false;

  }
  // 查询versionId
  async findVersionId(projectId, versionName) {
    console.log("进入函数");
    console.log(projectId);
    console.log(versionName)
    const versionIds = await this.app.mysql.select('version', {
      where: { projectId, versionName },
      columns: [ 'versionId' ],
    });
    const versionId = versionIds[0].versionId;
    return versionId;
  }
  async findmap() {
    const { filename, lineno, colno, message, projectId, versionName } = this.ctx.request.body;
    console.log("findmap函数"+projectId+versionName);
    // 通过projectId,versionName找到版本id
    const versionId = await this.service.handlemap.findVersionId(projectId, versionName);
    const post = await this.app.mysql.get('file',
      {
        versionId,
        fileName: filename,
      });
    const file = fs.readFileSync(post.sourceMap);
    const rawSourceMap = JSON.parse(file);
    const SourceMapConsumer = sourceMap.SourceMapConsumer;

    const result = await new Promise(resolve => {
      const source = SourceMapConsumer.with(rawSourceMap, null, consumer => {
        const origin = consumer.originalPositionFor({
          line: lineno,
          column: colno,
        });
        consumer.destroy();
        resolve(origin);
      });
    });

    result.message = message;
    console.log(result);
    // 将结果放入数据库error表中存储起来
    const log = await this.service.handlemap.insertError(result, versionId);
    if (log) {
      return result;
    }
    return { message: '插入错误' };
  }
}
module.exports = HandlemapService;
