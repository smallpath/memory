var settingsButtonFunc = $.global.settingsButtonFunc = function() {
  var _ = $.global.UIParser(global)

  var UIJson = {
    newWin: {
      type: 'palette',
      text: sp.scriptName + ' v' + sp.scriptVersion,
      margins: 10,
      children: {

        group1: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            helpText: {
              type: 'edittext',
              properties: {
                multiline: true,
                scrolling: false
              },
              preferredSize: [150, 280],
              text: '',
              enabled: 1
            },
            gr: {
              type: 'group',
              orientation: 'column',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              margins: 0,
              spacing: 0,
              children: {
                drop: {
                  type: 'dropdownlist',
                  preferredSize: [150, 20]
                },
                wlist: {
                  type: 'listbox',
                  preferredSize: [150, 260]
                }
              }
            }
          }
        },
        group2: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            deleteFolder: {
              type: 'Button',
              preferredSize: [165, 27],
              text: loc(sp.deleteFolder),
              enabled: 1
            },
            changeGroupName: {
              type: 'Button',
              preferredSize: [165, 27],
              text: loc(sp.changeGroupName),
              enabled: 1
            }
          }
        },
        group3: {
          type: 'group',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            output: {
              type: 'Button',
              text: loc(sp.output),
              enabled: 1
            },
            move: {
              type: 'Button',
              text: loc(sp.move),
              enabled: 1
            }
          }
        },
        group35: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            editModule: {
              type: 'Button',
              preferredSize: [330, 27],
              text: loc(sp.editModule),
              enabled: 1
            }
          }
        },
        group4: {
          type: 'group',
          orientation: 'column',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            g0: {
              type: 'group',
              orientation: 'row',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                gr1: {
                  type: 'group',
                  children: {
                    limitText: {
                      type: 'checkbox',
                      text: loc(sp.limitText)
                    }
                  }
                },
                gr2: {
                  type: 'group',
                  children: {
                    coverChange: {
                      type: 'checkbox',
                      text: loc(sp.coverChange)
                    }
                  }
                }
              }
            },
            gr1: {
              type: 'group',
              orientation: 'row',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                gr1: {
                  type: 'group',
                  children: {
                    thumbType: {
                      type: 'checkbox',
                      text: loc(sp.thumbType)
                    }
                  }
                },
                gr2: {
                  type: 'group',
                  children: {
                    deleteAlert: {
                      type: 'checkbox',
                      text: loc(sp.isAlert)
                    }
                  }
                }
              }
            },
            gr4: {
              type: 'group',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                frameSecond: {
                  type: 'statictext',
                  text: loc(sp.frameSecondText)
                },
                frameSecondText: {
                  type: 'edittext',
                  text: '',
                  characters: 18
                }
              }
            },
            gr5: {
              type: 'group',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                frameNum: {
                  type: 'statictext',
                  text: loc(sp.frameNumText)
                },
                frameNumText: {
                  type: 'edittext',
                  text: '',
                  characters: 18
                }
              }
            },
            gr0: {
              type: 'group',
              orientation: 'row',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                gr2: {
                  type: 'group',
                  alignment: ['fill', 'fill'],
                  alignChildren: ['fill', 'fill'],
                  children: {
                    folderName: {
                      type: 'statictext',
                      text: loc(sp.folderName)
                    },
                    folderNameText: {
                      type: 'edittext',
                      text: '',
                      justify: 'center',
                      characters: 17
                    }
                  }
                }
              }
            },
            gr3: {
              type: 'group',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                effectName: {
                  type: 'statictext',
                  text: loc(sp.effectName)
                },
                effectNameText: {
                  type: 'edittext',
                  text: '',
                  characters: 18
                }
              }
            }

          }
        }, // end of group4
        group5: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            ch: {
              type: 'Button',
              text: '中文',
              enabled: 0
            },
            en: {
              type: 'Button',
              text: 'English',
              enabled: 0
            }
          }
        },
        // group6:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
        //   ui1:{type:'Button',text:loc(sp.ui1),enabled:0},
        //   ui2:{type:'Button',text:loc(sp.ui2),enabled:0}
        // }},
        group7: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            checkVersion: {
              type: 'Button',
              text: loc(sp.checkVersion),
              enabled: 1
            },
            openLink: {
              type: 'Button',
              text: loc(sp.link),
              enabled: 1
            }
          }
        }

      }
    } // end of newWin

  }

  var win = _.newWindow(UIJson)[0]

  _('*').each(function(e) {
    switch (e.id) {
      case 'deleteAlert':
        e.value = sp.getSettingAsBool('deleteAlert')
        e.onClick = function() {
          sp.deleteAlertValue = this.value
          sp.saveSetting('deleteAlert', this.value.toString())
        }
        break
      case 'frameSecondText':
        e.text = sp.frameSecond.toString()
        e.onChange = function() {
          if (isNaN(this.text)) {
            this.text = sp.frameSecond
            return
          }

          var value = parseInt(this.text)
          if (value >= 200) value = 200
          if (value <= 33) value = 33
          sp.frameSecond = value
          sp.saveSetting('frameSecond', value)
          this.text = value.toString()
        }
        break
      case 'frameNumText':
        e.text = sp.frameNum.toString()
        e.onChange = function() {
          if (isNaN(this.text)) {
            this.text = sp.frameNum
            return
          }

          var value = parseInt(this.text)
          if (sp.isCC2015) {
            if (value >= 300) value = 300
          } else {
            if (value >= 50) value = 50
          }
          if (value <= 0) value = 0
          sp.frameNum = value
          sp.saveSetting('frameNum', value)
          this.text = value.toString()
        }
        break
      case 'move':
        e.onClick = function() {
          if (!_('#wlist')[0].selection || !_('#drop')[0]) return alert(loc(sp.selectGroupFirst))
          moveWindow(_('#wlist')[0].selection, _('#drop')[0].selection, win)
        }
        break
      case 'editModule':
        e.onClick = function() {
          if (!_('#drop')[0]) return alert(loc(sp.selectModuleFirst))
          moduleWindow(_('#drop')[0].selection, win)
        }
        break
      case 'drop':
        sp.xmlGroupNames.forEach(function(item, index) {
          this.add('item', item)
        }, e)
        var wlist = _('#wlist')[0]
        e.onChange = function() {
          if (!this.selection) return
          if (!sp.parentDroplist.selection) return
          wlist.removeAll()
          sp.parentDroplist.selection = this.selection.index
          sp.xmlCurrentFileNames.forEach(function(item, index) {
            this.add('item', item)
          }, wlist)
          sp.gv.refresh()
        }
        e.selection = sp.parentDroplist.selection ? sp.parentDroplist.selection.index : 0
        break
      case 'helpText':
        e.text = loc(sp.about)
        e.onChange = e.onChanging = function() {
          this.text = loc(sp.about)
        }
        break
      case 'wlist':
        break
      case 'deleteFolder':
        e.onClick = function() {
          var folder = sp.materialFolder
          deleteThisFolder(folder)
          alert(loc(sp.deleteOk))
        }
        break
      case 'changeGroupName':
        e.onClick = function() {
          var wlist = _('#wlist')[0]
          if (!wlist.selection) return alert(loc(sp.selectGroupFirst))
          var newGroupName = prompt(loc(sp.setName), wlist.selection.text)
          if (!newGroupName) return
          if (sp.xmlFileNames.includes(newGroupName)) {
            alert(loc(sp.existName))
            return
          }

          var file = sp.getFileByName(wlist.selection.text)
          file.rename(newGroupName + '.xml')
          var xml = new XML(sp.settingsFile.readd())
          var index = sp.getGlobalIndexFromFileName(wlist.selection.text)
          xml.ListItems.insertChildAfter(xml.ListItems.child(index),
            new XML('<Name>' + newGroupName.toString() + '</Name>'))
          xml.ListItems.child(index).setLocalName('waitToDelete')
          delete xml.ListItems.waitToDelete
          sp.settingsFile.writee(xml)
          var folder = sp.getImageFolderByName(wlist.selection.text)
          if (folder.exists) { folder.rename(newGroupName) }
          wlist.items[wlist.selection.index].text = newGroupName
          sp.droplist.items[wlist.selection.index].text = newGroupName
          sp.xmlFileNames[index] = newGroupName
          sp.droplist.notify('onChange')
        }
        break
      case 'output':
        e.onClick = function() {
          outputWindow()
        }
        break
      case 'limitText':
        e.value = sp.getSettingAsBool('limitText')
        e.onClick = function() {
          sp.saveSetting('limitText', this.value.toString())
          sp.gv.limitText = sp.getSettingAsBool('limitText')
          sp.gv.refresh()
        }
        break
      case 'coverChange':
        e.value = sp.getSettingAsBool('coverChange')
        e.onClick = function() {
          sp.saveSetting('coverChange', this.value.toString())
          sp.coverChangeValue = this.value
        }
        break
      case 'thumbType':
        e.value = sp.getSettingAsBool('thumbType')
        e.onClick = function() {
          sp.saveSetting('thumbType', this.value.toString())
          sp.thumbTypeValue = this.value
        }
        break
      case 'folderNameText':
        e.text = sp.getSetting('folderName')
        e.onChange = function() {
          sp.saveSetting('folderName', this.text)
        }
        break
      case 'effectNameText':
        e.text = sp.getSetting('effectName')
        e.onChange = function() {
          sp.saveSetting('effectName', this.text)
        }
        break
      case 'ch':
        e.enabled = sp.lang === 'en'
        if (e.enabled === true) { e.enabled = !sp.isForceEnglish() }
        e.onClick = function() {
          sp.saveSetting('language', 'ch')
          alert('请重新打开脚本,语言会将自动变更为中文.')
          _('#en')[0].enabled = true
          _('#ch')[0].enabled = false
        }
        break
      case 'en':
        e.enabled = sp.lang === 'ch'
        e.onClick = function() {
          sp.saveSetting('language', 'en')
          alert('Please restart script,language will be changed into English.')
          _('#en')[0].enabled = false
          _('#ch')[0].enabled = true
        }
        break
      case 'checkVersion':
        if (sp.lang === 'en') { e.size = _('#openLink')[0].size = [211, 27] }
        e.onClick = function() {
          var latest = parseFloat(sp.getVersion('Sp_memory'))
          var nowVersion = sp.version
          if (latest > nowVersion) {
            alert(loc(sp.newVersionFind) + latest.toString())
            if (confirm(loc(sp.isDown))) {
              sp.openLink(sp.downloadLink + ' v' + latest.toString() + '.jsxbin')
            }
          } else {
            alert(loc(sp.newVersionNotFind))
          }
        }
        break
      case 'openLink':
        e.onClick = function() {
          sp.openLink(sp.weiboLink)
        }
        break
    }
  })

  var warpDrop = function(a, b, index1, index2) {
    var tempD = a.text
    a.text = b.text
    b.text = tempD
    var tempXML = sp.xmlCurrentFileNames[index1]
    sp.xmlCurrentFileNames[index1] = sp.xmlCurrentFileNames[index2]
    sp.xmlCurrentFileNames[index2] = tempXML
  }

  var exchange = function(isUp, wXML) {
    var xmlIndex = _('#wlist')[0].selection.index
    var groupIndex = _('#drop')[0].selection.index
    var name = sp.droplist.selection.text

    if (isUp === true) {
      var wupxml = new XML(wXML.ParentGroup.child(groupIndex).child(xmlIndex))
      wXML.ParentGroup.child(groupIndex).insertChildBefore(wXML.ParentGroup.child(groupIndex).child(xmlIndex - 1), wupxml)

      wXML.ParentGroup.child(groupIndex).child(xmlIndex + 1).setLocalName('waitToDelete')

      delete wXML.ParentGroup.child(groupIndex).waitToDelete

      sp.settingsFile.writee(wXML)
      sp.swap(_('#wlist')[0].items[xmlIndex - 1], _('#wlist')[0].items[xmlIndex])
      warpDrop(sp.droplist.items[xmlIndex - 1], sp.droplist.items[xmlIndex], xmlIndex - 1, xmlIndex)
    } else {
      var wdownxml = new XML(wXML.ParentGroup.child(groupIndex).child(xmlIndex))

      wXML.ParentGroup.child(groupIndex).insertChildAfter(wXML.ParentGroup.child(groupIndex).child(xmlIndex + 1), wdownxml)
      wXML.ParentGroup.child(groupIndex).child(xmlIndex).setLocalName('waitToDelete')
      delete wXML.ParentGroup.child(groupIndex).waitToDelete

      sp.settingsFile.writee(wXML)
      sp.swap(_('#wlist')[0].items[xmlIndex + 1], _('#wlist')[0].items[xmlIndex])
      warpDrop(sp.droplist.items[xmlIndex + 1], sp.droplist.items[xmlIndex], xmlIndex + 1, xmlIndex)
    }
    sp.droplist.selection = sp.droplist.find(name)
    sp.droplist.notify('onChange')
    sp.gv.refresh()
  }

  var handleKey = function(key, control) {
    var wXML = new XML(sp.settingsFile.readd())
    switch (key.keyName) {
      case 'Up':
        if (_('#wlist')[0].selection !== null && _('#wlist')[0].selection.index > 0 && _('#drop')[0].selection) {
          exchange(true, wXML)
        };
        break
      case 'Down':
        if (_('#wlist')[0].selection !== null && _('#wlist')[0].selection.index < _('#wlist')[0].items.length - 1 && _('#drop')[0].selection) {
          exchange(false, wXML)
        };
        break
    }
  }

  _('#wlist')[0].addEventListener('keydown', function(k) {
    handleKey(k, this)
  })

  win.center()
  win.show()
}

