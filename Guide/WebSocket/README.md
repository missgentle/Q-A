## WebSocket 实现刷新 or 切换到同源页面不断连

> 这大概是史无前例的 ws (WebSocket) 与 sw (ServiceWorker) 的完美结合。

#### 1 在需要保持ws连接的页面添加代码注册sw

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

#### 2 在开始创建ws连接的页面再单独添加一行代码（给sw发个信号让它创建ws连接）

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

