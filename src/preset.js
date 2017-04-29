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
            .pushh('checkVersionOnStartup')

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
          .pushh('false')

  keyNameArr.forEach(function(item, index) {
    var value = valueArr[index]
    if (sp.haveSetting(item) === false) sp.saveSetting(item, value)
  })

  // ensure delete alert
  sp.deleteAlertValue = true

  sp.showThumbValue = sp.getSettingAsBool('showThumb')
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
  sp.checkVersionOnStartupValue = sp.getSettingAsBool('checkVersionOnStartup')

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
      `层存储脚本Sp_Memory ${process.env.VERSION} @秋风_小径

>> 优化
- 更换打包工具以提供直观的报错定位
- 支持存储视频, 去除素材的大小限制
- 生成层进度条
- 存储层进度条
- 进度条显示脚本耗时
- 存储预览进度条
- 优化预览CPU占用
- 生成单个预合成时直接拉伸至当前合成大小
- 增加允许截取工作区预览的检测框
- 修复检查更新功能
- 增加自动更新功能
- 增加windows缩放比例参数

>> 漏洞修复
- 修复音频层关键帧未生成的问题
- 修复windows缩放比例不为1时的界面越界问题
- 修复界面中一些特殊文字的错位问题
- 修复windows禁止字符导致预览存储失败的问题
- 修复最小化时关掉脚本导致的脚本大小归零的问题
- 修复windows特殊字符串导致的模块,组以及元素生成失败的问题
- 修复mac CC2017中表达式翻译无法使用的问题
- 修复setInterpolationTypeAtKey的关键帧生成报错
- 修复非1080p的右键菜单越界的问题
`,
      en: `Sp_memory ${process.env.VERSION} @smallpath
                    
New Feature:
1. Move to new pack tool to provide useful error stack trace
2. Add support to media material layer and remove the size limit of any material
3. Add progress bar to creating and saving process, together with saving previews
4. Add check box to support saving previews in workarea
5. Add support for windows font scale ratio to solve problem on AE CC2015
6. Fit to comp when only one comp layer is generated
7. Add auto updating feature and checkbox for starting checking
8. Optimize cpu rank while previewing          
`
    }
  })

  if (sp.haveSetting('version') === false || sp.getSetting('version') < sp.version) {
    alert(loc(sp.versionUpdateInfo))
  }
  sp.saveSetting('version', sp.version)
})()
