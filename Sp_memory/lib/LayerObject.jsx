//~  Layer object to handle with layers of after effects, for saving and generating
(function(){
    
    $.layer = function(item,options){
        return new $.layer.prototype.init(item,options);
    }

    $.layer.prototype = {
            init: function(item,options){
                   this.item = item;
                    
                   this.tempFolder = options.tempFolder;
                   this.slash = options.slash || "/";
                   
                   this.materialFolder = options.materialFolder;
                   this.compFolder = options.compFolder;
                   
                   this.isSaveMaterial = options.isSaveMaterial;
                
                   return this;
                },
    }

    $.layer.extend = function (target, source) {
                for (var i in source) target[i] = source[i];
                return target;
    },


    //convert Layer object to XML or JSON
    $.layer.extend($.layer.prototype,{
        
        isSaveMaterial: true,
        
        //~   Return the attributes of layer
        getLayerAttr: function(index){
                var thisLayer = this.item;
                var helperObj = this.helperObj;
                var layerInf = {};
                
                layerInf.type = "null";
                if (thisLayer instanceof TextLayer) {
                    layerInf.type = "Text";
                } else
                if (thisLayer instanceof LightLayer) {
                    layerInf.type = "Light";
                    layerInf.lightType = thisLayer.lightType;
                } else
                if (thisLayer instanceof ShapeLayer) {
                    layerInf.type = "Shape";
                } else
                if (thisLayer instanceof AVLayer) {
                    if (thisLayer.source.mainSource instanceof SolidSource && thisLayer.nullLayer != true && !(thisLayer.source instanceof CompItem)) {
                        layerInf.type = "Solid";
                        layerInf.solidColor = thisLayer.source.mainSource.color;
                    } else if (thisLayer.source.mainSource instanceof FileSource && thisLayer.nullLayer != null && !(thisLayer.source instanceof CompItem)) {
                        layerInf.sound = thisLayer.hasAudio;
                        if (layerInf.sound) {
                            layerInf.type = "VideoWithSound";
                        } else {
                            layerInf.type = "VideoWithoutSound";
                        }
                    } else if (thisLayer.source instanceof CompItem) {
                        layerInf.type = "Comp";
                    }
                } else
                if (thisLayer instanceof AVLayer) {
                    if (thisLayer.nullLayer) {
                        layerInf.type = "Null";
                    }
                } else
                if (thisLayer instanceof CameraLayer) {
                    layerInf.type = "Camera";
                }
                layerInf.geoType = "null";
                layerInf.name = thisLayer.name;

                var text = "<Layer type=\"" + layerInf.type + "\" name=\"" + encodeURIComponent(layerInf.name) + "\"></Layer>"
                var layerInfo = new XML(text);
                if (layerInf.type == "Light") {
                    layerInfo.light = layerInf.lightType;
                }
                if (layerInf.type == "Solid") {
                    layerInfo.solidColor = layerInf.solidColor;
                }
                if (layerInf.type == "VideoWithSound" || layerInf.type == "VideoWithoutSound") {
                        layerInfo = this.getMaterial(layerInf,layerInfo,helperObj,thisLayer);
                      }
                if (layerInf.type == "Comp") {
                        layerInfo = this.getCompLayerAttr(layerInfo,thisLayer,helperObj,thisLayer);
                }
                if (layerInf.type == "Text") {
                    var isPointText = thisLayer.property("ADBE Text Properties")("ADBE Text Document").valueAtTime(0, false).pointText;
                    var isBoxText = thisLayer.property("ADBE Text Properties")("ADBE Text Document").valueAtTime(0, false).boxText;
                    layerInfo.textType = (isPointText == true) ? "point" : "box";
                    if (isBoxText == true) {
                        layerInfo.boxSize = thisLayer.property("ADBE Text Properties")("ADBE Text Document").valueAtTime(0, false).boxTextSize.toString();
                    }
                }
          
                    layerInfo.type = layerInf.type;
                    layerInfo.searchName = thisLayer.name;
                    layerInfo.label = thisLayer.label;
                    layerInfo.width = thisLayer.source ? thisLayer.width : "None";
                    layerInfo.height = thisLayer.source ? thisLayer.height : "None";
                    layerInfo.index = index;

                    layerInfo.parent = (thisLayer.parent == null) ? "false" : thisLayer.parent.index;
                    layerInfo.inPoint = thisLayer.inPoint;
                    layerInfo.outPoint = thisLayer.outPoint;
                    layerInfo.enabled = thisLayer.enabled;
                    layerInfo.three = (typeof thisLayer.threeDLayer == "undefined") ? "undefined" : thisLayer.threeDLayer;
                    layerInfo.trackMatteType = (typeof thisLayer.trackMatteType == "undefined") ? "undefined" : thisLayer.trackMatteType;
                    layerInfo.solo = thisLayer.solo;
                    layerInfo.shy = thisLayer.shy;
                    layerInfo.collapseTransformation = thisLayer.collapseTransformation;
                    if (layerInf.type == "VideoWithSound" || layerInf.type == "Comp") {
                              layerInfo.audioEnabled = thisLayer.audioEnabled;
                      }
                    layerInfo.motionBlur = thisLayer.motionBlur;
                    layerInfo.guideLayer = (typeof thisLayer.guideLayer == "undefined") ? "undefined" : thisLayer.guideLayer;
                    layerInfo.environmentLayer = (typeof thisLayer.environmentLayer == "undefined") ? "undefined" : thisLayer.environmentLayer;
                    layerInfo.adjustmentLayer = (typeof thisLayer.adjustmentLayer == "undefined") ? "undefined" : thisLayer.adjustmentLayer;
                    layerInfo.blendingMode = (typeof thisLayer.trackMatteType == "undefined") ? "undefined" : thisLayer.blendingMode;
                    layerInfo.autoOrient = (typeof thisLayer.autoOrient == "undefined") ? "undefined" : thisLayer.autoOrient;
                    layerInfo.preserveTransparency = (typeof thisLayer.preserveTransparency == "undefined") ? "undefined" : thisLayer.preserveTransparency;
                    try{
                        layerInfo.separated = thisLayer("ADBE Transform Group")("ADBE Position").dimensionsSeparated;
                    }catch(err){}
                    layerInfo.timeRemap = thisLayer.timeRemapEnabled;
                    layerInfo.stretch = thisLayer.stretch;
                    layerInfo.startTime = thisLayer.startTime;
                    layerInfo.ray = thisLayer.containingComp.renderer === "ADBE Picasso";
                    layerInfo.geoType = "null";
                      if (layerInfo.type != "null" && layerInfo.three == true && layerInfo.ray == true) {
                          if (layerInfo.type == "Shape" || layerInfo.type == "Text") {
                              layerInfo.geoType = "small";
                          } else {
                              layerInfo.geoType = "large";
                          }
                      }
                return layerInfo;
                
                
            },
      
        getCompLayerAttr: function(layerInfo,thisLayer){
                        layerInfo.frameDuration = thisLayer.source.frameDuration;
                        layerInfo.dropFrame = thisLayer.source.dropFrame;
                        layerInfo.workAreaStart = thisLayer.source.workAreaStart;
                        layerInfo.workAreaDuration = thisLayer.source.workAreaDuration;
                        layerInfo.hideShyLayers = thisLayer.source.hideShyLayers;
                        layerInfo.motionBlur = thisLayer.source.motionBlur;
                        layerInfo.draft3d = thisLayer.source.draft3d;
                        layerInfo.frameBlending = thisLayer.source.frameBlending;
                        layerInfo.preserveNestedFrameRate = thisLayer.source.preserveNestedFrameRate;
                        layerInfo.preserveNestedResolution = thisLayer.source.preserveNestedResolution;
                        layerInfo.bgColor = thisLayer.source.bgColor;
                        layerInfo.resolutionFactor = thisLayer.source.resolutionFactor;
                        layerInfo.shutterAngle = thisLayer.source.shutterAngle;
                        layerInfo.shutterPhase = thisLayer.source.shutterPhase;
                        layerInfo.motionBlurSamplesPerFrame = thisLayer.source.motionBlurSamplesPerFrame;
                        layerInfo.motionBlurAdaptiveSampleLimit = thisLayer.source.motionBlurAdaptiveSampleLimit;
                        layerInfo.renderer = thisLayer.source.renderer;
                        layerInfo.compframeDuration = thisLayer.source.frameDuration;
                        layerInfo.comppixelAspect = thisLayer.source.pixelAspect;
                        layerInfo.compframeRate = thisLayer.source.frameRate;
                        layerInfo.compduration = thisLayer.source.duration;
                        layerInfo.compwidth = thisLayer.source.width;
                        layerInfo.compheight = thisLayer.source.height;
                        layerInfo.compname = encodeURIComponent(thisLayer.source.name);
                        layerInfo.comptime = thisLayer.source.time;
                        return layerInfo;
              },
        
        getMaterial: function(layerInf,layerInfo,helperObj,thisLayer){
                    layerInfo.file = thisLayer.source.mainSource.file;
                    if (this.isSaveMaterial == true) {
                        var tempArr = ["ai","bmp","jpg","png","psd","tiff"];
                        if ($.layer.lookUpInArray(thisLayer.source.mainSource.file.name.split(".").last(),tempArr)) {
                            if (thisLayer.source.mainSource.file.length <= 10485760) {
                                    if (helperObj.hasOwnProperty("_" + thisLayer.source.id)) { 
                                        } else {
                                        try {
                                            helperObj["_"+thisLayer.source.id]={};
                                       try {
                                            var thisFileW = File(thisLayer.source.mainSource.file);
                                            thisFileW.open("r");
                                            thisFileW.encoding = "BINARY";
                                            var fileCon = thisFileW.read();
                                            thisFileW.close();
                                            layerInfo.fileBin = encodeURIComponent(fileCon);
                                        } catch (err) {}
                                      } catch (err) {}
                                    }

                            }
                        }
                        var tempArr = ["ape","flac","mp3","wav"];
                        if ($.layer.lookUpInArray(thisLayer.source.mainSource.file.name.split(".").last(),tempArr)) {
                            if (thisLayer.source.mainSource.file.length <= 52428800) {
                                    if (helperObj.hasOwnProperty("_" + thisLayer.source.id)) { 
                                        } else {
                                        try {
                                            helperObj["_"+thisLayer.source.id]={};
                                       try {
                                            var thisFileW = File(thisLayer.source.mainSource.file);
                                            thisFileW.open("r");
                                            thisFileW.encoding = "BINARY";
                                            var fileCon = thisFileW.read();
                                            thisFileW.close();
                                            layerInfo.fileBin = encodeURIComponent(fileCon);
                                        } catch (err) {}
                                      } catch (err) {}
                                    }
                            }
                        }
                    }
                  return layerInfo
              },
        
        
        //~   Return every property under the layer  
        getProperties: function(ref,layerxml,layerInfo){
                if (ref != null) {
                    var point = 0;
                    var groupxml = [];
                    var prop;
                    var va;
                    for (var i = 1; i <= ref.numProperties; i++) {
                        prop = ref.property(i);
                        if ((prop.propertyType == PropertyType.PROPERTY)) {
                            try {
                                va = prop.value.toString();
                                va = true;
                            } catch (err) {
                                va = false;
                            }
                            var bool = true;
                            try {
                                if (prop.matchName != "ADBE Marker") {
                                    prop.setValue(prop.valueAtTime(0, true));
                                }
                            } catch (r) {
                                bool = false;
                            }
                            if (bool || (prop.canSetExpression || prop.matchName == "ADBE Marker") && va) {
                                if (prop.matchName == "ADBE Marker" && prop.numKeys == 0) {} else {
                                                try{
                                                    if(prop.matchName=="ADBE Glo2-0007"){
                                                            prop.setValue(glowtype);
                                                        }
                                                }catch(err){}
                                                try {
                                                        $.layer.prototype.addToLastChild(layerxml, new XML($.layer.prototype.getProperty(prop)), prop.propertyDepth,[]);
                                                } catch (err) {}
                                }
                            }
                        } else if ((prop.propertyType == PropertyType.INDEXED_GROUP) || (prop.propertyType == PropertyType.NAMED_GROUP)) {
                            layerStyle = (prop.matchName == "ADBE Layer Styles" && prop.canSetEnabled == false);
                            layerChild = (prop.propertyGroup(1).matchName == "ADBE Layer Styles" && prop.canSetEnabled == false && prop.propertyIndex > 1);
                            material = (prop.matchName == "ADBE Material Options Group" && prop.propertyGroup(prop.propertyDepth).threeDLayer == false);
                            audio = (prop.matchName == "ADBE Audio Group");
                            geosmall = (prop.matchName == "ADBE Extrsn Options Group" && layerInfo.geoType != "small");
                            geolarge = (prop.matchName == "ADBE Plane Options Group" && layerInfo.geoType != "large");
                            vector = (prop.matchName == "ADBE Vector Materials Group");
                            motion = (prop.matchName == "ADBE MTrackers" && prop.numProperties == 0);
                            if (layerStyle || material || audio || geosmall || geolarge || vector || motion || layerChild) {} else {
                                if (prop.matchName == "ADBE Mask Atom") {
                                   try{
                                          text = "<Group name=\"" + prop.name.toString() + "\" matchName=\"" + prop.matchName.toString() + "\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" maskmode=\"" + prop.maskMode.toString() + "\" inverted=\"" + prop.inverted.toString() + "\" rotoBezier=\"" + prop.rotoBezier.toString() + "\" maskMotionBlur=\"" + prop.maskMotionBlur.toString() + "\" color=\"" + prop.color.toString() + "\" maskFeatherFalloff=\"" + prop.maskFeatherFalloff.toString() + "\" enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    }catch(err){                                    
                                          text = "<Group name=\"" + prop.name.toString() + "\" matchName=\"" + prop.matchName.toString() + "\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" maskmode=\"" + prop.maskMode.toString() + "\" inverted=\"" + prop.inverted.toString() + "\" rotoBezier=\"" + prop.rotoBezier.toString() + "\" maskMotionBlur=\"" + prop.maskMotionBlur.toString() + "\" color=\"" + prop.color.toString() + "\"  enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    }
                                } else {
                                    text = "<Group name=\"" + prop.name.toString() + "\" matchName=\"" + prop.matchName.toString() + "\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                }
                                        try {
                                                 if(prop.matchName=="ADBE Glo2"){
                                                       try{
                                                           glowtype=prop.property("ADBE Glo2-0007").value;
                                                        }catch(err){}
                                                  }    
                                               $.layer.prototype.addToLastChild(layerxml, new XML(text), prop.propertyDepth,[]);
                                        } catch (err) {}
                                        arguments.callee(prop,layerxml,layerInfo);
                            }
                        }
                    }
                }
                return layerxml;
             },
        
        addToLastChild: function(xml, str, propertyDepth,arrLen){
                var length = xml.children().length();
                arrLen.push(length);
                if (length > 0) {
                    arguments.callee(xml.child(length - 1), str, propertyDepth,arrLen);
                } else {
                    for (var LastCh = 0; LastCh < arrLen.length - propertyDepth; LastCh++) {
                        xml = xml.parent();
                    }
                    xml.appendChild(new XML(str));
                    arrLen.length = 0;
                }
              },
      
        getProperty: function(thisProperty){
            if (thisProperty.numKeys != 0) {
                    var keyTime = [];
                    var keyValue = [];
                    var keyInSpeed = [];
                    var keyInIn = [];
                    var keyOutSpeed = [];
                    var keyOutIn = [];
                    if ((thisProperty.valueAtTime(0, true) instanceof Shape == false) && (thisProperty.matchName != "ADBE Marker") && (thisProperty.matchName != "ADBE Text Document")) {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"" + thisProperty.numKeys.toString() + "\"></prop>";
                        var propxml = new XML(text);
                        for (var propi = 1; propi <= thisProperty.numKeys; propi++) {
                            keyTime.push(thisProperty.keyTime(propi));
                            keyValue.push(thisProperty.keyValue(propi));
                        }
                        propxml.keyValue = keyValue;
                        propxml.keyTime = keyTime;
                        propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                        propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                    } else if (thisProperty.valueAtTime(0, true) instanceof Shape == true) {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"" + thisProperty.numKeys.toString() + "\"></prop>";
                        propxml = new XML(text);
                        propxml.keyValue = 0;
                        propxml.keyValue.setChildren(new XML("<zhanwei>wa</zhanwei>"));
                        for (var propi = 1; propi <= thisProperty.numKeys; propi++) {
                            text = "<shapeValue></shapeValue>";
                            shapexml = new XML(text);
                            keyTime.push(thisProperty.keyTime(propi));
                            closed = XML("<closed>" + thisProperty.keyValue(propi).closed + "</closed>");
                            vertices = XML("<vertices>" + thisProperty.keyValue(propi).vertices.toString() + "</vertices>");
                            inTan = XML("<inTan>" + thisProperty.keyValue(propi).inTangents.toString() + "</inTan>");
                            outTan = XML("<outTan>" + thisProperty.keyValue(propi).outTangents.toString() + "</outTan>");
                            shapexml.appendChild(closed);
                            shapexml.appendChild(vertices);
                            shapexml.appendChild(inTan);
                            shapexml.appendChild(outTan);
                            propxml.keyValue.appendChild(shapexml);
                        }
                        delete propxml.keyValue.zhanwei;
                        propxml.keyTime = keyTime;
                        propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                        propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                    } else if (thisProperty.matchName == "ADBE Marker") {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"" + thisProperty.numKeys.toString() + "\"></prop>";
                        var propxml = new XML(text);
                        propxml.keyValue = 0;
                        propxml.keyValue.setChildren(new XML("<zhanwei>wa</zhanwei>"));
                        for (var propi = 1; propi <= thisProperty.numKeys; propi++) {
                            text = "<markerValue></markerValue>";
                            markxml = new XML(text);
                            keyTime.push(thisProperty.keyTime(propi));
                            comment = XML("<comment>" + thisProperty.keyValue(propi).comment + "</comment>");
                            duration = XML("<duration>" + thisProperty.keyValue(propi).duration.toString() + "</duration>");
                            chapter = XML("<chapter>" + thisProperty.keyValue(propi).chapter.toString() + "</chapter>");
                            cuePointName = XML("<cuePointName>" + thisProperty.keyValue(propi).cuePointName.toString() + "</cuePointName>");
                            eventCuePoint = XML("<eventCuePoint>" + thisProperty.keyValue(propi).eventCuePoint.toString() + "</eventCuePoint>");
                            url = XML("<url>" + thisProperty.keyValue(propi).url.toString() + "</url>");
                            frameTarget = XML("<frameTarget>" + thisProperty.keyValue(propi).frameTarget.toString() + "</frameTarget>");
                            markxml.appendChild(comment);
                            markxml.appendChild(duration);
                            markxml.appendChild(chapter);
                            markxml.appendChild(cuePointName);
                            markxml.appendChild(eventCuePoint);
                            markxml.appendChild(url);
                            markxml.appendChild(frameTarget);
                            propxml.keyValue.appendChild(markxml);
                        }
                        delete propxml.keyValue.zhanwei;
                        propxml.keyTime = keyTime;
                        propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                        propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                    } else if (thisProperty.matchName == "ADBE Text Document") {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"" + thisProperty.numKeys.toString() + "\"></prop>";
                        var propxml = new XML(text);
                        propxml.keyValue = 0;
                        propxml.keyValue.setChildren(new XML("<zhanwei>wa</zhanwei>"));
                        for (var propi = 1; propi <= thisProperty.numKeys; propi++) {
                            text = "<textValue></textValue>";
                            textxml = new XML(text);
                            keyTime.push(thisProperty.keyTime(propi));
                            text = XML("<text>" + thisProperty.keyValue(propi).text + "</text>");
                            font = XML("<font>" + thisProperty.keyValue(propi).font.toString() + "</font>");
                            fontSize = XML("<fontSize>" + thisProperty.keyValue(propi).fontSize.toString() + "</fontSize>");
                            applyFill = XML("<applyFill>" + thisProperty.keyValue(propi).applyFill.toString() + "</applyFill>");
                            applyStroke = XML("<applyStroke>" + thisProperty.keyValue(propi).applyStroke.toString() + "</applyStroke>");
                            fillColor = XML("<fillColor>" + ((thisProperty.keyValue(propi).applyFill == true) ? thisProperty.keyValue(propi).fillColor.toString() : "None").toString() + "</fillColor>");
                            strokeColor = XML("<strokeColor>" + ((thisProperty.keyValue(propi).applyStroke == true) ? thisProperty.keyValue(propi).strokeColor.toString() : "None").toString() + "</strokeColor>");
                            strokeOverFill = XML("<strokeOverFill>" + thisProperty.keyValue(propi).strokeOverFill.toString() + "</strokeOverFill>");
                            strokeWidth = XML("<strokeWidth>" + thisProperty.keyValue(propi).strokeWidth.toString() + "</strokeWidth>");
                            justification = XML("<justification>" + thisProperty.keyValue(propi).justification.toString() + "</justification>");
                            tracking = XML("<tracking>" + thisProperty.keyValue(propi).tracking.toString() + "</tracking>");
                            pointText = XML("<pointText>" + thisProperty.keyValue(propi).pointText.toString() + "</pointText>");
                            boxText = XML("<boxText>" + thisProperty.keyValue(propi).boxText.toString() + "</boxText>");
                            if (thisProperty.keyValue(propi).boxText == true) {
                                boxTextSize = XML("<boxTextSize>" + thisProperty.keyValue(propi).boxTextSize.toString() + "</boxTextSize>");
                            } else {
                                boxTextSize = XML("<boxTextSize>None</boxTextSize>");
                            }
                            textxml.appendChild(text);
                            textxml.appendChild(font);
                            textxml.appendChild(fontSize);
                            textxml.appendChild(applyFill);
                            textxml.appendChild(applyStroke);
                            textxml.appendChild(fillColor);
                            textxml.appendChild(strokeColor);
                            textxml.appendChild(strokeOverFill);
                            textxml.appendChild(strokeWidth);
                            textxml.appendChild(justification);
                            textxml.appendChild(tracking);
                            textxml.appendChild(pointText);
                            textxml.appendChild(boxText);
                            textxml.appendChild(boxTextSize);
                            propxml.keyValue.appendChild(textxml);
                        }
                        delete propxml.keyValue.zhanwei;
                        propxml.keyTime = keyTime;
                        propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                        propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
                    }
                    if (thisProperty.matchName != "ADBE Marker" && thisProperty.matchName != "ADBE Text Document") {
                        for (var propi = 1; propi <= thisProperty.numKeys; propi++) {
                            ease = "<Ease></Ease>";
                            var easexml = new XML(ease);
                            if (thisProperty.keyInTemporalEase(1).length == 1) {
                                easexml.InSpeed = thisProperty.keyInTemporalEase(propi)[0].speed;
                                easexml.InIn = thisProperty.keyInTemporalEase(propi)[0].influence;
                                easexml.OutSpeed = thisProperty.keyOutTemporalEase(propi)[0].speed;
                                easexml.OutIn = thisProperty.keyOutTemporalEase(propi)[0].influence;
                            } else if (thisProperty.keyInTemporalEase(1).length == 2) {
                                easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed];
                                easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence];
                                easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed];
                                easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence];
                            } else if (thisProperty.keyInTemporalEase(1).length == 3) {
                                easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed, thisProperty.keyInTemporalEase(propi)[2].speed];
                                easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence, thisProperty.keyInTemporalEase(propi)[2].influence];
                                easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed, thisProperty.keyOutTemporalEase(propi)[2].speed];
                                easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence, thisProperty.keyOutTemporalEase(propi)[2].influence];
                            }
                            try{
                            easexml.inInterType = thisProperty.keyInInterpolationType (propi);
                            easexml.outInterType = thisProperty.keyOutInterpolationType (propi);
                            }catch(err){}
                            try{
                            easexml.isRoving = thisProperty.keyRoving(propi);
                            }catch(err){}
                            propxml.appendChild(easexml);
                        }
                    }
                    if (thisProperty.expression != "") {
                        propxml.exp = encodeURIComponent(thisProperty.expression).toString();
                        propxml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
                    }
                } else {
                    if ((thisProperty.valueAtTime(0, true) instanceof Shape == false) && thisProperty.matchName != "ADBE Text Document") {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"0\">" + thisProperty.valueAtTime(0, true).toString() + "</prop>";
                        var propxml = new XML(text);
                        if (thisProperty.expression != "") {
                            propxml.exp = encodeURIComponent(thisProperty.expression).toString();
                            propxml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
                        }
                    } else if (thisProperty.valueAtTime(0, true) instanceof Shape == true) {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"" + thisProperty.numKeys.toString() + "\"></prop>";
                        shapexml = new XML(text);
                        shapexml.closed = thisProperty.valueAtTime(0, true).closed;
                        shapexml.vertices = thisProperty.valueAtTime(0, true).vertices.toString();
                        shapexml.inTan = thisProperty.valueAtTime(0, true).inTangents.toString();
                        shapexml.outTan = thisProperty.valueAtTime(0, true).outTangents.toString();
                        if (thisProperty.expression != "") {
                            shapexml.exp = encodeURIComponent(thisProperty.expression).toString();
                            shapexml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
                        }
                        propxml = shapexml;
                    } else if (thisProperty.matchName == "ADBE Text Document") {
                        text = "<prop matchName=\"" + thisProperty.matchName.toString() + "\" propertyIndex=\"" + thisProperty.propertyIndex.toString() + "\" key=\"" + thisProperty.numKeys.toString() + "\"></prop>";
                        textxml = new XML(text);
                        textxml.text = ((thisProperty.valueAtTime(0, true).text == undefined) ? "None" : thisProperty.valueAtTime(0, true).text).toString();
                        textxml.font = thisProperty.valueAtTime(0, true).font.toString();
                        textxml.fontSize = thisProperty.valueAtTime(0, true).fontSize.toString();
                        textxml.applyFill = thisProperty.valueAtTime(0, true).applyFill.toString();
                        textxml.applyStroke = thisProperty.valueAtTime(0, true).applyStroke.toString();
                        textxml.fillColor = ((thisProperty.valueAtTime(0, true).applyFill == true) ? thisProperty.valueAtTime(0, true).fillColor.toString() : "None").toString();
                        textxml.strokeColor = ((thisProperty.valueAtTime(0, true).applyStroke == true) ? thisProperty.valueAtTime(0, true).strokeColor.toString() : "None").toString();
                        textxml.strokeOverFill = thisProperty.valueAtTime(0, true).strokeOverFill.toString();
                        textxml.strokeWidth = thisProperty.valueAtTime(0, true).strokeWidth.toString();
                        textxml.justification = thisProperty.valueAtTime(0, true).justification.toString();
                        textxml.tracking = thisProperty.valueAtTime(0, true).tracking.toString();
                        textxml.pointText = thisProperty.valueAtTime(0, true).pointText.toString();
                        textxml.boxText = thisProperty.valueAtTime(0, true).boxText.toString();
                        textxml.boxTextSize = ((thisProperty.valueAtTime(0, true).boxText == true) ? thisProperty.valueAtTime(0, true).boxTextSize.toString() : "None").toString();
                        if (thisProperty.expression != "") {
                            textxml.exp = encodeURIComponent(thisProperty.expression).toString();
                            textxml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
                        }
                        propxml = textxml;
                    }
                }
                return propxml;
              }, 
        
        
        //get the xml-based data of single layer
        getXmlFromLayer: function(index){
            
                      var thisLayer = this.item;
                      var helperObj = {};
              
                      var layerInfo = this.getLayerAttr(index);
                      
                      var layerPropertiesXml = this.getProperties(thisLayer, new XML("<Properties></Properties>"),layerInfo);
                      
                      layerInfo.appendChild (layerPropertiesXml);
                      
                      return layerInfo;
            },
            
            //recuisive get all xmls from selected layers, support comp layer
            toXML : function(layers,elementName,helperObj){
                                                var comp = layers[0].containingComp;
                                                helperObj = helperObj || {};
                                                helperObj["_"+comp.id] = helperObj["_"+comp.id] || {};
                                                helperObj["elementArr"] = helperObj["elementArr"] || [];
                                                var elementArr = helperObj.elementArr;
                                                if(elementArr.length ==0)
                                                      var elementxml = new XML("<Element name=\""+elementName+"\"></Element>");
                                                else
                                                      var elementxml = new XML("<Comptent name=\"" + elementName + "\"></Comptent>");
                                                      
                                                      
                                                var loopFunc = function(thisLayer,index){
                                                                var thisIndex = elementArr.length ==0? index+1: index;
                                                                var xml = new $.layer(thisLayer,helperObj).getXmlFromLayer(thisIndex);

                                                                if (thisLayer.source instanceof CompItem) {
                                                                        if (helperObj.hasOwnProperty ("_"+thisLayer.source.id)) {
                                                                                elementxmltemp = helperObj["_"+thisLayer.source.id]["ele"];
                                                                                xml.Properties.appendChild(elementxmltemp);
                                                                        } else {
                                                                            elementArr.push(elementxml);
                                                                            var comptentXml = $.layer.prototype.toXML(thisLayer.source.layers,
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
                                                     $.layer.forEachLayer.call(layers,loopFunc);
                                                
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
  
    //convert XML object to Layer object
    $.layer.extend($.layer.prototype,{

          isOnlyEffect:         false,
          isCleanGroup:       false,
          isKeyframeOffset:  false,
          
          newLayer: function(xml,thisComp){
                            var layer;
                            try {
                                if (xml.@type == "Solid" || xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound" || xml.@type == "Comp") {
                                    solidcolor = [xml.solidColor.toString().split(",")[0], xml.solidColor.toString().split(",")[1], xml.solidColor.toString().split(",")[2]];
                                    if (xml.solidColor.toString() != "") {
                                        var layer = thisComp.layers.addSolid(solidcolor, decodeURIComponent(xml.@name), parseInt(xml.width), parseInt(xml.height), 1);
                                        layer.name = decodeURIComponent(xml.@name);
                                        try {
                                            layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                        } catch (err) {};
                                    } else if (xml.@type == "Comp") {
                                        layer = $.layer.prototype.newComp(xml, thisComp);
                                    } else if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound") {
                                        try{
                                              layer = $.layer.prototype.newMaterial(xml, thisComp);
                                              layer.source.parentFolder = this.compFolder;
                                        }catch(err){layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", parseInt(xml.width), parseInt(xml.height), 1);}
                                       try{
                                           if(layer.name!=decodeURIComponent(xml.@name)){
                                                layer.name = decodeURIComponent(xml.@name);
                                            }
                                            }catch(err){}
                                    }
                                } else if (xml.@type == "Text") {
                                    try{
                                          var layer = (xml.textType.toString() == "point") ? thisComp.layers.addText() : thisComp.layers.addBoxText([xml.boxSize.toString().split(",")[0], xml.boxSize.toString().split(",")[1]]);
                                    }catch(err){var layer = thisComp.layers.addText();}
                                    layer.name = decodeURIComponent(xml.@name);
                                    try {
                                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                    } catch (err) {};
                                } else if (xml.@type == "Shape") {
                                    var layer = thisComp.layers.addShape();
                                    layer.name = decodeURIComponent(xml.@name);
                                    try {
                                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                    } catch (err) {};
                                } else if (xml.@type == "null") {
                                    var layer = thisComp.layers.addNull();
                                    layer.name = decodeURIComponent(xml.@name);
                                    try {
                                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                    } catch (err) {};
                                } else if (xml.@type == "Light") {
                                    var layer = thisComp.layers.addLight(decodeURIComponent(xml.@name), [0, 0]);
                                    layer.lightType = $.layer.getDistance(layer.lightType, parseInt(xml.light));
                                    layer.name = decodeURIComponent(xml.@name);
                                    try {
                                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                    } catch (err) {};
                                } else if (xml.@type == "Camera") {
                                    var layer = thisComp.layers.addCamera(decodeURIComponent(xml.@name), [0, 0]);
                                    layer.name = decodeURIComponent(xml.@name);
                                    try {
                                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                    } catch (err) {};
                                }
                            } catch (err) {}
                            if (xml.@type != "Comp") {
                                try {
                                    layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                } catch (err) {};
                                try {
                                    layer.label = parseInt(xml.label.toString())
                                } catch (err) {}
                                try{
                                    if(xml.geoType == "small" ||xml.geoType == "large"){
                                            layer.containingComp.renderer = "ADBE Picasso";
                                        }
                                } catch (err) {}
                                try {
                                    if (xml.inPoint != "undefined") {
                                        layer.inPoint = parseFloat(xml.inPoint);
                                    }
                                } catch (err) {}
                                try {
                                    if (xml.outPoint != "undefined")
                                        layer.outPoint = parseFloat(xml.outPoint);
                                } catch (err) {}
                                try {
                                    if (xml.solo != "undefined")
                                        layer.solo = (xml.solo.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.enabled != "undefined")
                                        layer.enabled = (xml.enabled.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.three != "undefined")
                                        layer.threeDLayer = (xml.three.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.timeRemap.toString() != "undefined") {
                                        if (xml.timeRemap.toString() == "true") {
                                            layer.timeRemapEnabled = true;
                                        }
                                    }
                                } catch (err) {}
                                try {
                                    layer.collapseTransformation = (xml.collapseTransformation.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.audioEnabled.toString() != "") {
                                        layer.audioEnabled = (xml.audioEnabled.toString() == "true") ? true : false;
                                    }
                                } catch (err) {}
                                try {
                                    if (xml.trackMatteType != "undefined")
                                        layer.trackMatteType = $.layer.getDistance(layer.trackMatteType, parseInt(xml.trackMatteType));
                                } catch (err) {}
                                try {
                                    if (xml.shy != "undefined")
                                        layer.shy = (xml.shy.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.motionBlur == true)
                                        layer.motionBlur = true;
                                } catch (err) {}
                                try {
                                    if (xml.guideLayer == true)
                                        layer.guideLayer = true;
                                } catch (err) {}
                                try {
                                    if (xml.environmentLayer == true)
                                        layer.environmentLayer = true;
                                } catch (err) {}
                                try {
                                    if (xml.adjustmentLayer == true)
                                        layer.adjustmentLayer = true;
                                } catch (err) {}
                                try {
                                    if (xml.blendingMode.toString() != "undefined")
                                        layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode));
                                } catch (err) {}
                                try {
                                    if (xml.autoOrient.toString() != "undefined")
                                        layer.autoOrient = $.layer.getDistance(layer.autoOrient, parseInt(xml.autoOrient));
                                } catch (err) {}
                                try {
                                    if (xml.preserveTransparency.toString() != "undefined")
                                        layer.preserveTransparency = (xml.preserveTransparency.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.separated.toString() != "undefined") {
                                        layer.property("ADBE Transform Group")("ADBE Position").dimensionsSeparated = (xml.separated.toString() == "true") ? true : false;
                                    }
                                } catch (err) {}
                            }
                            try {
                                if (xml.@type != "VideoWithSound" && xml.@type != "Comp") {
                                    try {
                                        $.layer.prototype.newPropertyGroup(xml.Properties,layer);
                                    } catch (err) {}
                                }
                            } catch (err) {};
                            return layer;
                            
                },
          
          newComp: function(xml,thisComp){
                            var layer = null;
                            if (xml.@type == "Comp") {
                                try {
                                    var isComp = false;
                                } catch (err) {}
                                try {
                                    if (xml.@type == "Comp") {
                                        for (isA = 0; isA < app.project.numItems; isA++) {
                                            if (app.project.item(isA + 1) instanceof CompItem && app.project.item(isA + 1).name == decodeURIComponent(xml.compname.toString())) {
                                                if (app.project.item(isA + 1).numLayers == xml.Properties.Comptent.children().length()) {
                                                    var thisItem = app.project.item(isA + 1);
                                                    isComp = true;
                                                    zhuan = false;
                                                    for (isB = 0; isB < app.project.item(isA + 1).numLayers; isB++) {
                                                        zhuan = true;
                                                        if (app.project.item(isA + 1).layer(isB + 1).name != decodeURIComponent(xml.Properties.Comptent.child(isB).@name)) {
                                                            isComp = false;
                                                        }
                                                    }
                                                    if (isComp == true && zhuan == true) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } catch (err) {}
                                if (isComp == true) {
                                    try {
                                        layer = thisComp.layers.add(thisItem);
                                    } catch (err) {}
                                } else {
                                    try {
                                        try {
                                            var comp = app.project.items.addComp(decodeURIComponent(xml.compname.toString()), 
                                                                                                                  parseInt(xml.compwidth), parseInt(xml.compheight), 
                                                                                                                  parseFloat(xml.comppixelAspect), parseFloat(xml.compduration), 
                                                                                                                  parseFloat(xml.compframeRate));
                                                   if (comp.id != app.project.activeItem.id){
                                                            comp.parentFolder = this.compFolder;
                                                        }
                                        } catch (err) {}
                                        try {
                                            comp.frameDuration = parseFloat(xml.frameDuration);
                                        } catch (err) {}
                                        try {
                                            comp.dropFrame = parseInt(xml.dropFrame);
                                        } catch (err) {}
                                        try {
                                            comp.workAreaStart = parseFloat(xml.workAreaStart);
                                        } catch (err) {}
                                        try {
                                            comp.workAreaDuration = parseFloat(xml.workAreaDuration);
                                        } catch (err) {}
                                        try {
                                            comp.hideShyLayers = parseInt(xml.hideShyLayers);
                                        } catch (err) {}
                                        try {
                                            comp.motionBlur = parseInt(xml.motionBlur);
                                        } catch (err) {}
                                        try {
                                            comp.draft3d = parseInt(xml.draft3d);
                                        } catch (err) {}
                                        try {
                                            comp.frameBlending = parseInt(xml.frameBlending);
                                        } catch (err) {}
                                        try {
                                            comp.preserveNestedFrameRate = parseInt(comp.preserveNestedFrameRate);
                                        } catch (err) {}
                                        try {
                                            comp.preserveNestedResolution = parseInt(comp.preserveNestedResolution);
                                        } catch (err) {}
                                        try {
                                            comp.bgColor = [parseFloat(xml.bgColor.toString().split(",")[0]), parseFloat(xml.bgColor.toString().split(",")[1]), parseFloat(xml.bgColor.toString().split(",")[2])];
                                        } catch (err) {}
                                        try {
                                            comp.resolutionFactor = [parseFloat(xml.resolutionFactor.toString().split(",")[0]), parseFloat(xml.resolutionFactor.toString().split(",")[1])];
                                        } catch (err) {}
                                        try {
                                            comp.shutterAngle = parseFloat(xml.shutterAngle);
                                        } catch (err) {}
                                        try {
                                            comp.shutterPhase = parseFloat(xml.shutterPhase);
                                        } catch (err) {}
                                        try {
                                            comp.motionBlurSamplesPerFrame = parseInt(xml.motionBlurSamplesPerFrame);
                                        } catch (err) {}
                                        try {
                                            comp.motionBlurAdaptiveSampleLimit = parseInt(xml.motionBlurAdaptiveSampleLimit);
                                        } catch (err) {}
                                        try {
                                            comp.renderer = xml.renderer.toString();
                                        } catch (err) {}
                                        try {
                                            layer = thisComp.layers.add(comp);
                                        } catch (err) {}
                                    } catch (err) {}
                                }
                                layer.name = decodeURIComponent(xml.@name);
                                try {
                                    layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                } catch (err) {};
                                try {
                                    layer.label = parseInt(xml.label.toString())
                                } catch (err) {}
                                try {
                                    layer.stretch = parseFloat(xml.stretch);
                                } catch (err) {}
                                try {
                                    if (xml.startTime != "undefined") {
                                        layer.startTime = parseFloat(xml.startTime);
                                    }
                                } catch (err) {}
                                try {
                                    if (xml.inPoint != "undefined") {
                                        layer.inPoint = parseFloat(xml.inPoint);
                                    }
                                } catch (err) {}
                                try {
                                    if (xml.outPoint != "undefined")
                                        layer.outPoint = parseFloat(xml.outPoint);
                                } catch (err) {}
                                try {
                                    if (xml.solo != "undefined")
                                        layer.solo = (xml.solo.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.enabled != "undefined")
                                        layer.enabled = (xml.enabled.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.three != "undefined")
                                        layer.threeDLayer = (xml.three.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.timeRemap.toString() != "undefined") {
                                        if (xml.timeRemap.toString() == "true") {
                                            layer.timeRemapEnabled = true;
                                            try {
                                                layer.property("ADBE Time Remapping").removeKey(2);
                                            } catch (err) {}
                                        }
                                    }
                                } catch (err) {}
                                try {
                                    layer.collapseTransformation = (xml.collapseTransformation.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.audioEnabled.toString() != "") {
                                        layer.audioEnabled = (xml.audioEnabled.toString() == "true") ? true : false;
                                    }
                                } catch (err) {}
                                try {
                                    if (xml.trackMatteType != "undefined")
                                        layer.trackMatteType = $.layer.getDistance(layer.trackMatteType, parseInt(xml.trackMatteType));
                                } catch (err) {}
                                try {
                                    if (xml.shy != "undefined")
                                        layer.shy = (xml.shy.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.motionBlur == true)
                                        layer.motionBlur = true;
                                } catch (err) {}
                                try {
                                    if (xml.guideLayer == true)
                                        layer.guideLayer = true;
                                } catch (err) {}
                                try {
                                    if (xml.environmentLayer == true)
                                        layer.environmentLayer = true;
                                } catch (err) {}
                                try {
                                    if (xml.adjustmentLayer == true)
                                        layer.adjustmentLayer = true;
                                } catch (err) {}
                                try {
                                    if (xml.blendingMode.toString() != "undefined")
                                        layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode));
                                } catch (err) {}
                                try {
                                    if (xml.autoOrient.toString() != "undefined")
                                        layer.autoOrient = $.layer.getDistance(layer.autoOrient, parseInt(xml.autoOrient));
                                } catch (err) {}
                                try {
                                    if (xml.preserveTransparency.toString() != "undefined")
                                        layer.preserveTransparency = (xml.preserveTransparency.toString() == "true") ? true : false;
                                } catch (err) {}
                                try {
                                    if (xml.separated.toString() != "undefined") {
                                        layer.property("ADBE Transform Group")("ADBE Position").dimensionsSeparated = (xml.separated.toString() == "true") ? true : false;
                                    }
                                } catch (err) {}
                                try {
                                   $.layer.prototype.newPropertyGroup(xml.Properties,layer);
                                } catch (err) {}
                                if (isComp == false) {
                                    try {
                                        $.layer.prototype.toLayer(comp,xml.Properties.Comptent);
                                    } catch (err) {};
                                }
                            }
                            return layer;
                },
          
          newMaterial: function(xml, thisComp){
                            var isExist = false;
                            try {
                                if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound") {
                                    for (isA = 0; isA < app.project.numItems; isA++) {
                                        if (typeof app.project.item(isA + 1).file != "undefiend" && app.project.item(isA + 1).file != null) {
                                            if (File(app.project.item(isA + 1).file).toString() == File(xml.file.toString()).toString() ||
                                                    File(app.project.item(isA+1).file.toString()).toString() == File(this.tempFolder.toString()+decodeURIComponent(File(xml.file.toString()).toString())).toString()) {
                                                isExist = true;
                                                thisItem = app.project.item(isA + 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            } catch (err) {}
                            try {
                                if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound" && isExist) {
                                    layer = thisComp.layers.add(thisItem);
                                    layer.name = decodeURIComponent(xml.@name);
                                    try {
                                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                    } catch (err) {};
                                    try {
                                        layer.strectch = parseFloat(xml.stretch);
                                    } catch (err) {}
                                    try {
                                        if (xml.startTime != "undefined") {
                                            layer.startTime = parseFloat(xml.startTime);
                                        }
                                    } catch (err) {}
                                }
                            } catch (err) {}
                          try{  if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound" && !(isExist)) {
                                try {
                                    try {
                                        if (File(xml.file.toString()).exists) {
                                            var waitIm = File(xml.file.toString());
                                            }else if(File(this.tempFolder.toString()+this.slash+decodeURIComponent(File(xml.file.toString()).toString())).exists){
                                                if(decodeURIComponent(File(xml.file.toString()).toString())[0]=="~"){
                                                    genFilePath = File(genFileFolder.toString()+this.slash +"D"+ decodeURIComponent(File(xml.file.toString()).toString()));
                                                    }else{
                                                        genFilePath = File(genFileFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString()));
                                                        }
                                                    var waitIm=genFilePath;
                                        } else if (xml.fileBin.toString() != "") {
                                            try {
                                                if (xml.file.toString().indexOf(".ai") != -1 ||
                                                      xml.file.toString().indexOf(".psd") != -1 ||
                                                      xml.file.toString().indexOf(".bmp") != -1 ||
                                                      xml.file.toString().indexOf(".jpg") != -1 || 
                                                      xml.file.toString().indexOf(".tiff") != -1 || 
                                                      xml.file.toString().indexOf(".png") != -1) {
                                                    genFileFolder = Folder(this.tempFolder);
                                                    if (!genFileFolder.exists) {
                                                        genFileFolder.create();
                                                    }
                                                if(decodeURIComponent(File(xml.file.toString()).toString())[0]=="~"){
                                                    genFilePath = File(genFileFolder.toString() +this.slash+"D"+ decodeURIComponent(File(xml.file.toString()).toString()));
                                                    }else{
                                                        genFilePath = File(genFileFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString()));
                                                        }
                                                    waitToWrite = decodeURIComponent(xml.fileBin.toString());
                                                    if (!genFilePath.exists || genFilePath.exists && genFilePath.length != waitToWrite.length) {
                                                        genThisFolder(genFilePath,new Array);
                                                        function genThisFolder(theFile,arr){
                                                            if (theFile.parent.exists){
                                                                }else{
                                                                    arr.push(theFile);
                                                                    genThisFolder(theFile.parent,arr);
                                                                    theFile = arr[arr.length-1];
                                                                    arr.pop();
                                                                    theFile.parent.create();
                                                                    }
                                                            }
                                                        if(!genFilePath.parent.exists)
                                                            genFilePath=File(this.tempFolder.toString()+this.slash+decodeURIComponent(File(xml.file.toString()).name.toString()));
                                                        genFilePath.open("w");
                                                        genFilePath.encoding = "BINARY";
                                                        isWrite=genFilePath.write(waitToWrite);
                                                        genFilePath.close();
                                                    }
                                                } else if (xml.file.toString().indexOf(".ape") != -1 ||
                                                               xml.file.toString().indexOf(".flac") != -1 ||
                                                               xml.file.toString().indexOf(".mp3") != -1 || 
                                                               xml.file.toString().indexOf(".wav") != -1) {
                                                    genFileFolder = Folder(this.tempFolder);
                                                    if (!genFileFolder.exists) {
                                                        genFileFolder.create();
                                                    }
                                                if(decodeURIComponent(File(xml.file.toString()).toString())[0]=="~"){
                                                    genFilePath = File(genFileFolder.toString() +this.slash+"D"+ decodeURIComponent(File(xml.file.toString()).toString()));
                                                    }else{
                                                        genFilePath = File(genFileFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString()));
                                                        }
                                                    waitToWrite = decodeURIComponent(xml.fileBin.toString());
                                                    if (!genFilePath.exists || genFilePath.exists && genFilePath.length != waitToWrite.length) {
                                                        genThisFolder(genFilePath,new Array);
                                                        function genThisFolder(theFile,arr){
                                                            if (theFile.parent.exists){
                                                                }else{
                                                                    arr.push(theFile);
                                                                    genThisFolder(theFile.parent,arr);
                                                                    theFile = arr[arr.length-1];
                                                                    arr.pop();
                                                                    theFile.parent.create();
                                                                    }
                                                            }
                                                        if(!genFilePath.parent.exists)
                                                            genFilePath=File(this.tempFolder+this.slash+decodeURIComponent(File(xml.file.toString()).name.toString()));
                                                        genFilePath.open("w");
                                                        genFilePath.encoding = "BINARY";
                                                        genFilePath.write(waitToWrite);
                                                        genFilePath.close();
                                                    }
                                                }
                                                var waitIm = genFilePath;
                                            } catch (err) {}
                                        }
                                    } catch (err) {}
                                    try{
                                    var im = new ImportOptions();
                                    //alert(waitIm);
                                    im.file = waitIm;
                                    try {
                                        im.sequence = false;
                                        im.forceAlphabetical = false;
                                    } catch (err) {}
                                    }catch(err){layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);return layer;}
                                    if (im.canImportAs(ImportAsType.FOOTAGE)) {
                                        im.importAs = ImportAsType.FOOTAGE;
                                        f = app.project.importFile(im);
                                        layer = thisComp.layers.add(f);
                                        layer.name = decodeURIComponent(xml.@name);
                                        try {
                                            layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                        } catch (err) {};
                                        try {
                                            layer.strectch = parseFloat(xml.stretch);
                                        } catch (err) {}
                                        try {
                                            if (xml.startTime != "undefined") {
                                                layer.startTime = parseFloat(xml.startTime);
                                            }
                                        } catch (err) {}
                                    } else if (im.canImportAs(ImportAsType.FOOTAGE)) {
                                        im.importAs = ImportAsType.FOOTAGE;
                                        f = app.project.importFile(im);
                                        layer = thisComp.layers.add(f);
                                        layer.name = decodeURIComponent(xml.@name);
                                        try {
                                            layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                                        } catch (err) {};
                                        try {
                                            layer.strectch = parseFloat(xml.stretch);
                                        } catch (err) {}
                                        try {
                                            if (xml.startTime != "undefined") {
                                                layer.startTime = parseFloat(xml.startTime);
                                            }
                                        } catch (err) {}
                                    } else {
                                       // alert("Wrong file type can not be imported !");
                                        layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);
                                    }
                                } catch (err) {}
                            }
                        }catch(err){}
                        try{
                            if(layer instanceof AVLayer){
                              return layer;
                            }else{
                                layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);
                                return layer;
                                }
                            }catch(err){layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);return layer;}
                },
          
          
          newPropertyGroup: function(xml,layers,inTime){
                                for (var addi = 0; addi < xml.children().length(); addi++) {
                                  if (xml.child(addi).name() == "Group") {
                                      prop = 0;
                                      try{
                                      if (layers.canAddProperty(xml.child(addi).@matchName)) {
                                                                                    
                                          var prop = layers.addProperty(xml.child(addi).@matchName);
                                                                                  
                                          try {
                                              if (layers.property(parseInt(xml.child(addi).@propertyIndex)).matchName == "ADBE Mask Atom") {
                                                  try {
                                                      layers.property(parseInt(xml.child(addi).@propertyIndex)).maskMode =$.layer.getDistance(layers.property(parseInt(xml.child(addi).@propertyIndex)).maskMode, parseInt(xml.child(addi).@maskmode));
                                                  } catch (err) {}
                                                  layers.property(parseInt(xml.child(addi).@propertyIndex)).inverted = (xml.child(addi).@inverted.toString() == "false") ? false : true;
                                                  layers.property(parseInt(xml.child(addi).@propertyIndex)).rotoBezier = (xml.child(addi).@rotoBezier.toString() == "false") ? false : true;
                                                  layers.property(parseInt(xml.child(addi).@propertyIndex)).color = [xml.child(addi).@color.toString().split(",")[0], xml.child(addi).@color.toString().split(",")[1], xml.child(addi).@color.toString().split(",")[2]];
                                                  try {
                                                      layers.property(parseInt(xml.child(addi).@propertyIndex)).maskMotionBlur = $.layer.getDistance(layers.property(parseInt(xml.child(addi).@propertyIndex)).maskMotionBlur, parseInt(xml.child(addi).@maskMotionBlur));
                                                  } catch (err) {}
                                                  try {
                                                      layers.property(parseInt(xml.child(addi).@propertyIndex)).maskFeatherFalloff = $.layer.getDistance(layers.property(parseInt(xml.child(addi).@propertyIndex)).maskFeatherFalloff, parseInt(xml.child(addi).@maskFeatherFalloff));
                                                  } catch (err) {}
                                              }
                                          } catch (err) {}
                                      } else if (xml.child(addi).@matchName.toString() == "ADBE Layer Styles") {
                                          var group = xml.child(addi).children();
                                          var layerStyleArr = [];
                                          var cunName = [];
                                          for (var shenqi = 0; shenqi < group.length(); shenqi++) {
                                              layerStyleArr.push(xml.child(addi).child(shenqi).@matchName);
                                              cunName.push(xml.child(addi).child(shenqi).@name);
                                          }
                                          for (var shenqi = 0; shenqi < layerStyleArr.length; shenqi++) {
                                              if (layerStyleArr[shenqi].indexOf("/") != -1) {
                                                  try {
                                                      if(layers.propertyDepth==0){
                                                               if (layers.containingComp.id == app.project.activeItem.id)
                                                                  app.executeCommand(app.findMenuCommandId(cunName[shenqi]));
                                                            
                                                      }else if (layers.propertyGroup(layers.propertyDepth).containingComp.id == app.project.activeItem.id) {
                                                          app.executeCommand(app.findMenuCommandId(cunName[shenqi]));
                                                      }
                                                  } catch (err) {}
                                              }
                                          }
                                      }
                                      }catch(err){}
                                      try {
                                          if (xml.child(addi).@enabled != "None") {
                                              if (layers.property(parseInt(xml.child(addi).@propertyIndex)).canSetEnabled == true) {
                                                  if (prop == 0) {
                                                      layers.property(parseInt(xml.child(addi).@propertyIndex)).enabled = (xml.child(addi).@enabled == "true") ? true : false;
                                                  } else {
                                                      layers.property(parseInt(prop.propertyIndex)).enabled = (xml.child(addi).@enabled == "true") ? true : false;
                                                  }
                                              }
                                          }
                                      } catch (err) {}
                                      try {
                                          if (prop == 0) {
                                              if (layers.propertyType == PropertyType.INDEXED_GROUP) {
                                                  layers.property(parseInt(xml.child(addi).@propertyIndex)).name = xml.child(addi).@name.toString();
                                              }
                                          } else {
                                              if (layers.propertyType == PropertyType.INDEXED_GROUP)
                                                  layers.property(prop.propertyIndex).name = xml.child(addi).@name.toString();
                                          }
                                      } catch (err) {}
                                      if (xml.child(addi).children().length() > 0) {
                                          if (prop == 0 && xml.child(addi).@matchName != "ADBE Mask Parade" && xml.child(addi).@matchName != "ADBE Effect Parade" && xml.child(addi).@matchName != "ADBE Layer Styles") {
                                              try {
                                                  $.layer.prototype.newPropertyGroup(xml.child(addi),layers.property(parseInt(xml.child(addi).@propertyIndex)) ,inTime);
                                              } catch (err) {}
                                          } else {
                                              if (xml.child(addi).@matchName != "ADBE Mask Parade" && xml.child(addi).@matchName != "ADBE Effect Parade" && xml.child(addi).@matchName != "ADBE Layer Styles") {
                                                  try {
                                                      $.layer.prototype.newPropertyGroup(xml.child(addi),layers.property(prop.propertyIndex), inTime);
                                                  } catch (err) {}
                                              } else {
                                                  try {
                                                      $.layer.prototype.newPropertyGroup(xml.child(addi),layers.property(xml.child(addi).@matchName), inTime);
                                                  } catch (err) {}
                                              }
                                          }
                                      }
                                  } else if (xml.child(addi).name() == "prop") {
                                          $.layer.prototype.newProperty(xml.child(addi),layers,inTime)
                                  }

                                  if (xml.child(addi).name() == "prop") {
                                      if (xml.child(addi).exp.toString() != "") {
                                          try {

                                              sp.expPropertyArr.push(layers.property(xml.child(addi).@matchName));
                                              layers.property(xml.child(addi).@matchName).expression = decodeURIComponent(xml.child(addi).exp.toString());
                                              layers.property(xml.child(addi).@matchName).expressionEnabled = xml.child(addi).expEn;

                                          } catch (err) {};
                                      }
                                  }
                              }
                },
          
          newProperty: function(xml,layers,inTime){
                                      var bool1 = layers.property(xml.@matchName).matchName != "ADBE Text Document";
                                      var bool2 = layers.property(xml.@matchName).matchName != "ADBE Marker";
                                      var bool3 = layers.property(xml.@matchName).matchName != "ADBE Mask Shape";
                                      var bool4 = layers.property(xml.@matchName).matchName != "ADBE Vector Shape";
                                      var bool5 = layers.matchName != "ADBE Text Animator Properties";
                                      var bool6 = layers.matchName != "ADBE Vector Stroke Dashes";
                                      if (bool1 && bool2 && bool3 && bool4) {
                                          if (!bool5 || !bool6) {
                                              if (layers.canAddProperty(xml.@matchName)) {
                                                  layers.addProperty(xml.@matchName);
                                              }
                                          }
                                          if (xml.@key == 0) {
                                              var value = [];
                                              if (xml.child(0).toString().split(",").length > 1) {
                                                  for (var ia = 0; ia < xml.child(0).toString().split(",").length; ia++) {
                                                      value.push(xml.child(0).toString().split(",")[ia]);
                                                  }
                                              } else {
                                                  value = parseFloat(xml.child(0).toString());
                                              }
                                              try {
                                                  layers.property(xml.@matchName).setValue(value);
                                              } catch (err) {}
                                              try{
                                              var a=layers.property(xml.@matchName).propertyValueType.toString();
                                              if (a.indexOf ("17")!=-1||a.indexOf("21")!=-1 ||a.indexOf("22")!=-1){
                                                      sp.layerTypePropertyArr.push(layers.property(xml.@matchName));
                                                      sp.layerTypePropertyValueArr.push(value);
                                                  } 
                                              }catch(err){}
                                          } else {
                                              var values = [];
                                              var valueTemp = [];
                                              var times = [];
                                              var div = xml.keyTime.toString().split(",");
                                              var vas = xml.keyValue.toString().split(",");
                                              for (ia = 0; ia < div.length; ia++) {
                                                    
                                                  if(typeof inTime =="undefined"){
                                                      times.push(div[ia]);
                                                  }else{
                                                      times.push(parseFloat(div[ia])+parseFloat(inTime));
                                                      }
                                              }
                                              for (ia = 0; ia < div.length; ia++) {
                                                  for (ib = 0; ib < vas.length / div.length; ib++) {
                                                      valueTemp.push(xml.keyValue.toString().split(",")[ia * vas.length / div.length + ib]);
                                                  }
                                                  values.push(valueTemp);
                                                  valueTemp = [];
                                              }
                                              try {
                                                  layers.property(xml.@matchName).setValuesAtTimes(times, values);
                                              } catch (err) {}
                                              var inSpeedArr = [];
                                              var inInArr = [];
                                              var outSpeedArr = [];
                                              var outIn = [];
                                              if(app.version[1]=="."||app.version[1]=="0"){
                                                      var ease;
                                                      for(var iaa=0;iaa<xml.keyTime.toString().split(",").length;iaa++){
                                                          ease+=xml.child(iaa+4);
                                                          }
                                                      len=xml.keyTime.toString().split(",").length;
                                                  }else{
                                              var ease = xml..Ease;
                                              len = ease.length();
                                              }
                                              for (ia = 0; ia < len; ia++) {
                                                  var clamp = parseFloat(xml.child(ia + 4).InIn);
                                                  if (clamp < 0.1) {
                                                      clamp = 0.1;
                                                  }
                                                  var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);
                                                  var clampb = parseFloat(xml.child(ia + 4).OutIn);
                                                  if (clampb < 0.1) {
                                                      clampb = 0.1;
                                                  }
                                                  var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                                                  var myScaleProperty = layers.property(xml.@matchName);
                                                  try {
                                                      if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.TwoD && 
                                                            $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.ThreeD) {
                                                          var clamp = parseFloat(xml.child(ia + 4).InIn);
                                                          if (clamp < 0.1) {
                                                              clamp = 0.1;
                                                          }
                                                          var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);
                                                          var clampb = parseFloat(xml.child(ia + 4).OutIn);
                                                          if (clampb < 0.1) {
                                                              clampb = 0.1;
                                                          }
                                                          var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                                                          try {
                                                              myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                                                          } catch (err) {}
                                                      } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.TwoD) {

                                                          var clamp = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[0]);
                                                          if (clamp < 0.1) {
                                                              clamp = 0.1;
                                                          }
                                                          var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[0]), clamp);
                                                          var clampb = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[0]);
                                                          if (clampb < 0.1) {
                                                              clampb = 0.1;
                                                          }
                                                          var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[0]), clampb);
                                                          var clamp1 = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[1]);
                                                          if (clamp1 < 0.1) {
                                                              clamp1 = 0.1;
                                                          }
                                                          var easeIn1 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[1]), clamp1);
                                                          var clampb1 = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[1]);
                                                          if (clampb1 < 0.1) {
                                                              clampb1 = 0.1;
                                                          }
                                                          var easeOut1 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[1]), clampb1);
                                                          try {
                                                              myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1], [easeOut, easeOut1]);
                                                          } catch (err) {}
                                                      } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.ThreeD) {
                                                          var clamp = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[0]);
                                                          if (clamp < 0.1) {
                                                              clamp = 0.1;
                                                          }
                                                          var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[0]), clamp);
                                                          var clampb = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[0]);
                                                          if (clampb < 0.1) {
                                                              clampb = 0.1;
                                                          }
                                                          var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[0]), clampb);
                                                          var clamp1 = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[1]);
                                                          if (clamp1 < 0.1) {
                                                              clamp1 = 0.1;
                                                          }
                                                          var easeIn1 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[1]), clamp1);
                                                          var clampb1 = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[1]);
                                                          if (clampb1 < 0.1) {
                                                              clampb1 = 0.1;
                                                          }
                                                          var easeOut1 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[1]), clampb1);
                                                          var clamp2 = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[2]);
                                                          if (clamp2 < 0.1) {
                                                              clamp2 = 0.1;
                                                          }
                                                          var easeIn2 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[2]), clamp2);
                                                          var clampb2 = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[2]);
                                                          if (clampb2 < 0.1) {
                                                              clampb2 = 0.1;
                                                          }
                                                          var easeOut2 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[2]), clampb2);
                                                          try {
                                                              myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1, easeIn2], [easeOut, easeOut1, easeOut2]);
                                                          } catch (err) {}
                                                      }
                                                          try {
                                                               var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType (ia+1),parseInt(xml.child(ia+4).inInterType));
                                                               var outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType (ia+1),parseInt(xml.child(ia+4).outInterType));
                                                               myScaleProperty.setInterpolationTypeAtKey (ia + 1, inIn,outIn);
                                                           } catch (err) {}   
                                                          try {
                                                               var isRoving = ((xml.child(ia+4).isRoving).toString() == "true")? true:false;
                                                               myScaleProperty.setRovingAtKey (ia+1, isRoving);
                                                           } catch (err) {} 
                                                  } catch (err) {}
                                              }
                                          }
                                      } else if (layers.property(xml.@matchName).matchName == "ADBE Text Document") {
                                          if (xml.@key == 0) {
                                              try {
                                                  var value = [];
                                                  var myText = layers.property(xml.@matchName).value;
                                                  myText.text = xml.text.toString();
                                                  myText.font = xml.font.toString();
                                                  myText.fontSize = parseInt(xml.fontSize);
                                                  myText.applyFill = (xml.applyFill.toString() == "true") ? true : false;
                                                  myText.applyStroke = (xml.applyStroke.toString() == "true") ? true : false;
                                                  if (xml.applyFill.toString() == "true") {
                                                      myText.fillColor = [xml.fillColor.toString().split(",")[0], xml.fillColor.toString().split(",")[1], xml.fillColor.toString().split(",")[2]];
                                                  }
                                                  if (xml.applyStroke.toString() == "true") {
                                                      myText.strokeColor = [xml.strokeColor.toString().split(",")[0], xml.strokeColor.toString().split(",")[1], xml.strokeColor.toString().split(",")[2]];
                                                      myText.strokeOverFill = xml.strokeOverFill.toString();
                                                      myText.strokeWidth = xml.strokeWidth.toString();
                                                  }
                                                  try {
                                                      myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.justification));
                                                  } catch (err) {}
                                                  var nextText = myText;
                                              } catch (err) {}
                                              try {
                                                  layers.property(xml.@matchName).setValue(myText);
                                              } catch (err) {}
                                              try {
                                                  layers.property(xml.@matchName).setValue(nextText);
                                              } catch (err) {}
                                          } else {
                                              var values = [];
                                              var valueTemp = [];
                                              var times = [];
                                              var div = xml.keyTime.toString().split(",");
                                              var vas = xml.keyValue.toString().split(",");
                                              for (ia = 0; ia < div.length; ia++) {
                                                  if(typeof inTime =="undefined"){
                                                  times.push(div[ia]);
                                                  }else{
                                                      times.push(parseFloat(div[ia])+parseFloat(inTime));
                                                      }
                                              }
                                              for (ib = 0; ib < div.length; ib++) {
                                                  var myText = null;
                                                  myText = layers.property(xml.child(0).@matchName).valueAtTime(times[ib], true);
                                                  myText.text = xml.child(0).keyValue.child(ib).text.toString();
                                                  myText.font = xml.child(0).keyValue.child(ib).font.toString();
                                                  myText.fontSize = parseInt(xml.child(0).keyValue.child(ib).fontSize);
                                                  myText.applyFill = (xml.child(0).keyValue.child(ib).applyFill.toString() == "true") ? true : false;
                                                  myText.applyStroke = (xml.child(0).keyValue.child(ib).applyStroke.toString() == "true") ? true : false;
                                                  if (xml.child(0).keyValue.child(ib).applyFill.toString() == "true")
                                                      myText.fillColor = [xml.child(0).keyValue.child(ib).fillColor.toString().split(",")[0], xml.child(0).keyValue.child(ib).fillColor.toString().split(",")[1], xml.child(0).keyValue.child(ib).fillColor.toString().split(",")[2]];
                                                  if (xml.child(0).keyValue.child(ib).applyStroke.toString() == "true") {
                                                      myText.strokeColor = [xml.child(0).keyValue.child(ib).strokeColor.toString().split(",")[0], xml.child(0).keyValue.child(ib).strokeColor.toString().split(",")[1], xml.child(0).keyValue.child(ib).strokeColor.toString().split(",")[2]];
                                                      myText.strokeOverFill = xml.child(0).keyValue.child(ib).strokeOverFill.toString();
                                                      myText.strokeWidth = xml.child(0).keyValue.child(ib).strokeWidth.toString();
                                                  }
                                                  try {
                                                      myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.child(0).keyValue.child(ib).justification));
                                                  } catch (err) {}
                                                  nextText = myText;
                                                  try {
                                                      layers.property(xml.child(0).@matchName).setValueAtTime(times[ib], myText);
                                                  } catch (err) {}
                                                  try {
                                                      layers.property(xml.child(0).@matchName).setValueAtTime(times[ib], nextText);
                                                  } catch (err) {}
                                              }
                                          }
                                      } else if (!bool2) {
                                          if (xml.@key == 0) {} else {
                                              var values = [];
                                              var valueTemp = [];
                                              var times = [];
                                              var div = xml.keyTime.toString().split(",");
                                              for (ia = 0; ia < div.length; ia++) {
                                                  if(typeof inTime =="undefined"){
                                                  times.push(div[ia]);
                                                  }else{
                                                      times.push(parseFloat(div[ia])+parseFloat(inTime));
                                                      }
                                              }
                                              for (ib = 0; ib < div.length; ib++) {
                                                  var myMarker = new MarkerValue("zhanwei");
                                                  myMarker.comment = xml.child(0).keyValue.child(ib).comment.toString();
                                                  myMarker.duration = xml.child(0).keyValue.child(ib).duration.toString();
                                                  myMarker.chapter = xml.child(0).keyValue.child(ib).chapter.toString();
                                                  myMarker.cuePointName = xml.child(0).keyValue.child(ib).cuePointName.toString();
                                                  myMarker.eventCuePoint = xml.child(0).keyValue.child(ib).eventCuePoint.toString();
                                                  myMarker.url = xml.child(0).keyValue.child(ib).url.toString();
                                                  myMarker.frameTarget = xml.child(0).keyValue.child(ib).frameTarget.toString();
                                                  try {
                                                      layers.property(xml.child(0).@matchName).setValueAtTime(times[ib], myMarker);
                                                  } catch (err) {}
                                              }
                                          }
                                      } else if (!bool3 || !bool4) {
                                          if (xml.@key == "0") {
                                              var myShape = new Shape();
                                              var vertsArr = [];
                                              var inTanArr = [];
                                              var outTanArr = [];
                                              var verts = xml.vertices.toString().split(",");
                                              var inTan = xml.inTan.toString().split(",");
                                              var outTan = xml.outTan.toString().split(",");
                                              for (ic = 0; ic < verts.length / 2; ic++) {
                                                  vertsArr.push([verts[ic * 2], verts[ic * 2 + 1]]);
                                                  inTanArr.push([inTan[ic * 2], inTan[ic * 2 + 1]]);
                                                  outTanArr.push([outTan[ic * 2], outTan[ic * 2 + 1]]);
                                              }
                                              myShape.vertices = vertsArr;
                                              myShape.inTangents = inTanArr;
                                              myShape.outTangents = outTanArr;
                                              myShape.closed = (xml.closed == true) ? true : false;
                                              try {
                                                  layers.property(xml.@matchName).setValue(myShape);
                                              } catch (err) {}
                                          } else {
                                              var myShape = new Shape();
                                              var vertsArr = [];
                                              var inTanArr = [];
                                              var outTanArr = [];
                                              var times = [];
                                              var shapes = [];
                                              var div = xml.keyTime.toString().split(",");
                                              for (ia = 0; ia < div.length; ia++) {
                                                  if(typeof inTime =="undefined"){
                                                  times.push(div[ia]);
                                                  }else{
                                                      times.push(parseFloat(div[ia])+parseFloat(inTime));
                                                      }
                                              }
                                              for (ic = 0; ic < xml.keyValue.children().length(); ic++) {
                                                  var verts = xml.keyValue.child(ic).vertices.toString().split(",");
                                                  var inTan = xml.keyValue.child(ic).inTan.toString().split(",");
                                                  var outTan = xml.keyValue.child(ic).outTan.toString().split(",");
                                                  for (ib = 0; ib < verts.length / 2; ib++) {
                                                      vertsArr.push([verts[ib * 2], verts[ib * 2 + 1]]);
                                                      inTanArr.push([inTan[ib * 2], inTan[ib * 2 + 1]]);
                                                      outTanArr.push([outTan[ib * 2], outTan[ib * 2 + 1]]);
                                                  }
                                                  var myShape = new Shape();
                                                  myShape.vertices = vertsArr;
                                                  myShape.inTangents = inTanArr;
                                                  myShape.outTangents = outTanArr;
                                                  myShape.closed = (xml.keyValue.child(ic).closed == true) ? true : false;
                                                  shapes.push(myShape);
                                                  vertsArr = [];
                                                  inTanArr = [];
                                                  outTanArr = [];
                                              }
                                              try {
                                                  layers.property(xml.@matchName).setValuesAtTimes(times, shapes);
                                              } catch (err) {}
                                              var inSpeedArr = [];
                                              var inInArr = [];
                                              var outSpeedArr = [];
                                              var outIn = [];
                                              if(app.version[1]=="."||app.version[1]=="0"){
                                                      var ease;
                                                      for(var iaa=0;iaa<xml.keyTime.toString().split(",").length;iaa++){
                                                          ease+=xml.child(iaa+4);
                                                          }
                                                      len=xml.keyTime.toString().split(",").length;
                                                  }else{
                                              var ease = xml..Ease;
                                              len = ease.length();
                                              }
                                              for (ia = 0; ia < len; ia++) {
                                                  var clamp = parseFloat(xml.child(ia + 4).InIn);
                                                  if (clamp < 0.1) {
                                                      clamp = 0.1;
                                                  }
                                                  var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);
                                                  var clampb = parseFloat(xml.child(ia + 4).OutIn);
                                                  if (clampb < 0.1) {
                                                      clampb = 0.1;
                                                  }
                                                  var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                                                  var myScaleProperty = layers.property(xml.@matchName);
                                                  try {
                                                      if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.TwoD &&
                                                            $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.ThreeD) {
                                                          try {
                                                              myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                                                          } catch (err) {}
                                                      } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.TwoD) {
                                                          myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn], [easeOut, easeOut]);
                                                      } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.ThreeD) {
                                                          myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
                                                      }
                                                           try {
                                                               var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType (ia+1),parseInt(xml.inInterType));
                                                               var outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType (ia+1),parseInt(xml.outInterType));
                                                               myScaleProperty.setInterpolationTypeAtKey (ia + 1, inIn,outIn);
                                                           } catch (err) {}    
                                                          try {
                                                               var isRoving = ((xml.isRoving).toString() == "true")? true:false;
                                                               myScaleProperty.setRovingAtKey (ia+1, isRoving);
                                                           } catch (err) {} 
                                                  } catch (err) {}
                                              }
                                          }
                                      }
                },
          
          
          
          
          
          toLayer: function(thisComp,xml){
                      xml = xml || this.item;
                      var helperObj = this.helperObj;
                      
                      var layerArr = [];

                      $.layer.forEach(xml,function(item,index){
                              
                              sp.layerArr[sp.layerArr.length]=layerArr[layerArr.length]=$.layer.prototype.newLayer(item,thisComp);  
                              sp.layerParentNameArr.push(item.parent.toString());
                            })
                      
                      
                      return layerArr;
                      
                }
          
          
          });
      
    //not create new layers but create properties on selected layers 
    $.layer.newProperties = function(effectxml,selectedLayers,options){
                     
                       var idArr=[
                                          "ADBE Mask Parade","ADBE Effect Parade","ADBE Transform Group",
                                          "ADBE Material Options Group","ADBE Layer Styles","ADBE Root Vectors Group",
                                          "ADBE Text Animators","ADBE Light Options Group","ADBE Camera Options Group"
                                         ];
                                         
                        var idGen=[];
                        var idDel=[];
                        
                       var isCleanGroup = options.isCleanGroup;
                       var isKeyframeOffset = options.isKeyframeOffset;
                        
                        var newPropertiesSettingArr = options.newPropertiesSettingArr;
                        var cleanPropertiesSettingArr = options.cleanPropertiesSettingArr
                        
                       for(var i=1;i<=9;i++){
                              if (newPropertiesSettingArr[i-1] == 1){
                                  idGen.push(idArr[i-1]);
                              }   
                              if (cleanPropertiesSettingArr[i-1] == 1){
                                  idDel.push(idArr[i-1]);
                              }   
                        }
                  
                        //~Set xml ignored
                        for(var i=effectxml.children().length();i>=0;i--){
                                    var xml = effectxml.child(i);
                                    if(xml.name() == "Group"){
                                          if(xml.@matchName == "ADBE Text Properties"){
                                                xml.child(0).setLocalName("textignore");
                                                if(effectxml.children().length()>=4){
                                                      $.layer.lookUpInArray(xml.child(3).@matchName,idGen)==false && xml.child(3).setLocalName ("ignore");           
                                                }
                                          }
                                          if($.layer.lookUpInArray(xml.@matchName,idGen)==false){
                                                      xml.@matchName != "ADBE Text Properties" && xml.setLocalName("ignore");
                                                }
                                          
                              }else{
                                         xml.name() == "Comptent" &&xml.setLocalName("compignore")
                                }
                         }
                   
                        //~ Delete propertyGroup in layers
          
                        if( isCleanGroup==true){
                              selectedLayers.forEach(function(layer,index){
                                          $.layer.forEachPropertyGroup.call (layer,function(thisGroup,index){
                                                      if($.layer.lookUpInArray(thisGroup.matchName,idDel)==true){
                                                                  if(thisGroup.matchName != "ADBE Layer Styles"){
                                                                              for(var i=thisGroup.numProperties;i>0;i--){
                                                                                          try{thisGroup.property(i).remove();}catch(err){}
                                                                                       }
                                                                        }else{
                                                                              for(var i=thisGroup.numProperties;i>0;i--){
                                                                                          try{thisGroup.property(i).enabled = false;}catch(err){}
                                                                                       }
                                                                              }
                                                            }
                                                      if(thisGroup.matchName=="ADBE Text Properties"){
                                                                  if($.layer.lookUpInArray(thisGroup.property(4).matchName,idDel)==true){
                                                                              for(var i=thisGroup.property(4).numProperties;i>0;i--){
                                                                                          try{thisGroup.property(4).property(i).remove();}catch(err){}
                                                                                       }
                                                                        }
                                                            }
                                                })//~ ForEachPropertyGroup end
                                          
                                          
                                    })
                                } 
                                    selectedLayers.forEach(function(layer,index){
                                            if (isKeyframeOffset == true)
                                                      $.layer.prototype.newPropertyGroup(effectxml,layer,layer.inPoint)
                                            else
                                                      $.layer.prototype.newPropertyGroup(effectxml,layer)
                                    })


                };//~Clean group and ignore end
            
     $.layer.forEach = function(xml,callback,context){
            if(!(xml instanceof XML)) return;
            var i,
                len;
                for(i=0,len = xml.children().length();i<len;i++){
                        if(callback.call(context,xml.child(i),i,xml) ===false){
                                break;
                            }
                    }
            }
    
    $.layer.forEachLayer  = function(callback, context) {
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
    $.layer.forEachPropertyGroup = function(callback, context) {
                          var i,
                              len;
                          for (i = 1, len = this.numProperties; i <= len; i++) {
                                  if (callback.call(context, this.property(i), i, this) === false) {
                                      break; // or return;
                                  }
                          }
                   }
    $.layer.lookUpInArray:function(text,arr){
                            var len = arr.length;
                            for(var i=0;i<len;i++){
                                    if(arr[i]==text)
                                        return true;
                                }
                            return false;
                        },  
                    
    $.layer.getDistance: function (a, b) {
                return parseInt((a.toString().substring(0, 2) - b.toString().substring(0, 2))) * 100 + parseInt(b);
    },
    
    $.layer.tempFolder = 
    
    $.layer.prototype.init.prototype = $.layer.prototype;
    $.global._layer = $.layer;
    return $.layer;
    
})();