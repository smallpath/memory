var global = $.global

var progressFactory = global.progressFactory = {
  createWindow: function(len, title, prefixString, suffixString) {
    global.progressWin = new Window('palette', title)
    var group = global.progressWin.add(`Group{orientation:'column',alignment: ['fill','fill'],
      progressText: StaticText {text:"", justify:'center'},
      progressBar: Progressbar{alignment: ['fill','fill'],value:0, minvalue:0, maxvalue:${len}}
    }`)
    global.progressText = group.progressText
    global.progressBar = group.progressBar
    var replaced = ''
    len.toString().split('').forEach(function(item) {
      replaced += '  '
    })
    var divide = replaced + '0' + '/' + global.progressBar.maxvalue
    global.progressText.text = prefixString + divide + suffixString
    global.progressWin.show()
    global.progressWin.center()
  },
  update: function(len, prefixString, suffixString) {
    global.progressBar.value = global.progressBar.value + len
    var divide = global.progressBar.value + '/' + global.progressBar.maxvalue
    global.progressText.text = prefixString + divide + suffixString
    global.progressWin.update && global.progressWin.update()
    global.sp.win.update && global.sp.win.update()
  },
  complete: function() {
    global.progressWin.close()
  }
}

// saving process window
var SavingPrefixString = loc(sp.savingProcessingPrefix)
var SavingSuffixString = loc(sp.savingProcessAfter)
var SavingTitle = loc(sp.savingProcessTitle)
$.layer.willSaveLayers = function(layers) {
  var len = $.layer.countLayers(layers, true)
  $.global.progressFactory.createWindow(
    len,
    SavingTitle,
    SavingPrefixString,
    SavingSuffixString
  )
}
$.layer.didSaveLayer = function(count) {
  $.global.progressFactory.update(
    count,
    SavingPrefixString,
    SavingSuffixString
  )
}
$.layer.didSaveLayers = function() {
  $.global.progressFactory.complete()
}

// generating process window
var CreatingPrefixString = loc(sp.creatingProcessingPrefix)
var CreatingSuffixString = loc(sp.creatingProcessAfter)
var CreatingTitle = loc(sp.creatingProcessTitle)

$.layer.willCreateLayers = function(len) {
  $.global.progressFactory.createWindow(
    len,
    CreatingTitle,
    CreatingPrefixString,
    CreatingSuffixString
  )
}
$.layer.didCreateLayer = function(count) {
  $.global.progressFactory.update(
    count,
    CreatingPrefixString,
    CreatingSuffixString
  )
}
$.layer.didCreateLayers = function() {
  $.global.progressFactory.complete()
}

module.exports = progressFactory
