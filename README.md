## 基于source-map的bug监控系统后端

在线体验地址（1核2G的服务器有点low,可能会很卡）：http://122.51.175.158

[项目开发bug踩坑总结](./bug.md)

### 技术栈

Node.js企业级服务框架Egg.js，优点具有以下

- 提供基于 Egg 定制上层框架的能力 
- 高度可扩展的插件机制 
- 内置多进程管理 
- 基于 Koa 开发，性能优异 
- 框架稳定，测试覆盖率高 
- 渐进式开发

Mysql数据库，优点

**MySQL数据库的特点和优势:**

* MySQL性能卓越、服务稳定，很少出现异常宕机。

* MySQL开放源代码且无版权制约，自主性及使用成本低。

* MySQL历史悠久，用户使用活跃，遇到问题可以寻求帮助。

* MySQL体积小，安装方便，易于维护。

* MySQL口碑效应好，是的企业无需考虑就用之，LAMP、LNMP 流行架构。

* MySQL支持多种操作系统，提供多种API接口，支持多种开发语言，特别是PHP。

### 功能模块

1. 登录，注册
2. 处理SDK上传的.map文件
3. 产品增删改查，模糊查询
4. 项目增删改查，模糊查询，日期分类
5. sourc-map文件流的上传和接收
6. 版本处理
7. 错误处理
8. 富文本记录

### 页面展示

登录

![image-20200307214224327](./docs/image-20200307214224327.png)

产品页面

![image-20200307214326991](./docs/image-20200307214326991.png)

项目页面

![image-20200307214353552](./docs/image-20200307214353552.png)

错误展示

![image-20200307214426102](./docs/image-20200307214426102.png)

错误分析

![image-20200307214450711](./docs/image-20200307214450711.png)

富文本记录

![image-20200307214518578](./docs/image-20200307214518578.png)

### 接口文档

------

- **简要描述：** 

  - 注册信息接口

  **请求URL：** 
  - ` /register`
    

  **请求方式：**
  - POST 

  **参数：** 

  |  参数名 |是否必选  | 参数位置  | 参数类型|说明|
  |  ----  |---- |----  | ----|----|
  | userName  |  是|body | string|用户名
  | password  |  是|body | string|密码

   **返回示例**
   #### 返回成功
  ``` 
  {
      "code": 1,
      "msg": "注册成功",
      "data": {},
      "status": "sucess"
  }
  ```
   #### 返回失败
   ```
  {
      "code": -2,
      "msg": "注册失败,已经有相同的用户名了",
      "data": {},
      "status": "error"
  }
   ```

***

- **简要描述：** 

  - 登录信息接口

  **请求URL：** 
  - ` /login`
    

  **请求方式：**
  - POST 

  **参数：** 

  | 参数名   | 是否必选 | 参数位置 | 参数类型 | 说明   |
  | -------- | -------- | -------- | -------- | ------ |
  | userName | 是       | body     | string   | 用户名 |
  | password | 是       | body     | string   | 密码   |

  

   **返回示例**
   #### 返回成功
  ``` 
  {
      "data": {
          "username": "zhuyu",
          "password": "e10adc3949ba59abbe56e057f20f883e",
          "userId": "c1ffff10-31b6-11ea-a921-3beca1e9e6d6"
      },
      "code": 1,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg0NDczMzYsImV4cCI6MTU3ODQ1MDkzNn0.TeFNHcwGkaDlYuqFNdR2uWtITv-LuhcNKzpeiRkEIXY",
      "message": "登录成功"
  }
  ```
   #### 返回失败
   ```
  {
      "code": -1,
      "msg": "用户信息不正确",
      "data": {},
      "status": "failed"
  }
   ```

***

**简要描述：** 

- 获取全部产品信息接口

**请求URL：** 
- ` /product `
  

**请求方式：**
- GET 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| useId  |  是|params | string|用户名
| page  |  是|params | string|页码
| pageSize|  是 | params | string|分页大小

 **返回示例**
