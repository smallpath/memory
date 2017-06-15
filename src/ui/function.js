var creatRightClickMenu = require('./rightClickMenu')
var moveItemWindow = require('./moveItemWindow')

module.exports = function() {
  var keepRef = this
  this.previewAll = function() {
    if (sp.gv.children.length === 0) return

    keepRef.moveOut()

    var lenArr = []
    var oneFrame = sp.frameSecond
    sp.previewHelper = {}
    var items = (sp.gv.selection.length === 0) ? sp.gv.children : sp.gv.selection

    for (var iter = 0, thisLen = items.length; iter < thisLen; iter++) {
      var item = items[iter]
      var img = item.image
      var index = item.index

      if (!img.parent) return
      var folder = new Folder(img.parent)

      if (!(folder instanceof Folder)) return
      var targetFolder = new Folder(folder.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq')

      try {
        if (!targetFolder.exists) {
          if (targetFolder.parent.toString().indexOf('_seq') === -1) {
            targetFolder = new Folder(folder.parent.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq')
            img = new File(folder.parent.toString() + sp.slash + item.text + '.png')
          }
        }
      } catch (err) {
        // cout<<"----"+decodeURIComponent ( targetFolder.toString())+'\r\nseq folder not found\r'+iter ;
      }

      if (!targetFolder.exists) {
        // cout<<decodeURIComponent ( targetFolder.toString())+'\r\nseq folder not found\r'+iter;
        continue
      }
      if (!img.exists) {
        // cout<<'image not found\r'+iter ;
        continue
      }

      sp.previewHelper['item' + index] = {}
      sp.previewHelper['item' + index]['tempItem'] = item
      sp.previewHelper['item' + index]['tempImg'] = img
      sp.previewHelper['item' + index]['currentIndex'] = 0
      sp.previewHelper['item' + index]['tempFiles'] = (function(f) {
        var len = f.getFiles().length
        var arr = []
        for (var i = 0; i < len; i++) {
          var newFile = new File(f.toString() + sp.slash + i.toString() + '.png')
          if (newFile.exists) { arr.push(newFile) }
        }
        return arr
      })(targetFolder)

      lenArr.push(sp.previewHelper['item' + index]['tempFiles'])
    }

    lenArr.sort(function(a, b) { return a.length - b.length })

    if (lenArr.length === 0) return

    var maxLen = lenArr[lenArr.length - 1].length

    for (var i = 0, len = maxLen; i <= len; i++) {
      var stringToCall = `
      if (sp) {
        if (sp.gv) {
          if (sp.gv.children) {

            var len = sp.gv.children.length;
            for (var itemIndex = 0; itemIndex < len; itemIndex++) {
              var currentItem = sp.previewHelper["item" + itemIndex];
              if (currentItem) {

                var currentIndex = currentItem["currentIndex"];
                currentItem["currentIndex"]++;
                var currentIndexTemp = currentItem["tempFiles"];
                if (currentIndexTemp) {
                  var currentFile = currentIndexTemp[currentIndex];
                  if (currentFile) {

                    if (currentItem["tempItem"])
                      currentItem["tempItem"].image = currentFile;

                  } else {
                    currentItem["currentIndex"] = 0;
                  }
                }
              }
            }
            if (isValid(sp.gv.list))
              sp.gv.refresh();

          }
        }
      }`
      sp.renderTaskArray.push(app.scheduleTask(stringToCall, 0 + oneFrame * i, true))
    }

    sp.isLoopPreview = true
  }
  this.moveOver = function(event, item, isClick) {
    if (sp.isLoopPreview === true) return

    if (!item) {
      sp.isOutside = true
      return
    }

    if (typeof isClick !== 'undefined') {
      if (sp.isOutside === true) {
        return
      }
    } else {
      if (sp.isOutside === false) {
        return
      }
    }

    var img = item.image
    var index = item.index
    var oneFrame = sp.frameSecond

    if (!img.parent) return
    var folder = new Folder(img.parent)

    if (!(folder instanceof Folder)) return
    var targetFolder = new Folder(folder.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq')

    if (!targetFolder.exists) {
      if (targetFolder.parent.toString().indexOf('_seq') === -1) {
        targetFolder = new Folder(folder.parent.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq')
        img = new File(folder.parent.toString() + sp.slash + item.text + '.png')
      }
    }

    if (!targetFolder.exists) { return }
    if (!img.exists) { return }

    sp.previewHelper['item' + index] = {}
    sp.previewHelper['item' + index]['tempItem'] = item
    sp.previewHelper['item' + index]['tempImg'] = img
    sp.previewHelper['item' + index]['currentIndex'] = 0
    sp.previewHelper['item' + index]['tempFiles'] = (function(f) {
      var len = f.getFiles().length
      var arr = []
      for (var i = 0; i < len; i++) {
        var newFile = new File(f.toString() + sp.slash + i.toString() + '.png')
        if (newFile.exists) { arr.push(newFile) }
      }
      return arr
    })(targetFolder)

    if (sp.previewHelper['item' + index]['tempFiles'].length === 0) return

    for (var i = 0, len = sp.previewHelper['item' + index]['tempFiles'].length; i <= len; i++) {
      var stringToCall = `
      if (sp) {
        if (sp.gv) {
          if (sp.gv.children) {

            var len = sp.gv.children.length;
            for (var itemIndex = 0; itemIndex < len; itemIndex++) {
              var currentItem = sp.previewHelper["item" + itemIndex];
              if (currentItem) {
                var currentIndex = currentItem["currentIndex"];
                currentItem["currentIndex"]++;

                var currentIndexTemp = currentItem["tempFiles"];
                if (currentIndexTemp) {
                  var currentFile = currentIndexTemp[currentIndex];
                  if (currentFile) {
                    if (currentItem["tempItem"])
                      currentItem["tempItem"].image = currentFile;
                  } else {
                    var currentImg = currentItem["tempImg"];
                    if (currentImg) {
                      currentItem["tempItem"].image = currentImg;
                    }
                    sp.previewHelper["item" + itemIndex] = {};
                  }
                }
              }
            }
            if (isValid(sp.gv.list))
              sp.gv.refresh();

          }
        }
      }`
      sp.renderTaskArray.push(app.scheduleTask(stringToCall, 0 + oneFrame * i, false))
    }

    sp.isOutside = false
    sp.isLoopPreview = false
  }
  this.leftClick = function() {
    if (sp.isLoopPreview === false) return

    keepRef.moveOut()

    sp.isLoopPreview = false
  }
  this.moveOut = function() {
    sp.renderTaskArray.forEach(function(item, index) {
      app.cancelTask(item)
    })
    sp.renderTaskArray.length = 0

    if (sp.gv.children.length !== 0) {
      sp.preImageArr.forEach(function(item, index) {
        sp.gv.children[index].image = item
      })
    }

    sp.previewHelper = {}
  }
  this.addModule = function() {
    var newEleName = prompt(loc(sp.setName), 'Default')
    if (!newEleName) { return }
    newEleName = sp.filterName(newEleName)
    if (sp.lookUpTextInChildren(newEleName, sp.parentDroplist.items)) { alert(loc(sp.existName)); return }

    var content = new XML(sp.settingsFile.readd())
    content.ParentGroup.appendChild(new XML("<item groupName = '" + newEleName + "'></item>"))
    sp.settingsFile.writee(content)
    sp.reloadParentDroplist()
    sp.parentDroplist.selection = sp.parentDroplist.items.length - 1
    sp.preImageArr = []
    var selection = parseInt(sp.getSetting('thisSelection'))
    sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0
    sp.gv.refresh()
  }
  this.deleteModule = function() {
    if (!sp.parentDroplist.selection) return
    var isSureDelete = confirm(loc(sp.deleteModuleAlert))
    if (isSureDelete === true) isSureDelete = confirm(loc(sp.addAlert) + loc(sp.deleteModuleAlert))
    if (isSureDelete === false) return

    var groupName = sp.parentDroplist.selection.text

    sp.xmlCurrentFileNames.forEach(function(item, index) {
      var xml = new XML(sp.settingsFile.readd())
      var selectionText = item

      var preIndex = sp.getGlobalIndexFromFileName(item)
      xml.ListItems.child(preIndex).setLocalName('waitToDelete')
      delete xml.ListItems.waitToDelete
      sp.settingsFile.writee(xml)
      sp.deleteIndexAndReload(preIndex)

      var imageFolder = sp.getImageFolderByName(selectionText)
      sp.deleteThisFolder(imageFolder)
      imageFolder.remove()

      var file = sp.getFileByName(selectionText)
      file.remove()
    })

    var xml = new XML(sp.settingsFile.readd())
    sp.forEach(xml.ParentGroup, function(item, index) {
      if (item['@groupName'].toString() === groupName) {
        item.setLocalName('waitToDelete')
      }
    })
    delete xml.ParentGroup.waitToDelete
    sp.settingsFile.writee(xml)

    sp.reloadParentDroplist()
    sp.preImageArr = []
    var selection = parseInt(sp.getSetting('parentSelection'))
    sp.parentDroplist.selection = (selection - 1 <= sp.parentDroplist.items.length - 1 && selection - 1 >= 0) ? selection - 1 : 0
    selection = parseInt(sp.getSetting('thisSelection'))
    sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0
    sp.gv.refresh()
  }
  this.newLayer = function() {
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElements))
    var comp = app.project.activeItem
    if (!(comp instanceof CompItem)) return alert(loc(sp.needComp))
    if (sp.onlyEffectValue === true && comp.selectedLayers.length === 0) return alert(loc(sp.needLayers))

    var xml = new XML(sp.getFileByName(sp.droplist.selection.text).readd())
    xml = xml.child(sp.gv.lastSelectedItem.index)

    var precomposeName = decodeURIComponent(xml['@name'].toString())

    app.beginUndoGroup('Undo new')

    if (sp.onlyEffectValue === false) {
      var folderName = sp.getSetting('folderName')
      var text = sp.gv.lastSelectedItem.text
      var compFolder = app.project.items.addFolder(text + '.sp')
      var sourceFolder = app.project.items.addFolder('Sources')

      var resultArr = sp.lookUpInItem(folderName, app.project.items)
      if (resultArr[0] === true) {
        var parentFolder = resultArr[1]
        compFolder.parentFolder = parentFolder
      } else {
        parentFolder = app.project.items.addFolder(folderName)
        compFolder.parentFolder = parentFolder
      }
      sourceFolder.parentFolder = compFolder
      sp.compFolder = compFolder
      sp.sourceFolder = sourceFolder

      var currentTime = comp.time
      var options = {
        compFolder: sp.compFolder,
        sourceFolder: sp.sourceFolder
      }

      var activeCompLayersArr = sp.newLayers(xml, comp, options)

      comp.time = currentTime

      sourceFolder.numItems === 0 && sourceFolder.remove()
      compFolder.numItems === 0 && compFolder.remove()
    } else {
      activeCompLayersArr = comp.selectedLayers
      sp.newProperties(xml, comp.selectedLayers, sp.cleanGroupValue, sp.offsetKeyframeValue)
    }

    app.endUndoGroup()

    //  Precompose layers and cut their length,no matter whether they are created by newLayers() or selected by user.
    if (sp.preComposeValue === true) {
      var indexArr = []
      var inPointArr = []
      var outPointArr = []

      activeCompLayersArr.forEach(function(item, index) {
        indexArr.push(item.index)
        inPointArr.push(item.inPoint)
        outPointArr.push(item.outPoint)
      })

      inPointArr.sort(function(a, b) { return a - b })
      outPointArr.sort(function(a, b) { return b - a })

      app.beginUndoGroup('Undo precomp')
      app.project.activeItem.layers.precompose(indexArr, precomposeName, true)
      app.project.activeItem.selectedLayers[0].inPoint = inPointArr[0]
      app.project.activeItem.selectedLayers[0].outPoint = outPointArr[0]
      app.endUndoGroup()
    }

    //  Return the layer array
    if (sp.onlyEffectValue === false) {
      try {
        if (sp.preComposeValue === false && activeCompLayersArr.length === 1 && activeCompLayersArr[0].source instanceof CompItem) {
          activeCompLayersArr[0].selected = true
          app.executeCommand(2156) // fit to comp
          activeCompLayersArr[0].selected = false
        }
      } catch (err) { writeLn(err.line.toString()) }
      return activeCompLayersArr
    } else {
      return null
    }
  }
  this.cover = function() {
    if (!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers))
    var thisComp = app.project.activeItem
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement))
    var itemName = sp.gv.lastSelectedItem.text

    app.beginSuppressDialogs()
    app.beginUndoGroup('Undo save')

    var imageFile = sp.getImageFile(sp.droplist.selection.text, itemName)

    var seqFolder = new Folder(imageFile.toString().replace(/.png/i, '') + '_seq')
    if (seqFolder.exists) {
      sp.deleteThisFolder(seqFolder)
      seqFolder.remove()
    }

    sp.newItemOrCover = 'cover'

    if (sp.isCC2015 === true) {
      itemName = sp.savePng2(imageFile)
    } else {
      itemName = sp.savePng(imageFile)
    }

    var xml = sp.getXmlFromLayers(thisComp.selectedLayers, itemName, sp)

    sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text), xml, sp.gv.lastSelectedItem.index)

    sp.gv.lastSelectedItem.image = null
    sp.gv.lastSelectedItem.image = sp.getImage(sp.droplist.selection.text, itemName)
    sp.gv.refresh()

    app.endUndoGroup()
    app.endSuppressDialogs(false)
  }
  this.newItem = function() {
    try {
      if (!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers))
      var thisComp = app.project.activeItem
      if (sp.autoNameValue === false) {
        var itemName = prompt(loc(sp.setName), 'Name')
      } else {
        itemName = thisComp.selectedLayers[0].name
      }

      if (sp.autoNameValue === false && itemName === '' || itemName === null) return

      itemName = sp.filterName(itemName)

      app.beginSuppressDialogs()
      app.beginUndoGroup('Undo save')

      sp.newItemOrCover = 'newItem'

      var time = thisComp.time

      if (sp.isCC2015 === true) {
        itemName = sp.savePng2(sp.getImageFile(sp.droplist.selection.text, itemName))
      } else {
        itemName = sp.savePng(sp.getImageFile(sp.droplist.selection.text, itemName))
      }

      var xml = sp.getXmlFromLayers(thisComp.selectedLayers, itemName, sp)
      sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text), xml)

      var item = sp.gv.add(decodeURIComponent(itemName), sp.getImage(sp.droplist.selection.text, itemName))
      sp.preImageArr.push(item.image)
      sp.gv.refresh()

      thisComp.time = time

      app.endUndoGroup()
      app.endSuppressDialogs(false)
    } catch (err) { err.printc(); err.printa() }
  }
  this.deleteItem = function() {
    if (sp.gv.selection.length === 0) return alert(loc(sp.needElements))
    if (sp.deleteAlertValue === true) { var sure = confirm(loc(sp.sureDelete)) }
    if (sp.deleteAlertValue === true && sure === false) return

    var file = sp.getFileByName(sp.droplist.selection.text)
    var xml = new XML(file.readd())
    sp.gv.selection.forEach(function(item, index) {
      xml.child(item.index).setLocalName('waitToDelete')
      var preText = item.text
      var image = sp.getImageFile(sp.droplist.selection.text, preText)
      if (image.exists) { image.remove() }
      var seqFolder = new Folder(image.toString().replace(/.png/i, '') + '_seq')
      if (seqFolder.exists) {
        sp.deleteThisFolder(seqFolder)
        seqFolder.remove()
      }
    })
    delete xml.waitToDelete
    if (xml.children().length() !== 0) {
      file.writee(xml)
    } else {
      file.writee('<tree></tree>')
    }

    sp.gv.removeAll()
    sp.droplist.notify('onChange')
    sp.gv.refresh()
  }
  this.importImage = function() {
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement))
    var file = File.openDialog('Please select pictures', false)
    if (!file) return
    if (file.name.split('.').pop() !== 'jpg' && file.name.split('.').pop() !== 'png') return
    var imageFile = sp.getImageFile(sp.droplist.selection.text, sp.gv.lastSelectedItem.text)

    sp.cropImage(file, imageFile)
    sp.gv.lastSelectedItem.image = imageFile
    sp.gv.refresh()
  }
  this.deleteGroup = function() {
    if (!sp.parentDroplist.selection) return
    if (!sp.droplist.selection) return
    var isSureDelete = confirm(loc(sp.isSureGroup))
    if (isSureDelete === true) isSureDelete = confirm(loc(sp.isSureGroup2))
    if (isSureDelete === false) return

    var xml = new XML(sp.settingsFile.readd())
    var selectionText = sp.droplist.selection.text

    var preIndex = sp.getGlobalIndexFromFileName(selectionText)

    // delete the child
    xml.ListItems.child(preIndex).setLocalName('waitToDelete')
    delete xml.ListItems.waitToDelete
    sp.settingsFile.writee(xml)
    sp.deleteIndexAndReload(preIndex)

    //  delete the imagesFolder
    var imageFolder = sp.getImageFolderByName(selectionText)
    sp.deleteThisFolder(imageFolder)
    imageFolder.remove()

    // delete the files
    var file = sp.getFileByName(selectionText)
    file.remove()

    sp.reloadParentDroplist()
    sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'))

    sp.preImageArr = []
    var selection = parseInt(sp.getSetting('thisSelection'))
    sp.droplist.selection = selection - 1
    sp.gv.refresh()
  }
  this.addGroup = function() {
    var newEleName = prompt(loc(sp.setName), 'Default')
    if (!newEleName) { return }
    if (!sp.parentDroplist.selection) return alert(loc(sp.needModule))
    newEleName = sp.filterName(newEleName)
    if (sp.xmlFileNames.includes(newEleName)) { alert(loc(sp.existName)); return }

    var file = sp.getFileByName(newEleName)
    sp.getImageFolderByName(newEleName)
    var str = '<tree></tree>'
    file.writee(str)
    var xml = new XML(sp.settingsFile.readd())
    xml.ListItems.appendChild(new XML('<Name>' + newEleName + '</Name>'))

    var groupName = sp.parentDroplist.selection.text
    sp.forEach(xml.ParentGroup, function(item, index) {
      if (item['@groupName'].toString() === groupName) {
        item.appendChild(new XML('<Index>' + (xml.ListItems.children().length() - 1).toString() + '</Index>'))
      }
    })

    sp.settingsFile.writee(xml)
    sp.reloadParentDroplist()
    sp.preImageArr = []
    sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'))
    sp.droplist.selection = sp.droplist.items.length - 1
    sp.gv.refresh()
  }
  this.exportFile = function() {
    var exportFolder = Folder.selectDialog('Please select folder')
    if (!exportFolder) return
    if (!(exportFolder instanceof Folder)) return
    var sourceFile = sp.getFileByName(sp.droplist.selection.text)
    var targetFile = File(exportFolder.toString() + sp.slash + sp.droplist.selection.text + '.xml')
    if (targetFile.exists) { alert(loc(sp.overWritten)); return }
    if (!sp.droplist.selection) return

    var images = sp.getImageFolderByName(sp.droplist.selection.text).getFiles()
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
    clearOutput()
    writeLn('Complete!')
  }
  this.importFiles = function() {
    var files = File.openDialog('Please select xmls', '*.xml', true)
    if (!files) return
    if (!sp.parentDroplist.selection) return alert(loc(sp.needModule))

    var selectionIndex = sp.parentDroplist.selection.index
    files.forEach(function(item, index) {
      var file = sp.getFileByName(item.name.replace('.xml', ''))
      if (file.exists) return
      item.copy(file.toString())
      var xml = new XML(file.readd())
      sp.forEach(xml.pic, function(item, index) {
        var image = sp.getImageFile(this.name.replace('.xml', ''), decodeURIComponent(item.imgName.toString()).replace('.png', ''))
        image.open('w')
        image.encoding = 'binary'
        image.write(decodeURIComponent(item.img.toString()))
        image.close()
      }, item)
      sp.forEach(xml.seq, function(folder, folderIndex) {
        var name = decodeURIComponent(folder['@name'].toString())
        var parentFolder = sp.getImageFolderByName(this.name.replace('.xml', ''))
        var targetFolder = new Folder(parentFolder.toString() + sp.slash + name)
        if (!targetFolder.exists) { targetFolder.create() }

        sp.forEach(folder, function(imageXml, imageIndex) {
          var imageFile = new File(this.toString() + sp.slash + decodeURIComponent(imageXml.imgName.toString()))
          imageFile.open('w')
          imageFile.encoding = 'binary'
          imageFile.write(decodeURIComponent(imageXml.img.toString()))
          imageFile.close()
        }, targetFolder)
      }, item)
      delete xml.pic
      delete xml.seq
      file.writee(xml)
      xml = new XML(sp.settingsFile.readd())
      xml.ListItems.appendChild(new XML('<Name>' + decodeURIComponent(item.name.replace('.xml', '')) + '</Name>'))
      xml.ParentGroup.child(selectionIndex).appendChild(new XML('<Index>' + (xml.ListItems.children().length() - 1).toString() + '</Index>'))

      sp.settingsFile.writee(xml.toString())
    })
    sp.reloadParentDroplist()
    sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'))
    sp.preImageArr = []
    sp.droplist.selection = sp.droplist.items.length - 1
    sp.gv.refresh()
  }
  this.changeName = function() {
    if (!sp.gv.children) return alert(loc(sp.needElement))
    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement))
    var newEleName = prompt(loc(sp.setName), sp.gv.lastSelectedItem.text)
    if (!newEleName) { alert(loc(sp.blankName)); return }
    newEleName = sp.filterName(newEleName)
    if (sp.lookUpTextInChildren(newEleName, sp.gv.children)) { alert(loc(sp.existName)); return }

    var file = sp.getFileByName(sp.droplist.selection.text)
    var xml = new XML(file.readd())
    var image = sp.getImage(sp.droplist.selection.text, sp.gv.lastSelectedItem.text)

    if (sp.gv.lastSelectedItem.text === decodeURIComponent(xml.child(sp.gv.lastSelectedItem.index)['@name'].toString())) {
      xml.child(sp.gv.lastSelectedItem.index)['@name'] = encodeURIComponent(newEleName.toString())
      file.writee(xml)
    }

    var targetImage = sp.noImage
    if (image.exists) {
      var seqFolder = new Folder(image.toString().replace(/.png/i, '') + '_seq')
      if (seqFolder.exists) {
        seqFolder.rename(newEleName.toString() + '_seq')
      }
      image.rename(newEleName.toString() + '.png')
      targetImage = sp.getImage(sp.droplist.selection.text, newEleName.toString())
      if (image.toString() !== targetImage.toString()) {
        image.remove()
      }
    }

    sp.gv.lastSelectedItem.text = newEleName.toString()
    sp.gv.lastSelectedItem.image = targetImage
    sp.gv.refresh()
  }
  this.parentDroplistChange = function() {
    if (!this.selection) return

    sp.saveSetting('parentSelection', this.selection.index.toString())
    sp.reloadDroplist()
    sp.preImageArr = []
    var selection = parseInt(sp.getSetting('thisSelection'))
    sp.droplist.selection = (selection <= sp.droplist.items.length - 1 && selection >= 0) ? selection : 0
  }
  this.droplistChange = function() {
    if (!this.selection) return
    var text = this.selection.text
    var file = sp.getFileByName(text)
    if (file === -1) return
    var content = file.readd()

    var indexArr = []
    var j = -1
    try {
      var thisStr = '<Element name="'
      j = content.indexOf(thisStr)
    } catch (err) { alert(err) }
    while (j !== -1) {
      var inputStr = ''
      var k = 0
      while (content[j + thisStr.length + k] !== '"') {
        inputStr += content[j + thisStr.length + k]
        k++
      }
      indexArr.push(inputStr)
      j = content.indexOf(thisStr, j + thisStr.length)
    }
    sp.gv.removeAll()
    sp.preImageArr = []
    for (var i = 0; i < indexArr.length; i++) {
      var item = sp.gv.add(decodeURIComponent(indexArr[i]), sp.getImage(this.selection.text, indexArr[i]))
      sp.preImageArr.push(item.image)
    }
    sp.saveSetting('thisSelection', this.selection.index.toString())
    var arr = sp.getSetting('effectName').split(',')
    if (sp.lookUpInArray(this.selection.text, arr)) { sp.onlyEffectValue = true } else { sp.onlyEffectValue = false }
    sp.droplist.itemSize.height = 20
    sp.gv.scrollBarValue = 0
    sp.gv.refresh()
  }
  this.winResize = function() {
    var scale = sp.gv.scale
    var spacing = 2 * scale
    var parentDroplistWidth = 104 * scale

    sp.win.outterGroup.location = [spacing, 0]
    sp.win.outterGroup.size = [sp.win.size[0], sp.win.size[1]]
    sp.gv.size([sp.win.outterGroup.size[0] - spacing * 2, sp.win.outterGroup.size[1] - 20])
    sp.win.innerGroup.location = [1, 1]
    sp.win.innerGroup.size.width = sp.win.size[0] + 12
    sp.droplist.size = [(sp.win.size[0] * scale - parentDroplistWidth - spacing * 2), sp.win.innerGroup.size[1] - 3]
    sp.droplist.location.x = parentDroplistWidth
    sp.droplist.itemSize.width = (sp.droplist.size.width - 27 * scale) / scale
    sp.parentDroplist.size.width = parentDroplistWidth
    sp.parentDroplist.size.height = sp.droplist.size.height
    sp.parentDroplist.location.y = 0 // fix margin error for mac
    sp.parentDroplist.itemSize.width = (parentDroplistWidth - 27 * scale) / scale
    // var screen = $.screens[0].toString().split('-').pop().split(':')
    // var max = parseInt(screen[1]) - 500
    // if (sp.droplist.size[1] >= max) sp.droplist.size[1] = max
    // if (sp.parentDroplist.size[1] >= max) sp.parentDroplist.size[1] = max
    sp.gv.refresh()
  }
  this.winClose = function() {
    try {
      var thisStr = sp.win.size[0].toString() + ',' + sp.win.size[1].toString()
      sp.saveSetting('winSize', thisStr)
      thisStr = sp.win.location[0].toString() + ',' + sp.win.location[1].toString()
      sp.saveSetting('winLocation', thisStr)
    } catch (err) {}
    sp.renderTaskArray.forEach(function(item, index) {
      app.cancelTask(item)
    })
    sp.renderTaskArray.length = 0
    sp.previewHelper = {}
  }
  this.rightClick = function(event) {
    keepRef.leftClick()
    var scale = sp.gv.scale
    var alt = event.altKey
    var key = ScriptUI.environment.keyboardState
    if (key.ctrlKey === false && key.shiftKey === false && alt === false) {
      keepRef.shortMenu(event)
    } else if (key.ctrlKey === true && key.shiftKey === false && alt === false) {
      keepRef.newItem(event)
    } else if (key.ctrlKey === false && key.shiftKey === true && alt === false) {
      var currentPosition = [(event.screenX - 152) * scale, event.screenY * scale]
      moveItemWindow(currentPosition)
    } else if (key.ctrlKey === false && key.shiftKey === false && alt === true) {
      keepRef.newItem(event)
    } else if (key.ctrlKey === true && key.shiftKey === true && alt === true) {
      $.global.searchWindow && $.global.searchWindow()
    }
  }
  this.shortMenu = function(event) {
    if (!event) return
    if (event.button === 2 && event.detail === 1 && event.altKey === false) {
      var currentPosition = [event.screenX, event.screenY]
      var screenString = $.screens[0].toString()
      var finalPositionXString = (screenString.match(/-(\w*?)\:/) || [])[1]

      if (currentPosition[0] + 180 > parseInt(finalPositionXString)) {
        currentPosition = [event.screenX - 180, event.screenY]
      }

      try {
        if (!sp.menu) {
          sp.menu = creatRightClickMenu()
        }
        sp.menu['preview'].text = (sp.gv.selection.length === 0) ? loc(sp.previewAll) : loc(sp.previewSelected)
        sp.menu.frameLocation = currentPosition
        sp.menu.show()
      } catch (err) { err.printa() }
    }
  }
}
