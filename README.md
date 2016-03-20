# Memory


这是后期合成软件*Adobe After Effects*的层存储脚本,**你可以将AE中任何层保存下来,以便在另一个工程中或在另一台电脑中生成新的层**

This is a script for Adobe After Effects.**It can be used to save any layers in AE,so you can create these layers in another project,another version of ae and even another computer**


##脚本界面/User Interface
![screenshot1](https://raw.githubusercontent.com/Smallpath/Memory/master/screenShot.PNG)

支持窗口大小自适应,同时拥有方便的**右键菜单**来节省界面空间

Script layouts automatically according to window size.Moreover,it has right-click menu to reduce space for you

##脚本功能/Script Feature
1. 支持存储一切层,包括形状层,文字层,图片音频层,甚至**合成层**
2. 支持存储几乎一切层的属性,包括层本身属性以及层内部属性组,例如插件,遮罩,文字动画器,形状效果器,图层样式等等
3. 支持存储图片层与音频层中的图片和音频,即使原素材不存在,脚本也可以正确生成
4. 存储与生成时**支持AE多语言与多版本,语言支持中文,英文,日文以及通用ADBE格式,版本支持CS3至CC2015**.由语言版本不同造成的表达式报错将被自动修复
5. 支持生成属性组,脚本提供插件,遮罩,动画器等9种属性组的自由搭配选项


##脚本安装/Usage
将`memory.jsx`,`Sp_memory.jsxbin`,`Sp_memory文件夹`放置在AE脚本文件夹中,在AE中打开`memory.jsx`或`Sp_memory.jsxbin`


##脚本使用教程/Tutorial
>[Vimeo](https://vimeo.com/154461198)

##使用提示/Tips

1. 右键->`设置`,在设置中选择`English`或`中文`按钮,可以切换脚本语言
2. 右键->`新建元素`(快捷键:窗口上Alt+右键),即可存储选中的层
3. 右键->辅助脚本->`表达式翻译`,可以手动翻译有错误表达式的工程
4. 右键->辅助脚本->`自动存储每一层`,可以快速存储当前合成的每一层为单独的一个元素,非常适合存储MG合成层
5. 在脚本上按住左键,可以上下滑动窗口内容
6. 双击界面内任意元素,即可根据元素对应的数据生成新层


##版本更新记录/Logs
##2.2 (Date:2016-03-20)
###### 功能添加
- 重构代码
- 生成时将默认翻译表达式
- 添加一种新类型的缩略图,支持CS6-CC2014
- 生成加速5%
- 开源Sp_toolbar v1.4和Sp_translate v1.7

###### BUG修正
- **解决内存泄漏的问题**
- **解决脚本停止运行的问题**
- 修正win10下右侧滑块不能下拉到最下面的问题
- 修正检测框状态保存失败的问题
- 修正老界面删除组失败的相关问题
- 修正存储时相同名字导致的图片更新不及时的问题

###2.1 (Date:2015-11-05)
- 添加组级别的出错处理
- 非Panel模式打开脚本时添加快捷键
- 添加裁剪新界面上文字的长度的选项
- 存储过程加速10%

###2.0 (Date:2015-10-07)
- 添加新界面(支持CC,CC2014,CC2015),支持图片自动排列,支持多选
- 添加一些设置选项
- 添加关键帧插值与roving的支持
- 添加LayerIndex与MaskIndex类型的属性的支持
- 添加光线追踪层的支持
- 添加检查更新的功能
- 添加记忆脚本窗口位置与大小的功能
- 修正一些BUG

###1.3 (Date:2015-07-02)
- 添加AE CC2015的支持
- 添加快速存储辅助脚本
- 添加批量导出功能
- 修正一些BUG

###1.2 (Date:2015-05-16)
- 添加AE CS3,CS4,CS5,CS5.5的支持
- 新增第五检测框,关键帧偏移检测框,并在右键菜单中新增其选项
- 新增第六检测框,清空层内容检测框
- 新增预设功能
- 修正一些BUG

###1.1 (Date:2015-04-19)
- 启用第四检测框,存储素材
- 在设置菜单中添加清空临时文件夹的快捷按钮
- 在设置菜单中增加重命名选中组的按钮
- 在右键菜单中增加重命名选中元素的按钮
- 在设置菜单中增加中英文界面切换的按钮
- 修正一些BUG

###1.0 (Date:2015-04-13)
- 新增合成层支持
- 添加AE CS6,CC,CC2014的支持

##感谢/Thanks To
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

##反馈/Feedback
脚本使用中遇到任何问题,请新开一个issue

If you encounter any problems or have any feedback, please open an issue.
