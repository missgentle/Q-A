## SecureCRT绿色破解版下载&使用

> 今天又get到了新技能，nice~    
> 声明在先：参考与下载连接 https://blog.csdn.net/www1056481167/article/details/88222591    

#### 1.下载解压看链接就可以了，不做无用功了

#### 2.运行SecureCRTPortable.exe，第一次打开会弹一个版本检查的框，以后不要提示也不需要升级就好

<img src='CRT-1.png'>

#### 3.版本检查的框关闭后，接着会弹出连接窗口，点新建会话

<img src='CRT-2.png'>

#### 4.看协议需不需要改，不需要改直接下一步

<img src='CRT-3.png'>

#### 5.主机地址，端口号填上，下一步

<img src='CRT-4.png'>

#### 6.再看协议需不需要改，不需要改直接下一步

<img src='CRT-5.png'>

#### 7.写个描述，完成

<img src='CRT-6.png'>

#### 8.连接就添加上了，点连接按钮

<img src='CRT-7.png'>

#### 9.如果弹出密钥警示框，点接受并保存

<img src='CRT-8.png'>

#### 10.输入用户名，勾选记住，确定

<img src='CRT-9.png'>

#### 11.输入密码，勾选记住，确定

<img src='CRT-10.png'>

#### 12.现在就可以键入linux命令啦

常用命令：
- 进入根目录：$ cd /
- 返回上一级目录：$ cd ..
- 显示当前目录下的文件：$ ls
- 进入当前目录下的某个文件夹：$ cd dirname （如cd opt/wildfly/bin）
- 打开某文件：$ vi filename （如 vi log）
- 进入文本输入模式：按A/a或I/i
- 退出编辑模式进入末行模式：按: （末行模式下：q! 【强制退出不保存】 q【退出不保存】 wq【退出并保存后面也可以加个！】）
- 运行某文件：$ sh ./filename （如sh ./run）
- 查看进程号：$ ps -ef | grep PName （如ps -ef | grep wildfly）
- 杀死进程：$ kill -9 PID （如kill -9 15228）
- 强制中断：Ctrl+C

#### 13.杀死并重启wildfly

先查看进程获取进程号$ ps -ef | grep wildfly

<img src='CRT-11.png'>
 
再杀死进程，如此处进程号为17801：$ kill -9 17801

再去到/opt/wildfly/bin路径下启动wildfly，可能使用的命令：    
$ cd /opt/wildfly/bin    
$ sh ./run
