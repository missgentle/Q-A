## 使用wildfly部署war包

*声明在先 本文参考：*

https://blog.csdn.net/big_bigwolf/article/details/53311780 https://blog.csdn.net/kylinsoong/article/details/12307355 https://www.cnblogs.com/101key/p/5131546.html

#### 1 下载wildfly(解压即可用，这里我下载的版本为15.0.0)

https://wildfly.org/downloads/

#### 2 配置环境变量(我的wildfly解压路径：D:\SoftWare\wildfly-15.0.0.Final)

JBOSS_HOME：D:\SoftWare\wildfly-15.0.0.Final Path：;%JBOSS_HOME%\bin

#### 3 创建用户：

运行D:\SoftWare\wildfly-15.0.0.Final\bin\add-user.bat (若admin用户已存在可以修改密码，或者换一个名字。另外注意输入密码时，终端并不显示输入内容，并不是输不进去)

#### 4 启动wildfly：运行D:\SoftWare\wildfly-15.0.0.Final\bin\standalone.bat (窗口不要关)

浏览器打开http://127.0.0.1:9990/
使用刚创建的用户登录进入wildfly控制台

<img src='https://github.com/missgentle/Q-A/blob/master/Guide/wildfly/1.png'>

#### 5 修改management默认端口

打开D:\SoftWare\wildfly-15.0.0.Final\standalone\configuration\standalone.xml 拉到文件最后，可以看到http端口默认设为9990： 修改9990为新端口，如8880，重启standalone.bat，访问http://127.0.0.1:8880/

或者修改偏移量： 中jboss.socket.binding.port-offset如改为1 则所有端口+1，重启此时访问http://127.0.0.1:9991/

```
    <socket-binding-group name="standard-sockets" default-interface="public" port-offset="${jboss.socket.binding.port-offset:0}">
        <socket-binding name="management-http" interface="management" port="${jboss.management.http.port:9990}"/>
        <socket-binding name="management-https" interface="management" port="${jboss.management.https.port:9993}"/>
        <socket-binding name="ajp" port="${jboss.ajp.port:8009}"/>
        <socket-binding name="http" port="${jboss.http.port:8080}"/>
        <socket-binding name="https" port="${jboss.https.port:8443}"/>
        <socket-binding name="txn-recovery-environment" port="4712"/>
        <socket-binding name="txn-status-manager" port="4713"/>
        <outbound-socket-binding name="mail-smtp">
            <remote-destination host="localhost" port="25"/>
        </outbound-socket-binding>
    </socket-binding-group>
    
```

#### 6 禁用根目录自动导航到http://127.0.0.1:9990/console/index.html  (好像试了都没起作用)

在standalone.xml中注掉
`<location name="/" handler="welcome-content"/>`和
`<file name="welcome-content" path="${jboss.home.dir}/welcome-content"/>`
也可重写使其导航到你想要的url

#### 7 部署war包

- Administration UI Console部署

打开http://127.0.0.1:9990/console/index.html 选Deployments选项卡，    
左侧栏点+号下拉菜单-Upload Deployment 将war包拖拽上去-可修改包名和运行时的名字-打开自启动-finish 

<img src='https://github.com/missgentle/Q-A/blob/master/Guide/wildfly/2.png'>
可以看到这里Context Root的值是war包名ux_backend-0.0.1

点view可查看war包结构

<img src='https://github.com/missgentle/Q-A/blob/master/Guide/wildfly/3.png'>

- 手动部署

因为默认为自动部署模式，所以将war包放到 D:\SoftWare\wildfly-15.0.0.Final\standalone\deployments\下 如D:\SoftWare\wildfly-15.0.0.Final\standalone\deployments\ux_backend-0.0.1.war     
启动standalone.bat即自动部署，完成后会生成一个ux_backend-0.0.1.war.deployed文件。    
访问http://127.0.0.1:8080/ux_backend-0.0.1 (注意端口号是8080，因为在standalone.xml中最后有配置，修改方法参考5 )    
url带war包名太梗(耿直)了，可在**项目的输出路径的\WEB-INF\下**添加jboss-web.xml文件，

_(如ux_backend/build/libs/exploded/ux_backend-0.0.1.war/WEB-INF 其中build是编译输出，也就是说如果你为了清理项目把build整个删除了的话，那么你需要打包两次，第一次生成build输出，\WEB-INF\下添加jboss-web.xml文件需要第二次打包)_

文件内容如下

```
<jboss-web>
	<context-root>ux</context-root> 
</jboss-web>

```
重新生成war包重复以上操作，再访问http://127.0.0.1:8080/ux即可 

图3的jboss-web.xml文件不起作用就是文件存放的路径不对，正确打出来的war包中的jboss-web.xml文件应该在这个位置

<img src='https://github.com/missgentle/Q-A/blob/master/Guide/wildfly/4.png'>


此时访问http://127.0.0.1:9990/console/index.html#deployments 也可以看到部署的war包Context Root的值变成了/ux
