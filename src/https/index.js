var vbsString = `set namedArgs = WScript.Arguments.Named  
  
sMethod = namedArgs.Item("Method")  
sUrl = namedArgs.Item("URL")  
sRequest = namedArgs.Item("Query")  
  
HTTPPost sMethod, sUrl, sRequest  
  
Function HTTPPost(sMethod, sUrl, sRequest)  
    
          set oHTTP = CreateObject("Microsoft.XMLHTTP")    
    
    If sMethod = "POST" Then  
        oHTTP.open "POST", sUrl,false  
    ElseIf sMethod = "GET" Then  
        oHTTP.open "GET", sUrl,false  
    End If  
  
          oHTTP.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"  
          oHTTP.setRequestHeader "Content-Length", Len(sRequest)  
          oHTTP.send sRequest  
    
          HTTPPost = oHTTP.responseText  
    
          WScript.Echo HTTPPost  
  
End Function  
`

module.exports = function(method, endpoint, query) {
  var response = null

  var tempVbsFile = new File($.layer.tempFolder.toString() + $.layer.slash.toString() + 'curl.vbs')

  if (!tempVbsFile.exists) {
    tempVbsFile.writee(vbsString)
  }
  var wincurl = tempVbsFile.fsName
  var curlCmd = ''

  try {
    if (sp.os === 'win') {
      curlCmd = `cscript "${wincurl}" /Method:${method} /URL:${endpoint} /Query:${query} //nologo`
    } else {
      curlCmd = `curl -s -G -d "${query}" ${endpoint}`
    }
    response = system.callSystem(curlCmd)
  } catch (err) {}

  return response
}
