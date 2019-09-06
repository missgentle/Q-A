## WebSocket 实现刷新 or 切换到同源页面不断连

> 该文并未提及如何安装相关依赖以及配置，想了解的敬请期待webpack Guide完善~

### 方案一：完美版

> 这大概是史无前例的 ws (WebSocket) 与 sw (ServiceWorker) 的完美结合。    
> 之所以叫完美版是因为该方案对项目结构没有要求且同时满足刷新和切换到同源页面都不会断连。    
> 貌似是只要不注销sw即使关闭浏览器依然保持连接但我暂时没测过。    
> 但是！！！首先要强调一点：**该解决方案要用于生产环境中的话你需要使用https协议。**

#### 1 在需要保持ws连接的页面都添加代码注册sw（不用担心，同名sw不会重复注册）

```
$( window ).on( 'load', ()=>{
      if('serviceWorker' in navigator) {
     	navigator.serviceWorker.register('/sw.js').then(registration => {
     		console.log('SW registered: ', registration);
     	}).catch(registrationError => {
     		console.log('SW registration failed: ', registrationError);
     	});
      } 
    });
```

#### 2 在开始创建ws连接的页面再单独添加一行代码（给sw发个信号让它创建ws连接，需要断开连接的时候类似）

```
navigator.serviceWorker.controller.postMessage(JSON.stringify(imsg));
```

#### 3 sw.js文件

```
const serverURL = 'ws://127.0.0.1:7777/chat';
let socket = null;
let user = null;

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('message', function (e) {
    console.log(JSON.parse(e.data));
    const clientMsg = JSON.parse(e.data);
    if(clientMsg.msgType = 'Identity'){
      user = JSON.parse(clientMsg.msgContent);
      console.log(user.id);
      if(socket == null){
        socket = new WebSocket(serverURL);
        socket.onmessage = (ev) => {
          const msg = JSON.parse(ev.data);
          if(msg.msgType === 'Connect'){
            console.log(JSON.parse(ev.data));
            let identity = {
              id: user.id,
              name: user.name,
              permission: user.permission
            };
            const imsg = {
              msgType: 'Identity',
              msgContent: JSON.stringify(identity),
            };
            socket.send(JSON.stringify(imsg));
          }else{
            console.log(JSON.parse(ev.data));
            self.clients.matchAll().then(function (clients) {
              if (!clients || clients.length === 0) {
                return;
              }
              clients.forEach(function (client) {
                client.postMessage(ev.data);
              });
            })
          }
        }
      }
    }

});
```

#### 4 在需要保持ws连接的页面添加代码监听sw转发的消息

```
window.onmessage = function(e){
    console.log(e.data)
    ......
}
```

#### 5 更多延伸

- 因为sw是完全异步的所以做消息本地存储是不能使用同步API的,建议使用indexDB
- 消息提示可以在sw中使用self.registration.showNotification显示通知并监听notificationclick点击事件进行交互
- 想了解更多，敬请期待我的sw Guide上线~

### 方案二：单页版

> 第二种方案只适用于单页项目且只能实现切换到同源页面不断连

#### 1.创建share.worker.ts文件

> 这里并没有对连入worker的页面做区分，可初始时通过发送不同的消息来区分不同的页面，也便于worker选择性的发送消息给某个页面

```
const serverURL = 'ws://127.0.0.1:7777/chat';
let socket = null;
let user = null;

let portList = [];

onconnect = function(e) {

    let port = e.ports[0];
    if (portList.indexOf(port) === -1) {
      portList.push(port);
    }

    port.addEventListener('message', function(e) {
      const clientMsg = JSON.parse(e.data);
      if(clientMsg.msgType = 'Identity'){
        user = JSON.parse(clientMsg.msgContent);
        if(socket == null){
          socket = new WebSocket(serverURL);
          socket.onmessage = (ev) => {
            const msg = JSON.parse(ev.data);
            if(msg.msgType === 'Connect'){
              let identity = {
                id: user.id,
                name: user.name,
                permission: user.permission
              };
              const imsg = {
                msgType: 'Identity',
                msgContent: JSON.stringify(identity),
              };
              socket.send(JSON.stringify(imsg));
            }else{
              portList.forEach(item=>{
                item.postMessage(JSON.parse(ev.data));
              })
            }
          }
        }
      }
    });
    port.start();
}

```

