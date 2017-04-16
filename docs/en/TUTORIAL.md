## Open script

#### Panel type
Open `Sp_memory.jsxbin` from `AE->Window->Sp_memory.jsxbin`

#### Palette type
`AE->File->Scripts->Run script file` to open `Sp_memory.jsxbin`.  
In this type, memory supports shortcut keys.More infomation in the memory setting window

## Item
The element in memory panel is called `Item`

## Save layer
`Right Click->New item` to save selected layers into a new item  
Shortcut:`Ctrl+Right Click` Or `Alt+Right Click`

## Create layer
`Right Click->New layer` to generating new layers using the selected item    
Shortcut:Double click at selected item.

## Cover item
`Right Click->Cover item` to cover selected item by selected layers

## Move item
`Shift+Right Click` to show item-moving window

## Save all layers in current comp, each as a new item.
`Right Click->Help scripts->save every layer in active comp` to save each layer as each item in current comp  
Very useful to save motion graphics compositions

## 8 checkboxs of Right-click menu
```
General:
    Show text:   whether the text of item shows
    
Save layer:
    Auto rename:   whether auto name for the item when save layer.
    Save preview:   whether save preview for the item when save layer.
    Save material:  whether save images and musics for the item when save layer.
                    If true,script can create images and musics even if the source has been removed.  
    
Create layer:
    Pre-compose:   Whether pre-compose layers which are created.
    Only property:  Whether only create new property groups on selected layer rather than create new layers.
    Empty property:  If Only property is checked,decide whether clean property group before Only property  
    Offset keyframe:  If Only property is checked,decide whether keyframes created should offset related to the inPoint of layer.
```

## Reload previews of group
`Right Click->Help scripts->Reload previews of group` to reload previews of group if there is no previews  
Option is the max number of frames.memory will cut the layers from 0 to the max number if you input it.

## Fix expression errors
`Right Click->Help scripts->Fix expression errors` to fix expression errors caused by using different language of AE  
Language supported includes Chinese,English,Japanese and ADBE(Adobe general identifier)  
If there are wrong expressions when create layer,memory will call this script to fix them.

## Preview all/selected
If there is items being selected , the preview button in Right-click menu will be `Preview selected`  
If there is no,the preview button will be `Preview all`  
You can select items by using `Ctrl` and `Shift`

## Import picture
`Right Click->Import picture` to import image to selected item  
memory will scale the picture to the size of thumbnail

## Import group
`Right Click->Import group` to import groups to memory

## Add group
`Right Click->New group` to add a new group  
Group is the container of item,so make sure there is a group before saving layer

## Add module
`Right Click->New module` to add a new module  
When add group and import group,the group will be added into current module  
You can edit the module by open the `Move module or rename module` from the Setting window

## Setting
`Right Click->Setting` to open Setting window

#### Move group
Press "↑" and "↓" to move group in the Setting window which is near top-right 

#### Cut group to other module
Cut selected group to other module

#### Export groups
Export groups.Support multi-select

#### Empty temp folder
Empty the material folder which is created by memory using 'Save material' feature

#### Limit the text
Decide whether limit the text of item to avoid overflow.Default: true

#### Update thumbs when cover item
Whether update thumbnail when cover item.This is just thunmnail.To avoid updating preview, make sure `Right Click-Save preview` is not checked

#### Enable new type of thumb
In CC and CC,memory can save another type of thumb.This thumbnail is exactly the screenshot of `Composition Window` of AE

#### Deleting alert
Whether alert when delete items.Default: true

#### The milliseconds of a frame continues when preview
The max number is 50 in CC and CC2014, and is 300 in CC2015  
Since the speed of saveing preview in CC2015 is 10 times faster than other AE version

#### The folder name of collect feature
This is the name of the main folder in `Project Window`  
memory will collect the Comp layers created by script to the main folder 

#### The group name that can enable 'Only property'
If the name of group is included here, then `Right Click->Only property` will be checked when change groups

#### 中文/English
To change script language to 中文 or English

#### Check version
Check updates for memory

## Preset setting
`Right Click->Preset setting` to open preset window  
'Only property' and 'Empty property' will be here.  
You can edit them by yourself to use  the powerful preset feather of memory

#### Only property
If `Right Click->Only property` is checked ,decide the property groups that will be created  
Default:
```
Mask
Effect
Layer styles
Shape content
Text animators
```

#### Empty property
If `Right Click->Empty property` and `Right Click->Only property` are checked,decide the property groups that will be empty before Only property

Default:
```
Layer styles
Text animators
```






