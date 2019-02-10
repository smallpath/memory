/*!
 *   memory 3.1.0
 * 
 *   a script for adobe after effects to save any layers
 * 
 *   repository: https://github.com/smallpath/memory
 *   issues: https://github.com/smallpath/memory/issues
 */
/****/ (function(memoryGlobal) {
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moduleWindow = __webpack_require__(22);
var moveGroupWindow = __webpack_require__(23);
var outputGroupWindow = __webpack_require__(25);
var checkVersion = __webpack_require__(1);

module.exports = function () {
  var _ = $.global.UIParser($.global);

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
            },
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
    } };

  var win = _.newWindow(UIJson)[0];

  _('*').each(function (e) {
    switch (e.id) {
      default:
        if (e.type !== 'checkbox') break;
        e.value = sp.getSettingAsBool(e.id);
        var name = e.id + 'Value';
        e.onClick = function () {
          sp[name] = this.value;
        };
        break;
      case 'addIssue':
        e.onClick = function () {
          if (sp.lang === 'ch') {
            var shouldOpen = confirm(loc(sp.issueDesc));
            if (shouldOpen) {
              sp.openLink(sp.githubIssue);
            } else {
              sp.openLink(sp.issueLink);
            }
          } else {
            alert(loc(sp.issueDesc));
            sp.openLink(sp.githubIssue);
          }
        };
        break;
      case 'sourceCode':
        e.onClick = function () {
          sp.openLink(sp.sourceCodeLink);
        };
        break;
      case 'ratioText':
        e.text = (1 / sp.gridViewScale).toString();
        e.onChange = function () {
          alert(loc(sp.setRatioHelptip) + '\r\n' + loc(sp.setRatioWarning));
          var value = parseFloat(this.text);
          if (isNaN(value) || value < 1) {
            this.text = (1 / sp.gridViewScale).toString();
            return;
          }

          sp.gridViewScale = 1 / value;
          sp.saveSetting('gridViewScale', sp.gridViewScale.toString());
          sp.gv.refresh();
        };
        break;

      case 'frameSecondText':
        e.text = sp.frameSecond.toString();
        e.onChange = function () {
          if (isNaN(this.text)) {
            this.text = sp.frameSecond;
            return;
          }

          var value = parseInt(this.text);
          if (value >= 200) value = 200;
          if (value <= 33) value = 33;
          sp.frameSecond = value;
          sp.saveSetting('frameSecond', value);
          this.text = value.toString();
        };
        break;
      case 'frameNumText':
        e.text = sp.frameNum.toString();
        e.onChange = function () {
          if (isNaN(this.text)) {
            this.text = sp.frameNum;
            return;
          }

          var value = parseInt(this.text);
          if (sp.isCC2015) {
            if (value >= 300) value = 300;
          } else {
            if (value >= 50) value = 50;
          }
          if (value <= 0) value = 0;
          sp.frameNum = value;
          sp.saveSetting('frameNum', value);
          this.text = value.toString();
        };
        break;
      case 'move':
        e.onClick = function () {
          if (!_('#wlist')[0].selection || !_('#drop')[0]) return alert(loc(sp.selectGroupFirst));
          moveGroupWindow(_('#wlist')[0].selection, _('#drop')[0].selection, win);
        };
        break;
      case 'editModule':
        e.onClick = function () {
          if (!_('#drop')[0]) return alert(loc(sp.selectModuleFirst));
          moduleWindow(_('#drop')[0].selection, win, module.exports);
        };
        break;
      case 'drop':
        sp.xmlGroupNames.forEach(function (item, index) {
          this.add('item', item);
        }, e);
        var ratio = 1 / sp.gv.scale - 1;
        var addedSeparatorLength = Math.ceil(ratio * sp.xmlGroupNames.length);
        for (var i = 0; i < addedSeparatorLength; i++) {
          e.add('separator');
        }
        var wlist = _('#wlist')[0];
        e.onChange = function () {
          if (!this.selection) return;
          if (!sp.parentDroplist.selection) return;
          wlist.removeAll();
          sp.parentDroplist.selection = this.selection.index;
          sp.xmlCurrentFileNames.forEach(function (item, index) {
            this.add('item', item);
          }, wlist);
          sp.gv.refresh();
        };
        e.selection = sp.parentDroplist.selection ? sp.parentDroplist.selection.index : 0;
        break;
      case 'helpText':
        e.text = loc(sp.about);
        e.onChange = e.onChanging = function () {
          this.text = loc(sp.about);
        };
        break;
      case 'wlist':
        break;
      case 'deleteFolder':
        e.onClick = function () {
          var folder = sp.materialFolder;
          sp.deleteThisFolder(folder);
          alert(loc(sp.deleteOk));
        };
        break;
      case 'changeGroupName':
        e.onClick = function () {
          var wlist = _('#wlist')[0];
          if (!wlist.selection) return alert(loc(sp.selectGroupFirst));
          var newGroupName = prompt(loc(sp.setName), wlist.selection.text);
          if (!newGroupName) return;
          if (sp.xmlFileNames.includes(newGroupName)) {
            alert(loc(sp.existName));
            return;
          }

          var file = sp.getFileByName(wlist.selection.text);
          file.rename(newGroupName + '.xml');
          var xml = new XML(sp.settingsFile.readd());
          var index = sp.getGlobalIndexFromFileName(wlist.selection.text);
          xml.ListItems.insertChildAfter(xml.ListItems.child(index), new XML('<Name>' + newGroupName.toString() + '</Name>'));
          xml.ListItems.child(index).setLocalName('waitToDelete');
          delete xml.ListItems.waitToDelete;
          sp.settingsFile.writee(xml);
          var folder = sp.getImageFolderByName(wlist.selection.text);
          if (folder.exists) {
            folder.rename(newGroupName);
          }
          wlist.items[wlist.selection.index].text = newGroupName;
          sp.droplist.items[wlist.selection.index].text = newGroupName;
          sp.xmlFileNames[index] = newGroupName;
          sp.droplist.notify('onChange');
        };
        break;
      case 'output':
        e.onClick = function () {
          outputGroupWindow();
        };
        break;
      case 'limitText':
        e.value = sp.getSettingAsBool('limitText');
        e.onClick = function () {
          sp.saveSetting('limitText', this.value.toString());
          sp.gv.limitText = sp.getSettingAsBool('limitText');
          sp.gv.refresh();
        };
        break;

      case 'folderNameText':
        e.text = sp.getSetting('folderName');
        e.onChange = function () {
          sp.saveSetting('folderName', this.text);
        };
        break;
      case 'effectNameText':
        e.text = sp.getSetting('effectName');
        e.onChange = function () {
          sp.saveSetting('effectName', this.text);
        };
        break;
      case 'ch':
        e.enabled = sp.lang === 'en';
        if (e.enabled === true) {
          e.enabled = !sp.isForceEnglish();
        }
        e.onClick = function () {
          sp.saveSetting('language', 'ch');
          alert('请重新打开脚本,语言会将自动变更为中文.');
          _('#en')[0].enabled = true;
          _('#ch')[0].enabled = false;
        };
        break;
      case 'en':
        e.enabled = sp.lang === 'ch';
        e.onClick = function () {
          sp.saveSetting('language', 'en');
          alert('Please restart script,language will be changed into English.');
          _('#en')[0].enabled = false;
          _('#ch')[0].enabled = true;
        };
        break;
      case 'checkVersion':
        if (sp.lang === 'en') {
          e.size = _('#openLink')[0].size = [211, 27];
        }
        e.onClick = checkVersion(win);
        break;
      case 'openLink':
        e.onClick = function () {
          sp.openLink(sp.weiboLink);
        };
        break;
    }
  });

  var warpDrop = function warpDrop(a, b, index1, index2) {
    var tempD = a.text;
    a.text = b.text;
    b.text = tempD;
    var tempXML = sp.xmlCurrentFileNames[index1];
    sp.xmlCurrentFileNames[index1] = sp.xmlCurrentFileNames[index2];
    sp.xmlCurrentFileNames[index2] = tempXML;
  };

  var exchange = function exchange(isUp, wXML) {
    var xmlIndex = _('#wlist')[0].selection.index;
    var groupIndex = _('#drop')[0].selection.index;
    var name = sp.droplist.selection.text;

    if (isUp === true) {
      var wupxml = new XML(wXML.ParentGroup.child(groupIndex).child(xmlIndex));
      wXML.ParentGroup.child(groupIndex).insertChildBefore(wXML.ParentGroup.child(groupIndex).child(xmlIndex - 1), wupxml);

      wXML.ParentGroup.child(groupIndex).child(xmlIndex + 1).setLocalName('waitToDelete');

      delete wXML.ParentGroup.child(groupIndex).waitToDelete;

      sp.settingsFile.writee(wXML);
      sp.swap(_('#wlist')[0].items[xmlIndex - 1], _('#wlist')[0].items[xmlIndex]);
      warpDrop(sp.droplist.items[xmlIndex - 1], sp.droplist.items[xmlIndex], xmlIndex - 1, xmlIndex);
    } else {
      var wdownxml = new XML(wXML.ParentGroup.child(groupIndex).child(xmlIndex));

      wXML.ParentGroup.child(groupIndex).insertChildAfter(wXML.ParentGroup.child(groupIndex).child(xmlIndex + 1), wdownxml);
      wXML.ParentGroup.child(groupIndex).child(xmlIndex).setLocalName('waitToDelete');
      delete wXML.ParentGroup.child(groupIndex).waitToDelete;

      sp.settingsFile.writee(wXML);
      sp.swap(_('#wlist')[0].items[xmlIndex + 1], _('#wlist')[0].items[xmlIndex]);
      warpDrop(sp.droplist.items[xmlIndex + 1], sp.droplist.items[xmlIndex], xmlIndex + 1, xmlIndex);
    }
    sp.droplist.selection = sp.droplist.find(name);
    sp.droplist.notify('onChange');
    sp.gv.refresh();
  };

  var handleKey = function handleKey(key, control) {
    var wXML = new XML(sp.settingsFile.readd());
    switch (key.keyName) {
      case 'Up':
        if (_('#wlist')[0].selection !== null && _('#wlist')[0].selection.index > 0 && _('#drop')[0].selection) {
          exchange(true, wXML);
        };
        break;
      case 'Down':
        if (_('#wlist')[0].selection !== null && _('#wlist')[0].selection.index < _('#wlist')[0].items.length - 1 && _('#drop')[0].selection) {
          exchange(false, wXML);
        };
        break;
    }
  };

  _('#wlist')[0].addEventListener('keydown', function (k) {
    handleKey(k, this);
  });

  win.center();
  win.show();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (win, isStarting) {
  clearOutput && clearOutput();
  var targetAlert = isStarting ? writeLn : alert;
  return function () {
    var latestVersion = sp.getVersion();
    var nowVersion = sp.version;
    var compare = sp.compareSemver(latestVersion, nowVersion);
    if (compare > 0) {
      targetAlert(loc(sp.newVersionFind) + latestVersion.toString());
      var scriptLink = sp.downloadLinkPrefix + latestVersion + sp.downloadLinkSuffix;
      if (confirm(loc(sp.shouldUpdateScript))) {
        try {
          var scriptString = sp.request('GET', scriptLink, '');
          var file = new File($.fileName);
          file.writee(scriptString);
          targetAlert(loc(sp.downloaded));
          win.close();
          sp.win.close();
        } catch (err) {
          err.printa();
        }
      } else if (confirm(loc(sp.shouldDownloadScript))) {
        try {
          sp.openLink(scriptLink);
        } catch (err) {
          err.printa();
        }
      }
    } else if (compare === 0) {
      targetAlert(loc(sp.newVersionNotFind) + nowVersion.toString());
    } else if (compare < 0) {
      targetAlert(loc(sp.tryVersionFind) + nowVersion.toString());
    }
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = $.global;

var width = 300;
var height = 80;
var progressHeight = 20;

var progressFactory = {
  createWindow: function createWindow(len, title, prefixString, suffixString) {
    global.progressWin = new Window('palette', title);

    var group = global.progressWin.add('Group{\n      orientation:\'column\',alignment: [\'fill\',\'fill\'],\n      preferredSize: [-1, ' + height + '],\n      progressBar: Progressbar{\n        value:0, minvalue:0, maxvalue:' + len + ',\n        preferredSize: [' + width + ', ' + progressHeight + ']\n      },\n      progressText: StaticText {\n        alignment:[\'fill\',\'fill\'],text:"", justify:\'center\',properties:{multiline:0}\n      },\n      progressTimeText: StaticText {\n        alignment:[\'fill\',\'fill\'],text:"", justify:\'center\',properties:{multiline:0}\n      }\n    }');
    global.progressWin.addEventListener('keydown', function () {
      global.progressWin.close();
    });
    global.progressTimeText = group.progressTimeText;
    global.progressText = group.progressText;
    global.progressBar = group.progressBar;
    var divide = '0' + '/' + global.progressBar.maxvalue;
    global.progressText.text = prefixString + divide + suffixString;
    global.progressTimeText;
    global.progressWin.show();
    global.progressWin.center();
    var preY = global.progressText.location[1] + 10;
    global.progressText.originY = preY;
    global.progressText.location[1] = preY + (global.progressText.location[1] >> 1);
    global.progressWin.startTime = Date.now();
    global.progressWin.update && global.progressWin.update();
  },
  update: function update(len, prefixString, suffixString, timePrefix, timeSuffix) {
    global.progressBar.value = global.progressBar.value + len;
    var divide = global.progressBar.value + '/' + global.progressBar.maxvalue;
    var time = (Date.now() - global.progressWin.startTime) / 1000;
    global.progressText.text = prefixString + divide + suffixString;
    global.progressTimeText.text = timePrefix + time.toString() + timeSuffix;
    var preY = global.progressText.location[1];
    var shouldRelocation = global.progressTimeText.text.length === 0;
    if (shouldRelocation) {
      global.progressText.location[1] = preY + (global.progressText.location[1] >> 1);
    } else {
      global.progressText.location[1] = global.progressText.originY;
    }
    global.progressWin.update && global.progressWin.update();
  },
  complete: function complete(timePrefix, timeSuffix) {
    var time = (Date.now() - global.progressWin.startTime) / 1000;
    var report = timePrefix + time.toString() + timeSuffix;
    writeLn(report);
    return time;
  }
};

var title = loc(sp.previewTitle);
var previewPrefix = loc(sp.previewPrefix);
var timePrefix = loc(sp.previewTime);
var timeSuffix = loc(sp.second);
sp.willSavePreviews = function (len) {
  progressFactory.createWindow(len, title, previewPrefix, timeSuffix);
};
sp.didSavePreview = function () {
  progressFactory.update(1, previewPrefix, '', timePrefix, timeSuffix);
};
sp.didSavePreviews = function () {
  progressFactory.complete(timePrefix, timeSuffix);
};

module.exports = progressFactory;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var encode = encodeURIComponent;
  var decode = decodeURIComponent;

  $.layer = function (item, options) {
    return new $.layer.prototype.Init(item, options);
  };

  $.layer.prototype = {
    Init: function Init(item, options, helperObj) {
      this.item = item;

      this.helperObj = helperObj || {};

      $.layer.parseFolderItem(item, options);

      if ($.layer.isType(options, 'Object')) {
        this.isSaveMaterial = options.isSaveMaterial || false;
      } else {
        this.isSaveMaterial = false;
      }

      return this;
    }
  };

  $.layer.extend = function (target, source) {
    for (var i in source) {
      target[i] = source[i];
    }return target;
  };

  $.layer.parseFolderItem = function (item, options) {
    if ($.layer.isType(options, 'Object') && item instanceof XML) {
      if (!$.layer.isType(options.compFolder, 'FolderItem')) {
        $.layer.compFolder = null;
      } else {
        $.layer.compFolder = options.compFolder;
      }
      if (!$.layer.isType(options.sourceFolder, 'FolderItem')) {
        if ($.layer.compFolder !== null) {
          $.layer.sourceFolder = $.layer.compFolder;
        } else {
          $.layer.sourceFolder = null;
        }
      } else {
        $.layer.sourceFolder = options.sourceFolder;
      }
    }
  };

  var imagePattern = new RegExp('(ai|bmp|bw|cin|cr2|crw|dcr|dng|dib|dpx|eps|erf|exr|gif|hdr|icb|iff|jpe|jpeg|jpg|mos|mrw|nef|orf|pbm|pef|pct|pcx|pdf|pic|pict|png|ps|psd|pxr|raf|raw|rgb|rgbe|rla|rle|rpf|sgi|srf|tdi|tga|tif|tiff|vda|vst|x3f|xyze)', 'i');
  $.layer.extend($.layer.prototype, {

    getLayerAttr: function getLayerAttr(index) {
      var thisLayer = this.item;
      var helperObj = this.helperObj;

      var text = '<Layer name="' + encode(thisLayer.name) + '"></Layer>';
      var layerInfo = new XML(text);

      layerInfo.type = 'null';
      switch (true) {
        case thisLayer instanceof TextLayer:
          layerInfo.type = 'Text';
          break;
        case thisLayer instanceof LightLayer:
          layerInfo.type = 'Light';
          layerInfo.light = thisLayer.lightType;
          break;
        case thisLayer instanceof ShapeLayer:
          layerInfo.type = 'Shape';
          break;
        case thisLayer instanceof AVLayer:
          var mainSource = thisLayer.source.mainSource;
          var isNullLayer = thisLayer.nullLayer === true;
          var isComp = thisLayer.source instanceof CompItem;
          if (mainSource instanceof SolidSource && !isNullLayer && !isComp) {
            layerInfo.type = 'Solid';
            layerInfo.solidColor = mainSource.color;
          } else if (mainSource instanceof FileSource && !isNullLayer && !isComp) {
            layerInfo.sound = thisLayer.hasAudio;

            if (thisLayer.hasAudio) {
              layerInfo.type = 'VideoWithSound';
            } else {
              var suffix = mainSource.file.toString() || '';
              var matched = suffix.split('.').pop();
              if (mainSource.isStill === true) {
                layerInfo.type = 'VideoWithoutSound';
              } else if (matched) {
                layerInfo.type = 'VideoWithoutSound';
                layerInfo.sequence = 'true';
              } else {
                layerInfo.type = 'VideoWithoutSound';
              }
            }
          } else if (isComp) {
            layerInfo.type = 'Comp';
          } else if (isNullLayer) {
            layerInfo.type = 'Null';
          }
          break;
        case thisLayer instanceof CameraLayer:
          layerInfo.type = 'Camera';
          break;
      }

      layerInfo.name = thisLayer.name;
      layerInfo['@type'] = layerInfo.type;

      var type = layerInfo.type.toString();

      if (type === 'VideoWithSound' || type === 'VideoWithoutSound') {
        layerInfo = this.getMaterial(layerInfo, helperObj, thisLayer);
      }
      if (type === 'Comp') {
        layerInfo = this.getCompLayerAttr(layerInfo, thisLayer, helperObj, thisLayer);
      }
      if (type === 'Text') {
        var isPointText = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).pointText;
        var isBoxText = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).boxText;
        layerInfo.textType = isPointText === true ? 'point' : 'box';
        if (isBoxText === true) {
          layerInfo.boxSize = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).boxTextSize.toString();
        }
      }

      layerInfo.searchName = thisLayer.name;
      layerInfo.label = thisLayer.label;
      layerInfo.width = thisLayer.source ? thisLayer.width : 'None';
      layerInfo.height = thisLayer.source ? thisLayer.height : 'None';
      layerInfo.index = index;

      layerInfo.parent = thisLayer.parent === null ? 'false' : thisLayer.parent.index;
      layerInfo.inPoint = thisLayer.inPoint;
      layerInfo.outPoint = thisLayer.outPoint;
      layerInfo.enabled = thisLayer.enabled;
      layerInfo.three = typeof thisLayer.threeDLayer === 'undefined' ? 'undefined' : thisLayer.threeDLayer;
      layerInfo.trackMatteType = typeof thisLayer.trackMatteType === 'undefined' ? 'undefined' : thisLayer.trackMatteType;
      layerInfo.solo = thisLayer.solo;
      layerInfo.shy = thisLayer.shy;
      layerInfo.collapseTransformation = thisLayer.collapseTransformation;
      if (type === 'VideoWithSound' || type === 'Comp') {
        layerInfo.audioEnabled = thisLayer.audioEnabled;
      }
      layerInfo.motionBlur = thisLayer.motionBlur;
      layerInfo.guideLayer = typeof thisLayer.guideLayer === 'undefined' ? 'undefined' : thisLayer.guideLayer;
      layerInfo.environmentLayer = typeof thisLayer.environmentLayer === 'undefined' ? 'undefined' : thisLayer.environmentLayer;
      layerInfo.adjustmentLayer = typeof thisLayer.adjustmentLayer === 'undefined' ? 'undefined' : thisLayer.adjustmentLayer;
      layerInfo.blendingMode = typeof thisLayer.trackMatteType === 'undefined' ? 'undefined' : thisLayer.blendingMode;
      layerInfo.autoOrient = typeof thisLayer.autoOrient === 'undefined' ? 'undefined' : thisLayer.autoOrient;
      layerInfo.preserveTransparency = typeof thisLayer.preserveTransparency === 'undefined' ? 'undefined' : thisLayer.preserveTransparency;
      try {
        layerInfo.separated = thisLayer('ADBE Transform Group')('ADBE Position').dimensionsSeparated;
      } catch (err) {}
      layerInfo.timeRemap = thisLayer.timeRemapEnabled;
      layerInfo.stretch = thisLayer.stretch;
      layerInfo.startTime = thisLayer.startTime;
      layerInfo.ray = thisLayer.containingComp.renderer === 'ADBE Picasso';
      layerInfo.geoType = 'null';
      var isNotNullLayer = type !== 'null' && type !== 'Null';
      if (isNotNullLayer && layerInfo.three.toString() === true && layerInfo.ray.toString() === true) {
        if (type === 'Shape' || type === 'Text') {
          layerInfo.geoType = 'small';
        } else {
          layerInfo.geoType = 'large';
        }
      }
      return layerInfo;
    },

    getCompLayerAttr: function getCompLayerAttr(layerInfo, thisLayer) {
      var source = thisLayer.source;
      layerInfo.frameDuration = source.frameDuration;
      layerInfo.dropFrame = source.dropFrame;
      layerInfo.workAreaStart = source.workAreaStart;
      layerInfo.workAreaDuration = source.workAreaDuration;
      layerInfo.hideShyLayers = source.hideShyLayers;
      layerInfo.motionBlur = source.motionBlur;
      layerInfo.draft3d = source.draft3d;
      layerInfo.frameBlending = source.frameBlending;
      layerInfo.preserveNestedFrameRate = source.preserveNestedFrameRate;
      layerInfo.preserveNestedResolution = source.preserveNestedResolution;
      layerInfo.bgColor = source.bgColor;
      layerInfo.resolutionFactor = source.resolutionFactor;
      layerInfo.shutterAngle = source.shutterAngle;
      layerInfo.shutterPhase = source.shutterPhase;
      layerInfo.motionBlurSamplesPerFrame = source.motionBlurSamplesPerFrame;
      layerInfo.motionBlurAdaptiveSampleLimit = source.motionBlurAdaptiveSampleLimit;
      layerInfo.renderer = source.renderer;
      layerInfo.compframeDuration = source.frameDuration;
      layerInfo.comppixelAspect = source.pixelAspect;
      layerInfo.compframeRate = source.frameRate;
      layerInfo.compduration = source.duration;
      layerInfo.compwidth = source.width;
      layerInfo.compheight = source.height;
      layerInfo.compname = encode(source.name);
      layerInfo.comptime = source.time;
      return layerInfo;
    },

    getMaterial: function getMaterial(layerInfo, helperObj, thisLayer, isSequence) {
      var file = layerInfo.file = thisLayer.source.mainSource.file;
      if (this.isSaveMaterial === false) return layerInfo;

      var hasProperty = helperObj.hasOwnProperty('_' + thisLayer.source.id);
      if (!hasProperty) {
        try {
          helperObj['_' + thisLayer.source.id] = {};
          try {
            var thisFile = new File(file);
            thisFile.open('r');
            thisFile.encoding = 'BINARY';
            var fileContent = thisFile.read();
            thisFile.close();
            layerInfo.fileBin = encode(fileContent);
            if (layerInfo.sequence.toString() === 'true') {
              var fileArr = $.layer.testForSequence(thisFile);
              if (fileArr.length !== 0) {
                var outter = new XML('<fileBinSeq></fileBinSeq>');

                $.layer.forEach.call(fileArr, function (sequenceFile, index) {
                  try {
                    var tempXmlBigHere = new XML('<imgName>' + encode(sequenceFile.name) + '</imgName>');

                    var temp = new XML('<imgInfo></imgInfo>');
                    temp.appendChild(tempXmlBigHere);

                    outter.appendChild(temp);
                  } catch (err) {}
                });
                layerInfo.fileBinSeq = outter;
              }
            }
          } catch (err) {}
        } catch (err) {}
      }

      return layerInfo;
    },

    getProperties: function getProperties(ref, layerxml, layerInfo) {
      if (!ref) return layerxml;

      for (var i = 1; i <= ref.numProperties; i++) {
        var prop = ref.property(i);
        if (prop.propertyType === PropertyType.PROPERTY) {
          var canGetValue;
          try {
            canGetValue = prop.value.toString();
            canGetValue = true;
          } catch (err) {
            canGetValue = false;
          }
          var isNotHiddenProp = true;
          try {
            if (prop.matchName !== 'ADBE Marker') {
              prop.setValue(prop.valueAtTime(0, true));
            }
          } catch (r) {
            isNotHiddenProp = false;
          }
          var thisBool = isNotHiddenProp || prop.canSetExpression || prop.matchName === 'ADBE Marker';
          if (thisBool && canGetValue) {
            if (prop.matchName === 'ADBE Marker' && prop.numKeys === 0) {} else {
              try {
                if (prop.matchName === 'ADBE Glo2-0007') {
                  prop.setValue($.layer.glowtype);
                }
              } catch (err) {}
              try {
                $.layer.prototype.addToLastChild(layerxml, new XML($.layer.prototype.getProperty(prop)), prop.propertyDepth, []);
              } catch (err) {}
            }
          }
        } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
          var layerStyle = prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false;
          var layerChild = prop.propertyGroup(1).matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false && prop.propertyIndex > 1;
          var material = prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false;
          var audio = prop.matchName === 'ADBE Audio Group';
          var geosmall = prop.matchName === 'ADBE Extrsn Options Group' && layerInfo.geoType !== 'small';
          var geolarge = prop.matchName === 'ADBE Plane Options Group' && layerInfo.geoType !== 'large';
          var vector = prop.matchName === 'ADBE Vector Materials Group';
          var motion = prop.matchName === 'ADBE MTrackers' && prop.numProperties === 0;
          if (layerStyle || material || audio || geosmall || geolarge || vector || motion || layerChild) {} else {
            var propName = prop.name.toString();
            var matchName = prop.matchName.toString();

            if (prop.matchName === 'ADBE Mask Atom') {
              var obj;
              var temp;
              var text;
              try {
                text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '" maskFeatherFalloff="' + prop.maskFeatherFalloff.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                try {
                  temp = new XML(text);
                  if (temp) {}
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                  obj = {
                    propName: propName,
                    matchName: matchName
                  };
                  $.layer.encode(obj);
                  text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '" maskFeatherFalloff="' + prop.maskFeatherFalloff.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
                text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '"  enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                try {
                  temp = new XML(text);
                  if (temp) {}
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                  obj = {
                    propName: propName,
                    matchName: matchName
                  };
                  $.layer.encode(obj);
                  text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '"  enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                }
              }
            } else {
              text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
              try {
                temp = new XML(text);
                if (temp) {}
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
                obj = {
                  propName: propName,
                  matchName: matchName
                };
                $.layer.encode(obj);
                text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
              }
            }
            try {
              if (prop.matchName === 'ADBE Glo2') {
                try {
                  $.layer.glowtype = prop.property('ADBE Glo2-0007').value;
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }

              try {
                var currentXml = new XML(text);
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }

              $.layer.prototype.addToLastChild(layerxml, currentXml, prop.propertyDepth, []);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            arguments.callee(prop, layerxml, layerInfo);
          }
        }
      }

      return layerxml;
    },

    addToLastChild: function addToLastChild(xml, str, propertyDepth, arrLen) {
      var length = xml.children().length();
      arrLen.push(length);
      if (length > 0) {
        arguments.callee(xml.child(length - 1), str, propertyDepth, arrLen);
      } else {
        for (var LastCh = 0; LastCh < arrLen.length - propertyDepth; LastCh++) {
          xml = xml.parent();
        }
        xml.appendChild(new XML(str));
        arrLen.length = 0;
      }
    },

    getProperty: function getProperty(thisProperty) {
      var text;
      if (thisProperty.numKeys !== 0) {
        var keyTime = [];
        var keyValue = [];
        var propi;
        var propxml;
        if (thisProperty.valueAtTime(0, true) instanceof Shape === false && thisProperty.matchName !== 'ADBE Marker' && thisProperty.matchName !== 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            keyTime.push(thisProperty.keyTime(propi));
            keyValue.push(thisProperty.keyValue(propi));
          }
          propxml.keyValue = keyValue;
          propxml.keyTime = keyTime;
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
        } else if (thisProperty.valueAtTime(0, true) instanceof Shape === true) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          propxml.keyValue = 0;
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'));
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<shapeValue></shapeValue>';
            var shapexml = new XML(text);
            keyTime.push(thisProperty.keyTime(propi));
            var closed = XML('<closed>' + thisProperty.keyValue(propi).closed + '</closed>');
            var vertices = XML('<vertices>' + thisProperty.keyValue(propi).vertices.toString() + '</vertices>');
            var inTan = XML('<inTan>' + thisProperty.keyValue(propi).inTangents.toString() + '</inTan>');
            var outTan = XML('<outTan>' + thisProperty.keyValue(propi).outTangents.toString() + '</outTan>');
            shapexml.appendChild(closed);
            shapexml.appendChild(vertices);
            shapexml.appendChild(inTan);
            shapexml.appendChild(outTan);
            propxml.keyValue.appendChild(shapexml);
          }
          delete propxml.keyValue.zhanwei;
          propxml.keyTime = keyTime;
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
        } else if (thisProperty.matchName === 'ADBE Marker') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          propxml.keyValue = 0;
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'));
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<markerValue></markerValue>';
            var markxml = new XML(text);
            keyTime.push(thisProperty.keyTime(propi));
            var comment = XML('<comment>' + thisProperty.keyValue(propi).comment + '</comment>');
            var duration = XML('<duration>' + thisProperty.keyValue(propi).duration.toString() + '</duration>');
            var chapter = XML('<chapter>' + thisProperty.keyValue(propi).chapter.toString() + '</chapter>');
            var cuePointName = XML('<cuePointName>' + thisProperty.keyValue(propi).cuePointName.toString() + '</cuePointName>');
            var eventCuePoint = XML('<eventCuePoint>' + thisProperty.keyValue(propi).eventCuePoint.toString() + '</eventCuePoint>');
            var url = XML('<url>' + thisProperty.keyValue(propi).url.toString() + '</url>');
            var frameTarget = XML('<frameTarget>' + thisProperty.keyValue(propi).frameTarget.toString() + '</frameTarget>');
            markxml.appendChild(comment);
            markxml.appendChild(duration);
            markxml.appendChild(chapter);
            markxml.appendChild(cuePointName);
            markxml.appendChild(eventCuePoint);
            markxml.appendChild(url);
            markxml.appendChild(frameTarget);
            propxml.keyValue.appendChild(markxml);
          }
          delete propxml.keyValue.zhanwei;
          propxml.keyTime = keyTime;
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
        } else if (thisProperty.matchName === 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          propxml.keyValue = 0;
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'));
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<textValue></textValue>';
            var textxml = new XML(text);
            keyTime.push(thisProperty.keyTime(propi));
            text = XML('<text>' + thisProperty.keyValue(propi).text + '</text>');
            var font = XML('<font>' + thisProperty.keyValue(propi).font.toString() + '</font>');
            var fontSize = XML('<fontSize>' + thisProperty.keyValue(propi).fontSize.toString() + '</fontSize>');
            var applyFill = XML('<applyFill>' + thisProperty.keyValue(propi).applyFill.toString() + '</applyFill>');
            var applyStroke = XML('<applyStroke>' + thisProperty.keyValue(propi).applyStroke.toString() + '</applyStroke>');
            var fillColor = XML('<fillColor>' + (thisProperty.keyValue(propi).applyFill === true ? thisProperty.keyValue(propi).fillColor.toString() : 'None').toString() + '</fillColor>');
            var strokeColor = XML('<strokeColor>' + (thisProperty.keyValue(propi).applyStroke === true ? thisProperty.keyValue(propi).strokeColor.toString() : 'None').toString() + '</strokeColor>');
            var strokeOverFill = XML('<strokeOverFill>' + thisProperty.keyValue(propi).strokeOverFill.toString() + '</strokeOverFill>');
            var strokeWidth = XML('<strokeWidth>' + thisProperty.keyValue(propi).strokeWidth.toString() + '</strokeWidth>');
            var justification = XML('<justification>' + thisProperty.keyValue(propi).justification.toString() + '</justification>');
            var tracking = XML('<tracking>' + thisProperty.keyValue(propi).tracking.toString() + '</tracking>');
            var pointText = XML('<pointText>' + thisProperty.keyValue(propi).pointText.toString() + '</pointText>');
            var boxText = XML('<boxText>' + thisProperty.keyValue(propi).boxText.toString() + '</boxText>');
            var boxTextSize;
            if (thisProperty.keyValue(propi).boxText === true) {
              boxTextSize = XML('<boxTextSize>' + thisProperty.keyValue(propi).boxTextSize.toString() + '</boxTextSize>');
            } else {
              boxTextSize = XML('<boxTextSize>None</boxTextSize>');
            }
            textxml.appendChild(text);
            textxml.appendChild(font);
            textxml.appendChild(fontSize);
            textxml.appendChild(applyFill);
            textxml.appendChild(applyStroke);
            textxml.appendChild(fillColor);
            textxml.appendChild(strokeColor);
            textxml.appendChild(strokeOverFill);
            textxml.appendChild(strokeWidth);
            textxml.appendChild(justification);
            textxml.appendChild(tracking);
            textxml.appendChild(pointText);
            textxml.appendChild(boxText);
            textxml.appendChild(boxTextSize);
            propxml.keyValue.appendChild(textxml);
          }
          delete propxml.keyValue.zhanwei;
          propxml.keyTime = keyTime;
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
        }
        if (thisProperty.matchName !== 'ADBE Marker' && thisProperty.matchName !== 'ADBE Text Document') {
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            var ease = '<Ease></Ease>';
            var easexml = new XML(ease);
            try {
              if (thisProperty.propertyValueType === PropertyValueType.ThreeD_SPATIAL || thisProperty.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
                easexml.keyInSpatialTangent = thisProperty.keyInSpatialTangent(propi);
                easexml.keyOutSpatialTangent = thisProperty.keyOutSpatialTangent(propi);
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            if (thisProperty.keyInTemporalEase(1).length === 1) {
              easexml.InSpeed = thisProperty.keyInTemporalEase(propi)[0].speed;
              easexml.InIn = thisProperty.keyInTemporalEase(propi)[0].influence;
              easexml.OutSpeed = thisProperty.keyOutTemporalEase(propi)[0].speed;
              easexml.OutIn = thisProperty.keyOutTemporalEase(propi)[0].influence;
            } else if (thisProperty.keyInTemporalEase(1).length === 2) {
              easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed];
              easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence];
              easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed];
              easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence];
            } else if (thisProperty.keyInTemporalEase(1).length === 3) {
              easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed, thisProperty.keyInTemporalEase(propi)[2].speed];
              easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence, thisProperty.keyInTemporalEase(propi)[2].influence];
              easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed, thisProperty.keyOutTemporalEase(propi)[2].speed];
              easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence, thisProperty.keyOutTemporalEase(propi)[2].influence];
            }
            try {
              easexml.inInterType = thisProperty.keyInInterpolationType(propi);
              easexml.outInterType = thisProperty.keyOutInterpolationType(propi);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              if (thisProperty.propertyValueType === PropertyValueType.ThreeD_SPATIAL || thisProperty.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
                easexml.isRoving = thisProperty.keyRoving(propi);
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            propxml.appendChild(easexml);
          }
        }
        if (thisProperty.expression !== '') {
          propxml.exp = encode(thisProperty.expression).toString();
          propxml.expEn = encode(thisProperty.expressionEnabled).toString();
        }
      } else {
        if (thisProperty.valueAtTime(0, true) instanceof Shape === false && thisProperty.matchName !== 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="0">' + thisProperty.valueAtTime(0, true).toString() + '</prop>';
          propxml = new XML(text);
          if (thisProperty.expression !== '') {
            propxml.exp = encode(thisProperty.expression).toString();
            propxml.expEn = encode(thisProperty.expressionEnabled).toString();
          }
        } else if (thisProperty.valueAtTime(0, true) instanceof Shape === true) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          shapexml = new XML(text);
          shapexml.closed = thisProperty.valueAtTime(0, true).closed;
          shapexml.vertices = thisProperty.valueAtTime(0, true).vertices.toString();
          shapexml.inTan = thisProperty.valueAtTime(0, true).inTangents.toString();
          shapexml.outTan = thisProperty.valueAtTime(0, true).outTangents.toString();
          if (thisProperty.expression !== '') {
            shapexml.exp = encode(thisProperty.expression).toString();
            shapexml.expEn = encode(thisProperty.expressionEnabled).toString();
          }
          propxml = shapexml;
        } else if (thisProperty.matchName === 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          textxml = new XML(text);
          textxml.text = (thisProperty.valueAtTime(0, true).text === undefined ? 'None' : thisProperty.valueAtTime(0, true).text).toString();
          textxml.font = thisProperty.valueAtTime(0, true).font.toString();
          textxml.fontSize = thisProperty.valueAtTime(0, true).fontSize.toString();
          textxml.applyFill = thisProperty.valueAtTime(0, true).applyFill.toString();
          textxml.applyStroke = thisProperty.valueAtTime(0, true).applyStroke.toString();
          textxml.fillColor = (thisProperty.valueAtTime(0, true).applyFill === true ? thisProperty.valueAtTime(0, true).fillColor.toString() : 'None').toString();
          textxml.strokeColor = (thisProperty.valueAtTime(0, true).applyStroke === true ? thisProperty.valueAtTime(0, true).strokeColor.toString() : 'None').toString();
          textxml.strokeOverFill = thisProperty.valueAtTime(0, true).strokeOverFill.toString();
          textxml.strokeWidth = thisProperty.valueAtTime(0, true).strokeWidth.toString();
          textxml.justification = thisProperty.valueAtTime(0, true).justification.toString();
          textxml.tracking = thisProperty.valueAtTime(0, true).tracking.toString();
          textxml.pointText = thisProperty.valueAtTime(0, true).pointText.toString();
          textxml.boxText = thisProperty.valueAtTime(0, true).boxText.toString();
          textxml.boxTextSize = (thisProperty.valueAtTime(0, true).boxText === true ? thisProperty.valueAtTime(0, true).boxTextSize.toString() : 'None').toString();
          if (thisProperty.expression !== '') {
            textxml.exp = encode(thisProperty.expression).toString();
            textxml.expEn = encode(thisProperty.expressionEnabled).toString();
          }
          propxml = textxml;
        }
      }
      return propxml;
    },

    getXmlFromLayer: function getXmlFromLayer(index) {
      var thisLayer = this.item;

      var layerInfo = this.getLayerAttr(index);

      var layerPropertiesXml = this.getProperties(thisLayer, new XML('<Properties></Properties>'), layerInfo);

      layerInfo.appendChild(layerPropertiesXml);

      return layerInfo;
    },

    toXML: function toXML(elementName, helperObj) {
      var layers = this.item;
      var comp;
      var isFirstStage = layers instanceof Array;
      if (isFirstStage) {
        comp = layers[0].containingComp;
      } else {
        if (layers && layers.length === 0) return new XML('<Comptent name="' + (elementName || 'Default') + '"></Comptent>');
        comp = layers[1].containingComp;
      }

      elementName = elementName || 'Default';
      helperObj = helperObj || {};
      helperObj['_' + comp.id] = helperObj['_' + comp.id] || {};
      helperObj['elementArr'] = helperObj['elementArr'] || [];

      var elementArr = helperObj.elementArr;
      var elementxml;
      if (isFirstStage) {
        $.layer.willSaveLayers(layers);
        elementxml = new XML('<Element name="' + elementName + '"></Element>');
      } else {
        elementxml = new XML('<Comptent name="' + elementName + '"></Comptent>');
      }

      var options = {
        isSaveMaterial: this.isSaveMaterial
      };

      var loopFunc = function loopFunc(thisLayer, index) {
        var thisIndex = elementArr.length === 0 ? index + 1 : index;
        var xml = $.layer(thisLayer, options).getXmlFromLayer(thisIndex);
        $.layer.didSaveLayer(1);
        var tempLength;
        if (thisLayer.source instanceof CompItem) {
          if (helperObj.hasOwnProperty('_' + thisLayer.source.id)) {
            var elementxmltemp = helperObj['_' + thisLayer.source.id]['ele'];
            tempLength = elementxmltemp.descendants('Layer').length();
            $.layer.didSaveLayer(tempLength);
            xml.Properties.appendChild(elementxmltemp);
          } else {
            elementArr.push(elementxml);
            var comptentXml = $.layer(thisLayer.source.layers, options, helperObj).toXML(encode(thisLayer.source.name), helperObj);
            tempLength = comptentXml.descendants('Layer').length();
            $.layer.didSaveLayer(tempLength);
            xml.Properties.appendChild(comptentXml);
            elementxml = elementArr.pop();
          }
        }
        elementxml.appendChild(xml);
      };
      if (isFirstStage) {
        $.layer.forEach.call(layers, loopFunc);
        $.layer.writeErrorFile();
        $.layer.didSaveLayers();
      } else {
        $.layer.forEachLayer.call(layers, loopFunc);
      }

      if (!isFirstStage) {
        var cTemp = new XML(elementxml);
        for (var i = 0; i < cTemp.children().length(); i++) {
          cTemp.child(i).setChildren(1);
        }
        helperObj['_' + comp.id]['ele'] = cTemp;
      }

      return elementxml;
    }

  });

  $.layer.extend($.layer.prototype, {

    newLayer: function newLayer(xml, thisComp) {
      var layer;

      var type = xml['@type'].toString();
      var name = xml['@name'].toString();
      if (type === 'Solid' || type === 'VideoWithSound' || type === 'VideoWithoutSound' || type === 'Comp') {
        var solidcolor = xml.solidColor.toString().split(',').slice(0, 3);
        if (xml.solidColor.toString() !== '') {
          layer = thisComp.layers.addSolid(solidcolor, decode(name), parseInt(xml.width), parseInt(xml.height), 1);
        } else if (type === 'Comp') {
          layer = this.newComp(xml, thisComp);
        } else if (type === 'VideoWithSound' || type === 'VideoWithoutSound') {
          layer = this.newMaterial(xml, thisComp);
        }
      } else if (type === 'Text') {
        layer = xml.textType.toString() === 'point' ? thisComp.layers.addText() : thisComp.layers.addBoxText(xml.boxSize.toString().split(',').slice(0, 2));
      } else if (type === 'Shape') {
        layer = thisComp.layers.addShape();
      } else if (type === 'null' || type === 'Null') {
        layer = thisComp.layers.addNull();
      } else if (type === 'Light') {
        layer = thisComp.layers.addLight(decode(name), [0, 0]);
        layer.lightType = $.layer.getDistance(layer.lightType, parseInt(xml.light));
      } else if (type === 'Camera') {
        layer = thisComp.layers.addCamera(decode(name), [0, 0]);
      }
      try {
        layer.name = decode(name);

        if (layer.index !== parseInt(xml.index)) {
          layer.moveAfter(thisComp.layer(parseInt(xml.index)));
        }

        layer.label = parseInt(xml.label.toString());

        if (xml.geoType.toString() === 'small' || xml.geoType.toString() === 'large') {
          layer.containingComp.renderer = 'ADBE Picasso';
        }

        if (xml.inPoint.toString() !== 'undefined') {
          layer.inPoint = parseFloat(xml.inPoint);
        }

        if (xml.outPoint.toString() !== 'undefined') {
          layer.outPoint = parseFloat(xml.outPoint);
        }

        if (xml.solo.toString() === 'true') {
          layer.solo = true;
        }

        if (xml.enabled.toString() === 'false') {
          layer.enabled = false;
        }

        if (xml.three.toString() === 'true') {
          layer.threeDLayer = true;
        }

        if (xml.timeRemap.toString() === 'true') {
          layer.timeRemapEnabled = true;
        }

        if (xml.collapseTransformation.toString() === 'true' && layer.canSetCollapseTransformation === true) {
          layer.collapseTransformation = true;
        }

        if (xml.audioEnabled.toString() === 'false') {
          layer.audioEnabled = false;
        }

        if (xml.trackMatteType.toString() !== 'undefined') {
          layer.trackMatteType = $.layer.getDistance(layer.trackMatteType, parseInt(xml.trackMatteType));
        }

        if (xml.shy.toString() === 'true') {
          layer.shy = true;
        }

        if (xml.motionBlur.toString() === 'true') {
          layer.motionBlur = true;
        }

        if (xml.guideLayer.toString() === 'true') {
          layer.guideLayer = true;
        }

        if (xml.environmentLayer.toString() === 'true') {
          layer.environmentLayer = true;
        }

        if (xml.adjustmentLayer.toString() === 'true') {
          layer.adjustmentLayer = true;
        }

        if (xml.blendingMode.toString() !== 'undefined') {
          layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode));
        }

        if (xml.autoOrient.toString() !== 'undefined') {
          layer.autoOrient = $.layer.getDistance(layer.autoOrient, parseInt(xml.autoOrient));
        }

        if (xml.preserveTransparency.toString() === 'true') {
          layer.preserveTransparency = true;
        }

        if (xml.separated.toString() === 'true') {
          layer.property('ADBE Transform Group')('ADBE Position').dimensionsSeparated = true;
        }
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err });
      }

      try {
        $.layer.prototype.newPropertyGroup(xml.Properties, layer);
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err });
      }


      return layer;
    },

    newComp: function newComp(xml, thisComp) {
      var layer;
      var thisItem;

      if (xml['@type'].toString() === 'Comp') {
        var isComp = false;

        if (xml['@type'].toString() === 'Comp') {
          for (var i = 0; i < app.project.numItems; i++) {
            var item = app.project.item(i + 1);

            var isCompItem = item instanceof CompItem;
            var isNameEqual = item.name === decode(xml.compname.toString());
            var compXml = xml.Properties.Comptent;
            var numLayersInXml = compXml.children().length();
            var isNumberEqual = item.numLayers === numLayersInXml;

            if (isCompItem && isNameEqual && isNumberEqual) {
              thisItem = item;
              isComp = true;
              for (var j = 0; j < item.numLayers; j++) {
                if (item.layer(j + 1).name !== decode(compXml.child(j)['@name'])) {
                  isComp = false;
                }
              }
              if (isComp === true) {
                break;
              }
            }
          }
        }

        if (isComp === true) {
          layer = thisComp.layers.add(thisItem);
          layer.countForImport = xml.descendants('Layer').length() + 1;
        } else {
          try {
            var comp = app.project.items.addComp(decode(xml.compname.toString()), parseInt(xml.compwidth), parseInt(xml.compheight), parseFloat(xml.comppixelAspect), parseFloat(xml.compduration), parseFloat(xml.compframeRate));

            if (comp.id !== app.project.activeItem.id) {
              comp.parentFolder = $.layer.compFolder;
            }

            comp.frameDuration = parseFloat(xml.frameDuration);

            if (xml.dropFrame.toString() === 'true') {
              comp.dropFrame = true;
            }

            comp.workAreaStart = parseFloat(xml.workAreaStart);

            try {
              comp.workAreaDuration = parseFloat(xml.workAreaDuration);
            } catch (err) {}

            if (xml.hideShyLayers.toString() === 'true') {
              comp.hideShyLayers = true;
            }

            if (xml.motionBlur.toString() === 'true') {
              comp.motionBlur = true;
            }

            if (xml.draft3d.toString() === 'true') {
              comp.draft3d = true;
            }

            if (xml.preserveNestedFrameRate.toString() === 'true') {
              comp.preserveNestedFrameRate = true;
            }

            if (xml.preserveNestedResolution.toString() === 'true') {
              comp.preserveNestedResolution = true;
            }

            var bgArr = xml.bgColor.toString().split(',');
            comp.bgColor = [parseFloat(bgArr[0]), parseFloat(bgArr[1]), parseFloat(bgArr[2])];

            var resolutionArr = xml.resolutionFactor.toString().split(',');
            comp.resolutionFactor = [parseInt(resolutionArr[0]), parseInt(resolutionArr[1])];

            comp.shutterAngle = parseFloat(xml.shutterAngle);

            comp.shutterPhase = parseFloat(xml.shutterPhase);

            comp.motionBlurSamplesPerFrame = parseInt(xml.motionBlurSamplesPerFrame);

            comp.motionBlurAdaptiveSampleLimit = parseInt(xml.motionBlurAdaptiveSampleLimit);

            if (xml.renderer.toString() !== 'ADBE Advanced 3d') {
              comp.renderer = xml.renderer.toString();
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          try {
            layer = thisComp.layers.add(comp);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }

        try {
          layer.strectch = parseFloat(xml.stretch);

          if (xml.startTime.toString() !== 'undefined') {
            layer.startTime = parseFloat(xml.startTime);
          }
        } catch (err) {
          $.layer.errorInfoArr.push({ line: $.line, error: err });
        }

        if (isComp === false) {
          try {
            $.layer.prototype.toLayer(comp, xml.Properties.Comptent);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }
      }
      return layer;
    },

    newMaterial: function newMaterial(xml, thisComp) {
      var isExist = false;
      var waitImportedItem;
      var thisItem;
      var layer;
      if (xml['@type'].toString() === 'VideoWithSound' || xml['@type'].toString() === 'VideoWithoutSound') {
        for (var i = 0; i < app.project.numItems; i++) {
          var item = app.project.item(i + 1);
          var type = _typeof(item.file);
          if (type !== 'undefiend' && item.file !== null) {
            var footageFile = new File(item.file);
            var xmlFile = new File(xml.file.toString());
            var tempFile = new File($.layer.tempFolder.toString() + decode(xmlFile.toString()));
            if (footageFile.toString() === xmlFile.toString() || footageFile.toString() === tempFile.toString()) {
              isExist = true;
              thisItem = item;
              break;
            }
          }
        }
      }

      var isVideo = xml['@type'].toString() === 'VideoWithSound' || xml['@type'].toString() === 'VideoWithoutSound';
      if (isVideo && isExist) {
        layer = thisComp.layers.add(thisItem);
        layer.strectch = parseFloat(xml.stretch);

        if (typeof xml.startTime !== 'undefined') {
          layer.startTime = parseFloat(xml.startTime);
        }
        return layer;
      }

      if (isVideo && !isExist) {
        try {
          try {
            var genFileFolder = new Folder($.layer.tempFolder);
            !genFileFolder.exists && genFileFolder.create();

            var file = new File(xml.file.toString());
            var fileInTempFolder = new File($.layer.tempFolder.toString() + $.layer.slash + decode(file.toString()));
            var generatedFile;
            if (decode(file.toString())[0] === '~') {
              generatedFile = new File(genFileFolder.toString() + $.layer.slash + 'D' + decode(file.toString()));
            } else {
              generatedFile = new File(genFileFolder.toString() + $.layer.slash + decode(file.toString()));
            }
            if (file.exists) {
              waitImportedItem = file;
            } else if (fileInTempFolder.exists) {
              waitImportedItem = generatedFile;
            } else if (xml.fileBin.toString().length !== 0) {
              try {
                if (!generatedFile.parent.exists) {
                  generatedFile.parent.create();
                }

                var waitToWrite = decode(xml.fileBin.toString());
                var notExists = !generatedFile.exists;
                var genFileLengthNotEqual = generatedFile.exists && generatedFile.length !== waitToWrite.length;
                if (notExists || genFileLengthNotEqual) {
                  if (!generatedFile.parent.exists) {
                    generatedFile.create();

                    generatedFile = new File($.layer.tempFolder.toString() + $.layer.slash + decode(file.name.toString()));
                  }

                  generatedFile.open('w');
                  generatedFile.encoding = 'BINARY';
                  generatedFile.write(waitToWrite);
                  generatedFile.close();
                }
                waitImportedItem = generatedFile;
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          try {
            var im = new ImportOptions();
            im.file = waitImportedItem;
            try {
              im.sequence = false;
              im.forceAlphabetical = false;
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
            layer = thisComp.layers.addSolid([0, 0, 0], 'fail due to cc2015', 100, 100, 1);
            return layer;
          }
          if (im.canImportAs(ImportAsType.FOOTAGE)) {
            im.importAs = ImportAsType.FOOTAGE;
            var footage = app.project.importFile(im);
            layer = thisComp.layers.add(footage);
            layer.name = decode(xml['@name']);
            try {
              layer.moveAfter(thisComp.layer(parseInt(xml.index)));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            };
            try {
              layer.strectch = parseFloat(xml.stretch);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              if (typeof xml.startTime !== 'undefined') {
                layer.startTime = parseFloat(xml.startTime);
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            layer.source.parentFolder = $.layer.sourceFolder;
          } else {
            layer = thisComp.layers.addSolid([0, 0, 0], 'fail due to canImportAs equals to false', 100, 100, 1);
          }
        } catch (err) {
          $.layer.errorInfoArr.push({ line: $.line, error: err });
        }
      }
      if (layer instanceof AVLayer) {
        try {
          if (xml.sequence.toString() === 'true') {
            layer.source.replaceWithSequence(new File(xml.file.toString()), false);
          }
        } catch (err) {
          $.writeln(err.toString());
        }
        return layer;
      } else {
        layer = thisComp.layers.addSolid([0, 0, 0], 'fail due to not instanceof AVLayer', 100, 100, 1);
        return layer;
      }
    },

    newPropertyGroup: function newPropertyGroup(xml, layers, inTime) {
      for (var addi = 0; addi < xml.children().length(); addi++) {
        var currentXML = xml.child(addi);
        var matchName = currentXML['@matchName'].toString();
        var propName = currentXML['@name'].toString();
        var propIndex = parseInt(currentXML['@propertyIndex']);
        var tagName = currentXML.name().toString();

        if (currentXML['@isEncoded'].toString() !== '') {
          var obj = {
            matchName: matchName,
            propName: propName
          };
          $.layer.decode(obj);
          matchName = obj.matchName;
          propName = obj.propName;
        }
        var prop;

        if (tagName === 'Group') {
          prop = 0;

          try {
            if (layers.canAddProperty(matchName)) {
              try {
                prop = layers.addProperty(matchName);

                var indexProp = prop;

                if (indexProp.matchName === 'ADBE Mask Atom') {
                  indexProp.maskMode = $.layer.getDistance(indexProp.maskMode, parseInt(currentXML['@maskmode']));
                  indexProp.inverted = currentXML['@inverted'].toString() !== 'false';
                  indexProp.rotoBezier = currentXML['@rotoBezier'].toString() !== 'false';
                  indexProp.color = currentXML['@color'].toString().split(',').slice(0, 3);
                  indexProp.maskMotionBlur = $.layer.getDistance(indexProp.maskMotionBlur, parseInt(currentXML['@maskMotionBlur']));
                  indexProp.maskFeatherFalloff = $.layer.getDistance(indexProp.maskFeatherFalloff, parseInt(currentXML['@maskFeatherFalloff']));
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } else if (matchName === 'ADBE Layer Styles') {
              try {
                var group = currentXML.children();
                var layerStyleArr = [];
                var commandNameArr = [];
                var i;
                for (i = 0; i < group.length(); i++) {
                  layerStyleArr.push(currentXML.child(i)['@matchName'].toString());
                  commandNameArr.push(currentXML.child(i)['@name'].toString());
                }

                for (i = 0; i < layerStyleArr.length; i++) {
                  if (layerStyleArr[i].indexOf('/') !== -1) {
                    if (layers.propertyDepth === 0 && layers.containingComp.id === app.project.activeItem.id) {
                      app.executeCommand(app.findMenuCommandId(commandNameArr[i]));
                    } else if (layers.propertyGroup(layers.propertyDepth).containingComp.id === app.project.activeItem.id) {
                      app.executeCommand(app.findMenuCommandId(commandNameArr[i]));
                    }
                  }
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          var target;
          try {
            target = layers.property(propIndex);
          } catch (err) {
            target = prop;
          }

          try {
            var enabled = currentXML['@enabled'].toString();
            if (enabled !== 'None') {
              if (target.canSetEnabled === true) {
                if (enabled === 'false') {
                  target.enabled = false;
                }
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          var isIndexedGroup = layers.propertyType === PropertyType.INDEXED_GROUP;
          try {
            if (isIndexedGroup) {
              target.name = propName;
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          try {
            if (currentXML.children().length() > 0) {
              var isNotMask = matchName !== 'ADBE Mask Parade';
              var isNotEffect = matchName !== 'ADBE Effect Parade';
              var isNotLayerStyles = matchName !== 'ADBE Layer Styles';
              if (prop === 0 && isNotMask && isNotEffect && isNotLayerStyles) {
                $.layer.prototype.newPropertyGroup(currentXML, target, inTime);
              } else {
                if (isNotMask && isNotEffect && isNotLayerStyles) {
                  $.layer.prototype.newPropertyGroup(currentXML, target, inTime);
                } else {
                  $.layer.prototype.newPropertyGroup(currentXML, target, inTime);
                }
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else if (tagName === 'prop') {
          try {
            $.layer.prototype.newProperty(currentXML, layers, inTime);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
            try {
              $.layer.errorInfoArr.push({
                line: $.line,
                error: {
                  line: err.line,
                  toString: function toString() {
                    return '[NOTICE] Above error may be ok because of source xml is saved with previous version of AELayer with matchName' + currentXML['@matchName'].toString();
                  }
                }
              });
            } catch (err) {}
          }

          if (currentXML.exp.toString() !== '') {
            try {
              var expArr = [];

              var expProperty = layers.property(matchName);

              expArr.push(expProperty.propertyIndex);
              var len = expProperty.propertyDepth;
              for (i = 1; i < len; i++) {
                expArr.push(expProperty.propertyGroup(i).propertyIndex);
              }
              expArr.push(expProperty.propertyGroup(i));

              $.layer.expPropertyArr.push(expArr);

              expProperty.expression = decode(currentXML.exp.toString());
            } catch (err) {};
          }
        }
      }
    },

    newProperty: function newProperty(xml, layers, inTime) {
      var matchName = xml['@matchName'].toString();
      var isNotText = layers.property(matchName).matchName !== 'ADBE Text Document';
      var isNotMarker = layers.property(matchName).matchName !== 'ADBE Marker';
      var isNotMaskShape = layers.property(matchName).matchName !== 'ADBE Mask Shape';
      var isNotVectorShape = layers.property(matchName).matchName !== 'ADBE Vector Shape';
      var isNotTextAnimatorProp = layers.matchName !== 'ADBE Text Animator Properties';
      var isNotDash = layers.matchName !== 'ADBE Vector Stroke Dashes';
      if (isNotText && isNotMarker && isNotMaskShape && isNotVectorShape) {
        if (!isNotTextAnimatorProp || !isNotDash) {
          if (layers.canAddProperty(matchName)) {
            layers.addProperty(matchName);
          }
        }
        if (xml['@key'].toString() === '0') {
          var value = [];
          if (xml.child(0).toString().split(',').length > 1) {
            for (var ia = 0; ia < xml.child(0).toString().split(',').length; ia++) {
              value.push(xml.child(0).toString().split(',')[ia]);
            }
          } else {
            value = parseFloat(xml.child(0).toString());
          }
          try {
            layers.property(matchName).setValue(value);
          } catch (err) {
            if (err.toString().indexOf('hidden') === -1) {
              try {
                var type = layers.property(matchName).propertyValueType.toString();
                if (type.indexOf('17') === -1 && type.indexOf('21') === -1 && type.indexOf('22') === -1) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } catch (err) {}
            }
          }
          try {
            var a = layers.property(matchName).propertyValueType.toString();
            if (a.indexOf('17') !== -1 || a.indexOf('21') !== -1 || a.indexOf('22') !== -1) {
              $.layer.layerTypePropertyArr.push(layers.property(matchName));
              $.layer.layerTypePropertyValueArr.push(value);
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else {
          var values = [];
          var valueTemp = [];
          var times = [];
          var div = xml.keyTime.toString().split(',');
          var vas = xml.keyValue.toString().split(',');
          var ib;
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ia = 0; ia < div.length; ia++) {
            for (ib = 0; ib < vas.length / div.length; ib++) {
              valueTemp.push(xml.keyValue.toString().split(',')[ia * vas.length / div.length + ib]);
            }
            values.push(valueTemp);
            valueTemp = [];
          }
          try {
            layers.property(matchName).setValuesAtTimes(times, values);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          var outIn = [];
          var len = xml.keyTime.toString().split(',').length;
          for (ia = 0; ia < len; ia++) {
            var myScaleProperty = layers.property(matchName);

            try {
              type = $.layer.getDistance(myScaleProperty.propertyValueType, parseInt(xml.inType.split(',')[0]));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }

            var thisChild = xml.child(ia + 4);
            var clamp = parseFloat(thisChild.InIn);
            clamp = $.layer.clampInfluence(clamp);
            var easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp);

            var clampb = parseFloat(thisChild.OutIn);
            clampb = $.layer.clampInfluence(clampb);
            var easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb);

            try {
              var inSpatialArr = thisChild.keyInSpatialTangent.toString().split(',');
              var outSpatialArr = thisChild.keyOutSpatialTangent.toString().split(',');
              if (type === PropertyValueType.TwoD_SPATIAL) {
                myScaleProperty.setSpatialTangentsAtKey(ia + 1, inSpatialArr, outSpatialArr);
              } else if (type === PropertyValueType.ThreeD_SPATIAL) {
                if (inSpatialArr.length === 3 && outSpatialArr.length === 3) {
                  myScaleProperty.setSpatialTangentsAtKey(ia + 1, inSpatialArr, outSpatialArr);
                }
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
              $.layer.errorInfoArr.push({
                line: $.line,
                error: {
                  line: err.line,
                  toString: function toString() {
                    return '[NOTICE] Above error may be ok because of source xml is saved with previous version of AELayer';
                  }
                }
              });
            }
            try {
              if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.TwoD && $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.ThreeD) {
                clamp = parseFloat(thisChild.InIn);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp);

                clampb = parseFloat(thisChild.OutIn);
                clampb = $.layer.clampInfluence(clampb);

                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb);
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.TwoD) {
                clamp = parseFloat(thisChild.InIn.toString().split(',')[0]);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[0]), clamp);

                clampb = parseFloat(thisChild.OutIn.toString().split(',')[0]);
                clampb = $.layer.clampInfluence(clampb);
                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[0]), clampb);

                var clamp1 = parseFloat(thisChild.InIn.toString().split(',')[1]);
                clamp1 = $.layer.clampInfluence(clamp1);
                var easeIn1 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[1]), clamp1);

                var clampb1 = parseFloat(thisChild.OutIn.toString().split(',')[1]);
                clampb1 = $.layer.clampInfluence(clampb1);
                var easeOut1 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[1]), clampb1);

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1], [easeOut, easeOut1]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.ThreeD) {
                clamp = parseFloat(thisChild.InIn.toString().split(',')[0]);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[0]), clamp);

                clampb = parseFloat(thisChild.OutIn.toString().split(',')[0]);
                clampb = $.layer.clampInfluence(clampb);
                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[0]), clampb);

                clamp1 = parseFloat(thisChild.InIn.toString().split(',')[1]);
                clamp1 = $.layer.clampInfluence(clamp1);
                easeIn1 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[1]), clamp1);

                clampb1 = parseFloat(thisChild.OutIn.toString().split(',')[1]);
                clampb1 = $.layer.clampInfluence(clampb1);
                easeOut1 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[1]), clampb1);

                var clamp2 = parseFloat(thisChild.InIn.toString().split(',')[2]);
                clamp2 = $.layer.clampInfluence(clamp2);
                var easeIn2 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[2]), clamp2);

                var clampb2 = parseFloat(thisChild.OutIn.toString().split(',')[2]);
                clampb2 = $.layer.clampInfluence(clampb2);
                var easeOut2 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[2]), clampb2);

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1, easeIn2], [easeOut, easeOut1, easeOut2]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
              try {
                var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(thisChild.inInterType));
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(thisChild.outInterType));
                if (!isNaN(inIn) && !isNaN(outIn)) {
                  myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              try {
                if (thisChild.isRoving.toString() === 'true') {
                  myScaleProperty.setRovingAtKey(ia + 1, true);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      } else if (layers.property(matchName).matchName === 'ADBE Text Document') {
        if (xml['@key'].toString() === '0') {
          try {
            value = [];
            var myText = layers.property(matchName).value;
            myText.text = xml.text.toString();
            myText.font = xml.font.toString();
            myText.fontSize = parseInt(xml.fontSize);
            myText.applyFill = xml.applyFill.toString() === 'true';
            myText.applyStroke = xml.applyStroke.toString() === 'true';
            if (xml.applyFill.toString() === 'true') {
              myText.fillColor = [xml.fillColor.toString().split(',')[0], xml.fillColor.toString().split(',')[1], xml.fillColor.toString().split(',')[2]];
            }
            if (xml.applyStroke.toString() === 'true') {
              myText.strokeColor = [xml.strokeColor.toString().split(',')[0], xml.strokeColor.toString().split(',')[1], xml.strokeColor.toString().split(',')[2]];
              myText.strokeOverFill = xml.strokeOverFill.toString();
              myText.strokeWidth = xml.strokeWidth.toString();
            }
            try {
              myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.justification));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            var nextText = myText;
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          try {
            layers.property(matchName).setValue(myText);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          try {
            layers.property(matchName).setValue(nextText);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else {
          values = [];
          valueTemp = [];
          times = [];
          div = xml.keyTime.toString().split(',');
          vas = xml.keyValue.toString().split(',');
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ib = 0; ib < div.length; ib++) {
            myText = null;
            myText = layers.property(matchName).valueAtTime(times[ib], true);
            myText.text = xml.keyValue.child(ib).text.toString();
            myText.font = xml.keyValue.child(ib).font.toString();
            myText.fontSize = parseInt(xml.keyValue.child(ib).fontSize);
            myText.applyFill = xml.keyValue.child(ib).applyFill.toString() === 'true';
            myText.applyStroke = xml.keyValue.child(ib).applyStroke.toString() === 'true';
            if (xml.keyValue.child(ib).applyFill.toString() === 'true') {
              myText.fillColor = [xml.keyValue.child(ib).fillColor.toString().split(',')[0], xml.keyValue.child(ib).fillColor.toString().split(',')[1], xml.keyValue.child(ib).fillColor.toString().split(',')[2]];
            }
            if (xml.keyValue.child(ib).applyStroke.toString() === 'true') {
              myText.strokeColor = [xml.keyValue.child(ib).strokeColor.toString().split(',')[0], xml.keyValue.child(ib).strokeColor.toString().split(',')[1], xml.keyValue.child(ib).strokeColor.toString().split(',')[2]];
              myText.strokeOverFill = xml.keyValue.child(ib).strokeOverFill.toString();
              myText.strokeWidth = xml.keyValue.child(ib).strokeWidth.toString();
            }
            try {
              myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.keyValue.child(ib).justification));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            nextText = myText;
            try {
              layers.property(matchName).setValueAtTime(times[ib], myText);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              layers.property(matchName).setValueAtTime(times[ib], nextText);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      } else if (!isNotMarker) {
        if (xml['@key'].toString() === '0') {} else {
          values = [];
          valueTemp = [];
          times = [];
          div = xml.keyTime.toString().split(',');
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ib = 0; ib < div.length; ib++) {
            var myMarker = new MarkerValue('zhanwei');
            myMarker.comment = xml.keyValue.child(ib).comment.toString();
            myMarker.duration = xml.keyValue.child(ib).duration.toString();
            myMarker.chapter = xml.keyValue.child(ib).chapter.toString();
            myMarker.cuePointName = xml.keyValue.child(ib).cuePointName.toString();
            myMarker.eventCuePoint = xml.keyValue.child(ib).eventCuePoint.toString();
            myMarker.url = xml.keyValue.child(ib).url.toString();
            myMarker.frameTarget = xml.keyValue.child(ib).frameTarget.toString();
            try {
              layers.property(matchName).setValueAtTime(times[ib], myMarker);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      } else if (!isNotMaskShape || !isNotVectorShape) {
        if (xml['@key'].toString() === '0') {
          var myShape = new Shape();
          var vertsArr = [];
          var inTanArr = [];
          var outTanArr = [];
          var verts = xml.vertices.toString().split(',');
          var inTan = xml.inTan.toString().split(',');
          var outTan = xml.outTan.toString().split(',');
          for (var ic = 0; ic < verts.length / 2; ic++) {
            vertsArr.push([verts[ic * 2], verts[ic * 2 + 1]]);
            inTanArr.push([inTan[ic * 2], inTan[ic * 2 + 1]]);
            outTanArr.push([outTan[ic * 2], outTan[ic * 2 + 1]]);
          }
          myShape.vertices = vertsArr;
          myShape.inTangents = inTanArr;
          myShape.outTangents = outTanArr;
          myShape.closed = xml.closed.toString() === 'true';
          try {
            layers.property(matchName).setValue(myShape);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else {
          myShape = new Shape();
          vertsArr = [];
          inTanArr = [];
          outTanArr = [];
          times = [];
          var shapes = [];
          div = xml.keyTime.toString().split(',');
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ic = 0; ic < xml.keyValue.children().length(); ic++) {
            verts = xml.keyValue.child(ic).vertices.toString().split(',');
            inTan = xml.keyValue.child(ic).inTan.toString().split(',');
            outTan = xml.keyValue.child(ic).outTan.toString().split(',');
            for (ib = 0; ib < verts.length / 2; ib++) {
              vertsArr.push([verts[ib * 2], verts[ib * 2 + 1]]);
              inTanArr.push([inTan[ib * 2], inTan[ib * 2 + 1]]);
              outTanArr.push([outTan[ib * 2], outTan[ib * 2 + 1]]);
            }
            myShape = new Shape();
            myShape.vertices = vertsArr;
            myShape.inTangents = inTanArr;
            myShape.outTangents = outTanArr;
            myShape.closed = xml.keyValue.child(ic).closed.toString() === 'true';
            shapes.push(myShape);
            vertsArr = [];
            inTanArr = [];
            outTanArr = [];
          }
          try {
            layers.property(matchName).setValuesAtTimes(times, shapes);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          outIn = [];
          len = xml.keyTime.toString().split(',').length;
          for (ia = 0; ia < len; ia++) {
            thisChild = xml.child(ia + 4);
            clamp = parseFloat(thisChild.InIn);
            clamp = $.layer.clampInfluence(clamp);
            easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp);

            clampb = parseFloat(thisChild.OutIn);
            clampb = $.layer.clampInfluence(clampb);
            easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb);

            myScaleProperty = layers.property(matchName);
            try {
              var tempInType = xml.inType.toString().split(',')[0];
              if ($.layer.getDistance(PropertyValueType.TwoD.toString(), tempInType) !== PropertyValueType.TwoD && $.layer.getDistance(PropertyValueType.ThreeD.toString(), tempInType) !== PropertyValueType.ThreeD) {
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), tempInType) === PropertyValueType.TwoD) {
                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn], [easeOut, easeOut]);
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), tempInType) === PropertyValueType.ThreeD) {
                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
              }
              try {
                inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(thisChild.inInterType));
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(thisChild.outInterType));
                myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              try {
                if (xml.isRoving.toString() === 'true') {
                  myScaleProperty.setRovingAtKey(ia + 1, true);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      }
    },

    toLayer: function toLayer(thisComp, xml) {
      xml = xml || this.item;
      var isFirstStage;
      var len = xml.descendants('Layer').length();

      if ($.layer.numLayers === 0) {
        isFirstStage = true;
        $.layer.clearHelperArr();
        app.beginSuppressDialogs();
        $.layer.willCreateLayers(len);
      } else {
        isFirstStage = false;
      }

      var layerArr = [];

      $.layer.forEachXML(xml, function (item, index) {
        $.layer.numLayers++;
        try {
          var thisLayer = $.layer.layerArr[$.layer.layerArr.length] = layerArr[layerArr.length] = $.layer.prototype.newLayer(item, thisComp);
          var shouldCall = !(thisLayer.source instanceof CompItem);
          if (shouldCall) {
            $.layer.didCreateLayer(1);
          } else {
            $.layer.didCreateLayer(thisLayer.countForImport || 1);
          }
        } catch (err) {
          $.layer.errorInfoArr.push(err);
        }
        $.layer.layerParentNameArr.push(item.parent.toString());
      }, this);

      if (isFirstStage === true) {
        app.endSuppressDialogs(false);
        $.layer.correctProperty();
        $.layer.fixExpression();
        $.layer.setParent();
        $.layer.writeErrorFile();
        $.layer.clearHelperArr();
        $.layer.didCreateLayers();
      }

      return layerArr;
    }

  });

  $.layer.newProperties = function (effectxml, selectedLayers, options) {
    app.beginSuppressDialogs();

    var idArr = ['ADBE Mask Parade', 'ADBE Effect Parade', 'ADBE Transform Group', 'ADBE Material Options Group', 'ADBE Layer Styles', 'ADBE Root Vectors Group', 'ADBE Text Animators', 'ADBE Light Options Group', 'ADBE Camera Options Group'];

    var idGen = [];
    var idDel = [];

    var isCleanGroup = options.isCleanGroup;
    var isKeyframeOffset = options.isKeyframeOffset;

    var newPropertiesSettingArr = options.newPropertiesSettingArr;
    var cleanPropertiesSettingArr = options.cleanPropertiesSettingArr;

    for (var i = 1; i <= 9; i++) {
      if (newPropertiesSettingArr[i - 1] === 1) {
        idGen.push(idArr[i - 1]);
      }
      if (cleanPropertiesSettingArr[i - 1] === 1) {
        idDel.push(idArr[i - 1]);
      }
    }

    for (i = effectxml.children().length(); i >= 0; i--) {
      var xml = effectxml.child(i);
      if (xml.name().toString() === 'Group') {
        var matchName = xml['@matchName'].toString();
        if (matchName === 'ADBE Text Properties') {
          xml.child(0).setLocalName('textignore');
          if (effectxml.children().length() >= 4) {
            $.layer.lookUpInArray(xml.child(3)['@matchName'].toString(), idGen) === false && xml.child(3).setLocalName('ignore');
          }
        }
        if ($.layer.lookUpInArray(matchName, idGen) === false) {
          matchName !== 'ADBE Text Properties' && xml.setLocalName('ignore');
        }
      } else {
        xml.name().toString() === 'Comptent' && xml.setLocalName('compignore');
      }
    }

    if (isCleanGroup === true) {
      $.layer.forEach.call(selectedLayers, function (layer, index) {
        $.layer.forEachPropertyGroup.call(layer, function (thisGroup, index) {
          if ($.layer.lookUpInArray(thisGroup.matchName, idDel) === true) {
            if (thisGroup.matchName !== 'ADBE Layer Styles') {
              for (var i = thisGroup.numProperties; i > 0; i--) {
                try {
                  thisGroup.property(i).remove();
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            } else {
              for (i = thisGroup.numProperties; i > 0; i--) {
                try {
                  thisGroup.property(i).enabled = false;
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            }
          }
          if (thisGroup.matchName === 'ADBE Text Properties') {
            if ($.layer.lookUpInArray(thisGroup.property(4).matchName, idDel) === true) {
              for (i = thisGroup.property(4).numProperties; i > 0; i--) {
                try {
                  thisGroup.property(4).property(i).remove();
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            }
          }
        });
      });
      app.endSuppressDialogs(false);
    }

    $.layer.forEach.call(selectedLayers, function (layer, index) {
      if (isKeyframeOffset === true) {
        $.layer.prototype.newPropertyGroup(effectxml, layer, layer.inPoint);
      } else {
        $.layer.prototype.newPropertyGroup(effectxml, layer);
      }
    });
    $.layer.correctProperty();
    $.layer.fixExpression();
    $.layer.setParent();
  };
  $.layer.correctProperty = function () {
    $.layer.forEach.call($.layer.layerTypePropertyArr, function (item, index) {
      try {
        item.setValue($.layer.layerTypePropertyValueArr[index]);
      } catch (err) {}
    });
  };

  $.layer.fixExpression = function () {
    var translatedExpPropertyArr = [];

    app.beginSuppressDialogs();
    $.layer.forEach.call($.layer.expPropertyArr, function (item, index) {
      try {
        item.expressionEnabled = true;
        item.valueAtTime(0, false);
      } catch (eer) {
        translatedExpPropertyArr.push(item);
      };
    });
    app.endSuppressDialogs(false);

    var targetExpArr = [];

    for (var i = 0; i < translatedExpPropertyArr.length; i++) {
      var refArr = translatedExpPropertyArr[i];
      var prop = refArr[refArr.length - 1];
      var j = refArr.length - 1;
      while (j > 0) {
        prop = prop.property(refArr[j - 1]);
        j--;
      }
      targetExpArr.push(prop);
    }

    if (typeof $.layer.translate === 'function') {
      targetExpArr.length !== 0 && $.layer.translate(this, targetExpArr);
    }
  };

  $.layer.setParent = function () {
    $.layer.forEach.call($.layer.layerArr, function (item, index) {
      try {
        if (!isNaN(parseInt($.layer.layerParentNameArr[index]))) {
          item.setParentWithJump(item.containingComp.layer(parseInt($.layer.layerParentNameArr[index])));
        } else {
          item.setParentWithJump(item.containingComp.layer($.layer.layerParentNameArr[index]));
        }
      } catch (err) {}
    });
  };

  $.layer.isType = function (obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };

  $.layer.clampInfluence = function (clamp) {
    if (clamp < 0.1) {
      clamp = 0.1;
    } else if (clamp >= 100) {
      clamp = 100;
    }
    return clamp;
  };

  $.layer.arrayIndexOf = function (arr, item) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  };

  $.layer.forEachXML = function (xml, callback, context) {
    if (!(xml instanceof XML)) return;
    var i, len;
    for (i = 0, len = xml.children().length(); i < len; i++) {
      if (callback.call(context, xml.child(i), i, xml) === false) {
        break;
      }
    }
  };

  $.layer.forEach = function (callback, context) {
    if (Object.prototype.toString.call(this) === '[object Array]') {
      var i, len;
      for (i = 0, len = this.length; i < len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break;
          }
        }
      }
    }
  };

  $.layer.forEachLayer = function (callback, context) {
    if (Object.prototype.toString.call(this) === '[object LayerCollection]') {
      var i, len;
      for (i = 1, len = this.length; i <= len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break;
          }
        }
      }
    }
  };

  $.layer.forEachPropertyGroup = function (callback, context) {
    var i, len;
    for (i = 1, len = this.numProperties; i <= len; i++) {
      if (callback.call(context, this.property(i), i, this) === false) {
        break;
      }
    }
  };

  $.layer.lookUpInArray = function (text, arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      if (arr[i] === text) {
        return true;
      }
    }
    return false;
  };

  $.layer.getDistance = function (a, b) {
    return parseInt(a.toString().substring(0, 2) - b.toString().substring(0, 2)) * 100 + parseInt(b);
  };

  $.layer.tempFolder = new Folder(new File($.fileName).parent.toString());
  $.layer.slash = '/';

  $.layer.numLayers = 0;
  $.layer.layerTypePropertyArr = [];
  $.layer.layerTypePropertyValueArr = [];
  $.layer.expPropertyArr = [];
  $.layer.layerArr = [];
  $.layer.layerParentNameArr = [];
  $.layer.errorInfoArr = [];

  $.layer.clearHelperArr = function () {
    $.layer.numLayers = 0;
    $.layer.layerTypePropertyArr = [];
    $.layer.layerTypePropertyValueArr = [];
    $.layer.expPropertyArr = [];
    $.layer.layerArr = [];
    $.layer.layerParentNameArr = [];
    $.layer.errorInfoArr = [];
  };

  $.layer.testForSequence = function (file) {
    var searcher = new RegExp('\\d{4,}');
    var files = file.parent.getFiles();
    var defaultResult = searcher.exec(file.name);
    if (!defaultResult) return [];
    var prefix = file.name.replace(defaultResult[0], '');
    var finalFiles = [];
    for (var i = 0; i < files.length; i++) {
      var currentResult = searcher.exec(files[i].name);
      if (currentResult) {
        var testName = files[i].name.replace(currentResult[0], '');
        if (testName === prefix) {
          finalFiles.push(files[i]);
        }
      }
    }
    return finalFiles;
  };

  $.layer.writeErrorFile = function () {
    var file = new File($.layer.tempFolder.toString() + $.layer.slash.toString() + 'error.txt');
    if ($.layer.errorInfoArr.length === 0) {
      file.writee('');
      return;
    }
    var str = '';
    $.layer.forEach.call($.layer.errorInfoArr, function (item, index) {
      if (!item.error) {
        str += new Date().toLocaleString() + '\tCatched-Line# ' + item.line + '\t without error detail';
        return;
      }
      str += new Date().toLocaleString() + '\tCatched-Line# ' + item.line + '\tHappened-Line# ' + item.error.line.toString() + '\t' + item.error.toString() + '\r\n';
    });
    writeLn('Log ' + $.layer.errorInfoArr.length + ' errors in error.txt');
    file.writee(str);
  };

  $.layer.translate = function () {};
  $.layer.willSaveLayers = function () {};
  $.layer.didSaveLayer = function () {};
  $.layer.didSaveLayers = function () {};
  $.layer.didCreateLayer = function () {};
  $.layer.willCreateLayers = function () {};
  $.layer.didCreateLayers = function () {};

  $.layer.encodedArr = ['amp;', 'lt;', 'gt;', 'quot;', 'apos;'];
  $.layer.decodedArr = ['&', '<', '>', '"', "'"];

  $.layer.encode = function (obj) {
    $.layer.forEach.call($.layer.decodedArr, function (item, index) {
      var reg = new RegExp(item, 'g');
      for (var j in obj) {
        obj[j] = obj[j].replace(reg, $.layer.encodedArr[index]);
      }
    });
  };

  $.layer.decode = function (obj) {
    $.layer.forEach.call($.layer.encodedArr, function (item, index) {
      var reg = new RegExp(item, 'g');
      for (var j in obj) {
        obj[j] = obj[j].replace(reg, $.layer.decodedArr[index]);
      }
    });
  };

  $.layer.countLayers = function (layers, isFirstStage, helperObj) {
    isFirstStage = isFirstStage || false;
    helperObj = helperObj || {};
    var count = 0;
    var startIndex = isFirstStage ? 0 : 1;
    var maxLength = isFirstStage ? layers.length : layers.length + 1;
    for (var i = startIndex; i < maxLength; i++) {
      count++;
      var layer = layers[i];
      if (layer.source instanceof CompItem) {
        var id = layer.source.id;
        if (helperObj[id]) {
          count += layer.source.numLayers;
        } else {
          helperObj[id] = true;
          count += $.layer.countLayers(layer.source.layers, false, helperObj);
        }
      }
    }

    return count;
  };

  $.layer.name = 'AE Layer library';
  $.layer.version = 1.0;
  $.layer.email = 'smallpath2013@gmail.com';

  $.layer.prototype.Init.prototype = $.layer.prototype;
  return $.layer;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.global.autoSave = autoSave;
function autoSave() {
  if (confirm(loc(sp.auto)) === false) return;
  if (!(app.project.activeItem instanceof CompItem)) return alert(loc(sp.needComp));
  if (!sp.droplist.selection) return;

  try {
    var preRenameValue = sp.autoNameValue;
    sp.autoNameValue = true;
    for (var i = 0; i < app.project.activeItem.numLayers; i++) {
      for (var j = 1; j <= app.project.activeItem.numLayers; j++) {
        app.project.activeItem.layer(j).selected = false;
      }
      app.project.activeItem.layer(i + 1).selected = true;
      sp.fns.newItem();
      app.project.activeItem.layer(i + 1).selected = false;
    }
    sp.autoNameValue = preRenameValue;
  } catch (err) {}
  sp.droplist.notify('onChange');
  sp.gv.refresh();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.global.GridView = GridView;
function GridView(parent, attrs) {
  var keepRef = this;

  this.extend = function (target, source) {
    for (var i in source) {
      target[i] = source[i];
    }return target;
  };

  this.item = function (text, image, parent) {
    if (!text) text = '';
    if (!image) image = null;
    keepRef.extend(this, {
      id: 'item',
      index: 0,
      type: 'item',
      image: image,
      text: text,
      selected: false,
      prev: null,
      next: null,
      parent: parent,
      backgroundColor: null,
      strokeColor: null,
      rect: [0, 0, 100, 60],
      imageRect: [0, 0, 100, 60],
      fontRect: [0, 90, 100, 10] });

    keepRef.extend(this, {
      remove: function remove(notRefreshList) {
        var e = this.parent;
        var prev = this.prev;
        var next = this.next;
        if (prev) {
          prev.next = next;
          if (next) {
            next.prev = prev;
          }
        } else {
          next.prev = null;
        }

        if (this === e.lastSelectedItem) e.lastSelectedItem = null;
        e.getChildren();
        e.getSelection();

        if (!notRefreshList) e.refresh();
      },
      moveUp: function moveUp() {
        try {
          var e = this.parent;
          var prev = this.prev;
          var next = this.next;
          if (prev) {
            if (prev.prev) {
              prev.prev.next = this;
            }
            this.prev = prev.prev;
            this.next = prev;
            prev.prev = this;
            prev.next = next;
            if (next) {
              next.prev = prev;
            }
          }
          if (this.prev === null) {
            e.first = this;
          }
          e.getChildren();
          e.refresh();
        } catch (err) {
          alert(err.line.toString());
        }
      },
      moveDown: function moveDown() {
        try {
          var e = this.parent;
          var prev = this.prev;
          var next = this.next;
          if (next) {
            var right = this.next.next;
            if (prev) {
              prev.next = next;
            }
            next.prev = prev;
            next.next = this;
            this.prev = next;
            this.next = right;
            if (right) {
              right.prev = this;
            }
          }
          if (next.prev === null) {
            e.first = next;
          }
          e.getChildren();
          e.refresh();
        } catch (err) {
          alert(err.line.toString());
        }
      },
      moveBefore: function moveBefore(item) {
        var e = this.parent;
        this.remove(1);
        if (this.next) {
          this.next.prev = this.prev;
        }
        if (this.prev) {
          this.prev.next = this.next;
        }
        this.next = item;
        this.prev = item.prev;
        if (item.prev) {
          item.prev.next = this;
        }
        item.prev = this;
        if (this.prev === null) {
          e.first = this;
        }
        e.getChildren();
        e.refresh();
      },
      moveAfter: function moveAfter(item) {
        var e = this.parent;
        this.remove(1);
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.prev = item;
        this.next = item.next;
        if (item.next) {
          item.next.prev = this;
        }
        item.next = this;

        e.getChildren();
        e.refresh();
      }
    });
  };

  this.extend(this, {
    id: 'GridView',
    type: 'GridView',

    listHeight: 400,
    scale: 1,
    backgroundColor: [0.15, 0.15, 0.15],
    scrollBlockColor: [0.16, 0.16, 0.16],
    scrollBarColor: [0.08, 0.08, 0.08],
    scrollBarWidth: 17,
    scrollBarValue: 0,
    scrollBlockRect: [0, 0, 20, 100],
    scrollScale: 1,
    spacing: [3, 3],
    itemBackgroundColor: [0, 0, 0, 0],
    itemStrokeColor: [0.2, 0.2, 0.2, 0],
    itemSelectedColor: [38 / 255, 38 / 255, 38 / 255],
    itemSelectedRecColor: [0.2, 0.7, 1],
    itemFontColor: [1, 1, 1],
    itemSize: [100, 60],
    itemStrokeSize: 1.6,
    itemFontHeight: 0,
    itemFontSize: 20,
    showText: false,
    limitText: false,
    version: 'CC2014',
    first: null,
    last: null,
    children: [],
    selection: [],
    lastSelectedItem: null,

    leftClick: function leftClick(event) {},
    leftDoubleClick: function leftDoubleClick(event) {},
    rightClick: function rightClick(event) {},
    rightDoubleClick: function rightDoubleClick(event) {},
    mouseMove: function mouseMove(event) {},
    mouseOut: function mouseOut(event) {}
  });

  this.extend(this, {
    add: function add(text, image) {
      var newItem = new this.item(text, image, this);
      if (this.first) {
        this.last.next = newItem;
        newItem.prev = this.last;
        this.children.push(newItem);
        this.last = this.children[this.children.length - 1];
        this.last.index = this.last.prev.index + 1;
      } else {
        this.first = this.last = newItem;
        this.children.push(newItem);
        this.first.index = 0;
      }

      this.getSelection();

      return newItem;
    },
    removeAll: function removeAll() {
      this.first = this.last = this.lastSelectedItem = null;
      this.selection = this.children = [];
    },
    getChildren: function getChildren() {
      var children = [];
      var item = this.first;
      var index = 0;

      while (item) {
        children.push(item);
        item.index = index;
        item = item.next;
        index++;
      }

      this.children = children;
      if (children.length) {
        this.first = children[0];
        this.last = children[children.length - 1];
      }
      return children;
    },
    getSelection: function getSelection() {
      var selection = [];
      var item = this.first;

      while (item) {
        if (item.selected) selection.push(item);
        item = item.next;
      }

      this.selection = selection;
      return selection;
    },
    create: function create(parent) {
      var e = this;
      var GV = e.GV = parent.add("group{orientation: 'stack', alignment: ['fill','fill'], margins: 0, spacing: 0}");
      var list = e.list = GV.add("button{alignment:['fill','fill']}");
      var eventRect = e.eventRect = GV.add("group{alignment:['fill','fill']}");
      var screen = $.screens[0].toString().split('-').pop().split(':');
      GV.maximumSize = list.maximumSize = eventRect.maximumSize = [parseInt(screen[0]), parseInt(screen[1])];

      eventRect.addEventListener('mousedown', function (event) {
        e.event.mouseMoving = false;
        e.event.targetScrollBar = e.getScrollBarFromLocation(event.clientX, event.clientY);
        e.event.targetItem = e.getItemFromLocation(event.clientX, event.clientY);
        if (event.button === 0) {
          if (event.detail === 1) {
            e.event.leftButtonPressed = true;
            e.event.leftButtonPressedLocation = [event.clientX, event.clientY];
            e.event.leftButtonPressedScrollBarValue = e.scrollBarValue;

            if (event.ctrlKey === false) {
              e.mouseMove(event, e.event.targetItem, true);
            }
          } else if (event.detail === 2) {
            e.leftDoubleClick(event);
          }
        } else if (event.button === 2) {
          if (event.detail === 1) {
            e.event.rightButtonPressed = true;
            e.event.rightButtonPressedLocation = [event.clientX, event.clientY];
            e.event.rightButtonPressedScrollBarValue = e.scrollBarValue;
          } else if (event.detail === 2) {}
        }
      });
      eventRect.addEventListener('mousemove', function (event) {
        e.event.mouseMoving = true;
        if (e.event.leftButtonPressed) {
          e.defaultLeftMouseMove(event);
          e.refresh();
        } else if (e.event.rightButtonPressed) {}
        if (event.ctrlKey === false) {
          e.mouseMove(event, e.getItemFromLocation(event.clientX, event.clientY));
        }
      });
      eventRect.addEventListener('mouseup', function (event) {
        if (e.event.leftButtonPressed) {
          if (e.event.mouseMoving) {
            e.defaultLeftClick(event);
            e.leftClick(event);
          } else {
            e.defaultLeftClick(event);
            e.leftClick(event);
          }
        } else if (e.event.rightButtonPressed) {
          if (e.event.mouseMoving) {
            e.rightClick(event);
          } else if (event.detail === 1) {
            e.rightClick(event);
          } else if (event.detail === 2) {
            e.rightDoubleClick(event);
          }
        }
        e.event.leftButtonPressed = false;
        e.event.rightButtonPressed = false;
        e.event.mouseMoving = false;
        e.event.targetScrollBar = false;
        e.refresh();
      });


      list.onDraw = e.listDraw;
      list.GV = e;
    },
    alignment: function alignment(_alignment) {
      this.GV.alignment = _alignment;
    },
    size: function size(_size) {
      this.GV.size = _size;
      this.list.size = _size;
      this.eventRect.size = _size;
    },
    location: function location(_location) {
      this.GV.location = _location;
    },
    listDraw: function listDraw() {
      var e = this.GV;
      var g = this.graphics;
      var items = e.children;

      var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, e.backgroundColor);
      var itemBgBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemBackgroundColor);
      var strokePen = g.newPen(g.PenType.SOLID_COLOR, e.itemStrokeColor, e.itemStrokeSize);
      var selectedPen = g.newPen(g.PenType.SOLID_COLOR, e.itemSelectedRecColor, e.itemStrokeSize);
      var selectedBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemSelectedColor);
      var scrollBarBrush = g.newBrush(g.PenType.SOLID_COLOR, e.scrollBarColor);
      var scrollBlockBrush = g.newBrush(g.PenType.SOLID_COLOR, e.scrollBlockColor);

      if (e.showText) e.itemFontHeight = e.itemFontSize;else e.itemFontHeight = 0;
      e.relocationItems();
      e.resizeItems();
      e.resizeScrollBar();

      g.newPath();
      g.rectPath(0, 0, e.list.size[0] - e.scrollBarWidth * e.scale * e.scrollScale, e.list.size[1]);
      g.fillPath(bgBrush);

      var shouldDrawArr = [];
      var pointArr = [];
      var limit = e.GV.size[1];

      for (var i = 0; i < items.length; i++) {
        var target = items[i];
        var height = target.rect[1] + target.imageRect[1] - e.scrollBarValue + target.imageRect[3];
        var shouldDraw = height > 0 && height - target.imageRect[3] + 10 < limit;
        shouldDrawArr.push(shouldDraw);
        pointArr.push([target.rect[0], target.rect[1], target.rect[2], target.rect[3], target.rect[1] - e.scrollBarValue]);
      }

      g.newPath();
      for (i = 0; i < items.length; i++) {
        var item = items[i];
        var rect = pointArr[i];
        if (items[i].backgroundColor) continue;

        g.rectPath(rect[0], rect[4], rect[2], rect[3] - item.fontRect[3]);
      }
      g.fillPath(itemBgBrush);

      for (i = 0; i < items.length; i++) {
        item = items[i];
        rect = pointArr[i];
        if (item.backgroundColor) {
          var brush = g.newBrush(g.PenType.SOLID_COLOR, item.backgroundColor);
          g.newPath();
          g.rectPath(rect[0], rect[4], rect[2], rect[3]);
          g.fillPath(brush);
        }

        if (item.image && shouldDrawArr[i]) {
          var image = ScriptUI.newImage(item.image);
          g.drawImage(image, rect[0] + item.imageRect[0], rect[1] + item.imageRect[1] - e.scrollBarValue, item.imageRect[2], item.imageRect[3]);
        }
      }

      g.newPath();
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (!item.selected) {
          if (item.strokeColor) continue;
          if (shouldDrawArr[i]) {
            rect = pointArr[i];
            g.rectPath(rect[0], rect[4], rect[2], rect[3]);
          }
        }
      }
      g.strokePath(strokePen);

      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (item.strokeColor && shouldDrawArr[i]) {
          rect = pointArr[i];
          var pen = g.newPen(g.PenType.SOLID_COLOR, item.strokeColor, e.itemStrokeSize);
          g.newPath();
          g.rectPath(rect[0], rect[4], rect[2], rect[3]);
          g.strokePath(pen);
        }
      }

      if (e.showText) {
        g.newPath();
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.selected && shouldDrawArr[i]) {
            g.rectPath(item.rect[0] + item.fontRect[0] + 1, item.rect[1] + item.fontRect[1] - e.scrollBarValue, item.fontRect[2], item.fontRect[3]);
          }
        }
        g.fillPath(selectedBrush);
      }

      g.newPath();
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (item.selected && shouldDrawArr[i]) {
          rect = pointArr[i];
          g.rectPath(rect[0], rect[4], rect[2], rect[3]);
        }
      }
      g.strokePath(selectedPen);

      if (e.showText) {
        var fontPen = g.newPen(g.PenType.SOLID_COLOR, e.itemFontColor, e.itemFontSize * e.scale);
        var font = ScriptUI.newFont('Microsoft YaHei', ScriptUI.FontStyle.REGULAR, e.itemFontSize * e.scale * 0.6);

        var trickWidthForCC2014 = 20;
        var trickForOther = 0;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (!shouldDrawArr[i]) continue;
          var textRect = g.measureString(item.text, font);
          var thisText = item.text;
          var totalText = item.text;
          var base = textRect.width - item.imageRect[2] - e.spacing[0] * 2;
          if (e.limitText === true && e.version === 'CC2014') {
            if (base >= -trickWidthForCC2014) {
              for (var j = 0; j < item.text.length; j++) {
                thisText = item.text.slice(0, totalText.length - 2 - j);
                textRect = g.measureString(thisText, font);
                var newBase = textRect.width - item.imageRect[2] - e.spacing[0] * 2;
                if (newBase < -trickWidthForCC2014) {
                  break;
                }
              }
            }
          } else if (e.version !== 'CC2014') {
            if (base >= trickForOther) {
              for (j = 0; j < item.text.length; j++) {
                thisText = item.text.slice(0, totalText.length - 2 - j);
                textRect = g.measureString(thisText, font);
                newBase = textRect.width - item.imageRect[2] - e.spacing[0] * 2;
                if (newBase < trickForOther) {
                  break;
                }
              }
            }
          }

          var value = parseInt(thisText);
          if (!isNaN(value) && value.toString() === thisText) {
            thisText += ' ';
          }
          if (e.version === 'CC2014') {
            g.drawString(thisText, fontPen, item.rect[0] + item.fontRect[0], item.rect[1] + item.fontRect[1] - e.scrollBarValue - 10, font);
          } else {
            g.drawString(thisText, fontPen, item.rect[0] + item.fontRect[0], item.rect[1] + item.fontRect[1] - e.scrollBarValue, font);
          }
        }
      }
      if (e.scrollScale) {
        g.newPath();
        g.rectPath(e.list.size[0] * e.scale - e.scrollBarWidth * e.scale, 0, e.scrollBarWidth * e.scale, e.list.size[1] * e.scale);
        g.fillPath(scrollBarBrush);

        g.newPath();
        g.rectPath(e.scrollBlockRect[0], e.scrollBlockRect[1], e.scrollBlockRect[2], e.scrollBlockRect[3]);
        g.fillPath(scrollBlockBrush);
      }
    },
    resizeItems: function resizeItems() {
      var e = this;
      var items = e.children;
      for (var i = 0; i < items.length; i++) {
        items[i].rect[2] = e.itemSize[0] * e.scale;
        items[i].rect[3] = e.itemSize[1] * e.scale;
        items[i].imageRect[2] = e.itemSize[0] * e.scale;
        items[i].imageRect[3] = e.itemSize[1] * e.scale;

        items[i].fontRect[0] = 0;
        items[i].fontRect[1] = (e.itemSize[1] - e.itemFontHeight) * e.scale + 5;
        items[i].fontRect[2] = e.itemSize[0] * e.scale;
        items[i].fontRect[3] = 15;
      }
    },
    relocationItems: function relocationItems() {
      var e = this;
      var list = e.list;
      var items = e.children;
      e.scrollScale = 0;

      var numWidth = Math.floor((list.size[0] * e.scale - e.scrollBarWidth * e.scale * e.scrollScale) / (e.itemSize[0] * e.scale + e.spacing[0]));
      if (numWidth === 0) numWidth = 1;
      e.listHeight = Math.ceil(items.length / numWidth) * (e.itemSize[1] * e.scale + e.spacing[1]);

      for (var i = 0; i < items.length; i++) {
        items[i].rect[0] = e.spacing[0] + i % numWidth * (e.itemSize[0] * e.scale + e.spacing[0]);
        items[i].rect[1] = e.spacing[1] + Math.floor(i / numWidth) * (e.itemSize[1] * e.scale + e.spacing[1]);
      }
      e.scrollScale = 1;
    },
    resizeImage: function resizeImage(image) {
      var e = this;

      var WH = [e.itemSize[0], e.itemSize[1]];
      var wh = image.size;
      var k = Math.min(WH[0] / wh[0], WH[1] / wh[1]);
      var xy;
      wh = [k * wh[0], k * wh[1]];
      xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2];

      return [xy[0] * e.scale, xy[1] * e.scale, wh[0] * e.scale, wh[1] * e.scale];
    },
    resizeScrollBar: function resizeScrollBar() {
      var e = this;
      var list = e.list;
      e.scrollBarMaxValue = e.listHeight - list.size[1] * e.scale + 7 / e.scale;
      if (e.scrollBarMaxValue < 0) e.scrollBarValue = 0;

      e.scrollBlockRect[0] = list.size[0] * e.scale - e.scrollBarWidth * e.scale + 1;
      e.scrollBlockRect[2] = e.scrollBarWidth * e.scale - 2;
      if (e.listHeight < list.size[1] * e.scale) {
        e.scrollScale = 0;
        e.scrollBlockRect[3] = list.size[1] * e.scale;
      } else {
        e.scrollScale = 1;
        e.scrollBlockRect[3] = list.size[1] * e.scale * list.size[1] * e.scale / e.listHeight * e.scale;
      }
      e.scrollBlockRect[1] = (e.list.size[1] * e.scale - e.scrollBlockRect[3]) * e.scrollBarValue / e.scrollBarMaxValue;
    },
    defaultLeftClick: function defaultLeftClick(event) {
      var e = this;
      var s = e.selection;
      var c = e.children;
      var currentItem = e.event.targetItem;
      if (!currentItem) {
        for (var i = 0; i < s.length; i++) {
          s[i].selected = 0;
        }e.lastSelectedItem = null;
        e.getSelection();
      }

      if (currentItem) {
        var preSelected = currentItem.selected;
        if (event.ctrlKey === false) {
          for (i = 0; i < c.length; i++) {
            c[i].selected = 0;
          }
        }
        if (e.lastSelectedItem && event.shiftKey === true) {
          var startIndex = e.lastSelectedItem.index;
          var endIndex = currentItem.index;
          for (i = 0; i < c.length; i++) {
            if ((c[i].index - startIndex) * (c[i].index - endIndex) <= 0) {
              c[i].selected = 1;
            }
          }
        }

        currentItem.selected = true;
        if (e.lastSelectedItem && event.ctrlKey === true) {
          if (preSelected === true) {
            currentItem.selected = false;
          }
        } else {
          e.lastSelectedItem = currentItem;
        }

        e.getSelection();
      } else if (e.event.targetScrollBar === 1) {
        e.scrollBarValue = e.scrollBarMaxValue * event.clientY / e.list.size[1];
      }
    },
    defaultLeftMouseMove: function defaultLeftMouseMove(event) {
      var e = this;
      if (e.event.targetScrollBar === 2) {
        e.scrollBarValue = e.event.leftButtonPressedScrollBarValue + (event.clientY - e.event.leftButtonPressedLocation[1]) * e.scrollBarMaxValue / (e.list.size[1] * e.scale - e.scrollBlockRect[3]);
      } else {
        e.scrollBarValue = e.event.leftButtonPressedScrollBarValue - event.clientY + e.event.leftButtonPressedLocation[1];
      }
      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0;
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue;
      }
    },
    defaultRightMouseMove: function defaultRightMouseMove(event) {
      var e = this;
      e.scrollBarValue = e.event.rightButtonPressedScrollBarValue - event.clientY + e.event.rightButtonPressedLocation[1];

      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0;
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue;
      }
    },
    getItemFromLocation: function getItemFromLocation(x, y) {
      var e = this;
      var c = e.children;
      for (var i = 0; i < c.length; i++) {
        if (x - c[i].rect[0] > 0 && x - c[i].rect[0] < c[i].rect[2] && y - c[i].rect[1] + e.scrollBarValue > 0 && y - c[i].rect[1] + e.scrollBarValue < c[i].rect[3]) {
          return c[i];
        }
      }
      return null;
    },
    getScrollBarFromLocation: function getScrollBarFromLocation(x, y) {
      var e = this;

      if (x > e.list.size[0] * e.scale - e.scrollBarWidth) {
        if (y > e.scrollBlockRect[1] && y < e.scrollBlockRect[1] + e.scrollBlockRect[3]) {
          return 2;
        }
        return 1;
      }
      return 0;
    },
    refresh: function refresh() {
      this.list.notify('onDraw');
    }
  });

  if (attrs) this.extend(this, attrs);

  this.event = {
    leftButtonPressed: false,
    leftButtonPressedLocation: [0, 0],
    rightButtonPressed: false,
    rightButtonPressedLocation: [0, 0],
    leftButtonPressedScrollBarValue: 0,
    rightButtonPressedScrollBarValue: 0,
    targetItem: null,
    targetScrollBar: 0,
    mouseMoving: false };

  if (parent) this.create(parent);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.global.reloadPic = reloadPic;
