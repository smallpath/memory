var settingsButtonFunc=function () {
      
var _ = UIParser(global);

var UIJson = 
          {
            newWin:{type:'palette',text:sp.scriptName+' v'+sp.scriptVersion,margins:10,children:{
                        
                        group1:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                          helpText:{type:'edittext',properties:{multiline:true,scrolling:false},preferredSize:[150,300],text:'',enabled:1},
                                          wlist:{type:'listbox',preferredSize:[150,300]}
                                    }},
                        group2:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                          deleteFolder:{type:'Button',preferredSize:[165,27],text:loc(sp.deleteFolder),enabled:1},
                                          changeGroupName:{type:'Button',preferredSize:[165,27],text:loc(sp.changeGroupName),enabled:1}
                                    }},
                        group3:{type:'group',alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],children:{
                                          output:{type:'Button',text:loc(sp.output),enabled:1},
                                    }},                    
                        group4:{type:'group',orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                    g0:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                        gr1:{type:'group',children:{
                                                    limitText:{type:'checkbox',text:loc(sp.limitText)}
                                                    }},
                                        gr2:{type:'group',children:{
                                                    coverChange:{type:'checkbox',text:loc(sp.coverChange)}
                                                    }}
                                    }},
                                    gr1:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                        gr1:{type:'group',children:{
                                                    thumbType:{type:'checkbox',text:loc(sp.thumbType)}
                                                    }}
                                    }},
                                    gr0:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                                gr2:{type:'group',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                                            folderName:{type:'statictext',text:loc(sp.folderName)},
                                                            folderNameText:{type:'edittext',text:"",justify:'center',characters:17},
                                                }}
                                    }},
                                    gr3:{type:'group',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                                      effectName:{type:'statictext',text:loc(sp.effectName)},
                                                      effectNameText:{type:'edittext',text:"",characters:18}
                                    }},
                        
                        }},//end of group4
                        group5:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                          ch:{type:'Button',text:'中文',enabled:0},
                                          en:{type:'Button',text:'English',enabled:0}
                                    }},
                        group6:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                          ui1:{type:'Button',text:loc(sp.ui1),enabled:0},
                                          ui2:{type:'Button',text:loc(sp.ui2),enabled:0}
                                    }},
                        group7:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
                                          checkVersion:{type:'Button',text:loc(sp.checkVersion),enabled:1},
                                          openLink:{type:'Button',text:loc(sp.link),enabled:1}
                                    }},
                              
                        }}//end of newWin
                        
          };

        
var win = _.newWindow(UIJson)[0];

