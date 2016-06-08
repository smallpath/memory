/*************************************自动重载图片**************************************/
function reloadPic(){
                    var thisComp = app.project.activeItem;
                    if(!(thisComp instanceof CompItem)) return alert(loc(sp.needComp));
                    if(!sp.droplist.selection) return;
                    
                    if(confirm (loc(sp.refresh))==false)  return;
                    
                    var frames = prompt(loc(sp.reloadNeedFrames),"");
                    var shouldLimit = true;
                    if(!frames|| isNaN(frames)) shouldLimit = false;
                    if(frames=="") shouldLimit =false;
                  
                    try{
                        var frames = parseInt(frames);
                        var SpeciallimitTime = frames/thisComp.frameRate;
                    }catch(err){}
                    

                            var preRenameValue=sp.autoNameValue;
                            sp.autoNameValue=true;
                            var preCompValue=sp.preComposeValue;
                            sp.preComposeValue=false;
                            if(sp.gv.children.length!=0){
                                    var special_folder = sp.getImageFolderByName(sp.droplist.selection.text);
                                    special_folder.execute();
                                }
                            
                        for(var i=0;i<sp.gv.children.length;i++){
                          try{
                                sp.gv.children[i].selected = true;

                                try{
                                  sp.gv.children[i-1].selected = false;
                                }catch(err){}
                                
                                sp.gv.lastSelectedItem = sp.gv.children[i];
                                
                                var layerArr = sp.fns.newLayer();
                                
                                for(var j=0;j<thisComp.selectedLayers.length;j++){
                                        thisComp.selectedLayers[j].selected = false;
                                    }
                                
                                if(!layerArr) continue;

                                if(!(layerArr instanceof Array)) layerArr = [layerArr]; 
                                
                                for(var j=0;j<layerArr.length;j++){
                                        layerArr[j].selected = true;

                                        if(shouldLimit==false)
                                            continue;
                                    
                                        if(layerArr[j].outPoint> SpeciallimitTime){
                                                layerArr[j].outPoint= SpeciallimitTime;  
                                            }
                                    
                                }
                            
                            
                            sp.fns.cover();
                            
                            for(var j=layerArr.length-1;j>=0;j--){
                                    layerArr[j].remove();
                            }
                        
                            sp.gv.children[i].selected = false;
                                
                            
                          }catch(err){alert(err.line.toString()+"\r"+err.toString())}
                        }

                        sp.autoNameValue=preRenameValue;
                        sp.preComposeValue=preCompValue;
                        sp.gv.refresh();
                }