``` 
 {
    "code": 600,
    "message": "查询成功",
    "data": {
        "list": [
            {
                "productId": "b8e6fde0-2b9c-11ea-9d85-1b9864748d81",
                "productName": "产品4",
                "productDesc": "这是产品4",
                "productCategory": "测试",
                "createPerson": "杨啸锐",
                "createTime": "2019-12-31T07:11:10.526Z",
                "updateTime": "2019-12-31T07:11:10.526Z",
                "userId": "123456"
            },
            {
                "productId": "cf713070-2b93-11ea-8539-a3050da97f91",
                "productName": "产品3",
                "productDesc": "这产品真的非常好3",
                "productCategory": "安卓",
                "createPerson": "杜兰特",
                "createTime": "2019-12-31T06:07:22.871Z",
                "updateTime": "2019-12-31T06:07:22.871Z",
                "userId": "123456"
            }
        ],
        "total": 2
    }
}
```
 **返回参数说明** 

| 参数名          | 类型   | 说明     |
| :-------------- | :----- | -------- |
| productId       | string | 产品ID   |
| productName     | string | 产品名称 |
| productDesc     | string | 产品描述 |
| productCategory | string | 产品类型 |
| createPerson    | string | 创建人   |
| userId          | string | 创建人Id |
| createTime      | string | 创建时间 |
| updateTime      | string | 更新时间 |

***

**简要描述：** 

- 增加产品信息接口

**请求URL：** 
- ` /product`
  

**请求方式：**
- POST 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| useId  |  是|params | string|用户名ID
| productName  |  是|body | string|产品名
| productCategory|  是 | body | string|产品类型
| productDesc  |  是|body | string|产品描述
| createPerson|  是 | params | string|创建人

 **返回示例**
 #### 返回成功
``` 
{
    "code": 700,
    "message": "添加成功"
}
```
 #### 返回失败
 ```
 //产品名重复
{
    "code": 701,
    "message": "已经有相同的产品名"
}
//产品名为空
{
    "error": "Validation Failed",
    "detail": [
        {
            "message": "should not be empty",
            "code": "invalid",
            "field": "productName"
        }
    ]
}
//服务器错误
{
    "code": 500,
    "message": "添加失败"
}
 ```

***

**简要描述：** 

- 修改指定产品信息

**请求URL：** 
- ` /product/:productId `
  

**请求方式：**
- Put 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| productId  |  是|路由 | string|产品ID
| productName  |  是|body | string|产品名
| productCategory|  是 | body | string|产品类型
| productDesc  |  是|body | string|产品描述

 **返回示例**
 更新成功：
 ```
{
    "code": 800,
    "message": "更新成功"
}
 ```
 错误失败
``` 
{
    "code": 801,
    "message": "你上传产品名和已有的重复，请重新修改"
}
```

***

**简要描述：** 

- 删除指定产品信息

**请求URL：** 
- ` /product/:productId `

  

**请求方式：**
- DELETE 
**q请求参数**

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| productId  |  是|路由 | string|产品ID

 **返回示例**
 删除成功
 ```
{
    "code": 900,
    "message": "删除成功"
}
 ```
删除失败
``` 
{
    "code": 901,
    "message": "删除失败"
}
```

***

**简要描述：** 

- 产品信息模糊查询接口

**请求URL：** 
- ` /product/search `
  

**请求方式：**
- GET 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| useId  |  是|params | string|用户名
| page  |  是|params | string|页码
| pageSize|  是 | params | string|分页大小
| target|  是 | params | string|模糊查询内容

 **返回示例**
``` 
 {
    "code": 600,
    "message": "查询成功",
    "data": {
        "list": [
            {
                "productId": "b8e6fde0-2b9c-11ea-9d85-1b9864748d81",
                "productName": "产品4",
                "productDesc": "这是产品4",
                "productCategory": "测试",
                "createPerson": "杨啸锐",
                "createTime": "2019-12-31T07:11:10.526Z",
                "updateTime": "2019-12-31T07:11:10.526Z",
                "userId": "123456"
            },
            {
                "productId": "cf713070-2b93-11ea-8539-a3050da97f91",
                "productName": "产品3",
                "productDesc": "这产品真的非常好3",
                "productCategory": "安卓",
                "createPerson": "杜兰特",
                "createTime": "2019-12-31T06:07:22.871Z",
                "updateTime": "2019-12-31T06:07:22.871Z",
                "userId": "123456"
            }
        ],
        "total": 2
    }
}
```
 **返回参数说明** 

