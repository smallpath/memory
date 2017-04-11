$.global.createMenu = createMenu
function createMenu() {
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

    { name: loc(sp.isShow), type: 'checkbox' }, { name: loc(sp.isName), type: 'checkbox' },
    { name: loc(sp.isSavePreview), type: 'checkbox' }, { name: loc(sp.isOffset), type: 'checkbox' },
    { name: loc(sp.isPrecomp), type: 'checkbox' }, { name: loc(sp.isEffect), type: 'checkbox' },
    { name: loc(sp.cleanProperty), type: 'checkbox' }, { name: loc(sp.offsetKey), type: 'checkbox' }

  ]

  var length = itemList.length

  var space = 102 / 5
  var buttonHeight = 20
  var checkBoxHeight = 21

  if (sp.lang === 'ch') { var maxWidth = 180 } else { maxWidth = 190 }

  var ShortMenu = new Window('palette', 'huhu', [0, 0, maxWidth, length * space / 2 + 2], {
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
    if (i % 2 === 0) {
      ShortMenu[item.name] = ShortMenu.add(
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
      ShortMenu[item.name] = ShortMenu.add(
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
  }

  var isCheckBoxClicked = false

  ShortMenu[loc(sp.settings)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    $.global.settingsButtonFunc()
  }

  ShortMenu['helperScripts'].add('item', loc(sp.helperScripts))
  ShortMenu['helperScripts'].add('item', loc(sp.expressionTranslate))
  ShortMenu['helperScripts'].add('item', loc(sp.reloadGroup))
  ShortMenu['helperScripts'].add('item', loc(sp.saveEachLayer))
  ShortMenu['helperScripts'].add('item', loc(sp.cutLength))
  ShortMenu['helperScripts'].selection = 0

  ShortMenu['helperScripts'].onChange = ShortMenu['helperScripts'].onChanging = function() {
    try {
      // run sp_translate script
      this.selection.index === 1 &&
        $.global.translate() ||

        // generate and then save the whole group
        this.selection.index === 2 &&
        $.global.reloadPic() ||

        // auto save every layer in current comp,one layer as one element
        this.selection.index === 3 &&
        $.global.autoSave() ||

        // cut layers' length by opacity and comp length
        this.selection.index === 4 &&
        $.global.cutLength()
    } catch (err) {
      err.printa()
    }

    // back list's selection
    this.selection = 0
  }

  ShortMenu['preview'].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.previewAll()
  }

  ShortMenu[loc(sp.yushe)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    $.global.presetWindow()
  }

  ShortMenu[loc(sp.changeName)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.changeName()
  }

  ShortMenu[loc(sp.importPicture)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.importImage()
  }

  ShortMenu[loc(sp.addModule)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.addModule()
  }

  ShortMenu[loc(sp.deleteModule)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.deleteModule()
  }

  ShortMenu[loc(sp.importFile)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.importFiles()
  }

  ShortMenu[loc(sp.exportFile)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.exportFile()
  }

  ShortMenu[loc(sp.addGroup)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.addGroup()
  }

  ShortMenu[loc(sp.deleteGroup)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.deleteGroup()
  }

  ShortMenu[loc(sp.addElement)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.newItem()
  }

  ShortMenu[loc(sp.cover)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.cover()
  }

  ShortMenu[loc(sp.create)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.newLayer()
  }

  ShortMenu[loc(sp.deleteElement)].onClick = function() {
    isCheckBoxClicked = false
    ShortMenu.hide()
    sp.fns.deleteItem()
  }

  ShortMenu[loc(sp.isShow)].value = sp.showThumbValue
  ShortMenu[loc(sp.isName)].value = sp.autoNameValue
  ShortMenu[loc(sp.isSavePreview)].value = sp.savePreviewValue
  ShortMenu[loc(sp.isOffset)].value = sp.saveMaterialValue
  ShortMenu[loc(sp.isPrecomp)].value = sp.preComposeValue
  ShortMenu[loc(sp.isEffect)].value = sp.onlyEffectValue
  ShortMenu[loc(sp.cleanProperty)].value = sp.cleanGroupValue
  ShortMenu[loc(sp.offsetKey)].value = sp.offsetKeyframeValue

  ShortMenu[loc(sp.isShow)].onClick = function() {
    sp.showThumbValue = this.value
    $.global.sp.gv.showText = this.value
    sp.saveSetting('showThumb', this.value.toString())
    isCheckBoxClicked = true
    sp.gv.refresh()
  }

  ShortMenu[loc(sp.isName)].onClick = function() {
    sp.autoNameValue = this.value
    sp.saveSetting('autoName', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu[loc(sp.isSavePreview)].onClick = function() {
    sp.savePreviewValue = this.value
    sp.saveSetting('savePreview', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu[loc(sp.isOffset)].onClick = function() {
    sp.saveMaterialValue = this.value
    sp.saveSetting('saveMaterial', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu[loc(sp.isPrecomp)].onClick = function() {
    sp.preComposeValue = this.value
    sp.saveSetting('preCompose', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu[loc(sp.isEffect)].onClick = function() {
    sp.onlyEffectValue = this.value
    sp.saveSetting('onlyEffect', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu[loc(sp.cleanProperty)].onClick = function() {
    sp.cleanGroupValue = this.value
    sp.saveSetting('cleanGroup', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu[loc(sp.offsetKey)].onClick = function() {
    sp.offsetKeyframeValue = this.value
    sp.saveSetting('offsetKeyframe', this.value.toString())
    isCheckBoxClicked = true
  }

  ShortMenu.addEventListener('blur', function() {
    if (isCheckBoxClicked === false) {
      ShortMenu.hide()
    } else {
      isCheckBoxClicked = true
    }
  })

  ShortMenu.onDeactivate = function() {
    ShortMenu.hide()
  }

  ShortMenu.addEventListener('keydown', function(event) {
    ShortMenu.hide()
  })

  return ShortMenu
}
