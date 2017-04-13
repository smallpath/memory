var global = $.global

var width = 300
var height = 80
var progressHeight = 20

var progressFactory = {
  createWindow: function(len, title, prefixString, suffixString) {
    global.progressWin = new Window('palette', title)

    var group = global.progressWin.add(`Group{
      orientation:'column',alignment: ['fill','fill'],
      preferredSize: [-1, ${height}],
      progressBar: Progressbar{
        value:0, minvalue:0, maxvalue:${len},
        preferredSize: [${width}, ${progressHeight}]
      },
      progressText: StaticText {
        alignment:['fill','fill'],text:"", justify:'center',properties:{multiline:0}
      },
      progressTimeText: StaticText {
        alignment:['fill','fill'],text:"", justify:'center',properties:{multiline:0}
      }
    }`)
    global.progressWin.addEventListener('keydown', function() {
      global.progressWin.close()
    })
    global.progressTimeText = group.progressTimeText
    global.progressText = group.progressText
    global.progressBar = group.progressBar
    var divide = '0' + '/' + global.progressBar.maxvalue
    global.progressText.text = prefixString + divide + suffixString
    global.progressTimeText
    global.progressWin.show()
    global.progressWin.center()
    var preY = global.progressText.location[1] + 10
    global.progressText.originY = preY
    global.progressText.location[1] = preY + (global.progressText.location[1] >> 1)
    global.progressWin.startTime = Date.now()
    global.progressWin.update && global.progressWin.update()
  },
  update: function(len, prefixString, suffixString, timePrefix, timeSuffix) {
    global.progressBar.value = global.progressBar.value + len
    var divide = global.progressBar.value + '/' + global.progressBar.maxvalue
    var time = (Date.now() - global.progressWin.startTime) / 1000
    global.progressText.text = prefixString + divide + suffixString
    global.progressTimeText.text = timePrefix + time.toString() + timeSuffix
    var preY = global.progressText.location[1]
    var shouldRelocation = global.progressTimeText.text.length === 0
    if (shouldRelocation) {
      global.progressText.location[1] = preY + (global.progressText.location[1] >> 1)
    } else {
      global.progressText.location[1] = global.progressText.originY
    }
    global.progressWin.update && global.progressWin.update()
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
