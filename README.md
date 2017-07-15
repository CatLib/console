# CatLib 调试控制台

CatLib 调试控制台，您可以通过控制台向客户端手机发送指令或者监控程序运行状态。


## 使用公共的控制台服务器

CatLib 的控制台程序是基于您的浏览器发起控制指令，所以哪怕使用的是公共的控制台服务器也不会导致您的资料外泄。

您可以通过 [console.catlib.io](http://console.catlib.io/) 访问公共的控制台服务器。

## 在内网搭建控制台服务器

首先您必须安装[nodejs](http://nodejs.cn/)安装完成后通过如下指令在 `localhost:7777` 启动控制台网站：

``` bash
npm install
npm run dev
```

通过如下指令编译控制台网站

``` bash
npm install
npm run build
```
