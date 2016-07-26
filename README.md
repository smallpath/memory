##[English Document](https://github.com/Smallpath/Memory/blob/master/README-EN.md)

# Memory
这是后期合成软件[Adobe After Effects](https://en.wikipedia.org/wiki/Adobe_After_Effects)的层存储脚本,你可以将AE中任何层(包括合成层)保存下来,以便在其他工程中,在其他版本的AE中,甚至在其他电脑中生成新的层

## 环境要求
Windows系统;AE版本为CC,CC2014与CC2015

## 脚本界面
支持动态预览元素内容  
![screenshot7](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/1.gif)  
![screenshot8](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/2.gif)  
支持窗口大小自适应,同时拥有方便的**右键菜单**来节省界面空间  
![screenshot1](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/1.PNG)  


## 脚本功能
1. 脚本界面支持预览动画,可以设置预览动画的帧率和帧数
2. 支持一切层,包括形状层,文字层,图片音频层,甚至`合成层`
3. 支持一切属性,包括层本身属性以及层内部属性组,例如插件,遮罩,文字动画器,形状效果器,图层样式等等
4. 支持图片和音频,即使他们被移动或删除,脚本也可以正确生成
5. 由语言版本不同造成的表达式报错将被自动修复,支持英文,中文,日文三种语言
6. 支持自定义预设,脚本提供插件,遮罩,动画器等9种属性组的自由搭配选项
7. 存储得到的数据兼容于AE任何版本,例如,用本脚本在CC2015上存储的一个工程,可以在CS4上正确地生成


## 脚本安装
进入[版本发布页面](https://github.com/Smallpath/Memory/releases),下载最新版的`Sp_memory-EN.zip`  
AE版本为CC-CC2015的,请将压缩包中的`Sp_memory.jsxbin`,`Sp_memory文件夹`放置在你的AE脚本文件夹中,例如`Support Files\Scripts\ScriptUI Panels`  
AE版本为CS3-CS6的,请解压`Sp_memory(CS3-CS6).jsxbin`与`Sp_memory文件夹`  
win8与win10用户请用管理员权限运行AE,右键AE->兼容性->勾选`以管理员身份运行此程序`  
在AE中打开编辑->预选项->一般,勾选`允许脚本访问文件与网络`  
在AE中打开窗口菜单中的`Sp_memory.jsxbin`,即可

## 脚本使用教程
>[文字教程](https://github.com/Smallpath/Memory/blob/master/wiki/TUTORIAL.md)

## 版本更新记录
>[更新历史](https://github.com/Smallpath/Memory/blob/master/wiki/LOGS.md)

## 感谢
- 阿木亮([GridView.jsx](https://github.com/Smallpath/Memory/blob/master/Sp_memory/lib/GridView.jsx),[UIParser.jsx](https://github.com/Smallpath/Memory/blob/master/Sp_memory/lib/UIParser.jsx))
- 水果硬糖([UIParser.jsx](https://github.com/Smallpath/Memory/blob/master/Sp_memory/lib/UIParser.jsx))

## License
```
Copyright (C) 2015 Smallpath

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## 反馈
脚本使用中遇到任何问题,请新开issue,或联系smallpath2013@gmail.com
