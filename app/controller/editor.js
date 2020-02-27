'use strict';
const Controller=require('egg').Controller;
class EditorController extends Controller{

  async findEditorAll(){
    const {projectId}=this.ctx.params;
    const git target=await this.service.editor.findEditorAll(projectId);
    if(target[0].editor){
      this.ctx.body= {
        code:600,
        message:"查询成功////",
        data:target
      }
    }else{
      this.ctx.body= {
        code:601,
        message:"富文本为空,无内容",
        data:""
      }
    }
  }

  async uploadEditor(){
    const {projectId}=this.ctx.params;
    const {htmlContent}=this.ctx.request.body
    const results=await this.service.editor.uploadEditor(projectId,htmlContent);
    if(results.affectedRows===1){
      this.ctx.body={
        code:800,
        message:"保存成功",
        data:""
      }
    }else{
      this.ctx.body={
        code:801,
        message:"保存失败",
        data:""
      }
    }
  }
}
module.exports=EditorController;
