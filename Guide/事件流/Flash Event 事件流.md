> 前些天看掘金是这篇文章 https://juejin.im/post/5e739534e51d4526f23a4150 后，    
> 我翻出了我珍藏多年的笔记本(真的是笔记本)，于是乎想整理下当初学习事件流时的笔记。    

> 好像当初是翻到了这篇文档吧 https://wenku.baidu.com/view/540c911155270722192ef715.html    
> 还有这篇 https://blog.csdn.net/eyeshang/article/details/7918518    

## 1. 事件的生命周期——三阶段    

(1)捕获阶段：事件从目标所在的对象树的根节点依次向下层传递到目标节点之前的过程。    
其间，事件将被所有父节点和祖先节点捕获。若useCapture=true，则此期间，所有注册了该事件(调用了addEventListener)的父元素对象依次派发。    

(2)目标阶段：事件到达目标元素。若目标元素注册了该事件且useCapture=true则目标元素派发。    

(3)冒泡阶段：事件由目标元素向上返回根节点。如果事件为可冒泡事件(如click，doubleClick，keyDown，keyUp，mouseDown，mouseUp，change...)    
且useCapture=flase，则此期间，所有注册了该事件的父元素对象依次派发。    

**注：**我们可以通过event.eventPhase来查询当前阶段。    

## 2.flash.events.Event.Event(type:String,bubbles:Boolean=false,cancelable:Boolean=false)    

**参数：**    
- type：事件类型，可作为Event.type访问。    
- bubbles：确实Event对象是否参与冒泡阶段，默认不参与冒泡阶段，参与目标和捕获阶段。    
- cancelable：确定是否可以取消Event对象。    

## 3.flash.events.EventDispatcher.addEventLisenr(type:String,listener:Function,useCapture:Boolean=false,priority:int=0,useWeakReference:Boolean=false):void    

**参数：**    
- type：事件类型。    
- listener：处理事件的侦听器函数(事件处理函数)。此函数必须接受Event对象为唯一参数，并且不能返回任何结果。    
- useCapture：确定事件派发于捕获阶段还是目标和冒泡阶段，默认在目标和冒泡阶段派发。    
- priority：事件侦听器优先级，数字越大优先级越高越先被处理，同级按添加顺序处理。    
- useWeakReference：确定对侦听器的引用是强引用还是弱引用，强引用可防止侦听器被垃圾回收。
类级别成员函数不属于垃圾回收对象；将函数保存到另一个变量中也不作为垃圾回收对象。此时可通过removeEventListener()移除。    

## 4.三阶段机制的好处    

可减少同一UI树上对象监听器的数量，从而带来性能优化(即事件代理)。    
举例来说，一个容器中有n个btn，若给每个btn都注册侦听，则内存中需要维护n个listener。    
而且在动态添加新的btn时也要追加新的侦听器。    
所以更好的解决办法是给容器注册侦听，通过target来决定调用哪个btn的处理函数。    

## 5.useCapture的作用    


