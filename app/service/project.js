'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
class ProjectService extends Service {
  // 查询所有的项目信息
  async findProjectAll() {
    const productId = this.ctx.params.productId;
    const projectList = this.app.mysql.select('project', {
      where: { productId },
    });
    return projectList;
  }
  // 增加一个项目信息
  async addProject() {
    const productId = this.ctx.params.productId;
    const { projectName, projectApp, projectDesc,projectGroup } = this.ctx.request.body;
    console.log(projectName);
    if (!projectName) {
      return '项目名不能为空';
    }
    const selectProjectName = await this.app.mysql.select('project', {
      where: {
        productId,
        projectName,
      },
    });
    if (selectProjectName.length !== 0) {
      return '此产品已经有和你一样的项目名存在了';
    }
    const projectId=uuidv1();
    const createTime=new Date();
    const updateTime=new Date();
    const insertProject = await this.app.mysql.insert('project', {
      projectName,
      projectDesc,
      productId,
      projectApp,
      projectGroup,
      projectId,
      createTime,
      updateTime
    });
    console.log(insertProject);
    if (insertProject.affectedRows === 1) {
      return '添加项目成功';
    }
    return '添加项目失败';

  }
  //更新产品信息
  async updateProject() {
    const { projectId } = this.ctx.params;
    const { projectName, projectApp, projectDesc,productId } = this.ctx.request.body;
    if (!projectName) {
      return '项目名不能修改为空';
    }
    // 查询指定产品里面是否项目名重复
    const selectProject = await this.app.mysql.select('project', {
      where: {
        productId,
        projectName,
      },
    });
    if (selectProject.length !== 0) {
      return '在此产品中已经有相同的项目名了，请重新输入修改';
    }
    // 根据信息修改project表;
    const row = {
      projectName,
      projectApp,
      projectDesc,
    };
    const options = {
      where: {
        projectId,
      },
    };
    const result = await this.app.mysql.update('project', row, options);
    if (result.affectedRows === 1) {
      return '更新成功';
    }
    return '更新失败';

  }
    //根据指定projectId删除指定项目。
  async deleteProject() {
    const projectId = this.ctx.params.projectId;
    const result = await this.app.mysql.delete('project', {
      projectId,
    });
    if (result.affectedRows === 1) {
      return '删除成功';
    }
    return '删除失败，请检查上传的projectId';
  }

}
module.exports = ProjectService;
