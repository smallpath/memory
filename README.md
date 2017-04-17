## memory
这是后期合成软件Adobe After Effects的层存储脚本,你可以将AE中任何层(包括合成层)保存下来,以便在其他工程中,在其他版本的AE中,甚至在其他电脑中生成新的层

## 文档
- [中文文档](https://smallpath.github.io/memory)
- [安装](https://smallpath.github.io/memory/#/?id=安装)
- [English Document](https://smallpath.github.io/memory/#/en/)

## 脚本功能
1. 支持动态预览元素内容, 支持窗口大小自适应,同时拥有方便的右键菜单来节省界面空间  
2. 支持一切层的存储与生成,包括形状层,文字层,图片音频层,甚至`合成层`
3. 支持几乎所有属性的存储与生成,包括层本身属性以及层内部属性组,例如插件,遮罩,文字动画器,形状效果器,图层样式等等
4. 支持任何素材层,例如图片,音频甚至是视频,即使他们被移动或删除,脚本也可以正确生成
5. 由语言版本不同造成的表达式报错将被自动修复,默认支持英文,中文,日文三种语言
6. 支持自定义预设,脚本提供插件,遮罩,动画器等9种属性组的自由搭配选项
7. 存储得到的数据兼容于AE任何版本,例如,用本脚本在CC2017上存储的一个工程,可以在CC上正确地生成

## 开发
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
- 阿木亮([GridView.js](https://github.com/smallpath/memory/blob/master/lib/GridView.js),[UIParser.js](https://github.com/smallpath/memory/blob/master/lib/UIParser.js))
- 水果硬糖([UIParser.js](https://github.com/smallpath/memory/blob/master/lib/UIParser.js))

## License
```
Copyright (C) 2015 smallpath

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