_('*').each(function(e){
            switch(e.id){
                  case 'helpText': e.text = loc(sp.about);
                                          e.onChange = e.onChanging = function(){this.text = loc(sp.about)};
                                          break;
                  case 'wlist': sp.xmlFileNames.forEach(function(item,index){
                                                            this.add("item",item)
                                                            },e)
                  case 'deleteFolder': e.onClick = function(){
                                                      var folder = sp.materialFolder;
                                                      function deleteThisFolder(folder) {
                                                          var waitClFile = folder.getFiles();
                                                          for (var waitA = 0; waitA < waitClFile.length; waitA++) {
                                                              if (waitClFile[waitA] instanceof Folder) {
                                                                  deleteThisFolder(waitClFile[waitA]);
                                                                  waitClFile[waitA].remove();
                                                              } else {
                                                                  waitClFile[waitA].remove();
                                                              }
                                                          }
                                                      }
                                                      deleteThisFolder(folder);
                                                      alert(loc(sp.deleteOk));
                              
                                                };break;
                  case 'changeGroupName': e.onClick = function(){
                                                                        var wlist = _('#wlist')[0];
                                                                        if(!wlist.selection) return;
                                                                        var newGroupName = prompt(loc(sp.setName), wlist.selection.text);
                                                                        if(!newGroupName) return;
                                                                        if(sp.lookUpTextInChildren(newGroupName,wlist.items)){alert(loc(sp.existName));return;}
                                                                        var file = sp.getFileByName(wlist.selection.text);
                                                                        file.rename(newGroupName+".xml");
                                                                        var xml = new XML(sp.settingsFile.readd());
                                                                        xml.ListItems.insertChildAfter(xml.ListItems.child(wlist.selection.index),
                                                                                                                    new XML("<Name>" + newGroupName.toString() + "</Name>"));
                                                                        xml.ListItems.child(wlist.selection.index).setLocalName("waitToDelete");
                                                                        delete xml.ListItems.waitToDelete;
                                                                        sp.settingsFile.writee(xml);
                                                                        var folder = sp.getImageFolderByName(wlist.selection.text);
                                                                        if(folder.exists)
                                                                              folder.rename(newGroupName);
                                                                        wlist.items[wlist.selection.index].text = newGroupName;
                                                                        sp.droplist.items[wlist.selection.index].text = newGroupName;
                                                                        sp.xmlFileNames[wlist.selection.index] = newGroupName;
                                                                        sp.droplist.notify("onChange"); 
                                                                        };break;
                  case 'output':e.onClick =  function(){outputWindow()};
                                      break;
                  case 'limitText': e.value = sp.getSettingAsBool("limitText");
                                          e.onClick = function(){sp.saveSetting("limitText",this.value.toString())}
                                          break;
                  case 'coverChange': e.value = sp.getSettingAsBool("coverChange");
                                                e.onClick = function(){sp.saveSetting("coverChange",this.value.toString())}
                                                break;
                  case 'thumbType':   e.value = sp.getSettingAsBool("thumbType");
                                                e.onClick = function(){sp.saveSetting("thumbType",this.value.toString())}
                                                break;
                  case 'folderNameText':   e.text = sp.getSetting("folderName");
                                                      e.onChange = function(){sp.saveSetting("folderName",this.text)}
                                                      break;
                  case 'effectNameText':    e.text = sp.getSetting("effectName");
                                                      e.onChange = function(){sp.saveSetting("effectName",this.text)}
                                                      break;
                  case 'ch':    e.enabled = sp.lang =="en"? true: false;
                                    e.onClick = function(){
                                               sp.saveSetting("language","ch");
                                               alert("请重新打开脚本,语言会将自动变更为中文.");
                                               _('#en')[0].enabled = true;
                                               _('#ch')[0].enabled = false;
                                          }
                                    break;
                  case 'en':    e.enabled = sp.lang =="ch"? true: false;
                                    e.onClick = function(){
                                               sp.saveSetting("language","en");
                                               alert("Please restart script,language will be changed into English.");
                                               _('#en')[0].enabled = false;
                                               _('#ch')[0].enabled = true;
                                          }
                                    break;
                  case 'checkVersion':       if(sp.lang == "en")
                                                            e.size = _('#openLink')[0].size = [211,27];
                                                      e.onClick = function(){
                                                                 var latest = parseFloat(sp.getVersion("Sp_memory"));
                                                                 var nowVersion = sp.version;
                                                                 if(latest > nowVersion){
                                                                        alert(loc(sp.newVersionFind)+latest.toString());
                                                                        if ( confirm (loc(sp.isDown))){ 
                                                                            sp.openLink(sp.downloadLink+" v"+latest.toString()+".jsxbin");
                                                                            }
                                                                     }else{
                                                                         alert(loc(sp.newVersionNotFind));
                                                                         }
                                                            };break;
                  case 'openLink':e.onClick = function(){
                                                sp.openLink(sp.weiboLink);
                                          };break;
                  
                  
                  }
      })



        var warpDrop = function(a, b, index1, index2) {
            var tempD = a.text;
            a.text = b.text;
            b.text = tempD;
            var tempXML = sp.xmlFileNames[index1];
            sp.xmlFileNames[index1] = sp.xmlFileNames[index2];
            sp.xmlFileNames[index2] = tempXML;
        }


        var exchange= function(isUp,wXML) {
            if (isUp == true) {
                var aic = _('#wlist')[0].selection.index;
                var name = sp.droplist.selection.text;
                var wupxml = new XML(wXML.ListItems.child(aic));
                wXML.ListItems.insertChildBefore(wXML.ListItems.child(aic - 1), wupxml);
                wXML.ListItems.child(aic + 1).setLocalName("waitToDelete");
                delete wXML.ListItems.waitToDelete;
                sp.settingsFile.writee(wXML);
                sp.swap(_('#wlist')[0].items[aic - 1], _('#wlist')[0].items[aic]);
                warpDrop(sp.droplist.items[aic - 1], sp.droplist.items[aic], aic - 1, aic);
                sp.droplist.selection = sp.droplist.find(name);
                sp.droplist.notify("onChange");
                sp.gv.refresh();
            } else {
                var aic = _('#wlist')[0].selection.index;
                var name = sp.droplist.selection.text;
                var wdownxml = new XML(wXML.ListItems.child(aic));
                wXML.ListItems.insertChildAfter(wXML.ListItems.child(aic + 1), wdownxml);
                wXML.ListItems.child(aic).setLocalName("waitToDelete");
                delete wXML.ListItems.waitToDelete;
                wxmlFile.writee(wXML);
                sp.swap(_('#wlist')[0].items[aic + 1], _('#wlist')[0].items[aic]);
                warpDrop(sp.droplist.items[aic + 1], sp.droplist.items[aic], aic + 1, aic);
                sp.droplist.selection = sp.droplist.find(name);
                sp.droplist.notify("onChange");
                sp.gv.refresh();
            }
        }


        var  handleKey = function(key, control) {
            var wXML = new XML(sp.settingsFile.readd());
            switch (key.keyName) {
                case "Up":
                    if (_('#wlist')[0].selection != null && _('#wlist')[0].selection.index > 0) {
                        exchange(true,wXML);
                    };
                    break;
                case "Down":
                    if (_('#wlist')[0].selection != null && _('#wlist')[0].selection.index < _('#wlist')[0].items.length - 1) {
                        exchange(false,wXML);
                    };
                    break;
            }
        }
  
