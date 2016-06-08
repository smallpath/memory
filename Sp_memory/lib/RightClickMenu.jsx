    function createMenu(CurrentPosition) {
        var itemList = [
          {name:loc(sp.settings),type:"button"},{name:loc(sp.settings),type:"dropdownlist"},
          
          {name: (sp.gv.selection.length == 0) ? loc(sp.previewAll) : loc(sp.previewSelected),type:"button"},{name:loc(sp.yushe),type:"button"},
           
          {name: loc(sp.searchWindow),type:"button"},{name:loc(sp.getReport),type:"button"},
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
    /*
        ShortMenu._preview = ShortMenu.add("button", [0, 20, h / 2, 42], (sp.gv.selection.length == 0) ? loc(sp.previewAll) : loc(sp.previewSelected));
        
        ShortMenu._yushe = ShortMenu.add("button", [h / 2, 20, h, 42], loc(sp.yushe));
        
        ShortMenu._c = ShortMenu.add("button", [0, 42, h / 2, 62], loc(sp.changeName));
        
        ShortMenu._1 = ShortMenu.add("dropdownlist", [h / 2, 0, h, 22]);
        ShortMenu._1.add("item", loc(sp.save));
        ShortMenu._1.add("item", loc(sp.exp));
        ShortMenu._1.add("item", loc(sp.aep));
        ShortMenu._1.add("item", loc(sp.preset));
        ShortMenu._1.add("item", loc(sp.curve));
        ShortMenu._1.selection = 0;
        ShortMenu._1.enabled = true;
        ShortMenu._13.value = sp.showThumbValue;
        ShortMenu._14.value = sp.autoNameValue;
        ShortMenu._15.value = sp.savePreviewValue;
        ShortMenu._16.value = sp.saveMaterialValue;
        ShortMenu._17.value = sp.preComposeValue;
        ShortMenu._18.value = sp.onlyEffectValue;
        ShortMenu._19.value = sp.cleanGroupValue;
        ShortMenu._20.value = sp.offsetKeyframeValue;

        ShortMenu._1.onChange = ShortMenu._1.onChanging = function() {
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

        var isCheckBoxClicked = false;



        ShortMenu._yushe.onClick = function() {
          presetWindow();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._preview.onClick = function() {
          isCheckBoxClicked = false;
          ShortMenu.close();
          sp.fns.previewAll();
        }

        ShortMenu._c.onClick = function() {
          sp.fns.changeName();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._0.onClick = function() {
          settingsButtonFunc();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._2.onClick = function() {
          sp.fns.importImage();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._3.onClick = function() {
          sp.fns.addModule();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._4.onClick = function() {
          sp.fns.deleteModule();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._5.onClick = function() {
          sp.fns.importFiles();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._6.onClick = function() {
          sp.fns.exportFile();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._7.onClick = function() {
          sp.fns.addGroup();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._8.onClick = function() {
          sp.fns.deleteGroup();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._9.onClick = function() {
          isCheckBoxClicked = false;
          ShortMenu.close();
          sp.fns.newItem();
        }

        ShortMenu._10.onClick = function() {
          sp.fns.deleteItem();
          isCheckBoxClicked = false;
          ShortMenu.close();
        }

        ShortMenu._11.onClick = function() {
          isCheckBoxClicked = false;
          ShortMenu.close();
          sp.fns.newLayer();
        }

        ShortMenu._12.onClick = function() {
          isCheckBoxClicked = false;
          ShortMenu.close();
          sp.fns.cover();
        }

        ShortMenu._13.onClick = function() {
          sp.showThumbValue = this.value;
          gv.showText = this.value;
          sp.saveSetting("showThumb", this.value.toString());
          isCheckBoxClicked = true;
          sp.gv.refresh();
        }
        ShortMenu._14.onClick = function() { //-14对deleteAlert
          sp.autoNameValue = this.value;
          sp.saveSetting("autoName", this.value.toString());
          isCheckBoxClicked = true;
        }
        ShortMenu._15.onClick = function() { //-15对preCompose
          sp.savePreviewValue = this.value;
          sp.saveSetting("savePreview", this.value.toString());
          isCheckBoxClicked = true;
        }
        ShortMenu._16.onClick = function() {
          sp.saveMaterialValue = this.value;
          sp.saveSetting("saveMaterial", this.value.toString());
          isCheckBoxClicked = true;
        }
        ShortMenu._17.onClick = function() { //-17 对autoName
          sp.preComposeValue = this.value;
          sp.saveSetting("preCompose", this.value.toString());
          isCheckBoxClicked = true;
        }
        ShortMenu._18.onClick = function() {
          sp.onlyEffectValue = this.value;
          sp.saveSetting("onlyEffect", this.value.toString());
          isCheckBoxClicked = true;
        }
        ShortMenu._19.onClick = function() {
          sp.cleanGroupValue = this.value;
          sp.saveSetting("cleanGroup", this.value.toString());
          isCheckBoxClicked = true;
        }
        ShortMenu._20.onClick = function() {
          sp.offsetKeyframeValue = this.value;
          sp.saveSetting("offsetKeyframe", this.value.toString());
          isCheckBoxClicked = true;
        }



        ShortMenu.addEventListener("blur", function() {
          if (isCheckBoxClicked == false) {
            ShortMenu.close();
          } else {
            isCheckBoxClicked = true;
          }
        });*/

        ShortMenu.onDeactivate = function() {
          ShortMenu.close();
        }
        
        ShortMenu.frameLocation = CurrentPosition;
        ShortMenu.show();
        ShortMenu.addEventListener("keydown", function(event) {
          ShortMenu.close();
        });

}