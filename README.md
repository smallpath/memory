## [English Document](https://github.com/Smallpath/Memory/blob/master/wiki/README-EN.md)

# Memory
这是后期合成软件[Adobe After Effects](https://en.wikipedia.org/wiki/Adobe_After_Effects)的层存储脚本,你可以将AE中任何层(包括合成层)保存下来,以便在其他工程中,在其他版本的AE中,甚至在其他电脑中生成新的层

# 3.1 TODO

# 优化
- [x] 更换打包工具以提供直观的报错定位
- [x] 生成层进度条
- [ ] 存储层进度条
- [ ] 允许截取工作区
- [ ] 搜索框
- [ ] 存储时获取合成层的大小, 生成时直接拉伸
- [x] 支持存储视频, 去除大小限制

# bugfix
- [x] 音频层关键帧
- [ ] 修复windows缩放比例的问题
- [ ] 修复非1080p的右键菜单越界的问题
- [ ] cc2017表达式翻译能否使用


## 环境要求
Windows系统;AE版本为CC,CC2014与CC2015

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

## 脚本安装
进入[此页面](https://raw.githubusercontent.com/Smallpath/Memory/master/dist/Sp_memory.jsx),通过`右键->另存为`进行脚本的下载  
请将`Sp_memory.jsx`脚本放置在你的AE脚本文件夹中,通常在`path\to\ae\Support Files\Scripts\ScriptUI Panels`  
在AE中打开`窗口`菜单中的`Sp_memory.jsx`即可

注: [Release](https://github.com/Smallpath/Memory/releases)页面中包含三个拥有预览动画的素材包用于演示,请在解压后,在脚本界面上`右键->导入组`并全选素材文件

## 常见使用问题
- 脚本无法新建组与保存层,错误代码提示1251  
  - win8-win10用户请使用管理员权限运行AE  
  - 如果是首次使用脚本,请在AE中打开`编辑->预选项->一般`,勾选`允许脚本访问文件与网络`  
  
- 我存储的素材如何备份?
  - 直接备份脚本同目录的`Sp_memory`文件夹即可
  
- v3版本无法预览之前存储的元素,应该怎样解决?
  - `右键->重载组内预览动画`,即可进行预览动画的生成
  
- v2支持CS3至CC2015,为什么v3只支持CC至CC2015?
  - 因为预览特性对AE环境非常苛刻,目前只有CC及以上版本能够通过测试
  - 但是,v3存储的元素,一样能够正确导出到v2中并进行层的生成
  
- Sp_memory v3是否有更多的`Motion Graphics`素材包以供下载?
  - 因为版权原因,v3只提供三个素材包作为示范,用户可以通过`右键->自动存储每一层`功能来批量存储`Motion Graphics`

- AE CC2015.3 使用Memory无法存储, 错误代码提示1321
  - Memory v3.0不向上兼容, 只有经过测试的版本才会加上支持. 开发版本已经添加了CC2015.3, 请查看脚本安装部分进行安装


## 脚本使用教程
>[文字教程](https://github.com/Smallpath/Memory/blob/master/wiki/TUTORIAL.md)

## 版本更新记录
>[更新历史](https://github.com/Smallpath/Memory/blob/master/wiki/LOGS.md)

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
