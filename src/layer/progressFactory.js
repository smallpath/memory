var global = $.global

var progressFactory = global.progressFactory = {
  createWindow: function(len, title, prefixString, suffixString) {
    global.progressWin = new Window('palette', title)
    var group = global.progressWin.add(`Group{orientation:'column',alignment: ['fill','fill'],
      progressText: StaticText {text:"", justify:'center',properties:{multiline:1}},
      progressBar: Progressbar{alignment: ['fill','fill'],value:0, minvalue:0, maxvalue:${len}}
    }`)
    global.progressWin.addEventListener('keydown', function() {
      global.progressWin.close()
    })
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
    global.progressWin.startTime = Date.now()
  },
  update: function(len, prefixString, suffixString, timePrefix, timeSuffix) {
    global.progressBar.value = global.progressBar.value + len
    var divide = global.progressBar.value + '/' + global.progressBar.maxvalue
    var fisrtLine = prefixString + divide + suffixString
    var time = (Date.now() - global.progressWin.startTime) / 1000
    var secondLine = timePrefix + time.toString() + timeSuffix
    global.progressText.text = fisrtLine + '\r\n' + secondLine
    global.progressWin.update && global.progressWin.update()
    global.sp.win.update && global.sp.win.update()
  },
  complete: function(timePrefix, timeSuffix) {
    global.progressWin.close()
    var time = (Date.now() - global.progressWin.startTime) / 1000
    var report = timePrefix + time.toString() + timeSuffix
    writeLn(report)
    return time
  }
}

var timeSuffix = loc(sp.second)
// saving process window
var savingReport = loc(sp.savingReport)
var savingPrefixString = loc(sp.savingProcessingPrefix)
var savingSuffixString = loc(sp.savingProcessAfter)
var savingTitle = loc(sp.savingProcessTitle)
$.layer.willSaveLayers = function(layers) {
  var len = $.layer.countLayers(layers, true)
  $.global.progressFactory.createWindow(
    len,
    savingTitle,
    savingPrefixString,
    savingSuffixString
  )
}
$.layer.didSaveLayer = function(count) {
  $.global.progressFactory.update(
    count,
    savingPrefixString,
    savingSuffixString,
    savingReport,
    timeSuffix
  )
}
$.layer.didSaveLayers = function() {
  $.layer.didSaveLayer(0)
  $.global.progressFactory.complete(savingReport, timeSuffix)
}

// generating process window
var creatingReport = loc(sp.creatingReport)
var creatingPrefixString = loc(sp.creatingProcessingPrefix)
var creatingSuffixString = loc(sp.creatingProcessAfter)
var creatingTitle = loc(sp.creatingProcessTitle)

$.layer.willCreateLayers = function(len) {
  $.global.progressFactory.createWindow(
    len,
    creatingTitle,
    creatingPrefixString,
    creatingSuffixString
  )
}
$.layer.didCreateLayer = function(count) {
  $.global.progressFactory.update(
    count,
    creatingPrefixString,
    creatingSuffixString,
    creatingReport,
    timeSuffix
  )
}
$.layer.didCreateLayers = function() {
  $.layer.didCreateLayer(0)
  $.global.progressFactory.complete(creatingReport, timeSuffix)
}

module.exports = progressFactory