| 参数名          | 类型   | 说明     |
| :-------------- | :----- | -------- |
| productId       | string | 产品ID   |
| productName     | string | 产品名称 |
| productDesc     | string | 产品描述 |
| productCategory | string | 产品类型 |
| createPerson    | string | 创建人   |
| userId          | string | 创建人Id |
| createTime      | string | 创建时间 |
| updateTime      | string | 更新时间 |

***


**简要描述：** 

- 获取指定产品的全部项目信息

**请求URL：** 
- ` /product/:productId/project`
  

**请求方式：**
- GET 

** 参数：**

|参数名|参数位置|是否必须|类型|说明
|:-----  |:-----|-----                           |
|projectId |路由   |是  |string|项目Id|
|page |params   |是  |string|页码|
|pageSize |params   |是  |string|分页大小|

 **返回示例**

``` 
{
    "code": 600,
    "message": "查询成功",
    "data": {
        "list": [
            {
                "projectId": "0c4a4c30-2ba7-11ea-9d85-1b9864748d81",
                "projectName": "朱宇",
                "projectApp": "web",
                "projectDesc": "朱宇真帅",
                "productId": "b8e6fde0-2b9c-11ea-9d85-1b9864748d81",
                "createTime": "2019-12-31T08:25:05.000Z",
                "updateTime": "2019-12-31T08:25:05.000Z",
                "userId": "123456",
                "createPerson": "朱宇"
            },
            {
                "projectId": "c9f3b5f0-2ba2-11ea-9d85-1b9864748d81",
                "projectName": "杨啸锐",
                "projectApp": "react-native",
                "projectDesc": "这是一个好项目",
                "productId": "b8e6fde0-2b9c-11ea-9d85-1b9864748d81",
                "createTime": "2019-12-31T07:54:36.000Z",
                "updateTime": "2019-12-31T07:54:36.000Z",
                "userId": "123456",
                "createPerson": "朱宇"
            }
        ],
        "total": 2
    }
}
```

 **返回参数说明** 


| 参数名       | 类型   | 说明     |
| :----------- | :----- | -------- |
| projectId    | string | 项目ID   |
| projectName  | string | 项目名称 |
| projectDesc  | string | 项目描述 |
| projectApp   | string | 项目平台 |
| createPerson | string | 创建人   |
| userId       | string | 创建人Id |
| createTime   | string | 创建时间 |
| updateTime   | string | 更新时间 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

***

**简要描述：** 

- 增加项目信息接口

**请求URL：** 
- ` /product/project/:projectId`
  

**请求方式：**
- POST 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| useId  |  是|params | string|用户名ID
| createPerson  |  是|params | string|用户名
| projectName  |  是|body | string|项目名
| projectApp|  是 | body | string|项目平台
| projectDesc  |  是|body | string|项目描述

 **返回示例**
 #### 返回成功
``` 
{
    "code": 700,
    "message": "添加成功"
}
```
 #### 返回失败
 ```
 //产品名重复
{
    "code": 701,
    "message": "已经有相同的产品名"
}
//产品名为空
{
    "error": "Validation Failed",
    "detail": [
        {
            "message": "should not be empty",
            "code": "invalid",
            "field": "productName"
        }
    ]
}
//服务器错误
{
    "code": 500,
    "message": "添加失败"
}
 ```

***

**简要描述：** 

- 修改指定项目信息

**请求URL：** 
- ` /product/project/:projectId `
  

**请求方式：**
- Put 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| projectId  |  是|路由 | string|项目ID
| productId  |  是|body | string|产品ID
| projectName  |  是|body | string|项目名
| projectApp|  是 | body | string|项目平台
| projectDesc  |  是|body | string|项目描述

 **返回示例**
 更新成功：
 ```
{
    "code": 800,
    "message": "更新成功"
}
 ```
 错误失败
``` 
{
    "code": 801,
    "message": "你上传产品名和已有的重复，请重新修改"
}
```

***

**简要描述：** 

- 删除指定项目信息

**请求URL：** 
- ` /product/project/:projectId `

  

