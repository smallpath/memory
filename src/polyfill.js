module.exports = (function() {
  require('lib/OperatorOverload')

  sp.extend(sp, {
    forEach: function(xml, callback, context) {
      if (!(xml instanceof XML)) return
      var i,
        len
      for (i = 0, len = xml.children().length(); i < len; i++) {
        if (callback.call(context, xml.child(i), i, xml) === false) {
          break
        }
      }
    }
  })

  String.prototype.trim = String.prototype.trim || function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }

  Array.prototype.includes = function(value) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] === value) {
        return true
      }
    }
    return false
  }

  Array.prototype.forEach = function(callback, context) {
    if (Object.prototype.toString.call(this) === '[object Array]') {
      var i, len
      for (i = 0, len = this.length; i < len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break
          }
        }
      }
    }
  }

  Error.prototype.print = Error.prototype.print || function() {
    return 'Line #' + this.line.toString() + '\r\n' + this.toString()
  }

  Error.prototype.printc = Error.prototype.printc || function() {
    cout << '\n---------'
    cout << this.print()
    cout << '---------\n'
  }

  Error.prototype.printa = Error.prototype.printa || function() {
    this.print() << cout
  }

  File.prototype.writee = function(str) {    // method to write file
    this.open('w')
    this.write(str)
    this.close()
  }

  File.prototype.readd = function() {      // method to read from file
    this.open('r')
    var temp = this.read()
    this.close()
    return temp
  }

  Array.prototype.pushh = function(str) {  // chains call for Array.push()
    this.push(str)
    return this
  }

  sp.deleteThisFolder = function(folder) {
    var waitClFile = folder.getFiles()
    for (var i = 0; i < waitClFile.length; i++) {
      if (waitClFile[i] instanceof Folder) {
        sp.deleteThisFolder(waitClFile[i])
        waitClFile[i].remove()
      } else {
        waitClFile[i].remove()
      }
    }
  }
})()
