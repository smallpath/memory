exports.observer = observer
exports.isObj = isObj

function isObj(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
}

function isInBlackList(name, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === name) return true
  }
  return false
}

function observer(obj, callback, nameBlackList, index) {
  index = index || 0
  if (!isObj(obj)) return
  for (var i in obj) {
    if (index === 0 && isInBlackList(i, nameBlackList)) continue
    obj.watch(i, callback)
    if (isObj(obj[i])) observer(obj[i], callback, nameBlackList, index + 1)
  }
  return obj
}
