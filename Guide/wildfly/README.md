声明在先 本文参考：

https://blog.csdn.net/big_bigwolf/article/details/53311780 https://blog.csdn.net/kylinsoong/article/details/12307355 https://www.cnblogs.com/101key/p/5131546.html

1下载wildfly解压即可用(这里我下的15.0.0)

https://wildfly.org/downloads/

2配置环境变量

JBOSS_HOME：D:\SoftWare\wildfly-15.0.0.Final Path：;%JBOSS_HOME%\bin

3创建用户：

运行D:\SoftWare\wildfly-15.0.0.Final\bin\add-user.bat (若admin用户已存在可以修改密码，或者换一个名字。另外注意输入密码时，终端并不显示输入内容，并不是输不进去)

4.运行D:\SoftWare\wildfly-15.0.0.Final\bin\standalone.bat (窗口不要关)

浏览器打开http://127.0.0.1:9990/，使用刚创建的用户登录进入wildfly控制台

5.修改management默认端口

打开D:\SoftWare\wildfly-15.0.0.Final\standalone\configuration\standalone.xml 拉到文件最后，可以看到http端口默认设为9990： 修改9990为新端口，如8880，重启standalone.bat，访问http://127.0.0.1:8880/

或者修改偏移量： 中jboss.socket.binding.port-offset如改为1 则所有端口+1，重启此时访问http://127.0.0.1:9991/

6.禁用根目录自动导航到http://127.0.0.1:9990/console/index.html (试了似乎都没用)

在standalone.xml中靠后位置找到注掉或者/改为其他路径 再往下几行改为

7.部署war包

(1) Administration UI Console部署 打开http://127.0.0.1:9990/console/index.html 选Deployments选项卡，左侧栏点+号下拉菜单-Upload Deployment 将war包拖拽上去-可修改包名和运行时的名字-打开自启动-finish (2)手动部署： 因为默认为自动部署模式，所以将war包放到 D:\SoftWare\wildfly-15.0.0.Final\standalone\deployments\下 如D:\SoftWare\wildfly-15.0.0.Final\standalone\deployments\ux_backend-0.0.1.war 启动standalone.bat即自动部署，完成后会生成jaxws-helloworld.jar.deployed文件。 访问http://127.0.0.1:8080/ux_backend-0.0.1 (注意端口号是8080，因为在standalone.xml中最后有配置，修改方法参考5 ) url带war包名太梗了，在项目里\WEB-INF\下添加jboss-web.xml文件，内容如下

/ 重新生成war包重复以上操作，再访问http://127.0.0.1:8080/ux即可(试了没改成功) 此时访问http://127.0.0.1:9990/console/index.html#deployments 也可以看到部署的war包