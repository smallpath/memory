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
    
    var settingsButtonFunc=function () {
        listWin = new Window("palette", sp.scriptName+" "+sp.version, undefined);
        listres =
        "group{\
            orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
            text:EditText{properties:{multiline:true,scrolling: false},preferredSize:[150,300],text:'',enabled:1},\
            wlist:ListBox{preferredSize:[150,300]},\
            }";
        listWin.res = listWin.add(listres);
        listWin.res.text.text = loc(sp.about);
        listWin.res.text.onChange = listWin.res.text.onChanging = function () {
            this.text = loc(sp.about);
        }
        listres2 =
        "group{\
            orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
            cl:Button{preferredSize:[165,27],text:'" + loc(sp.deleteFolder) + "',enabled:1},\
            change:Button{preferredSize:[165,27],text:'" + loc(sp.changeGroupName) + "',enabled:1},\
            }";
        listWin.res2 = listWin.add(listres2);
        listWin.res2.cl.onClick = function () {
            waitCl = Folder(sp.scriptFolder.toString() + "/tempFile");
            var deleteThisFolder = function (folder) {
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
            deleteThisFolder(waitCl);
            alert(loc(sp.deleteOk));
        }
        listWin.res2.change.onClick = function () {
            if (listWin.res.wlist.selection != null) {
                newGrName = prompt(loc(sp.setName), listWin.res.wlist.selection.text);
                isEx = true;
                if (newGrName != null) {
                    for (caca = 0; caca < listWin.res.wlist.items.length; caca++) {
                        if (listWin.res.wlist.items[caca].text == newGrName.toString()) {
                            if (caca != listWin.res.wlist.selection.index) {
                                isEx = false;
                                break;
                            }
                        }
                    }
                }
                if (newGrName != null) {
                    if (newGrName.toString() != "" && isEx == true && newGrName.toString() != listWin.res.wlist.selection.text) {
                        var thisXml = File(sp.xmlPaths[listWin.res.wlist.selection.index].toString());
                        var imagesFolder = Folder(File(sp.xmlPaths[listWin.res.wlist.selection.index].toString()).parent.toString() + "/image/" + File(sp.xmlPaths[listWin.res.wlist.selection.index].toString()).displayName.split(".")[0].toString());
                        thisXml.rename(newGrName.toString() + ".xml");
                        try {
                            ccc = sp.xmlFile.readd();
                            newC = XML(ccc);
                            newC.ListItems.insertChildAfter(newC.ListItems.child(listWin.res.wlist.selection.index), XML("<Name>" + newGrName.toString() + "</Name>"));
                            newC.ListItems.child(listWin.res.wlist.selection.index).setLocalName("waitToDelete");
                            delete newC.ListItems.waitToDelete;
                            sp.xmlFile.writee(newC);
                        } catch (err) { }
                        if (imagesFolder.exists) {
                            imagesFolder.rename(newGrName.toString());
                        }
                        listWin.res.wlist.selection.text = newGrName.toString();
                        if (sp.ui == 2)
                            gui.droplist.items[listWin.res.wlist.selection.index].text = newGrName.toString();
                        else
                            sp.drop.items[listWin.res.wlist.selection.index].text = newGrName.toString();
                        sp.xmlPaths[listWin.res.wlist.selection.index] = File(sp.scriptsFile.parent.fsName + "/Sp_memory/" + newGrName.toString() + ".xml").toString();
                        if (sp.ui == 2){
                            gui.droplist.notify("onChange");
                        }else{
                            sp.drop.notify("onChange");
                            }
                    } else if (newGrName.toString() == "") {
                        alert(loc(sp.blankName));
                    } else if (isEx == false) {
                        alert(loc(sp.existName));
                    }
                }
            }
        }
        outPutRes = "group{\
       alignment:['fill','fill'],\
        alignChildren:['fill','fill'],\
       output:Button{text:'"+ loc(sp.output) + "'}\
       }";
        listWin.out = listWin.add(outPutRes);

        listWin.out.output.onClick = function () {
            var outWin = new Window("window", "Export", undefined, { resizeable: 0, maximizeButton: 0 });
            outRes = """Group{
            orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                            wlist:ListBox{properties:{multiselect:1}},
                            oc:Group{
                                ok:Button{text:'"""+loc(sp.ok)+"""'},
                                cancel:Button{text:'"""+loc(sp.cancel)+"""'}
                            }}""";
                try{outRes=outWin.add(outRes);}catch(err){alert(err)}
                    var scriptsFile = sp.scriptsFile;
                    wfolder = sp.settingsFolder;
                    wxmlFile = sp.settingsFile;
                    wcontent = wxmlFile.readd();
                    wXML = new XML(wcontent);
                    for (var bPoint = 0; bPoint < wXML.ListItems.children().length(); bPoint++) {
                        outRes.wlist.add("item", wXML.ListItems.child(bPoint).toString());
                    }
                outRes.wlist.size = [200,500];
                outWin.show();
                
                outRes.oc.ok.onClick=function(){
                        if(outRes.wlist.selection!=null){
                              var exportFolder = Folder.selectDialog("Please select folder");
                               if (exportFolder != null && exportFolder instanceof Folder) {
                                var preSelection = gui.droplist.selection.index;
                                for(var iai=0;iai<outRes.wlist.selection.length;iai++){
                                        var thisSelection=outRes.wlist.selection[iai].index;
                                        gui.droplist.selection= thisSelection;
                                        gui.droplist.notify("onChange");
                                        var scriptsFile = new File($.fileName);
                                            if (!File(exportFolder.toString() + "/" + sp.inXmlFile.name).exists) {
                                                sp.inXmlFile.copy(exportFolder.toString() + "/" + sp.inXmlFile.name);
                                                var thisFile=File(exportFolder.toString() + "/" + sp.inXmlFile.name);
                                                var thisCon=thisFile.readd();
                                                var thisXml=new XML(thisCon);
                                                var imgFolder=Folder(sp.folder.toString()+"/image"+"/"+sp.inXmlFile.name.replace(".xml",""));
                                                if(imgFolder.exists){
                                                var picXml=new XML("<pic></pic>");
                                                var filesHere=imgFolder.getFiles ();
                                                var isYou=false;
                                                for(var i=0;i<filesHere.length;i++){
                                                        if(filesHere[i].name.indexOf(".png")!=-1){
                                                            isYou=true;
                                                                filesHere[i].open("r");
                                                                filesHere[i].encoding="BINARY";
                                                                encodeStr=encodeURIComponent(filesHere[i].read());
                                                                filesHere[i].close();
                                                                tempXmlBigHere=new XML("<imgName>"+encodeURIComponent(filesHere[i].name)+"</imgName>");
                                                                tempXmlHeres=new XML("<img>"+encodeStr+"</img>");
                                                                guluTempA=new XML("<imgInfo></imgInfo>");
                                                                guluTempA.appendChild(tempXmlBigHere);
                                                                guluTempA.appendChild(tempXmlHeres);
                                                                picXml.appendChild (guluTempA);
                                                            }
                                                    }
                                                    if(isYou==true){
                                                            thisXml.appendChild (picXml);
                                                            thisFile.writee(thisXml);
                                                        }
                                                }
                                            } else {
                                                clearOutput();
                                                writeLn(loc(sp.overWritten));
                                            }
                                    }
                                gui.droplist.selection = preSelection;
                                gui.droplist.notify("onChange");
                                alert(loc(sp.complete));
                                outWin.close();
                                }
                            }
                    }
                outRes.oc.cancel.onClick=function(){
                        outWin.close();
                    }

           }
        var str1 = 
            """group{
            orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
            g0:Group{
             orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                gr1:Group{c:Checkbox{text:""}},
                gr2:Group{c:Checkbox{text:""}},
            },
            gr1:Group{
                orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                gr1:Group{c:Checkbox{text:""}},
            }
            gr0:Group{
            orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
            gr2:Group{alignment:['fill','fill'],alignChildren:['fill','fill'],st:StaticText{text:""},ed:EditText{text:"",justify:'center',characters:17}},
            },
            gr3:Group{alignment:['fill','fill'],alignChildren:['fill','fill'],st:StaticText{text:""},ed:EditText{text:"",characters:18}}
            }""";
            

            var str = listWin.add(str1);
            str.gr1.gr1.c.text = loc(sp.thumbType);
            str.g0.gr1.c.text = loc(sp.limitText);
            str.g0.gr2.c.text = loc(sp.coverChange)
            str.gr0.gr2.st.text =loc(sp.folderName);
            str.gr3.st.text =loc(sp.effectName);
            
            if (parseInt(app.version.split(".")[0])<11){
                    str.gr1.gr1.c.enabled =false;
                }

            str.gr1.gr1.c.value = (sp.getSetting("thumbType")=="false")?false:true;
            str.gr1.gr1.c.onClick = function(){
                               sp.saveSetting("thumbType",this.value.toString());
                }
            
            str.g0.gr1.c.value = (sp.getSetting ("limitText")=="false")?false:true;
            str.g0.gr1.c.onClick = function(){
                    sp.saveSetting ("limitText",this.value.toString());
                    sp.gv.limitText = this.value;
                    sp.gv.refresh();
                }
            str.g0.gr2.c.value = (sp.getSetting ("coverChange")=="false")?false:true;
            str.g0.gr2.c.onClick = function(){
                    sp.saveSetting ("coverChange",this.value.toString());
                }
            str.gr0.gr2.ed.text = sp.getSetting ("folderName");
            str.gr0.gr2.ed.onChange = function(){
                    sp.saveSetting ("folderName",this.text);
                }
            str.gr3.ed.text = sp.getSetting ("effectName");
            str.gr3.ed.onChange = function(){
                    sp.saveSetting ("effectName",this.text);
                }
       
        listres1 =
            "group{\
            orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
            ch:Button{text:'中文',enabled:0},\
            en:Button{text:'English',enabled:0},\
            }";
        listWin.res1 = listWin.add(listres1);
        if (sp.getSetting("language") == "ch") {
            listWin.res1.ch.enabled = false;
            listWin.res1.en.enabled = true;
        } else {
            listWin.res1.ch.enabled = true;
            listWin.res1.en.enabled = false;
        }
        listWin.res1.ch.onClick = function() {
            sp.saveSetting("language","ch")
            alert("请重新打开脚本,语言会将自动变更为中文.");
            listWin.res1.ch.enabled = false;
            listWin.res1.en.enabled = true;
        }
        listWin.res1.en.onClick = function() {
            sp.saveSetting("language","en")
            alert("Please restart script,language will be changed into English.");
            listWin.res1.en.enabled = false;
            listWin.res1.ch.enabled = true;
        }
        listres2 =
            "group{\
            orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
            ch:Button{text:'"+loc(sp.ui1)+"',enabled:0},\
            en:Button{text:'"+loc(sp.ui2)+"',enabled:0},\
            }";
        listWin.res2 = listWin.add(listres2);
        if(sp.getSetting("ui")=="1"){
                listWin.res2.ch.enabled = 0;
                listWin.res2.en.enabled = 0;
            }else{
                listWin.res2.ch.enabled = 0;
                listWin.res2.en.enabled = 0;
                }

            
         listWin.res2.ch.onClick = function(){
                alert(loc(sp.uiC));
                sp.saveSetting("ui","1");
                listWin.res2.ch.enabled = 0;
                listWin.res2.en.enabled = 1;
             }
         listWin.res2.en.onClick = function(){
                alert(loc(sp.uiC));
                sp.saveSetting("ui","2");
                listWin.res2.ch.enabled = 1;
                listWin.res2.en.enabled = 0;
             }
        listres3 =
            "group{\
            orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
            ch:Button{text:'"+loc(sp.checkVersion)+"',enabled:1},\
            en:Button{text:'"+loc(sp.link)+"',enabled:1},\
            }";
        listWin.res3 = listWin.add(listres3);
        if (sp.lang == "ch"){
        listWin.res3.ch.size = listWin.res3.en.size = (sp.lang == "ch")?[165,27]:[211,27];
        listWin.res3.en.onClick = function(){
                sp.openLink(sp.weiboLink);
            }
        }else{
                listWin.res3.remove(listWin.res3.en);
            }
        listWin.res3.ch.onClick = function(){
                try{
                 var latest = parseFloat(sp.getVersion());
                 var nowVersion = parseFloat(sp.version);
                 if(latest > nowVersion){
                        alert(loc(sp.newVersionFind)+latest.toString());
                        if (confirm (loc(sp.isDown))){ 
                                sp.openLink(sp.downloadLink+" v"+latest.toString()+".jsxbin");
                            }
                     }else{
                            alert(loc(sp.newVersionNotFind));
                         }
                     }catch(err){err.printa()}
            }
    
        var scriptsFile = sp.scriptsFile;
        wfolder = sp.settingsFolder;
        wxmlFile = sp.settingsFile;
        wcontent = wxmlFile.readd();
        wXML = new XML(wcontent);
        for (var bPoint = 0; bPoint < wXML.ListItems.children().length(); bPoint++) {
            listWin.res.wlist.add("item", wXML.ListItems.child(bPoint).toString());
        }

        var  handleKey = function(key, control) {
            switch (key.keyName) {
                case "Up":
                    if (listWin.res.wlist.selection != null && listWin.res.wlist.selection.index > 0) {
                        if (sp.ui == 2)
                        exchange(true)
                        else
                        exchange2(true);
                    };
                    break;
                case "Down":
                    if (listWin.res.wlist.selection != null && listWin.res.wlist.selection.index < listWin.res.wlist.items.length - 1) {
                        if (sp.ui == 2)
                        exchange(false);
                        else
                        exchange2(false);
                    };
                    break;
            }
        }

        var exchange= function(isUp) {
            if (isUp == true) {
                var aic = listWin.res.wlist.selection.index;
                mingzi = gui.droplist.selection.text;
                var wupxml = new XML(wXML.ListItems.child(aic));
                wXML.ListItems.insertChildBefore(wXML.ListItems.child(aic - 1), wupxml);
                wXML.ListItems.child(aic + 1).setLocalName("waitToDelete");
                delete wXML.ListItems.waitToDelete;
                wxmlFile.writee(wXML);
                warpBig(listWin.res.wlist.items[aic - 1], listWin.res.wlist.items[aic]);
                warpDrop(gui.droplist.items[aic - 1], gui.droplist.items[aic], aic - 1, aic);
                gui.droplist.selection = gui.droplist.find(mingzi);
            } else {
                var aic = listWin.res.wlist.selection.index;
                mingzi = gui.droplist.selection.text;
                var wdownxml = new XML(wXML.ListItems.child(aic));
                wXML.ListItems.insertChildAfter(wXML.ListItems.child(aic + 1), wdownxml);
                wXML.ListItems.child(aic).setLocalName("waitToDelete");
                delete wXML.ListItems.waitToDelete;
                wxmlFile.writee(wXML);
                warpBig(listWin.res.wlist.items[aic + 1], listWin.res.wlist.items[aic]);
                warpDrop(gui.droplist.items[aic + 1], gui.droplist.items[aic], aic + 1, aic);
                gui.droplist.selection = gui.droplist.find(mingzi);
            }
        }

        var exchange2= function(isUp) {
            if (isUp == true) {
                var aic = listWin.res.wlist.selection.index;
                mingzi = sp.drop.selection.text;
                var wupxml = new XML(wXML.ListItems.child(aic));
                wXML.ListItems.insertChildBefore(wXML.ListItems.child(aic - 1), wupxml);
                wXML.ListItems.child(aic + 1).setLocalName("waitToDelete");
                delete wXML.ListItems.waitToDelete;
                wxmlFile.writee(wXML);
                warpBig(listWin.res.wlist.items[aic - 1], listWin.res.wlist.items[aic]);
                warpDrop(sp.drop.items[aic - 1], sp.drop.items[aic], aic - 1, aic);
                sp.drop.selection = sp.drop.find(mingzi);
                sp.drop.notify("onChange");
                sp.gv.refresh();
            } else {
                var aic = listWin.res.wlist.selection.index;
                mingzi = sp.drop.selection.text;
                var wdownxml = new XML(wXML.ListItems.child(aic));
                wXML.ListItems.insertChildAfter(wXML.ListItems.child(aic + 1), wdownxml);
                wXML.ListItems.child(aic).setLocalName("waitToDelete");
                delete wXML.ListItems.waitToDelete;
                wxmlFile.writee(wXML);
                warpBig(listWin.res.wlist.items[aic + 1], listWin.res.wlist.items[aic]);
                warpDrop(sp.drop.items[aic + 1], sp.drop.items[aic], aic + 1, aic);
                sp.drop.selection = sp.drop.find(mingzi);
                sp.drop.notify("onChange");
                sp.gv.refresh();
            }
        }

        var warpBig = function(a, b) {
            tempA = a.text;
            a.text = b.text;
            b.text = tempA;
        }

        var warpDrop = function(a, b, index1, index2) {
            tempD = a.text;
            a.text = b.text;
            b.text = tempD;
            tempXML = sp.xmlPaths[index1];
            sp.xmlPaths[index1] = sp.xmlPaths[index2];
            sp.xmlPaths[index2] = tempXML;
        }
        listWin.res.wlist.addEventListener("keydown", function(k) {
            handleKey(k, this);
        });
        listWin.center();
        listWin.show();
    }
    