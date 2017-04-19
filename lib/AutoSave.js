// 批量自动保存每一层为新Item
$.global.autoSave = autoSave
function autoSave() {
  if (confirm(loc(sp.auto)) === false) return
  if (!(app.project.activeItem instanceof CompItem)) return alert(loc(sp.needComp))
  if (!sp.droplist.selection) return

  try {
    var preRenameValue = sp.autoNameValue
    sp.autoNameValue = true
    for (var i = 0; i < app.project.activeItem.numLayers; i++) {
      for (var j = 1; j <= app.project.activeItem.numLayers; j++) {
        app.project.activeItem.layer(j).selected = false
      }
      app.project.activeItem.layer(i + 1).selected = true
      sp.fns.newItem()
      app.project.activeItem.layer(i + 1).selected = false
    }
    sp.autoNameValue = preRenameValue
  } catch (err) { }
  sp.droplist.notify('onChange')
  sp.gv.refresh()
}
