
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

module.exports = function(cu) {
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
