'use strict';

// app/service/home.js
const Service = require('egg').Service;

class VersionService extends Service {
    
    //根据projectId查询指定version
    async findVersionAll(){
        const {projectId}=this.ctx.request.body;
        console.log(projectId);
       const selectVersionAll= this.app.mysql.get('version',{
            projectId:projectId
        })
        return selectVersionAll;
    }
}

module.exports = VersionService;
