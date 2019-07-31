## Web Worker 让你的JS “多线程”？

声明在先：此文参考 https://segmentfault.com/a/1190000012925872#articleHeader10
建议先行阅读该文前半部分

### 概述

#### Web Worker产生背景

由于浏览器内核(Renderer进程,渲染进程)中的GUI渲染线程(主要负责渲染绘制页面)与JS引擎线程互斥，也就是说，当JS引擎执行时GUI线程会被挂起，
GUI更新会被保存在一个队列中等到JS引擎线程空闲时执行。所以JS如果执行时间过长就会阻塞页面(网页卡顿)。    

因此HTML5中支持了Web Worker。    

**MDN的官方解释是：**

> Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面；
> 一个worker是使用一个构造函数创建的一个对象(e.g. Worker()) 运行一个js文件，这个文件包含将在工作线程中运行的代码；
> workers 运行在另一个全局上下文中,不同于当前的window。因此，使用 window快捷方式获取当前全局的范围 (而不是self) 在一个 Worker 内将返回错误

**这样理解下：**

- 创建Worker时，JS引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作DOM）
- JS引擎线程与worker线程间通过特定的方式通信（postMessage API，需要通过序列化对象来与线程交互特定的数据）

所以，如果有非常耗时的工作，请单独开一个Worker线程，这样里面不管如何翻天覆地都不会影响JS引擎主线程，
只待计算出结果后，将结果通信给主线程即可，perfect!

**注意：** JS引擎是单线程的，这一点的本质仍然未改变，Worker可以理解是浏览器给JS引擎开的外挂，专门用来解决那些大量计算问题。

### 比较Web Worker 与 SharedWorker

- WebWorker只属于某个页面，不会和其他页面的Render进程（浏览器内核进程）共享
所以Chrome在Render进程中（每一个Tab页就是一个render进程）创建一个新的线程来运行Worker中的JavaScript程序。

- SharedWorker是浏览器所有页面共享的，不能采用与Worker同样的方式实现，因为它不隶属于某个Render进程，可以为多个Render进程共享使用
所以Chrome浏览器为SharedWorker单独创建一个进程来运行JavaScript程序，在浏览器中每个相同的JavaScript只存在一个SharedWorker进程，不管它被创建多少次。

所以Web Worker 与 SharedWorker本质上就是进程和线程的区别。SharedWorker由独立的进程管理，WebWorker只是属于render进程下的一个线程

**我的思考：为什么GUI渲染线程与JS引擎线程互斥却与Worker可以同时运行？**

由于JavaScript是可操纵DOM的，如果在修改这些元素属性同时渲染界面（即JS线程和UI线程能同时运行），那么渲染线程前后获得的元素数据就可能不一致了。
因此为了防止渲染出现不可预期的结果(* 和反复重绘)，浏览器设置GUI渲染线程与JS引擎为互斥的关系。
而worker运行在另一个单独的上下文，不能操作DOM，不会出现上述问题，所以浏览器允许它与GUI渲染线程同时运行。

### Worker API使用


