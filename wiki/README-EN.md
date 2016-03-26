# Memory

This is a script for Adobe After Effects.It can save any layer even `composition layer` in AE ,so you can create these layers in another project,another version of ae and even another computer


##User Interface
![screenshot1](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/1_en.PNG)

![screenshot2](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/2_en.PNG)

![screenshot3](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/3_en.PNG)

![screenshot4](https://raw.githubusercontent.com/Smallpath/Memory/master/_screenshot/4.gif)

Script layouts automatically according to window size.Moreover,it has right-click menu to reduce space for you

##Script Feature
1. It support any layer, such as Shape layer,Text layer,Image layer,Music layer and even `Composition layer`
2. It support any property,including Plugin,Mask,Text Animator,Shape Effector,Layer Style and so on.
3. It support storing image and music.Even if the material has been removed, it can be generated correctly by Memory
4. It support fixing the expression error caused by using different launguage of AE.Lauguage supported includes English,Chinese,Japanese and ADBE.
5. It support preset which support 9 types of PropertyGroup such as Plugin,Mask,Text Animator and Transform.
6. It support cross-version,For example, if you save a composition layer in AE CC2015,Memory can generate that layer perfect in AE CS4



##Usage
Go to [release page](https://github.com/Smallpath/Memory/releases).Download the latest version by clicking '`Source code (zip)`

If your AE version is CC-CC2015,extract the `Sp_memory.jsxbin` and `Sp_memory` to your AE script folder,something like `Support Files\Scripts\ScriptUI Panels`

If your AE version is CS3-CS6,extract `Sp_memory v2.2(CS3-CS6).jsxbin` and `Sp_memory` instead

If your windows is win8 or win10, make sure AE is running under the administrator access

In AE, go to Edit->Preferences->General,make sure 'Allow scripts to write File and access Network' is checked

In the end,open Memory from Window->'Sp_memory.jsxbin'


##Tutorial
>[Tutorial](https://raw.githubusercontent.com/Smallpath/Memory/master/wiki/TUTORIAL-EN.md)


##Logs
[Version Log](https://raw.githubusercontent.com/Smallpath/Memory/master/LOG.md)

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
