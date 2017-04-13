var moduleWindow = require('./moduleWindow')
var moveGroupWindow = require('./moveGroupWindow')
var outputGroupWindow = require('./outputGroupWindow')
var checkVersion = require('../https/checkVersion')

module.exports = function() {
  var _ = $.global.UIParser($.global)

  var UIJson = {
    newWin: {
      type: 'palette',
      text: sp.scriptName + ' v' + sp.scriptVersion,
      margins: 10,
      orientation: 'row',
      children: {
        leftGroup: {
          type: 'group',
          orientation: 'column',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
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
            }
          }
        },
        rightGroup: {
          type: 'group',
          orientation: 'column',
          alignment: ['top', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            group4: {
              type: 'panel',
              text: loc(sp.generalOption),
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
                        checkVersionOnStartup: {
                          type: 'checkbox',
                          text: loc(sp.checkVersionOnStartupText)
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
                        coverChange: {
                          type: 'checkbox',
                          text: loc(sp.coverChange)
                        }
                      }
                    }
                  }
                },
                grRatio: {
                  type: 'group',
                  alignment: ['fill', 'fill'],
                  alignChildren: ['fill', 'fill'],
                  children: {
                    setRatio: {
                      type: 'statictext',
                      text: loc(sp.setRatioText)
                    },
                    ratioText: {
                      type: 'edittext',
                      text: '',
                      characters: 10
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
                      characters: 10
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
                      characters: 10
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
                          characters: 10
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
                      characters: 14
                    }
                  }
                }
              }
            }, // end of group4
            group5: {
              type: 'panel',
              text: loc(sp.otherOption),
              orientation: 'column',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
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
                group6: {
                  type: 'group',
                  orientation: 'row',
                  alignment: ['fill', 'fill'],
                  alignChildren: ['fill', 'fill'],
                  children: {
                    sourceCode: { type: 'Button', text: loc(sp.sourceCode), enabled: 1 },
                    openLink: {
                      type: 'Button',
                      text: loc(sp.link),
                      enabled: 1
                    }
                  }
                },
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
                    addIssue: { type: 'Button', text: loc(sp.addIssue), enabled: 1 }
                  }
                }
              }
            }
          }
        }

      }
    } // end of newWin

  }

  var win = _.newWindow(UIJson)[0]

  _('*').each(function(e) {
    switch (e.id) {
      default:
        if (e.type !== 'checkbox') break
        e.value = sp.getSettingAsBool(e.id)
        var name = e.id + 'Value'
        e.onClick = function() {
          sp[name] = this.value
        }
        break
      case 'addIssue':
        e.onClick = function() {
          if (sp.lang === 'ch') {
            var shouldOpen = confirm(loc(sp.issueDesc))
            if (shouldOpen) {
              sp.openLink(sp.githubIssue)
            } else {
              sp.openLink(sp.issueLink)
            }
          } else {
            alert(loc(sp.issueDesc))
            sp.openLink(sp.githubIssue)
          }
        }
        break
      case 'sourceCode':
        e.onClick = function() {
          sp.openLink(sp.sourceCodeLink)
        }
        break
      case 'ratioText':
        e.text = (1 / sp.gridViewScale).toString()
        e.onChange = function() {
          alert(loc(sp.setRatioHelptip) + '\r\n' + loc(sp.setRatioWarning))
          var value = parseFloat(this.text)
          if (isNaN(value) || value < 1) {
            this.text = (1 / sp.gridViewScale).toString()
            return
          }

          sp.gridViewScale = 1 / value
          sp.saveSetting('gridViewScale', sp.gridViewScale.toString())
          sp.gv.refresh()
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
          moveGroupWindow(_('#wlist')[0].selection, _('#drop')[0].selection, win)
        }
        break
      case 'editModule':
        e.onClick = function() {
          if (!_('#drop')[0]) return alert(loc(sp.selectModuleFirst))
          moduleWindow(_('#drop')[0].selection, win, module.exports)
        }
        break
      case 'drop':
        sp.xmlGroupNames.forEach(function(item, index) {
          this.add('item', item)
        }, e)
        var ratio = 1 / sp.gv.scale - 1
        var addedSeparatorLength = Math.ceil(ratio * sp.xmlGroupNames.length)
        for (var i = 0; i < addedSeparatorLength; i++) {
          e.add('separator')
        }
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
          sp.deleteThisFolder(folder)
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
          outputGroupWindow()
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
        e.onClick = checkVersion(win)
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
