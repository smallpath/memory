
/** ***********************************Sp_cutLength v1.1,自动裁剪图层长度,根据普通层的透明度与合成层内容的长度进行裁剪**************************************/
$.global.cutLength = cutLength
function cutLength() {
  if (confirm(loc(sp.cutLength)) === false) return
  var thisComp = app.project.activeItem

  Array.prototype.search = function(isZero) {
    var isOk = false
    var b
    if (isZero === 0) {
      for (b = 0; b < this.length - 1; b++) {
        if (this[b] === 0 && this[b + 1] > 0) {
          isOk = true
          break
        }
      }
      if (isOk === true) {
        return b
      } else {
        return -1
      }
    } else if (isZero === 100) {
      for (b = this.length - 1; b > 0; b--) {
        if (this[b - 1] > 0 && this[b] === 0) {
          isOk = true
          break
        }
      }
      if (isOk === true) {
        return b
      } else {
        return -1
      }
    }
  }
  app.beginUndoGroup('Undo crop')
  try { cutLayers(thisComp, {}) } catch (err) { }
  app.endUndoGroup()
  clearOutput()
  writeLn('Complete!')

  function cutLayers(comp, obj) {
    try {
      if (obj.hasOwnProperty('_' + comp.id)) {
      } else {
        obj['_' + comp.id] = {
          inPointArr: [],
          outPointArr: []
        }
      }
    } catch (err) { }

    for (var i = 0; i < comp.layers.length; i++) {
      try {
        if (comp.layer(i + 1).source instanceof CompItem) {
          if (obj.hasOwnProperty('_' + comp.layer(i + 1).source.id)) {
          } else {
            cutLayers(comp.layer(i + 1).source, obj)
          }
          try {
            obj['_' + comp.layer(i + 1).source.id].inPointArr.sort(function(a, b) { return a - b })
          } catch (err) {}
          try {
            obj['_' + comp.layer(i + 1).source.id].outPointArr.sort(function(a, b) { return b - a })
          } catch (err) {}
          if (comp.layer(i + 1).inPoint - comp.layer(i + 1).startTime < obj['_' + comp.layer(i + 1).source.id].inPointArr[0]) {
            try {
              comp.layer(i + 1).inPoint = comp.layer(i + 1).startTime + obj['_' + comp.layer(i + 1).source.id].inPointArr[0]
            } catch (err) { }
          }
          if (comp.layer(i + 1).outPoint - comp.layer(i + 1).startTime < obj['_' + comp.layer(i + 1).source.id].outPointArr[0]) {
            try {
              comp.layer(i + 1).outPoint = comp.layer(i + 1).startTime + obj['_' + comp.layer(i + 1).source.id].outPointArr[0]
            } catch (err) { }
          }
        }
        try { obj['_' + comp.id].inPointArr.push(comp.layer(i + 1).inPoint) } catch (err) { }
        try { obj['_' + comp.id].outPointArr.push(comp.layer(i + 1).outPoint) } catch (err) { }
        cut(comp.layer(i + 1))
      } catch (err) { }
    }
  }

  function cut(layer) {
    var thisOpa = layer.transform.opacity
    var thisKeysNum = thisOpa.numKeys
    var arr = []
    for (var a = 0; a < thisKeysNum; a++) {
      arr.push(thisOpa.keyValue(a + 1))
    }
    if (arr.length === 0) {
      if (thisOpa.value === 0) {
        layer.inPoint = 0
        layer.outPoint = 0 + layer.containingComp.frameDuration
      }
    } else if (arr.length === 1) {
      if (arr[0] === 0) {
        layer.inPoint = thisOpa.keyTime(1)
        layer.outPoint = thisOpa.keyTime(1) + layer.containingComp.frameDuration
      }
    } else if (arr.length > 1) {
      if (arr.search(0) !== -1) {
        if (layer.inPoint < thisOpa.keyTime(arr.search(0) + 1) && arr.search(0) === 0) {
          layer.inPoint = thisOpa.keyTime(arr.search(0) + 1)
        }
      }
      if (thisOpa.keyValue(thisKeysNum) === 0) {
        layer.outPoint = thisOpa.keyTime(thisKeysNum)
      } else {

      }
    }
  }
}
