## [English Document](https://smallpath.github.io/Memory/#/en/)

## Memory
这是后期合成软件Adobe After Effects的层存储脚本,你可以将AE中任何层(包括合成层)保存下来,以便在其他工程中,在其他版本的AE中,甚至在其他电脑中生成新的层

## 文档
https://smallpath.github.io/Memory

## 3.1 TODO

## 优化
- [x] 更换打包工具以提供直观的报错定位
- [x] 支持存储视频, 去除素材的大小限制
- [x] 生成层进度条
- [x] 存储层进度条
- [x] 进度条显示脚本耗时
- [x] 存储预览进度条
- [x] 优化预览CPU占用
- [x] 生成单个预合成时直接拉伸至当前合成大小
- [x] 增加允许截取工作区预览的检测框
- [x] 修复检查更新功能
- [x] 增加自动更新功能
- [x] 增加windows缩放比例参数

## bugfix
- [x] 修复音频层关键帧未生成的问题
- [x] 修复windows缩放比例不为1时的界面越界问题
- [x] 修复界面中一些特殊文字的错位问题
- [x] 修复windows禁止字符导致预览存储失败的问题
- [x] 修复最小化时关掉脚本导致的脚本大小归零的问题
- [x] 修复windows特殊字符串导致的模块,组以及元素生成失败的问题
- [x] 修复mac CC2017中表达式翻译无法使用的问题
- [x] 修复setInterpolationTypeAtKey的关键帧生成报错
- [ ] 修复非1080p的右键菜单越界的问题

## 脚本界面
支持动态预览元素内容  
![screenshot7](https://raw.githubusercontent.com/Smallpath/Memory/master/screenshot/1.gif)  
![screenshot8](https://raw.githubusercontent.com/Smallpath/Memory/master/screenshot/2.gif)  
支持窗口大小自适应,同时拥有方便的**右键菜单**来节省界面空间  
![screenshot1](https://raw.githubusercontent.com/Smallpath/Memory/master/screenshot/1.PNG)  

## 脚本功能
1. 脚本界面支持预览动画,可以设置预览动画的帧率和帧数
2. 支持一切层,包括形状层,文字层,图片音频层,甚至`合成层`
3. 支持一切属性,包括层本身属性以及层内部属性组,例如插件,遮罩,文字动画器,形状效果器,图层样式等等
4. 支持图片和音频,即使他们被移动或删除,脚本也可以正确生成
5. 由语言版本不同造成的表达式报错将被自动修复,支持英文,中文,日文三种语言
6. 支持自定义预设,脚本提供插件,遮罩,动画器等9种属性组的自由搭配选项
7. 存储得到的数据兼容于AE任何版本,例如,用本脚本在CC2015上存储的一个工程,可以在CC上正确地生成

## 环境要求
Windows系统;AE版本为CC,CC2014与CC2015

# 开发
- [x] Node.js > v4.0
- [x] Yarn.js

```
# 安装依赖
yarn

# 开发
yarn run dev

# 构建
yarn run build
```

## 感谢
- 阿木亮([GridView.js](https://github.com/Smallpath/Memory/blob/master/lib/GridView.js),[UIParser.js](https://github.com/Smallpath/Memory/blob/master/lib/UIParser.js))
- 水果硬糖([UIParser.js](https://github.com/Smallpath/Memory/blob/master/lib/UIParser.js))

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