#### 2.创建声明文件shareworker.d.ts

```
interface SharedWorker extends EventTarget, AbstractWorker {
  port: MessagePort;
};

declare var SharedWorker: {
  prototype: SharedWorker;
  new(scriptURL: any, name: any): SharedWorker;
  new(scriptURL: any): SharedWorker;
}

declare var onconnect: (e:MessageEvent) => void
```

#### 3.单页ts里new SharedWorker

> iframe里嵌套的页面也是类似的，如果你希望他能直接收到shared worker发的消息的话

```
initWorker(){
    let identity = {
      id: UserInfo.userId,
      name: UserInfo.UserName,
      permission: UserInfo.UserPermission 
    };
    const imsg = {
      msgType: 'Identity',
      msgContent: JSON.stringify(identity),
    };
    let worker = new SharedWorker('/shrare.worker.js');
    worker.port.start();
    worker.port.postMessage(JSON.stringify(imsg)); 
    worker.port.onmessage = function(e) {
      console.log('Message received from worker');
      console.log(e.data);
    }
  }
 ```

#### 4.单页ejs里嵌入iframe

```
<!DOCTYPE html>
<html class="no-js" lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div class="grid-container">
    <%= require('./component/indexToTop.hbs')() %>
    <iframe id="ifpage" name="ifpage" width="100%" src="upload.html" frameborder="0" scrolling="no" onload="this.height=ifpage.document.body.scrollHeight"></iframe>
  </div>
</body>
</html>
```      

#### 5.更多延伸

- 既然是单页实际只是嵌套iframe的src切换，并没有真正的同源页面之间的切换。然后还要写一些逻辑避免用户直接更改url进入iframe嵌套页面。
- 其实没必要使用sharedworker的，既然是单页项目，直接new Worker(),然后单页与iframe使用postmessage的方式通信也行，也省了声明文件但通信麻烦了些。
- sharedworker的一些缺陷和注意点：
    - 如果修改了sharedworker的内容需要将所有接入的页面都关闭（或只留一个页面然后刷新）才能释放旧的sharedworker然后更新。
    - 当某个sharedworker实例被创建后，其他页面再创建将会直接接入已创建的实例，不会再创建新的，也不会重新获取该实例的js，只在第一次创建时获取。
    - sharedworker实例使用onMessage监听时不需要显示调用port.start();且onMessage多次实现会被覆盖； 而使用port.addEventListener('message', ()=>{})则必须显示调用port.start();且多次实现会追加监听
    
## sharedWorker 实现 WebSocket 断线重连

> 声明在先：参考链接 https://www.jianshu.com/p/5297732db7f2

```
const wssURL = 'wss://XXX.XX.XX.XX:XXXX/XX/chat';
let socket = null;
let userId = null;

let portList = [];
let heartBeatTime = 60;

onconnect = function(e) {

    let port = e.ports[0];
    if (portList.indexOf(port) === -1) {
      portList.push(port);
    }

    var heartCheck = { 
      timeout: heartBeatTime*1000,
      timeoutObj: null,
      reset: function () { 
        clearTimeout(this.timeoutObj); 
        return this;
      }, 
      start: function () {
        this.timeoutObj = setTimeout(function () {
          wsReconnection();
        },this.timeout)
      } 
    } 

    port.addEventListener('message', (e) => {
      if(typeof(e.data) === 'string'){
        const clientMsg = JSON.parse(e.data);
        console.log(clientMsg);
        if(clientMsg.msgType === 'Identity'){
          userId = clientMsg.msgContent;
          if(socket == null && userId !== null){
            wsReconnection();
          }
        }
        else{
          socket.send(e.data);
        }
      }else{
        socket.send(e.data);
      }
      
    });
    port.start();

    wsReconnection = () => {
      socket = new WebSocket(wssURL);
      socket.onopen = (ev) => {
        ...
        heartCheck.reset().start();
      }
      socket.onmessage = (ev) => {
        heartCheck.reset().start();
        const msg = JSON.parse(ev.data);
        portList.forEach(item=>{
          item.postMessage(JSON.parse(ev.data));
        })
      }
      socket.onclose = (ev) => {
        portList.forEach(item=>{
          item.postMessage('closed');
          item.postMessage('reconnection');
        });
      }
      socket.onerror = function () {
        setTimeout(function () {
          wsReconnection();
        },5000)
      }
    }
}

```
