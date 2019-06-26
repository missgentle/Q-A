## 如何使用webpack启项目

> 在开始之前，请确保安装了 Node.js 的最新版本。

- 创建项目文件夹如WebpackDemo，文件夹下创建root.cmd文件，内容如下:

```
@echo off 
set base=%~dp0
cmd /k cd /d %base%
```

此文件仅用于更加方便的打开当前路径下的命令窗口

- Sublime Text 打开文件夹WebpackDemo，右键root.cmd文件-->Open/Run

如果使用npm包管理器就在命令行窗口中键入`npm init -y`

<img src='webpack-1.png'>

如果使用yarn包管理器就在命令行窗口中键入`yarn init -y`

<img src='webpack-2.png'>

此命令将在当前路径下(WebpackDemo文件夹中)自动生成package.json文件，用于描述npm包的所有相关信息

_我的npm最近越来越不好用，所以后面我使用yarn为例，使用npm只需要将yarn命令都替换为对应的npm命令即可。
但nodejs中并没有集成yarn所以要使用yarn需要先安装，下载链接：https://yarnpkg.com/en/docs/install#windows-stable
，想省事也可以直接用npm安装yarn，请自行百度，我这里就不赘述了。但看了这里的对比感觉还是尽早投入yarn的怀抱比较好:https://www.zhihu.com/question/51502849_

- 继续键入命令`yarn add webpack webpack-cli --dev`或`npm install webpack webpack-cli --save-dev`

此命令将安装最新版本的webpack和CLI(webpack-cli)，如果安装webpack4以下的特定版本，则不需安装CLI

此时可以看到有多了一个node_moudles文件夹，用于存放依赖包，
还有一个yarn.lock文件(npm对应的是package-lock.json文件)，用于记录依赖包的下载的实际版本和路径信息。

同时也会发现package.json文件多了几行：

```
"devDependencies": {
    "webpack": "^4.35.0",
    "webpack-cli": "^3.3.5"
  }
```
使用命令参数-dev添加的依赖包就会被记录在"devDependencies"字段中

- 如果想要使用ts作为开发语言，接下来请参考这个链接：https://github.com/missgentle/Q-A/tree/master/Guide/express    
进行以下相关操作：
    - 引入node的类型定义文件
    - 创建tsconfig.json文件
    - 安装ts-node与typescript
    - 安装nodemon工具
    - 创建nodemon.json文件
    - 修改package.json文件

- webpack不会更改代码中除import、export 语句以外的部分。如果还想使用其它ES2015特性，那还需要安装Babel转译器来帮你做浏览器兼容。


然后根目录下添加.babelrc文件，内容示例如下(具体请参考：https://juejin.im/post/5c19c5e0e51d4502a232c1c6)

```
{
  "presets": ["env"]
}
```

- loader(模块转换器)和plugin是webpack中两个非常重要的概念：
loader用于对模块的源代码进行转换，因为webpack本身只能识别js文件，所以需要各种各样的loader来帮助webpack处理加载不同资源文件，本质是一个函数。
插件目的在于解决loader无法实现的其他事，本质是往钩子中注册回调的函数，在Webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想做的事。

webpack常用的loader
样式：style-loader、css-loader、less-loader、sass-loader等
文件：raw-loader、file-loader 、url-loader等
编译：babel-loader、coffee-loader 、ts-loader等
校验测试：mocha-loader、jshint-loader 、eslint-loader等

webpack常用的plugin
首先webpack内置UglifyJsPlugin，压缩和混淆代码
webpack内置CommonsChunkPlugin，提高打包效率，将第三方库和业务代码分开打包
html-webpack-plugin可以根据模板自动生成html代码，并自动引用css和js文件
HotModuleReplacementPlugin 热更新
optimize-css-assets-webpack-plugin 不同组件中重复的css可以快速去重

所以现在让我们一口气安装一大波loader和插件：

babel-loader
css-loader
html-loader
html-webpack-plugin
mini-css-extract-plugin
ts-loader
url-loader


_以上提及的所有依赖包我的经验是：不管用不用，反正先都装上也没坏处，因为就算装了，甚至是import了，只要没有真正使用，webpack是不会打包进去的。_






