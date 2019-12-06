const fs=require("fs");
//使用文件的形式
//同步读取文件
const fileSync=fs.readFileSync("./package-lock.json",{encoding:"utf8"});//不设置编码的情况下返回buffer

//同步写文件
const writeFile=fs.writeFileSync("./zhuyu2.json",fileSync);//返回undefined

//异步读取文件
fs.readFile("./package.json",{encoding:"utf-8"},(err,data)=>{
    if(err) throw err;
    //异步写文件
    fs.writeFile("./zhuyu3.json",{encoding:"utf-8"},err=>{
        if (err) throw err
        console.log("文件写入成功")
    })
});


//使用流的形式

//创建读取流
const readStream=fs.createReadStream("./package.json");
console.log(readStream);
//创建写入流
const writeStream=fs.createWriteStream("./zhuyu4.json")
readStream.pipe(writeStream)