**请求方式：**
- DELETE 
**q请求参数**

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| projectId  |  是|路由 | string|产品ID

 **返回示例**
 删除成功
 ```
{
    "code": 900,
    "message": "删除成功"
}
 ```
删除失败
``` 
{
    "code": 901,
    "message": "删除失败"
}
```

***

**简要描述：** 

- 项目信息模糊查询接口

**请求URL：** 
- ` /product/:productId/project/search `
  

**请求方式：**
- GET 

**参数：** 

|  参数名 |是否必选  | 参数位置  | 参数类型|说明|
|  ----  |---- |----  | ----|----|
| useId  |  是|params | string|用户名
| page  |  是|params | string|页码
| pageSize|  是 | params | string|分页大小
| target|  是 | params | string|模糊查询内容

 **返回示例**
``` 
{
    "code": 600,
    "message": "查询成功",
    "data": {
        "list": [
            {
                "projectId": "0c4a4c30-2ba7-11ea-9d85-1b9864748d81",
                "projectName": "项目20",
                "projectApp": "应用2",
                "projectDesc": "这是一个浏览器项目2",
                "productId": "b8e6fde0-2b9c-11ea-9d85-1b9864748d81",
                "createTime": "2019-12-31T08:25:05.000Z",
                "updateTime": "2019-12-31T08:25:05.000Z",
                "userId": "123456",
                "createPerson": "朱宇"
            },
            {
                "projectId": "c9f3b5f0-2ba2-11ea-9d85-1b9864748d81",
                "projectName": "杨啸锐",
                "projectApp": "react-native",
                "projectDesc": "这是一个好项目",
                "productId": "b8e6fde0-2b9c-11ea-9d85-1b9864748d81",
                "createTime": "2019-12-31T07:54:36.000Z",
                "updateTime": "2019-12-31T07:54:36.000Z",
                "userId": "123456",
                "createPerson": "朱宇"
            }
        ],
        "total": 2
    }
}
```
 **返回参数说明** 

| 参数名       | 类型   | 说明     |
| :----------- | :----- | :------- |
| projectId    | string | 项目ID   |
| projectName  | string | 项目名称 |
| projectDesc  | string | 项目描述 |
| projectApp   | string | 项目类型 |
| createPerson | string | 创建人   |
| userId       | string | 创建人Id |
| createTime   | string | 创建时间 |
| updateTime   | string | 更新时间 |

***


**简要描述：** 

- 获取指定项目报错列表统计接口

**请求URL：** 
- ` /product/project/:projectId/sort`
  

**请求方式：**
- GET 

** 参数：**

|参数名|参数位置|是否必须|类型|说明
|:-----  |:-----|-----                           |
|projectId |路由   |是  |string|项目Id|
|date |params   |是  |string|选择的统计日期|

 **返回示例**

``` 
{
    "code": 600,
    "data": [
        {
            "Hours": "16",
            "Count": 1
        },
        {
            "Hours": "18",
            "Count": 1
        },
        {
            "Hours": "19",
            "Count": 1
        },
        {
            "Hours": "20",
            "Count": 2
        },
        {
            "Hours": "21",
            "Count": 1
        },
        {
            "Hours": "22",
            "Count": 1
        }
    ]
}
```

 **返回参数说明** 


| 参数名 | 类型   | 说明             |
| :----- | :----- | ---------------- |
| Hours  | string | 指定小时         |
| Count  | string | 指定小时错误数量 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

***


**简要描述：** 

- 获取指定项目的全部版本信息

**请求URL：** 
- ` /product/project/:projectId/version`
  

**请求方式：**
- GET 

** 参数：**、

|参数名|参数位置|是否必须|类型|说明
|:-----  |:-----|-----                           |
|projectId |路由   |是  |string|项目Id|
|page |params   |是  |string|页码|
|pageSize |params   |是  |string|分页大小|

 **返回示例**

