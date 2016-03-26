# Memory

This is a script for Adobe After Effects.**It can be used to save any layers in AE,so you can create these layers in another project,another version of ae and even another computer**


##User Interface
![screenshot1](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/1.PNG)

![screenshot2](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/2.PNG)

![screenshot3](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/3.PNG)

![screenshot4](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/4.gif)

Script layouts automatically according to window size.Moreover,it has right-click menu to reduce space for you

##Script Feature
1. 支持存储一切层,包括形状层,文字层,图片音频层,甚至**合成层**
2. 支持存储几乎一切层的属性,包括层本身属性以及层内部属性组,例如插件,遮罩,文字动画器,形状效果器,图层样式等等
3. 支持存储图片层与音频层中的图片和音频,即使原素材不存在,脚本也可以正确生成
4. 存储与生成时**支持AE多语言与多版本,语言支持中文,英文,日文以及通用ADBE格式,版本支持CS3至CC2015**.由语言版本不同造成的表达式报错将被自动修复
5. 支持生成属性组,脚本提供插件,遮罩,动画器等9种属性组的自由搭配选项


##Usage
下载最新版本

将压缩包中的`Sp_memory.jsxbin`,`Sp_memory文件夹`放置在你的AE脚本文件夹中,例如`Support Files\Scripts\ScriptUI Panels`

win7,win8,win10用户请用管理员权限运行AE,右键AE->兼容性->勾选*以管理员身份运行此程序*

在AE中打开编辑->预选项->一般,勾选*允许脚本访问文件与网络*

在AE中打开窗口菜单中的`Sp_memory.jsxbin`,即可

##Tutorial
>[Tutorial](https://vimeo.com/154461198)


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

##Logs
[Version log](https://raw.githubusercontent.com/Smallpath/Memory/master/LOG.md)

##Thanks To
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

##Feedback

If you encounter any problems or have any feedback, please open an issue.