_('#wlist')[0].addEventListener("keydown", function(k) {
            handleKey(k, this);
        });
  
win.center();
win.show();
                        
    }


















function outputWindow () {
            var outWin = new Window("window", "Export", undefined, { resizeable: 0, maximizeButton: 0 });
            outRes = """Group{
            orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                            wlist:ListBox{properties:{multiselect:1}},
                            oc:Group{
                                alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
                                ok:Button{text:'"""+loc(sp.ok)+"""'},
                                cancel:Button{text:'"""+loc(sp.cancel)+"""'}
                            }}""";
                try{outRes=outWin.add(outRes);}catch(err){alert(err)}
                    var scriptsFile = sp.scriptFile;
                    wfolder = sp.settingsFolder;
                    wxmlFile = sp.settingsFile;
                    wcontent = wxmlFile.readd();
                    wXML = new XML(wcontent);
                    for (var bPoint = 0; bPoint < wXML.ListItems.children().length(); bPoint++) {
                        outRes.wlist.add("item", wXML.ListItems.child(bPoint).toString());
                    }
                outRes.wlist.size = [200,500];
                outWin.show();
                
                outRes.oc.cancel.onClick=function(){
                        outWin.close();
                    }
                
                outRes.oc.ok.onClick=function(){
                        if(outRes.wlist.selection!=null){
                              var exportFolder = Folder.selectDialog("Please select folder");
                               if (exportFolder != null && exportFolder instanceof Folder) {
                                for(var i=0;i<outRes.wlist.selection.length;i++){


                                    var sourceFile = sp.getFileByName(outRes.wlist.selection[i].text);
                                    var targetFile = File(exportFolder.toString() + sp.slash + outRes.wlist.selection[i].text + ".xml");
                                    if(targetFile.exists) {continue;}
                                    
                                    var images= sp.getImageFolderByName(outRes.wlist.selection[i].text).getFiles();
                                    var picXml = new XML("<pic></pic>");
                                    images.forEach(function(item,index){
                                                  if(item.name.indexOf(".png") !=1){
                                                              item.open("r");
                                                              item.encoding = "binary";
                                                              var str = encodeURIComponent (item.read());
                                                              item.close();
                                                              var tempXmlBigHere=new XML("<imgName>"+encodeURIComponent(item.name)+"</imgName>");
                                                              var tempXmlHeres=new XML("<img>"+str+"</img>");
                                                              var guluTempA=new XML("<imgInfo></imgInfo>");
                                                              guluTempA.appendChild(tempXmlBigHere);
                                                              guluTempA.appendChild(tempXmlHeres);
                                                              picXml.appendChild (guluTempA);
                                                        }
                                          });
                                    var xml = new XML(sourceFile.readd());
                                    if(picXml.children().length()>0){
                                                xml.appendChild (picXml);
                                          }
                                    if(xml.children().length()==0){
                                                xml = "<tree></tree>"
                                          }
                                    targetFile.writee(xml);
                                }  // for loop
                                    clearOutput();
                                    writeLn("Complete!");
                            } // not null
                    }   //last 
                


           }
}