function moduleWindow(groupItem, win) {
  var moveWin = new Window('dialog', 'Module', undefined, {
    resizeable: 0,
    maximizeButton: 0
  })
  var outRes = `Group{
    orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
    helpTip:StaticText{text:'` + loc(sp.moduleHelpTip) + `'},
    wlist:ListBox{properties:{multiselect:0}},
    oc:Group{
        alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
        ok:Button{text:'` + loc(sp.changeModuleName) + `'},
        cancel:Button{text:'` + loc(sp.quit) + `'}
    }
  }`
  try {
    outRes = moveWin.add(outRes)
  } catch (err) {
    alert(err)
  }
  sp.xmlGroupNames.forEach(function(item, index) {
    this.add('item', item)
  }, outRes.wlist)

  outRes.wlist.addEventListener('keydown', function(k) {
    switch (k.keyName) {
      case 'Up':

        if (this.selection !== null && this.selection.index > 0) {
          var xml = new XML(sp.settingsFile.readd())
          var groupIndex = this.selection.index
          var targetXml = xml.ParentGroup.child(groupIndex)

          xml.ParentGroup.insertChildBefore(xml.ParentGroup.child(groupIndex - 1), new XML(targetXml))
          xml.ParentGroup.child(groupIndex + 1).setLocalName('waitToDelete')
          delete xml.ParentGroup.waitToDelete

          sp.settingsFile.writee(xml)

          sp.reloadParentDroplist()
          var selection = parseInt(sp.getSetting('parentSelection'))
          sp.parentDroplist.selection = (selection <= sp.parentDroplist.items.length - 1 && selection >= 0) ? selection : 0
          selection = parseInt(sp.getSetting('thisSelection'))
          sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0

          sp.swap(outRes.wlist.items[this.selection.index - 1], outRes.wlist.items[this.selection.index])
        };
        break
      case 'Down':
        if (this.selection !== null && this.selection.index < this.items.length - 1) {
          xml = new XML(sp.settingsFile.readd())
          groupIndex = this.selection.index
          targetXml = xml.ParentGroup.child(groupIndex)

          xml.ParentGroup.insertChildAfter(xml.ParentGroup.child(groupIndex + 1), new XML(targetXml))
          xml.ParentGroup.child(groupIndex).setLocalName('waitToDelete')
          delete xml.ParentGroup.waitToDelete

          sp.settingsFile.writee(xml)

          sp.reloadParentDroplist()
          selection = parseInt(sp.getSetting('parentSelection'))
          sp.parentDroplist.selection = (selection <= sp.parentDroplist.items.length - 1 && selection >= 0) ? selection : 0
          selection = parseInt(sp.getSetting('thisSelection'))
          sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0

          sp.swap(outRes.wlist.items[this.selection.index], outRes.wlist.items[this.selection.index + 1])
        };
        break
    }
  })

  outRes.oc.cancel.onClick = function() {
    moveWin.close()
    win.close()
    settingsButtonFunc()
  }

  outRes.oc.ok.onClick = function() {
    var wlist = outRes.wlist
    if (!wlist.selection) return
    var newGroupName = prompt(loc(sp.setName), wlist.selection.text)
    if (!newGroupName) return
    if (sp.xmlGroupNames.includes(newGroupName)) {
      alert(loc(sp.existName))
      return
    }

    var xml = new XML(sp.settingsFile.readd())
    var parentGroup = xml.ParentGroup
    var groupIndex = wlist.selection.index

    var editXml = parentGroup.child(groupIndex)
    editXml['@groupName'] = newGroupName

    sp.settingsFile.writee(xml)

    sp.reloadParentDroplist()
    var selection = parseInt(sp.getSetting('parentSelection'))
    sp.parentDroplist.selection = (selection <= sp.parentDroplist.items.length - 1 && selection >= 0) ? selection : 0
    selection = parseInt(sp.getSetting('thisSelection'))
    sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0

    moveWin.close()
    win.close()
  } // last

  outRes.wlist.size = [200, 300]
  moveWin.show()
}