``` 
{
    "code": 600,
    "message": "查询版本成功",
    "data": {
        "list": [
            {
                "versionId": 25,
                "versionName": "2.0.3",
                "versionDesc": "这个版本是玩的",
                "projectId": "0c4a4c30-2ba7-11ea-9d85-1b9864748d81",
                "createTime": "2020-01-06T01:25:05.000Z"
            },
            {
                "versionId": 24,
                "versionName": "2.0.2",
                "versionDesc": "这个版本是玩的",
                "projectId": "0c4a4c30-2ba7-11ea-9d85-1b9864748d81",
                "createTime": "2020-01-06T01:24:59.000Z"
            }
        ],
        "total": 2
    }
}
```

 **返回参数说明** 


| 参数名      | 类型   | 说明     |
| :---------- | :----- | -------- |
| projectId   | string | 项目ID   |
| projectName | string | 项目名称 |
| projectDesc | string | 项目描述 |
| projectApp  | string | 项目平台 |
| createTime  | string | 创建时间 |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

***


**简要描述：** 

- 获取指定版本的全部错误信息

**请求URL：** 
- ` /product/project/version/:versionId/errorList`
  

**请求方式：**
- GET 

** 参数：**、

|参数名|参数位置|是否必须|类型|说明
|:-----  |:-----|-----                           |
|versionId |路由   |是  |string|项目Id|
|page |params   |是  |string|页码|
|pageSize |params   |是  |string|分页大小|

 **返回示例**

``` 
{
    "code": 600,
    "message": "查询版本成功",
    "data": {
        "list": [
            {
                "errorId": 123,
                "newfilename": "webpack:///src/index2.js",
                "colno": "6",
                "lineno": "3",
                "message": "Uncaught Error: index3.js",
                "versionId": 24,
                "createTime": "2019-12-31 23:31:57.085"
            },
            {
                "errorId": 124,
                "newfilename": "webpack:///src/index.js",
                "colno": "10",
                "lineno": "18",
                "message": "Uncaught Error: 抛出错误",
                "versionId": 24,
                "createTime": "2019-12-31 22:31:57.088"
            },
            {
                "errorId": 121,
                "newfilename": "webpack:///src/index.js",
                "colno": "10",
                "lineno": "18",
                "message": "Uncaught Error: 抛出错误",
                "versionId": 24,
                "createTime": "2019-12-31 18:31:51.850"
            },
            {
                "errorId": 122,
                "newfilename": "webpack:///src/index2.js",
                "colno": "6",
                "lineno": "3",
                "message": "Uncaught Error: index3.js",
                "versionId": 24,
                "createTime": "2019-12-31 16:31:51.843"
            }
        ]
    }
}
```

 **返回参数说明** 


| 参数名      | 类型   | 说明             |
| :---------- | :----- | ---------------- |
| errorId     | string | 错误ID           |
| newfilename | string | 源码映射实际文件 |
| colno       | string | 源码行           |
| message     | string | 报错信息         |
| createTime  | string | 创建时间         |
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

***


**简要描述：** 

- 获取指定项目报错列表统计接口

**请求URL：** 
- ` /product/project/version/:versionId/errorList/sort`
  

**请求方式：**
- GET 

** 参数：**

|参数名|参数位置|是否必须|类型|说明
|:-----  |:-----|-----                           |
|versionId |路由   |是  |string|项目Id|
|page |params   |是  |string|页码|
|pageSize |params   |是  |string|页码大小|
|date1 |params   |是  |string|开始时间|
|date2 |params   |是  |string|结束时间|

 **返回示例**

``` 
[
    {
        "errorId": 121,
        "newfilename": "webpack:///src/index.js",
        "colno": "10",
        "lineno": "18",
        "message": "Uncaught Error: 抛出错误",
        "versionId": 24,
        "createTime": "2019-12-31 18:31:51.850"
    },
    {
        "errorId": 122,
        "newfilename": "webpack:///src/index2.js",
        "colno": "6",
        "lineno": "3",
        "message": "Uncaught Error: index3.js",
        "versionId": 24,
        "createTime": "2019-12-31 16:31:51.843"
    }
]
```

 **返回参数说明** 


| 参数名      | 类型   | 说明             |
| :---------- | :----- | ---------------- |
| errorId     | string | 错误ID           |
| newfilename | string | 源码映射实际文件 |
| colno       | string | 源码行           |
| message     | string | 报错信息         |
| createTime  | string | 创建时间         |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

***



