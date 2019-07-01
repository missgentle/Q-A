## 使用Express搭建后台项目

> 郑重声明本文参考掘金好文：TS+Nodejs+Express构建用于前端调试的WEB服务器
https://juejin.im/post/5b456ee4e51d455d94713404 

本文将简述如何使用 **Sublime Text**编辑器 来搭建一套 **TypeScript** 的开发环境，
其中我们会使用 **Express**这套灵活的web应用开发框架 来提高我们的编码效率，
另外还会增加 **nodemon** 来自动监控你源代码的改变并自动重新启动服务器。

- 首先创建一个 UXserver 文件夹并使用 npm命令进行初始化，

我们使用typescript语言来开发我们的服务器

`npm init -y`

- 我们需要引入node的类型定义文件，使用类型定义文件的作用是使你能在typescript中使用已有的javascript的库

`npm install -D @types/node`

- 由于nodejs本身是不能直接识别typescript，所以我们需要将typescript编译成javascript，所以创建下面的tsconfig.json配置文件，用于告诉编译器如何将typescript编译成javascript，详细配置请参考typescript官方文档：

```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "outDir": "build",
        "lib": [
            "es6"
        ]
    },
    "exclude": [
        "node_modules"
    ]
}
```
此处module 字段是commonjs，否则 webpack 将因为错误而构建失败。发生这种情况，是因为 ts-node 不支持 commonjs 以外的任何模块语法。
这个问题有两种解决方案：修改 tsconfig.json或安装 tsconfig-paths，详见https://www.webpackjs.com/configuration/configuration-languages/。


- 这时就可以创建你的server/server.ts文件了：

```
import * as http from 'http';

const server = http.createServer((req,resp) => {
    resp.end("Hello Node!");
});

server.listen(8000);
```

- 由于node命令也无法直接运行ts文件，所以想直接运行ts文件的话我们还需要安装ts-node与typescript：

`npm install -D ts-node`
`npm install -D typescript`

运行命令：

`ts-node server/server.ts`

访问地址：

http://127.0.0.1:8000/

接下来，我们来看怎么使用使用Express框架简化开发

- 首先我们安装 express框架：

`npm install express --save`

- 然后我们引入 express 的类型定义文件：

`npm install -D @types/express`

- 接着改写server.ts文件：

```
import * as express from 'express';

const app = express(); // 用于声明服务器端所能提供的http服务

// 声明一个处理get请求的服务
app.get('/', (req, resp) => {
    resp.send("Hello Express");
});

app.get("/products", (req, resp) => {
    resp.send("接收到商品查询请求");
});

const server = app.listen(8000, "localhost", () => {
    console.log("服务器已启动, 地址是：http://localhost:8000");
});
```

重启服务，刷新页面，对比一下使用express前后的页面显示内容及控制台输出。

再访问http://127.0.0.1:8000/products 看看。

- 那么开发过程中总要反复修改我们的代码，这样就意味着反复的重启刷新，咦~恶心恶心。所以让我们安装一个可以自动编译和自动重启服务nodemon工具，让开发变得更加愉快：

`npm install --save-dev nodemon`

- 然后根目录下创建下面的nodemon.json配置文件：

```
{
  "watch": ["server/**/*"],
  "ext": "ts,js",
  "exec": "ts-node ./server/server.ts" 
}
```

- 最后修改一下package.json文件：

```
"main": "server.ts",
  "scripts": {
    "start": "nodemon"
  },
```

好了，现在运行npm start 或者直接 nodemon

跑起来吧，做一只快乐的程序猿o(*￣▽￣*)o

