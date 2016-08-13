//~  AfterEffectsLayer object to handle with layers of after effects, for saving and generating
(function() {

    $.layer = function(item, options) {
        return new $.layer.prototype.init(item, options);
    }

    $.layer.prototype = {
        init: function(item, options,helperObj) {
            this.item = item;
            
            this.helperObj = helperObj || {};

            $.layer.parseFolderItem(item,options)
        
            if($.layer.isType(options,"Object")){
                this.isSaveMaterial = options.isSaveMaterial || false;
            }else{
                this.isSaveMaterial = false;
            }

            return this;
        },
    }

    $.layer.extend = function(target, source) {
        for (var i in source) target[i] = source[i];
        return target;
    },

    $.layer.parseFolderItem = function(item,options){
            if ($.layer.isType(options, "Object") && (item instanceof XML)) {               
                if (!($.layer.isType(options.compFolder,"FolderItem"))){
                    $.layer.compFolder = null
                }else{
                    $.layer.compFolder = options.compFolder;
                }
                if (!($.layer.isType(options.sourceFolder,"FolderItem"))){
                    if($.layer.compFolder!= null){
                        $.layer.sourceFolder = $.layer.compFolder;
                    }else{
                        $.layer.sourceFolder = null;
                    }
                }else{
                    $.layer.sourceFolder = options.sourceFolder;
                }
            


            }
    }

    $.layer.extend($.layer.prototype, {

        getLayerAttr: function(index) {
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
                layerInfo = this.getMaterial(layerInf, layerInfo, helperObj, thisLayer);
            }
            if (layerInf.type == "Comp") {
                layerInfo = this.getCompLayerAttr(layerInfo, thisLayer, helperObj, thisLayer);
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
            try {
                layerInfo.separated = thisLayer("ADBE Transform Group")("ADBE Position").dimensionsSeparated;
            } catch (err) {}
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

        getCompLayerAttr: function(layerInfo, thisLayer) {
            var source = thisLayer.source;
            layerInfo.frameDuration = source.frameDuration;
            layerInfo.dropFrame = source.dropFrame;
            layerInfo.workAreaStart = source.workAreaStart;
            layerInfo.workAreaDuration = source.workAreaDuration;
            layerInfo.hideShyLayers = source.hideShyLayers;
            layerInfo.motionBlur = source.motionBlur;
            layerInfo.draft3d = source.draft3d;
            layerInfo.frameBlending = source.frameBlending;
            layerInfo.preserveNestedFrameRate = source.preserveNestedFrameRate;
            layerInfo.preserveNestedResolution = source.preserveNestedResolution;
            layerInfo.bgColor = source.bgColor;
            layerInfo.resolutionFactor = source.resolutionFactor;
            layerInfo.shutterAngle = source.shutterAngle;
            layerInfo.shutterPhase = source.shutterPhase;
            layerInfo.motionBlurSamplesPerFrame = source.motionBlurSamplesPerFrame;
            layerInfo.motionBlurAdaptiveSampleLimit = source.motionBlurAdaptiveSampleLimit;
            layerInfo.renderer = source.renderer;
            layerInfo.compframeDuration = source.frameDuration;
            layerInfo.comppixelAspect = source.pixelAspect;
            layerInfo.compframeRate = source.frameRate;
            layerInfo.compduration = source.duration;
            layerInfo.compwidth = source.width;
            layerInfo.compheight = source.height;
            layerInfo.compname = encodeURIComponent(source.name);
            layerInfo.comptime = source.time;
            return layerInfo;
        },

        getMaterial: function(layerInf, layerInfo, helperObj, thisLayer) {
            layerInfo.file = thisLayer.source.mainSource.file;
            if (this.isSaveMaterial == true) {
                
                var tempArr = $.layer.pictureType;
                if ($.layer.lookUpInArray(thisLayer.source.mainSource.file.name.split(".").slice(-1), tempArr)) {
                    if (thisLayer.source.mainSource.file.length <= $.layer.pictureMaxLength) {
                        if (helperObj.hasOwnProperty("_" + thisLayer.source.id)) {} else {
                            try {
                                helperObj["_" + thisLayer.source.id] = {};
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
            
                var tempArr = $.layer.musicType;
                if ($.layer.lookUpInArray(thisLayer.source.mainSource.file.name.split(".").slice(-1), tempArr)) {
                    if (thisLayer.source.mainSource.file.length <= $.layer.musicMaxLength) {
                        if (helperObj.hasOwnProperty("_" + thisLayer.source.id)) {} else {
                            try {
                                helperObj["_" + thisLayer.source.id] = {};
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


        getProperties: function(ref, layerxml, layerInfo) {
            if (ref != null) {
                var point = 0;
                var groupxml = [];
                var prop;
                var va;
                var text;
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
                                try {
                                    if (prop.matchName == "ADBE Glo2-0007") {
                                        prop.setValue($.layer.glowtype);
                                    }
                                } catch (err) {}
                                try {
                                    $.layer.prototype.addToLastChild(layerxml, new XML($.layer.prototype.getProperty(prop)), prop.propertyDepth, []);
                                } catch (err) {}
                            }
                        }
                    } else if ((prop.propertyType == PropertyType.INDEXED_GROUP) || (prop.propertyType == PropertyType.NAMED_GROUP)) {
                        var layerStyle = (prop.matchName == "ADBE Layer Styles" && prop.canSetEnabled == false);
                        var layerChild = (prop.propertyGroup(1).matchName == "ADBE Layer Styles" && prop.canSetEnabled == false && prop.propertyIndex > 1);
                        var material = (prop.matchName == "ADBE Material Options Group" && prop.propertyGroup(prop.propertyDepth).threeDLayer == false);
                        var audio = (prop.matchName == "ADBE Audio Group");
                        var geosmall = (prop.matchName == "ADBE Extrsn Options Group" && layerInfo.geoType != "small");
                        var geolarge = (prop.matchName == "ADBE Plane Options Group" && layerInfo.geoType != "large");
                        var vector = (prop.matchName == "ADBE Vector Materials Group");
                        var motion = (prop.matchName == "ADBE MTrackers" && prop.numProperties == 0);
                        if (layerStyle || material || audio || geosmall || geolarge || vector || motion || layerChild) {} else {
                            

                            var propName = prop.name.toString() ;
                            var matchName = prop.matchName.toString();
 
                            if (prop.matchName == "ADBE Mask Atom") {
                                try {
                                    text = "<Group name=\"" + propName + "\" matchName=\"" + matchName + "\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" maskmode=\"" + prop.maskMode.toString() + "\" inverted=\"" + prop.inverted.toString() + "\" rotoBezier=\"" + prop.rotoBezier.toString() + "\" maskMotionBlur=\"" + prop.maskMotionBlur.toString() + "\" color=\"" + prop.color.toString() + "\" maskFeatherFalloff=\"" + prop.maskFeatherFalloff.toString() + "\" enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    try{
                                        var temp = new XML(text);
                                    }catch(err){
                                        $.layer.errorInfoArr.push({line:$.line,error:err});
                                        var obj = {
                                            propName:propName,
                                            matchName:matchName,
                                        }
                                        $.layer.encode(obj);
                                        text = "<Group name=\"" + obj.propName + "\" matchName=\"" + obj.matchName + "\" isEncoded=\"true\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" maskmode=\"" + prop.maskMode.toString() + "\" inverted=\"" + prop.inverted.toString() + "\" rotoBezier=\"" + prop.rotoBezier.toString() + "\" maskMotionBlur=\"" + prop.maskMotionBlur.toString() + "\" color=\"" + prop.color.toString() + "\" maskFeatherFalloff=\"" + prop.maskFeatherFalloff.toString() + "\" enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    }
                                } catch (err) {
                                    $.layer.errorInfoArr.push({line:$.line,error:err});
                                    text = "<Group name=\"" + propName + "\" matchName=\"" + matchName + "\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" maskmode=\"" + prop.maskMode.toString() + "\" inverted=\"" + prop.inverted.toString() + "\" rotoBezier=\"" + prop.rotoBezier.toString() + "\" maskMotionBlur=\"" + prop.maskMotionBlur.toString() + "\" color=\"" + prop.color.toString() + "\"  enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    try{
                                        var temp = new XML(text);
                                    }catch(err){
                                        $.layer.errorInfoArr.push({line:$.line,error:err});
                                        var obj = {
                                            propName:propName,
                                            matchName:matchName,
                                        }
                                        $.layer.encode(obj);
                                        text =  "<Group name=\"" + obj.propName + "\" matchName=\"" + obj.matchName + "\" isEncoded=\"true\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" maskmode=\"" + prop.maskMode.toString() + "\" inverted=\"" + prop.inverted.toString() + "\" rotoBezier=\"" + prop.rotoBezier.toString() + "\" maskMotionBlur=\"" + prop.maskMotionBlur.toString() + "\" color=\"" + prop.color.toString() + "\"  enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    }
                                }
                            } else {
                                text = "<Group name=\"" + propName + "\" matchName=\"" + matchName + "\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    try{
                                        var temp = new XML(text);
                                    }catch(err){
                                        $.layer.errorInfoArr.push({line:$.line,error:err});
                                        var obj = {
                                            propName:propName,
                                            matchName:matchName,
                                        }
                                        $.layer.encode(obj);
                                        text = "<Group name=\"" + obj.propName + "\" matchName=\"" + obj.matchName + "\" isEncoded=\"true\" type=\"" + prop.propertyType.toString() + "\" propertyIndex=\"" + prop.propertyIndex.toString() + "\" enabled=\"" + ((prop.canSetEnabled == false) ? "None" : prop.enabled).toString() + "\"></Group>";
                                    }
                            }
                            try {
                                if (prop.matchName == "ADBE Glo2") {
                                    try {
                                        $.layer.glowtype = prop.property("ADBE Glo2-0007").value;
                                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                                }

                                try{
                                    var currentXml = new XML(text);
                                }catch(err){
                                    $.layer.errorInfoArr.push({line:$.line,error:err});
                                }
                                
                                $.layer.prototype.addToLastChild(layerxml, currentXml , prop.propertyDepth, []);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            arguments.callee(prop, layerxml, layerInfo);
                        }
                    }
                }
            }
            return layerxml;
        },

        addToLastChild: function(xml, str, propertyDepth, arrLen) {
            var length = xml.children().length();
            arrLen.push(length);
            if (length > 0) {
                arguments.callee(xml.child(length - 1), str, propertyDepth, arrLen);
            } else {
                for (var LastCh = 0; LastCh < arrLen.length - propertyDepth; LastCh++) {
                    xml = xml.parent();
                }
                xml.appendChild(new XML(str));
                arrLen.length = 0;
            }
        },

        getProperty: function(thisProperty) {
            var text;
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
                        var shapexml = new XML(text);
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
                        try{
                            easexml.keyInSpatialTangent = thisProperty.keyInSpatialTangent(propi);
                            easexml.keyOutSpatialTangent = thisProperty.keyOutSpatialTangent(propi);
                        }catch(err){
                            $.layer.errorInfoArr.push({line:$.line,error:err});
                        }
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
                        try {
                            easexml.inInterType = thisProperty.keyInInterpolationType(propi);
                            easexml.outInterType = thisProperty.keyOutInterpolationType(propi);
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        try {
                            easexml.isRoving = thisProperty.keyRoving(propi);
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
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


        getXmlFromLayer: function(index) {
            var thisLayer = this.item;
            
            var layerInfo = this.getLayerAttr(index);

            var layerPropertiesXml = this.getProperties(thisLayer, new XML("<Properties></Properties>"), layerInfo);

            layerInfo.appendChild(layerPropertiesXml);

            return layerInfo;
        },

        //recuisive get all xmls from selected layers, support comp layer
        toXML: function(elementName, helperObj) {
            var layers = this.item;

            if (layers instanceof Array){
                var comp = layers[0].containingComp;
            }else{
                var comp = layers[1].containingComp;
            }
        
        
            elementName = elementName || "Default";
            helperObj = helperObj || {};
            helperObj["_" + comp.id] = helperObj["_" + comp.id] || {};
            helperObj["elementArr"] = helperObj["elementArr"] || [];
            
            var elementArr = helperObj.elementArr;
            if (elementArr.length == 0)
                var elementxml = new XML("<Element name=\"" + elementName + "\"></Element>");
            else
                var elementxml = new XML("<Comptent name=\"" + elementName + "\"></Comptent>");

            var options = {
                isSaveMaterial: this.isSaveMaterial,
            };


            var loopFunc = function(thisLayer, index) {
                var thisIndex = elementArr.length == 0 ? index + 1 : index;
                var xml = $.layer(thisLayer, options).getXmlFromLayer(thisIndex);
                
                if (thisLayer.source instanceof CompItem) {
                    if (helperObj.hasOwnProperty("_" + thisLayer.source.id)) {
                        elementxmltemp = helperObj["_" + thisLayer.source.id]["ele"];
                        xml.Properties.appendChild(elementxmltemp);
                    } else {
                        elementArr.push(elementxml);
                        var comptentXml = $.layer(thisLayer.source.layers,options,helperObj).toXML(encodeURIComponent(thisLayer.source.name),helperObj)

                        xml.Properties.appendChild(comptentXml);
                        elementxml = elementArr.pop();
                    }
                }
                elementxml.appendChild(xml);
            };
            if (elementArr.length == 0)
                $.layer.forEach.call(layers,loopFunc);
            else
                $.layer.forEachLayer.call(layers, loopFunc);

            if (elementArr.length != 0) {
                var cTemp = new XML(elementxml);
                for (var i = 0; i < cTemp.children().length(); i++) {
                    cTemp.child(i).setChildren(1);
                }
                helperObj["_" + comp.id]["ele"] = cTemp;
            }

            return elementxml;
        },

    })


    $.layer.extend($.layer.prototype, {

        newLayer: function(xml, thisComp) {
            var layer;


                if (xml.@type == "Solid" || xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound" || xml.@type == "Comp") {
                    solidcolor = [xml.solidColor.toString().split(",")[0], xml.solidColor.toString().split(",")[1], xml.solidColor.toString().split(",")[2]];
                    if (xml.solidColor.toString() != "") {
                        layer = thisComp.layers.addSolid(solidcolor, decodeURIComponent(xml.@name), parseInt(xml.width), parseInt(xml.height), 1);
                    } else if (xml.@type == "Comp") {
                        layer = this.newComp(xml, thisComp);
                    } else if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound") {
                        layer = this.newMaterial(xml, thisComp);   
                    }
                } else if (xml.@type == "Text") {
                    var layer = (xml.textType.toString() == "point") ? thisComp.layers.addText() : thisComp.layers.addBoxText([xml.boxSize.toString().split(",")[0], xml.boxSize.toString().split(",")[1]]);
                } else if (xml.@type == "Shape") {
                    var layer = thisComp.layers.addShape();
                } else if (xml.@type == "null") {
                    var layer = thisComp.layers.addNull();
                } else if (xml.@type == "Light") {
                    var layer = thisComp.layers.addLight(decodeURIComponent(xml.@name), [0, 0]);
                    layer.lightType = $.layer.getDistance(layer.lightType, parseInt(xml.light));
                } else if (xml.@type == "Camera") {
                    var layer = thisComp.layers.addCamera(decodeURIComponent(xml.@name), [0, 0]);
                }
            
                try{
            
                layer.name = decodeURIComponent(xml.@name);
                
                    if(layer.index !=parseInt(xml.index))
                        layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                
                    layer.label = parseInt(xml.label.toString())
 

                    if (xml.geoType == "small" || xml.geoType == "large") {
                        layer.containingComp.renderer = "ADBE Picasso";
                    }
  

                    if (xml.inPoint != "undefined") {
                        layer.inPoint = parseFloat(xml.inPoint);
                    }

                
                    if (xml.outPoint != "undefined")
                        layer.outPoint = parseFloat(xml.outPoint);
                

                    if (xml.solo.toString() == "true")
                        layer.solo = true;
                

                    if (xml.enabled.toString() == "false")
                        layer.enabled = false;
                

                    if (xml.three.toString() == "true")
                        layer.threeDLayer = true;
                

                    if (xml.timeRemap.toString() == "true") {
                        layer.timeRemapEnabled = true;
                    }
                

                    if(xml.collapseTransformation.toString() == "true" && layer.canSetCollapseTransformation == true)
                        layer.collapseTransformation =  true;
                

                    if (xml.audioEnabled.toString() == "false") {
                        layer.audioEnabled = false;
                    }

                    if (xml.trackMatteType != "undefined"){
                        layer.trackMatteType = $.layer.getDistance(layer.trackMatteType, parseInt(xml.trackMatteType));
                    }
                
                    if (xml.shy.toString() == "true"){
                        layer.shy =  true;
                    }
                
                    if (xml.motionBlur.toString() == "true"){
                        layer.motionBlur = true;
                    }

                    if (xml.guideLayer.toString() == "true"){
                        layer.guideLayer = true;
                    }

                    if (xml.environmentLayer.toString() == "true"){
                        layer.environmentLayer = true;
                    }

                    if (xml.adjustmentLayer.toString() == "true"){
                        layer.adjustmentLayer = true;
                    }
                
                    if (xml.blendingMode.toString() != "undefined"){
                        layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode));
                    }

                    if (xml.autoOrient.toString() != "undefined"){
                        layer.autoOrient = $.layer.getDistance(layer.autoOrient, parseInt(xml.autoOrient));
                    }

                    if (xml.preserveTransparency.toString() == "true"){
                        layer.preserveTransparency =  true;
                    }

                    if (xml.separated.toString() == "true") {
                        layer.property("ADBE Transform Group")("ADBE Position").dimensionsSeparated = true;
                    }
                
                }catch(err){
                    $.layer.errorInfoArr.push({line:$.line,error:err});
                }

                if (xml.@type != "VideoWithSound") {
                        try{
                            $.layer.prototype.newPropertyGroup(xml.Properties, layer);
                        }catch(err){
                            $.layer.errorInfoArr.push({line:$.line,error:err});
                        }
                }

            return layer;

        },

        newComp: function(xml, thisComp) {
            var layer;
            var thisItem;

            if (xml.@type == "Comp") {
                    var isComp = false;


                    if (xml.@type == "Comp") {
                        for (var isA = 0; isA < app.project.numItems; isA++) {
                            if (app.project.item(isA + 1) instanceof CompItem && app.project.item(isA + 1).name == decodeURIComponent(xml.compname.toString())) {
                                if (app.project.item(isA + 1).numLayers == xml.Properties.Comptent.children().length()) {
                                    var thisItem = app.project.item(isA + 1);
                                    isComp = true;
                                    zhuan = false;
                                    for (var isB = 0; isB < app.project.item(isA + 1).numLayers; isB++) {
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

                if (isComp == true) {
                        layer = thisComp.layers.add(thisItem);
                } else {

                            var comp = app.project.items.addComp(decodeURIComponent(xml.compname.toString()),
                                parseInt(xml.compwidth), parseInt(xml.compheight),
                                parseFloat(xml.comppixelAspect), parseFloat(xml.compduration),
                                parseFloat(xml.compframeRate));
                                
                            try{    

                            if (comp.id != app.project.activeItem.id) {
                                comp.parentFolder = $.layer.compFolder;
                            }

                            comp.frameDuration = parseFloat(xml.frameDuration);

                            if (xml.dropFrame.toString() == "true")
                                comp.dropFrame = true;
                                
                            comp.workAreaStart = parseFloat(xml.workAreaStart);
                            
                            /* ignore*/
                            try{
                                comp.workAreaDuration = parseFloat(xml.workAreaDuration);
                            }catch(err){}
                            
                            if (xml.hideShyLayers.toString() == "true")
                                comp.hideShyLayers = true;
                                
                            if (xml.motionBlur.toString() == "true")
                                comp.motionBlur = true;
                                
                            if (xml.draft3d.toString() == "true")
                                comp.draft3d =  true;

                                
                            if (xml.preserveNestedFrameRate.toString() == "true")
                                comp.preserveNestedFrameRate =  true;
                                
                            if (xml.preserveNestedResolution.toString() == "true")
                                comp.preserveNestedResolution =  true;
                                
                            var arr = xml.bgColor.toString().split(",");
                            comp.bgColor = [parseFloat(arr[0]), parseFloat(arr[1]), parseFloat(arr[2])];
                                
                            comp.resolutionFactor = [parseInt(xml.resolutionFactor.toString().split(",")[0]), parseInt(xml.resolutionFactor.toString().split(",")[1])];
                                
                            comp.shutterAngle = parseFloat(xml.shutterAngle);
                                
                            comp.shutterPhase = parseFloat(xml.shutterPhase);
                                
                            comp.motionBlurSamplesPerFrame = parseInt(xml.motionBlurSamplesPerFrame);
                                
                            comp.motionBlurAdaptiveSampleLimit = parseInt(xml.motionBlurAdaptiveSampleLimit);
                                
                            if (xml.renderer.toString() != "ADBE Advanced 3d")
                                comp.renderer = xml.renderer.toString();
                                
                        }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                        
                        try{
                             layer = thisComp.layers.add(comp);
                        }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                }
                
                try{
                    layer.strectch = parseFloat(xml.stretch);

                    if (xml.startTime.toString() != "undefined") {
                        layer.startTime = parseFloat(xml.startTime);
                    }
            
                }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                
                if (isComp == false) {
                    try{
                        $.layer.prototype.toLayer(comp, xml.Properties.Comptent);
                    }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                }
            }
            return layer;
        },

        newMaterial: function(xml, thisComp) {
            var isExist = false;
            var waitIm;

                if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound") {
                    for (isA = 0; isA < app.project.numItems; isA++) {
                        if (typeof app.project.item(isA + 1).file != "undefiend" && app.project.item(isA + 1).file != null) {
                            if (File(app.project.item(isA + 1).file).toString() == File(xml.file.toString()).toString() ||
                                File(app.project.item(isA + 1).file.toString()).toString() == File($.layer.tempFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString())).toString()) {
                                isExist = true;
                                thisItem = app.project.item(isA + 1);
                                break;
                            }
                        }
                    }
                }


                if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound" && isExist) {
                    layer = thisComp.layers.add(thisItem);

                        layer.strectch = parseFloat(xml.stretch);

                        if (xml.startTime != "undefined") {
                            layer.startTime = parseFloat(xml.startTime);
                        }

                }

            try {
                if (xml.@type == "VideoWithSound" || xml.@type == "VideoWithoutSound" && !(isExist)) {
                    try {
                        try {
                            if (File(xml.file.toString()).exists) {
                                waitIm = File(xml.file.toString());
                            } else if (File($.layer.tempFolder.toString() + $.layer.slash + decodeURIComponent(File(xml.file.toString()).toString())).exists) {
                                if (decodeURIComponent(File(xml.file.toString()).toString())[0] == "~") {
                                    var genFilePath = File(genFileFolder.toString() + $.layer.slash + "D" + decodeURIComponent(File(xml.file.toString()).toString()));
                                } else {
                                    var genFilePath = File(genFileFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString()));
                                }
                                waitIm = genFilePath;
                            } else if (xml.fileBin.toString() != "") {

                                try {
                                    if ($.layer.arrayIndexOf($.layer.pictureType,xml.file.toString().split(".").slice(-1)) != -1) {
                                        var genFileFolder = Folder($.layer.tempFolder);
                                        if (!genFileFolder.exists) {
                                            genFileFolder.create();
                                        }
                                        if (decodeURIComponent(File(xml.file.toString()).toString())[0] == "~") {
                                            var genFilePath = File(genFileFolder.toString() + $.layer.slash + "D" + decodeURIComponent(File(xml.file.toString()).toString()));
                                        } else {
                                            var genFilePath = File(genFileFolder.toString() + $.layer.slash + decodeURIComponent(File(xml.file.toString()).toString()));
                                        }
                                        if(!genFilePath.parent.exists){
                                            genFilePath.parent.create();
                                        }

                                        var waitToWrite = decodeURIComponent(xml.fileBin.toString());

                                        if (!genFilePath.exists || genFilePath.exists && genFilePath.length != waitToWrite.length) {

                                            if(!genFilePath.parent.exists)
                                                genFilePath.create();
                                            if (!genFilePath.parent.exists)
                                                genFilePath = File($.layer.tempFolder.toString() + $.layer.slash + decodeURIComponent(File(xml.file.toString()).name.toString()));

                                            genFilePath.open("w");
                                            genFilePath.encoding = "BINARY";
                                            var isWrite = genFilePath.write(waitToWrite);
                                            genFilePath.close();
                                        }
                                    } else if ($.layer.arrayIndexOf($.layer.musicType ,xml.file.toString().split(".").slice(-1)) != -1) {
                                        genFileFolder = Folder($.layer.tempFolder);
                                        if (!genFileFolder.exists) {
                                            genFileFolder.create();
                                        }
                                        if (decodeURIComponent(File(xml.file.toString()).toString())[0] == "~") {
                                            genFilePath = File(genFileFolder.toString() + $.layer.slash + "D" + decodeURIComponent(File(xml.file.toString()).toString()));
                                        } else {
                                            genFilePath = File(genFileFolder.toString() + + $.layer.slash+ decodeURIComponent(File(xml.file.toString()).toString()));
                                        }
                                        if(!genFilePath.parent.exists){
                                            genFilePath.parent.create();
                                        }
                                        waitToWrite = decodeURIComponent(xml.fileBin.toString());
                                        if (!genFilePath.exists || genFilePath.exists && genFilePath.length != waitToWrite.length) {
                                            if(!genFilePath.parent.exists)
                                                genFilePath.create();
                                            if (!genFilePath.parent.exists)
                                                genFilePath = File($.layer.tempFolder + $.layer.slash + decodeURIComponent(File(xml.file.toString()).name.toString()));
                                            genFilePath.open("w");
                                            genFilePath.encoding = "BINARY";
                                            genFilePath.write(waitToWrite);
                                            genFilePath.close();
                                        }
                                    }
                                    waitIm = genFilePath;
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            }
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        try {
                            
                            var im = new ImportOptions();
                            im.file = waitIm;
                            try {
                                im.sequence = false;
                                im.forceAlphabetical = false;
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        } catch (err) {
                            $.layer.errorInfoArr.push({line:$.line,error:err});
                            layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);
                            return layer;
                        }
                        if (im.canImportAs(ImportAsType.FOOTAGE)) {
                            im.importAs = ImportAsType.FOOTAGE;
                            var f = app.project.importFile(im);
                            layer = thisComp.layers.add(f);
                            layer.name = decodeURIComponent(xml.@name);
                            try {
                                layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});};
                            try {
                                layer.strectch = parseFloat(xml.stretch);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            try {
                                if (xml.startTime != "undefined") {
                                    layer.startTime = parseFloat(xml.startTime);
                                }
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            layer.source.parentFolder = $.layer.sourceFolder;
                        } else if (im.canImportAs(ImportAsType.FOOTAGE)) {
                            im.importAs = ImportAsType.FOOTAGE;
                            var f = app.project.importFile(im);
                            layer = thisComp.layers.add(f);
                            layer.name = decodeURIComponent(xml.@name);
                            try {
                                layer.moveAfter(thisComp.layer(parseInt(xml.index)));
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});};
                            try {
                                layer.strectch = parseFloat(xml.stretch);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            try {
                                if (xml.startTime != "undefined") {
                                    layer.startTime = parseFloat(xml.startTime);
                                }
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            layer.source.parentFolder = $.layer.sourceFolder;
                        } else {
                            layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);
                        }
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                }
            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
            try {
                if (layer instanceof AVLayer) {
                    return layer;
                } else {
                    layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);
                    return layer;
                }
            } catch (err) {
                $.layer.errorInfoArr.push({line:$.line,error:err});
                layer = thisComp.layers.addSolid([0, 0, 0], "fail to import", 100, 100, 1);
                return layer;
            }
        },


        newPropertyGroup: function(xml, layers, inTime) {
            for (var addi = 0; addi < xml.children().length(); addi++) {
                var currentXML = xml.child(addi);
                    var matchName = currentXML.@matchName.toString();
                    var propName = currentXML.@name.toString();
                    var propIndex = parseInt(currentXML.@propertyIndex);
                    if(currentXML.@isEncoded.toString() != ""){
                        var obj = {
                            matchName:matchName,
                            propName:propName
                        };
                        $.layer.decode(obj);
                        matchName = obj.matchName;
                        propName = propName;
                    }
                if (currentXML.name() == "Group") {
                    prop = 0;
                    try{
                        if (layers.canAddProperty(matchName)) {
                            try{
                                var prop = layers.addProperty(matchName);

                                if (layers.property(propIndex).matchName == "ADBE Mask Atom") {
                                    layers.property(propIndex).maskMode = $.layer.getDistance(layers.property(propIndex).maskMode, parseInt(currentXML.@maskmode));
                                    layers.property(propIndex).inverted = (currentXML.@inverted.toString() == "false") ? false : true;
                                    layers.property(propIndex).rotoBezier = (currentXML.@rotoBezier.toString() == "false") ? false : true;
                                    layers.property(propIndex).color = [currentXML.@color.toString().split(",")[0], currentXML.@color.toString().split(",")[1], currentXML.@color.toString().split(",")[2]];
                                    layers.property(propIndex).maskMotionBlur = $.layer.getDistance(layers.property(propIndex).maskMotionBlur, parseInt(currentXML.@maskMotionBlur));
                                    layers.property(propIndex).maskFeatherFalloff = $.layer.getDistance(layers.property(propIndex).maskFeatherFalloff, parseInt(currentXML.@maskFeatherFalloff));
                                }
                            }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}

                        } else if (currentXML.@matchName.toString() == "ADBE Layer Styles") {
                            try{
                                var group = currentXML.children();
                                var layerStyleArr = [];
                                var cunName = [];
                                for (var shenqi = 0; shenqi < group.length(); shenqi++) {
                                    layerStyleArr.push(currentXML.child(shenqi).@matchName);
                                    cunName.push(currentXML.child(shenqi).@name);
                                }
                                for (var shenqi = 0; shenqi < layerStyleArr.length; shenqi++) {
                                    if (layerStyleArr[shenqi].indexOf("/") != -1) {
                                            if (layers.propertyDepth == 0) {
                                                if (layers.containingComp.id == app.project.activeItem.id)
                                                    app.executeCommand(app.findMenuCommandId(cunName[shenqi]));

                                            } else if (layers.propertyGroup(layers.propertyDepth).containingComp.id == app.project.activeItem.id) {
                                                app.executeCommand(app.findMenuCommandId(cunName[shenqi]));
                                            }
                                    }
                                }
                            }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                        }

                        
                    }catch(err){
                        $.layer.errorInfoArr.push({line:$.line,error:err});
                    }
                        try{
                            if (currentXML.@enabled != "None") {
                                if (layers.property(propIndex).canSetEnabled == true) {
                                    if (prop == 0) {
                                        if(currentXML.@enabled == "false")
                                            layers.property(propIndex).enabled = false;
                                    } else {
                                        if(currentXML.@enabled == "false")
                                            layers.property(parseInt(prop.propertyIndex)).enabled = false;
                                    }
                                }
                            }
                        }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}

                    try{
                        if (prop == 0) {
                            if (layers.propertyType == PropertyType.INDEXED_GROUP) {
                                layers.property(propIndex).name = propName;
                            }
                        } else {
                            if (layers.propertyType == PropertyType.INDEXED_GROUP)
                                layers.property(prop.propertyIndex).name = propName;
                        }
                    }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                    
                    
                    try{
                        if (currentXML.children().length() > 0) {
                            if (prop == 0 && currentXML.@matchName != "ADBE Mask Parade" && currentXML.@matchName != "ADBE Effect Parade" && currentXML.@matchName != "ADBE Layer Styles") {
                                    $.layer.prototype.newPropertyGroup(currentXML, layers.property(propIndex), inTime);
                            } else {
                                if (currentXML.@matchName != "ADBE Mask Parade" && currentXML.@matchName != "ADBE Effect Parade" && currentXML.@matchName != "ADBE Layer Styles") {
                                        $.layer.prototype.newPropertyGroup(currentXML, layers.property(prop.propertyIndex), inTime);
                                } else {
                                        $.layer.prototype.newPropertyGroup(currentXML, layers.property(matchName), inTime);
                                }
                            }
                        }
                    }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                } else if (currentXML.name() == "prop") {
                    try{
                        $.layer.prototype.newProperty(currentXML, layers, inTime)
                    }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                }

                if (currentXML.name() == "prop") {
                    if (currentXML.exp.toString() != "") {
                        try {
                            
                            var expArr = [];
                            
                            var expProperty = layers.property(matchName);
                            
                            expArr.push(expProperty.propertyIndex);
                            for(var i=1,len= expProperty.propertyDepth;i<len;i++){
                                expArr.push(expProperty.propertyGroup(i).propertyIndex);
                            }
                            expArr.push(expProperty.propertyGroup(i));

                            $.layer.expPropertyArr.push(expArr);
                            
                           
                            expProperty.expression = decodeURIComponent(currentXML.exp.toString());
                        } catch (err) {
                            /* ignore*/
//~                             $.layer.errorInfoArr.push({line:$.line,error:err});
                        };
                    }
                }
            }
        },

        newProperty: function(xml, layers, inTime) {
            var matchName = xml.@matchName.toString();
            var propName = xml.@name.toString();
            var isNotText = layers.property(matchName).matchName != "ADBE Text Document";
            var isNotMarker = layers.property(matchName).matchName != "ADBE Marker";
            var isNotMaskShape = layers.property(matchName).matchName != "ADBE Mask Shape";
            var isNotVectorShape = layers.property(matchName).matchName != "ADBE Vector Shape";
            var isNotTextAnimatorProp = layers.matchName != "ADBE Text Animator Properties";
            var isNotDash = layers.matchName != "ADBE Vector Stroke Dashes";
            if (isNotText && isNotMarker && isNotMaskShape && isNotVectorShape) {
                if (!isNotTextAnimatorProp || !isNotDash) {
                    if (layers.canAddProperty(matchName)) {
                        layers.addProperty(matchName);
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
                        layers.property(matchName).setValue(value);
                    } catch (err) {
                        /* ignore*/
                        if(err.toString().indexOf("hidden") == -1)
                            $.layer.errorInfoArr.push({line:$.line,error:err});
                    }
                    try {
                        var a = layers.property(matchName).propertyValueType.toString();
                        if (a.indexOf("17") != -1 || a.indexOf("21") != -1 || a.indexOf("22") != -1) {
                            $.layer.layerTypePropertyArr.push(layers.property(matchName));
                            $.layer.layerTypePropertyValueArr.push(value);
                        }
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                } else {
                    var values = [];
                    var valueTemp = [];
                    var times = [];
                    var div = xml.keyTime.toString().split(",");
                    var vas = xml.keyValue.toString().split(",");
                    for (var ia = 0; ia < div.length; ia++) {

                        if (typeof inTime == "undefined") {
                            times.push(div[ia]);
                        } else {
                            times.push(parseFloat(div[ia]) + parseFloat(inTime));
                        }
                    }
                    for (var ia = 0; ia < div.length; ia++) {
                        for (ib = 0; ib < vas.length / div.length; ib++) {
                            valueTemp.push(xml.keyValue.toString().split(",")[ia * vas.length / div.length + ib]);
                        }
                        values.push(valueTemp);
                        valueTemp = [];
                    }
                    try {
                        layers.property(matchName).setValuesAtTimes(times, values);
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    var inSpeedArr = [];
                    var inInArr = [];
                    var outSpeedArr = [];
                    var outIn = [];
                    if (app.version[1] == "." || app.version[1] == "0") {
                        var ease;
                        for (var iaa = 0; iaa < xml.keyTime.toString().split(",").length; iaa++) {
                            ease += xml.child(iaa + 4);
                        }
                        len = xml.keyTime.toString().split(",").length;
                    } else {
                        var ease = xml..Ease;
                        len = ease.length();
                    }
                    for (var ia = 0; ia < len; ia++) {
                        var myScaleProperty = layers.property(matchName);
                        
                        try{
                            var type =  $.layer.getDistance(myScaleProperty.propertyValueType, parseInt(xml.inType.split(",")[0]));
                        }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                        
                        
                        var clamp = parseFloat(xml.child(ia + 4).InIn);
                            clamp = $.layer.clampInfluence(clamp);
                        var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);
                        
                        var clampb = parseFloat(xml.child(ia + 4).OutIn);
                        clampb = $.layer.clampInfluence(clampb);
                        var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                        
                        try{
                            var inSpatialArr  = xml.child(ia + 4).keyInSpatialTangent.toString().split(",");
                            var outSpatialArr = xml.child(ia + 4).keyOutSpatialTangent.toString().split(",");
                            if(type ==  PropertyValueType.TwoD_SPATIAL){
                                myScaleProperty.setSpatialTangentsAtKey(ia+1,inSpatialArr,outSpatialArr);
                            }else if(type == PropertyValueType.ThreeD_SPATIAL){
                                if(inSpatialArr.length == 3 && outSpatialArr.length == 3)
                                    myScaleProperty.setSpatialTangentsAtKey(ia+1,inSpatialArr,outSpatialArr);
                            }
                            
                        }catch(err){$.layer.errorInfoArr.push({line:$.line,error:err});}
                        try {
                            if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.TwoD &&
                                $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.ThreeD) {
                                    
                                var clamp = parseFloat(xml.child(ia + 4).InIn);
                                clamp = $.layer.clampInfluence(clamp);
                                var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);
                                
                                var clampb = parseFloat(xml.child(ia + 4).OutIn);
                                clampb = $.layer.clampInfluence(clampb);

                                var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                                try {
                                    myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.TwoD) {

                                var clamp = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[0]);
                                clamp = $.layer.clampInfluence(clamp);
                                var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[0]), clamp);
                                
                                var clampb = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[0]);
                                clampb = $.layer.clampInfluence(clampb);
                                var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[0]), clampb);
                                
                                var clamp1 = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[1]);
                                clamp1 = $.layer.clampInfluence(clamp1);
                                var easeIn1 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[1]), clamp1);
                                
                                var clampb1 = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[1]);
                                clampb1 = $.layer.clampInfluence(clampb1);
                                var easeOut1 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[1]), clampb1);
                                
                                try {
                                    myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1], [easeOut, easeOut1]);
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.ThreeD) {
                                var clamp = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[0]);
                                clamp = $.layer.clampInfluence(clamp);
                                var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[0]), clamp);
                                
                                var clampb = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[0]);
                                clampb = $.layer.clampInfluence(clampb);
                                var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[0]), clampb);
                                
                                var clamp1 = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[1]);
                                clamp1 = $.layer.clampInfluence(clamp1);
                                var easeIn1 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[1]), clamp1);
                                
                                var clampb1 = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[1]);
                                clampb1 = $.layer.clampInfluence(clampb1);
                                var easeOut1 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[1]), clampb1);
                                
                                var clamp2 = parseFloat(xml.child(ia + 4).InIn.toString().split(",")[2]);
                                clamp2 = $.layer.clampInfluence(clamp2);
                                var easeIn2 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(",")[2]), clamp2);
                                
                                var clampb2 = parseFloat(xml.child(ia + 4).OutIn.toString().split(",")[2]);
                                clampb2 = $.layer.clampInfluence(clampb2);
                                var easeOut2 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(",")[2]), clampb2);
                                
                                try {
                                    myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1, easeIn2], [easeOut, easeOut1, easeOut2]);
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            }
                            try {
                                var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(xml.child(ia + 4).inInterType));
                                var outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(xml.child(ia + 4).outInterType));
                                if(!isNaN(inIn) && !isNaN(outIn))
                                    myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            try {
                                if ((xml.child(ia + 4).isRoving).toString() == "true")
                                    myScaleProperty.setRovingAtKey(ia + 1, true);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    }
                }
            } else if (layers.property(matchName).matchName == "ADBE Text Document") {
                if (xml.@key == 0) {
                    try {
                        var value = [];
                        var myText = layers.property(matchName).value;
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
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        var nextText = myText;
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    try {
                        layers.property(matchName).setValue(myText);
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    try {
                        layers.property(matchName).setValue(nextText);
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                } else {
                    var values = [];
                    var valueTemp = [];
                    var times = [];
                    var div = xml.keyTime.toString().split(",");
                    var vas = xml.keyValue.toString().split(",");
                    for (var ia = 0; ia < div.length; ia++) {
                        if (typeof inTime == "undefined") {
                            times.push(div[ia]);
                        } else {
                            times.push(parseFloat(div[ia]) + parseFloat(inTime));
                        }
                    }
                    for (var ib = 0; ib < div.length; ib++) {
                        var myText = null;
                        myText = layers.property(matchName).valueAtTime(times[ib], true);
                        myText.text = xml.keyValue.child(ib).text.toString();
                        myText.font = xml.keyValue.child(ib).font.toString();
                        myText.fontSize = parseInt(xml.keyValue.child(ib).fontSize);
                        myText.applyFill = (xml.keyValue.child(ib).applyFill.toString() == "true") ? true : false;
                        myText.applyStroke = (xml.keyValue.child(ib).applyStroke.toString() == "true") ? true : false;
                        if (xml.keyValue.child(ib).applyFill.toString() == "true")
                            myText.fillColor = [xml.keyValue.child(ib).fillColor.toString().split(",")[0], xml.keyValue.child(ib).fillColor.toString().split(",")[1], xml.keyValue.child(ib).fillColor.toString().split(",")[2]];
                        if (xml.keyValue.child(ib).applyStroke.toString() == "true") {
                            myText.strokeColor = [xml.keyValue.child(ib).strokeColor.toString().split(",")[0], xml.keyValue.child(ib).strokeColor.toString().split(",")[1], xml.keyValue.child(ib).strokeColor.toString().split(",")[2]];
                            myText.strokeOverFill = xml.keyValue.child(ib).strokeOverFill.toString();
                            myText.strokeWidth = xml.keyValue.child(ib).strokeWidth.toString();
                        }
                        try {
                            myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.keyValue.child(ib).justification));
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        nextText = myText;
                        try {
                            layers.property(matchName).setValueAtTime(times[ib], myText);
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        try {
                            layers.property(matchName).setValueAtTime(times[ib], nextText);
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    }
                }
            } else if (!isNotMarker) {
                if (xml.@key == 0) {} else {
                    var values = [];
                    var valueTemp = [];
                    var times = [];
                    var div = xml.keyTime.toString().split(",");
                    for (var ia = 0; ia < div.length; ia++) {
                        if (typeof inTime == "undefined") {
                            times.push(div[ia]);
                        } else {
                            times.push(parseFloat(div[ia]) + parseFloat(inTime));
                        }
                    }
                    for (var ib = 0; ib < div.length; ib++) {
                        var myMarker = new MarkerValue("zhanwei");
                        myMarker.comment = xml.keyValue.child(ib).comment.toString();
                        myMarker.duration = xml.keyValue.child(ib).duration.toString();
                        myMarker.chapter = xml.keyValue.child(ib).chapter.toString();
                        myMarker.cuePointName = xml.keyValue.child(ib).cuePointName.toString();
                        myMarker.eventCuePoint = xml.keyValue.child(ib).eventCuePoint.toString();
                        myMarker.url = xml.keyValue.child(ib).url.toString();
                        myMarker.frameTarget = xml.keyValue.child(ib).frameTarget.toString();
                        try {
                            layers.property(matchName).setValueAtTime(times[ib], myMarker);
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    }
                }
            } else if (!isNotMaskShape || !isNotVectorShape) {
                if (xml.@key == "0") {
                    var myShape = new Shape();
                    var vertsArr = [];
                    var inTanArr = [];
                    var outTanArr = [];
                    var verts = xml.vertices.toString().split(",");
                    var inTan = xml.inTan.toString().split(",");
                    var outTan = xml.outTan.toString().split(",");
                    for (var ic = 0; ic < verts.length / 2; ic++) {
                        vertsArr.push([verts[ic * 2], verts[ic * 2 + 1]]);
                        inTanArr.push([inTan[ic * 2], inTan[ic * 2 + 1]]);
                        outTanArr.push([outTan[ic * 2], outTan[ic * 2 + 1]]);
                    }
                    myShape.vertices = vertsArr;
                    myShape.inTangents = inTanArr;
                    myShape.outTangents = outTanArr;
                    myShape.closed = (xml.closed == true) ? true : false;
                    try {
                        layers.property(matchName).setValue(myShape);
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                } else {
                    var myShape = new Shape();
                    var vertsArr = [];
                    var inTanArr = [];
                    var outTanArr = [];
                    var times = [];
                    var shapes = [];
                    var div = xml.keyTime.toString().split(",");
                    for (var ia = 0; ia < div.length; ia++) {
                        if (typeof inTime == "undefined") {
                            times.push(div[ia]);
                        } else {
                            times.push(parseFloat(div[ia]) + parseFloat(inTime));
                        }
                    }
                    for (var ic = 0; ic < xml.keyValue.children().length(); ic++) {
                        var verts = xml.keyValue.child(ic).vertices.toString().split(",");
                        var inTan = xml.keyValue.child(ic).inTan.toString().split(",");
                        var outTan = xml.keyValue.child(ic).outTan.toString().split(",");
                        for (var ib = 0; ib < verts.length / 2; ib++) {
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
                        layers.property(matchName).setValuesAtTimes(times, shapes);
                    } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    var inSpeedArr = [];
                    var inInArr = [];
                    var outSpeedArr = [];
                    var outIn = [];
                    if (app.version[1] == "." || app.version[1] == "0") {
                        var ease;
                        for (var iaa = 0; iaa < xml.keyTime.toString().split(",").length; iaa++) {
                            ease += xml.child(iaa + 4);
                        }
                        len = xml.keyTime.toString().split(",").length;
                    } else {
                        var ease = xml..Ease;
                        len = ease.length();
                    }
                    for (var ia = 0; ia < len; ia++) {
                        var clamp = parseFloat(xml.child(ia + 4).InIn);
                        clamp = $.layer.clampInfluence(clamp);
                        var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);
                        
                        var clampb = parseFloat(xml.child(ia + 4).OutIn);
                                clampb = $.layer.clampInfluence(clampb);
                        var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                        
                        var myScaleProperty = layers.property(matchName);
                        try {
                            if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.TwoD &&
                                $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) != PropertyValueType.ThreeD) {
                                try {
                                    myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.TwoD) {
                                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn], [easeOut, easeOut]);
                            } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(",")[0]) == PropertyValueType.ThreeD) {
                                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
                            }
                            try {
                                var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(xml.inInterType));
                                var outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(xml.outInterType));
                                myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            try {
                                if ((xml.isRoving).toString() == "true")
                                    myScaleProperty.setRovingAtKey(ia + 1, true);
                            } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                        } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                    }
                }
            }
        },



        toLayer: function(thisComp, xml) {
            xml = xml || this.item;
            
            if($.layer.numLayers == 0){
              var isFirstStage = true;
              $.layer.clearHelperArr();  
              app.beginSuppressDialogs();
            }else{
              var isFirstStage = false;
            }

            var layerArr = [];

            $.layer.forEachXML(xml, function(item, index) {
                $.layer.numLayers++;
                try{
                    $.layer.layerArr[$.layer.layerArr.length] = layerArr[layerArr.length] = $.layer.prototype.newLayer(item, thisComp);
                }catch(err){$.layer.errorInfoArr.push(err)}
                $.layer.layerParentNameArr.push(item.parent.toString());
            },this);


            if (isFirstStage == true) {
                app.endSuppressDialogs (false);
                $.layer.correctProperty();
                $.layer.fixExpression();
                $.layer.setParent();
                $.layer.writeErrorFile();
                $.layer.clearHelperArr();  
            }
        
            return layerArr;

        }


    });


    $.layer.newProperties = function(effectxml, selectedLayers, options) {
        app.beginSuppressDialogs();

        var idArr = [
            "ADBE Mask Parade", "ADBE Effect Parade", "ADBE Transform Group",
            "ADBE Material Options Group", "ADBE Layer Styles", "ADBE Root Vectors Group",
            "ADBE Text Animators", "ADBE Light Options Group", "ADBE Camera Options Group"
        ];

        var idGen = [];
        var idDel = [];

        var isCleanGroup = options.isCleanGroup;
        var isKeyframeOffset = options.isKeyframeOffset;

        var newPropertiesSettingArr = options.newPropertiesSettingArr;
        var cleanPropertiesSettingArr = options.cleanPropertiesSettingArr

        for (var i = 1; i <= 9; i++) {
            if (newPropertiesSettingArr[i - 1] == 1) {
                idGen.push(idArr[i - 1]);
            }
            if (cleanPropertiesSettingArr[i - 1] == 1) {
                idDel.push(idArr[i - 1]);
            }
        }

        //~Set xml ignored
        for (var i = effectxml.children().length(); i >= 0; i--) {
            var xml = effectxml.child(i);
            if (xml.name() == "Group") {
                if (xml.@matchName == "ADBE Text Properties") {
                    xml.child(0).setLocalName("textignore");
                    if (effectxml.children().length() >= 4) {
                        $.layer.lookUpInArray(xml.child(3).@matchName, idGen) == false && xml.child(3).setLocalName("ignore");
                    }
                }
                if ($.layer.lookUpInArray(xml.@matchName, idGen) == false) {
                    xml.@matchName != "ADBE Text Properties" && xml.setLocalName("ignore");
                }

            } else {
                xml.name() == "Comptent" && xml.setLocalName("compignore")
            }
        }

        //~ Delete propertyGroup in layers
        if (isCleanGroup == true) {

            $.layer.forEach.call(selectedLayers,function(layer, index) {

                $.layer.forEachPropertyGroup.call(layer, function(thisGroup, index) {
                    if ($.layer.lookUpInArray(thisGroup.matchName, idDel) == true) {
                        if (thisGroup.matchName != "ADBE Layer Styles") {
                            for (var i = thisGroup.numProperties; i > 0; i--) {
                                try {
                                    thisGroup.property(i).remove();
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            }
                        } else {
                            for (var i = thisGroup.numProperties; i > 0; i--) {
                                try {
                                    thisGroup.property(i).enabled = false;
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            }
                        }
                    }
                    if (thisGroup.matchName == "ADBE Text Properties") {
                        if ($.layer.lookUpInArray(thisGroup.property(4).matchName, idDel) == true) {
                            for (var i = thisGroup.property(4).numProperties; i > 0; i--) {
                                try {
                                    thisGroup.property(4).property(i).remove();
                                } catch (err) {$.layer.errorInfoArr.push({line:$.line,error:err});}
                            }
                        }
                    }
                }) //~ ForEachPropertyGroup end


            })
            app.endSuppressDialogs(false);
        }
    
        $.layer.forEach.call(selectedLayers,function(layer, index) {
            if (isKeyframeOffset == true)
                $.layer.prototype.newPropertyGroup(effectxml, layer, layer.inPoint)
            else
                $.layer.prototype.newPropertyGroup(effectxml, layer)
        })
        $.layer.correctProperty();
        $.layer.fixExpression();
        $.layer.setParent();


    }; //~Clean group and ignore end

    //correct the value of property which's type is layerIndex or maskIndex     
    $.layer.correctProperty = function() {

        $.layer.forEach.call($.layer.layerTypePropertyArr, function(item, index) {
            try {
                item.setValue($.layer.layerTypePropertyValueArr[index]);
            } catch (err) {}
        });
    }

    //translate the error expressions to avoid script freezing caused by different language version of AfterEffects 
    $.layer.fixExpression = function() {
        var translatedExpPropertyArr = [];
        
        app.beginSuppressDialogs();
        $.layer.forEach.call($.layer.expPropertyArr, function(item, index) {
                try {
                    item.expressionEnabled = true;
                    var testItsValue = item.valueAtTime(0, false);
                } catch (eer) {
                    translatedExpPropertyArr.push(item);
                };
        });
        app.endSuppressDialogs(false);
        
        

            var targetExpArr = [];
            
            for(var i =0;i<translatedExpPropertyArr.length;i++){
                    var refArr = translatedExpPropertyArr[i];
                    var prop = refArr[refArr.length-1];
                    var j = refArr.length-1;
                    while(j>0){
                      prop = prop.property(refArr[j-1]);
                      j--;
                    }
                    targetExpArr.push(prop)
            }
        
        if (typeof $.layer.translate == "function") {
            targetExpArr.length != 0 && $.layer.translate(this, targetExpArr);
        }
    }

    //set the parent of layer using Layer.setParentWithJump()
    $.layer.setParent = function() { 
        $.layer.forEach.call($.layer.layerArr, function(item, index) {
            try {
                if (parseInt($.layer.layerParentNameArr[index]) == $.layer.layerParentNameArr[index])
                    item.setParentWithJump(item.containingComp.layer(parseInt($.layer.layerParentNameArr[index])));
                else
                    item.setParentWithJump(item.containingComp.layer($.layer.layerParentNameArr[index]));
            } catch (err) {}
        })
    }

    $.layer.isType = function(obj, type) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    }

    $.layer.clampInfluence = function(clamp){
         if (clamp < 0.1) {
                 clamp = 0.1;
         }else if(clamp>=100){
                 clamp = 100;
         }
        return clamp;
    }

    $.layer.arrayIndexOf = function(arr,item){
            for(var i=0,len=arr.length;i<len;i++){
                if(arr[i]==item)
                    return i;
            }
            return -1;
    }

    $.layer.forEachXML = function(xml, callback, context) {
        if (!(xml instanceof XML)) return;
        var i,
            len;
        for (i = 0, len = xml.children().length(); i < len; i++) {
            if (callback.call(context, xml.child(i), i, xml) === false) {
                break;
            }
        }
    }

    $.layer.forEach = function(callback, context) {
        if (Object.prototype.toString.call(this) === "[object Array]") {
            var i,
                len;
            for (i = 0, len = this.length; i < len; i++) {
                if (typeof callback === "function" && Object.prototype.hasOwnProperty.call(this, i)) {
                    if (callback.call(context, this[i], i, this) === false) {
                        break; // or return;
                    }
                }
            }
        }
    }

    $.layer.forEachLayer = function(callback, context) {
        if (Object.prototype.toString.call(this) === "[object LayerCollection]") {
            var i,
                len;
            for (i = 1, len = this.length; i <= len; i++) {
                if (typeof callback === "function" && Object.prototype.hasOwnProperty.call(this, i)) {
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
                break; 
            }
        }
    }

    $.layer.lookUpInArray = function(text, arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] == text)
                return true;
        }
        return false;
    };

    $.layer.getDistance = function(a, b) {
        return parseInt((a.toString().substring(0, 2) - b.toString().substring(0, 2))) * 100 + parseInt(b);
    };

    $.layer.tempFolder = new Folder(new File($.fileName).parent.toString());
    $.layer.slash = "/";
    
    $.layer.numLayers = 0;
    $.layer.layerTypePropertyArr = [];
    $.layer.layerTypePropertyValueArr = [];
    $.layer.expPropertyArr = [];
    $.layer.layerArr = [];
    $.layer.layerParentNameArr = [];
    $.layer.errorInfoArr = [];

    $.layer.clearHelperArr = function() {
        $.layer.numLayers = 0;
        $.layer.layerTypePropertyArr = [];
        $.layer.layerTypePropertyValueArr = [];
        $.layer.expPropertyArr = [];
        $.layer.layerArr = [];
        $.layer.layerParentNameArr = [];
        $.layer.errorInfoArr = [];
    },

    $.layer.writeErrorFile = function(){
        var str = "";
        $.layer.forEach.call($.layer.errorInfoArr,function(item,index){
                str += "Catched-Line# "+item.line+ "\tHappened-Line# "+item.error.line.toString() + "\t" + item.error.toString()+"\r\n";
        });
        var file = new File($.layer.tempFolder.toString()+$.layer.slash.toString()+"error.txt");
        writeLn("Find "+$.layer.errorInfoArr.length+ " errors");
        file.writee(str);
    }

    $.layer.musicType = ["ape", "flac", "mp3", "wav"];
    $.layer.musicMaxLength = 52428800;
    $.layer.pictureType = ["ai", "bmp", "jpg", "png", "psd", "tiff"];
    $.layer.pictureMaxLength = 10485760;
    
    $.layer.translate = function(){};
    
    $.layer.en = encodeURIComponent;
    $.layer.de = decodeURIComponent;
    
    $.layer.encodedArr = ["amp;","lt;","gt;","quot;","apos;"];
    $.layer.decodedArr = ["&","<",">","\"","'"];
    
    $.layer.encode = function(obj){
        $.layer.forEach.call($.layer.decodedArr,function(item,index){
                var reg = new RegExp(item,"g");
                for(var j in obj){
                    obj[j] = obj[j].replace(reg,$.layer.encodedArr[index]);
                }
        });
    }    

    $.layer.decode = function(obj){
        $.layer.forEach.call($.layer.encodedArr,function(item,index){
                var reg = new RegExp(item,"g");
                for(var j in obj){
                    obj[j] = obj[j].replace(reg,$.layer.decodedArr[index]);
                }
        });
    }
    
    $.layer.name = "AE Layer library"
    $.layer.version = 1.0;
    $.layer.email = "smallpath2013@gmail.com";


    $.layer.prototype.init.prototype = $.layer.prototype;
    return $.layer;

})();