/** ***********************************Sp_translate v1.7,自动修复多语言版本造成的表达式报错问题**************************************/
$.global.translate = translate
function translate(thisObj, expProps) {
  var you = this

  var tsp = {
    trans: { en: 'Translate', ch: '开始' },
    allComp: { en: 'Translate all comps', ch: '翻译所有合成' },
    activeComp: { en: 'Translate active comp', ch: '翻译当前合成' },
    selectedComp: { en: 'Translate selected comps', ch: '翻译选中合成' },
    wrongExp: { en: 'Translate wrong exps', ch: '仅翻译错误表达式' },
    rightExp: { en: 'Translate right exps', ch: '仅翻译正确表达式' },
    allExp: { en: 'Translate all expressions', ch: '翻译所有的表达式' },
    log: { en: 'log', ch: '记录' },
    about: { en: 'About', ch: '关于' },
    editBtn: { en: 'Edit hot words', ch: '编辑关键词' },
    str: {
      en: 'This script can fix wrong expressions caused by different language version of AE.By smallpath',
      ch: '外文工程表达式报错?本脚本可以快速解决这个问题~ @秋风_小径'
    },
    ok: { en: 'Ok', ch: '确认' },
    cancel: { en: 'Cancel', ch: '取消' },
    add: { en: 'Add', ch: '增加' },
    edit: { en: 'Edit', ch: '编辑' },
    change: { en: 'Change', ch: '更改' },
    deleteE: { en: 'Delete', ch: '删除' },
    sureDelete: { en: 'Are you sure to delete it ?', ch: '确认删除吗?' },
    addHelp: {
      en: 'Input new hot words,or choose one item to edit and delete.Make sure what you input has double quotation.',
      ch: '你可以新增关键词,编辑或者删除选中的条目.请确认你输入的名称有双引号'
    },
    openFile: { en: 'Do you want to open the log file?', ch: '想要打开记录文件吗?' },
    complete: { en: 'Complete!', ch: '完成!' },
    _1: { en: 'This is the log file', ch: '这里是记录文件' },
    _2: {
      en: '\r\rWrong expressions that can not be fixed at all are as follows.Check them in their comp.\r',
      ch: '\r\r没有被修复的表达式的位置如下,请进入合成检查'
    },
    _3: { en: '\rComp index =', ch: '\r合成索引数 =' },
    _4: { en: 'Comp name =', ch: '合成名    =' },
    _5: {
      en: '\r\rInfo above is the expressions that has not been fixed.\r\r',
      ch: '上面的是没有被修复的表达式的位置.\r\r'
    },
    _6: {
      en: '\r\rInfo as follows is the expressions that has been fixed.\r',
      ch: '下面的信息是被成功修复的表达式.'
    },
    _7: { en: '\rComp index =', ch: '\r合成索引数' },
    _8: { en: 'Comp name    =', ch: '合成名    =' },
    _9: { en: '\r    Layer index =', ch: '\r    图层索引数 =' },
    _10: { en: '    Layer name =', ch: '\r    图层名       =' },
    _11: { en: '        Property name   =', ch: '        属性名             =' }

  }

  this.supportedLanguages = $.global.translate.supportedLanguages = 4
  this.hotWords = []

  var thisFolder, thisFile
  if ($.layer) {
    thisFolder = new Folder($.layer.tempFolder.toString())
    if (!thisFolder.exists) thisFolder.create()
    thisFile = new File(thisFolder.fullName + $.layer.slash.toString() + 'whiteList.xml')
  } else {
    thisFolder = new Folder(Folder.userData.fullName + '/Aescripts/Sp_memory')
    if (!thisFolder.exists) thisFolder.create()
    thisFile = File(thisFolder.fullName + '/whiteList.xml')
  }

  var allWords = [
    ['"Angle Control"', '"角度控制"', '"角度制御"', '"ADBE Angle Control"'],
    ['"Checkbox Control"', '"复选框控制"', '"チェックボックス制御"', '"ADBE Checkbox Control"'],
    ['"Color Control"', '"色彩控制"', '"カラー制御"', '"ADBE Color Control"'],
    ['"Layer Control"', '"图层控制"', '"レイヤー制御"', '"ADBE Layer Control"'],
    ['"Point Control"', '"点控制"', '"ポイント制御"', '"ADBE Point Control"'],
    ['"Slider Control"', '"滑杆控制"', '"スライダー制御"', '"ADBE Slider Control"'],
    ['"Angle"', '"角度"', '"角度"', '"ADBE Angle Control-0001"'],
    ['"Checkbox"', '"检测框"', '"チェックボックス"', '"ADBE Checkbox Control-0001"'],
    ['"Color"', '"颜色"', '"カラー"', '"ADBE Color Control-0001"'],
    ['"Layer"', '"图层"', '"レイヤー"', '"ADBE Layer Control-0001"'],
    ['"Point"', '"点"', '"ポイント"', '"ADBE Point Control-0001"'],
    ['"Slider"', '"滑块"', '"スライダー"', '"ADBE Slider Control-0001"'],
    ['"Motion Tile"', '"动态平铺"', '"モーションタイル"', '"ADBE Tile"'],
    ['"Tile Width"', '"平铺宽度"', '"タイルの幅"', '"ADBE Tile-0003"']
  ]
  if (thisFile.exists) {
    var content = thisFile.readd()
    var hahaxml = new XML(content)
    if (hahaxml.settings.version.toString() !== '1.6') thisFile.remove()
  }
  var iii
  if (!thisFile.exists || thisFile.length === -1) {
    var newxml = new XML('<WhiteList></WhiteList>')
    newxml.settings.version = '1.6'
    newxml.settings.author = 'smallpath'
    for (iii = 0; iii < allWords.length; iii++) {
      newxml.words.words[iii] = allWords[iii]
    }
    if (sp.os === 'mac') {
      thisFile.encoding = 'UTF-8'
    }
    thisFile.writee(newxml)
  }
  content = thisFile.readd()
  var myxml = new XML(content)
  for (iii = 0; iii < myxml.words.words.length(); iii++) {
    var arr = myxml.words.words[iii].split(',')
    this.hotWords.push(arr)
  }

  this.changeNode = function(index, en, ch, ja, adbe) {
    if (en !== '' || ch !== '' || ja !== '' || adbe !== '') {
      if (en === '') en = 'None'
      if (ch === '') ch = 'None'
      if (ja === '') ja = 'None'
      if (adbe === '') adbe = 'None'

      content = thisFile.readd()
      var xml = new XML(content)
      xml.words.words[index] = [en, ch, ja, adbe]
      thisFile.writee(xml)

      this.hotWords = []
      for (var iii = 0; iii < xml.words.words.length(); iii++) {
        arr = xml.words.words[iii]
        arr = arr.split(',')
        this.hotWords.push(arr)
      }
    }
  }

  this.deleteNode = function(index) {
    content = thisFile.readd()
    var deletexml = new XML(content)
    delete deletexml.words.words[index]
    thisFile.writee(deletexml)
    this.hotWords = []
    for (var iii = 0; iii < deletexml.words.words.length(); iii++) {
      arr = deletexml.words.words[iii]
      arr = arr.split(',')
      this.hotWords.push(arr)
    }
  }

  this.addNode = function(en, ch, ja, adbe) {
    if (en !== '' || ch !== '' || ja !== '' || adbe !== '') {
      if (en === '') en = 'None'
      if (ch === '') ch = 'None'
      if (ja === '') ja = 'None'
      if (adbe === '') adbe = 'None'

      content = thisFile.readd()
      var addxml = new XML(content)
      addxml.words.words[addxml.words.words.length()] = [en, ch, ja, adbe]
      thisFile.writee(addxml)

      this.hotWords = []
      for (var iii = 0; iii < addxml.words.words.length(); iii++) {
        arr = addxml.words.words[iii]
        arr = arr.split(',')
        this.hotWords.push(arr)
      }
    }
  }

  this.findReplace = function(prop, langId, compid) {
    try {
      var expr = prop.expression
      var oldExp = prop.expression
      if (expr !== '') {
        for (var l = 0; l < this.supportedLanguages; l++) {
          if (l !== langId) {
            for (var i = 0; i < this.hotWords.length; i++) {
              if (this.hotWords[i][l] !== 'None') {
                var regExp = new RegExp(this.hotWords[i][l], 'g')
                expr = expr.replace(regExp, this.hotWords[i][langId])
              }
            }
          }
        }
        app.beginSuppressDialogs()
        try {
          prop.expression = expr
        } catch (e) {
          try {
            prop.expressionEnabled = true
            prop.valueAtTime(0, false)
            if (lista.selection.index === 0) {
              if (prop.expressionEnabled === false) {
                prop.expression = oldExp
              }
            }
          } catch (er) {
            // writeLn("Skip wrong expressions.");
            wrongcomps.push(compid)
          };
        }
        app.endSuppressDialogs(false)
      }
    } catch (err) { }
  }

  Array.prototype.add = function(str) {
    var check = false
    for (var ia = 0; ia < this.length; ia++) {
      if (this[ia] === str) {
        check = true
      }
    }
    if (check === false) {
      this[this.length] = str
    }
  }

  function recursiveScanLayerForExpr(ref, compindex, ja) {
    var global = $.global.translate.helper
    if (ref !== null) {
      var prop
      for (var i = 1; i <= ref.numProperties; i++) {
        prop = ref.property(i)
        var isLayerStyle = prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false
        var isMaterial = prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false
        var isAudio = prop.matchName === 'ADBE Audio Group' && prop.propertyGroup(prop.propertyDepth).hasAudio === false
        var isExtra = prop.matchName === 'ADBE Extrsn Options Group'
        var isPlane = prop.matchName === 'ADBE Plane Options Group'
        var isVector = prop.matchName === 'ADBE Vector Materials Group'
        var shouldRecursiveScan = !(isLayerStyle || isMaterial || isAudio || isExtra || isPlane || isVector)
        if (checkb.value === true) {
          if ((prop.propertyType === PropertyType.PROPERTY) && (prop.expression !== '') && prop.canSetExpression && (prop.expressionEnabled === true)) { // .expressionError
            global.propArr.push(prop)
            prop.selected = true
            global.exps.push(prop.name)
            global.comps.add(compindex)
            global.layerTemp.add(ja)
          } else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP)) {
            if (shouldRecursiveScan) {
              recursiveScanLayerForExpr(prop, compindex, ja)
            }
          }
        } else if (checka.value === true) {
          if ((prop.propertyType === PropertyType.PROPERTY) && (prop.expression !== '') && prop.canSetExpression && (prop.expressionEnabled === false)) {
            global.propArr.push(prop)
            prop.selected = true
            global.exps.push(prop.name)
            global.comps.add(compindex)
            global.layerTemp.add(ja)
          } else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP)) {
            if (shouldRecursiveScan) {
              recursiveScanLayerForExpr(prop, compindex, ja)
            }
          }
        } else if (checkc.value === true) {
          if ((prop.propertyType === PropertyType.PROPERTY) && (prop.expression !== '') && prop.canSetExpression) {
            global.propArr.push(prop)
            prop.selected = true
            global.exps.push(prop.name)
            global.comps.add(compindex)
            global.layerTemp.add(ja)
          } else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP)) {
            if (shouldRecursiveScan) {
              recursiveScanLayerForExpr(prop, compindex, ja)
            }
          }
        }
      }
    }
  }

  function isInId(itemid, array) {
    var check = false
    for (var ie = 0; ie < array.length; ie++) {
      if (itemid === array[ie]) {
        check = true
      }
    }
    return check
  }

  function ScanProjectForExpr(blackList) {
    var global = $.global.translate.helper = {}
    global.propArr = []
    global.exps = []
    global.layerExps = []
    global.comps = []
    global.layers = []
    global.layerTemp = []
    wrongcomps = []
    var j
    for (var i = 1; i <= app.project.numItems; i++) {
      var item = app.project.item(i)
      if (item instanceof CompItem) {
        if (isInId(i, blackList) === true) {
          writeLn('Proccessing: ' + item.name)
          for (j = 1; j <= item.numLayers; j++) {
            item.layer(j).selected = false
            recursiveScanLayerForExpr(item.layer(j), i, j)
            if (global.exps.length !== 0) {
              global.layerExps.push(global.exps)
            }
            global.exps = []
          }
        }
        if (global.layerTemp.length !== 0) {
          global.layers.push(global.layerTemp)
        }
        global.layerTemp = []
        var selProps = global.propArr
        app.beginUndoGroup('Undo translate')
        for (var ic = 0; ic < selProps.length; ic++) {
          if (lista.selection.index === 0) {
            switch (app.language) {
              case Language.ENGLISH:
                you.findReplace(selProps[ic], 0, i)
                break
              case Language.CHINESE:
                you.findReplace(selProps[ic], 1, i)
                break
              case Language.JAPANESE:
                you.findReplace(selProps[ic], 2, i)
                break
              default:
                break
            }
          } else if (lista.selection.index === 1) {
            you.findReplace(selProps[ic], 0, i)
          } else if (lista.selection.index === 2) {
            you.findReplace(selProps[ic], 1, i)
          } else if (lista.selection.index === 3) {
            you.findReplace(selProps[ic], 2, i)
          } else if (lista.selection.index === 4) {
            you.findReplace(selProps[ic], 3, i)
          }
        }
        app.endUndoGroup()
        for (j = 1; j <= item.numLayers; j++) {
          item.layer(j).selected = false
        }
      }
    }
    return [global.comps, global.layers, global.layerExps, wrongcomps]
  }

  function searchExpression(excludeByName, expFilters) {
    var allExps = ScanProjectForExpr(excludeByName)
    return allExps
  }

  var winW = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'Sp_translate v1.7', undefined, {
    resizeable: true
  })
  winW.margins = 10
  var thisRes = `Group{
    orientation:'column',
    alignChildren:['left','fill'],
    list:DropDownList{preferredSize:[200,25],properties:{items:['` + loc(tsp.allComp) + `','` + loc(tsp.activeComp) + `','` + loc(tsp.selectedComp) + `']}},
    start:Button{text:'` + loc(tsp.trans) + `',preferredSize:[200,50]},
    group:Group{
      alignChildren:['left','fill'],
      checka:Checkbox{text:'` + loc(tsp.wrongExp) + `',value:0},
      lista:DropDownList{properties:{items:['Default','English','中文','日本語','Common']},size:[60,25]}
    }
    groupa:Group{
      alignChildren:['left','fill'],
      checkb:Checkbox{text:'` + loc(tsp.rightExp) + `',value:0},
      about:Button{text:'` + loc(tsp.about) + `',size:[70,25]},
    }
    groupb:Group{
      alignChildren:['left','fill'],
      checkc:Checkbox{text:'` + loc(tsp.allExp) + `',value:1},
      checkFile:Checkbox{text:'` + loc(tsp.log) + `',size:[80,10]}
    }
    addbtn:Button{text:'` + loc(tsp.editBtn) + `',preferredSize:[200,30]}
  }`
  try { var winTempA = winW.add(thisRes) } catch (err) { }
  winW.maximumSize.width = 220
  winTempA.list.selection = 1
  winTempA.group.lista.selection = 0
  var list = winTempA.list
  var start = winTempA.start
  var group = winTempA.group
  var checka = group.checka
  var lista = group.lista
  var groupa = winTempA.groupa
  var checkb = groupa.checkb
  var about = groupa.about
  var groupb = winTempA.groupb
  var checkc = groupb.checkc
  var checkFile = groupb.checkFile
  var addbtn = winTempA.addbtn
  var outFile

  lista.selection = 0

  about.onClick = function() {
    var text = loc(tsp.str)
    var wina = new Window('palette', loc(tsp.about))
    var a = wina.add('edittext')
    a.text = text
    var groupa = wina.add('group')
    var abtn = groupa.add('button', undefined, loc(tsp.ok))
    var bbtn = groupa.add('button', undefined, loc(tsp.cancel))

    a.onChange = a.onChanging = function() {
      this.text = text
    }

    abtn.onClick = bbtn.onClick = function() {
      wina.close()
    }
    wina.center()
    wina.show()
  }

  checkFile.onClick = function() {
    if (checkFile.value === true) {
      outFile = File.saveDialog('', 'txt')
      if (outFile === null) checkFile.value = false
    }
  }

  addbtn.onClick = function() {
    var www = new Window('palette', loc(tsp.editBtn), undefined, {
      resizeable: false
    })
    var gr1 = www.add('group')
    var stat1 = gr1.add('statictext', undefined, 'English   ')
    stat1.characters = 19
    var stat2 = gr1.add('statictext', undefined, '中文 ')
    stat2.characters = 19
    var stat3 = gr1.add('statictext', undefined, ' 日本語')
    stat3.characters = 19
    var stat4 = gr1.add('statictext', undefined, '   Common')
    stat4.characters = 19
    var gr2 = www.add('group')
    var edit1 = gr2.add('edittext', undefined)
    edit1.characters = 19
    var edit2 = gr2.add('edittext', undefined)
    edit2.characters = 19
    var edit3 = gr2.add('edittext', undefined)
    edit3.characters = 19
    var edit4 = gr2.add('edittext', undefined)
    edit4.characters = 19
    var addde = www.add('group')
    var adda = addde.add('button', undefined, loc(tsp.add))
    adda.size = [180, 40]
    var stackgroup = addde.add('group')
    stackgroup.orientation = 'stack'
    var addb = stackgroup.add('button', undefined, loc(tsp.edit))
    addb.size = [180, 40]
    addb.visible = true
    var addchange = stackgroup.add('button', undefined, loc(tsp.change))
    addchange.size = [180, 40]
    addchange.visible = false
    var addc = addde.add('button', undefined, loc(tsp.deleteE))
    addc.size = [180, 40]
    var stackgroupa = addde.add('group')
    stackgroupa.orientation = 'stack'
    var addd = stackgroupa.add('button', undefined, loc(tsp.about))
    addd.size = [180, 40]
    addd.visible = true
    var cancel = stackgroupa.add('button', undefined, loc(tsp.cancel))
    cancel.size = [180, 40]
    cancel.visible = false
    var myList = www.add('listbox', undefined, '', {
      numberOfColumns: 5,
      showHeaders: true,
      columnTitles: ['No', 'English', '中文', '日本語', 'Common'],
      columnWidths: [45, 165, 165, 165, 205]
    })
    for (var iii = 0; iii < you.hotWords.length; iii++) {
      var item = myList.add('item', iii + 1)
      for (var jjj = 0; jjj < you.hotWords[iii].length; jjj++) {
        if (you.hotWords[iii][jjj] !== 'None') {
          item.subItems[jjj].text = you.hotWords[iii][jjj]
        } else {
          item.subItems[jjj].text = ''
        }
      }
    }

    adda.onClick = function() {
      you.addNode(edit1.text, edit2.text, edit3.text, edit4.text)
      if (edit1.text !== '' || edit2.text !== '' || edit3.text !== '' || edit4.text !== '') {
        var item = myList.add('item', myList.children.length + 1)
        item.subItems[0].text = edit1.text
        item.subItems[1].text = edit2.text
        item.subItems[2].text = edit3.text
        item.subItems[3].text = edit4.text
      }
      edit1.text = ''
      edit2.text = ''
      edit3.text = ''
      edit4.text = ''
    }

    addb.onClick = function() {
      if (myList.selection instanceof Object) {
        adda.enabled = addc.enabled = false
        cancel.visible = true
        addd.visible = false
        edit1.text = (you.hotWords[myList.selection.index][0] !== 'None') ? you.hotWords[myList.selection.index][0] : ''
        edit2.text = (you.hotWords[myList.selection.index][1] !== 'None') ? you.hotWords[myList.selection.index][1] : ''
        edit3.text = (you.hotWords[myList.selection.index][2] !== 'None') ? you.hotWords[myList.selection.index][2] : ''
        edit4.text = (you.hotWords[myList.selection.index][3] !== 'None') ? you.hotWords[myList.selection.index][3] : ''
        addchange.visible = true
        addb.visible = false
        myList.enabled = false
      }
    }

    cancel.onClick = function() {
      adda.enabled = addc.enabled = true
      addd.visible = addb.visible = true
      cancel.visible = addchange.visible = false
      edit1.text = ''
      edit2.text = ''
      edit3.text = ''
      edit4.text = ''
      myList.enabled = true
    }

    addchange.onClick = function() {
      you.changeNode(myList.selection.index, edit1.text, edit2.text, edit3.text, edit4.text)
      adda.enabled = addc.enabled = true
      cancel.visible = false
      addd.visible = true
      var creatindex = myList.selection.index
      myList.remove(myList.items[creatindex])
      var item = myList.add('item', creatindex + 1, creatindex)
      item.subItems[0].text = edit1.text
      item.subItems[1].text = edit2.text
      item.subItems[2].text = edit3.text
      item.subItems[3].text = edit4.text
      edit1.text = edit2.text = edit3.text = edit4.text = ''
      addb.visible = true
      addchange.visible = false
      myList.enabled = true
    }

    addc.onClick = function() {
      if (myList.selection instanceof Object) {
        var wwww = new Window('palette', 'Alert', undefined)
        wwww.add('statictext', undefined, loc(tsp.sureDelete))
        var g = wwww.add('group')
        var yes = g.add('button', undefined, loc(tsp.ok), {
          name: 'ok'
        })
        yes.size = [60, 30]
        var no = g.add('button', undefined, loc(tsp.cancel), {
          name: 'cancel'
        })
        no.size = [60, 30]
        wwww.show()
        yes.onClick = function() {
          you.deleteNode(myList.selection.index)
          myList.remove(myList.items[myList.selection.index])
          wwww.close()
        }
        no.onClick = function() {
          wwww.close()
        }
      }
    }

    addd.onClick = function() {
      var text = loc(tsp.addHelp)
      var winb = new Window('palette', 'About')
      var a = winb.add('edittext')
      a.text = text
      var groupa = winb.add('group')
      var abtn = groupa.add('button', undefined, loc(tsp.ok))
      var bbtn = groupa.add('button', undefined, loc(tsp.cancel))

      a.onChange = a.onChanging = function() {
        this.text = text
      }

      abtn.onClick = bbtn.onClick = function() {
        winb.close()
      }
      winb.center()
      winb.show()
    }

    www.center()
    www.show()
  }

  checka.onClick = function() {
    if (checka.value === true) {
      checkb.value = false
      checkc.value = false
    }
  }

  checkb.onClick = function() {
    if (checkb.value === true) {
      checka.value = false
      checkc.value = false
    }
  }

  checkc.onClick = function() {
    if (checkc.value === true) {
      checkb.value = false
      checka.value = false
    }
  }

  if (typeof expProps === 'undefined') {
    if (winW instanceof Window) {
      winW.center()
      winW.show()
      // winW.size=[268,100];
    } else {
      winW.layout.layout(true)
    }
  } else {
    try {
      var wrongcomps = wrongcomps || []
      var selProps = expProps
      var i = -1
      for (var ic = 0; ic < selProps.length; ic++) {
        switch (app.language) {
          case Language.ENGLISH:
            you.findReplace(selProps[ic], 0, i)
            break
          case Language.CHINESE:
            you.findReplace(selProps[ic], 1, i)
            break
          case Language.JAPANESE:
            you.findReplace(selProps[ic], 2, i)
            break
          default:
            break
        }
      }
      clearOutput()
      if (wrongcomps.length !== 0) {
        if (loc(tsp.trans) === 'Translate') { writeLn(wrongcomps.length + ' wrong expressions found,which can not be translated.') } else { writeLn('存在' + wrongcomps.length + '个不能被正确翻译的表达式') }
      } else {
        if (loc(tsp.trans) === 'Translate') { writeLn(selProps.length + ' wrong expressions were translated correctly.') } else { writeLn('存在' + selProps.length + '个已经被正确翻译的表达式') }
      }
    } catch (err) { }
  }

  start.onClick = function() {
    var ib
    var allId = []
    var compid = []
    var excludeByName
    if (list.selection.index === 1) {
      var thisCompnames = []
      for (ib = 0; ib < app.project.items.length; ib++) {
        if (app.project.item(ib + 1) === app.project.activeItem && app.project.item(ib + 1) instanceof CompItem) {
          compid.push(ib + 1)
          thisCompnames.push(app.project.item(ib + 1).name)
        }
      }
      excludeByName = compid
    }

    if (list.selection.index === 0) {
      for (ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1)
      }
      excludeByName = allId
    }
    if (list.selection.index === 2) {
      var thisCompname = []
      var tempId = []
      for (ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1)
        for (var haha = 0; haha < app.project.selection.length; haha++) {
          if (app.project.item(ib + 1) === app.project.selection[haha] && app.project.item(ib + 1) instanceof CompItem) {
            tempId.add(ib + 1)
            thisCompname.push(app.project.item(ib + 1).name)
          }
        }
      }
      excludeByName = tempId
    }
    var expFilters = []
    var result = searchExpression(excludeByName, expFilters)
    clearOutput()
    if (checkFile.value === true) {
      var outString = ''
      outString += loc(tsp._1)
      outString += '\r----------------------------------------------------------------\r'
      outString += loc(tsp._2)
      var i
      for (i = 0; i < result[3].length; i++) {
        outString += loc(tsp._3) + result[3][i].toString() + '\r'
        outString += loc(tsp._4) + app.project.item(result[3][i]).name.toString() + '\r'
      }
      outString += loc(tsp._5)
      outString += loc(tsp._6)
      if (result[0].length !== 0) {
        for (i = 0; i < result[0].length; i++) {
          outString += loc(tsp._7) + result[0][i].toString() + '\r'
          outString += loc(tsp._8) + app.project.item(result[0][i]).name.toString() + '\r'
          var thisComp = app.project.item(result[0][i])
          var layerArray = result[1][i].toString()
          layerArray = layerArray.split(',')
          for (var j = 0; j < layerArray.length; j++) {
            var number = parseInt(layerArray[j].toString())
            var thisLayer = thisComp.layer(number)
            outString += loc(tsp._9) + layerArray[j].toString() + '\r'
            outString += loc(tsp._10) + thisLayer.name.toString() + '\r\r'
            var propertyArray = result[2][j].toString()
            propertyArray = propertyArray.split(',')
            for (var x = 0; x < propertyArray.length; x++) { outString += loc(tsp._11) + propertyArray[x].toString() + '\r' }
          }
        }
      }
      outFile.writee(outString)
      if (confirm(loc(tsp.openFile))) {
        outFile = outFile.fsName
        outFile = encodeURI(outFile)
        outFile = String(outFile)
        system.callSystem('explorer  ' + decodeURI(outFile))
      }
      checkFile.value = false
    } else {
      alert(loc(tsp.complete))
    }
  }
}
