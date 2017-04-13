module.exports = function(win) {
  clearOutput && clearOutput()
  var targetAlert = win ? alert : writeLn
  return function() {
    var latestVersion = sp.getVersion()
    var nowVersion = sp.version
    var compare = sp.compareSemver(latestVersion, nowVersion)
    if (compare > 0) {
      targetAlert(loc(sp.newVersionFind) + latestVersion.toString())
      var scriptLink = sp.downloadLinkPrefix + latestVersion + sp.downloadLinkSuffix
      if (confirm(loc(sp.shouldUpdateScript))) {
        try {
          var scriptString = sp.request(
            'GET',
            scriptLink,
            ''
          )
          var file = new File($.fileName)
          file.writee(scriptString)
          targetAlert(loc(sp.downloaded))
          win.close()
          sp.win.close()
        } catch (err) { err.printa() }
      } else if (confirm(loc(sp.shouldDownloadScript))) {
        try {
          sp.openLink(scriptLink)
        } catch (err) { err.printa() }
      }
    } else if (compare === 0) {
      targetAlert(loc(sp.newVersionNotFind) + nowVersion.toString())
    } else if (compare < 0) {
      targetAlert(loc(sp.tryVersionFind) + nowVersion.toString())
    }
  }
}