function moveWindow(xmlItem, groupItem, win) {
  var moveWin = new Window('dialog', 'Move', undefined, {
    resizeable: 0,
    maximizeButton: 0
  })
  var outRes = `Group{
    orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
    wlist:ListBox{properties:{multiselect:0}},
    oc:Group{
        alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
        ok:Button{text:'` + loc(sp.ok) + `'},
        cancel:Button{text:'` + loc(sp.cancel) + `'}
    }
  }`
  try {
    outRes = moveWin.add(outRes)
  } catch (err) {
    alert(err)
  }
  sp.xmlGroupNames.forEach(function(item, index) {
    this.add('item', item)
  }, outRes.wlist)

  outRes.oc.cancel.onClick = function() {
    moveWin.close()
    win.close()
    settingsButtonFunc()
  }

  outRes.oc.ok.onClick = function() {
    if (!outRes.wlist.selection) return
    if (outRes.wlist.selection.text === groupItem.text) return
    var xml = new XML(sp.settingsFile.readd())
    var parentGroup = xml.ParentGroup
    var xmlIndex = xmlItem.index
    var groupIndex = groupItem.index

    var editXml = parentGroup.child(groupIndex).child(xmlIndex)
    var targetXml = parentGroup.child(outRes.wlist.selection.index)
    targetXml.appendChild(new XML(editXml))

    parentGroup.child(groupIndex).child(xmlIndex).setLocalName('waitToDelete')
    delete parentGroup.child(groupIndex).waitToDelete
    sp.settingsFile.writee(xml)

    sp.reloadParentDroplist()
    var selection = parseInt(sp.getSetting('parentSelection'))
    sp.parentDroplist.selection = (selection <= sp.parentDroplist.items.length - 1 && selection >= 0) ? selection : 0
    selection = parseInt(sp.getSetting('thisSelection'))
    sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0

    moveWin.close()
    win.close()
    settingsButtonFunc()
  } // last

  outRes.wlist.size = [200, 300]
  moveWin.show()
}

