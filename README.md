# Memory

[English Version](https://github.com/Smallpath/Memory/blob/master/wiki/README-EN.md)

这是后期合成软件[Adobe After Effects](https://en.wikipedia.org/wiki/Adobe_After_Effects)的层存储脚本,你可以将AE中任何层(包括合成层)保存下来,以便在其他工程中,在其他版本的AE中,甚至在其他电脑中生成新的层



##脚本界面

![screenshot1](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/1.PNG)

![screenshot2](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/2.PNG)

![screenshot3](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/3.PNG)

![screenshot4](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/4.gif)

支持窗口大小自适应,同时拥有方便的**右键菜单**来节省界面空间


##脚本功能

1. 支持一切层,包括形状层,文字层,图片音频层,甚至`合成层`
2. 支持一切属性,包括层本身属性以及层内部属性组,例如插件,遮罩,文字动画器,形状效果器,图层样式等等
3. 支持图片和音频,即使他们被移动或删除,脚本也可以正确生成
4. 由语言版本不同造成的表达式报错将被自动修复,支持英文,中文,日文三种语言
5. 支持自定义预设,脚本提供插件,遮罩,动画器等9种属性组的自由搭配选项
6. 存储得到的数据兼容于AE任何版本,例如,用本脚本在CC2015上存储的一个工程,可以在CS4上正确地生成


##脚本安装

进入[版本发布页面](https://github.com/Smallpath/Memory/releases),下载最新版的`Source code (zip)` 

AE版本为CC-CC2015的,请将压缩包中的`Sp_memory.jsxbin`,`Sp_memory文件夹`放置在你的AE脚本文件夹中,例如`Support Files\Scripts\ScriptUI Panels`

AE版本为CS3-CS6的,请解压`Sp_memory v2.2(CS3-CS6).jsxbin`与`Sp_memory文件夹`

win7,win8,win10用户请用管理员权限运行AE,右键AE->兼容性->勾选`以管理员身份运行此程序`

在AE中打开编辑->预选项->一般,勾选`允许脚本访问文件与网络`

在AE中打开窗口菜单中的`Sp_memory.jsxbin`,即可


##脚本使用教程

>[文字教程](https://raw.githubusercontent.com/Smallpath/Memory/master/wiki/TUTORIAL.md)

## v2.3 TODO LIST

- [x] 初始化配置文件时增加默认模块
- [x] 升级时初始化默认模块
- [x] droplist触发onChange方法时增加模块的操作
- [x] 新建模块,删除模块
- [x] 新建组,删除组时指定模块
- [x] 模块增删改移动
- [x] 模块中组的增删改移动
- [x] 修复批量导出组时取消按钮无效
- [x] 导出时导出模块信息
- [x] 导入时导入模块信息
- [ ] 升级时初始化元素预览(初稿约定20帧)
- [ ] 保存时进行预览图片序列生成
- [ ] 导出时导出图片序列
- [ ] 导入时生成图片序列
- [ ] 删除元素时删除图片序列

##版本更新记录
[更新历史](https://github.com/Smallpath/Memory/blob/master/wiki/LOGS.md)

##感谢
- 阿木亮([GridView.jsx](https://github.com/Smallpath/Memory/blob/master/Sp_memory/lib/GridView.jsx),[UIParser.jsx](https://github.com/Smallpath/Memory/blob/master/Sp_memory/lib/UIParser.jsx))
- 水果硬糖([UIParser.jsx](https://github.com/Smallpath/Memory/blob/master/Sp_memory/lib/UIParser.jsx))

##License
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

##反馈
脚本使用中遇到任何问题,请新开issue,或联系smallpath2013@gmail.com
