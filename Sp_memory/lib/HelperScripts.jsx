/*************************************Sp_translate v1.7,自动修复多语言版本造成的表达式报错问题**************************************/
function translate(thisObj,expProps) {
  var you = this;
  
var tsp={
    trans:{en:'Translate',ch:'开始'},
    allComp:{en:'Translate all comps',ch:'翻译所有合成'},
    activeComp:{en:'Translate active comp',ch:'翻译当前合成'},
    selectedComp:{en:'Translate selected comps',ch:'翻译选中合成'},
    wrongExp:{en:'Translate wrong exps',ch:'仅翻译错误表达式'},
    rightExp:{en:'Translate right exps',ch:'仅翻译正确表达式'},
    allExp:{en:'Translate all expressions',ch:'翻译所有的表达式'},
    log:{en:'log',ch:'记录'},
    about:{en:'About',ch:'关于'},
    editBtn:{en:'Edit hot words',ch:'编辑关键词'},
    str:{en:'This script can fix wrong expressions caused by different language version of AE.By Smallpath',
            ch:'外文工程表达式报错?本脚本可以快速解决这个问题~ @秋风_小径'
        },
    ok:{en:'Ok',ch:'确认'},
    cancel:{en:'Cancel',ch:'取消'},
    add:{en:'Add',ch:'增加'},
    edit:{en:'Edit',ch:'编辑'},
    change:{en:'Change',ch:'更改'},
    deleteE:{en:'Delete',ch:'删除'},
    sureDelete:{en:'Are you sure to delete it ?',ch:'确认删除吗?'},
    addHelp:{en:'Input new hot words,or choose one item to edit and delete.Make sure what you input has double quotation.',
                    ch:'你可以新增关键词,编辑或者删除选中的条目.请确认你输入的名称有双引号'
                    },
    openFile:{en:'Do you want to open the log file?',ch:'想要打开记录文件吗?'},
    complete:{en:'Complete!',ch:'完成!'},
    _1:{en:'This is the log file',ch:'这里是记录文件'},
    _2:{en:'\r\rWrong expressions that can not be fixed at all are as follows.Check them in their comp.\r',
            ch:'\r\r没有被修复的表达式的位置如下,请进入合成检查'
            },
    _3:{en:'\rComp index =',ch:'\r合成索引数 ='},
    _4:{en:'Comp name =',ch:'合成名    ='},
    _5:{en:'\r\rInfo above is the expressions that has not been fixed.\r\r',
            ch:'上面的是没有被修复的表达式的位置.\r\r'
        },
    _6:{en:'\r\rInfo as follows is the expressions that has been fixed.\r',
            ch:'下面的信息是被成功修复的表达式.'
        },
    _7:{en:'\rComp index =',ch:'\r合成索引数'},
    _8:{en:'Comp name    =',ch:'合成名    ='},
    _9:{en:'\r    Layer index =',ch:'\r    图层索引数 ='},
    _10:{en:'    Layer name =',ch:'\r    图层名       ='},
    _11:{en:'        Property name   =',ch:'        属性名             ='},
    
};

  this.supportedLanguages = 4;
  this.hotWords = [];

  var thisFolder = Folder(Folder.userData.fullName + "/Aescripts/Sp_memory");
  if (!thisFolder.exists)
    thisFolder.create();
  var thisFile = File(thisFolder.fullName + "/WhiteList.xml");
  supportedLanguages = 4;
  allWords = [
    ["\"Angle Control\"", "\"角度控制\"", "\"角度制御\"", "\"ADBE Angle Control\""],
    ["\"Checkbox Control\"", "\"复选框控制\"", "\"チェックボックス制御\"", "\"ADBE Checkbox Control\""],
    ["\"Color Control\"", "\"色彩控制\"", "\"カラー制御\"", "\"ADBE Color Control\""],
    ["\"Layer Control\"", "\"图层控制\"", "\"レイヤー制御\"", "\"ADBE Layer Control\""],
    ["\"Point Control\"", "\"点控制\"", "\"ポイント制御\"", "\"ADBE Point Control\""],
    ["\"Slider Control\"", "\"滑杆控制\"", "\"スライダー制御\"", "\"ADBE Slider Control\""],
    ["\"Angle\"", "\"角度\"", "\"角度\"", "\"ADBE Angle Control-0001\""],
    ["\"Checkbox\"", "\"检测框\"", "\"チェックボックス\"", "\"ADBE Checkbox Control-0001\""],
    ["\"Color\"", "\"颜色\"", "\"カラー\"", "\"ADBE Color Control-0001\""],
    ["\"Layer\"", "\"图层\"", "\"レイヤー\"", "\"ADBE Layer Control-0001\""],
    ["\"Point\"", "\"点\"", "\"ポイント\"", "\"ADBE Point Control-0001\""],
    ["\"Slider\"", "\"滑块\"", "\"スライダー\"", "\"ADBE Slider Control-0001\""],
    ["\"Motion Tile\"", "\"动态平铺\"", "\"モーションタイル\"", "\"ADBE Tile\""],
    ["\"Tile Width\"", "\"平铺宽度\"", "\"タイルの幅\"", "\"ADBE Tile-0003\""]
  ];
 if (thisFile.exists){
  content = thisFile.readd();
  hahaxml = new XML(content);
  if (hahaxml.settings.version != "1.6")
    thisFile.remove();
}

  if (!thisFile.exists) {
    var newxml = new XML("<WhiteList></WhiteList>");
    newxml.settings.version = "1.6";
    newxml.settings.author = "Smallpath";
    for (var iii = 0; iii < allWords.length; iii++) {
      newxml.words.words[iii] = allWords[iii];
    }
    thisFile.writee(newxml);
  }
  content = thisFile.readd();
  myxml = new XML(content);
  for (var iii = 0; iii < myxml.words.words.length(); iii++) {
    arr = myxml.words.words[iii];
    arr = arr.split(",");
    this.hotWords.push(arr);
  }

  this.changeNode = function(index, en, ch, ja, adbe) {
    if (en != "" || ch != "" || ja != "" || adbe != "") {
      if (en == "")
        en = "None";
      if (ch == "")
        ch = "None";
      if (ja == "")
        ja = "None";
      if (adbe == "")
        adbe = "None";

      content = thisFile.readd();
      addxml = new XML(content);
      addxml.words.words[index] = [en, ch, ja, adbe];
      thisFile.writee(addxml);

      this.hotWords = [];
      for (var iii = 0; iii < addxml.words.words.length(); iii++) {
        arr = addxml.words.words[iii];
        arr = arr.split(",");
        this.hotWords.push(arr);
      }
    }
  }

  this.deleteNode = function(index) {
    content = thisFile.readd();
    deletexml = new XML(content);
    delete deletexml.words.words[index];
    thisFile.writee(deletexml);
    this.hotWords = [];
    for (var iii = 0; iii < deletexml.words.words.length(); iii++) {
      arr = deletexml.words.words[iii];
      arr = arr.split(",");
      this.hotWords.push(arr);
    }
  }

  this.addNode = function(en, ch, ja, adbe) {
    if (en != "" || ch != "" || ja != "" || adbe != "") {
      if (en == "")
        en = "None";
      if (ch == "")
        ch = "None";
      if (ja == "")
        ja = "None";
      if (adbe == "")
        adbe = "None";

      content = thisFile.readd();
      addxml = new XML(content);
      addxml.words.words[addxml.words.words.length()] = [en, ch, ja, adbe];
      thisFile.writee(addxml);

      this.hotWords = [];
      for (var iii = 0; iii < addxml.words.words.length(); iii++) {
        arr = addxml.words.words[iii];
        arr = arr.split(",");
        this.hotWords.push(arr);
      }
    }
  }

  this.findReplace = function(prop, langId, compid) {
      try{
    var expr = prop.expression;
    var oldExp = prop.expression;
    if (expr != "") {
      for (var l = 0; l < this.supportedLanguages; l++) {
        if (l != langId) {
          for (var i = 0; i < this.hotWords.length; i++) {
            if (this.hotWords[i][l] != "None") {
              var regExp = new RegExp(this.hotWords[i][l], "g");
              var tempexp = expr;
              expr = expr.replace(regExp, this.hotWords[i][langId]);
            }
          }
        }
      }
      app.beginSuppressDialogs();
      try {
        prop.expression = expr;
      } catch (e) {
        try {
          prop.expressionEnabled = true;
          testeee = prop.valueAtTime(0, false);
          if (lista.selection.index == 0) {
            if (prop.expressionEnabled == false)
              prop.expression = oldExp;
          }
        } catch (er) {
          //writeLn("Skip wrong expressions.");
          wrongcomps.push(compid);
        };
      }
      app.endSuppressDialogs(false);
    }
        }catch(err){}
  };

  Array.prototype.add = function(str) {
    var check = false;
    for (var ia = 0; ia < this.length; ia++) {
      if (this[ia] == str) {
        check = true;
      }
    }
    if (check == false) {
      this[this.length] = str;
    }
  }

  function recursiveScanLayerForExpr(ref, compindex, ja) {
    if (ref != null) {
      var prop;
      for (var i = 1; i <= ref.numProperties; i++) {

        prop = ref.property(i);

        if (checkb.value == true) {
          if ((prop.propertyType == PropertyType.PROPERTY) && (prop.expression != "") && prop.canSetExpression && (prop.expressionEnabled == true)) { //.expressionError        
            propArr.push(prop)
            prop.selected = true;
            exps.push(prop.name);
            comps.add(compindex);
            layerTemp.add(ja);
          } else if ((prop.propertyType == PropertyType.INDEXED_GROUP) || (prop.propertyType == PropertyType.NAMED_GROUP)) {
            if ((prop.matchName=="ADBE Layer Styles"&&prop.canSetEnabled==false)||(prop.matchName=="ADBE Material Options Group"&&prop.propertyGroup(prop.propertyDepth).threeDLayer==false)||(prop.matchName=="ADBE Audio Group"&&prop.propertyGroup(prop.propertyDepth).hasAudio==false)||(prop.matchName=="ADBE Extrsn Options Group")||(prop.matchName=="ADBE Plane Options Group")||(prop.matchName=="ADBE Vector Materials Group")){
            }else{
                recursiveScanLayerForExpr(prop, compindex, ja);
                }
          }
        } else if (checka.value == true) {
          if ((prop.propertyType == PropertyType.PROPERTY) && (prop.expression != "") && prop.canSetExpression && (prop.expressionEnabled == false)) {
            propArr.push(prop)
            prop.selected = true;
            exps.push(prop.name);
            comps.add(compindex);
            layerTemp.add(ja);
          } else if ((prop.propertyType == PropertyType.INDEXED_GROUP) || (prop.propertyType == PropertyType.NAMED_GROUP)) {
            if ((prop.matchName=="ADBE Layer Styles"&&prop.canSetEnabled==false)||(prop.matchName=="ADBE Material Options Group"&&prop.propertyGroup(prop.propertyDepth).threeDLayer==false)||(prop.matchName=="ADBE Audio Group"&&prop.propertyGroup(prop.propertyDepth).hasAudio==false)||(prop.matchName=="ADBE Extrsn Options Group")||(prop.matchName=="ADBE Plane Options Group")||(prop.matchName=="ADBE Vector Materials Group")){
            }else{
                recursiveScanLayerForExpr(prop, compindex, ja);
                }
          }
        } else if (checkc.value == true) {
          if ((prop.propertyType == PropertyType.PROPERTY) && (prop.expression != "") && prop.canSetExpression) {
            propArr.push(prop)
            prop.selected = true;
            exps.push(prop.name);
            comps.add(compindex);
            layerTemp.add(ja);
          } else if ((prop.propertyType == PropertyType.INDEXED_GROUP) || (prop.propertyType == PropertyType.NAMED_GROUP)) {
            if ((prop.matchName=="ADBE Layer Styles"&&prop.canSetEnabled==false)||(prop.matchName=="ADBE Material Options Group"&&prop.propertyGroup(prop.propertyDepth).threeDLayer==false)||(prop.matchName=="ADBE Audio Group"&&prop.propertyGroup(prop.propertyDepth).hasAudio==false)||(prop.matchName=="ADBE Extrsn Options Group")||(prop.matchName=="ADBE Plane Options Group")||(prop.matchName=="ADBE Vector Materials Group")){
            }else{
                recursiveScanLayerForExpr(prop, compindex, ja);
                }
          }
        }
      }
    }

  }

  function isInId(itemid, array) {
    var check = false;
    for (var ie = 0; ie < array.length; ie++) {
      if (itemid == array[ie]) {
        check = true;
      }
    }
    return check;

  }

  function ScanProjectForExpr(blackList) {
    propArr = [];
    exps = new Array();
    layerExps = new Array();
    comps = new Array();
    layers = new Array();
    layerTemp = new Array();
    wrongcomps = new Array();
    for (var i = 1; i <= app.project.numItems; i++) {
      var item = app.project.item(i);
      if (item instanceof CompItem) {
        if (isInId(i, blackList) == true) {
          writeLn("Proccessing: " + item.name);
          for (var j = 1; j <= item.numLayers; j++) {
            item.layer(j).selected = false;
            recursiveScanLayerForExpr(item.layer(j), i, j);
            if (exps.length != 0) {
              layerExps.push(exps);
            }
            exps = new Array();
          }

        }
        if (layerTemp.length != 0) {
          layers.push(layerTemp);
        }
        layerTemp = new Array();
        var selProps = propArr;
        app.beginUndoGroup("Undo translate");
        for (var ic = 0; ic < selProps.length; ic++) {
          if (lista.selection.index == 0) {
            switch (app.language) {
              case Language.ENGLISH:
                you.findReplace(selProps[ic], 0, i);
                break;
              case Language.CHINESE:
                you.findReplace(selProps[ic], 1, i);
                break;
              case Language.JAPANESE:
                you.findReplace(selProps[ic], 2, i);
                break;
              default:
                break;
            }
          } else if (lista.selection.index == 1) {
            you.findReplace(selProps[ic], 0, i);
          } else if (lista.selection.index == 2) {
            you.findReplace(selProps[ic], 1, i);
          } else if (lista.selection.index == 3) {
            you.findReplace(selProps[ic], 2, i);
          } else if (lista.selection.index == 4) {
            you.findReplace(selProps[ic], 3, i);
          }
        }
        app.endUndoGroup();
        for (var j = 1; j <= item.numLayers; j++) {
          item.layer(j).selected = false;
        }
      }
    }
    return [comps, layers, layerExps, wrongcomps];
  }

  function searchExpression(excludeByName, expFilters) {
    var filteredExps = new Array();
    var allExps = ScanProjectForExpr(excludeByName);
    return allExps;
  }



  var winW = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Sp_translate v1.7", undefined, {
    resizeable: true
  });
    winW.margins=10;
   var thisRes=
    """Group{
        orientation:'column',
        alignChildren:['left','fill'],
        list:DropDownList{preferredSize:[200,25],properties:{items:['"""+loc(tsp.allComp)+"""','"""+loc(tsp.activeComp)+"""','"""+loc(tsp.selectedComp)+"""']}},
        start:Button{text:'"""+loc(tsp.trans)+"""',preferredSize:[200,50]},
        group:Group{
                alignChildren:['left','fill'],
                checka:Checkbox{text:'"""+loc(tsp.wrongExp)+"""',value:1},
                lista:DropDownList{properties:{items:['Default','English','中文','日本語','Common']},size:[60,25]}
        }
        groupa:Group{
                alignChildren:['left','fill'],
                checkb:Checkbox{text:'"""+loc(tsp.rightExp)+"""',value:0},
                about:Button{text:'"""+loc(tsp.about)+"""',size:[70,25]},
        }
        groupb:Group{
                alignChildren:['left','fill'],
                checkc:Checkbox{text:'"""+loc(tsp.allExp)+"""',value:0},
                checkFile:Checkbox{text:'"""+loc(tsp.log)+"""',size:[80,10]}
                }
         addbtn:Button{text:'"""+loc(tsp.editBtn)+"""',preferredSize:[200,30]}
        }""";
    try{var winTempA=winW.add(thisRes);}catch(err){}
    winW.maximumSize.width=220;
    winTempA.list.selection=1;
    winTempA.group.lista.selection=0;
    var list=winTempA.list;
    var start=winTempA.start;
    var group=winTempA.group;
    var checka=group.checka;
    var lista=group.lista;
    var groupa=winTempA.groupa;
    var checkb=groupa.checkb;
    var about=groupa.about;
    var groupb=winTempA.groupb;
    var checkc=groupb.checkc;
    var checkFile=groupb.checkFile;
    var addbtn=winTempA.addbtn;
    var outFile;

    lista.selection = 2;

  about.onClick = function() {
    var text = loc(tsp.str);
    wina = new Window('palette', loc(tsp.about));
    var a = wina.add("edittext");
    a.text = text;
    var groupa = wina.add("group");
    var abtn = groupa.add("button", undefined, loc(tsp.ok));
    var bbtn = groupa.add("button", undefined, loc(tsp.cancel));

    a.onChange = a.onChanging = function() {
      this.text = text;
    }

    abtn.onClick = bbtn.onClick = function() {
      wina.close();
    }
    wina.center();
    wina.show();
  }

  checkFile.onClick = function() {
    if (checkFile.value == true) {
      outFile = File.saveDialog("", "txt");
      if (outFile==null)
            checkFile.value=false;
    }
  }

  addbtn.onClick = function() {
    var www = new Window("palette", loc(tsp.editBtn), undefined, {
      resizeable: false,
    });
    var gr1 = www.add("group");
    var stat1 = gr1.add("statictext", undefined, "English   ");
    stat1.characters = 19;
    var stat2 = gr1.add("statictext", undefined, "中文 ");
    stat2.characters = 19;
    var stat3 = gr1.add("statictext", undefined, " 日本語");
    stat3.characters = 19;
    var stat4 = gr1.add("statictext", undefined, "   Common");
    stat4.characters =19;
    var gr2 = www.add("group");
    var edit1 = gr2.add("edittext", undefined);
    edit1.characters = 19;
    var edit2 = gr2.add("edittext", undefined);
    edit2.characters = 19;
    var edit3 = gr2.add("edittext", undefined);
    edit3.characters = 19;
    var edit4 = gr2.add("edittext", undefined);
    edit4.characters = 19;
    var addde = www.add("group");
    var adda = addde.add("button", undefined, loc(tsp.add));
    adda.size = [180, 40];
    var stackgroup = addde.add("group");
    stackgroup.orientation = "stack";
    var addb = stackgroup.add("button", undefined, loc(tsp.edit));
    addb.size = [180, 40];
    addb.visible = true;
    var addchange = stackgroup.add("button", undefined, loc(tsp.change));
    addchange.size = [180, 40];
    addchange.visible = false;
    var addc = addde.add("button", undefined, loc(tsp.deleteE));
    addc.size = [180, 40];
    var  stackgroupa = addde.add("group");
    stackgroupa.orientation = "stack";
    var addd = stackgroupa.add("button", undefined, loc(tsp.about));
    addd.size = [180, 40];
    addd.visible = true;
    var  cancel = stackgroupa.add("button", undefined, loc(tsp.cancel));
    cancel.size = [180, 40];
    cancel.visible = false;
    var myList = www.add("listbox", undefined, "", {
      numberOfColumns: 5,
      showHeaders: true,
      columnTitles: ["No", "English", "中文", "日本語", "Common"],
      columnWidths: [45, 165, 165, 165, 205]
    });
    for (var iii = 0; iii < you.hotWords.length; iii++) {
      with(myList.add("item", iii + 1)) {
        for (var jjj = 0; jjj < you.hotWords[iii].length; jjj++) {
          if (you.hotWords[iii][jjj] != "None") {
            subItems[jjj].text = you.hotWords[iii][jjj];
          } else {
            subItems[jjj].text = "";
          }
        }
      }
    }

    adda.onClick = function() {
      you.addNode(edit1.text, edit2.text, edit3.text, edit4.text);
      if (edit1.text != "" || edit2.text != "" || edit3.text != "" || edit4.text != "") {
        with(myList.add("item", myList.children.length + 1)) {
          subItems[0].text = edit1.text;
          subItems[1].text = edit2.text;
          subItems[2].text = edit3.text;
          subItems[3].text = edit4.text;
        }
      }
      edit1.text = "";
      edit2.text = "";
      edit3.text = "";
      edit4.text = "";
    }

    addb.onClick = function() {
      if (myList.selection instanceof Object) {
        adda.enabled = addc.enabled = false;
        cancel.visible = true;
        addd.visible = false;
        edit1.text = (you.hotWords[myList.selection.index][0] != "None") ? you.hotWords[myList.selection.index][0] : "";
        edit2.text = (you.hotWords[myList.selection.index][1] != "None") ? you.hotWords[myList.selection.index][1] : "";
        edit3.text = (you.hotWords[myList.selection.index][2] != "None") ? you.hotWords[myList.selection.index][2] : "";
        edit4.text = (you.hotWords[myList.selection.index][3] != "None") ? you.hotWords[myList.selection.index][3] : "";
        addchange.visible = true;
        addb.visible = false;
        myList.enabled = false;
      }
    }

    cancel.onClick = function() {
      adda.enabled = addc.enabled = true;
      addd.visible = addb.visible = true;
      cancel.visible = addchange.visible = false;
      edit1.text = "";
      edit2.text = "";
      edit3.text = "";
      edit4.text = "";
      myList.enabled = true;
    }

    addchange.onClick = function() {
      you.changeNode(myList.selection.index, edit1.text, edit2.text, edit3.text, edit4.text);
      adda.enabled = addc.enabled = true;
      cancel.visible = false;
      addd.visible = true;
      creatindex = myList.selection.index;
      myList.remove(myList.items[creatindex]);
      with(myList.add("item", creatindex+1, creatindex)) {
        subItems[0].text = edit1.text;
        subItems[1].text = edit2.text;
        subItems[2].text = edit3.text;
        subItems[3].text = edit4.text;
      }
      edit1.text = edit2.text = edit3.text = edit4.text = "";
      addb.visible = true;
      addchange.visible = false;
      myList.enabled = true;
    }

    addc.onClick = function() {
      if (myList.selection instanceof Object) {
        var wwww = new Window("palette", "Alert", undefined);
        sta = wwww.add("statictext", undefined, loc(tsp.sureDelete));
        g = wwww.add("group");
        yes = g.add("button", undefined, loc(tsp.ok), {
          name: "ok"
        });
        yes.size = [60, 30];
        no = g.add("button", undefined, loc(tsp.cancel), {
          name: "cancel"
        });
        no.size = [60, 30];
        wwww.show();
        yes.onClick = function() {
          you.deleteNode(myList.selection.index);
          myList.remove(myList.items[myList.selection.index]);
          wwww.close();
        }
        no.onClick = function() {
          wwww.close();
        }
      }
    }

    addd.onClick = function() {
      var text = loc(tsp.addHelp);
      winb = new Window('palette', 'About');
      var a = winb.add("edittext");
      a.text = text;
      var groupa = winb.add("group");
      var abtn = groupa.add("button", undefined, loc(tsp.ok));
      var bbtn = groupa.add("button", undefined, loc(tsp.cancel));

      a.onChange = a.onChanging = function() {
        this.text = text;
      }

      abtn.onClick = bbtn.onClick = function() {
        winb.close();
      }
      winb.center();
      winb.show();
    }


    www.center();
    www.show();


  }

  checka.onClick = function() {
    if (checka.value == true) {
      checkb.value = false;
      checkc.value = false;
    }
  }

  checkb.onClick = function() {
    if (checkb.value == true) {
      checka.value = false;
      checkc.value = false;
    }
  }

  checkc.onClick = function() {
    if (checkc.value == true) {
      checkb.value = false;
      checka.value = false;
    }
  }

