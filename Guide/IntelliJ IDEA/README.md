## 使用IDEA导入Gradle项目

- 安装配置Gradle

Gradle下载地址：http://services.gradle.org/distributions/

这里下载4.10.3版本：选gradle-4.10.3-bin.zip解压后可以直接使用

- 配置环境变量：

```
GRADLE_HOME		D:\SoftWare\gradle-4.10.3  （解压路径）
Path	追加 ;%GRADLE_HOME%\bin
```

检测安装：cmd键入gradle –v查看版本

- 安装配置jdk1.8

Jdk下载地址：https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
 Java SE Development Kit 8u191表中选中Accept License Agreement方可下载相应版本
 <img src='https://github.com/missgentle/Q-A/blob/master/Guide/IntelliJ%20IDEA/idea-1.png'>
 
下载后安装，可修改安装路径

- 配置环境变量：

```
JAVA_HOME		D:\SoftWare\JDK1.8	（安装路径）
Path	追加 ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
```

**注意：若原有jdk则只需修改JAVA_HOME值即可；若追加新的安装路径，系统将识别；隔开的最后一个路径**
检测安装：cmd键入java –v查看版本

- idea导入项目

点击File -->Project Structure；点击左侧标签页SDKs选项，再点击左上角“+”，选择JDK；在弹出框选择JDK安装路径，点击OK即可配置成功；File --> New --> Project from Existing Sources；选择项目-->OK；选Gradle-->Next
 <img src='https://github.com/missgentle/Q-A/blob/master/Guide/IntelliJ%20IDEA/idea-2.png'>

- 配置

File -->Settings -->Build, Execution, Deployment --> Compiler --> Kotlin Compiler -->Target JVM version 改为 1.8
 <img src='https://github.com/missgentle/Q-A/blob/master/Guide/IntelliJ%20IDEA/idea-3.png'>
  
File->Settings->Plugins->Kotlin点击Update。如果没有显示update，先reload 一下就会出现，reload都没有那就点下面第一个install按钮。升级之后需要重启。
 <img src='https://github.com/missgentle/Q-A/blob/master/Guide/IntelliJ%20IDEA/idea-4.png'>
 