function outputWindow() {
  var outWin = new Window('window', 'Export', undefined, {
    resizeable: 0,
    maximizeButton: 0
  })
  var outRes = `Group{
    orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
    wlist:ListBox{properties:{multiselect:1}},
    oc:Group{
        alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
        ok:Button{text:'` + loc(sp.ok) + `'},
        cancel:Button{text:'` + loc(sp.cancel) + `'}
    }
  }`
  try {
    outRes = outWin.add(outRes)
  } catch (err) {
    alert(err)
  }
  for (var i = 0; i < sp.xmlFileNames.length; i++) {
    outRes.wlist.add('item', sp.xmlFileNames[i])
  }
  outRes.wlist.size = [200, 400]
  outWin.show()

  outRes.oc.cancel.onClick = function() {
    outWin.close()
  }

  outRes.oc.ok.onClick = function() {
    if (outRes.wlist.selection !== null) {
      var exportFolder = Folder.selectDialog('Please select folder')
      if (exportFolder !== null && exportFolder instanceof Folder) {
        for (var i = 0; i < outRes.wlist.selection.length; i++) {
          var sourceFile = sp.getFileByName(outRes.wlist.selection[i].text)
          var targetFile = File(exportFolder.toString() + sp.slash + outRes.wlist.selection[i].text + '.xml')
          if (targetFile.exists) {
            continue
          }

          var images = sp.getImageFolderByName(outRes.wlist.selection[i].text).getFiles()
          var picXml = new XML('<pic></pic>')
          var seqXml = new XML('<seq></seq>')
          images.forEach(function(item, index) {
            if (item.name.indexOf('.png') !== -1) {
              item.open('r')
              item.encoding = 'binary'
              var str = encodeURIComponent(item.read())
              item.close()
              var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(item.name) + '</imgName>')
              var tempXmlHeres = new XML('<img>' + str + '</img>')
              var guluTempA = new XML('<imgInfo></imgInfo>')
              guluTempA.appendChild(tempXmlBigHere)
              guluTempA.appendChild(tempXmlHeres)
              picXml.appendChild(guluTempA)
            } else if (item instanceof Folder && item.name.indexOf('_seq') !== -1) {
              var thisFolder = item
              var folderXml = new XML("<folder name='" + encodeURIComponent(item.name) + "'></folder>")
              var seqFiles = thisFolder.getFiles()
              seqFiles.forEach(function(imageFile, imageIndex) {
                imageFile.open('r')
                imageFile.encoding = 'binary'
                var str = encodeURIComponent(imageFile.read())
                imageFile.close()
                var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(imageFile.name) + '</imgName>')
                var tempXmlHeres = new XML('<img>' + str + '</img>')
                var guluTempA = new XML('<imgInfo></imgInfo>')
                guluTempA.appendChild(tempXmlBigHere)
                guluTempA.appendChild(tempXmlHeres)
                folderXml.appendChild(guluTempA)
              })
              seqXml.appendChild(folderXml)
            }
          })
          var xml = new XML(sourceFile.readd())
          if (picXml.children().length() > 0) {
            xml.appendChild(picXml)
          }
          if (seqXml.children().length() > 0) {
            xml.appendChild(seqXml)
          }
          if (xml.children().length() === 0) {
            xml = '<tree></tree>'
          }
          targetFile.writee(xml)
        } // for loop
        clearOutput()
        writeLn('Complete!')
      } // not null
    } // last
  }
}

