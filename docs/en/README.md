## memory
This is a script for Adobe After Effects.It can save any layer even `composition layer` in AE ,so you can create these layers in another project,another version of ae and even another computer

## Support
AE CC,CC2014,CC2015 and CC2017 on Windows system

## User Interface
memory supports preview animation,what you have watched is what it will be after generating layers  
![screenshot7](https://raw.githubusercontent.com/smallpath/memory/master/screenshot/1.gif)  
![screenshot8](https://raw.githubusercontent.com/smallpath/memory/master/screenshot/2.gif)  
![screenshot1](https://raw.githubusercontent.com/smallpath/memory/master/screenshot/1_en.PNG)  
Script layouts automatically according to window size.Moreover,it has right-click menu to reduce space for you

## Script Feature
1. Supporting preview element, you can set the frame numbers and frame rate of preview animation.
2. Supporting any layer, such as Shape layer,Text layer,Image layer,Music layer and even `Composition layer`
3. Supporting any property,including Plugin,Mask,Text Animator,Shape Effector,Layer Style and so on.
4. Supporting storing image and music.Even if the material has been removed, it can be generated correctly by memory
5. Supporting fixing the expression error caused by using different launguage of AE.Lauguage supported includes English,Chinese,Japanese and ADBE.
6. Supporting preset which has 9 types of PropertyGroup such as Plugin,Mask,Text Animator and Transform.
7. Supporting cross-version.For example, if you save a composition layer in AE CC2015,memory can generate that layer perfectly in AE CS4

## Installation
Go to [release page](https://github.com/smallpath/memory/releases).Download the latest version by clicking `Sp_memory.zip`  
Extract the `Sp_memory.jsxbin` to your AE script folder,something like `Support Files\Scripts\ScriptUI Panels`  
If your windows is win8 or win10, make sure AE is running under the administrator access  
In AE, go to `Edit->Preferences->General`,make sure `Allow scripts to write File and access Network` is checked  
Open script from `Window->Sp_memory.jsxbin`

!> The default language is not English. To force English, just add a `force_en.txt` file in `Sp_memory` folder and restart script.

## Usage
>[Usage](en/TUTORIAL.md)


## ChangeLog
>[Change Log](en/LOGS.md)


## Development
- [x] Node.js > v4.0
- [x] Yarn.js

```
# install
yarn

# development
yarn run dev

# build
yarn run build
```

## Feedback
If you encounter any problems or have any feedback, please open an issue.
