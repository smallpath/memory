function OperatorOverload(call,operator){
            var meta = [
                                    //Unary operator
                                    '+','-','~',
                                    //Binary operator
                                    '*','/','%','^','<','<=','==','<<','>>','>>>','&','|','==='
                              ];
            var toObject = function (){
                                          for(var i =0;i<arguments.length;i++)
                                                this[arguments[i]] = true;
                                          return this;
                                    }
            var metaObj = toObject.apply({},meta);
            if(!metaObj.hasOwnProperty (operator))    
                   return alert('Operator not supported.');
            
            this.call = call;
            this [operator] = function(operand,rev){
                        return this.call(operand,rev);
                  }
            return this;
      }

var cout = $.global.cout = new OperatorOverload(function (operand,rev){
            if(!rev)
                  $.writeln(operand);
            else
                  alert(operand);
      },'<<');
  


try{
Sp_toolbar(this);
}catch(err){alert(err.line.toString()+"\r"+err.toString());}

function Sp_toolbar(thisObj){
    
        var version =  '1.4';
        var typeArr = ['EFFECT','EXPRESSION','ANIMATION PRESET','SCRIPTLAUCHER','MENU','JAVASCRIPT','OS'];
        
        File.prototype.writee = File.prototype.writee|| function (str) {    //写文件操作
            this.open("w");
            this.write(str);
            this.close();
        }
        File.prototype.readd = File.prototype.readd||function(){      //读文件操作
                this.open("r");
                var temp = this.read();
                this.close();
                return temp;
            }
        Array.prototype.getId = Array.prototype.getId||function(str){
                for (var i in this){
                        if(this[i]==str)
                            return i;
                    }
                return -1;
            }
        
       if (app.settings.haveSetting("Sp_toolbar", "winLocation") == false) {
            app.settings.saveSetting("Sp_toolbar", "winLocation", "200,500");
        }
        if (app.settings.haveSetting("Sp_toolbar", "winSize") == false) {
            app.settings.saveSetting("Sp_toolbar", "winSize", "300,500");
        }
        if (app.settings.haveSetting("Sp_toolbar", "buttonSize") == false) {
            app.settings.saveSetting("Sp_toolbar", "buttonSize", "30,30");
        }
        if (app.settings.haveSetting("Sp_toolbar", "buttonSpacing") == false) {
            app.settings.saveSetting("Sp_toolbar", "buttonSpacing", "0,0");
        }       
        if (app.settings.haveSetting("Sp_toolbar", "dropSelection") == false) {
            app.settings.saveSetting("Sp_toolbar", "dropSelection", "0");
        }        
        if (app.settings.haveSetting("Sp_toolbar", "language") == false) {
            app.settings.saveSetting("Sp_toolbar", "language", "ch");
        }
  
        
        var thisFolder = Folder(Folder.userData.fullName + "/Aescripts/Sp_toolbar");
        if (!thisFolder.exists)
                    thisFolder.create();
                    var str= $.fileName.split("/")[$.fileName.split("/").length-1].replace(".jsxbin","").replace(".jsx","");
        var special_file = File(thisFolder.toString()+"/"+str+".xml");
        var tempJsxFile = File(thisFolder.toString()+"/tempJsx.jsx");
        var backupFile = File(thisFolder.toString()+"/backup.xml");
        if (!special_file.exists){
            var xml = new XML("<Config><general><version>"+version+"</version></general><Group></Group></Config>");
            xml.Group ="";
            special_file.writee(xml);
            }
    
var sp_toolbar = {
                typeArr : typeArr,
                close: 0, 
                lang: 0,
                ip:"139.129.132.60",
                downloadLink:"http://139.129.132.60/script/Sp_toolbar",
                weiboLink:"http://weibo.com/u/3893928357",
                
                regExp : new RegExp("\"", "g"),
                newDraw : function() {
                    var WH = view.itemSize;
                        wh = this.image.size;//获取图像的尺寸
                     k = [(WH[0]/wh[0]), (WH[1]/wh[1])];
                    wh = [k[0]*wh[0],k[1]*wh[1]];
                    xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
                    this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
                },
                swap: function(a,b){
                        var c = b.text;
                        b.text = a.text;
                        a.text = c;
                    },
                openLink : function(url) {
                        var cmd = "";
                        if ($.os.indexOf("Win") != -1) {
                            cmd += "explorer " + url;
                        } else {
                            cmd += "open \"" + url + "\"";
                        }
                        try {
                            system.callSystem(cmd);
                        } catch (e) {}
                    },
                getLastGroupId : function(name){
                         var xml = new XML(special_file.readd());
                         return xml.Group.children().length();
                    },
                addGroup : function(name){
                    var xml = new XML(special_file.readd());
                    var newXml = new XML("<group></group>");
                    newXml.@groupName = name;
                    xml.Group.appendChild (newXml);
                    special_file.writee(xml);
                },
                delGroup : function(id){
                    var xml = new XML(special_file.readd());
                    xml.Group.child(id).setLocalName ("WaitToDelete");
                    delete xml.Group.WaitToDelete;
                    special_file.writee(xml);
                },
                upGroup : function(id){
                    var xml = new XML(special_file.readd());
                    var newXml =new XML(xml.Group.child(id));
                    xml.Group.insertChildBefore (xml.Group.child(id-1),newXml);
                    xml.Group.child(id+1).setLocalName ("WaitToDelete");
                    delete xml.Group.WaitToDelete;
                    special_file.writee(xml);
                },       
                downGroup : function(id){
                    var xml = new XML(special_file.readd());
                    var newXml =new XML(xml.Group.child(id));
                    xml.Group.insertChildAfter (xml.Group.child(id+1),newXml);
                    xml.Group.child(id).setLocalName ("WaitToDelete");
                    delete xml.Group.WaitToDelete;
                    special_file.writee(xml);
                },
                renameGroup:function(id,name){
                    var xml = new XML(special_file.readd());
                    xml.Group.child(id).@groupName =name;
                    special_file.writee(xml);
                },
                parseButton : function(groupId,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){
                    var xml = new XML(special_file.readd());
                    var newXml = XML("<button><buttonName/><activeModifiers/><click/><ctrl/><shift/><alt/><ctrlShift/><ctrlAlt/><shiftAlt/><ctrlShiftAlt/><helpTip/><icon/><lastModifier/></button>");
                    newXml.buttonName = a.toString();
                    newXml.activeModifiers=b;
                    newXml.click.cmd=c;
                    newXml.click.type=d;                
                    newXml.ctrl.cmd=e;
                    newXml.ctrl.type=f;
                    newXml.shift.cmd=g;
                    newXml.shift.type=h;
                    newXml.alt.cmd=i;
                    newXml.alt.type=j;
                    newXml.ctrlShift.cmd=k;
                    newXml.ctrlShift.type=l;
                    newXml.ctrlAlt.cmd=m;
                    newXml.ctrlAlt.type=n;
                    newXml.shiftAlt.cmd=o;
                    newXml.shiftAlt.type=p;                
                    newXml.ctrlShiftAlt.cmd=q;
                    newXml.ctrlShiftAlt.type=r;
                    newXml.lastModifier = s.toString();
                    newXml.helpTip = t.toString();
                    newXml.icon = u;
                    xml.Group.child(groupId).appendChild (newXml);
                    special_file.writee(xml);
                },
                addButton : function(groupId,buttonName){
                    var xml = new XML(special_file.readd());
                    var newXml = new XML("<button><buttonName/><activeModifiers/><click/><ctrl/><shift/><alt/><ctrlShift/><ctrlAlt/><shiftAlt/><ctrlShiftAlt/><helpTip/><icon/><lastModifier/></button>");
                    newXml.buttonName = buttonName;
                    newXml.activeModifiers="1";
                    newXml.click.cmd="";
                    newXml.click.type=typeArr[0];                
                    newXml.ctrl.cmd="";
                    newXml.ctrl.type=typeArr[0];
                    newXml.shift.cmd="";
                    newXml.shift.type=typeArr[0];
                    newXml.alt.cmd="";
                    newXml.alt.type=typeArr[0];
                    newXml.ctrlShift.cmd="";
                    newXml.ctrlShift.type=typeArr[0];
                    newXml.ctrlAlt.cmd="";
                    newXml.ctrlAlt.type=typeArr[0];
                    newXml.shiftAlt.cmd="";
                    newXml.shiftAlt.type=typeArr[0];                
                    newXml.ctrlShiftAlt.cmd="";
                    newXml.ctrlShiftAlt.type=typeArr[0];
                    newXml.lastModifier = "0";
                    newXml.helpTip = "";
                    newXml.icon = "";
                    xml.Group.child(groupId).appendChild (newXml);
                    special_file.writee(xml);
                },
            
                delButton : function(groupId,buttonId){
                    var xml = new XML(special_file.readd());
                    xml.Group.child(groupId).child(buttonId).setLocalName ("WaitToDelete");
                    delete xml.Group.child(groupId).WaitToDelete;
                    special_file.writee(xml);
                },
            
                upButton : function(groupId,buttonId){
                    var xml = new XML(special_file.readd());
                    var newXml =new XML(xml.Group.child(groupId).child(buttonId));
                    xml.Group.child(groupId).insertChildBefore (xml.Group.child(groupId).child(buttonId-1),newXml);
                    xml.Group.child(groupId).child(buttonId+1).setLocalName ("WaitToDelete");
                    delete xml.Group.child(groupId).WaitToDelete;
                    special_file.writee(xml);
                },

                downButton : function(groupId,buttonId){
                    var xml = new XML(special_file.readd());
                    var newXml =new XML(xml.Group.child(groupId).child(buttonId));
                    xml.Group.child(groupId).insertChildAfter (xml.Group.child(groupId).child(buttonId+1),newXml);
                    xml.Group.child(groupId).child(buttonId).setLocalName ("WaitToDelete");
                    delete xml.Group.child(groupId).WaitToDelete;
                    special_file.writee(xml);
                },
            
                getButtonInfo : function(groupId,buttonId){
                    var xml = new XML(special_file.readd());
                    return xml.Group.child(groupId).child (buttonId);
                },   
            
                saveButton : function(list1,list2,ed2,activeModifers,ed3,clickDrop,ed4,ed5){
                    if(ed2.text=="") return;
                    if(list1.selection == null)return;
                    if(list2.selection == null)return;
                    var xml = new XML(special_file.readd());
                    var newXml=xml.Group.child(list1.selection.index).child(list2.selection.index);
                    newXml.buttonName = ed2.text;
                    newXml.activeModifiers=(activeModifers.value==true)?"1":"0";
                    newXml.click.cmd= ed3.text0.toString();
                    newXml.click.subName = ed3.subName0.toString();
                    newXml.click.type=typeArr[parseInt(ed3.type0)];                
                    newXml.ctrl.cmd= ed3.text1;
                    newXml.ctrl.subName = ed3.subName1.toString();
                    newXml.ctrl.type=typeArr[parseInt(ed3.type1)];  
                    newXml.shift.cmd= ed3.text2;
                    newXml.shift.subName = ed3.subName2.toString();
                    newXml.shift.type=typeArr[parseInt(ed3.type2)];  
                    newXml.alt.cmd=ed3.text3;
                    newXml.alt.subName = ed3.subName3.toString();
                    newXml.alt.type=typeArr[parseInt(ed3.type3)];  
                    newXml.ctrlShift.cmd=ed3.text4;
                    newXml.ctrlShift.subName = ed3.subName4.toString();
                    newXml.ctrlShift.type=typeArr[parseInt(ed3.type4)];  
                    newXml.ctrlAlt.cmd=ed3.text5;
                    newXml.ctrlAlt.subName = ed3.subName5.toString();
                    newXml.ctrlAlt.type=typeArr[parseInt(ed3.type5)];  
                    newXml.shiftAlt.cmd=ed3.text6;
                    newXml.shiftAlt.subName = ed3.subName6.toString();
                    newXml.shiftAlt.type=typeArr[parseInt(ed3.type6)];             
                    newXml.ctrlShiftAlt.cmd=ed3.text7;
                    newXml.ctrlShiftAlt.subName = ed3.subName7.toString();
                    newXml.ctrlShiftAlt.type=typeArr[parseInt(ed3.type7)];  
                    newXml.lastModifier = clickDrop.selection.index.toString();
                    newXml.helpTip =ed4.text ;
                    if(ed5 instanceof StaticText){
                        
                    }else{
                        newXml.icon = ed5;
                        }
                    special_file.writee(xml);
                },
                handler: function(cmd,type){
                        var comp = app.project.activeItem;
                        var id = typeArr.getId (type);
                        if (cmd=="") return;
                        if (id == -1) return;
                       try{
                            app.beginUndoGroup ("Sp_toolbar Undo");
                            if (id == 0){
                                    if (!(comp instanceof CompItem)) return;
                                    var sl = comp.selectedLayers;
                                    for (var j=0;j<sl.length;j++){
                                            sl[j].property("ADBE Effect Parade").addProperty (cmd);       
                                        }
                                }else if(id == 1){
                                    if (!(comp instanceof CompItem)) return;
                                    var sl = comp.selectedProperties;
                                    for (var i=0;i<sl.length;i++){
                                            sl[i].expression = cmd;
                                        }
                               } else if(id == 2){
                                   if (!(comp instanceof CompItem)) return;
                                    var sl = comp.selectedLayers;
                                    for (var i=0;i<sl.length;i++){
                                            sl[i].applyPreset (File(cmd));
                                        }
                               } else if(id == 3){
                                    (function(){$.evalFile(cmd);})()
                               } else if(id == 4){
                                    app.executeCommand(app.findMenuCommandId(cmd));
                               } else if(id == 5){
                                    tempJsxFile.writee(cmd);
                                    (function(){$.evalFile(tempJsxFile.toString());})();
                               } else if(id == 6){
                                    system.callSystem("cmd.exe /c \""+cmd+"\"");
                               } 
                            app.endUndoGroup();
                          }catch(err){alert(err.line.toString()+"\r"+err.toString())}
                    },
        };
    

        


                      

    

      
      var special_loc = $.global.special_loc = new OperatorOverload(function (str){
                  if(sp_toolbar.lang ==0){
                              sp_toolbar.lang = app.settings.getSetting("Sp_toolbar", "language");
                        }
                  return str[sp_toolbar.lang];
      },'>>');



    var special_str = {
              general:{en:'General',ch:'一般'},
              toolbar:{en:'Toolbar',ch:'工具栏'},
              buttonSize:{en:'Buttons size',ch:'按钮大小'},
              buttonSpacing:{en:'Buttons spacing',ch:'按钮间隔'},
              handleXmlFIle:{en:'Configuration XML File',ch:'配置文件'},
              importFile:{en:'Import Config File',ch:'导入文件'},
              exportFile:{en:'Export Config File',ch:'导出文件'},
              internetText:{en:'Internet',ch:'网络'},
              checkForUpdate:{en:'Check for update',ch:'检查更新'},
              weibo:{en:'Weibo',ch:'微博'},
              parse:{en:'Parse',ch:'转移'},
              parseButton:{en:'Parse Ft_toolbar config to Sp_toolbar',ch:'从Ft_toolbar文件读取配置'},
              language:{en:'Language',ch:'语言'},
              nameText:{en:'Name:',ch:'名称:'},
              subName:{en:'Sub name:',ch:'右键菜单中子元素的名称:'},
              command:{en:'Command:',ch:'命令:'},
              activeModifiers:{en:'Active modifiers',ch:'允许右键菜单与键盘监听'},
              getEffect:{en:'Get Effect Name',ch:'获得被选中的插件'},
              getEffectWith:{en:'Get Effect with parameters',ch:'获得被选中的插件(保留所有参数)'},
              getPresets:{en:'Browse Animation Presets',ch:'选择预设文件'},
              getScripts:{en:'Browse Scripts',ch:'选择脚本文件'},
              ok:{en:'Ok',ch:'确定'},
              can:{en:'Cancel',ch:'取消'},
              changeScriptType:{en:'The script is a Panel script\rDo you want to change script to Menu ?',ch:'此脚本为Panel型脚本,是否保留Panel窗口特性?'},
              toolbars:{en:'Toolbars',ch:'工具栏'},
              buttons:{en:'Buttons',ch:'按钮'},
              quit:{en:'Are you sure to quit without saving?',ch:'直接取消将不会保留你的修改,确定退出吗?'},
              save:{en:'Do you want to save your changes?',ch:'是否保存你的更改?'},
              importOk:{en:'Import successfully!Please restart script',ch:'导入成功!请重启脚本'},
              newVersionFind:{en:'New version found,please download the new version',ch:'发现新版本,版本号为:'},
              whatUpdate:{en:'Do you want to download new version right now?',ch:'是否下载最新版本?'},
              noNew:{en:'No new version',ch:'版本已为最新版'},
              notFt:{en:'This special_file is Not a Ft_toolbar config special_file,please select the correct json',ch:'此文件不是Ft_toolbar的配置文件'},
              buttonsParameters:{en:'Buttons Parameters',ch:'按钮参数'},
              type:{en:'Type:',ch:'类型:'},
              typeArr:{en:"['EFFECT','EXPRESSION','ANIMATION PRESET','SCRIPTLAUCHER','MENU','JAVASCRIPT','OS']",ch:"['插件','表达式','预设文件','脚本文件','菜单元素名称','JavaScript代码','系统级命令']"},
              helpTip:{en:'HelpTip:',ch:'按钮帮助信息:'},
              icon:{en:'Icon:',ch:'图片:'},
          }
    
    
      
    var win = (thisObj instanceof Panel)?thisObj:new Window('palette','Sp_toolbar',undefined,{resizeable:1});
    win.margins = win.spacing = 0 ;
    var gr = win.add("Group");
    var scrollbar = win.add("scrollbar",[0,0,5,200],0,0,100);
    var droplist = win.add("dropdownlist");
    sp_toolbar.drop = droplist;
    win.addEventListener ("mouseup",function(event){if(event.button==2&&event.detail==2 && event.ctrlKey)SettingWin (0, gr);})
    scrollbar.stepdelta = scrollbar.jumpdelta = 20;
    droplist.visible = 0;
    gr.margins =0;


       droplist.onChange = function(){
                if (!droplist.selection) return;
                app.settings.saveSetting("Sp_toolbar", "dropSelection", droplist.selection.index);
                var l =gr.children.length;
                for (var i=0;i<l;i++){
                        gr.remove(l-1-i);
                    }
                var xml = new XML(special_file.readd());
                var thisXml = xml.Group.child(droplist.selection.index);
                for (var i =0;i<thisXml.children().length();i++){
                        var ic = gr.add("iconbutton");
                        ic.size = view.itemSize;
                        ic.text = thisXml.child(i).buttonName;
                        var xml=thisXml.child(i);
                        if(xml.ctrl.cmd!=""||xml.shift.cmd!=""||xml.alt.cmd!=""||xml.ctrlShift.cmd!=""||xml.ctrlAlt.cmd!=""||xml.shiftAlt.cmd!=""||xml.ctrlShiftAlt.cmd!=""){
                                        ic.hasMulti = 1;
                           }else{
                                        ic.hasMulti = 0;
                                }
                        ic.index = i;
                        ic.helpTip = thisXml.child(i).helpTip.toString();
                        if (thisXml.child(i).icon.toString()!=""){
                                    try{    
                                        ic.image = decodeURIComponent (thisXml.child(i).icon.toString());
                                        ic.onDraw = sp_toolbar.newDraw;
                                        }catch(err){}
                            }
                        ic.addEventListener ("mouseup",function(k){
                                    if(k.button == 2 && this.hasMulti ==1){
                                         var newWin = new Window("palette","",undefined,{borderless:1});
                                         sp_toolbar.newWin = newWin;
                                         var thisBtn = newWin.add("button");
                                         thisBtn.preferredSize.width = 150;
                                         thisBtn.preferredSize.height = 22;
                                         thisBtn.text = "Close";
                                         thisBtn.onClick = function(){
                                                sp_toolbar.newWin.close();
                                             }
                                         newWin.newDrop = newWin.add("listbox");
                                         newWin.spacing =0;
                                         newWin.margins = 0;
                                        
                                        var thisDrop = sp_toolbar.newWin.newDrop;
                                        thisDrop.preferredSize= [150,180];
                                        thisDrop.removeAll();
                                        var xml = sp_toolbar.getButtonInfo (droplist.selection.index, this.index);
                                            {
                                                if(xml.click.subName !="")
                                                thisDrop.add("item",xml.click.subName);
                                                else
                                                thisDrop.add("item",xml.buttonName);
                                                if(xml.ctrl.subName !="")
                                                thisDrop.add("item",xml.ctrl.subName);
                                                else
                                                thisDrop.add("item",xml.ctrl.cmd);
                                                if(xml.shift.subName !="")
                                                thisDrop.add("item",xml.shift.subName);
                                                else
                                                thisDrop.add("item",xml.shift.cmd);
                                                if(xml.alt.subName !="")
                                                thisDrop.add("item",xml.alt.subName);
                                                else
                                                thisDrop.add("item",xml.alt.cmd);
                                                if(xml.ctrlShift.subName !="")
                                                thisDrop.add("item",xml.ctrlShift.subName);
                                                else
                                                thisDrop.add("item",xml.ctrlShift.cmd);
                                                if(xml.ctrlAlt.subName !="")
                                                thisDrop.add("item",xml.ctrlAlt.subName);
                                                else
                                                thisDrop.add("item",xml.ctrlAlt.cmd);
                                                if(xml.shiftAlt.subName !="")
                                                thisDrop.add("item",xml.shiftAlt.subName);
                                                else
                                                thisDrop.add("item",xml.shiftAlt.cmd);
                                                if(xml.ctrlShiftAlt.subName !="")
                                                thisDrop.add("item",xml.ctrlShiftAlt.subName);
                                                else
                                                thisDrop.add("item",xml.ctrlShiftAlt.cmd);
                                                thisDrop.onChange = function(k){
                                                    sp_toolbar.newWin.hide();
                                                    if(!this.selection) return;
                                                        if (this.selection.index==0){
                                                             sp_toolbar.handler(xml.click.cmd,xml.click.type);
                                                            }else if (this.selection.index==1){
                                                                sp_toolbar.handler(xml.ctrl.cmd,xml.ctrl.type);
                                                                }else if (this.selection.index==2){
                                                                    sp_toolbar.handler(xml.shift.cmd,xml.shift.type);
                                                                    }else if (this.selection.index==3){
                                                                        sp_toolbar.handler(xml.alt.cmd,xml.alt.type);
                                                                        }else if (this.selection.index==4){
                                                                            sp_toolbar.handler(xml.ctrlShift.cmd,xml.ctrlShift.type);
                                                                            }else if (this.selection.index==5){
                                                                                sp_toolbar.handler(xml.ctrlAlt.cmd,xml.ctrlAlt.type);
                                                                                }else if (this.selection.index==6){
                                                                                    sp_toolbar.handler(xml.shiftAlt.cmd,xml.shiftAlt.type);
                                                                                    }else if (this.selection.index==7){
                                                                                        sp_toolbar.handler(xml.ctrlShiftAlt.cmd,xml.ctrlShiftAlt.type);
                                                                                        }//end of ctrlKey
                                                                                    }//end of activModifiers
                                            }
                                        sp_toolbar.newWin.preferredSize.width = 150;
                                        sp_toolbar.newWin.frameLocation =[k.screenX,k.screenY];
                                        sp_toolbar.newWin.show();
                                        //sp_toolbar.newWin.addEventListener ("keydown",function(k){sp_toolbar.newWin.close();});
                                                sp_toolbar.newWin.addEventListener("blur", function() {sp_toolbar.newWin.close();});
                                                sp_toolbar.newWin.onDeactivate = function() {
                                                    sp_toolbar.newWin.close();
                                                }
                                    }
                                });
                        ic.onClick = function(){
                    var keyBoard = ScriptUI.environment.keyboardState;
                    var xml = sp_toolbar.getButtonInfo (droplist.selection.index, this.index);
                    if(xml.activeModifiers=="0"){
                            sp_toolbar.handler(xml.click.cmd,xml.click.type);
                        }else{
                    if (keyBoard.ctrlKey==false&&keyBoard.altKey==false&&keyBoard.shiftKey==false){
                         sp_toolbar.handler(xml.click.cmd,xml.click.type);
                        }else if (keyBoard.ctrlKey==true&&keyBoard.altKey==false&&keyBoard.shiftKey==false){
                            sp_toolbar.handler(xml.ctrl.cmd,xml.ctrl.type);
                            }else if (keyBoard.ctrlKey==false&&keyBoard.altKey==false&&keyBoard.shiftKey==true){
                                sp_toolbar.handler(xml.shift.cmd,xml.shift.type);
                                }else if (keyBoard.ctrlKey==false&&keyBoard.altKey==true&&keyBoard.shiftKey==false){
                                    sp_toolbar.handler(xml.alt.cmd,xml.alt.type);
                                    }else if (keyBoard.ctrlKey==true&&keyBoard.altKey==false&&keyBoard.shiftKey==true){
                                        sp_toolbar.handler(xml.ctrlShift.cmd,xml.ctrlShift.type);
                                        }else if (keyBoard.ctrlKey==true&&keyBoard.altKey==true&&keyBoard.shiftKey==false){
                                            sp_toolbar.handler(xml.ctrlAlt.cmd,xml.ctrlAlt.type);
                                            }else if (keyBoard.ctrlKey==false&&keyBoard.altKey==true&&keyBoard.shiftKey==true){
                                                sp_toolbar.handler(xml.shiftAlt.cmd,xml.shiftAlt.type);
                                                }else if (keyBoard.ctrlKey==true&&keyBoard.altKey==true&&keyBoard.shiftKey==true){
                                                    sp_toolbar.handler(xml.ctrlShiftAlt.cmd,xml.ctrlShiftAlt.type);
                                                    }//end of ctrlKey
                                                }//end of activModifiers
                                }//end of onClick function
                    }//end of loop i
                        var ic = gr.add("iconbutton");
                        ic.text = "Edit";
                        ic.size = view.itemSize;
                        ic.index = i;
                        ic.onClick = function(){
                              try{
//~                                     alert(special_loc(special_str.buttonSize));
                                SettingWin (sp_toolbar.drop.selection.index, gr);
                                }catch(err){alert(err.line.toString()+err.toString())}
                            }
                win.onResize();
           }//end of onChange function
            
    


    
    
    var xml = new XML(special_file.readd());
    for (var i=0;i<xml.Group.children().length();i++){
            droplist.add("item",xml.Group.child(i).@groupName);
        }
    if(droplist.items.length==0){
             sp_toolbar.addGroup ('Default');
             var item = sp_toolbar.drop.add("item",'Default');
        }
    var str = app.settings.getSetting("Sp_toolbar", "buttonSize");
    var stra = app.settings.getSetting("Sp_toolbar", "buttonSpacing");
    var  view = {hasDroplist:0,hasScrollbar:0,itemSize:[42,45],itemSpacing:[0,0],fillColor:[50/255,190/255,236/255]}
            sp_toolbar.view = view;
            view.itemSize = [parseInt(str.split(",")[0]),parseInt(str.split(",")[1])];
            view.itemSpacing = [parseInt(stra.split(",")[0]),parseInt(stra.split(",")[1])];

    if (droplist.items.length>1) view.hasDroplist =1 else view.hasDroplist = 0;
    if (droplist.items.length!=0){
            droplist.selection = parseInt(app.settings.getSetting("Sp_toolbar", "dropSelection"));
            if (!droplist.selection) droplist.selection=0;
        }
    if (droplist.items.length ==1)
        droplist.selection = 0;
        
    var triDraw=function(k){
                       // if(this.image) return;
                        var gfx = this.graphics;
                        gfx.newPath();
                        gfx.rectPath(0,0,this.size[0],this.size[1]);
                        if(!k.mouseOver){
                        gfx.fillPath (this.bgBrush1);
                        }else{
                           gfx.fillPath (this.bgBrush2); 
                            }
                        gfx.newPath();
                        gfx.moveTo((view.itemSize[0]),(view.itemSize[1]-3));
                        gfx.lineTo((view.itemSize[0])/10*9,(view.itemSize[1]-3));
                        gfx.lineTo((view.itemSize[0]),(view.itemSize[1]-3)/10*9);
                        var brush = gfx.newBrush(gfx.BrushType.SOLID_COLOR,view.fillColor);
                        if(this.hasMulti){
                            if(!k.leftButtonPressed||!k.mouseOver){
                                gfx.fillPath(this.bgBrush3);
                            }else{
                                gfx.fillPath(brush);
                                }
                        }
                        if(!this.image){
                        var thisDim = gfx.measureString (this.text);
                        if(!k.leftButtonPressed ||!k.mouseOver){
                        gfx.drawString (this.text+" ", this.drawPen1, this.size[0]/2-thisDim.width/2+1,this.size[1]/2-thisDim.height/2 );
                        }else{
                            gfx.drawString (this.text+" ", this.drawPen2, this.size[0]/2-thisDim.width/2+1,this.size[1]/2-thisDim.height/2 );
                            }
                        }
                };
        
        
            win.onResize = win.onResizing = function(){
                gr.size = (sp_toolbar.drop.items.length<=1)? win.size:[win.size[0],win.size[1]-20];
                gr.location = (sp_toolbar.drop.items.length>1)? [0,23]:[0,0];
                sp_toolbar.drop.size= [win.size[0],20] ;
                sp_toolbar.drop.location = [0,0];
                sp_toolbar.drop.itemSize.width = sp_toolbar.drop.size[0]-31;
                var numWidth = Math.floor(gr.size[0]/view.itemSize[0]);
                if (numWidth ==0) numWidth =1;
                    for (var i =0;i<gr.children.length;i++){
                            gr.children[i].size = view.itemSize;
                            gr.children[i].location = [view.itemSpacing[0]+ i%numWidth*(view.itemSize[0]+view.itemSpacing[0]),
                                                view.itemSpacing[1]+ Math.floor(i/numWidth)*(view.itemSize[1]+view.itemSpacing[1])];
                        }
                     for (var i =0;i<gr.children.length;i++){
                            if(!gr.children[i].image){
                                gr.children[i].drawPen1 = gr.children[i].graphics.newPen( gr.children[i].graphics.PenType.SOLID_COLOR, [0.85, 0.85, 0.85,1],1);
                                gr.children[i].drawPen2 = gr.children[i].graphics.newPen( gr.children[i].graphics.PenType.SOLID_COLOR, sp_toolbar.view.fillColor,1);
                                gr.children[i].bgBrush1 = gr.children[i].graphics.newBrush( gr.children[i].graphics.BrushType.SOLID_COLOR, [0.137, 0.137, 0.137,1]);
                                gr.children[i].bgBrush2 = gr.children[i].graphics.newBrush( gr.children[i].graphics.BrushType.SOLID_COLOR, [0.023, 0.023, 0.023,1]);
                                gr.children[i].bgBrush3 = gr.children[i].graphics.newBrush( gr.children[i].graphics.BrushType.SOLID_COLOR, [0.85, 0.85, 0.85,1]);
                                gr.children[i].onDraw = triDraw;
                                }
                        }
                    if (sp_toolbar.drop.items.length>1) {sp_toolbar.drop.visible = 1;}else{sp_toolbar.drop.visible = 0;}
                    if (gr.children.length==0) {scrollbar.visible = 0;return};
                    var distance = gr.children[gr.children.length-1].location[1]+view.itemSize[1]+view.itemSpacing[1]-gr.size[1];
                    if (distance >0){
                            scrollbar.size[0] = 20;
                            scrollbar.size[1] = gr.size[1];
                            scrollbar.location[0] = gr.size[0]-scrollbar.size[0];
                            scrollbar.location[1] = gr.location[1];
                            scrollbar.visible = 1;
                            for (var i =0;i<gr.children.length;i++){
                                    gr.children[i].location[1] =gr.children[i].location[1]-((scrollbar.value/100)*(distance+view.itemSize[1]+view.itemSpacing[1]));
                                }
                        }else{
                            scrollbar.visible = 0;
                            }
                        
                }
            
    scrollbar.onChange= scrollbar.onChanging = function(){
            win.onResize();
        }

    if (thisObj instanceof Panel){
            win.layout.layout(true);
        }else{
        win.location=app.settings.getSetting ("Sp_toolbar","winLocation").split(",");
        win.show();
        win.size=app.settings.getSetting ("Sp_toolbar","winSize").split(",");
        win.onClose= function(){
                var thisStr = win.size[0].toString()+","+win.size[1].toString();
               app.settings.saveSetting ("Sp_toolbar","winSize",thisStr);
                thisStr = win.location[0].toString()+","+win.location[1].toString();
               app.settings.saveSetting ("Sp_toolbar","winLocation",thisStr);
            }
            }
        win.onResize();





function SettingWin(groupIndex,group){
        var keepRf = this;
        var typeArr =  sp_toolbar.typeArr; 
        special_file.copy(backupFile);        
        sp_toolbar.drop.enabled = 0;

        
        
        /************************窗口创建***************************************/
        {
        this.w = new Window('palette','Sp_toolbar');
        this.w.tab = this.w.add("tabbedpanel");
        this.w.tab1 = this.w.tab.add("tab",undefined,special_loc>>special_str.general);
        this.w.tab1.alignChildren= ["fill","top"];
        this.w.tab2 = this.w.tab.add("tab",undefined,special_loc>>special_str.toolbar);
        
        
        var res0 = """Panel{
            text:'"""+(special_loc>>special_str.buttonSize)+"""',
            orientation:'row',
            gr1:Group{
                orientation:'column',alignment:['fill','fill'],alignChildren:['center','fill'],
                st1:StaticText{text:'"""+(special_loc>>special_str.buttonSize)+"""'},
                st2:StaticText{text:'"""+(special_loc>>special_str.buttonSpacing)+"""'},
                },
            gr2:Group{
                orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
                sl1:Slider{startValue:0,endValue:200,value:30,size:[200,10]},
                sl2:Slider{startValue:0,endValue:200,value:30,size:[200,10]},
                sl3:Slider{startValue:0,endValue:105,value:5,size:[200,10]},
                sl4:Slider{startValue:0,endValue:105,value:5,size:[200,10]},
                
                },
             gr3:Group{
                orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
                ed1:EditText{characters:3},
                ed2:EditText{characters:3},
                ed3:EditText{characters:3},
                ed4:EditText{characters:3},
                }
        }""";
        this.w.res0 = this.w.tab1.add(res0);
        
          var resTemp = """Panel{
                text:'"""+(special_loc>>special_str.handleXmlFIle)+"""',
                orientation:'column',
                gr1:Group{
                    orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                    imports:Button{text:'"""+(special_loc>>special_str.importFile)+"""'},
                    exports:Button{text:'"""+(special_loc>>special_str.exportFile)+"""'}
                    }
                }""";
          this.w.res2 =this.w.tab1.add(resTemp);
        
          var resTemp = """Panel{
                text:'"""+(special_loc>>special_str.internetText)+"""',
                orientation:'column',
                gr1:Group{
                    orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                    update:Button{text:'"""+(special_loc>>special_str.checkForUpdate)+"""'},
                    weibo:Button{text:'"""+(special_loc>>special_str.weibo)+"""'}
                    }
                }""";
          this.w.res3 =this.w.tab1.add(resTemp);             
          
          var resTemp = """Panel{
                text:'"""+(special_loc>>special_str.parse)+"""',
                orientation:'column',
                gr1:Group{
                    orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                    parse:Button{text:'"""+(special_loc>>special_str.parseButton)+"""'}
                    }
                }""";
          this.w.res35 =this.w.tab1.add(resTemp);      
          
          var resTemp = """Panel{
                text:'"""+(special_loc>>special_str.language)+"""',
                orientation:'column',
                gr1:Group{
                    orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                    en:Button{text:'English'},
                    ch:Button{text:'中文'}
                    }
                }""";
          this.w.res36 =this.w.tab1.add(resTemp);
          
          
          
          var resTemp = """Panel{
                text:'What can I say here :)',
                orientation:'column',
                gr1:Group{
                    orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
                    ed:EditText{justify:'center',text:'',properties:{multiline:1,readonly:1,scrolling : 0},size:[undefined,150]}
                    }
                }""";
          this.w.res4 =this.w.tab1.add(resTemp);    
          this.w.res4.gr1.ed.text = "Have a nice day~\n\nBy:Smallpath\nEmail:smallpath2013@gmail.com";

        
        
        var res1 = """Group{
        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
        gr1:Group{
            alignment:['fill','fill'],alignChildren:['fill','fill'],
            gr1:Panel{
                text:'"""+(special_loc>>special_str.toolbars)+"""',
                gr1:Group{
                        orientation:'row',alignment:['fill','fill'],alignChildren:['right','buttom'],magins:1,spacing:3,
                        create:IconButton{text:'Add',size:[20,20]},
                        del:IconButton{text:'Del',size:[20,20]},
                        up:IconButton{text:'Up',size:[20,20]},
                        down:IconButton{text:'Down',size:[20,20]}
                    },
                 gr2:Group{
                        alignment:['fill','fill'],alignChildren:['fill','fill'],
                        st:StaticText{text:'"""+(special_loc>>special_str.nameText)+"""'},
                        ed:EditText{text:'',characters:8},
                    },
                  gr3:ListBox{alignment:['fill','fill'],alignChildren:['fill','fill'],size:[undefined,'150']}
                },
            gr2:Panel{
                text:'"""+(special_loc>>special_str.buttons)+"""',
                gr1:Group{
                        orientation:'row',alignment:['fill','fill'],alignChildren:['right','buttom'],magins:1,spacing:3,
                        create:IconButton{text:'Add',size:[20,20]},
                        del:IconButton{text:'Del',size:[20,20]},
                        up:IconButton{text:'Up',size:[20,20]},
                        down:IconButton{text:'Down',size:[20,20]}
                    },
                 gr2:Group{
                        alignment:['fill','fill'],alignChildren:['fill','fill'],
                        st:StaticText{text:'"""+(special_loc>>special_str.nameText)+"""'},
                        ed:EditText{text:'',characters:8},
                    },
                  gr3:ListBox{alignment:['fill','fill'],alignChildren:['fill','fill'],size:[undefined,'150']}
            }
        }
        gr2:Panel{
            orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
            text:'"""+(special_loc>>special_str.buttonsParameters)+"""',
            gr1:Group{           
                st:StaticText{text:'"""+(special_loc>>special_str.type)+"""'},
                drop:DropDownList{properties:{items: """+(special_loc>>special_str.typeArr)+"""}},
                },
            gr11:Group{
                st:StaticText{text:'"""+(special_loc>>special_str.subName)+"""'},
                ed:EditText{text:'',characters:20,justify:'center'},
                },
            gr2:Group{
                alignment:['fill','fill'],alignChildren:['fill','fill'],
                st:StaticText{text:'"""+(special_loc>>special_str.command)+"""'},
                chk:Checkbox{text:'"""+(special_loc>>special_str.activeModifiers)+"""'},
                drop:DropDownList{properties:{items:['Click','Ctrl+Click','Shift+Click','Alt+Click','Ctrl+Shift+Click','Ctrl+Alt+Click','Shift+Alt+Click','Ctrl+Shift+Alt+Click']}},
                },
            ed:EditText{properties:{multiline:1},size:[undefined,150]},
            gr3:Group{
                orientation:'stack',alignment:['fill','fill'],alignChildren:['fill','fill'],
                gr1:Group{
                    alignment:['fill','fill'],alignChildren:['fill','fill'],
                    bt1:Button{text:'"""+(special_loc>>special_str.getEffect)+"""'},
                    bt2:Button{text:'"""+(special_loc>>special_str.getEffectWith)+"""'}
                },
                gr2:Group{
                    alignment:['fill','fill'],alignChildren:['fill','fill'],
                    bt1:Button{text:'"""+(special_loc>>special_str.getPresets)+"""'},
                },
                gr3:Group{
                    alignment:['fill','fill'],alignChildren:['fill','fill'],
                    bt1:Button{text:'"""+(special_loc>>special_str.getScripts)+"""'},
                }
                },
            gr4:Group{
                alignment:['fill','fill'],alignChildren:['fill','fill'],
                st:StaticText{text:'"""+(special_loc>>special_str.helpTip)+"""'},
                ed:EditText{text:'',characters:30},
                },            
            gr5:Group{
                st:StaticText{text:'"""+(special_loc>>special_str.icon)+"""'},
                ed:StaticText{text:'',characters:32,properties:{readonly:1}},
                bt:IconButton{text:'Image',size:[20,20]},
                bt1:IconButton{text:'Del',size:[20,20]}
                },
            },
          gr3:Group{
            alignment:['center','fill'],alignChildren:['fill','fill'],
            ok:Button{text:'"""+(special_loc>>special_str.ok)+"""'},
            can:Button{text:'"""+(special_loc>>special_str.can)+"""'}
            }
        }""";
        
        this.w.res1=this.w.tab2.add(res1);
        this.w.tab.selection = this.w.tab2;
        this.w.res1.gr1.gr1.gr1.create.image = this.w.res1.gr1.gr2.gr1.create.image =  "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x17\x00\x00\x00\x14\b\x06\x00\x00\x00f\u00BE\u00A6\x0E\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x17OiCCPPhotoshop ICC profile\x00\x00x\u00DA\u00D5yiX\u008D]\u00D8\u00F6u\u00DF\u00FB\u00DES\u00ED\u00DD<\u00CF\u00F3\u00A8y\u009E\u00E7\u00D2\u00A4y\u00A6y\x1Ew\u00BB\u00B9H\u00A5\u00D2@)$\u0085($\u00A1D#\r\u00A2H\u009E$\n\x15\x1A\u00A4\"d\u0088\x10\u00BD?x\u009E\u00E7\x1D\u00BE\u00F7\u00C7w\x1C\u00DF\u009F\u00EF\u00FC\u00B1\u008E\u00F38\u00AFk\u009D\u00D7u\u00FDZ\u00C7Z\x0B\u0080w%\u0080F\u008BFY\x00bb\x13\u00E9\u00CEV\u00A6\"\u009E^\u00DE\"\u00C4) \u00820p\u0083\x06\u00C8\x05\x04%\u00D0L\x1C\x1D\u00ED\u00E0\x7F\u00C5\u0097\t@\x00\x00\x1E*\x04\u00D0h\u00D1\u00F0\x7F\x07\u00D6\u00E0\u0090\u0084 \x00\u00C4\x11\x00\x02\u0083\x13\u0082b\x00\u0090\u00AB\x00\u00A8i\x10\u008D\u009E\b\u0080[\x07\u0080\u00D1\u0094DZ\"\x00v\x07\x008\u00E8\u009E^\u00DE\x00\u00D84\x00p\u0084\u00FD\u00E6\u00AB\x00\u00C0\x11\u00E8\u00E9\u00E5\r\u0080\u00C7\x00\u0080\u0083\u00EE\u00EAl\x06\u0080\u00E7\x01 Q\x02\x02\u00E8a\x00T\t\x00\x10I\x0E\nK\x04\u00A0\u009A\x03\x10\u00D8b\u0083#b\x01\u00D8=\x01\b\u0086A\u00E1\x01\u00C1\x00\u00BC\u0095\x00\u00B0%&&.\x18\u0080\u00F7\x16\x00\u00C8\x04\u00FE'\u009F\u00B0\u00FF\u00E2\x19\u00F8\u008Fg@@\u00D8?\u00FC\u00F7,\x00\x00@2\u008FH\u00A0E\x07\u00A4\u00C1\u00FFk\u00C4D'\u00FD]\u0083\r\x00(\u00B1\u00D1\u00DB\u00EC\x00\u0080\x0B\x00\u0096\u0082\x03\u00CCm\x01@\x00\x00~\u00D1\u00A2\x1D\u00ED~\u00E7 |!\u00B1n.\x7F\u00F8\u0096\u00D8\u00C0m\x0E\x7F\u00B8a(\u00DD\u00D2\u00F9\u00F7^\u00C4\u0091\u0096h\u00EA\f\x00<\x00H(-\u00D1\u00D1\u00F5\u008F\u009E\u0099\x1En\u00B6\r\x00(\x00\u00C8\u00A1\u0090\x04\u008B\u00BF}NF\x06\u00D88\x02\x00\x13\x00\u00D2BOrv\x03\x00\t\x00\u00A4/!\u00D9\u00C5\x02\x00X\x00\u0090\u0097\u00E9\u00E1\u00AE\x1E\x7Fr>\x07\u0087\u0098\u00FF\u00D1Q44\u00C2\u00D2\u00FA\x0Fg\u008BH\u00B4v\x05\x00\x0E\x00T,*\u00CE\u00D6\u00F9w-T\x13l!\x1AB \t\u00E8\x10\x02\u00B1\u00A0\x00v`\x06\u00E6\x7FV\x05\b\u0085\x00\u00A0C2\u0084@\x02D\u00C1+\u00A0C\f\u00D8B\x1CDC\x1C\u00D0A\u00E4O\u009E\u00D9\u00FFP,!\x00\u00E8\x10\x06!\u00FF\u00CDQ\x04\u0082 \x0E\u0092\u00FE\u00A9\u00F9\u00B7\u00FA\u00AFC\x04\x04C\u00DC?z\u00C0\u009F\x18\x1DB \u00C1/\"\u00E7\u00DF\n\u00FF\u00D9/\x1A\u00E2\u0080\u00AE\u00DC\u00A8\u00BC\u00AC\u00BC\u00F1w\x1C\u0093\u00C2T1\r\u00CC\x143\u00C0\f1\x1D\x10\u00C1\u00B80>P\u00C0\u00D41m\u00CC\x043\u00C2\u00F40\rL\x07,\u00E1%\u00D0!\u00EC\u00EF\x1E\u00FD\"r\u00E81-\u00A1\u00C9\u0095qi\u00BA\u00EE\u00E1\x7Ff\b\u00FCg\x02wx\tt\u0088\u00F8?N\u00F4\u00A7\u00F7\u0091\u0095\u00F6\u0095\x7F:\u0084\u00C4\u0090\u00D4D\x00\x00\u00B38Z\x1A=\",<Q\u00C4\u0084F\u008B\x0E\u00D9\"b\x1D\x1B\u00A4\u00B8EDUYE\x05\u00FE\x7F\u0082\u00A7\u0097\u00B7\u00C8o\u00F6\u00C9\x19\x10\x00@\u00B8\u00EE\u00FF\u00AB\u00C5\u00A9\x00\u00E8\x04\x01 {\u00FE\u00D5\u00FC\u00DF\x01\u00B4G\x02\u0090\u00D8\u00FE\u00D5\u00A4\u00DA\x01\u0098U\x01\u0086\u008E\x04%\u00D1\u0093\x7Fk\x18\x00\x00\x1E\x18\u0080\x198\u0080\x17\u0084@\x1Cd@\x01TA\x13\u00F4\u00C0\x18,\u00C0\x06\x1C\u00C0\x15\u00BC\u00C0\x17\u0082 \x1Cb\u0080\x0E)\u00B0\x13\u00B2!\x1F\u008A\u00E1\x00\x1C\u0086*\u00A8\u0081:8\x07\x17\u00A1\x05\u00DA\u00E1:\u00DC\u0080A\x18\u0086Q\x18\u0087)\u0098\u0081\x05x\x03\u00AB\u00F0\x05~ \bBD\u00A8\b;\u00C2\u008B\b#\u0092\u0088<\u00A2\u008Ah#\u0086\u0088\x05b\u00878#^\u0088?\x12\u0086\u00C4\"I\u00C8Nd\x0FR\u008C\u0094#U\u00C8)\u00A4\x01\u00B9\u008Ct\"7\u0090!\u00E4\x01\u00F2\x14\u0099E\u0096\u0091\u008F\u00C8w\x14\u0087RP\x0ET\x10\u0095B\u0095Pm\u00D4\x04\u00B5E]\u00D1\x1Dh\x18\x1A\u008F\u00A6\u00A3\u00B9h\tZ\u0089\u00D6\u00A2\x17\u00D06\u00F4\x06:\u008C\u008E\u00A33\u00E8\x1Bt\r\x078F\x1C\x17N\x14\u00A7\u0080\u00D3\u00C6\u0099\u00E1\x1Cp\u00DE\u00B8P\x1C\x1D\u0097\u0089+\u00C2U\u00E0jq\u0097p]\u00B8\u00DB\u00B8\u0087\u00B8\x19\u00DC\n\u00EE\x1BF\u00C0\u00D81\x11L\x01\u00D3\u00C3\u00B6bnX\x10\x16\u008Feb\u00FB\u00B0*\u00EC\x1C\u00D6\u0086\u00DD\u00C2\x1Eb\u00B3\u00D8*\u00F6\x0BO\u00C5\x0B\u00E0\u00E5\u00F1\u00BAxk\u00BC'>\f\u009F\u0082\u00CF\u00C7W\u00E0\u00CF\u00E2[\u00F1\x03\u00F8q\u00FC\x02\u00FE\x0B\u0081@\u00E0\"H\x13\u00B4\b[\t^\u0084HB\x06a\x1F\u00E18\u00A1\u0089\u00D0Gx@\u0098'\u00AC\x11\u0089D^\u00A2<\u00D1\u0080\u00E8@\f &\x12\u00F3\u0089G\u0089\x17\u0088\u00BD\u00C41\u00E2\x02q\u009D\u00C4H\x12&\u00A9\u0092,I\u00DE\u00A4XR\x0E\u00A9\u0082t\u009E\u00D4C\x1A#-\u0092~\u0090Y\u00C8\u0092d]\u00B2\x039\u0098\u009CF.%\u009F&w\u0091\u00EF\u0093\x17\u00C8?\x18X\x19\u00A4\x19\f\x18\\\x19\"\x19\u00B2\x19*\x19.1\f0L3|bdd\x14c\u00D4atb\u008C`\u00CCb\u00ACdlf\u00BC\u00C38\u00CB\u00F8\u008D\u00C2F\u0091\u00A3\u0098Q\u00B6S\u0092(%\u0094zJ\x1F\u00E5)\u00E5\x13\u0095J\u0095\u00A2\x1AS\u00BD\u00A9\u0089\u00D4\x12j\x03\u00F5&\u00F59u\u009D\u0089\u009DI\u0091\u00C9\u009A)\u0098i7S5S\x1B\u00D3\x18\u00D3;f2\u00B3$\u00B3\t\u00B3/s:s\x05\u00F3\x15\u00E6\u00FB\u00CC+,d\x16)\x163\u0096\x00\u0096L\u0096j\u0096N\u0096\u00C7,k\u00AC\u00EC\u00AC*\u00AC\x0E\u00AC1\u00AC\u00FBX\u00CF\u00B3\x0E\u00B1.\u00B1\x11\u00D9\u00A4\u00D8,\u00D8\u0082\u00D9r\u00D9\u00EA\u00D8n\u00B2\u00CD\u00B3\u00E3\u00D8\u00C5\u00D9\u00CD\u00D8\u0083\u00D8\u00F7\u00B0\u009Ff\x1F`_\u00E0 pHsXsDr\x14s\\\u00E4\x18\u00E1X\u00E5d\u00E3T\u00E7t\u00E7L\u00E5\u00AC\u00E6\u00EC\u00E6\u009C\u00E1\u00C2qIqYsEs\u0095r\u00B5pMp}\u00E7\x16\u00E46\u00E1\x0E\u00E1.\u00E4\u00BE\u00C4=\u00C6\u00FD\u0095\u0087\u009F\u00C7\u0098'\u0084\u00A7\u0088\u00A7\u0089g\u009C\u00E7;\u00AF\b\u00AF\x05o\x14o\x19o;\u00EF3>\u008CO\u008E\u00CF\u0089/\u0085\u00EF\x04\u00DF\x00\u00DF\n?\x07\u00BF\x1E\x7F\x10\x7F\x11\x7F\x0B\u00FF\u00A4\x00* '\u00E0,\u0090!P'pO`MPH\u00D0J\u0090&xT\u00F0\u00A6\u00E0\u008A\x10\u0097\u0090\u00B1P\u00A4\u00D0!\u00A1\x1E\u00A1eavaC\u00E1\b\u00E1C\u00C2\u00BD\u00C2\u00AFE8ELD\u00A2E*En\u0089\u00AC\u008A\n\u0088n\x15M\x12=%:\"\u00FACLZ\u00CCM,G\u00ACI\u00EC\u00998\u0083\u00B8\u00B6x\u00A8\u00F8!\u00F1~\u00F1U\ta\t{\u0089\u009D\x12\u008D\x12\u0093\u0092dIm\u00C9p\u00C9#\u0092\u00B7%\u00BFJIKyH\u00ED\u0095j\u0097Z\u0092\u00E6\u0091\u00B6\u0096N\u0097n\u0094\u009E\u0096\u00A1\u00CA\x18\u00C9\u00C4\u00CB\u00D4\u00CA<\u0092%\u00C8j\u00CBF\u00C9\x1E\u0097\x1D\u0095C\u00E54\u00E4\u00C2\u00E5\u00AA\u00E5\u00EE\u00CB\u00A3\u00F2\u009A\u00F2\x11\u00F2\u00C7\u00E5\x1Fl\u00C1o\u00D1\u00D9\x12\u00BB\u00A5v\u00CBc\x05\u008A\u0082\u0089B\u00B2B\u00A3\u00C2\u00AC\"\u0097\u00A2\u009Db\u008Eb\u00BB\u00E2;%\t%o\u00A52\u00A5\u00DBJ\u00BF\u00945\u0094\u00A3\u0095O+O\u00A9\u00B0\u00A9\u00D8\u00A8\u00E4\u00A8t\u00A9|T\u0095S\rR\u00ADV}\u00A4FU\u00B3T\u00DB\u00AD\u00D6\u00A1\u00F6A]^=D\u00FD\u0084\u00FA\x13\rv\r{\u008D\u00BD\x1A\u00FD\x1A?5\u00B54\u00E9\u009A\u00974\u0097\u00B5$\u00B4\u00FC\u00B5\u008Ei=\u00D6\u00E6\u00D0v\u00D4\u00DE\u00A7}G\x07\u00AFc\u00AA\u00B3[\u00E7\u00BA\u00CE7]M\u00DDD\u00DD\x16\u00DD\u00F7z\nzQz\u00E7\u00F5\u0096\u00F4\u00A5\u00F5C\u00F4O\u00EB\u00CF\x1B\u0088\x19\x04\x18\u009C2\u00981\x141\u00F47<i8c$j\x14`Tk4g,n\x1Cl|\u00D6x\u00D1D\u00D6$\u00D2\u00E4\u0082\u00C9;SeS\u00BAi\u00AB\u00E9W3]\u00B3]f}\u00E68s+\u00F3\"\u00F3\x11\x0B6\x0B7\u008B*\u008B\u00E7\u0096b\u0096a\u0096\u008D\u0096\u00ABV\x1AV\x19V}[\u00F1[m\u00B7\u0096m}l-h\x1Dd\u00DD`\u00BDj\u00A3e\u00B3\u00CB\u00E6\u0096-\u00C5\u00D6\u00C5\u00B6\u00CAv\u00CEN\u00CE\u008En\u00D7e\u008F\u00DA\u00DB\u00D8\x1F\u00B4\u009F\u00DE&\u00B9-v[\u00BB\x038X;\x1Ctx\u00E6(\u00ED\x18\u00EFx\u00CD\u0089\u00E0\u00E4\u00E8T\u00ED\u00F4\u00CAY\u00C5y\u00A7\u00F3m\x17v\x17?\u0097\u00F3._\\M]K]\u00A7\u00DCd\u00DC\u0092\u00DC\u00FA\u00DD\u0099\u00DD\u00B7\u00BB7\u00B8\x7F\u00F50\u00F7(\u00F7\u0098\u00F1T\u00F2\u00DC\u00E59\u00EC\u00C5\u00E7\x15\u00E1\u00D5\u00E1M\u00F4v\u00F7>\u00EB\u00BD\u00E6c\u00E1s\u00D8ga\u00BB\u00C6\u00F6\u00FC\u00ED\x13;\u00A4w\u00A4\u00EE\x18\u00F2\u00E5\u00F3\u008D\u00F6\u00ED\u00F6c\u00F6\x0B\u00F0\u00BB\u00E2\u008F\u00F7\u00F7\u00F0?\u00EF\u00BF\x11\u00E0\x10P\x1B\u00B0\x16h\x1Dx,p5\u00C8,\u00E8H\u00D0\u009B`\u00E3\u00E0C\u00C1\u00CB!\x06!\u00E5!\u008B\u00A1\x06\u00A1\u00E5\u00A1Ka\x06a\x07\u00C3\u0096\u00C3\u008D\u00C2+\u00C2W\"\u00CC\"\u00AA\">Dn\u008D\u00AC\u0089\u00FC\x1A\u00E5\x10U\x1F\u00B5\x19\u00ED\x11\u00DD\x14C\u008A\u00F1\u008F\u00E9\u008Ce\u008B\u008D\u008A\u00BD\x15'\x14\u0097\x1A\u00F7\u0080&O\u00CB\u00A7\u00CD\u00C4\u00EB\u00C6\x1F\u008E_\u00A5\u00DB\u00D2\u00CF& \t;\x12:\x129\x12i\u0089\u00F7\u0092d\u0092\u00F2\u0092f\u0093\r\u0093\u00AB\u0093\u00D7S\u00DCS\u00AE\u00A4\u00B2\u00A6\u00C6\u00A6\u00DEK\u0093K+L[L\u00B7L?\u0093\u0081e\x04e\u00F4\u00EF\x14\u00DD\u0099\u00BDsv\u0097\u00C9\u00AES\u0099Hf`f\u00FFn\u00F1\u00DD\u00B9\u00BB\x17\u00B2\u00AC\u00B2\u00CEe3dGe\u00FF\u0095\u00A3\u009CS\u009E\u00F3y\u008F\u00C7\u009E\u00AE\\\u00C1\u00DC\u00AC\u00DC\u00F9<\u00AB\u00BC\u00C6|\u00A6|z\u00FE\u00E3\u00BDz{k\n\u00B0\u0082\u0088\u0082\u0091B\u00B5\u00C2\u00A3\u0085\u00BF\u008A\u0082\u008B\u00EE\x16+\x17W\x14o\u00EC\x0B\u00DAww\u00BF\u00CA\u00FE\u00CA\u00FD\u009B%\u00A1%#\u00A5\u009A\u00A5'\x0E\x10\x0E\u00C4\x1E\u0098(3*;W\u00CEZ\u009E^>\x7F\u00D0\u00FE`\u00DB!\u0091CE\u0087>\x1F\u00F6;<T\u00A1^Qs\u0084\u00E1H\u00D2\u0091\u0099J\u00BB\u00CA\u008E\u00A3\x12G\x0F\x1C\u00DD\u00A8\n\u00AF\x1A\u00AF6\u00ADn:&p\u00AC\u00F0\u00D8\u00D7\u00E3\u00C1\u00C7\u00C7N\x18\u009F\u00B8T#XS\\\u00F3\u00FDd\u00C4\u00C9'\u00A7\u00ACN\u00B5\u00D5J\u00D5V\u00D4\x11\u00EA\u0092\u00EB^\u009Dv?}\u00FB\u008C\u00F6\u0099\u0086\u00B3|g\u008B\u00CF\u00FE\u00AC\u008F\u00AD\u009F9\u00E7|\u00EEV\u0083VC\u00C3y\u0081\u00F3\u00A5\u008DhcR\u00E3\u00F2\u0085\u00ED\x17F/\u009A_\u00EC\u00B8\u00A4p\u00E9T\x13WSq34'5\u00BF\u00BE\u00EC\x7Fy\u00A2\u00C5\u00B6\u00A5\u00FF\u008A\u00F6\u0095KW%\u00AF\x1Ekeo-jC\u00DA\u00D2\u00DAV\u00DB\u00C3\u00DBg:\u00BC:\x1Et\u00DAt\u00F6w\u00E9u\u00B5^S\u00BCV\x7F]\u00F4zu7gwi\x0FCOn\u00CFfoz\u00EFZ\x1F\u00ADo\u00E5F\u00D8\u008D\u00F9~\u00BF\u00FE\u00A9\u009B\u009E7\x1F\u00DDr\u00BA52`;pg\u00D0r\u00F0\u00E6m\u0093\u00DB\u00BDw\f\u00EE\\\x1F\u00D2\x1D\u00EA\u00BC\u00AB}\u00B7}Xs\u00B8\u00ED\u009E\u00C6\u00BD\u00D6\u00BF4\u00FEj\x1D\u00D1\x1Ci\u00BB\u00AFu\u00BFcTg\u00B4\u00EB\u0081\u00FE\u0083\u009E1\u00A3\u00B1\x1B\x0F\u00CD\x1F\x0E>\u00B2~4<\u00BEm\u00FC\u00C1\u0084\u00DB\u00C4\u0093\u00C7\u00DB\x1F\u00CF<\t~\u00B2\u00F44\u00FA\u00E9\u0087\u00C9\u00E4\u00C9\x1FSY\u00D3\u00F8\u00E9\u00A2g,\u00CF*\u009E\x0B<\u00AF}!\u00FB\u00A2iFs\u00A6{\u00D6|\u00F6\u00DE\u009C\u00CB\u00DC\u00D4|\u00D0\u00FC\u009B\u0097\t/7\x16r_Q_U,\n/6,\u00A9.]_\u00B6\\\x1E}\u00ED\u00F3z\u00E1\r\u00ED\u00CD\u008F\u0095\u00FC\u00B7\u00ACo\u008F\u00BD\u0093yw\u00F5\u00BD\u00F1\u00FB{\u00AB\u009E\u00AB\x0B\x1F\u00E8\x1F6?\u00EE\u00FB\u00C4\u00FB\u00A9\u00FE\u00B3\u00FA\u00E7\u00FE5\u00C7\u00B5\u00E7_b\u00BE\u00FC\u00F8Z\u00B4\u00CE\u00BB~\u00EE\u009B\u00F6\u00B7\u00DB\u00DF=\u00BE/\u00FEH\u00D9 nT\u00FE\u0094\u00FD\u00D9\u00F5\u00CB\u00F6\u00D7\u00F4f\u00CC\u00E6&-\u0080\x1E\x00\x00\x008\x00@CC\x01>\u00D6\x03P\u00BD\x00\u00D8G\x01\x18\u0098~\u00DF)\u00FE\x00\u0087\x00\u00A0\x00@\x04!\u00B0\u0081b\u0098G\u00E4\u0090X\u00A4\x0F\u00E5E\x13\u00D1I\u009C5\u00EE&f\u0085=\u00C2\u00C7\x10X\t\u00FD\u00C4\u009D$C2\u0091\u00FC\u008C\u00A1\u0093\u00F1\x18\u00A5\u0094Z\u00CF4\u00CD\u00C2\u00C2j\u00CBV\u00C8>\u00C4\u00C9\u00CA\u00B5\u009D\u00FB\x02/\u00C6\x17\u00C0\u00DF-(\"\u00B4Ox]4XlRb\u009B\u00E4\u0090\u00B4\u0092L\u0089\u00EC\x1By\u00EB-5\n_\u0094\u00CC\u0094\u00F7\u00AB\u008C\u00AAQ\u00D5M5\x124\u008Fi\u00F5i\u00CF\u00E8\u00FC\u00D4\u00E3\u00D6\u00977\u00D01\u00B40r6\x0E2I0\u00CD5;b\u00DEh\u00D1k\u00F9\u00D0jy\u00EB\u00A6\r\u00A7\u00ED\x16;3{\u009Fm\x11\x0E\u00C9\u008EyN\u00E5\u00CE5.\u008D\u00AE\u00EDn\u00FD\u00EE\u00C3\x1Ec\u009EO\u00BD^x\u00CF\u00FB,m\x7F\u00BBc\u00C9w\u00DAo\u00C4\u00BF7\u00A0)\u00F0D\u00D0\u00FE\u00E0\u00F4\u0090\u00D0P\u00A70\u00BDp\u0089\b\u00A6\u0088/\u0091/\u00A2\x06\u00A3\x1Bb\u00F6\u00C7\u00D2\u00E2\\hZ\u00F1|\u00F1\x1B\u00F4\u00E7\t}\u0089uIy\u00C9\u00A1)\u00D6\u00A9\u00F2i\fi\u00AF\u00D3\u00EFe4\u00EF\u00AC\u00DC\u0095\u009B\u0099\u00B2;>\u008B\u009E\u009D\u009ES\u00B4\u00E7Tnw\u00DE\u008B\u00BD\u00E4\x02\u00FDBZQ]\u00F1\u00C4~\u0086\x12\u00FD\u00D2\u0098\x03'\u00CAF\u00CA\x7F\x1E\u00DAr\u00D8\u00A7\u00A2\u00E8H[\u00E5L\x15c\u00B5\u00C61\u00BF\u00E3\u0085'Zj\u00A6Na\u00B5\nu\u00EE\u00A7w\u009F9w\u00F6A\u00FDz\u0083\u00C8y\u00BB\u00C6\u009D\x17Z.~h\u00D2m.\u00BD\u00FC\u00FE\u008A\u00CF\u00D5\u00FBm\x0E\u00ED\u008F:\u00F5\u00BB\x12\u00AF5\\\u009F\u00EEa\u00ECU\u00EBs\u00BF\x11\u00DF\u009Fw\u00B3\u00ECV\u00C5@\u00C5`\u00D9\u00ED\u0082;{\u0086\u00F6\u00DE\u00DD?\u00BC\u00FF^\u00DE_\u0089#\x1E\u00F7\x15\u00EF\u00FF\x18\u00ED{\u00901\u00A69\u00F6\u00E5\u00E1\u00E3G\u009D\u00E3U\x13\u00BB\x1E\u00FB=1}*9I\u009E|;\u00F5`\u00BA\u00F5Y\u00D5\u00F3]/\u00FCg\u00CCge\u00E7X\u00E6\u00BE\u00CD\u00BFz9\u00B10\u00F4\u00EA\u00C6\u00E2\u00B5\u00A5\u00CE\u00E5\u00CE\u00D7g\u00DE\u0094\u00AC$\u00BF\u00F5}g\u00F1^~\u0095eu\u00ED\u00C3\u00E4\u00C7\u009EO\u00A7>\u00E7\u00AD\u0085\x7F\u00B1\u00FD\u00AA\u00B4\u00CE\u00BE\u00FE\u00F5\u00DB\u00F4\u00F7\u00BE\x1F\u00B5\x1B\u00B9?C~\u0099o\u008Amn\x02\x00\x01\u00F8\u00C0\x18Ra\x00aG\u00EC\u0090\x03\u00C8\x0BT\r-A?\u00E1\u00FCp\x13\u0098\x1B\u00F6\fO#0\x11\u00DA\u0089!$>\u00D2$\u00F9\x18C\x18\u00A3)\u00C5\u0080\u00EA\u00CA\x14\u00CE\u009C\u00C5r\u0092\u00F5\x06\u00DB2\x07'\u00A79W\x1Aw\x13\u00CF{>E~\u00BA\u00C0u!Faw\u0091\u00F3\u00A2\u009B\u00E2&\x12\u00D9\u0092\u00BDR\x1B2Z\u00B2\u0091r\u00C7\u00E5\u0087\u00B7|T\u00E4TRS\u00DE\u00AA\u00E2\u00A3\x1A\u00A6\x16\u00AF\u009E\u00A6\u00B1K3]+R\u00DBG\u00C7N\u00D7@OY_\u00CC\u0080\u00D3\u0090d\u00F8\u00DD\u00E8\u00AD\u00F1\u00AC\u00C9\u00B8\u00E9]\u00B3\x1E\u00F3+\x16\u00F5\u0096\u0095V\x05[S\u00AC\u00C3m\u00BCl\u00B7\u00DAi\u00DBKo\u00E3t\u00C0\x1C>;\u00CE9=p\u00EEsiv=\u00E1V\u00E0\u009E\u00E0\u00E1\u00EBi\u00ED\u00A5\u00E6-\u00E8C\u00F0y\u00B7}bG\u00B7o\u009D_\u0091\x7F\\\u0080k\u00A0z\x10%h.\u00B83\u00A4444L?\u009C5\u00FCU\u00C4\u00B5\u00C8\u00B2\u00A8\u0090h\u00DD\x18\u00E6\u0098\u00F9\u00D8\u00F6\u00B8\x02\u009AW\u00BC|\u00FC\x06}$\u00E1d\"=\u00C9,\u00993y1\u00A53u_\u009Ao\u00BAr\x06\u009A\u00F1xg\u00D3\u00AE\u00E2\u00CC\u0098\u00DDnY\u00E6\u00D9\u00BA9:{\fr\u00B7\u00E6y\u00E6\u00C7\u00EE\u00DD[p\u00A6\u00F0f\u00D1l\u00F1\u00AF\u00FD\x02%:\u00A5\u00EE\x07\x12\u00CA\x0E\u0094_88t\u00E8U\x05zD\u00A0R\u00F3\u00A8SULu\u00F1\u00B1\x0B\u00C7GO|9)v\u00CA\u00B1vO]\u00E7\u00E9\x0Fg\x15\u00EB\u00E3\u00CF]m\u00F8\u00DA\u00A8sa\u00E7\u00C5\u009E&h6\u00B9\u00BC\u00A7e\u00E0*\u00BE\u00D5\u00AA\u00AD\u00A0\u00FDv'\u00B1\u00CB\u00E2Z\u00CE\u00F5\u00EE\u00EE\u00CF\u00BDR}.72\u00FAO\u00DC\u00BCvk|`y\u00F0\u00EB\x1Dl\u0088\u00FD\u00AE\u00E8\u00B0\u00D2=\u0083\u00BF\u00ECF\u00BC\u00EF\u0087\u008F\u00A6<\u00C8\x1F;\u00FC\u00B0\u00F6Q\u00D3\u00F8\u00F5\u0089\u00A1\u00C7\x13O\x16\u009E~\u009E\u00C2Ms<\u0093|\u00AE\u00FD\u00C2n&l\u00B6nn\u00F9\u00A5\u00F4\u0082\u00F7\u00AB\u00FC\u00C5\u00F3K\u00B7\u0097g_\u00AF\u00AF0\u00BD\u0095|g\u00F4\u00DEg5\u00EB\u00C3\u00E8'\u00B5\u00CF\x07\u00D7>}u^\u00BF\u00FA\u009D\u00E7G\u00DE\u00C6\u00FA\u00AF\u0094\u00CDM\x00\u00C0\u0080\x15\u00E4`\x1BdA\x1FBDt\u0091D\u00A4\x1DEQ{\u00F4$\u00FA\x03\u00E7\u008B\u00BB\u008B\u00E9cmxm|?\u00C1\u00910O\u00CC \u00F1\u0093n\u0093\u00F73\x041\u00EAS\u00F8)\u00BF\u00A8sL\u00C3\u00CC\u00AD,gX+\u00D9J\u00D8\x0B8\u00F28\u00F3\u00B9\u008A\u00B9\x0F\u00F2\u00D4\u00F06\u00F2u\u00F0w\x0Bt\x0B\u00F6\b\u00F5\n\u00F7\u0088\\\x13m\x15k\x14?.Q,\u0099$\u00B5]\u00DAXFL\x16d\u00A7\u00E4\u00DA\u00E5\u008B\u00B7\u00B8+\u0088(\u00BCVlU\u00CAR\u00B6U\u00E1R\u0099UmTKR7\u00D2 k<\u00D4<\u00AE\x15\u00AE\u00AD\u00AE\u00BD\u00AE\u00D3\u00A3\u009B\u00A7g\u00AB\u00CF\u00A6?iPk\x18i\u00A4j\u00B4a<hRf\u00BA\u00C3L\u00CE\u00EC\u00AB\u00F9M\u008BRK\x1F+i\u00AB\u008F[{\u00AC\u008Bl\u00DCmEm\u00DF\u00D8\u00B5\u00D9gm\u00B3s\u00E0r\u0098ultJp\u00D6sA]\u00EE\u00BA\u0096\u00BBy\u00BB\u008B\u00B8/z\\\u00F2L\u00F2\u00D2\u00F3F\u00BD\u0087|J\u00B7\u00BB\u00EC\u00E0\u00DA\u00F1\u00D4\u00B7\u00DAo\u0087\u00BF\u00A0\u00FF\u00B3\u0080\u00E3\u0081;\u0082\x04\u0082&\u0083+C\u00DCC\u00D9C\u00EF\u0087\x15\u0087[D@\u00C4\u00B5\u00C8\u00E4(\u0095\u00A8\u0095\u00E8\u00FA\u0098\u00C0X\u0081\u00D8\u00C7q\x07i\u00DB\u00E2I\u00F17\u00E8\u00E9\tj\t+\u0089g\u0092|\u0093\u00B9\u0093\u00EF\u00A7\u00ECM5J]OkN\u008F\u00C8\x10\u00C9x\u00BA\u00F3\u00D0.\u00D7L\u00DE\u00CC\u0085\u00DD\x1DY\u0087\u00B2\u00D3rB\u00F7l\u00CF\u00F5\u00CA\u00F3\u00C9\x0F\u00D9\u009BT\u0090WXQt\u00B6\u00B8m\u00DF\u00E0\u00FE\u00F1\u0092\u0085\u00D2\u00CFe\u00B8r\u00F6\u0083b\u0087\u0094\x0F\u00EBV\u0098\x1D\u00B1\u00A9t:\u00EAU\x15X\x1Dwl\u00F7\u00F1\u0083'.\u00D4\f\u009F|_+Y\u0097vz\u00F4\u00ACt}\u00E6\u00B9\u0089\u00F3\n\u008D\u00B9\x17\u00A6.\u00A94\x154?o\u00D1\u00BCR|\u00F5E\u009BZ\u00FB\u00DE\u008E\u00E9.\u00B5kE\u00D7\u00E7z\u00F4{+\u00FB\u00BE\u00F4\u00BB\u00DEl\x1D\u0090\x1E<}Gah`8\u00EA/\u0089\u0091\u0095\u00D1\u00DBc\u0097\x1F5L4?\u00B91\u00F9\u00EC\x19\u00BCP\u009E\u00AD\x7F\u0099\u00BFX\u00F4\u00BA\u00FD\x1D\u00F3\u0087\u00825\u009E\u00F5\u00D6\r\u008F\u00CDM\u0080\u00DFoK\x00\x00\x04M\u00803\u00F3\x00\u00EE\u00A7\x00\u009C|\x00\u00EA\u00E5\x01$\u00AB\x01\u00988\x00\x1C\u00A9\x00\u00AE:\u0080\u009A\u0096\x02\u00F2\u00F4( V\u0097\u00FE9?\u00A8 \r\u0096\x10\n{\u00E1\x1C\f\u00C1\x1B\u0084\tQA\u00DC\u0090t\u00E48r\x1D\u0099B6PA\u00D4\b\rD\u00F3\u00D1\u00F3\u00E8}\u00F43\u008E\x1Fg\u0082\x0B\u00C7\x1D\u00C0u\u00E2\u00E60FL\x03\u00F3\u00C7\u00F6a\x1D\u00D8K<\x1B\u00DE\b\x1F\u008B?\u0085\x1F'0\x10L\b\u00A9\u0084\x16\u00C2\nQ\u0086\x18F\u00AC'.\u0093\x14II\u00A4^2#\u00D9\u009B|\u0081\x01a\u00F0dhadb\u008Ce\x1C\u00A3hSNRIT:\u00F59\u0093\rS'\u00B3\fs\x15\x0B\u0095%\u009B\u00E5+k\x1C\u00EB\x12[\x10\u00DB\x0B\u00F6@\u00F6E\u008E\x18\u008E/\u009C\u00D9\\L\\\u00C7\u00B9\u0095\u00B8o\u00F2\u00F8\u00F0\u00AC\u00F1\u0096\u00F1\u00A9\u00F0=\u00E4O\x11\x10\x14\x18\x15\u00DC+d*\f\u00C27D\u00F2D\u00ED\u00C5x\u00C5\u0096\u00C4\u00AFI\u0094IFJYJK\u00CAPd\u00D6d\u00E7\u00E4\u00C6\u00E4om\u00E9R\u00B8\u00A2\u00D8\u00AC\u00D4\u00A4\u00DC\u00A2\u00D2\u00A1\u00DA\u00A76\u00AC\u00FE\\\u00E3\u0083\x16\u00A6\u00CD\u00A9#\u00AE\u00AB\u00A0\u00A7\u00A2\u00AFl g(b\u00C4f\u008C\x1A\u00BF7\u00992\u00ED5\u00AB5/\u00B0\u0088\u00B3\u00F4\u00B42\u00DD\u00AAd-d\u00C3l\u008B\u00B3]\u00B7[\u00B5\x7F\u00BDm\u00C1a\u00CEq\u00D6\u00E9\u00A5\u00F3\x1B\u0097O\u00AE?\u00DD\u00C9\x1E\u00DC\u009E\u00D2^:\u00DE\u00F6>A\u00DB3v\x1C\u00F6m\u00F6\x1B\u00F1\x7F\x1B\u00C8\x14\u00A4\x16\u00EC\x15\u00B2;\u00B4.l |>\u00E2g\x14[\u00B4h\u008C\\\u00ACb\u009C\x02M6^\u008C\u00CE\u0095@N\u00F8\u009E\u00B8\u009C\u00CC\u0097b\u009F\u009A\u009B\u00D6\u009B\u00FEk\u00A7\u00C5\u00AE\u0083\u0099o\u00B2\u00EC\u00B3\u00AF\u00EDQ\u00CF\u00ED\u00CC\u00B7\u00DE;_\u00B8\u00B7Xt\u00DF\u00A5\x12\u00E3\u00D2\u0099\u00B2\u00B2\u0083\u009E\u0087\r\u008EX\x1FM\u00A9\x1E8\u00C1\x7F\u0092\u00A9\x16\u00AD\u00FBv\u00E6c\u00FD\u00BB\u0086\u0095\u00C6\u0095\u008B\u00EF\u009B\u00D6.\u00FF\u00BCJj\u00E3\u00EFP\u00EA2\u00BF\u00EE\u00D5\x13\u00D1\u0097\u00DC\u009Fy+kp\u00D7\u009D\u00E4\u00BB\u00D1\u00F7\u00FCG\u008AG;\u00C6^\u008F\u008B>\u00DE\u00F1\u00B4f\u00EA\u00D5s\u0095\u0099\u00EC\u00B9\u00F1\x05\u00F9\u00C5\u0082\u00E5\u00C5\x15\u00ABw\u00E7?\u00B0|\u00CAX{\u00BB\x1E\u00FA}\u00F1'ms\x13\x00\u0098A\x11\u009C \t\u00AA\u00A0\x17^\"\u008C\u0088*\u00E2\u0083\u00E4\"\r\u00C80\u00F2\x1E\u00E5@uQ\x7F\u00B4\x00mF\u009F\u00E2p8\x05\u009C\x17.\x0Fw\x19\u00F7\x02\u00A3b\u00FAX\x14V\u008D\u00FD\u0085\u00FD\u00C2\u00AB\u00E0\u0083\u00F1\u00C7\u00F0\u00E3\x04f\u0082\x1D\u00A1\u0090p\u0087\u00C8@\u00B4'\u0096\x13'I\u0092$:\u00A9\u009F\u00CCE\u008E&\x0F2\u00883\u00E40,0\u00DA0vQ\u00E4)5TN\u00EA>&\x02S\x0E30g\u00B3\u00E0X\nX\u0099X\u008F\u00B0\u0089\u00B15\u00B1\x1B\u00B3\u008Fs\u00C4p\x128k\u00B9L\u00B8\u00E6\u00B8\u00F3y\x14x&x\u00B3\u00F9\u0094\u00F9f\u00F8\x0F\nl\x15\u00C4\x04\u00FB\u0085\u00F6\b[\u008APD&Dk\u00C5\x12\u00C4-%\u0084$\u00D6%'\u00A4\u00DA\u00A5O\u00CA\x1C\u0091-\u0093+\u0091/\u00D9R\u00AEP\u00A5xV\u00A9U\u00F9\u008E\u00CAs\u00D5\u00AF\u00EA\u009C\x1A\u00BA\u009AAZ%\u00DA\u00DD:\u00EF\u00F5$\u00F5\u00FD\f\u00AA\r\u00A7\u008C\u0085L\u0082M\u009B\u00CC~XXX\x16[\r[\u00E3m\u00B4l\x03\u00ED\u00F2\u00ED\u00CFn\u00BB\u00E10\u00E9\u00B8\u00EA\u008C\u00B9p\u00B9\u00CA\u00B9\x19\u00BB{y$x\u0096z]\u00F2\x1E\u00F1\u00F9\u00B0\u0083\u00CB\u00D7\u00C0/\u00D4\u00BF,\u00A0'\u00F0]\u00B0x\u0088ghi\u00D8`\u00F8\u00CFH\u00F5\u00A8\u0088\u00E8\x131\x0F\u00E2P\u009Aj\u00BC?\u00BD$\u00E1Z\u00E2R2s\u008AV\u00AA\x7FZqzG\u00C6\u00E2.\u00EEL\u00EB\u00DD\u00BB\u00B2Z\u00B2_\u00EF\x11\u00CF\u00DD\u0091W\u0095\u00FF\u00A4\u0080\u00BB\u00D0\u00AB\u00E8D\u00F1\u00CB\u00FD\n%\u00A9\u00A5\u0083e<\u00E5q\x07\u00EF\x1DV\u00AE\u00A8\u00AEd:ZXM9v\u00F8\u0084t\u00CD\u00EDS\x11u\u0094\u00D3-g\u00BD\u00CFa\r\u00CD\u008D~\x17Y.\u00DDlNmQ\u00BA\u00B2\u00D4Z\u00DF\x1E\u00D1\u00A9\u00D0\u00F5\u00F1zWON\u009F]?\u00F7\u00CD\u00F9\u0081\u00E6\u00DB;\u0087l\u0086y\u00EF\u008D\u008E\u00B8\u00DD\u009F\x7F\u0090\u00FEP\u00E8\u00D1\u00C8D\u00F1\x13\u0097I\u00A9i\u00E4\u00D9\u00DC\u008B\u00C1\u00D9\u00C6\u00F9\u00D2\x05\u00FA\u00A2\u00CB2\u00FF\u00EB\u009A\x15\u00E9\u00B7\u0097\u00DF\x1B\u00AE\u008E|\u00F4\u00FB\u00F4~-\u00EB+\u00F3\u00FA\u00D1\u00EFB?j~\u00F2\u00FD*\u00DD\u00DC\x04\x00n0\x01\x1A\u00D4\u00C0}\u00D8DT\u0091P\u00E4(2\u0080|B\u00C5Pg4\x17mGWp\u00A28O\u00DC\x01\u00DC\x10\u0086\u00C3\f\u00B1t\u00AC\x1D[\u00C3k\u00E0\u0093\u00F1\u00DD\x04<\u00C1\u0081PMxM\u00D4#\x1E .\u0091\u00CCI\u00A7\u00C9$2\u008D<\u00CD`\u00C7\u00D0\u00C7\u00A8\u00C5\u00D8E1\u00A5\u00DC\u00A3zQ_3e2s27\u00B38\u00B0|`\u00AD`3d[f?\u00CE\u00E1\u00C2I\u00E5\u00BC\u00CBU\u00C8m\u00C7\u00C3\u00C63\u00C9{\u0086\u008F\u00CEo\"\u00C0.\u00F0FpP\u00E8\u00B4p\u00BEH\u0094\u00A8\u00AB\u0098\u0089\u00B8\u00AA\u0084\u00B4\u00A4\u00B0\x14\u00BF4\u009F\u008C\u0088\u00AC\u00BC\u009C\u008E\u00BC\u00ED\u0096\x00\u0085\u009D\u008AUJ\u00DD\u00CA/U\u0099\u00D4\u00F4\u00D5\u00E9\x1A\u00974\u00DFkk\u00E8d\u00EB\u008E\u00E9\u00CB\x18\u00E4\x1A\u00BE2\u00B63i7\u00937?m)jUg-k\u00D3jgn\u00FF\u00C4\u0081\u00E6Dqnv\u00F5q'{t{%\u00FB\u00A8o_\u00F7\u00ED\u00F3\u00DF\x1F\u00E8\x1B\u00AC\x19J\t{\x1AQ\x15e\x1D\u00BD\x1C\u009B\x16\u00B7\x11\u009FH_HtL\u00BA\u0092\u00C2\u009AJO{\u0094\u00A1\u00BB\u00F3T&\u00E3\u00EE\u00D4\u00AC\u00C5\x1C\u00CF=\u00F7\u00F2L\u00F3\u00BB\n\u00D4\x0B\u00DB\u008A\r\u00F6\r\u0095x\u0095\u00BE)\u00CB<\u00C8z\u00A8\u00B6B\u00E9H\u00E7Q\u00C3\u00AA\u00DEc\u00FA\u00C7\u00DBj\u00F0'\u00EDN\x1D\u00AE}qZ\u00EEL\u00CA\u00D9\u0081s\u009C\r\u00A1\u00E7\u00BB.0]\f\u00BEt\u00BD\u0099\u00F32\u00ADe\u00F8\u00AALkQ\u00DB\u00DB\x0E\u00A7\u00CE\u00F6kB\u00D7\u00F3\u00BB\u00DF\u00F5z\u00F4\u00DD\u00E8\u0097\u00BFy\u00F8\u00D6\u00E6`\u00E4\u00EDGC\u00C6w\x1B\u00EFq\u00FD\u00950rw\u0094\u00FFA\u00F8\u00D8\u0085\u0087\u00AF\u00C7\u00C5'<\x1E\u00E7<9\u00F7\u00F4\u00EE\u00E4\u00C2\u00D4\u00C63\u0096\u00E7\u00C2/\u00E4g4fu\u00E7\f\u00E7\u008D_\x1A/\x18\u00BE\u00D2]\u00D4ZRY\u0096{-\u00F6\u0086\u00E9\u00CD\u00F2J\u00E7\u00DB\u0094w\x1A\u00EFV\u00DE\u009FY\u00F5\u00FA\u00C0\u00F0\u00E1\u00FA\u00C7\u00D0O,\u009F:>o_\u0083\u00B5\u00DA/\u00A6_\u00E6\u00BE\u00EE^\x17X\u00EF\u00FC\u00E6\u00F6m\u00F5\u00FB\u00BE\x1F\u00D2?\u00FA7|7\u00D6\x7F\x1E\u00FC\u00A5\u00F4kh3xs\x13 !TM\x15\x00\x00\x10\u008A)\x00\u00FE\u00F9\u00E6\u00E6')\x00b9\u00C0\u00CF\u00B2\u00CD\u00CD\x1F\u00B5\u009B\u009B?\u00EB\x00p\u00D3\x00}\u00D1\u00BF\u00FF+\x00\x00\b,\x00\u00C7\u00EA\u00FE\u00B77\u00D2\u00FF\x00\x1E\u00E1~\u0097\u00DA\u00DF0\u00FA\x00\x00\x00 cHRM\x00\x00m\u0098\x00\x00s\u008E\x00\x00\u00FA\u00CC\x00\x00\u0084\u00FA\x00\x00y\u0081\x00\x00\u00FD\x13\x00\x000m\x00\x00\x12)\r\x1E&N\x00\x00\x01\u00DBIDATx\u00DA\u00B4U=\u00CA\u00EA@\x14=3\x1A\t\u0082\"\x11%\u008D\u0085\u0085b\u00E5\x02\\\u0086\u00A5`a\u00E5\x02\u00EC\u00ECm\u00DD\u0080K\x10l\u00B4p\x01\u0082\u00E0&\x04\u00F1\x07\x0BQD\u0094Lf2\u00AFxL\u00CC$yy)\u00BEo`\u008A\u00E4\u00CE=\u00F7\u00DC\u0093\u0093;\u00A4\u00D9lJ\u00FC\u00D2\u00CA\x02\u00C0h4\u0082\u0094?[c:\u009D\u00FE\x05\u00E7\u009C\u00E3r\u00B9\u00C4\x1E\"\u0084@J\tBHl\\\u00C5\u0082\u00E4l\u00DB\u00FE2\u00E7\u009C\u00C3\u00F3\u00BC\x1Fc-\u0084\u00F8\u0082{\u009E\x17\u0091e\u00B1X\u00A4\x02\u00EAv\u00BBZ\x17\n\u00CF\x07\x17B\u0080s\u00AE\u00B5\u00BEZ\u00ADR\u0081\u00CFf\u00B3d\u00E6\u009CsH)5\u00F6\u009F\u00CF\x07\u00FB\u00FD>\x11\u00B8^\u00AFkr*\u00FD9\u00E7_p)e\u00AC\u00E6\u008E\u00E3\u00FC\u0097y8/H\u00D2g\u00AEZQ\u00EB|>\u00C7:$\u00EC\u008C`\u009E\u008Ai\u00B2\b!\"\f\u0096\u00CB%\u00AE\u00D7+L\u00D3\u00F4\u00DF=\x1E\x0F\f\x06\x03\u00ADh\\\u00C7\u00AE\u00EB&\u00BB\u00A5\u00D3\u00E9`\u00B7\u00DB\u00A1\u00D1h\u00C0\u00B6m\u00E4\u00F3yL&\x13\u00DCn7T\u00AB\u00D5\u0088C\x12e\t3h\u00B5Z(\x14\n\u0098\u00CF\u00E7h\u00B7\u00DB\u00A8\u00D5j\x00\x00J)(\u00A5\x11\u00E6qRQ\x05\u00EE\u00BA\u00AE\u00B6\x01\u00C0\u00B2,\u00F4z=l\u00B7[\x1C\u008FG\x00\u00C0\u00EB\u00F5\u0082a\x180\f\x03\u00EF\u00F7\u00DB?\u00CF9\u00F77c\u00EC\x0B.\u0084\u00F0\u00DB\t\u00B6U,\x16\u0091\u00CB\u00E50\x1C\x0E\u00B1\u00D9l@\b\u00C1\u00E9t\u00C2\u00FD~\x07\u00A5\x14\u008C\u00B1H^\u00D0yY\x00`\u008C\u00F9\u00DE\f\x7F\u0098R\u00A9\x04\x00\u00E8\u00F7\u00FBX\u00AF\u00D7\u00B0,\x0B\u008E\u00E3\u00E0\u00F9|\u00C24M-O\u00F9\\1\u00CF*\u00900\u00F8x<\u008E\u00F5\u00F5\u00E1p\u00D0\u009E+\u0095J\u00B2[\u00E2\u00ACX.\u0097SMI\u00CF\u00F3\u00FE\u00E9\u00FD\u00C8O\x147B\u0093V\u00B8\u0098\u0094Rg\u00CE\x18C&\u0093I5\u00BF\u00D3\u00CCs\u00A59\u00F9\u00CDk\u00EE\u00CF\x00\u00BAdqD\u00EEe\u00C0\x04\x00\x00\x00\x00IEND\u00AEB`\u0082" ;
        this.w.res1.gr2.gr5.bt1.image =this.w.res1.gr1.gr1.gr1.del.image = this.w.res1.gr1.gr2.gr1.del.image =  "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x17\x00\x00\x00\x14\b\x06\x00\x00\x00f\u00BE\u00A6\x0E\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x17OiCCPPhotoshop ICC profile\x00\x00x\u00DA\u00D5yiX\u008D]\u00D8\u00F6u\u00DF\u00FB\u00DES\u00ED\u00DD<\u00CF\u00F3\u00A8y\u009E\u00E7\u00D2\u00A4y\u00A6y\x1Ew\u00BB\u00B9H\u00A5\u00D2@)$\u0085($\u00A1D#\r\u00A2H\u009E$\n\x15\x1A\u00A4\"d\u0088\x10\u00BD?x\u009E\u00E7\x1D\u00BE\u00F7\u00C7w\x1C\u00DF\u009F\u00EF\u00FC\u00B1\u008E\u00F38\u00AFk\u009D\u00D7u\u00FDZ\u00C7Z\x0B\u0080w%\u0080F\u008BFY\x00bb\x13\u00E9\u00CEV\u00A6\"\u009E^\u00DE\"\u00C4) \u00820p\u0083\x06\u00C8\x05\x04%\u00D0L\x1C\x1D\u00ED\u00E0\x7F\u00C5\u0097\t@\x00\x00\x1E*\x04\u00D0h\u00D1\u00F0\x7F\x07\u00D6\u00E0\u0090\u0084 \x00\u00C4\x11\x00\x02\u0083\x13\u0082b\x00\u0090\u00AB\x00\u00A8i\x10\u008D\u009E\b\u0080[\x07\u0080\u00D1\u0094DZ\"\x00v\x07\x008\u00E8\u009E^\u00DE\x00\u00D84\x00p\u0084\u00FD\u00E6\u00AB\x00\u00C0\x11\u00E8\u00E9\u00E5\r\u0080\u00C7\x00\u0080\u0083\u00EE\u00EAl\x06\u0080\u00E7\x01 Q\x02\x02\u00E8a\x00T\t\x00\x10I\x0E\nK\x04\u00A0\u009A\x03\x10\u00D8b\u0083#b\x01\u00D8=\x01\b\u0086A\u00E1\x01\u00C1\x00\u00BC\u0095\x00\u00B0%&&.\x18\u0080\u00F7\x16\x00\u00C8\x04\u00FE'\u009F\u00B0\u00FF\u00E2\x19\u00F8\u008Fg@@\u00D8?\u00FC\u00F7,\x00\x00@2\u008FH\u00A0E\x07\u00A4\u00C1\u00FFk\u00C4D'\u00FD]\u0083\r\x00(\u00B1\u00D1\u00DB\u00EC\x00\u0080\x0B\x00\u0096\u0082\x03\u00CCm\x01@\x00\x00~\u00D1\u00A2\x1D\u00ED~\u00E7 |!\u00B1n.\x7F\u00F8\u0096\u00D8\u00C0m\x0E\x7F\u00B8a(\u00DD\u00D2\u00F9\u00F7^\u00C4\u0091\u0096h\u00EA\f\x00<\x00H(-\u00D1\u00D1\u00F5\u008F\u009E\u0099\x1En\u00B6\r\x00(\x00\u00C8\u00A1\u0090\x04\u008B\u00BF}NF\x06\u00D88\x02\x00\x13\x00\u00D2BOrv\x03\x00\t\x00\u00A4/!\u00D9\u00C5\x02\x00X\x00\u0090\u0097\u00E9\u00E1\u00AE\x1E\x7Fr>\x07\u0087\u0098\u00FF\u00D1Q44\u00C2\u00D2\u00FA\x0Fg\u008BH\u00B4v\x05\x00\x0E\x00T,*\u00CE\u00D6\u00F9w-T\x13l!\x1AB \t\u00E8\x10\x02\u00B1\u00A0\x00v`\x06\u00E6\x7FV\x05\b\u0085\x00\u00A0C2\u0084@\x02D\u00C1+\u00A0C\f\u00D8B\x1CDC\x1C\u00D0A\u00E4O\u009E\u00D9\u00FFP,!\x00\u00E8\x10\x06!\u00FF\u00CDQ\x04\u0082 \x0E\u0092\u00FE\u00A9\u00F9\u00B7\u00FA\u00AFC\x04\x04C\u00DC?z\u00C0\u009F\x18\x1DB \u00C1/\"\u00E7\u00DF\n\u00FF\u00D9/\x1A\u00E2\u0080\u00AE\u00DC\u00A8\u00BC\u00AC\u00BC\u00F1w\x1C\u0093\u00C2T1\r\u00CC\x143\u00C0\f1\x1D\x10\u00C1\u00B80>P\u00C0\u00D41m\u00CC\x043\u00C2\u00F40\rL\x07,\u00E1%\u00D0!\u00EC\u00EF\x1E\u00FD\"r\u00E81-\u00A1\u00C9\u0095qi\u00BA\u00EE\u00E1\x7Ff\b\u00FCg\x02wx\tt\u0088\u00F8?N\u00F4\u00A7\u00F7\u0091\u0095\u00F6\u0095\x7F:\u0084\u00C4\u0090\u00D4D\x00\x00\u00B38Z\x1A=\",<Q\u00C4\u0084F\u008B\x0E\u00D9\"b\x1D\x1B\u00A4\u00B8EDUYE\x05\u00FE\x7F\u0082\u00A7\u0097\u00B7\u00C8o\u00F6\u00C9\x19\x10\x00@\u00B8\u00EE\u00FF\u00AB\u00C5\u00A9\x00\u00E8\x04\x01 {\u00FE\u00D5\u00FC\u00DF\x01\u00B4G\x02\u0090\u00D8\u00FE\u00D5\u00A4\u00DA\x01\u0098U\x01\u0086\u008E\x04%\u00D1\u0093\x7Fk\x18\x00\x00\x1E\x18\u0080\x198\u0080\x17\u0084@\x1Cd@\x01TA\x13\u00F4\u00C0\x18,\u00C0\x06\x1C\u00C0\x15\u00BC\u00C0\x17\u0082 \x1Cb\u0080\x0E)\u00B0\x13\u00B2!\x1F\u008A\u00E1\x00\x1C\u0086*\u00A8\u0081:8\x07\x17\u00A1\x05\u00DA\u00E1:\u00DC\u0080A\x18\u0086Q\x18\u0087)\u0098\u0081\x05x\x03\u00AB\u00F0\x05~ \bBD\u00A8\b;\u00C2\u008B\b#\u0092\u0088<\u00A2\u008Ah#\u0086\u0088\x05b\u00878#^\u0088?\x12\u0086\u00C4\"I\u00C8Nd\x0FR\u008C\u0094#U\u00C8)\u00A4\x01\u00B9\u008Ct\"7\u0090!\u00E4\x01\u00F2\x14\u0099E\u0096\u0091\u008F\u00C8w\x14\u0087RP\x0ET\x10\u0095B\u0095Pm\u00D4\x04\u00B5E]\u00D1\x1Dh\x18\x1A\u008F\u00A6\u00A3\u00B9h\tZ\u0089\u00D6\u00A2\x17\u00D06\u00F4\x06:\u008C\u008E\u00A33\u00E8\x1Bt\r\x078F\x1C\x17N\x14\u00A7\u0080\u00D3\u00C6\u0099\u00E1\x1Cp\u00DE\u00B8P\x1C\x1D\u0097\u0089+\u00C2U\u00E0jq\u0097p]\u00B8\u00DB\u00B8\u0087\u00B8\x19\u00DC\n\u00EE\x1BF\u00C0\u00D81\x11L\x01\u00D3\u00C3\u00B6bnX\x10\x16\u008Feb\u00FB\u00B0*\u00EC\x1C\u00D6\u0086\u00DD\u00C2\x1Eb\u00B3\u00D8*\u00F6\x0BO\u00C5\x0B\u00E0\u00E5\u00F1\u00BAxk\u00BC'>\f\u009F\u0082\u00CF\u00C7W\u00E0\u00CF\u00E2[\u00F1\x03\u00F8q\u00FC\x02\u00FE\x0B\u0081@\u00E0\"H\x13\u00B4\b[\t^\u0084HB\x06a\x1F\u00E18\u00A1\u0089\u00D0Gx@\u0098'\u00AC\x11\u0089D^\u00A2<\u00D1\u0080\u00E8@\f &\x12\u00F3\u0089G\u0089\x17\u0088\u00BD\u00C41\u00E2\x02q\u009D\u00C4H\x12&\u00A9\u0092,I\u00DE\u00A4XR\x0E\u00A9\u0082t\u009E\u00D4C\x1A#-\u0092~\u0090Y\u00C8\u0092d]\u00B2\x039\u0098\u009CF.%\u009F&w\u0091\u00EF\u0093\x17\u00C8?\x18X\x19\u00A4\x19\f\x18\\\x19\"\x19\u00B2\x19*\x19.1\f0L3|bdd\x14c\u00D4atb\u008C`\u00CCb\u00ACdlf\u00BC\u00C38\u00CB\u00F8\u008D\u00C2F\u0091\u00A3\u0098Q\u00B6S\u0092(%\u0094zJ\x1F\u00E5)\u00E5\x13\u0095J\u0095\u00A2\x1AS\u00BD\u00A9\u0089\u00D4\x12j\x03\u00F5&\u00F59u\u009D\u0089\u009DI\u0091\u00C9\u009A)\u0098i7S5S\x1B\u00D3\x18\u00D3;f2\u00B3$\u00B3\t\u00B3/s:s\x05\u00F3\x15\u00E6\u00FB\u00CC+,d\x16)\x163\u0096\x00\u0096L\u0096j\u0096N\u0096\u00C7,k\u00AC\u00EC\u00AC*\u00AC\x0E\u00AC1\u00AC\u00FBX\u00CF\u00B3\x0E\u00B1.\u00B1\x11\u00D9\u00A4\u00D8,\u00D8\u0082\u00D9r\u00D9\u00EA\u00D8n\u00B2\u00CD\u00B3\u00E3\u00D8\u00C5\u00D9\u00CD\u00D8\u0083\u00D8\u00F7\u00B0\u009Ff\x1F`_\u00E0 pHsXsDr\x14s\\\u00E4\x18\u00E1X\u00E5d\u00E3T\u00E7t\u00E7L\u00E5\u00AC\u00E6\u00EC\u00E6\u009C\u00E1\u00C2qIqYsEs\u0095r\u00B5pMp}\u00E7\x16\u00E46\u00E1\x0E\u00E1.\u00E4\u00BE\u00C4=\u00C6\u00FD\u0095\u0087\u009F\u00C7\u0098'\u0084\u00A7\u0088\u00A7\u0089g\u009C\u00E7;\u00AF\b\u00AF\x05o\x14o\x19o;\u00EF3>\u008CO\u008E\u00CF\u0089/\u0085\u00EF\x04\u00DF\x00\u00DF\n?\x07\u00BF\x1E\x7F\x10\x7F\x11\x7F\x0B\u00FF\u00A4\x00* '\u00E0,\u0090!P'pO`MPH\u00D0J\u0090&xT\u00F0\u00A6\u00E0\u008A\x10\u0097\u0090\u00B1P\u00A4\u00D0!\u00A1\x1E\u00A1eavaC\u00E1\b\u00E1C\u00C2\u00BD\u00C2\u00AFE8ELD\u00A2E*En\u0089\u00AC\u008A\n\u0088n\x15M\x12=%:\"\u00FACLZ\u00CCM,G\u00ACI\u00EC\u00998\u0083\u00B8\u00B6x\u00A8\u00F8!\u00F1~\u00F1U\ta\t{\u0089\u009D\x12\u008D\x12\u0093\u0092dIm\u00C9p\u00C9#\u0092\u00B7%\u00BFJIKyH\u00ED\u0095j\u0097Z\u0092\u00E6\u0091\u00B6\u0096N\u0097n\u0094\u009E\u0096\u00A1\u00CA\x18\u00C9\u00C4\u00CB\u00D4\u00CA<\u0092%\u00C8j\u00CBF\u00C9\x1E\u0097\x1D\u0095C\u00E54\u00E4\u00C2\u00E5\u00AA\u00E5\u00EE\u00CB\u00A3\u00F2\u009A\u00F2\x11\u00F2\u00C7\u00E5\x1Fl\u00C1o\u00D1\u00D9\x12\u00BB\u00A5v\u00CBc\x05\u008A\u0082\u0089B\u00B2B\u00A3\u00C2\u00AC\"\u0097\u00A2\u009Db\u008Eb\u00BB\u00E2;%\t%o\u00A52\u00A5\u00DBJ\u00BF\u00945\u0094\u00A3\u0095O+O\u00A9\u00B0\u00A9\u00D8\u00A8\u00E4\u00A8t\u00A9|T\u0095S\rR\u00ADV}\u00A4FU\u00B3T\u00DB\u00AD\u00D6\u00A1\u00F6A]^=D\u00FD\u0084\u00FA\x13\rv\r{\u008D\u00BD\x1A\u00FD\x1A?5\u00B54\u00E9\u009A\u00974\u0097\u00B5$\u00B4\u00FC\u00B5\u008Ei=\u00D6\u00E6\u00D0v\u00D4\u00DE\u00A7}G\x07\u00AFc\u00AA\u00B3[\u00E7\u00BA\u00CE7]M\u00DDD\u00DD\x16\u00DD\u00F7z\nzQz\u00E7\u00F5\u0096\u00F4\u00A5\u00F5C\u00F4O\u00EB\u00CF\x1B\u0088\x19\x04\x18\u009C2\u00981\x141\u00F47<i8c$j\x14`Tk4g,n\x1Cl|\u00D6x\u00D1D\u00D6$\u00D2\u00E4\u0082\u00C9;SeS\u00BAi\u00AB\u00E9W3]\u00B3]f}\u00E68s+\u00F3\"\u00F3\x11\x0B6\x0B7\u008B*\u008B\u00E7\u0096b\u0096a\u0096\u008D\u0096\u00ABV\x1AV\x19V}[\u00F1[m\u00B7\u0096m}l-h\x1Dd\u00DD`\u00BDj\u00A3e\u00B3\u00CB\u00E6\u0096-\u00C5\u00D6\u00C5\u00B6\u00CAv\u00CEN\u00CE\u008En\u00D7e\u008F\u00DA\u00DB\u00D8\x1F\u00B4\u009F\u00DE&\u00B9-v[\u00BB\x038X;\x1Ctx\u00E6(\u00ED\x18\u00EFx\u00CD\u0089\u00E0\u00E4\u00E8T\u00ED\u00F4\u00CAY\u00C5y\u00A7\u00F3m\x17v\x17?\u0097\u00F3._\\M]K]\u00A7\u00DCd\u00DC\u0092\u00DC\u00FA\u00DD\u0099\u00DD\u00B7\u00BB7\u00B8\x7F\u00F50\u00F7(\u00F7\u0098\u00F1T\u00F2\u00DC\u00E59\u00EC\u00C5\u00E7\x15\u00E1\u00D5\u00E1M\u00F4v\u00F7>\u00EB\u00BD\u00E6c\u00E1s\u00D8ga\u00BB\u00C6\u00F6\u00FC\u00ED\x13;\u00A4w\u00A4\u00EE\x18\u00F2\u00E5\u00F3\u008D\u00F6\u00ED\u00F6c\u00F6\x0B\u00F0\u00BB\u00E2\u008F\u00F7\u00F7\u00F0?\u00EF\u00BF\x11\u00E0\x10P\x1B\u00B0\x16h\x1Dx,p5\u00C8,\u00E8H\u00D0\u009B`\u00E3\u00E0C\u00C1\u00CB!\x06!\u00E5!\u008B\u00A1\x06\u00A1\u00E5\u00A1Ka\x06a\x07\u00C3\u0096\u00C3\u008D\u00C2+\u00C2W\"\u00CC\"\u00AA\">Dn\u008D\u00AC\u0089\u00FC\x1A\u00E5\x10U\x1F\u00B5\x19\u00ED\x11\u00DD\x14C\u008A\u00F1\u008F\u00E9\u008Ce\u008B\u008D\u008A\u00BD\x15'\x14\u0097\x1A\u00F7\u0080&O\u00CB\u00A7\u00CD\u00C4\u00EB\u00C6\x1F\u008E_\u00A5\u00DB\u00D2\u00CF& \t;\x12:\x129\x12i\u0089\u00F7\u0092d\u0092\u00F2\u0092f\u0093\r\u0093\u00AB\u0093\u00D7S\u00DCS\u00AE\u00A4\u00B2\u00A6\u00C6\u00A6\u00DEK\u0093K+L[L\u00B7L?\u0093\u0081e\x04e\u00F4\u00EF\x14\u00DD\u0099\u00BDsv\u0097\u00C9\u00AES\u0099Hf`f\u00FFn\u00F1\u00DD\u00B9\u00BB\x17\u00B2\u00AC\u00B2\u00CEe3dGe\u00FF\u0095\u00A3\u009CS\u009E\u00F3y\u008F\u00C7\u009E\u00AE\\\u00C1\u00DC\u00AC\u00DC\u00F9<\u00AB\u00BC\u00C6|\u00A6|z\u00FE\u00E3\u00BDz{k\n\u00B0\u0082\u0088\u0082\u0091B\u00B5\u00C2\u00A3\u0085\u00BF\u008A\u0082\u008B\u00EE\x16+\x17W\x14o\u00EC\x0B\u00DAww\u00BF\u00CA\u00FE\u00CA\u00FD\u009B%\u00A1%#\u00A5\u009A\u00A5'\x0E\x10\x0E\u00C4\x1E\u0098(3*;W\u00CEZ\u009E^>\x7F\u00D0\u00FE`\u00DB!\u0091CE\u0087>\x1F\u00F6;<T\u00A1^Qs\u0084\u00E1H\u00D2\u0091\u0099J\u00BB\u00CA\u008E\u00A3\x12G\x0F\x1C\u00DD\u00A8\n\u00AF\x1A\u00AF6\u00ADn:&p\u00AC\u00F0\u00D8\u00D7\u00E3\u00C1\u00C7\u00C7N\x18\u009F\u00B8T#XS\\\u00F3\u00FDd\u00C4\u00C9'\u00A7\u00ACN\u00B5\u00D5J\u00D5V\u00D4\x11\u00EA\u0092\u00EB^\u009Dv?}\u00FB\u008C\u00F6\u0099\u0086\u00B3|g\u008B\u00CF\u00FE\u00AC\u008F\u00AD\u009F9\u00E7|\u00EEV\u0083VC\u00C3y\u0081\u00F3\u00A5\u008DhcR\u00E3\u00F2\u0085\u00ED\x17F/\u009A_\u00EC\u00B8\u00A4p\u00E9T\x13WSq34'5\u00BF\u00BE\u00EC\x7Fy\u00A2\u00C5\u00B6\u00A5\u00FF\u008A\u00F6\u0095KW%\u00AF\x1Ekeo-jC\u00DA\u00D2\u00DAV\u00DB\u00C3\u00DBg:\u00BC:\x1Et\u00DAt\u00F6w\u00E9u\u00B5^S\u00BCV\x7F]\u00F4zu7gwi\x0FCOn\u00CFfoz\u00EFZ\x1F\u00ADo\u00E5F\u00D8\u008D\u00F9~\u00BF\u00FE\u00A9\u009B\u009E7\x1F\u00DDr\u00BA52`;pg\u00D0r\u00F0\u00E6m\u0093\u00DB\u00BDw\f\u00EE\\\x1F\u00D2\x1D\u00EA\u00BC\u00AB}\u00B7}Xs\u00B8\u00ED\u009E\u00C6\u00BD\u00D6\u00BF4\u00FEj\x1D\u00D1\x1Ci\u00BB\u00AFu\u00BFcTg\u00B4\u00EB\u0081\u00FE\u0083\u009E1\u00A3\u00B1\x1B\x0F\u00CD\x1F\x0E>\u00B2~4<\u00BEm\u00FC\u00C1\u0084\u00DB\u00C4\u0093\u00C7\u00DB\x1F\u00CF<\t~\u00B2\u00F44\u00FA\u00E9\u0087\u00C9\u00E4\u00C9\x1FSY\u00D3\u00F8\u00E9\u00A2g,\u00CF*\u009E\x0B<\u00AF}!\u00FB\u00A2iFs\u00A6{\u00D6|\u00F6\u00DE\u009C\u00CB\u00DC\u00D4|\u00D0\u00FC\u009B\u0097\t/7\x16r_Q_U,\n/6,\u00A9.]_\u00B6\\\x1E}\u00ED\u00F3z\u00E1\r\u00ED\u00CD\u008F\u0095\u00FC\u00B7\u00ACo\u008F\u00BD\u0093yw\u00F5\u00BD\u00F1\u00FB{\u00AB\u009E\u00AB\x0B\x1F\u00E8\x1F6?\u00EE\u00FB\u00C4\u00FB\u00A9\u00FE\u00B3\u00FA\u00E7\u00FE5\u00C7\u00B5\u00E7_b\u00BE\u00FC\u00F8Z\u00B4\u00CE\u00BB~\u00EE\u009B\u00F6\u00B7\u00DB\u00DF=\u00BE/\u00FEH\u00D9 nT\u00FE\u0094\u00FD\u00D9\u00F5\u00CB\u00F6\u00D7\u00F4f\u00CC\u00E6&-\u0080\x1E\x00\x00\x008\x00@CC\x01>\u00D6\x03P\u00BD\x00\u00D8G\x01\x18\u0098~\u00DF)\u00FE\x00\u0087\x00\u00A0\x00@\x04!\u00B0\u0081b\u0098G\u00E4\u0090X\u00A4\x0F\u00E5E\x13\u00D1I\u009C5\u00EE&f\u0085=\u00C2\u00C7\x10X\t\u00FD\u00C4\u009D$C2\u0091\u00FC\u008C\u00A1\u0093\u00F1\x18\u00A5\u0094Z\u00CF4\u00CD\u00C2\u00C2j\u00CBV\u00C8>\u00C4\u00C9\u00CA\u00B5\u009D\u00FB\x02/\u00C6\x17\u00C0\u00DF-(\"\u00B4Ox]4XlRb\u009B\u00E4\u0090\u00B4\u0092L\u0089\u00EC\x1By\u00EB-5\n_\u0094\u00CC\u0094\u00F7\u00AB\u008C\u00AAQ\u00D5M5\x124\u008Fi\u00F5i\u00CF\u00E8\u00FC\u00D4\u00E3\u00D6\u00977\u00D01\u00B40r6\x0E2I0\u00CD5;b\u00DEh\u00D1k\u00F9\u00D0jy\u00EB\u00A6\r\u00A7\u00ED\x16;3{\u009Fm\x11\x0E\u00C9\u008EyN\u00E5\u00CE5.\u008D\u00AE\u00EDn\u00FD\u00EE\u00C3\x1Ec\u009EO\u00BD^x\u00CF\u00FB,m\x7F\u00BBc\u00C9w\u00DAo\u00C4\u00BF7\u00A0)\u00F0D\u00D0\u00FE\u00E0\u00F4\u0090\u00D0P\u00A70\u00BDp\u0089\b\u00A6\u0088/\u0091/\u00A2\x06\u00A3\x1Bb\u00F6\u00C7\u00D2\u00E2\\hZ\u00F1|\u00F1\x1B\u00F4\u00E7\t}\u0089uIy\u00C9\u00A1)\u00D6\u00A9\u00F2i\fi\u00AF\u00D3\u00EFe4\u00EF\u00AC\u00DC\u0095\u009B\u0099\u00B2;>\u008B\u009E\u009D\u009ES\u00B4\u00E7Tnw\u00DE\u008B\u00BD\u00E4\x02\u00FDBZQ]\u00F1\u00C4~\u0086\x12\u00FD\u00D2\u0098\x03'\u00CAF\u00CA\x7F\x1E\u00DAr\u00D8\u00A7\u00A2\u00E8H[\u00E5L\x15c\u00B5\u00C61\u00BF\u00E3\u0085'Zj\u00A6Na\u00B5\nu\u00EE\u00A7w\u009F9w\u00F6A\u00FDz\u0083\u00C8y\u00BB\u00C6\u009D\x17Z.~h\u00D2m.\u00BD\u00FC\u00FE\u008A\u00CF\u00D5\u00FBm\x0E\u00ED\u008F:\u00F5\u00BB\x12\u00AF5\\\u009F\u00EEa\u00ECU\u00EBs\u00BF\x11\u00DF\u009Fw\u00B3\u00ECV\u00C5@\u00C5`\u00D9\u00ED\u0082;{\u0086\u00F6\u00DE\u00DD?\u00BC\u00FF^\u00DE_\u0089#\x1E\u00F7\x15\u00EF\u00FF\x18\u00ED{\u00901\u00A69\u00F6\u00E5\u00E1\u00E3G\u009D\u00E3U\x13\u00BB\x1E\u00FB=1}*9I\u009E|;\u00F5`\u00BA\u00F5Y\u00D5\u00F3]/\u00FCg\u00CCge\u00E7X\u00E6\u00BE\u00CD\u00BFz9\u00B10\u00F4\u00EA\u00C6\u00E2\u00B5\u00A5\u00CE\u00E5\u00CE\u00D7g\u00DE\u0094\u00AC$\u00BF\u00F5}g\u00F1^~\u0095eu\u00ED\u00C3\u00E4\u00C7\u009EO\u00A7>\u00E7\u00AD\u0085\x7F\u00B1\u00FD\u00AA\u00B4\u00CE\u00BE\u00FE\u00F5\u00DB\u00F4\u00F7\u00BE\x1F\u00B5\x1B\u00B9?C~\u0099o\u008Amn\x02\x00\x01\u00F8\u00C0\x18Ra\x00aG\u00EC\u0090\x03\u00C8\x0BT\r-A?\u00E1\u00FCp\x13\u0098\x1B\u00F6\fO#0\x11\u00DA\u0089!$>\u00D2$\u00F9\x18C\x18\u00A3)\u00C5\u0080\u00EA\u00CA\x14\u00CE\u009C\u00C5r\u0092\u00F5\x06\u00DB2\x07'\u00A79W\x1Aw\x13\u00CF{>E~\u00BA\u00C0u!Faw\u0091\u00F3\u00A2\u009B\u00E2&\x12\u00D9\u0092\u00BDR\x1B2Z\u00B2\u0091r\u00C7\u00E5\u0087\u00B7|T\u00E4TRS\u00DE\u00AA\u00E2\u00A3\x1A\u00A6\x16\u00AF\u009E\u00A6\u00B1K3]+R\u00DBG\u00C7N\u00D7@OY_\u00CC\u0080\u00D3\u0090d\u00F8\u00DD\u00E8\u00AD\u00F1\u00AC\u00C9\u00B8\u00E9]\u00B3\x1E\u00F3+\x16\u00F5\u0096\u0095V\x05[S\u00AC\u00C3m\u00BCl\u00B7\u00DAi\u00DBKo\u00E3t\u00C0\x1C>;\u00CE9=p\u00EEsiv=\u00E1V\u00E0\u009E\u00E0\u00E1\u00EBi\u00ED\u00A5\u00E6-\u00E8C\u00F0y\u00B7}bG\u00B7o\u009D_\u0091\x7F\\\u0080k\u00A0z\x10%h.\u00B83\u00A4444L?\u009C5\u00FCU\u00C4\u00B5\u00C8\u00B2\u00A8\u0090h\u00DD\x18\u00E6\u0098\u00F9\u00D8\u00F6\u00B8\x02\u009AW\u00BC|\u00FC\x06}$\u00E1d\"=\u00C9,\u00993y1\u00A53u_\u009Ao\u00BAr\x06\u009A\u00F1xg\u00D3\u00AE\u00E2\u00CC\u0098\u00DDnY\u00E6\u00D9\u00BA9:{\fr\u00B7\u00E6y\u00E6\u00C7\u00EE\u00DD[p\u00A6\u00F0f\u00D1l\u00F1\u00AF\u00FD\x02%:\u00A5\u00EE\x07\x12\u00CA\x0E\u0094_88t\u00E8U\x05zD\u00A0R\u00F3\u00A8SULu\u00F1\u00B1\x0B\u00C7GO|9)v\u00CA\u00B1vO]\u00E7\u00E9\x0Fg\x15\u00EB\u00E3\u00CF]m\u00F8\u00DA\u00A8sa\u00E7\u00C5\u009E&h6\u00B9\u00BC\u00A7e\u00E0*\u00BE\u00D5\u00AA\u00AD\u00A0\u00FDv'\u00B1\u00CB\u00E2Z\u00CE\u00F5\u00EE\u00EE\u00CF\u00BDR}.72\u00FAO\u00DC\u00BCvk|`y\u00F0\u00EB\x1Dl\u0088\u00FD\u00AE\u00E8\u00B0\u00D2=\u0083\u00BF\u00ECF\u00BC\u00EF\u0087\u008F\u00A6<\u00C8\x1F;\u00FC\u00B0\u00F6Q\u00D3\u00F8\u00F5\u0089\u00A1\u00C7\x13O\x16\u009E~\u009E\u00C2Ms<\u0093|\u00AE\u00FD\u00C2n&l\u00B6nn\u00F9\u00A5\u00F4\u0082\u00F7\u00AB\u00FC\u00C5\u00F3K\u00B7\u0097g_\u00AF\u00AF0\u00BD\u0095|g\u00F4\u00DEg5\u00EB\u00C3\u00E8'\u00B5\u00CF\x07\u00D7>}u^\u00BF\u00FA\u009D\u00E7G\u00DE\u00C6\u00FA\u00AF\u0094\u00CDM\x00\u00C0\u0080\x15\u00E4`\x1BdA\x1FBDt\u0091D\u00A4\x1DEQ{\u00F4$\u00FA\x03\u00E7\u008B\u00BB\u008B\u00E9cmxm|?\u00C1\u00910O\u00CC \u00F1\u0093n\u0093\u00F73\x041\u00EAS\u00F8)\u00BF\u00A8sL\u00C3\u00CC\u00AD,gX+\u00D9J\u00D8\x0B8\u00F28\u00F3\u00B9\u008A\u00B9\x0F\u00F2\u00D4\u00F06\u00F2u\u00F0w\x0Bt\x0B\u00F6\b\u00F5\n\u00F7\u0088\\\x13m\x15k\x14?.Q,\u0099$\u00B5]\u00DAXFL\x16d\u00A7\u00E4\u00DA\u00E5\u008B\u00B7\u00B8+\u0088(\u00BCVlU\u00CAR\u00B6U\u00E1R\u0099UmTKR7\u00D2 k<\u00D4<\u00AE\x15\u00AE\u00AD\u00AE\u00BD\u00AE\u00D3\u00A3\u009B\u00A7g\u00AB\u00CF\u00A6?iPk\x18i\u00A4j\u00B4a<hRf\u00BA\u00C3L\u00CE\u00EC\u00AB\u00F9M\u008BRK\x1F+i\u00AB\u008F[{\u00AC\u008Bl\u00DCmEm\u00DF\u00D8\u00B5\u00D9gm\u00B3s\u00E0r\u0098ultJp\u00D6sA]\u00EE\u00BA\u0096\u00BBy\u00BB\u008B\u00B8/z\\\u00F2L\u00F2\u00D2\u00F3F\u00BD\u0087|J\u00B7\u00BB\u00EC\u00E0\u00DA\u00F1\u00D4\u00B7\u00DAo\u0087\u00BF\u00A0\u00FF\u00B3\u0080\u00E3\u0081;\u0082\x04\u0082&\u0083+C\u00DCC\u00D9C\u00EF\u0087\x15\u0087[D@\u00C4\u00B5\u00C8\u00E4(\u0095\u00A8\u0095\u00E8\u00FA\u0098\u00C0X\u0081\u00D8\u00C7q\x07i\u00DB\u00E2I\u00F17\u00E8\u00E9\tj\t+\u0089g\u0092|\u0093\u00B9\u0093\u00EF\u00A7\u00ECM5J]OkN\u008F\u00C8\x10\u00C9x\u00BA\u00F3\u00D0.\u00D7L\u00DE\u00CC\u0085\u00DD\x1DY\u0087\u00B2\u00D3rB\u00F7l\u00CF\u00F5\u00CA\u00F3\u00C9\x0F\u00D9\u009BT\u0090WXQt\u00B6\u00B8m\u00DF\u00E0\u00FE\u00F1\u0092\u0085\u00D2\u00CFe\u00B8r\u00F6\u0083b\u0087\u0094\x0F\u00EBV\u0098\x1D\u00B1\u00A9t:\u00EAU\x15X\x1Dwl\u00F7\u00F1\u0083'.\u00D4\f\u009F|_+Y\u0097vz\u00F4\u00ACt}\u00E6\u00B9\u0089\u00F3\n\u008D\u00B9\x17\u00A6.\u00A94\x154?o\u00D1\u00BCR|\u00F5E\u009BZ\u00FB\u00DE\u008E\u00E9.\u00B5kE\u00D7\u00E7z\u00F4{+\u00FB\u00BE\u00F4\u00BB\u00DEl\x1D\u0090\x1E<}Gah`8\u00EA/\u0089\u0091\u0095\u00D1\u00DBc\u0097\x1F5L4?\u00B91\u00F9\u00EC\x19\u00BCP\u009E\u00AD\x7F\u0099\u00BFX\u00F4\u00BA\u00FD\x1D\u00F3\u0087\u00825\u009E\u00F5\u00D6\r\u008F\u00CDM\u0080\u00DFoK\x00\x00\x04M\u00803\u00F3\x00\u00EE\u00A7\x00\u009C|\x00\u00EA\u00E5\x01$\u00AB\x01\u00988\x00\x1C\u00A9\x00\u00AE:\u0080\u009A\u0096\x02\u00F2\u00F4( V\u0097\u00FE9?\u00A8 \r\u0096\x10\n{\u00E1\x1C\f\u00C1\x1B\u0084\tQA\u00DC\u0090t\u00E48r\x1D\u0099B6PA\u00D4\b\rD\u00F3\u00D1\u00F3\u00E8}\u00F43\u008E\x1Fg\u0082\x0B\u00C7\x1D\u00C0u\u00E2\u00E60FL\x03\u00F3\u00C7\u00F6a\x1D\u00D8K<\x1B\u00DE\b\x1F\u008B?\u0085\x1F'0\x10L\b\u00A9\u0084\x16\u00C2\nQ\u0086\x18F\u00AC'.\u0093\x14II\u00A4^2#\u00D9\u009B|\u0081\x01a\u00F0dhadb\u008Ce\x1C\u00A3hSNRIT:\u00F59\u0093\rS'\u00B3\fs\x15\x0B\u0095%\u009B\u00E5+k\x1C\u00EB\x12[\x10\u00DB\x0B\u00F6@\u00F6E\u008E\x18\u008E/\u009C\u00D9\\L\\\u00C7\u00B9\u0095\u00B8o\u00F2\u00F8\u00F0\u00AC\u00F1\u0096\u00F1\u00A9\u00F0=\u00E4O\x11\x10\x14\x18\x15\u00DC+d*\f\u00C27D\u00F2D\u00ED\u00C5x\u00C5\u0096\u00C4\u00AFI\u0094IFJYJK\u00CAPd\u00D6d\u00E7\u00E4\u00C6\u00E4om\u00E9R\u00B8\u00A2\u00D8\u00AC\u00D4\u00A4\u00DC\u00A2\u00D2\u00A1\u00DA\u00A76\u00AC\u00FE\\\u00E3\u0083\x16\u00A6\u00CD\u00A9#\u00AE\u00AB\u00A0\u00A7\u00A2\u00AFl g(b\u00C4f\u008C\x1A\u00BF7\u00992\u00ED5\u00AB5/\u00B0\u0088\u00B3\u00F4\u00B42\u00DD\u00AAd-d\u00C3l\u008B\u00B3]\u00B7[\u00B5\x7F\u00BDm\u00C1a\u00CEq\u00D6\u00E9\u00A5\u00F3\x1B\u0097O\u00AE?\u00DD\u00C9\x1E\u00DC\u009E\u00D2^:\u00DE\u00F6>A\u00DB3v\x1C\u00F6m\u00F6\x1B\u00F1\x7F\x1B\u00C8\x14\u00A4\x16\u00EC\x15\u00B2;\u00B4.l |>\u00E2g\x14[\u00B4h\u008C\\\u00ACb\u009C\x02M6^\u008C\u00CE\u0095@N\u00F8\u009E\u00B8\u009C\u00CC\u0097b\u009F\u009A\u009B\u00D6\u009B\u00FEk\u00A7\u00C5\u00AE\u0083\u0099o\u00B2\u00EC\u00B3\u00AF\u00EDQ\u00CF\u00ED\u00CC\u00B7\u00DE;_\u00B8\u00B7Xt\u00DF\u00A5\x12\u00E3\u00D2\u0099\u00B2\u00B2\u0083\u009E\u0087\r\u008EX\x1FM\u00A9\x1E8\u00C1\x7F\u0092\u00A9\x16\u00AD\u00FBv\u00E6c\u00FD\u00BB\u0086\u0095\u00C6\u0095\u008B\u00EF\u009B\u00D6.\u00FF\u00BCJj\u00E3\u00EFP\u00EA2\u00BF\u00EE\u00D5\x13\u00D1\u0097\u00DC\u009Fy+kp\u00D7\u009D\u00E4\u00BB\u00D1\u00F7\u00FCG\u008AG;\u00C6^\u008F\u008B>\u00DE\u00F1\u00B4f\u00EA\u00D5s\u0095\u0099\u00EC\u00B9\u00F1\x05\u00F9\u00C5\u0082\u00E5\u00C5\x15\u00ABw\u00E7?\u00B0|\u00CAX{\u00BB\x1E\u00FA}\u00F1'ms\x13\x00\u0098A\x11\u009C \t\u00AA\u00A0\x17^\"\u008C\u0088*\u00E2\u0083\u00E4\"\r\u00C80\u00F2\x1E\u00E5@uQ\x7F\u00B4\x00mF\u009F\u00E2p8\x05\u009C\x17.\x0Fw\x19\u00F7\x02\u00A3b\u00FAX\x14V\u008D\u00FD\u0085\u00FD\u00C2\u00AB\u00E0\u0083\u00F1\u00C7\u00F0\u00E3\x04f\u0082\x1D\u00A1\u0090p\u0087\u00C8@\u00B4'\u0096\x13'I\u0092$:\u00A9\u009F\u00CCE\u008E&\x0F2\u00883\u00E40,0\u00DA0vQ\u00E4)5TN\u00EA>&\x02S\x0E30g\u00B3\u00E0X\nX\u0099X\u008F\u00B0\u0089\u00B15\u00B1\x1B\u00B3\u008Fs\u00C4p\x128k\u00B9L\u00B8\u00E6\u00B8\u00F3y\x14x&x\u00B3\u00F9\u0094\u00F9f\u00F8\x0F\nl\x15\u00C4\x04\u00FB\u0085\u00F6\b[\u008APD&Dk\u00C5\x12\u00C4-%\u0084$\u00D6%'\u00A4\u00DA\u00A5O\u00CA\x1C\u0091-\u0093+\u0091/\u00D9R\u00AEP\u00A5xV\u00A9U\u00F9\u008E\u00CAs\u00D5\u00AF\u00EA\u009C\x1A\u00BA\u009AAZ%\u00DA\u00DD:\u00EF\u00F5$\u00F5\u00FD\f\u00AA\r\u00A7\u008C\u0085L\u0082M\u009B\u00CC~XXX\x16[\r[\u00E3m\u00B4l\x03\u00ED\u00F2\u00ED\u00CFn\u00BB\u00E10\u00E9\u00B8\u00EA\u008C\u00B9p\u00B9\u00CA\u00B9\x19\u00BB{y$x\u0096z]\u00F2\x1E\u00F1\u00F9\u00B0\u0083\u00CB\u00D7\u00C0/\u00D4\u00BF,\u00A0'\u00F0]\u00B0x\u0088ghi\u00D8`\u00F8\u00CFH\u00F5\u00A8\u0088\u00E8\x131\x0F\u00E2P\u009Aj\u00BC?\u00BD$\u00E1Z\u00E2R2s\u008AV\u00AA\x7FZqzG\u00C6\u00E2.\u00EEL\u00EB\u00DD\u00BB\u00B2Z\u00B2_\u00EF\x11\u00CF\u00DD\u0091W\u0095\u00FF\u00A4\u0080\u00BB\u00D0\u00AB\u00E8D\u00F1\u00CB\u00FD\n%\u00A9\u00A5\u0083e<\u00E5q\x07\u00EF\x1DV\u00AE\u00A8\u00AEd:ZXM9v\u00F8\u0084t\u00CD\u00EDS\x11u\u0094\u00D3-g\u00BD\u00CFa\r\u00CD\u008D~\x17Y.\u00DDlNmQ\u00BA\u00B2\u00D4Z\u00DF\x1E\u00D1\u00A9\u00D0\u00F5\u00F1zWON\u009F]?\u00F7\u00CD\u00F9\u0081\u00E6\u00DB;\u0087l\u0086y\u00EF\u008D\u008E\u00B8\u00DD\u009F\x7F\u0090\u00FEP\u00E8\u00D1\u00C8D\u00F1\x13\u0097I\u00A9i\u00E4\u00D9\u00DC\u008B\u00C1\u00D9\u00C6\u00F9\u00D2\x05\u00FA\u00A2\u00CB2\u00FF\u00EB\u009A\x15\u00E9\u00B7\u0097\u00DF\x1B\u00AE\u008E|\u00F4\u00FB\u00F4~-\u00EB+\u00F3\u00FA\u00D1\u00EFB?j~\u00F2\u00FD*\u00DD\u00DC\x04\x00n0\x01\x1A\u00D4\u00C0}\u00D8DT\u0091P\u00E4(2\u0080|B\u00C5Pg4\x17mGWp\u00A28O\u00DC\x01\u00DC\x10\u0086\u00C3\f\u00B1t\u00AC\x1D[\u00C3k\u00E0\u0093\u00F1\u00DD\x04<\u00C1\u0081PMxM\u00D4#\x1E .\u0091\u00CCI\u00A7\u00C9$2\u008D<\u00CD`\u00C7\u00D0\u00C7\u00A8\u00C5\u00D8E1\u00A5\u00DC\u00A3zQ_3e2s27\u00B38\u00B0|`\u00AD`3d[f?\u00CE\u00E1\u00C2I\u00E5\u00BC\u00CBU\u00C8m\u00C7\u00C3\u00C63\u00C9{\u0086\u008F\u00CEo\"\u00C0.\u00F0FpP\u00E8\u00B4p\u00BEH\u0094\u00A8\u00AB\u0098\u0089\u00B8\u00AA\u0084\u00B4\u00A4\u00B0\x14\u00BF4\u009F\u008C\u0088\u00AC\u00BC\u009C\u008E\u00BC\u00ED\u0096\x00\u0085\u009D\u008AUJ\u00DD\u00CA/U\u0099\u00D4\u00F4\u00D5\u00E9\x1A\u00974\u00DFkk\u00E8d\u00EB\u008E\u00E9\u00CB\x18\u00E4\x1A\u00BE2\u00B63i7\u00937?m)jUg-k\u00D3jgn\u00FF\u00C4\u0081\u00E6Dqnv\u00F5q'{t{%\u00FB\u00A8o_\u00F7\u00ED\u00F3\u00DF\x1F\u00E8\x1B\u00AC\x19J\t{\x1AQ\x15e\x1D\u00BD\x1C\u009B\x16\u00B7\x11\u009FH_HtL\u00BA\u0092\u00C2\u009AJO{\u0094\u00A1\u00BB\u00F3T&\u00E3\u00EE\u00D4\u00AC\u00C5\x1C\u00CF=\u00F7\u00F2L\u00F3\u00BB\n\u00D4\x0B\u00DB\u008A\r\u00F6\r\u0095x\u0095\u00BE)\u00CB<\u00C8z\u00A8\u00B6B\u00E9H\u00E7Q\u00C3\u00AA\u00DEc\u00FA\u00C7\u00DBj\u00F0'\u00EDN\x1D\u00AE}qZ\u00EEL\u00CA\u00D9\u0081s\u009C\r\u00A1\u00E7\u00BB.0]\f\u00BEt\u00BD\u0099\u00F32\u00ADe\u00F8\u00AALkQ\u00DB\u00DB\x0E\u00A7\u00CE\u00F6kB\u00D7\u00F3\u00BB\u00DF\u00F5z\u00F4\u00DD\u00E8\u0097\u00BFy\u00F8\u00D6\u00E6`\u00E4\u00EDGC\u00C6w\x1B\u00EFq\u00FD\u00950rw\u0094\u00FFA\u00F8\u00D8\u0085\u0087\u00AF\u00C7\u00C5'<\x1E\u00E7<9\u00F7\u00F4\u00EE\u00E4\u00C2\u00D4\u00C63\u0096\u00E7\u00C2/\u00E4g4fu\u00E7\f\u00E7\u008D_\x1A/\x18\u00BE\u00D2]\u00D4ZRY\u0096{-\u00F6\u0086\u00E9\u00CD\u00F2J\u00E7\u00DB\u0094w\x1A\u00EFV\u00DE\u009FY\u00F5\u00FA\u00C0\u00F0\u00E1\u00FA\u00C7\u00D0O,\u009F:>o_\u0083\u00B5\u00DA/\u00A6_\u00E6\u00BE\u00EE^\x17X\u00EF\u00FC\u00E6\u00F6m\u00F5\u00FB\u00BE\x1F\u00D2?\u00FA7|7\u00D6\x7F\x1E\u00FC\u00A5\u00F4kh3xs\x13 !TM\x15\x00\x00\x10\u008A)\x00\u00FE\u00F9\u00E6\u00E6')\x00b9\u00C0\u00CF\u00B2\u00CD\u00CD\x1F\u00B5\u009B\u009B?\u00EB\x00p\u00D3\x00}\u00D1\u00BF\u00FF+\x00\x00\b,\x00\u00C7\u00EA\u00FE\u00B77\u00D2\u00FF\x00\x1E\u00E1~\u0097\u00DA\u00DF0\u00FA\x00\x00\x00 cHRM\x00\x00m\u0098\x00\x00s\u008E\x00\x00\u00FA\u00CC\x00\x00\u0084\u00FA\x00\x00y\u0081\x00\x00\u00FD\x13\x00\x000m\x00\x00\x12)\r\x1E&N\x00\x00\x02\x1CIDATx\u00DA\u00B4U1\u008E\u00EA0\x10}\u008E\u00E3D\"(U$\x10\x15BJ.AAA\x0B\x17\u00A0\u00E4\x02\bq\t\x1A8\x02\x05\x14\u00B4\x14 *\nn\u0081\u0094\u0086\n\u009ATQ\u0082Pb\u00C7\u00BFX%\x100\u00BB[\u00FC\u00B5d\u008D%\u00CF\u008C\u00DF\u00BC\u00BC\u0099\x10\u00CF\u00F3$\u00FEh\u00E9\x000\u0099L \u00E5\u00FF}c>\u009F\x7F%\u00E7\u009C\u00E3z\u00BD*\u009D\b!\u0090R\u0082\x10\u00A2\u00BC\u00CF\u00EF\u009E\u00C1\u00D5\u00EB\u00F5\x07r\u00CE9\u00B2,\u00FB\x16\u00C9v\u00BB-\u00CE\u00BD^\u00EF[_!\u00C4#y\u0096e?\u00D22\u009B\u00CD\u008A\u00F3z\u00BDF\u00ADVSV\u0091\u00E7+\u0092\x0B!\u00C09\x7F+\u00FDp8\u00E0v\u00BBa:\u009Db4\x1A\u0095\u00F8\x1C\u008F\u00C7\u00A8T*\u00E8v\u00BB\x1F\u0091\x13\u00CF\u00F3\u00E4p8D\x10\x04oN\u00AE\u00EB\u00A2\u00D9l\x16\u00CE\u00CF\u008BR\u008A\u00F3\u00F9\f\u00DF\u00F7\u00DF\u00F8w\x1C\x07\u008B\u00C5\u00E2\x0B\u00B9\u0094\u00F2\u008D\u00F3~\u00BF\u008F(\u008Ap\u00BF\u00DF\u00954\u00A5i\u008AF\u00A3\u0081V\u00AB\u0085\u00FD~_z \u00A7\u00A7\u00F8\u00A0\u00AF\u00E86\u009B\rl\u00DBVV\u0094/\u00C7q\x10\u0086\u00E1\u009B\u00B2J\x1FT\b\u00A1TK\u00BB\u00DD\u0086\u00EF\u00FB\u00B0,\x0Bq\x1C\x17\u00B6Z\u00AD\"\u008A\"\u00B8\u00AE\u008B\u00DDn\u00A7\u00AC\n\x00\u00B4g\u00B5\u00BC\u00EE,\u00CB\x10\u00C71\x1C\u00C7)Y\u00DB\u00B6\x11E\x11\u0084\x10\u00CA\u0098\u009C\x16\u00EDY\u00E7\u00AF\u009Bs\u008E0\f!\u00A5D\x10\x04H\u0092\x04\u0097\u00CB\x05\x00p:\u009D@\b)|\u0085\x10\x05\x03%Z8\u00E7E)\u00AA\u00F2t]\x07!\x04\u0086a\u0094\u00F4\u00FC).I\u00922\u00E7\u009F\u009A\u00C84MPJ\u00C1\x18\u0083\u0094\x12\u00A6i\u00821\x06\u00C6\x18\u00D24U\u00C6\u0095\u009A(I\x12p\u00CE\u0095N\u0086a\u0080R\n\u00C30\u00A0\u00EB:\x18c\u0085%\u0084\u0094\u00E2r\u009D\u0097\u0090\u00A7i\u00AALn\u009A&\b!\u00A0\u0094\x16V\u00D34PJA)\u0085\u00AE\u00EB\u00CA\u00B8\u009C*\u00E2y\u009E\u00ECt:\u0088\u00E3XI\u00CB`0P\u00CFj]\u00C7j\u00B5RNE\u00CB\u00B2p<\x1E\u00DF\u009B\u00E8\u00D5y\u00B9\\\x16\u00ED\u00AE\x1A\x03\u00AF#YJ\u00F9\x10B\u00CE9\u00A5\u00F4\u00C7\u00F9\u00ADi\u00DA\u00AF\u00E6y\u00CE9\u00F9\u00CB\u00DF\u00DC\u00BF\x01\x005\u00D3\u008B\u00B4\u00FFr\u00C6\u00B0\x00\x00\x00\x00IEND\u00AEB`\u0082" ;
        this.w.res1.gr1.gr1.gr1.up.image = this.w.res1.gr1.gr2.gr1.up.image = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x17\x00\x00\x00\x14\b\x06\x00\x00\x00f\u00BE\u00A6\x0E\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x17OiCCPPhotoshop ICC profile\x00\x00x\u00DA\u00D5yiX\u008D]\u00D8\u00F6u\u00DF\u00FB\u00DES\u00ED\u00DD<\u00CF\u00F3\u00A8y\u009E\u00E7\u00D2\u00A4y\u00A6y\x1Ew\u00BB\u00B9H\u00A5\u00D2@)$\u0085($\u00A1D#\r\u00A2H\u009E$\n\x15\x1A\u00A4\"d\u0088\x10\u00BD?x\u009E\u00E7\x1D\u00BE\u00F7\u00C7w\x1C\u00DF\u009F\u00EF\u00FC\u00B1\u008E\u00F38\u00AFk\u009D\u00D7u\u00FDZ\u00C7Z\x0B\u0080w%\u0080F\u008BFY\x00bb\x13\u00E9\u00CEV\u00A6\"\u009E^\u00DE\"\u00C4) \u00820p\u0083\x06\u00C8\x05\x04%\u00D0L\x1C\x1D\u00ED\u00E0\x7F\u00C5\u0097\t@\x00\x00\x1E*\x04\u00D0h\u00D1\u00F0\x7F\x07\u00D6\u00E0\u0090\u0084 \x00\u00C4\x11\x00\x02\u0083\x13\u0082b\x00\u0090\u00AB\x00\u00A8i\x10\u008D\u009E\b\u0080[\x07\u0080\u00D1\u0094DZ\"\x00v\x07\x008\u00E8\u009E^\u00DE\x00\u00D84\x00p\u0084\u00FD\u00E6\u00AB\x00\u00C0\x11\u00E8\u00E9\u00E5\r\u0080\u00C7\x00\u0080\u0083\u00EE\u00EAl\x06\u0080\u00E7\x01 Q\x02\x02\u00E8a\x00T\t\x00\x10I\x0E\nK\x04\u00A0\u009A\x03\x10\u00D8b\u0083#b\x01\u00D8=\x01\b\u0086A\u00E1\x01\u00C1\x00\u00BC\u0095\x00\u00B0%&&.\x18\u0080\u00F7\x16\x00\u00C8\x04\u00FE'\u009F\u00B0\u00FF\u00E2\x19\u00F8\u008Fg@@\u00D8?\u00FC\u00F7,\x00\x00@2\u008FH\u00A0E\x07\u00A4\u00C1\u00FFk\u00C4D'\u00FD]\u0083\r\x00(\u00B1\u00D1\u00DB\u00EC\x00\u0080\x0B\x00\u0096\u0082\x03\u00CCm\x01@\x00\x00~\u00D1\u00A2\x1D\u00ED~\u00E7 |!\u00B1n.\x7F\u00F8\u0096\u00D8\u00C0m\x0E\x7F\u00B8a(\u00DD\u00D2\u00F9\u00F7^\u00C4\u0091\u0096h\u00EA\f\x00<\x00H(-\u00D1\u00D1\u00F5\u008F\u009E\u0099\x1En\u00B6\r\x00(\x00\u00C8\u00A1\u0090\x04\u008B\u00BF}NF\x06\u00D88\x02\x00\x13\x00\u00D2BOrv\x03\x00\t\x00\u00A4/!\u00D9\u00C5\x02\x00X\x00\u0090\u0097\u00E9\u00E1\u00AE\x1E\x7Fr>\x07\u0087\u0098\u00FF\u00D1Q44\u00C2\u00D2\u00FA\x0Fg\u008BH\u00B4v\x05\x00\x0E\x00T,*\u00CE\u00D6\u00F9w-T\x13l!\x1AB \t\u00E8\x10\x02\u00B1\u00A0\x00v`\x06\u00E6\x7FV\x05\b\u0085\x00\u00A0C2\u0084@\x02D\u00C1+\u00A0C\f\u00D8B\x1CDC\x1C\u00D0A\u00E4O\u009E\u00D9\u00FFP,!\x00\u00E8\x10\x06!\u00FF\u00CDQ\x04\u0082 \x0E\u0092\u00FE\u00A9\u00F9\u00B7\u00FA\u00AFC\x04\x04C\u00DC?z\u00C0\u009F\x18\x1DB \u00C1/\"\u00E7\u00DF\n\u00FF\u00D9/\x1A\u00E2\u0080\u00AE\u00DC\u00A8\u00BC\u00AC\u00BC\u00F1w\x1C\u0093\u00C2T1\r\u00CC\x143\u00C0\f1\x1D\x10\u00C1\u00B80>P\u00C0\u00D41m\u00CC\x043\u00C2\u00F40\rL\x07,\u00E1%\u00D0!\u00EC\u00EF\x1E\u00FD\"r\u00E81-\u00A1\u00C9\u0095qi\u00BA\u00EE\u00E1\x7Ff\b\u00FCg\x02wx\tt\u0088\u00F8?N\u00F4\u00A7\u00F7\u0091\u0095\u00F6\u0095\x7F:\u0084\u00C4\u0090\u00D4D\x00\x00\u00B38Z\x1A=\",<Q\u00C4\u0084F\u008B\x0E\u00D9\"b\x1D\x1B\u00A4\u00B8EDUYE\x05\u00FE\x7F\u0082\u00A7\u0097\u00B7\u00C8o\u00F6\u00C9\x19\x10\x00@\u00B8\u00EE\u00FF\u00AB\u00C5\u00A9\x00\u00E8\x04\x01 {\u00FE\u00D5\u00FC\u00DF\x01\u00B4G\x02\u0090\u00D8\u00FE\u00D5\u00A4\u00DA\x01\u0098U\x01\u0086\u008E\x04%\u00D1\u0093\x7Fk\x18\x00\x00\x1E\x18\u0080\x198\u0080\x17\u0084@\x1Cd@\x01TA\x13\u00F4\u00C0\x18,\u00C0\x06\x1C\u00C0\x15\u00BC\u00C0\x17\u0082 \x1Cb\u0080\x0E)\u00B0\x13\u00B2!\x1F\u008A\u00E1\x00\x1C\u0086*\u00A8\u0081:8\x07\x17\u00A1\x05\u00DA\u00E1:\u00DC\u0080A\x18\u0086Q\x18\u0087)\u0098\u0081\x05x\x03\u00AB\u00F0\x05~ \bBD\u00A8\b;\u00C2\u008B\b#\u0092\u0088<\u00A2\u008Ah#\u0086\u0088\x05b\u00878#^\u0088?\x12\u0086\u00C4\"I\u00C8Nd\x0FR\u008C\u0094#U\u00C8)\u00A4\x01\u00B9\u008Ct\"7\u0090!\u00E4\x01\u00F2\x14\u0099E\u0096\u0091\u008F\u00C8w\x14\u0087RP\x0ET\x10\u0095B\u0095Pm\u00D4\x04\u00B5E]\u00D1\x1Dh\x18\x1A\u008F\u00A6\u00A3\u00B9h\tZ\u0089\u00D6\u00A2\x17\u00D06\u00F4\x06:\u008C\u008E\u00A33\u00E8\x1Bt\r\x078F\x1C\x17N\x14\u00A7\u0080\u00D3\u00C6\u0099\u00E1\x1Cp\u00DE\u00B8P\x1C\x1D\u0097\u0089+\u00C2U\u00E0jq\u0097p]\u00B8\u00DB\u00B8\u0087\u00B8\x19\u00DC\n\u00EE\x1BF\u00C0\u00D81\x11L\x01\u00D3\u00C3\u00B6bnX\x10\x16\u008Feb\u00FB\u00B0*\u00EC\x1C\u00D6\u0086\u00DD\u00C2\x1Eb\u00B3\u00D8*\u00F6\x0BO\u00C5\x0B\u00E0\u00E5\u00F1\u00BAxk\u00BC'>\f\u009F\u0082\u00CF\u00C7W\u00E0\u00CF\u00E2[\u00F1\x03\u00F8q\u00FC\x02\u00FE\x0B\u0081@\u00E0\"H\x13\u00B4\b[\t^\u0084HB\x06a\x1F\u00E18\u00A1\u0089\u00D0Gx@\u0098'\u00AC\x11\u0089D^\u00A2<\u00D1\u0080\u00E8@\f &\x12\u00F3\u0089G\u0089\x17\u0088\u00BD\u00C41\u00E2\x02q\u009D\u00C4H\x12&\u00A9\u0092,I\u00DE\u00A4XR\x0E\u00A9\u0082t\u009E\u00D4C\x1A#-\u0092~\u0090Y\u00C8\u0092d]\u00B2\x039\u0098\u009CF.%\u009F&w\u0091\u00EF\u0093\x17\u00C8?\x18X\x19\u00A4\x19\f\x18\\\x19\"\x19\u00B2\x19*\x19.1\f0L3|bdd\x14c\u00D4atb\u008C`\u00CCb\u00ACdlf\u00BC\u00C38\u00CB\u00F8\u008D\u00C2F\u0091\u00A3\u0098Q\u00B6S\u0092(%\u0094zJ\x1F\u00E5)\u00E5\x13\u0095J\u0095\u00A2\x1AS\u00BD\u00A9\u0089\u00D4\x12j\x03\u00F5&\u00F59u\u009D\u0089\u009DI\u0091\u00C9\u009A)\u0098i7S5S\x1B\u00D3\x18\u00D3;f2\u00B3$\u00B3\t\u00B3/s:s\x05\u00F3\x15\u00E6\u00FB\u00CC+,d\x16)\x163\u0096\x00\u0096L\u0096j\u0096N\u0096\u00C7,k\u00AC\u00EC\u00AC*\u00AC\x0E\u00AC1\u00AC\u00FBX\u00CF\u00B3\x0E\u00B1.\u00B1\x11\u00D9\u00A4\u00D8,\u00D8\u0082\u00D9r\u00D9\u00EA\u00D8n\u00B2\u00CD\u00B3\u00E3\u00D8\u00C5\u00D9\u00CD\u00D8\u0083\u00D8\u00F7\u00B0\u009Ff\x1F`_\u00E0 pHsXsDr\x14s\\\u00E4\x18\u00E1X\u00E5d\u00E3T\u00E7t\u00E7L\u00E5\u00AC\u00E6\u00EC\u00E6\u009C\u00E1\u00C2qIqYsEs\u0095r\u00B5pMp}\u00E7\x16\u00E46\u00E1\x0E\u00E1.\u00E4\u00BE\u00C4=\u00C6\u00FD\u0095\u0087\u009F\u00C7\u0098'\u0084\u00A7\u0088\u00A7\u0089g\u009C\u00E7;\u00AF\b\u00AF\x05o\x14o\x19o;\u00EF3>\u008CO\u008E\u00CF\u0089/\u0085\u00EF\x04\u00DF\x00\u00DF\n?\x07\u00BF\x1E\x7F\x10\x7F\x11\x7F\x0B\u00FF\u00A4\x00* '\u00E0,\u0090!P'pO`MPH\u00D0J\u0090&xT\u00F0\u00A6\u00E0\u008A\x10\u0097\u0090\u00B1P\u00A4\u00D0!\u00A1\x1E\u00A1eavaC\u00E1\b\u00E1C\u00C2\u00BD\u00C2\u00AFE8ELD\u00A2E*En\u0089\u00AC\u008A\n\u0088n\x15M\x12=%:\"\u00FACLZ\u00CCM,G\u00ACI\u00EC\u00998\u0083\u00B8\u00B6x\u00A8\u00F8!\u00F1~\u00F1U\ta\t{\u0089\u009D\x12\u008D\x12\u0093\u0092dIm\u00C9p\u00C9#\u0092\u00B7%\u00BFJIKyH\u00ED\u0095j\u0097Z\u0092\u00E6\u0091\u00B6\u0096N\u0097n\u0094\u009E\u0096\u00A1\u00CA\x18\u00C9\u00C4\u00CB\u00D4\u00CA<\u0092%\u00C8j\u00CBF\u00C9\x1E\u0097\x1D\u0095C\u00E54\u00E4\u00C2\u00E5\u00AA\u00E5\u00EE\u00CB\u00A3\u00F2\u009A\u00F2\x11\u00F2\u00C7\u00E5\x1Fl\u00C1o\u00D1\u00D9\x12\u00BB\u00A5v\u00CBc\x05\u008A\u0082\u0089B\u00B2B\u00A3\u00C2\u00AC\"\u0097\u00A2\u009Db\u008Eb\u00BB\u00E2;%\t%o\u00A52\u00A5\u00DBJ\u00BF\u00945\u0094\u00A3\u0095O+O\u00A9\u00B0\u00A9\u00D8\u00A8\u00E4\u00A8t\u00A9|T\u0095S\rR\u00ADV}\u00A4FU\u00B3T\u00DB\u00AD\u00D6\u00A1\u00F6A]^=D\u00FD\u0084\u00FA\x13\rv\r{\u008D\u00BD\x1A\u00FD\x1A?5\u00B54\u00E9\u009A\u00974\u0097\u00B5$\u00B4\u00FC\u00B5\u008Ei=\u00D6\u00E6\u00D0v\u00D4\u00DE\u00A7}G\x07\u00AFc\u00AA\u00B3[\u00E7\u00BA\u00CE7]M\u00DDD\u00DD\x16\u00DD\u00F7z\nzQz\u00E7\u00F5\u0096\u00F4\u00A5\u00F5C\u00F4O\u00EB\u00CF\x1B\u0088\x19\x04\x18\u009C2\u00981\x141\u00F47<i8c$j\x14`Tk4g,n\x1Cl|\u00D6x\u00D1D\u00D6$\u00D2\u00E4\u0082\u00C9;SeS\u00BAi\u00AB\u00E9W3]\u00B3]f}\u00E68s+\u00F3\"\u00F3\x11\x0B6\x0B7\u008B*\u008B\u00E7\u0096b\u0096a\u0096\u008D\u0096\u00ABV\x1AV\x19V}[\u00F1[m\u00B7\u0096m}l-h\x1Dd\u00DD`\u00BDj\u00A3e\u00B3\u00CB\u00E6\u0096-\u00C5\u00D6\u00C5\u00B6\u00CAv\u00CEN\u00CE\u008En\u00D7e\u008F\u00DA\u00DB\u00D8\x1F\u00B4\u009F\u00DE&\u00B9-v[\u00BB\x038X;\x1Ctx\u00E6(\u00ED\x18\u00EFx\u00CD\u0089\u00E0\u00E4\u00E8T\u00ED\u00F4\u00CAY\u00C5y\u00A7\u00F3m\x17v\x17?\u0097\u00F3._\\M]K]\u00A7\u00DCd\u00DC\u0092\u00DC\u00FA\u00DD\u0099\u00DD\u00B7\u00BB7\u00B8\x7F\u00F50\u00F7(\u00F7\u0098\u00F1T\u00F2\u00DC\u00E59\u00EC\u00C5\u00E7\x15\u00E1\u00D5\u00E1M\u00F4v\u00F7>\u00EB\u00BD\u00E6c\u00E1s\u00D8ga\u00BB\u00C6\u00F6\u00FC\u00ED\x13;\u00A4w\u00A4\u00EE\x18\u00F2\u00E5\u00F3\u008D\u00F6\u00ED\u00F6c\u00F6\x0B\u00F0\u00BB\u00E2\u008F\u00F7\u00F7\u00F0?\u00EF\u00BF\x11\u00E0\x10P\x1B\u00B0\x16h\x1Dx,p5\u00C8,\u00E8H\u00D0\u009B`\u00E3\u00E0C\u00C1\u00CB!\x06!\u00E5!\u008B\u00A1\x06\u00A1\u00E5\u00A1Ka\x06a\x07\u00C3\u0096\u00C3\u008D\u00C2+\u00C2W\"\u00CC\"\u00AA\">Dn\u008D\u00AC\u0089\u00FC\x1A\u00E5\x10U\x1F\u00B5\x19\u00ED\x11\u00DD\x14C\u008A\u00F1\u008F\u00E9\u008Ce\u008B\u008D\u008A\u00BD\x15'\x14\u0097\x1A\u00F7\u0080&O\u00CB\u00A7\u00CD\u00C4\u00EB\u00C6\x1F\u008E_\u00A5\u00DB\u00D2\u00CF& \t;\x12:\x129\x12i\u0089\u00F7\u0092d\u0092\u00F2\u0092f\u0093\r\u0093\u00AB\u0093\u00D7S\u00DCS\u00AE\u00A4\u00B2\u00A6\u00C6\u00A6\u00DEK\u0093K+L[L\u00B7L?\u0093\u0081e\x04e\u00F4\u00EF\x14\u00DD\u0099\u00BDsv\u0097\u00C9\u00AES\u0099Hf`f\u00FFn\u00F1\u00DD\u00B9\u00BB\x17\u00B2\u00AC\u00B2\u00CEe3dGe\u00FF\u0095\u00A3\u009CS\u009E\u00F3y\u008F\u00C7\u009E\u00AE\\\u00C1\u00DC\u00AC\u00DC\u00F9<\u00AB\u00BC\u00C6|\u00A6|z\u00FE\u00E3\u00BDz{k\n\u00B0\u0082\u0088\u0082\u0091B\u00B5\u00C2\u00A3\u0085\u00BF\u008A\u0082\u008B\u00EE\x16+\x17W\x14o\u00EC\x0B\u00DAww\u00BF\u00CA\u00FE\u00CA\u00FD\u009B%\u00A1%#\u00A5\u009A\u00A5'\x0E\x10\x0E\u00C4\x1E\u0098(3*;W\u00CEZ\u009E^>\x7F\u00D0\u00FE`\u00DB!\u0091CE\u0087>\x1F\u00F6;<T\u00A1^Qs\u0084\u00E1H\u00D2\u0091\u0099J\u00BB\u00CA\u008E\u00A3\x12G\x0F\x1C\u00DD\u00A8\n\u00AF\x1A\u00AF6\u00ADn:&p\u00AC\u00F0\u00D8\u00D7\u00E3\u00C1\u00C7\u00C7N\x18\u009F\u00B8T#XS\\\u00F3\u00FDd\u00C4\u00C9'\u00A7\u00ACN\u00B5\u00D5J\u00D5V\u00D4\x11\u00EA\u0092\u00EB^\u009Dv?}\u00FB\u008C\u00F6\u0099\u0086\u00B3|g\u008B\u00CF\u00FE\u00AC\u008F\u00AD\u009F9\u00E7|\u00EEV\u0083VC\u00C3y\u0081\u00F3\u00A5\u008DhcR\u00E3\u00F2\u0085\u00ED\x17F/\u009A_\u00EC\u00B8\u00A4p\u00E9T\x13WSq34'5\u00BF\u00BE\u00EC\x7Fy\u00A2\u00C5\u00B6\u00A5\u00FF\u008A\u00F6\u0095KW%\u00AF\x1Ekeo-jC\u00DA\u00D2\u00DAV\u00DB\u00C3\u00DBg:\u00BC:\x1Et\u00DAt\u00F6w\u00E9u\u00B5^S\u00BCV\x7F]\u00F4zu7gwi\x0FCOn\u00CFfoz\u00EFZ\x1F\u00ADo\u00E5F\u00D8\u008D\u00F9~\u00BF\u00FE\u00A9\u009B\u009E7\x1F\u00DDr\u00BA52`;pg\u00D0r\u00F0\u00E6m\u0093\u00DB\u00BDw\f\u00EE\\\x1F\u00D2\x1D\u00EA\u00BC\u00AB}\u00B7}Xs\u00B8\u00ED\u009E\u00C6\u00BD\u00D6\u00BF4\u00FEj\x1D\u00D1\x1Ci\u00BB\u00AFu\u00BFcTg\u00B4\u00EB\u0081\u00FE\u0083\u009E1\u00A3\u00B1\x1B\x0F\u00CD\x1F\x0E>\u00B2~4<\u00BEm\u00FC\u00C1\u0084\u00DB\u00C4\u0093\u00C7\u00DB\x1F\u00CF<\t~\u00B2\u00F44\u00FA\u00E9\u0087\u00C9\u00E4\u00C9\x1FSY\u00D3\u00F8\u00E9\u00A2g,\u00CF*\u009E\x0B<\u00AF}!\u00FB\u00A2iFs\u00A6{\u00D6|\u00F6\u00DE\u009C\u00CB\u00DC\u00D4|\u00D0\u00FC\u009B\u0097\t/7\x16r_Q_U,\n/6,\u00A9.]_\u00B6\\\x1E}\u00ED\u00F3z\u00E1\r\u00ED\u00CD\u008F\u0095\u00FC\u00B7\u00ACo\u008F\u00BD\u0093yw\u00F5\u00BD\u00F1\u00FB{\u00AB\u009E\u00AB\x0B\x1F\u00E8\x1F6?\u00EE\u00FB\u00C4\u00FB\u00A9\u00FE\u00B3\u00FA\u00E7\u00FE5\u00C7\u00B5\u00E7_b\u00BE\u00FC\u00F8Z\u00B4\u00CE\u00BB~\u00EE\u009B\u00F6\u00B7\u00DB\u00DF=\u00BE/\u00FEH\u00D9 nT\u00FE\u0094\u00FD\u00D9\u00F5\u00CB\u00F6\u00D7\u00F4f\u00CC\u00E6&-\u0080\x1E\x00\x00\x008\x00@CC\x01>\u00D6\x03P\u00BD\x00\u00D8G\x01\x18\u0098~\u00DF)\u00FE\x00\u0087\x00\u00A0\x00@\x04!\u00B0\u0081b\u0098G\u00E4\u0090X\u00A4\x0F\u00E5E\x13\u00D1I\u009C5\u00EE&f\u0085=\u00C2\u00C7\x10X\t\u00FD\u00C4\u009D$C2\u0091\u00FC\u008C\u00A1\u0093\u00F1\x18\u00A5\u0094Z\u00CF4\u00CD\u00C2\u00C2j\u00CBV\u00C8>\u00C4\u00C9\u00CA\u00B5\u009D\u00FB\x02/\u00C6\x17\u00C0\u00DF-(\"\u00B4Ox]4XlRb\u009B\u00E4\u0090\u00B4\u0092L\u0089\u00EC\x1By\u00EB-5\n_\u0094\u00CC\u0094\u00F7\u00AB\u008C\u00AAQ\u00D5M5\x124\u008Fi\u00F5i\u00CF\u00E8\u00FC\u00D4\u00E3\u00D6\u00977\u00D01\u00B40r6\x0E2I0\u00CD5;b\u00DEh\u00D1k\u00F9\u00D0jy\u00EB\u00A6\r\u00A7\u00ED\x16;3{\u009Fm\x11\x0E\u00C9\u008EyN\u00E5\u00CE5.\u008D\u00AE\u00EDn\u00FD\u00EE\u00C3\x1Ec\u009EO\u00BD^x\u00CF\u00FB,m\x7F\u00BBc\u00C9w\u00DAo\u00C4\u00BF7\u00A0)\u00F0D\u00D0\u00FE\u00E0\u00F4\u0090\u00D0P\u00A70\u00BDp\u0089\b\u00A6\u0088/\u0091/\u00A2\x06\u00A3\x1Bb\u00F6\u00C7\u00D2\u00E2\\hZ\u00F1|\u00F1\x1B\u00F4\u00E7\t}\u0089uIy\u00C9\u00A1)\u00D6\u00A9\u00F2i\fi\u00AF\u00D3\u00EFe4\u00EF\u00AC\u00DC\u0095\u009B\u0099\u00B2;>\u008B\u009E\u009D\u009ES\u00B4\u00E7Tnw\u00DE\u008B\u00BD\u00E4\x02\u00FDBZQ]\u00F1\u00C4~\u0086\x12\u00FD\u00D2\u0098\x03'\u00CAF\u00CA\x7F\x1E\u00DAr\u00D8\u00A7\u00A2\u00E8H[\u00E5L\x15c\u00B5\u00C61\u00BF\u00E3\u0085'Zj\u00A6Na\u00B5\nu\u00EE\u00A7w\u009F9w\u00F6A\u00FDz\u0083\u00C8y\u00BB\u00C6\u009D\x17Z.~h\u00D2m.\u00BD\u00FC\u00FE\u008A\u00CF\u00D5\u00FBm\x0E\u00ED\u008F:\u00F5\u00BB\x12\u00AF5\\\u009F\u00EEa\u00ECU\u00EBs\u00BF\x11\u00DF\u009Fw\u00B3\u00ECV\u00C5@\u00C5`\u00D9\u00ED\u0082;{\u0086\u00F6\u00DE\u00DD?\u00BC\u00FF^\u00DE_\u0089#\x1E\u00F7\x15\u00EF\u00FF\x18\u00ED{\u00901\u00A69\u00F6\u00E5\u00E1\u00E3G\u009D\u00E3U\x13\u00BB\x1E\u00FB=1}*9I\u009E|;\u00F5`\u00BA\u00F5Y\u00D5\u00F3]/\u00FCg\u00CCge\u00E7X\u00E6\u00BE\u00CD\u00BFz9\u00B10\u00F4\u00EA\u00C6\u00E2\u00B5\u00A5\u00CE\u00E5\u00CE\u00D7g\u00DE\u0094\u00AC$\u00BF\u00F5}g\u00F1^~\u0095eu\u00ED\u00C3\u00E4\u00C7\u009EO\u00A7>\u00E7\u00AD\u0085\x7F\u00B1\u00FD\u00AA\u00B4\u00CE\u00BE\u00FE\u00F5\u00DB\u00F4\u00F7\u00BE\x1F\u00B5\x1B\u00B9?C~\u0099o\u008Amn\x02\x00\x01\u00F8\u00C0\x18Ra\x00aG\u00EC\u0090\x03\u00C8\x0BT\r-A?\u00E1\u00FCp\x13\u0098\x1B\u00F6\fO#0\x11\u00DA\u0089!$>\u00D2$\u00F9\x18C\x18\u00A3)\u00C5\u0080\u00EA\u00CA\x14\u00CE\u009C\u00C5r\u0092\u00F5\x06\u00DB2\x07'\u00A79W\x1Aw\x13\u00CF{>E~\u00BA\u00C0u!Faw\u0091\u00F3\u00A2\u009B\u00E2&\x12\u00D9\u0092\u00BDR\x1B2Z\u00B2\u0091r\u00C7\u00E5\u0087\u00B7|T\u00E4TRS\u00DE\u00AA\u00E2\u00A3\x1A\u00A6\x16\u00AF\u009E\u00A6\u00B1K3]+R\u00DBG\u00C7N\u00D7@OY_\u00CC\u0080\u00D3\u0090d\u00F8\u00DD\u00E8\u00AD\u00F1\u00AC\u00C9\u00B8\u00E9]\u00B3\x1E\u00F3+\x16\u00F5\u0096\u0095V\x05[S\u00AC\u00C3m\u00BCl\u00B7\u00DAi\u00DBKo\u00E3t\u00C0\x1C>;\u00CE9=p\u00EEsiv=\u00E1V\u00E0\u009E\u00E0\u00E1\u00EBi\u00ED\u00A5\u00E6-\u00E8C\u00F0y\u00B7}bG\u00B7o\u009D_\u0091\x7F\\\u0080k\u00A0z\x10%h.\u00B83\u00A4444L?\u009C5\u00FCU\u00C4\u00B5\u00C8\u00B2\u00A8\u0090h\u00DD\x18\u00E6\u0098\u00F9\u00D8\u00F6\u00B8\x02\u009AW\u00BC|\u00FC\x06}$\u00E1d\"=\u00C9,\u00993y1\u00A53u_\u009Ao\u00BAr\x06\u009A\u00F1xg\u00D3\u00AE\u00E2\u00CC\u0098\u00DDnY\u00E6\u00D9\u00BA9:{\fr\u00B7\u00E6y\u00E6\u00C7\u00EE\u00DD[p\u00A6\u00F0f\u00D1l\u00F1\u00AF\u00FD\x02%:\u00A5\u00EE\x07\x12\u00CA\x0E\u0094_88t\u00E8U\x05zD\u00A0R\u00F3\u00A8SULu\u00F1\u00B1\x0B\u00C7GO|9)v\u00CA\u00B1vO]\u00E7\u00E9\x0Fg\x15\u00EB\u00E3\u00CF]m\u00F8\u00DA\u00A8sa\u00E7\u00C5\u009E&h6\u00B9\u00BC\u00A7e\u00E0*\u00BE\u00D5\u00AA\u00AD\u00A0\u00FDv'\u00B1\u00CB\u00E2Z\u00CE\u00F5\u00EE\u00EE\u00CF\u00BDR}.72\u00FAO\u00DC\u00BCvk|`y\u00F0\u00EB\x1Dl\u0088\u00FD\u00AE\u00E8\u00B0\u00D2=\u0083\u00BF\u00ECF\u00BC\u00EF\u0087\u008F\u00A6<\u00C8\x1F;\u00FC\u00B0\u00F6Q\u00D3\u00F8\u00F5\u0089\u00A1\u00C7\x13O\x16\u009E~\u009E\u00C2Ms<\u0093|\u00AE\u00FD\u00C2n&l\u00B6nn\u00F9\u00A5\u00F4\u0082\u00F7\u00AB\u00FC\u00C5\u00F3K\u00B7\u0097g_\u00AF\u00AF0\u00BD\u0095|g\u00F4\u00DEg5\u00EB\u00C3\u00E8'\u00B5\u00CF\x07\u00D7>}u^\u00BF\u00FA\u009D\u00E7G\u00DE\u00C6\u00FA\u00AF\u0094\u00CDM\x00\u00C0\u0080\x15\u00E4`\x1BdA\x1FBDt\u0091D\u00A4\x1DEQ{\u00F4$\u00FA\x03\u00E7\u008B\u00BB\u008B\u00E9cmxm|?\u00C1\u00910O\u00CC \u00F1\u0093n\u0093\u00F73\x041\u00EAS\u00F8)\u00BF\u00A8sL\u00C3\u00CC\u00AD,gX+\u00D9J\u00D8\x0B8\u00F28\u00F3\u00B9\u008A\u00B9\x0F\u00F2\u00D4\u00F06\u00F2u\u00F0w\x0Bt\x0B\u00F6\b\u00F5\n\u00F7\u0088\\\x13m\x15k\x14?.Q,\u0099$\u00B5]\u00DAXFL\x16d\u00A7\u00E4\u00DA\u00E5\u008B\u00B7\u00B8+\u0088(\u00BCVlU\u00CAR\u00B6U\u00E1R\u0099UmTKR7\u00D2 k<\u00D4<\u00AE\x15\u00AE\u00AD\u00AE\u00BD\u00AE\u00D3\u00A3\u009B\u00A7g\u00AB\u00CF\u00A6?iPk\x18i\u00A4j\u00B4a<hRf\u00BA\u00C3L\u00CE\u00EC\u00AB\u00F9M\u008BRK\x1F+i\u00AB\u008F[{\u00AC\u008Bl\u00DCmEm\u00DF\u00D8\u00B5\u00D9gm\u00B3s\u00E0r\u0098ultJp\u00D6sA]\u00EE\u00BA\u0096\u00BBy\u00BB\u008B\u00B8/z\\\u00F2L\u00F2\u00D2\u00F3F\u00BD\u0087|J\u00B7\u00BB\u00EC\u00E0\u00DA\u00F1\u00D4\u00B7\u00DAo\u0087\u00BF\u00A0\u00FF\u00B3\u0080\u00E3\u0081;\u0082\x04\u0082&\u0083+C\u00DCC\u00D9C\u00EF\u0087\x15\u0087[D@\u00C4\u00B5\u00C8\u00E4(\u0095\u00A8\u0095\u00E8\u00FA\u0098\u00C0X\u0081\u00D8\u00C7q\x07i\u00DB\u00E2I\u00F17\u00E8\u00E9\tj\t+\u0089g\u0092|\u0093\u00B9\u0093\u00EF\u00A7\u00ECM5J]OkN\u008F\u00C8\x10\u00C9x\u00BA\u00F3\u00D0.\u00D7L\u00DE\u00CC\u0085\u00DD\x1DY\u0087\u00B2\u00D3rB\u00F7l\u00CF\u00F5\u00CA\u00F3\u00C9\x0F\u00D9\u009BT\u0090WXQt\u00B6\u00B8m\u00DF\u00E0\u00FE\u00F1\u0092\u0085\u00D2\u00CFe\u00B8r\u00F6\u0083b\u0087\u0094\x0F\u00EBV\u0098\x1D\u00B1\u00A9t:\u00EAU\x15X\x1Dwl\u00F7\u00F1\u0083'.\u00D4\f\u009F|_+Y\u0097vz\u00F4\u00ACt}\u00E6\u00B9\u0089\u00F3\n\u008D\u00B9\x17\u00A6.\u00A94\x154?o\u00D1\u00BCR|\u00F5E\u009BZ\u00FB\u00DE\u008E\u00E9.\u00B5kE\u00D7\u00E7z\u00F4{+\u00FB\u00BE\u00F4\u00BB\u00DEl\x1D\u0090\x1E<}Gah`8\u00EA/\u0089\u0091\u0095\u00D1\u00DBc\u0097\x1F5L4?\u00B91\u00F9\u00EC\x19\u00BCP\u009E\u00AD\x7F\u0099\u00BFX\u00F4\u00BA\u00FD\x1D\u00F3\u0087\u00825\u009E\u00F5\u00D6\r\u008F\u00CDM\u0080\u00DFoK\x00\x00\x04M\u00803\u00F3\x00\u00EE\u00A7\x00\u009C|\x00\u00EA\u00E5\x01$\u00AB\x01\u00988\x00\x1C\u00A9\x00\u00AE:\u0080\u009A\u0096\x02\u00F2\u00F4( V\u0097\u00FE9?\u00A8 \r\u0096\x10\n{\u00E1\x1C\f\u00C1\x1B\u0084\tQA\u00DC\u0090t\u00E48r\x1D\u0099B6PA\u00D4\b\rD\u00F3\u00D1\u00F3\u00E8}\u00F43\u008E\x1Fg\u0082\x0B\u00C7\x1D\u00C0u\u00E2\u00E60FL\x03\u00F3\u00C7\u00F6a\x1D\u00D8K<\x1B\u00DE\b\x1F\u008B?\u0085\x1F'0\x10L\b\u00A9\u0084\x16\u00C2\nQ\u0086\x18F\u00AC'.\u0093\x14II\u00A4^2#\u00D9\u009B|\u0081\x01a\u00F0dhadb\u008Ce\x1C\u00A3hSNRIT:\u00F59\u0093\rS'\u00B3\fs\x15\x0B\u0095%\u009B\u00E5+k\x1C\u00EB\x12[\x10\u00DB\x0B\u00F6@\u00F6E\u008E\x18\u008E/\u009C\u00D9\\L\\\u00C7\u00B9\u0095\u00B8o\u00F2\u00F8\u00F0\u00AC\u00F1\u0096\u00F1\u00A9\u00F0=\u00E4O\x11\x10\x14\x18\x15\u00DC+d*\f\u00C27D\u00F2D\u00ED\u00C5x\u00C5\u0096\u00C4\u00AFI\u0094IFJYJK\u00CAPd\u00D6d\u00E7\u00E4\u00C6\u00E4om\u00E9R\u00B8\u00A2\u00D8\u00AC\u00D4\u00A4\u00DC\u00A2\u00D2\u00A1\u00DA\u00A76\u00AC\u00FE\\\u00E3\u0083\x16\u00A6\u00CD\u00A9#\u00AE\u00AB\u00A0\u00A7\u00A2\u00AFl g(b\u00C4f\u008C\x1A\u00BF7\u00992\u00ED5\u00AB5/\u00B0\u0088\u00B3\u00F4\u00B42\u00DD\u00AAd-d\u00C3l\u008B\u00B3]\u00B7[\u00B5\x7F\u00BDm\u00C1a\u00CEq\u00D6\u00E9\u00A5\u00F3\x1B\u0097O\u00AE?\u00DD\u00C9\x1E\u00DC\u009E\u00D2^:\u00DE\u00F6>A\u00DB3v\x1C\u00F6m\u00F6\x1B\u00F1\x7F\x1B\u00C8\x14\u00A4\x16\u00EC\x15\u00B2;\u00B4.l |>\u00E2g\x14[\u00B4h\u008C\\\u00ACb\u009C\x02M6^\u008C\u00CE\u0095@N\u00F8\u009E\u00B8\u009C\u00CC\u0097b\u009F\u009A\u009B\u00D6\u009B\u00FEk\u00A7\u00C5\u00AE\u0083\u0099o\u00B2\u00EC\u00B3\u00AF\u00EDQ\u00CF\u00ED\u00CC\u00B7\u00DE;_\u00B8\u00B7Xt\u00DF\u00A5\x12\u00E3\u00D2\u0099\u00B2\u00B2\u0083\u009E\u0087\r\u008EX\x1FM\u00A9\x1E8\u00C1\x7F\u0092\u00A9\x16\u00AD\u00FBv\u00E6c\u00FD\u00BB\u0086\u0095\u00C6\u0095\u008B\u00EF\u009B\u00D6.\u00FF\u00BCJj\u00E3\u00EFP\u00EA2\u00BF\u00EE\u00D5\x13\u00D1\u0097\u00DC\u009Fy+kp\u00D7\u009D\u00E4\u00BB\u00D1\u00F7\u00FCG\u008AG;\u00C6^\u008F\u008B>\u00DE\u00F1\u00B4f\u00EA\u00D5s\u0095\u0099\u00EC\u00B9\u00F1\x05\u00F9\u00C5\u0082\u00E5\u00C5\x15\u00ABw\u00E7?\u00B0|\u00CAX{\u00BB\x1E\u00FA}\u00F1'ms\x13\x00\u0098A\x11\u009C \t\u00AA\u00A0\x17^\"\u008C\u0088*\u00E2\u0083\u00E4\"\r\u00C80\u00F2\x1E\u00E5@uQ\x7F\u00B4\x00mF\u009F\u00E2p8\x05\u009C\x17.\x0Fw\x19\u00F7\x02\u00A3b\u00FAX\x14V\u008D\u00FD\u0085\u00FD\u00C2\u00AB\u00E0\u0083\u00F1\u00C7\u00F0\u00E3\x04f\u0082\x1D\u00A1\u0090p\u0087\u00C8@\u00B4'\u0096\x13'I\u0092$:\u00A9\u009F\u00CCE\u008E&\x0F2\u00883\u00E40,0\u00DA0vQ\u00E4)5TN\u00EA>&\x02S\x0E30g\u00B3\u00E0X\nX\u0099X\u008F\u00B0\u0089\u00B15\u00B1\x1B\u00B3\u008Fs\u00C4p\x128k\u00B9L\u00B8\u00E6\u00B8\u00F3y\x14x&x\u00B3\u00F9\u0094\u00F9f\u00F8\x0F\nl\x15\u00C4\x04\u00FB\u0085\u00F6\b[\u008APD&Dk\u00C5\x12\u00C4-%\u0084$\u00D6%'\u00A4\u00DA\u00A5O\u00CA\x1C\u0091-\u0093+\u0091/\u00D9R\u00AEP\u00A5xV\u00A9U\u00F9\u008E\u00CAs\u00D5\u00AF\u00EA\u009C\x1A\u00BA\u009AAZ%\u00DA\u00DD:\u00EF\u00F5$\u00F5\u00FD\f\u00AA\r\u00A7\u008C\u0085L\u0082M\u009B\u00CC~XXX\x16[\r[\u00E3m\u00B4l\x03\u00ED\u00F2\u00ED\u00CFn\u00BB\u00E10\u00E9\u00B8\u00EA\u008C\u00B9p\u00B9\u00CA\u00B9\x19\u00BB{y$x\u0096z]\u00F2\x1E\u00F1\u00F9\u00B0\u0083\u00CB\u00D7\u00C0/\u00D4\u00BF,\u00A0'\u00F0]\u00B0x\u0088ghi\u00D8`\u00F8\u00CFH\u00F5\u00A8\u0088\u00E8\x131\x0F\u00E2P\u009Aj\u00BC?\u00BD$\u00E1Z\u00E2R2s\u008AV\u00AA\x7FZqzG\u00C6\u00E2.\u00EEL\u00EB\u00DD\u00BB\u00B2Z\u00B2_\u00EF\x11\u00CF\u00DD\u0091W\u0095\u00FF\u00A4\u0080\u00BB\u00D0\u00AB\u00E8D\u00F1\u00CB\u00FD\n%\u00A9\u00A5\u0083e<\u00E5q\x07\u00EF\x1DV\u00AE\u00A8\u00AEd:ZXM9v\u00F8\u0084t\u00CD\u00EDS\x11u\u0094\u00D3-g\u00BD\u00CFa\r\u00CD\u008D~\x17Y.\u00DDlNmQ\u00BA\u00B2\u00D4Z\u00DF\x1E\u00D1\u00A9\u00D0\u00F5\u00F1zWON\u009F]?\u00F7\u00CD\u00F9\u0081\u00E6\u00DB;\u0087l\u0086y\u00EF\u008D\u008E\u00B8\u00DD\u009F\x7F\u0090\u00FEP\u00E8\u00D1\u00C8D\u00F1\x13\u0097I\u00A9i\u00E4\u00D9\u00DC\u008B\u00C1\u00D9\u00C6\u00F9\u00D2\x05\u00FA\u00A2\u00CB2\u00FF\u00EB\u009A\x15\u00E9\u00B7\u0097\u00DF\x1B\u00AE\u008E|\u00F4\u00FB\u00F4~-\u00EB+\u00F3\u00FA\u00D1\u00EFB?j~\u00F2\u00FD*\u00DD\u00DC\x04\x00n0\x01\x1A\u00D4\u00C0}\u00D8DT\u0091P\u00E4(2\u0080|B\u00C5Pg4\x17mGWp\u00A28O\u00DC\x01\u00DC\x10\u0086\u00C3\f\u00B1t\u00AC\x1D[\u00C3k\u00E0\u0093\u00F1\u00DD\x04<\u00C1\u0081PMxM\u00D4#\x1E .\u0091\u00CCI\u00A7\u00C9$2\u008D<\u00CD`\u00C7\u00D0\u00C7\u00A8\u00C5\u00D8E1\u00A5\u00DC\u00A3zQ_3e2s27\u00B38\u00B0|`\u00AD`3d[f?\u00CE\u00E1\u00C2I\u00E5\u00BC\u00CBU\u00C8m\u00C7\u00C3\u00C63\u00C9{\u0086\u008F\u00CEo\"\u00C0.\u00F0FpP\u00E8\u00B4p\u00BEH\u0094\u00A8\u00AB\u0098\u0089\u00B8\u00AA\u0084\u00B4\u00A4\u00B0\x14\u00BF4\u009F\u008C\u0088\u00AC\u00BC\u009C\u008E\u00BC\u00ED\u0096\x00\u0085\u009D\u008AUJ\u00DD\u00CA/U\u0099\u00D4\u00F4\u00D5\u00E9\x1A\u00974\u00DFkk\u00E8d\u00EB\u008E\u00E9\u00CB\x18\u00E4\x1A\u00BE2\u00B63i7\u00937?m)jUg-k\u00D3jgn\u00FF\u00C4\u0081\u00E6Dqnv\u00F5q'{t{%\u00FB\u00A8o_\u00F7\u00ED\u00F3\u00DF\x1F\u00E8\x1B\u00AC\x19J\t{\x1AQ\x15e\x1D\u00BD\x1C\u009B\x16\u00B7\x11\u009FH_HtL\u00BA\u0092\u00C2\u009AJO{\u0094\u00A1\u00BB\u00F3T&\u00E3\u00EE\u00D4\u00AC\u00C5\x1C\u00CF=\u00F7\u00F2L\u00F3\u00BB\n\u00D4\x0B\u00DB\u008A\r\u00F6\r\u0095x\u0095\u00BE)\u00CB<\u00C8z\u00A8\u00B6B\u00E9H\u00E7Q\u00C3\u00AA\u00DEc\u00FA\u00C7\u00DBj\u00F0'\u00EDN\x1D\u00AE}qZ\u00EEL\u00CA\u00D9\u0081s\u009C\r\u00A1\u00E7\u00BB.0]\f\u00BEt\u00BD\u0099\u00F32\u00ADe\u00F8\u00AALkQ\u00DB\u00DB\x0E\u00A7\u00CE\u00F6kB\u00D7\u00F3\u00BB\u00DF\u00F5z\u00F4\u00DD\u00E8\u0097\u00BFy\u00F8\u00D6\u00E6`\u00E4\u00EDGC\u00C6w\x1B\u00EFq\u00FD\u00950rw\u0094\u00FFA\u00F8\u00D8\u0085\u0087\u00AF\u00C7\u00C5'<\x1E\u00E7<9\u00F7\u00F4\u00EE\u00E4\u00C2\u00D4\u00C63\u0096\u00E7\u00C2/\u00E4g4fu\u00E7\f\u00E7\u008D_\x1A/\x18\u00BE\u00D2]\u00D4ZRY\u0096{-\u00F6\u0086\u00E9\u00CD\u00F2J\u00E7\u00DB\u0094w\x1A\u00EFV\u00DE\u009FY\u00F5\u00FA\u00C0\u00F0\u00E1\u00FA\u00C7\u00D0O,\u009F:>o_\u0083\u00B5\u00DA/\u00A6_\u00E6\u00BE\u00EE^\x17X\u00EF\u00FC\u00E6\u00F6m\u00F5\u00FB\u00BE\x1F\u00D2?\u00FA7|7\u00D6\x7F\x1E\u00FC\u00A5\u00F4kh3xs\x13 !TM\x15\x00\x00\x10\u008A)\x00\u00FE\u00F9\u00E6\u00E6')\x00b9\u00C0\u00CF\u00B2\u00CD\u00CD\x1F\u00B5\u009B\u009B?\u00EB\x00p\u00D3\x00}\u00D1\u00BF\u00FF+\x00\x00\b,\x00\u00C7\u00EA\u00FE\u00B77\u00D2\u00FF\x00\x1E\u00E1~\u0097\u00DA\u00DF0\u00FA\x00\x00\x00 cHRM\x00\x00m\u0098\x00\x00s\u008E\x00\x00\u00FA\u00CC\x00\x00\u0084\u00FA\x00\x00y\u0081\x00\x00\u00FD\x13\x00\x000m\x00\x00\x12)\r\x1E&N\x00\x00\x01\u0087IDATx\u00DA\u00B4U1\u00AA\x021\x10}Q\u00B7\u00B0\u0090m\x15\x11;\x11\u00C1N\u00C5\u00CE\x03X\u00D8ZZ\u0089\u00BD\u00F7\u00F0\n\u009EC\u00B0\u00B4\u00B1\u00B2\u00F6\x00b\u00E1\r\u00B2\u0093\u00C9/>\u0093\u00DD\u00F8\u0093\u00FD\n:0\u00B00\u00937/og&\u00AA\u00D7\u00EBY|\u00C9j\x00\u00B0\u00DDna\u00EDgk\u00ECv\u00BB_p\"\u00C2\u00FD~\x0F&)\u00A5`\u00AD\u0085R*\x18\u0097X\u0091\\\u00B3\u00D9\u00CC\u0099\x13\x11\u0098\u00F9c\u00AC\u008D1983\x7FD\x16\u00C1\x10\u00A2\x15\u00A9DD0\u00C6D\u00BD\u00D5j\u00E1p8\u0094\u00E603\u0098\u00D91\u00AF\u0088,\u00D6Z\x17|\u00F64M1\x1A\u008D\u0090\u00A6).\u0097K4O\n\x10Q\x0E^\x06\u00CC\u00CC\x18\u008F\u00C7\x00\u0080\u00CDf\u0083\u00EB\u00F5\x1A\u00CD\x13\x1C\u0091\u00C71\u008F]\u00B5\u00D3\u00E9\u00A0^\u00AF\x03\x00\u00BA\u00DD.f\u00B3\x19\u00CE\u00E7sT\x16\u00F9\u00F64\u008F\u00B1\x19\x0E\u0087\u00DEO[\u00ADV\u00B8\u00DDn\u00A5\u00B2dY\u0096\u0083\u00CBU\u009E}0\x18 I\x12\x0F\u00BC\u00D1h`\u00B9\\\u00E2t:\x05\u00CF\x04e\t1\u00E9\u00F7\u00FB\u00C1\u0096[,\x16\u00AE\u00E5\u008A\u00AC\u008B\u00D2x\u00E0Y\u0096y>\u009DN\u00A3\u00FD\u009C$\t\u00D6\u00EB5\u008E\u00C7\u00A3\u00CB'\"\u00E7Z\u00EB|\u0088\u008C1\x7F\u0086\u00A8\u00DDn\u0097\x0E\u00CCd2\u00C1\u00E3\u00F1\b\x0E\u009F\fQ\r\x00\u00B4\u00D6\u00AE7\u00DF\u00B5\u00E29\u00D93\x1Es\u00B9V\u00D1\u00F6\u00FB\u00FD\u00BF\u00C0\u00F3\u00F9<HJ\u00BA\u00A5Vl\u00C5W\u00ECyK\u0086\u00B6\u00A2\u00B7\u00B8d\u0088b\u00C9\u00EF\x16\u00F3\u0098k\u00ADQ\u00ADV_\u00DA\u00DF\u00AF\u00ECs\u00D1\\}\u00F3\u0099\u00FB\x19\x00]\u00B1\x10\x05\u00B1y\u00FD\u0089\x00\x00\x00\x00IEND\u00AEB`\u0082" ;
        this.w.res1.gr1.gr1.gr1.down.image = this.w.res1.gr1.gr2.gr1.down.image =  "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x17\x00\x00\x00\x14\b\x06\x00\x00\x00f\u00BE\u00A6\x0E\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x17OiCCPPhotoshop ICC profile\x00\x00x\u00DA\u00D5yiX\u008D]\u00D8\u00F6u\u00DF\u00FB\u00DES\u00ED\u00DD<\u00CF\u00F3\u00A8y\u009E\u00E7\u00D2\u00A4y\u00A6y\x1Ew\u00BB\u00B9H\u00A5\u00D2@)$\u0085($\u00A1D#\r\u00A2H\u009E$\n\x15\x1A\u00A4\"d\u0088\x10\u00BD?x\u009E\u00E7\x1D\u00BE\u00F7\u00C7w\x1C\u00DF\u009F\u00EF\u00FC\u00B1\u008E\u00F38\u00AFk\u009D\u00D7u\u00FDZ\u00C7Z\x0B\u0080w%\u0080F\u008BFY\x00bb\x13\u00E9\u00CEV\u00A6\"\u009E^\u00DE\"\u00C4) \u00820p\u0083\x06\u00C8\x05\x04%\u00D0L\x1C\x1D\u00ED\u00E0\x7F\u00C5\u0097\t@\x00\x00\x1E*\x04\u00D0h\u00D1\u00F0\x7F\x07\u00D6\u00E0\u0090\u0084 \x00\u00C4\x11\x00\x02\u0083\x13\u0082b\x00\u0090\u00AB\x00\u00A8i\x10\u008D\u009E\b\u0080[\x07\u0080\u00D1\u0094DZ\"\x00v\x07\x008\u00E8\u009E^\u00DE\x00\u00D84\x00p\u0084\u00FD\u00E6\u00AB\x00\u00C0\x11\u00E8\u00E9\u00E5\r\u0080\u00C7\x00\u0080\u0083\u00EE\u00EAl\x06\u0080\u00E7\x01 Q\x02\x02\u00E8a\x00T\t\x00\x10I\x0E\nK\x04\u00A0\u009A\x03\x10\u00D8b\u0083#b\x01\u00D8=\x01\b\u0086A\u00E1\x01\u00C1\x00\u00BC\u0095\x00\u00B0%&&.\x18\u0080\u00F7\x16\x00\u00C8\x04\u00FE'\u009F\u00B0\u00FF\u00E2\x19\u00F8\u008Fg@@\u00D8?\u00FC\u00F7,\x00\x00@2\u008FH\u00A0E\x07\u00A4\u00C1\u00FFk\u00C4D'\u00FD]\u0083\r\x00(\u00B1\u00D1\u00DB\u00EC\x00\u0080\x0B\x00\u0096\u0082\x03\u00CCm\x01@\x00\x00~\u00D1\u00A2\x1D\u00ED~\u00E7 |!\u00B1n.\x7F\u00F8\u0096\u00D8\u00C0m\x0E\x7F\u00B8a(\u00DD\u00D2\u00F9\u00F7^\u00C4\u0091\u0096h\u00EA\f\x00<\x00H(-\u00D1\u00D1\u00F5\u008F\u009E\u0099\x1En\u00B6\r\x00(\x00\u00C8\u00A1\u0090\x04\u008B\u00BF}NF\x06\u00D88\x02\x00\x13\x00\u00D2BOrv\x03\x00\t\x00\u00A4/!\u00D9\u00C5\x02\x00X\x00\u0090\u0097\u00E9\u00E1\u00AE\x1E\x7Fr>\x07\u0087\u0098\u00FF\u00D1Q44\u00C2\u00D2\u00FA\x0Fg\u008BH\u00B4v\x05\x00\x0E\x00T,*\u00CE\u00D6\u00F9w-T\x13l!\x1AB \t\u00E8\x10\x02\u00B1\u00A0\x00v`\x06\u00E6\x7FV\x05\b\u0085\x00\u00A0C2\u0084@\x02D\u00C1+\u00A0C\f\u00D8B\x1CDC\x1C\u00D0A\u00E4O\u009E\u00D9\u00FFP,!\x00\u00E8\x10\x06!\u00FF\u00CDQ\x04\u0082 \x0E\u0092\u00FE\u00A9\u00F9\u00B7\u00FA\u00AFC\x04\x04C\u00DC?z\u00C0\u009F\x18\x1DB \u00C1/\"\u00E7\u00DF\n\u00FF\u00D9/\x1A\u00E2\u0080\u00AE\u00DC\u00A8\u00BC\u00AC\u00BC\u00F1w\x1C\u0093\u00C2T1\r\u00CC\x143\u00C0\f1\x1D\x10\u00C1\u00B80>P\u00C0\u00D41m\u00CC\x043\u00C2\u00F40\rL\x07,\u00E1%\u00D0!\u00EC\u00EF\x1E\u00FD\"r\u00E81-\u00A1\u00C9\u0095qi\u00BA\u00EE\u00E1\x7Ff\b\u00FCg\x02wx\tt\u0088\u00F8?N\u00F4\u00A7\u00F7\u0091\u0095\u00F6\u0095\x7F:\u0084\u00C4\u0090\u00D4D\x00\x00\u00B38Z\x1A=\",<Q\u00C4\u0084F\u008B\x0E\u00D9\"b\x1D\x1B\u00A4\u00B8EDUYE\x05\u00FE\x7F\u0082\u00A7\u0097\u00B7\u00C8o\u00F6\u00C9\x19\x10\x00@\u00B8\u00EE\u00FF\u00AB\u00C5\u00A9\x00\u00E8\x04\x01 {\u00FE\u00D5\u00FC\u00DF\x01\u00B4G\x02\u0090\u00D8\u00FE\u00D5\u00A4\u00DA\x01\u0098U\x01\u0086\u008E\x04%\u00D1\u0093\x7Fk\x18\x00\x00\x1E\x18\u0080\x198\u0080\x17\u0084@\x1Cd@\x01TA\x13\u00F4\u00C0\x18,\u00C0\x06\x1C\u00C0\x15\u00BC\u00C0\x17\u0082 \x1Cb\u0080\x0E)\u00B0\x13\u00B2!\x1F\u008A\u00E1\x00\x1C\u0086*\u00A8\u0081:8\x07\x17\u00A1\x05\u00DA\u00E1:\u00DC\u0080A\x18\u0086Q\x18\u0087)\u0098\u0081\x05x\x03\u00AB\u00F0\x05~ \bBD\u00A8\b;\u00C2\u008B\b#\u0092\u0088<\u00A2\u008Ah#\u0086\u0088\x05b\u00878#^\u0088?\x12\u0086\u00C4\"I\u00C8Nd\x0FR\u008C\u0094#U\u00C8)\u00A4\x01\u00B9\u008Ct\"7\u0090!\u00E4\x01\u00F2\x14\u0099E\u0096\u0091\u008F\u00C8w\x14\u0087RP\x0ET\x10\u0095B\u0095Pm\u00D4\x04\u00B5E]\u00D1\x1Dh\x18\x1A\u008F\u00A6\u00A3\u00B9h\tZ\u0089\u00D6\u00A2\x17\u00D06\u00F4\x06:\u008C\u008E\u00A33\u00E8\x1Bt\r\x078F\x1C\x17N\x14\u00A7\u0080\u00D3\u00C6\u0099\u00E1\x1Cp\u00DE\u00B8P\x1C\x1D\u0097\u0089+\u00C2U\u00E0jq\u0097p]\u00B8\u00DB\u00B8\u0087\u00B8\x19\u00DC\n\u00EE\x1BF\u00C0\u00D81\x11L\x01\u00D3\u00C3\u00B6bnX\x10\x16\u008Feb\u00FB\u00B0*\u00EC\x1C\u00D6\u0086\u00DD\u00C2\x1Eb\u00B3\u00D8*\u00F6\x0BO\u00C5\x0B\u00E0\u00E5\u00F1\u00BAxk\u00BC'>\f\u009F\u0082\u00CF\u00C7W\u00E0\u00CF\u00E2[\u00F1\x03\u00F8q\u00FC\x02\u00FE\x0B\u0081@\u00E0\"H\x13\u00B4\b[\t^\u0084HB\x06a\x1F\u00E18\u00A1\u0089\u00D0Gx@\u0098'\u00AC\x11\u0089D^\u00A2<\u00D1\u0080\u00E8@\f &\x12\u00F3\u0089G\u0089\x17\u0088\u00BD\u00C41\u00E2\x02q\u009D\u00C4H\x12&\u00A9\u0092,I\u00DE\u00A4XR\x0E\u00A9\u0082t\u009E\u00D4C\x1A#-\u0092~\u0090Y\u00C8\u0092d]\u00B2\x039\u0098\u009CF.%\u009F&w\u0091\u00EF\u0093\x17\u00C8?\x18X\x19\u00A4\x19\f\x18\\\x19\"\x19\u00B2\x19*\x19.1\f0L3|bdd\x14c\u00D4atb\u008C`\u00CCb\u00ACdlf\u00BC\u00C38\u00CB\u00F8\u008D\u00C2F\u0091\u00A3\u0098Q\u00B6S\u0092(%\u0094zJ\x1F\u00E5)\u00E5\x13\u0095J\u0095\u00A2\x1AS\u00BD\u00A9\u0089\u00D4\x12j\x03\u00F5&\u00F59u\u009D\u0089\u009DI\u0091\u00C9\u009A)\u0098i7S5S\x1B\u00D3\x18\u00D3;f2\u00B3$\u00B3\t\u00B3/s:s\x05\u00F3\x15\u00E6\u00FB\u00CC+,d\x16)\x163\u0096\x00\u0096L\u0096j\u0096N\u0096\u00C7,k\u00AC\u00EC\u00AC*\u00AC\x0E\u00AC1\u00AC\u00FBX\u00CF\u00B3\x0E\u00B1.\u00B1\x11\u00D9\u00A4\u00D8,\u00D8\u0082\u00D9r\u00D9\u00EA\u00D8n\u00B2\u00CD\u00B3\u00E3\u00D8\u00C5\u00D9\u00CD\u00D8\u0083\u00D8\u00F7\u00B0\u009Ff\x1F`_\u00E0 pHsXsDr\x14s\\\u00E4\x18\u00E1X\u00E5d\u00E3T\u00E7t\u00E7L\u00E5\u00AC\u00E6\u00EC\u00E6\u009C\u00E1\u00C2qIqYsEs\u0095r\u00B5pMp}\u00E7\x16\u00E46\u00E1\x0E\u00E1.\u00E4\u00BE\u00C4=\u00C6\u00FD\u0095\u0087\u009F\u00C7\u0098'\u0084\u00A7\u0088\u00A7\u0089g\u009C\u00E7;\u00AF\b\u00AF\x05o\x14o\x19o;\u00EF3>\u008CO\u008E\u00CF\u0089/\u0085\u00EF\x04\u00DF\x00\u00DF\n?\x07\u00BF\x1E\x7F\x10\x7F\x11\x7F\x0B\u00FF\u00A4\x00* '\u00E0,\u0090!P'pO`MPH\u00D0J\u0090&xT\u00F0\u00A6\u00E0\u008A\x10\u0097\u0090\u00B1P\u00A4\u00D0!\u00A1\x1E\u00A1eavaC\u00E1\b\u00E1C\u00C2\u00BD\u00C2\u00AFE8ELD\u00A2E*En\u0089\u00AC\u008A\n\u0088n\x15M\x12=%:\"\u00FACLZ\u00CCM,G\u00ACI\u00EC\u00998\u0083\u00B8\u00B6x\u00A8\u00F8!\u00F1~\u00F1U\ta\t{\u0089\u009D\x12\u008D\x12\u0093\u0092dIm\u00C9p\u00C9#\u0092\u00B7%\u00BFJIKyH\u00ED\u0095j\u0097Z\u0092\u00E6\u0091\u00B6\u0096N\u0097n\u0094\u009E\u0096\u00A1\u00CA\x18\u00C9\u00C4\u00CB\u00D4\u00CA<\u0092%\u00C8j\u00CBF\u00C9\x1E\u0097\x1D\u0095C\u00E54\u00E4\u00C2\u00E5\u00AA\u00E5\u00EE\u00CB\u00A3\u00F2\u009A\u00F2\x11\u00F2\u00C7\u00E5\x1Fl\u00C1o\u00D1\u00D9\x12\u00BB\u00A5v\u00CBc\x05\u008A\u0082\u0089B\u00B2B\u00A3\u00C2\u00AC\"\u0097\u00A2\u009Db\u008Eb\u00BB\u00E2;%\t%o\u00A52\u00A5\u00DBJ\u00BF\u00945\u0094\u00A3\u0095O+O\u00A9\u00B0\u00A9\u00D8\u00A8\u00E4\u00A8t\u00A9|T\u0095S\rR\u00ADV}\u00A4FU\u00B3T\u00DB\u00AD\u00D6\u00A1\u00F6A]^=D\u00FD\u0084\u00FA\x13\rv\r{\u008D\u00BD\x1A\u00FD\x1A?5\u00B54\u00E9\u009A\u00974\u0097\u00B5$\u00B4\u00FC\u00B5\u008Ei=\u00D6\u00E6\u00D0v\u00D4\u00DE\u00A7}G\x07\u00AFc\u00AA\u00B3[\u00E7\u00BA\u00CE7]M\u00DDD\u00DD\x16\u00DD\u00F7z\nzQz\u00E7\u00F5\u0096\u00F4\u00A5\u00F5C\u00F4O\u00EB\u00CF\x1B\u0088\x19\x04\x18\u009C2\u00981\x141\u00F47<i8c$j\x14`Tk4g,n\x1Cl|\u00D6x\u00D1D\u00D6$\u00D2\u00E4\u0082\u00C9;SeS\u00BAi\u00AB\u00E9W3]\u00B3]f}\u00E68s+\u00F3\"\u00F3\x11\x0B6\x0B7\u008B*\u008B\u00E7\u0096b\u0096a\u0096\u008D\u0096\u00ABV\x1AV\x19V}[\u00F1[m\u00B7\u0096m}l-h\x1Dd\u00DD`\u00BDj\u00A3e\u00B3\u00CB\u00E6\u0096-\u00C5\u00D6\u00C5\u00B6\u00CAv\u00CEN\u00CE\u008En\u00D7e\u008F\u00DA\u00DB\u00D8\x1F\u00B4\u009F\u00DE&\u00B9-v[\u00BB\x038X;\x1Ctx\u00E6(\u00ED\x18\u00EFx\u00CD\u0089\u00E0\u00E4\u00E8T\u00ED\u00F4\u00CAY\u00C5y\u00A7\u00F3m\x17v\x17?\u0097\u00F3._\\M]K]\u00A7\u00DCd\u00DC\u0092\u00DC\u00FA\u00DD\u0099\u00DD\u00B7\u00BB7\u00B8\x7F\u00F50\u00F7(\u00F7\u0098\u00F1T\u00F2\u00DC\u00E59\u00EC\u00C5\u00E7\x15\u00E1\u00D5\u00E1M\u00F4v\u00F7>\u00EB\u00BD\u00E6c\u00E1s\u00D8ga\u00BB\u00C6\u00F6\u00FC\u00ED\x13;\u00A4w\u00A4\u00EE\x18\u00F2\u00E5\u00F3\u008D\u00F6\u00ED\u00F6c\u00F6\x0B\u00F0\u00BB\u00E2\u008F\u00F7\u00F7\u00F0?\u00EF\u00BF\x11\u00E0\x10P\x1B\u00B0\x16h\x1Dx,p5\u00C8,\u00E8H\u00D0\u009B`\u00E3\u00E0C\u00C1\u00CB!\x06!\u00E5!\u008B\u00A1\x06\u00A1\u00E5\u00A1Ka\x06a\x07\u00C3\u0096\u00C3\u008D\u00C2+\u00C2W\"\u00CC\"\u00AA\">Dn\u008D\u00AC\u0089\u00FC\x1A\u00E5\x10U\x1F\u00B5\x19\u00ED\x11\u00DD\x14C\u008A\u00F1\u008F\u00E9\u008Ce\u008B\u008D\u008A\u00BD\x15'\x14\u0097\x1A\u00F7\u0080&O\u00CB\u00A7\u00CD\u00C4\u00EB\u00C6\x1F\u008E_\u00A5\u00DB\u00D2\u00CF& \t;\x12:\x129\x12i\u0089\u00F7\u0092d\u0092\u00F2\u0092f\u0093\r\u0093\u00AB\u0093\u00D7S\u00DCS\u00AE\u00A4\u00B2\u00A6\u00C6\u00A6\u00DEK\u0093K+L[L\u00B7L?\u0093\u0081e\x04e\u00F4\u00EF\x14\u00DD\u0099\u00BDsv\u0097\u00C9\u00AES\u0099Hf`f\u00FFn\u00F1\u00DD\u00B9\u00BB\x17\u00B2\u00AC\u00B2\u00CEe3dGe\u00FF\u0095\u00A3\u009CS\u009E\u00F3y\u008F\u00C7\u009E\u00AE\\\u00C1\u00DC\u00AC\u00DC\u00F9<\u00AB\u00BC\u00C6|\u00A6|z\u00FE\u00E3\u00BDz{k\n\u00B0\u0082\u0088\u0082\u0091B\u00B5\u00C2\u00A3\u0085\u00BF\u008A\u0082\u008B\u00EE\x16+\x17W\x14o\u00EC\x0B\u00DAww\u00BF\u00CA\u00FE\u00CA\u00FD\u009B%\u00A1%#\u00A5\u009A\u00A5'\x0E\x10\x0E\u00C4\x1E\u0098(3*;W\u00CEZ\u009E^>\x7F\u00D0\u00FE`\u00DB!\u0091CE\u0087>\x1F\u00F6;<T\u00A1^Qs\u0084\u00E1H\u00D2\u0091\u0099J\u00BB\u00CA\u008E\u00A3\x12G\x0F\x1C\u00DD\u00A8\n\u00AF\x1A\u00AF6\u00ADn:&p\u00AC\u00F0\u00D8\u00D7\u00E3\u00C1\u00C7\u00C7N\x18\u009F\u00B8T#XS\\\u00F3\u00FDd\u00C4\u00C9'\u00A7\u00ACN\u00B5\u00D5J\u00D5V\u00D4\x11\u00EA\u0092\u00EB^\u009Dv?}\u00FB\u008C\u00F6\u0099\u0086\u00B3|g\u008B\u00CF\u00FE\u00AC\u008F\u00AD\u009F9\u00E7|\u00EEV\u0083VC\u00C3y\u0081\u00F3\u00A5\u008DhcR\u00E3\u00F2\u0085\u00ED\x17F/\u009A_\u00EC\u00B8\u00A4p\u00E9T\x13WSq34'5\u00BF\u00BE\u00EC\x7Fy\u00A2\u00C5\u00B6\u00A5\u00FF\u008A\u00F6\u0095KW%\u00AF\x1Ekeo-jC\u00DA\u00D2\u00DAV\u00DB\u00C3\u00DBg:\u00BC:\x1Et\u00DAt\u00F6w\u00E9u\u00B5^S\u00BCV\x7F]\u00F4zu7gwi\x0FCOn\u00CFfoz\u00EFZ\x1F\u00ADo\u00E5F\u00D8\u008D\u00F9~\u00BF\u00FE\u00A9\u009B\u009E7\x1F\u00DDr\u00BA52`;pg\u00D0r\u00F0\u00E6m\u0093\u00DB\u00BDw\f\u00EE\\\x1F\u00D2\x1D\u00EA\u00BC\u00AB}\u00B7}Xs\u00B8\u00ED\u009E\u00C6\u00BD\u00D6\u00BF4\u00FEj\x1D\u00D1\x1Ci\u00BB\u00AFu\u00BFcTg\u00B4\u00EB\u0081\u00FE\u0083\u009E1\u00A3\u00B1\x1B\x0F\u00CD\x1F\x0E>\u00B2~4<\u00BEm\u00FC\u00C1\u0084\u00DB\u00C4\u0093\u00C7\u00DB\x1F\u00CF<\t~\u00B2\u00F44\u00FA\u00E9\u0087\u00C9\u00E4\u00C9\x1FSY\u00D3\u00F8\u00E9\u00A2g,\u00CF*\u009E\x0B<\u00AF}!\u00FB\u00A2iFs\u00A6{\u00D6|\u00F6\u00DE\u009C\u00CB\u00DC\u00D4|\u00D0\u00FC\u009B\u0097\t/7\x16r_Q_U,\n/6,\u00A9.]_\u00B6\\\x1E}\u00ED\u00F3z\u00E1\r\u00ED\u00CD\u008F\u0095\u00FC\u00B7\u00ACo\u008F\u00BD\u0093yw\u00F5\u00BD\u00F1\u00FB{\u00AB\u009E\u00AB\x0B\x1F\u00E8\x1F6?\u00EE\u00FB\u00C4\u00FB\u00A9\u00FE\u00B3\u00FA\u00E7\u00FE5\u00C7\u00B5\u00E7_b\u00BE\u00FC\u00F8Z\u00B4\u00CE\u00BB~\u00EE\u009B\u00F6\u00B7\u00DB\u00DF=\u00BE/\u00FEH\u00D9 nT\u00FE\u0094\u00FD\u00D9\u00F5\u00CB\u00F6\u00D7\u00F4f\u00CC\u00E6&-\u0080\x1E\x00\x00\x008\x00@CC\x01>\u00D6\x03P\u00BD\x00\u00D8G\x01\x18\u0098~\u00DF)\u00FE\x00\u0087\x00\u00A0\x00@\x04!\u00B0\u0081b\u0098G\u00E4\u0090X\u00A4\x0F\u00E5E\x13\u00D1I\u009C5\u00EE&f\u0085=\u00C2\u00C7\x10X\t\u00FD\u00C4\u009D$C2\u0091\u00FC\u008C\u00A1\u0093\u00F1\x18\u00A5\u0094Z\u00CF4\u00CD\u00C2\u00C2j\u00CBV\u00C8>\u00C4\u00C9\u00CA\u00B5\u009D\u00FB\x02/\u00C6\x17\u00C0\u00DF-(\"\u00B4Ox]4XlRb\u009B\u00E4\u0090\u00B4\u0092L\u0089\u00EC\x1By\u00EB-5\n_\u0094\u00CC\u0094\u00F7\u00AB\u008C\u00AAQ\u00D5M5\x124\u008Fi\u00F5i\u00CF\u00E8\u00FC\u00D4\u00E3\u00D6\u00977\u00D01\u00B40r6\x0E2I0\u00CD5;b\u00DEh\u00D1k\u00F9\u00D0jy\u00EB\u00A6\r\u00A7\u00ED\x16;3{\u009Fm\x11\x0E\u00C9\u008EyN\u00E5\u00CE5.\u008D\u00AE\u00EDn\u00FD\u00EE\u00C3\x1Ec\u009EO\u00BD^x\u00CF\u00FB,m\x7F\u00BBc\u00C9w\u00DAo\u00C4\u00BF7\u00A0)\u00F0D\u00D0\u00FE\u00E0\u00F4\u0090\u00D0P\u00A70\u00BDp\u0089\b\u00A6\u0088/\u0091/\u00A2\x06\u00A3\x1Bb\u00F6\u00C7\u00D2\u00E2\\hZ\u00F1|\u00F1\x1B\u00F4\u00E7\t}\u0089uIy\u00C9\u00A1)\u00D6\u00A9\u00F2i\fi\u00AF\u00D3\u00EFe4\u00EF\u00AC\u00DC\u0095\u009B\u0099\u00B2;>\u008B\u009E\u009D\u009ES\u00B4\u00E7Tnw\u00DE\u008B\u00BD\u00E4\x02\u00FDBZQ]\u00F1\u00C4~\u0086\x12\u00FD\u00D2\u0098\x03'\u00CAF\u00CA\x7F\x1E\u00DAr\u00D8\u00A7\u00A2\u00E8H[\u00E5L\x15c\u00B5\u00C61\u00BF\u00E3\u0085'Zj\u00A6Na\u00B5\nu\u00EE\u00A7w\u009F9w\u00F6A\u00FDz\u0083\u00C8y\u00BB\u00C6\u009D\x17Z.~h\u00D2m.\u00BD\u00FC\u00FE\u008A\u00CF\u00D5\u00FBm\x0E\u00ED\u008F:\u00F5\u00BB\x12\u00AF5\\\u009F\u00EEa\u00ECU\u00EBs\u00BF\x11\u00DF\u009Fw\u00B3\u00ECV\u00C5@\u00C5`\u00D9\u00ED\u0082;{\u0086\u00F6\u00DE\u00DD?\u00BC\u00FF^\u00DE_\u0089#\x1E\u00F7\x15\u00EF\u00FF\x18\u00ED{\u00901\u00A69\u00F6\u00E5\u00E1\u00E3G\u009D\u00E3U\x13\u00BB\x1E\u00FB=1}*9I\u009E|;\u00F5`\u00BA\u00F5Y\u00D5\u00F3]/\u00FCg\u00CCge\u00E7X\u00E6\u00BE\u00CD\u00BFz9\u00B10\u00F4\u00EA\u00C6\u00E2\u00B5\u00A5\u00CE\u00E5\u00CE\u00D7g\u00DE\u0094\u00AC$\u00BF\u00F5}g\u00F1^~\u0095eu\u00ED\u00C3\u00E4\u00C7\u009EO\u00A7>\u00E7\u00AD\u0085\x7F\u00B1\u00FD\u00AA\u00B4\u00CE\u00BE\u00FE\u00F5\u00DB\u00F4\u00F7\u00BE\x1F\u00B5\x1B\u00B9?C~\u0099o\u008Amn\x02\x00\x01\u00F8\u00C0\x18Ra\x00aG\u00EC\u0090\x03\u00C8\x0BT\r-A?\u00E1\u00FCp\x13\u0098\x1B\u00F6\fO#0\x11\u00DA\u0089!$>\u00D2$\u00F9\x18C\x18\u00A3)\u00C5\u0080\u00EA\u00CA\x14\u00CE\u009C\u00C5r\u0092\u00F5\x06\u00DB2\x07'\u00A79W\x1Aw\x13\u00CF{>E~\u00BA\u00C0u!Faw\u0091\u00F3\u00A2\u009B\u00E2&\x12\u00D9\u0092\u00BDR\x1B2Z\u00B2\u0091r\u00C7\u00E5\u0087\u00B7|T\u00E4TRS\u00DE\u00AA\u00E2\u00A3\x1A\u00A6\x16\u00AF\u009E\u00A6\u00B1K3]+R\u00DBG\u00C7N\u00D7@OY_\u00CC\u0080\u00D3\u0090d\u00F8\u00DD\u00E8\u00AD\u00F1\u00AC\u00C9\u00B8\u00E9]\u00B3\x1E\u00F3+\x16\u00F5\u0096\u0095V\x05[S\u00AC\u00C3m\u00BCl\u00B7\u00DAi\u00DBKo\u00E3t\u00C0\x1C>;\u00CE9=p\u00EEsiv=\u00E1V\u00E0\u009E\u00E0\u00E1\u00EBi\u00ED\u00A5\u00E6-\u00E8C\u00F0y\u00B7}bG\u00B7o\u009D_\u0091\x7F\\\u0080k\u00A0z\x10%h.\u00B83\u00A4444L?\u009C5\u00FCU\u00C4\u00B5\u00C8\u00B2\u00A8\u0090h\u00DD\x18\u00E6\u0098\u00F9\u00D8\u00F6\u00B8\x02\u009AW\u00BC|\u00FC\x06}$\u00E1d\"=\u00C9,\u00993y1\u00A53u_\u009Ao\u00BAr\x06\u009A\u00F1xg\u00D3\u00AE\u00E2\u00CC\u0098\u00DDnY\u00E6\u00D9\u00BA9:{\fr\u00B7\u00E6y\u00E6\u00C7\u00EE\u00DD[p\u00A6\u00F0f\u00D1l\u00F1\u00AF\u00FD\x02%:\u00A5\u00EE\x07\x12\u00CA\x0E\u0094_88t\u00E8U\x05zD\u00A0R\u00F3\u00A8SULu\u00F1\u00B1\x0B\u00C7GO|9)v\u00CA\u00B1vO]\u00E7\u00E9\x0Fg\x15\u00EB\u00E3\u00CF]m\u00F8\u00DA\u00A8sa\u00E7\u00C5\u009E&h6\u00B9\u00BC\u00A7e\u00E0*\u00BE\u00D5\u00AA\u00AD\u00A0\u00FDv'\u00B1\u00CB\u00E2Z\u00CE\u00F5\u00EE\u00EE\u00CF\u00BDR}.72\u00FAO\u00DC\u00BCvk|`y\u00F0\u00EB\x1Dl\u0088\u00FD\u00AE\u00E8\u00B0\u00D2=\u0083\u00BF\u00ECF\u00BC\u00EF\u0087\u008F\u00A6<\u00C8\x1F;\u00FC\u00B0\u00F6Q\u00D3\u00F8\u00F5\u0089\u00A1\u00C7\x13O\x16\u009E~\u009E\u00C2Ms<\u0093|\u00AE\u00FD\u00C2n&l\u00B6nn\u00F9\u00A5\u00F4\u0082\u00F7\u00AB\u00FC\u00C5\u00F3K\u00B7\u0097g_\u00AF\u00AF0\u00BD\u0095|g\u00F4\u00DEg5\u00EB\u00C3\u00E8'\u00B5\u00CF\x07\u00D7>}u^\u00BF\u00FA\u009D\u00E7G\u00DE\u00C6\u00FA\u00AF\u0094\u00CDM\x00\u00C0\u0080\x15\u00E4`\x1BdA\x1FBDt\u0091D\u00A4\x1DEQ{\u00F4$\u00FA\x03\u00E7\u008B\u00BB\u008B\u00E9cmxm|?\u00C1\u00910O\u00CC \u00F1\u0093n\u0093\u00F73\x041\u00EAS\u00F8)\u00BF\u00A8sL\u00C3\u00CC\u00AD,gX+\u00D9J\u00D8\x0B8\u00F28\u00F3\u00B9\u008A\u00B9\x0F\u00F2\u00D4\u00F06\u00F2u\u00F0w\x0Bt\x0B\u00F6\b\u00F5\n\u00F7\u0088\\\x13m\x15k\x14?.Q,\u0099$\u00B5]\u00DAXFL\x16d\u00A7\u00E4\u00DA\u00E5\u008B\u00B7\u00B8+\u0088(\u00BCVlU\u00CAR\u00B6U\u00E1R\u0099UmTKR7\u00D2 k<\u00D4<\u00AE\x15\u00AE\u00AD\u00AE\u00BD\u00AE\u00D3\u00A3\u009B\u00A7g\u00AB\u00CF\u00A6?iPk\x18i\u00A4j\u00B4a<hRf\u00BA\u00C3L\u00CE\u00EC\u00AB\u00F9M\u008BRK\x1F+i\u00AB\u008F[{\u00AC\u008Bl\u00DCmEm\u00DF\u00D8\u00B5\u00D9gm\u00B3s\u00E0r\u0098ultJp\u00D6sA]\u00EE\u00BA\u0096\u00BBy\u00BB\u008B\u00B8/z\\\u00F2L\u00F2\u00D2\u00F3F\u00BD\u0087|J\u00B7\u00BB\u00EC\u00E0\u00DA\u00F1\u00D4\u00B7\u00DAo\u0087\u00BF\u00A0\u00FF\u00B3\u0080\u00E3\u0081;\u0082\x04\u0082&\u0083+C\u00DCC\u00D9C\u00EF\u0087\x15\u0087[D@\u00C4\u00B5\u00C8\u00E4(\u0095\u00A8\u0095\u00E8\u00FA\u0098\u00C0X\u0081\u00D8\u00C7q\x07i\u00DB\u00E2I\u00F17\u00E8\u00E9\tj\t+\u0089g\u0092|\u0093\u00B9\u0093\u00EF\u00A7\u00ECM5J]OkN\u008F\u00C8\x10\u00C9x\u00BA\u00F3\u00D0.\u00D7L\u00DE\u00CC\u0085\u00DD\x1DY\u0087\u00B2\u00D3rB\u00F7l\u00CF\u00F5\u00CA\u00F3\u00C9\x0F\u00D9\u009BT\u0090WXQt\u00B6\u00B8m\u00DF\u00E0\u00FE\u00F1\u0092\u0085\u00D2\u00CFe\u00B8r\u00F6\u0083b\u0087\u0094\x0F\u00EBV\u0098\x1D\u00B1\u00A9t:\u00EAU\x15X\x1Dwl\u00F7\u00F1\u0083'.\u00D4\f\u009F|_+Y\u0097vz\u00F4\u00ACt}\u00E6\u00B9\u0089\u00F3\n\u008D\u00B9\x17\u00A6.\u00A94\x154?o\u00D1\u00BCR|\u00F5E\u009BZ\u00FB\u00DE\u008E\u00E9.\u00B5kE\u00D7\u00E7z\u00F4{+\u00FB\u00BE\u00F4\u00BB\u00DEl\x1D\u0090\x1E<}Gah`8\u00EA/\u0089\u0091\u0095\u00D1\u00DBc\u0097\x1F5L4?\u00B91\u00F9\u00EC\x19\u00BCP\u009E\u00AD\x7F\u0099\u00BFX\u00F4\u00BA\u00FD\x1D\u00F3\u0087\u00825\u009E\u00F5\u00D6\r\u008F\u00CDM\u0080\u00DFoK\x00\x00\x04M\u00803\u00F3\x00\u00EE\u00A7\x00\u009C|\x00\u00EA\u00E5\x01$\u00AB\x01\u00988\x00\x1C\u00A9\x00\u00AE:\u0080\u009A\u0096\x02\u00F2\u00F4( V\u0097\u00FE9?\u00A8 \r\u0096\x10\n{\u00E1\x1C\f\u00C1\x1B\u0084\tQA\u00DC\u0090t\u00E48r\x1D\u0099B6PA\u00D4\b\rD\u00F3\u00D1\u00F3\u00E8}\u00F43\u008E\x1Fg\u0082\x0B\u00C7\x1D\u00C0u\u00E2\u00E60FL\x03\u00F3\u00C7\u00F6a\x1D\u00D8K<\x1B\u00DE\b\x1F\u008B?\u0085\x1F'0\x10L\b\u00A9\u0084\x16\u00C2\nQ\u0086\x18F\u00AC'.\u0093\x14II\u00A4^2#\u00D9\u009B|\u0081\x01a\u00F0dhadb\u008Ce\x1C\u00A3hSNRIT:\u00F59\u0093\rS'\u00B3\fs\x15\x0B\u0095%\u009B\u00E5+k\x1C\u00EB\x12[\x10\u00DB\x0B\u00F6@\u00F6E\u008E\x18\u008E/\u009C\u00D9\\L\\\u00C7\u00B9\u0095\u00B8o\u00F2\u00F8\u00F0\u00AC\u00F1\u0096\u00F1\u00A9\u00F0=\u00E4O\x11\x10\x14\x18\x15\u00DC+d*\f\u00C27D\u00F2D\u00ED\u00C5x\u00C5\u0096\u00C4\u00AFI\u0094IFJYJK\u00CAPd\u00D6d\u00E7\u00E4\u00C6\u00E4om\u00E9R\u00B8\u00A2\u00D8\u00AC\u00D4\u00A4\u00DC\u00A2\u00D2\u00A1\u00DA\u00A76\u00AC\u00FE\\\u00E3\u0083\x16\u00A6\u00CD\u00A9#\u00AE\u00AB\u00A0\u00A7\u00A2\u00AFl g(b\u00C4f\u008C\x1A\u00BF7\u00992\u00ED5\u00AB5/\u00B0\u0088\u00B3\u00F4\u00B42\u00DD\u00AAd-d\u00C3l\u008B\u00B3]\u00B7[\u00B5\x7F\u00BDm\u00C1a\u00CEq\u00D6\u00E9\u00A5\u00F3\x1B\u0097O\u00AE?\u00DD\u00C9\x1E\u00DC\u009E\u00D2^:\u00DE\u00F6>A\u00DB3v\x1C\u00F6m\u00F6\x1B\u00F1\x7F\x1B\u00C8\x14\u00A4\x16\u00EC\x15\u00B2;\u00B4.l |>\u00E2g\x14[\u00B4h\u008C\\\u00ACb\u009C\x02M6^\u008C\u00CE\u0095@N\u00F8\u009E\u00B8\u009C\u00CC\u0097b\u009F\u009A\u009B\u00D6\u009B\u00FEk\u00A7\u00C5\u00AE\u0083\u0099o\u00B2\u00EC\u00B3\u00AF\u00EDQ\u00CF\u00ED\u00CC\u00B7\u00DE;_\u00B8\u00B7Xt\u00DF\u00A5\x12\u00E3\u00D2\u0099\u00B2\u00B2\u0083\u009E\u0087\r\u008EX\x1FM\u00A9\x1E8\u00C1\x7F\u0092\u00A9\x16\u00AD\u00FBv\u00E6c\u00FD\u00BB\u0086\u0095\u00C6\u0095\u008B\u00EF\u009B\u00D6.\u00FF\u00BCJj\u00E3\u00EFP\u00EA2\u00BF\u00EE\u00D5\x13\u00D1\u0097\u00DC\u009Fy+kp\u00D7\u009D\u00E4\u00BB\u00D1\u00F7\u00FCG\u008AG;\u00C6^\u008F\u008B>\u00DE\u00F1\u00B4f\u00EA\u00D5s\u0095\u0099\u00EC\u00B9\u00F1\x05\u00F9\u00C5\u0082\u00E5\u00C5\x15\u00ABw\u00E7?\u00B0|\u00CAX{\u00BB\x1E\u00FA}\u00F1'ms\x13\x00\u0098A\x11\u009C \t\u00AA\u00A0\x17^\"\u008C\u0088*\u00E2\u0083\u00E4\"\r\u00C80\u00F2\x1E\u00E5@uQ\x7F\u00B4\x00mF\u009F\u00E2p8\x05\u009C\x17.\x0Fw\x19\u00F7\x02\u00A3b\u00FAX\x14V\u008D\u00FD\u0085\u00FD\u00C2\u00AB\u00E0\u0083\u00F1\u00C7\u00F0\u00E3\x04f\u0082\x1D\u00A1\u0090p\u0087\u00C8@\u00B4'\u0096\x13'I\u0092$:\u00A9\u009F\u00CCE\u008E&\x0F2\u00883\u00E40,0\u00DA0vQ\u00E4)5TN\u00EA>&\x02S\x0E30g\u00B3\u00E0X\nX\u0099X\u008F\u00B0\u0089\u00B15\u00B1\x1B\u00B3\u008Fs\u00C4p\x128k\u00B9L\u00B8\u00E6\u00B8\u00F3y\x14x&x\u00B3\u00F9\u0094\u00F9f\u00F8\x0F\nl\x15\u00C4\x04\u00FB\u0085\u00F6\b[\u008APD&Dk\u00C5\x12\u00C4-%\u0084$\u00D6%'\u00A4\u00DA\u00A5O\u00CA\x1C\u0091-\u0093+\u0091/\u00D9R\u00AEP\u00A5xV\u00A9U\u00F9\u008E\u00CAs\u00D5\u00AF\u00EA\u009C\x1A\u00BA\u009AAZ%\u00DA\u00DD:\u00EF\u00F5$\u00F5\u00FD\f\u00AA\r\u00A7\u008C\u0085L\u0082M\u009B\u00CC~XXX\x16[\r[\u00E3m\u00B4l\x03\u00ED\u00F2\u00ED\u00CFn\u00BB\u00E10\u00E9\u00B8\u00EA\u008C\u00B9p\u00B9\u00CA\u00B9\x19\u00BB{y$x\u0096z]\u00F2\x1E\u00F1\u00F9\u00B0\u0083\u00CB\u00D7\u00C0/\u00D4\u00BF,\u00A0'\u00F0]\u00B0x\u0088ghi\u00D8`\u00F8\u00CFH\u00F5\u00A8\u0088\u00E8\x131\x0F\u00E2P\u009Aj\u00BC?\u00BD$\u00E1Z\u00E2R2s\u008AV\u00AA\x7FZqzG\u00C6\u00E2.\u00EEL\u00EB\u00DD\u00BB\u00B2Z\u00B2_\u00EF\x11\u00CF\u00DD\u0091W\u0095\u00FF\u00A4\u0080\u00BB\u00D0\u00AB\u00E8D\u00F1\u00CB\u00FD\n%\u00A9\u00A5\u0083e<\u00E5q\x07\u00EF\x1DV\u00AE\u00A8\u00AEd:ZXM9v\u00F8\u0084t\u00CD\u00EDS\x11u\u0094\u00D3-g\u00BD\u00CFa\r\u00CD\u008D~\x17Y.\u00DDlNmQ\u00BA\u00B2\u00D4Z\u00DF\x1E\u00D1\u00A9\u00D0\u00F5\u00F1zWON\u009F]?\u00F7\u00CD\u00F9\u0081\u00E6\u00DB;\u0087l\u0086y\u00EF\u008D\u008E\u00B8\u00DD\u009F\x7F\u0090\u00FEP\u00E8\u00D1\u00C8D\u00F1\x13\u0097I\u00A9i\u00E4\u00D9\u00DC\u008B\u00C1\u00D9\u00C6\u00F9\u00D2\x05\u00FA\u00A2\u00CB2\u00FF\u00EB\u009A\x15\u00E9\u00B7\u0097\u00DF\x1B\u00AE\u008E|\u00F4\u00FB\u00F4~-\u00EB+\u00F3\u00FA\u00D1\u00EFB?j~\u00F2\u00FD*\u00DD\u00DC\x04\x00n0\x01\x1A\u00D4\u00C0}\u00D8DT\u0091P\u00E4(2\u0080|B\u00C5Pg4\x17mGWp\u00A28O\u00DC\x01\u00DC\x10\u0086\u00C3\f\u00B1t\u00AC\x1D[\u00C3k\u00E0\u0093\u00F1\u00DD\x04<\u00C1\u0081PMxM\u00D4#\x1E .\u0091\u00CCI\u00A7\u00C9$2\u008D<\u00CD`\u00C7\u00D0\u00C7\u00A8\u00C5\u00D8E1\u00A5\u00DC\u00A3zQ_3e2s27\u00B38\u00B0|`\u00AD`3d[f?\u00CE\u00E1\u00C2I\u00E5\u00BC\u00CBU\u00C8m\u00C7\u00C3\u00C63\u00C9{\u0086\u008F\u00CEo\"\u00C0.\u00F0FpP\u00E8\u00B4p\u00BEH\u0094\u00A8\u00AB\u0098\u0089\u00B8\u00AA\u0084\u00B4\u00A4\u00B0\x14\u00BF4\u009F\u008C\u0088\u00AC\u00BC\u009C\u008E\u00BC\u00ED\u0096\x00\u0085\u009D\u008AUJ\u00DD\u00CA/U\u0099\u00D4\u00F4\u00D5\u00E9\x1A\u00974\u00DFkk\u00E8d\u00EB\u008E\u00E9\u00CB\x18\u00E4\x1A\u00BE2\u00B63i7\u00937?m)jUg-k\u00D3jgn\u00FF\u00C4\u0081\u00E6Dqnv\u00F5q'{t{%\u00FB\u00A8o_\u00F7\u00ED\u00F3\u00DF\x1F\u00E8\x1B\u00AC\x19J\t{\x1AQ\x15e\x1D\u00BD\x1C\u009B\x16\u00B7\x11\u009FH_HtL\u00BA\u0092\u00C2\u009AJO{\u0094\u00A1\u00BB\u00F3T&\u00E3\u00EE\u00D4\u00AC\u00C5\x1C\u00CF=\u00F7\u00F2L\u00F3\u00BB\n\u00D4\x0B\u00DB\u008A\r\u00F6\r\u0095x\u0095\u00BE)\u00CB<\u00C8z\u00A8\u00B6B\u00E9H\u00E7Q\u00C3\u00AA\u00DEc\u00FA\u00C7\u00DBj\u00F0'\u00EDN\x1D\u00AE}qZ\u00EEL\u00CA\u00D9\u0081s\u009C\r\u00A1\u00E7\u00BB.0]\f\u00BEt\u00BD\u0099\u00F32\u00ADe\u00F8\u00AALkQ\u00DB\u00DB\x0E\u00A7\u00CE\u00F6kB\u00D7\u00F3\u00BB\u00DF\u00F5z\u00F4\u00DD\u00E8\u0097\u00BFy\u00F8\u00D6\u00E6`\u00E4\u00EDGC\u00C6w\x1B\u00EFq\u00FD\u00950rw\u0094\u00FFA\u00F8\u00D8\u0085\u0087\u00AF\u00C7\u00C5'<\x1E\u00E7<9\u00F7\u00F4\u00EE\u00E4\u00C2\u00D4\u00C63\u0096\u00E7\u00C2/\u00E4g4fu\u00E7\f\u00E7\u008D_\x1A/\x18\u00BE\u00D2]\u00D4ZRY\u0096{-\u00F6\u0086\u00E9\u00CD\u00F2J\u00E7\u00DB\u0094w\x1A\u00EFV\u00DE\u009FY\u00F5\u00FA\u00C0\u00F0\u00E1\u00FA\u00C7\u00D0O,\u009F:>o_\u0083\u00B5\u00DA/\u00A6_\u00E6\u00BE\u00EE^\x17X\u00EF\u00FC\u00E6\u00F6m\u00F5\u00FB\u00BE\x1F\u00D2?\u00FA7|7\u00D6\x7F\x1E\u00FC\u00A5\u00F4kh3xs\x13 !TM\x15\x00\x00\x10\u008A)\x00\u00FE\u00F9\u00E6\u00E6')\x00b9\u00C0\u00CF\u00B2\u00CD\u00CD\x1F\u00B5\u009B\u009B?\u00EB\x00p\u00D3\x00}\u00D1\u00BF\u00FF+\x00\x00\b,\x00\u00C7\u00EA\u00FE\u00B77\u00D2\u00FF\x00\x1E\u00E1~\u0097\u00DA\u00DF0\u00FA\x00\x00\x00 cHRM\x00\x00m\u0098\x00\x00s\u008E\x00\x00\u00FA\u00CC\x00\x00\u0084\u00FA\x00\x00y\u0081\x00\x00\u00FD\x13\x00\x000m\x00\x00\x12)\r\x1E&N\x00\x00\x01\u008BIDATx\u00DA\u00B4\u00951\u00AA\u00C2@\x10\u0086\u00FF\u008Di--\u00C4^!\u0085\x17\u00B0\x15\u00C4\u0083x\x01\u00EFa/V\u0096\u00B6\x1E\u00C1V\u00B1\x12E\u00B0\u00B2\x10l\u00C5B\u00D8\u00DD\u0099\u00BC\u00E2\u00B1\u009B\u009D\x18\x13\u00DFC\x07\x06\x12v\u00E7\u00CB\u00BF\x7F&\x13\u00D5n\u00B7S|)b\x00\x18\u008F\u00C7\x1F\u0085*\u00A50\u0099L~\u00E1\u00D6Z\\\u00AFW\u00B1\u0098\u00A6)\u0094R\u0085\u00C5n-M\u008B\x0F\u00DDl63\u00E5D\x04f\u00FE\u0098rkm\x06gf\x0F\x7F\u00A5\u00F6/\u00E1X\u00A5\u00CA\x07\u0083\x01\u00A2(\u00F2Y\u00AB\u00D5\u00C4\u00BDR\n\u00FD~\x1F\u00A3\u00D1HXFD\x19\u00DCZ\x0Bf.\u00F5\u00F9\x1D\u00A5y[\"\u00F74\x07w\x1613.\u0097K)t\u00BD^\u00A3\u00D1h\u0088\x1A\u00C7\u00F1p\"\u00F2\u00D6\u00B8k\"\u00C2v\u00BB}\t6\u00C6`6\u009Ba8\x1C\u008A\x1A\"\u0092\u00CA\u008D1\x1E\u009CWq<\x1E\x0B\u00E1\u00CB\u00E5\x12a3\u0084\u00E9<\x7F\u00B2%\u009F\u00FB\u00FD\x1E\u00C6\x18\x01\u00BE\u00DF\u00EFX,\x16\u00E8\u00F5z\u00855\u00EE\x1DDa\u00B7\u0084\u00F6\u0084\u00B9\u00DB\u00ED\x04|>\u009F\u00A3\u00D5j\x15\u00AAffi\u008B\u00D6\x1A\u00D6Z\u009F\u00C6\x18\u0091\u0087\u00C3\x01\u008F\u00C7\x03\x00p>\u009F\u00B1Z\u00AD\u0090$\u00C9\u00D3>\u0097\x02\u00FE\u00CA\u009207\u009B\r\x00`:\u009D\u00A2\u00D3\u00E9\u0094\u00EE\x15}\u00EE\u0094\u0097\u00F5\u00F9\u00E9tB\u00BD^\u00C7\u00EDvC\u00B7\u00DB\u00F5\u00EA\u008ABk\u009D\u00C1\u00C3\u00A3T\u00F5u\u0092$\u0095{]\x03\x14~\u00FE\u00F9\u00A9X5\x05\u00F3!lq\u00CA\u00FF\x0B\u00CB\u008B\x11SQk\u008D8\u008E\u00DF\u009E\u00E7U\u00F3\u00DDy\u00AE\u00BE\u00F9\u009B\u00FB\x19\x00\u00DCp\u00E61\u00B7\u00E3\x12\u00CD\x00\x00\x00\x00IEND\u00AEB`\u0082" ;
        this.w.res1.gr2.gr5.bt.image =   "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x17\x00\x00\x00\x14\b\x06\x00\x00\x00f\u00BE\u00A6\x0E\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x17OiCCPPhotoshop ICC profile\x00\x00x\u00DA\u00D5yiX\u008D]\u00D8\u00F6u\u00DF\u00FB\u00DES\u00ED\u00DD<\u00CF\u00F3\u00A8y\u009E\u00E7\u00D2\u00A4y\u00A6y\x1Ew\u00BB\u00B9H\u00A5\u00D2@)$\u0085($\u00A1D#\r\u00A2H\u009E$\n\x15\x1A\u00A4\"d\u0088\x10\u00BD?x\u009E\u00E7\x1D\u00BE\u00F7\u00C7w\x1C\u00DF\u009F\u00EF\u00FC\u00B1\u008E\u00F38\u00AFk\u009D\u00D7u\u00FDZ\u00C7Z\x0B\u0080w%\u0080F\u008BFY\x00bb\x13\u00E9\u00CEV\u00A6\"\u009E^\u00DE\"\u00C4) \u00820p\u0083\x06\u00C8\x05\x04%\u00D0L\x1C\x1D\u00ED\u00E0\x7F\u00C5\u0097\t@\x00\x00\x1E*\x04\u00D0h\u00D1\u00F0\x7F\x07\u00D6\u00E0\u0090\u0084 \x00\u00C4\x11\x00\x02\u0083\x13\u0082b\x00\u0090\u00AB\x00\u00A8i\x10\u008D\u009E\b\u0080[\x07\u0080\u00D1\u0094DZ\"\x00v\x07\x008\u00E8\u009E^\u00DE\x00\u00D84\x00p\u0084\u00FD\u00E6\u00AB\x00\u00C0\x11\u00E8\u00E9\u00E5\r\u0080\u00C7\x00\u0080\u0083\u00EE\u00EAl\x06\u0080\u00E7\x01 Q\x02\x02\u00E8a\x00T\t\x00\x10I\x0E\nK\x04\u00A0\u009A\x03\x10\u00D8b\u0083#b\x01\u00D8=\x01\b\u0086A\u00E1\x01\u00C1\x00\u00BC\u0095\x00\u00B0%&&.\x18\u0080\u00F7\x16\x00\u00C8\x04\u00FE'\u009F\u00B0\u00FF\u00E2\x19\u00F8\u008Fg@@\u00D8?\u00FC\u00F7,\x00\x00@2\u008FH\u00A0E\x07\u00A4\u00C1\u00FFk\u00C4D'\u00FD]\u0083\r\x00(\u00B1\u00D1\u00DB\u00EC\x00\u0080\x0B\x00\u0096\u0082\x03\u00CCm\x01@\x00\x00~\u00D1\u00A2\x1D\u00ED~\u00E7 |!\u00B1n.\x7F\u00F8\u0096\u00D8\u00C0m\x0E\x7F\u00B8a(\u00DD\u00D2\u00F9\u00F7^\u00C4\u0091\u0096h\u00EA\f\x00<\x00H(-\u00D1\u00D1\u00F5\u008F\u009E\u0099\x1En\u00B6\r\x00(\x00\u00C8\u00A1\u0090\x04\u008B\u00BF}NF\x06\u00D88\x02\x00\x13\x00\u00D2BOrv\x03\x00\t\x00\u00A4/!\u00D9\u00C5\x02\x00X\x00\u0090\u0097\u00E9\u00E1\u00AE\x1E\x7Fr>\x07\u0087\u0098\u00FF\u00D1Q44\u00C2\u00D2\u00FA\x0Fg\u008BH\u00B4v\x05\x00\x0E\x00T,*\u00CE\u00D6\u00F9w-T\x13l!\x1AB \t\u00E8\x10\x02\u00B1\u00A0\x00v`\x06\u00E6\x7FV\x05\b\u0085\x00\u00A0C2\u0084@\x02D\u00C1+\u00A0C\f\u00D8B\x1CDC\x1C\u00D0A\u00E4O\u009E\u00D9\u00FFP,!\x00\u00E8\x10\x06!\u00FF\u00CDQ\x04\u0082 \x0E\u0092\u00FE\u00A9\u00F9\u00B7\u00FA\u00AFC\x04\x04C\u00DC?z\u00C0\u009F\x18\x1DB \u00C1/\"\u00E7\u00DF\n\u00FF\u00D9/\x1A\u00E2\u0080\u00AE\u00DC\u00A8\u00BC\u00AC\u00BC\u00F1w\x1C\u0093\u00C2T1\r\u00CC\x143\u00C0\f1\x1D\x10\u00C1\u00B80>P\u00C0\u00D41m\u00CC\x043\u00C2\u00F40\rL\x07,\u00E1%\u00D0!\u00EC\u00EF\x1E\u00FD\"r\u00E81-\u00A1\u00C9\u0095qi\u00BA\u00EE\u00E1\x7Ff\b\u00FCg\x02wx\tt\u0088\u00F8?N\u00F4\u00A7\u00F7\u0091\u0095\u00F6\u0095\x7F:\u0084\u00C4\u0090\u00D4D\x00\x00\u00B38Z\x1A=\",<Q\u00C4\u0084F\u008B\x0E\u00D9\"b\x1D\x1B\u00A4\u00B8EDUYE\x05\u00FE\x7F\u0082\u00A7\u0097\u00B7\u00C8o\u00F6\u00C9\x19\x10\x00@\u00B8\u00EE\u00FF\u00AB\u00C5\u00A9\x00\u00E8\x04\x01 {\u00FE\u00D5\u00FC\u00DF\x01\u00B4G\x02\u0090\u00D8\u00FE\u00D5\u00A4\u00DA\x01\u0098U\x01\u0086\u008E\x04%\u00D1\u0093\x7Fk\x18\x00\x00\x1E\x18\u0080\x198\u0080\x17\u0084@\x1Cd@\x01TA\x13\u00F4\u00C0\x18,\u00C0\x06\x1C\u00C0\x15\u00BC\u00C0\x17\u0082 \x1Cb\u0080\x0E)\u00B0\x13\u00B2!\x1F\u008A\u00E1\x00\x1C\u0086*\u00A8\u0081:8\x07\x17\u00A1\x05\u00DA\u00E1:\u00DC\u0080A\x18\u0086Q\x18\u0087)\u0098\u0081\x05x\x03\u00AB\u00F0\x05~ \bBD\u00A8\b;\u00C2\u008B\b#\u0092\u0088<\u00A2\u008Ah#\u0086\u0088\x05b\u00878#^\u0088?\x12\u0086\u00C4\"I\u00C8Nd\x0FR\u008C\u0094#U\u00C8)\u00A4\x01\u00B9\u008Ct\"7\u0090!\u00E4\x01\u00F2\x14\u0099E\u0096\u0091\u008F\u00C8w\x14\u0087RP\x0ET\x10\u0095B\u0095Pm\u00D4\x04\u00B5E]\u00D1\x1Dh\x18\x1A\u008F\u00A6\u00A3\u00B9h\tZ\u0089\u00D6\u00A2\x17\u00D06\u00F4\x06:\u008C\u008E\u00A33\u00E8\x1Bt\r\x078F\x1C\x17N\x14\u00A7\u0080\u00D3\u00C6\u0099\u00E1\x1Cp\u00DE\u00B8P\x1C\x1D\u0097\u0089+\u00C2U\u00E0jq\u0097p]\u00B8\u00DB\u00B8\u0087\u00B8\x19\u00DC\n\u00EE\x1BF\u00C0\u00D81\x11L\x01\u00D3\u00C3\u00B6bnX\x10\x16\u008Feb\u00FB\u00B0*\u00EC\x1C\u00D6\u0086\u00DD\u00C2\x1Eb\u00B3\u00D8*\u00F6\x0BO\u00C5\x0B\u00E0\u00E5\u00F1\u00BAxk\u00BC'>\f\u009F\u0082\u00CF\u00C7W\u00E0\u00CF\u00E2[\u00F1\x03\u00F8q\u00FC\x02\u00FE\x0B\u0081@\u00E0\"H\x13\u00B4\b[\t^\u0084HB\x06a\x1F\u00E18\u00A1\u0089\u00D0Gx@\u0098'\u00AC\x11\u0089D^\u00A2<\u00D1\u0080\u00E8@\f &\x12\u00F3\u0089G\u0089\x17\u0088\u00BD\u00C41\u00E2\x02q\u009D\u00C4H\x12&\u00A9\u0092,I\u00DE\u00A4XR\x0E\u00A9\u0082t\u009E\u00D4C\x1A#-\u0092~\u0090Y\u00C8\u0092d]\u00B2\x039\u0098\u009CF.%\u009F&w\u0091\u00EF\u0093\x17\u00C8?\x18X\x19\u00A4\x19\f\x18\\\x19\"\x19\u00B2\x19*\x19.1\f0L3|bdd\x14c\u00D4atb\u008C`\u00CCb\u00ACdlf\u00BC\u00C38\u00CB\u00F8\u008D\u00C2F\u0091\u00A3\u0098Q\u00B6S\u0092(%\u0094zJ\x1F\u00E5)\u00E5\x13\u0095J\u0095\u00A2\x1AS\u00BD\u00A9\u0089\u00D4\x12j\x03\u00F5&\u00F59u\u009D\u0089\u009DI\u0091\u00C9\u009A)\u0098i7S5S\x1B\u00D3\x18\u00D3;f2\u00B3$\u00B3\t\u00B3/s:s\x05\u00F3\x15\u00E6\u00FB\u00CC+,d\x16)\x163\u0096\x00\u0096L\u0096j\u0096N\u0096\u00C7,k\u00AC\u00EC\u00AC*\u00AC\x0E\u00AC1\u00AC\u00FBX\u00CF\u00B3\x0E\u00B1.\u00B1\x11\u00D9\u00A4\u00D8,\u00D8\u0082\u00D9r\u00D9\u00EA\u00D8n\u00B2\u00CD\u00B3\u00E3\u00D8\u00C5\u00D9\u00CD\u00D8\u0083\u00D8\u00F7\u00B0\u009Ff\x1F`_\u00E0 pHsXsDr\x14s\\\u00E4\x18\u00E1X\u00E5d\u00E3T\u00E7t\u00E7L\u00E5\u00AC\u00E6\u00EC\u00E6\u009C\u00E1\u00C2qIqYsEs\u0095r\u00B5pMp}\u00E7\x16\u00E46\u00E1\x0E\u00E1.\u00E4\u00BE\u00C4=\u00C6\u00FD\u0095\u0087\u009F\u00C7\u0098'\u0084\u00A7\u0088\u00A7\u0089g\u009C\u00E7;\u00AF\b\u00AF\x05o\x14o\x19o;\u00EF3>\u008CO\u008E\u00CF\u0089/\u0085\u00EF\x04\u00DF\x00\u00DF\n?\x07\u00BF\x1E\x7F\x10\x7F\x11\x7F\x0B\u00FF\u00A4\x00* '\u00E0,\u0090!P'pO`MPH\u00D0J\u0090&xT\u00F0\u00A6\u00E0\u008A\x10\u0097\u0090\u00B1P\u00A4\u00D0!\u00A1\x1E\u00A1eavaC\u00E1\b\u00E1C\u00C2\u00BD\u00C2\u00AFE8ELD\u00A2E*En\u0089\u00AC\u008A\n\u0088n\x15M\x12=%:\"\u00FACLZ\u00CCM,G\u00ACI\u00EC\u00998\u0083\u00B8\u00B6x\u00A8\u00F8!\u00F1~\u00F1U\ta\t{\u0089\u009D\x12\u008D\x12\u0093\u0092dIm\u00C9p\u00C9#\u0092\u00B7%\u00BFJIKyH\u00ED\u0095j\u0097Z\u0092\u00E6\u0091\u00B6\u0096N\u0097n\u0094\u009E\u0096\u00A1\u00CA\x18\u00C9\u00C4\u00CB\u00D4\u00CA<\u0092%\u00C8j\u00CBF\u00C9\x1E\u0097\x1D\u0095C\u00E54\u00E4\u00C2\u00E5\u00AA\u00E5\u00EE\u00CB\u00A3\u00F2\u009A\u00F2\x11\u00F2\u00C7\u00E5\x1Fl\u00C1o\u00D1\u00D9\x12\u00BB\u00A5v\u00CBc\x05\u008A\u0082\u0089B\u00B2B\u00A3\u00C2\u00AC\"\u0097\u00A2\u009Db\u008Eb\u00BB\u00E2;%\t%o\u00A52\u00A5\u00DBJ\u00BF\u00945\u0094\u00A3\u0095O+O\u00A9\u00B0\u00A9\u00D8\u00A8\u00E4\u00A8t\u00A9|T\u0095S\rR\u00ADV}\u00A4FU\u00B3T\u00DB\u00AD\u00D6\u00A1\u00F6A]^=D\u00FD\u0084\u00FA\x13\rv\r{\u008D\u00BD\x1A\u00FD\x1A?5\u00B54\u00E9\u009A\u00974\u0097\u00B5$\u00B4\u00FC\u00B5\u008Ei=\u00D6\u00E6\u00D0v\u00D4\u00DE\u00A7}G\x07\u00AFc\u00AA\u00B3[\u00E7\u00BA\u00CE7]M\u00DDD\u00DD\x16\u00DD\u00F7z\nzQz\u00E7\u00F5\u0096\u00F4\u00A5\u00F5C\u00F4O\u00EB\u00CF\x1B\u0088\x19\x04\x18\u009C2\u00981\x141\u00F47<i8c$j\x14`Tk4g,n\x1Cl|\u00D6x\u00D1D\u00D6$\u00D2\u00E4\u0082\u00C9;SeS\u00BAi\u00AB\u00E9W3]\u00B3]f}\u00E68s+\u00F3\"\u00F3\x11\x0B6\x0B7\u008B*\u008B\u00E7\u0096b\u0096a\u0096\u008D\u0096\u00ABV\x1AV\x19V}[\u00F1[m\u00B7\u0096m}l-h\x1Dd\u00DD`\u00BDj\u00A3e\u00B3\u00CB\u00E6\u0096-\u00C5\u00D6\u00C5\u00B6\u00CAv\u00CEN\u00CE\u008En\u00D7e\u008F\u00DA\u00DB\u00D8\x1F\u00B4\u009F\u00DE&\u00B9-v[\u00BB\x038X;\x1Ctx\u00E6(\u00ED\x18\u00EFx\u00CD\u0089\u00E0\u00E4\u00E8T\u00ED\u00F4\u00CAY\u00C5y\u00A7\u00F3m\x17v\x17?\u0097\u00F3._\\M]K]\u00A7\u00DCd\u00DC\u0092\u00DC\u00FA\u00DD\u0099\u00DD\u00B7\u00BB7\u00B8\x7F\u00F50\u00F7(\u00F7\u0098\u00F1T\u00F2\u00DC\u00E59\u00EC\u00C5\u00E7\x15\u00E1\u00D5\u00E1M\u00F4v\u00F7>\u00EB\u00BD\u00E6c\u00E1s\u00D8ga\u00BB\u00C6\u00F6\u00FC\u00ED\x13;\u00A4w\u00A4\u00EE\x18\u00F2\u00E5\u00F3\u008D\u00F6\u00ED\u00F6c\u00F6\x0B\u00F0\u00BB\u00E2\u008F\u00F7\u00F7\u00F0?\u00EF\u00BF\x11\u00E0\x10P\x1B\u00B0\x16h\x1Dx,p5\u00C8,\u00E8H\u00D0\u009B`\u00E3\u00E0C\u00C1\u00CB!\x06!\u00E5!\u008B\u00A1\x06\u00A1\u00E5\u00A1Ka\x06a\x07\u00C3\u0096\u00C3\u008D\u00C2+\u00C2W\"\u00CC\"\u00AA\">Dn\u008D\u00AC\u0089\u00FC\x1A\u00E5\x10U\x1F\u00B5\x19\u00ED\x11\u00DD\x14C\u008A\u00F1\u008F\u00E9\u008Ce\u008B\u008D\u008A\u00BD\x15'\x14\u0097\x1A\u00F7\u0080&O\u00CB\u00A7\u00CD\u00C4\u00EB\u00C6\x1F\u008E_\u00A5\u00DB\u00D2\u00CF& \t;\x12:\x129\x12i\u0089\u00F7\u0092d\u0092\u00F2\u0092f\u0093\r\u0093\u00AB\u0093\u00D7S\u00DCS\u00AE\u00A4\u00B2\u00A6\u00C6\u00A6\u00DEK\u0093K+L[L\u00B7L?\u0093\u0081e\x04e\u00F4\u00EF\x14\u00DD\u0099\u00BDsv\u0097\u00C9\u00AES\u0099Hf`f\u00FFn\u00F1\u00DD\u00B9\u00BB\x17\u00B2\u00AC\u00B2\u00CEe3dGe\u00FF\u0095\u00A3\u009CS\u009E\u00F3y\u008F\u00C7\u009E\u00AE\\\u00C1\u00DC\u00AC\u00DC\u00F9<\u00AB\u00BC\u00C6|\u00A6|z\u00FE\u00E3\u00BDz{k\n\u00B0\u0082\u0088\u0082\u0091B\u00B5\u00C2\u00A3\u0085\u00BF\u008A\u0082\u008B\u00EE\x16+\x17W\x14o\u00EC\x0B\u00DAww\u00BF\u00CA\u00FE\u00CA\u00FD\u009B%\u00A1%#\u00A5\u009A\u00A5'\x0E\x10\x0E\u00C4\x1E\u0098(3*;W\u00CEZ\u009E^>\x7F\u00D0\u00FE`\u00DB!\u0091CE\u0087>\x1F\u00F6;<T\u00A1^Qs\u0084\u00E1H\u00D2\u0091\u0099J\u00BB\u00CA\u008E\u00A3\x12G\x0F\x1C\u00DD\u00A8\n\u00AF\x1A\u00AF6\u00ADn:&p\u00AC\u00F0\u00D8\u00D7\u00E3\u00C1\u00C7\u00C7N\x18\u009F\u00B8T#XS\\\u00F3\u00FDd\u00C4\u00C9'\u00A7\u00ACN\u00B5\u00D5J\u00D5V\u00D4\x11\u00EA\u0092\u00EB^\u009Dv?}\u00FB\u008C\u00F6\u0099\u0086\u00B3|g\u008B\u00CF\u00FE\u00AC\u008F\u00AD\u009F9\u00E7|\u00EEV\u0083VC\u00C3y\u0081\u00F3\u00A5\u008DhcR\u00E3\u00F2\u0085\u00ED\x17F/\u009A_\u00EC\u00B8\u00A4p\u00E9T\x13WSq34'5\u00BF\u00BE\u00EC\x7Fy\u00A2\u00C5\u00B6\u00A5\u00FF\u008A\u00F6\u0095KW%\u00AF\x1Ekeo-jC\u00DA\u00D2\u00DAV\u00DB\u00C3\u00DBg:\u00BC:\x1Et\u00DAt\u00F6w\u00E9u\u00B5^S\u00BCV\x7F]\u00F4zu7gwi\x0FCOn\u00CFfoz\u00EFZ\x1F\u00ADo\u00E5F\u00D8\u008D\u00F9~\u00BF\u00FE\u00A9\u009B\u009E7\x1F\u00DDr\u00BA52`;pg\u00D0r\u00F0\u00E6m\u0093\u00DB\u00BDw\f\u00EE\\\x1F\u00D2\x1D\u00EA\u00BC\u00AB}\u00B7}Xs\u00B8\u00ED\u009E\u00C6\u00BD\u00D6\u00BF4\u00FEj\x1D\u00D1\x1Ci\u00BB\u00AFu\u00BFcTg\u00B4\u00EB\u0081\u00FE\u0083\u009E1\u00A3\u00B1\x1B\x0F\u00CD\x1F\x0E>\u00B2~4<\u00BEm\u00FC\u00C1\u0084\u00DB\u00C4\u0093\u00C7\u00DB\x1F\u00CF<\t~\u00B2\u00F44\u00FA\u00E9\u0087\u00C9\u00E4\u00C9\x1FSY\u00D3\u00F8\u00E9\u00A2g,\u00CF*\u009E\x0B<\u00AF}!\u00FB\u00A2iFs\u00A6{\u00D6|\u00F6\u00DE\u009C\u00CB\u00DC\u00D4|\u00D0\u00FC\u009B\u0097\t/7\x16r_Q_U,\n/6,\u00A9.]_\u00B6\\\x1E}\u00ED\u00F3z\u00E1\r\u00ED\u00CD\u008F\u0095\u00FC\u00B7\u00ACo\u008F\u00BD\u0093yw\u00F5\u00BD\u00F1\u00FB{\u00AB\u009E\u00AB\x0B\x1F\u00E8\x1F6?\u00EE\u00FB\u00C4\u00FB\u00A9\u00FE\u00B3\u00FA\u00E7\u00FE5\u00C7\u00B5\u00E7_b\u00BE\u00FC\u00F8Z\u00B4\u00CE\u00BB~\u00EE\u009B\u00F6\u00B7\u00DB\u00DF=\u00BE/\u00FEH\u00D9 nT\u00FE\u0094\u00FD\u00D9\u00F5\u00CB\u00F6\u00D7\u00F4f\u00CC\u00E6&-\u0080\x1E\x00\x00\x008\x00@CC\x01>\u00D6\x03P\u00BD\x00\u00D8G\x01\x18\u0098~\u00DF)\u00FE\x00\u0087\x00\u00A0\x00@\x04!\u00B0\u0081b\u0098G\u00E4\u0090X\u00A4\x0F\u00E5E\x13\u00D1I\u009C5\u00EE&f\u0085=\u00C2\u00C7\x10X\t\u00FD\u00C4\u009D$C2\u0091\u00FC\u008C\u00A1\u0093\u00F1\x18\u00A5\u0094Z\u00CF4\u00CD\u00C2\u00C2j\u00CBV\u00C8>\u00C4\u00C9\u00CA\u00B5\u009D\u00FB\x02/\u00C6\x17\u00C0\u00DF-(\"\u00B4Ox]4XlRb\u009B\u00E4\u0090\u00B4\u0092L\u0089\u00EC\x1By\u00EB-5\n_\u0094\u00CC\u0094\u00F7\u00AB\u008C\u00AAQ\u00D5M5\x124\u008Fi\u00F5i\u00CF\u00E8\u00FC\u00D4\u00E3\u00D6\u00977\u00D01\u00B40r6\x0E2I0\u00CD5;b\u00DEh\u00D1k\u00F9\u00D0jy\u00EB\u00A6\r\u00A7\u00ED\x16;3{\u009Fm\x11\x0E\u00C9\u008EyN\u00E5\u00CE5.\u008D\u00AE\u00EDn\u00FD\u00EE\u00C3\x1Ec\u009EO\u00BD^x\u00CF\u00FB,m\x7F\u00BBc\u00C9w\u00DAo\u00C4\u00BF7\u00A0)\u00F0D\u00D0\u00FE\u00E0\u00F4\u0090\u00D0P\u00A70\u00BDp\u0089\b\u00A6\u0088/\u0091/\u00A2\x06\u00A3\x1Bb\u00F6\u00C7\u00D2\u00E2\\hZ\u00F1|\u00F1\x1B\u00F4\u00E7\t}\u0089uIy\u00C9\u00A1)\u00D6\u00A9\u00F2i\fi\u00AF\u00D3\u00EFe4\u00EF\u00AC\u00DC\u0095\u009B\u0099\u00B2;>\u008B\u009E\u009D\u009ES\u00B4\u00E7Tnw\u00DE\u008B\u00BD\u00E4\x02\u00FDBZQ]\u00F1\u00C4~\u0086\x12\u00FD\u00D2\u0098\x03'\u00CAF\u00CA\x7F\x1E\u00DAr\u00D8\u00A7\u00A2\u00E8H[\u00E5L\x15c\u00B5\u00C61\u00BF\u00E3\u0085'Zj\u00A6Na\u00B5\nu\u00EE\u00A7w\u009F9w\u00F6A\u00FDz\u0083\u00C8y\u00BB\u00C6\u009D\x17Z.~h\u00D2m.\u00BD\u00FC\u00FE\u008A\u00CF\u00D5\u00FBm\x0E\u00ED\u008F:\u00F5\u00BB\x12\u00AF5\\\u009F\u00EEa\u00ECU\u00EBs\u00BF\x11\u00DF\u009Fw\u00B3\u00ECV\u00C5@\u00C5`\u00D9\u00ED\u0082;{\u0086\u00F6\u00DE\u00DD?\u00BC\u00FF^\u00DE_\u0089#\x1E\u00F7\x15\u00EF\u00FF\x18\u00ED{\u00901\u00A69\u00F6\u00E5\u00E1\u00E3G\u009D\u00E3U\x13\u00BB\x1E\u00FB=1}*9I\u009E|;\u00F5`\u00BA\u00F5Y\u00D5\u00F3]/\u00FCg\u00CCge\u00E7X\u00E6\u00BE\u00CD\u00BFz9\u00B10\u00F4\u00EA\u00C6\u00E2\u00B5\u00A5\u00CE\u00E5\u00CE\u00D7g\u00DE\u0094\u00AC$\u00BF\u00F5}g\u00F1^~\u0095eu\u00ED\u00C3\u00E4\u00C7\u009EO\u00A7>\u00E7\u00AD\u0085\x7F\u00B1\u00FD\u00AA\u00B4\u00CE\u00BE\u00FE\u00F5\u00DB\u00F4\u00F7\u00BE\x1F\u00B5\x1B\u00B9?C~\u0099o\u008Amn\x02\x00\x01\u00F8\u00C0\x18Ra\x00aG\u00EC\u0090\x03\u00C8\x0BT\r-A?\u00E1\u00FCp\x13\u0098\x1B\u00F6\fO#0\x11\u00DA\u0089!$>\u00D2$\u00F9\x18C\x18\u00A3)\u00C5\u0080\u00EA\u00CA\x14\u00CE\u009C\u00C5r\u0092\u00F5\x06\u00DB2\x07'\u00A79W\x1Aw\x13\u00CF{>E~\u00BA\u00C0u!Faw\u0091\u00F3\u00A2\u009B\u00E2&\x12\u00D9\u0092\u00BDR\x1B2Z\u00B2\u0091r\u00C7\u00E5\u0087\u00B7|T\u00E4TRS\u00DE\u00AA\u00E2\u00A3\x1A\u00A6\x16\u00AF\u009E\u00A6\u00B1K3]+R\u00DBG\u00C7N\u00D7@OY_\u00CC\u0080\u00D3\u0090d\u00F8\u00DD\u00E8\u00AD\u00F1\u00AC\u00C9\u00B8\u00E9]\u00B3\x1E\u00F3+\x16\u00F5\u0096\u0095V\x05[S\u00AC\u00C3m\u00BCl\u00B7\u00DAi\u00DBKo\u00E3t\u00C0\x1C>;\u00CE9=p\u00EEsiv=\u00E1V\u00E0\u009E\u00E0\u00E1\u00EBi\u00ED\u00A5\u00E6-\u00E8C\u00F0y\u00B7}bG\u00B7o\u009D_\u0091\x7F\\\u0080k\u00A0z\x10%h.\u00B83\u00A4444L?\u009C5\u00FCU\u00C4\u00B5\u00C8\u00B2\u00A8\u0090h\u00DD\x18\u00E6\u0098\u00F9\u00D8\u00F6\u00B8\x02\u009AW\u00BC|\u00FC\x06}$\u00E1d\"=\u00C9,\u00993y1\u00A53u_\u009Ao\u00BAr\x06\u009A\u00F1xg\u00D3\u00AE\u00E2\u00CC\u0098\u00DDnY\u00E6\u00D9\u00BA9:{\fr\u00B7\u00E6y\u00E6\u00C7\u00EE\u00DD[p\u00A6\u00F0f\u00D1l\u00F1\u00AF\u00FD\x02%:\u00A5\u00EE\x07\x12\u00CA\x0E\u0094_88t\u00E8U\x05zD\u00A0R\u00F3\u00A8SULu\u00F1\u00B1\x0B\u00C7GO|9)v\u00CA\u00B1vO]\u00E7\u00E9\x0Fg\x15\u00EB\u00E3\u00CF]m\u00F8\u00DA\u00A8sa\u00E7\u00C5\u009E&h6\u00B9\u00BC\u00A7e\u00E0*\u00BE\u00D5\u00AA\u00AD\u00A0\u00FDv'\u00B1\u00CB\u00E2Z\u00CE\u00F5\u00EE\u00EE\u00CF\u00BDR}.72\u00FAO\u00DC\u00BCvk|`y\u00F0\u00EB\x1Dl\u0088\u00FD\u00AE\u00E8\u00B0\u00D2=\u0083\u00BF\u00ECF\u00BC\u00EF\u0087\u008F\u00A6<\u00C8\x1F;\u00FC\u00B0\u00F6Q\u00D3\u00F8\u00F5\u0089\u00A1\u00C7\x13O\x16\u009E~\u009E\u00C2Ms<\u0093|\u00AE\u00FD\u00C2n&l\u00B6nn\u00F9\u00A5\u00F4\u0082\u00F7\u00AB\u00FC\u00C5\u00F3K\u00B7\u0097g_\u00AF\u00AF0\u00BD\u0095|g\u00F4\u00DEg5\u00EB\u00C3\u00E8'\u00B5\u00CF\x07\u00D7>}u^\u00BF\u00FA\u009D\u00E7G\u00DE\u00C6\u00FA\u00AF\u0094\u00CDM\x00\u00C0\u0080\x15\u00E4`\x1BdA\x1FBDt\u0091D\u00A4\x1DEQ{\u00F4$\u00FA\x03\u00E7\u008B\u00BB\u008B\u00E9cmxm|?\u00C1\u00910O\u00CC \u00F1\u0093n\u0093\u00F73\x041\u00EAS\u00F8)\u00BF\u00A8sL\u00C3\u00CC\u00AD,gX+\u00D9J\u00D8\x0B8\u00F28\u00F3\u00B9\u008A\u00B9\x0F\u00F2\u00D4\u00F06\u00F2u\u00F0w\x0Bt\x0B\u00F6\b\u00F5\n\u00F7\u0088\\\x13m\x15k\x14?.Q,\u0099$\u00B5]\u00DAXFL\x16d\u00A7\u00E4\u00DA\u00E5\u008B\u00B7\u00B8+\u0088(\u00BCVlU\u00CAR\u00B6U\u00E1R\u0099UmTKR7\u00D2 k<\u00D4<\u00AE\x15\u00AE\u00AD\u00AE\u00BD\u00AE\u00D3\u00A3\u009B\u00A7g\u00AB\u00CF\u00A6?iPk\x18i\u00A4j\u00B4a<hRf\u00BA\u00C3L\u00CE\u00EC\u00AB\u00F9M\u008BRK\x1F+i\u00AB\u008F[{\u00AC\u008Bl\u00DCmEm\u00DF\u00D8\u00B5\u00D9gm\u00B3s\u00E0r\u0098ultJp\u00D6sA]\u00EE\u00BA\u0096\u00BBy\u00BB\u008B\u00B8/z\\\u00F2L\u00F2\u00D2\u00F3F\u00BD\u0087|J\u00B7\u00BB\u00EC\u00E0\u00DA\u00F1\u00D4\u00B7\u00DAo\u0087\u00BF\u00A0\u00FF\u00B3\u0080\u00E3\u0081;\u0082\x04\u0082&\u0083+C\u00DCC\u00D9C\u00EF\u0087\x15\u0087[D@\u00C4\u00B5\u00C8\u00E4(\u0095\u00A8\u0095\u00E8\u00FA\u0098\u00C0X\u0081\u00D8\u00C7q\x07i\u00DB\u00E2I\u00F17\u00E8\u00E9\tj\t+\u0089g\u0092|\u0093\u00B9\u0093\u00EF\u00A7\u00ECM5J]OkN\u008F\u00C8\x10\u00C9x\u00BA\u00F3\u00D0.\u00D7L\u00DE\u00CC\u0085\u00DD\x1DY\u0087\u00B2\u00D3rB\u00F7l\u00CF\u00F5\u00CA\u00F3\u00C9\x0F\u00D9\u009BT\u0090WXQt\u00B6\u00B8m\u00DF\u00E0\u00FE\u00F1\u0092\u0085\u00D2\u00CFe\u00B8r\u00F6\u0083b\u0087\u0094\x0F\u00EBV\u0098\x1D\u00B1\u00A9t:\u00EAU\x15X\x1Dwl\u00F7\u00F1\u0083'.\u00D4\f\u009F|_+Y\u0097vz\u00F4\u00ACt}\u00E6\u00B9\u0089\u00F3\n\u008D\u00B9\x17\u00A6.\u00A94\x154?o\u00D1\u00BCR|\u00F5E\u009BZ\u00FB\u00DE\u008E\u00E9.\u00B5kE\u00D7\u00E7z\u00F4{+\u00FB\u00BE\u00F4\u00BB\u00DEl\x1D\u0090\x1E<}Gah`8\u00EA/\u0089\u0091\u0095\u00D1\u00DBc\u0097\x1F5L4?\u00B91\u00F9\u00EC\x19\u00BCP\u009E\u00AD\x7F\u0099\u00BFX\u00F4\u00BA\u00FD\x1D\u00F3\u0087\u00825\u009E\u00F5\u00D6\r\u008F\u00CDM\u0080\u00DFoK\x00\x00\x04M\u00803\u00F3\x00\u00EE\u00A7\x00\u009C|\x00\u00EA\u00E5\x01$\u00AB\x01\u00988\x00\x1C\u00A9\x00\u00AE:\u0080\u009A\u0096\x02\u00F2\u00F4( V\u0097\u00FE9?\u00A8 \r\u0096\x10\n{\u00E1\x1C\f\u00C1\x1B\u0084\tQA\u00DC\u0090t\u00E48r\x1D\u0099B6PA\u00D4\b\rD\u00F3\u00D1\u00F3\u00E8}\u00F43\u008E\x1Fg\u0082\x0B\u00C7\x1D\u00C0u\u00E2\u00E60FL\x03\u00F3\u00C7\u00F6a\x1D\u00D8K<\x1B\u00DE\b\x1F\u008B?\u0085\x1F'0\x10L\b\u00A9\u0084\x16\u00C2\nQ\u0086\x18F\u00AC'.\u0093\x14II\u00A4^2#\u00D9\u009B|\u0081\x01a\u00F0dhadb\u008Ce\x1C\u00A3hSNRIT:\u00F59\u0093\rS'\u00B3\fs\x15\x0B\u0095%\u009B\u00E5+k\x1C\u00EB\x12[\x10\u00DB\x0B\u00F6@\u00F6E\u008E\x18\u008E/\u009C\u00D9\\L\\\u00C7\u00B9\u0095\u00B8o\u00F2\u00F8\u00F0\u00AC\u00F1\u0096\u00F1\u00A9\u00F0=\u00E4O\x11\x10\x14\x18\x15\u00DC+d*\f\u00C27D\u00F2D\u00ED\u00C5x\u00C5\u0096\u00C4\u00AFI\u0094IFJYJK\u00CAPd\u00D6d\u00E7\u00E4\u00C6\u00E4om\u00E9R\u00B8\u00A2\u00D8\u00AC\u00D4\u00A4\u00DC\u00A2\u00D2\u00A1\u00DA\u00A76\u00AC\u00FE\\\u00E3\u0083\x16\u00A6\u00CD\u00A9#\u00AE\u00AB\u00A0\u00A7\u00A2\u00AFl g(b\u00C4f\u008C\x1A\u00BF7\u00992\u00ED5\u00AB5/\u00B0\u0088\u00B3\u00F4\u00B42\u00DD\u00AAd-d\u00C3l\u008B\u00B3]\u00B7[\u00B5\x7F\u00BDm\u00C1a\u00CEq\u00D6\u00E9\u00A5\u00F3\x1B\u0097O\u00AE?\u00DD\u00C9\x1E\u00DC\u009E\u00D2^:\u00DE\u00F6>A\u00DB3v\x1C\u00F6m\u00F6\x1B\u00F1\x7F\x1B\u00C8\x14\u00A4\x16\u00EC\x15\u00B2;\u00B4.l |>\u00E2g\x14[\u00B4h\u008C\\\u00ACb\u009C\x02M6^\u008C\u00CE\u0095@N\u00F8\u009E\u00B8\u009C\u00CC\u0097b\u009F\u009A\u009B\u00D6\u009B\u00FEk\u00A7\u00C5\u00AE\u0083\u0099o\u00B2\u00EC\u00B3\u00AF\u00EDQ\u00CF\u00ED\u00CC\u00B7\u00DE;_\u00B8\u00B7Xt\u00DF\u00A5\x12\u00E3\u00D2\u0099\u00B2\u00B2\u0083\u009E\u0087\r\u008EX\x1FM\u00A9\x1E8\u00C1\x7F\u0092\u00A9\x16\u00AD\u00FBv\u00E6c\u00FD\u00BB\u0086\u0095\u00C6\u0095\u008B\u00EF\u009B\u00D6.\u00FF\u00BCJj\u00E3\u00EFP\u00EA2\u00BF\u00EE\u00D5\x13\u00D1\u0097\u00DC\u009Fy+kp\u00D7\u009D\u00E4\u00BB\u00D1\u00F7\u00FCG\u008AG;\u00C6^\u008F\u008B>\u00DE\u00F1\u00B4f\u00EA\u00D5s\u0095\u0099\u00EC\u00B9\u00F1\x05\u00F9\u00C5\u0082\u00E5\u00C5\x15\u00ABw\u00E7?\u00B0|\u00CAX{\u00BB\x1E\u00FA}\u00F1'ms\x13\x00\u0098A\x11\u009C \t\u00AA\u00A0\x17^\"\u008C\u0088*\u00E2\u0083\u00E4\"\r\u00C80\u00F2\x1E\u00E5@uQ\x7F\u00B4\x00mF\u009F\u00E2p8\x05\u009C\x17.\x0Fw\x19\u00F7\x02\u00A3b\u00FAX\x14V\u008D\u00FD\u0085\u00FD\u00C2\u00AB\u00E0\u0083\u00F1\u00C7\u00F0\u00E3\x04f\u0082\x1D\u00A1\u0090p\u0087\u00C8@\u00B4'\u0096\x13'I\u0092$:\u00A9\u009F\u00CCE\u008E&\x0F2\u00883\u00E40,0\u00DA0vQ\u00E4)5TN\u00EA>&\x02S\x0E30g\u00B3\u00E0X\nX\u0099X\u008F\u00B0\u0089\u00B15\u00B1\x1B\u00B3\u008Fs\u00C4p\x128k\u00B9L\u00B8\u00E6\u00B8\u00F3y\x14x&x\u00B3\u00F9\u0094\u00F9f\u00F8\x0F\nl\x15\u00C4\x04\u00FB\u0085\u00F6\b[\u008APD&Dk\u00C5\x12\u00C4-%\u0084$\u00D6%'\u00A4\u00DA\u00A5O\u00CA\x1C\u0091-\u0093+\u0091/\u00D9R\u00AEP\u00A5xV\u00A9U\u00F9\u008E\u00CAs\u00D5\u00AF\u00EA\u009C\x1A\u00BA\u009AAZ%\u00DA\u00DD:\u00EF\u00F5$\u00F5\u00FD\f\u00AA\r\u00A7\u008C\u0085L\u0082M\u009B\u00CC~XXX\x16[\r[\u00E3m\u00B4l\x03\u00ED\u00F2\u00ED\u00CFn\u00BB\u00E10\u00E9\u00B8\u00EA\u008C\u00B9p\u00B9\u00CA\u00B9\x19\u00BB{y$x\u0096z]\u00F2\x1E\u00F1\u00F9\u00B0\u0083\u00CB\u00D7\u00C0/\u00D4\u00BF,\u00A0'\u00F0]\u00B0x\u0088ghi\u00D8`\u00F8\u00CFH\u00F5\u00A8\u0088\u00E8\x131\x0F\u00E2P\u009Aj\u00BC?\u00BD$\u00E1Z\u00E2R2s\u008AV\u00AA\x7FZqzG\u00C6\u00E2.\u00EEL\u00EB\u00DD\u00BB\u00B2Z\u00B2_\u00EF\x11\u00CF\u00DD\u0091W\u0095\u00FF\u00A4\u0080\u00BB\u00D0\u00AB\u00E8D\u00F1\u00CB\u00FD\n%\u00A9\u00A5\u0083e<\u00E5q\x07\u00EF\x1DV\u00AE\u00A8\u00AEd:ZXM9v\u00F8\u0084t\u00CD\u00EDS\x11u\u0094\u00D3-g\u00BD\u00CFa\r\u00CD\u008D~\x17Y.\u00DDlNmQ\u00BA\u00B2\u00D4Z\u00DF\x1E\u00D1\u00A9\u00D0\u00F5\u00F1zWON\u009F]?\u00F7\u00CD\u00F9\u0081\u00E6\u00DB;\u0087l\u0086y\u00EF\u008D\u008E\u00B8\u00DD\u009F\x7F\u0090\u00FEP\u00E8\u00D1\u00C8D\u00F1\x13\u0097I\u00A9i\u00E4\u00D9\u00DC\u008B\u00C1\u00D9\u00C6\u00F9\u00D2\x05\u00FA\u00A2\u00CB2\u00FF\u00EB\u009A\x15\u00E9\u00B7\u0097\u00DF\x1B\u00AE\u008E|\u00F4\u00FB\u00F4~-\u00EB+\u00F3\u00FA\u00D1\u00EFB?j~\u00F2\u00FD*\u00DD\u00DC\x04\x00n0\x01\x1A\u00D4\u00C0}\u00D8DT\u0091P\u00E4(2\u0080|B\u00C5Pg4\x17mGWp\u00A28O\u00DC\x01\u00DC\x10\u0086\u00C3\f\u00B1t\u00AC\x1D[\u00C3k\u00E0\u0093\u00F1\u00DD\x04<\u00C1\u0081PMxM\u00D4#\x1E .\u0091\u00CCI\u00A7\u00C9$2\u008D<\u00CD`\u00C7\u00D0\u00C7\u00A8\u00C5\u00D8E1\u00A5\u00DC\u00A3zQ_3e2s27\u00B38\u00B0|`\u00AD`3d[f?\u00CE\u00E1\u00C2I\u00E5\u00BC\u00CBU\u00C8m\u00C7\u00C3\u00C63\u00C9{\u0086\u008F\u00CEo\"\u00C0.\u00F0FpP\u00E8\u00B4p\u00BEH\u0094\u00A8\u00AB\u0098\u0089\u00B8\u00AA\u0084\u00B4\u00A4\u00B0\x14\u00BF4\u009F\u008C\u0088\u00AC\u00BC\u009C\u008E\u00BC\u00ED\u0096\x00\u0085\u009D\u008AUJ\u00DD\u00CA/U\u0099\u00D4\u00F4\u00D5\u00E9\x1A\u00974\u00DFkk\u00E8d\u00EB\u008E\u00E9\u00CB\x18\u00E4\x1A\u00BE2\u00B63i7\u00937?m)jUg-k\u00D3jgn\u00FF\u00C4\u0081\u00E6Dqnv\u00F5q'{t{%\u00FB\u00A8o_\u00F7\u00ED\u00F3\u00DF\x1F\u00E8\x1B\u00AC\x19J\t{\x1AQ\x15e\x1D\u00BD\x1C\u009B\x16\u00B7\x11\u009FH_HtL\u00BA\u0092\u00C2\u009AJO{\u0094\u00A1\u00BB\u00F3T&\u00E3\u00EE\u00D4\u00AC\u00C5\x1C\u00CF=\u00F7\u00F2L\u00F3\u00BB\n\u00D4\x0B\u00DB\u008A\r\u00F6\r\u0095x\u0095\u00BE)\u00CB<\u00C8z\u00A8\u00B6B\u00E9H\u00E7Q\u00C3\u00AA\u00DEc\u00FA\u00C7\u00DBj\u00F0'\u00EDN\x1D\u00AE}qZ\u00EEL\u00CA\u00D9\u0081s\u009C\r\u00A1\u00E7\u00BB.0]\f\u00BEt\u00BD\u0099\u00F32\u00ADe\u00F8\u00AALkQ\u00DB\u00DB\x0E\u00A7\u00CE\u00F6kB\u00D7\u00F3\u00BB\u00DF\u00F5z\u00F4\u00DD\u00E8\u0097\u00BFy\u00F8\u00D6\u00E6`\u00E4\u00EDGC\u00C6w\x1B\u00EFq\u00FD\u00950rw\u0094\u00FFA\u00F8\u00D8\u0085\u0087\u00AF\u00C7\u00C5'<\x1E\u00E7<9\u00F7\u00F4\u00EE\u00E4\u00C2\u00D4\u00C63\u0096\u00E7\u00C2/\u00E4g4fu\u00E7\f\u00E7\u008D_\x1A/\x18\u00BE\u00D2]\u00D4ZRY\u0096{-\u00F6\u0086\u00E9\u00CD\u00F2J\u00E7\u00DB\u0094w\x1A\u00EFV\u00DE\u009FY\u00F5\u00FA\u00C0\u00F0\u00E1\u00FA\u00C7\u00D0O,\u009F:>o_\u0083\u00B5\u00DA/\u00A6_\u00E6\u00BE\u00EE^\x17X\u00EF\u00FC\u00E6\u00F6m\u00F5\u00FB\u00BE\x1F\u00D2?\u00FA7|7\u00D6\x7F\x1E\u00FC\u00A5\u00F4kh3xs\x13 !TM\x15\x00\x00\x10\u008A)\x00\u00FE\u00F9\u00E6\u00E6')\x00b9\u00C0\u00CF\u00B2\u00CD\u00CD\x1F\u00B5\u009B\u009B?\u00EB\x00p\u00D3\x00}\u00D1\u00BF\u00FF+\x00\x00\b,\x00\u00C7\u00EA\u00FE\u00B77\u00D2\u00FF\x00\x1E\u00E1~\u0097\u00DA\u00DF0\u00FA\x00\x00\x00 cHRM\x00\x00m\u0098\x00\x00s\u008E\x00\x00\u00FA\u00CC\x00\x00\u0084\u00FA\x00\x00y\u0081\x00\x00\u00FD\x13\x00\x000m\x00\x00\x12)\r\x1E&N\x00\x00\x018IDATx\u00DA\u00B4U\u00B1\u008D\u00840\x10\x1C\x0Bbb*p\x17\u0088Z\x10%\u00D0\x07\r\x00\x12\t\x01\u009DP\x02\x11)=\u00D8\u008B\u00FD\u00C1k\r\x06\u00DF\u008BG\u00DC\u0086\u00D83;;\x1E-BJi\u00F1\u00A5\u008A\x01\u00A0\u00AA*X\u00FBn\u008F\u00BA\u00AE\x7F\u00C9\u0089\b\u00EB\u00BA\x06/\t!`\u00AD\u0085\x10\"x\u00CEgGqi\u009A\u00EE\u00CA\u0089\b\u00C6\u0098\u00D7To\u00DB\u00B6\u0093\x1Bc^\u00B1\u00859Xh\u00CC\u009D\u0088\u00C8\u008D>\u00CF3\u00A6i\u0082\u00D6\u00DA\x03K)\u0091\u00E7\u00F9\u00FF\u0094\x13\x11\u00AC\u00B5\u00AE\u00F3\u00B2,\x18\u00C7\x11I\u0092x\u00A0\u00B6m\u00D14\u00CD\u0085LJ\u0089,\u00CB\u009C\u00FFD\u00B4\u0093[k=\u00CF\u00FB\u00BE\u00F7\u00C6\u00E4*\u00CB\x12eY^\u00C8\u00BB\u00AEs\u00F8\u00A3H\u00A7\u009CGa\u00CF\u00E6y\u00BE\u00EDuQ\x14\x18\u0086\u00C1\u00A5\u00C6\u00B3e\u00DB6O\u00B91\x06R\u00CA\u00DB\u00E4\u00C6\x18\x0F\u00CFo\x15L\u00CB\u0093\u00E40&h\u00CBY\u00F9\u00D3l\x07\u00D3r\u008C\u00DD\x13rN\b\x00(\u00A5|\u00CF\u008FV<!\x0F\u00E1c\u00EEt\u00EC\u00FCT9\u00E7\u00DCS\u00AE\u00B5~\u0085<\u0098\u0096s\x14\u00BB\u00AE\u00FBHr\u00DE\u0092\u00A1\u00ADxyP\u00FE\x10\u00BA\u00FCW\u0085\u009Ay\u00CA\u0095R\u0088\u00A2\u00E8\u00D6\u00FE\u00BE\u00B3\u00CF\u00D9s\u00F1\u00CD\u00DF\u00DC\u00CF\x00\u00BC\u00EA,cS\\?\u00AD\x00\x00\x00\x00IEND\u00AEB`\u0082" ;
        this.w.res1.gr3.ok.onClick = this.w.res1.gr3.can.onClick = function(){keepRf.w.close();};
        this.w.res1.gr2.gr3.gr1.visible = 1;
        this.w.res1.gr2.gr3.gr2.visible = 0;
        this.w.res1.gr2.gr3.gr3.visible = 0;
        this.w.res1.gr2.gr1.drop.selection = 0;
        this.w.res1.gr2.gr2.drop.selection = 0;
        this.w.res1.gr2.gr2.chk.value = 0;
        }
    
        var gui=new Object();
        gui.sl1 = this.w.res0.gr2.sl1;
        gui.sl2 = this.w.res0.gr2.sl2;
        gui.sl3 = this.w.res0.gr2.sl3;
        gui.sl4 = this.w.res0.gr2.sl4;
        gui.ed01 = this.w.res0.gr3.ed1;
        gui.ed02 = this.w.res0.gr3.ed2;
        gui.ed03 = this.w.res0.gr3.ed3;
        gui.ed04 = this.w.res0.gr3.ed4;
        gui.ok = this.w.res1.gr3.ok;
        gui.can = this.w.res1.gr3.can;
        gui.list1=this.w.res1.gr1.gr1.gr3;
        gui.list2=this.w.res1.gr1.gr2.gr3;
        gui.create1=this.w.res1.gr1.gr1.gr1.create;
        gui.create2=this.w.res1.gr1.gr2.gr1.create;
        gui.del1=this.w.res1.gr1.gr1.gr1.del;
        gui.del2=this.w.res1.gr1.gr2.gr1.del;
        gui.up1=this.w.res1.gr1.gr1.gr1.up;
        gui.up2=this.w.res1.gr1.gr2.gr1.up;
        gui.down1=this.w.res1.gr1.gr1.gr1.down;
        gui.down2=this.w.res1.gr1.gr2.gr1.down;
        gui.ed1=this.w.res1.gr1.gr1.gr2.ed;
        gui.ed2=this.w.res1.gr1.gr2.gr2.ed;
        gui.dyGroup = this.w.res1.gr2.gr3;
        gui.typeDrop = this.w.res1.gr2.gr1.drop;
        gui.getEffectName = this.w.res1.gr2.gr3.gr1.bt1;
        gui.getEffectPara = this.w.res1.gr2.gr3.gr1.bt2;
        gui.browseAnimation = this.w.res1.gr2.gr3.gr2.bt1;
        gui.browseScript = this.w.res1.gr2.gr3.gr3.bt1;
        gui.ed3 = this.w.res1.gr2.ed;
        gui.ed4 = this.w.res1.gr2.gr4.ed;
        gui.modifiers = this.w.res1.gr2.gr2.chk;
        gui.clickDrop = this.w.res1.gr2.gr2.drop;
        gui.icon = this.w.res1.gr2.gr5.bt;
        gui.ed5 = this.w.res1.gr2.gr5.ed;
        gui.delPic = this.w.res1.gr2.gr5.bt1;
        gui.imports = this.w.res2.gr1.imports;
        gui.exports = this.w.res2.gr1.exports;
        gui.update = this.w.res3.gr1.update;
        gui.weibo = this.w.res3.gr1.weibo;
        gui.parse = this.w.res35.gr1.parse;
        gui.en = this.w.res36.gr1.en;
        gui.ch = this.w.res36.gr1.ch;
        gui.subName = this.w.res1.gr2.gr11.ed;
        
        gui.ed3.text0 = gui.ed3.text1 = gui.ed3.text2 = gui.ed3.text3 = gui.ed3.text4 = gui.ed3.text5 = gui.ed3.text6 = gui.ed3.text7 = "";
        gui.ed3.type0 = gui.ed3.type1 = gui.ed3.type2= gui.ed3.type3 = gui.ed3.type4 = gui.ed3.type5= gui.ed3.type6= gui.ed3.type7=0;
        gui.ed3.subName0 = gui.ed3.subName1 = gui.ed3.subName2= gui.ed3.subName3 = gui.ed3.subName4 = gui.ed3.subName5= gui.ed3.subName6= gui.ed3.subName7="";
        
        gui.en.onClick = function(){
                  app.settings.saveSetting('Sp_toolbar','language','en');
                  alert('Please restart script,the language has been translated to English.');
              }        
        gui.ch.onClick = function(){
                  app.settings.saveSetting('Sp_toolbar','language','ch');
                  alert('请重启脚本,语言已改变为中文');
              }
        
        
        gui.list2.onChange=function(){
                if(!gui.list1.selection) return;
                if (gui.list2.selection){
                    gui.ed2.text = this.selection.text;
                    if(gui.list2.selection.index!=0) gui.up2.enabled = 1;else gui.up2.enabled = 0;
                    if(gui.list2.selection.index!= gui.list2.children.length-1) gui.down2.enabled = 1; else gui.down2.enabled =0;
                    gui.ed3.parent.enabled = true;
                }else{
                    gui.ed3.parent.enabled = false;  
                    }
                if(!gui.list2.selection) return;
                var xml = sp_toolbar.getButtonInfo (gui.list1.selection.index, gui.list2.selection.index);
                gui.ed2.text = xml.buttonName;
                gui.modifiers.value = parseInt(xml.activeModifiers);
                sp_toolbar.notSaveButton = -1;
                gui.modifiers.onClick();
                gui.typeDrop.selection = typeArr.getId (xml.click.type);
                gui.typeDrop.notify("onChange");
                sp_toolbar.notSaveButton = 0;
                gui.ed3.text = xml.click.cmd;
                gui.ed4.text = xml.helpTip;
                if(xml.icon.toString()!="")
                gui.ed5.text = "Has Icon~";
                else
                gui.ed5.text = "";
                
                gui.ed3.text0 = xml.click.cmd;
                gui.ed3.subName0 = xml.click.subName;
                gui.ed3.type0 = typeArr.getId (xml.click.type);
                gui.ed3.text1 = xml.ctrl.cmd;
                gui.ed3.subName1 = xml.ctrl.subName;
                gui.ed3.type1 = typeArr.getId (xml.ctrl.type);
                gui.ed3.text2 = xml.shift.cmd;
                gui.ed3.subName2 = xml.shift.subName;
                gui.ed3.type2 = typeArr.getId (xml.shift.type);
                gui.ed3.text3 = xml.alt.cmd;
                gui.ed3.subName3 = xml.alt.subName;
                gui.ed3.type3 = typeArr.getId (xml.alt.type);
                gui.ed3.text4 = xml.ctrlShift.cmd;
                gui.ed3.subName4 = xml.ctrlShift.subName;
                gui.ed3.type4 = typeArr.getId (xml.ctrlShift.type);
                gui.ed3.text5 = xml.ctrlAlt.cmd;
                gui.ed3.subName5 = xml.ctrlAlt.subName;
                gui.ed3.type5 = typeArr.getId (xml.ctrlAlt.type);
                gui.ed3.text6 = xml.shiftAlt.cmd;
                gui.ed3.subName6 = xml.shiftAlt.subName;
                gui.ed3.type6 = typeArr.getId (xml.shiftAlt.type);
                gui.ed3.text7 = xml.ctrlShiftAlt.cmd;
                gui.ed3.subName7 = xml.ctrlShiftAlt.subName;
                gui.ed3.type7 = typeArr.getId (xml.ctrlShiftAlt.type);
                if(gui.modifiers.value==true){
                        gui.clickDrop.selection = parseInt(xml.lastModifier);
                        gui.subName.text=eval("gui.ed3.subName"+gui.clickDrop.selection.index);
                        gui.ed3.text = eval("gui.ed3.text"+gui.clickDrop.selection.index);
                        gui.typeDrop.selection = parseInt(eval("gui.ed3.type"+gui.clickDrop.selection.index));
                    }
            }
        
        gui.subName.onChanging = function(){
                eval("gui.ed3.subName"+gui.clickDrop.selection.index+"=\""+gui.subName.text+"\"");
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        
        gui.list1.onChange= function(){
                if (gui.list1.selection){
                    gui.ed1.text = this.selection.text;
                    if(gui.list1.selection.index!=0) gui.up1.enabled = 1;else gui.up1.enabled = 0;
                    if(gui.list1.selection.index!= gui.list1.children.length-1) gui.down1.enabled = 1; else gui.down1.enabled =0;
                    gui.list2.parent.enabled = true;
                    var xml = new XML(special_file.readd());
                    var thisXml = xml.Group.child(gui.list1.selection.index);
                    gui.list2.removeAll();
                    for (var i =0;i<thisXml.children().length();i++){
                        gui.list2.add("item",thisXml.child(i).buttonName);
                        }
                    if(!gui.list2.selection) gui.ed3.parent.enabled = false;
                }else{
                    gui.list2.parent.enabled = false;  
                    gui.ed3.parent.enabled = false;
                    }
                   sp_toolbar.drop.selection = this.selection.index;
            }
        
        gui.ed3.onChange = function(){
                if (!gui.typeDrop.selection) return;
                if (!gui.clickDrop.selection) return;
                eval("gui.ed3.text"+gui.clickDrop.selection.index+"=gui.ed3.text;");
                eval("gui.ed3.type"+gui.clickDrop.selection.index+"=gui.typeDrop.selection.index;");
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        
        gui.clickDrop.onChange =function(){
                gui.ed3.text = eval("gui.ed3.text"+this.selection.index);
                gui.typeDrop.selection = parseInt(eval("gui.ed3.type"+this.selection.index));
                gui.subName.text=eval("gui.ed3.subName"+this.selection.index);
                sp_toolbar.notSaveButton =-1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton =0;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        
        gui.modifiers.onClick = function(){
                if(this.value){
                    this.parent.drop.enabled = 1;
                }else{
                    this.parent.drop.enabled = 0;
                    this.parent.drop.selection =0;
                    this.parent.drop.notify("onChange");
                }
                
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        sp_toolbar.notSaveButton=-1;
        gui.modifiers.onClick();
        sp_toolbar.notSaveButton=0;
        
        gui.browseAnimation.onClick = function(){
                var special_file = File.openDialog ("Select animation preset", ["*.ffx"]);
                if (!special_file) return;
                gui.ed3.text = decodeURIComponent(special_file.toString());
                gui.ed4.text = decodeURIComponent(special_file.toString().split("/")[special_file.toString().split("/").length-1]);
                sp_toolbar.notSaveButton =-1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton =0;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }        
        
        gui.browseScript.onClick = function(){
                var special_file = File.openDialog ("Select script preset");
                if (!special_file) return;
                gui.ed3.text = decodeURIComponent(special_file.toString());
                gui.ed4.text = decodeURIComponent(special_file.toString().split("/")[special_file.toString().split("/").length-1]);
                if (decodeURIComponent(special_file.toString().split("/")[special_file.toString().split("/").length-2])=="ScriptUI Panels"){
                        var conf = confirm (special_loc>>special_str.changeScriptType);
                        if (conf){
                            gui.typeDrop.selection=4;
                            gui.typeDrop.notify("onChange");
                            gui.ed3.text = gui.ed4.text;
                            }
                    }
                sp_toolbar.notSaveButton =-1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton =0;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        
        gui.getEffectName.onClick = function(){
                try{
                    var comp=app.project.activeItem;
                    var selectProp = comp.selectedProperties[0];
                    gui.ed3.text = selectProp.matchName;    
                    gui.ed4.text = selectProp.name;
                    }catch(err){alert(err)}
                sp_toolbar.notSaveButton =-1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton =0;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        
        
        
        gui.getEffectPara.onClick = function(){
                try{
                    var comp=app.project.activeItem;
                    var selectProp = comp.selectedProperties[0];
                    
                var str1 = """var comp = app.project.activeItem;
if(comp && comp.selectedLayers.length > 0){
	for(var i = 0 ; i < comp.selectedLayers.length ; i++){
		var layer = comp.selectedLayers[i];
		var fx = layer.Effects.addProperty('"""+selectProp.matchName+"""');
          fx.name = '"""+selectProp.name+"""';      
                """;
                for (var i=0;i<selectProp.numProperties;i++){
                        var prop = selectProp.property(i+1);
                        try{
                        var str = "try{fx.property(String('"+prop.matchName+"')).setValue("+prop.valueAtTime (0,false).toSource()+");}catch(err){}\r";
                        str1+=str;
                        }catch(err){}
                    }
                str1+="}}";
                gui.typeDrop.selection = 5;
                sp_toolbar.notSaveButton = -1;
                gui.typeDrop.notify("onChange");
                sp_toolbar.notSaveButton = 0;
                gui.ed3.text = str1;
                gui.ed4.text = selectProp.name;
                sp_toolbar.notSaveButton =-1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton =0;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
                }catch(err){alert(err)}
            }
        
        gui.delPic.onClick = function(){
                if(!sp_toolbar.drop.selection) return;
                gui.ed5.text = "";
                var preIndex = sp_toolbar.drop.selection.index;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,"")
                }
                    try{
                        sp_toolbar.drop.removeAll();
                        var xml = new XML(special_file.readd());
                        for (var i=0;i<xml.Group.children().length();i++){
                                droplist.add("item",xml.Group.child(i).@groupName);
                            } 
                        sp_toolbar.drop.selection = preIndex;
                        }catch(err){}
            }
        
        gui.icon.onClick = function(){
            try{
                var files = File.openDialog ("Select icon");
                if (!files) return;
                if(files.toString().indexOf(".jpg")==-1&&files.toString().indexOf(".png")==-1) return;
                if(!gui.list2.selection) return;
                gui.ed5.text = "Has Icon~";
                files.open("r");
                files.encoding = "BINARY";
                var content = encodeURIComponent(files.read());
                files.close();
                group.children[gui.list2.selection.index].image = decodeURIComponent (content);
                group.children[gui.list2.selection.index].onDraw = sp_toolbar.newDraw;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,content);
                }
                }catch(err){alert(err.line.toString()+"\r"+err.toString())}
                sp_toolbar.drop.onChange();
            }
        
        
        gui.typeDrop.onChange = function(){
                eval("gui.ed3.type"+gui.clickDrop.selection.index+"=gui.typeDrop.selection.index;");
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
                    if(this.selection.index ==0){
                        gui.dyGroup.gr1.visible = 1;
                        gui.dyGroup.gr2.visible = 0;
                        gui.dyGroup.gr3.visible = 0;
                     }else  if(this.selection.index ==1){
                        gui.dyGroup.gr1.visible = 0;
                        gui.dyGroup.gr2.visible = 0;
                        gui.dyGroup.gr3.visible = 0;
                     }else  if(this.selection.index ==2){
                        gui.dyGroup.gr1.visible = 0;
                        gui.dyGroup.gr2.visible = 1;
                        gui.dyGroup.gr3.visible = 0;
                     }else  if(this.selection.index ==3){
                        gui.dyGroup.gr1.visible = 0;
                        gui.dyGroup.gr2.visible = 0;
                        gui.dyGroup.gr3.visible = 1;
                     }else  if(this.selection.index ==4){
                        gui.dyGroup.gr1.visible = 0;
                        gui.dyGroup.gr2.visible = 0;
                        gui.dyGroup.gr3.visible = 0;
                     }else  if(this.selection.index ==5){
                        gui.dyGroup.gr1.visible = 0;
                        gui.dyGroup.gr2.visible = 0;
                        gui.dyGroup.gr3.visible = 0;
                     }else  if(this.selection.index ==6){
                        gui.dyGroup.gr1.visible = 0;
                        gui.dyGroup.gr2.visible = 0;
                        gui.dyGroup.gr3.visible = 0;
                     }
            }
    
        gui.create1.onClick =function(){
                if (gui.ed1.text !=""){
                        var item = gui.list1.add("item",gui.ed1.text);
                        sp_toolbar.addGroup (gui.ed1.text);
                        gui.list1.selection = item;
                        if (gui.list1.items.length==1) sp_toolbar.view.hasDroplist = 0;else sp_toolbar.view.hasDroplist = 1;
                        var item = sp_toolbar.drop.add("item",gui.ed1.text);
                        sp_toolbar.drop.selection = item;
                    }
            }        
        
        gui.del1.onClick =function(){
                if (gui.list1.items.length <= 1) return;
                if (gui.list1.selection){
                        sp_toolbar.delGroup (gui.list1.selection.index);
                        sp_toolbar.drop.remove (gui.list1.selection.index);
                        gui.list1.remove (gui.list1.selection);
                        sp_toolbar.drop.selection=0;
                        gui.ed3.parent.enabled =false;
                    }
                    if(gui.list1.items.length==0){
                            var l =group.children.length;
                            for (var i=0;i<l;i++){
                                    group.remove(l-1-i);
                                }
                                gui.list2.parent.enabled = 0;
                        }
                    
                    group.parent.onResize();
            }
        gui.ed4.onChange = function(){
                try{
                        group.children[gui.list2.selection.index].helpTip = this.text;
                    }catch(err){alert(err)}
                sp_toolbar.notSaveButton =-1;
                gui.ed3.notify("onChange");
                sp_toolbar.notSaveButton =0;
                if(sp_toolbar.notSaveButton != -1){
                    sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5)
                }
            }
        
        gui.ed1.onChange = gui.ed2.onChange = function(){
                if(this.text =="") return;
                if(!this.parent.parent.gr3.selection) return;
                var preIndex = this.parent.parent.gr3.selection.index;
                this.parent.parent.gr3.selection.text = this.text;
                sp_toolbar.saveButton(gui.list1,gui.list2,gui.ed2,gui.modifiers,gui.ed3,gui.clickDrop,gui.ed4,gui.ed5);
                this.parent.parent.gr3.notify("onChange");
                this.parent.parent.gr3.selection = preIndex;
                sp_toolbar.drop.onChange();
                if(this.parent.parent.text ==(special_loc>>special_str.toolbars)){
                        sp_toolbar.drop.selection.text = this.text;
                        sp_toolbar.renameGroup(this.parent.parent.gr3.selection.index,this.text);
                    }else{
                        group.children[gui.list2.selection.index].text = this.text;                        
                        }
            }

        gui.up1.onClick =function(){
                if (!gui.list1.selection) return;
                if (gui.list1.selection.index==0) return;
                    sp_toolbar.upGroup(gui.list1.selection.index);
                    var preIndex = gui.list1.selection.index;
                    var xml = new XML(special_file.readd());
                    gui.list1.removeAll();
                    for (var i=0;i<xml.Group.children().length();i++){
                            gui.list1.add("item",xml.Group.child(i).@groupName);
                        }
                    gui.list1.selection = preIndex-1; 
                    gui.list1.notify("onChange");
                    sp_toolbar.drop.onChange();
                    sp_toolbar.swap(sp_toolbar.drop.items[preIndex-1],sp_toolbar.drop.items[preIndex]);
                    if(gui.list1.selection.index ==0) this.enabled = 0;
                    if(gui.list1.selection.index!=0) gui.up1.enabled = 1;
                    if(gui.list1.selection.index!= gui.list1.children.length-1) gui.down1.enabled = 1;
            }        
        
        gui.down1.onClick =function(){
                if (!gui.list1.selection) return;
                if (gui.list1.selection.index==gui.list1.items.length-1) return;
                    var preIndex = gui.list1.selection.index;
                    sp_toolbar.downGroup(gui.list1.selection.index);
                    var xml = new XML(special_file.readd());
                    gui.list1.removeAll();
                    for (var i=0;i<xml.Group.children().length();i++){
                            gui.list1.add("item",xml.Group.child(i).@groupName);
                        }
                    gui.list1.selection = preIndex+1; 
                    gui.list1.notify("onChange");
                    sp_toolbar.drop.onChange();
                    sp_toolbar.swap(sp_toolbar.drop.items[preIndex+1],sp_toolbar.drop.items[preIndex]);
                    if(gui.list1.selection.index == gui.list1.children.length-1) this.enabled =0;
                    if(gui.list1.selection.index!=0) gui.up1.enabled = 1;
                    if(gui.list1.selection.index!= gui.list1.children.length-1) gui.down1.enabled = 1;
            }
        
        gui.create2.onClick = function(){
                    if(!gui.list1.selection) return;
                    if(gui.ed2.text=="") return;
                    var item=gui.list2.add("item",gui.ed2.text);
                    sp_toolbar.addButton(gui.list1.selection.index,gui.ed2.text);
                    gui.list2.selection = item;
                    sp_toolbar.drop.onChange();
            }
        
        gui.del2.onClick = function(){
                if(!gui.list1.selection) return;
                if(!gui.list2.selection) return;
                var preIndex = gui.list2.selection.index;
                sp_toolbar.delButton (gui.list1.selection.index, gui.list2.selection.index);
                gui.list2.remove(gui.list2.selection);
                sp_toolbar.drop.onChange();
                if(preIndex-1>=0){
                gui.list2.selection = preIndex -1;
                gui.ed3.parent.enabled =false;
                }
                }
            
        gui.up2.onClick = function(){
                if (!gui.list1.selection) return;
                if (!gui.list2.selection) return;
                if (gui.list2.selection.index==0) return;
                    sp_toolbar.upButton (gui.list1.selection.index, gui.list2.selection.index);
                    var preIndex = gui.list2.selection.index;
                    var tempText = gui.list2.items[preIndex-1].text ;
                    gui.list2.items[preIndex-1].text = gui.list2.selection.text;
                    gui.list2.selection.text = tempText;
                    gui.list2.selection = gui.list2.items[preIndex-1];
                    gui.list2.notify("onChange");
                    sp_toolbar.drop.onChange();
                    if(gui.list2.selection.index ==0) this.enabled = 0;
                    if(gui.list2.selection.index!=0) gui.up2.enabled = 1;
                    if(gui.list2.selection.index!= gui.list2.children.length-1) gui.down2.enabled = 1;
            }
        
        gui.down2.onClick =function(){
                if (!gui.list1.selection) return;
                if (!gui.list2.selection) return;
                if (gui.list2.selection.index==gui.list2.items.length-1) return;
                    sp_toolbar.downButton (gui.list1.selection.index, gui.list2.selection.index);
                    var preIndex = gui.list2.selection.index;
                    var tempText = gui.list2.items[preIndex+1].text ;
                    gui.list2.items[preIndex+1].text = gui.list2.selection.text;
                    gui.list2.selection.text = tempText;
                    gui.list2.selection = gui.list2.items[preIndex+1];
                    gui.list2.notify("onChange");
                    sp_toolbar.drop.onChange();
                    if(gui.list2.selection.index == gui.list2.children.length-1) this.enabled =0;
                    if(gui.list2.selection.index!=0) gui.up2.enabled = 1;
                    if(gui.list2.selection.index!= gui.list2.children.length-1) gui.down2.enabled = 1;
            }
                
         gui.sl1.onChange = gui.sl1.onChanging = function(){
                    gui.ed01.text = parseInt(this.value);
                    view.itemSize[0] = parseInt(this.value);
                    win.onResize();
             }         
         
         gui.sl2.onChange = gui.sl2.onChanging = function(){
                    gui.ed02.text = parseInt(this.value);
                    view.itemSize[1] = parseInt(this.value);
                    win.onResize();
             }         
         
         gui.sl3.onChange = gui.sl3.onChanging = function(){
                    gui.ed03.text = parseInt(this.value-5);
                    view.itemSpacing[0] = parseInt(this.value-5);
                    win.onResize();
             }         
         
         gui.sl4.onChange = gui.sl4.onChanging = function(){
                    gui.ed04.text = parseInt(this.value-5);
                    view.itemSpacing[1] = parseInt(this.value-5);
                    win.onResize();
             }
    
        gui.ok.onClick = function(){
                var str = parseInt(view.itemSize[0])+","+parseInt(view.itemSize[1]);
                app.settings.saveSetting("Sp_toolbar", "buttonSize",str);
                var str = parseInt(view.itemSpacing[0])+","+parseInt(view.itemSpacing[1]);
                app.settings.saveSetting("Sp_toolbar", "buttonSpacing",str);
                sp_toolbar.close = -1;
                keepRf.w.close();
                sp_toolbar.close = 0;
                sp_toolbar.drop.onChange();
            }
        
        gui.can.onClick = function(){
                var conf = confirm(special_loc>>special_str.quit);
                if(conf==true){
                    backupFile.copy(special_file);
                    /******拷贝回来*********/
                    try{
                        sp_toolbar.drop.removeAll();
                        var xml = new XML(special_file.readd());
                        for (var i=0;i<xml.Group.children().length();i++){
                                droplist.add("item",xml.Group.child(i).@groupName);
                            } 
                        sp_toolbar.drop.selection = 0;
                        }catch(err){}
                    /*****************/
                    var str = app.settings.getSetting("Sp_toolbar", "buttonSize");
                    var stra = app.settings.getSetting("Sp_toolbar", "buttonSpacing");
                    view.itemSize = [parseInt(str.split(",")[0]),parseInt(str.split(",")[1])];
                    view.itemSpacing = [parseInt(stra.split(",")[0]),parseInt(stra.split(",")[1])];
                    win.onResize();
                    sp_toolbar.close = -1;
                    keepRf.w.close();
                    sp_toolbar.close = 0;
                    }
            }
        
        keepRf.w.onClose = function(){
                sp_toolbar.drop.enabled = 1;
                if (sp_toolbar.close == -1 ) return;
                var conf = confirm(special_loc>>special_str.save);
                if(conf==true){
                    var str = parseInt(view.itemSize[0])+","+parseInt(view.itemSize[1]);
                    app.settings.saveSetting("Sp_toolbar", "buttonSize",str);
                    var str = parseInt(view.itemSpacing[0])+","+parseInt(view.itemSpacing[1]);
                    app.settings.saveSetting("Sp_toolbar", "buttonSpacing",str);
                    }else{
                    backupFile.copy(special_file);
                    /******拷贝回来*********/
                    try{
                        sp_toolbar.drop.removeAll();
                        var xml = new XML(special_file.readd());
                        for (var i=0;i<xml.Group.children().length();i++){
                                droplist.add("item",xml.Group.child(i).@groupName);
                            } 
                        sp_toolbar.drop.selection = 0;
                        }catch(err){}
                    /*****************/
                    var str = app.settings.getSetting("Sp_toolbar", "buttonSize");
                    var stra = app.settings.getSetting("Sp_toolbar", "buttonSpacing");
                    view.itemSize = [parseInt(str.split(",")[0]),parseInt(str.split(",")[1])];
                    view.itemSpacing = [parseInt(stra.split(",")[0]),parseInt(stra.split(",")[1])];
                    win.onResize();
                        }
            }
        
        gui.ed01.onChange = function(){
                this.text = parseInt(this.text);
                gui.sl1.value = parseInt(this.text);
                gui.sl1.notify("onChange");
            }       
        
        gui.ed02.onChange = function(){
                this.text = parseInt(this.text);
                gui.sl2.value = parseInt(this.text);
                gui.sl2.notify("onChange");
            }        
        gui.ed03.onChange = function(){
                this.text = parseInt(this.text);
                gui.sl3.value = parseInt(this.text)+5;
                gui.sl3.notify("onChange");
            }        
        gui.ed04.onChange = function(){
                this.text = parseInt(this.text);
                gui.sl4.value = parseInt(this.text)+5;
                gui.sl4.notify("onChange");
            }
        
        gui.exports.onClick = function(){
                var thisFile = Folder.selectDialog ("Select your folder");
                if (!thisFile) return;
                special_file.copy(thisFile.toString()+"/Sp_toolbar_config.xml");
            }        
        
        gui.imports.onClick = function(){
                var thisFile = File.openDialog ("Select your config",["*.xml"]);
                if(!thisFile) return;
                thisFile.copy(special_file);
                alert((special_loc>>special_str.importOk));
                gui.ok.notify("onClick");
                try{
                        win.close();
                    }catch(err){}
            }
        
        gui.update.onClick = function(){
            try{
                        var  GetVersion= function(scriptname){ // eg expression-toolbox
                           var url = sp_toolbar.ip+"/script/"+scriptname+".txt"; 
                           
                           var port=80;
                           var domain=url.split("/")[0]+":"+port;
                           var fileName=url.substr(url.lastIndexOf("/")+1);
                           var call="GET ";
                           if(url.indexOf("/")<0){
                              call+="/";
                           }else{
                              call+=url.substr(url.indexOf("/"));
                           }
                           call+=" HTTP/1.1\n";
                           call+="Host: "+domain+"\n\n";
                           call+="Connection: close\n\n";

                           var reply = new String();
                           var special_file = new File();
                           special_file.encoding = "binary";
                           special_file.open("w");
                           var conn = new Socket();
                           conn.encoding = "binary";
                           if (conn.open (domain, "binary")) {
                               conn.write (call);
                        reply = conn.read(300);
                        var contentLengthHeader = String(reply.match(/Content-Length: [0-9]*/));
                        var contentLength = contentLengthHeader.substr (16);
                        var headerLength = reply.indexOf("\n\n")+2;
                        reply += conn.read(contentLength + headerLength - 300);  
                        var recievedVersion = reply.toString().substring(reply.toString().lastIndexOf("BeginVersion")+12,reply.toString().lastIndexOf("EndVersion"));

                        conn.close();
                           }else{
                              reply = "";
                           }

                          return recievedVersion; 
                        }
                 var latest = parseFloat(GetVersion("Sp_toolbar"));
                 var nowVersion = parseFloat(version);
                 if(latest > nowVersion){
                        alert((special_loc>>special_str.newVersionFind)+latest.toString());
                        var a = confirm (special_loc>>special_str.whatUpdate);
                        if (a==true){ 
                            sp_toolbar.openLink(sp_toolbar.downloadLink+".jsxbin");
                            }
                     }else{
                         alert(special_loc>>special_str.noNew);
                         }
                     }catch(err){alert(err.line.toString()+err.toString())}
            }
        
        gui.weibo.onClick =function(){
                sp_toolbar.openLink(sp_toolbar.weiboLink);
            }
        
        gui.parse.onClick = function(){
              try{
                var inFile = File.openDialog ("Please select xml",["*.json"]);
                if (inFile==null) return;
                 var content = inFile.readd();
               try{
                    var index = content.indexOf ("\"editBtn\":");
                    if (index == -1) return alert(special_loc>>special_str.notFt);
                    var string = content;
//~                     var string = content.substring (0,index)+"}}";
                    }catch(err){alert(err)}


                    var wowObj=eval('('+string+')');

                    
                    var jsonToXml = function(json) {
                        var level = 0;
                        var str = '';
                        str += createXml(json, 'xml', level);
                        return str;

                        function createXml(json, name, level) {
                            if(name == 'properties') return '';
                            var str = '';
                            var space = getSpace(level);
                            //如果json为数字或者字符串
                            if(typeof(json) == 'number' || typeof(json) == 'string') {
                                str += space + '<' + name + '>';
                                str += space + '	' + json;
                                str += space + '</' + name + '>';
                            }
                            //如果为数组
                            else if(json instanceof Array) {
                                str += arrayTo(json, name, level);
                            }
                            //如果为json对象
                            else if(json instanceof Object) {
                                str += objectTo(json, name, level);
                            }
                            return str;
                        }//end of createXml
                        function arrayTo(array, name, level) {
                            var str = '';
                            var space = getSpace(level);
                            var len = array.length;
                            for(var i = 0; i < len; i++) {
                                //added for another script
                                //if(array[i].properties){
                                //	name = array[i].properties.type;
                                //}
                                //
                                str += createXml(array[i], name, level);
                            }
                            return str;
                        }//end of arrayTo
                        function objectTo(obj, name, level) {
                            var str = '';
                            var space = getSpace(level);
                            str += space + '<' + name;
                            var cmdContent = [];
                            for(var i in obj) {
                                if(typeof(obj[i]) == 'number' || typeof(obj[i]) == 'string'){
                                    if(i == 'cmd'){
                                            cmdContent.push(obj[i].replace(/\"/g,"\'").toString());
                                            continue;
                                        }
                                    var attr = i;
                                    if(i[0] == '_') attr = i.slice(1);
                                    if (typeof(obj[i])=='string')
                                        str += ' ' + attr.toString() + '=\"' + obj[i].replace(sp_toolbar.regExp,"\'").toString() + '\"';
                                    else
                                        str += ' ' + attr.toString() + '=\"' + obj[i].toString() + '\"';
                                }
                            }
                            str += '>';
                            for(var i in obj) {
                                if(typeof(obj[i]) == 'number' || typeof(obj[i]) == 'string'&&cmdContent.length==0){
                                    continue;
                                }
                                if(cmdContent.length==0)
                                    str += createXml(obj[i], i, level + 1);
                                else
                                    str += encodeURIComponent (cmdContent.pop());
                            }
                            str += space + '</' + name + '>';
                            return str;
                        }//end of objectTo
                        function getSpace(level) {
                            var space = '\n';
                            for(var k = 0; k < level; k++){
                                space += '	';
                            }
                            return space;
                        }//end of getSpace
                    }
                
                    var str = jsonToXml(wowObj);
                    var xmlL = new XML(str);

                 
                 /*转换完毕*/
                 view.itemSize=[parseInt(xmlL.general.btnsSettings.size.@x),parseInt(xmlL.general.btnsSettings.size.@y)];
                 view.itemSpacing=[parseInt(xmlL.general.btnsSettings.spacing.@x),parseInt(xmlL.general.btnsSettings.spacing.@y)];
                 gui.sl1.value = view.itemSize[0];
                 gui.sl2.value = view.itemSize[1];
                 gui.sl3.value = view.itemSpacing[0]+5;
                 gui.sl4.value = view.itemSpacing[1]+5;
                 gui.ed01.text = view.itemSize[0];
                 gui.ed02.text = view.itemSize[1];
                 gui.ed03.text = view.itemSpacing[0];
                 gui.ed04.text = view.itemSpacing[1];
                 for(var jj=0;jj<xmlL.children().length()-1;jj++){
                 if(xmlL.child(jj).localName() != "toolbars")
                        break;
                 sp_toolbar.addGroup(xmlL.child(jj).@name.toString());
                 var id = sp_toolbar.getLastGroupId()-1;
                 for (var ii=0;ii<xmlL.child(jj).children().length();ii++){
                    var xml = xmlL.child(jj).child(ii);
                    var a=xml.@shortName.toString();
                    var b="1"; 
                    var c= decodeURIComponent (xml.cmdDefault.toString());
                    var d=xml.cmdDefault.@type.toString();
                    var e=decodeURIComponent (xml.cmdCtrl.toString());
                    var f=xml.cmdCtrl.@type.toString();
                    var g=decodeURIComponent (xml.cmdShift.toString());
                    var h=xml.cmdShift.@type.toString();
                    var i=decodeURIComponent (xml.cmdAlt.toString());
                    var j=xml.cmdAlt.@type.toString();
                    var k=decodeURIComponent (xml.cmdCtrlShift.toString());
                    var l =xml.cmdCtrlShift.@type.toString();
                    var m=decodeURIComponent (xml.cmdCtrlAlt.toString());
                    var n=xml.cmdCtrlAlt.@type.toString();
                    var o=decodeURIComponent (xml.cmdShiftAlt.toString());
                    var p = xml.cmdShiftAlt.@type.toString();
                    var q=decodeURIComponent (xml.cmdCtrlShiftAlt.toString());
                    var r=xml.cmdCtrlShiftAlt.@type.toString();
                    var s=xml.@lastModifier.toString();
                    var t=xml.@longName.toString();
                    var u=xml.@icon.toString();
                    try{
                          if(u !="")
                              u = encodeURIComponent(unescape(wowObj.icons[u].bin));
                    }catch(err){u= "";}
                    sp_toolbar.parseButton(id,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u);
                 }
                }
                    try{
                        sp_toolbar.drop.removeAll();
                        var xml = new XML(special_file.readd());
                        for (var i=0;i<xml.Group.children().length();i++){
                                droplist.add("item",xml.Group.child(i).@groupName);
                            } 
                        sp_toolbar.drop.selection = sp_toolbar.drop.items.length-1;
                        }catch(err){}
                    var xml = new XML(special_file.readd());
                    gui.list1.removeAll();
                    for (var i=0;i<xml.Group.children().length();i++){
                            gui.list1.add("item",xml.Group.child(i).@groupName);
                        }
                    if(gui.list1.items.length!=0){
                    gui.list1.selection = 0; 
                    gui.list1.notify("onChange");
                    }
                win.onResize();
                alert("Parse complete!");
                }catch(err){alert(err.toString()+err.line.toString())}
            }

                
                
                var xml = new XML(special_file.readd());
                for (var i=0;i<xml.Group.children().length();i++){
                        gui.list1.add("item",xml.Group.child(i).@groupName);
                    }

                gui.sl1.value = view.itemSize[0];
                gui.sl2.value = view.itemSize[1];
                gui.sl3.value = view.itemSpacing[0]+5;
                gui.sl4.value = view.itemSpacing[1]+5;
                gui.ed01.text = view.itemSize[0];
                gui.ed02.text = view.itemSize[1];
                gui.ed03.text = view.itemSpacing[0];
                gui.ed04.text = view.itemSpacing[1];
                
                if(groupIndex!=-1){
                gui.list1.selection = groupIndex;
                gui.list2.notify("onChange");
                gui.list2.selection = 0;
                gui.list2.notify("onChange");
                }else{
                    gui.list2.parent.enabled = 0;
                    gui.ed3.parent.enabled = 0;
                    }
        
        this.w.center();
        this.w.show();
    
}   //SettingWin function end

}  // Sp_toolbar function end
