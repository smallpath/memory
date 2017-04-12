
module.exports = function() {
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