var upAndDown = function(isUp, isW) {
  var file = sp.getFileByName(sp.droplist.selection.text)
  var xml = new XML(file.readd())
  if (isUp === true && sp.gv.lastSelectedItem !== null && sp.gv.lastSelectedItem.index > 0) {
    var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index))
    xml.insertChildBefore(xml.child(sp.gv.lastSelectedItem.index - 1), upxml)
    xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete')
    delete xml.waitToDelete
    file.writee(xml)
    sp.gv.lastSelectedItem.moveUp()
  } else if (isUp === false && sp.gv.lastSelectedItem !== null && sp.gv.lastSelectedItem.index < xml.children().length() - 1) {
    var downxml = new XML(xml.child(sp.gv.lastSelectedItem.index))
    xml.insertChildAfter(xml.child(sp.gv.lastSelectedItem.index + 1), downxml)
    xml.child(sp.gv.lastSelectedItem.index).setLocalName('waitToDelete')
    delete xml.waitToDelete
    file.writee(xml)
    sp.gv.lastSelectedItem.moveDown()
  }
}

$.global.upAndDownWindow = function(cu) {
  var udWin = new Window('palette', loc(sp.ud))
  var udWins = udWin.add('Group{}')
  var a = udWins.add("Button{text:'" + loc(sp.up) + "'}")
  var b = udWins.add("Button{text:'" + loc(sp.down) + "'}")
  var c = udWins.add("Group{et:EditText{text:'0',characters:3,justify:'center'},j:Button{text:'" + loc(sp.jmp) + "'}}")
  udWin.frameLocation = cu
  udWin.show()
  a.onClick = function() {
    upAndDown(true, true)
  }
  b.onClick = function() {
    upAndDown(false, true)
  }
  c.j.onClick = function() {
    var d = parseInt(c.et.text)
    var file = sp.getFileByName(sp.droplist.selection.text)
    var xml = new XML(file.readd())
    if (sp.gv.children.length === 0) return
    if (sp.gv.lastSelectedItem === null) return
    if (d >= 0 && d < sp.gv.children.length - 1 && sp.gv.lastSelectedItem.index !== d) {
      var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index))
      xml.insertChildBefore(xml.child(d), upxml)
      xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete')
      delete xml.waitToDelete
      file.writee(xml)
      sp.gv.lastSelectedItem.moveBefore(sp.gv.children[d])
    } else if (d === sp.gv.children.length - 1 && sp.gv.lastSelectedItem.index !== d) {
      upxml = new XML(xml.child(sp.gv.lastSelectedItem.index))
      xml.insertChildAfter(xml.child(d), upxml)
      xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete')
      delete xml.waitToDelete
      file.writee(xml)
      sp.gv.lastSelectedItem.moveAfter(sp.gv.children[d])
    } else {
      try {
        alert(loc(sp.from) + '~' + (sp.gv.children.length - 1).toString())
      } catch (er) { }
    }
  }
}

