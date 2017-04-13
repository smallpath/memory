var global = $.global

var parentProgress = require('../ui/previewProgress')

var progressFactory = {
  createWindow: function(len, title, prefixString, suffixString) {
    if (global.progressWin) {
      global.progressBar.maxvalue = len
      return
    }
    parentProgress.createWindow(len, title, prefixString, suffixString)
  },
  update: function(len, prefixString, suffixString, timePrefix, timeSuffix) {
    parentProgress.update(len, prefixString, suffixString, timePrefix, timeSuffix)
  },
  complete: function(timePrefix, timeSuffix) {
    parentProgress.complete(timePrefix, timeSuffix)
    global.progressWin = null
    global.progressTimeText = null
    global.progressText = null
    global.progressBar = null
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
  progressFactory.createWindow(
    len,
    savingTitle,
    savingPrefixString,
    savingSuffixString
  )
}
$.layer.didSaveLayer = function(count) {
  progressFactory.update(
    count,
    savingPrefixString,
    savingSuffixString,
    savingReport,
    timeSuffix
  )
}
$.layer.didSaveLayers = function() {
  $.layer.didSaveLayer(0)
  progressFactory.complete(savingReport, timeSuffix)
}

// generating process window
var creatingReport = loc(sp.creatingReport)
var creatingPrefixString = loc(sp.creatingProcessingPrefix)
var creatingSuffixString = loc(sp.creatingProcessAfter)
var creatingTitle = loc(sp.creatingProcessTitle)

$.layer.willCreateLayers = function(len) {
  progressFactory.createWindow(
    len,
    creatingTitle,
    creatingPrefixString,
    creatingSuffixString
  )
}
$.layer.didCreateLayer = function(count) {
  progressFactory.update(
    count,
    creatingPrefixString,
    creatingSuffixString,
    creatingReport,
    timeSuffix
  )
}
$.layer.didCreateLayers = function() {
  $.layer.didCreateLayer(0)
  progressFactory.complete(creatingReport, timeSuffix)
}

module.exports = progressFactory
