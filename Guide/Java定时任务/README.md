## Java定时任务

这段时间做后台，需要写定时任务，看了写网上资料，在此做简单整理。前端选手，Java水平有限(代码是kotlin。。。)

> 声明在先：本文参考 https://blog.51cto.com/zhangfengzhe/2064092

### 1.JDK原生定时工具：Timer

Timer背后是一个单线程。
因此Timer存在管理并发任务的缺陷：
所有任务都是由同一个线程来调度，所有任务都是串行执行，意味着同一时间只能有一个任务得到执行，而前一个任务的延迟或者异常会影响到之后的任务。

```
class WebSocketHandler : AbstractWebSocketHandler() {

  init {
      Thread(LevelUpdateRunnable(userId)).start()
  }
  
  class LevelUpdateRunnable(private val userId:String):Runnable{
        override fun run() {
            while(true){
                Thread.sleep(5000)
                println("one second: ${userId}")
            }
        }
   }
   
}
```

### 2.JDK对定时任务调度的线程池支持：ScheduledExecutorService

由于Timer存在的问题，JDK5之后便提供了基于线程池的定时任务调度：ScheduledExecutorService。    
设计理念：每一个被调度的任务都会被线程池中的一个线程去执行，因此任务可以并发执行，而且相互之间不受影响。


```
class WebSocketHandler : AbstractWebSocketHandler() {

  init {
      var schedule:ScheduledExecutorService = Executors.newScheduledThreadPool(10)
      schedule.scheduleAtFixedRate(LevelUpdateRunnable(userId),1000,900000,TimeUnit.MILLISECONDS)
  }
  
  class LevelUpdateRunnable(private val userId:String):Runnable{
        override fun run() {
            println("one second: ${userId}")
        }
   }
   
}
```

### 3.Spring注解@Scheduled (待日后项目优化是再做整理)

