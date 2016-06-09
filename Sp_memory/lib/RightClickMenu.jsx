    function createMenu(CurrentPosition) {
        var itemList = [
          {name:loc(sp.settings),type:"button"},{name:"helperScripts",type:"dropdownlist"},
          
          {name: "preview",type:"button"},{name:loc(sp.yushe),type:"button"},
           
          {name: loc(sp.changeName),type:"button"},{name:loc(sp.importPicture),type:"button"},
          {name: loc(sp.addModule),type:"button"},{name:loc(sp.deleteModule),type:"button"},
          {name: loc(sp.importFile),type:"button"},{name:loc(sp.exportFile),type:"button"},
          {name: loc(sp.addGroup),type:"button"},{name:loc(sp.deleteGroup),type:"button"},
          {name: loc(sp.addElement),type:"button"},{name:loc(sp.cover),type:"button"},
          {name: loc(sp.create),type:"button"},{name:loc(sp.deleteElement),type:"button"},
          
          {name: loc(sp.isShow),type:"checkbox"},{name:loc(sp.isName),type:"checkbox"},
          {name: loc(sp.isSavePreview),type:"checkbox"},{name:loc(sp.isOffset),type:"checkbox"},
          {name: loc(sp.isPrecomp),type:"checkbox"},{name:loc(sp.isEffect),type:"checkbox"},
          {name: loc(sp.cleanProperty),type:"checkbox"},{name:loc(sp.offsetKey),type:"checkbox"},
          
        ];
        
        var length = itemList.length;
        
        var Space = 102 / 5;
        var buttonWidth = 40;
        var checkBoxWidth = 41;
        var buttonHeight = 20;
        var checkBoxHeight = 21;
        
        if (sp.lang == "ch")
          var maxWidth = 180;
        else
          var maxWidth = 190;
          
        var ShortMenu = new Window("palette", "huhu", [0, 0, maxWidth, length * Space / 2+2], {
          borderless: true
        });

        for (var i = 0; i < length; i++) {
              var itemWidth, itemHeight;
              if(itemList[i].type == "button"){
                    itemWidth = buttonWidth;
                    itemHeight = buttonHeight;
              }else if(itemList[i].type == "checkbox"){
                    itemWidth = checkBoxWidth;
                    itemHeight = checkBoxHeight;
              }else if(itemList[i].type == "dropdownlist"){
                    itemWidth = buttonWidth;
                    itemHeight = buttonHeight;
              }
          
              if (i % 2 == 0) {
                ShortMenu[itemList[i].name] = ShortMenu.add(itemList[i].type, [0, (parseInt((i) / 2) * itemHeight), maxWidth / 2, (22 + parseInt((i) / 2) * itemHeight)], itemList[i].name);
              } else {
                ShortMenu[itemList[i].name] = ShortMenu.add(itemList[i].type, [maxWidth / 2, (parseInt((i - 1) / 2) * itemHeight), maxWidth, (22 + parseInt((i - 1) / 2) * itemHeight)], itemList[i].name);
              }
      }

      var isCheckBoxClicked = false;

        ShortMenu[itemList[0].name].onClick = function() {
          isCheckBoxClicked = false;
          ShortMenu.hide();
          settingsButtonFunc();
        }

        ShortMenu[itemList[1].name].add("item", loc(sp.save));
        ShortMenu[itemList[1].name].add("item", loc(sp.exp));
        ShortMenu[itemList[1].name].add("item", loc(sp.aep));
        ShortMenu[itemList[1].name].add("item", loc(sp.preset));
        ShortMenu[itemList[1].name].add("item", loc(sp.curve));
        ShortMenu[itemList[1].name].selection = 0;
        
        ShortMenu[itemList[1].name].onChange = ShortMenu[itemList[1].name].onChanging = function(){
          try {
            //run sp_translate script
            this.selection.index == 1 &&
              translate() ||

            //generate and then save the whole group
            this.selection.index == 2 &&
              reloadPic() ||

            //auto save every layer in current comp,one layer as one element
            this.selection.index == 3 &&
              autoSave() ||

            //cut layers' length by opacity and comp length
            this.selection.index == 4 &&
              cutLength();

          } catch (err) {
            err.printa();
          }

          //back list's selection
          this.selection = 0;
        }


      ShortMenu[itemList[2].name].onClick = function(){
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.previewAll();
      }      
  
      ShortMenu[itemList[3].name].onClick = function(){
          isCheckBoxClicked = false;
          ShortMenu.hide();
          presetWindow();
      }
  
      ShortMenu[itemList[4].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.changeName();
      }  
  
      ShortMenu[itemList[5].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.importImage();
      }
  
      ShortMenu[itemList[6].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.addModule();
      }    
  
      ShortMenu[itemList[7].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.deleteModule();
      }  
  
      ShortMenu[itemList[8].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.importFiles();
      }  
  
      ShortMenu[itemList[9].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.exportFile();
      }
  
      ShortMenu[itemList[10].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.addGroup();
      }  
  
      ShortMenu[itemList[11].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.deleteGroup();
      }
    
      ShortMenu[itemList[12].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.newItem();
      }  
  
      ShortMenu[itemList[13].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.cover();
      }
      
      ShortMenu[itemList[14].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.newLayer();
      }  
  
      ShortMenu[itemList[15].name].onClick = function(){ 
          isCheckBoxClicked = false;
          ShortMenu.hide();
          sp.fns.deleteItem();
      }  
  
      ShortMenu[itemList[16].name].value = sp.showThumbValue;
      ShortMenu[itemList[17].name].value = sp.autoNameValue;
      ShortMenu[itemList[18].name].value = sp.savePreviewValue;
      ShortMenu[itemList[19].name].value = sp.saveMaterialValue;
      ShortMenu[itemList[20].name].value = sp.preComposeValue;
      ShortMenu[itemList[21].name].value = sp.onlyEffectValue;
      ShortMenu[itemList[22].name].value = sp.cleanGroupValue;
      ShortMenu[itemList[23].name].value = sp.offsetKeyframeValue;
      
      ShortMenu[itemList[16].name].onClick = function(){ 
          sp.showThumbValue = this.value;
          gv.showText = this.value;
          sp.saveSetting("showThumb", this.value.toString());
          isCheckBoxClicked = true;
          sp.gv.refresh();
      }
        
      ShortMenu[itemList[17].name].onClick = function(){ 
          sp.autoNameValue = this.value;
          sp.saveSetting("autoName", this.value.toString());
          isCheckBoxClicked = true;
      }
  
      ShortMenu[itemList[18].name].onClick = function(){ 
          sp.savePreviewValue = this.value;
          sp.saveSetting("savePreview", this.value.toString());
          isCheckBoxClicked = true;
      }
    
      ShortMenu[itemList[19].name].onClick = function(){ 
          sp.saveMaterialValue = this.value;
          sp.saveSetting("saveMaterial", this.value.toString());
          isCheckBoxClicked = true;
      }    
  
      ShortMenu[itemList[20].name].onClick = function(){ 
          sp.preComposeValue = this.value;
          sp.saveSetting("preCompose", this.value.toString());
          isCheckBoxClicked = true;
      }  
  
      ShortMenu[itemList[21].name].onClick = function(){ 
          sp.onlyEffectValue = this.value;
          sp.saveSetting("onlyEffect", this.value.toString());
          isCheckBoxClicked = true;
      }  
  
      ShortMenu[itemList[22].name].onClick = function(){ 
          sp.cleanGroupValue = this.value;
          sp.saveSetting("cleanGroup", this.value.toString());
          isCheckBoxClicked = true;
      }
    
      ShortMenu[itemList[23].name].onClick = function(){ 
          sp.offsetKeyframeValue = this.value;
          sp.saveSetting("offsetKeyframe", this.value.toString());
          isCheckBoxClicked = true;
      }

        ShortMenu.addEventListener("blur", function() {
          if (isCheckBoxClicked == false) {
            ShortMenu.hide();
          } else {
            isCheckBoxClicked = true;
          }
        });

        ShortMenu.onDeactivate = function() {
          ShortMenu.hide();
        }
        
        ShortMenu.frameLocation = CurrentPosition;
        ShortMenu.addEventListener("keydown", function(event) {
          ShortMenu.hide();
        });

        return ShortMenu;
}