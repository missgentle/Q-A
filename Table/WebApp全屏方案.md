编号	浏览器	全屏实现方案	结论
0	华为	向上滑动屏幕收起地址栏菜单栏，向下滑动展开	
		<!--强制全屏 -->
<meta name="x5-fullscreen" content="true">	可行
		<!--应用模式 -->
<meta name="x5-page-mode" content="app">	可行
1	苹果
Safari	<!-- 网站添加到主屏幕快速启动方式后可隐藏地址栏home screen app 全屏 ios7.0版本后safari上已看不到效果-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-touch-fullscreen" content="yes" />	无效
		<!-- 网站添加到主屏幕快速启动方式后仅针对ios的safari顶端状态条的样式，删除苹果默认的工具栏和菜单栏 可选default、black、black-translucent -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />	无效
		<!-- minimal-ui iOS 7.1 beta 2 中新增属性，可以在页面加载时最小化上下状态栏，IOS 8 后被移除-->
<meta name=”viewport” content=”width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui”>	无效
2	UC	<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
菜单变成灰色可拖动悬浮按钮，点击悬浮按钮展开，点击屏幕收起，地址栏无法显示	可行
U4内核
		<!-- UC应用模式 -->
<meta name="browsermode" content="application">	可行
U4内核
2	360	菜单中有全屏开关，点击悬浮按钮展开，3秒后自动收起	V 6.3.8
3	QQ	简洁菜单类似UC全屏后的效果	V 7.4.2 
		<!--QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">	待测
x5内核
		<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">	待测
x5内核
4	搜狗	菜单中有全屏开关，点击悬浮按钮展开，点击屏幕收起	V2.6.1
5	2345	菜单中有全屏开关，点击悬浮按钮展开，点击屏幕收起	版本待查
6	百度	<meta name="full-screen" content="yes">
菜单栏同UC且点击悬浮按钮展开地址栏，长按悬浮按钮退出全屏	可行

7	谷歌		
8	火狐	菜单在地址栏的后面显示为三个点，点击后在屏幕右侧竖直展开	版本待查
9	猎豹	菜单中有全屏开关，点击悬浮按钮展开，点击屏幕收起	V4.9.3
10	傲游	菜单中有全屏模式按键，	V4.1.2.2000

<!-- 启用360浏览器的极速模式(用webkit内核渲染页面) -->
<meta name="renderer" content="webkit">
<!-- 不让百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

<meta name="mobile-web-app-capable" content="yes">

