const path =require("path");
const Axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");

class WebpackOnBuildPlugin {
    constructor(config){
        const {root,url,maxContentLength,appid,versionid}=config;
        this.root=root;
        this.url=url;
        this.maxContentLength=maxContentLength;
        this.appid=appid;
        this.versionid=versionid
    }
    apply(compiler) {
        compiler.plugin('done', this.callback);
      }
      callback=()=>{
      //遍历文件夹逻辑
      const root=this.root
      var list = fs.readdirSync(root);
      let results=[];
      list.forEach(file=>{
        if(path.extname(file)=='.map'){
          results=results.concat(path.resolve(root,file));
        }
      })
      this.uploadFile(results);
      };
      uploadFile=(paths)=>{
        let formData = new FormData();
        formData.append("appid",this.appid);
        formData.append("versionid",this.versionid);
        paths.forEach(item=>{
          const readStream=fs.createReadStream(item)
          formData.append(`${path.basename(item)}`,readStream);
        })
       
        let config = {
            headers: formData.getHeaders()
        }
        Axios.post(this.url,formData, config,{maxContentLength:this.maxContentLength}).then(
        (res)=>{
        console.log(res.data)
        });

    }

  }
  
  module.exports = WebpackOnBuildPlugin;