if(typeof expProps =="undefined"){
  if (winW instanceof Window) {
    winW.center();
    winW.show();
    //winW.size=[268,100];
  } else {
    winW.layout.layout(true);
  }
}else{
    try{
        var wrongcomps = wrongcomps || [];
        var selProps = expProps;
        var i= -1;
        for(var ic=0;ic<selProps.length;ic++){
          if (lista.selection.index == 0) {
            switch (app.language) {
              case Language.ENGLISH:
                you.findReplace(selProps[ic], 0, i);
                break;
              case Language.CHINESE:
                you.findReplace(selProps[ic], 1, i);
                break;
              case Language.JAPANESE:
                you.findReplace(selProps[ic], 2, i);
                break;
              default:
                break;
            }
          } else if (lista.selection.index == 1) {
            you.findReplace(selProps[ic], 0, i);
          } else if (lista.selection.index == 2) {
            you.findReplace(selProps[ic], 1, i);
          } else if (lista.selection.index == 3) {
            you.findReplace(selProps[ic], 2, i);
          } else if (lista.selection.index == 4) {
            you.findReplace(selProps[ic], 3, i);
          }
      }
            clearOutput();
    if(wrongcomps.length!=0){
            if(loc(tsp.trans) == "Translate")
            writeLn(wrongcomps.length+" wrong expressions found,which can not be translated.");
            else
            writeLn("存在"+wrongcomps.length+"个不能被正确翻译的表达式");
        }else{
            if(loc(tsp.trans) == "Translate")
            writeLn(selProps.length+" wrong expressions were translated correctly.");
            else
            writeLn("存在"+selProps.length+"个已经被正确翻译的表达式");
            }
    }catch(err){}
    }

  start.onClick = function() {
    if (list.selection == 1) {
      var thisCompnames = [];
      var compid = [];
      for (var ib = 0; ib < app.project.items.length; ib++) {
        if (app.project.item(ib + 1) == app.project.activeItem && app.project.item(ib + 1) instanceof CompItem) //
        {
          compid.push(ib + 1);
          thisCompnames.push(app.project.item(ib + 1).name);
        }
      }
      var excludeByName = compid;
    }

    if (list.selection == 0) {
      var allId = [];
      for (var ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1);
      }
      var excludeByName = allId;
    }
    if (list.selection == 2) {
      var thisCompname = [];
      var allId = [];
      var compid = [];
      var tempId = [];
      for (var ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1);
        for (haha = 0; haha < app.project.selection.length; haha++) {
          if (app.project.item(ib + 1) == app.project.selection[haha] && app.project.item(ib + 1) instanceof CompItem) {
            tempId.add(ib + 1);
            thisCompname.push(app.project.item(ib + 1).name);
          }
        }
      }
      var excludeByName = tempId;
    }
    var expFilters = new Array();
    var result = searchExpression(excludeByName, expFilters);
    clearOutput();
    if (checkFile.value == true) {
      var outString = "";
      outString += loc(tsp._1);
      outString += "\r----------------------------------------------------------------\r";
      outString += loc(tsp._2);

      for (var i = 0; i < result[3].length; i++) {
        outString += loc(tsp._3) + result[3][i].toString() + "\r";
        outString += loc(tsp._4)+ app.project.item(result[3][i]).name.toString() + "\r";
      }
        outString += loc(tsp._5);
        outString += loc(tsp._6);
      if (result[0].length != 0) {
        for (var i = 0; i < result[0].length; i++) {
          outString +=loc(tsp._7)+ result[0][i].toString() + "\r";
          outString += loc(tsp._8) + app.project.item(result[0][i]).name.toString() + "\r";
          var thisComp = app.project.item(result[0][i]);
          var layerArray = result[1][i].toString();
          layerArray = layerArray.split(",");
          for (var j = 0; j < layerArray.length; j++) {

            var number = parseInt(layerArray[j].toString());
            var thisLayer = thisComp.layer(number);
            outString += loc(tsp._9) + layerArray[j].toString() + "\r";
            outString += loc(tsp._10) + thisLayer.name.toString() + "\r\r";
            var propertyArray = result[2][j].toString();
            propertyArray = propertyArray.split(",");
            for (var x = 0; x < propertyArray.length; x++)
              outString += loc(tsp._11) + propertyArray[x].toString() + "\r";

          }
        }
      }
      outFile.writee(outString);
      a = confirm(loc(tsp.openFile));
      if (a) {
        outFile = outFile.fsName;
        outFile = encodeURI(outFile);
        outFile = String(outFile);
        system.callSystem("explorer  " + decodeURI(outFile));
      }
      checkFile.value = false;
    }else{
        alert(loc(tsp.complete));
        }
  }
}

