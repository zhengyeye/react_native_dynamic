# react_native_dynamic
仿微信朋友圈中发表动态功能，其中包括：九宫格图片的上传、布局、以及功能实现
配合插件(默认大家都能看懂~~~其实也不难，就是给大家提供思路而已，嘻嘻~~~)：

>1.react-native-syan-image-picker 图片选择

https://github.com/syanbo/react-native-syan-image-picker

(选择图片时的插件)

> 2.react-native-swiper 图片轮播

https://github.com/leecade/react-native-swiper

(点击小图查看大图时的轮播组件)

###################################

App.js中是主要代码：类似于微信中点击“添加”按钮选择图片并完整展现功能；
imgsCanDel.js中位点击小图跳转至大图页面，并带有删除功能。
其中event.js中是为事件通信原理：两个页面之间互相通信(这里的实现并不在词项目中写道)。

这里只是简单阐述该功能怎么实现，并非完整的代码，运行本代码也没有实际效果，具体实现还需看具体需求，理解其中道理就好。

