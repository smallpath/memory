var settingsButtonFunc = require('./settingWindow')

module.exports = function(xmlItem, groupItem, win) {
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
