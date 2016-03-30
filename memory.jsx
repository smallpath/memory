try{
     
      
(function(global){
      
    #include 'Sp_memory/lib/StringResource.jsx'
    #include 'Sp_memory/lib/HelperScripts.jsx'
    #include 'Sp_memory/lib/SubSystems.jsx'
    #include 'Sp_memory/lib/RightClickMenu.jsx'
    #include 'Sp_memory/lib/LayerObject.jsx'
    #include 'Sp_memory/lib/GridView.jsx'
    #include 'Sp_memory/lib/UIParser.jsx'
      
      
    var fns = sp.fns = new fns();
 
 
    //~ Create UI
    var win = global instanceof Panel ? global : new Window("window",sp.scriptName, undefined, {resizeable: true});
    var group1 = win.add("Group{orientation: 'column', alignment: ['fill','fill'],spacing:0,margins:0}");
    var group11 = group1.add("Group{orientation: 'row', alignment: ['fill','fill'],spacing:0,margins:0}");
    var parentDroplist = sp.parentDroplist = group11.add("Dropdownlist{}");
    var droplist  = sp.droplist = group11.add("Dropdownlist{}");
    var gv = sp.gv = new GridView(group1);
    



    //~ Set GridView's attributes
    gv.limitText = sp.getSettingAsBool ("limitText");
    gv.showText = sp.showThumbValue ;
    gv.version =  parseInt(app.version.split(".")[0])==12?"CC":"CC2014";
    
    //~ Binding eventHandlers to mouse click and Window
    gv.leftClick = fns.leftClick;
    gv.rightClick = fns.rightClick;
    gv.leftDoubleClick = fns.newLayer;
//~     gv.mouseOut = sp.fns.moveOut;
    gv.mouseMove = fns.moveOver;
    parentDroplist.onChange = fns.parentDroplistChange;
    droplist.onChange = fns.droplistChange;
    

    sp.reloadParentDroplist();
    var selection = parseInt(sp.getSetting("parentSelection"));
    parentDroplist.selection = (selection<=parentDroplist.items.length-1 &&selection>=0)?selection:0;
    var selection = parseInt(sp.getSetting("thisSelection"));
    droplist.selection = (selection<=droplist.items.length-1 &&selection>=0)?selection:0;
    
     sp.renderTaskArray.forEach (function(item,index){
              app.cancelTask (item);
     });
     sp.renderTaskArray.length = 0;
     sp.previewHelper = {};
    
    win.onResize =win.onResizing =fns.winResize;
    
    if(win instanceof Panel){    //~ Show Panel
            win.layout.layout(1);         
        }else{                            //~ Show Palette and set its size && location

            win.location= sp.getSetting("winLocation").split(",");
//~             win.location = [100,200];
            win.show();      
            win.size= sp.getSetting ("winSize").split(",");
//~             win.size = [100,200];
            win.onClose= fns.winClose;
    }

    win.onResize();
    
    


    

    function fns(){
            var keepRef = this;
            this.previewAll = function(){
                
                    if(sp.gv.children.length ==0) return; 
                
                    keepRef.moveOut();
                    
                    var lenArr = [];
                    var oneFrame = sp.frameSecond;
                    sp.previewHelper = {};
                    var items = (sp.gv.selection.length==0)?sp.gv.children:sp.gv.selection;
                    

                    
                    for(var iter=0,thisLen=items.length;iter<thisLen;iter++){
                        var item = items[iter];
                        var img = item.image ; 
                        var index = item.index;
                        
                        if(!img.parent) return;
                        var folder = new Folder(img.parent);
                        
                        if(!(folder instanceof Folder)) return;
                        var targetFolder = new Folder(folder.toString()+sp.slash+img.displayName.replace(/.png/i,"")+"_seq");
                        
 
                        try{
                        if(!targetFolder.exists){
                                if(targetFolder.parent.toString().indexOf("_seq")==-1  ){
                                        targetFolder = new Folder(folder.parent.toString()+sp.slash+img.displayName.replace(/.png/i,"")+"_seq");
                                        img = new File(folder.parent.toString()+sp.slash+item.text+".png");
                                    }
                            }
                        }catch(err){
//~                                 cout<<"----"+decodeURIComponent ( targetFolder.toString())+'\r\nseq folder not found\r'+iter ;
                            }
                        
                        if(!targetFolder.exists){
//~                                 cout<<decodeURIComponent ( targetFolder.toString())+'\r\nseq folder not found\r'+iter;
                                continue;
                            }
                        if(!img.exists){ 
//~                                 cout<<'image not found\r'+iter ;
                                continue;
                            }
                        



                        sp.previewHelper["item"+index] = {};
                        sp.previewHelper["item"+index]["tempItem"] = item;
                        sp.previewHelper["item"+index]["tempImg"] = img;
                        sp.previewHelper["item"+index]["currentIndex"] = 0;
                        sp.previewHelper["item"+index]["tempFiles"] = (function(f){
                                var len = f.getFiles().length;
                                var arr =[];
                                for(var i=0;i<len;i++){
                                    var newFile = new File(f.toString()+sp.slash+i.toString()+".png");
                                    if(newFile.exists)
                                        arr.push(newFile);
                                    }
                                return arr;
                            })(targetFolder);
                        
                        lenArr.push(sp.previewHelper["item"+index]["tempFiles"])
                    }
                    
                        lenArr.sort(function(a,b){return a.length-b.length});
                        
                        if(lenArr.length==0) return;
                        
                        var maxLen = lenArr[lenArr.length-1].length;
                        
                        
                        for(var i =0,len = maxLen;i<=len;i++){
                                    var stringToCall = 
                                                                """ var len = sp.gv.children.length; 
                                                                        for(var itemIndex=0;itemIndex<len;itemIndex++){
                                                                            var currentItem = sp.previewHelper["item"+itemIndex];
                                                                            if(currentItem){

                                                                                var currentIndex = currentItem["currentIndex"];
                                                                                currentItem["currentIndex"]++;
                                                                                var currentIndexTemp = currentItem["tempFiles"];
                                                                                if(currentIndexTemp){
                                                                                    var currentFile = currentIndexTemp[currentIndex];
                                                                                    if(currentFile){

                                                                                        if(currentItem["tempItem"])
                                                                                            currentItem["tempItem"].image=currentFile;
                                                                                        
                                                                                    }else{

                                                                                            var currentImg = currentItem["tempImg"];
                                                                                            if(currentImg){
                                                                                                currentItem["tempItem"].image=currentImg;
                                                                                            }
                                                                                            currentItem["currentIndex"] = 0;
//~                                                                                             sp.previewHelper["item"+itemIndex] = {}; 
                                                                                        }
                                                                                    }
                                                                                }
                                                                        }
                                                                    sp.gv.refresh();
                                                                """;                          
                                    sp.renderTaskArray.push(app.scheduleTask (stringToCall, 0+oneFrame*i, true));

                            }
                        
                        sp.isLoopPreview = true;

                    },
            this.moveOver = function(event,item,isClick){

                        if(sp.isLoopPreview == true) return;
                        
                        if(!item){
                                sp.isOutside = true;
                                return;
                            }
                        


                        if(typeof isClick != 'undefined'){
                            if(sp.isOutside == true){
                                    return;
                                }
                            }else{
                                if(sp.isOutside == false){
                                        return;
                                    }
                                }
                        
                        
                        var img = item.image ; 
                        var index = item.index;
                        var oneFrame = sp.frameSecond;
                        

                        if(!img.parent) return;
                        var folder = new Folder(img.parent);

                        if(!(folder instanceof Folder)) return;
                        var targetFolder = new Folder(folder.toString()+sp.slash+img.displayName.replace(/.png/i,"")+"_seq");
                        

                        
                        if(!targetFolder.exists){
                                if(targetFolder.parent.toString().indexOf("_seq")==-1){
                                        targetFolder = new Folder(folder.parent.toString()+sp.slash+img.displayName.replace(/.png/i,"")+"_seq");
                                        img = new File(folder.parent.toString()+sp.slash+item.text+".png");
                                    }
                            }
                        
                        if(!targetFolder.exists){return ;cout<<targetFolder.toString()+'\r\nseq folder not found';}
                        if(!img.exists){ return ;cout<<'image not found'}
                        

                        sp.previewHelper["item"+index] = {};
                        sp.previewHelper["item"+index]["tempItem"] = item;
                        sp.previewHelper["item"+index]["tempImg"] = img;
                        sp.previewHelper["item"+index]["currentIndex"] = 0;
                        sp.previewHelper["item"+index]["tempFiles"] = (function(f){
                                var len = f.getFiles().length;
                                var arr =[];
                                for(var i=0;i<len;i++){
                                    var newFile = new File(f.toString()+sp.slash+i.toString()+".png");
                                    if(newFile.exists)
                                        arr.push(newFile);
                                    }
                                return arr;
                            })(targetFolder);
                        
                        if(sp.previewHelper["item"+index]["tempFiles"].length==0) return;
                        

                        for(var i =0,len = sp.previewHelper["item"+index]["tempFiles"].length;i<=len;i++){
                                    var stringToCall = """     
                                                                        var len = sp.gv.children.length;
                                                                        for(var itemIndex=0;itemIndex<len;itemIndex++){
                                                                            var currentItem = sp.previewHelper["item"+itemIndex];
                                                                            if(currentItem){
                                                                                var currentIndex = currentItem["currentIndex"];
                                                                                currentItem["currentIndex"]++;
                  
                                                                                var currentIndexTemp = currentItem["tempFiles"];
                                                                                if(currentIndexTemp){
                                                                                    var currentFile = currentIndexTemp[currentIndex];
                                                                                    if(currentFile){
                                                                                            if(currentItem["tempItem"])
                                                                                                currentItem["tempItem"].image=currentFile;
                                                                                        }else{
                                                                                            var currentImg = currentItem["tempImg"];
                                                                                            if(currentImg){
                                                                                                currentItem["tempItem"].image=currentImg;
                                                                                            }
                                                                                            sp.previewHelper["item"+itemIndex] = {}; 
                                                                                        }
                                                                                      }
                                                                                    }
                                                                        }
                                                                    sp.gv.refresh();
                                                                """;
                                    sp.renderTaskArray.push(app.scheduleTask (stringToCall, 0+oneFrame*i, false));
                            }
                        
                        sp.isOutside = false;
                        sp.isLoopPreview = false;

                    },

            this.leftClick = function(){
                    if(sp.isLoopPreview == false) return;
                    
                    keepRef.moveOut();
                    
                    sp.isLoopPreview = false;
                },
            this.moveOut = function(){
                
                    sp.renderTaskArray.forEach (function(item,index){
                            app.cancelTask (item);
                        });
                    sp.renderTaskArray.length = 0;
                    
                    if(sp.gv.children.length!=0){
                                
                        sp.preImageArr.forEach(function(item,index){
                                sp.gv.children[index].image = item;
                            });
                                    
                        }
                    
                    sp.previewHelper = {};

                },
            this.addModule = function(){
                    var newEleName = prompt(loc(sp.setName), "Default");
                    if (!newEleName){ return;}
                    if(sp.lookUpTextInChildren(newEleName,sp.parentDroplist.items)){alert(loc(sp.existName));return;}
                    
                    var content = new XML(sp.settingsFile.readd());
                    content.ParentGroup.appendChild(new XML("<item groupName = '"+newEleName+"'></item>"));
                    sp.settingsFile.writee(content);
                    sp.reloadParentDroplist();
                    sp.parentDroplist.selection = sp.parentDroplist.items.length -1;
                    sp.preImageArr = [];
                    var selection = parseInt(sp.getSetting("thisSelection"));
                    sp.droplist.selection = (selection<=sp.droplist.items.length-1 &&selection>=0)?selection:0;
                    sp.gv.refresh();
                    
                },
            this.deleteModule = function(){
                        if(!sp.parentDroplist.selection) return;
                        var isSureDelete = confirm(loc(sp.deleteModuleAlert));
                        if (isSureDelete == true) isSureDelete = confirm(loc(sp.addAlert)+loc(sp.deleteModuleAlert));
                        if (isSureDelete == false) return;
                        
                        var groupName = sp.parentDroplist.selection.text;
                        

                        sp.xmlCurrentFileNames.forEach (function(item,index){
                                var xml = new XML(sp.settingsFile.readd());
                                var selectionText = item;
                                
                                var preIndex =sp.getGlobalIndexFromFileName(item);  
                                xml.ListItems.child(preIndex).setLocalName("waitToDelete");
                                delete xml.ListItems.waitToDelete;
                                sp.settingsFile.writee(xml);
                                sp.deleteIndexAndReload(preIndex);
                                
                                var imageFolder = sp.getImageFolderByName(selectionText);
                                deleteThisFolder(imageFolder);
                                imageFolder.remove();
                                
                                var file = sp.getFileByName(selectionText);
                                file.remove();

                            })
                        
                            
                            var xml = new XML(sp.settingsFile.readd());
                            sp.forEach(xml.ParentGroup,function(item,index){
                                    if(item.@groupName == groupName){
                                            item.setLocalName("waitToDelete");
                                        }
                                })
                            delete xml.ParentGroup.waitToDelete;
                            sp.settingsFile.writee(xml);
                            
                            sp.reloadParentDroplist();
                            sp.preImageArr = [];
                            var selection = parseInt(sp.getSetting("parentSelection"));
                            sp.parentDroplist.selection =  (selection-1<=sp.parentDroplist.items.length-1 &&selection-1>=0)?selection-1:0;
                            var selection = parseInt(sp.getSetting("thisSelection"));
                            sp.droplist.selection = (selection<=sp.droplist.items.length-1 &&selection>=0)?selection:0;
                            sp.gv.refresh();
                            

                },
            
            this.newLayer  = function(){
                        if(!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
                        if(!(app.project.activeItem instanceof CompItem)) return alert(loc(sp.needComp));
                        if(sp.onlyEffectValue==true && app.project.activeItem.selectedLayers.length == 0) return alert(loc(sp.needLayers));
                        
                        
                        var xml = new XML(sp.getFileByName(sp.droplist.selection.text).readd());
                              xml = xml.child(sp.gv.lastSelectedItem.index);
                              
                        var precomposeName = decodeURIComponent(xml.@name);
                        
                        sp.clearHelperArr();
                        
                        
                        app.beginUndoGroup("Undo new");
                        app.beginSuppressDialogs();


                        
                        if(sp.onlyEffectValue == false){
                                    /*
                                              *Create new layers using given xml
                                              */

                                    var folderName = sp.getSetting("folderName");
                                    var text = sp.gv.lastSelectedItem.text;
                                    var compFolder = app.project.items.addFolder(text+".sp");
                                    var sourceFolder = app.project.items.addFolder("Sources");
                                    
                                    var resultArr = sp.lookUpInItem(folderName,app.project.items);
                                    if(resultArr[0]==true){
                                            var parentFolder = resultArr[1];
                                            compFolder.parentFolder = parentFolder;
                                          }else{
                                              var parentFolder = app.project.items.addFolder(folderName);
                                              compFolder.parentFolder = parentFolder;
                                                }
                                    sourceFolder.parentFolder = compFolder;
                                    sp.compFolder = compFolder;
                                    sp.sourceFolder = sourceFolder;
                                    
                                    var currentTime = app.project.activeItem.time;

                                    var activeCompLayersArr = sp.newLayers(xml,app.project.activeItem);

               
                                    app.project.activeItem.time = currentTime;      
                                    
                                    sourceFolder.numItems == 0 && sourceFolder.remove();
                                    compFolder.numItems == 0 && compFolder.remove();
                        }else{
                                    /*
                                              *Create new properties using given xml's first child and layers
                                              */     
                                    var activeCompLayersArr = app.project.activeItem.selectedLayers;
                                    sp.newProperties(xml,app.project.activeItem.selectedLayers); 
                              
                              }
                                                                         
                               //~  Correct the value of property which's type is layerIndex or maskIndex     
                               sp.layerTypePropertyArr.forEach(function(item,index){
                                          try{
                                                item.setValue(sp.layerTypePropertyValueArr[index]);
                                          }catch(err){}
                                    });
                                   
                                   
                               //~   Translate the error expressions to avoid script freezing caused by different language version of AfterEffects 
                               var translatedExpPropertyArr = [];
                               sp.expPropertyArr.forEach(function(item,index){
                                         try{
                                                 app.beginSuppressDialogs();
                                                  try {
                                                     item.expressionEnabled = true;
                                                     var testItsValue = item.valueAtTime(0, false);
                                                     item.expressionEnabled == false && translatedExpPropertyArr.push(item);
                                                   } catch (eer) {};
                                                   app.endSuppressDialogs(false);
                                             }catch(err){}
                                     });
                                 translatedExpPropertyArr.length !=0 &&translate(this,translatedExpPropertyArr);
                                 
                                 
                                 //~ Set the parent of layer using Layer.setParentWithJump()
                                 if (sp.onlyEffectValue == false){
                                          sp.layerArr.forEach(function(item,index){
                                                      try{
                                                         if(parseInt(sp.layerParentNameArr[index]) == sp.layerParentNameArr[index])
                                                            item.setParentWithJump(item.containingComp.layer(parseInt(sp.layerParentNameArr[index])));
                                                         else
                                                            item.setParentWithJump(item.containingComp.layer(sp.layerParentNameArr[index]));
                                                      }catch(err){}
                                                })
                                       }
                                 
                                 
                                app.endSuppressDialogs (false);
                                app.endUndoGroup(); 
                                
                                 //~ Precompose layers and cut their length,no matter whether they are created by newLayers() or selected by user.
                                 if(sp.preComposeValue == true){
                                        var indexArr = [];
                                        var inPointArr=[];
                                        var outPointArr=[];
                                        
                                        activeCompLayersArr.forEach(function(item,index){
                                                  indexArr.push(item.index);
                                                  inPointArr.push(item.inPoint);
                                                  outPointArr.push(item.outPoint);
                                              })

                                        inPointArr.sort(function(a,b){return a-b;})
                                        outPointArr.sort(function(a,b){return b-a;})
                                        
                                        app.beginUndoGroup("Undo precomp");
                                              var precomp = app.project.activeItem.layers.precompose(indexArr,precomposeName, true);
                                              app.project.activeItem.selectedLayers[0].inPoint=inPointArr[0];
                                              app.project.activeItem.selectedLayers[0].outPoint=outPointArr[0];
                                        app.endUndoGroup();
                                  }
                              
                              
                                  //~ Return the layer array
                                  if(sp.onlyEffectValue == false){
                                        return activeCompLayersArr;
                                  }else{
                                        return null;
                                   }
                            

                  },
            

            this.cover  = function(){
                        if(!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length ==0) return alert(loc(sp.needLayers));
                        var thisComp = app.project.activeItem;
                        if(!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
                        var itemName = sp.gv.lastSelectedItem.text;
                        var helperObj = {};
                        
                              app.beginSuppressDialogs();
                              app.beginUndoGroup("Undo save");
                              
                              var imageFile = sp.getImageFile(sp.droplist.selection.text,itemName);

                              var seqFolder = new Folder(imageFile.toString().replace(/.png/i,"")+"_seq");
                              if(seqFolder.exists){
                                   deleteThisFolder(seqFolder);
                                   seqFolder.remove();
                              }
                              
                              sp.newItemOrCover = 'cover';
                              
                              if(sp.isCC2015 == true)
                                var itemName = sp.savePng2(imageFile);
                              else
                                var itemName = sp.savePng(imageFile);

                              var xml = sp.getXmlFromLayers(thisComp,thisComp.selectedLayers,itemName,helperObj);
                              sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text),xml,sp.gv.lastSelectedItem.index);
                              
                              sp.gv.lastSelectedItem.image = null;
                              sp.gv.lastSelectedItem.image = sp.getImage(sp.droplist.selection.text,itemName);
                              sp.gv.refresh();
                              

                              app.endUndoGroup();
                              app.endSuppressDialogs(false);
                  },

            this.newItem  = function(){
                  try{
                        if(!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length ==0) return alert(loc(sp.needLayers));
                        var thisComp = app.project.activeItem;
                        if(sp.autoNameValue == false) 
                              var itemName = prompt(loc(sp.setName), "Name");
                        else
                              var itemName = thisComp.selectedLayers[0].name.replace("/", "_").replace(".", "_");
                        if(sp.autoNameValue == false && itemName == "" || itemName == null) return;
                        
                              app.beginSuppressDialogs();
                              app.beginUndoGroup("Undo save");
                              var helperObj = {};
                              
                              sp.newItemOrCover = 'newItem';
                              
                              
                              if(sp.isCC2015 == true)
                                var itemName = sp.savePng2(sp.getImageFile(sp.droplist.selection.text,itemName));
                              else
                                var itemName = sp.savePng(sp.getImageFile(sp.droplist.selection.text,itemName));
                              var xml = sp.getXmlFromLayers(thisComp,thisComp.selectedLayers,itemName,helperObj);
                              sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text),xml);
                              
                              var item = sp.gv.add(decodeURIComponent (itemName),sp.getImage(sp.droplist.selection.text,itemName));
                              sp.preImageArr.push(item.image);
                              sp.gv.refresh();
                              

                              app.endUndoGroup();
                              app.endSuppressDialogs(false);
                          }catch(err){err.printc();err.printa()}
                  },
           

            this.deleteItem  = function(){
                          if(sp.gv.selection.length == 0) return alert(loc(sp.needElements));
                          if(sp.deleteAlertValue == true)
                              var sure = confirm(loc(sp.sureDelete));
                          if(sp.deleteAlertValue == true && sure== false)  return;

                          var file = sp.getFileByName(sp.droplist.selection.text);
                          var xml = new XML(file.readd());
                          sp.gv.selection.forEach(function(item,index){
                                      xml.child(item.index).setLocalName("waitToDelete");
                                      var preText = item.text;
                                      var image = sp.getImageFile(sp.droplist.selection.text,preText);
                                      if(image.exists)
                                          image.remove();    
                                      var seqFolder = new Folder(image.toString().replace(/.png/i,"")+"_seq");
                                      if(seqFolder.exists){
                                            deleteThisFolder(seqFolder);
                                            seqFolder.remove();
                                        }
                                       
                                });
                          delete xml.waitToDelete;
                          if(xml.children().length() !=0){
                                  file.writee(xml);
                             }else{
                                  file.writee("<tree></tree>");
                             }
                        
                          sp.gv.removeAll();
                          sp.droplist.notify("onChange");
                          sp.gv.refresh();
                  },

            this.importImage  = function(){
                        if(!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
                        var file = File.openDialog("Please select pictures", false);
                        if(!file) return;
                        if(file.name.split(".").last() != "jpg" && file.name.split(".").last() != "png") return;
                        var imageFile = sp.getImageFile(sp.droplist.selection.text,sp.gv.lastSelectedItem.text);
                        
                        sp.cropImage(file,imageFile);
                        sp.gv.lastSelectedItem.image = imageFile;
                        sp.gv.refresh();
                  },
          
            this.deleteGroup  = function(){
                        if(!sp.parentDroplist.selection) return;
                        if(!sp.droplist.selection) return;
                        var isSureDelete = confirm(loc(sp.isSureGroup));
                        if (isSureDelete == true) isSureDelete = confirm(loc(sp.isSureGroup2));
                        if (isSureDelete == false) return;

 
                        var xml = new XML(sp.settingsFile.readd());
                        var selectionText = sp.droplist.selection.text;
                        var groupName = sp.parentDroplist.selection.text;

                        var preIndex = sp.getGlobalIndexFromFileName(selectionText); 
                        
                        
                        var indexInParent = preIndex;
                        
                        //~delete the child
                        xml.ListItems.child(preIndex).setLocalName("waitToDelete");
                        delete xml.ListItems.waitToDelete;
                        sp.settingsFile.writee(xml);
                        sp.deleteIndexAndReload(preIndex);
                        
                        //~ delete the imagesFolder

                        var imageFolder = sp.getImageFolderByName(selectionText);
                        deleteThisFolder(imageFolder);
                        imageFolder.remove();
                        
                        //~delete the files
                        var file = sp.getFileByName(selectionText);
                        file.remove();
                        
                        sp.reloadParentDroplist();
                        sp.parentDroplist.selection = parseInt(sp.getSetting("parentSelection"));
                        
                        sp.preImageArr = [];
                        var selection = parseInt(sp.getSetting("thisSelection"));
                        sp.droplist.selection = selection -1;
                        sp.gv.refresh();
                  },
          
            this.addGroup  = function(){
                    var newEleName = prompt(loc(sp.setName), "Default");
                    if (!newEleName){ return;}
                    if(!sp.parentDroplist.selection) return alert(loc(sp.needModule));
                    if(sp.xmlFileNames.has(newEleName)){alert(loc(sp.existName));return;}
                    
                    var file = sp.getFileByName(newEleName);
                    sp.getImageFolderByName(newEleName);
                    var str = "<tree></tree>";
                    file.writee(str);
                    var xml = new XML(sp.settingsFile.readd());
                    xml.ListItems.appendChild(new XML("<Name>" + newEleName + "</Name>"));
                    
                    var groupName = sp.parentDroplist.selection.text;
                    sp.forEach(xml.ParentGroup,function(item,index){
                            if(item.@groupName == groupName){
                                    item.appendChild (new XML("<Index>"+( xml.ListItems.children().length()-1).toString() +"</Index>"))
                                }
                        })
                    
                    sp.settingsFile.writee(xml);
                    sp.reloadParentDroplist();
                    sp.preImageArr = [];
                    sp.parentDroplist.selection = parseInt(sp.getSetting("parentSelection"));
                    sp.droplist.selection = sp.droplist.items.length -1;
                    sp.gv.refresh();
                  },
          
            this.exportFile  = function(){
                        var exportFolder = Folder.selectDialog("Please select folder");
                        if(!exportFolder) return;
                        if(!(exportFolder instanceof Folder)) return;
                        var sourceFile = sp.getFileByName(sp.droplist.selection.text);
                        var targetFile = File(exportFolder.toString() + sp.slash + sp.droplist.selection.text + ".xml");
                        if(targetFile.exists) {alert(loc(sp.overWritten)); return; }
                        if(!sp.droplist.selection) return;
                        
                        var images= sp.getImageFolderByName(sp.droplist.selection.text).getFiles();
                        var picXml = new XML("<pic></pic>");
                        var seqXml = new XML("<seq></seq>");
                        images.forEach(function(item,index){
                                      if(item.name.indexOf(".png") !=-1){
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
                                            }else if(item instanceof Folder && item.name.indexOf("_seq")!=-1){
                                                  var thisFolder = item;
                                                  var folderXml = new XML("<folder name='"+encodeURIComponent(item.name)+"'></folder>")
                                                  var seqFiles = thisFolder.getFiles();
                                                  seqFiles.forEach(function(imageFile,imageIndex){
                                                          imageFile.open("r");
                                                          imageFile.encoding = "binary";
                                                          var str = encodeURIComponent (imageFile.read());
                                                          imageFile.close();
                                                          var tempXmlBigHere=new XML("<imgName>"+encodeURIComponent(imageFile.name)+"</imgName>");
                                                          var tempXmlHeres=new XML("<img>"+str+"</img>");
                                                          var guluTempA=new XML("<imgInfo></imgInfo>");
                                                          guluTempA.appendChild(tempXmlBigHere);
                                                          guluTempA.appendChild(tempXmlHeres);
                                                          folderXml.appendChild (guluTempA);
                                                      });
                                                  seqXml.appendChild (folderXml);
                                                
                                                }
                              });
                        var xml = new XML(sourceFile.readd());
                        if(picXml.children().length()>0){
                                    xml.appendChild (picXml);
                              }
                        if(seqXml.children().length()>0){
                                    xml.appendChild (seqXml);
                              }
                        if(xml.children().length()==0){
                                    xml = "<tree></tree>"
                              }
                        targetFile.writee(xml);
                        clearOutput();
                        writeLn("Complete!");
                              
                  },
          
          
            this.importFiles = function(){
                  var files = File.openDialog("Please select xmls", "*.xml", true);
                  if(!files) return;
                  if(!sp.parentDroplist.selection) return alert(loc(sp.needModule));

                  var selectionIndex = sp.parentDroplist.selection.index;
                  files.forEach(function(item,index){
                              var file = sp.getFileByName(item.name.replace(".xml",""));
                              if(file.exists) return;
                              var imageFolder= sp.getImageFolderByName(item.name.replace(".xml",""));
                              item.copy(file.toString());
                              var xml = new XML(file.readd());
                              sp.forEach(xml.pic,function(item,index){
                                                 var image = sp.getImageFile(this.name.replace(".xml",""),decodeURIComponent (item.imgName.toString()).replace(".png",""));
                                                 image.open("w");
                                                 image.encoding = "binary";
                                                 image.write(decodeURIComponent (item.img.toString()));
                                                 image.close();
                                         },item);
                               sp.forEach(xml.seq,function(folder,folderIndex){
                                        var name = decodeURIComponent (folder.@name);
                                        var parentFolder = sp.getImageFolderByName(this.name.replace(".xml",""));
                                        var targetFolder = new Folder(parentFolder.toString() + sp.slash + name);
                                        if(!targetFolder.exists)
                                            targetFolder.create();
                                            
                                        sp.forEach(folder,function(imageXml,imageIndex){
                                                    var imageFile = new File(this.toString()+sp.slash+ decodeURIComponent (imageXml.imgName.toString()));
                                                     imageFile.open("w");
                                                     imageFile.encoding = "binary";
                                                     imageFile.write(decodeURIComponent (imageXml.img.toString()));
                                                     imageFile.close();
                                            },targetFolder);
                                   
                                   },item);
                               delete xml.pic;
                               delete xml.seq;
                               file.writee(xml);
                               xml = new XML(sp.settingsFile.readd());
                               xml.ListItems.appendChild(new XML("<Name>" + decodeURIComponent(item.name.replace(".xml","")) + "</Name>"));
                               xml.ParentGroup.child(selectionIndex).appendChild(new XML("<Index>"+(xml.ListItems.children().length()-1).toString()+"</Index>"))

                               sp.settingsFile.writee(xml.toString());
                        });
                            sp.reloadParentDroplist();
                            sp.parentDroplist.selection = parseInt(sp.getSetting("parentSelection"));
                            var selection = parseInt(sp.getSetting("thisSelection"));
                            sp.preImageArr = [];
                            sp.droplist.selection = sp.droplist.items.length-1;
                            sp.gv.refresh();
                  },
            this.changeName=function (){
                    if (!sp.gv.children) return alert(loc(sp.needElement));
                    if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
                    var newEleName = prompt(loc(sp.setName), sp.gv.lastSelectedItem.text);
                    if (!newEleName){ alert(loc(sp.blankName));return;}
                    if(sp.lookUpTextInChildren(newEleName,sp.gv.children)){alert(loc(sp.existName));return;}
                    
                    var file = sp.getFileByName(sp.droplist.selection.text);
                    var xml = new XML(file.readd());
                    var image = sp.getImage(sp.droplist.selection.text,sp.gv.lastSelectedItem.text);
           
                    if (sp.gv.lastSelectedItem.text === decodeURIComponent(xml.child(sp.gv.lastSelectedItem.index).@name)) {
                        xml.child(sp.gv.lastSelectedItem.index).@name = encodeURIComponent(newEleName.toString());
                        file.writee(xml);
                    }
                    
                    var targetImage = sp.noImage;
                    if (image.exists) {
                        image.rename(newEleName.toString() + ".png");
                        targetImage = sp.getImage(sp.droplist.selection.text,newEleName.toString());
                        if (image.toString() != targetImage.toString()) 
                            image.remove();
                    }
                
                    sp.gv.lastSelectedItem.text = newEleName.toString();
                    sp.gv.lastSelectedItem.image = targetImage;
                    sp.gv.refresh();
                },
            this.parentDroplistChange = function(){
                    if(!this.selection) return;
                    
                    sp.saveSetting("parentSelection",this.selection.index.toString()); 
                    sp.reloadDroplist();
                    sp.preImageArr = [];
                    var selection = parseInt(sp.getSetting("thisSelection"));
                    sp.droplist.selection = (selection<=sp.droplist.items.length-1 &&selection>=0)?selection:0;


                },
            this.droplistChange = function(){
                    if(!this.selection) return;
                    var text = this.selection.text;
                    var file = sp.getFileByName(text);
                    if(file ==-1) return;
                    var content = file.readd();
                    
                        var indexArr=[];
                        var j=-1;
                        var offset=0;
                        try{
                              var thisStr="<Element name=\"" 
                              j=content.indexOf(thisStr);
                        }catch(err){alert(err);}
                        while(j != -1){
                                var inputStr="";
                                var k=0;
                                while(content[j+thisStr.length+k]!="\""){
                                        inputStr+=content[j+thisStr.length+k];
                                        k++;
                                    }
                                indexArr.push(inputStr);
                                j=content.indexOf(thisStr,j+thisStr.length);
                            }
                        sp.gv.removeAll();
                        sp.preImageArr = [];
                        for(var i=0;i<indexArr.length;i++){
                                   var item = sp.gv.add(decodeURIComponent(indexArr[i]),sp.getImage(this.selection.text,indexArr[i]));
                                   sp.preImageArr.push(item.image);
                        }
                     
                    
                    /*
                          sp.forEach(xml,function(item,index){
                                  var name = decodeURIComponent (item.@name);
                                  var imageFile = sp.getImage(text,name);
                                  this.add(name,imageFile)
                              },sp.gv);
                        */
                    sp.saveSetting("thisSelection",this.selection.index.toString());
                    var arr = sp.getSetting ("effectName").split(",");
                    if(sp.lookUpInArray(this.selection.text,arr))
                        sp.onlyEffectValue = true;
                    else
                        sp.onlyEffectValue = false;
                    sp.saveSetting("onlyEffect",sp.onlyEffectValue.toString());
                    sp.droplist.itemSize.height = 20;
                    sp.gv.scrollBarValue = 0;
                    sp.gv.refresh();
                }
            this.winResize = function(){
                    group1.location = [2,0];
                    group1.size = [win.size[0],win.size[1]];
                    gv.size([group1.size[0],group1.size[1]-20]);
                    group11.location = [1,1];
                    group11.size.width = win.size[0]+12;
                    droplist.size = [win.size[0]-64,group11.size[1]-3];
                    droplist.location.x = 60;
                    sp.parentDroplist.size.width = 60;
                    sp.parentDroplist.itemSize.width = 33;
                    droplist.itemSize.width = droplist.size.width - 27;
                    sp.gv.refresh();
                },
            this.winClose = function(){
                    var thisStr = win.size[0].toString()+","+win.size[1].toString();
                    sp.saveSetting ("winSize",thisStr);
                    var thisStr = win.location[0].toString()+","+win.location[1].toString();
                    sp.saveSetting ("winLocation",thisStr);
                    
                    sp.renderTaskArray.forEach (function(item,index){
                              app.cancelTask (item);
                    });
                    sp.renderTaskArray.length = 0;
                    sp.previewHelper = {};
                },
            this.rightClick=function(event) {
                                keepRef.leftClick();
                                
                                var alt = event.altKey;
                                var key = ScriptUI.environment.keyboardState;
                                if(key.ctrlKey == false && key.shiftKey == false&& alt == false  ){
                                         keepRef.shortMenu(event);
                                     }else if (key.ctrlKey == true && key.shiftKey == false&& alt == false){
                                            keepRef.newItem(event);
                                         }else if (key.ctrlKey == false && key.shiftKey == true && alt == false){
                                                    currentPosition=[event.screenX-152,event.screenY];
                                                    upAndDownWindow(currentPosition)
                                             }else if(key.ctrlKey == false && key.shiftKey == false && alt == true){
                                                    keepRef.newItem(event);
                                                 }else if(key.ctrlKey == true && key.shiftKey == true && alt == true){
//~                                                         alert(sp.gv.lastSelectedItem.index);
                                                     }
                },
            this.shortMenu = function(event){
                    if (!event) return;
                    if (event.button == 2 && event.detail == 1 && event.altKey == false) {
                    var currentPosition = [event.screenX, event.screenY];
                    var strF=$.screens[0].toString();
                    var fStr="";
                    for(var guStr=0;guStr<strF.length;guStr++){
                            if(strF[guStr+4]!="-"&&strF[guStr+4]!=":"){
                                fStr+=strF[guStr+4];
                               } else{
                                    break;
                                    }
                        }
                    if(currentPosition[0]+180>parseInt(fStr))
                        currentPosition=[event.screenX-180,event.screenY];

                    try{
                        createMenu(currentPosition);
                    }catch(err){err.printa()}
                    
                }
        }




    }//~ fns function end


    })(

//~ global 
this,

//~ create singleton helper object for script,and store it into Global
(function(){
        
    var sp = function(){
        return new sp.prototype.init();
    }

      sp.prototype = {
            
            scriptName: "Sp_memory",
            scriptVersion:"3.0",
            version: 3.0,
            slash: "/", 
            
            setting:app.settings,
            inXml:null,
            
            isCC2015:(
                            app.version.indexOf("13.5") !=-1  ||
                            app.version.indexOf("13.6") !=-1  ||
                            app.version.indexOf("13.7") !=-1
                          )? true:false,
                            
            
            ui:1,
            lang:0,
                            
            ip:"139.129.132.60",
            downloadLink:"http://139.129.132.60/script/Sp_memory",
            weiboLink:"http://weibo.com/u/3893928357",
            
            
            noImage: "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00d\x00\x00\x00<\b\x06\x00\x00\x00\u0090?\x1F\u00CE\x00\x00\t/IDATx\u009C\u00ED\u009BiL\x13]\x17\u00C7\u00FF\u00ED\u00B0\u00B4u\x01,QpA\u0094\u00B4\u00FAA\u0089J\t\u00A8X5b\x1E\u008D1~0\u00D1D\u00FC 1\u00A81FI\u008C\u009A(\u0089\u008D\x0B.\u0089!j\u0088\u00B2\x18\x17\u00F0\u0093Jp%\x1A\u00C5\u0088\u0080\u00DA\u00D4\x05\u0085Z!\u0080\u0082\x16D,\u00B6,-]8\u00CF\x07_&\u008E-L\u00CD\u00D3\u00F7y\u00E7\u00D5\u00F9%7\u00E9\u009C{\u00EE\u0099\u00E5?w\u00EE\u009Ds\u00A7\x12\x00\x04\x11\u00C1 \u00FD_\x1F\u0080\b\x17Q\x10\u0081!\n\"0DA\x04\u0086(\u0088\u00C0\x10\x05\x11\x18\u00A2 \x02C\x14D`\u0088\u0082\b\fQ\x10\u0081\x11\u00C4\u00E7 \u0095J1z\u00F4h\u0084\u0084\u0084x\u00D5\x11\x11\\.\x17\u00ACV+\u0088\u00FE\u00CC\f\u008CD\"\x01\x000\f\x03\u00B9\\\u008E\u00D0\u00D0PH\u00A5\u00DE\u00F7\u00B9\u00D3\u00E9\u0084\u00CDf\u00C3\u00C0\u00C0\u00C0\u00B0\u00F1x\x05\x19=z4222\x10\x17\x17\u0087\u00FE\u00FE~N\u009D\u00CB\u00E5BSS\x13\n\x0B\x0B\u00E1t:\x7F\u00E5<~+\u00A4R)\"\"\"\u0090\u0092\u0092\u0082\u00E4\u00E4d\u00C8d2N}hh(\x1A\x1B\x1BQPP\u0080o\u00DF\u00BE\r\x1B\u008BW\x10\u00B9\\\u008E\u00A4\u00A4$8\x1C\x0E\u0098L&N\u009D\u00DB\u00EDF[[\x1B\u00AF\u00EA\u00BF;\u0083O\n\u008B\u00C5\u0082\u00F7\u00EF\u00DF#44\u0094S\u00AF\u00D1h\u0090\u009C\u009C\u008C\u00E2\u00E2b^A\u0080\u00EF\u00D9\u00DE!Ktt4\x15\x15\x15\u00D1\u00FA\u00F5\u00EB\u0087\u00F5\x13\u00CB\u00D0e\u00FD\u00FA\u00F5TTTD\u00D1\u00D1\u00D1\u00BC\u00BE\u00E2\u00A0.0DA\x04\x06\u00AF \u0083\u00CFG\u00B7\u00DB\u00FDo\x1C\u00CFo\u0089\u00DB\u00ED\u0086\u00CB\u00E5\u00F2k&\u00CA+\u0088\u00D3\u00E9\u0084\u00C9dBGGG@\x0E\u00EEO\u00A4\u00A3\u00A3\x03&\u0093\u00C9\u00AF\u0099\u00A8\x04<K\u00B8\x12\u0089\x04\u00C1\u00C1\u00C1\u00F0x<\u00F0x<\u0081:\u00C6?\n\u0086a\u00C00\u008C_\u00BD\u0084W\x10\u0091\x7F\x17qP\x17\x18\u00A2 \x02C\x14D`\u00F0\u00A6N\u00FC%66\x16\x1F?~\u00F4\u009A\x1EO\u009B6\r2\u0099\f555\x1C{RR\x12\u00D2\u00D2\u00D2 \u0095JQRR\u0082\u00F2\u00F2\u00F2!cGEEA\u00ADV\u00A3\u00A2\u00A2\x02\x000n\u00DC8X\u00ADV8\x1C\x0E/\u00DFQ\u00A3F!((\b]]]^u\u0087\x0F\x1FFnn.\u00CCf\u00F3\u0090\u00FB\n\x0B\x0B\u00C3\u00F6\u00ED\u00DB1a\u00C2\x04\u00B4\u00B5\u00B5\u00E1\u00E4\u00C9\u0093\u009Ct\u00C7\u00DC\u00B9s\x11\x1E\x1E\u00CEic2\u0099\u00D0\u00DC\u00DC<d\u00CC_% \u00E9\u0081\u00A2\u00A2\"\u00BA|\u00F9\u00B2\u0097\u00BD\u00B4\u00B4\u0094***\u00D8m\u0086a\u00E8\u00C6\u008D\x1Bd\u00B7\u00DB\u00A9\u00BD\u00BD\u009D\u00CCf3\u00F5\u00F7\u00F7SEE\x05\u008D\x1C9\u00D2g\u00EC\u00EC\u00ECljmme\u00B7sss)''\u00C7\u00A7\u00EF\u00C5\u008B\x17\u00E9\u00D0\u00A1C^v\u0086a\u00A8\u00A9\u00A9\u0089\u00F2\u00F3\u00F3\u0087<\u0087={\u00F6\u0090\u00D9l&\u0087\u00C3Af\u00B3\u0099\u00FA\u00FA\u00FA\u00A8\u00A3\u00A3\u0083rssY\u009F\u00B7o\u00DF\u00D2\u00CF\\\u00BAt)`i\u0096\u0080=\u00B2\u00FA\u00FA\u00FA\u00B0j\u00D5*\u00A4\u00A7\u00A7s\u00ECn\u00B7\u009B3\u00FF\u00BEr\u00E5\n\u00B4Z-rrr\x10\x13\x13\u0083I\u0093&A\u00A7\u00D3A\u00ADV\u00E3\u00EE\u00DD\u00BBC\u00C6w\u00B9\\\u00ECo\u00A5R\u0089\u00D4\u00D4T/\x1F\u0086a0w\u00EE\\DGG{\u00D5m\u00DA\u00B4\t\u00B1\u00B1\u00B1\u00987o\u009E\u00CF\u00F8\x1B6l@VV\x16>~\u00FC\u0088\u00A5K\u0097b\u00FC\u00F8\u00F1\u00D0h4\u00D0\u00EB\u00F5\u00D8\u00B8q#\u008A\u008A\u008A\x00|\x7F/\u00BBy\u00F3&\u00B4Z-[\u00F6\u00ED\u00DB7\u00FC\u00C5\u00F9E\x02\u00A2l^^\x1E\u00D9\u00EDvjmm\u00A5\u0098\u0098\x18\u00D6~\u00F5\u00EAU\u00BA\x7F\u00FF>\x01\u00A0\u00F8\u00F8x\u00EA\u00E9\u00E9!\u009DN\u00E7\u00D5>##\u0083\u00FA\u00FA\u00FA|&1\u00B3\u00B3\u00B3\u00A9\u00A9\u00A9\u0089\u00DD.++#\u00B7\u00DBMiii\x1C\u00BF\u00CC\u00CCL\x1A\x18\x18\u00A0\u00D2\u00D2R\u00AF\x18\u00E5\u00E5\u00E5T__Ov\u00BB\u009D\u0096/_\u00CE\u00A9\u0093H$T[[K\x06\u0083\u0081\x18\u0086\u00F1j{\u00E2\u00C4\tJHH \x00TSSC\x05\x05\x05\x01\u00EB\x11?\u0097\u0080\x0E\u00EAF\u00A3\x11N\u00A7\x13W\u00AE\\a\x17n~d\u00DB\u00B6m0\u009B\u00CD8p\u00E0\u0080W]AA\x01jkk\u00B1z\u00F5j\u00DE\u00FDDFF\u00A2\u00BB\u00BB\x1B\x1B7n\u00E4\u00D8\u00D7\u00ACY\x03\u009B\u00CD\u0086\u00B0\u00B00\u008E=**\ns\u00E6\u00CC\u00C1\u00E5\u00CB\u0097a2\u0099\u00B0u\u00EBVN\u00BDV\u00AB\u0085J\u00A5\u00C2\u00A1C\u0087|\u00BE\u00FC\u00EE\u00DC\u00B9\x13\u00CF\u009F?\u00E7=\u00AE@\x10PA\\.\x17v\u00EC\u00D8\u0081\u00E9\u00D3\u00A7\u00E3\u00CC\u00993^\u00F5QQQhnn\x1Er\u00FD\u00A4\u00B1\u00B1\x11J\u00A5\u0092w?c\u00C7\u008EEyy94\x1A\r\u00E2\u00E2\u00E2\x00\x00\u0089\u0089\u0089\u0088\u008F\u008FGuu5\"##9\u00FE:\u009D\x0E\u00BD\u00BD\u00BD8v\u00EC\x18\u00AA\u00AA\u00AA\u00A0\u00D1h8\u008BH\u008B\x17/\u0086\u00C5b\u00C1\u00F5\u00EB\u00D7\u00FD:\u00CF\u00B5k\u00D7\u00E2\u00EB\u00D7\u00AFl9{\u00F6\u00AC_\u00ED\u00FC!`\u00B3\u00ACAn\u00DD\u00BA\u0085\x0B\x17. ==\u00DDkL\x18L\x1F\f\u0085\u00CB\u00E5Bpp\u00F0\u00B0\u00F1CBB\x10\x11\x11\u0081\u00E3\u00C7\u008FC\u00A5R\u00E1\u00E0\u00C1\u0083X\u00B7n\x1D\u00F6\u00EE\u00DD\x0B\u00A3\u00D1\u0088\u00ABW\u00AF\u00E2\u00C8\u0091#\u009C6\u00F3\u00E6\u00CD\u0083\u00DB\u00EDFqq1\x14\n\x05\u0094J%v\u00EF\u00DE\u00CD\u00F6\u00D4\u00C1\u00D4\u00D0\u00CFi\u008D\u00DA\u00DAZv\u00E9Z&\u0093a\u00D9\u00B2e\x00\u00BE\u00DF8eee\u00AC\u00DF\u009D;wx\u00AE\u008A\u00FF\u00FCW\u00DEC233\u00F1\u00FA\u00F5k\u009C8q\u0082s'Z,\x16L\u009E<y\u00C8v\u0093'O\u0086\u00C5b\x196vll,\u00A4R)\u00DE\u00BD{\u0087\u00BBw\u00EFb\u00C1\u0082\x05\b\x0F\x0F\u00C7\u00FC\u00F9\u00F3q\u00FD\u00FAu<y\u00F2\x04#G\u008Ed{\u00C9\u008A\x15+\u00A0R\u00A9\u00E0v\u00BB1{\u00F6lL\u009B6\r\x16\u008B\x05\x7F\u00FD\u00F5\x17\x1B\u00F3\u00F1\u00E3\u00C7\x18;v,\u00B4Z-g_\u00F7\u00EE\u00DD\u00C3\u00C3\u0087\x0F\u00D1\u00D2\u00D2\x02\u00A5R\u0089/_\u00BE\x00\x00\f\x06\x03\u00F6\u00EE\u00DD\u00CB\u0096\u00CA\u00CA\u00CA_\u00BEF\u00C3\x11\u00B0A\u00FD\u00E9\u00D3\u00A7\u00ECvTT\x14}\u00F8\u00F0\u0081\u00ACV+;\u00A8/Y\u00B2\u0084\u00ECv;m\u00DE\u00BC\u00D9\u00AB}JJ\n\u00D9l6\u00CA\u00CC\u00CC\x1CvPOOO\u00A7\u00F6\u00F6v\x02@\n\u0085\u0082>\x7F\u00FELF\u00A3\u0091ZZZ(88\u0098d2\x19uwwSjj*\x01\u00A0[\u00B7n\u00D1\u00CB\u0097/9\u00F1\u00B6l\u00D9B===\u00A4V\u00AB\t\u00F8>%\u00AE\u00AF\u00AF\u00A7G\u008F\x1E\u00F9<\u00B7\u0092\u0092\x12\u00AA\u00AB\u00AB\u00FB\u00FF\x1B\u00D4\x7F\u00A4\u00BD\u00BD\x1D\u00BBv\u00ED\u00E2\u00D8\x1E<x\x00\u0083\u00C1\x00\u009DN\u0087\u00B4\u00B44\u00D6\u00BEh\u00D1\"\u009C?\x7F\x1E\u00EF\u00DF\u00BF\u00C7\u00A9S\u00A7\u0086\u008D;c\u00C6\f\u00F6N\u00ED\u00EB\u00EBCee%T*\x15***\u00E0r\u00B9\u00E0p8`\u00B1X\u00A0\u00D1h\u00A0P(\u0090\u0090\u0090\u0080\u00AA\u00AA*N\u008C\u00FC\u00FC|\u00B4\u00B5\u00B5\u00B1\u00D3U\u008F\u00C7\u0083s\u00E7\u00CE!11\x11\u00A5\u00A5\u00A5\u0090\u00CB\u00E5\u00AC\u00EF\u00FE\u00FD\u00FB\u0091\u009A\u009A\u008A\u00DB\u00B7o\u00B3\u00B6\u0090\u0090\x10\u0084\u0087\u0087\u00B3\u00E5\u00E75\u00F4\x7FJ@\u0094\u00CD\u00CF\u00CF'\u00BD^\u00EF\u00D3\u00FEc\u00CF\u0089\u0088\u0088 \u00BD^O\x0E\u0087\u0083\u00DE\u00BCyC\u00AF^\u00BD\u00A2\u00DE\u00DE^\u00AA\u00AB\u00AB#\u0095J\u00E53vvv6577\x13\x00*..\u00E6\u00BCh\u00CE\u009A5\u008B\u00ACV+M\u009D:\u0095\u00B5\u00BDx\u00F1\u0082\n\x0B\x0B\u00E9\u00F0\u00E1\u00C3\u00D4\u00D5\u00D5Ec\u00C6\u008C\u00F1\u008AY\\\\L\r\r\r$\u0091HX\u00DB\u00E9\u00D3\u00A7\u00C9j\u00B5\u00D2\u00A7O\u009F\u00E8\u00C9\u0093'd4\x1A\u00C9n\u00B7\u00D3\u008D\x1B7X\u00BF7o\u00DEPww7uuu\u00B1%///`=\u0084\x01\u00A0\x0B\u0084\u00AA===\u00F8\u00F0\u00E1\u0083\u00D7\u00F4\u00F0\u00F6\u00ED\u00DB\u00E8\u00EC\u00ECd\u00BFXq8\x1C(,,\u0084\u00CDf\u0083B\u00A1@WW\x17JJJ\u0090\u0096\u0096\u0086\u00CE\u00CEN\u009F\u00B1\x07g3\u00D5\u00D5\u00D5\x18\x18\x18\u00C0\u00F3\u00E7\u00CFQWW\x07\u00E0{Olhh@uu5\u00EB\u00DF\u00DF\u00DF\u008Fg\u00CF\u009E\u00A1\u00B3\u00B3\x13\u00D5\u00D5\u00D5>\u009F\u00F1\x06\u0083\x012\u0099\fz\u00BD\u009E}q-++\u00C3\u00BD{\u00F7\u00A0T*\u00E1v\u00BB\u00D1\u00DA\u00DA\u008A\u00A3G\u008F\"++\u008Bm\x17\x14\x14\x04\u00A3\u00D1\b\u0083\u00C1\u00C0\u0096k\u00D7\u00AE\u00A1\u00A5\u00A5\u00E5\u009F]\u00C0\u00FF \u00AE\u0087\b\f1\u00DB+0DA\x04\x06\u00AF \x12\u0089\x04\f\u00C3\u00F8\u00FC^U\u00C4?\u00A4R)\x18\u0086\u00F1\u0099N\u00F2\u00F2\u00E5s`\x18\x06\u0091\u0091\u0091\x181bD@\x0E\u00EEOd\u00C4\u0088\x11\u0088\u008C\u008C\x04\u00C30\u00BC\u00BE\u00BC\u0082(\x14\n\u00A4\u00A6\u00A6B\u00ADV\x07\u00E4\u00E0\u00FED\u00D4j5\u0096.]\n\u0085B\u00C1\u00EB\u00CB+\u0088\\.\u00C7\u00C2\u0085\x0B\u00D9$\u009E\u00C8\u00AF\x13\x17\x17\x07\u00ADV\u00CBy\u00E1\x1C\n^A\u00A4R)\u00E4r\u00B9\u00CF\u00FF\u0087\u0088\u00F8GHH\b\u00E4r\u00B9_\u00E3\u00B08R\x0B\fQ\x10\u0081\u00E1\u00D7z\u0088B\u00A1\u00C0\u00CA\u0095+1q\u00E2D\u008E}0\u00BDPRR2\u00EC:\u00C7\u00EF\u008ET*EXX\x18\x12\x12\x120s\u00E6L\u00AFd\u00E3\u00EC\u00D9\u00B3\x11\x14\u00E4\u00DF\u00D2\x13\u00AF\u0097\u00DDn\u00C7\u00B3g\u00CF0}\u00FAt\u00AF\u0081\u00DD\u00E9t\u00C2\u00E3\u00F1\u00F85\u00BF\u00FE]\u0091H$\u00EC\u00F7\u00CFJ\u00A5\x12S\u00A6L\u00F1\x1A\u00BC{{{a2\u0099`\u00B7\u00DB\u00F9\u00E3\u0081'\u0097%\u00FE\u00E9sx\x02\u00FD\u00A7O1\u00B9(0\u00C4A]`\u0088\u0082\b\fQ\x10\u0081!\n\"0DA\x04\u0086(\u0088\u00C0\x10\x05\x11\x18\u00A2 \x02C\x14D`\u0088\u0082\b\u008C\u00BF\x01O\u00C5\u0098\x01\u00ABf\u00E6Y\x00\x00\x00\x00IEND\u00AEB`\u0082",
            
            xmlFileNames : [],
            xmlGroupNames:[],
            xmlCurrentFileNames:[],
            
            layerTypePropertyArr : [],
            layerTypePropertyValueArr : [],
            
            expPropertyArr: [],
            
            layerArr: [],
            layerParentNameArr:[],
            
            init: function(){
                    return this;
                },
            
            //~            give source to target
            extend: function (target, source) {
                for (var i in source) target[i] = source[i];
                return target;
            },

    },


      //~  added in 2016.1.20
      sp.prototype.extend(sp.prototype,{
        
                   
            scriptFile: new File($.fileName),
            scriptFolder: new Folder(File($.fileName).parent.fsName +sp.prototype.slash +  "Sp_memory"),
            materialFolder: new Folder(File($.fileName).parent.fsName +sp.prototype.slash +  "Sp_memory"+sp.prototype.slash +  "tempFile"),
            settingsFile: new File(File($.fileName).parent.fsName + sp.prototype.slash +  "Sp_memory"+ sp.prototype.slash + "settings.xml"),
            imageFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash +  "Sp_memory"+ sp.prototype.slash + "image"),
            roamingFolder:new  Folder(Folder.userData.fullName + "/Aescripts/Sp_memory"),
            
            isOutside: true,
            isLoopPreview: false,
            previewHelper: {},
            renderTaskArray:[],
            preImageArr:[],
            newItemOrCover:'newItem',
            
        
            haveSetting: function(keyName){
                    return this.setting.haveSetting (this.scriptName, keyName);
                },
            
            saveSetting: function(keyName,value){
                    this.setting.saveSetting (this.scriptName, keyName, value);
            },
        
            getSetting: function(keyName){
                    return this.setting.getSetting (this.scriptName, keyName);
            },
      
            getSettingAsBool: function(keyName){
                    return this.getSetting(keyName) === "true"? true : false;
            },
            
            getFileByName: function(name){
                var string = this.scriptFolder.toString() +this.slash+ name + ".xml";
                var file = new File(string);
                return file;
            },
        
            getImageFolderByName: function(name){
                var string = this.imageFolder.toString() + this.slash + name + "";
                var folder = new Folder(string);
                if(!folder.exists)
                    folder.create();
                return folder;
            },
        
            getImage: function(groupName,imageName){
                    var folder = this.getImageFolderByName(groupName);
                    if(!folder.exists) 
                        folder.create();
                    var string = folder.toString()+ this.slash + imageName+ ".png";
                    var file = new File(string);
                    if(file.exists)
                        return file;
                    else
                        return this.noImage;
            },
            
            getImageFile: function(groupName,imageName){
                    var folder = this.getImageFolderByName(groupName);
                    if(!folder.exists) 
                        folder.create();
                    var string = folder.toString()+ this.slash + imageName+ ".png";
                    var file = new File(string);
                    return file;
            },
        
            getDistance: function (a, b) {
                return parseInt((a.toString().substring(0, 2) - b.toString().substring(0, 2))) * 100 + parseInt(b);
            },
        
            getGlobalIndexFromFileName:function(name){
                var content = new XML(this.settingsFile.readd());
                var thisIndex = -1;
                this.forEach(content.ListItems,function(item,index){
                        if(item.toString() == name)
                            thisIndex =  index;
                    });
                return thisIndex;
            },
        
            openLink: function(url) {
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
        
            getVersion: function(scriptname){ 
                           var url = this.ip+"/script/"+scriptname+".txt"; 
                           
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
                           var file = new File();
                           file.encoding = "binary";
                           file.open("w");
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
                        },

        })
    
    
      
    
      //~  added in 2016.1.21
      sp.prototype.extend(sp.prototype,{
                 getTimeInfoArr:function(comp){
                            var layers = [];
                            if(comp.selectedLayers.length==0){
                                    for(var i=0;i<comp.numLayers;i++){
                                        if(comp.layer(i+1).enabled == true)
                                            layers.push(comp.layer(i+1));
                                        }
                                }else{
                                        for(var i=0;i<comp.selectedLayers.length;i++){
                                            if(comp.selectedLayers[i].enabled ==true)
                                                layers.push(comp.selectedLayers[i]);
                                            }
                                    }
                                
                            var inPointArr = [];
                            var outPointArr =[];
                            
                                
                            for(var i=0;i<layers.length;i++){
                                    var layer = layers[i];
                                    inPointArr.push(layer.inPoint);
                                    outPointArr.push(layer.outPoint);
                                }
                            
                            if(layers.length==0) return null;
                            inPointArr.sort(function(a,b){return a-b});
                            outPointArr.sort(function(a,b){return a-b});
                            
                            return [inPointArr[0],outPointArr[outPointArr.length-1]]
                            
                            
                    },
                    swap: function(a, b) {
                        tempA = a.text;
                        a.text = b.text;
                        b.text = tempA;
                    },
                    lookUpTextInChildren:function(text,children){
                            var len = children.length;
                            for(var i=0;i<len;i++){
                                    if(children[i].text==text)
                                        return true;
                                }
                            return false;
                        },
                  
                    lookUpInArray:function(text,arr){
                            var len = arr.length;
                            for(var i=0;i<len;i++){
                                    if(arr[i]==text)
                                        return true;
                                }
                            return false;
                        },                    
                    lookUpInItem:function(text,items){
                            var len = items.length
                            for(var i=1;i<=len;i++){
                                    if(items[i].name==text)
                                        return [true,items[i]];
                                }
                            return [false,null];
                        },
                    deleteIndexAndReload:function(deleteIndex){
                            var settingxml = new XML(this.settingsFile.readd());
                            this.forEach(settingxml.ParentGroup,function(item,index){
                                    for(var j=0,len = item.children().length();j<len;j++){
                                            var thisItem = item.child(j);
                                            if(parseInt(thisItem.toString())==deleteIndex){
                                                     thisItem.setLocalName ("waitToDelete");
                                                     delete item.waitToDelete;
                                                }
                                        }
                                })             
                            this.forEach(settingxml.ParentGroup,function(item,index){
                                    for(var j=0,len = item.children().length();j<len;j++){
                                            var thisItem = item.child(j);
                                            if(parseInt(thisItem.toString())>deleteIndex){
                                                     item.insertChildBefore (thisItem,new XML("<Index>"+(parseInt(thisItem.toString())-1).toString()+"</Index>"));
                                                     thisItem.setLocalName ("waitToDelete");
                                                     delete item.waitToDelete;
                                                }
                                        }
                                })


                            this.settingsFile.writee(settingxml);
                        },
                    reloadParentDroplist:function(){
                            this.parentDroplist.removeAll();
                            var settingxml = new XML(this.settingsFile.readd());
                            this.xmlGroupNames.length = 0;
                            this.forEach(settingxml.ParentGroup,function(item,index){
                                      this.push(item.@groupName.toString());
                                },this.xmlGroupNames);
                            this.xmlGroupNames.forEach(function(item,index){
                                      this.add("item",item);
                                },this.parentDroplist);
                            this.reloadDroplist();
                        },
                    reloadDroplist: function(){
                                  this.droplist.removeAll();
                                  this.gv.removeAll();
                                  var parentSelection = parseInt(this.getSetting("parentSelection"));
                                  var groupName = this.xmlGroupNames[parentSelection];
                                  
                                  var settingxml = new XML(this.settingsFile.readd());
                                  this.xmlFileNames.length = 0;
                                  this.xmlCurrentFileNames.length = 0;
                                  
                                  var indexArr = [];
                                  
                                  this.forEach(settingxml.ParentGroup,function(item,index){
                                        if(item.@groupName==groupName){
                                            for(var j=0;j<item.children().length();j++){
                                                        indexArr.push(parseInt(item.child(j).toString()));
                                                    }
                                               }
                                      });
                                  
                                  
                                  var listArr = [];
                                  this.forEach(settingxml.ListItems,function(item,index){
                                            this.push(item.toString());
                                      }, this.xmlFileNames)
                                  for(var i =0,len = indexArr.length;i<len;i++)
                                     listArr.push(settingxml.ListItems.child(indexArr[i]).toString());

                                  listArr.forEach(function(item,index){
                                          this.add("item",item);
                                      },this.droplist);
                                  
                                  this.xmlCurrentFileNames = listArr;
                                  
                              },
                    cropImage :function (fi, inImageFileA) {
                              var f = new ImportOptions();
                              f.file = fi;
                              f.forceAlphabetical = false;
                              f.importAs = ImportAsType.FOOTAGE;
                              f.sequence = false;
                              var f = app.project.importFile(f);
                              var tempComp3 = app.project.items.addComp("tempComp", 100, 60, 1, 5, 30);
                              var BGtemp3 = tempComp3.layers.addSolid([0, 0, 0], "BG", tempComp3.width, tempComp3.height, 1, 10800);
                              var ima = tempComp3.layers.add(f);
                              var scaleX = 10000 / ima.source.width;
                              var scaleY = 6000 / ima.source.height;
                              if (scaleX / 60 < scaleY / 100) 
                                  ima.transform.scale.setValue([scaleX, scaleX]);
                               else 
                                  ima.transform.scale.setValue([scaleY, scaleY]);
                              tempComp3.saveFrameToPng(0, inImageFileA);
                              f.remove();
                              try {
                                  if (BGtemp3.source.parentFolder.numItems == 1) {
                                      BGparent = BGtemp3.source.parentFolder;
                                      BGtemp3.source.remove();
                                      BGparent.remove();
                                  } else {
                                      BGtemp3.source.remove();
                                  }
                              } catch (err) { }
                              tempComp3.remove();
                        },
                    
                    savePng2: function (pngPath) {
                        app.beginSuppressDialogs();
                        var comps = app.project.activeItem;
                        var timeArr = this.getTimeInfoArr(comps);
                        var layers = comps.selectedLayers;
                        var jishushuzu = [];
                        var waitToPre = [];
                        var tempComp2 = app.project.items.addComp("tempComp2", comps.width, comps.height, comps.pixelAspect, comps.duration, comps.frameRate);
                        var BGtemp = tempComp2.layers.addSolid([0, 0, 0], "BG", 100, 60, 1, 10800);
                        var cunLengthA = layers.length;
                        for (iq = 0; iq < layers.length; iq++) {
                            jishushuzu.push(layers[iq].index);
                        }
                        for (iq = 0; iq < layers.length; iq++) {
                            wocaoName = layers[iq].name;
                            waitToPre[waitToPre.length] = layers[iq].duplicate();
                            waitToPre[iq].name = wocaoName;
                        }
                        var wwwww = [];
                        for (iq = 0; iq < cunLengthA; iq++) {
                            wwwww.push(waitToPre[iq].index);
                        }
                        precomposeComp = comps.layers.precompose(wwwww, "tempA", true);
                        comps.layer("tempA").copyToComp(tempComp2);
                        comps.layer("tempA").remove();
                        for (iq = 0; iq < cunLengthA; iq++) {
                            comps.layer(jishushuzu[iq]).selected = true;
                        }
                        try{tempComp2.layer(1).solo = false;}catch(err){}
                        var preVVVV = tempComp2.layer(1).property("ADBE Transform Group").property("ADBE Scale").value;
                        tempComp2.layer(1).property("ADBE Transform Group").property("ADBE Scale").setValue([100 / tempComp2.width * preVVVV[0], 60 / tempComp2.height * preVVVV[1]]);
                        tempComp2.width = 100;
                        tempComp2.height = 60;
                        BGtemp.property("ADBE Transform Group").property("ADBE Position").setValue([50, 30]);
                        tempComp2.layer(1).property("ADBE Transform Group").property("ADBE Position").setValue([50, 30]);
                        var nameStr = "";
                        pngPath = File(pngPath);

                        if( this.newItemOrCover == 'newItem' ||(this.newItemOrCover =='cover' && this.coverChangeValue == true)){
                            if( this.newItemOrCover == 'newItem'){
                                while (pngPath.exists) {
                                    pngPath = pngPath.toString().split(".")[0].toString() + "_" + ".png";
                                    pngPath = File(pngPath);                            
                                }
                            }
                            try{tempComp2.saveFrameToPng(comps.time, pngPath);}catch(err){}
                        }
                            
                            
                        if(this.savePreviewValue==true){
                                tempComp2.layer(1).inPoint = timeArr[0];
                                tempComp2.layer(1).outPoint = timeArr[1];                                
                                tempComp2.layer(2).inPoint = timeArr[0];
                                tempComp2.layer(2).outPoint = timeArr[1];
                                var timeArr = this.getTimeInfoArr(tempComp2)
                                var targetFolder = new Folder(pngPath.toString().replace(/.png/i,"")+"_seq");
                                !targetFolder.exists && targetFolder.create();
                                var num = this.frameNum;                                
                                for(var i=0;i<num;i++){    
                                    try{
                                          var time = timeArr[0] +i*(timeArr[1]-timeArr[0])/num;
                                          var seqPath = new File(targetFolder.toString()+this.slash+i.toString()+".png");

                                          tempComp2.saveFrameToPng (time, seqPath);

                                          app.purge (PurgeTarget.IMAGE_CACHES);
                                      }catch(err){}
                                   }
                         }
                        BGtemp.source.remove();
                        tempComp2.remove();
                        precomposeComp.remove();
                        try{nameStr = decodeURIComponent(File(pngPath).displayName.split(".")[0].toString());}catch(err){}
                        app.endSuppressDialogs(false);
                        return encodeURIComponent(nameStr);
                    },
                    savePng:function (pngPath) {
                              try{
                                      app.beginSuppressDialogs();
                                      var comps = app.project.activeItem;
                                      var layers = comps.selectedLayers;
                                      var inArr = [];
                                      for(var i=0;i<layers.length;i++){
                                              inArr.push(layers[i].index);
                                          }
                                      var otherIndexArr = [];
                                      var otherEnabledArr = [];
                                      for(var i=0;i<comps.numLayers;i++){
                                             var thisLayer= comps.layer(i+1);
                                             if(inArr.toString().indexOf (thisLayer.index)==-1){
                                                      otherEnabledArr.push(thisLayer.enabled);
                                                      otherIndexArr.push(thisLayer.index);
                                                      try{
                                                          thisLayer.enabled = false;
                                                      }catch(err){}
                                                 }
                                          }
                                      var nameStr = "";
                                      pngPath = File(pngPath);
                                
                                
                                    if( this.newItemOrCover == 'newItem' ||(this.newItemOrCover =='cover' && this.coverChangeValue == true)){
                                        if( this.newItemOrCover == 'newItem'){
                                                  while (pngPath.exists) {
                                                      pngPath = pngPath.toString().split(".")[0].toString() + "_" + ".png";
                                                      pngPath = File(pngPath);
                                                  }
                                            }
                                            if(this.thumbTypeValue== true){
                                                app.activeViewer.views[0].saveBlittedImageToPng(comps.time,pngPath,1000,"what's this? I don't know");
                                            }else{
                                                comps.saveFrameToPng (comps.time, pngPath);
                                                }
                                            this.cropImage (pngPath, pngPath);
                                        }

                                          if(this.savePreviewValue==true){
                                                    var targetFolder = new Folder(pngPath.toString().replace(/.png/i,"")+"_seq");
                                                    !targetFolder.exists && targetFolder.create();
                                                    var num = this.frameNum;
                                                    var timeArr = this.getTimeInfoArr(comps);
                                                    for(var i=0;i<num;i++){                                                  
                                                          var time = timeArr[0] +i*(timeArr[1]-timeArr[0])/num;
                                                          var seqPath = new File(targetFolder.toString()+this.slash+i.toString()+".png");
                                                          if(this.thumbTypeValue){
                                                              app.activeViewer.views[0].saveBlittedImageToPng(time,seqPath,1000,"what's this? I don't know");
                                                          }else{
                                                              comps.saveFrameToPng (time, seqPath);
                                                              }
                                                        this.cropImage (seqPath, seqPath);
                                                        app.purge (PurgeTarget.IMAGE_CACHES);
                                                        }
                                              }

                                          for(var i=0;i<otherIndexArr.length;i++){
                                              try{
                                                 var thisLayer= comps.layer(otherIndexArr[i]);
                                                 thisLayer.enabled = otherEnabledArr[i];
                                                 }catch(err){}
                                          }
                                          app.endSuppressDialogs(false);    
                                                  nameStr = decodeURIComponent(File(pngPath).displayName.split(".")[0].toString());
                                                  return encodeURIComponent(nameStr);
                                          }catch(err){alert(err.line.toString()+ err.toString())}
                              },
                
            });
      
      //~  added in 2016.2.5
      sp.prototype.extend(sp.prototype,{
                                    newProperties : function(xml,selectedLayers){
                                                                                           
                                                  var layerXml = new XML(xml);           
                                                  
                                                  //~ Ignore xml according to presets.Empty groups according to presets
                                                  var temp = $.layer(xml);
                                                  var returnXml= temp.ignoreAndCleanProperties(layerXml.child(0).Properties,selectedLayers);
                              
                                                                              
                                         },         
                                    newLayers : function(elementXml,comp){

                                                  var layerArr = $.layer(elementXml).toLayer(comp);
  
                                                  return layerArr;
                                          },
                                    clearHelperArr : function(){
                                                this.layerTypePropertyArr.length =[];
                                                this.layerTypePropertyValueArr   =[];
                                                this.expPropertyArr                    =[];
                                                this.layerArr                              =[];
                                                this.layerParentNameArr             =[];
                                          },
                                    saveItemToFile : function(file,xml,position){
                                          var newXml = new XML(file.readd());
                                          if(typeof position ==="undefined"){
                                                newXml.appendChild(xml);
                                           }else{
                                                      newXml.appendChild(xml);
                                                      var newInsertxml = new XML(newXml.child(newXml.children().length() - 1));
                                                      newXml.insertChildAfter(newXml.child(position), newInsertxml);
                                                      newXml.child(position).setLocalName("waitToDelete");
                                                      newXml.child(newXml.children().length() - 1).setLocalName("waitToDelete");
                                                      delete newXml.waitToDelete;
                                                 }
                                           file.writee(newXml);
                                    },
                              
                                    getXmlFromLayers : function(comp,layers,elementName,helperObj){
                                                helperObj["_"+comp.id] = helperObj["_"+comp.id] || {};
                                                helperObj["elementArr"] = helperObj["elementArr"] || [];
                                                var elementArr = helperObj.elementArr;
                                                if(elementArr.length ==0)
                                                      var elementxml = new XML("<Element name=\""+elementName+"\"></Element>");
                                                else
                                                      var elementxml = new XML("<Comptent name=\"" + elementName + "\"></Comptent>");
                                                      
                                                      
                                                var loopFunc = function(thisLayer,index){
                                                                var thisIndex = elementArr.length ==0? index+1: index;
                                                                var xml = new $.layer(thisLayer,helperObj).toXML(thisIndex);

                                                                if (thisLayer.source instanceof CompItem) {
                                                                        if (helperObj.hasOwnProperty ("_"+thisLayer.source.id)) {
                                                                                elementxmltemp = helperObj["_"+thisLayer.source.id]["ele"];
                                                                                xml.Properties.appendChild(elementxmltemp);
                                                                        } else {
                                                                            elementArr.push(elementxml);
                                                                            var comptentXml = sp.prototype.getXmlFromLayers(thisLayer.source,
                                                                                                                                                            thisLayer.source.layers,
                                                                                                                                                            encodeURIComponent(thisLayer.source.name),
                                                                                                                                                            helperObj)
                                                                            
                                                                            xml.Properties.appendChild (comptentXml);
                                                                            elementxml = elementArr.pop();
                                                                        }
                                                                }
                                                                elementxml.appendChild (xml);
                                                      };
                                                if(elementArr.length ==0)
                                                     layers.forEach(loopFunc);
                                               else
                                                     Array.prototype.forEachLayer.call(layers,loopFunc);
                                                
                                                if(elementArr.length !=0){
                                                              var cTemp = new XML(elementxml);
                                                              for (var i = 0; i < cTemp.children().length(); i++) {
                                                                  cTemp.child(i).setChildren(1);
                                                              }
                                                              helperObj["_" + comp.id]["ele"] = cTemp;
                                                      }
                                                
                                                return elementxml;
                                      },

                                    
                               
            })

    sp.prototype.init.prototype = sp.prototype;
    $.global.sp = sp();
    return $.global.sp;
})(),


//~ Add methods to objects
(function(sp){
            #include 'Sp_memory/lib/OperatorOverload.jsx'
      
            Array.prototype.has= function(value){
                        for(var i=0,len = this.length;i<len;i++){
                                if(this[i] == value)
                                    return true;
                            }
                        return false;
                  }
      
      
            //~   getter/setter for  last  element of array
            Array.prototype.last = function(value){
                        if(typeof value === "undefined")
                              return this[this.length-1];
                        else
                              this[this.length-1] = value;
                  }
            
            //~     add array.forEach()
             Array.prototype.forEach = function(callback, context) {
                if (Object.prototype.toString.call(this) === "[object Array]") {
                    var i,
                        len;
                    for (i = 0, len = this.length; i < len; i++) {
                        if (typeof callback === "function"  && Object.prototype.hasOwnProperty.call(this, i)) {
                            if (callback.call(context, this[i], i, this) === false) {
                                break; // or return;
                            }
                        }
                    }
                }
             }             
             Array.prototype.forEachLayer = function(callback, context) {
                      if (Object.prototype.toString.call(this) === "[object LayerCollection]") {
                          var i,
                              len;
                          for (i = 1, len = this.length; i <= len; i++) {
                              if (typeof callback === "function"  && Object.prototype.hasOwnProperty.call(this, i)) {
                                  if (callback.call(context, this[i], i, this) === false) {
                                      break; // or return;
                                  }
                              }
                          }
                      }
                   }             
             Array.prototype.forEachPropertyGroup = function(callback, context) {
                          var i,
                              len;
                          for (i = 1, len = this.numProperties; i <= len; i++) {
                                  if (callback.call(context, this.property(i), i, this) === false) {
                                      break; // or return;
                                  }
                          }
                   }
               
       sp.extend(sp,{
           forEach:function(xml,callback,context){
            if(!(xml instanceof XML)) return;
            var i,
                len;
                for(i=0,len = xml.children().length();i<len;i++){
                        if(callback.call(context,xml.child(i),i,xml) ===false){
                                break;
                            }
                    }
            }
        });

        Error.prototype.print =Error.prototype.print|| function(){
                return "Line #"+this.line.toString()+"\r\n"+this.toString();
            }

        Error.prototype.printc = Error.prototype.printc||function(){
                cout<<"\n---------";
                cout<<this.print();
                cout<<"---------\n";
            }

        Error.prototype.printa = Error.prototype.printa ||function(){
                this.print()<<cout;
            }

        File.prototype.writee = function (str) {    //method to write file
            this.open("w");
            this.write(str);
            this.close();
        }
        File.prototype.readd = function(){      //method to read from file
                this.open("r");
                var temp = this.read();
                this.close();
                return temp;
            }
        Array.prototype.pushh = function(str){  //chains call for Array.push()
                this.push(str);
                return this;
            }
    
})(sp),

//~ Save presets and load presets file and parse them
(function(sp){

    var keyNameArr = [];
    var valueArr = [];
    
        for (var i = 1; i<= 9; i++) {
                keyNameArr.push( "_1_" + i);
                if (i == 1 || i == 2 || i == 5) {
                    valueArr.push("1");
                } else {
                    valueArr.push("0");
                }
            }        
        
        for (var i = 1;i <= 9; i++) {
                keyNameArr.push( "_2_" + i);
                valueArr.push("0");
            }
        
    keyNameArr.pushh("thisSelection")
                 .pushh("limitText")
                 .pushh("thumbType")
                 .pushh("winLocation")
                 .pushh("winSize")
                 .pushh("coverChange")
                 .pushh("folderName")
                 .pushh("effectName")
                 .pushh("deleteAlert")
                 .pushh("preCompose")
                 .pushh("saveMaterial")
                 .pushh("autoName")
                 .pushh("onlyEffect")
                 .pushh("cleanGroup")   
                 .pushh("offsetKeyframe")   
                 .pushh("language")
                 .pushh("showThumb")
                 .pushh("parentSelection")
                 .pushh("frameSecond")
                 .pushh("frameNum")
                 .pushh("savePreview")
                 
    valueArr.pushh("1")
                .pushh("true")
                .pushh("false")
                .pushh("200,500") 
                .pushh("300,500")  
                .pushh("false")
                .pushh("Sp_memory Folder")
                .pushh("Effects,Effect,effect,effects,特效,效果")
                .pushh("true")
                .pushh("false")
                .pushh("true")
                .pushh("true")
                .pushh("false")
                .pushh("false")
                .pushh("false")
                .pushh("ch")
                .pushh("true")
                .pushh("0")
                .pushh("33")
                .pushh("30")
                .pushh("true")

    keyNameArr.forEach (function(item, index){
            (function(item, value){
                if(sp.haveSetting (item)==false)
                    sp.saveSetting (item, value);
            })(item,valueArr[index])
        });
    
      sp.showThumbValue = sp.getSettingAsBool("showThumb");
      sp.deleteAlertValue = sp.getSettingAsBool ("deleteAlert");
      sp.preComposeValue = sp.getSettingAsBool ("preCompose");
      sp.saveMaterialValue = sp.getSettingAsBool ("saveMaterial");
      sp.autoNameValue = sp.getSettingAsBool ("autoName");
      sp.onlyEffectValue = sp.getSettingAsBool ("onlyEffect");
      sp.cleanGroupValue = sp.getSettingAsBool("cleanGroup");
      sp.offsetKeyframeValue = sp.getSettingAsBool ("offsetKeyframe");
      sp.savePreviewValue = sp.getSettingAsBool ("savePreview");
      
      sp.thumbTypeValue = sp.getSettingAsBool("thumbType");
      sp.coverChangeValue = sp.getSettingAsBool("coverChange");
      
      sp.frameSecond  = parseInt(sp.getSetting("frameSecond"));
      sp.frameNum = parseInt(sp.getSetting("frameNum"));
      
      
    
      !sp.roamingFolder.exists && sp.roamingFolder.create();
      !sp.materialFolder.exists && sp.materialFolder.create();
       
     var loc = function(string){
            if(sp.lang === 0)
                    sp.lang = sp.getSetting ("language");
            return string[sp.lang];
         }
     
     $.global.loc = loc;

        sp.extend(sp,{
                beyondCS6: true,
                versionUpdateInfo:{
                        ch: 
                        """层存储脚本Sp_Memory 3.0 @秋风_小径

功能添加:
1.默认开启预览动画功能
2.存储层时默认存储预览动画,可设定预览的帧率和帧数
3.导入导出功能支持预览动画
3.添加组的分类-模块

右键菜单新增:
1.预览全部/预览选中
2.新建模块
3.删除模块


小提示:
1.在3.x版本前保存的组,可以用"右键->辅助脚本->重载组内预览动画"来为组所有元素进行批量生成预览动画
2.可使用ctrl与shift对元素进行自由选择,之后右键->预览选中,即可同时预览所有被选中元素的动画
3.在未选中任何元素时,右键->预览全部,即可预览组内的全部元素的动画
4.在设置窗口中,选中一个组,之后点击"剪切选中组到其他模块",可将组移动到其他模块中


""",
                        en: """Sp_memory 3.0 @smallpath
                        
New Feature:
1.Enable preview element
2.Create preview animation while saving layers,you can set the frame rate and frame number
3.Export/Import group support preview animation
4.Add module - the group of group

Tips:
1.When your group is saved  before v3.0,you can use "RightClick->Helper scripts->Reload previews of group" to create all the preview animation
2.Use ctrl key and shift key to select element,then use "RightClick->Preview selected" to preview the animations of selected element at the same time.
3.When there isn't any element being selected, us "RightClick->Preview all" to preview all the animations of group.
4.To cut the group from its module into another module,use "Cut selected group to other module" in the settings window
                        
"""
                    },
            });
    
       if (sp.haveSetting("version") == false || sp.getSetting("version")<sp.version) {
            alert(loc(sp.versionUpdateInfo));
            sp.saveSetting("version", sp.version);
        }
    })(sp),

(function(){
    
    //~ if the file is not here,create it
    if (!(sp.settingsFile.exists)||sp.settingsFile.length==0) {
        if(sp.settingsFile.exists) sp.settingsFile.remove();
        var settingsText =
            "<settings>\
    <Show>1</Show>\
    <Alert>1</Alert>\
    <Precomp>0</Precomp>\
    <Fix>0</Fix>\
    <AutoName>1</AutoName>\
    <OnlyEffect>0</OnlyEffect>\
    <Selection>0</Selection>\
    <SubItems>0</SubItems>\
    <ListItems/>\
    <ParentGroup/>\
</settings>";
        var newsettingsxml = new XML(settingsText);
        var allFiles = sp.scriptFolder.getFiles();
        var xmlFinalArr = [];
        newsettingsxml.ParentGroup.appendChild(new XML("<item groupName='Default'/>"));
        allFiles.forEach(function(item,index){
                if(item.toString().indexOf(".xml")!=-1 && item.name.indexOf("settings.xml") ==-1){
                        newsettingsxml.ListItems.appendChild(new XML("<Name>" + item.displayName.replace(".xml","") + "</Name>"));
                        newsettingsxml.ParentGroup.child(0).appendChild(new XML("<Index>"+index.toString()+"</Index>"))
                    }
            })
        sp.settingsFile.writee(newsettingsxml);
    }    


    //~ If the file do not have the ParentGroup,add parentGroup to it
    var content = new XML( sp.settingsFile.readd());
    if(!content.hasOwnProperty ("ParentGroup"))
        content.appendChild(new XML("<ParentGroup/>"));
    if(content.ParentGroup.children().length()==0){
            content.ParentGroup.appendChild(new XML("<item groupName='Default'/>"));
            sp.forEach(content.ListItems,function(item,index){
                    content.ParentGroup.child(0).appendChild(new XML("<Index>"+index.toString()+"</Index>"));
                });
            sp.settingsFile.writee(content);
        }
    
    //~ If the file do not have a group,give it
    var content = new XML( sp.settingsFile.readd());
    if(!content.hasOwnProperty ("ListItems"))
        content.appendChild(new XML("<ListItems/>"));
    if(content.ListItems.children().length()==0){
        var allFiles = sp.scriptFolder.getFiles();
        var xmlFinalArr = [];
        allFiles.forEach(function(item,index){
                if(item.toString().indexOf(".xml")!=-1 && item.name.indexOf("settings.xml") ==-1){
                        content.ListItems.appendChild(new XML("<Name>" + item.displayName.replace(".xml","") + "</Name>"));
                        content.ParentGroup.child(0).appendChild(new XML("<Index>"+index.toString()+"</Index>"))
                    }
            })
    }
    if(content.ListItems.children().length()==0){
            content.ListItems.appendChild(new XML("<Name>Default</Name>"));
            content.ParentGroup.child(0).appendChild(new XML("<Index>"+0+"</Index>"))
        }
    sp.settingsFile.writee(content);
    

    })(sp),






)



}catch(err){alert("Line #"+err.line.toString()+"\r\n"+err.toString())}






