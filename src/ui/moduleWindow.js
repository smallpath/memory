module.exports = function(groupItem, win, callback) {
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
    callback && callback()
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
