module.exports = (function() {
  var keyNameArr = []
  var valueArr = []

  for (var i = 1; i <= 9; i++) {
    keyNameArr.push('_1_' + i)
    if (i === 1 || i === 2 || i === 5) {
      valueArr.push('1')
    } else {
      valueArr.push('0')
    }
  }

  for (i = 1; i <= 9; i++) {
    keyNameArr.push('_2_' + i)
    valueArr.push('0')
  }

  keyNameArr.pushh('thisSelection')
            .pushh('limitText')
            .pushh('thumbType')
            .pushh('winLocation')
            .pushh('winSize')
            .pushh('coverChange')
            .pushh('folderName')
            .pushh('effectName')
            .pushh('deleteAlert')
            .pushh('preCompose')
            .pushh('saveMaterial')
            .pushh('autoName')
            .pushh('onlyEffect')
            .pushh('cleanGroup')
            .pushh('offsetKeyframe')
            .pushh('language')
            .pushh('showThumb')
            .pushh('parentSelection')
            .pushh('frameSecond')
            .pushh('frameNum')
            .pushh('savePreview')
            .pushh('gridViewScale')
            .pushh('saveWorkarea')

  valueArr.pushh('1')
          .pushh('true')
          .pushh('false')
          .pushh('200,500')
          .pushh('300,500')
          .pushh('false')
          .pushh('Sp_memory Folder')
          .pushh('Effects,Effect,effect,effects,特效,效果')
          .pushh('true')
          .pushh('false')
          .pushh('true')
          .pushh('true')
          .pushh('false')
          .pushh('false')
          .pushh('false')
          .pushh('ch')
          .pushh('true')
          .pushh('0')
          .pushh('33')
          .pushh('30')
          .pushh('true')
          .pushh('1')
          .pushh('false')

  keyNameArr.forEach(function(item, index) {
    var value = valueArr[index]
    if (sp.haveSetting(item) === false) sp.saveSetting(item, value)
  })

  sp.showThumbValue = sp.getSettingAsBool('showThumb')
  sp.deleteAlertValue = sp.getSettingAsBool('deleteAlert')
  sp.preComposeValue = sp.getSettingAsBool('preCompose')
  sp.saveMaterialValue = sp.getSettingAsBool('saveMaterial')
  sp.autoNameValue = sp.getSettingAsBool('autoName')
  sp.onlyEffectValue = sp.getSettingAsBool('onlyEffect')
  sp.cleanGroupValue = sp.getSettingAsBool('cleanGroup')
  sp.offsetKeyframeValue = sp.getSettingAsBool('offsetKeyframe')
  sp.savePreviewValue = sp.getSettingAsBool('savePreview')
  sp.saveWorkareaValue = sp.getSettingAsBool('saveWorkarea')

  sp.thumbTypeValue = sp.getSettingAsBool('thumbType')
  sp.coverChangeValue = sp.getSettingAsBool('coverChange')

  sp.frameSecond = parseInt(sp.getSetting('frameSecond'))
  sp.frameNum = parseInt(sp.getSetting('frameNum'))
  sp.gridViewScale = parseFloat(sp.getSetting('gridViewScale'))


  !sp.scriptFolder.exists && sp.scriptFolder.create()
  !sp.roamingFolder.exists && sp.roamingFolder.create()
  !sp.materialFolder.exists && sp.materialFolder.create()

  var loc = function(string) {
    if (sp.lang === 0) {
      sp.lang = sp.getSetting('language')

      if (sp.isForceEnglish()) {
        sp.lang = 'en'
      }
    }
    return string[sp.lang]
  }

  $.global.loc = loc

  sp.extend(sp, {
    beyondCS6: true,
    versionUpdateInfo: {
      ch:
      `层存储脚本Sp_Memory 3.0 @秋风_小径

功能添加:
1.默认开启预览动画功能
2.存储层时默认存储预览动画,可设定预览的帧率和帧数
3.导入导出功能支持预览动画
3.添加组的分类-模块

右键菜单新增:
1.预览全部/预览选中
2.新建模块
3.删除模块


小提示:
1.在3.x版本前保存的组,可以用"右键->辅助脚本->重载组内预览动画"来为组所有元素进行批量生成预览动画
2.可使用ctrl与shift对元素进行自由选择,之后右键->预览选中,即可同时预览所有被选中元素的动画
3.在未选中任何元素时,右键->预览全部,即可预览组内的全部元素的动画
4.在设置窗口中,选中一个组,之后点击"剪切选中组到其他模块",可将组移动到其他模块中


`,
      en: `Sp_memory 3.0 @smallpath
                    
New Feature:
1.Enable preview element
2.Create preview animation while saving layers,you can set the frame rate and frame number
3.Export/Import group support preview animation
4.Add module - the group of group

Tips:
1.When your group is saved  before v3.0,you can use "RightClick->Helper scripts->Reload previews of group" to create all the preview animation
2.Use ctrl key and shift key to select element,then use "RightClick->Preview selected" to preview the animations of selected element at the same time.
3.When there isn't any element being selected, us "RightClick->Preview all" to preview all the animations of group.
4.To cut the group from its module into another module,use "Cut selected group to other module" in the settings window
                    
`
    }
  })

  if (sp.haveSetting('version') === false || sp.getSetting('version') < sp.version) {
    alert(loc(sp.versionUpdateInfo))
  }
  sp.saveSetting('version', sp.version)
})()