var upAndDown=function (isUp,isW){
                var file = sp.getFileByName(sp.droplist.selection.text);
                var xml = new XML(file.readd());
        if (isUp == true &&sp.gv.lastSelectedItem != null &&sp.gv.lastSelectedItem.index > 0) {
                var ai = sp.gv.lastSelectedItem.index;
                var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
                xml.insertChildBefore(xml.child(sp.gv.lastSelectedItem.index-1), upxml);
                xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName("waitToDelete");
                delete xml.waitToDelete;
                file.writee(xml);
                sp.gv.lastSelectedItem.moveUp();
                var thisItem = sp.gv.lastSelectedItem;
            } else if (isUp == false && sp.gv.lastSelectedItem != null && sp.gv.lastSelectedItem.index < xml.children().length() - 1) {
                var ai = sp.gv.lastSelectedItem.index;
                var downxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
                xml.insertChildAfter(xml.child(sp.gv.lastSelectedItem.index+1), downxml);
                xml.child(sp.gv.lastSelectedItem.index).setLocalName("waitToDelete");
                delete xml.waitToDelete;
                file.writee(xml);
                sp.gv.lastSelectedItem.moveDown();
                var thisItem = sp.gv.lastSelectedItem;
            }
        }

var upAndDownWindow=function (cu){
        var udWin = new Window("palette",loc(sp.ud));
        udWins=udWin.add("Group{}");
        var a = udWins.add("Button{text:'"+loc(sp.up)+"'}");
        var b = udWins.add("Button{text:'"+loc(sp.down)+"'}");
        var c = udWins.add("Group{et:EditText{text:'0',characters:3,justify:'center'},j:Button{text:'"+loc(sp.jmp)+"'}}");
        udWin.frameLocation = cu;
        udWin.show();
        a.onClick = function(){
                upAndDown(true, true);
            }
        b.onClick = function(){
                upAndDown(false, true);
            }
        c.j.onClick = function(){
                var d =parseInt(c.et.text);
                var file = sp.getFileByName(sp.droplist.selection.text);
                var xml = new XML(file.readd());
                if(sp.gv.children.length ==0 ) return;
                if(sp.gv.lastSelectedItem ==null) return;
                if(d>=0 && d< sp.gv.children.length-1 && sp.gv.lastSelectedItem.index != d){
                        var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
                        xml.insertChildBefore(xml.child(d), upxml);
                        xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName("waitToDelete");
                        delete xml.waitToDelete;
                        file.writee(xml);
                        sp.gv.lastSelectedItem.moveBefore(sp.gv.children[d]);
                    }else if(d == sp.gv.children.length-1 && sp.gv.lastSelectedItem.index != d){
                        var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
                        xml.insertChildAfter(xml.child(d), upxml);
                        xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName("waitToDelete");
                        delete xml.waitToDelete;
                        file.writee(xml);
                        sp.gv.lastSelectedItem.moveAfter(sp.gv.children[d]);
                    }else{
                        try{
                            alert(loc(sp.from)+"~"+(sp.gv.children.length-1).toString());
                            }catch(er){}
                        }
            }
        }



