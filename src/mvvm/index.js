var mvvm = require('./observer')

var nameBlackList = [
  'win',  // the parent window of grid view instance
  'gv',   // the grid view instance
  'isOutside',      // ensure mouse cursor is in image rect or not
  'previewHelper',  // helper object for preview feature
  'isLoopPreview',  // preview loop boolean value
  'droplist',
  'parentDroplist',
  'menu'
]

function watch(name, oldValue, newValue) {
  // $.writeln('name: ', name, ' oldValue: ', oldValue, ' newValue: ', newValue)
  if (typeof oldValue === 'function') {
    return oldValue
  } else if (typeof newValue === 'boolean') {
    var settingName = name.replace('Value', '')
    // $.writeln('write to ', settingName, ' has?: ', $.global.sp.haveSetting(name.replace('Value', '')))
    if ($.global.sp.haveSetting(settingName)) {
      $.global.sp.saveSetting(settingName, newValue)
      return newValue
    } else {
      return oldValue
    }
  } else {
    return newValue
  }
}

module.exports = function(obj) {
  return mvvm.observer(obj, watch, nameBlackList)
}