function reloadPic() {
  var thisComp = app.project.activeItem;
  if (!(thisComp instanceof CompItem)) return alert(loc(sp.needComp));
  if (!sp.droplist.selection) return;

  if (confirm(loc(sp.refresh)) === false) return;

  var frames = prompt(loc(sp.reloadNeedFrames), '');
  var shouldLimit = true;
  if (!frames || isNaN(frames)) shouldLimit = false;
  if (frames === '') shouldLimit = false;

  try {
    frames = parseInt(frames);
    var SpeciallimitTime = frames / thisComp.frameRate;
  } catch (err) {}

  var preRenameValue = sp.autoNameValue;
  sp.autoNameValue = true;
  var preCompValue = sp.preComposeValue;
  sp.preComposeValue = false;

  for (var i = 0; i < sp.gv.children.length; i++) {
    try {
      sp.gv.children[i].selected = true;

      try {
        sp.gv.children[i - 1].selected = false;
      } catch (err) {}

      sp.gv.lastSelectedItem = sp.gv.children[i];

      var layerArr = sp.fns.newLayer();
      var j;
      for (j = 0; j < thisComp.selectedLayers.length; j++) {
        thisComp.selectedLayers[j].selected = false;
      }

      if (!layerArr) continue;

      if (!(layerArr instanceof Array)) layerArr = [layerArr];

      for (j = 0; j < layerArr.length; j++) {
        layerArr[j].selected = true;

        if (shouldLimit === false) continue;

        if (layerArr[j].outPoint > SpeciallimitTime) {
          layerArr[j].outPoint = SpeciallimitTime;
        }
      }

      sp.fns.cover();

      for (j = layerArr.length - 1; j >= 0; j--) {
        layerArr[j].remove();
      }

      sp.gv.children[i].selected = false;
    } catch (err) {
      alert(err.line.toString() + '\r' + err.toString());
    }
  }

  sp.autoNameValue = preRenameValue;
  sp.preComposeValue = preCompValue;
  sp.gv.refresh();
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.global.translate = translate;
function translate(thisObj, expProps) {
  var you = this;

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

  };

  this.supportedLanguages = $.global.translate.supportedLanguages = 4;
  this.hotWords = [];

  var thisFolder, thisFile;
  if ($.layer) {
    thisFolder = new Folder($.layer.tempFolder.toString());
    if (!thisFolder.exists) thisFolder.create();
    thisFile = new File(thisFolder.fullName + $.layer.slash.toString() + 'whiteList.xml');
  } else {
    thisFolder = new Folder(Folder.userData.fullName + '/Aescripts/Sp_memory');
    if (!thisFolder.exists) thisFolder.create();
    thisFile = File(thisFolder.fullName + '/whiteList.xml');
  }

  var allWords = [['"Angle Control"', '"角度控制"', '"角度制御"', '"ADBE Angle Control"'], ['"Checkbox Control"', '"复选框控制"', '"チェックボックス制御"', '"ADBE Checkbox Control"'], ['"Color Control"', '"色彩控制"', '"カラー制御"', '"ADBE Color Control"'], ['"Layer Control"', '"图层控制"', '"レイヤー制御"', '"ADBE Layer Control"'], ['"Point Control"', '"点控制"', '"ポイント制御"', '"ADBE Point Control"'], ['"Slider Control"', '"滑杆控制"', '"スライダー制御"', '"ADBE Slider Control"'], ['"Angle"', '"角度"', '"角度"', '"ADBE Angle Control-0001"'], ['"Checkbox"', '"检测框"', '"チェックボックス"', '"ADBE Checkbox Control-0001"'], ['"Color"', '"颜色"', '"カラー"', '"ADBE Color Control-0001"'], ['"Layer"', '"图层"', '"レイヤー"', '"ADBE Layer Control-0001"'], ['"Point"', '"点"', '"ポイント"', '"ADBE Point Control-0001"'], ['"Slider"', '"滑块"', '"スライダー"', '"ADBE Slider Control-0001"'], ['"Motion Tile"', '"动态平铺"', '"モーションタイル"', '"ADBE Tile"'], ['"Tile Width"', '"平铺宽度"', '"タイルの幅"', '"ADBE Tile-0003"']];
  if (thisFile.exists) {
    var content = thisFile.readd();
    var hahaxml = new XML(content);
    if (hahaxml.settings.version.toString() !== '1.6') thisFile.remove();
  }
  var iii;
  if (!thisFile.exists || thisFile.length === -1) {
    var newxml = new XML('<WhiteList></WhiteList>');
    newxml.settings.version = '1.6';
    newxml.settings.author = 'smallpath';
    for (iii = 0; iii < allWords.length; iii++) {
      newxml.words.words[iii] = allWords[iii];
    }
    if (sp.os === 'mac') {
      thisFile.encoding = 'UTF-8';
    }
    thisFile.writee(newxml);
  }
  content = thisFile.readd();
  var myxml = new XML(content);
  for (iii = 0; iii < myxml.words.words.length(); iii++) {
    var arr = myxml.words.words[iii].split(',');
    this.hotWords.push(arr);
  }

  this.changeNode = function (index, en, ch, ja, adbe) {
    if (en !== '' || ch !== '' || ja !== '' || adbe !== '') {
      if (en === '') en = 'None';
      if (ch === '') ch = 'None';
      if (ja === '') ja = 'None';
      if (adbe === '') adbe = 'None';

      content = thisFile.readd();
      var xml = new XML(content);
      xml.words.words[index] = [en, ch, ja, adbe];
      thisFile.writee(xml);

      this.hotWords = [];
      for (var iii = 0; iii < xml.words.words.length(); iii++) {
        arr = xml.words.words[iii];
        arr = arr.split(',');
        this.hotWords.push(arr);
      }
    }
  };

  this.deleteNode = function (index) {
    content = thisFile.readd();
    var deletexml = new XML(content);
    delete deletexml.words.words[index];
    thisFile.writee(deletexml);
    this.hotWords = [];
    for (var iii = 0; iii < deletexml.words.words.length(); iii++) {
      arr = deletexml.words.words[iii];
      arr = arr.split(',');
      this.hotWords.push(arr);
    }
  };

  this.addNode = function (en, ch, ja, adbe) {
    if (en !== '' || ch !== '' || ja !== '' || adbe !== '') {
      if (en === '') en = 'None';
      if (ch === '') ch = 'None';
      if (ja === '') ja = 'None';
      if (adbe === '') adbe = 'None';

      content = thisFile.readd();
      var addxml = new XML(content);
      addxml.words.words[addxml.words.words.length()] = [en, ch, ja, adbe];
      thisFile.writee(addxml);

      this.hotWords = [];
      for (var iii = 0; iii < addxml.words.words.length(); iii++) {
        arr = addxml.words.words[iii];
        arr = arr.split(',');
        this.hotWords.push(arr);
      }
    }
  };

  this.findReplace = function (prop, langId, compid) {
    try {
      var expr = prop.expression;
      var oldExp = prop.expression;
      if (expr !== '') {
        for (var l = 0; l < this.supportedLanguages; l++) {
          if (l !== langId) {
            for (var i = 0; i < this.hotWords.length; i++) {
              if (this.hotWords[i][l] !== 'None') {
                var regExp = new RegExp(this.hotWords[i][l], 'g');
                expr = expr.replace(regExp, this.hotWords[i][langId]);
              }
            }
          }
        }
        app.beginSuppressDialogs();
        try {
          prop.expression = expr;
        } catch (e) {
          try {
            prop.expressionEnabled = true;
            prop.valueAtTime(0, false);
            if (lista.selection.index === 0) {
              if (prop.expressionEnabled === false) {
                prop.expression = oldExp;
              }
            }
          } catch (er) {
            wrongcomps.push(compid);
          };
        }
        app.endSuppressDialogs(false);
      }
    } catch (err) {}
  };

  Array.prototype.add = function (str) {
    var check = false;
    for (var ia = 0; ia < this.length; ia++) {
      if (this[ia] === str) {
        check = true;
      }
    }
    if (check === false) {
      this[this.length] = str;
    }
  };

  function recursiveScanLayerForExpr(ref, compindex, ja) {
    var global = $.global.translate.helper;
    if (ref !== null) {
      var prop;
      for (var i = 1; i <= ref.numProperties; i++) {
        prop = ref.property(i);
        var isLayerStyle = prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false;
        var isMaterial = prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false;
        var isAudio = prop.matchName === 'ADBE Audio Group' && prop.propertyGroup(prop.propertyDepth).hasAudio === false;
        var isExtra = prop.matchName === 'ADBE Extrsn Options Group';
        var isPlane = prop.matchName === 'ADBE Plane Options Group';
        var isVector = prop.matchName === 'ADBE Vector Materials Group';
        var shouldRecursiveScan = !(isLayerStyle || isMaterial || isAudio || isExtra || isPlane || isVector);
        if (checkb.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression && prop.expressionEnabled === true) {
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (shouldRecursiveScan) {
              recursiveScanLayerForExpr(prop, compindex, ja);
            }
          }
        } else if (checka.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression && prop.expressionEnabled === false) {
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (shouldRecursiveScan) {
              recursiveScanLayerForExpr(prop, compindex, ja);
            }
          }
        } else if (checkc.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression) {
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (shouldRecursiveScan) {
              recursiveScanLayerForExpr(prop, compindex, ja);
            }
          }
        }
      }
    }
  }

  function isInId(itemid, array) {
    var check = false;
    for (var ie = 0; ie < array.length; ie++) {
      if (itemid === array[ie]) {
        check = true;
      }
    }
    return check;
  }

  function ScanProjectForExpr(blackList) {
    var global = $.global.translate.helper = {};
    global.propArr = [];
    global.exps = [];
    global.layerExps = [];
    global.comps = [];
    global.layers = [];
    global.layerTemp = [];
    wrongcomps = [];
    var j;
    for (var i = 1; i <= app.project.numItems; i++) {
      var item = app.project.item(i);
      if (item instanceof CompItem) {
        if (isInId(i, blackList) === true) {
          writeLn('Proccessing: ' + item.name);
          for (j = 1; j <= item.numLayers; j++) {
            item.layer(j).selected = false;
            recursiveScanLayerForExpr(item.layer(j), i, j);
            if (global.exps.length !== 0) {
              global.layerExps.push(global.exps);
            }
            global.exps = [];
          }
        }
        if (global.layerTemp.length !== 0) {
          global.layers.push(global.layerTemp);
        }
        global.layerTemp = [];
        var selProps = global.propArr;
        app.beginUndoGroup('Undo translate');
        for (var ic = 0; ic < selProps.length; ic++) {
          if (lista.selection.index === 0) {
            switch (app.language) {
              case Language.ENGLISH:
                you.findReplace(selProps[ic], 0, i);
                break;
              case Language.CHINESE:
                you.findReplace(selProps[ic], 1, i);
                break;
              case Language.JAPANESE:
                you.findReplace(selProps[ic], 2, i);
                break;
              default:
                break;
            }
          } else if (lista.selection.index === 1) {
            you.findReplace(selProps[ic], 0, i);
          } else if (lista.selection.index === 2) {
            you.findReplace(selProps[ic], 1, i);
          } else if (lista.selection.index === 3) {
            you.findReplace(selProps[ic], 2, i);
          } else if (lista.selection.index === 4) {
            you.findReplace(selProps[ic], 3, i);
          }
        }
        app.endUndoGroup();
        for (j = 1; j <= item.numLayers; j++) {
          item.layer(j).selected = false;
        }
      }
    }
    return [global.comps, global.layers, global.layerExps, wrongcomps];
  }

  function searchExpression(excludeByName, expFilters) {
    var allExps = ScanProjectForExpr(excludeByName);
    return allExps;
  }

  var winW = thisObj instanceof Panel ? thisObj : new Window('palette', 'Sp_translate v1.7', undefined, {
    resizeable: true
  });
  winW.margins = 10;
  var thisRes = 'Group{\n    orientation:\'column\',\n    alignChildren:[\'left\',\'fill\'],\n    list:DropDownList{preferredSize:[200,25],properties:{items:[\'' + loc(tsp.allComp) + '\',\'' + loc(tsp.activeComp) + '\',\'' + loc(tsp.selectedComp) + '\']}},\n    start:Button{text:\'' + loc(tsp.trans) + '\',preferredSize:[200,50]},\n    group:Group{\n      alignChildren:[\'left\',\'fill\'],\n      checka:Checkbox{text:\'' + loc(tsp.wrongExp) + '\',value:0},\n      lista:DropDownList{properties:{items:[\'Default\',\'English\',\'\u4E2D\u6587\',\'\u65E5\u672C\u8A9E\',\'Common\']},size:[60,25]}\n    }\n    groupa:Group{\n      alignChildren:[\'left\',\'fill\'],\n      checkb:Checkbox{text:\'' + loc(tsp.rightExp) + '\',value:0},\n      about:Button{text:\'' + loc(tsp.about) + '\',size:[70,25]},\n    }\n    groupb:Group{\n      alignChildren:[\'left\',\'fill\'],\n      checkc:Checkbox{text:\'' + loc(tsp.allExp) + '\',value:1},\n      checkFile:Checkbox{text:\'' + loc(tsp.log) + '\',size:[80,10]}\n    }\n    addbtn:Button{text:\'' + loc(tsp.editBtn) + '\',preferredSize:[200,30]}\n  }';
  try {
    var winTempA = winW.add(thisRes);
  } catch (err) {}
  winW.maximumSize.width = 220;
  winTempA.list.selection = 1;
  winTempA.group.lista.selection = 0;
  var list = winTempA.list;
  var start = winTempA.start;
  var group = winTempA.group;
  var checka = group.checka;
  var lista = group.lista;
  var groupa = winTempA.groupa;
  var checkb = groupa.checkb;
  var about = groupa.about;
  var groupb = winTempA.groupb;
  var checkc = groupb.checkc;
  var checkFile = groupb.checkFile;
  var addbtn = winTempA.addbtn;
  var outFile;

  lista.selection = 0;

  about.onClick = function () {
    var text = loc(tsp.str);
    var wina = new Window('palette', loc(tsp.about));
    var a = wina.add('edittext');
    a.text = text;
    var groupa = wina.add('group');
    var abtn = groupa.add('button', undefined, loc(tsp.ok));
    var bbtn = groupa.add('button', undefined, loc(tsp.cancel));

    a.onChange = a.onChanging = function () {
      this.text = text;
    };

    abtn.onClick = bbtn.onClick = function () {
      wina.close();
    };
    wina.center();
    wina.show();
  };

  checkFile.onClick = function () {
    if (checkFile.value === true) {
      outFile = File.saveDialog('', 'txt');
      if (outFile === null) checkFile.value = false;
    }
  };

  addbtn.onClick = function () {
    var www = new Window('palette', loc(tsp.editBtn), undefined, {
      resizeable: false
    });
    var gr1 = www.add('group');
    var stat1 = gr1.add('statictext', undefined, 'English   ');
    stat1.characters = 19;
    var stat2 = gr1.add('statictext', undefined, '中文 ');
    stat2.characters = 19;
    var stat3 = gr1.add('statictext', undefined, ' 日本語');
    stat3.characters = 19;
    var stat4 = gr1.add('statictext', undefined, '   Common');
    stat4.characters = 19;
    var gr2 = www.add('group');
    var edit1 = gr2.add('edittext', undefined);
    edit1.characters = 19;
    var edit2 = gr2.add('edittext', undefined);
    edit2.characters = 19;
    var edit3 = gr2.add('edittext', undefined);
    edit3.characters = 19;
    var edit4 = gr2.add('edittext', undefined);
    edit4.characters = 19;
    var addde = www.add('group');
    var adda = addde.add('button', undefined, loc(tsp.add));
    adda.size = [180, 40];
    var stackgroup = addde.add('group');
    stackgroup.orientation = 'stack';
    var addb = stackgroup.add('button', undefined, loc(tsp.edit));
    addb.size = [180, 40];
    addb.visible = true;
    var addchange = stackgroup.add('button', undefined, loc(tsp.change));
    addchange.size = [180, 40];
    addchange.visible = false;
    var addc = addde.add('button', undefined, loc(tsp.deleteE));
    addc.size = [180, 40];
    var stackgroupa = addde.add('group');
    stackgroupa.orientation = 'stack';
    var addd = stackgroupa.add('button', undefined, loc(tsp.about));
    addd.size = [180, 40];
    addd.visible = true;
    var cancel = stackgroupa.add('button', undefined, loc(tsp.cancel));
    cancel.size = [180, 40];
    cancel.visible = false;
    var myList = www.add('listbox', undefined, '', {
      numberOfColumns: 5,
      showHeaders: true,
      columnTitles: ['No', 'English', '中文', '日本語', 'Common'],
      columnWidths: [45, 165, 165, 165, 205]
    });
    for (var iii = 0; iii < you.hotWords.length; iii++) {
      var item = myList.add('item', iii + 1);
      for (var jjj = 0; jjj < you.hotWords[iii].length; jjj++) {
        if (you.hotWords[iii][jjj] !== 'None') {
          item.subItems[jjj].text = you.hotWords[iii][jjj];
        } else {
          item.subItems[jjj].text = '';
        }
      }
    }

    adda.onClick = function () {
      you.addNode(edit1.text, edit2.text, edit3.text, edit4.text);
      if (edit1.text !== '' || edit2.text !== '' || edit3.text !== '' || edit4.text !== '') {
        var item = myList.add('item', myList.children.length + 1);
        item.subItems[0].text = edit1.text;
        item.subItems[1].text = edit2.text;
        item.subItems[2].text = edit3.text;
        item.subItems[3].text = edit4.text;
      }
      edit1.text = '';
      edit2.text = '';
      edit3.text = '';
      edit4.text = '';
    };

    addb.onClick = function () {
      if (myList.selection instanceof Object) {
        adda.enabled = addc.enabled = false;
        cancel.visible = true;
        addd.visible = false;
        edit1.text = you.hotWords[myList.selection.index][0] !== 'None' ? you.hotWords[myList.selection.index][0] : '';
        edit2.text = you.hotWords[myList.selection.index][1] !== 'None' ? you.hotWords[myList.selection.index][1] : '';
        edit3.text = you.hotWords[myList.selection.index][2] !== 'None' ? you.hotWords[myList.selection.index][2] : '';
        edit4.text = you.hotWords[myList.selection.index][3] !== 'None' ? you.hotWords[myList.selection.index][3] : '';
        addchange.visible = true;
        addb.visible = false;
        myList.enabled = false;
      }
    };

    cancel.onClick = function () {
      adda.enabled = addc.enabled = true;
      addd.visible = addb.visible = true;
      cancel.visible = addchange.visible = false;
      edit1.text = '';
      edit2.text = '';
      edit3.text = '';
      edit4.text = '';
      myList.enabled = true;
    };

    addchange.onClick = function () {
      you.changeNode(myList.selection.index, edit1.text, edit2.text, edit3.text, edit4.text);
      adda.enabled = addc.enabled = true;
      cancel.visible = false;
      addd.visible = true;
      var creatindex = myList.selection.index;
      myList.remove(myList.items[creatindex]);
      var item = myList.add('item', creatindex + 1, creatindex);
      item.subItems[0].text = edit1.text;
      item.subItems[1].text = edit2.text;
      item.subItems[2].text = edit3.text;
      item.subItems[3].text = edit4.text;
      edit1.text = edit2.text = edit3.text = edit4.text = '';
      addb.visible = true;
      addchange.visible = false;
      myList.enabled = true;
    };

    addc.onClick = function () {
      if (myList.selection instanceof Object) {
        var wwww = new Window('palette', 'Alert', undefined);
        wwww.add('statictext', undefined, loc(tsp.sureDelete));
        var g = wwww.add('group');
        var yes = g.add('button', undefined, loc(tsp.ok), {
          name: 'ok'
        });
        yes.size = [60, 30];
        var no = g.add('button', undefined, loc(tsp.cancel), {
          name: 'cancel'
        });
        no.size = [60, 30];
        wwww.show();
        yes.onClick = function () {
          you.deleteNode(myList.selection.index);
          myList.remove(myList.items[myList.selection.index]);
          wwww.close();
        };
        no.onClick = function () {
          wwww.close();
        };
      }
    };

    addd.onClick = function () {
      var text = loc(tsp.addHelp);
      var winb = new Window('palette', 'About');
      var a = winb.add('edittext');
      a.text = text;
      var groupa = winb.add('group');
      var abtn = groupa.add('button', undefined, loc(tsp.ok));
      var bbtn = groupa.add('button', undefined, loc(tsp.cancel));

      a.onChange = a.onChanging = function () {
        this.text = text;
      };

      abtn.onClick = bbtn.onClick = function () {
        winb.close();
      };
      winb.center();
      winb.show();
    };

    www.center();
    www.show();
  };

  checka.onClick = function () {
    if (checka.value === true) {
      checkb.value = false;
      checkc.value = false;
    }
  };

  checkb.onClick = function () {
    if (checkb.value === true) {
      checka.value = false;
      checkc.value = false;
    }
  };

  checkc.onClick = function () {
    if (checkc.value === true) {
      checkb.value = false;
      checka.value = false;
    }
  };

  if (typeof expProps === 'undefined') {
    if (winW instanceof Window) {
      winW.center();
      winW.show();
    } else {
      winW.layout.layout(true);
    }
  } else {
    try {
      var wrongcomps = wrongcomps || [];
      var selProps = expProps;
      var i = -1;
      for (var ic = 0; ic < selProps.length; ic++) {
        switch (app.language) {
          case Language.ENGLISH:
            you.findReplace(selProps[ic], 0, i);
            break;
          case Language.CHINESE:
            you.findReplace(selProps[ic], 1, i);
            break;
          case Language.JAPANESE:
            you.findReplace(selProps[ic], 2, i);
            break;
          default:
            break;
        }
      }
      clearOutput();
      if (wrongcomps.length !== 0) {
        if (loc(tsp.trans) === 'Translate') {
          writeLn(wrongcomps.length + ' wrong expressions found,which can not be translated.');
        } else {
          writeLn('存在' + wrongcomps.length + '个不能被正确翻译的表达式');
        }
      } else {
        if (loc(tsp.trans) === 'Translate') {
          writeLn(selProps.length + ' wrong expressions were translated correctly.');
        } else {
          writeLn('存在' + selProps.length + '个已经被正确翻译的表达式');
        }
      }
    } catch (err) {}
  }

  start.onClick = function () {
    var ib;
    var allId = [];
    var compid = [];
    var excludeByName;
    if (list.selection.index === 1) {
      var thisCompnames = [];
      for (ib = 0; ib < app.project.items.length; ib++) {
        if (app.project.item(ib + 1) === app.project.activeItem && app.project.item(ib + 1) instanceof CompItem) {
          compid.push(ib + 1);
          thisCompnames.push(app.project.item(ib + 1).name);
        }
      }
      excludeByName = compid;
    }

    if (list.selection.index === 0) {
      for (ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1);
      }
      excludeByName = allId;
    }
    if (list.selection.index === 2) {
      var thisCompname = [];
      var tempId = [];
      for (ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1);
        for (var haha = 0; haha < app.project.selection.length; haha++) {
          if (app.project.item(ib + 1) === app.project.selection[haha] && app.project.item(ib + 1) instanceof CompItem) {
            tempId.add(ib + 1);
            thisCompname.push(app.project.item(ib + 1).name);
          }
        }
      }
      excludeByName = tempId;
    }
    var expFilters = [];
    var result = searchExpression(excludeByName, expFilters);
    clearOutput();
    if (checkFile.value === true) {
      var outString = '';
      outString += loc(tsp._1);
      outString += '\r----------------------------------------------------------------\r';
      outString += loc(tsp._2);
      var i;
      for (i = 0; i < result[3].length; i++) {
        outString += loc(tsp._3) + result[3][i].toString() + '\r';
        outString += loc(tsp._4) + app.project.item(result[3][i]).name.toString() + '\r';
      }
      outString += loc(tsp._5);
      outString += loc(tsp._6);
      if (result[0].length !== 0) {
        for (i = 0; i < result[0].length; i++) {
          outString += loc(tsp._7) + result[0][i].toString() + '\r';
          outString += loc(tsp._8) + app.project.item(result[0][i]).name.toString() + '\r';
          var thisComp = app.project.item(result[0][i]);
          var layerArray = result[1][i].toString();
          layerArray = layerArray.split(',');
          for (var j = 0; j < layerArray.length; j++) {
            var number = parseInt(layerArray[j].toString());
            var thisLayer = thisComp.layer(number);
            outString += loc(tsp._9) + layerArray[j].toString() + '\r';
            outString += loc(tsp._10) + thisLayer.name.toString() + '\r\r';
            var propertyArray = result[2][j].toString();
            propertyArray = propertyArray.split(',');
            for (var x = 0; x < propertyArray.length; x++) {
              outString += loc(tsp._11) + propertyArray[x].toString() + '\r';
            }
          }
        }
      }
      outFile.writee(outString);
      if (confirm(loc(tsp.openFile))) {
        outFile = outFile.fsName;
        outFile = encodeURI(outFile);
        outFile = String(outFile);
        system.callSystem('explorer  ' + decodeURI(outFile));
      }
      checkFile.value = false;
    } else {
      alert(loc(tsp.complete));
    }
  };
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$.global.UIParser = UIParser;
function UIParser(global) {
  var _ = global._ = function (selector) {
    if (_.isUI(selector.type)) {
      return _.extend([selector], _.proto);
    }
    return _.proto.find(selector);
  };
  _.global = global;

  _.root = {
    children: []
  };
  _.windows = _.root.children;
  _.extend = function (target, source) {
    for (var i in source) {
      target[i] = source[i];
    }return target;
  };
  _.dir = function (obj) {
    var str = '';
    for (var i in obj) {
      str += i + ' : ' + _typeof(obj[i]) + '\n';
    }return str;
  };
  _.removeWin = function (id) {
    for (var i = 0; i < _.windows.length; i++) {
      if (_.windows[i].id === id) _.windows.splice(i, 1);
    }
  };
  _.proto = {
    find: function find(selector, recursive) {
      var matchs = [];
      var elements = 'length' in this ? this : [_.root];
      if (!selector) return _.extend(elements, _.proto);

      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector);
        for (var i = 0; i < selectors.length; i++) {
          var match = elements;
          var process = _.parserSelector(selectors[i]);
          for (var j = 0; j < process.length; j++) {
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5]);
            } else {
              match = _.findElementsByProp(match, process[j][0], process[j][1], process[j][2]);
            }
          }
          matchs = _.merge(match, matchs);
        }
      } else if (typeof selector === 'function') {
        if (!recursive) recursive = 1;
        matchs = _.findElementsByFn(elements, selector, recursive);
      }

      return _.extend(matchs, _.proto);
    },
    filter: function filter(selector) {
      var matchs = [];
      var elements = 'length' in this ? this : [_.root];
      if (!selector) return _.extend(elements, _.proto);

      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector);
        for (var i = 0; i < selectors.length; i++) {
          var match = elements;
          var process = _.parserSelector(selectors[i]);
          for (var j = 0; j < process.length; j++) {
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5]);
            } else {
              match = _.findElementsByProp(match, process[j][0], process[j][1]);
            }
          }
          matchs = _.merge(match, matchs);
        }
      } else if (typeof selector === 'function') {
        matchs = _.filterElementsByFn(elements, selector);
      }

      return _.extend(matchs, _.proto);
    },
    style: function style(_style, target) {
      if (!target) target = this;
      for (var i = 0; i < target.length; i++) {
        for (var j in _style) {
          if (target[i].type === j) _.proto.style(_style[j], [target[i]]);else target[i][j] = _style[j];
        }
      }
    },
    each: function each(command) {
      for (var i = 0; i < this.length; i++) {
        command(this[i]);
      }
    },
    setAttr: function setAttr(prop, value) {
      this.each(function (e) {
        e[prop] = value;
      });
    },
    getAttr: function getAttr(prop) {
      if (this.length) return this[0][prop];
    },
    children: function children(selector) {
      return this.find(selector || '>*');
    },
    parent: function parent() {
      if (this.length > 0 && this[0].parent) return this[0].parent;else return _.extend([], _.proto);
    },
    on: function on(event, fn, useCapture) {
      this.each(function (e) {
        e.addEventListener(event, fn, useCapture);
      });
    },
    exe: function exe(fn, args) {
      this.each(function (e) {
        e[fn].apply(e, args);
      });
    },
    addUI: function addUI() {
      return _.addUI.apply(this[0], arguments);
    },
    first: function first() {
      return _.extend([this[0]], _.proto);
    },
    last: function last() {
      return _.extend([this[this.length - 1]], _.proto);
    },
    eq: function eq(index) {
      if (index < this.length && index >= 0) {
        return _.extend([this[index]], _.proto);
      } else {
        return _.extend([], _.proto);
      }
    },
    layout: function layout() {
      this.each(function (e) {
        _.layout(e);
      });
    },
    remove: function remove() {
      this.each(function (e) {
        e.parent.remove(e);
      });
    },
    empty: function empty() {
      this.children().remove();
    }
  };

  _.createUI = function (UIJson) {
    if (!UIJson) return;
    var ISPANEL = global instanceof Panel;
    if (ISPANEL) {
      var _newElement = _.addUI(UIJson, global);
      _.root.children.push(global);
      global.layout.layout(true);
      return _newElement;
    } else {
      return _.newWindow(UIJson);
    }
  };

  _.newWindow = function (UIJson) {
    if (!UIJson) return;
    var newWindows = [];
    for (var i in UIJson) {
      var json = UIJson[i];
      if (_.isWindow(UIJson[i].type)) {
        var s = json.type;
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
        var newWindow = _.root.children[_.root.children.length] = new Window(s);
        newWindows.push(newWindow);
        if (!json.id) newWindow.id = i;

        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue;
          newWindow[j] = json[j];
        }

        if (json.children) _.addUI(json.children, newWindow);
      }
    }
    return _.extend(newWindows, _.proto);
  };

  _.addUI = function (UIJson, parent) {
    if (!UIJson) return;
    if (!parent) parent = this;

    var newItem = [];
    for (var i in UIJson) {
      var json = UIJson[i];
      if (_.isElement(json.type)) {
        var s = json.type;
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
        var newElement = parent.add(s);
        if (!json.id) newElement.id = i;

        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue;
          newElement[j] = json[j];
        }
        newItem.push(newElement);

        if (_.isContainer(json.type) && json.children) arguments.callee(json.children, newElement);
      }
    }
    return _.extend(newItem, _.proto);
  };

  _.isWindow = function (type) {
    var winType = ['window', 'palette', 'dialog', 'Window', 'Palette', 'Dialog'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isContainer = function (type) {
    var winType = ['window', 'palette', 'dialog', 'group', 'panel', 'tabbedpanel', 'treeview', 'dropdownlist', 'listbox', 'listitem', 'tab', 'node', 'Window', 'Palette', 'Dialog', 'Group', 'Panel', 'TabbedPanel', 'Treeview', 'DropDownList', 'ListBox', 'ListItem', 'Tab', 'Node'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isElement = function (type) {
    var winType = ['panel', 'tabbedpanel', 'tab', 'group', 'button', 'checkbox', 'dropdownlist', 'edittext', 'flashplayer', 'iconbutton', 'image', 'item', 'listbox', 'listitem', 'progressbar', 'radiobutton', 'scrollbar', 'slider', 'statictext', 'treeview', 'tab', 'node', 'Panel', 'TabbedPanel', 'Tab', 'Group', 'Button', 'CheckBox', 'DropDownList', 'EditText', 'FlashPlayer', 'IconButton', 'Image', 'Item', 'ListBox', 'ListItem', 'ProgressBar', 'RadioButton', 'Scrollbar', 'Slider', 'StaticText', 'Treeview', 'Tab', 'Node'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isUI = function (type) {
    if (_.isWindow(type) || _.isElement(type)) return true;
    return false;
  };

  _.findElementsByProp = function (elements, prop, value, recursive) {
    var matchs = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].children) var atoms = elements[i].children;else if (elements[i].items) atoms = elements[i].items;else continue;
      var match = [];
      for (var j = 0; j < atoms.length; j++) {
        if (atoms[j][prop] && (value === '' || atoms[j][prop].toString() === value)) {
          match.push(atoms[j]);
        }
        if (recursive && (atoms[j].children || atoms[j].items)) {
          var temp = arguments.callee([atoms[j]], prop, value, 1);
          match = _.merge(temp, match);
        }
      }
      matchs = _.merge(match, matchs);
    }
    return matchs;
  };
  _.findElementsByFn = function (elements, fn, recursive) {
    var match = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].children) var atoms = elements[i].children;else if (elements[i].items) atoms = elements[i].items;else continue;
      for (var j = 0; j < atoms.length; j++) {
        if (fn(atoms[j])) match.push(atoms[j]);
        if (recursive && (atoms[j].children || atoms[j].items)) {
          var temp = arguments.callee(atoms[j].children, fn, 1);
          match = _.merge(temp, match);
        }
      }
    }
    return match;
  };
  _.filterElementByProp = function (elements, prop, value) {
    var matchs = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i][prop] && (value === '' || elements[i][prop].toString() === value)) {
        matchs.push(elements[i]);
      }
    }
    return matchs;
  };
  _.filterElementByFn = function (elements, fn) {
    var matchs = [];
    for (var i = 0; i < elements.length; i++) {
      if (fn(elements[i])) matchs.push(elements[i]);
    }
    return matchs;
  };
  _.formalSelector = function (selector) {
    return selector.replace(/[\s\]\)]\w*/g, '').replace(/[\#\.\[\:\=]+(?=[\#\.\[\]\,\:\=\>\*])/g, '').replace(/\*+\w*/g, '*').replace(/\,+\w*/g, ',').replace(/\>+\w*/g, '>').replace(/^\w*\,/g, '').split(/\,/g);
  };
  _.parserSelector = function (selector) {
    var sign, content, prop, value, func, param, doFind;
    var recursive = 1;
    var process = [];
    var parts = selector.replace(/(?=[\#\.\[\:\>\*])/g, '@').replace(/^\@/, '').split('@');

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '>') {
        recursive = 0;
        i++;
      }

      sign = parts[i][0];
      content = parts[i].substr(1);
      prop = value = func = param = '';
      doFind = 1;

      switch (sign) {
        case '*':
          prop = 'type';break;
        case '#':
          prop = 'id';value = content;break;
        case '.':
          prop = 'type';value = content;break;
        case '[':
          var p = content.split('=');
          prop = p[0];
          if (p.length === 2) value = p[1];
          break;
        case ':':
          var fn = content.split('(');
          func = fn[0];
          if (fn.length === 2) param = fn[1];
          doFind = 0;
          break;
      }
      process.push([prop, value, recursive, doFind, func, param]);
      recursive = 1;
    }

    return process;
  };
  _.merge = function (newArray, oldArray) {
    var temp = [];
    var b = 1;
    for (var i = 0; i < newArray.length; i++) {
      for (var j = 0; j < oldArray.length; j++) {
        if (newArray[i] === oldArray[j]) {
          b = 0;
          break;
        }
      }
      if (b) temp.push(newArray[i]);
    }
    return oldArray.concat(temp);
  };

  _.layout = function (e) {
    e.margins = 0;
    e.spacing = 5;
    if (e.align) {
      switch (e.align) {
        case 'fill':
        case 'fill_fill':
          e.alignment = ['fill', 'fill'];break;

        case 'center':
        case 'center_center':
          e.alignment = ['center', 'center'];break;

        case 'left_fill':
        case 'left':
          e.alignment = ['left', 'fill'];break;
        case 'center_fill':
          e.alignment = ['center', 'fill'];break;
        case 'right_fill':
        case 'right':
          e.alignment = ['right', 'fill'];break;

        case 'fill_top':
        case 'top':
          e.alignment = ['fill', 'top'];break;
        case 'fill_center':
          e.alignment = ['fill', 'center'];break;
        case 'fill_bottom':
        case 'bottom':
          e.alignment = ['fill', 'bottom'];break;

        case 'left_center':
          e.alignment = ['left', 'center'];break;
        case 'right_center':
          e.alignment = ['right', 'center'];break;
        case 'center_top':
          e.alignment = ['center', 'top'];break;
        case 'center_bottom':
          e.alignment = ['center', 'bottom'];break;

        case 'left_top':
          e.alignment = ['left', 'top'];break;
        case 'left_bottom':
          e.alignment = ['left', 'bottom'];break;
        case 'right_top':
          e.alignment = ['right', 'top'];break;
        case 'right_bottom':
          e.alignment = ['right', 'bottom'];break;
      }
    }
  };
  _.extend(_.windows, _.proto);

  _.JSON = {
    parse: function parse(strJSON) {
      return eval('(' + strJSON + ')');
    },
    stringify: function () {
      var toString = Object.prototype.toString;
      var isArray = Array.isArray || function (a) {
        return toString.call(a) === '[object Array]';
      };
      var escMap = { '"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
      var escFunc = function escFunc(m) {
        return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
      };
      var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
      return function stringify(value) {
        if (value == null) {
          return 'null';
        } else if (typeof value === 'number') {
          return isFinite(value) ? value.toString() : 'null';
        } else if (typeof value === 'boolean') {
          return value.toString();
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if (typeof value.toJSON === 'function') {
            return stringify(value.toJSON());
          } else if (isArray(value)) {
            var res = '[';
            for (var i = 0; i < value.length; i++) {
              res += (i ? ', ' : '') + stringify(value[i]);
            }return res + ']';
          } else if (toString.call(value) === '[object Object]') {
            var tmp = [];
            for (var k in value) {
              if (value.hasOwnProperty(k)) tmp.push(stringify(k) + ': ' + stringify(value[k]));
            }
            return '{' + tmp.join(', ') + '}';
          }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"';
      };
    }()
  };

  return _;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


sp.extend(sp, {
  settings: { en: 'Setting', ch: '设置' },
  groupName: { en: 'Group name :', ch: '组名 :' },
  elementName: { en: 'Element Name :', ch: '元素名 :' },
  changeName: { en: 'Rename item', ch: '重命名元素' },
  importPicture: { en: 'Import picture', ch: '导入图片' },
  importFile: { en: 'Import file', ch: '导入组' },
  exportFile: { en: 'Export file', ch: '导出组' },
  addGroup: { en: 'New group', ch: '新建组' },
  deleteGroup: { en: 'Remove group', ch: '删除组' },
  addElement: { en: 'New item', ch: '新建元素' },
  deleteElement: { en: 'Remove item', ch: '删除元素' },
  create: { en: 'New layer', ch: '生成层' },
  cover: { en: 'Cover item', ch: '覆盖元素' },
  isShow: { en: 'Show text', ch: '显示文字' },
  isAlert: { en: 'Deleting Alert', ch: '删除时警告' },
  isPrecomp: { en: 'Pre-compose', ch: '预合成' },
  isOffset: { en: 'Save material', ch: '存储素材' },
  isName: { en: 'Auto rename', ch: '自动取名' },
  isEffect: { en: 'Only property', ch: '仅生成效果' },
  cleanProperty: { en: 'Empty prop', ch: '清空属性组' },
  offsetKey: { en: 'Shift keyframe', ch: '关键帧偏移' },
  sureDelete: { en: 'Are you sure to delete it?', ch: '确认删除?' },
  helperScripts: { en: 'Help scripts', ch: '辅助脚本' },
  expressionTranslate: { en: 'Fix expression errors', ch: '表达式翻译' },
  script: { en: 'Sp_palette v1.0', ch: '形状层画板' },
  reloadGroup: { en: 'Reload previews of group', ch: '重载组内预览动画' },
  saveEachLayer: { en: 'Save every layer in active comp', ch: '自动存储每一层' },
  cutLength: { en: 'Cut layer length', ch: '裁剪层长度' },
  blankName: { en: 'Name should not be empty!', ch: '名字不应为空!' },
  existName: { en: 'Element with the same name exists already!', ch: '相同名字的元素已存在!' },
  overWritten: { en: 'File with the same name exists already!', ch: '相同名字的文件已存在!' },
  inputName: { en: 'Please input your name!', ch: '请输入名字!' },
  alertSpe: { en: 'There are special symbols in selectedLayers,please rename them first!', ch: '选中层名字有特殊符号,请首先重命名选中层!' },
  deleteFolder: { en: 'Empty temp folder', ch: '清空素材文件夹' },
  changeGroupName: { en: 'Change name of group', ch: '重命名选中组' },
  deleteOk: { en: 'Clean folder successfully!', ch: '清空文件夹完毕!' },
  yushe: { en: 'Preset Setting', ch: '预设设置' },
  jinOne: { en: 'Please select groups that will be created on selectedLayers', ch: '请选择在仅生成效果时要在选中层上生成的属性组' },
  jinTwo: { en: 'Please select groups that will be empty on selectedLayers before creating Properties', ch: '请选择在仅生成效果之前要清空的选中层的属性组' },
  isSureGroup: { en: 'What you are deleting is a Group.\rAre you sure?', ch: '你正在删除的是一个组.\r确定删除吗?' },
  isSureGroup2: { en: 'Repeat!\rWhat you are deleting is a Group.\rAre you sure?\r', ch: '重复!\r你正在删除的是一个组.\r确定删除吗?' },
  _1: { en: 'Mask', ch: '遮罩' },
  _2: { en: 'Effect', ch: '效果' },
  _3: { en: 'Transform', ch: '变换' },
  _4: { en: 'Material options', ch: '3D材质选项' },
  _5: { en: 'Layer styles', ch: '图层样式' },
  _6: { en: 'Shape content', ch: '形状层形状组' },
  _7: { en: 'Text animators', ch: '文字层动画器' },
  _8: { en: 'Light options', ch: '灯光选项' },
  _9: { en: 'Camera options', ch: '摄像机选项' },
  setName: { en: 'Please input the name.', ch: '请输入名字' },
  checkVersion: { en: 'Check version', ch: '检查更新' },
  newVersionFind: { en: 'New version found,please download the new version ', ch: '存在新版本,请下载最新版v' },
  newVersionNotFind: { en: 'No new version! v', ch: '已是最新版 v' },
  link: { en: 'Weibo', ch: '作者微博' },
  about: {
    en: 'Made by:smallpath\nE-mail:smallpath2013@gmail.com\nSource Code:\ngithub.com/smallpath/memory\n\nDoubleClick:generate new layers or properties on selected layers from selected element.\nRightClick:call the shortcut menu.\nCtrl/Alt+RightClick:save selected layers as a new element.\nShift+Rightclick:call the up and down window\n\nShortcutkey when script runs as Window:\nKey \'D\' or \'Delete\':delete selected element.\nKey \'F\': overlap selected element.\nKey \'Up\':drop up selected element.\nKey \'Down\':drop down selected element.',
    ch: '\u4F5C\u8005:\n    smallpath\n\u90AE\u7BB1:\n    smallpath2013@gmail.com\n\u6E90\u7801\u6258\u7BA1\u5730\u5740:\ngithub.com/smallpath/memory\n\n\u53F3\u952E\u70B9\u51FB:\u547C\u51FA\u53F3\u952E\u83DC\u5355.\n\u53CC\u51FB:\u4ECE\u9009\u4E2D\u5143\u7D20\u521B\u5EFA\u5C42\u6216\u521B\u5EFA\u6548\u679C.\nCtrl/Alt+\u53F3\u952E\u70B9\u51FB:\u4ECE\u9009\u4E2D\u7684\u5C42\u8BFB\u53D6\u5C42\u4FE1\u606F\u4EE5\u521B\u5EFA\u65B0\u5143\u7D20.\nShift+\u53F3\u952E:\u5524\u51FA\u79FB\u52A8\u5143\u7D20\u7684\u7A97\u53E3\n\n\u7A97\u53E3\u6A21\u5F0F\u8FD0\u884C\u811A\u672C\u65F6:\nD\u952E:\u5220\u9664\u9009\u4E2D\u5143\u7D20.\nF\u952E:\u8986\u76D6\u9009\u4E2D\u5143\u7D20.\n\u4E0A\u952E:\u4E0A\u79FB\u9009\u4E2D\u5143\u7D20.\n\u4E0B\u952E:\u4E0B\u79FB\u9009\u4E2D\u5143\u7D20.'
  },
  refresh: {
    en: 'Please run this script to refresh pictures only when your group has been created with wrong thumbnails(such as all black)\rIt will spent a lot of time.\rNew thumbnails will be created at the time of active comp,so set your comp\'s time first.',
    ch: '\u751F\u6210\u7EC4\u5185\u6240\u6709\u5143\u7D20\u7684\u9884\u89C8\u52A8\u753B:\n##\u8BF7\u7528\u672C\u529F\u80FD\u5BF9\u975E3.x\u7248\u672C\u4FDD\u5B58\u7684\u7EC4\u8FDB\u884C\u751F\u6210\u9884\u89C8\u52A8\u753B\u7684\u64CD\u4F5C:\n\n\u6B64\u529F\u80FD\u5C06\u751F\u6210\u7EC4\u5185\u6240\u6709\u5143\u7D20\u7684\u4E3B\u7F29\u7565\u56FE\u548C\u9884\u89C8\u52A8\u753B,\u5176\u4E2D\u4E3B\u7F29\u7565\u56FE\u4E3A\u5F53\u524D\u5408\u6210\u7684\u5F53\u524D\u65F6\u95F4\u70B9\u7684\u753B\u9762\n\n\u6CE8\u610F:\u6B64\u529F\u80FD\u5C06\u8017\u8D39\u5927\u91CF\u65F6\u95F4,\u811A\u672C\u4F1A\u5F39\u51FA\u56FE\u7247\u6587\u4EF6\u5939,\u4F60\u53EF\u4EE5\u6839\u636E\u5176\u4E2D\u7684\u56FE\u7247\u5224\u65AD\u9884\u89C8\u52A8\u753B\u7684\u751F\u6210\u8FDB\u5EA6\n'
  },
  auto: {
    en: 'This script helps you simplify you saving proccess\rIt will save every layer in active comp as a new element.',
    ch: '\u6279\u91CF\u5B58\u50A8\u529F\u80FD:\n\n\u8FD9\u4F1A\u5C06\u5F53\u524D\u5408\u6210\u4E2D\u6BCF\u4E00\u5C42\u90FD\u5206\u522B\u5B58\u50A8\u4E3A\u4E00\u4E2A\u65B0\u5143\u7D20.\n\n\u6B64\u529F\u80FD\u53EF\u4EE5\u5E2E\u52A9\u4F60\u5FEB\u901F\u5B58\u50A8\u65B0\u5143\u7D20,\u5341\u5206\u9002\u5408\u5B58\u50A8\u5927\u91CF\u7684MG\u5408\u6210\u5C42\n\u811A\u672C\u4F1A\u5F39\u51FA\u56FE\u7247\u6587\u4EF6\u5939,\u4F60\u53EF\u4EE5\u6839\u636E\u5176\u4E2D\u7684\u56FE\u7247\u6765\u5224\u65AD\u9884\u89C8\u52A8\u753B\u7684\u751F\u6210\u8FDB\u5EA6\n' },
  cutLengthTwo: {
    en: 'This script will cut every layer in current comp, related to opacity for common layer and content length for comp layer.',
    ch: '此功能将会裁剪当前合成中每一层的长度,根据普通层的透明度与合成层内容的长度.'
  },
  output: { en: 'Export groups', ch: '批量导出组' },
  ok: { en: 'Ok', ch: '确定' },
  cancel: { en: 'Cancel', ch: '取消' },
  complete: { en: 'Complete!', ch: '导出完成!' },
  showText: { en: 'Show text', ch: '显示文字' },
  ui1: { en: 'The newer UI', ch: '新界面' },
  ui2: { en: 'The older UI', ch: '旧界面' },
  sys: { en: 'Script find that Sp_memory v1.4 has been used the first time.\rPlease select the UI type,Yes for new UI and No for previous UI.', ch: '脚本检测到Sp_memory v1.4首次被使用.\r请选择脚本界面,Yes为新界面,No为旧界面.' },
  uiC: { en: 'Please restart script,ui will be changed.', ch: '界面已更新,请重启脚本' },
  from: { en: 'Range is 0.', ch: '元素下标范围为:0' },
  ud: { en: 'Up and down', ch: '上下移动选中元素' },
  up: { en: 'Up', ch: '上移' },
  down: { en: 'Down', ch: '下移' },
  jmp: { en: 'Jump', ch: '跳转' },
  coverChange: { en: 'Update thumb when cover', ch: '覆盖时更新缩略图' },
  folderName: { en: 'The folder name of collect feature:', ch: '收集生成层时的工程栏文件夹名:' },
  effectName: { en: 'The group name that enable Only property :', ch: '默认开启仅生成效果的组名:' },
  limitText: { en: 'Limit the text for UI', ch: '限制主窗口界面的文字长度' },
  scriptSetting: { en: 'Setting', ch: '设置' },
  settingPre: { en: 'Preference', ch: '预设' },
  thumbType: { en: 'Enable new type of thumb', ch: '缩略图包含合成栏图层轮廓' },
  addModule: { en: 'New module', ch: '新建模块' },
  deleteModule: { en: 'Remove module', ch: '删除模块' },
  deleteModuleAlert: {
    en: 'Dangerous!\r\nYou are deleting a module!\r\nAll groups in this module will be removed!\r\nDo you really want to remove this module?',
    ch: '警告!\r\n你正在删除一个模块!\r\n所有包含在此模块中的组都将被删除!\r\n你想要继续删除吗?'
  },
  addAlert: { en: 'Repeart:\r\n', ch: '重复:\r\n' },
  move: { en: 'Cut selected group to other module', ch: '剪切选中组到其他模块' },
  editModule: { en: 'Move module or rename module', ch: '改变模块顺序或重命名模块' },
  changeModuleName: { en: 'Change module name', ch: '重命名选中模块' },
  moduleHelpTip: { en: "press key 'Up' and 'Down can move the selected module' ", ch: '方向上下键可移动选中模块' },
  quit: { en: 'Quit', ch: '退出' },
  selectGroupFirst: { en: 'Please select a group first!', ch: '请先选中一个组!' },
  selectModuleFirst: { en: 'Please select a module first!', ch: '请先选中一个模块!' },
  frameSecondText: { en: 'The milliseconds length of frame continues when preview:', ch: '预览时一张图片持续的毫秒数:' },
  frameNumText: { en: 'The number of picture sequence generated for preview', ch: '生成供预览的图片序列时图片的数量:' },
  reloadNeedFrames: {
    en: "Please input the max frames which will be used to correct the duration of Preview.Keep blank if you don't what this feature",
    ch: '请输入最大帧数,这将被用来使预览动画的时间范围更加准确\r\n不输入则将不进行校准'
  },
  needComp: { en: 'Please select a comp first', ch: '脚本需要一个合成,当前合成不存在!' },
  previewAll: { en: 'Preview all', ch: '预览全部' },
  previewSelected: { en: 'Preview selected', ch: '预览选中' },
  needElement: { en: 'Please select a element in the group', ch: '组内元素未被选中,请首先选中一个元素' },
  needElements: { en: 'Please select at least one element in the group', ch: '组内元素未被选中,请至少选中一个元素' },
  needLayers: { en: 'Please select at least one layer in the current comp', ch: '请选中至少一个层' },
  needModule: { en: 'Please create a module first', ch: '请先新建一个模块' },
  isSavePreview: { en: 'Save preview', ch: '存储预览' },
  searchWindow: { en: 'Search', ch: '搜索' },
  getReport: { en: 'Get report', ch: '生成报告' },
  creatingReport: { en: 'Creating cost: ', ch: '生成层耗时: ' },
  creatingProcessTitle: { en: 'Now generating...', ch: '少女祈祷中...' },
  creatingProcessingPrefix: { en: 'Processing the ', ch: '正在生成第 ' },
  creatingProcessAfter: { en: ' layer', ch: ' 层' },
  savingReport: { en: 'Saving cost: ', ch: '总存储耗时: ' },
  savingProcessTitle: { en: 'Now saving...', ch: '少女祈祷中...' },
  savingProcessingPrefix: { en: 'Processing the ', ch: '正在存储第 ' },
  savingProcessAfter: { en: ' layer', ch: ' 层' },
  second: { en: ' second', ch: ' 秒' },
  previewTitle: { en: 'Save preview', ch: '少女祈祷中...' },
  previewPrefix: { en: 'Saving preview: ', ch: '正在存储预览图片: ' },
  previewTime: { en: 'Saving cost: ', ch: '存储预览耗时: ' },
  searchButton: { en: 'search', ch: '搜索' },
  searchText: { en: 'input name', ch: '输入元素名称' },
  setRatioText: { en: 'notify the scale of UI for high-DPI windows', ch: '设置主界面windows放大比例' },
  setRatioHelptip: {
    en: 'AE scriptUI may be scaled wrong in high-DPI windows from CC2013 to CC2015.0',
    ch: 'windows文字缩放比例大于1时, AE脚本界面会自动放大, 导致本脚本界面越界'
  },
  setRatioWarning: {
    en: 'Please only change it when your text ratio does not equal to 1. Restart script to make sense',
    ch: '请仅当你的windows文字缩放比例不为1且本脚本界面越界的情况下, 才修改此参数, 重启脚本后生效'
  },
  saveWorkarea: {
    en: 'Workarea',
    ch: '预览工作区'
  },
  tryVersionFind: {
    en: 'It seems that you are using the beta version which is not released yet. v',
    ch: '未发现新版本, 你正在使用尚未发布的试用版 v'
  },
  shouldUpdateScript: {
    en: 'Would you like to upgrade to new version now?\r\n it will cost some time while ae will not response\r\n',
    ch: '现在开始更新新版本吗?\r\n\r\n脚本大小为300KB, 下载时AE会停止响应数十秒时间.\r\n选否则可以选择通过浏览器下载'
  },
  shouldDownloadScript: {
    en: 'Would you like to download new version now?',
    ch: '是否通过浏览器自行下载最新版本?\r\n打开网页后右键另存为脚本文件即可'
  },
  downloaded: {
    en: 'Update success! To make it work, just restart script',
    ch: '升级成功, 请重启脚本'
  },
  generalOption: {
    en: 'General',
    ch: '一般选项'
  },
  otherOption: {
    en: 'Other',
    ch: '其他'
  },
  sourceCode: {
    en: 'Source Code',
    ch: '脚本源码'
  },
  addIssue: {
    en: 'Report bug',
    ch: '上报错误'
  },
  issueDesc: {
    en: 'Notice that error log is in Sp_memory/tempFile/error.txt',
    ch: '核心错误日志在Sp_memory/tempFile/error.txt当中, 这可以帮助作者定位错误\r\n\r\n你可以在Github或贴吧中报告错误, 在Github上报的错误将会被优先解决\r\n\r\n选择"Yes"前往Github, 选择"No"前往贴吧'
  },
  checkVersionOnStartupText: {
    en: 'Check version on startup',
    ch: '脚本启动时检查更新'
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  progressFactory: __webpack_require__(19),
  previewProgress: __webpack_require__(2),
  settingWindow: __webpack_require__(0),
  fns: __webpack_require__(21)
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mvvm = __webpack_require__(20);

var nameBlackList = ['win', 'gv', 'isOutside', 'previewHelper', 'isLoopPreview', 'droplist', 'parentDroplist', 'menu'];

function watch(name, oldValue, newValue) {
  if (typeof oldValue === 'function') {
    return oldValue;
  } else if (typeof newValue === 'boolean') {
    var settingName = name.replace('Value', '');

    if ($.global.sp.haveSetting(settingName)) {
      $.global.sp.saveSetting(settingName, newValue);
      return newValue;
    } else {
      return oldValue;
    }
  } else {
    return newValue;
  }
}

module.exports = function (obj) {
  return mvvm.observer(obj, watch, nameBlackList);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  __webpack_require__(17);

  sp.extend(sp, {
    forEach: function forEach(xml, callback, context) {
      if (!(xml instanceof XML)) return;
      var i, len;
      for (i = 0, len = xml.children().length(); i < len; i++) {
        if (callback.call(context, xml.child(i), i, xml) === false) {
          break;
        }
      }
    }
  });

  String.prototype.trim = String.prototype.trim || function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };

  Array.prototype.includes = function (value) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] === value) {
        return true;
      }
    }
    return false;
  };

  Array.prototype.forEach = function (callback, context) {
    if (Object.prototype.toString.call(this) === '[object Array]') {
      var i, len;
      for (i = 0, len = this.length; i < len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break;
          }
        }
      }
    }
  };

  Error.prototype.print = Error.prototype.print || function () {
    return 'Line #' + this.line.toString() + '\r\n' + this.toString();
  };

  Error.prototype.printc = Error.prototype.printc || function () {
    cout << '\n---------';
    cout << this.print();
    cout << '---------\n';
  };

  Error.prototype.printa = Error.prototype.printa || function () {
    this.print() << cout;
  };

  File.prototype.writee = function (str) {
    this.open('w');
    this.write(str);
    this.close();
  };

  File.prototype.readd = function () {
    this.open('r');
    var temp = this.read();
    this.close();
    return temp;
  };

  Array.prototype.pushh = function (str) {
    this.push(str);
    return this;
  };

  sp.deleteThisFolder = function (folder) {
    var waitClFile = folder.getFiles();
    for (var i = 0; i < waitClFile.length; i++) {
      if (waitClFile[i] instanceof Folder) {
        sp.deleteThisFolder(waitClFile[i]);
        waitClFile[i].remove();
      } else {
        waitClFile[i].remove();
      }
    }
  };
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var keyNameArr = [];
  var valueArr = [];

  for (var i = 1; i <= 9; i++) {
    keyNameArr.push('_1_' + i);
    if (i === 1 || i === 2 || i === 5) {
      valueArr.push('1');
    } else {
      valueArr.push('0');
    }
  }

  for (i = 1; i <= 9; i++) {
    keyNameArr.push('_2_' + i);
    valueArr.push('0');
  }

  keyNameArr.pushh('thisSelection').pushh('limitText').pushh('thumbType').pushh('winLocation').pushh('winSize').pushh('coverChange').pushh('folderName').pushh('effectName').pushh('deleteAlert').pushh('preCompose').pushh('saveMaterial').pushh('autoName').pushh('onlyEffect').pushh('cleanGroup').pushh('offsetKeyframe').pushh('language').pushh('showThumb').pushh('parentSelection').pushh('frameSecond').pushh('frameNum').pushh('savePreview').pushh('gridViewScale').pushh('saveWorkarea').pushh('checkVersionOnStartup');

  valueArr.pushh('1').pushh('true').pushh('false').pushh('200,500').pushh('300,500').pushh('false').pushh('Sp_memory Folder').pushh('Effects,Effect,effect,effects,特效,效果').pushh('true').pushh('false').pushh('true').pushh('true').pushh('false').pushh('false').pushh('false').pushh('ch').pushh('true').pushh('0').pushh('33').pushh('30').pushh('true').pushh('1').pushh('false').pushh('false');

  keyNameArr.forEach(function (item, index) {
    var value = valueArr[index];
    if (sp.haveSetting(item) === false) sp.saveSetting(item, value);
  });

  sp.deleteAlertValue = true;

  sp.showThumbValue = sp.getSettingAsBool('showThumb');
  sp.preComposeValue = sp.getSettingAsBool('preCompose');
  sp.saveMaterialValue = sp.getSettingAsBool('saveMaterial');
  sp.autoNameValue = sp.getSettingAsBool('autoName');
  sp.onlyEffectValue = sp.getSettingAsBool('onlyEffect');
  sp.cleanGroupValue = sp.getSettingAsBool('cleanGroup');
  sp.offsetKeyframeValue = sp.getSettingAsBool('offsetKeyframe');
  sp.savePreviewValue = sp.getSettingAsBool('savePreview');
  sp.saveWorkareaValue = sp.getSettingAsBool('saveWorkarea');

  sp.thumbTypeValue = sp.getSettingAsBool('thumbType');
  sp.coverChangeValue = sp.getSettingAsBool('coverChange');

  sp.frameSecond = parseInt(sp.getSetting('frameSecond'));
  sp.frameNum = parseInt(sp.getSetting('frameNum'));
  sp.gridViewScale = parseFloat(sp.getSetting('gridViewScale'));
  sp.checkVersionOnStartupValue = sp.getSettingAsBool('checkVersionOnStartup');

  !sp.scriptFolder.exists && sp.scriptFolder.create();
  !sp.roamingFolder.exists && sp.roamingFolder.create();
  !sp.materialFolder.exists && sp.materialFolder.create();

  var loc = function loc(string) {
    if (sp.lang === 0) {
      sp.lang = sp.getSetting('language');

      if (sp.isForceEnglish()) {
        sp.lang = 'en';
      }
    }
    return string[sp.lang];
  };

  $.global.loc = loc;

  sp.extend(sp, {
    beyondCS6: true,
    versionUpdateInfo: {
      ch: '\u5C42\u5B58\u50A8\u811A\u672CSp_Memory ' + "3.1.0" + ' @\u79CB\u98CE_\u5C0F\u5F84\n\n>> \u4F18\u5316\n- \u66F4\u6362\u6253\u5305\u5DE5\u5177\u4EE5\u63D0\u4F9B\u76F4\u89C2\u7684\u62A5\u9519\u5B9A\u4F4D\n- \u652F\u6301\u5B58\u50A8\u89C6\u9891, \u53BB\u9664\u7D20\u6750\u7684\u5927\u5C0F\u9650\u5236\n- \u751F\u6210\u5C42\u8FDB\u5EA6\u6761\n- \u5B58\u50A8\u5C42\u8FDB\u5EA6\u6761\n- \u8FDB\u5EA6\u6761\u663E\u793A\u811A\u672C\u8017\u65F6\n- \u5B58\u50A8\u9884\u89C8\u8FDB\u5EA6\u6761\n- \u4F18\u5316\u9884\u89C8CPU\u5360\u7528\n- \u751F\u6210\u5355\u4E2A\u9884\u5408\u6210\u65F6\u76F4\u63A5\u62C9\u4F38\u81F3\u5F53\u524D\u5408\u6210\u5927\u5C0F\n- \u589E\u52A0\u5141\u8BB8\u622A\u53D6\u5DE5\u4F5C\u533A\u9884\u89C8\u7684\u68C0\u6D4B\u6846\n- \u4FEE\u590D\u68C0\u67E5\u66F4\u65B0\u529F\u80FD\n- \u589E\u52A0\u81EA\u52A8\u66F4\u65B0\u529F\u80FD\n- \u589E\u52A0windows\u7F29\u653E\u6BD4\u4F8B\u53C2\u6570\n\n>> \u6F0F\u6D1E\u4FEE\u590D\n- \u4FEE\u590D\u97F3\u9891\u5C42\u5173\u952E\u5E27\u672A\u751F\u6210\u7684\u95EE\u9898\n- \u4FEE\u590Dwindows\u7F29\u653E\u6BD4\u4F8B\u4E0D\u4E3A1\u65F6\u7684\u754C\u9762\u8D8A\u754C\u95EE\u9898\n- \u4FEE\u590D\u754C\u9762\u4E2D\u4E00\u4E9B\u7279\u6B8A\u6587\u5B57\u7684\u9519\u4F4D\u95EE\u9898\n- \u4FEE\u590Dwindows\u7981\u6B62\u5B57\u7B26\u5BFC\u81F4\u9884\u89C8\u5B58\u50A8\u5931\u8D25\u7684\u95EE\u9898\n- \u4FEE\u590D\u6700\u5C0F\u5316\u65F6\u5173\u6389\u811A\u672C\u5BFC\u81F4\u7684\u811A\u672C\u5927\u5C0F\u5F52\u96F6\u7684\u95EE\u9898\n- \u4FEE\u590Dwindows\u7279\u6B8A\u5B57\u7B26\u4E32\u5BFC\u81F4\u7684\u6A21\u5757,\u7EC4\u4EE5\u53CA\u5143\u7D20\u751F\u6210\u5931\u8D25\u7684\u95EE\u9898\n- \u4FEE\u590Dmac CC2017\u4E2D\u8868\u8FBE\u5F0F\u7FFB\u8BD1\u65E0\u6CD5\u4F7F\u7528\u7684\u95EE\u9898\n- \u4FEE\u590DsetInterpolationTypeAtKey\u7684\u5173\u952E\u5E27\u751F\u6210\u62A5\u9519\n- \u4FEE\u590D\u975E1080p\u7684\u53F3\u952E\u83DC\u5355\u8D8A\u754C\u7684\u95EE\u9898\n',
      en: 'Sp_memory ' + "3.1.0" + ' @smallpath\n                    \nNew Feature:\n1. Move to new pack tool to provide useful error stack trace\n2. Add support to media material layer and remove the size limit of any material\n3. Add progress bar to creating and saving process, together with saving previews\n4. Add check box to support saving previews in workarea\n5. Add support for windows font scale ratio to solve problem on AE CC2015\n6. Fit to comp when only one comp layer is generated\n7. Add auto updating feature and checkbox for starting checking\n8. Optimize cpu rank while previewing          \n'
    }
  });

  if (sp.haveSetting('version') === false || sp.getSetting('version') < sp.version) {
    alert(loc(sp.versionUpdateInfo));
  }
  sp.saveSetting('version', sp.version);
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var request = __webpack_require__(18);

module.exports = function () {
  var sp = function sp() {
    return new sp.prototype.init();
  };

  sp.prototype = {

    scriptName: 'Sp_memory',
    scriptVersion: "3.1.0",
    version: "3.1.0",
    slash: '/',

    setting: app.settings,
    inXml: null,

    isCC2015: !!(app.version.indexOf('13.5') !== -1 || app.version.indexOf('13.6') !== -1 || app.version.indexOf('13.7') !== -1 || app.version.indexOf('13.8') !== -1 || app.version.indexOf('14') !== -1 || app.version.indexOf('15') !== -1 || app.version.indexOf('16') !== -1),

    ui: 1,
    lang: 0,

    sourceCodeLink: 'https://github.com/smallpath/memory',
    githubIssue: 'https://github.com/smallpath/memory/issues',
    issueLink: 'https://tieba.baidu.com/p/4462854806',
    checkVersionLink: 'https://api.github.com/repos/smallpath/memory/git/refs/tags',
    downloadLinkPrefix: 'https://raw.githubusercontent.com/smallpath/memory/v',
    downloadLinkSuffix: '/dist/Sp_memory.jsx',
    weiboLink: 'http://weibo.com/u/3893928357',

    noImage: '\x89PNG\r\n\x1A\n\0\0\0\rIHDR\0\0\0d\0\0\0<\b\x06\0\0\0\x90?\x1F\xCE\0\0\t/IDATx\x9C\xED\x9BiL\x13]\x17\xC7\xFF\xED\xB0\xB4u\x01,QpA\x94\xB4\xFAA\x89J\t\xA8X5b\x1E\x8D1~0\xD1D\xFC 1\xA81FI\x8C\x9A(\x89\x8D\x0B.\x89!j\x88\xB2\x18\x17\xF0\x93Jp%\x1A\xC5\x88\x80\xDA\xD4\x05\x85Z!\x80\x82\x16D,\xB6,-]8\xCF\x07_&\x8E-L\xCD\xD3\xF7y\xE7\xD5\xF9%7\xE9\x9C{\xEE\x99\xE5?w\xEE\x9Ds\xA7\x12\0\x04\x11\xC1 \xFD_\x1F\x80\b\x17Q\x10\x81!\n"0DA\x04\x86(\x88\xC0\x10\x05\x11\x18\xA2 \x02C\x14D`\x88\x82\b\fQ\x10\x81\x11\xC4\xE7 \x95J1z\xF4h\x84\x84\x84x\xD5\x11\x11\\.\x17\xACV+\x88\xFE\xCC\f\x8CD"\x01\x000\f\x03\xB9\\\x8E\xD0\xD0PH\xA5\xDE\xF7\xB9\xD3\xE9\x84\xCDf\xC3\xC0\xC0\xC0\xB0\xF1x\x05\x19=z4222\x10\x17\x17\x87\xFE\xFE~N\x9D\xCB\xE5BSS\x13\n\x0B\x0B\xE1t:\x7F\xE5<~+\xA4R)"""\x90\x92\x92\x82\xE4\xE4d\xC8d2N}hh(\x1A\x1B\x1BQPP\x80o\xDF\xBE\r\x1B\x8BW\x10\xB9\\\x8E\xA4\xA4$8\x1C\x0E\x98L&N\x9D\xDB\xEDF[[\x1B\xAF\xEA\xBF;\x83O\n\x8B\xC5\x82\xF7\xEF\xDF#44\x94S\xAF\xD1h\x90\x9C\x9C\x8C\xE2\xE2b^A\x80\xEF\xD9\xDE!Ktt4\x15\x15\x15\xD1\xFA\xF5\xEB\x87\xF5\x13\xCB\xD0e\xFD\xFA\xF5TTTD\xD1\xD1\xD1\xBC\xBE\xE2\xA0.0DA\x04\x06\xAF \x83\xCFG\xB7\xDB\xFDo\x1C\xCFo\x89\xDB\xED\x86\xCB\xE5\xF2k&\xCA+\x88\xD3\xE9\x84\xC9dBGGG@\x0E\xEEO\xA4\xA3\xA3\x03&\x93\xC9\xAF\x99\xA8\x04<K\xB8\x12\x89\x04\xC1\xC1\xC1\xF0x<\xF0x<\x81:\xC6?\n\x86a\xC00\x8C_\xBD\x84W\x10\x91\x7F\x17qP\x17\x18\xA2 \x02C\x14D`\xF0\xA6N\xFC%66\x16\x1F?~\xF4\x9A\x1EO\x9B6\r2\x99\f555\x1C{RR\x12\xD2\xD2\xD2 \x95JQRR\x82\xF2\xF2\xF2!cGEEA\xADV\xA3\xA2\xA2\x02\x000n\xDC8X\xADV8\x1C\x0E/\xDFQ\xA3F!((\b]]]^u\x87\x0F\x1FFnn.\xCCf\xF3\x90\xFB\n\x0B\x0B\xC3\xF6\xED\xDB1a\xC2\x04\xB4\xB5\xB5\xE1\xE4\xC9\x93\x9Ct\xC7\xDC\xB9s\x11\x1E\x1E\xCEic2\x99\xD0\xDC\xDC<d\xCC_% \xE9\x81\xA2\xA2"\xBA|\xF9\xB2\x97\xBD\xB4\xB4\x94***\xD8m\x86a\xE8\xC6\x8D\x1Bd\xB7\xDB\xA9\xBD\xBD\x9D\xCCf3\xF5\xF7\xF7SEE\x05\x8D\x1C9\xD2g\xEC\xEC\xECljmme\xB7sss)\'\'\xC7\xA7\xEF\xC5\x8B\x17\xE9\xD0\xA1C^v\x86a\xA8\xA9\xA9\x89\xF2\xF3\xF3\x87<\x87={\xF6\x90\xD9l&\x87\xC3Af\xB3\x99\xFA\xFA\xFA\xA8\xA3\xA3\x83rssY\x9F\xB7o\xDF\xD2\xCF\\\xBAt)`i\x96\x80=\xB2\xFA\xFA\xFA\xB0j\xD5*\xA4\xA7\xA7s\xECn\xB7\x9B3\xFF\xBEr\xE5\n\xB4Z-rrr\x10\x13\x13\x83I\x93&A\xA7\xD3A\xADV\xE3\xEE\xDD\xBBC\xC6w\xB9\\\xECo\xA5R\x89\xD4\xD4T/\x1F\x86a0w\xEE\\DGG{\xD5m\xDA\xB4\t\xB1\xB1\xB1\x987o\x9E\xCF\xF8\x1B6l@VV\x16>~\xFC\x88\xA5K\x97b\xFC\xF8\xF1\xD0h4\xD0\xEB\xF5\xD8\xB8q#\x8A\x8A\x8A\0|\x7F/\xBBy\xF3&\xB4Z-[\xF6\xED\xDB7\xFC\xC5\xF9E\x02\xA2l^^\x1E\xD9\xEDvjmm\xA5\x98\x98\x18\xD6~\xF5\xEAU\xBA\x7F\xFF>\x01\xA0\xF8\xF8x\xEA\xE9\xE9!\x9DN\xE7\xD5>##\x83\xFA\xFA\xFA|&1\xB3\xB3\xB3\xA9\xA9\xA9\x89\xDD.++#\xB7\xDBMiii\x1C\xBF\xCC\xCCL\x1A\x18\x18\xA0\xD2\xD2R\xAF\x18\xE5\xE5\xE5T__Ov\xBB\x9D\x96/_\xCE\xA9\x93H$T[[K\x06\x83\x81\x18\x86\xF1j{\xE2\xC4\tJHH \0TSSC\x05\x05\x05\x01\xEB\x11?\x97\x80\x0E\xEAF\xA3\x11N\xA7\x13W\xAE\\a\x17n~d\xDB\xB6m0\x9B\xCD8p\xE0\x80W]AA\x01jkk\xB1z\xF5j\xDE\xFDDFF\xA2\xBB\xBB\x1B\x1B7n\xE4\xD8\xD7\xACY\x03\x9B\xCD\x86\xB0\xB00\x8E=**\ns\xE6\xCC\xC1\xE5\xCB\x97a2\x99\xB0u\xEBVN\xBDV\xAB\x85J\xA5\xC2\xA1C\x87|\xBE\xFC\xEE\xDC\xB9\x13\xCF\x9F?\xE7=\xAE@\x10PA\\.\x17v\xEC\xD8\x81\xE9\xD3\xA7\xE3\xCC\x993^\xF5QQQhnn\x1Er\xFD\xA4\xB1\xB1\x11J\xA5\x92w?c\xC7\x8EEyy94\x1A\r\xE2\xE2\xE2\0\0\x89\x89\x89\x88\x8F\x8FGuu5"##9\xFE:\x9D\x0E\xBD\xBD\xBD8v\xEC\x18\xAA\xAA\xAA\xA0\xD1h8\x8BH\x8B\x17/\x86\xC5b\xC1\xF5\xEB\xD7\xFD:\xCF\xB5k\xD7\xE2\xEB\xD7\xAFl9{\xF6\xAC_\xED\xFC!`\xB3\xACAn\xDD\xBA\x85\x0B\x17. ==\xDDkL\x18L\x1F\f\x85\xCB\xE5Bpp\xF0\xB0\xF1CBB\x10\x11\x11\x81\xE3\xC7\x8FC\xA5R\xE1\xE0\xC1\x83X\xB7n\x1D\xF6\xEE\xDD\x0B\xA3\xD1\x88\xABW\xAF\xE2\xC8\x91#\x9C6\xF3\xE6\xCD\x83\xDB\xEDFqq1\x14\n\x05\x94J%v\xEF\xDE\xCD\xF6\xD4\xC1\xD4\xD0\xCFi\x8D\xDA\xDAZv\xE9Z&\x93a\xD9\xB2e\0\xBE\xDF8eee\xAC\xDF\x9D;wx\xAE\x8A\xFF\xFCW\xDEC233\xF1\xFA\xF5k\x9C8q\x82s\'Z,\x16L\x9E<y\xC8v\x93\'O\x86\xC5b\x196vll,\xA4R)\xDE\xBD{\x87\xBBw\xEFb\xC1\x82\x05\b\x0F\x0F\xC7\xFC\xF9\xF3q\xFD\xFAu<y\xF2\x04#G\x8Ed{\xC9\x8A\x15+\xA0R\xA9\xE0v\xBB1{\xF6lL\x9B6\r\x16\x8B\x05\x7F\xFD\xF5\x17\x1B\xF3\xF1\xE3\xC7\x18;v,\xB4Z-g_\xF7\xEE\xDD\xC3\xC3\x87\x0F\xD1\xD2\xD2\x02\xA5R\x89/_\xBE\0\0\f\x06\x03\xF6\xEE\xDD\xCB\x96\xCA\xCA\xCA_\xBEF\xC3\x11\xB0A\xFD\xE9\xD3\xA7\xECvTT\x14}\xF8\xF0\x81\xACV+;\xA8/Y\xB2\x84\xECv;m\xDE\xBC\xD9\xAB}JJ\n\xD9l6\xCA\xCC\xCC\x1CvPOOO\xA7\xF6\xF6v\x02@\n\x85\x82>\x7F\xFELF\xA3\x91ZZZ(88\x98d2\x19uwwSjj*\x01\xA0[\xB7n\xD1\xCB\x97/9\xF1\xB6l\xD9B===\xA4V\xAB\t\xF8>%\xAE\xAF\xAF\xA7G\x8F\x1E\xF9<\xB7\x92\x92\x12\xAA\xAB\xAB\xFB\xFF\x1B\xD4\x7F\xA4\xBD\xBD\x1D\xBBv\xED\xE2\xD8\x1E<x\0\x83\xC1\0\x9DN\x87\xB4\xB44\xD6\xBEh\xD1"\x9C?\x7F\x1E\xEF\xDF\xBF\xC7\xA9S\xA7\x86\x8D;c\xC6\f\xF6N\xED\xEB\xEBCee%T*\x15***\xE0r\xB9\xE0p8`\xB1X\xA0\xD1h\xA0P(\x90\x90\x90\x80\xAA\xAA*N\x8C\xFC\xFC|\xB4\xB5\xB5\xB1\xD3U\x8F\xC7\x83s\xE7\xCE!11\x11\xA5\xA5\xA5\x90\xCB\xE5\xAC\xEF\xFE\xFD\xFB\x91\x9A\x9A\x8A\xDB\xB7o\xB3\xB6\x90\x90\x10\x84\x87\x87\xB3\xE5\xE75\xF4\x7FJ@\x94\xCD\xCF\xCF\'\xBD^\xEF\xD3\xFEc\xCF\x89\x88\x88 \xBD^O\x0E\x87\x83\xDE\xBCyC\xAF^\xBD\xA2\xDE\xDE^\xAA\xAB\xAB#\x95J\xE53vvv6577\x13\0*..\xE6\xBCh\xCE\x9A5\x8B\xACV+M\x9D:\x95\xB5\xBDx\xF1\x82\n\x0B\x0B\xE9\xF0\xE1\xC3\xD4\xD5\xD5Ec\xC6\x8C\xF1\x8AY\\\\L\r\r\r$\x91HX\xDB\xE9\xD3\xA7\xC9j\xB5\xD2\xA7O\x9F\xE8\xC9\x93\'d4\x1A\xC9n\xB7\xD3\x8D\x1B7X\xBF7o\xDEPww7uuu\xB1%///`=\x84\x01\xA0\x0B\x84\xAA===\xF8\xF0\xE1\x83\xD7\xF4\xF0\xF6\xED\xDB\xE8\xEC\xECd\xBFXq8\x1C(,,\x84\xCDf\x83B\xA1@WW\x17JJJ\x90\x96\x96\x86\xCE\xCEN\x9F\xB1\x07g3\xD5\xD5\xD5\x18\x18\x18\xC0\xF3\xE7\xCFQWW\x07\xE0{Olhh@uu5\xEB\xDF\xDF\xDF\x8Fg\xCF\x9E\xA1\xB3\xB3\x13\xD5\xD5\xD5>\x9F\xF1\x06\x83\x012\x99\fz\xBD\x9E}q-++\xC3\xBD{\xF7\xA0T*\xE1v\xBB\xD1\xDA\xDA\x8A\xA3G\x8F"++\x8Bm\x17\x14\x14\x04\xA3\xD1\b\x83\xC1\xC0\x96k\xD7\xAE\xA1\xA5\xA5\xE5\x9F]\xC0\xFF \xAE\x87\b\f1\xDB+0DA\x04\x06\xAF \x12\x89\x04\f\xC3\xF8\xFC^U\xC4?\xA4R)\x18\x86\xF1\x99N\xF2\xF2\xE5s`\x18\x06\x91\x91\x91\x181bD@\x0E\xEEOd\xC4\x88\x11\x88\x8C\x8C\x04\xC30\xBC\xBE\xBC\x82(\x14\n\xA4\xA6\xA6B\xADV\x07\xE4\xE0\xFED\xD4j5\x96.]\n\x85B\xC1\xEB\xCB+\x88\\.\xC7\xC2\x85\x0B\xD9$\x9E\xC8\xAF\x13\x17\x17\x07\xADV\xCBy\xE1\x1C\n^A\xA4R)\xE4r\xB9\xCF\xFF\x87\x88\xF8GHH\b\xE4r\xB9_\xE3\xB08R\x0B\fQ\x10\x81\xE1\xD7z\x88B\xA1\xC0\xCA\x95+1q\xE2D\x8E}0\xBDPRR2\xEC:\xC7\xEF\x8ET*EXX\x18\x12\x12\x120s\xE6L\xAFd\xE3\xEC\xD9\xB3\x11\x14\xE4\xDF\xD2\x13\xAF\x97\xDDn\xC7\xB3g\xCF0}\xFAt\xAF\x81\xDD\xE9t\xC2\xE3\xF1\xF85\xBF\xFE]\x91H$\xEC\xF7\xCFJ\xA5\x12S\xA6L\xF1\x1A\xBC{{{a2\x99`\xB7\xDB\xF9\xE3\x81\'\x97%\xFE\xE9sx\x02\xFD\xA7O1\xB9(0\xC4A]`\x88\x82\b\fQ\x10\x81!\n"0DA\x04\x86(\x88\xC0\x10\x05\x11\x18\xA2 \x02C\x14D`\x88\x82\b\x8C\xBF\x01O\xC5\x98\x01\xABf\xE6Y\0\0\0\0IEND\xAEB`\x82',

    xmlFileNames: [],
    xmlGroupNames: [],
    xmlCurrentFileNames: [],

    layerTypePropertyArr: [],
    layerTypePropertyValueArr: [],

    expPropertyArr: [],

    layerArr: [],
    layerParentNameArr: [],

    init: function init() {
      return this;
    },

    extend: function extend(target, source) {
      for (var i in source) {
        target[i] = source[i];
      }return target;
    }

  };

  sp.prototype.extend(sp.prototype, {

    scriptFile: new File($.fileName),
    scriptFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory'),
    materialFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory' + sp.prototype.slash + 'tempFile'),
    settingsFile: new File(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory' + sp.prototype.slash + 'settings.xml'),
    imageFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory' + sp.prototype.slash + 'image'),
    roamingFolder: new Folder(Folder.userData.fullName + sp.prototype.slash + 'Aescripts' + sp.prototype.slash + 'Sp_memory'),

    isOutside: true,
    isLoopPreview: false,
    previewHelper: {},
    renderTaskArray: [],
    preImageArr: [],
    newItemOrCover: 'newItem',

    haveSetting: function haveSetting(keyName) {
      return this.setting.haveSetting(this.scriptName, keyName);
    },

    saveSetting: function saveSetting(keyName, value) {
      this.setting.saveSetting(this.scriptName, keyName, value);
    },

    getSetting: function getSetting(keyName) {
      return this.setting.getSetting(this.scriptName, keyName);
    },

    getSettingAsBool: function getSettingAsBool(keyName) {
      return this.getSetting(keyName) === 'true';
    },

    getFileByName: function getFileByName(name) {
      var string = this.scriptFolder.toString() + this.slash + name + '.xml';
      var file = new File(string);
      return file;
    },

    isForceEnglish: function isForceEnglish() {
      var string = this.scriptFolder.toString() + this.slash + 'force_en.txt';
      var file = new File(string);
      return file.exists;
    },

    getImageFolderByName: function getImageFolderByName(name) {
      var string = this.imageFolder.toString() + this.slash + name + '';
      var folder = new Folder(string);
      if (!folder.exists) {
        folder.create();
      }
      return folder;
    },

    getImage: function getImage(groupName, imageName) {
      var folder = this.getImageFolderByName(groupName);
      if (!folder.exists) {
        folder.create();
      }
      var string = folder.toString() + this.slash + imageName + '.png';
      var file = new File(string);
      if (file.exists) {
        return file;
      } else {
        return this.noImage;
      }
    },

    getImageFile: function getImageFile(groupName, imageName) {
      var folder = this.getImageFolderByName(groupName);
      if (!folder.exists) {
        folder.create();
      }
      var string = folder.toString() + this.slash + imageName + '.png';
      var file = new File(string);
      return file;
    },

    getGlobalIndexFromFileName: function getGlobalIndexFromFileName(name) {
      var content = new XML(this.settingsFile.readd());
      var thisIndex = -1;
      this.forEach(content.ListItems, function (item, index) {
        if (item.toString() === name) {
          thisIndex = index;
        }
      });
      return thisIndex;
    },

    os: $.os.indexOf('Win') !== -1 ? 'win' : 'mac',

    openLink: function openLink(url) {
      var cmd = '';
      if ($.os.indexOf('Win') !== -1) {
        cmd += 'explorer ' + url;
      } else {
        cmd += 'open "' + url + '"';
      }
      try {
        system.callSystem(cmd);
      } catch (e) {}
    },

    request: request,

    getVersion: function getVersion() {
      try {
        var response = request('GET', this.checkVersionLink, '');

        var data = eval('(' + response + ')');
        var latestTag = 0;

        data.forEach(function (item, index) {
          var tagArr = item.ref.match(/v(.*?)$/i);
          if (tagArr.length >= 1) {
            var tag = tagArr[1];
            if (latestTag <= tag) latestTag = tag;
          }
        });
        return latestTag;
      } catch (err) {
        return -1;
      }
    },

    compareSemver: function compareSemver(a, b) {
      var pa = a.split('.');
      var pb = b.split('.');
      for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
      }
      return 0;
    }

  });

  sp.prototype.extend(sp.prototype, {
    filterName: function filterName(str) {
      return str.trim().replace(/[<>:"\/\\|?*]+/g, '_');
    },
    getTimeInfoArr: function getTimeInfoArr(comp) {
      var layers = [];
      if (comp.selectedLayers.length === 0) {
        for (var i = 0; i < comp.numLayers; i++) {
          if (comp.layer(i + 1).enabled === true) {
            layers.push(comp.layer(i + 1));
          }
        }
      } else {
        for (i = 0; i < comp.selectedLayers.length; i++) {
          if (comp.selectedLayers[i].enabled === true) {
            layers.push(comp.selectedLayers[i]);
          }
        }
      }

      var inPointArr = [];
      var outPointArr = [];

      for (i = 0; i < layers.length; i++) {
        var layer = layers[i];
        inPointArr.push(layer.inPoint);
        outPointArr.push(layer.outPoint);
      }

      if (layers.length === 0) return null;
      inPointArr.sort(function (a, b) {
        return a - b;
      });
      outPointArr.sort(function (a, b) {
        return a - b;
      });

      return [inPointArr[0], outPointArr[outPointArr.length - 1]];
    },
    swap: function swap(a, b) {
      var tempA = a.text;
      a.text = b.text;
      b.text = tempA;
    },
    lookUpTextInChildren: function lookUpTextInChildren(text, children) {
      var len = children.length;
      for (var i = 0; i < len; i++) {
        if (children[i].text === text) {
          return true;
        }
      }
      return false;
    },

    lookUpInArray: function lookUpInArray(text, arr) {
      var len = arr.length;
      for (var i = 0; i < len; i++) {
        if (arr[i] === text) {
          return true;
        }
      }
      return false;
    },
    lookUpInItem: function lookUpInItem(text, items) {
      var len = items.length;
      for (var i = 1; i <= len; i++) {
        if (items[i].name === text) {
          return [true, items[i]];
        }
      }
      return [false, null];
    },
    deleteIndexAndReload: function deleteIndexAndReload(deleteIndex) {
      var settingxml = new XML(this.settingsFile.readd());
      this.forEach(settingxml.ParentGroup, function (item, index) {
        for (var j = 0, len = item.children().length(); j < len; j++) {
          var thisItem = item.child(j);
          if (parseInt(thisItem.toString()) === deleteIndex) {
            thisItem.setLocalName('waitToDelete');
            delete item.waitToDelete;
          }
        }
      });
      this.forEach(settingxml.ParentGroup, function (item, index) {
        for (var j = 0, len = item.children().length(); j < len; j++) {
          var thisItem = item.child(j);
          if (parseInt(thisItem.toString()) > deleteIndex) {
            item.insertChildBefore(thisItem, new XML('<Index>' + (parseInt(thisItem.toString()) - 1).toString() + '</Index>'));
            thisItem.setLocalName('waitToDelete');
            delete item.waitToDelete;
          }
        }
      });

      this.settingsFile.writee(settingxml);
    },
    reloadParentDroplist: function reloadParentDroplist() {
      this.parentDroplist.removeAll();
      var settingxml = new XML(this.settingsFile.readd());
      this.xmlGroupNames.length = 0;
      this.forEach(settingxml.ParentGroup, function (item, index) {
        this.push(item['@groupName'].toString());
      }, this.xmlGroupNames);
      this.xmlGroupNames.forEach(function (item, index) {
        this.add('item', item);
      }, this.parentDroplist);
      var ratio = 1 / this.gv.scale - 1;
      var addedSeparatorLength = Math.ceil(ratio * this.xmlGroupNames.length);
      for (var i = 0; i < addedSeparatorLength; i++) {
        this.parentDroplist.add('separator');
      }

      this.reloadDroplist();
    },
    reloadDroplist: function reloadDroplist() {
      this.droplist.removeAll();
      this.gv.removeAll();
      var parentSelection = parseInt(this.getSetting('parentSelection'));
      var groupName = this.xmlGroupNames[parentSelection];

      var settingxml = new XML(this.settingsFile.readd());
      this.xmlFileNames.length = 0;
      this.xmlCurrentFileNames.length = 0;

      var indexArr = [];

      this.forEach(settingxml.ParentGroup, function (item, index) {
        if (item['@groupName'].toString() === groupName) {
          for (var j = 0; j < item.children().length(); j++) {
            indexArr.push(parseInt(item.child(j).toString()));
          }
        }
      });

      var listArr = [];
      this.forEach(settingxml.ListItems, function (item, index) {
        this.push(item.toString());
      }, this.xmlFileNames);
      for (var i = 0, len = indexArr.length; i < len; i++) {
        listArr.push(settingxml.ListItems.child(indexArr[i]).toString());
      }
      listArr.forEach(function (item, index) {
        this.add('item', item);
      }, this.droplist);
      var ratio = 1 / this.gv.scale - 1;
      var addedSeparatorLength = Math.ceil(ratio * listArr.length);
      for (i = 0; i < addedSeparatorLength; i++) {
        this.droplist.add('separator');
      }

      this.xmlCurrentFileNames = listArr;
    },
    cropImage: function cropImage(fi, inImageFileA) {
      var f = new ImportOptions();
      f.file = fi;
      f.forceAlphabetical = false;
      f.importAs = ImportAsType.FOOTAGE;
      f.sequence = false;
      f = app.project.importFile(f);
      var tempComp3 = app.project.items.addComp('tempComp', 100, 60, 1, 5, 30);
      var BGtemp3 = tempComp3.layers.addSolid([0, 0, 0], 'BG', tempComp3.width, tempComp3.height, 1, 10800);
      var ima = tempComp3.layers.add(f);
      var scaleX = 10000 / ima.source.width;
      var scaleY = 6000 / ima.source.height;
      if (scaleX / 60 < scaleY / 100) {
        ima.transform.scale.setValue([scaleX, scaleX]);
      } else {
        ima.transform.scale.setValue([scaleY, scaleY]);
      }
      tempComp3.saveFrameToPng(0, inImageFileA);
      f.remove();
      try {
        if (BGtemp3.source.parentFolder.numItems === 1) {
          var BGparent = BGtemp3.source.parentFolder;
          BGtemp3.source.remove();
          BGparent.remove();
        } else {
          BGtemp3.source.remove();
        }
      } catch (err) {}
      tempComp3.remove();
    },

    savePng2: function savePng2(pngPath) {
      app.beginSuppressDialogs();
      var comps = app.project.activeItem;
      var timeArr = this.getTimeInfoArr(comps);
      var layers = comps.selectedLayers;
      var jishushuzu = [];
      var waitToPre = [];
      var tempComp2 = app.project.items.addComp('tempComp2', comps.width, comps.height, comps.pixelAspect, comps.duration, comps.frameRate);
      var BGtemp = tempComp2.layers.addSolid([0, 0, 0], 'BG', 100, 60, 1, 10800);
      var cunLengthA = layers.length;
      var iq;
      for (iq = 0; iq < layers.length; iq++) {
        jishushuzu.push(layers[iq].index);
      }
      for (iq = 0; iq < layers.length; iq++) {
        var wocaoName = layers[iq].name;
        waitToPre[waitToPre.length] = layers[iq].duplicate();
        waitToPre[iq].name = wocaoName;
      }
      var wwwww = [];
      for (iq = 0; iq < cunLengthA; iq++) {
        wwwww.push(waitToPre[iq].index);
      }
      var precomposeComp = comps.layers.precompose(wwwww, 'tempA', true);
      comps.layer('tempA').copyToComp(tempComp2);
      comps.layer('tempA').remove();
      for (iq = 0; iq < cunLengthA; iq++) {
        comps.layer(jishushuzu[iq]).selected = true;
      }
      try {
        tempComp2.layer(1).solo = false;
      } catch (err) {}
      var preVVVV = tempComp2.layer(1).property('ADBE Transform Group').property('ADBE Scale').value;
      tempComp2.layer(1).property('ADBE Transform Group').property('ADBE Scale').setValue([100 / tempComp2.width * preVVVV[0], 60 / tempComp2.height * preVVVV[1]]);
      tempComp2.width = 100;
      tempComp2.height = 60;
      BGtemp.property('ADBE Transform Group').property('ADBE Position').setValue([50, 30]);
      tempComp2.layer(1).property('ADBE Transform Group').property('ADBE Position').setValue([50, 30]);
      var nameStr = '';
      pngPath = File(pngPath);

      var isNewItem = this.newItemOrCover === 'newItem';
      var isCover = this.newItemOrCover === 'cover' && this.coverChangeValue === true;
      if (isNewItem || isCover) {
        if (isNewItem) {
          while (pngPath.exists) {
            pngPath = pngPath.toString().split('.')[0].toString() + '_' + '.png';
            pngPath = File(pngPath);
          }
        }
        try {
          tempComp2.saveFrameToPng(comps.time, pngPath);
        } catch (err) {}
      }

      if (this.savePreviewValue === true) {
        tempComp2.layer(1).inPoint = timeArr[0];
        tempComp2.layer(1).outPoint = timeArr[1];
        tempComp2.layer(2).inPoint = timeArr[0];
        tempComp2.layer(2).outPoint = timeArr[1];
        timeArr = this.getTimeInfoArr(tempComp2);
        var targetFolder = new Folder(pngPath.toString().replace(/.png/i, '') + '_seq');
        !targetFolder.exists && targetFolder.create();
        var num = this.frameNum;
        this.willSavePreviews(num + 1);
        var workAreaStart = comps.workAreaStart;
        var workAreaDuration = comps.workAreaDuration;
        for (var i = 0; i < num + 1; i++) {
          try {
            var time;
            if (this.saveWorkareaValue === true) {
              time = workAreaStart + i * workAreaDuration / num;
            } else {
              time = timeArr[0] + i * (timeArr[1] - timeArr[0]) / num;
            }
            var seqPath = new File(targetFolder.toString() + this.slash + i.toString() + '.png');
            tempComp2.saveFrameToPng(time, seqPath);
            this.didSavePreview();
            app.purge(PurgeTarget.IMAGE_CACHES);
          } catch (err) {}
        }
        this.didSavePreviews();
      }
      BGtemp.source.remove();
      tempComp2.remove();
      precomposeComp.remove();
      try {
        nameStr = decodeURIComponent(File(pngPath).displayName.split('.')[0].toString());
      } catch (err) {}
      app.endSuppressDialogs(false);
      return encodeURIComponent(nameStr);
    },
    savePng: function savePng(pngPath) {
      try {
        app.beginSuppressDialogs();
        var comps = app.project.activeItem;
        var layers = comps.selectedLayers;
        var inArr = [];
        for (var i = 0; i < layers.length; i++) {
          inArr.push(layers[i].index);
        }
        var otherIndexArr = [];
        var otherEnabledArr = [];
        for (i = 0; i < comps.numLayers; i++) {
          var thisLayer = comps.layer(i + 1);
          if (inArr.toString().indexOf(thisLayer.index) === -1) {
            otherEnabledArr.push(thisLayer.enabled);
            otherIndexArr.push(thisLayer.index);
            try {
              thisLayer.enabled = false;
            } catch (err) {}
          }
        }
        var nameStr = '';
        pngPath = File(pngPath);
        var isNewItem = this.newItemOrCover === 'newItem';
        var isCover = this.newItemOrCover === 'cover' && this.coverChangeValue === true;
        if (isNewItem || isCover) {
          if (isNewItem) {
            while (pngPath.exists) {
              pngPath = pngPath.toString().split('.')[0].toString() + '_' + '.png';
              pngPath = File(pngPath);
            }
          }
          if (this.thumbTypeValue === true) {
            app.activeViewer.views[0].saveBlittedImageToPng(comps.time, pngPath, 1000, "what's this? I don't know");
          } else {
            comps.saveFrameToPng(comps.time, pngPath);
          }
          this.cropImage(pngPath, pngPath);
        }
        if (this.savePreviewValue === true) {
          var targetFolder = new Folder(pngPath.toString().replace(/.png/i, '') + '_seq');
          !targetFolder.exists && targetFolder.create();
          var num = this.frameNum;
          this.willSavePreviews(num + 1);
          var workAreaStart = comps.workAreaStart;
          var workAreaDuration = comps.workAreaDuration;
          var timeArr = this.getTimeInfoArr(comps);
          for (i = 0; i < num + 1; i++) {
            var time;
            if (this.saveWorkareaValue === true) {
              time = workAreaStart + i * workAreaDuration / num;
            } else {
              time = timeArr[0] + i * (timeArr[1] - timeArr[0]) / num;
            }
            var seqPath = new File(targetFolder.toString() + this.slash + i.toString() + '.png');

            if (this.thumbTypeValue) {
              app.activeViewer.views[0].saveBlittedImageToPng(time, seqPath, 1000, "what's this? I don't know");
            } else {
              comps.saveFrameToPng(time, seqPath);
            }
            this.cropImage(seqPath, seqPath);
            this.didSavePreview();
            app.purge(PurgeTarget.IMAGE_CACHES);
          }
          this.didSavePreviews();
        }
        for (i = 0; i < otherIndexArr.length; i++) {
          try {
            thisLayer = comps.layer(otherIndexArr[i]);
            thisLayer.enabled = otherEnabledArr[i];
          } catch (err) {}
        }
        app.endSuppressDialogs(false);
        nameStr = decodeURIComponent(File(pngPath).displayName.split('.')[0].toString());
        return encodeURIComponent(nameStr);
      } catch (err) {
        alert(err.line.toString() + err.toString());
      }
    }

  });

  sp.prototype.extend(sp.prototype, {

    newLayers: function newLayers(elementXml, comp, options) {
      try {
        var layerArr = $.layer(elementXml, options).toLayer(comp);
      } catch (err) {
        writeLn(err.print());
      }
      return layerArr;
    },

    getXmlFromLayers: function getXmlFromLayers(layers, itemName, sp) {
      var options = {
        isSaveMaterial: sp.saveMaterialValue
      };
      return $.layer(layers, options).toXML(itemName);
    },

    newProperties: function newProperties(xml, selectedLayers, isCleanGroup, isKeyframeOffset) {
      isCleanGroup = isCleanGroup || false;
      isKeyframeOffset = isKeyframeOffset || false;

      var layerXml = new XML(xml);

      var options = {};
      options.newPropertiesSettingArr = [];
      options.cleanPropertiesSettingArr = [];

      options.isCleanGroup = isCleanGroup;
      options.isKeyframeOffset = isKeyframeOffset;

      for (var i = 1; i <= 9; i++) {
        if (sp.prototype.getSetting('_1_' + i) === '1') {
          options.newPropertiesSettingArr.push(1);
        } else {
          options.newPropertiesSettingArr.push(0);
        }

        if (sp.prototype.getSetting('_2_' + i) === '1') {
          options.cleanPropertiesSettingArr.push(1);
        } else {
          options.cleanPropertiesSettingArr.push(0);
        }
      }

      $.layer.newProperties(layerXml.child(0).Properties, selectedLayers, options);
    },

    saveItemToFile: function saveItemToFile(file, xml, position) {
      var content = file.readd();
      var newXml = new XML(content);
      if (content.length === 0) newXml = new XML('<tree></tree>');
      if (typeof position === 'undefined') {
        newXml.appendChild(xml);
      } else {
        newXml.appendChild(xml);
        var newInsertxml = new XML(newXml.child(newXml.children().length() - 1));
        newXml.insertChildAfter(newXml.child(position), newInsertxml);
        newXml.child(position).setLocalName('waitToDelete');
        newXml.child(newXml.children().length() - 1).setLocalName('waitToDelete');
        delete newXml.waitToDelete;
      }
      file.writee(newXml);
    }

  });

  sp.prototype.init.prototype = sp.prototype;
  $.global.sp = sp();
  return $.global.sp;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  if (!sp.settingsFile.exists || sp.settingsFile.length === 0) {
    if (sp.settingsFile.exists) sp.settingsFile.remove();
    var settingsText = '<settings>\
  <ListItems/>\
  <ParentGroup/>\
</settings>';
    var newsettingsxml = new XML(settingsText);
    var allFiles = sp.scriptFolder.getFiles();
    newsettingsxml.ParentGroup.appendChild(new XML("<item groupName='Default'/>"));
    var i = 0;
    allFiles.forEach(function (item, index) {
      if (item.toString().indexOf('.xml') !== -1 && item.name.indexOf('settings.xml') === -1) {
        newsettingsxml.ListItems.appendChild(new XML('<Name>' + item.displayName.replace('.xml', '') + '</Name>'));
        newsettingsxml.ParentGroup.child(0).appendChild(new XML('<Index>' + i + '</Index>'));
        i++;
      }
    });
    sp.settingsFile.writee(newsettingsxml);
  }

  var content = new XML(sp.settingsFile.readd());
  if (!content.hasOwnProperty('ParentGroup')) {
    content.appendChild(new XML('<ParentGroup/>'));
  }
  if (content.ParentGroup.children().length() === 0) {
    content.ParentGroup.appendChild(new XML("<item groupName='Default'/>"));
    sp.forEach(content.ListItems, function (item, index) {
      content.ParentGroup.child(0).appendChild(new XML('<Index>' + index.toString() + '</Index>'));
    });
    sp.settingsFile.writee(content);
  }

  content = new XML(sp.settingsFile.readd());
  if (!content.hasOwnProperty('ListItems')) {
    content.appendChild(new XML('<ListItems/>'));
  }
  if (content.ListItems.children().length() === 0) {
    allFiles = sp.scriptFolder.getFiles();
    allFiles.forEach(function (item, index) {
      if (item.toString().indexOf('.xml') !== -1 && item.name.indexOf('settings.xml') === -1) {
        content.ListItems.appendChild(new XML('<Name>' + item.displayName.replace('.xml', '') + '</Name>'));
        content.ParentGroup.child(0).appendChild(new XML('<Index>' + index.toString() + '</Index>'));
      }
    });
  }
  if (content.ListItems.children().length() === 0) {
    content.ListItems.appendChild(new XML('<Name>Default</Name>'));
    content.ParentGroup.child(0).appendChild(new XML('<Index>' + 0 + '</Index>'));
    var file = sp.getFileByName('Default');
    sp.getImageFolderByName('Default');
    var str = '<tree></tree>';
    file.writee(str);
  }

  sp.settingsFile.writee(content);
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
    (function (global) {
        __webpack_require__(14);
        __webpack_require__(9);
        __webpack_require__(12);
        __webpack_require__(13);
        __webpack_require__(15);
        __webpack_require__(3);
        __webpack_require__(7);
        __webpack_require__(6);
        __webpack_require__(4);
        __webpack_require__(5);
        __webpack_require__(8);
        var helpers = __webpack_require__(10);

        $.layer.slash = sp.slash;
        $.layer.tempFolder = new Folder(sp.scriptFolder.toString() + $.layer.slash + 'tempFile');
        $.layer.translate = $.global.translate;

        sp.fns = new helpers.fns();

        $.global.callbackBeforeWebpackBuild && $.global.callbackBeforeWebpackBuild();
        if (!(global instanceof Panel)) {
            $.global.callbackBeforeWebpackBuild = function () {
                win.close();
            };
        }
        var win = sp.win = global instanceof Panel ? global : new Window('window', sp.scriptName, undefined, { resizeable: true });
        var outterGroup = sp.win.outterGroup = win.add("Group{orientation: 'column', alignment: ['fill','fill'],spacing:0,margins:0}");
        var innerGroup = sp.win.innerGroup = outterGroup.add("Group{orientation: 'row', alignment: ['fill','fill'],spacing:0,margins:0}");
        var parentDroplist = sp.parentDroplist = innerGroup.add('Dropdownlist{}');
        var droplist = sp.droplist = innerGroup.add('Dropdownlist{}');
        var gv = sp.gv = new GridView(outterGroup);
        var screen = $.screens[0].toString().split('-').pop().split(':');
        outterGroup.maximumSize = innerGroup.maximumSize = [parseInt(screen[0]), parseInt(screen[1])];

        gv.scale = sp.gridViewScale;
        gv.limitText = sp.getSettingAsBool('limitText');
        gv.showText = sp.showThumbValue;
        gv.version = parseInt(app.version.split('.')[0]) === 12 || parseInt(app.version.split('.')[0]) === 14 ? 'CC' : 'CC2014';

        gv.leftClick = sp.fns.leftClick;
        gv.rightClick = sp.fns.rightClick;
        gv.leftDoubleClick = sp.fns.newLayer;
        gv.mouseMove = sp.fns.moveOver;
        parentDroplist.onChange = sp.fns.parentDroplistChange;
        droplist.onChange = sp.fns.droplistChange;

        sp.reloadParentDroplist();
        var selection = parseInt(sp.getSetting('parentSelection'));
        parentDroplist.selection = selection <= parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
        selection = parseInt(sp.getSetting('thisSelection'));
        droplist.selection = selection <= droplist.items.length - 1 && selection >= 0 ? selection : 0;

        sp.renderTaskArray.forEach(function (item, index) {
            app.cancelTask(item);
        });
        sp.renderTaskArray.length = 0;
        sp.previewHelper = {};

        win.onResize = win.onResizing = sp.fns.winResize;

        if (win instanceof Panel) {
            win.layout.layout(1);
        } else {
            var ratio = sp.gv.scale;
            var location = sp.getSetting('winLocation').split(',');
            win.location = [parseInt(location[0]), parseInt(location[1])];
            if (win.location[0] <= 0 || win.location[1] <= 0) {
                win.location = [100, 200];
            }
            win.show();
            var size = sp.getSetting('winSize').split(',');
            win.size = [parseInt(size[0]) * ratio, parseInt(size[1]) * ratio];
            if (win.size[0] <= 0 || win.size[1] <= 0) {
                win.size = [240, 500];
            }
            win.onClose = sp.fns.winClose;
        }

        win.onResize();

        if (sp.checkVersionOnStartupValue) {
            var checkVersionFunc = __webpack_require__(1)(win, true);
            checkVersionFunc();
        }

        var observeSingleton = __webpack_require__(11);
        observeSingleton(sp);

        app.onError && app.onError(function (err) {
            alert('\u8B66\u544A, Sp_memory\u68C0\u6D4B\u5230AE\u62A5\u9519, \u5185\u5BB9\u5982\u4E0B:\n' + err.toString() + '\n\n\u8BF7\u5C3D\u91CF\u5C06\u5C42\u5206\u6563\u5B58\u50A8\u5728\u4E0D\u540C\u7EC4\u5185');
        });
    })(memoryGlobal);
} catch (err) {
    alert('Line #' + err.line.toString() + '\r\n' + err.toString());
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function OperatorOverload(call, operator) {
  var meta = ['+', '-', '~', '*', '/', '%', '^', '<', '<=', '==', '<<', '>>', '>>>', '&', '|', '==='];
  var toObject = function toObject() {
    for (var i = 0; i < arguments.length; i++) {
      this[arguments[i]] = true;
    }
    return this;
  };
  var metaObj = toObject.apply({}, meta);
  if (!metaObj.hasOwnProperty(operator)) {
    return alert('Operator not supported.');
  }

  this.call = call;
  this[operator] = function (operand, rev) {
    this.call(operand, rev);
    return this;
  };
  return this;
}

var cout = $.global.cout = new OperatorOverload(function (operand, rev) {
  if (!rev) {
    $.writeln(operand);
  } else {
    alert(operand);
  }
}, '<<');
$.global.cout = cout;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vbsString = 'set namedArgs = WScript.Arguments.Named  \n  \nsMethod = namedArgs.Item("Method")  \nsUrl = namedArgs.Item("URL")  \nsRequest = namedArgs.Item("Query")  \n  \nHTTPPost sMethod, sUrl, sRequest  \n  \nFunction HTTPPost(sMethod, sUrl, sRequest)  \n    \n          set oHTTP = CreateObject("Microsoft.XMLHTTP")    \n    \n    If sMethod = "POST" Then  \n        oHTTP.open "POST", sUrl,false  \n    ElseIf sMethod = "GET" Then  \n        oHTTP.open "GET", sUrl,false  \n    End If  \n  \n          oHTTP.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"  \n          oHTTP.setRequestHeader "Content-Length", Len(sRequest)  \n          oHTTP.send sRequest  \n    \n          HTTPPost = oHTTP.responseText  \n    \n          WScript.Echo HTTPPost  \n  \nEnd Function  \n';

module.exports = function (method, endpoint, query) {
  var response = null;

  var tempVbsFile = new File($.layer.tempFolder.toString() + $.layer.slash.toString() + 'curl.vbs');

  if (!tempVbsFile.exists) {
    tempVbsFile.writee(vbsString);
  }
  var wincurl = tempVbsFile.fsName;
  var curlCmd = '';

  try {
    if (sp.os === 'win') {
      curlCmd = 'cscript "' + wincurl + '" /Method:' + method + ' /URL:' + endpoint + ' /Query:' + query + ' //nologo';
    } else {
      curlCmd = 'curl -s -G -d "' + query + '" ' + endpoint;
    }
    response = system.callSystem(curlCmd);
  } catch (err) {}

  return response;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = $.global;

var parentProgress = __webpack_require__(2);

var progressFactory = {
  createWindow: function createWindow(len, title, prefixString, suffixString) {
    if (global.progressWin) {
      global.progressBar.maxvalue = len;
      return;
    }
    parentProgress.createWindow(len, title, prefixString, suffixString);
  },
  update: function update(len, prefixString, suffixString, timePrefix, timeSuffix) {
    parentProgress.update(len, prefixString, suffixString, timePrefix, timeSuffix);
  },
  complete: function complete(timePrefix, timeSuffix) {
    parentProgress.complete(timePrefix, timeSuffix);
    global.progressWin = null;
    global.progressTimeText = null;
    global.progressText = null;
    global.progressBar = null;
  }
};

var timeSuffix = loc(sp.second);

var savingReport = loc(sp.savingReport);
var savingPrefixString = loc(sp.savingProcessingPrefix);
var savingSuffixString = loc(sp.savingProcessAfter);
var savingTitle = loc(sp.savingProcessTitle);
$.layer.willSaveLayers = function (layers) {
  var len = $.layer.countLayers(layers, true);
  progressFactory.createWindow(len, savingTitle, savingPrefixString, savingSuffixString);
};
$.layer.didSaveLayer = function (count) {
  progressFactory.update(count, savingPrefixString, savingSuffixString, savingReport, timeSuffix);
};
$.layer.didSaveLayers = function () {
  $.layer.didSaveLayer(0);
  progressFactory.complete(savingReport, timeSuffix);
};

var creatingReport = loc(sp.creatingReport);
var creatingPrefixString = loc(sp.creatingProcessingPrefix);
var creatingSuffixString = loc(sp.creatingProcessAfter);
var creatingTitle = loc(sp.creatingProcessTitle);

$.layer.willCreateLayers = function (len) {
  progressFactory.createWindow(len, creatingTitle, creatingPrefixString, creatingSuffixString);
};
$.layer.didCreateLayer = function (count) {
  progressFactory.update(count, creatingPrefixString, creatingSuffixString, creatingReport, timeSuffix);
};
$.layer.didCreateLayers = function () {
  $.layer.didCreateLayer(0);
  progressFactory.complete(creatingReport, timeSuffix);
};

module.exports = progressFactory;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.observer = observer;
exports.isObj = isObj;

function isObj(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}

function isInBlackList(name, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === name) return true;
  }
  return false;
}

function observer(obj, callback, nameBlackList, index) {
  index = index || 0;
  if (!isObj(obj)) return;
  for (var i in obj) {
    if (index === 0 && isInBlackList(i, nameBlackList)) continue;
    obj.watch(i, callback);
    if (isObj(obj[i])) observer(obj[i], callback, nameBlackList, index + 1);
  }
  return obj;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var creatRightClickMenu = __webpack_require__(27);
var moveItemWindow = __webpack_require__(24);

module.exports = function () {
  var keepRef = this;
  this.previewAll = function () {
    if (sp.gv.children.length === 0) return;

    keepRef.moveOut();

    var lenArr = [];
    var oneFrame = sp.frameSecond;
    sp.previewHelper = {};
    var items = sp.gv.selection.length === 0 ? sp.gv.children : sp.gv.selection;

    for (var iter = 0, thisLen = items.length; iter < thisLen; iter++) {
      var item = items[iter];
      var img = item.image;
      var index = item.index;

      if (!img.parent) return;
      var folder = new Folder(img.parent);

      if (!(folder instanceof Folder)) return;
      var targetFolder = new Folder(folder.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');

      try {
        if (!targetFolder.exists) {
          if (targetFolder.parent.toString().indexOf('_seq') === -1) {
            targetFolder = new Folder(folder.parent.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');
            img = new File(folder.parent.toString() + sp.slash + item.text + '.png');
          }
        }
      } catch (err) {}

      if (!targetFolder.exists) {
        continue;
      }
      if (!img.exists) {
        continue;
      }

      sp.previewHelper['item' + index] = {};
      sp.previewHelper['item' + index]['tempItem'] = item;
      sp.previewHelper['item' + index]['tempImg'] = img;
      sp.previewHelper['item' + index]['currentIndex'] = 0;
      sp.previewHelper['item' + index]['tempFiles'] = function (f) {
        var len = f.getFiles().length;
        var arr = [];
        for (var i = 0; i < len; i++) {
          var newFile = new File(f.toString() + sp.slash + i.toString() + '.png');
          if (newFile.exists) {
            arr.push(newFile);
          }
        }
        return arr;
      }(targetFolder);

      lenArr.push(sp.previewHelper['item' + index]['tempFiles']);
    }

    lenArr.sort(function (a, b) {
      return a.length - b.length;
    });

    if (lenArr.length === 0) return;

    var maxLen = lenArr[lenArr.length - 1].length;

    for (var i = 0, len = maxLen; i <= len; i++) {
      var stringToCall = '\n      if (sp) {\n        if (sp.gv) {\n          if (sp.gv.children) {\n\n            var len = sp.gv.children.length;\n            for (var itemIndex = 0; itemIndex < len; itemIndex++) {\n              var currentItem = sp.previewHelper["item" + itemIndex];\n              if (currentItem) {\n\n                var currentIndex = currentItem["currentIndex"];\n                currentItem["currentIndex"]++;\n                var currentIndexTemp = currentItem["tempFiles"];\n                if (currentIndexTemp) {\n                  var currentFile = currentIndexTemp[currentIndex];\n                  if (currentFile) {\n\n                    if (currentItem["tempItem"])\n                      currentItem["tempItem"].image = currentFile;\n\n                  } else {\n                    currentItem["currentIndex"] = 0;\n                  }\n                }\n              }\n            }\n            if (isValid(sp.gv.list))\n              sp.gv.refresh();\n\n          }\n        }\n      }';
      sp.renderTaskArray.push(app.scheduleTask(stringToCall, 0 + oneFrame * i, true));
    }

    sp.isLoopPreview = true;
  };
  this.moveOver = function (event, item, isClick) {
    if (sp.isLoopPreview === true) return;

    if (!item) {
      sp.isOutside = true;
      return;
    }

    if (typeof isClick !== 'undefined') {
      if (sp.isOutside === true) {
        return;
      }
    } else {
      if (sp.isOutside === false) {
        return;
      }
    }

    var img = item.image;
    var index = item.index;
    var oneFrame = sp.frameSecond;

    if (!img.parent) return;
    var folder = new Folder(img.parent);

    if (!(folder instanceof Folder)) return;
    var targetFolder = new Folder(folder.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');

    if (!targetFolder.exists) {
      if (targetFolder.parent.toString().indexOf('_seq') === -1) {
        targetFolder = new Folder(folder.parent.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');
        img = new File(folder.parent.toString() + sp.slash + item.text + '.png');
      }
    }

    if (!targetFolder.exists) {
      return;
    }
    if (!img.exists) {
      return;
    }

    sp.previewHelper['item' + index] = {};
    sp.previewHelper['item' + index]['tempItem'] = item;
    sp.previewHelper['item' + index]['tempImg'] = img;
    sp.previewHelper['item' + index]['currentIndex'] = 0;
    sp.previewHelper['item' + index]['tempFiles'] = function (f) {
      var len = f.getFiles().length;
      var arr = [];
      for (var i = 0; i < len; i++) {
        var newFile = new File(f.toString() + sp.slash + i.toString() + '.png');
        if (newFile.exists) {
          arr.push(newFile);
        }
      }
      return arr;
    }(targetFolder);

    if (sp.previewHelper['item' + index]['tempFiles'].length === 0) return;

    for (var i = 0, len = sp.previewHelper['item' + index]['tempFiles'].length; i <= len; i++) {
      var stringToCall = '\n      if (sp) {\n        if (sp.gv) {\n          if (sp.gv.children) {\n\n            var len = sp.gv.children.length;\n            for (var itemIndex = 0; itemIndex < len; itemIndex++) {\n              var currentItem = sp.previewHelper["item" + itemIndex];\n              if (currentItem) {\n                var currentIndex = currentItem["currentIndex"];\n                currentItem["currentIndex"]++;\n\n                var currentIndexTemp = currentItem["tempFiles"];\n                if (currentIndexTemp) {\n                  var currentFile = currentIndexTemp[currentIndex];\n                  if (currentFile) {\n                    if (currentItem["tempItem"])\n                      currentItem["tempItem"].image = currentFile;\n                  } else {\n                    var currentImg = currentItem["tempImg"];\n                    if (currentImg) {\n                      currentItem["tempItem"].image = currentImg;\n                    }\n                    sp.previewHelper["item" + itemIndex] = {};\n                  }\n                }\n              }\n            }\n            if (isValid(sp.gv.list))\n              sp.gv.refresh();\n\n          }\n        }\n      }';
      sp.renderTaskArray.push(app.scheduleTask(stringToCall, 0 + oneFrame * i, false));
    }

    sp.isOutside = false;
    sp.isLoopPreview = false;
  };
  this.leftClick = function () {
    if (sp.isLoopPreview === false) return;

    keepRef.moveOut();

    sp.isLoopPreview = false;
  };
  this.moveOut = function () {
    sp.renderTaskArray.forEach(function (item, index) {
      app.cancelTask(item);
    });
    sp.renderTaskArray.length = 0;

    if (sp.gv.children.length !== 0) {
      sp.preImageArr.forEach(function (item, index) {
        sp.gv.children[index].image = item;
      });
    }

    sp.previewHelper = {};
  };
  this.addModule = function () {
    var newEleName = prompt(loc(sp.setName), 'Default');
    if (!newEleName) {
      return;
    }
    newEleName = sp.filterName(newEleName);
    if (sp.lookUpTextInChildren(newEleName, sp.parentDroplist.items)) {
      alert(loc(sp.existName));return;
    }

    var content = new XML(sp.settingsFile.readd());
    content.ParentGroup.appendChild(new XML("<item groupName = '" + newEleName + "'></item>"));
    sp.settingsFile.writee(content);
    sp.reloadParentDroplist();
    sp.parentDroplist.selection = sp.parentDroplist.items.length - 1;
    sp.preImageArr = [];
    var selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;
    sp.gv.refresh();
  };
  this.deleteModule = function () {
    if (!sp.parentDroplist.selection) return;
    var isSureDelete = confirm(loc(sp.deleteModuleAlert));
    if (isSureDelete === true) isSureDelete = confirm(loc(sp.addAlert) + loc(sp.deleteModuleAlert));
    if (isSureDelete === false) return;

    var groupName = sp.parentDroplist.selection.text;

    sp.xmlCurrentFileNames.forEach(function (item, index) {
      var xml = new XML(sp.settingsFile.readd());
      var selectionText = item;

      var preIndex = sp.getGlobalIndexFromFileName(item);
      xml.ListItems.child(preIndex).setLocalName('waitToDelete');
      delete xml.ListItems.waitToDelete;
      sp.settingsFile.writee(xml);
      sp.deleteIndexAndReload(preIndex);

      var imageFolder = sp.getImageFolderByName(selectionText);
      sp.deleteThisFolder(imageFolder);
      imageFolder.remove();

      var file = sp.getFileByName(selectionText);
      file.remove();
    });

    var xml = new XML(sp.settingsFile.readd());
    sp.forEach(xml.ParentGroup, function (item, index) {
      if (item['@groupName'].toString() === groupName) {
        item.setLocalName('waitToDelete');
      }
    });
    delete xml.ParentGroup.waitToDelete;
    sp.settingsFile.writee(xml);

    sp.reloadParentDroplist();
    sp.preImageArr = [];
    var selection = parseInt(sp.getSetting('parentSelection'));
    sp.parentDroplist.selection = selection - 1 <= sp.parentDroplist.items.length - 1 && selection - 1 >= 0 ? selection - 1 : 0;
    selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;
    sp.gv.refresh();
  };
  this.newLayer = function () {
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElements));
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) return alert(loc(sp.needComp));
    if (sp.onlyEffectValue === true && comp.selectedLayers.length === 0) return alert(loc(sp.needLayers));

    var xml = new XML(sp.getFileByName(sp.droplist.selection.text).readd());
    xml = xml.child(sp.gv.lastSelectedItem.index);

    var precomposeName = decodeURIComponent(xml['@name'].toString());

    app.beginUndoGroup('Undo new');

    if (sp.onlyEffectValue === false) {
      var folderName = sp.getSetting('folderName');
      var text = sp.gv.lastSelectedItem.text;
      var compFolder = app.project.items.addFolder(text + '.sp');
      var sourceFolder = app.project.items.addFolder('Sources');

      var resultArr = sp.lookUpInItem(folderName, app.project.items);
      if (resultArr[0] === true) {
        var parentFolder = resultArr[1];
        compFolder.parentFolder = parentFolder;
      } else {
        parentFolder = app.project.items.addFolder(folderName);
        compFolder.parentFolder = parentFolder;
      }
      sourceFolder.parentFolder = compFolder;
      sp.compFolder = compFolder;
      sp.sourceFolder = sourceFolder;

      var currentTime = comp.time;
      var options = {
        compFolder: sp.compFolder,
        sourceFolder: sp.sourceFolder
      };

      var activeCompLayersArr = sp.newLayers(xml, comp, options);

      comp.time = currentTime;

      sourceFolder.numItems === 0 && sourceFolder.remove();
      compFolder.numItems === 0 && compFolder.remove();
    } else {
      activeCompLayersArr = comp.selectedLayers;
      sp.newProperties(xml, comp.selectedLayers, sp.cleanGroupValue, sp.offsetKeyframeValue);
    }

    app.endUndoGroup();

    if (sp.preComposeValue === true) {
      var indexArr = [];
      var inPointArr = [];
      var outPointArr = [];

      activeCompLayersArr.forEach(function (item, index) {
        indexArr.push(item.index);
        inPointArr.push(item.inPoint);
        outPointArr.push(item.outPoint);
      });

      inPointArr.sort(function (a, b) {
        return a - b;
      });
      outPointArr.sort(function (a, b) {
        return b - a;
      });

      app.beginUndoGroup('Undo precomp');
      app.project.activeItem.layers.precompose(indexArr, precomposeName, true);
      app.project.activeItem.selectedLayers[0].inPoint = inPointArr[0];
      app.project.activeItem.selectedLayers[0].outPoint = outPointArr[0];
      app.endUndoGroup();
    }

    if (sp.onlyEffectValue === false) {
      try {
        if (sp.preComposeValue === false && activeCompLayersArr.length === 1 && activeCompLayersArr[0].source instanceof CompItem) {
          activeCompLayersArr[0].selected = true;
          app.executeCommand(2156);
          activeCompLayersArr[0].selected = false;
        }
      } catch (err) {
        writeLn(err.line.toString());
      }
      return activeCompLayersArr;
    } else {
      return null;
    }
  };
  this.cover = function () {
    if (!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers));
    var thisComp = app.project.activeItem;
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
    var itemName = sp.gv.lastSelectedItem.text;

    app.beginSuppressDialogs();
    app.beginUndoGroup('Undo save');

    var imageFile = sp.getImageFile(sp.droplist.selection.text, itemName);

    var seqFolder = new Folder(imageFile.toString().replace(/.png/i, '') + '_seq');
    if (seqFolder.exists) {
      sp.deleteThisFolder(seqFolder);
      seqFolder.remove();
    }

    sp.newItemOrCover = 'cover';

    if (sp.isCC2015 === true) {
      itemName = sp.savePng2(imageFile);
    } else {
      itemName = sp.savePng(imageFile);
    }

    var xml = sp.getXmlFromLayers(thisComp.selectedLayers, itemName, sp);

    sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text), xml, sp.gv.lastSelectedItem.index);

    sp.gv.lastSelectedItem.image = null;
    sp.gv.lastSelectedItem.image = sp.getImage(sp.droplist.selection.text, itemName);
    sp.gv.refresh();

    app.endUndoGroup();
    app.endSuppressDialogs(false);
  };
  this.newItem = function () {
    try {
      if (!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers));
      var thisComp = app.project.activeItem;
      if (sp.autoNameValue === false) {
        var itemName = prompt(loc(sp.setName), 'Name');
      } else {
        itemName = thisComp.selectedLayers[0].name;
      }

      if (sp.autoNameValue === false && itemName === '' || itemName === null) return;

      itemName = sp.filterName(itemName);

      app.beginSuppressDialogs();
      app.beginUndoGroup('Undo save');

      sp.newItemOrCover = 'newItem';

      var time = thisComp.time;

      if (sp.isCC2015 === true) {
        itemName = sp.savePng2(sp.getImageFile(sp.droplist.selection.text, itemName));
      } else {
        itemName = sp.savePng(sp.getImageFile(sp.droplist.selection.text, itemName));
      }

      var xml = sp.getXmlFromLayers(thisComp.selectedLayers, itemName, sp);
      sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text), xml);

      var item = sp.gv.add(decodeURIComponent(itemName), sp.getImage(sp.droplist.selection.text, itemName));
      sp.preImageArr.push(item.image);
      sp.gv.refresh();

      thisComp.time = time;

      app.endUndoGroup();
      app.endSuppressDialogs(false);
    } catch (err) {
      err.printc();err.printa();
    }
  };
  this.deleteItem = function () {
    if (sp.gv.selection.length === 0) return alert(loc(sp.needElements));
    if (sp.deleteAlertValue === true) {
      var sure = confirm(loc(sp.sureDelete));
    }
    if (sp.deleteAlertValue === true && sure === false) return;

    var file = sp.getFileByName(sp.droplist.selection.text);
    var xml = new XML(file.readd());
    sp.gv.selection.forEach(function (item, index) {
      xml.child(item.index).setLocalName('waitToDelete');
      var preText = item.text;
      var image = sp.getImageFile(sp.droplist.selection.text, preText);
      if (image.exists) {
        image.remove();
      }
      var seqFolder = new Folder(image.toString().replace(/.png/i, '') + '_seq');
      if (seqFolder.exists) {
        sp.deleteThisFolder(seqFolder);
        seqFolder.remove();
      }
    });
    delete xml.waitToDelete;
    if (xml.children().length() !== 0) {
      file.writee(xml);
    } else {
      file.writee('<tree></tree>');
    }

    sp.gv.removeAll();
    sp.droplist.notify('onChange');
    sp.gv.refresh();
  };
  this.importImage = function () {
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
    var file = File.openDialog('Please select pictures', false);
    if (!file) return;
    if (file.name.split('.').pop() !== 'jpg' && file.name.split('.').pop() !== 'png') return;
    var imageFile = sp.getImageFile(sp.droplist.selection.text, sp.gv.lastSelectedItem.text);

    sp.cropImage(file, imageFile);
    sp.gv.lastSelectedItem.image = imageFile;
    sp.gv.refresh();
  };
  this.deleteGroup = function () {
    if (!sp.parentDroplist.selection) return;
    if (!sp.droplist.selection) return;
    var isSureDelete = confirm(loc(sp.isSureGroup));
    if (isSureDelete === true) isSureDelete = confirm(loc(sp.isSureGroup2));
    if (isSureDelete === false) return;

    var xml = new XML(sp.settingsFile.readd());
    var selectionText = sp.droplist.selection.text;

    var preIndex = sp.getGlobalIndexFromFileName(selectionText);

    xml.ListItems.child(preIndex).setLocalName('waitToDelete');
    delete xml.ListItems.waitToDelete;
    sp.settingsFile.writee(xml);
    sp.deleteIndexAndReload(preIndex);

    var imageFolder = sp.getImageFolderByName(selectionText);
    sp.deleteThisFolder(imageFolder);
    imageFolder.remove();

    var file = sp.getFileByName(selectionText);
    file.remove();

    sp.reloadParentDroplist();
    sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'));

    sp.preImageArr = [];
    var selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection - 1;
    sp.gv.refresh();
  };
  this.addGroup = function () {
    var newEleName = prompt(loc(sp.setName), 'Default');
    if (!newEleName) {
      return;
    }
    if (!sp.parentDroplist.selection) return alert(loc(sp.needModule));
    newEleName = sp.filterName(newEleName);
    if (sp.xmlFileNames.includes(newEleName)) {
      alert(loc(sp.existName));return;
    }

    var file = sp.getFileByName(newEleName);
    sp.getImageFolderByName(newEleName);
    var str = '<tree></tree>';
    file.writee(str);
    var xml = new XML(sp.settingsFile.readd());
    xml.ListItems.appendChild(new XML('<Name>' + newEleName + '</Name>'));

    var groupName = sp.parentDroplist.selection.text;
    sp.forEach(xml.ParentGroup, function (item, index) {
      if (item['@groupName'].toString() === groupName) {
        item.appendChild(new XML('<Index>' + (xml.ListItems.children().length() - 1).toString() + '</Index>'));
      }
    });

    sp.settingsFile.writee(xml);
    sp.reloadParentDroplist();
    sp.preImageArr = [];
    sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'));
    sp.droplist.selection = sp.droplist.items.length - 1;
    sp.gv.refresh();
  };
  this.exportFile = function () {
    var exportFolder = Folder.selectDialog('Please select folder');
    if (!exportFolder) return;
    if (!(exportFolder instanceof Folder)) return;
    var sourceFile = sp.getFileByName(sp.droplist.selection.text);
    var targetFile = File(exportFolder.toString() + sp.slash + sp.droplist.selection.text + '.xml');
    if (targetFile.exists) {
      alert(loc(sp.overWritten));return;
    }
    if (!sp.droplist.selection) return;

    var images = sp.getImageFolderByName(sp.droplist.selection.text).getFiles();
    var picXml = new XML('<pic></pic>');
    var seqXml = new XML('<seq></seq>');
    images.forEach(function (item, index) {
      if (item.name.indexOf('.png') !== -1) {
        item.open('r');
        item.encoding = 'binary';
        var str = encodeURIComponent(item.read());
        item.close();
        var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(item.name) + '</imgName>');
        var tempXmlHeres = new XML('<img>' + str + '</img>');
        var guluTempA = new XML('<imgInfo></imgInfo>');
        guluTempA.appendChild(tempXmlBigHere);
        guluTempA.appendChild(tempXmlHeres);
        picXml.appendChild(guluTempA);
      } else if (item instanceof Folder && item.name.indexOf('_seq') !== -1) {
        var thisFolder = item;
        var folderXml = new XML("<folder name='" + encodeURIComponent(item.name) + "'></folder>");
        var seqFiles = thisFolder.getFiles();
        seqFiles.forEach(function (imageFile, imageIndex) {
          imageFile.open('r');
          imageFile.encoding = 'binary';
          var str = encodeURIComponent(imageFile.read());
          imageFile.close();
          var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(imageFile.name) + '</imgName>');
          var tempXmlHeres = new XML('<img>' + str + '</img>');
          var guluTempA = new XML('<imgInfo></imgInfo>');
          guluTempA.appendChild(tempXmlBigHere);
          guluTempA.appendChild(tempXmlHeres);
          folderXml.appendChild(guluTempA);
        });
        seqXml.appendChild(folderXml);
      }
    });
    var xml = new XML(sourceFile.readd());
    if (picXml.children().length() > 0) {
      xml.appendChild(picXml);
    }
    if (seqXml.children().length() > 0) {
      xml.appendChild(seqXml);
    }
    if (xml.children().length() === 0) {
      xml = '<tree></tree>';
    }
    targetFile.writee(xml);
    clearOutput();
    writeLn('Complete!');
  };
  this.importFiles = function () {
    var files = File.openDialog('Please select xmls', '*.xml', true);
    if (!files) return;
    if (!sp.parentDroplist.selection) return alert(loc(sp.needModule));

    var selectionIndex = sp.parentDroplist.selection.index;
    files.forEach(function (item, index) {
      var file = sp.getFileByName(item.name.replace('.xml', ''));
      if (file.exists) return;
      item.copy(file.toString());
      var xml = new XML(file.readd());
      sp.forEach(xml.pic, function (item, index) {
        var image = sp.getImageFile(this.name.replace('.xml', ''), decodeURIComponent(item.imgName.toString()).replace('.png', ''));
        image.open('w');
        image.encoding = 'binary';
        image.write(decodeURIComponent(item.img.toString()));
        image.close();
      }, item);
      sp.forEach(xml.seq, function (folder, folderIndex) {
        var name = decodeURIComponent(folder['@name'].toString());
        var parentFolder = sp.getImageFolderByName(this.name.replace('.xml', ''));
        var targetFolder = new Folder(parentFolder.toString() + sp.slash + name);
        if (!targetFolder.exists) {
          targetFolder.create();
        }

        sp.forEach(folder, function (imageXml, imageIndex) {
          var imageFile = new File(this.toString() + sp.slash + decodeURIComponent(imageXml.imgName.toString()));
          imageFile.open('w');
          imageFile.encoding = 'binary';
          imageFile.write(decodeURIComponent(imageXml.img.toString()));
          imageFile.close();
        }, targetFolder);
      }, item);
      delete xml.pic;
      delete xml.seq;
      file.writee(xml);
      xml = new XML(sp.settingsFile.readd());
      xml.ListItems.appendChild(new XML('<Name>' + decodeURIComponent(item.name.replace('.xml', '')) + '</Name>'));
      xml.ParentGroup.child(selectionIndex).appendChild(new XML('<Index>' + (xml.ListItems.children().length() - 1).toString() + '</Index>'));

      sp.settingsFile.writee(xml.toString());
    });
    sp.reloadParentDroplist();
    sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'));
    sp.preImageArr = [];
    sp.droplist.selection = sp.droplist.items.length - 1;
    sp.gv.refresh();
  };
  this.changeName = function () {
    if (!sp.gv.children) return alert(loc(sp.needElement));
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
    var newEleName = prompt(loc(sp.setName), sp.gv.lastSelectedItem.text);
    if (!newEleName) {
      alert(loc(sp.blankName));return;
    }
    newEleName = sp.filterName(newEleName);
    if (sp.lookUpTextInChildren(newEleName, sp.gv.children)) {
      alert(loc(sp.existName));return;
    }

    var file = sp.getFileByName(sp.droplist.selection.text);
    var xml = new XML(file.readd());
    var image = sp.getImage(sp.droplist.selection.text, sp.gv.lastSelectedItem.text);

    if (sp.gv.lastSelectedItem.text === decodeURIComponent(xml.child(sp.gv.lastSelectedItem.index)['@name'].toString())) {
      xml.child(sp.gv.lastSelectedItem.index)['@name'] = encodeURIComponent(newEleName.toString());
      file.writee(xml);
    }

    var targetImage = sp.noImage;
    if (image.exists) {
      var seqFolder = new Folder(image.toString().replace(/.png/i, '') + '_seq');
      if (seqFolder.exists) {
        seqFolder.rename(newEleName.toString() + '_seq');
      }
      image.rename(newEleName.toString() + '.png');
      targetImage = sp.getImage(sp.droplist.selection.text, newEleName.toString());
      if (image.toString() !== targetImage.toString()) {
        image.remove();
      }
    }

    sp.gv.lastSelectedItem.text = newEleName.toString();
    sp.gv.lastSelectedItem.image = targetImage;
    sp.gv.refresh();
  };
  this.parentDroplistChange = function () {
    if (!this.selection) return;

    sp.saveSetting('parentSelection', this.selection.index.toString());
    sp.reloadDroplist();
    sp.preImageArr = [];
    var selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;
  };
  this.droplistChange = function () {
    if (!this.selection) return;
    var text = this.selection.text;
    var file = sp.getFileByName(text);
    if (file === -1) return;
    var content = file.readd();

    var indexArr = [];
    var j = -1;
    try {
      var thisStr = '<Element name="';
      j = content.indexOf(thisStr);
    } catch (err) {
      alert(err);
    }
    while (j !== -1) {
      var inputStr = '';
      var k = 0;
      while (content[j + thisStr.length + k] !== '"') {
        inputStr += content[j + thisStr.length + k];
        k++;
      }
      indexArr.push(inputStr);
      j = content.indexOf(thisStr, j + thisStr.length);
    }
    sp.gv.removeAll();
    sp.preImageArr = [];
    for (var i = 0; i < indexArr.length; i++) {
      var item = sp.gv.add(decodeURIComponent(indexArr[i]), sp.getImage(this.selection.text, indexArr[i]));
      sp.preImageArr.push(item.image);
    }
    sp.saveSetting('thisSelection', this.selection.index.toString());
    var arr = sp.getSetting('effectName').split(',');
    if (sp.lookUpInArray(this.selection.text, arr)) {
      sp.onlyEffectValue = true;
    } else {
      sp.onlyEffectValue = false;
    }
    sp.droplist.itemSize.height = 20;
    sp.gv.scrollBarValue = 0;
    sp.gv.refresh();
  };
  this.winResize = function () {
    var scale = sp.gv.scale;
    var spacing = 2 * scale;
    var parentDroplistWidth = 104 * scale;

    sp.win.outterGroup.location = [spacing, 0];
    sp.win.outterGroup.size = [sp.win.size[0], sp.win.size[1]];
    sp.gv.size([sp.win.outterGroup.size[0] - spacing * 2, sp.win.outterGroup.size[1] - 20]);
    sp.win.innerGroup.location = [1, 1];
    sp.win.innerGroup.size.width = sp.win.size[0] + 12;
    sp.droplist.size = [sp.win.size[0] * scale - parentDroplistWidth - spacing * 2, sp.win.innerGroup.size[1] - 3];
    sp.droplist.location.x = parentDroplistWidth;
    sp.droplist.itemSize.width = (sp.droplist.size.width - 27 * scale) / scale;
    sp.parentDroplist.size.width = parentDroplistWidth;
    sp.parentDroplist.size.height = sp.droplist.size.height;
    sp.parentDroplist.location.y = 0;
    sp.parentDroplist.itemSize.width = (parentDroplistWidth - 27 * scale) / scale;

    sp.gv.refresh();
  };
  this.winClose = function () {
    try {
      var thisStr = sp.win.size[0].toString() + ',' + sp.win.size[1].toString();
      sp.saveSetting('winSize', thisStr);
      thisStr = sp.win.location[0].toString() + ',' + sp.win.location[1].toString();
      sp.saveSetting('winLocation', thisStr);
    } catch (err) {}
    sp.renderTaskArray.forEach(function (item, index) {
      app.cancelTask(item);
    });
    sp.renderTaskArray.length = 0;
    sp.previewHelper = {};
  };
  this.rightClick = function (event) {
    keepRef.leftClick();
    var scale = sp.gv.scale;
    var alt = event.altKey;
    var key = ScriptUI.environment.keyboardState;
    if (key.ctrlKey === false && key.shiftKey === false && alt === false) {
      keepRef.shortMenu(event);
    } else if (key.ctrlKey === true && key.shiftKey === false && alt === false) {
      keepRef.newItem(event);
    } else if (key.ctrlKey === false && key.shiftKey === true && alt === false) {
      var currentPosition = [(event.screenX - 152) * scale, event.screenY * scale];
      moveItemWindow(currentPosition);
    } else if (key.ctrlKey === false && key.shiftKey === false && alt === true) {
      keepRef.newItem(event);
    } else if (key.ctrlKey === true && key.shiftKey === true && alt === true) {
      $.global.searchWindow && $.global.searchWindow();
    }
  };
  this.shortMenu = function (event) {
    if (!event) return;
    if (event.button === 2 && event.detail === 1 && event.altKey === false) {
      var currentPosition = [event.screenX, event.screenY];
      var screenString = $.screens[0].toString();
      var finalPositionXString = (screenString.match(/-(\w*?)\:/) || [])[1];

      if (currentPosition[0] + 180 > parseInt(finalPositionXString)) {
        currentPosition = [event.screenX - 180, event.screenY];
      }

      try {
        if (!sp.menu) {
          sp.menu = creatRightClickMenu();
        }
        sp.menu['preview'].text = sp.gv.selection.length === 0 ? loc(sp.previewAll) : loc(sp.previewSelected);
        sp.menu.frameLocation = currentPosition;
        sp.menu.show();
      } catch (err) {
        err.printa();
      }
    }
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (groupItem, win, callback) {
  var moveWin = new Window('dialog', 'Module', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = 'Group{\n    orientation: \'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],    helpTip:StaticText{text:\'' + loc(sp.moduleHelpTip) + '\'},\n    wlist:ListBox{properties:{multiselect:0}},\n    oc:Group{\n        alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],\n        ok:Button{text:\'' + loc(sp.changeModuleName) + '\'},\n        cancel:Button{text:\'' + loc(sp.quit) + '\'}\n    }\n  }';
  try {
    outRes = moveWin.add(outRes);
  } catch (err) {
    alert(err);
  }
  sp.xmlGroupNames.forEach(function (item, index) {
    this.add('item', item);
  }, outRes.wlist);

  outRes.wlist.addEventListener('keydown', function (k) {
    switch (k.keyName) {
      case 'Up':

        if (this.selection !== null && this.selection.index > 0) {
          var xml = new XML(sp.settingsFile.readd());
          var groupIndex = this.selection.index;
          var targetXml = xml.ParentGroup.child(groupIndex);

          xml.ParentGroup.insertChildBefore(xml.ParentGroup.child(groupIndex - 1), new XML(targetXml));
          xml.ParentGroup.child(groupIndex + 1).setLocalName('waitToDelete');
          delete xml.ParentGroup.waitToDelete;

          sp.settingsFile.writee(xml);

          sp.reloadParentDroplist();
          var selection = parseInt(sp.getSetting('parentSelection'));
          sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
          selection = parseInt(sp.getSetting('thisSelection'));
          sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

          sp.swap(outRes.wlist.items[this.selection.index - 1], outRes.wlist.items[this.selection.index]);
        };
        break;
      case 'Down':
        if (this.selection !== null && this.selection.index < this.items.length - 1) {
          xml = new XML(sp.settingsFile.readd());
          groupIndex = this.selection.index;
          targetXml = xml.ParentGroup.child(groupIndex);

          xml.ParentGroup.insertChildAfter(xml.ParentGroup.child(groupIndex + 1), new XML(targetXml));
          xml.ParentGroup.child(groupIndex).setLocalName('waitToDelete');
          delete xml.ParentGroup.waitToDelete;

          sp.settingsFile.writee(xml);

          sp.reloadParentDroplist();
          selection = parseInt(sp.getSetting('parentSelection'));
          sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
          selection = parseInt(sp.getSetting('thisSelection'));
          sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

          sp.swap(outRes.wlist.items[this.selection.index], outRes.wlist.items[this.selection.index + 1]);
        };
        break;
    }
  });

  outRes.oc.cancel.onClick = function () {
    moveWin.close();
    win.close();
    callback && callback();
  };

  outRes.oc.ok.onClick = function () {
    var wlist = outRes.wlist;
    if (!wlist.selection) return;
    var newGroupName = prompt(loc(sp.setName), wlist.selection.text);
    if (!newGroupName) return;
    if (sp.xmlGroupNames.includes(newGroupName)) {
      alert(loc(sp.existName));
      return;
    }

    var xml = new XML(sp.settingsFile.readd());
    var parentGroup = xml.ParentGroup;
    var groupIndex = wlist.selection.index;

    var editXml = parentGroup.child(groupIndex);
    editXml['@groupName'] = newGroupName;

    sp.settingsFile.writee(xml);

    sp.reloadParentDroplist();
    var selection = parseInt(sp.getSetting('parentSelection'));
    sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
    selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

    moveWin.close();
    win.close();
  };

  outRes.wlist.size = [200, 300];
  moveWin.show();
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settingsButtonFunc = __webpack_require__(0);

module.exports = function (xmlItem, groupItem, win) {
  var moveWin = new Window('dialog', 'Move', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = 'Group{\n    orientation: \'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],    wlist:ListBox{properties:{multiselect:0}},\n    oc:Group{\n        alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],\n        ok:Button{text:\'' + loc(sp.ok) + '\'},\n        cancel:Button{text:\'' + loc(sp.cancel) + '\'}\n    }\n  }';
  try {
    outRes = moveWin.add(outRes);
  } catch (err) {
    alert(err);
  }
  sp.xmlGroupNames.forEach(function (item, index) {
    this.add('item', item);
  }, outRes.wlist);

  outRes.oc.cancel.onClick = function () {
    moveWin.close();
    win.close();
    settingsButtonFunc();
  };

  outRes.oc.ok.onClick = function () {
    if (!outRes.wlist.selection) return;
    if (outRes.wlist.selection.text === groupItem.text) return;
    var xml = new XML(sp.settingsFile.readd());
    var parentGroup = xml.ParentGroup;
    var xmlIndex = xmlItem.index;
    var groupIndex = groupItem.index;

    var editXml = parentGroup.child(groupIndex).child(xmlIndex);
    var targetXml = parentGroup.child(outRes.wlist.selection.index);
    targetXml.appendChild(new XML(editXml));

    parentGroup.child(groupIndex).child(xmlIndex).setLocalName('waitToDelete');
    delete parentGroup.child(groupIndex).waitToDelete;
    sp.settingsFile.writee(xml);

    sp.reloadParentDroplist();
    var selection = parseInt(sp.getSetting('parentSelection'));
    sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
    selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

    moveWin.close();
    win.close();
    settingsButtonFunc();
  };

  outRes.wlist.size = [200, 300];
  moveWin.show();
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var upAndDown = function upAndDown(isUp, isW) {
  var file = sp.getFileByName(sp.droplist.selection.text);
  var xml = new XML(file.readd());
  if (isUp === true && sp.gv.lastSelectedItem !== null && sp.gv.lastSelectedItem.index > 0) {
    var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
    xml.insertChildBefore(xml.child(sp.gv.lastSelectedItem.index - 1), upxml);
    xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete');
    delete xml.waitToDelete;
    file.writee(xml);
    sp.gv.lastSelectedItem.moveUp();
  } else if (isUp === false && sp.gv.lastSelectedItem !== null && sp.gv.lastSelectedItem.index < xml.children().length() - 1) {
    var downxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
    xml.insertChildAfter(xml.child(sp.gv.lastSelectedItem.index + 1), downxml);
    xml.child(sp.gv.lastSelectedItem.index).setLocalName('waitToDelete');
    delete xml.waitToDelete;
    file.writee(xml);
    sp.gv.lastSelectedItem.moveDown();
  }
};

module.exports = function (cu) {
  var udWin = new Window('palette', loc(sp.ud));
  var udWins = udWin.add('Group{}');
  var a = udWins.add("Button{text:'" + loc(sp.up) + "'}");
  var b = udWins.add("Button{text:'" + loc(sp.down) + "'}");
  var c = udWins.add("Group{et:EditText{text:'0',characters:3,justify:'center'},j:Button{text:'" + loc(sp.jmp) + "'}}");
  udWin.frameLocation = cu;
  udWin.show();
  a.onClick = function () {
    upAndDown(true, true);
  };
  b.onClick = function () {
    upAndDown(false, true);
  };
  c.j.onClick = function () {
    var d = parseInt(c.et.text);
    var file = sp.getFileByName(sp.droplist.selection.text);
    var xml = new XML(file.readd());
    if (sp.gv.children.length === 0) return;
    if (sp.gv.lastSelectedItem === null) return;
    if (d >= 0 && d < sp.gv.children.length - 1 && sp.gv.lastSelectedItem.index !== d) {
      var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
      xml.insertChildBefore(xml.child(d), upxml);
      xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete');
      delete xml.waitToDelete;
      file.writee(xml);
      sp.gv.lastSelectedItem.moveBefore(sp.gv.children[d]);
    } else if (d === sp.gv.children.length - 1 && sp.gv.lastSelectedItem.index !== d) {
      upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
      xml.insertChildAfter(xml.child(d), upxml);
      xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete');
      delete xml.waitToDelete;
      file.writee(xml);
      sp.gv.lastSelectedItem.moveAfter(sp.gv.children[d]);
    } else {
      try {
        alert(loc(sp.from) + '~' + (sp.gv.children.length - 1).toString());
      } catch (er) {}
    }
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var outWin = new Window('window', 'Export', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = 'Group{\n    orientation: \'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],    wlist:ListBox{properties:{multiselect:1}},\n    oc:Group{\n        alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],\n        ok:Button{text:\'' + loc(sp.ok) + '\'},\n        cancel:Button{text:\'' + loc(sp.cancel) + '\'}\n    }\n  }';
  try {
    outRes = outWin.add(outRes);
  } catch (err) {
    alert(err);
  }
  for (var i = 0; i < sp.xmlFileNames.length; i++) {
    outRes.wlist.add('item', sp.xmlFileNames[i]);
  }
  outRes.wlist.size = [200, 400];
  outWin.show();

  outRes.oc.cancel.onClick = function () {
    outWin.close();
  };

  outRes.oc.ok.onClick = function () {
    if (outRes.wlist.selection !== null) {
      var exportFolder = Folder.selectDialog('Please select folder');
      if (exportFolder !== null && exportFolder instanceof Folder) {
        for (var i = 0; i < outRes.wlist.selection.length; i++) {
          var sourceFile = sp.getFileByName(outRes.wlist.selection[i].text);
          var targetFile = File(exportFolder.toString() + sp.slash + outRes.wlist.selection[i].text + '.xml');
          if (targetFile.exists) {
            continue;
          }

          var images = sp.getImageFolderByName(outRes.wlist.selection[i].text).getFiles();
          var picXml = new XML('<pic></pic>');
          var seqXml = new XML('<seq></seq>');
          images.forEach(function (item, index) {
            if (item.name.indexOf('.png') !== -1) {
              item.open('r');
              item.encoding = 'binary';
              var str = encodeURIComponent(item.read());
              item.close();
              var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(item.name) + '</imgName>');
              var tempXmlHeres = new XML('<img>' + str + '</img>');
              var guluTempA = new XML('<imgInfo></imgInfo>');
              guluTempA.appendChild(tempXmlBigHere);
              guluTempA.appendChild(tempXmlHeres);
              picXml.appendChild(guluTempA);
            } else if (item instanceof Folder && item.name.indexOf('_seq') !== -1) {
              var thisFolder = item;
              var folderXml = new XML("<folder name='" + encodeURIComponent(item.name) + "'></folder>");
              var seqFiles = thisFolder.getFiles();
              seqFiles.forEach(function (imageFile, imageIndex) {
                imageFile.open('r');
                imageFile.encoding = 'binary';
                var str = encodeURIComponent(imageFile.read());
                imageFile.close();
                var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(imageFile.name) + '</imgName>');
                var tempXmlHeres = new XML('<img>' + str + '</img>');
                var guluTempA = new XML('<imgInfo></imgInfo>');
                guluTempA.appendChild(tempXmlBigHere);
                guluTempA.appendChild(tempXmlHeres);
                folderXml.appendChild(guluTempA);
              });
              seqXml.appendChild(folderXml);
            }
          });
          var xml = new XML(sourceFile.readd());
          if (picXml.children().length() > 0) {
            xml.appendChild(picXml);
          }
          if (seqXml.children().length() > 0) {
            xml.appendChild(seqXml);
          }
          if (xml.children().length() === 0) {
            xml = '<tree></tree>';
          }
          targetFile.writee(xml);
        }
        clearOutput();
        writeLn('Complete!');
      }
    }
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var jinWin = new Window('dialog', loc(sp.settingPre));
  var jinRes = 'group{\n    orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n    guluG:Group{\n      orientation:\'row\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n      jinGroup:Group{\n        orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n        isJin:StaticText{text:\'' + loc(sp.isEffect) + '\'}\n        isJinSt:StaticText{text:\'' + loc(sp.jinOne) + '\',properties:{multiline:1}}\n        jin:Panel{\n          orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n          _1:Checkbox{text:\'' + loc(sp._1) + '\'},\n          _2:Checkbox{text:\'' + loc(sp._2) + '\'},\n          _3:Checkbox{text:\'' + loc(sp._3) + '\'},\n          _4:Checkbox{text:\'' + loc(sp._4) + '\'},\n          _5:Checkbox{text:\'' + loc(sp._5) + '\'},\n          _6:Checkbox{text:\'' + loc(sp._6) + '\'},\n          _7:Checkbox{text:\'' + loc(sp._7) + '\'},\n          _8:Checkbox{text:\'' + loc(sp._8) + '\'},\n          _9:Checkbox{text:\'' + loc(sp._9) + '\'},\n        }\n      },\n      delGroup:Group{\n        orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n        isJin:StaticText{text:\'' + loc(sp.cleanProperty) + '\'},\n        isJinSt:StaticText{text:\'' + loc(sp.jinTwo) + '\',properties:{multiline:1}},\n        del:Panel{\n          orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n          _1:Checkbox{text:\'' + loc(sp._1) + '\'},\n          _2:Checkbox{text:\'' + loc(sp._2) + '\'},\n          _3:Checkbox{text:\'' + loc(sp._3) + '\',enabled:0},\n          _4:Checkbox{text:\'' + loc(sp._4) + '\',enabled:0},\n          _5:Checkbox{text:\'' + loc(sp._5) + '\'},\n          _6:Checkbox{text:\'' + loc(sp._6) + '\'},\n          _7:Checkbox{text:\'' + loc(sp._7) + '\'},\n          _8:Checkbox{text:\'' + loc(sp._8) + '\',enabled:0},\n          _9:Checkbox{text:\'' + loc(sp._9) + '\',enabled:0},\n        }\n      },\n    },\n    oc:Group{\n      orientation:\'row\',alignment:[\'fill\',\'center\'],alignChildren:[\'center\',\'fill\'],\n      ok:Button{text:\'Ok\',preferredSize:[160,30]},\n    }\n  }';
  var jinGulu = jinWin.add(jinRes);

  var _loop = function _loop(i) {
    if (sp.haveSetting('_1_' + i) === false) {
      if (i === 1 || i === 2 || i === 5) {
        sp.saveSetting('_1_' + i, '1');
      } else {
        sp.saveSetting('_1_' + i, '0');
      }
    }
    try {
      jinGulu.guluG.jinGroup.jin['_' + i].value = sp.getSetting('_1_' + i) === '1';
      jinGulu.guluG.jinGroup.jin['_' + i].onClick = function () {
        sp.getSetting('_1_' + i);
        sp.saveSetting('_1_' + i, jinGulu.guluG.jinGroup.jin['_' + i].value === true ? '1' : '0');
      };
    } catch (err) {}
  };

  for (var i = 1; i <= 9; i++) {
    _loop(i);
  }

  var _loop2 = function _loop2(i) {
    if (sp.haveSetting('_2_' + i) === false) {
      sp.saveSetting('_2_' + i, '0');
    }

    try {
      jinGulu.guluG.delGroup.del['_' + i].value = sp.getSetting('_2_' + i) === '1';
      jinGulu.guluG.delGroup.del['_' + i].onClick = function () {
        sp.getSetting('_2_' + i);
        sp.saveSetting('_2_' + i, jinGulu.guluG.delGroup.del['_' + i].value === true ? '1' : '0');
      };
    } catch (err) {}
  };

  for (var i = 1; i <= 9; i++) {
    _loop2(i);
  }
  jinGulu.oc.ok.onClick = function () {
    jinWin.close();
  };
  jinWin.center();
  jinWin.show();
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settingWindow = __webpack_require__(0);
var presetWindow = __webpack_require__(26);

module.exports = function () {
  var itemList = [{ name: loc(sp.settings), type: 'button' }, { name: 'helperScripts', type: 'dropdownlist' }, { name: 'preview', type: 'button' }, { name: loc(sp.yushe), type: 'button' }, { name: loc(sp.changeName), type: 'button' }, { name: loc(sp.importPicture), type: 'button' }, { name: loc(sp.addModule), type: 'button' }, { name: loc(sp.deleteModule), type: 'button' }, { name: loc(sp.importFile), type: 'button' }, { name: loc(sp.exportFile), type: 'button' }, { name: loc(sp.addGroup), type: 'button' }, { name: loc(sp.deleteGroup), type: 'button' }, { name: loc(sp.addElement), type: 'button' }, { name: loc(sp.cover), type: 'button' }, { name: loc(sp.create), type: 'button' }, { name: loc(sp.deleteElement), type: 'button' }, { name: loc(sp.isShow), type: 'checkbox' }, { name: loc(sp.isName), type: 'checkbox', id: 'autoName' }, { name: loc(sp.isSavePreview), type: 'checkbox', id: 'savePreview' }, { name: loc(sp.isOffset), type: 'checkbox', id: 'saveMaterial' }, { name: loc(sp.isPrecomp), type: 'checkbox', id: 'preCompose' }, { name: loc(sp.isEffect), type: 'checkbox', id: 'onlyEffect' }, { name: loc(sp.cleanProperty), type: 'checkbox', id: 'cleanGroup' }, { name: loc(sp.offsetKey), type: 'checkbox', id: 'offsetKeyframe' }, { name: loc(sp.saveWorkarea), type: 'checkbox', id: 'saveWorkarea' }];

  var length = itemList.length;

  var space = 102 / 5;
  var buttonHeight = 20;
  var checkBoxHeight = 21;

  if (sp.lang === 'ch') {
    var maxWidth = 180;
  } else {
    maxWidth = 190;
  }

  var shortMenu = new Window('palette', '', [0, 0, maxWidth, Math.ceil(length / 2) * space + 2], {
    borderless: true
  });

  for (var i = 0; i < length; i++) {
    var item = itemList[i];
    var itemWidth = void 0,
        itemHeight = void 0;
    itemWidth = maxWidth / 2 + (item.widthOffset || 0);
    if (item.type === 'button') {
      itemHeight = buttonHeight;
    } else if (item.type === 'checkbox') {
      itemHeight = checkBoxHeight;
    } else if (item.type === 'dropdownlist') {
      itemHeight = buttonHeight;
    } else if (item.type === 'edittext') {
      itemHeight = buttonHeight;
    }
    var control;
    if (i % 2 === 0) {
      control = shortMenu[item.name] = shortMenu.add(item.type, [0, parseInt(i / 2) * itemHeight, itemWidth, 22 + parseInt(i / 2) * itemHeight], item.name);
    } else {
      control = shortMenu[item.name] = shortMenu.add(item.type, [itemWidth, parseInt((i - 1) / 2) * itemHeight, maxWidth, 22 + parseInt((i - 1) / 2) * itemHeight], item.name);
    }
    if (control && item.id) control.id = item.id;
  }

  var isCheckBoxClicked = false;

  shortMenu[loc(sp.settings)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    settingWindow();
  };

  shortMenu['helperScripts'].add('item', loc(sp.helperScripts));
  shortMenu['helperScripts'].add('item', loc(sp.expressionTranslate));
  shortMenu['helperScripts'].add('item', loc(sp.reloadGroup));
  shortMenu['helperScripts'].add('item', loc(sp.saveEachLayer));
  shortMenu['helperScripts'].selection = 0;

  shortMenu['helperScripts'].onChange = shortMenu['helperScripts'].onChanging = function () {
    try {
      this.selection.index === 1 && $.global.translate() || this.selection.index === 2 && $.global.reloadPic() || this.selection.index === 3 && $.global.autoSave();
    } catch (err) {
      err.printa();
    }

    this.selection = 0;
  };

  shortMenu['preview'].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.previewAll();
  };

  shortMenu[loc(sp.yushe)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    presetWindow();
  };

  shortMenu[loc(sp.changeName)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.changeName();
  };

  shortMenu[loc(sp.importPicture)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.importImage();
  };

  shortMenu[loc(sp.addModule)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.addModule();
  };

  shortMenu[loc(sp.deleteModule)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.deleteModule();
  };

  shortMenu[loc(sp.importFile)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.importFiles();
  };

  shortMenu[loc(sp.exportFile)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.exportFile();
  };

  shortMenu[loc(sp.addGroup)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.addGroup();
  };

  shortMenu[loc(sp.deleteGroup)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.deleteGroup();
  };

  shortMenu[loc(sp.addElement)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.newItem();
  };

  shortMenu[loc(sp.cover)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.cover();
  };

  shortMenu[loc(sp.create)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.newLayer();
  };

  shortMenu[loc(sp.deleteElement)].onClick = function () {
    isCheckBoxClicked = false;
    shortMenu.hide();
    sp.fns.deleteItem();
  };

  shortMenu[loc(sp.isShow)].value = sp.showThumbValue;
  shortMenu[loc(sp.isName)].value = sp.autoNameValue;
  shortMenu[loc(sp.isSavePreview)].value = sp.savePreviewValue;
  shortMenu[loc(sp.isOffset)].value = sp.saveMaterialValue;
  shortMenu[loc(sp.isPrecomp)].value = sp.preComposeValue;
  shortMenu[loc(sp.isEffect)].value = sp.onlyEffectValue;
  shortMenu[loc(sp.cleanProperty)].value = sp.cleanGroupValue;
  shortMenu[loc(sp.offsetKey)].value = sp.offsetKeyframeValue;
  shortMenu[loc(sp.saveWorkarea)].value = sp.saveWorkareaValue;

  shortMenu[loc(sp.isShow)].onClick = function () {
    sp.showThumbValue = this.value;
    $.global.sp.gv.showText = this.value;
    sp.saveSetting('showThumb', this.value.toString());
    isCheckBoxClicked = true;
    sp.gv.refresh();
  };

  shortMenu[loc(sp.isName)].onClick = shortMenu[loc(sp.isSavePreview)].onClick = shortMenu[loc(sp.isOffset)].onClick = shortMenu[loc(sp.isPrecomp)].onClick = shortMenu[loc(sp.isEffect)].onClick = shortMenu[loc(sp.cleanProperty)].onClick = shortMenu[loc(sp.offsetKey)].onClick = shortMenu[loc(sp.saveWorkarea)].onClick = function () {
    var name = this.id + 'Value';
    sp[name] = this.value;
    isCheckBoxClicked = true;
  };

  shortMenu.addEventListener('blur', function () {
    if (isCheckBoxClicked === false) {
      shortMenu.hide();
    } else {
      isCheckBoxClicked = true;
    }
  });

  shortMenu.onDeactivate = function () {
    shortMenu.hide();
  };

  shortMenu.addEventListener('keydown', function (event) {
    shortMenu.hide();
  });

  return shortMenu;
};

/***/ })
/******/ ]);
/****/ })(this)