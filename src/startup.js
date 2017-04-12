module.exports = (function() {
  if (!(sp.settingsFile.exists) || sp.settingsFile.length === 0) {
    if (sp.settingsFile.exists) sp.settingsFile.remove()
    var settingsText =
      '<settings>\
  <ListItems/>\
  <ParentGroup/>\
</settings>'
    var newsettingsxml = new XML(settingsText)
    var allFiles = sp.scriptFolder.getFiles()
    newsettingsxml.ParentGroup.appendChild(new XML("<item groupName='Default'/>"))
    var i = 0
    allFiles.forEach(function(item, index) {
      if (item.toString().indexOf('.xml') !== -1 && item.name.indexOf('settings.xml') === -1) {
        newsettingsxml.ListItems.appendChild(new XML('<Name>' + item.displayName.replace('.xml', '') + '</Name>'))
        newsettingsxml.ParentGroup.child(0).appendChild(new XML('<Index>' + i + '</Index>'))
        i++
      }
    })
    sp.settingsFile.writee(newsettingsxml)
  }

  //  If the file do not have the ParentGroup,add parentGroup to it
  var content = new XML(sp.settingsFile.readd())
  if (!content.hasOwnProperty('ParentGroup')) { content.appendChild(new XML('<ParentGroup/>')) }
  if (content.ParentGroup.children().length() === 0) {
    content.ParentGroup.appendChild(new XML("<item groupName='Default'/>"))
    sp.forEach(content.ListItems, function(item, index) {
      content.ParentGroup.child(0).appendChild(new XML('<Index>' + index.toString() + '</Index>'))
    })
    sp.settingsFile.writee(content)
  }

  //  If the file do not have a group,give it
  content = new XML(sp.settingsFile.readd())
  if (!content.hasOwnProperty('ListItems')) { content.appendChild(new XML('<ListItems/>')) }
  if (content.ListItems.children().length() === 0) {
    allFiles = sp.scriptFolder.getFiles()
    allFiles.forEach(function(item, index) {
      if (item.toString().indexOf('.xml') !== -1 && item.name.indexOf('settings.xml') === -1) {
        content.ListItems.appendChild(new XML('<Name>' + item.displayName.replace('.xml', '') + '</Name>'))
        content.ParentGroup.child(0).appendChild(new XML('<Index>' + index.toString() + '</Index>'))
      }
    })
  }
  if (content.ListItems.children().length() === 0) {
    content.ListItems.appendChild(new XML('<Name>Default</Name>'))
    content.ParentGroup.child(0).appendChild(new XML('<Index>' + 0 + '</Index>'))
    var file = sp.getFileByName('Default')
    sp.getImageFolderByName('Default')
    var str = '<tree></tree>'
    file.writee(str)
  }

  sp.settingsFile.writee(content)
})()