/*************************************Sp_cutLength v1.1,自动裁剪图层长度,根据普通层的透明度与合成层内容的长度进行裁剪**************************************/
function cutLength(){
                if (confirm (loc(sp.cutLength)) == false) return;
                var thisComp = app.project.activeItem;

Array.prototype.search = function(isZero){
    if (isZero==0){
        isOk = false;
        for (b=0;b<this.length-1;b++){
            if (this[b]==0&&this[b+1]>0){
            isOk = true;
            break;
            }
            }
        if (isOk ==true){
            return b;
            }else{
                return -1;
                }
        }else if(isZero == 100){
        isOk = false;
        for (b=this.length-1;b>0;b--){
            if (this[b-1]>0&&this[b]==0){
            isOk = true;
            break;
            }
            }
        if (isOk ==true){
            return b;
            }else{
                return -1;
                }
            }
    }
app.beginUndoGroup ("Undo crop");
try{cutLayers(thisComp,new Object);}catch(err){}
app.endUndoGroup();
clearOutput();
writeLn("Complete!");

function cutLayers(comp,obj){
    try{
    if (obj.hasOwnProperty("_"+comp.id)){
        }else{
            eval("obj._"+comp.id+"={};");
            eval("obj._"+comp.id+".inPointArr=[];");
            eval("obj._"+comp.id+".outPointArr=[];");
            }
        }catch(err){}
    
    for (var i=0;i<comp.layers.length;i++){
         try{ if(comp.layer(i+1).source instanceof CompItem ){
                 if (obj.hasOwnProperty("_"+comp.layer(i+1).source.id)){ 
                     }else{
              cutLayers(comp.layer(i+1).source,obj);
              }
                try{eval("obj._"+comp.layer(i+1).source.id+".inPointArr.sort(function (a,b){return a-b;})");}catch(err){}
                try{eval("obj._"+comp.layer(i+1).source.id+".outPointArr.sort(function (a,b){return b-a;})");}catch(err){}
                if (eval("comp.layer(i+1).inPoint-comp.layer(i+1).startTime<obj._"+comp.layer(i+1).source.id+".inPointArr[0]")){
                try{eval("comp.layer(i+1).inPoint=comp.layer(i+1).startTime+obj._"+comp.layer(i+1).source.id+".inPointArr[0]");}catch(err){}
                }
                if (eval("comp.layer(i+1).outPoint-comp.layer(i+1).startTime>obj._"+comp.layer(i+1).source.id+".outPointArr[0]")){
                try{eval("comp.layer(i+1).outPoint=comp.layer(i+1).startTime+obj._"+comp.layer(i+1).source.id+".outPointArr[0]");}catch(err){}
                }
              }
            try{eval("obj._"+comp.id+".inPointArr.push(comp.layer(i+1).inPoint);");}catch(err){}
            try{eval("obj._"+comp.id+".outPointArr.push(comp.layer(i+1).outPoint);");}catch(err){}
            cut(comp.layer(i+1));
            }catch(err){}
        } 
    }

function cut(layer){
    thisOpa = layer.transform.opacity;
    thisKeysNum = thisOpa.numKeys;
    var arr=[];
    for (a=0;a<thisKeysNum;a++){
        arr.push(thisOpa.keyValue(a+1));
        }
    if (arr.length==0){
        if (thisOpa.value == 0){
            layer.inPoint = 0;
            layer.outPoint = 0 + layer.containingComp.frameDuration;
            }
        }
    else if(arr.length==1){
        if (arr[0] == 0){
            layer.inPoint = thisOpa.keyTime(1);
            layer.outPoint = thisOpa.keyTime(1)+layer.containingComp.frameDuration;
            }
        }
    else if (arr.length>1){
            if (arr.search(0)!=-1){
                if (layer.inPoint<thisOpa.keyTime(arr.search(0)+1) && arr.search(0)  == 0){
                    layer.inPoint = thisOpa.keyTime(arr.search(0)+1);
                }
                }
            if (thisOpa.keyValue(thisKeysNum)==0){
                    layer.outPoint = thisOpa.keyTime(thisKeysNum);
                }else{
                    
                    }
            }
        }
    }
/*************************************批量自动保存每一层为新Item**************************************/
function autoSave(){
                        if(confirm(loc(sp.auto))==false) return;
                        if(!(app.project.activeItem instanceof CompItem)) return;
                        try{
                            var preRenameValue=sp.autoNameValue;
                            sp.autoNameValue=true;
                            for(var i=0;i<app.project.activeItem.numLayers;i++){
                                  for (var j= 1; j <=app.project.activeItem.numLayers; j++){
                                    app.project.activeItem.layer(j).selected = false;
                                  }
                                app.project.activeItem.layer(i+1).selected = true;
                                sp.fns.newItem();
                                app.project.activeItem.layer(i+1).selected = false;
                                }
                            sp.autoNameValue=preRenameValue;
                            }catch(err){}
                            sp.droplist.notify("onChange");
                            sp.gv.refresh();
}

/*************************************自动重载图片**************************************/
function reloadPic(){
                    var thisComp = app.project.activeItem;
                    if(!(thisComp instanceof CompItem)) return alert(loc(sp.needComp));
                    
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