try {
  (function(global) {
    // create singleton helper object for script,and store it into Global
    require('src/singleton')
    // Add methods to objects
    require('src/polyfill')
    // Save default presets if there isn't, then load presets and parse them
    require('src/preset')
    // startup script for sp_memory
    require('src/startup')
    // core saving and generating library for ae layer
    require('lib/AfterEffectsLayer')
    // i18n
    require('src/i18n')
    // color picker library for selecting colr
    require('lib/HelperScripts')
    require('lib/GridView')
    require('lib/UIParser')
    var helpers = require('src/index')

    $.layer.slash = sp.slash
    $.layer.tempFolder = new Folder(sp.scriptFolder.toString() + $.layer.slash + 'tempFile')
    $.layer.translate = $.global.translate

    sp.fns = new helpers.fns()

    //  Create UI
    $.global.callbackBeforeWebpackBuild && $.global.callbackBeforeWebpackBuild()
    if (!(global instanceof Panel)) {
      $.global.callbackBeforeWebpackBuild = function() {
        win.close()
      }
    }
    var win = sp.win = global instanceof Panel ? global : new Window('window', sp.scriptName, undefined, { resizeable: true })
    var outterGroup = sp.win.outterGroup = win.add("Group{orientation: 'column', alignment: ['fill','fill'],spacing:0,margins:0}")
    var innerGroup = sp.win.innerGroup = outterGroup.add("Group{orientation: 'row', alignment: ['fill','fill'],spacing:0,margins:0}")
    var parentDroplist = sp.parentDroplist = innerGroup.add('Dropdownlist{}')
    var droplist = sp.droplist = innerGroup.add('Dropdownlist{}')
    var gv = sp.gv = new GridView(outterGroup)

    // Set GridView's attributes
    gv.scale = sp.gridViewScale
    gv.limitText = sp.getSettingAsBool('limitText')
    gv.showText = sp.showThumbValue
    gv.version = (parseInt(app.version.split('.')[0]) === 12 || parseInt(app.version.split('.')[0]) === 14) ? 'CC' : 'CC2014'

    // Binding eventHandlers to mouse click and Window
    gv.leftClick = sp.fns.leftClick
    gv.rightClick = sp.fns.rightClick
    gv.leftDoubleClick = sp.fns.newLayer
    gv.mouseMove = sp.fns.moveOver
    parentDroplist.onChange = sp.fns.parentDroplistChange
    droplist.onChange = sp.fns.droplistChange

    sp.reloadParentDroplist()
    var selection = parseInt(sp.getSetting('parentSelection'))
    parentDroplist.selection = (selection <= parentDroplist.items.length - 1 && selection >= 0) ? selection : 0
    selection = parseInt(sp.getSetting('thisSelection'))
    droplist.selection = (selection <= droplist.items.length - 1 && selection >= 0) ? selection : 0

    sp.renderTaskArray.forEach(function(item, index) {
      app.cancelTask(item)
    })
    sp.renderTaskArray.length = 0
    sp.previewHelper = {}

    win.onResize = win.onResizing = sp.fns.winResize

    if (win instanceof Panel) {
      win.layout.layout(1)
    } else {
      var ratio = sp.gv.scale
      var location = sp.getSetting('winLocation').split(',')
      win.location = [parseInt(location[0]), parseInt(location[1])]
      if (win.location[0] <= 0 || win.location[1] <= 0) { win.location = [100, 200] }
      win.show()
      var size = sp.getSetting('winSize').split(',')
      win.size = [parseInt(size[0]) * ratio, parseInt(size[1]) * ratio]
      if (win.size[0] <= 0 || win.size[1] <= 0) { win.size = [240, 500] }
      win.onClose = sp.fns.winClose
    }

    win.onResize()
  })(this)
} catch (err) { alert('Line #' + err.line.toString() + '\r\n' + err.toString()) }
