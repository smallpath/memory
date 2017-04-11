var global = $.global

var progressFactory = {
  createWindow: function(len, title, prefixString, suffixString) {
    global.progressWin = new Window('palette', title)
    var group = global.progressWin.add(`Group{
      orientation:'column',alignment: ['fill','fill'],
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
      replaced += '   '
    })
    var divide = replaced + '0' + '/' + global.progressBar.maxvalue + '  '
    global.progressText.text = prefixString + divide + suffixString
    global.progressWin.show()
    global.progressWin.center()
    global.progressWin.startTime = Date.now()
  },
  update: function(len, prefixString, suffixString, timePrefix, timeSuffix, previewTip) {
    global.progressBar.value = global.progressBar.value + len
    var divide = global.progressBar.value + '/' + global.progressBar.maxvalue
    var fisrtLine = prefixString + divide + suffixString
    var time = (Date.now() - global.progressWin.startTime) / 1000
    var secondLine = timePrefix + time.toString() + timeSuffix
    global.progressText.text = fisrtLine + '\r\n' + secondLine + '\r\n' + previewTip
    global.progressWin.update && global.progressWin.update()
    global.sp.win.update && global.sp.win.update()
  },
  complete: function(timePrefix, timeSuffix) {
    var time = (Date.now() - global.progressWin.startTime) / 1000
    var report = timePrefix + time.toString() + timeSuffix
    writeLn(report)
    return time
  }
}

var title = loc(sp.previewTitle)
var previewPrefix = loc(sp.previewPrefix)
var timePrefix = loc(sp.previewTime)
var timeSuffix = loc(sp.second)
sp.willSavePreviews = function(len) {
  progressFactory.createWindow(
    len,
    title,
    previewPrefix,
    timeSuffix
  )
}
sp.didSavePreview = function() {
  progressFactory.update(
    1,
    previewPrefix,
    '',
    timePrefix,
    timeSuffix
  )
}
sp.didSavePreviews = function() {
  progressFactory.complete(timePrefix, timeSuffix)
}

module.exports = progressFactory