$.global.deleteThisFolder = deleteThisFolder
function deleteThisFolder(folder) {
  var waitClFile = folder.getFiles()
  for (var i = 0; i < waitClFile.length; i++) {
    if (waitClFile[i] instanceof Folder) {
      deleteThisFolder(waitClFile[i])
      waitClFile[i].remove()
    } else {
      waitClFile[i].remove()
    }
  }
}

$.global.presetWindow = function() {
  var jinWin = new Window('dialog', loc(sp.settingPre))
  var jinRes = `group{
    orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
    guluG:Group{
      orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
      jinGroup:Group{
        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
        isJin:StaticText{text:'${loc(sp.isEffect)}'}
        isJinSt:StaticText{text:'${loc(sp.jinOne)}',properties:{multiline:1}}
        jin:Panel{
          orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
          _1:Checkbox{text:'${loc(sp._1)}'},
          _2:Checkbox{text:'${loc(sp._2)}'},
          _3:Checkbox{text:'${loc(sp._3)}'},
          _4:Checkbox{text:'${loc(sp._4)}'},
          _5:Checkbox{text:'${loc(sp._5)}'},
          _6:Checkbox{text:'${loc(sp._6)}'},
          _7:Checkbox{text:'${loc(sp._7)}'},
          _8:Checkbox{text:'${loc(sp._8)}'},
          _9:Checkbox{text:'${loc(sp._9)}'},
        }
      },
      delGroup:Group{
        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
        isJin:StaticText{text:'${loc(sp.cleanProperty)}'},
        isJinSt:StaticText{text:'${loc(sp.jinTwo)}',properties:{multiline:1}},
        del:Panel{
          orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
          _1:Checkbox{text:'${loc(sp._1)}'},
          _2:Checkbox{text:'${loc(sp._2)}'},
          _3:Checkbox{text:'${loc(sp._3)}',enabled:0},
          _4:Checkbox{text:'${loc(sp._4)}',enabled:0},
          _5:Checkbox{text:'${loc(sp._5)}'},
          _6:Checkbox{text:'${loc(sp._6)}'},
          _7:Checkbox{text:'${loc(sp._7)}'},
          _8:Checkbox{text:'${loc(sp._8)}',enabled:0},
          _9:Checkbox{text:'${loc(sp._9)}',enabled:0},
        }
      },
    },
    oc:Group{
      orientation:'row',alignment:['fill','center'],alignChildren:['center','fill'],
      ok:Button{text:'Ok',preferredSize:[160,30]},
    }
  }`
  var jinGulu = jinWin.add(jinRes)
  for (let i = 1; i <= 9; i++) {
    if (sp.haveSetting('_1_' + i) === false) {
      if (i === 1 || i === 2 || i === 5) {
        sp.saveSetting('_1_' + i, '1')
      } else {
        sp.saveSetting('_1_' + i, '0')
      }
    }
    try {
      jinGulu.guluG.jinGroup.jin['_' + i].value = sp.getSetting('_1_' + i) === '1'
      jinGulu.guluG.jinGroup.jin['_' + i].onClick = function() {
        sp.getSetting('_1_' + i)
        sp.saveSetting('_1_' + i, (jinGulu.guluG.jinGroup.jin['_' + i].value === true) ? '1' : '0')
      }
    } catch (err) { }
  }
  for (let i = 1; i <= 9; i++) {
    if (sp.haveSetting('_2_' + i) === false) {
      sp.saveSetting('_2_' + i, '0')
    }

    try {
      jinGulu.guluG.delGroup.del['_' + i].value = sp.getSetting('_2_' + i) === '1'
      jinGulu.guluG.delGroup.del['_' + i].onClick = function() {
        sp.getSetting('_2_' + i)
        sp.saveSetting('_2_' + i, (jinGulu.guluG.delGroup.del['_' + i].value === true) ? '1' : '0')
      }
    } catch (err) { }
  }
  jinGulu.oc.ok.onClick = function() {
    jinWin.close()
  }
  jinWin.center()
  jinWin.show()
}
