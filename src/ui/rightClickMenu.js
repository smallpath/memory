var settingWindow = require('./settingWindow')
var presetWindow = require('./presetWindow')

module.exports = function() {
  var itemList = [
    { name: loc(sp.settings), type: 'button' }, { name: 'helperScripts', type: 'dropdownlist' },

    { name: 'preview', type: 'button' }, { name: loc(sp.yushe), type: 'button' },

    { name: loc(sp.changeName), type: 'button' }, { name: loc(sp.importPicture), type: 'button' },
    { name: loc(sp.addModule), type: 'button' }, { name: loc(sp.deleteModule), type: 'button' },
    { name: loc(sp.importFile), type: 'button' }, { name: loc(sp.exportFile), type: 'button' },
    { name: loc(sp.addGroup), type: 'button' }, { name: loc(sp.deleteGroup), type: 'button' },
    { name: loc(sp.addElement), type: 'button' }, { name: loc(sp.cover), type: 'button' },
    { name: loc(sp.create), type: 'button' }, { name: loc(sp.deleteElement), type: 'button' },

    // { name: loc(sp.searchText), type: 'button' }, { name: loc(sp.searchButton), type: 'button' },

    { name: loc(sp.isShow), type: 'checkbox' }, { name: loc(sp.isName), type: 'checkbox', id: 'autoName' },
    { name: loc(sp.isSavePreview), type: 'checkbox', id: 'savePreview' }, { name: loc(sp.isOffset), type: 'checkbox', id: 'saveMaterial' },
    { name: loc(sp.isPrecomp), type: 'checkbox', id: 'preCompose' }, { name: loc(sp.isEffect), type: 'checkbox', id: 'onlyEffect' },
    { name: loc(sp.cleanProperty), type: 'checkbox', id: 'cleanGroup' }, { name: loc(sp.offsetKey), type: 'checkbox', id: 'offsetKeyframe' },
    { name: loc(sp.saveWorkarea), type: 'checkbox', id: 'saveWorkarea' }

  ]

  var length = itemList.length

  var space = 102 / 5
  var buttonHeight = 20
  var checkBoxHeight = 21

  if (sp.lang === 'ch') { var maxWidth = 180 } else { maxWidth = 190 }

  var shortMenu = new Window('palette', '', [0, 0, maxWidth, Math.ceil(length / 2) * space + 2], {
    borderless: true
  })

  for (var i = 0; i < length; i++) {
    var item = itemList[i]
    let itemWidth, itemHeight
    itemWidth = maxWidth / 2 + (item.widthOffset || 0)
    if (item.type === 'button') {
      itemHeight = buttonHeight
    } else if (item.type === 'checkbox') {
      itemHeight = checkBoxHeight
    } else if (item.type === 'dropdownlist') {
      itemHeight = buttonHeight
    } else if (item.type === 'edittext') {
      itemHeight = buttonHeight
    }
    var control
    if (i % 2 === 0) {
      control = shortMenu[item.name] = shortMenu.add(
        item.type,
        [
          0,
          (parseInt((i) / 2) * itemHeight),
          itemWidth,
          (22 + parseInt((i) / 2) * itemHeight)
        ],
        item.name
      )
    } else {
      control = shortMenu[item.name] = shortMenu.add(
        item.type,
        [
          itemWidth,
          (parseInt((i - 1) / 2) * itemHeight),
          maxWidth,
          (22 + parseInt((i - 1) / 2) * itemHeight)
        ],
        item.name
      )
    }
    if (control && item.id) control.id = item.id
  }

  var isCheckBoxClicked = false

  shortMenu[loc(sp.settings)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    settingWindow()
  }

  shortMenu['helperScripts'].add('item', loc(sp.helperScripts))
  shortMenu['helperScripts'].add('item', loc(sp.expressionTranslate))
  shortMenu['helperScripts'].add('item', loc(sp.reloadGroup))
  shortMenu['helperScripts'].add('item', loc(sp.saveEachLayer))
  shortMenu['helperScripts'].selection = 0

  shortMenu['helperScripts'].onChange = shortMenu['helperScripts'].onChanging = function() {
    try {
      // run sp_translate script
      this.selection.index === 1 &&
        $.global.translate() ||

        // generate and then save the whole group
        this.selection.index === 2 &&
        $.global.reloadPic() ||

        // auto save every layer in current comp,one layer as one element
        this.selection.index === 3 &&
        $.global.autoSave()
    } catch (err) {
      err.printa()
    }

    // back list's selection
    this.selection = 0
  }

  shortMenu['preview'].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.previewAll()
  }

  shortMenu[loc(sp.yushe)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    presetWindow()
  }

  shortMenu[loc(sp.changeName)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.changeName()
  }

  shortMenu[loc(sp.importPicture)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.importImage()
  }

  shortMenu[loc(sp.addModule)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.addModule()
  }

  shortMenu[loc(sp.deleteModule)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.deleteModule()
  }

  shortMenu[loc(sp.importFile)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.importFiles()
  }

  shortMenu[loc(sp.exportFile)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.exportFile()
  }

  shortMenu[loc(sp.addGroup)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.addGroup()
  }

  shortMenu[loc(sp.deleteGroup)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.deleteGroup()
  }

  shortMenu[loc(sp.addElement)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.newItem()
  }

  shortMenu[loc(sp.cover)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.cover()
  }

  shortMenu[loc(sp.create)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.newLayer()
  }

  shortMenu[loc(sp.deleteElement)].onClick = function() {
    isCheckBoxClicked = false
    shortMenu.hide()
    sp.fns.deleteItem()
  }

  shortMenu[loc(sp.isShow)].value = sp.showThumbValue
  shortMenu[loc(sp.isName)].value = sp.autoNameValue
  shortMenu[loc(sp.isSavePreview)].value = sp.savePreviewValue
  shortMenu[loc(sp.isOffset)].value = sp.saveMaterialValue
  shortMenu[loc(sp.isPrecomp)].value = sp.preComposeValue
  shortMenu[loc(sp.isEffect)].value = sp.onlyEffectValue
  shortMenu[loc(sp.cleanProperty)].value = sp.cleanGroupValue
  shortMenu[loc(sp.offsetKey)].value = sp.offsetKeyframeValue
  shortMenu[loc(sp.saveWorkarea)].value = sp.saveWorkareaValue

  shortMenu[loc(sp.isShow)].onClick = function() {
    sp.showThumbValue = this.value
    $.global.sp.gv.showText = this.value
    sp.saveSetting('showThumb', this.value.toString())
    isCheckBoxClicked = true
    sp.gv.refresh()
  }

  shortMenu[loc(sp.isName)].onClick =
  shortMenu[loc(sp.isSavePreview)].onClick =
  shortMenu[loc(sp.isOffset)].onClick =
  shortMenu[loc(sp.isPrecomp)].onClick =
  shortMenu[loc(sp.isEffect)].onClick =
  shortMenu[loc(sp.cleanProperty)].onClick =
  shortMenu[loc(sp.offsetKey)].onClick =
  shortMenu[loc(sp.saveWorkarea)].onClick = function() {
    var name = this.id + 'Value'
    sp[name] = this.value
    isCheckBoxClicked = true
  }

  shortMenu.addEventListener('blur', function() {
    if (isCheckBoxClicked === false) {
      shortMenu.hide()
    } else {
      isCheckBoxClicked = true
    }
  })

  shortMenu.onDeactivate = function() {
    shortMenu.hide()
  }

  shortMenu.addEventListener('keydown', function(event) {
    shortMenu.hide()
  })

  return shortMenu
}