var presetWindow = function () {
                    var jinWin = new Window("dialog", loc(sp.settingPre));
                    jinRes = "group{\
                                        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                                        guluG:Group{\
                                        orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                                        jinGroup:Group{\
                                        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                                        isJin:StaticText{text:'"+ loc(sp.isEffect) + "'}\
                                        isJinSt:StaticText{text:'"+ loc(sp.jinOne) + "',properties:{multiline:1}}\
                                        jin:Panel{\
                                        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                                        _1:Checkbox{text:'"+ loc(sp._1) + "'},\
                                        _2:Checkbox{text:'"+ loc(sp._2) + "'},\
                                        _3:Checkbox{text:'"+ loc(sp._3) + "'},\
                                        _4:Checkbox{text:'"+ loc(sp._4) + "'},\
                                        _5:Checkbox{text:'"+ loc(sp._5) + "'},\
                                        _6:Checkbox{text:'"+ loc(sp._6) + "'},\
                                        _7:Checkbox{text:'"+ loc(sp._7) + "'},\
                                        _8:Checkbox{text:'"+ loc(sp._8) + "'},\
                                        _9:Checkbox{text:'"+ loc(sp._9) + "'},\
                                        }\
                                        },\
                                        delGroup:Group{\
                                        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                                        isJin:StaticText{text:'"+ loc(sp.cleanProperty) + "'}\
                                        isJinSt:StaticText{text:'"+ loc(sp.jinTwo) + "',properties:{multiline:1}}\
                                        del:Panel{\
                                        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                                        _1:Checkbox{text:'"+ loc(sp._1) + "'},\
                                        _2:Checkbox{text:'"+ loc(sp._2) + "'},\
                                        _3:Checkbox{text:'"+ loc(sp._3) + "',enabled:0},\
                                        _4:Checkbox{text:'"+ loc(sp._4) + "',enabled:0},\
                                        _5:Checkbox{text:'"+ loc(sp._5) + "'},\
                                        _6:Checkbox{text:'"+ loc(sp._6) + "'},\
                                        _7:Checkbox{text:'"+ loc(sp._7) + "'},\
                                        _8:Checkbox{text:'"+ loc(sp._8) + "',enabled:0},\
                                        _9:Checkbox{text:'"+ loc(sp._9) + "',enabled:0},\
                                        }\
                                        },\
                                        },\
                                        oc:Group{\
                                        orientation:'row',alignment:['fill','center'],alignChildren:['center','fill'],\
                                        ok:Button{text:'Ok',preferredSize:[160,30]},\
                                        }\
                                        }";
                    var jinGulu = jinWin.add(jinRes);
                    for (var i = 1; i <= 9; i++) {
                        if (app.settings.haveSetting("Sp_memory", "_1_" + i) == false) {
                            if (i == 1 || i == 2 || i == 5) {
                                app.settings.saveSetting("Sp_memory", "_1_" + i, "1");
                            } else {
                                app.settings.saveSetting("Sp_memory", "_1_" + i, "0");
                            }
                        }
                        try {
                            eval("jinGulu.guluG.jinGroup.jin._" + i + ".value=(app.settings.getSetting(\"Sp_memory\",\"_1_" + i + "\"))==\"1\"?true:false");
                            eval("jinGulu.guluG.jinGroup.jin._" + i + ".onClick=function(){app.settings.saveSetting(\"Sp_memory\",\"_1_" + i + "\", (jinGulu.guluG.jinGroup.jin._" + i + ".value==true)?\"1\":\"0\");}");
                        } catch (err) { }
                    }
                    for (var i = 1; i <= 9; i++) {
                        if (app.settings.haveSetting("Sp_memory", "_2_" + i) == false) {
                            app.settings.saveSetting("Sp_memory", "_2_" + i, "0");
                        }
                        try {
                            eval("jinGulu.guluG.delGroup.del._" + i + ".value=(app.settings.getSetting(\"Sp_memory\",\"_2_" + i + "\"))==\"1\"?true:false");
                            eval("jinGulu.guluG.delGroup.del._" + i + ".onClick=function(){app.settings.saveSetting(\"Sp_memory\",\"_2_" + i + "\", (jinGulu.guluG.delGroup.del._" + i + ".value==true)?\"1\":\"0\");}");
                        } catch (err) { }
                    }
                    jinGulu.oc.ok.onClick = function () {
                        jinWin.close();
                    }
                    jinWin.center();
                    jinWin.show();
                }
    
    
    