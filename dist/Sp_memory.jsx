/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function () {
  $.layer = function (item, options) {
    return new $.layer.prototype.Init(item, options);
  };

  $.layer.prototype = {
    Init: function (item, options, helperObj) {
      this.item = item;

      this.helperObj = helperObj || {};

      $.layer.parseFolderItem(item, options);

      if ($.layer.isType(options, 'Object')) {
        this.isSaveMaterial = options.isSaveMaterial || false;
      } else {
        this.isSaveMaterial = false;
      }

      return this;
    }
  };

  $.layer.extend = function (target, source) {
    for (var i in source) target[i] = source[i];
    return target;
  };

  $.layer.parseFolderItem = function (item, options) {
    if ($.layer.isType(options, 'Object') && item instanceof XML) {
      if (!$.layer.isType(options.compFolder, 'FolderItem')) {
        $.layer.compFolder = null;
      } else {
        $.layer.compFolder = options.compFolder;
      }
      if (!$.layer.isType(options.sourceFolder, 'FolderItem')) {
        if ($.layer.compFolder !== null) {
          $.layer.sourceFolder = $.layer.compFolder;
        } else {
          $.layer.sourceFolder = null;
        }
      } else {
        $.layer.sourceFolder = options.sourceFolder;
      }
    }
  };

  $.layer.extend($.layer.prototype, {

    getLayerAttr: function (index) {
      var thisLayer = this.item;
      var helperObj = this.helperObj;
      var layerInf = {};

      layerInf.type = 'null';
      if (thisLayer instanceof TextLayer) {
        layerInf.type = 'Text';
      } else if (thisLayer instanceof LightLayer) {
        layerInf.type = 'Light';
        layerInf.lightType = thisLayer.lightType;
      } else if (thisLayer instanceof ShapeLayer) {
        layerInf.type = 'Shape';
      } else if (thisLayer instanceof AVLayer) {
        if (thisLayer.source.mainSource instanceof SolidSource && thisLayer.nullLayer !== true && !(thisLayer.source instanceof CompItem)) {
          layerInf.type = 'Solid';
          layerInf.solidColor = thisLayer.source.mainSource.color;
        } else if (thisLayer.source.mainSource instanceof FileSource && thisLayer.nullLayer !== null && !(thisLayer.source instanceof CompItem)) {
          layerInf.sound = thisLayer.hasAudio;
          if (layerInf.sound) {
            layerInf.type = 'VideoWithSound';
          } else {
            layerInf.type = 'VideoWithoutSound';
          }
        } else if (thisLayer.source instanceof CompItem) {
          layerInf.type = 'Comp';
        }
      } else if (thisLayer instanceof AVLayer) {
        if (thisLayer.nullLayer) {
          layerInf.type = 'Null';
        }
      } else if (thisLayer instanceof CameraLayer) {
        layerInf.type = 'Camera';
      }
      layerInf.geoType = 'null';
      layerInf.name = thisLayer.name;

      var text = '<Layer type="' + layerInf.type + '" name="' + encodeURIComponent(layerInf.name) + '"></Layer>';
      var layerInfo = new XML(text);
      if (layerInf.type === 'Light') {
        layerInfo.light = layerInf.lightType;
      }
      if (layerInf.type === 'Solid') {
        layerInfo.solidColor = layerInf.solidColor;
      }
      if (layerInf.type === 'VideoWithSound' || layerInf.type === 'VideoWithoutSound') {
        layerInfo = this.getMaterial(layerInf, layerInfo, helperObj, thisLayer);
      }
      if (layerInf.type === 'Comp') {
        layerInfo = this.getCompLayerAttr(layerInfo, thisLayer, helperObj, thisLayer);
      }
      if (layerInf.type === 'Text') {
        var isPointText = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).pointText;
        var isBoxText = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).boxText;
        layerInfo.textType = isPointText === true ? 'point' : 'box';
        if (isBoxText === true) {
          layerInfo.boxSize = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).boxTextSize.toString();
        }
      }

      layerInfo.type = layerInf.type;
      layerInfo.searchName = thisLayer.name;
      layerInfo.label = thisLayer.label;
      layerInfo.width = thisLayer.source ? thisLayer.width : 'None';
      layerInfo.height = thisLayer.source ? thisLayer.height : 'None';
      layerInfo.index = index;

      layerInfo.parent = thisLayer.parent === null ? 'false' : thisLayer.parent.index;
      layerInfo.inPoint = thisLayer.inPoint;
      layerInfo.outPoint = thisLayer.outPoint;
      layerInfo.enabled = thisLayer.enabled;
      layerInfo.three = typeof thisLayer.threeDLayer === 'undefined' ? 'undefined' : thisLayer.threeDLayer;
      layerInfo.trackMatteType = typeof thisLayer.trackMatteType === 'undefined' ? 'undefined' : thisLayer.trackMatteType;
      layerInfo.solo = thisLayer.solo;
      layerInfo.shy = thisLayer.shy;
      layerInfo.collapseTransformation = thisLayer.collapseTransformation;
      if (layerInf.type === 'VideoWithSound' || layerInf.type === 'Comp') {
        layerInfo.audioEnabled = thisLayer.audioEnabled;
      }
      layerInfo.motionBlur = thisLayer.motionBlur;
      layerInfo.guideLayer = typeof thisLayer.guideLayer === 'undefined' ? 'undefined' : thisLayer.guideLayer;
      layerInfo.environmentLayer = typeof thisLayer.environmentLayer === 'undefined' ? 'undefined' : thisLayer.environmentLayer;
      layerInfo.adjustmentLayer = typeof thisLayer.adjustmentLayer === 'undefined' ? 'undefined' : thisLayer.adjustmentLayer;
      layerInfo.blendingMode = typeof thisLayer.trackMatteType === 'undefined' ? 'undefined' : thisLayer.blendingMode;
      layerInfo.autoOrient = typeof thisLayer.autoOrient === 'undefined' ? 'undefined' : thisLayer.autoOrient;
      layerInfo.preserveTransparency = typeof thisLayer.preserveTransparency === 'undefined' ? 'undefined' : thisLayer.preserveTransparency;
      try {
        layerInfo.separated = thisLayer('ADBE Transform Group')('ADBE Position').dimensionsSeparated;
      } catch (err) {}
      layerInfo.timeRemap = thisLayer.timeRemapEnabled;
      layerInfo.stretch = thisLayer.stretch;
      layerInfo.startTime = thisLayer.startTime;
      layerInfo.ray = thisLayer.containingComp.renderer === 'ADBE Picasso';
      layerInfo.geoType = 'null';
      if (layerInfo.type !== 'null' && layerInfo.three === true && layerInfo.ray === true) {
        if (layerInfo.type === 'Shape' || layerInfo.type === 'Text') {
          layerInfo.geoType = 'small';
        } else {
          layerInfo.geoType = 'large';
        }
      }
      return layerInfo;
    },

    getCompLayerAttr: function (layerInfo, thisLayer) {
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

    getMaterial: function (layerInf, layerInfo, helperObj, thisLayer) {
      layerInfo.file = thisLayer.source.mainSource.file;
      if (this.isSaveMaterial === true) {
        var fileCon;
        var thisFileW;
        var tempArr = $.layer.pictureType;
        if ($.layer.lookUpInArray(thisLayer.source.mainSource.file.name.split('.').slice(-1), tempArr)) {
          if (thisLayer.source.mainSource.file.length <= $.layer.pictureMaxLength) {
            if (helperObj.hasOwnProperty('_' + thisLayer.source.id)) {} else {
              try {
                helperObj['_' + thisLayer.source.id] = {};
                try {
                  thisFileW = File(thisLayer.source.mainSource.file);
                  thisFileW.open('r');
                  thisFileW.encoding = 'BINARY';
                  fileCon = thisFileW.read();
                  thisFileW.close();
                  layerInfo.fileBin = encodeURIComponent(fileCon);
                } catch (err) {}
              } catch (err) {}
            }
          }
        }

        if ($.layer.lookUpInArray(thisLayer.source.mainSource.file.name.split('.').slice(-1), tempArr)) {
          if (thisLayer.source.mainSource.file.length <= $.layer.musicMaxLength) {
            if (helperObj.hasOwnProperty('_' + thisLayer.source.id)) {} else {
              try {
                helperObj['_' + thisLayer.source.id] = {};
                try {
                  thisFileW = File(thisLayer.source.mainSource.file);
                  thisFileW.open('r');
                  thisFileW.encoding = 'BINARY';
                  fileCon = thisFileW.read();
                  thisFileW.close();
                  layerInfo.fileBin = encodeURIComponent(fileCon);
                } catch (err) {}
              } catch (err) {}
            }
          }
        }
      }

      return layerInfo;
    },

    getProperties: function (ref, layerxml, layerInfo) {
      if (ref !== null) {
        var prop;
        var va;
        var text;
        for (var i = 1; i <= ref.numProperties; i++) {
          prop = ref.property(i);
          if (prop.propertyType === PropertyType.PROPERTY) {
            try {
              va = prop.value.toString();
              va = true;
            } catch (err) {
              va = false;
            }
            var bool = true;
            try {
              if (prop.matchName !== 'ADBE Marker') {
                prop.setValue(prop.valueAtTime(0, true));
              }
            } catch (r) {
              bool = false;
            }
            var thisBool = bool || prop.canSetExpression || prop.matchName === 'ADBE Marker';
            if (thisBool && va) {
              if (prop.matchName === 'ADBE Marker' && prop.numKeys === 0) {} else {
                try {
                  if (prop.matchName === 'ADBE Glo2-0007') {
                    prop.setValue($.layer.glowtype);
                  }
                } catch (err) {}
                try {
                  $.layer.prototype.addToLastChild(layerxml, new XML($.layer.prototype.getProperty(prop)), prop.propertyDepth, []);
                } catch (err) {}
              }
            }
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            var layerStyle = prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false;
            var layerChild = prop.propertyGroup(1).matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false && prop.propertyIndex > 1;
            var material = prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false;
            var audio = prop.matchName === 'ADBE Audio Group';
            var geosmall = prop.matchName === 'ADBE Extrsn Options Group' && layerInfo.geoType !== 'small';
            var geolarge = prop.matchName === 'ADBE Plane Options Group' && layerInfo.geoType !== 'large';
            var vector = prop.matchName === 'ADBE Vector Materials Group';
            var motion = prop.matchName === 'ADBE MTrackers' && prop.numProperties === 0;
            if (layerStyle || material || audio || geosmall || geolarge || vector || motion || layerChild) {} else {
              var propName = prop.name.toString();
              var matchName = prop.matchName.toString();

              if (prop.matchName === 'ADBE Mask Atom') {
                var obj;
                var temp;
                try {
                  text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '" maskFeatherFalloff="' + prop.maskFeatherFalloff.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                  try {
                    temp = new XML(text);
                    if (temp) {}
                  } catch (err) {
                    $.layer.errorInfoArr.push({ line: $.line, error: err });
                    obj = {
                      propName: propName,
                      matchName: matchName
                    };
                    $.layer.encode(obj);
                    text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '" maskFeatherFalloff="' + prop.maskFeatherFalloff.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                  }
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                  text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '"  enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                  try {
                    temp = new XML(text);
                    if (temp) {}
                  } catch (err) {
                    $.layer.errorInfoArr.push({ line: $.line, error: err });
                    obj = {
                      propName: propName,
                      matchName: matchName
                    };
                    $.layer.encode(obj);
                    text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '"  enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                  }
                }
              } else {
                text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                try {
                  temp = new XML(text);
                  if (temp) {}
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                  obj = {
                    propName: propName,
                    matchName: matchName
                  };
                  $.layer.encode(obj);
                  text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" enabled="' + (prop.canSetEnabled === false ? 'None' : prop.enabled).toString() + '"></Group>';
                }
              }
              try {
                if (prop.matchName === 'ADBE Glo2') {
                  try {
                    $.layer.glowtype = prop.property('ADBE Glo2-0007').value;
                  } catch (err) {
                    $.layer.errorInfoArr.push({ line: $.line, error: err });
                  }
                }

                try {
                  var currentXml = new XML(text);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }

                $.layer.prototype.addToLastChild(layerxml, currentXml, prop.propertyDepth, []);
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              arguments.callee(prop, layerxml, layerInfo);
            }
          }
        }
      }
      return layerxml;
    },

    addToLastChild: function (xml, str, propertyDepth, arrLen) {
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

    getProperty: function (thisProperty) {
      var text;
      if (thisProperty.numKeys !== 0) {
        var keyTime = [];
        var keyValue = [];
        var propi;
        var propxml;
        if (thisProperty.valueAtTime(0, true) instanceof Shape === false && thisProperty.matchName !== 'ADBE Marker' && thisProperty.matchName !== 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            keyTime.push(thisProperty.keyTime(propi));
            keyValue.push(thisProperty.keyValue(propi));
          }
          propxml.keyValue = keyValue;
          propxml.keyTime = keyTime;
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString();
        } else if (thisProperty.valueAtTime(0, true) instanceof Shape === true) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          propxml.keyValue = 0;
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'));
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<shapeValue></shapeValue>';
            var shapexml = new XML(text);
            keyTime.push(thisProperty.keyTime(propi));
            var closed = XML('<closed>' + thisProperty.keyValue(propi).closed + '</closed>');
            var vertices = XML('<vertices>' + thisProperty.keyValue(propi).vertices.toString() + '</vertices>');
            var inTan = XML('<inTan>' + thisProperty.keyValue(propi).inTangents.toString() + '</inTan>');
            var outTan = XML('<outTan>' + thisProperty.keyValue(propi).outTangents.toString() + '</outTan>');
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
        } else if (thisProperty.matchName === 'ADBE Marker') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          propxml.keyValue = 0;
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'));
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<markerValue></markerValue>';
            var markxml = new XML(text);
            keyTime.push(thisProperty.keyTime(propi));
            var comment = XML('<comment>' + thisProperty.keyValue(propi).comment + '</comment>');
            var duration = XML('<duration>' + thisProperty.keyValue(propi).duration.toString() + '</duration>');
            var chapter = XML('<chapter>' + thisProperty.keyValue(propi).chapter.toString() + '</chapter>');
            var cuePointName = XML('<cuePointName>' + thisProperty.keyValue(propi).cuePointName.toString() + '</cuePointName>');
            var eventCuePoint = XML('<eventCuePoint>' + thisProperty.keyValue(propi).eventCuePoint.toString() + '</eventCuePoint>');
            var url = XML('<url>' + thisProperty.keyValue(propi).url.toString() + '</url>');
            var frameTarget = XML('<frameTarget>' + thisProperty.keyValue(propi).frameTarget.toString() + '</frameTarget>');
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
        } else if (thisProperty.matchName === 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          propxml = new XML(text);
          propxml.keyValue = 0;
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'));
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<textValue></textValue>';
            var textxml = new XML(text);
            keyTime.push(thisProperty.keyTime(propi));
            text = XML('<text>' + thisProperty.keyValue(propi).text + '</text>');
            var font = XML('<font>' + thisProperty.keyValue(propi).font.toString() + '</font>');
            var fontSize = XML('<fontSize>' + thisProperty.keyValue(propi).fontSize.toString() + '</fontSize>');
            var applyFill = XML('<applyFill>' + thisProperty.keyValue(propi).applyFill.toString() + '</applyFill>');
            var applyStroke = XML('<applyStroke>' + thisProperty.keyValue(propi).applyStroke.toString() + '</applyStroke>');
            var fillColor = XML('<fillColor>' + (thisProperty.keyValue(propi).applyFill === true ? thisProperty.keyValue(propi).fillColor.toString() : 'None').toString() + '</fillColor>');
            var strokeColor = XML('<strokeColor>' + (thisProperty.keyValue(propi).applyStroke === true ? thisProperty.keyValue(propi).strokeColor.toString() : 'None').toString() + '</strokeColor>');
            var strokeOverFill = XML('<strokeOverFill>' + thisProperty.keyValue(propi).strokeOverFill.toString() + '</strokeOverFill>');
            var strokeWidth = XML('<strokeWidth>' + thisProperty.keyValue(propi).strokeWidth.toString() + '</strokeWidth>');
            var justification = XML('<justification>' + thisProperty.keyValue(propi).justification.toString() + '</justification>');
            var tracking = XML('<tracking>' + thisProperty.keyValue(propi).tracking.toString() + '</tracking>');
            var pointText = XML('<pointText>' + thisProperty.keyValue(propi).pointText.toString() + '</pointText>');
            var boxText = XML('<boxText>' + thisProperty.keyValue(propi).boxText.toString() + '</boxText>');
            var boxTextSize;
            if (thisProperty.keyValue(propi).boxText === true) {
              boxTextSize = XML('<boxTextSize>' + thisProperty.keyValue(propi).boxTextSize.toString() + '</boxTextSize>');
            } else {
              boxTextSize = XML('<boxTextSize>None</boxTextSize>');
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
        if (thisProperty.matchName !== 'ADBE Marker' && thisProperty.matchName !== 'ADBE Text Document') {
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            var ease = '<Ease></Ease>';
            var easexml = new XML(ease);
            try {
              easexml.keyInSpatialTangent = thisProperty.keyInSpatialTangent(propi);
              easexml.keyOutSpatialTangent = thisProperty.keyOutSpatialTangent(propi);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            if (thisProperty.keyInTemporalEase(1).length === 1) {
              easexml.InSpeed = thisProperty.keyInTemporalEase(propi)[0].speed;
              easexml.InIn = thisProperty.keyInTemporalEase(propi)[0].influence;
              easexml.OutSpeed = thisProperty.keyOutTemporalEase(propi)[0].speed;
              easexml.OutIn = thisProperty.keyOutTemporalEase(propi)[0].influence;
            } else if (thisProperty.keyInTemporalEase(1).length === 2) {
              easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed];
              easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence];
              easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed];
              easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence];
            } else if (thisProperty.keyInTemporalEase(1).length === 3) {
              easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed, thisProperty.keyInTemporalEase(propi)[2].speed];
              easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence, thisProperty.keyInTemporalEase(propi)[2].influence];
              easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed, thisProperty.keyOutTemporalEase(propi)[2].speed];
              easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence, thisProperty.keyOutTemporalEase(propi)[2].influence];
            }
            try {
              easexml.inInterType = thisProperty.keyInInterpolationType(propi);
              easexml.outInterType = thisProperty.keyOutInterpolationType(propi);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              easexml.isRoving = thisProperty.keyRoving(propi);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            propxml.appendChild(easexml);
          }
        }
        if (thisProperty.expression !== '') {
          propxml.exp = encodeURIComponent(thisProperty.expression).toString();
          propxml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
        }
      } else {
        if (thisProperty.valueAtTime(0, true) instanceof Shape === false && thisProperty.matchName !== 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="0">' + thisProperty.valueAtTime(0, true).toString() + '</prop>';
          propxml = new XML(text);
          if (thisProperty.expression !== '') {
            propxml.exp = encodeURIComponent(thisProperty.expression).toString();
            propxml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
          }
        } else if (thisProperty.valueAtTime(0, true) instanceof Shape === true) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          shapexml = new XML(text);
          shapexml.closed = thisProperty.valueAtTime(0, true).closed;
          shapexml.vertices = thisProperty.valueAtTime(0, true).vertices.toString();
          shapexml.inTan = thisProperty.valueAtTime(0, true).inTangents.toString();
          shapexml.outTan = thisProperty.valueAtTime(0, true).outTangents.toString();
          if (thisProperty.expression !== '') {
            shapexml.exp = encodeURIComponent(thisProperty.expression).toString();
            shapexml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
          }
          propxml = shapexml;
        } else if (thisProperty.matchName === 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>';
          textxml = new XML(text);
          textxml.text = (thisProperty.valueAtTime(0, true).text === undefined ? 'None' : thisProperty.valueAtTime(0, true).text).toString();
          textxml.font = thisProperty.valueAtTime(0, true).font.toString();
          textxml.fontSize = thisProperty.valueAtTime(0, true).fontSize.toString();
          textxml.applyFill = thisProperty.valueAtTime(0, true).applyFill.toString();
          textxml.applyStroke = thisProperty.valueAtTime(0, true).applyStroke.toString();
          textxml.fillColor = (thisProperty.valueAtTime(0, true).applyFill === true ? thisProperty.valueAtTime(0, true).fillColor.toString() : 'None').toString();
          textxml.strokeColor = (thisProperty.valueAtTime(0, true).applyStroke === true ? thisProperty.valueAtTime(0, true).strokeColor.toString() : 'None').toString();
          textxml.strokeOverFill = thisProperty.valueAtTime(0, true).strokeOverFill.toString();
          textxml.strokeWidth = thisProperty.valueAtTime(0, true).strokeWidth.toString();
          textxml.justification = thisProperty.valueAtTime(0, true).justification.toString();
          textxml.tracking = thisProperty.valueAtTime(0, true).tracking.toString();
          textxml.pointText = thisProperty.valueAtTime(0, true).pointText.toString();
          textxml.boxText = thisProperty.valueAtTime(0, true).boxText.toString();
          textxml.boxTextSize = (thisProperty.valueAtTime(0, true).boxText === true ? thisProperty.valueAtTime(0, true).boxTextSize.toString() : 'None').toString();
          if (thisProperty.expression !== '') {
            textxml.exp = encodeURIComponent(thisProperty.expression).toString();
            textxml.expEn = encodeURIComponent(thisProperty.expressionEnabled).toString();
          }
          propxml = textxml;
        }
      }
      return propxml;
    },

    getXmlFromLayer: function (index) {
      var thisLayer = this.item;

      var layerInfo = this.getLayerAttr(index);

      var layerPropertiesXml = this.getProperties(thisLayer, new XML('<Properties></Properties>'), layerInfo);

      layerInfo.appendChild(layerPropertiesXml);

      return layerInfo;
    },

    // recuisive get all xmls from selected layers, support comp layer
    toXML: function (elementName, helperObj) {
      var layers = this.item;
      var comp;
      if (layers instanceof Array) {
        comp = layers[0].containingComp;
      } else {
        comp = layers[1].containingComp;
      }

      elementName = elementName || 'Default';
      helperObj = helperObj || {};
      helperObj['_' + comp.id] = helperObj['_' + comp.id] || {};
      helperObj['elementArr'] = helperObj['elementArr'] || [];

      var elementArr = helperObj.elementArr;
      var elementxml;
      if (elementArr.length === 0) {
        elementxml = new XML('<Element name="' + elementName + '"></Element>');
      } else {
        elementxml = new XML('<Comptent name="' + elementName + '"></Comptent>');
      }

      var options = {
        isSaveMaterial: this.isSaveMaterial
      };

      var loopFunc = function (thisLayer, index) {
        var thisIndex = elementArr.length === 0 ? index + 1 : index;
        var xml = $.layer(thisLayer, options).getXmlFromLayer(thisIndex);

        if (thisLayer.source instanceof CompItem) {
          if (helperObj.hasOwnProperty('_' + thisLayer.source.id)) {
            var elementxmltemp = helperObj['_' + thisLayer.source.id]['ele'];
            xml.Properties.appendChild(elementxmltemp);
          } else {
            elementArr.push(elementxml);
            var comptentXml = $.layer(thisLayer.source.layers, options, helperObj).toXML(encodeURIComponent(thisLayer.source.name), helperObj);

            xml.Properties.appendChild(comptentXml);
            elementxml = elementArr.pop();
          }
        }
        elementxml.appendChild(xml);
      };
      if (elementArr.length === 0) {
        $.layer.forEach.call(layers, loopFunc);
      } else {
        $.layer.forEachLayer.call(layers, loopFunc);
      }

      if (elementArr.length !== 0) {
        var cTemp = new XML(elementxml);
        for (var i = 0; i < cTemp.children().length(); i++) {
          cTemp.child(i).setChildren(1);
        }
        helperObj['_' + comp.id]['ele'] = cTemp;
      }

      return elementxml;
    }

  });

  $.layer.extend($.layer.prototype, {

    newLayer: function (xml, thisComp) {
      var layer;

      if (xml['@type'] === 'Solid' || xml['@type'] === 'VideoWithSound' || xml['@type'] === 'VideoWithoutSound' || xml['@type'] === 'Comp') {
        var solidcolor = [xml.solidColor.toString().split(',')[0], xml.solidColor.toString().split(',')[1], xml.solidColor.toString().split(',')[2]];
        if (xml.solidColor.toString() !== '') {
          layer = thisComp.layers.addSolid(solidcolor, decodeURIComponent(xml['@name']), parseInt(xml.width), parseInt(xml.height), 1);
        } else if (xml['@type'] === 'Comp') {
          layer = this.newComp(xml, thisComp);
        } else if (xml['@type'] === 'VideoWithSound' || xml['@type'] === 'VideoWithoutSound') {
          layer = this.newMaterial(xml, thisComp);
        }
      } else if (xml['@type'] === 'Text') {
        layer = xml.textType.toString() === 'point' ? thisComp.layers.addText() : thisComp.layers.addBoxText([xml.boxSize.toString().split(',')[0], xml.boxSize.toString().split(',')[1]]);
      } else if (xml['@type'] === 'Shape') {
        layer = thisComp.layers.addShape();
      } else if (xml['@type'] === 'null') {
        layer = thisComp.layers.addNull();
      } else if (xml['@type'] === 'Light') {
        layer = thisComp.layers.addLight(decodeURIComponent(xml['@name']), [0, 0]);
        layer.lightType = $.layer.getDistance(layer.lightType, parseInt(xml.light));
      } else if (xml['@type'] === 'Camera') {
        layer = thisComp.layers.addCamera(decodeURIComponent(xml['@name']), [0, 0]);
      }

      try {
        layer.name = decodeURIComponent(xml['@name']);

        if (layer.index !== parseInt(xml.index)) {
          layer.moveAfter(thisComp.layer(parseInt(xml.index)));
        }

        layer.label = parseInt(xml.label.toString());

        if (xml.geoType === 'small' || xml.geoType === 'large') {
          layer.containingComp.renderer = 'ADBE Picasso';
        }

        if (xml.inPoint !== 'undefined') {
          layer.inPoint = parseFloat(xml.inPoint);
        }

        if (xml.outPoint !== 'undefined') {
          layer.outPoint = parseFloat(xml.outPoint);
        }

        if (xml.solo.toString() === 'true') {
          layer.solo = true;
        }

        if (xml.enabled.toString() === 'false') {
          layer.enabled = false;
        }

        if (xml.three.toString() === 'true') {
          layer.threeDLayer = true;
        }

        if (xml.timeRemap.toString() === 'true') {
          layer.timeRemapEnabled = true;
        }

        if (xml.collapseTransformation.toString() === 'true' && layer.canSetCollapseTransformation === true) {
          layer.collapseTransformation = true;
        }

        if (xml.audioEnabled.toString() === 'false') {
          layer.audioEnabled = false;
        }

        if (xml.trackMatteType !== 'undefined') {
          layer.trackMatteType = $.layer.getDistance(layer.trackMatteType, parseInt(xml.trackMatteType));
        }

        if (xml.shy.toString() === 'true') {
          layer.shy = true;
        }

        if (xml.motionBlur.toString() === 'true') {
          layer.motionBlur = true;
        }

        if (xml.guideLayer.toString() === 'true') {
          layer.guideLayer = true;
        }

        if (xml.environmentLayer.toString() === 'true') {
          layer.environmentLayer = true;
        }

        if (xml.adjustmentLayer.toString() === 'true') {
          layer.adjustmentLayer = true;
        }

        if (xml.blendingMode.toString() !== 'undefined') {
          layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode));
        }

        if (xml.autoOrient.toString() !== 'undefined') {
          layer.autoOrient = $.layer.getDistance(layer.autoOrient, parseInt(xml.autoOrient));
        }

        if (xml.preserveTransparency.toString() === 'true') {
          layer.preserveTransparency = true;
        }

        if (xml.separated.toString() === 'true') {
          layer.property('ADBE Transform Group')('ADBE Position').dimensionsSeparated = true;
        }
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err });
      }

      if (xml['@type'] !== 'VideoWithSound') {
        try {
          $.layer.prototype.newPropertyGroup(xml.Properties, layer);
        } catch (err) {
          $.layer.errorInfoArr.push({ line: $.line, error: err });
        }
      }

      return layer;
    },

    newComp: function (xml, thisComp) {
      var layer;
      var thisItem;

      if (xml['@type'] === 'Comp') {
        var isComp = false;

        if (xml['@type'] === 'Comp') {
          for (var isA = 0; isA < app.project.numItems; isA++) {
            if (app.project.item(isA + 1) instanceof CompItem && app.project.item(isA + 1).name === decodeURIComponent(xml.compname.toString())) {
              if (app.project.item(isA + 1).numLayers === xml.Properties.Comptent.children().length()) {
                thisItem = app.project.item(isA + 1);
                isComp = true;
                var zhuan = false;
                for (var isB = 0; isB < app.project.item(isA + 1).numLayers; isB++) {
                  zhuan = true;
                  if (app.project.item(isA + 1).layer(isB + 1).name !== decodeURIComponent(xml.Properties.Comptent.child(isB)['@name'])) {
                    isComp = false;
                  }
                }
                if (isComp === true && zhuan === true) {
                  break;
                }
              }
            }
          }
        }

        if (isComp === true) {
          layer = thisComp.layers.add(thisItem);
        } else {
          var comp = app.project.items.addComp(decodeURIComponent(xml.compname.toString()), parseInt(xml.compwidth), parseInt(xml.compheight), parseFloat(xml.comppixelAspect), parseFloat(xml.compduration), parseFloat(xml.compframeRate));

          try {
            if (comp.id !== app.project.activeItem.id) {
              comp.parentFolder = $.layer.compFolder;
            }

            comp.frameDuration = parseFloat(xml.frameDuration);

            if (xml.dropFrame.toString() === 'true') {
              comp.dropFrame = true;
            }

            comp.workAreaStart = parseFloat(xml.workAreaStart);

            /* ignore */
            try {
              comp.workAreaDuration = parseFloat(xml.workAreaDuration);
            } catch (err) {}

            if (xml.hideShyLayers.toString() === 'true') {
              comp.hideShyLayers = true;
            }

            if (xml.motionBlur.toString() === 'true') {
              comp.motionBlur = true;
            }

            if (xml.draft3d.toString() === 'true') {
              comp.draft3d = true;
            }

            if (xml.preserveNestedFrameRate.toString() === 'true') {
              comp.preserveNestedFrameRate = true;
            }

            if (xml.preserveNestedResolution.toString() === 'true') {
              comp.preserveNestedResolution = true;
            }

            var arr = xml.bgColor.toString().split(',');
            comp.bgColor = [parseFloat(arr[0]), parseFloat(arr[1]), parseFloat(arr[2])];

            comp.resolutionFactor = [parseInt(xml.resolutionFactor.toString().split(',')[0]), parseInt(xml.resolutionFactor.toString().split(',')[1])];

            comp.shutterAngle = parseFloat(xml.shutterAngle);

            comp.shutterPhase = parseFloat(xml.shutterPhase);

            comp.motionBlurSamplesPerFrame = parseInt(xml.motionBlurSamplesPerFrame);

            comp.motionBlurAdaptiveSampleLimit = parseInt(xml.motionBlurAdaptiveSampleLimit);

            if (xml.renderer.toString() !== 'ADBE Advanced 3d') {
              comp.renderer = xml.renderer.toString();
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          try {
            layer = thisComp.layers.add(comp);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }

        try {
          layer.strectch = parseFloat(xml.stretch);

          if (xml.startTime.toString() !== 'undefined') {
            layer.startTime = parseFloat(xml.startTime);
          }
        } catch (err) {
          $.layer.errorInfoArr.push({ line: $.line, error: err });
        }

        if (isComp === false) {
          try {
            $.layer.prototype.toLayer(comp, xml.Properties.Comptent);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }
      }
      return layer;
    },

    newMaterial: function (xml, thisComp) {
      var isExist = false;
      var waitIm;
      var thisItem;
      var layer;
      if (xml['@type'] === 'VideoWithSound' || xml['@type'] === 'VideoWithoutSound') {
        for (var isA = 0; isA < app.project.numItems; isA++) {
          var type = typeof app.project.item(isA + 1).file;
          if (type !== 'undefiend' && app.project.item(isA + 1).file !== null) {
            if (File(app.project.item(isA + 1).file).toString() === File(xml.file.toString()).toString() || File(app.project.item(isA + 1).file.toString()).toString() === File($.layer.tempFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString())).toString()) {
              isExist = true;
              thisItem = app.project.item(isA + 1);
              break;
            }
          }
        }
      }

      var isVideo = xml['@type'] === 'VideoWithSound' || xml['@type'] === 'VideoWithoutSound';
      if (isVideo && isExist) {
        layer = thisComp.layers.add(thisItem);

        layer.strectch = parseFloat(xml.stretch);

        if (xml.startTime !== 'undefined') {
          layer.startTime = parseFloat(xml.startTime);
        }
      }

      try {
        if (isVideo && !isExist) {
          try {
            try {
              var genFileFolder;
              var genFilePath;
              if (File(xml.file.toString()).exists) {
                waitIm = File(xml.file.toString());
              } else if (File($.layer.tempFolder.toString() + $.layer.slash + decodeURIComponent(File(xml.file.toString()).toString())).exists) {
                if (decodeURIComponent(File(xml.file.toString()).toString())[0] === '~') {
                  genFilePath = File(genFileFolder.toString() + $.layer.slash + 'D' + decodeURIComponent(File(xml.file.toString()).toString()));
                } else {
                  genFilePath = File(genFileFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString()));
                }
                waitIm = genFilePath;
              } else if (xml.fileBin.toString() !== '') {
                try {
                  if ($.layer.arrayIndexOf($.layer.pictureType, xml.file.toString().split('.').slice(-1)) !== -1) {
                    genFileFolder = Folder($.layer.tempFolder);
                    if (!genFileFolder.exists) {
                      genFileFolder.create();
                    }
                    if (decodeURIComponent(File(xml.file.toString()).toString())[0] === '~') {
                      genFilePath = File(genFileFolder.toString() + $.layer.slash + 'D' + decodeURIComponent(File(xml.file.toString()).toString()));
                    } else {
                      genFilePath = File(genFileFolder.toString() + $.layer.slash + decodeURIComponent(File(xml.file.toString()).toString()));
                    }
                    if (!genFilePath.parent.exists) {
                      genFilePath.parent.create();
                    }

                    var waitToWrite = decodeURIComponent(xml.fileBin.toString());

                    if (!genFilePath.exists || genFilePath.exists && genFilePath.length !== waitToWrite.length) {
                      if (!genFilePath.parent.exists) {
                        genFilePath.create();
                      }
                      if (!genFilePath.parent.exists) {
                        genFilePath = File($.layer.tempFolder.toString() + $.layer.slash + decodeURIComponent(File(xml.file.toString()).name.toString()));
                      }

                      genFilePath.open('w');
                      genFilePath.encoding = 'BINARY';
                      genFilePath.write(waitToWrite);
                      genFilePath.close();
                    }
                  } else if ($.layer.arrayIndexOf($.layer.musicType, xml.file.toString().split('.').slice(-1)) !== -1) {
                    genFileFolder = Folder($.layer.tempFolder);
                    if (!genFileFolder.exists) {
                      genFileFolder.create();
                    }
                    if (decodeURIComponent(File(xml.file.toString()).toString())[0] === '~') {
                      genFilePath = File(genFileFolder.toString() + $.layer.slash + 'D' + decodeURIComponent(File(xml.file.toString()).toString()));
                    } else {
                      genFilePath = File(genFileFolder.toString() + +$.layer.slash + decodeURIComponent(File(xml.file.toString()).toString()));
                    }
                    if (!genFilePath.parent.exists) {
                      genFilePath.parent.create();
                    }
                    waitToWrite = decodeURIComponent(xml.fileBin.toString());
                    if (!genFilePath.exists || genFilePath.exists && genFilePath.length !== waitToWrite.length) {
                      if (!genFilePath.parent.exists) {
                        genFilePath.create();
                      }
                      if (!genFilePath.parent.exists) {
                        genFilePath = File($.layer.tempFolder + $.layer.slash + decodeURIComponent(File(xml.file.toString()).name.toString()));
                      }
                      genFilePath.open('w');
                      genFilePath.encoding = 'BINARY';
                      genFilePath.write(waitToWrite);
                      genFilePath.close();
                    }
                  }
                  waitIm = genFilePath;
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              var im = new ImportOptions();
              im.file = waitIm;
              try {
                im.sequence = false;
                im.forceAlphabetical = false;
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
              layer = thisComp.layers.addSolid([0, 0, 0], 'fail to import', 100, 100, 1);
              return layer;
            }
            if (im.canImportAs(ImportAsType.FOOTAGE)) {
              im.importAs = ImportAsType.FOOTAGE;
              var f = app.project.importFile(im);
              layer = thisComp.layers.add(f);
              layer.name = decodeURIComponent(xml['@name']);
              try {
                layer.moveAfter(thisComp.layer(parseInt(xml.index)));
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              };
              try {
                layer.strectch = parseFloat(xml.stretch);
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              try {
                if (xml.startTime !== 'undefined') {
                  layer.startTime = parseFloat(xml.startTime);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              layer.source.parentFolder = $.layer.sourceFolder;
            } else {
              layer = thisComp.layers.addSolid([0, 0, 0], 'fail to import', 100, 100, 1);
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err });
      }
      try {
        if (layer instanceof AVLayer) {
          return layer;
        } else {
          layer = thisComp.layers.addSolid([0, 0, 0], 'fail to import', 100, 100, 1);
          return layer;
        }
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err });
        layer = thisComp.layers.addSolid([0, 0, 0], 'fail to import', 100, 100, 1);
        return layer;
      }
    },

    newPropertyGroup: function (xml, layers, inTime) {
      for (var addi = 0; addi < xml.children().length(); addi++) {
        var currentXML = xml.child(addi);
        var matchName = currentXML['@matchName'].toString();
        var propName = currentXML['@name'].toString();
        var propIndex = parseInt(currentXML['@propertyIndex']);
        if (currentXML['@isEncoded'].toString() !== '') {
          var obj = {
            matchName: matchName,
            propName: propName
          };
          $.layer.decode(obj);
          matchName = obj.matchName;
        }
        var prop;
        if (currentXML.name() === 'Group') {
          prop = 0;
          try {
            if (layers.canAddProperty(matchName)) {
              try {
                prop = layers.addProperty(matchName);

                if (layers.property(propIndex).matchName === 'ADBE Mask Atom') {
                  layers.property(propIndex).maskMode = $.layer.getDistance(layers.property(propIndex).maskMode, parseInt(currentXML['@maskmode']));
                  layers.property(propIndex).inverted = currentXML['@inverted'].toString() !== 'false';
                  layers.property(propIndex).rotoBezier = currentXML['@rotoBezier'].toString() !== 'false';
                  layers.property(propIndex).color = [currentXML['@color'].toString().split(',')[0], currentXML['@color'].toString().split(',')[1], currentXML['@color'].toString().split(',')[2]];
                  layers.property(propIndex).maskMotionBlur = $.layer.getDistance(layers.property(propIndex).maskMotionBlur, parseInt(currentXML['@maskMotionBlur']));
                  layers.property(propIndex).maskFeatherFalloff = $.layer.getDistance(layers.property(propIndex).maskFeatherFalloff, parseInt(currentXML['@maskFeatherFalloff']));
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } else if (currentXML['@matchName'].toString() === 'ADBE Layer Styles') {
              try {
                var group = currentXML.children();
                var layerStyleArr = [];
                var cunName = [];
                var shenqi;
                for (shenqi = 0; shenqi < group.length(); shenqi++) {
                  layerStyleArr.push(currentXML.child(shenqi)['@matchName']);
                  cunName.push(currentXML.child(shenqi)['@name']);
                }
                for (shenqi = 0; shenqi < layerStyleArr.length; shenqi++) {
                  if (layerStyleArr[shenqi].indexOf('/') !== -1) {
                    if (layers.propertyDepth === 0) {
                      if (layers.containingComp.id === app.project.activeItem.id) {
                        app.executeCommand(app.findMenuCommandId(cunName[shenqi]));
                      }
                    } else if (layers.propertyGroup(layers.propertyDepth).containingComp.id === app.project.activeItem.id) {
                      app.executeCommand(app.findMenuCommandId(cunName[shenqi]));
                    }
                  }
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          try {
            if (currentXML['@enabled'] !== 'None') {
              if (layers.property(propIndex).canSetEnabled === true) {
                if (prop === 0) {
                  if (currentXML['@enabled'] === 'false') {
                    layers.property(propIndex).enabled = false;
                  }
                } else {
                  if (currentXML['@enabled'] === 'false') {
                    layers.property(parseInt(prop.propertyIndex)).enabled = false;
                  }
                }
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          try {
            if (prop === 0) {
              if (layers.propertyType === PropertyType.INDEXED_GROUP) {
                layers.property(propIndex).name = propName;
              }
            } else {
              if (layers.propertyType === PropertyType.INDEXED_GROUP) {
                layers.property(prop.propertyIndex).name = propName;
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }

          try {
            if (currentXML.children().length() > 0) {
              if (prop === 0 && currentXML['@matchName'] !== 'ADBE Mask Parade' && currentXML['@matchName'] !== 'ADBE Effect Parade' && currentXML['@matchName'] !== 'ADBE Layer Styles') {
                $.layer.prototype.newPropertyGroup(currentXML, layers.property(propIndex), inTime);
              } else {
                if (currentXML['@matchName'] !== 'ADBE Mask Parade' && currentXML['@matchName'] !== 'ADBE Effect Parade' && currentXML['@matchName'] !== 'ADBE Layer Styles') {
                  $.layer.prototype.newPropertyGroup(currentXML, layers.property(prop.propertyIndex), inTime);
                } else {
                  $.layer.prototype.newPropertyGroup(currentXML, layers.property(matchName), inTime);
                }
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else if (currentXML.name() === 'prop') {
          try {
            $.layer.prototype.newProperty(currentXML, layers, inTime);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }

        if (currentXML.name() === 'prop') {
          if (currentXML.exp.toString() !== '') {
            try {
              var expArr = [];

              var expProperty = layers.property(matchName);

              expArr.push(expProperty.propertyIndex);
              for (var i = 1, len = expProperty.propertyDepth; i < len; i++) {
                expArr.push(expProperty.propertyGroup(i).propertyIndex);
              }
              expArr.push(expProperty.propertyGroup(i));

              $.layer.expPropertyArr.push(expArr);

              expProperty.expression = decodeURIComponent(currentXML.exp.toString());
            } catch (err) {
              /* ignore */
              // ~                             $.layer.errorInfoArr.push({line:$.line,error:err});
            };
          }
        }
      }
    },

    newProperty: function (xml, layers, inTime) {
      var matchName = xml['@matchName'].toString();
      var isNotText = layers.property(matchName).matchName !== 'ADBE Text Document';
      var isNotMarker = layers.property(matchName).matchName !== 'ADBE Marker';
      var isNotMaskShape = layers.property(matchName).matchName !== 'ADBE Mask Shape';
      var isNotVectorShape = layers.property(matchName).matchName !== 'ADBE Vector Shape';
      var isNotTextAnimatorProp = layers.matchName !== 'ADBE Text Animator Properties';
      var isNotDash = layers.matchName !== 'ADBE Vector Stroke Dashes';
      if (isNotText && isNotMarker && isNotMaskShape && isNotVectorShape) {
        if (!isNotTextAnimatorProp || !isNotDash) {
          if (layers.canAddProperty(matchName)) {
            layers.addProperty(matchName);
          }
        }
        if (xml['@key'] === 0) {
          var value = [];
          if (xml.child(0).toString().split(',').length > 1) {
            for (var ia = 0; ia < xml.child(0).toString().split(',').length; ia++) {
              value.push(xml.child(0).toString().split(',')[ia]);
            }
          } else {
            value = parseFloat(xml.child(0).toString());
          }
          try {
            layers.property(matchName).setValue(value);
          } catch (err) {
            /* ignore */
            if (err.toString().indexOf('hidden') === -1) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
          try {
            var a = layers.property(matchName).propertyValueType.toString();
            if (a.indexOf('17') !== -1 || a.indexOf('21') !== -1 || a.indexOf('22') !== -1) {
              $.layer.layerTypePropertyArr.push(layers.property(matchName));
              $.layer.layerTypePropertyValueArr.push(value);
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else {
          var values = [];
          var valueTemp = [];
          var times = [];
          var div = xml.keyTime.toString().split(',');
          var vas = xml.keyValue.toString().split(',');
          var ib;
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ia = 0; ia < div.length; ia++) {
            for (ib = 0; ib < vas.length / div.length; ib++) {
              valueTemp.push(xml.keyValue.toString().split(',')[ia * vas.length / div.length + ib]);
            }
            values.push(valueTemp);
            valueTemp = [];
          }
          try {
            layers.property(matchName).setValuesAtTimes(times, values);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          var outIn = [];
          var len = xml.keyTime.toString().split(',').length;
          for (ia = 0; ia < len; ia++) {
            var myScaleProperty = layers.property(matchName);

            try {
              var type = $.layer.getDistance(myScaleProperty.propertyValueType, parseInt(xml.inType.split(',')[0]));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }

            var clamp = parseFloat(xml.child(ia + 4).InIn);
            clamp = $.layer.clampInfluence(clamp);
            var easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);

            var clampb = parseFloat(xml.child(ia + 4).OutIn);
            clampb = $.layer.clampInfluence(clampb);
            var easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);

            try {
              var inSpatialArr = xml.child(ia + 4).keyInSpatialTangent.toString().split(',');
              var outSpatialArr = xml.child(ia + 4).keyOutSpatialTangent.toString().split(',');
              if (type === PropertyValueType.TwoD_SPATIAL) {
                myScaleProperty.setSpatialTangentsAtKey(ia + 1, inSpatialArr, outSpatialArr);
              } else if (type === PropertyValueType.ThreeD_SPATIAL) {
                if (inSpatialArr.length === 3 && outSpatialArr.length === 3) {
                  myScaleProperty.setSpatialTangentsAtKey(ia + 1, inSpatialArr, outSpatialArr);
                }
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.TwoD && $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.ThreeD) {
                clamp = parseFloat(xml.child(ia + 4).InIn);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);

                clampb = parseFloat(xml.child(ia + 4).OutIn);
                clampb = $.layer.clampInfluence(clampb);

                easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.TwoD) {
                clamp = parseFloat(xml.child(ia + 4).InIn.toString().split(',')[0]);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(',')[0]), clamp);

                clampb = parseFloat(xml.child(ia + 4).OutIn.toString().split(',')[0]);
                clampb = $.layer.clampInfluence(clampb);
                easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(',')[0]), clampb);

                var clamp1 = parseFloat(xml.child(ia + 4).InIn.toString().split(',')[1]);
                clamp1 = $.layer.clampInfluence(clamp1);
                var easeIn1 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(',')[1]), clamp1);

                var clampb1 = parseFloat(xml.child(ia + 4).OutIn.toString().split(',')[1]);
                clampb1 = $.layer.clampInfluence(clampb1);
                var easeOut1 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(',')[1]), clampb1);

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1], [easeOut, easeOut1]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.ThreeD) {
                clamp = parseFloat(xml.child(ia + 4).InIn.toString().split(',')[0]);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(',')[0]), clamp);

                clampb = parseFloat(xml.child(ia + 4).OutIn.toString().split(',')[0]);
                clampb = $.layer.clampInfluence(clampb);
                easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(',')[0]), clampb);

                clamp1 = parseFloat(xml.child(ia + 4).InIn.toString().split(',')[1]);
                clamp1 = $.layer.clampInfluence(clamp1);
                easeIn1 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(',')[1]), clamp1);

                clampb1 = parseFloat(xml.child(ia + 4).OutIn.toString().split(',')[1]);
                clampb1 = $.layer.clampInfluence(clampb1);
                easeOut1 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(',')[1]), clampb1);

                var clamp2 = parseFloat(xml.child(ia + 4).InIn.toString().split(',')[2]);
                clamp2 = $.layer.clampInfluence(clamp2);
                var easeIn2 = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed.toString().split(',')[2]), clamp2);

                var clampb2 = parseFloat(xml.child(ia + 4).OutIn.toString().split(',')[2]);
                clampb2 = $.layer.clampInfluence(clampb2);
                var easeOut2 = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed.toString().split(',')[2]), clampb2);

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1, easeIn2], [easeOut, easeOut1, easeOut2]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
              try {
                var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(xml.child(ia + 4).inInterType));
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(xml.child(ia + 4).outInterType));
                if (!isNaN(inIn) && !isNaN(outIn)) {
                  myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              try {
                if (xml.child(ia + 4).isRoving.toString() === 'true') {
                  myScaleProperty.setRovingAtKey(ia + 1, true);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      } else if (layers.property(matchName).matchName === 'ADBE Text Document') {
        if (xml['@key'] === 0) {
          try {
            value = [];
            var myText = layers.property(matchName).value;
            myText.text = xml.text.toString();
            myText.font = xml.font.toString();
            myText.fontSize = parseInt(xml.fontSize);
            myText.applyFill = xml.applyFill.toString() === 'true';
            myText.applyStroke = xml.applyStroke.toString() === 'true';
            if (xml.applyFill.toString() === 'true') {
              myText.fillColor = [xml.fillColor.toString().split(',')[0], xml.fillColor.toString().split(',')[1], xml.fillColor.toString().split(',')[2]];
            }
            if (xml.applyStroke.toString() === 'true') {
              myText.strokeColor = [xml.strokeColor.toString().split(',')[0], xml.strokeColor.toString().split(',')[1], xml.strokeColor.toString().split(',')[2]];
              myText.strokeOverFill = xml.strokeOverFill.toString();
              myText.strokeWidth = xml.strokeWidth.toString();
            }
            try {
              myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.justification));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            var nextText = myText;
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          try {
            layers.property(matchName).setValue(myText);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          try {
            layers.property(matchName).setValue(nextText);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else {
          values = [];
          valueTemp = [];
          times = [];
          div = xml.keyTime.toString().split(',');
          vas = xml.keyValue.toString().split(',');
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ib = 0; ib < div.length; ib++) {
            myText = null;
            myText = layers.property(matchName).valueAtTime(times[ib], true);
            myText.text = xml.keyValue.child(ib).text.toString();
            myText.font = xml.keyValue.child(ib).font.toString();
            myText.fontSize = parseInt(xml.keyValue.child(ib).fontSize);
            myText.applyFill = xml.keyValue.child(ib).applyFill.toString() === 'true';
            myText.applyStroke = xml.keyValue.child(ib).applyStroke.toString() === 'true';
            if (xml.keyValue.child(ib).applyFill.toString() === 'true') {
              myText.fillColor = [xml.keyValue.child(ib).fillColor.toString().split(',')[0], xml.keyValue.child(ib).fillColor.toString().split(',')[1], xml.keyValue.child(ib).fillColor.toString().split(',')[2]];
            }
            if (xml.keyValue.child(ib).applyStroke.toString() === 'true') {
              myText.strokeColor = [xml.keyValue.child(ib).strokeColor.toString().split(',')[0], xml.keyValue.child(ib).strokeColor.toString().split(',')[1], xml.keyValue.child(ib).strokeColor.toString().split(',')[2]];
              myText.strokeOverFill = xml.keyValue.child(ib).strokeOverFill.toString();
              myText.strokeWidth = xml.keyValue.child(ib).strokeWidth.toString();
            }
            try {
              myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.keyValue.child(ib).justification));
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            nextText = myText;
            try {
              layers.property(matchName).setValueAtTime(times[ib], myText);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
            try {
              layers.property(matchName).setValueAtTime(times[ib], nextText);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      } else if (!isNotMarker) {
        if (xml['@key'] === 0) {} else {
          values = [];
          valueTemp = [];
          times = [];
          div = xml.keyTime.toString().split(',');
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ib = 0; ib < div.length; ib++) {
            var myMarker = new MarkerValue('zhanwei');
            myMarker.comment = xml.keyValue.child(ib).comment.toString();
            myMarker.duration = xml.keyValue.child(ib).duration.toString();
            myMarker.chapter = xml.keyValue.child(ib).chapter.toString();
            myMarker.cuePointName = xml.keyValue.child(ib).cuePointName.toString();
            myMarker.eventCuePoint = xml.keyValue.child(ib).eventCuePoint.toString();
            myMarker.url = xml.keyValue.child(ib).url.toString();
            myMarker.frameTarget = xml.keyValue.child(ib).frameTarget.toString();
            try {
              layers.property(matchName).setValueAtTime(times[ib], myMarker);
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      } else if (!isNotMaskShape || !isNotVectorShape) {
        if (xml['@key'] === '0') {
          var myShape = new Shape();
          var vertsArr = [];
          var inTanArr = [];
          var outTanArr = [];
          var verts = xml.vertices.toString().split(',');
          var inTan = xml.inTan.toString().split(',');
          var outTan = xml.outTan.toString().split(',');
          for (var ic = 0; ic < verts.length / 2; ic++) {
            vertsArr.push([verts[ic * 2], verts[ic * 2 + 1]]);
            inTanArr.push([inTan[ic * 2], inTan[ic * 2 + 1]]);
            outTanArr.push([outTan[ic * 2], outTan[ic * 2 + 1]]);
          }
          myShape.vertices = vertsArr;
          myShape.inTangents = inTanArr;
          myShape.outTangents = outTanArr;
          myShape.closed = xml.closed === true;
          try {
            layers.property(matchName).setValue(myShape);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else {
          myShape = new Shape();
          vertsArr = [];
          inTanArr = [];
          outTanArr = [];
          times = [];
          var shapes = [];
          div = xml.keyTime.toString().split(',');
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia]);
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime));
            }
          }
          for (ic = 0; ic < xml.keyValue.children().length(); ic++) {
            verts = xml.keyValue.child(ic).vertices.toString().split(',');
            inTan = xml.keyValue.child(ic).inTan.toString().split(',');
            outTan = xml.keyValue.child(ic).outTan.toString().split(',');
            for (ib = 0; ib < verts.length / 2; ib++) {
              vertsArr.push([verts[ib * 2], verts[ib * 2 + 1]]);
              inTanArr.push([inTan[ib * 2], inTan[ib * 2 + 1]]);
              outTanArr.push([outTan[ib * 2], outTan[ib * 2 + 1]]);
            }
            myShape = new Shape();
            myShape.vertices = vertsArr;
            myShape.inTangents = inTanArr;
            myShape.outTangents = outTanArr;
            myShape.closed = xml.keyValue.child(ic).closed === true;
            shapes.push(myShape);
            vertsArr = [];
            inTanArr = [];
            outTanArr = [];
          }
          try {
            layers.property(matchName).setValuesAtTimes(times, shapes);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
          outIn = [];
          len = xml.keyTime.toString().split(',').length;
          for (ia = 0; ia < len; ia++) {
            clamp = parseFloat(xml.child(ia + 4).InIn);
            clamp = $.layer.clampInfluence(clamp);
            easeIn = new KeyframeEase(parseFloat(xml.child(ia + 4).InSpeed), clamp);

            clampb = parseFloat(xml.child(ia + 4).OutIn);
            clampb = $.layer.clampInfluence(clampb);
            easeOut = new KeyframeEase(parseFloat(xml.child(ia + 4).OutSpeed), clampb);

            myScaleProperty = layers.property(matchName);
            try {
              if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.TwoD && $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.ThreeD) {
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.TwoD) {
                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn], [easeOut, easeOut]);
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.ThreeD) {
                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
              }
              try {
                inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(xml.inInterType));
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(xml.outInterType));
                myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              try {
                if (xml.isRoving.toString() === 'true') {
                  myScaleProperty.setRovingAtKey(ia + 1, true);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err });
            }
          }
        }
      }
    },

    toLayer: function (thisComp, xml) {
      xml = xml || this.item;
      var isFirstStage;
      if ($.layer.numLayers === 0) {
        isFirstStage = true;
        $.layer.clearHelperArr();
        app.beginSuppressDialogs();
      } else {
        isFirstStage = false;
      }

      var layerArr = [];

      $.layer.forEachXML(xml, function (item, index) {
        $.layer.numLayers++;
        try {
          $.layer.layerArr[$.layer.layerArr.length] = layerArr[layerArr.length] = $.layer.prototype.newLayer(item, thisComp);
        } catch (err) {
          $.layer.errorInfoArr.push(err);
        }
        $.layer.layerParentNameArr.push(item.parent.toString());
      }, this);

      if (isFirstStage === true) {
        app.endSuppressDialogs(false);
        $.layer.correctProperty();
        $.layer.fixExpression();
        $.layer.setParent();
        $.layer.writeErrorFile();
        $.layer.clearHelperArr();
      }

      return layerArr;
    }

  });

  $.layer.newProperties = function (effectxml, selectedLayers, options) {
    app.beginSuppressDialogs();

    var idArr = ['ADBE Mask Parade', 'ADBE Effect Parade', 'ADBE Transform Group', 'ADBE Material Options Group', 'ADBE Layer Styles', 'ADBE Root Vectors Group', 'ADBE Text Animators', 'ADBE Light Options Group', 'ADBE Camera Options Group'];

    var idGen = [];
    var idDel = [];

    var isCleanGroup = options.isCleanGroup;
    var isKeyframeOffset = options.isKeyframeOffset;

    var newPropertiesSettingArr = options.newPropertiesSettingArr;
    var cleanPropertiesSettingArr = options.cleanPropertiesSettingArr;

    for (var i = 1; i <= 9; i++) {
      if (newPropertiesSettingArr[i - 1] === 1) {
        idGen.push(idArr[i - 1]);
      }
      if (cleanPropertiesSettingArr[i - 1] === 1) {
        idDel.push(idArr[i - 1]);
      }
    }

    // ~Set xml ignored
    for (i = effectxml.children().length(); i >= 0; i--) {
      var xml = effectxml.child(i);
      if (xml.name() === 'Group') {
        if (xml['@matchName'] === 'ADBE Text Properties') {
          xml.child(0).setLocalName('textignore');
          if (effectxml.children().length() >= 4) {
            $.layer.lookUpInArray(xml.child(3)['@matchName'], idGen) === false && xml.child(3).setLocalName('ignore');
          }
        }
        if ($.layer.lookUpInArray(xml['@matchName'], idGen) === false) {
          xml['@matchName'] !== 'ADBE Text Properties' && xml.setLocalName('ignore');
        }
      } else {
        xml.name() === 'Comptent' && xml.setLocalName('compignore');
      }
    }

    // ~ Delete propertyGroup in layers
    if (isCleanGroup === true) {
      $.layer.forEach.call(selectedLayers, function (layer, index) {
        $.layer.forEachPropertyGroup.call(layer, function (thisGroup, index) {
          if ($.layer.lookUpInArray(thisGroup.matchName, idDel) === true) {
            if (thisGroup.matchName !== 'ADBE Layer Styles') {
              for (var i = thisGroup.numProperties; i > 0; i--) {
                try {
                  thisGroup.property(i).remove();
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            } else {
              for (i = thisGroup.numProperties; i > 0; i--) {
                try {
                  thisGroup.property(i).enabled = false;
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            }
          }
          if (thisGroup.matchName === 'ADBE Text Properties') {
            if ($.layer.lookUpInArray(thisGroup.property(4).matchName, idDel) === true) {
              for (i = thisGroup.property(4).numProperties; i > 0; i--) {
                try {
                  thisGroup.property(4).property(i).remove();
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
            }
          }
        }); // ~ ForEachPropertyGroup end
      });
      app.endSuppressDialogs(false);
    }

    $.layer.forEach.call(selectedLayers, function (layer, index) {
      if (isKeyframeOffset === true) {
        $.layer.prototype.newPropertyGroup(effectxml, layer, layer.inPoint);
      } else {
        $.layer.prototype.newPropertyGroup(effectxml, layer);
      }
    });
    $.layer.correctProperty();
    $.layer.fixExpression();
    $.layer.setParent();
  }; // ~Clean group and ignore end

  // correct the value of property which's type is layerIndex or maskIndex
  $.layer.correctProperty = function () {
    $.layer.forEach.call($.layer.layerTypePropertyArr, function (item, index) {
      try {
        item.setValue($.layer.layerTypePropertyValueArr[index]);
      } catch (err) {}
    });
  };

  // translate the error expressions to avoid script freezing caused by different language version of AfterEffects
  $.layer.fixExpression = function () {
    var translatedExpPropertyArr = [];

    app.beginSuppressDialogs();
    $.layer.forEach.call($.layer.expPropertyArr, function (item, index) {
      try {
        item.expressionEnabled = true;
        item.valueAtTime(0, false);
      } catch (eer) {
        translatedExpPropertyArr.push(item);
      };
    });
    app.endSuppressDialogs(false);

    var targetExpArr = [];

    for (var i = 0; i < translatedExpPropertyArr.length; i++) {
      var refArr = translatedExpPropertyArr[i];
      var prop = refArr[refArr.length - 1];
      var j = refArr.length - 1;
      while (j > 0) {
        prop = prop.property(refArr[j - 1]);
        j--;
      }
      targetExpArr.push(prop);
    }

    if (typeof $.layer.translate === 'function') {
      targetExpArr.length !== 0 && $.layer.translate(this, targetExpArr);
    }
  };

  // set the parent of layer using Layer.setParentWithJump()
  $.layer.setParent = function () {
    $.layer.forEach.call($.layer.layerArr, function (item, index) {
      try {
        if (parseInt($.layer.layerParentNameArr[index]) === $.layer.layerParentNameArr[index]) {
          item.setParentWithJump(item.containingComp.layer(parseInt($.layer.layerParentNameArr[index])));
        } else {
          item.setParentWithJump(item.containingComp.layer($.layer.layerParentNameArr[index]));
        }
      } catch (err) {}
    });
  };

  $.layer.isType = function (obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };

  $.layer.clampInfluence = function (clamp) {
    if (clamp < 0.1) {
      clamp = 0.1;
    } else if (clamp >= 100) {
      clamp = 100;
    }
    return clamp;
  };

  $.layer.arrayIndexOf = function (arr, item) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  };

  $.layer.forEachXML = function (xml, callback, context) {
    if (!(xml instanceof XML)) return;
    var i, len;
    for (i = 0, len = xml.children().length(); i < len; i++) {
      if (callback.call(context, xml.child(i), i, xml) === false) {
        break;
      }
    }
  };

  $.layer.forEach = function (callback, context) {
    if (Object.prototype.toString.call(this) === '[object Array]') {
      var i, len;
      for (i = 0, len = this.length; i < len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break; // or return;
          }
        }
      }
    }
  };

  $.layer.forEachLayer = function (callback, context) {
    if (Object.prototype.toString.call(this) === '[object LayerCollection]') {
      var i, len;
      for (i = 1, len = this.length; i <= len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break; // or return;
          }
        }
      }
    }
  };

  $.layer.forEachPropertyGroup = function (callback, context) {
    var i, len;
    for (i = 1, len = this.numProperties; i <= len; i++) {
      if (callback.call(context, this.property(i), i, this) === false) {
        break;
      }
    }
  };

  $.layer.lookUpInArray = function (text, arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      if (arr[i] === text) {
        return true;
      }
    }
    return false;
  };

  $.layer.getDistance = function (a, b) {
    return parseInt(a.toString().substring(0, 2) - b.toString().substring(0, 2)) * 100 + parseInt(b);
  };

  $.layer.tempFolder = new Folder(new File($.fileName).parent.toString());
  $.layer.slash = '/';

  $.layer.numLayers = 0;
  $.layer.layerTypePropertyArr = [];
  $.layer.layerTypePropertyValueArr = [];
  $.layer.expPropertyArr = [];
  $.layer.layerArr = [];
  $.layer.layerParentNameArr = [];
  $.layer.errorInfoArr = [];

  $.layer.clearHelperArr = function () {
    $.layer.numLayers = 0;
    $.layer.layerTypePropertyArr = [];
    $.layer.layerTypePropertyValueArr = [];
    $.layer.expPropertyArr = [];
    $.layer.layerArr = [];
    $.layer.layerParentNameArr = [];
    $.layer.errorInfoArr = [];
  };

  $.layer.writeErrorFile = function () {
    var str = '';
    $.layer.forEach.call($.layer.errorInfoArr, function (item, index) {
      str += 'Catched-Line# ' + item.line + '\tHappened-Line# ' + item.error.line.toString() + '\t' + item.error.toString() + '\r\n';
    });
    var file = new File($.layer.tempFolder.toString() + $.layer.slash.toString() + 'error.txt');
    writeLn('Find ' + $.layer.errorInfoArr.length + ' errors');
    file.writee(str);
  };

  $.layer.musicType = ['ape', 'flac', 'mp3', 'wav'];
  $.layer.musicMaxLength = 52428800;
  $.layer.pictureType = ['ai', 'bmp', 'jpg', 'png', 'psd', 'tiff'];
  $.layer.pictureMaxLength = 10485760;

  $.layer.translate = function () {};

  $.layer.en = encodeURIComponent;
  $.layer.de = decodeURIComponent;

  $.layer.encodedArr = ['amp;', 'lt;', 'gt;', 'quot;', 'apos;'];
  $.layer.decodedArr = ['&', '<', '>', '"', "'"];

  $.layer.encode = function (obj) {
    $.layer.forEach.call($.layer.decodedArr, function (item, index) {
      var reg = new RegExp(item, 'g');
      for (var j in obj) {
        obj[j] = obj[j].replace(reg, $.layer.encodedArr[index]);
      }
    });
  };

  $.layer.decode = function (obj) {
    $.layer.forEach.call($.layer.encodedArr, function (item, index) {
      var reg = new RegExp(item, 'g');
      for (var j in obj) {
        obj[j] = obj[j].replace(reg, $.layer.decodedArr[index]);
      }
    });
  };

  $.layer.name = 'AE Layer library';
  $.layer.version = 1.0;
  $.layer.email = 'smallpath2013@gmail.com';

  $.layer.prototype.init.prototype = $.layer.prototype;
  return $.layer;
})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

;(function () {
  /*
   *  ColorPicker v2.0 for Adobe scripting.
   *  2016-5-11 -> 2016-7-24
   *
   *  By:   smallpath
   *  Email:   smallpath2013@gmail.com
   *  Github:  github.com/Smallpath/AdobeColorPicker
   *
   *  This is a rebuilt color picker for Adobe scripting.
   *  Support all Adobe softwares such as PS,AI,PR and so on.
   *
   *  See usage on github.com/Smallpath/AdobeColorPicker
   */

  function colorPicker(inputColour, options) {
    if (!(this instanceof colorPicker)) {
      return new colorPicker(inputColour, options);
    }

    this.options = {
      name: 'Adobe Color Picker ',
      version: 'v2.0',
      shouldUpdateCursor: false,
      backupLocation: [],

      windowType: 'dialog' // "dialog","palette" and the reference of Panel
    };

    if (options && colorPicker.isType(options, 'Object')) {
      for (var i in options) {
        this.options[i] = options[i];
      }
    }

    this.inputColour = colorPicker.parseColor(inputColour);
    this.outputColour = this.inputColour.slice(0);
    this.initSetting();
    return this.showColorPicker();
  }

  colorPicker.parseColor = function (inputValue) {
    if (!inputValue) {
      return [1, 1, 1];
    }

    if (colorPicker.isRgb(inputValue)) {
      // [0,0,0] - [1,1,1]
      return colorPicker.parseRgb(inputValue);
    } else if (colorPicker.isLargeRgb(inputValue)) {
      // [0,0,0] - [255,255,255]
      return colorPicker.parseLargeRgb(inputValue);
    } else if (colorPicker.isHex(inputValue)) {
      // FFFFFF
      return colorPicker.parseHex(inputValue);
    } else if (colorPicker.isShortHex(inputValue)) {
      // FFF
      return colorPicker.parseShortHex(inputValue);
    } else if (colorPicker.isHsb(inputValue)) {
      // [0,0,0,'hsb'] - [360,100,100,'hsb']
      return colorPicker.parseHsb(inputValue);
    } else {
      return [1, 1, 1];
    }
  };

  colorPicker.prototype.showColorPicker = function () {
    var win = this.initWindow();
    if (win.type === 'dialog' || win.type === 'palette') {
      if (this.haveSetting('location')) {
        win.location = this.getSetting('location').split(',');
        if (win.location.length !== 2) {
          win.center();
        } else if (win.location[0] < 0 || win.location[1] < 0) {
          win.center();
        }
      }
      win.show();
      this.saveSetting('location', win.location);
    } else if (win.type === 'panel') {
      win.layout.layout(true);
    }
    if (!this.isSmallMode) {
      this.outputColour.hex = colorPicker.RgbToHex(this.outputColour);
      this.outputColour.hsb = colorPicker.RgbToHsb(this.outputColour);
      this.outputColour.rgb = this.outputColour.slice(0);

      return this.outputColour;
    } else {
      return {
        window: win,
        colorPicker: this
      };
    }
  };

  colorPicker.prototype.initWindow = function () {
    var _this = this;
    var type = this.options['windowType'];
    if (type === 'palette') {
      var win = new Window('palette', this.options['name'] + this.options['version'], undefined, {
        maximizeButton: false,
        minimizeButton: false
      });
      this.size = this.options['size'] = 90;
    } else if (type instanceof Panel) {
      win = type;
      this.size = this.options['size'] = 90;
    } else {
      win = new Window('dialog', this.options['name'] + this.options['version'], undefined, {
        maximizeButton: false,
        minimizeButton: false,
        closeButton: false
      });
      this.size = this.options['size'] = 130;
    }

    var isSmallMode = this.isSmallMode = this.size !== 130;
    var targetImage = isSmallMode ? this.options['smallColorWheel'] : this.img;
    var targetSize = this.size * 2;

    var colourGroup = win.add('group');
    colourGroup.orientation = 'stack';

    win.image = colourGroup.add('image', undefined, targetImage);

    var colourCursorGroup = this.colourCursorGroup = colourGroup.add('customBoundedValue', [0, 0, targetSize + 2, targetSize + 2]);
    colourCursorGroup.fillColour = [0, 0, 0, 0];

    var colourSelectCursor = this.colourSelectCursor = colourCursorGroup.colourSelectCursor = {};
    colourSelectCursor.size = [12, 12];
    colourSelectCursor.strokeWidth = 1;
    colourSelectCursor.strokeColour = [0, 0, 0];

    this.setCursorLocation(this.inputColour);

    colourCursorGroup.onDraw = function () {
      this.graphics.drawOSControl();
      this.graphics.newPath();
      this.graphics.ellipsePath(0, 0, this.size[0], this.size[1]);
      this.graphics.fillPath(colourCursorGroup.graphics.newBrush(colourCursorGroup.graphics.BrushType.SOLID_COLOR, colourCursorGroup.fillColour));

      this.graphics.newPath();

      this.graphics.ellipsePath(this.colourSelectCursor.location[0] + this.colourSelectCursor.strokeWidth / 2 + 1, this.colourSelectCursor.location[1] + this.colourSelectCursor.strokeWidth / 2 + 1, this.colourSelectCursor.size[0] - this.colourSelectCursor.strokeWidth, this.colourSelectCursor.size[1] - this.colourSelectCursor.strokeWidth);
      this.graphics.strokePath(this.graphics.newPen(this.graphics.PenType.SOLID_COLOR, this.colourSelectCursor.strokeColour, this.colourSelectCursor.strokeWidth));
    };

    win.brightGroup = win.add('group');
    win.staticBright = win.brightGroup.add('statictext', undefined, 'Bright:');
    win.editBright = win.brightGroup.add("edittext{text:'0',characters:3,justify:'center',active:1}");
    win.slider = win.brightGroup.add('slider', undefined, 100, 0, 100);
    if (!isSmallMode) {
      win.slider.size = 'width:160,height:20';
      var spacing = 10;
      var character = 4;
    } else {
      win.slider.size = 'width:100,height:20';
      win.brightGroup.spacing = 2;
      win.spacing = 5;
      win.margins = 2;
      spacing = 0;
      character = 3;
    }
    var pickerRes = `Group{orientation:'column',
                    gulu:Group{
                        uni:Group{
                            spacing:` + spacing + `,
                          Ed:StaticText{text:"#"},
                          unicode:EditText{characters:6,justify:"center",text:'FF0000'}
                        },
                        color:Custom {
                            type: 'customBoundedValue',
                            text:'Redraw original image',
                            size:[80,25]
                        }
                    },
                    colorHolder:Group{orientation:'row',
                        colorCol1:Group{orientation:'column',
                        hGroup:Group{spacing:` + spacing + `,hRad:StaticText{text:"H:"},hValue:EditText{characters:` + character + `,justify:"center",text:'0',_index:0}},
                        rGroup:Group{spacing:` + spacing + `,rRad:StaticText{text:"R:"},rValue:EditText{characters:` + character + `,justify:"center",text:'0',_index:0}}
                    },
                      colorCol2:Group{orientation:'column',
                        sGroup:Group{spacing:` + spacing + `,sRad:StaticText{text:"S:"},sValue:EditText{characters:` + character + `,justify:"center",text:'0',_index:1}},
                        gGroup:Group{spacing:` + spacing + `,gRad:StaticText{text:"G:"},gValue:EditText{characters:` + character + `,justify:"center",text:'0',_index:1}}
                    },
                      colorCol3:Group{orientation:'column',
                        lGroup:Group{spacing:` + spacing + `,lRad:StaticText{text:"B:"},lValue:EditText{characters:` + character + `,justify:"center",text:'0',_index:2}},
                        bGroup:Group{spacing:` + spacing + `,bRad:StaticText{text:"B:"},bValue:EditText{characters:` + character + `,justify:"center",text:'0',_index:2}}
                    },
                  },

                }`;
    var editor = win.editor = win.add(pickerRes);
    if (win.type === 'dialog') {
      editor.oc = win.editor.oc = win.add("Group{ok:Button{text:'Ok'},can:Button{text:'Cancel'}}");

      editor.oc.ok.onClick = function () {
        win.close();
      };

      editor.oc.can.onClick = function () {
        colorPicker.copyArr(_this.outputColour, _this.inputColour);
        win.close();
      };
    }

    editor.gulu.color.onDraw = function (draw) {
      var targetColour = _this.outputColour;

      var gfxs = this.graphics;
      gfxs.newPath();
      gfxs.rectPath(0, 0, this.size[0], this.size[1]);
      gfxs.fillPath(gfxs.newBrush(gfxs.BrushType.SOLID_COLOR, targetColour));
    };

    this.updateCursor(win);

    this.setDefaultValue(win);

    this.bindingKeydown(win);

    this.bindingHandler(win);

    return win;
  };

  colorPicker.prototype.setDefaultValue = function (win) {
    var pi = win.editor;
    var startColour = this.outputColour;

    pi.gulu.uni.unicode.text = colorPicker.RgbToHex(startColour);
    pi.gulu.uni.unicode.active = true;

    pi.colorHolder.colorCol1.rGroup.rValue.text = Math.round(startColour[0] * 255);
    pi.colorHolder.colorCol2.gGroup.gValue.text = Math.round(startColour[1] * 255);
    pi.colorHolder.colorCol3.bGroup.bValue.text = Math.round(startColour[2] * 255);

    var hsbHere = colorPicker.RgbToHsb([startColour[0] * 255, startColour[1] * 255, startColour[2] * 255]);

    pi.colorHolder.colorCol1.hGroup.hValue.text = hsbHere[0];
    pi.colorHolder.colorCol2.sGroup.sValue.text = hsbHere[1];
    pi.colorHolder.colorCol3.lGroup.lValue.text = hsbHere[2];

    win.slider.value = hsbHere[2];
    win.editBright.text = hsbHere[2];

    this.colourCursorGroup.fillColour[3] = 1 - hsbHere[2] / 100;
    this.colourCursorGroup.notify('onDraw');
  };

  colorPicker.prototype.bindingHandler = function (win) {
    var _this = this;

    win.editor.colorHolder.colorCol1.hGroup.hValue.onChange = win.editor.colorHolder.colorCol2.sGroup.sValue.onChange = win.editor.colorHolder.colorCol3.lGroup.lValue.onChange = function () {
      _this.options.backupLocation.length = 0;
      this.text = Math.round(this.text);

      if (this._index === 0) {
        if (this.text < 0 || this.text > 360 || isNaN(this.text) === true) {
          this.text = colorPicker.RgbToHsb([_this.outputColour[0] * 255, _this.outputColour[1] * 255, _this.outputColour[2] * 255])[this._index];
        }
      } else {
        if (this.text < 0 || this.text > 100 || isNaN(this.text) === true) {
          this.text = colorPicker.RgbToHsb([_this.outputColour[0] * 255, _this.outputColour[1] * 255, _this.outputColour[2] * 255])[this._index];
        }
      }
      var hsbArr = [Math.round(win.editor.colorHolder.colorCol1.hGroup.hValue.text), Math.round(win.editor.colorHolder.colorCol2.sGroup.sValue.text), Math.round(win.editor.colorHolder.colorCol3.lGroup.lValue.text)];

      var rgbArr = colorPicker.HsbToRgb(hsbArr);
      var hexStr = colorPicker.RgbToHex([rgbArr[0] / 255, rgbArr[1] / 255, rgbArr[2] / 255]);
      win.editor.gulu.uni.unicode.text = hexStr;
      win.editor.gulu.uni.unicode.notify('onChange');
    };

    win.editor.colorHolder.colorCol1.rGroup.rValue.onChange = win.editor.colorHolder.colorCol2.gGroup.gValue.onChange = win.editor.colorHolder.colorCol3.bGroup.bValue.onChange = function () {
      _this.options.backupLocation.length = 0;
      this.text = Math.round(this.text);

      if (this.text < 0 || this.text > 255 || isNaN(this.text) === true) {
        this.text = Math.round(_this.outputColour[this._index] * 255);
      }

      if (this._index === 0) {
        win.editor.gulu.uni.unicode.text = colorPicker.RgbToHex([this.text / 255, _this.outputColour[1], _this.outputColour[2]]);
      } else if (this._index === 1) {
        win.editor.gulu.uni.unicode.text = colorPicker.RgbToHex([_this.outputColour[0], this.text / 255, _this.outputColour[2]]);
      } else if (this._index === 2) {
        win.editor.gulu.uni.unicode.text = colorPicker.RgbToHex([_this.outputColour[0], _this.outputColour[1], this.text / 255]);
      }
      win.editor.gulu.uni.unicode.notify('onChange');
    };

    win.editBright.onChange = win.editBright.onChanging = function () {
      _this.options.backupLocation.length = 0;
      if (this.text < 0) {
        this.text = 0;
      }
      if (this.text > 100) {
        this.text = 100;
      }
      if (isNaN(this.text) === true) {
        this.text = 100;
      }

      win.slider.value = parseInt(this.text);
      if (isNaN(win.slider.value)) {
        return;
      }
      win.slider.notify('onChange');
    };

    win.slider.onChange = win.slider.onChanging = function () {
      var thisColor = colorPicker.HsbToRgb([Math.round(win.editor.colorHolder.colorCol1.hGroup.hValue.text), Math.round(win.editor.colorHolder.colorCol2.sGroup.sValue.text), Math.round(this.value)]);
      if (this.value !== 0) {
        if (_this.options.backupLocation.length !== 0 && _this.options.shouldUpdateCursor === true) {
          _this.getColor({
            type: 'mouseup',
            clientX: _this.options.backupLocation[0] + 6,
            clientY: _this.options.backupLocation[1] + 6
          });
          _this.options.backupLocation.length = 0;
          _this.colourCursorGroup.fillColour[3] = 1 - this.value / 100;
          _this.colourCursorGroup.notify('onDraw');
          return;
        }
      }

      colorPicker.copyArr(_this.outputColour, [thisColor[0] / 255, thisColor[1] / 255, thisColor[2] / 255]);

      _this.setDefaultValue(win);
      _this.notifyColor(win);
      _this.updateCursor(win);

      _this.setCursorLocation(_this.outputColour);

      if (this.value === 0) {
        _this.options.shouldUpdateCursor = true;
      } else {
        _this.options.shouldUpdateCursor = false;
      }

      if (_this.options.backupLocation.length === 0) {
        colorPicker.copyArr(_this.options.backupLocation, _this.colourSelectCursor.location);
      }

      _this.colourCursorGroup.fillColour[3] = 1 - this.value / 100;
      _this.colourCursorGroup.notify('onDraw');
    };

    win.editor.gulu.uni.unicode.onChange = function () {
      var eV = 0;
      if (colorPicker.isHex(this.text) === false && colorPicker.isShortHex(this.text) === false) {
        this.text = colorPicker.RgbToHex(_this.outputColour);
        eV = 1;
      }
      if (eV === 0) {
        var rgbHere = this.text.length === 6 ? colorPicker.parseHex(this.text) : colorPicker.parseShortHex(this.text);
        colorPicker.copyArr(_this.outputColour, rgbHere);
        _this.setDefaultValue(win);
        _this.setCursorLocation(rgbHere);
        _this.notifyColor(win);
      }
    };
  };

  colorPicker.prototype.updateCursor = function (win) {
    if (colorPicker.arraysEqual(this.colourSelectCursor.strokeColour, [1, 1, 1])) {
      if (win.slider.value > 63) {
        this.colourSelectCursor.strokeColour = [0, 0, 0];
      }
    } else if (colorPicker.arraysEqual(this.colourSelectCursor.strokeColour, [0, 0, 0])) {
      if (win.slider.value <= 63) {
        this.colourSelectCursor.strokeColour = [1, 1, 1];
      }
    }
  };

  colorPicker.prototype.notifyColor = function (win) {
    win.editor.gulu.color.notify('onDraw');
  };

  colorPicker.prototype.setCursorLocation = function (inputColor) {
    this.colourSelectCursor.location = function (_this) {
      var hsb = colorPicker.RgbToHsb(inputColor);
      hsb = colorPicker.convertHsbToKulerHsb(hsb);
      var angle = Math.round(hsb[0]);
      var length = Math.round(hsb[1] / 100 * _this.size);

      var point = [length * Math.cos(angle * 2 * Math.PI / 360), length * Math.sin(angle * 2 * Math.PI / 360)];

      return [point[0] + _this.size, _this.size - point[1]];
    }(this);

    this.colourSelectCursor.location = [this.colourSelectCursor.location[0] - this.colourSelectCursor.size[0] / 2, this.colourSelectCursor.location[1] - this.colourSelectCursor.size[1] / 2];
  };

  colorPicker.prototype.bindingKeydown = function (win) {
    var _this = this;

    var keyDownHandle1 = function (k) {
      if (k.keyName === 'Up') {
        if (k.shiftKey === false) {
          this.text = parseFloat(this.text) + 1;
        } else {
          this.text = parseFloat(this.text) + 10;
        }
      } else if (k.keyName === 'Down') {
        if (k.shiftKey === false) {
          this.text = parseFloat(this.text) - 1;
        } else {
          this.text = parseFloat(this.text) - 10;
        }
      }
    };

    win.editor.colorHolder.colorCol1.rGroup.rValue.addEventListener('keydown', keyDownHandle1);
    win.editor.colorHolder.colorCol2.gGroup.gValue.addEventListener('keydown', keyDownHandle1);
    win.editor.colorHolder.colorCol3.bGroup.bValue.addEventListener('keydown', keyDownHandle1);
    win.editBright.addEventListener('keydown', keyDownHandle1);

    win.addEventListener('keydown', function (k) {
      if (k.keyName === 'Escape') {
        win.close();
      }
    });

    var leftPressed = false;

    var getColor = this.getColor = function (k) {
      _this.options.backupLocation.length = 0;

      if (k.type === 'mouseup') {
        leftPressed = false;
      } else if (k.type === 'mousemove') {
        if (leftPressed === false) {
          return;
        }
      } else if (k.type === 'mousedown') {
        leftPressed = true;
      }
      var point = [k.clientX, k.clientY];
      if (!_this.isInCircle(point)) return;

      var thisColor = _this.getColorFromPoint(point);
      thisColor = colorPicker.RgbToHsb(thisColor);
      thisColor[2] = win.slider.value;
      thisColor = colorPicker.HsbToRgb(thisColor);

      colorPicker.copyArr(_this.outputColour, [thisColor[0] / 255, thisColor[1] / 255, thisColor[2] / 255]);
      _this.setCursorLocation(_this.outputColour);
      _this.setDefaultValue(win);
      win.editor.gulu.color.notify('onDraw');
    };

    this.colourCursorGroup.addEventListener('mouseup', getColor);
    this.colourCursorGroup.addEventListener('mousemove', getColor);
    this.colourCursorGroup.addEventListener('mousedown', getColor);
  };

  colorPicker.prototype.isInCircle = function (point) {
    return Math.pow(point[0] - this.size, 2) + Math.pow(point[1] - this.size, 2) <= Math.pow(this.size, 2);
  };

  colorPicker.prototype.getColorFromPoint = function (point) {
    var transformedPoint = this.transformPoint(point);
    var hAndS = this.getAngleAndLength(transformedPoint);
    return this.CoreGetColorFromPoint(hAndS[0], hAndS[1]);
  };

  colorPicker.prototype.getAngleAndLength = function (point) {
    var angle, length;
    var x = point[0];
    var y = point[1];
    length = Math.sqrt(x * x + y * y);
    angle = Math.atan2(y, x) / Math.PI * 180;
    if (angle <= 0) {
      angle += 360;
    }
    return [angle, length / this.size];
  };

  colorPicker.prototype.transformPoint = function (point) {
    var x = point[0];
    var y = point[1];
    return [x - this.size, this.size - y];
  };

  colorPicker.prototype.CoreGetColorFromPoint = function (h, s) {
    var i;

    var f, p, q, t;
    var r = 1;
    var g = 1;
    var b = 1;
    var v = 1;
    if (s === 0) {
      v = Math.floor(v * 255);
      return [v, v, v];
    }
    var originHeight = h;

    if (originHeight < 45 && originHeight >= 0) {
      i = 0;
      f = originHeight / 90;
    } else if (originHeight < 120 && originHeight >= 45) {
      i = 1;
      f = (originHeight - 45) / (120 - 45);
    } else if (originHeight < 180 && originHeight >= 120) {
      i = 2;
      f = (originHeight - 120) / (180 - 120);
    } else if (originHeight < 220 && originHeight >= 180) {
      i = 3;
      f = (originHeight - 180) / (220 - 180);
    } else if (originHeight < 275 && originHeight >= 220) {
      i = 4;
      f = (originHeight - 220) / (275 - 220);
    } else if (originHeight < 320 && originHeight >= 275) {
      i = 5;
      f = (originHeight - 275) / (320 - 275);
    } else if (originHeight < 360 && originHeight >= 320) {
      i = 6;
      f = (originHeight - 320) / (360 - 320);
    }

    p = 1 - s;
    q = 1 - s * f;
    t = 1 - s * (1 - f);

    switch (i) {
      case 0:
        r = v;g = t;b = p;break;
      case 1:
        r = v;g = 0.5 + t / 2;b = p;break;
      case 2:
        r = q;g = v;b = p;break;
      case 3:
        r = p;g = v;b = t;break;
      case 4:
        r = p;g = q;b = v;break;
      case 5:
        r = t;g = p;b = v;break;
      case 6:
        r = v;g = p;b = q;break;
    }
    return [r, g, b];
  };

  colorPicker.copyArr = function (defaultArr, otherArr) {
    while (defaultArr.length !== 0) {
      defaultArr.pop();
    }
    defaultArr.push(otherArr[0]);
    defaultArr.push(otherArr[1]);
    defaultArr.push(otherArr[2]);
    return defaultArr;
  };

  colorPicker.HexToRgb = function (hex) {
    var ccolorhex = hex.toString(16);
    var ccolorb = parseInt(ccolorhex.substr(-2), 16);
    var ccolorg = parseInt(ccolorhex.substr(-4).substr(0, 2), 16);
    var ccolorr = parseInt(ccolorhex.substr(-6).substr(0, 2), 16);
    return [ccolorr / 255, ccolorg / 255, ccolorb / 255];
  };

  colorPicker.RgbToHex = function (rgb) {
    var a = (rgb[0] * 255).toString(16);
    var b = (rgb[1] * 255).toString(16);
    var c = (rgb[2] * 255).toString(16);
    if (a.length !== 2) {
      a = '0' + a;
    }
    if (b.length !== 2) {
      b = '0' + b;
    }
    if (c.length !== 2) {
      c = '0' + c;
    }
    return (a + b + c).toUpperCase();
  };

  colorPicker.HsbToRgb = function (hsb) {
    var rgb = [];
    hsb = [hsb[0], hsb[1] / 100, hsb[2] / 100];
    for (var offset = 240, i = 0; i < 3; i++, offset -= 120) {
      var x = Math.abs((hsb[0] + offset) % 360 - 240);
      if (x <= 60) {
        rgb[i] = 255;
      } else if (x > 60 && x < 120) {
        rgb[i] = (1 - (x - 60) / 60) * 255;
      } else {
        rgb[i] = 0;
      }
    }
    for (i = 0; i < 3; i++) {
      rgb[i] += (255 - rgb[i]) * (1 - hsb[1]);
    }
    for (i = 0; i < 3; i++) {
      rgb[i] *= hsb[2];
    }
    return [rgb[0], rgb[1], rgb[2]];
  };

  colorPicker.RgbToHsb = function (rgb) {
    rgb = colorPicker.parseColor(rgb);
    rgb = [rgb[0] * 255, rgb[1] * 255, rgb[2] * 255];
    var hsb = [];
    var rearranged = rgb.slice(0);
    var maxIndex = 0;
    var minIndex = 0;
    rearranged.sort(function (a, b) {
      return a - b;
    });
    for (var i = 0; i < 3; i++) {
      if (rearranged[0] === rgb[i]) minIndex = i;
      if (rearranged[2] === rgb[i]) maxIndex = i;
    }
    if (rearranged[2] !== 0) {
      hsb[2] = rearranged[2] / 255;
      hsb[1] = 1 - rearranged[0] / rearranged[2];
      if (hsb[1] !== 0) {
        hsb[0] = maxIndex * 120 + 60 * (rearranged[1] / hsb[1] / rearranged[2] + (1 - 1 / hsb[1])) * ((maxIndex - minIndex + 3) % 3 === 1 ? 1 : -1);
        hsb[0] = (hsb[0] + 360) % 360;
      } else {
        hsb[0] = 0;
      }
    } else {
      hsb[2] = 0;
      hsb[1] = 0;
      hsb[0] = 0;
    }
    return [Math.round(hsb[0]), Math.round(hsb[1] * 100), Math.round(hsb[2] * 100)];
  };

  colorPicker.convertHsbToKulerHsb = function (hsb) {
    var originHeight = hsb[0];
    var s = hsb[1];
    var b = hsb[2];
    var h;
    if (originHeight < 30 && originHeight >= 0) {
      h = (originHeight - 0) / (30 - 0) * (45 - 0) + 0;
    } else if (originHeight < 60 && originHeight >= 30) {
      h = (originHeight - 30) / (60 - 30) * (120 - 45) + 45;
    } else if (originHeight < 120 && originHeight >= 60) {
      h = (originHeight - 60) / (120 - 60) * (180 - 120) + 120;
    } else if (originHeight < 180 && originHeight >= 120) {
      h = (originHeight - 120) / (180 - 120) * (220 - 180) + 180;
    } else if (originHeight < 240 && originHeight >= 180) {
      h = (originHeight - 180) / (240 - 180) * (275 - 220) + 220;
    } else if (originHeight < 300 && originHeight >= 240) {
      h = (originHeight - 240) / (300 - 240) * (320 - 275) + 275;
    } else if (originHeight < 360 && originHeight >= 300) {
      h = (originHeight - 300) / (360 - 300) * (360 - 320) + 320;
    } else {
      return hsb;
    }

    return [h, s, b];
  };

  colorPicker.isType = function (content, type) {
    return Object.prototype.toString.call(content) === '[object ' + type + ']';
  };

  colorPicker.isRgb = function (rgbArr) {
    if (!rgbArr) {
      return false;
    }

    if (!colorPicker.isType(rgbArr, 'Array')) {
      return false;
    }

    if (rgbArr.length !== 3) {
      return false;
    }

    for (var i = 0, len = rgbArr.length; i < len; i++) {
      if (rgbArr[i] > 1 || rgbArr[i] < 0) {
        return false;
      }
    }

    return true;
  };

  colorPicker.isLargeRgb = function (rgbArr) {
    if (!rgbArr) {
      return false;
    }

    if (!colorPicker.isType(rgbArr, 'Array')) {
      return false;
    }

    if (rgbArr.length !== 3) {
      return false;
    }

    for (var i = 0, len = rgbArr.length; i < len; i++) {
      if (rgbArr[i] > 255 || rgbArr[i] < 0) {
        return false;
      }
    }

    return true;
  };

  colorPicker.isHex = function (hexStr) {
    if (!hexStr) {
      return false;
    }

    if (!colorPicker.isType(hexStr, 'String')) {
      return false;
    }

    if (hexStr.length !== 6) {
      return false;
    }

    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var isHex = true;
    hexStr = hexStr.toUpperCase();
    for (var i = 0, len = hexStr.length; i < len; i++) {
      if (this.arrayIndexOf(arr, hexStr[i]) === false) {
        isHex = false;
        break;
      }
    }

    return isHex;
  };

  colorPicker.isShortHex = function (hexStr) {
    if (!hexStr) {
      return false;
    }

    if (!colorPicker.isType(hexStr, 'String')) {
      return false;
    }

    if (hexStr.length !== 3) {
      return false;
    }

    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var isShortHex = true;
    hexStr = hexStr.toUpperCase();
    for (var i = 0, len = hexStr.length; i < len; i++) {
      if (colorPicker.arrayIndexOf(arr, hexStr[i]) === false) {
        isShortHex = false;
        break;
      }
    }

    return isShortHex;
  };

  colorPicker.isHsb = function (hsbArr) {
    if (!hsbArr) {
      return false;
    }

    if (!colorPicker.isType(hsbArr, 'Array')) {
      return false;
    }

    if (hsbArr.length !== 4) {
      return false;
    }

    if (hsbArr[3] !== 'hsb') return false;
    if (hsbArr[0] > 360 || hsbArr[0] < 0) return false;
    if (hsbArr[1] > 100 || hsbArr[1] < 0) return false;
    if (hsbArr[2] > 100 || hsbArr[2] < 0) return false;

    return true;
  };

  colorPicker.parseRgb = function (inputValue) {
    return inputValue;
  };

  colorPicker.parseLargeRgb = function (inputValue) {
    var arr = [inputValue[0] / 255, inputValue[1] / 255, inputValue[2] / 255];
    return arr;
  };

  colorPicker.parseHex = function (inputValue) {
    return colorPicker.HexToRgb('0x' + inputValue);
  };

  colorPicker.parseShortHex = function (inputValue) {
    inputValue = inputValue.toUpperCase();
    var hex = '0x' + inputValue[0].toString() + inputValue[0].toString() + inputValue[1].toString() + inputValue[1].toString() + inputValue[2].toString() + inputValue[2].toString();
    return colorPicker.HexToRgb(hex);
  };

  colorPicker.parseHsb = function (inputValue) {
    var hsb = [inputValue[0], inputValue[1], inputValue[2]];
    return colorPicker.parseLargeRgb(colorPicker.HsbToRgb(hsb));
  };

  colorPicker.arrayIndexOf = function (arr, str) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === str) {
        return true;
      }
    }
    return false;
  };

  colorPicker.arraysEqual = function (a, b) {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  };

  colorPicker.prototype.initSetting = function () {
    this.img = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x01\x04\x00\x00\x01\x04\b\x06\x00\x00\x00\u00CE\bJ\n\x00\x00\x00\tpHYs\x00\x00\x00\x01\x00\x00\x00\x01\x018\"\u00F4@\x00\x00\x00$zTXtCreator\x00\x00\b\u0099sL\u00C9OJUpL+I-RpMKKM.)\x06\x00Az\x06\u00CEjz\x15\u00C5\x00\x00 \x00IDATx\u009C\u00EC\u00BD{\u00BCeWU&\u00FA\u008D\u00B9\u00F6>\u00E7T*\x02I\u0088\x04A\u00D4hLT\u00BC\b-\bb\x0B\x11[\u00EDn\x04\u00FBj\u00BC\u00F8k\x105\u00B7\u00EDn\x1Ft\u00B7^_\r\u00AD\x17\u00C5\u00A6\x01\u00DB\u009F\u00B7\u00B1\x1BE\u00BD`@\x1E\"\u00D7\u0080\u00A1\u0095\u0097B\b\x10\f\x1D\b\t\x18\b\x04\b\u00AF<I\u00AAR\u008Fs\u00CE\u00DEk\u008E\u00FB\u00C7\x18\u00DF\x18c\u00EDS\u0095\u00A4\u008A$\u0095\u0084\u009ApR{\u00EF\u00B5\u00D6\\s\u00CD5\u00C7\x18\u00DFxN\u00C1\u00F1v\u00AFn\u00AA\u00FBw\u00A3\u00DF\u00F8\u00B5\u0090\u008F}\r\u00B6\u00AE}\u00D8\u00E6\u0081[\x1E\u00D2\u00C6\x1B\x1F\u00DC\u00967\u009E\u00A6\u00BA\u00E7T\u00F4}\u00A7\u00E88\u009C\u008C>\u00DEO\u00C6[\x06\u00E8\u008D\u0090\u00C5-h\u008B\u00BD\u0090\u00BE\x1F2\u008E\u00806\x00\x02@\x01\b\u00BA\u009C\x00\u009D\u00ED\u0086\u00B6\x07`9<\x10\u0083\u00EC\x1E\u0081\u008D\u00BD\u00E3\u00AC\x7F\u00B1\u00C9\u00EE\u009B\u00BA|\u00C5\r\u00D2\u00BE\u00F2Zi\u00A7~a~\u00E2\u00FD>'\u00F7\u00FB\u00AAk0\u00FF\u00FAO\u008F\u00FA\u00D0O\u00CD\u0086]\u00FB\u008F\u00F1\u0094\x1Co_B\u0093c=\u0080\u00E3\u00ED\u008E\u00B5\u00DE?\u00F5 \x197\u00BFu\\^\u00FE\u00F0\u00BE\u00F5\u00C1o\u0092\u00C5\u00CDg\u00E9\u00F2\u008630\u00DEx\u009An\u00DE \u00C3\u00E2F\u00A8\u00DE\x02\u00C56\u00A0\u008A\u00D6gh\u00AA\x10\u0085\u00D19:\u00A0\x02h\x07\x7F\x12\x00\u00D2\u00FD\u008B\u008A\u00FD\u00A2\u0080\u00EA\b\u0085@\u00B4\x01\u00BDC\u00BA\x02*PQ(\x06@;D\u00ED\u00B2\u00A5\u00AE\x01r?\u00C8\u00FCd\f\u00B3Su\u00B9~\u00EA\u00B5m~\u00D2U2\u00BF\u00FF\u0095\u008B\u00FB\u009F\u00F9\x0F\u00EB\x0Fx\u00CC\x152?\u00E5r\u0091\u00AF\u00B9\u00EEX\u00CD\u00DD\u00F1v\u00C7\u00DBq\u0086p\x0Fl\u00AA\u00B7<P\u00F5\u00EF\x1F+\x07\u00AEy\u00F4x\u00F0#\u00DF\u00DE\u00FB\x17\x1E%\u00DB\u009F9M\x16\u009F\u00C4\u00B8\u00BC\x193l\x03\u00B2\u0084\u008Cpb\u00E7kT@\u00C4\u0088\u00BB7\u0088*T\u009DrU\u00ED\u00AC`\x00~\u009D\u00AA\u00FDu\x01\u00A4\u00F9\u00B5\u00A3\u00FD\x16\x03r\u00F4\u00D0\u00F3^\u00DD\u00FBU\x00\u00AD[\u00BF\x12\u00C7\x05\u00A36\u008Ch\u00C0\u00B0\x1B\u00BA\u00FB\u00EB\u00D0\u00D6\u00BE\u00E1\u00DA\u00E5\u00C6)\u0097\u00CEv\u009D\u00FE\u00FE\u00F9i\u00DFr\t6\u00BE\u00FDb\u0091\u00AF\u00BC\u00F1\u00AE\u009E\u00CB\u00E3\u00ED\u00C8\u00DAq\u0086p\x0Fh\u00AAW?\f\u00CB\x1B\u009F\u00B8\u00DC|\u00F3\x13d\u00F3\x0B\u00DF\u00D5\u00C7\u008F\u009E\u00A1\u008B\u00ABd\u00B6}=\x1A\u0096\x00:\u00D0;T\x05]\x14\u00A2\x02\u0081K\u00FF.\u00DE\u0087N\u00FA\u0094n\u008C\u00A1\u00BB4\x07\x0Fk\u00B3\u00EFPC\tD\x07\n'x\x04\x03a\u00BF\u0093\u00EB\x01h\u00CF\u00AF\u00810\u00BA3\rm\u00CE|$\x18\u008F\u00F5!q\u00ED8;\t\u00F8\u008A\u00B3\u00B4\u00AF\u009Fq\x15v=\u00F8\u00A2\u00F9\u0083\u00FF\u00F1;\u00E5\u00FEg\u00BDC\u00DA\u00E9\u00D7\u00DCi\u0093z\u00BC\x1DU;\u00CE\x10\u008EAS\u00DD{\u00A2\u00F6\x0F=i{\u00EB\u00B2\u00EF\u009Fm_\u00FA\u00BD\u00D8\u00FE\u00F8\x19}\u00FB\u0083\x10=\x00\u00C1\x12\u00AD\u00CF\u00A1:\u00A2\x05\u00B1\x1ACX\x11\u00D2.\u0099\x1D\x11\u00A8B\u00A5R- *\u00E8\u00DD~\x13%\x1Ahf-P\u00A3V\u00FB]\u0092\th^\x0F\x15\u00A8vg\"\u00C9\x15\u00B4\u00E7m\u00D0\u00ADoU\u00C4qh2\u00A4`4\u0093\u008B\x00\u008C\u00E2\u00C0\u00C4m\x16\u00BB\u00BF\t\u00FD\x01_\x7F\u0095\u00EC\u00FE\u00A6\u00B7\u00AD?\u00F8\u00F1o\u00D6]\u008Fz{\u009B\u009D\u00BC\u00EFN\u0099\u00F0\u00E3\u00ED\x0E\u00B7\u00E3\f\u00E1nj\u00DA?\u00FD\u00D0qq\u00D9Se\u00EB\u00A2\u00A7\u00E8\u00F8\u0091'\u008C[\u0097\u00AF\u008B~\x1Es\u00C2\u00F3\x15\t\u008F.P'(C\x02\u00C6\x10H\u00D7\x00\u00D0\u00D4\u00E8L\x0Eq\u00B9\u00DD\u00B4\x15\u00E9,\u00E8\u00DD\u0098\u00CC\u00E4\u00FC\u00EE\u008B@\x04\u00E8\u0085!t^\u00DF\u00ED\x18\x00\u00ED\u008A\u00D6\u00A7\u00F72\x1E\u00D4\u00FC\x11\x12\u008D\u0088#\u0097\u00E8\u00B32\x1Ax\x1F\u00CA\x05(\u0086:D\u00A0P\u008Cr\x1A\u00DA\u00C9\u008F\u00D8\u00D2\u00DD\u00DF\u00F8N|\u00E5\u00B7\u00BDq\u00FE\u00A0\u00EF~\u0083\u00B4o\u00F8\u00EC\u0091\u00CF\u00FA\u00F1v\u00A4\u00ED8C\u00B8\x0B\u009B\u00EA\u00E7\x1F\u00A6\u00E3\u00C5\u00E7\u00F4}\x17\u009E#\u00FD\u0083\u008F\u00D1\u00ED\u00F7\u008B\u00E8\x01\u0093\u00EC\nhs8n'\x17\u00E3\x1E\u0092\u0088*J \u00BD\u00FA\u00BFBf\u00A1I`\u00D3\x01\x14\u0086\u0082f\u00EACg\x07\u0085`A\x04\u0081r\x03\u00DA\"4\f\u0090\u00DAs\u00BC\x13\x06\u00B4\u008A0t\u00B5?8\u0083\tS\u00A6\u00DB6\u00AA:\"9|\x15H\x17ho\x18e\x06}\u00C0\u00B7h\x7F\u00C0#\u00FE~v\u00D2\u00E3^'\x0Fy\u00FC\u00EB\u0086\u00F97\x1DW-\u00EE\u00A2v\u009C!\u00DC\u00C9M\u00F5\u00B3'a\u00FC\u00F0\u008F\u00EA\u00E6\u00DB\u009F\u00DE\x17\u0097<\x1E[\u0097\u0089\u00C8^4\b:\x16\u00C1\fr\u00F5K\u00BD\x18\u00E8-\u00A9-\u0088L\u00F28\x7Fr\x04\u00DE\u0082Z\u0091\u00A8\x02T\x07\u00F8\u00D1\x11\u0082\u00A3\x05\u00A2\x06\u0081\u00A2Ol\x11\u00E2\u00E8\u0081\u00D7\u00B6D/ac\u00D0\u00B0E\x06_\u00F1c\u00D5\u00D6`*\x03\u009F\u00CB\u00FB\u00D7\x0E\u00A09\u00CFQc\x01\u009C\x0F\x01\u00B4O\u00E7B|.\u0094\fMf\x18\u00BF\u00E2\u00E1:\u009C\u00F4\u00A8w\u00E3k\u00BE\u00F7\u0095\u00C3\u00C9\u008F\u00FAs\x19\u00CE\u00B8\u00F9(_\u00D5\u00F1v\u0088v\u009C!\u00DC\tm\u00B9\u00D8\u00D7\x06\\\u00F6\u00A4\u00AE\x17\u009E\u00DB\u00B7/~j\u00DBz\u00D7\u0086\u00F4\u00BD\x10\x1D\u00FD\u008CJP(\x04\u00CC/~\u0096\x16\u00A3\\X\u00FC\x10\u00C4j\x12Z\x0F\u00CF\x10T\x12\u00E6\x17\u00B8@\u00C2\u00A2\u00B4\u00AF\u00E8\u00A2\u00A3\x10\u00B28C\x18\x15\u0082\x06\u00A0%3Pu\u0095@\u00CAE\u00C0\u00A8H5$\u00DC\u0096\u008A6J\x1D\u0082\u00DD{\u0082*\u00A8\na\u00C2\x10\u00BAx\x7F\u00BD2GI\u00A68\u008EP\x05\u00C6a7\u0096\x0F|\u00DC&N\u00F9\u008E7\u00AC\x7F\u00ED\u00D9\x7F\"\u00BB\x1F\u00FFv\x19v\u00AD\x18*\u008E\u00B7#m\u00C7\x19\u00C2\u0097\u00D0T\u00AF:\u00B5/\u00DE\u00FFS\u00BAx\u00C7O\u00CB\u00E2\x1D\u00A7k\u00FF\x14\u009A*\u0080\u00D1\u008CpA\x01+\f\x01HB\u00A8\f\u00A1\u00FC^\u00ED\u0083\u008C\x0F q\u00AA\u00EB\u00E5\u00EA\u00E7E\x0Fa\u00C9\u009F\u00EA\x0ER\u008D{\u00D0T/(\u00DE\u00DD0!$\u00BC\u009E\u00D0~\u00CA\x10\u00EC\u00B3t\u0089\x01\u00F6^\u00EF\u00EF\x06F\x1F\x1F\u008D\u008D\x02^o\u00F7\u0094 \u00F2|&\x1Bw\u00CE\x07c\x1Fv\u00B8H\u00F9\u00EC\u00BD\u00C5\u00B9\u00DBk\x0F\u0081<\u00F8\u00B1W\u00B7\x07=\u00F6\u00A5\u00B3\u00D3\x7F\u00F8\u00FF\x15\u00F9\u009A\x1Bn\u00E7\u00D5\x1Do\u0087i\u00C7\x19\u00C2Q\u00B4\u00BE\u00FC\u00C0#\u00D1/|\u0096.\u00DE\u00F64]\u00BC{\u00A3\u00F5\u00BD\x10\u008CyB\u00D1\u00A5\u00A7\x17\x02\u0080\x13\x1C!\u00F5\u00EA\x1B\u00A8\u00C4\x1A\u00FC\u00A4X\x12\x01wA\u00DA\u00EF\u00AA\u008A\u00A6\u00D4\u00CB{\u00DC~\u0095\u00A1H\x10\u00BA\u008D\u0083h$\"\x18h_\u00D06}\u0086\x18SJx\x19WPM\x19\u00BBT\u00A3\u00A3\x1B5\u009B\u00E6\u00B9\u0081VB\r\u00EAq\u00ADj2\u00AFP[\u00F8\u00FC\x00z\u00D7psNb*`\u00F6\u0086e\u00DB\u0080\u009E\u00F4\u00E8M<\u00F81\u00AFY\u00FB\u00FA\x7F\u00F1\u00DF\u00E4+\x1E\u00F7\x01\x1CoG\u00D4\u008E3\u0084;\u00D8T\u00AF\x17\u00E8U?0.\u00DE\u00F8K\u00B2x\u00D7\u00D9\u00B2|?\x04K\u00A4B\u008D)\u00D1R\x02\u00F6\x02\x0B\u00C8\x10&F8\u00CD\u00F3\u00E3^\u00E9\x19\u0098\u00A0\n\x12\u00D2\nC\x00\u00DC\u0095\u0088\x1E\u009E\u0087\x1D\u00CC\b\b\u00E9\u00CE\u00A0\"\u00C2|\t\u00C9\u00EF\u00E3\u0090\x12\u00B0\x14\u0092\u00DC\u00A5}Hz\u009D0\x1D%R\u00E0e\n\u00A0\u00B7\x15\u00C2V\u008F~\u009C\"\x04u\u00DD\u00C5\u00AE\u0097\x00TfG\u00F0>\u0091\u00F7\u0097\u008E\u00F0\u00AELl1*\u00E8\x1E\u0086\u00BD}\u00E27b8\u00ED\u00BB\u00FF\u00AE\u009D\u00FE/^4<\u00F0\u00B1\x7F#\u00ED~\u0087\u009A\u0091\u00E3m\u00A5\x1Dg\b\u00B7\u00D3Tu\u00D0\u00E5[\x7Fd\u00EC\x17\u00FC\u009A.\u00FE\u00FA\x11\u00D2?\u0085\x06E\u00EB\u0087\u0080\x00U\u00AA\x020\u0082.Q<\x13\u0098\u008E\t\u00EC\u008F\u00F3\u00E1\f\u00A1\u00C2w\u0091 \x10\u00B3\u00C0\x17\u0086\u00D0\u008D!Xs\u0086\u00B0\u00AA\u009E\u0094\u00E1I7\u00D7^\u00C4\x0F\u0088\x13\x1D\x10\u00FF\u00D2\u00E2OF\x116\fu\x1BF\u00C0w\u00F7Hja\b(\fI\x0BC\x0B&\u0092\f&\x18\u0082O\u0090I})\u00FCU\u008B'%\u00BD/\u00DA\x01\x14\u00B4\u0090\x0F\u00E8j\u0084\x02\x18\u00E7PUl\u009Ep\n\u00F0\u00E0\u00EF\u00B9l\u00FEuO~\u00FE\u00EC\u00C1\u00FF\u00E4/d8\u00A5@\u00B9\u00E3m\u00B5\x1Dg\b\u0087i\u00AA\u00D7\x0F\u00D0\x0F?M\x17\u00AF\x7FN_\u00BE\u00F1\u00AC\u00A1_\x0B\u00C8\u00B6/H\u0087\u00E0h\x00z\x12+\u00CA\u0084V=~\x07\u00E4OF\u00D0\x1D\u00FE\u008AN\u00AE\u009E\u00C2k0\u008F\u00C0m\x06\u00BD\x10g\u0091\u00DE\u00ADx!v\u00A8,D\x1C\x107\u00D8\u00F9u\x18w\u00BA\x12\x15\x19i\u00B8\u00D4\u00B8n\u00E2\u00FA\u00F4F\u00F5\u0081\u00AAC\u00C48L\u0090\u008D\u00DB\x1DbNJ|D\x18:]\u00B5\u00D0\x16@H\u00DCf\x10h\u00896\x14\u00F5\u00F9%##\u00E3\u0099\u00DC3U.\u00ED\u00C0b~\n\u00F0\u0090\u00B3\u00AF\x1C\u00BE\u00FE\u009F?o\u00F8\u00EA\x1F|\u008D\u00C8\u00C9\u00C7\x19\u00C3!\u00DAq\u0086\u00B0\u00D2TU\u00FA\u00F8\u008E\x1F\u00D6\u00F1\u0082\u00E7\x02\u00AF\u00FDf\x19o@\u00EB\u00DB)\u00C6}\u00D1\u0086qK\u00A6D\u00DC\u0082Z\x14\x13\u00A3Xa\b\n\x14(\\\u00AC\u00ED\u00AB\u00AF\u00A3\u00B8(\u00ABI\u0081\u00C4%+\f \rx\u00E5F;`u\u00D1\u00F3\u00CB\u00B8\u00C4\u00EFA\u00DBF\u00C0w\x12\u00F1\x04\u00D9PUQg\b9\u008E\n\u00E3\u0095\u00FF\u00E9S7\u00A4B\u0092\u00D0\u00E3\u00F9z\u00AA,Z\u0080E\u00D7\u00F0b\u00D49RG(D:\u0093\u00A0\u00AA\x1A}\u00C9\u0081i\x03\u00C6\u008E\u00ED\u00F9\x03\u00D0\x1F\u00F6O?2\u00FF\u00FA\x1F\u00FC\u008D~\u00EA\u00F7\u00BD~m\u00D7)\u00C7U\u0089\u00D2\u008E3\u0084\u00D2\u00C6\u00F1\u00D2\u00B3u|\u00D5\x0B\u00B4\u00BF\u00E1\u00D1\rW\u00FB\u00E2\x1E'\u00BA\u00B2-22\x04\u0087\u00CFe\u0091N\x18\x02m\x00\u00AB\fA\u009C!t\u00B1K\u008B\u00B4\u009B\u00BC\x12^W \u00B3\u00B2\u0083\u00C2\x10\u00E0\u00A7u]\u00F5: u\u00ED\u00C9\u0083\u008A\u008F\u00DD\u00CE\u00A9\u00C6;\t\u00D5\x00\u00888\u0084\u00A2\u00E2\u0098+\x12\u0080v'J\u0089\u0090\u00A2\u00C9\u00BD\u009COtOz\u0092\x12c@\x04!\u00D5\u00CB\u0081>\u0091\u00F0]\u00BD\u00D7C1\x04\u00D1D!=\x19\u00E4\x04\u00BA\u00F4\u00B6\u00C2\x10`>RiP\fX\u00CENA\u00FF\u00EA\u00EF\u00BF\x04\u00DFr\u00CE\u00AFl<\u00E8\u00C9\x7F\u0087\u00E3\r\u00C0q\u0086\x00\x00\u00E8\u00FA\u00E13\u00FB\u00F8W\u00BF\u0083\u00EDW=\u00B9\rW\x01\u00D8\u0086\u00D0\u00FAM\x1D\u00BEH\u00D2$\x14\u0093`\u00D5\x18\x16m\u0095\bU\u00A0\u00BDO\u0088\x15\u00B1\u00C8W~\u00B3;\u00D9OaX+\x04\x15\u0092\u00BE\x01\u00BA\u00F4\u00F3\u008C \u00D3\u00A2O\u0082\u00F3{\u00D7\x1B\x15\u00EB?\x01\u00800\nq\x15U\u00D0\u00C0X=\x10\u00B4a\u00DC\u00CE\u00B3P\u00B5\u0089\u009F\x14h+\u00AAC\x18]\u00FBT\u00AD\u00D22\u009F\u0093x\x05m\u00C6a\u00C2\u00FD\u0088dj<\u00DE\u0089X\u008C\u00D9H\u00A7\u00E7\x04\u00C1\u00C8\u00CC%\u00DA\u00B0\u00BD\u00FBk\u00A0_}\u00F6\x05\x1B\x0F\u00FF\u00F1\u00FFKN~\u00C2G\u00F1e\u00DE\u00BE\u00AC\x19\u0082\u00EA\u00A7\u00EE?\u008Eo\u00FB\r\u00ED\u00AF\u00FD\u00B9\u0086w\u00CE\x1B:\u0080\x11\x1A\u00BEr$\u00E1\u00C3\u008Cq\u0093\u00EC@\u0097\u00E0i\u00F4\u0092\u00C95\u00AB\fbjq/\u00FFR\bWi]\u00FB\u00AA\u00F7\u008C\u00B1\u008B\u00DF\u0097H\x05\u00A0:0\u0085\u00CE\u00DEw\u00B9\u0098\f\u00A5Q(ke\b+\u00CF0\u0089E :\u00C8\u0098\x04E\u00BA\nWU\u0098I\u00CE\u0084\x16\u0086\u0080\u00D2\x1F\x19\x02\u009F\u00BF\u00CC\x17m#S\u0082'\u00F4\u00D0\u00B8\x06\u00F5\u009C\u00BE\u00C2\x10 \u00AE\u00D6\u00D0k\u00D3\x11\x01Vj\u0091\u009D#\u0080\u00F1\u00E4oY\u00C8\u00D7\u00FD\u00E0\u00EF\u00AF}\u00EB\u008F?W\u00D6\u00CF\u00DC\u0083/\u00D3\u00F6e\u00C9\x10\u00C6qK\u009A\u00BE\u00ED\x19\x1D\x7F\u00FE\u00C2\u00AEox\u00D0L\u00F6B\u00A5\u00E7\"\u00EE2\u00CD1\x00\u00A0\u00AD\u00A1\u00FB\u00E2m!\x11\u009DI8\u0094\x15\x14\t*\u0098\x12\u00BF\x1B\x00W\u00E1;\u00D5\x07\x1DI\\\u00F6\u00BB\x14D\u0090\x12\u00D8\x16\u00B8\rK]\u00EFoa|c\u00EB\x0E\u00C7\x05\u0088 \u00A1\t3q\u0084\u00DE\u00BA\u00A07u\u00C8\r\u0084[\x10\u0080\u00D6\u00EC\u00C4\u009A\x13\u00A1\u0080\u00A2\x01}\u00CCHG\u0097\u00EE4\u00A70@s5\u0089\u008A\f!\u00DC\u008C\u0095!`\u00FA\u00FC6^\u0081\u008EN\u00D4\u0095\u00A1\x16\u00DBF\f\u0093Lal\u0089J\u0098\u00A7\u00C1\u00CC\u00CB`\bD\b\u00D3\u00F7\u00B1\u00A5s\u00E8iO\u00BC\u00AE\u009Du\u00CE/\u00EB\u00D7\u00FE\u00D0+66N]y[\u00F7\u00FD\u00F6e\u00C7\x10\u00B4_qV\u00D7\u00BFx\t\u00FA+\u009E\u0088\u00E1\u0093\u0096[P\u00CD\u00EC\u00AB\b .\u00AC\x04M\u00A3\u0095QVD\u00F0\u00D5\u00A0\x1E\u0094\u00EB\x15\x0E\u00BD\u00D9w1pS\x1D \u0095\u00C6}\x0FaK\u0088\u00CF2\u00FDL\u0094P\u00A5\u00AA\u009FP\u00DDv\t\u00DF\u0093@\u00A4{\x05%WM\u00EATD\u00CA4\u00C7\u00C2\u0080*\u00B1\u00AAI\u00F0k\u00D9\u00A8\u00DA\u00D4\u00FBs\u00CE\u0098CAU\"]\u00B45_B\u00A6\u00CF\n\u0089\u00E8E\x16{YuA\u00C2]\u0090;T\u0096.1\u0096L\u00E8B0>\u00DE&\f\u009B\u0081Z\x06\u008C\u00EDT,N\u00FF\u00A7\u00EFX\u00FF\u00DF\u009E\u00FEo\u0087\x07=\u00E9J|\x19\u00B5/\x1B\u0086\u00A0\u00BAw\u00DE\u00FB\x1B~u\u00C4\u009F>[\u00E5]\u00EB\x03\u00B6\u00C3\x1C\u00B8#\u00E30\u008C\u0081\u00E9\u00DF?$CpW\u009C\u00C6\"n\t\u00E3\u0081)C\u00A1\x1B/\u00EE\u00B3B\u00E0\u00BCn\u00C2\u0088n\u00DB\u00C08\u00D5\u00F7ih3\u00C2\u00AB\b\u00A5\x05\u00A1\u00EEd\b\u00E1Jt\u00A9)u\f\u00D5]*\x00F\u00DE{\u0088\u00EB\u008C!\u00FA)\u00E5>\u00BC\u00FF\u00E1\x19B\u00CE\x19B\x05Xa\b\x13\u00E6\x027\u00A4\u0096\u00E7\u0087\u008F\u00A9\u0097w\x13\u0088$\x19B\u00A83\u00EC\u00BB\x0B\u00BA[U\u009A\u00A3\u008DV\u00E7s\\G\u00EFKl\u009D\u00F2\u00AD[\u00C3YO\u00FB\u00ED\u00B53\u00FF\u00E5\x7F\u0091\x13\u00BFz\u0081/\u0083\u00F6e\u00C1\x10T/}\u00E4v\x7F\u00F9\u00CB\u00C6\u00FE\u00DAG\u00CCf7`\x00Cy:F\u00E4\u0082\x05\x17q\r\u00ACA\u00EA\u00C6\u0094\u0096\u00D5\x16\u00C0\f=\u00E1a^3\u0089C\u00C0\u00E4z\u0088CeU\u00FBL\u00C8\u00DF\u00F34\u00A9\u00D7y\u00F4\u00A0z\u0090S\u00B5\u00D8\x1Bn\u0097B\u00D4\u0085\u00DFh\u009E2\u00D1\u00C5\u00EB\u00DC\u0090\u0089\x157\u00E0\u00A4\u00C2\x11k\x1C\u0084-A\x10\u00B6\x04\u009B\u0080D'%8\u00A9\u00D7{\u00D5\u00FB\x1F\u00C2\u00E3\u00C0\u00FB'\u0093J\u0086Y\u00F3\x1Bb\u00DE\u00BB\u00E4\u00C2-\f!\u00CE\x1B=\u009C\u00DB\u009F\u00C5\u0090P\u00CE\u0087M\u00A33\u00A7C1\u0084\u00CE\u00C7j\u00E8\u00B2\x0B\u008B\u00D3\u00FF\u00D9e\u00B3o>\u00E7'\u00D7\u00BE\u00EEG\u00EF\u00F3\u00A1\u00D0\u00F7i\u00860\u00EA\u00FE\u00D9\u00F6\u00F2u\u00FFq\u00D9^\u00F6\x1C\u0095w\u00CF\u009B\u008C\u0098\x01\u0098\u00C1\x18\u0082\u00D0\u00D4\u00A6\f4*R\u00A4\"\x05\u00B6j4\u00F3\u0096\u00C4\u00E6zt@\u00D0\u00DB20\u00D6E_\u00EE;1\b\u00A2\u00F4#y\u0080\x16\x7F\u00F6\x13\u00FD!\u00FA\\5\u00E4\u00ED0\u0084N\f\n-$(\x0F\u00D1\u00F7_\u0087/\x15\u0095T\u00AF\u0087GlV\x064E.+\u00DF\u00CB_\u00CD\u00AF\u00A8\u00E3\\5\u00BE\u00F2\x1D\u00C5\u00FD\u0082\u00D9H\x06$\u00D1\u00C8\x19\u008Cg\u0085!\u00F8\u009C\u00D7w\x156\u0099nk\x01\u00CEl8\x07\u00E8\u00E6\u00A1\u00E8\u00DA\u00B0}\u00CA7.\u00E4\u00E1?\u00FA\u00BC\u00F5\u0087\u00FF\u00EB\u00FF,\u00EB\u00A7-q\x1Fm\u00F7Y\u00860\u008E\u0097\u009F\u00B1\x1F\x7F\u00F6\u008A\x03\u00F2\u00F2\u00EFX\u00C3u\x18\f\x00`\x06\u00C5\f\x02\u00F3F{\u008B\u0090W\u00EA\u00F0\u0085\u0088\u008B\u00D4?\x1CC\x00\x1C)L\x16\u00F2a\u00EC\t\u00F0\u00FE\x0E\x15\u00FA\x1C\u00F6\x04\u009D\u00DE\u00B72\x04 u\u00E6\x18W\u00C6\x06L\x18\x02\u0092\u00D0\x12\u00A6\u00AF\u00BA \u0093Xz\x19+m\x0F;\x19\u0082\x06\u00D1\u00C4X\u0090C\x16\x7F\u008EP\x11\u00D8\u00DF\u00E1\\\u0090\u0085\u0090s.W\u0090\u008C\x02\x1Ah\ra\u00EF\b5\u008C\f\u00A1\x04rU\u00A6\x15\u00B6\x02\u00C0S\u00C8\x0BCX\u00AD\u00F9@d\u00D1\x01\x19\u00ED\u00B7\u008E\x01\u00AA\x02\u00C5.\u008Cg<\u00E5}k\u00FF\u00E8'\u009F\u00D1\u00BE\u00EA{\u00AF\u00C2}\u00B0\u00DD'\x19\u00C2\u00A6\u00FE\u00E5O\u00EC\u00D5\u0097\u00BEx\u0081\u00B7\u009F8\u0093%\x06tg\x02\u0086\fLeP\u00CC\x14hu\x06V\nt\u00C4B\u00ED\u00AB\u00D3\u00B4s\x11\u00D7H\u00BE\u0094v\u00A5\u00D8I\u00B94\u00FA\u00C7\u008A\u0095\u00BD\x10!\u00EF\u00A8\u00BD\x10c\u009C\u00A7IP\u0093\x03\u0094\u008A\x19\u00E4\u0093:|J\u00CFU>\x04PZ\u00D3X\u00DA\u0083\u00B8\u00E9\u00CB\u00AF\u00EAG\u00CC\u00D5\u00A4\b\u008AzAW/\u00D3\u00EE\x07\u00E8\x05\u0088\u00BA\u008B\n0\u0097\u0082\x1E\u0087\f=&GX\u00B5%\u00DC\x06C\x00\u0092A\u00B2\n\u00F5\u00EAs\u0086\u0097\u00E1(\x18\u00C2d^\x15\u00AA\r\u009B\x0F|\u00CC\u00BE\u00D9\u00B7\u00FD\x1F?\u00BF\u00FEm\u00FF\u00E1\u00E5;g\u00F2\u00DE\u00DD\u00EES\f\u00A1\u00EBU'\u00DE\u00DA\u00DF\u00F4\u0092\u00BD\u00F2\u00E2\u00A7\u008F\u00F8\x14\x06\u00E9\u0098A1\u00A8\u00AB\t\x02\fh\u00CE\x10z0\u0084\u00A9\u00DE[\u00F4SMC\x1DP\u00A5\u0096\x11\u0089\u00ADWM\u00F8\u00AA\u00E5\x1A\x05\u00CC\u00C8\u00A8+\u00E8 \u00FB\x06\x122\u00F3\x10m\x18S\u0086\u00E0\u00FD\u00C7y\u008A\u00ACPT\u0099\x18\u008D\u00A1=nQ\x19B\u00DC\u00B6\u008E\u00B7\\+\u008E4*\u00CC\u00D6J,X\u00C9\u00C2\f\x02\"#\u00EC\u00F1]\u00DC\u00A8\u00A2\u0085\u00C8\x15E\u00A5\u00F2\u00F1\u00F3\u0099'\u0092\x1E8D\u00A0\x12\u00C7\u0088T)\u00F8\x1C4*\u00D6|\x06\u008Em\u00C5-\x19\f\u0096\u00CF\u00B5\u00C2\u00D4\u00AA\u00CA\x10\u00C9^nS`\u009F\x1D\r\u00E3\u00DA)\u00C07=\u00E3\u0095k\u00DF\u00F5o\u00FE\u00AD\u009Cp\u00C6}\u00A6\x18\u00EC}\u0086!l\u00E9\u00DF?\u00FC\u0096\u00F1O_w\x13^q\u00D6l\u00B8\x15\r\u00C0\\\u00A9\"\x00\x03\x04\u0083\x003/f&P\u00AC)m\t\u00B0\x1A\u00A3\x00@\u00E9L?\u00FE\u008A\u00E4\u0098X\u00B2U\u00D0\u00D1\u00C3S\u00D1'\x0B\u0096\u00BA?\u00AF)\u00D4W\u00BFW\x1BE=\u00CE\\\u0087\u0090\u00CC+\u00AFj\u0087\u00DA\u00C01\u00EA\u008E{\u00A9\x1B\x02E\x07\u00C0]y\u0082\x16L\u00CDG\t\u00BA?\u00ED7~\u00F6\x10\u00E9\u00F8k;\u00EF\u00EB\f*m\x18|\u00B6\u009E\u008C\b\u00F4\x04\u00D896\u00C7\u009A\u00CF\x11:|_\u00E9\u00BF0\u0085\u00A2\u008AL\x18\x02\u0099X\u00ECSAC\u00E5j\u0090\u0092\u00A3\u00BD.9\u00CE\u0082\u00B22\u00E9+\u00E7\u00D3\x18\u0083\x04C\u00A0\u00F1R\u00D1\u00A0}\u008E\u00ED\u00AF\u00FB\u009E+7\u00BE\u00FD'\u00CE\x19N?\u00E7\u008AC\u00BC\u00C9{]\u00BBO0\u0084}\u00FD\u008D?v}\x7F\u00C9\x1F\u00ED\u0093\u00B7\u00EC\u009EA14\u00B3\x0F\u00CC\u00D4U\x03\x18Ch\x02\u00CC\u0091L`\u00EEv\u0084\u00AC\u00BDS\u00BC\x055\x18\u00C6\u008F)-\u00E4Q/\x00\x18\u00A1\u0093\x12b;\u00A5j\u00EA\u00E8\u00D1\u00AAd\x0E=\u0098\x18\x7F\u00A5@I\u00FC[\u00CE\u009F\x1Co\u00D9\x15\x17q,\u00FE9h\u00B57\x1B\u00C7\x00\u00E8,\u009F\u00CF\u00AF\x11\u00DE7\u00AE_a@\u0094\u00AE!\u00A5\u00D5C&\u0082\u00DA\u00D3\u00D7\x0Fx0T\u00CEA\x10?\f1\u00D8\u009C*DGG\x15=\u00BD*\u009C\x06g&\u00AB\u00F3\u009F^\u0088\u00A9\u00B1\u0094j\x14\x19\u0085\u00A1\u0085\x12\u00A4\u00C4k<\u0098,\x10\u00C5\u00B8\u00CA\x10\u00AA\r\u00A7\u0099g\u00A7\u00A3xr\u00CA\u00BCu@\u00BB`\u00FB\u0094o\u00DD\u008FG\u009F\u00FB\u00AF6\x1E\u00F5\u00F3\u00AF\u00C6\u00BD\u00BC\u00DD\u00AB\x19\u00C2Ro\x1En\u00EE\u00AFz\u00E1u\u00FD\x0F~a{v\x15\x1A\u00B6ME\u0080\x18C\u0080\u00BA\u00CD@\\= s\u00B0s\x1A\x14s\u00FF\u0097d\x15\f\u00A1 \x04JPJ\x0B4\u0087\u00FA\u00AAQ^\u00B02\x04(-\u00F6\\\u00B8\u00AB\u00F0\u00BC|\x16\u00B8>~\x1B\f\u0081\u00D7P\"\u00FAw\x052N\x1F\u00CD\t\u00BE\x19\u00E1\u0088B\u00FAZH}\u00AA0\u00CCc\u00A8\x03\u0091p%\u0096sw\u008CYr\fa|M\u00E1n\x04R~<\u00DC\u00F8u4\"#aw\u00AF\u00D5\b\u00B7\u00F4w\u0086\u008F\u008F\u00A0\u00CA!\u00D0\u00A9[\u00D7\u00FB]\rR\u00EA\u00BD\x04b9\x11O\x1E\u00D5\u0089\u00B8\u00FB\u00FC\u00EEd\b\u0098x,\u00A6\bA\u00C1P\u00E7\f\u00F62T\u00A2\x10,\u00D7O\u0083~\u00FB\u00D3\x7Fw\u00ED\x1F?\u00EB\u0097ex\u00E8\u00BD6\u00B5\u00FA^\u00CB\x10\x0E\u00EA'O\u00BA\u00BE\u00BF\u00EC5\u00D7\u00EB\x7F\u00FF\u00BE\u00DE\u00F6\u00B8}\u00A0\u00FB\u009F`\x0E\u00C1\u00CC%\u00D1\x00\u00C1\f\u0082A\u00D4\u0098\u0084\u00C2\u00D5\x07\t\u00840\x14\u00A6p(\u00E2c\u00E8\u00AD\u00D9\x05\u00AA\u0095\u00DE\u00FF\r]\u00B9\u00F8\u00E8A\x1D\u00FA0(A\u00F3\x16v\u008F\u0095\u00E3E\u008FN\u00D4\u00C2\u00E2\u00A7\u00FC\u00D7\u00EEi\u00F9\tm\u0082\x00Z$#\u00B5\u00F2<\u00AD\u00D4\\\u00A4-\u00C0\u00F5\u00FE\x18\u00BF\u0096gpc\u009C3\u008B\u0088\u00AF\u00A0z\x00E\u00A6\u0083\u00AF$H\u00A1F\x17\u00F22\u008D\u00E8H\x06\x1A1\u0095\x1APHw\u008F^\x1F\u00BD\u00EF\x0EQ\u00CB?P\u00EF\u00AFi\u0086N\u00C7s\u0089\u0098\u00CA0\u00F6\t\u00D2\u00C8\u00B9l\u008E \u00EC\u00DA(#\x07\u0084=\u00C3\u00C2\u00B0Q\x10\x06\x19\u00BFLl!\u0093\u00EC\u00CA\u00D2\u00C7\x12\u00BB\u00B1x\u00F8\u008F\u00BCe\u00E3;\u00FF\u00DD\u00D3\u00DAW>\u00EA^Y\r\u00FA^\u00C9\x106\u00F5\u00B2o\u00F8\u00F4\u00F8\u00E2\x0B>\u0083W\u009E9o\u00DB\u0098\u00A1\x192\x10\r\u00860\u0080\u00EA\u0081\x19\x15\x07\x11\fP\u00FB\u00CD\x19\u0082\u009D\u00A7\u00E9\u0081P\u00844\u009A2\u0084b`(\u008B\u00DB\u008E\x15\t\u00C8s\u00AB\u00F4\u009C\x14,\x05d\u0095)H\u00E9s\u00D5\u009E@F\u00E4\u00A3\u00B2HB\u00C38F\u00B8\u00CD\u0089}\u00F0\u00FE\u00E9G\u00A1E\u00DF\x18\u00C2\u0084p*\x13@\u00F3b\u00A5q\u00A3x\u00D6\u0088\u00CB\x00b\u00EC\u00D3}\"\u008DP\u00BA\u00DF\u00C7\u00A4\u00B2)\u00F1B\u00D8@&\u00B7\x03)\u0088\u00A3\u008C\u00D1\u00C7\u0099\u00D7di4\u00BAPml\u00A2#\x14\x0B\u00A8v\u00B4b\u00A7\u0090\u0092\u00DF\u0081\x11\x11\u00BCU\u00FFjH\u00B5\u00A83\u008E\u0089\u00AD\u00E30\fa\x15!\u00F8\u00FB\u00AD\f!\x12\u00DE:\u00A0\u00E3\u0080\x0E\u00C1\u00F2\u00F4\x1F\u00F8\u00E8\u00FAc\u00FF\u00CF'\u00CB\x19?\u00F4q\u00DC\u00CB\u00DA\u00BD\u008E!\u00EC\u00D1\u008B\u00BE\u00EB\u00EA\u00E5\u00EF\u009E\x7F\u00ED\u00F0\u00A6S\x06,\u00B0\u00AE\u00DD<\x07\u008D\u00AA\u0080\u00D9\x05\u00A6\x7Fb\u00AA\u0082*f\u0082\u00C2 \u00D2\x0598S\x18T\u00D1\\0\u0087\x1E\x1D\u0095\u008B\u00FCo\u00E2\u00EE#\u00E5\u00AFD0N\u00A2\u00FE\u00EC8\u00ED\x12\x13\u00A4P\u0098L\u00E8\u00C0q\u00C8\u0089^\x07'\u00FA6\u00FDW\u00C5\u00C7F\u0086\x01\x7F\u009A\u00FCl\u00E3ru\u00A0,^2\u0090\u0090\u00D4\x00\x18\u0085\x18F\u00D1\t!3\u00BEA1\u0089\u00E0,\u00EED\u00D0\x00\t>\u00B7&\u00DA\u0098\x140\u00D1\u00F2\x07\u00D4B\u00AB\u0093\u00DF\u00B4g\u00BC\u0086.m\u00EA\u00B5\u00A31\\\u00DA\u00D1\x03\u009Ci\u00A0\u00AB\u00AB#\u00F9\u00FEt\u00A4\x1A\u00C1\u00F7\u00E3hf\x05!\u00A4\n\u0086\u009D\f\u0081\b\u00C1\u0099\u00D9\u00E1\x18\x02T\u00D0G`\u00D4\u0086\u00E5\u0083\x1FyS{\u00DCO\u00FE\u00D0\u00C6#~\u00F6\u00A2\u009D\u00AB\u00F8\u009E\u00DB\u00EEU\f\u00E1\u00DA\u00F1/\u00CE\u00B9\u00BA\u00BF\u00F8\u00BC\x1B\u0087wm4\u0098+q\r\u00DD\u0088\u00BC\u00D8\x04\u008C\u00D0i/\x00\x06m\x18\u00C4T\x05C\x12<\u00D7Hf\u00A6\u0082A\x1A\x1Az\u00D8\x1381]=\u00DE\u009DR\r\u00C8p\u00E5\x15\u00A4P\u00E9<\u00F7L\\\u0085\u0096\u0094\u00C8\u00BC.\u00AEp}\u00BA!\u00CA\u00B3\x05\u00F1\u00CF\u00CBg\u00AA\n\u0082\u00D4\u009F\u00AB\u00E5\u00BF\u00D4\x15\fd\u00D0\x10~\u00FC\x12\u00A0d\u00D7\u00A69\u00B5\u00C6\x1Cd\u00E0\x0F\t\u0099\u00CFa\f\u0083?5'\u008A\u0089\u00A4\u00AFAW\x135bu.4%\u00B5\u00C7.h\t\x0E\u00CB\u00A4$'>\x1D\u00C1\u00BD.\u00B42\x03\u00ED\u00E8:\u00A2\u00C5\x1E\u0098Z\u0090\t\u00E7\u0096]\u00B14\u009D\u00A1\x1B\u00E9c\x18\x18\u00A5\u00BA\u0081i\u0083`\u00DC\x02]\u008F\u009C\u00C3\u008A|z\u00F6\u00CFu\u00A0\u00E3\u0080\u00C5Ign\u00EAw\u00FE\u00C4\u008F\u00EFz\u00DC/\u00BF\x0E\u00F7\u0092v\u00AFa\b\u00D7\u008D\u00E7\u00FD\u00FCe\u00FA_\x7Fo\u00DFpEk\x1Ehd\u0084\u00DF=\x1C9\u0089<U\x01`-\u00BE\x1B\x01O\u008C\u008D\u00C2\u00EFfc\u0090@\x17I\u00B0\u00944\u00A1F(\u008B\u008C\u00DA\u00F7i\u009A4\u00F5\u00ED\u0095\u00BA\t<\u00EE\x04\u0095\u00E7\u00B3Q\u00A5\x10\u00A0\u00CF\x00]+\u00A8\u0080\u00CC\x01 #\u00982\u008DrmA\x05S\u00D8,\u00B9\u0098\u00D1V\x02\u00B0\u00CA\u00FD\u00B9\u0093tx\tVT\x0E\u008F3PZ\u00F8V\u009E\u009Fi\u00D7\x13\x04\u00E0\u00C7\u00CC`\u00A8\u00D1\x7F\u0086\n;S\b\u00B5e\u008C\u00DF'\u00E1\u00D2N\u00F8\u00DCNN1B\u00B0\u00F49\u00EB\u00CE,\u00C8 Fg\f\u00FC~\u00FB\f\x01d\u00FC+\f\u00A1\u00D3\u0090\\\u0098\u00FB\u00ED1\x04\x00\u00BE\u0099\u00ED\u0080\u00ED\u00DD\u00A7\u00F5\u00F6\u00D8s\u00FF\u00FD\u00DA\u00D9\u00CF}1\u00EE\x05\u00ED\x1E\u00CF\x10\u00C6q\x0B\u009F\u00EB\u00AF\u00FE\u00CD\u00CB\u00F0\u00BC\u00FF\u00B4o\u00B8\u00DA\r\u0083\u00A6\x02\u0098\u0087\u00A0O\u00BC\x06\u00F6\u00BB\u0091\u00851\u0083\u00E9\u009F\u00A1\u0081\u00AA*0\u00B7\u00A1M\u00BEG\u00A4\x1D\x10\u00903'K\u00BD\u00F2\u00EF*Rh~\u00AC\u00F8\u00DF\t3\u0085\u0084\u00D6L\x12Q\u00EA\u00C9\u00CC\t\x7Fpb\u009A\u00D9_ \x04)\u00D6\u00F2J\u00FC\x02\u00F4\x01\"m\u00B2X\u00AB\rAz=\u009F\x03j\u00A5/8Q\u00AF\u00F6QS\u00A9i\u00BB\u0088\u0087\u0099.\u00FC\u00F2\u0099nA\u00EE0U\u0099\u00C2\u0084q2\u0090\u00A8|\u0087\u00AAmu\u00DFG\x1F\x13\x19\u00883Z\u00BF\u00B7\u008E\u00DD\u00FB\x1B\u00E1~``tOE\x07\u00C8T\fu,\u00D2\u00F8\u00C8\u00CDr'\fAK\x05\u00EB\u00C33\x04\u009Bk7\u00BC\x1E\u008E!8?\u008B\u00B9\u00F0>{o\u00D0\u00F5\u00D3\u00D0\u00FF\u00D13\x7Fk\u00EDI\u00BF\u00F4\u00EB\u00B2~\u00F2!\u00D7\u00F9=\u00A5\u00CD\u008E\u00F5\x00n\u00AB\u008Dz\u00B3\\\u00D3_\u00FE{\u00EF\u00D7\u00E7=k\u00FF\u00EC\u00B3\u0098\u00F9\u00E2h\x10\u00F3\u00FF\u009B\u00AC\u00B6\u0080\u00A0X\u00DF\u0096\u00DA*H\x1B\u009D/I\u00C0\t\u009E\u00EF\u0090\u00E0]\u00CBy\u00BE\u00EC\x02\x11\u00D4H\u00C6z\u0092\x00n\u0089\u00AA\u00D2\u0096w\u00948Y\u00D8\u0091\u00A64\u00B7\u00FB\u00B9\u00D2\u00A3\u00FCwf\u00BA>\x1A,\x03\u00D2q\u008D#\x01\u00BB_G\u00E8\u00FD\u00D2 \u00E2\fC\u00A4\u00D0\u008C\u00E4\u00F8\u009Am`\"~\u008E\x11\u00A1\u00D7M$\u008A\u0080B\u00C5~\u00A3\u00C8\u00D7\u00CE\u00F9l\u00E1N\u00E5V\u00F3\u00A2\u00CD9$\u00E2\u00FA` \u00E2\bA(\u00F5;l{8I\u00CD\u00A4\u00DAb8\u00F1\u00CD~o]\x1D\u00BB)\u0080\u00D1\u00F5\x11\u008E\u0093\u00CA}\u00DAa\u00B3o5\u00C6\u00E5\u00FFF\u009C\b\u00D4\u009F\u00DB\u00DC\u009A\u00D6\x15\u00DF\u0089\u0097\u00ACG\u00B0Y\u00F0\u00D2\u00AA\u00C61\x01N@F$\x01\u00AA\x025\x06\u00B7[\u0091\u00AF]0t\u0085\u00EE\u00BF\x0E\u00FD\u00BD/\u00FEO[\u00BA\u00E7\u00FE\u00BA\u00BC\u00F6\u00DF\u00CB\u00EC4\u00C5=\u00B4\u00DDc\x19\u00C2R\x0F\u00B6\u00AB\u00C7\u0097\u00BF\u00F4\u00DD\u00FD\u00B7\u00CE\u00DD\u009A]\u008B9\x14\x0B8\u0087\u00F7\u0085\u00EB\u00B5}<\x1F\u00C1\x16\x12]\u00C9\u00A2\u00C0R\u0082\u00EC\u00D0}\u00A9\x19\x13w\x15\u00C2\u00A1\u00EF\u00E8o\u00B6\u00A9\x1A\u00B3\u00F1\u00F7\x1A\u00B6\u0084\u00A4ooE\u00E2N\x1A\u0097W\u00ADG\u00E00\u009CT\u00AA\u00F4\x10x\u00DEex\x06\u0086\u00F2\u00AF r2\u00E3\u00D9\x04*\u00CD\u00D8a!\u00A4P\x1Fj\x1C\x01\u00F2\u00BE\x12{:\u00B8\u008E\u00EC\u00A3\u00B1\u00E7\u00F2\u00B1\u00D2&\x00\u00EBK\u00A4\u00F4#:}\u00FCbK\u00B1\x1F]4J\u0092\x16\u00DF\u008F\bc\x1E\u008A\u00EA\u0084\x0Ei@\u00D4\u009F\u00AF\u00AEVa\u00C5&\u0085\x15a\u0081\x13\u00B3\u0082\t\u00EB\x12o\u00B8\u0099\u009A\u00E0oU\u00D0,/\x02\n\u00C5h\u00F3\x0F\x010\x022B\u00C5\u00FBq\u00F7\u00A5\u0084\u009A\u00A2\u00ABd<\u0099\u00BF\u00E0\u0093\u00A8\u00AF\u00BF0\u00B3rN=i\x12{\"\u008A6\u00EEG\x7F\u00EFy\u00CF:\u00B8\u00DC\u00DE\u00AD\u00E3M?-\u00C3)\u0087\u008AQ=\u00E6\u00ED\x1E\u00C9\x10\u0096\u00BAg\u00B8r|\u00F1\u009F\\\u00A8/zf\u009F}\x11\x03\u0080\u00A5\u00BB\r;\u0080\u00AE\u00CA\u00EA\u0087q\rQ\u00C1\b_:\u00B1 \u0092I(\u0080%\u00CC\u00A8(\x10\u008C\x10\u0080\x0B\u0085D\f\u00BBX\\\u0092\u00F4\u00E8\u008F\u0092\u0082\x12\b&\x05\u0093n@\u0098\u00C2u\u00A1\x11E\u00D8\u00A0b\u0084/\u00E1\u00E4\u009C\u00C5\u00EF\n\u00B7\x17\u0088\u00A3\x01f_F\u0092v\x04X\u00DBgJb\u00C0T\x06\u008E)\f\u0081\x1C\u00A3\x11\u0097LV\u00EA\n\u0083PJA\u0081\u008A\u00AB\b1\x7F6{\u00C67\u008D\u00C3\u00A9\u008B\u00D2`.\x05I\x00$\u00AF,\u00A7\u00C6\u0098\u008D\u00C8\u00B0\u0094\x01\u00E1NQMi^)\u008Eh\u0086\x1AO \x11\u00F8\u00DC\u008D\x10\u00C9\u00E0&\u00F1\u00B8b\u00CD\u00B2'\u00C68\u00B4\u008A\u0083\x0E\u00C5\x12\r\x1D\u0090%\u00B4\u0099\u00D12\u00EC!\x13\n\u00BF\u00BDv\x18Dp\u0098&\x10\u00CCT\u00A0\u00DB\u00FB\u0080\u00F7\u00BE\u00F2\u00DC\u00ADq>S\u00DDs\u00AE\u00C8\u00FD\u00EFq\x01L\u00F78\u0086\u00B0\u00A5\x07\u00DB\u0087\x17\u00BF\u00FF'\x7F+/x\u00E6r\u00D8\u008B\u00B9sc\n \u0093\x07d\f\u00F6\u00EA\x15U\x05\u00B0%\u00EC\u00CB\x12\u00C5\\er\u00C4\x17XG\u00B7eSP\u00BFi\x00\x1A\u00B0\u00DAH\u0092\u008C\u00C0\u009Ae\u00E7\u00F1\x07\u00814\u00B7*\u00A3\u00D4a\u00CC\u00C30\u00CC\u00E1\u008EO\u009D#\u00AB1\u00E4_\u00E4a\nU\x04\u0087\u00F8\u00F08\u0083\u0080\u00F9\u00EC\u00D9\u0088\u00D7\u00B2%+s\x00\"\u00BC*\u00F0o2\u0096\u00C9\u00D8\u009C\x19$\u00AD\u00B9\x11\u00AF0\u00BB\u00C9\u00D9b\u00E8\f\"@\x1B\u00C2//\u00BC\x17\u00FB\x10\u009B\u00F1@H\"6\u00F3\u00AC\u00D5\u0088\x02>2\u00DA\x0B\x14\u00C3\u00EA8>\u008C\u008E\u00BC>E/R\u00DD\u00E8\u00C6H\u00A1P,\u0091f\u00E1\x0ES\u00A9J\u00FF\x02Ge\u00BD\u00A0\x1CgD\u00BE7\u00DC4\u00A2tU-J\u00E45\u00F1.\u00DD\u00D1\u00E6hqm{\x0B\u00CB\u008B\u00FF\u00F4\u0099\u009B\u00E3\x12z\u00F0s?%\u00BB\x1Er\u008FB\n\u00F7(\u00860\u00EA\u00ADr\u00E9\u00F2\u008F_\u00FA\x0E\u00BC\u00E8\u0099\x07\u00DB\x1E\u00ACa\u0089\u00A6\u00E4\u00F7)\u00E7T\u009C!\u00888X\x04\x00\r\u00E2\x1E\u00E1h\u00D4\u00DFn\u0087\u00A9\u00A3K\u00AA\x06\u00E29\f\u00CA\u00FB\u00DA\u00BF\x12L\u0085\u00CC\u0084\u00EB\u00A3\u00FE\u00B7\u0090\x16\u00E1\u00A4\u00B8J\u0090+\x1D\u00E9\x02\u009CC1\u00F7\u0080\u00A2\u0099\x11=\x04i'pI.\u00E9Q \u00A9I\x1B\\b\x1398t\x0E\u00D1I\u00DD\u00DCg\u00A0\u00AA(\u00BE\u00B5;%xz7\u009A\x11\x00!@\x18Z\u00B4\x1COB\u0097B\x18R\u00E7Bh\x18,\u0093G\x03\u00A2T\x17\u00AC\u00C2\u00D4 \u0083\u00EB9\u0089!\u009E\x1D\x11\u00B8\u00F1\x12\x1AR{\u00BA\u00AD=\x19\u00A11l\u00A5\u00FBQ\u009A\x1Fi@\u00EF\x10LK\u00DA\x01\x1D\u00AC\u00A2\u00CD\u00BC\t3\u00DCv@\x17\u00BEz\x16\u00C6\u00C0V=\x05\u00AB\u00A8a\u00F2Uv\x1E?ls&\u00D7\x01H\u00C3l\u00DC\u00C2\u00F8\u00F7\x7F\u00F6\u00CC\u00ADa\u00B6\u00D4\u00C5-\u00FFJ\u00E6\x0F8\x1A\x16s\u0097\u00B4{\fC\u00D0\u00AD\x11\u0097-_\u00FE{\x7F\u0083\u00DF>\u00F7\u00C0\u00FCzxZ\x0E\x06 \u00F6U\u00E6\u00FA]\u0080\u0081\u0083\u00B1Ja\u0084\u009E\u00F2\u0090\u0088\x00\u00FEy\u0094\u00A9\u00A4\x17X\x18;\rl\u009DF# P\u0085\u008B\u00F8\u00EC7`B\u00ED\u00C9\u00FB\x13\u00B8ZA?\u0085\u00FB5t\x0E\u00E1w)\x01E\u0081\x10\u00F8\u0094D\t\x04\u00E3$b\x0F:\u00A2>\x1E^\x05J\u00B3\u00A2R\x04s\u00A0\u00B4GJ\u00D9\u0096q\x06\u00C6\u009C\\\x01j\u00AE\x0E\x18lr\x06\u00E0\u00E2]\u0087\u0088\u00E1\x07\u00ABR\u00C3\u008E9y\"8bw\x1C\u00A6\u0085\u00B7\u00C0&-=\f-$\u00B3\u00EA\x00\u00B4fx\u00AE'\u00A22\x17\u00A5]-\u0092\x18M\u00BDc\u0081@\u00DBhs\u00C2\u0098\x0E\u00D1\u009C\u0093@\\\u009E8%\x03\u00C4sO\x04n\x10E\u0087\u0088[\u0095\u00B4\x032\x03t\x01\u0095\x11\"N\u00B9\u00BD2#\x7F\u009A\u0098\u00CF\u00FC\u00E9h\u00DB\u00FAr\x13\u00DB\u00EFy\u00D9\u00B9\u00FBe}\u00BF.n\u00FDw2\u00FF\u008A\u00A3\u00EF\u00ECNl\u00F7\x18\u0086\u00F0\u00A1\u00F6\u0087\u00BFy~\x7F\u00FE\u00B3n\u009E\u00DF\u0080\r\u0095p\u00ED.\u008B\u0084\x18\x1C\u00D2Sr\u008Dj\u00CB\u00C5\b\u00DE\u00DE\u00D3\x120i@\u00FA0`\x1A\u008B\u008C\u009F\u0093i\u00E4yD\x15\u00FCNx\u00ABJ\u00C9d\u00AD;\u00BD\u00ACj\u0090*\u00E2\x10v\u00CD\u0099@a\x04\u00D5X\x18\u0084\u00DB\u00CC\u00CE\u00E0\u00C7\r\r{\u00CC\u00814\u0087\u00BD\u00C2\u00CE!\u00AD\x01}@\u00D8\x01\\\u0095\u0080\x1B\x013i\u00A9\u00C4\"\u00F8yS\u0089V\u00D4\u0089\bT2\u00C9n\u00F7*\u00B1\x16\x01\u00CB\u00DA\u00B4o\u00F4\u0082\u0084\u009C\u0088\u0088.B\u00C2W\x1D\u008AP_\u00CAW\u0093\u00DC\x12F\u00C9\u00A2\x0Ex\x1F\u0089*\u009C\u00E1\u00C0\x18\u00958S\u0096\u00F0&\u00901\u00E43ReP\u00FF\u00ACq/z|L\u00BD\x10\x1A\x1A\u00A5\u0085\u00FA\u00E0b\x04\u0081\x15w\u00A8\x0FD\u008De\x0F\u008F\u00BA\x16@\u00DBMY%\x02\u00EF\u00BBA\x1B0loB\u00DF\u00F5\u00B2g\x1D\x18\u0096{\x00\u00FC\u00FA\u008EN\u008EA[]\u00D3\u00C7\u00A4]\u00BE|\u00FD\u00CF\u00BF\u00B6\u00FF\u00DA\x7F\u00BBi\u00F6q\u00CCDqB\x17\u00CC\x04\u0098\u0089bM\x1531S\u00DC\x1AJ$\u00A2*\u00E6\u00B0c\x19ld\tM$\u00C5\u00994Ot\u00B2\u0090f\u00F1\u00F3\"&\x01-\n\u00A8X\u00BD\u0084\x15\u00F9\u00AE\x04\u00FDN\u00BE\u0092\u00E5\u00BB\x01\u0094\u00C0\x19z\r\x06\u0088\x0E@\u00F7\b\b\u009D\u0095\u0085G\"u\u00CF\u00C2J\"\u00920\u00F8(\b/%^\u00A2\x01z(d\u00B2\u00F0\u00E3\u009C\x12\u00C5[\u00C3\u00A5\u00F3\u00BCr\x0E\u0088\x16\u00A8~\u00A0\x04\u00D7\u00F8aU\b}s\u00B5`IHc\u008D\u0090]\u0085Z^A\u00A0\x01\u009D0\u0085\u00DCI\u00DA\u00FF\u008D\x18\x05\u00F6\u00AB\u00C8\u009D\u00B2=\u00A7\u00C13\x1FA/\u0088\u00C7\r\x00\u00DEOw\u0086\u00C1\u00A6c\u00C44\u00D89\x16\u00AB\u00A0,\x19\u00DF\x01\x19\x1D7v5\u00B5\u00A3\u00BBQR\u0097\x1E\u00CB\u00D03\u00A6A\x17\u0088 \u00A7\u00D1\u00E7\u00A3\u00FA\u00B2\u00BB\u00F8\x1E\x1E\x1C\x0B\u0091\u0092]\x16\u0099\u00A8\u00BD\u008C7\n\u00B2\u00F8s/\x05\u00DB\u00EB\u00A7B\u00BF\u00FB'\u009F\u00B5\u00F1\u0094\u00FFr\u00CC\u0083\u0097\u008E9C\u00B8r\u00FC\u00FF\u00CEy\u00F5\u00F8\u00BC\u00D7|j\u00FE\u0081\u00B6\u00A6\u00C0\\\x04\x1B\u00AAX\u0093\u0086\x19:\u00D6\u009C\u0080\u00E7h\u00CE\x10j$\u00A2\x05)\x19(\u00AF\u0084\u00CE\u00C2(\u00CD\u00CDy\x1A\u00D9\u008C5\u00A4\u0099\u00A9\u00CF3\u0098\x15XD'\u00C7\u00C3\x1F\u00A0\u0099\u00E3\x00\u00A0\u00ACaIu@\u00E7\x16e\u0088\u0099\u00A5\x1DC\u0090a\u00C65\u00A2\u0090\u00C1D\u00E6YP\u00FF]\"\b\u00C8n\x10j\u0080\u00BA\u00D7\u00A1J\u00E8\x12D\x14)\u00D7\u0090\b\u00CCc\x1F\u00D3\u00AD\u00DC\u00E0\u00C4\u00E9\u00B1\x05N\u0090\u0096\x1198\u00F1J\b\u00FE\u00E4|I\u008C\n\u0084\u00E1\u008D\x12>\u00F7\u00A4@\u00BA\x10W\u0082\u0092\u00F2\u00B7<F=?j\x1E\u0094\x00%\u00F0\u00FE\u00BE\u00A9\u008A\u00E16\x1B\u008B\u00D594\u00E6\u0091\u00F5\x12$\u00CE7\x061\x16\u00A6\u00B0\u00B4>z\u00B7\u00FEGEl\u00E7\x16\x01T~~Wg\"dN#\u00B4/\x01\u00ED\u0090\t\x03I&\u00F9%3\u0084Q\u00A1}\u00C0b\u00F7\u0083\u00FB\u00F2\u00EC\u009Fy\u00DA\u00EE\x1F\u00F8\u008F\u00C74\u00CC\u00F9\u0098\u00AA\f\u009F\u00D3\u008B\u00BF\u00EB\u008F\u00B7\u00FE\u00C6\u0092\u00E1\u00EF\x00\x00 \x00IDAT\u00C3yW\u00CD.kM\u00CD)\u00D4`j\u0082 \u00EB\u00FA\x01\u00AE\x1A\u00B8\u00BBQ\\\u00CF^\"d+\u00A8y\u008B\u009A\u0083\u00C9T\b3E\u00A6\fQ\u00F7J\u00A8\u00DB\"XhUC\u0093W\x15\u00F74\u00D0\u00ADiq\t*\u0099/A\u00B7\u00A6b\x06\u00E8:\u0098U\u00D1\x18G\x10*\x02\u00D5\x04\u00EF]\x05\u00E6I\x18,~`\"\u00C1\u00DBDUI\u0086R\u00EC\x0B<7\x14\u00EE\u00C2h\u00AAB\x1Bq\x04U\u00E9\u0095\u00BC\u00954\u0097\u00E6\u00E5\u00B8\u00B8\u009F\u00BF\u00B1\u00D0\b\u00FB\x0F\u00B8\x10s\u009C0\u00A2\u008E\u009B\u0090}\u00F58\u00A6\u00D7(h\x11\u0088w<a\x1E\u00E5_\u0083\u00FA\u0080\u00A2\u0083\x1B\u00B5\u0084j\u00D1X\u00DE\u008E(AA\u00E3j\u00DE\u00DE\u0099\x1C:,\u0094\u008Dc\u00F2\x10i~\u00A7\u00D7abL\u0094\u00F2G\u00F5\u0081\u00ABB\u00CB\u00AAJ\u00A5\u00F3\u0088\u009B\u00C2\u00E7]1\u00DB\u00FB\u00F9\u00B6\u00BC\u00E8e\u00E7m\u00BD\u00FB\u00C5_X\x7F\u00FC\u00CF\x1F\u00B3\u0084\u00A8c\u00C6\x10n\u00D2+\u00BF\u00E1\u00A5[\u00BFr\u00FE\u00C5k\x7F\u00BF\u00B1K\x15k*\x18\u009A@\u00DD\u00BC\u00D7U1\u008A\u00ED\u00BBg\u009E\x063&\u009A\u0085\u00D9\u00D6|Ss\x1F\u009A\u00C6\u00D7\u00CC\u00A5(\u00D5\u00CB`\u00CB`\x12\u009D\x17\u00CBB\u00E2\u00DB\b\u00AF\u0087\u00E0:0e\x12\u00ED\f\u00C2\u00FB\u0082\u00C6\u00B4\u00E6\u00ACa\u00DD0\x0BC\u008D#\f\u00D9\u0089\t\u00E5\u00B3x\u009C\u0081\u00CE|\u00BD6\u00D8\u00FE\x02$j\x06!\u0099\u0094\x11\u00A1m\u00C1\u008E\u00F1\u00CEP\u0084\u00B5\x1A\u0092L\x04>'\u00A1\x02x_\u00E1*\u00F49H\u00BF}\x03Z\u009B\u0084s\u00B2/\u00EA\u00E7\u009C\u008B\u00EC\u0093\u00A4?\u0086\u00E7f\u00E2\u0082\u00F3/v\u00F5\n: \x1Bh0\u00C9,\u00FE\u00CE\u00F8@\u00A4A\u00AA(\u00D4aD\u0081n\x1E\x16\u0086 \u00AB\u00F4\x18\u008BMFs\u0091L&\u00EA\x04\u00CE\u00F7\x1EF\u00D8\u009E\u00B6\x07\x7F\u008E\x12B\u0089p\u00B9b\u00CC\u00B9\u00E7\"@2D-\u00CC@\u00F8\u00DC+<ygc\u00DF-\x19`\u00D7x\u0087\x02\u00C5\u00DA\u008D\u009F\u00DC\u00D8z\u00FB\x1F\u009E?^\u00F6\u00CA\u00C7\x0E\u008Fx\u00FA1I\u009D>&\fa\u00AF~\u00EE\u00A4\u0097m\u00FD\u00E6\x05\x17\fo:eC:\u00EA\u00B2o\u00BE2m\u008E-\u0085\u00A5I\u00C6\u00A9\u0091\u0088\x07h\x18\u00F7\u00962\u00F5\u00D2\x03\u00C9\u00D3k\x135oC:0=b1z\x15\u008C*\u00E8b\tSc\u00C82.\u00AD\u00E6\u0098\u00C3c\nt#z\x00\u0086\b>\u0082\x1B\x17Y\u00C3\u0090\u00A8\u00A0Ju\x01\u00DD\u008A\x1A\x18\x07\u00EA\x01L\u00E4l\u009A\u00AB,\u00D0\u0083\f\u00D0F4T$\x13\u00E3\x12\u00FCX\u00EC\u00CD\u00C8\u00D8\u0086\u009E\u00BD$zh\x11\u0092L\b\x1BFJ\u00E1y\u00D5MN\u00F68\u00C0\u0082\u0094\u00C4\r\u0091\u00CE\u00CC\u009C\u00F0\x05\x1A\u009Fsl\u00894\u00D2;+\x1E\x04\u00A2P\u00A9o\u00CB\u0098\u0096\x05]u\u00A7}I\u0081\u009D\u00AC\x0B\u008AE\x12\u009A \x11\u0084\u0088{\n\u008A\u00DB\u00D6v\u0089\x01\u00BDS;\u0098\u0099\u00ABTTO\u00AA\u0091R\u00FD\x02\x11q\u0086\u00BA\u00F4a\u00F4\u00C9{:\u00E2V\u009C\x193U\f\u009F\u00FB\u00C8)\x07\u00DE\u00FC\x07\x17\u00E8\u00E7.|\u009C<\u00E4\u00BB\u00EF\u00F6\"+w;CX\u00E8bx\u00CD\u00F6\u00EF\u00BC\u00E6\u00E5\u00F8\u00B33g2\u00A2\u00F9\"\u00A4\u0083\u008D\u0084_u\u00FE\u00D1\x7F#`\u00B3(C\x7F\u00FF\x0E\u00B9\u00C4\t\u00BC9q\u0093\u00EB2\x1C\u00BEC\u00B0\u0094\u00EE\u00A1\u00B9\u00F6\x06\u00E8\u00A10\x15\u00C3\u00A4\u00E9\f\x04\u0086\u00F4\u00E33/\u00C2=\x01X\x03\x03\u008DDf\u00E6\u00C2\x13\u00D3\u00F15P\u0082\u00BB\u00BE\x1A\u00F5\u00FD\u00C1\b\u0093\u00CC\u0080D\u00A4\u00A6\u00B0$K\u00F4\u0085.-\u00FC\u00F2\u00D3\u00A0\"\u0097xe\u009FH\x1B\"\u00CFQ\u0097l\u00B47\x18\u00D22\x15'\u0099L\u008F\u00D9\u00B3\x19h\u00AE\u00D3\u00D6\u00A8g\u00A6?\x13_\x01pz\u00A6;\u00D0\u008C\r]Z\u00BC3;\u00E6~\u00FF \u0094\u00AA\u00BD\u00D8{\u00EA\u00EE\u009ElE'Tm%\u008F\u00A0\u00A8\x0F\u00E2\u00DF\u0093\u0087#\u00FCF\u00AA\u0080\f\u00E6.D\x0BI\x1E\x1E\u0087\u0098\x13G!\u009D\u00F3I\x1F@\u0089\u00C9\b\u00A2v/\x00Fgl\u00CD\u00C3\u009CGD\x15Ww\u00C9&|PL\u00F6\u00EB\u00BC\u00CDv(Uj\u00FA\u00DC\u00F3\u008F\u00BF\u00E7\u00CC\u00AD7\u00FD\u00FEk\u00F4\u00C0g\u00FF\u0099\u009Cp\u00F7\u0096c\u00BB\u00DB\x19\u00C2\u009B\u0097\x7F\u00F6\u00C2g\u00E3w\u00BF\u00EF\u00E0\u00DAA\u009C\u00EC\u00849\u00F8+\x1E\u00A1Xz\u00ED\u0082\x11\u0082\u00B1\u00DBk\u00A0\u00CD`\u008Cs\u00D5\u00ED\x07\u00BEdI\x1F\u00C8 $\u00F5\x05\u00DE\u00C5Q\u0087;\x14M\u00E6\u00FB\u00A2piU\u00DD\u008F\u00DD\r\u008B\nE\x17[4\x1A\u00BE\u00865\x003\u008C:G\u0093\x19\u0086\u0082\x06B\x12\u00AB\u00D9\x10\u00CC\u00D8\u00C7p\u00E4\u0082\x10\u0084z\u00AE\u00A9\x11\u00A2\u00EAIJ-\x17\x1A\u00C3\u00FC\u00DA\u00AA\u00AB\x0F\u00A6fpM5\u00F3L\u00A8C\x7F\u0091b\u00C0\u00F4\u00C8\u00BB\x18#<\u00BB\x0F\u0080\u0088Ey\u00A4\u00844\u0082\u00A0\u00A1\x0F\u00C1^}\u00A8\u00E2\u00D2X\x11\u00CCT(\u0091\u009B'\x16\u00C5~\x07\u00AErHs;\u00A8\"\n\u00B0\b|\u00F6\x07W;\u008C\x15B\x05\u008D\u00B9\x0BN\x14\x16p\u00A4\u00B0\u00C2(+\u00E2\u00DC\x19S\x07\u00D0d\x16H\u00C2\u00E2@<\u00AA\u0091h\u0081U\u0099\x18\u008F\u00A0\u008C\u00A7\u00F0't&b\u00D6%\u008F[@)\u00A4\"#\u0088R\u00C2;\u0083f\u00B9\x11tO\u00EA\x12io\u00F1\x19%wsf\u009B\u008C$\u00BF\u00FA\x0BE\u0085+\u00D2\x05k]\u00B1\u00BC\u00E4\u0082\u00EF\u00DB\u00DE\u00F5U/\x04\u00F0\u008B\u00B8\x1B\u00DB\u00DD\u00CA\x10.\x19\u00FF\u00E6\u00C7~v\u00F9\x0B\u00BFp\u00DD\u00B0\x17\u00A2\x1Dk\x10\u00CC\x05\u0098k\u00C7\u00DC%Q\u00A4&\u008B\x04B\u00E0,\u008A\u0087\r\u00AB\x18\u00D1\x0F\n,]\x124\x15\u008C\u00CE8Dh1\u0090@\u008F\u0084\u00B1\x1D\rcx\f\b\u0093\u00BD\x1F!\u00BA \u0082\x00:\x064\u009D\u00A3\u00CB:\u00809\u00BA\x17r763\u00A0\u00D68\u00AC5\u0098\x02\u00C2\u00F3)\u00C2\u0088\u0098\nR\x1A\u00C1\u00F8\u0099\u00AB\u00858\u00C5\u00C7\b\u00AA\x01\u0094\u00CE\x1C;|!\u00931%2\b\u0098Mb\x17\u00FFQ\u00A4\u00AC[\x0F\u00EEqF\x10\u0091\u00CE\u008AHpj\u00E1\x1D\x002\x00\bH\u00DF\u00A63\x10i\u0099\u00D9Y\u00D4\u009C0\x04R{\bJ\u00A8\x19\x16\u00DD\x19MB\u00F4tw\u00F8|uC%6\fC Lz\"\u0083\x17\u00D0>\u00B2,\x04\u0097R<\u00A2\u00B9+\u00BB\u008B\u00B1y\x16L\u00B5)\x04\"\u00E0@MY\r\u00F1\u00A4\u00DD\u00D1\u0089\u00A0\u0084\u00CB\u00A1\u00DC\u00FC0\u00AD\u00B2\u00DBC\x1F\u009E\u008D[\u00D8|\u00DF+~a\u00F3M/x\u00FF\u00C6?\u00FF\u0095\u00BB\u00AD\u009A\u00F3\u00DD\u00C6\x10\u00AE\u00EE\x1F|\u00F8\u00AFn\u00FF\u00EA\x1F]\u00BA\u00F6\t\u00A8,\x00\x15\u00EC\u0083b\x03\u0082\r\u00C0+\x1AYu\u00E49\u008C\u00B8G\u00E9\x18\u00FD}\u008C\u00A2\x1E\u0098\u0084\x00oKAl\u00D1f 8\u0093\u009E\x04\x12\u00A1\u00C9U\u00F5\u00A4i\u00D1\x12\u009B8:;q\u00F4\u00C5lK\u00B0ad\u00D8\u00B1\u00B1.d9\x16E:>[2\x05\x1A\x0F\x03\u00C2\u00B3\u00B2Bs\u0098O\u00C8\u00EF\x06A\u00F5\u00DF\u009D\u0098\u00A3\u00CAR\u00E8\u00C3\u00FC\u00EE\f\u00C1Q\u008Ee<\x0E\u00C8\u00D0b\u00B1\u00AC\u00C6@\x0F\u008A\u0089\u0087\u00C3\u00C5\u009BiW\u0092nG\u00CE\u008E\u00DF+\u00A6\u00C3\u00A0\x12\nwp~\u00A5N[\u00DE\x7F\u00C4&9Y7\u00A60k\u008C\u0083\u00C6X{\x00'\x04\u00CD\u00F7\u00D1\u00DD(\u00C8B\u00AB\u0089@\u00FC9\u00AA\u009D$xM\x03\u00D5\u008F\u00A9\u008D\u00C3\u008Fu\u008F\u00C4t&ch\u008D\u00CA:W\u0089\u00C6<\u00C7|\u00A2;\"(\x0B\u00C6\u00DF\u0087B\u0090\u00E9\u00E9\u00DD\u0099l\u00F7\u009A\x13#B\u00D2+\x19Im\u00B7\u00C7 \x0E\u00D1\u00A4c\u00E3\u00C0\x17q\u00F0\u009D/\u00FF\u00A3\u00E5%\u00E7]>{\u00F4\u008F\u00DF-\u00FB>\u00DC-\f\u00E1:\u00BD\u00F6\u00C4\u00FFg\u00EB\u00FF~\u00DD\u00EBgo\u00DB=zv\u00A1\n\u00B0\x1F\u008A\r\x00\u00BB\u009D\u00D8\u00E7\u00A2\u0098\u00AB\u00B9\x13\u00E1\u0084\u00EBk\x18J\u00F0\u00AEf7\x1B\u0085\x0E/\u00F7\x06\u0088\u0086l\u00CF?_L\u00AA\u00EE\u00FEe-\u0085\u0089\u00DD\u00DE\u0092\u00A4\u00C4\u00E4\u00CF\x00\u00AF\u00C7\u00A4\x16\u00E1\x00Y\u0087\u00CA\x1C\u00AAV@\u00B3\u0083\u009E\u0081\u00E6\f\x01\x0E3kHr\u00F54\u0098\x112\f\u0080\"\u00A9\u00F3\u00ABDxn\u00D4i\u00A2\u00FB/\u0098\x03\u00E2\\\u00B7\u00C9\u0083\u0099\u0089\u00ADY_\u00EA1\f\x00\x11j\u0089\u0092s\u00C8*\u00AB\u00C8\u0080\u00A9\u00C6\x0EL\f\u0095;\u00EA\u0098l\u00B0\"\u00FE\f\u00E2\b\u00A20R\u008F\x11`\u00BD\u00C2\u00A6-\u008D\u0099\x1C\r\u00D1\x19\u00BF\u00A7Ng$\u00E9\u0086K\u00A6`k\u00F3\u00D4\u00E4\x0E3\nJ\x0B[\u008E\u00BD,\u00CE\u0087\x02\u00DA\u00ED\u00B9\u009A\u00D9\x07\u0094\f\u0085\u00CCK\u00C9\u00E0\u008DX5\u0090\u00D2\x10\u00C7L\u00CDr\x13\u00B4$Z\u00E2\u00D8\u00B5\u00D3q=:j\"\u009B$\u00D4\u00A7w\u00C8\u00D5\x0BzL\u0094\u00C7{\u00BC\u0083T\x1FJ+?O7\u00E31\u00E6\u00B5~\u00DD\u0095\u00BB\u00B7\u00DF\u00FA\u00B2\u00D7\u00E9\u008DW>Z\x1Ex\u00D6]\u00BEC\u00D4\u00DD\u00C2\x10\u00DE\u00BC|\u00FD\x1F\u00FC\x0Fy\u00C5Y\u00E3@\u008E\r\x00f\x07\u00D8\x03`\x17\f\u00A22\u00B8\u00A8\t\x17\u008B\u00BB\x1A\u00D5\x10\x04\u00E3:h?`_\x16\u00A3 XJz\u0088=\u0080\x0Es\x00py>\u00C0\u00FA0f\u00C2Q$\u00CA\u00B0W?@\u00B0\u008E\u00E6\u00EA\x01\u00D3\u0095\u00BB'\x1FY1\u0096\x01c\u00893hn`J\u0095\u0080jDa\f\u008CjR\u00C2{\tn\u00A7\u0091P4\u00F89dU\u00C3!\x16Q\u00DA\x13\u00D4\u00A5;},\x12\u00C7\u0081\u00F0\u00CD\x16\u00C6B\u00A1\x17\u008B\u0090\u00D2\u0096C\u00F3'Hwg\u0089\u00E2H|\u009F\\:\x16;\u00BB\u0090\u00A2\u00D2\u00F8\u00AF$\u008C\u00F8\u00C9G*H\u00C4`\u00D4\u00E0\u00844P\u00A6\u00DB\x7F\u00C5\u00C2\u00C6\u008D\x10\u009D\x00\u00B9\u00D7]\x10ZU\u00B7\u00AA4\u00EE9\u00E7\u00EA1)\u00EAy\f\u0081\u008A\u00A8\u00D2\x144F5\u00C9\u0089\\\u00C3`H\u00C6\u00C2\u00ACI+\u00D3#D\x04\u00E1\u0095I\u00C7\u00F74\u00AA\u00B4\u00BEK\u009D\u00FE\u00A4\u0089\u00A7j\u00D3\u00A6\u0098]y\u00D1Y\x07\u00CE\x7F\u00FEK\x00<\x03wqk\u00B7\x7F\u00CA\u0097\u00D6\u00FEn|\u00DBO<\u00BF\u00FF\u00DE\u00BF\u00BCem\u00D3\x7F\u0099.\u0098-\x007w\u00C1\x01\x05\u00B6\u00E1\x7F*X@\u00B0\x00\u00B0\x10S\r\u009605b\u00E1\u009F\u0097Hc \u00D5\u0087\u00B12\x03\x18\u00BB\u00E8\u00E5\u00BC\u00E2\u00E1\t\u0090\u0097\x7F\u0086\f:\u00D61b\rK\u0099\u00FBw\u00EE\u00F6\u00D0\u00CC\u00D0)3\u008C\x180\u00A2a\u0084\u0095e\u00EDbj\u0080\u00B6\x01*\x03\u00D0\u00D2\u008E\u00E0\u009A-hs\u00C8\u0090ff?\u00CE\u00D2\u00A8\b\x01\u00CB\u00A9A\x06\u00A0\u0089\u00B9\x18K\x1A\u00B3\u00D9\x0BL5\u00D1\u00E6\u00FF\u008A\u00C7gj\u00AA\t*\u0083\x1Fs\x06\u00E4}(\x1A\u00BA\u00D7`0\x17g\u00B3\u00F1\u008A\u00A9/v\x1DK\u00B8!\u00CB\x12\u00C2\u00A4\u00AB\u00D9,\u00FD\u00D9\u00A4\u00F9\u00BD%\u00FAS\u0099#b=e\x06\u00C8\u00DC\u00FF\u00EC\u00B3\u00CA\x1C\u00C6\u00A6\x1D\u00811\x03\u00D4\u009F\t\u008E\u00C0\x04\x16\u00D1\u0099\u00CFkc\x17&j\u0089\u00C4\u00BCU4e\u00CF\u00E0\u00CF\x1B\u00CF\u00E4\u009F\u0083i'\u00A3\u00CF\u0087J[\u00D0\x0E;\u008Fr<\u00F6\u00A7\u008E\x14w2\x7F\u00FE1\u00CD}\u0096(5\u00DA\u0091\u00A9\x0FV\x1D\u00BC\u00A3\u00BD\u00EF\u008DO?\u00F8\u00C6\u00DF\u00FE\u0089#\u00BA\u00F8(\u00DA]\u008A\x10>\u00AB\u009F>\u00E3Y\u00DB?\u00F3\u00E2\u008F\u00AD]\u008D\u009D\u00BA^B\u00DC}M\u00B1\x0B\u0082u\b\u00E6\u00A2\u00E6\u008F\u0085\x05\x05/\u00E0S\u00AE,u!\x1Epd\x10\u00BF\x03\u00F1]\u00DCX\u00D8\u00E2\x18\x19D\u00AA\x07K\u00CFGH\u00B3\x1D\u00E3\x0B\u00E6\u00E8:\u00C3(\u00EB`\u00D4!\x03\u009E\x15\x03\u00BA641\x06\u00D0\u00D4\u0088\u00CA\u00CD\u00A0h\u0093\u0085\u00D4\u00A0\x13\u008F\u0082\x13\u00B2\x0ENX-~\u0097N\u00E3\u00A3K?\u00D8B\u008E\u0094gM\u0087l\u00CC\x19\u00DDs!\u00D6K>\x02]h\u0094\u009A\u008A\u00D0\u00C9\u00AD\u00C0\t2\u00AC9R\u00A8{~\u00DF\x11\u00D7\u0080@6R~WwwB\u00A8Z\fn\u008F-\u00EA\x04u\u0082bhS\u00A2\x02A\tSN4\x02\u00B1\u00DC\t\u00D6Q\u0088x\u00D40Lj\x10\u00B0\u0094d&cVn\u0098,v\u008A\u0090\u00F6\x00Pl\b6_\u008CTl\u00B9\x1CUa\u00F5.V\u0095N\x12\u00FD\u0098\u00EF\u00C4\u008B\u00C1\u008A\u00BB)s\u00DE\u00DD\u00D8\b\u0081H\t\u00A1\x0E\u0083K\u00A6=\x11D\u0088j<\u00E2\u00A4)\x02\u00B5l\x1C\u00B8\x05\u00FB\u00DE\u00F9\u008A\x17/\u00AEx\u00CD\u00BB\u00E7\x0F\x7F\u00DA]\u00B6\x15\u00FD]\u00C6\x10\x0E\u00EA\u00DE\u00D9\u008B\u00B6^\u00F8\u008A\x0B\u00E6o9\u00D1\u00EA\u00F0\u00D5$f\u00FE\u00D9bQ\x00\u00B7\u00C0\u0098\u00C2\u00CC'\u00A5\u00A9\u00D9\x15\u00C8\u0087\x07\u00A4\u00FA\u00D0\u00C4\u00C3\u0093\x15\u0090\u00F0F \u00EA#0]vt\u00AB|\u00B5g7G\u00D2\u00B6<\x1A\u0080\x19T-K\u00A23\u00BE\x00n/\x10+\u00BD\u00DAK\u00A6b\u00C3\f#\u00A5\u0086\u00B8g\u0081\u00AE\u00BE *'\u00FA0k\u00D3\u00ED\bp\u00F1h,\u00FA\"\u0091\u008A\u00AB*\u00AD\u00D9T18}\x1E\u009D\x18\x1E\u0085JT.\u00AD\u00C3bo\u00F3\u00AD\u00939\u00AFYx\u0084\u00EE|/pI\fD\u0090R\x10\u00B9C\u00F5\u00D0M\u00CC\x06aR\u009BC\u0099\u00E8\x0F9\u0086J\u0097\u00F5p\u00B42\x16\x0E\u00A8\u00FA\u0092\u00C3\x1E\u00C0\u009C\x06'\x1E\u00B7#\u00D8}\x06\u00EFi\u0084\u00EA2\u0099G0\u00A4\u00F46\x04*\x10\u0080\u00D9\u0087\u00D9\u00F7\u0088(\u0082\x13\u009E\u008E2\u00C7\u00D2<\u00F1\u00C9\\\u0094\x18\x07c\x022&\x12\u00D3% \u00DD\u008D\u0090\x03R\x1D\u00CA\u00F5\x1E\u008F\u00E9?L\u0083\u00A4\u0080Pa\x14f\x10m\u0082]\u009F\u00FF\u00F8\u0089\x07\u00DF\u00F4\u00A7\u00AF\u00D0[>\u00F3]\u00F2\u0080\u00AF^\u00EE\u0098\u00C6;\u00A1\r\u00B7\x7F\u00CA\u00D1\u00B5o\x7F\u00CE\u00A3\u009E\u00F3\u009Bx\u00DE\u00D3o\u009D\u00DD\n\u0095\u008E|\u00DE\u00E9\u00E2\u0084\u00FF\u00D7\u00DC\u00C1\u008254/q\u00A6\u00BE=\u009B3\x04\x117vk\u00AC\x1D\u00BA\x0E\x05\x00\u008B\u0087\u0088\u00A4\u00DB0\u00D5\u00D9B\x02\u00C2o\u00C6\f\u00809D\u00D6\x00Y\u0083A\u00E5L\u009F\u00CA\x14\u00E6\u0099\u00FB\u00EE\u00FDw\u0087\u00AB\u0082\x01\u0083\u00E7.\b\x04M\x04\x01u\u00A5\u00C0^G\f\u00BC&\u00E11\u00AD\u00D6\u008E\x06\u00DC\u00C0H\u0098ly\u009A\u00CE\u00D0\b\u00AB\u00A3\u009E\u0082\u00CFeQ'\u00D8\u00AF\u0090\u00D1DNE+4\u00CF-i\x1C\u00867\u00EF[[<\u0087\x05<\u0091\u00B90\u00D8\u00AB\u00F2\r\u00BBg\u00D4\\\u00F0\u00E3\u00B9\u00E35]\u0081-\u0098\u009E\x10\u00AE\x0B \u00EEuI\u00ECA\u00A3g\u00FE\u00C6O\x11v,\x16\u00C5\u00D9d%~\x02\u00EE\u00E5q\u00E9+\u00F0\u00C5\u00C4\u00D4q\u00A6\u00AD\x07s\u00A1\u00DA@\u00E4\u0094\u00C4\x18k\u0083a\u00D2<Ki\u00BE\u00AE\u00AB\u00B8\u00A8*\u00BC\x01\u00EFA\x01\u00E2L+7\u00BD\u00C9>'\u008C \u008EI\u009EP\u008D\u00CA\n\u00A0+Z\u00EFh7\\\u00F3\u00D0\u0083\x1D\u00E3\x7F\u00FE\u00CB\u00F7\u00BC\x13wA\u00BBKl\b\u009F\u00D2+\x1E\u00F9?\u0096\u00BF\u00FF\u009C\x1B\u00E6_\u00F4_\x0E\u0089\u0085&\u00BFt\x00\u00B7\u008Ab/\u0080\u0083*\u00D8\x12`\u00E16\u0083\x11\u0096\u00A46\"\u00ED\x07\u00F69\u0099I\u00A8\x10\n\x0B?\u008Ec\u00F4<\u00A4}\u00816\u0083\x11st\u00DB\u00EA\u00C5m\b\f\u009E\u009E\u00C1\u0092\u00AB\u00D7L\u0095\u0088|\u00C9T!\u00EA\u00F7\x0E\u00C1\u00E8\u00EA\u00C4\u00A4\u00E8{\u00842\u00A7\u009A\u0090\u00B5\x15\u00CB\u00B1\u00D5]\u0099\u0088(\u0088@\"\u00CA1\u00ED\x01\u00A9\u00BFS\x0F\u0097<G\x19Z\u00CD])\u008C)\u0089\u009A\u009D!k46H\u009FC:\x170%\u00DA\u00E0\u00C4T\u00C6\tVy\u00AE\u00EE\u00CC\u0086d\u009E\u00ABI]\u00E5Y\u00CA\x1F\u00B7\u00A2c\u00D2z-&cP|6\u00BD\x07\u00EF\x13\u00C4\u00BA\u00F3\x1E\u00E9\u008F\"cL\u009B\f\u00CD\u00C9\u00B9\x7FW\u00CB>\u0094\u00D7S%\u0090$F\u00BE\x0F/{\u00C7\u00C4x\u0089=1\x1C\u0091M\u00E2MZ\u008C]&\u00E3\u00A4\u00F0\u00E1\u00B3\u00DFN\u00A3As\u0095n\x04\u0098\u008DK\u00B4\u00F7\u00BE\u00F19[\u00EF\u00FE\u00E3G\u00DE^7G\u00D3\u00EEt\u0095a\u00EF\u00C1/\u00CC\u009F\u00BF\u00FD\u00C2\u0097\u00BDc\u00ED]\u00F31\u0092]\x0E5\x05\u00AB\x18\u00C9\u0088z\u00AF\x00\u00BBT\u00B1\x0E\u00C16\u00CA\u0094\u008A\u00A1\x00\u00BE\u00E6\u00EEn\u00AA\u00A5d\u00A6\u00E2\b\u00DA\x10\f&\u00AF\u0094\u00D8\x07m\u00B8\x1D\x03D\u00E7hn8\x1C}\u0081Z\u00C2\u00B5%M's\u0090\u00C2\x04\u009C\u00A8\u00C1\x1D \u009A\u00D9\u0097}\u0081\u008Chh\\\x10\u00AE2\u00984pi\\-\u00D9~\u008E(\x17\u00BCd\u0096\u00A1b\"\u00C5s\u00BA\b\u008D)\u0095|\u00EE(]C\u00CAH^\u00EBY\u008DR\u00CF\u00ED\u00D3\u00EAQ$\u009C\u0094\u00F6~\r\u00AD\u00F1 |e?\u00E9y\u0090IG:\u00F9\u0087'\u00D9)\u009E\u0090\x14\u00FA9\u0093\u00C5\x04\u008C/\u00A7\u00A4\u008F-\u00E3\u00A3\u00E2r\u00C4\u0091z\u00DF-\u00FAQ\u00F4\x12\u00C8H\u00BB\u0089\u00C3v\x00\u00A1\u0086\u00E5\u00E3\u00DB\u00DD\u00F9\x1EZ\u00B3~\x18g\x15\u00EB\u00B1\u008CSl\u00E3\\\u009B^\u00CD\u00E35\u00A9\u00C9k;\u009A\u00AA\u0090o!m\x14\u00EA\u00FE\u00F2\x05b'\u00A8\u00FA^W\u009B\u00A3\u0082\u00A2\u008F\u00F9.b\x1D\u00B3\x1B?1_\u00BC\u00E3\u00CF_\u00A6\x07>\u00FFh9\u00E1\u00AB\x16;/>\u00FAv\u00A7\u00AB\f\u008F\u00FD\u008Do{\u00F6\u00AF\u00CB\u008B~l\u00FFl\x13\u00AB.\u0094;\u00D2FX\x04\u00E2L|\u00F7f\u00E1r\u00A5\u00AD\u00A0\u0085<`H-\u00A1(\u00E1s\u00FC\u00D7\u00ED\x0BI?\u00ACz\u00BC\u00E6\x7F\u00EBP\u00B1\x12*\u00C9\u00BD\u00D3B\x1CP\u0097\u00B9\t\x10'x\u00C2\u00DFT\x0B\u00E0\x16\u00E8p\x1DJIv\x02%.s \u00AA\x04\u00F3\x01\u00B2\x1F0X\u0089\u00D2:\u00F7U\u0088x\u0085\x12\u00B0\u0094\u00C9\u00DF\u0084\u00AF\u0094\u00D4\u00DE\x187\x10(\u00C5\u00A5ZQeR\u00DA\u00C3\u008D\u00A5\r\x11\x06\x1DR\u00CF\u00E1\x7F\u0098&\b\u00EB\u0093\u00F9X\u00F0N\u00C2t\u008B]\u00E0\u0082vD\u00C2\u008F@a|dB~P\u00CBx\u00A9\x12Q\rb\f\x07\u00D5+M\x0BId\u00B4P\u00D2\x07\u00DDfNF\u00A2sJ\u00F1\u00A2\x06\x043\u00B6\x0B\x15,\u00F0\u00E2\u00EA\x11U\t\u008FgH\u00B8\u00EF6\x0EWIb\u00F3[\u00DA!\u00AAJ@B\u00E7\u00F3\u0087zP&\u00A6\u00AA\x11aK\u00D1`4\x03\x04\u00B8\u00EE\u00DA\u00D3\x0E.\x16\u008B\u00E7\u009F\u00FF\u009E\x0Bq'\u00B6;\x15!\\\u00ADW\u009D\u00F53[\u00FF\u00E6\u00D9{\u00E77\u00E3\u0090\\\u00EF\x0E4\x05\u00B0G\x14\u00BB0`\x1D\u0096x3\x13C\x0B\x16s\u00D2\u0083A\x00S\u00B0F\u00B3Q\u0087\u00E7@\u00C4\x12\u00F0\x00\x18ihj1\x06\u0090\x19D-`\u00BA\u00EB\x1C\"t-\u009A\u00E4\x17w-\x02\n\u0096J\x1F\u00FC.44j%F\x1F\u0095\x11T\u00A6+\x19\u0081\x0Fe:x\r\u00B7p\u00F7\u00E5\\\u00F4\u00EF\\\u00CD<\u00C6\u00DE\u00AA\u00FF\u00DD\u0089^\u00F3Nv\u00AC\u0095\u00FB\u00D8\u008C\x06yN\x02_lB#\u00F7S\u0090\u00CC,F@\u00E9\u00E6\u00BF\u00A8\u00AF\u00DD@\nH\u00B1Z\u00B3))\u00C1\u008B\u00FF=\f\u009D \x120\u008FBTb\"qNR\u00AF5\u0098\u009C1\u00A2\x1A\u009D\u00C8\u00FE\u0086\u00F2\u0099\u00CF\u00DB\x1D\u00BD$\u00E7!+\u00A8\u00BE\u00A7@\\\u009A\u0088\u0083\u00E5\u00D32\u00EF\u00C5v\u009B\u00AE\u0088!\u0099W\u00CFk\u00F9\u00BD\u009E\u00A7\u00FE\u00DE\u00D5\u009D\u00DC\u00EA\u00F1\t\f\u0080\u00C2\u00EA5\u0085)\u00D6\u00B9\u00F5\u0093\x03\u00EC(0\x1B\x0F`\u00F3\u00E27>{\u00F3\u00D27\u00BEn\u00E3QO\u00B9\x12wR\u00BB\u00D3\x18\u00C28\u008E\u00F2\u0082\u00AD\u00E7\u00BE\u00E4\u00EF\u00E6\x17\u00AE/\u009AW\u00C4=\u008A~\x14f;\u00B8\tK\u00AC\u0089\u00A1\u0085Z:mA\u00A9\u00EA\u00FFI\u00CD\u0091\x1E\u00FF\u00EA\x04R41\u00F2\\\u00CA\u0080\x01\u00A6&\bf\u0098\u00D3\x06\u00A03LU\x02\u0097\u00D2\u00FE\u00D7\u0089\n\u00C2\u00E8f\u00DC\u009F\x06\u00C0\x0E\u00A0\u00EB\f\u00CD!\u00BF\u00A5d\u009B+R\u00A4\u00EC\u00B1P!\u00AA\u00A6\u00B1\r\x00\u00B4{\u00A4\u009FL\x19\fd\x06\u00ED\x1DQA\u00D9\u00F5\u00DC\u00C8] \u00BBc\u00E0Q\x18\x18\u00EB\u0084\u0096\u00F3}\u00CEr\x0Bu\x12\t\u00E7\u00DE\u00C3\u00BD]\x1AUo&\u0085X\x0B\u00B4\u00C4.z\u00B9\x1A\u00C82\u00EC4\x14\u00BA:@f&\x00\u0098?\x01&$y\u00DF\u00A2\u00CE\u00F3\u009C\x00v \x07\u008E\u0094L\u00B3\u0097\u00CFD\u008D\u00B5\u00B0\x0E\u0099M\x12\u009C\u00B8\u0084\u00AE\u00E6K\u008B\u0094d\u00D7bN\x035\u00C5\u00D3J\u00F4\x17OE\r228\u0092\u00DFc>*c\u00D7r\u00CC\u00D7\u00816\x00\u00BEq\u00AD\u00F2=\x10\tHv\u00ED*\x16Yz\u00DE\u00D7\u00C6\x7F\u00E2\x17>\u00B1~\u00F0m/\x7F\u0089\x1E\u00B8\u00E1{\u00E4\u0084S\u008FN\x02\u00AF\u00B4;\u008D!\\\u00A4o\x7F\u00C6Kq\u00DE\x13\x17mt\u00B9\u00FC\u00A5\u008D\u00EF \u0080[`\u00B5\x15\u00D7\u0094\x1A{\u00A9\x1F\u00A4fN\u00EBPw72\x1B\x12\x1E\u008DH\u00DB\u0082I\u00F3\x063\u00B2)\u00E6P\x190b\x0E\u00C1<\u0082_\f\x11T\u0083VZ\u00E3G'*\u00D1\u00861`,\u00F7[\x10tF.\n3\r\u00FC\u009E\u00DA\u00FC}K\x10p\x1A\u00A4\u009C\u008D\t,\x0BO\u0080\u00DC\u00D8\x05\u00A0e;\u00B6k\u008B\x05V\x10\x01\u00FB\u0093\u00B2\u0088\u00B8\u00B0\u00C85\u00E9\u00EB\u00E7\x16l\n\u00B0\u00A4\u00BDAz\"\u00D2\u00BA\u00E8\u00BC?Z\u00D0\u00C3\r\u00C7G\u0091X\u00E7\x14[\u00CA\u00F8\x01\u00B8\x1F\u009F\u00CC\u00A7\u00C0nk\u00FE\x1C\u0082\x18w\x12>Q\u0090F\u00FF\u00E1\u00C5U\u00B8*\u00A5EpV\x06\u00E8\u00F51z\u009B\u00C2y\u00A2\x0E\u00A5\u0094\u0095\u0098\x16a\u00DDu\u00E5\x1E\x0EH\x06J\u00A6\x14\u00CC\u00C8\x11\u0094(\u00AC\u00DC;%}\u00F7q\regm\u00A2\x1C\u00CDg\u00ED\u0092\u00CC\"\u00F6\u00A8(s>)9\x7F\u00C7\u009A@1\\\u00F2\u00F6'n\u00BE\u00E5%\u00CF\x00p\u00DE\x11]|\u0098v\u00A70\u0084\u00EB\u00FA\x17\u00EF\u00FF\u008B[\u00BF\u00F8\u00C2k\u00D6?\u00F3%\u00B2\u0081l\x02\u00E0V\x00\u00BB\u00B4a\x1D\x1D3\u00A1\u00F4\u00CF\x05\u00D0\u0080\x02%\u0093\x0El\u00BD\x12\u00B8[(\u00B2`\x06\u0088%)\u0089G\u00AAu\u00C9(\u00C4\u00B4t\u00DBw\u0093i)y\u00BB6,\u00C5l\x10<wBX\u00E5\x7F\u0090\x06fDr\u00B9G\t\u00B5B\x18\x1D\u00E2\u00E8\u00B8\u00A1(7\u0091\x19\u00C9\u00B5(a\rG\u00CC@\u00CAP2\t'V\u0095\u00E9y\u00A2\u00C9\u0084\u0094k^b\u009D\u009A\u00CB\u00B1O$}\u00BE\x03\x12~\u00D1\u00F3\u0085\x05N\u00A8'\u00BB\u00E4\u00E5Eua\u00FB\u00F1\u00D8+\u00A1\u00CA9-\u00E7\u00C65\u0096\u00BB\u00B0J\x18\u0081\u00C8\u00E1\u00B1\x0F\u00CC\u00D5\x10^\u00EBs\x13\u00B0\u00BF2P.\b~V'\u00E4)\x1C7\u00F2\x1A\x0B\u00A1[\u00DF\u00A6\u00DA1/\u00A1>\u009F\x1B\u008D\u00B5\x01\u00BAD\u0098H\u00E39\x15\u00901\u0088?\u008D\u00A0\x1C\u008E\x0B\x04H\u00B8\u00CCw\x06\u00EF\u00DD\x1E\u008BP\u00ACm\u00ED\u00C3\u00FE\x0B\u00CF\x7F\u00A1\u00DEt\u00E5\x1B\u00E4\u0094\u00B3\u00F6\u00DC\u00E6\u00E9w\u00A0\u00DD)F\u00C5oy\u00F6\u0099\u00CF\u00FF\u00DD\u00E1\u00F7\u00BEw9l}\u00C9\u00C8\u0080-\u00C2C\x05X\x070\x17/v*40j\u0098\u00F7X-\u00B9z\u00BC\u00F9m\u00C0\x1C\u00A2s\fX\x03d\u008E\x06n\x1C\u00DF\x1C\u00DA'\u00A4\u0096\u00E8\x01.\u00E7\u008D\x014\x1D\u00D0\u00E8\u00BE\u00E39\u008E\x12Z\x04\x10\u00F1~t\u00AF\u00F9\u00B9\u00D2\u00DC\u00D8\u0098\u00D7\x00\u00F4\u00EFs\u00C7\u00E74\u00E0\u0089G\"\u00DA\u00F9\u00C5\u00855qw9k\u009C\u00C4\x01\u00B0\u00FF!\u00C6\b\u00BF?&\u00A8\u00C6\u009E*~W\u00B2\u00B5\u00EA\u00E2\u00F4\u00F1G<\u0085\u00DB;\u00C2\rI#f+\u0092^\x12\u00E6\u0086J\u00E1\u00E8\u00A5DuJ\u00B8M\u0081\u00AA\u00FAX\u00FA\u00B5\x11\x19\u00B8\u00FD:\u00EC\u00DFF5-\u00882\u00E3\x14r\u00B5p(I\u00E0t\u00EBN\u00EC\x0EZ\u00C6\u00AB\u00CEP'(\u00A0el\x02\u00A3;\u00A3w2 )\u00E7\u0093q\u0092)\u00FA\u00C8\u0098\x19\n\u00A4\x1A@\x04\u00E5\u00EFN\u00E2>\u00D8\u00C9\x1Ci\u00A7\u00E9Ts\u00C4\x02\u00A2F\u00AAa\u00A9\u00A2\r_\u00BC\u00FE\u00C4\u00ED}\u00DB\u00EB\u00BF\u00FD\u00D7\u00FF\u00EB\u00CDw\u009C\u00C2\x0E\u00DD\u00DA\u00ED\u009Fr\u00DB\u00ED\x1F\u00F4cg\u009E\u00D7_\u00F9s\u009B\u00B3}w\x1A:\u00A8\u00EDV(n\x05\u00B0\t\u008BM\u00D8V\u008BI\u00E8\u00EA\u00F1\tb\u00DF\u0097\u009A\u00A1\u00CC\u00A33\u0093\x0ES\rF\u00CC\u00B1\u0088X\u0082\u0099\u00C7\x15\u00CC\u00D0\u00A5a\u0094\x01\u00A3\u00D0\u0097M\u00A16\u00B3\u00ECF\u00CF9P\f\u00A6\x16\u0088\u00A9\f\u008C\u0088\u00E4\u00BD\u0098\u00D7`\x7F\u0083\u00E7<\u00D8_\u00C4A\x04\u00E1f\u00AEBz!$\x18R\u00AEl\u0093\u00E4\u0096#\u00C0`&\u00DA\x02<F\u00BF%\u00B2\u0099\u00C61T+\u008AD\u00FF\u00D3\u0080(\x1E/)\u00D8q\x0E\u00CF+}\u00FB\u00EF\u008C\x7FPa\u00EEB\u00BAg%\u009E\u00A7x'\u00D4\u00C7\u00A5\x19\u0097\u00A1\u00931\u00D6\x7F[\u00B9\x7F\u00F9\u00C3\u00CA\u0098\"\x7F\u0083\u00B1\f~\x1F2\u00A9\u00959\u00B0V\u00ECC\u00BAz^\u00AAaL\u00E5\u008E\x1C\b\u00CE\u0081\u00AE\u008E\u00D7\x19\x1B\u0099%\u008FM\u00EC\x04\u009C\x03\u00FB\x0B&Z\u00FB\u00AA\u00DF'\f\x1F\t\x0Fn\u0087\u00B0\x06U\u00E8\u00A5o\u00F9\u00B9\u00F1\u0083\u00AF:\u00F3\u00B6\u00CF\u00BC\u00FD\u00F6%\u00AB\f\u00E7o\u009D\u00FF;\x17\x0E\u00EF\u00993d\u00F8\u00CEl\u009C\u009A\u00BD\x10\x0Bk\u0086o\u00C3\u00A6\u00BEc\u00A2\u00D6\x18\x05C\x10\u00A3\b\x06\x15\u008C\u0098a\u00C0\x1A\u0096\x1E\u0081(\x18\u00B0\u00C4\fC\u0091\u00A0\u00DD=\t\u008CAXj\u0091\u0082\u00FEoS)v\x062\u0082D\n,\u00EF\u00A6\u00E5\u00BB8\u00E1'\u00AA\x00\x02f\u0092\u00F0(\u00F9]\u008F\u00B6\u00A2\u00AE\x02\x0B\x1C2\u0083\\D\u00E0\x11U\x14\x1B\u0082\x04\u00E4,\u00FAz\u00A0\u008D\x0E\x15\u00F7\u008E\u00F8\\M\u00D0\u0084\x12BK\u0098\x16\u00A0\x16\u00FA\u00DD4\u0080\u00AD\u009B\x07\\Jz\u00DC\x07\x04\u00B1\u00FF\u0082\b#L]b\u00D1\u00C5\u00C8\u00EB\u008A\x14\u00A7}C\u00E3\x1B_2\u00E7\u00DC\u009FS,t\u0098u\u00AD\u00C2\u00D7F{\u00C0\x04\u00EE\u00FB=z\u0095\u00DE\u008A\u00CC6\u00F4\u00CF>'\u00A0F\x11\u0092\u00BD\u0095k\x1C]u@\u00B1\u008D\u009D\x16\u0095\u0096\u00D7\x07\u00E2\u00A8\u00CFE$\u00E2\u0089W\x05E\u00D8\u0089\u0082pG\u00A2\u00C3\x18E\u00A5x\u00CF\u00A0\u008C\u00F1W\x1BFm\u0087\u00A6\u00B1\u00B5\u00EB?3?\u00F87o\u00F8\x1D\x00?x\u00C8\x13\u00EE`\u00FB\u0092\x10\u00C2\x07\u00FB\u00A5g\u009F\u0087\u00F3\u009E\u009C\u00BBW\u00DC\u00B9\u008D\x12\x7FS\u0080/B\u00B1\t`\u00A1\u008A\u0085\u00A2dC\u00AA\u00A3\x03\u008FPT\u00C5(\x03\x14\x1B\u00E8X\u00F3D#\u00F3&\u008ChX\u00AAI\u00F1\u00AE\u00CD\u00AB\u00E6\u0099d_\u00C2\u00D1\x02f\u00FEo\u00C3\x12\u009Em\t\u00BE*\u0093\u00D8d\n\u00E9\x04#q\u00D2n\u00D1\u00CAw\u00B8\x141cf\u0084\x15O$\u00B3\u00C3u\f\u00E1\u00E2\u00D4\bw\u0096\u008C\x1Ad\u00B90\x15\u0087\u009C\x02f\u00E0e\u00B5&\x01\u00EB34\u0088\u00BB[%$9\x17\u00AC6\u0097\u00F4T\u00BE\u00C2x\u00C9\u00F0\u00EC6E1B\u00D5\b\u00B6!\u00AB\x0B\u00C3\u00E6cD\u0093\u00AC\u00A9\u00E2F\u00B6\u0088\u00D6\x14\u00AA?\u00B0g\u00F2{(w\u00DE\u0085\u00C0jQ\x02\u00DC\u00B7\u00A2\u0081\u0090\u00DC\u00A0}\u0087\u00A1\x11{n\x1F\x0B\x03\u0083\u009A#\u009BT\"\u008Da\x07\u0083*\u00E3\u00C1`\u00E5\u00DA|\u00AE\x12\u00AD\u00C0\u00BC\"\u0082xV\u00DA\u00A8\u00A6.a\u00F6O\u0081\u0091q*LG\u00B7\u00E7\u00E1x\u00D8\nbp\u00C4\u00A1b\x1E.D\u0086)\u00EDSE\u0088\x04_\u00A2\r\u00C4\u009F\u00A7\u00B9\u00DD\u00A4\x03\u00E8&\u00DA\u00E4\u00D2\u00BF}\u00F2\u00D6\u009B\u00FF\u00E8\u00EC;H^\u0087lG\u008D\x10\x0E\u008E\x07\u00E4\u00B9[\u00BF\u00F5\u0082O\u00CC>j\x05*\nG\u00BD3\x1B\u00F9\u00E1>(\u00F6B\u00AC\u00AA\u00A1\u00B8\u009C\u008C\u00C9O\u00AE\u00D9\u009D\x19\u00A8\u00AC{\u00AC@\u00C2\u00CC\x0E\u009B\u00F8\u00CE\u0097\u0080\x06`\u00869\u00A6)\u00CAF\u0090N\u00ECB\u009Em\x0B!\u00CBm\u00B0z\x12\x1Cm\u00D0\x1A\u00C1\rh\u00D3(\u00D9\u009D<c\u008E\u00DC\x1D\u00A9\x13\u0088h\x12\u00DDBw\u00B12\u009F\u00BE\x18\x05\u0098d;\u00D6\u00B8\x02\nD\u00B1\u0085\x12\u00F1\u00F9P\u00E4vq\u00D4\u00975\u00AE\u00B5\u00FA\u0086\u009Cg\u00FF$(\u00E7\u00DAYI\u00AC\u00BD\u00E8\u00F7\u00C5\x10\u00A6\u00D9\u008B\u00DDXR\u00DF\x16 \u00B6z\u00AB\u0083\u00D3\x01\u00AA\u00CC\u0098\u00D4r\r\u00AF\u00BF\r\u00C4\x19\x1E\u0099\u009A\u00EC.ak\u00C8\u00AAH%N\u0081\tv%\u00EE\u0080\u0086X\u0080\u0092\x1Fn\u00D4\u00E5\u00A4\u00F2\u00F9\u0090\u00F3=\x19W\u00DA\x14\x18\u00BC\u0094\b\u00AC\u00B8E\u00A5\u00CCQE\r\u0081\u00FA,z\u00C6\u00FA`\u00CE\u00F9r\u00BA\fx\x19\u00F8\u00BA\u00D3\u0088\u00A9\x006n\u00BD\t\x07.\u00FC\u00CB\x17\u00E8\u00BE\u00EB\u00BECN|\u00D0Q\u00C1\u00F5\u00A3f\b\u00EF\u00D3\u00CB\x7F\u00F8\u00D5\u00F2\u00BAG/fGu\u00DF#j\u00ACy\u00FBE\u00B5\u0092k.K1Sc\x0E#hS\x104]\u00C7\fs\u00ABQ\u0080\u00E6q\x063\u00E4\u009E\t\x06\u00D3US\u00BFVm\x18\x1B\u00F3\u00E5\u0093\u00C97'\u00F4\u0091\u00FA\u00B9KK\x0Bc\u00B5\u0085>\x03C\u00A5\bBSG\x16g4\r4P\x02\u00DC\x1E\x1E\u0080I\u00E1\u00CE\u0085H)\u009C\x069\u00B35y\u00AD(\u00C9\u00FEke\u009F\u00EE\u00C93\u00A2\u00CD%\u00AE\u00C4\u009A3)J\x15\u00C5I\u00A6y\x1C\x02\x17Z\u00B7\u00E3\u00DD-i\x1D\u00E2^\u008D\x18\u0086\u00AF\u00E3\x1EFK\u00B0\u00B2\u00B2G7\u009AV\u00A3\x163\u0081\u00B2\u0086=\x07\u00A1\u0086\u00E0\u008Ad\u0081\x1CSm\x1AI\u00D9\x18E\x17Xm\u0087\f&\x120%\u00D9\u00C3\u009F#\x18\u00AA\u00C2n\u00EF3\u00EEns\u00C1\u00CA\u00CA*K \b\x1D\u00A0\u0092F:\u00CFRh\u00DE\x07\x03\u00A6\u009C\u0099\u0091\x17\u0084\x17\u00C1\u00A3E3\u00A2\u0081\f\u00D7\u0082\u00E8\u00C9\u00BC\u00CD9>B=5]\u00F8n'\u00A8\u00C3\u0099e\u00A8\"\u00FC\u00CC\u00E7+\u00AA\u0085\u00BFwn\u00C2\u00CB\u00B9#\x0F\u009F}\u00E8\u009D\u008F\u00DE|\u00DB\x1F\u00FD0\u0080\u00BF\u00C0Q\u00B4\u00A3R\x19\u00B6t\u00FF\u00F0\u00DA\u00C5\u00AB\u009E\u00FB\u0099\u00B5O\u0082\u00E9C\u0099Nt\u00D7\u00B5-\u00B1\nK\u009B\"\u00D8tMo\u00E9\u008C`[\x1A\x16\u00B2fFDI5`!\x16\u0094\u00B4\u0080`)\u00E2\u00C7\u00868Gai\u00CE\x195oU\u0091\u00BA\x0E\x18\u00B5E\u00D2\x13\u00D0\u00D0\u00B5\u00A1\u00AB\x17\x19\u00E1y@\u00E6=\u00A8\u00B8\x1Ab\x7F\u00A32\u00B8)\u00D5\u0089\f\u009Dr\u00C4\u00D0\f\u00B5\u00D0gR\"-\x10!\u00C4\u00C5\u0086\u0091(\x03\u00F9\u00BB\x1B\x1D\u0099xcp\u00D9\u00D5\x00I\u0088*Q\u00C4\u0083Q\x1D\u00EC\u00CEJ\u008F%\u00C6)\u0085[\u00985\u00D8\u00A8>P\x1D\u00A9R\u00D4\u00FF\u00FC|\u00A5\u00AD$\x1A\u00D5\x02S-x?\u0086\u00A5\u00F3\u0098\u00F8^\x16i\x0Ba\x02\u0092\u0087\u0093s_L^\x13\u00A1\u00DA\u0086\u00DC\u00C2\u00A8\u00E9\u0089E5iI&\x04\u0098\u00FFf9\u00BCz\x7F2f\u009E7\u00E4\u00BB\u00E0\u00EFJ^\u00C4\u00F7\u00C5\u00C7\u00F4\u00F7\u00C1\u0094xJpE2\u00E7\u0089\u00D4\u00F7\u00FB3\u0097#\f\u00B1+\x06O\u00E5\u00F6w\u00AE*Z\u00AF`\f\x07\u00C3\u00BB\u00D6\u00B6\x0E\u00A0\u00BF\u00FBo\u009F\u00AB{\u00AE=*\x0F\u00E2Q!\u0084\u008B\u0097\u0097<\u00ED|\u00FD\u008Bo\u00F6G=\u009A.\u008E\u00BA\u00ED\u0085b\u00B7\u0096\u00DC1q\t\u00ACs,\u00B1\u0086\x19\u00E6X\u00AAW\u00E8\u00C1\f\x03f\x18\u00A9\u0097\u00AAy\x00\u00A8\u00C7\x0BfX\u00C0\u00CB\u00A3\u00A9\u00EB\u00B5B\u00C8_\u0089\u00D9\u00EC\x0BT\x03h-\u00CE\u00CC\u00C9d\x02\u00AA\u00D6\u0087*U\x10[l#\u00A6.Q\u0084\u00A4\u00A1^\u00AF\u00C8\x1C\u0087\x1E\u0092H\u0084\u008B5-\u00D8*\u00C4\x14\u00B9\u00A0\x01\u00F8\ne\u00BCCK\u00D5W\u00E9\u00EB&a\x02\u00DA\u00E7\u0081dW\u00DF\u00A1]\u00E7\x12H\x11\u0084\u00CB\x05\u00E9g\u00D9\u00FF]\u00C2\u00C7\u00BD\u00BA\u00DF\u00A7\u00BB\u00C2TC\x1EaRXH\u00CC\u00A1\u00AC\u00B4<\x17\u00FC\u009DF\u00BB\u0094\u00C1\u00C4R\u00A6n1\u00B88\u008Dyv\u00FD8\u0091K\x19\u00FCS=\x00<\u00CFK\u00AE\x03\u00A6b\u00B0\u00A8\u00CC$\u009C\u0098\u0090\u00DF\u00DF\u0099\b \u00A3\u00DB\"+\u00E2(\u00A8\u00CB\u00E3\x13\u00D2\u0080\u00E8\u00EF\x03\x00d,9\x14n\x00\u00AE\u008C\u00BE\u00C4P\u00A8_?\u00D9\u0087\u00C2_M<#U\x11g>\u0082\u0086\u00F9\x15\u0097|\u00F3\u00D6\u00DF\u009E\u00F74\x00\x7F\u0086#lG\u00CC\x10Tu\u00F8\u00D9\u0083?\u00FB\u009C\u00EB7\u00AEu\x18tH5\u00E7.i\n\u00DB\u00A5\u00E9F\u00B0(+\u00A3\x18\x07\fXC\u00935\u00CCt\x0E\x11&'\u00CD0b\u0086&&\u00D1Fa\u00DC\u0080y\x00F\u00D0\u00AFN\x1F\u00FEDi\x00`\x1E\x0B\x11[z45\u00D1\x7F^\u00D1\u00C1\b7zQ\u00AATKsi#\u00EF\u00D7`\u00BEeg\n\u00E1U\u00D8\x01\u00DA$\x18\x15\x02\u0086*\u009A[\u00F0\u0094\x12<\x16\x14U\"\u00E4o\x023B1b\u00AF\x19\u00B3b\u00982O\u00C9O$\x07z\x16\u00C8P\x00\u0090qu~v5@5rv\u0092\u00D1\u0095\u00A8\u00C3\u00B8~\x063B\x1B4\u00AE~\u0087\u00D8iZ\x19\u00AF\u0090\u00CCJ\u0099\x02\u00DD\u00FD\u00DF\u00D8\u009B\u00D1G-\u0095\u00C1\u0098\u00AD\u00C0\u00C2\u008E\r-51U'\u008B\u00A0:\u00E3\u00B5\u00CEB\u00FD\tB\rX\u00CF\u00C2|~\u008C\u0084\u00A7\fX\"\u00D3HT\u00A4|n\u00C9\u00FB\u0090)\u0088o\u00FAjU\u0092\u00B8;\x15\u00D5\u00A0\u00CA8\u00874\u008D\u00F5\u00C1\x18\u00EC\u00A4\u0080\u00AD\u008F\u00A8\u00DA,\u00BA1\u00B3\u00F9\u00D6\u00AD8\u00F8\u008E\x0B\u009E\u00A3\u00DB7\u00BEF\u00D6\x1ExD\x1B\u00BD\x1C1Cx\u00DB\u00F2\u00A2\x1Fy\x03\u00DEpV/n\u0097\u00BB\u00BBmA\u00B0G\u00D4\x03\u0096\u00B2\u00CAQ\u00D3\x01s\u00CF#\u0098\u00C1\u00CA\u009C\u008D\n/\\\".\u00F7\u00FD|e\u0088q\x03\u00D3\u0091\b\u00EBI\u009C\u00DDa\"\x11C/\x7F\u00B4*\u00AB\u00AB\x12Le\u00EEE\u00D7\x0F\x1D\x15\u00A9Tqy4\u0080\u00C2\u00DA\u009B\u00BB\u00ABVtT.\u008E\tq3\\9\"\x1A+|\u00AF\f\u00C5\u00DF\u008E\u00D6s)I\u009Cx\x18z\\\u0089\x19(v\u00DA\u00B0F\u00F8\u0093d\u00B7\u00F1\u00C5C\t[q\u00EDY3\u00A2\x11.\u00F6\u00C8\n\u0094\t\u00AA\u0091\u00B8\x7FYM\u00D2\u009Cq\u0090\u00E0Sb&\u00FB\u00E2x\x14\x19i\u00C99\u00F0-\u00E0\u00E8^-Oa\u00FD\u00F9y\u00B1\u00E9m+D\u00C9q4\u00C4N\u00CF1A\u00EE2\u008C\u0099R\u00D8\u0096\u00F1d\u00C8\u00EA\u00F3\u00CBq8\u00EAP\u00B1\u00F3\u00C2>\u00C0s<\u00E9I\u00C9D\x15i\u00F4\u00E4\u00A9\u00E5])\x19d\u00FE\f\u00AA\x12Dm\x00p\u00E5\u00FB\u00CF\u00DA\u00FC\u00AB?\u00FE\x11\x00\u00AF\u00C5\x11\u00B4#b\b\u00B7\u00EA\u00A6\u00FC\u00D2\u00E6\u00AF\u00FD\u00DA\u00B5\u00EB\u00D7q\u00CAA\x18ww5\u00F5\u00FB\u00EE\u0085`C\x05\x1BX\u00C3\u00809\u00E6\u0098a\x01\u00C16\x18\x13g:\u00F3\u00E8\u008C\u00C2T\x06\u008F\x13\x103\u00D4u\u00D0v\u0090\u00CC\u0080\fB\u00C5\\\x7FZ\u00CEcP\r=\n\u00C6\f\\\u00CE021\x10\u0085\u00DB\x1E\u0094\u00B5\x18m\u00C1\u00D8\u00B5\u008C5pfA\u00D7\u00A0/\u00A4\u0088\u00D8\u00A3\u00F4p\u00C6\u00A4Z\u00B2\u008Cb<izk\\\u00E4\u00B1\u0080\u00AB\u00C4\u00A1k\rf\u00A8\u00F4Eg\u00C2%\u00D3\u0095c\u0092)\u00D0\u00F3c\u00F9\u00C4\u00B0j\u0085p\u00FF\u00C4\x02\u0084\x18\x1A\u00ADN\u00C4y\u00CC\x19B-G\u00C4\u00BD\x16\u00E3\u0086\x03\"\u009BR\u00B8\x1D\u00BC\u00C6b\u00CF\u00C1\f\u00C8\u00A2\x02\u00F4| \x18\u008D\u00D0c!\u0085q\u0088\x13\u00BD{J\u008CQ\x15C\u00A2\x1FWe\u009C\u00AC1\u00AExVN\b\u00FC\x19B\u00FD\u00D0\x1CK\u00BC\x1FH\u00CF|h\x00\x00 \x00IDAT2)\x7F\x7F\x1C<\u00BD\b\u00BC'g\u00D9kn\u00E6\x032\u00E4\u00DC\u00FB\x0EF?\u00B5\u00D5I\u00E9)z\x14`}q\x10\u00FB\u00DF\u00FD\u00E6_\u00D3\u00CD[\u00FE\\6\x1Ep\u0087I\u00F4\u0088\x18\u00C2\u00C7\u00FA'\x7F\u00E0\u00AF\u00DB_=bl\f\u00C79vm\u0084`\x0F\x04\u00BB\u00C4\u00EA\x1C\u00CE0\u0083e32'\u00C1\fg\u00AD\x18\u00EBf\x10c\x10\u00C8=\x16\u00AC@\u00AB1\u0091\x11\u00E9\x11\u00C8\u00FA\x04<f\u009F\u00C7X\u00E0R\x00/\u00E2Md\u00C0\u00921\u00A4\u00D0\u00FF\x1D9\u00B0\u00CA\u00D3\f\u0082\u0081Y\u008F\u00D5_\u00AE\u00E2{\x01\u00B4\u0082\x10\\\u00AD\u00E0\u00FD\x1A\u00DC5V\u00AC\u00FC(\u008CB\u0090P\x14\u00F9\u009B\u00AAB:\u00DD\u0096\x1A\u00BF\x1B:\u00F1\x05\u00C8 \x1F\u00C2__\u00BC\x11\u00DE\u00CFE/.\u00F5\u008A\u00CBW\u00D1\u0080\u00D6c\x1Cy<%\\\u00F0\u0083\u00C2{\u00F2\u00FA\u00CA\u00EC\u0090D\u00EEscS(\u00C9T\u00C4\u00C4Q\u00E8\u00E4\u00A1V\u00A1\u00F4SB\u0096i\u0083\u00C12\u0099\x02\x00f\x1F\x16\u00A3K\x19\u00D8*j`\u00BF\u00C5\u00E5\n\u00F3\x10\u00E5\u00FE\u008E\u0095<\u00CBg\u00AA\x0F\x15!\u00C5\u00F7\u00BE\u00D2o\u00B9'\u00DD\u00B5\u00DEO0\u00DA\u0095Qq\u00B8\u00CCg\u0099\x7F\u00E4\u0092Gl\u00BE\u00F5U?\x00\u00E0\u00AFWO;\\;\"\u0086\u00F0\u00EA\u00CD\u00D7\u00FE\u00D2\x17v}z\x02\u00BD\u008E]k8 k\u00D8\u00A3s\u00CCd\u00869\x1A\u00E6\x180s\u00A8O/\u00C2\u00A8\x1E\x13\u00E0\u00DF\u00850^\u008C`\u00C3=\t\x16S\u00B5z\u00CC3\u00A4=\u00A0*\x1C\u00F4H\u0088\u0087(CX\u008E\u00ADM\x18\u0087@0J\u0095\u00E3l\u00CC\u00A5\u00ABe\u00C1\u00EDy\u00F2\u00AF\u00C0X\u00BF\u0086\u00E7\b\u00A6n\u00CEC.< \u0098\u00CB\u00E4\u00FA\u00D2'\u00A5\x1E\u00C7\x1A;9\u00C5@\u009D\u0089q\x0B5Bog&\u00C9\x07\u008A\u008A\"\x15\x0Ep1S\x15J\u00C8\x1D\u00DF\x05\u0098\u00D6\x13 %\u0093\u00C0c\u00A0S\u00E6P\u00FA\u00B1\u00CAHb\x04\u00C9\u00B4n2\u008D\u0089\u00C4\u00ADh\u0096(\u00CA\\\u008F\x10xl\x1D\u00E7\u00A3>W%\u00E0\u00AA\u0096\bl\u00AD\u00AC\x14\x0FV\x1ASW\u0086\u008BJ\u00F0\u00E5\u0084>\u0094gc\u00FF3djt\u00B9\x07U\x03E\u00B9o\u00B6:C\r\u0082\u00F5\u00AD\u00FD\u00B8\u00F5\u00A2\u00F3\x7F\tG\u00C0\x10\u00EE\u00B0\u00DB\u00F1\u00E3\u00FD\u00EAG\u00BEux\u00D3\u00D9KYB\u00CB\u00FF\u008EE3\x0B\u00FE\x00\u00C5:\u00F6\u00A0a?f8\u0088\x01\u00DB\x10l\u00A3a[\x1A\u00B6\x01l\x01\u00D8\u0086E$.\x01l\x0B\u00F7o\u00F0hEa\u00F8\u00B2\u00FD\u00D1\u009E\u00ABJ\u0097\u00A2\u00AB\x12d2\u00A8\u00C1K\u00B5fB\u008D^l\u0081:\u00F2x+\u00E7\x0F\x18\u00DD\u00DB\x11\x05R\"\u00B1I\\j\t\u00D0\u009C i0\u00EC\u00EE\u0092r\x03\u00A9%\u00FA\t\u00CCHg.B\u00EE\r\u00D1\u0099\u00F3\u00D0\u00FC\u00CFU\x17\t\u00B7\u00A0\u00F5),\x0E\x02\t\u00F7&\u00C2\u00AB\u00A7N\u0093\x19\u0089g\x11\u0084\u008C\u00A9\u00F0\u00F14\u00AB\u00C0\u00C4\u00F8\nV\u0084b\u00A2T\u00BAS\x19\u0088\u00D5\u00C2\u00E8\u00CB\u00F8~i\rh\x12\x02^buq\u00FC\u00C0D\u00AD a\u0085\u00EE\u00EF\x7F\u00F1y\u00C8\u00F9\u00EC\x00m.dzT\u00EF\x10\u00EB\u00C8\u009F\u0085\u00E4P\\\u0083\fI'z\u008A\u00F8\x01\u0097\u00DA\x1A\u00E7\x0Bv\u00D6\u0093l\u00D8\u00C1\u0094\u00E3\u00B3\u00C4\u00DC\x07\x02,\x11\u00A8\u00F9\"xIA\u008C\u008C\u008E\u00E4\u00B9\u00EA\u00E3\u00AA\u0081Sn\u00BC\x1C>|\u00F9\u00D9\u00E3\u00BB^}\u0087\u00EB/\u00DEa\u0084\u00F0\u009A\u0083\u00AF{\u00D6G\u00D6?\u00E4\u0093w\u00D7\u0084*\u00DF\u00B1F\u00AEi\x05D\u00972\u00C7\x1E\x15l`\u00C0L\u00E6\u00B0\u00C0\u00A1\x19\x06\x190x\u00CA\u00F2\u00B6\u00FB\u00B3\x1B\x06,]\u00CF\x1EP\u008D\u0084%\u00B6\u00C0\u0089\x19\x11b\u00EC/\u00CB?\u00B7\u00A4\u0098\u00F2?#\x06\u00BB\u00D6j9u4,]M\u00D1bl\x14HT\u008B\u00EER\u00FAP&\u00D3\u00F8\u00BD\u00B9(\x14\u00BE\u00D8J\x04\u00A2\u0087\u00AE\u00DA\x16WC\u00AA\u00B3\u00CD\u00B3\x02C\u00FAJ\\_\u00AB;\u00D9\u00FE\u00D9U\x1E\u00DAB\u00CA\u00FD\x1E\u00FDwJ\u00FBf\u00C4\u00A4]3.H\u00D2\u00A1G_\u00F8\u00A1\u00E5\u0083\u0093\u00B8 \u00A1~Qv\x15\u00D5\u0080\u00D6\fvG\u00BEB\u00CFc\u0085\b\x01@\x19\u00A4t8\u0099\u00E4\u00E1\u00DE\fr\u009A\")\x1F\u00B5\u00D8;\u00B0@\u00DB\x15[\x06\u00EF)\u00E4'R\x0EW\x14\u00B4\u0082\u00CC\u0082\u00C9{\u00B5\u00A4\u0089)\u00B9\u008Ew\u008Ax\u00D4\x03\u00CCRm\u00C9\u00B9\u00CBHF\u00AEI\x18\u00BA\u00D1j[\u00C8!e\u00AE\x06\u00B0~\u00CB\r\u00D8\u00F7?\u00DF\u00F4,\x00?y\u0098\u0099\u009A\u00B4;\u0084\x10>\u00A7\u009F9\u00F5\u00A2\u00E1\u00A2\u00A7\u00F5\u00B6<D\u00B2\u00C5\u00DD\u00DD\x1A,P\u00C5j()\x1A\u00F6\u00A3a\x0F\x06\x1CD\u00C3\u00A64l\u00A2a\x1B\rK\u0098\u0091q[\x04\x0B4,\u00D0\u00B0\u00D4!*7/a;D-1\u00D81\u00FF\x1Ba\u009E\u0083Q%\u00BE\u00DB\x06\u00B3\u00E2N(\x1A!3\x16>\u00AB0\u00F38\x02Ce\\\u0082\u00EC@\x12,\u00E3\u0082\u00F8\f3 \u008A@=?\u00A03\u00AB\u0090\x01+2\x00\u00ADAZ#]\u00D9\u00F9\u00B1x\x1A,\x04\u009A\u00EAAap\u00DE\x17\x19]\u0081\x04N\u009C)\u00BD#8F\u009A#\x11{F\"+\u008D\u00BE\u00AC\u00D8LV\u008F\u00AE\u00FD\x16U\u00A8d;\u00C6_0\u00AB\x1A4\u00C51\u0094\u00B1\u00C0\u0088\u009B\u00D7\u00B115|zO\u009F\u0094*\u00A9\u00CBsR\u00C5\u00D06C\u00A8\x07\u00BC>\u00E2=*\u00E3\u00F79.\u00EF{\u0095\u00A0\x03\u00ADL\u00A4\u00BB\u008F!\u00CA\u00B4U\x02'\x1AA9\u00B7\u00F1e\u0096\u00E7\u00A9\u0081JD\x00\u00F5y\x15\u0099FM\x04\u0091c\x12\fh\u009F\u00FC\u00C0\u00D3\u00F4\u00AA\u00CBO\u00C5\x1Dhw\b!\u00FC\u00ED\u00F6\u00C5?ua{\u00D7F\u0096!96\u00CD\u008Cj\x1E=\u00C7\x04\x19X\u00C5\"C\t\u00CD}\x0E\x19\u00C1\u00D8\\j\u00E7&.$\u00CC\u00C1\u00A59\u008D\u0089\bb\u00A6\rB\u00D4\u00E0q]\b\u00A6B\b\u0096\x0E\u00E1\u00E8A\x10 \f\u008E)u\x1D\x11\u00B8[\x12\n4\u0087\u00EC\u00A3/\u009C\u00EER\u00D8\x02\u00AC\u009C0Cof\u008C\u0081C\u00C4\u0080\u00A5\u00BE\t\u008D\u00B2\u00EC\x1A\r\u00A1@\u00C1\u00DD\u00DE\u0097\u00BA\u00F7.%\u008F\u00C8\u00E0k\u0089\x12\u00DB\u00A0u\u00F3\u00EB\x1DX\x17\u00C9\u00ED\u00A8#\x10\u0093\u00AD\u0082Fh\x1A\x02\u00D8-\u00FF\u00F5\u009D\u00B5\u009Ee\u00D1\u00C4;\u008B\u00BF\x0E\u00D1\u00B9I\u00BBncQ\u00D7\u00FFm\u00F8\r\u00DA\u00DDU\u00E7\u00AB^\u00D0l3Z\x12\x1F\u0091\x07\u00FC\u00DF \u008AUi\u00EF\u00CF\u00AD<\u00DF\u00F2\x1D\u00C2\u00DB\x02\u0084qR\u00DD0\u0087.\u00E6\u00FB\u00F7\u00AEl\u0095\u008C\u00D0\u0088_h\u0085\x10]4\u00A3\u00C16m\u00B1\u00F1\u0087]#\b\u00DE\u00CFS\x18Qw\u00D8<0N\u0082\u00E7\u00F0\u009A\u00E2\x16\x15\u00F5\u00FE\u00B8\u00DB\x16\u008D\u00C0\u00BD\u00C73\x11aj\x17HW\u00B4q\u0081\u00F5O\x7Flc\u00FF\u009B\u00FE\u00F8\u00A7\x00\u00BC\u00E00\u00A4\x15\u00EDv\x19\u00C2\u00D6\u00F2@\u00FB\u00D7\u008B_\u00F8\u00E9\u00AD\u00B5\u00BDH\x7F\u00F7\u00B1jU\u0082\f\u0093\u00BFmi\u00B8Q\x15\u00EB\u00DA0\u0097\u0086-\u00D7y)M\u00A2\u00DC\u0089\x13\u00961\u008A\x04\u00D1\u0091\u0081H\u00E2\u00F2\u00F3\u00A8\x0E\u00D4\u00C2 \u00EA\u00C46\u0080\u00B6\x06\x7F\tN\u00B0\n\u00EE\x1C\u00E8\u0088@H\x10\u008C9K)\u0093\u009E\x02\u00C5\x10\u009B\u00C6\x12\u0099\u00B2\x10k\x03\x03\u009D\u00D2Ah\u008B\u009D\u00C7\x03\u00E2\u00FB\u00FAa\u0090S\b\u00A0p\x11\u00B8z\x000\x04\x01\u0088s\x10\u00C7\x11gec\u00E4\u00BCS\x07b\u00B7e\u00EA2A\x1C@\u00D8\u0097\x18OP\x02\u009BHaY-\u00C8]\u0080\x11}\u00C8-\u00D58\x1E#B\u00EB;\x0B\u00BA\u00A0\u00E4E\x04\u00C3!\u008C.\x1B\u00D1N\x1F'\x1F:B\u00A4\u00C3\u00E0gk,\\\u0084\u0084\u00FB\u00CED\u00ECJF \u00FA\\2\u00DD\\\u00BB\x07Ka\u00F2{DG\x06\u00AA\u00F1\u00BE\u00AB1\u0095\u00EE\u00CBp3R-(\u0088F+\u00B3@\u009E\x17\u00C6S\u00FF\u008Dh!fE1h\x07>|\u00E9O\u00EB\u00DE/\u00BEH\u00EEw\u00F2m\u00EA\u00FB\u00B7\u00CB\x10\u00AE\x18>\u00F1\u00A4\u00BF[\u00BC\u00F5\u00F4\u00DE\x00\u00A0\u00EF\u0098\u00E3\u00BB\u00AFQ:\u00CE\x01\u009D\u0081\u00A9\u00BB\u00B99\u00EA\f\x0B\x01n\x15\u00B3.\x18A\x0E\u0098\x17\u0083\u00E0\u0082\u0084\u00AA\x1E\u00B4\u00E4}2\u008Dut\u00A2[B\u00C0-\u00E0\x1A\u00EAn\u00D3\u00FE\u00AA\u00D4<\b\u00CB\u0088\x104\u00F7\u00E6\x00\x17dRC\u00953\x17\"\u00D3PZ\b7[BL[\u00CE\u00BA\u00C7\x11\u00B5X\x16\x14mF\u00CCW0\u00B4Rc\b\u00A8\x1Ad\x16\u009F\u00F9\u00D4\u009B\u00AB\u00A1I$<>\r \x00i}:\u00EFQ\u00E3P\u00DD\u0080\u00EF\u0096tqw%\u00D1\u0086\u00EAd\u00B9F?\u00E2\x01J<&d-\n\x0B\u0097\u00E4\u00D8\u008C\u00E0+\u00E1\u009A\u00FA\u00E4\u00DE\x00h\u00CE\x0BLR\u00AA\u00BB\x1Fm\u0088C\u00DC\u00DD\u00EE\u00C5 \u00A2\u008E\u00F0\u00FD\x0B\u0090\u00AEK\u00B7~T\u00C3\u00DF!9e\x12\u00A5\u00ACfY2\"\u00B1\u00AF\u009C\x1B\u00AB\u00A5\u00A0\x178\u0093\u0088w\u00CE\u00E1\u0092q\x14\u0084\x03gT\u0093\u00EFd4dF<V]\u00AB|\x17\x1C\u008F\u00A1\u00BB\u00E1\u00C3\x1F<}\u00EB\u009D\u00E7?\t\u00C0[q\x1B\u00EDv\x19\u00C2_\x1D\u00B8\u00E0\u00DC\u00CF\u00AD\x7F\n\u00C7\u00CA\u00A3\u0090-\u00E3\x0B&\u00BB(\x17i\u00DB!\u00B8\x19\u008A\u00B96\u00CC\u00BC\u00E8\x063\u00D7\x07\x15\f\u00D2\u00B0\u00D4\u00C8\u0096\u008FpUb\x00\x06+\u008D\u0092\u00B6\u00F4\u008E\x16D\x1D\u00DF\u0085F\u00C3|\u00F9\u00E6\u00AC\u00E4&\u00B0\fE1o\u0086p\u00FB\u00B5\u00E6\u00EA\u00853\u008D\x0E&#Y7m\u00B2\u00A0\x04f\u0085\x07ha6!\u00CB@\x19;G\u00DD\x00\u0099\u00B1\u00F3\u00D6\u0099]\u00A7\x11Al\u008Bgp:3\u00A6\u0091&\u00A96]\u00C7\u0094\u0080nL\x14\x1D\u009C\u00E2\u00B8\u00D0lQ\u00A6+\u00D1\u00CEW\x12\u00B8z\u00BF\u00CCk\u00F0p\u00E90\x12v\u0089\u00F8 \u00BB\u00B4\u0085!\u00CC\x1Em4\x03\u00A7\u00C0\r\u009D\u0083=\u00B5\u00AA1\u008E\b\x02\u0082\u00ABt\f\u00A1\u0097\u0082\x12lL\u0089\u00A5\u00EA\u00D4:\x1AQ\u00CFbd9\u00F8|\x14\u00FE'\u0099\u00F8\u00A4\u0093\x16\u00CFaII\u00EA|\u0095\u00BFs\u00D2\u00F3\u00A6\u0096\u00DA>\u00C6\x1C\n\t\u009EHG\u0099\u00B3A\u00A9\u00AFN\u00E3\u00BD\u0080\u00AA\u00D5~\u00BD\u00BE$#\x1C+\u008D\u00BA\u00AA\u00C8\u009A\u00A3\u00EB\u00CB\u00FD\u00B8\u00E5\u00C27\u009D\u008B/\u0085!\\\u00A3\u00D7\u009Dt\u00EE\u00E6\u00B9O\u00EDm5\u0093\u00F1\u00EEW\x1C\x04\u00BE=\x19\u00B7>\u008F\u00B7\u009B\u00C6 \u0095\u0086\x05\x06|\x11\x03v\u00A1\u0099r!3\u00CB\u00CD\u00F3\u00AAI\u0083\u00DB\x06b\x03\x14\"\x044\u00B0\u00B8i\x0B\u0084\u0090\x0E\u00B6\u00E0\u00C3*\u008E$\u00CC\u00E0\u00A3j/\u00BBF;\u00DA\u00B9C \x03\u00AB\u00C8l\u00E3\u00ED\u00A0{\u008D9\x11\u0088gY\u00F2\u00EEb(fbd\u00E2i\u00A17\x0B&\x1B\u00BF\u0086[\u008D~\u00F4B\u00E1d\x1E\r\u0099\x0B\x00\u0097\u00AE\x15\u0089D\u00D3\u0089\n\x10\u00D6mF\u00FD)-\u00FCIx\u00B9:8>\u00EFg\u00D2\u00AF\x13\x06\u00C7O\u00A9\x06M\u00A9\x1D\x1D\u00D5<\x01B\u00EC\u00ACM\u00C0\u00E4&S\u0097\u00B4\u009C\u00EB\u00F7Q\x14\u0086UU\u00AD\u00D2\u00BF\x02\u00CAd#\x12\u00DFd\u00D1\u0089?\x7FM\u00BEb\u00AA\u00B2\u00A3\u0096\n\u00D7\x0F\x19qE\"g\u00FF2\u00F9=\n\u00B8\x06\u00A6j\u00E5x\u0099\u00A7\u00C9q&b9\u00E3\b\u00F5&\u0091\u008D\"U\x07\u00AA8kW\x7F\u00F8\u00A9\u00FA\u00F9\u008F\u009D$_\u00F5\u008D7\u00E30\u00ED6\x19\u00C2\u00FF\u00DA\u00BE\u00E2G\u00DF\u0087\u00F7l\u0088\u00CE\x00\u00B9Sw\u008C:\u00C2f\x15\u008F\u00B8\x11+K\u00A21;P\u0095\u00B6\x02\u00B3\u00E8n\u008Ab\u008F6\u00AC\u00C9\u00CC\u00E2\x15\x15\x18$}\x01\x10\u00B5]\u00A0}\u00F1\u00B2@\u00C6L@\u00EC\x00q\u00D4\u00D0a\x1E\x07\x06%\u008D\u0092R\u00A3\x01\x101\u00CF\x04\u00B9;\u0097g\u0087y(\x06\u00B4\u00A0\u0091\u0080\u00F9HGT\u00DE\u00D1\x18\u00C4\b+Y\u00A2M`{1j\u00BA#\t\u00FF\u0095R\u00CF1\u0085\x1B\u00B7\u00B4\x19R\u00E0\x1Aa\u00B5\u00A4\u0088e\u0080\u0086kR\u0089>J\u00B3{\"U\x0B\u00A1\u00DE\u00CCPe\x01\x0B\x1D\u0087\u00FBs\u0082\x12J#4'\u00DD\x13\u00DD\u0088B\u0086\u00F2\u00A3\u00DFk\"1\u00C3m\u00D7\u0091\n[\u0081\u00F0\u00D2`%\u00D4\u00FD\u009C\x1D1\n\u00F53\\\u00AD \u00F3\x17d\u00895\u0087\u00E0\u00F5\u00BB]Q\u00FE\u00F1\u00C8N\u009A\u00F2\u0083\u00D1\x19^\u00A4*S\u00DFh\u00BD\u00F7\u00E4_\u00A2\u00B4\x18\u009F\u00AFY q\u00CC\u00AA\u00CA0Q\x1D\x14\u00C9\u00DC\u00E2\u00E9l\u008D\u0094\u00BD&\x0E\u00D5T\x15\u00C35\u009F\u00DC\u00B8\u00F5/\u00CF\u00FBQ\x00\x7Fx\u00B8\u00F3n\u0093!\u00BCe|\u00EB\u00D3\u00F7m\u00DC\u008A.U\u008B\u00BE\u00BB\x1B_d\rr\u00A9\u0093\u00E6\u00A4F\x03\u009C\u00BB\u00DFn\x11\u00C5\t\u00AE&\f\u00D20\u0087\u00A55\u00CD\u00B5\u00C4\x1C\u0088\u00A4\u00FB\u00AC\u00FC\u00AE\x1E\x13\u0090\x11\u0088TQ\x10\u00D2\u00DD\x18\u00D1,\u00DCf\u00D3\u0094ic2\u00CD\u00EF\u00D1\u008A\r!\u00AB)Q\u00EE\u00D4c\u00F463\x10\u0088l$\tz\x12\u00AB\x0F8<\u00A5A3\u0099\x1B\u00AB\x1B\x07\u00C4wv\u00C4\u00FC\u0088\u0080\u00C1&\u00FA|\u00AE)R(\u0095\u00ED\u00B70\u00A4z\u00EE\u0083m6\u0083P\t4\u00A4\u00A3&\u00BC\u00ADR\u009F\u00F7\u0086\x16T\u00E1\u00C3\u00EA\u00E5^\u00E1?K\u00F4!A@=\u00C7\x05\u00D7/te\u00DC\x05N\u00A7\u00BF>\u00F36R\u00F7N\u00C9\u009E\u00DB\u00B7\u00AD\u00A2`#D\u00FA\u009F\x02\u00B2+@+\x7F\u00C6\u00E4Ti^\u00A4\u00BDq\u00D1r\x1FC9\u00E6\x1D\u00A0\u00FA@\u00A3$\u00C7\u00E1\u008CC\u00810pr>\u00CB\u00BA\u00B7\u0090mu E\u00EF\u008E3\x07N\u00A3??\u00A7k\u00DE\x17\u00D8\u00FA\u00D0%O\u00C7\u00D10\u0084\u00EBu\u00DF\u00C3~x\u00F3\u00A9\u008F\u00EF\u0093\u0082\u0095\u00C7\u00A25\u00E4\u008E\u00C0\u00B5\u00EA\x11an\u0081\u00D6\u0085\u00E3.z\u00C3\r\u00E2\u00FB.\u00A9:B\u0080o5_!\u00B9\u00873\u00D3\u00BD\x07I}0\u008EcBLD#\u00AC\u008A<C\u00CD\u008Bp\t\\\u00DC\u0091D\f-\u00A4\u00A4\u00F8{\u009A\x16+\u00B1:\x07\u0095\u00E1\u00A1\u00C0k\u00FF]\u00A6\x0B-\x17_e\x1E\u0088\u00B1&\x13\u0091\x102\u00A1s\u009Ae\u0091O\u0097:\u00BD\u00F0?\u0089\x00\u00EC\u00D2\u008C\u00DD'I0/B\u00BB)H\x13)jGR\u00FA\u00F5d\x1A\u00B1\u009A\x1A\"<:\u009FSs\u00C9\x15t\x13\x03\u00E9\x1E\u00A4\x15\u00DC\u0087\u00CF\u008A$|Jc\x1Da\u00A9\u00C6\u008A\u00C8W\u00E0\u00C6\u00ACT7xM/\u0088\u00A3zE&\u00C9H\u00F5\u00CF\x07\x14\u00F5\rP\x1E\u00AC0\u00AENU\u0087\b!\u0099\"\u00ED?vz\u00EEx&\u00D1\u00EF0\u00ED\u00DBm*\u0093\u00A4,\u00AE}\u009D\u00868\u0093\u00FF\u00A6\u00EA \x18>\u00F9\x0F\u008F\u00D7\u00CB\u00DF\u00F30\u00F9\u00D6\u00EF\u00BC\x06\u0087h\u0087e\b\x17,\u00DE|\u00CE\u00A5\u00B8\u00F4X\u00C1\u0082\u00D2\x06\x00\u00EB\u00B0\u0082'T\x0B\u008CP\u00E9\u00C3O\u0089@\u00A9`\u00BA\u00EAAi\u00D8\u008B\x01\u00BB X\u00D3\u00C1\u00B3!\r1\u0088\x133\u00C9\u0088\fB\u0085\u0092:\u00E3\x16F\u00CF\u0094\u00CC<\u0082V\u00CE\u0099\x02Nj\u00DC\u0095M\x13\u0094\x0E\x18\x10!\u00F3\u00B0\u00D4lH\u008F1\x18w\u00EFf\u0098\u0094d\x02M\u00B88\x04\x16PC\u00AEoz}x.T3\u00E8\u00C8\u00E7\u00A5\u0092s\u00A0\x064wo8\u00D1\u00BA$\x0F\u0095As+\u00B6j\u00C0\u008B0\u00E7p\x0F\u00E6\u00ECW\u009BB\u008F\x1C\t\u00D8\u00EFf|q\u00E3\u00DD\f\u00DDk\x1B\u00C6NG\u0085iA\u0096\u0080\u0088mQ/\n\x1DK=o\x0E?f\u00D5\u00F3\"\u009C\u0089\x18O44\x1B\u008E\u00826\x00\u00A3\u00BF\u00A5\u0089\x04w\u00A2\u009A0\u00D7\n\u00D5\u0081\u0084\u00E9\u00D3\x16\x01\u00A0$\u00BC\u00B0\u00C1tT\u0094\u0092\u00E8\u008CL\x0B\u0098\u00AA\x15~\u00A6\u00B62\u009B\u00FE,\u00AAa\u00C7\u009DVkv\u0083\u00EC\u00C4\u00C0Xb\x14z\u00BE\u00F5\u00C9\u00F8; :b\u00D7\u00F5\u009F\u0093[\u00DF\u00FC\u00FAs\x00\u00FC\u00D7\x1D\x03\u00C1m0\u0084\u008B\u00B7\u00DFs\u00CE\u00D6\t{o3:\u00F4\u00AEo3\b\u00E6\u0080\u00B8\u00ED\u00A0J\u00CFp\u0099\u00D5(?\x12\u008E\u009D\u00D7\u00B5a\u00AF4\u009C\u0080\u0086\u00990\u00A2\u00C0\\\u0091\u0083\u00D7JX\u008A\u0095Z_\u0082\u0081A\u00FE_\x157\u00EE\x05\u00B9\x01ji\u00D5]\u00C4K\u00A9\u0099ps\u00F9\x1E\u00B2p\x14\u00C6\u00C8\x0F\u00CEt<\u0091I\u00AA\u00CA\x00\u008F\u00F8K5\u0083\u00F5\x12\u00C9\"\u00FC\u0097\u0088S\u0097\u00F2\u00FCA\x17\u0093\b\u00C5\u009E\x04\x16\x11n\\\u00EE\u00C5\u00AFO\u00AA\u00AA\u00EE5!\u00CA@\u00FE6! \u00F5s|\u00F1\u0092\"\nl\u00CF\u00CB\u00C9A\u00EA8y.k\fT\t\u00CC\x11\u008E\x10\f&\u00CDc+xx?V\u0090\x154hv\u0092\x10359\u00DE\x01;\u00A4\u00BB\u00F8\u00F5A\u0098\u009C\u00A7\x01,r\"Er[\u00A1\u009B\u00AA\n ?\u00C7\u00FC\u00F3\u0098\x14T\u00E2\u00FDO\u00EA\x19\u00F8\u00F3\u00D1\u009B\u00A4\u00D9\u00C7\x04Y\u00F0;]\u0090q\u00E3D\x7F\u00C9|\u00C6@\x01Y\u00AF\u00A1\u00A2\x14\u00C5\u0084\u00F1P\u008DTE\x1B;\u00DAG/?,Ch\u0087\u00FA\u00F1\x1A\u00BD\u00FE\u00A1\x1F\x1A.}L\u008F\u009B\x1C\x1B\u0096 \u00A8nE\u00FF<\t\u00D6\u00A0\u0091h\n\u00B3Eh\x12\u00B4R\u00EA7\x03\u00D8\u00AF\u0082\u00ED>`\u00A1V\u009Bq\x01\u00DF\u00E8E\u008Dq\u00A8\n\x16RB\u009A\u00DDE\u00B9\u0084y\x15\x16\u00C2\u00D8\x03\x0Fe\u0096\u0086\u00A50\u00F4\u00D9\u00A2!\u0097:\u00F3$)\u00BAH[\u00B8}\x00\r\u00C4A\x06\u00C6d\u009F\u00F8\u008E\x06\u00AB\u00C1\u00C0Me2\u00CC\u00B9BCF\u00C9\u00E5\u00C6-\u0096\u00AA\x1D\u00B1\u008E%\u00ECX\u00A4\u0095\u0099\u00F1F\u009F\u00B94d\u00D9u\x0F\u00BE\u00F2MP\x04Y\u008A\u00CDB\u00A5g\u00906\u00C45\u0093\u00C4%\u008F\u008B\u00C8$##\u00CCI\rB\u008E=\u00DE\r\u00AB@\re\x0EL\u0085\u008A\u00E7\u00AD*a\u009C\u0097HP\u00B50! %\u00A7r>\u00B9\\\u008C\tN\x0B\u009B\x165\n\u00E2\u00F3\u009Eu\x18i\u0093\u00D1\u0080\u00DF-\u00FE\x15w%KOi\u00AE\x11\u00B1\u00C9\u00A45^\u0087\u00BCg\u008Dw\u00F0\u00B9\u00B3\rar\u00C5\u00C7\u00F9\u00BA\u00F2\u00D6\u00D8/\u00F2x\u0084\u00B2\u00ABL\u00E9\x02b\u00B6\x19gJ\u00E1\x1C\u00F1Ml\u00F5\u00EA\u008F>F\u00AF|\u00EFCq\u0088vH\u0084\u00F0\u00FE\u00AD\u00CB\u009E\u00FA\u00A1\u00E1\u00FD\u00A2my\f\u00D1A\u00F1\x1C\u00AC,\u00AA\u0086\x06\x15\"\u0083\u00BA\u00E8\x10\u00E7\u00E4\u00AEH\r\u00FB\u00C5\\\u00913X|\u00C2L\x1B\u00E6\u00F0\u009D\u00A4=\x18H`Kq\tF X\x12\x12\u00F3\x17\u008C\u00B9\u00A4\u008C\x1E}<FF\u00A6\u008E\f\u00B5\u00A0\tG,\b\u0082Q\x0F\u00BD\rP')o\u00A8\\t\u0091\u00E8\u009F\u00FF\u0083H\u00EE\f]\x02\u0095\b\u008D\u00CD\u00B6$h\u00AD\u0081U\u0094\u00F9TF4\u00D58\u00D5\u00F2\u00C6\u00FC\u00B7\u00B3\u0090\u0089\u008F:\u00F2\u00ED\x05\u00A5.\x1A\u00A0c\u00A8\x1D\u0099.\u00DDL\x15PK\u00CEQt\u00CB^,\u00E89z\x10xucJ\u00E9\"\u00CD\u00A9\u00D2(\u00D0\x18\u00B4#\x007aM\u00D5\u0087L\u00DF\u00CEQ\u00ED\u0089\u00CD\u009A\u008D\u00B7\u00EE:\r4\u00D7\u00E1}N\u0094\x03+h\x01\x05)9Q**J\u00E0q\u00A2\x01DH\u0085\u00C6\u0088\u00B0B\u0094\u00AD\\#\u0098n\x01\u00E7\u00CFD\x06S\u00DD\u00AD\u0081.\u0088,r\x0E%\u00D4\u00E5\x11\u00B9[H\u0099O\u009B\u00C5\x12I\u00D9,\u00D6\x02\u00B5\t\u00D6\u00AE\u00FB\u0082\u00EC\u00F9\u009F\u00E7?\x15\u00C0\x7F\u00C7J;$Cxk\x7F\u00FBS\u00B6\u00E6\x07\u008F!3 \u00F4\u00F3\u00D4^\x12~$xP\u008A\u0090a\u00AC\u00A0\x04\u00F7\u00CBW\u008Ey+\x14'H\u00C7\u00BA\u00D2\u00F9d5\x17\x15\u0088JC\u00AA&)c\u00C7\u00C7P%l'gi\fF\u00F2\u0080\"\u00C9\u00F0d\u00D6C`\u00BA\u00F3\u00E8\u008Ce\x04\x00\u00E1\x1E\r\u00F4Z\u00D83f\u00D5&\u0080L\u0084\u009E\b\u00EA\u0085M&\u00EC\x05N%\u00C8\x04\u0097l\x1Dno\u0090\u00B2\x10\u00FD^\\\u00B8\u0091\u00E8T\x16\u009B\u00D9!\u00D4\b\x14(\u0090;.B\x12\x10\x10*G\u00FC\u00EE\u008C\u0085\u00CCj\x02Y\u00B5tT\u0089\u00A2\u00EA\u00D6\x0E\u00DB'>w\u00EF/\u008Cg<\u00B7\u009E#\u00C6\u00A4xn0\u0097\u00D1\u00CF*\u00F7v\x0FCT7V\u00C4oY^\x0E\u00D1w\u00A3\u00F1N\u0081Iy6\u0091\x12\u00C4\u00A4\u00E6\x1A\u00F6\u00D4\u00B7\u00BCW\u00CE\u00F7\u00C4\u0086\x10\u00DE\x0E\u0081j\u00DDQJP\x19\u0081\u00D0u\u00CC\u00F9\u00E2\u0098{QM\u00B49\n\x00&5\x19BUi\u00C1\u0084\u00AA%\t\u00DA1W\u00C5\u00F2\u008A\x0F>\x05\u0087`\b;T\u0086\u00EBu\u00CF\u0089\x1F\u0097\u008F>\u00A1\u00B7#\u00AA\u00CDx'6\u00BE\u00F8\x1606e8\x00pwf\u00FA\u00FE\u008B\u00B4\x04w0\x02\u00A6j\u0086\u00A1\u008D\u00BD*\u00D8'\x03\x0E\u00C8\u0080M\x01\u00B6\u00A0\x18;0v\u00C1B\u00ADL\u00BB\x11\u00B7\x0B\x01\x11\u00DF!\u00DA\u00D2\u00A8\u00BB\u00C34F3\u009A\u00CF\u00BF\u00B9\u00CAQ\u00BE\u00D3.\u00A04P\u00DA\u00A6.\u00DD\u00EB p\x03\u0099t5f\u00F6\x1F\u00F7\u0098P(zx\x1D\u00CA_0:>\u00A63&\u00F1\x04*i\u00E6\x16\u0094f\x06\u00B5\u00C6\u00D0*GU~N\x17Af;\u00BA\u00B7#j\txt%\u00B8\u00AFd\u00E6\u00F8\u0087\u009A#T\t\u00CAq\u00AA.m\u0080xv\u00A41\u00F4\u0096\u00EF\u00D1\u00C7FH\x0E(\x10\u00AACaR\u00C1\u00D0\u008A\u00AA ^\u0086\u00DD\u00E1\x15\u008D\u00C1\u00B6#t\u0081\u00CD\u00C5\u00B5Ji\u00A9\u0091.\u00EC}\u0093=\u00F6Da\x02\u0098\u00C14\u00F4~7\u00D6\u00F9|\u00D3\x13\x05\u0087~\u00A9\u00A6\u00B1\u00BE\u0082\u00A2\x06k\u00E5\u00C6\u00ADpDAAW\x18\u009B?\u008B\r\u00B3\u00AC\u00E5b\x06I\u00A3\u00ADf2Y\u00D7\x12z\u00CE\u00E3\u00E2\u00D1\u0093\x151#\u00F9g\u00ED\u00F3\u00BA\u00CF?A\u00BF\u00F0\u00F1\x13\u00B1\u00D2v \u0084\u00CB\u00F5\u00D3O\u00FA\x00\u00DE\u00BB~\u00CC\u00D1\u0081\u00EBsf\f\x02rQ &\u00B1\u00EA\u0082)u\u00EAb\u00B3\u00F3\x18SpP\x047\u00A9\x15g\u009D\t0\x13\u00AB\u008C\u00C4x\x01\u00C0\u00F6\u008B\x14\x01\x18\u00A3\u00D8`\u00F6\x03\u0086\u00D6r\u00A9\u00D9\u00F6b\u0099\u00B3\u0090\u00A8@\x10\u008BQh=f\u00F2\u008D\u00A2a\u00C0\u00A8\u008C\u00844\u00CE?\u0082\u00BA\u00B7\x19\x11\u00AD\u00D2\u0092\u00E5G0\u00C6\u00813\u00C0\bE\u00A2\u0084L\x00\u00F2\u0081\u00C3\t&\u0082\u0099\u0098\x1D\u008A \b\x03\x0E\x1E;Q|\u00F21cQ\u00FD\x18\u00C8\u0083\u009Ak\u0098\u0096f\u00F1\u00DF\u0095\u00F7\u00F6]\u00A2\u00E0\u0086<\u00BE\u00AB\u00A8oP\u00DF[\x05\u00DBD\x0F<w,\u00E7M\u00C3\u00B8\x12\x1DQ\u00ADa_c>{\x18\u00F7xOw/JJ\u00CB\u0098\u009B\u008A\u00C9\u00B5\u008E\u008B\u0086\u00C7\u00D2\u008F\u00C3\u00EF\u00A9\u0085\u00BF0\"~\u00A6D\u00AFT\u00C8\u0089\u00F7\u00ECE\x06\u00A9\u00D9\x14\u00B6\u008C\u00AA\u00D4\u00B2\u00D9M \u00AE\x1CN\u00AE\u00EC\u0082|\u0094/\u00B5E\x1F\u00C1l&\u00C75\u009EE\u00AF\u00FE\u00C4\u00FA\u00D6\u00DB\u00DE\u00F8$\x00o@i;\x18\u00C2\u0085\u009Bo\u00FD\u00FE\u009B7n\u00C2\u00A0\r\u00E3]\u00B4g\u00E3\u00ED6ui\u00E00\u00DE\x16\t\u00E3\x10l\"\n\bBr|\x0F\u008D]\u00F9\r>\u00F9#\x04\u00FBD\u00B0\x07\x16\u00CE<\u0087{\x1F\x14\u00BEAl\x1A\x1A\u00B7\x0B\u0083\u00E8jD\u00CA\u00A4\u00A7\u00E0\u00C8(\u00DE\rg\x02\u0099\u00F3`)\u00CE,\u009C\u00D2\u00C5\x7F\u00F7B-\u00AA-<\x14D<\u00BC\u008E\u00EEM\x16de<\x03\u00C3\u009E\u00E1\u00E7X \x14\u00A1v\u00DA/\u008Cp\u00D3hF\u008B8\x19YX\u009D\u00A1\u00E9%\u00D1:gH\u00CB}e\b\x10\u00C0c\u00E7\u0095:.\u0095i0\u00A8\u00AA\x07dV?\x1Fp/M,b }3F\x1A\u0091\u00BC\u00B4\u00CA\x00\u00F89\x18\u0097\x07(\u0085NNX]\u00C0n\u00C0e\x12%R\u0090\u0094J\u00CEq@K\u00B2UxH\u00FCZ\u00E3\x00\u00E5\u0092U\u00C3\b\u009B\u00CF;\u0098R\u00BDb\x7F\u0098\u00CC\u00AF3\u00F3`\x18\x1C+\u0092\u0080s\u00C0E\u00C2\u00F37\u00CEe\u00B9\u008FGv\n4\u00DFq\\\u00A7\u00F9\u00DD\u00EF\u00B11.\u00B0\u00EF\u00E2\u00F7}\x1Fn\u008F!\\\u00D5>\u00FA\u00BD\u0090\x05\u00D2\u00A2y76Up\u00E7\u009B\u00A6^\fClkv\u0080\u00D0\u0089\u00E8\u00A10\x035\b\u009B\u00CC\u0080\x05V\x1D1\u00805\r\u00CC\u0092\u00FDE\u00ED\u0098K\u00C3\x1C\u00DD\\\u0090hh\x1Eq8hn\u009BjD\u00ED\u0089NJw\u00A3\u0085/\x13\x15\u00C4\x06\u00AA\u0090\u00D8\u00A2\u009ED\u00DB0x\u00A4b\u00B8\u0088\u00C1\u00ADAX\u00B9\u00B9C#\u00E6\u0080\u009E\x06\u00CA\u00B14\x13\u0099\x04\u00B1\u00BB\rf`t&\u00C0 *\u0085\u00D7=\bfe\u0086\u00BD\u00E6?q\u0091\u008B\u0087,\u00B3\u009Aql\x0B\x07\u009D\u00D2\u00E0\u00AA\x0F^\u00C4\u00E2\x14\\\u008F\u008D:\x01\x00\u0098\x04\u00D5\u0088^\u00D0\x1C\u00D2\u00F2\t`\u00EF\u008D\x0BS\u0080\u0088\u00E0\x10\u00C0\u00AA\x1F\u00F9Vq$l\u00D2\u0082.!\u009E\u00A4\u00C5\u00ED\u00CB\u00C8PRS\u00AF\u0084\u00E6\u00918\u00EAv'I\x17]\x18J\x0B\u0086\u00E6\u009E\x1BtcN\x10\u0087x\x1A\u00B6\u00F9\u0088\u00D3\u00F6@q=r\r\u0092y\u00F0\u00F9\u0097\u00F6\u00AC4\u00A0\u00F6\u00CA\u0084$\u009F/~\u00CE=\x1E\x04j\u00A5\u00F1T2i\u00CD\x14I\x0B\u00C4\u00EA\u00D6\u00AF\u00F6\x16\x15\u00AF\u00C3\u00FE`\u00D5t\u008A7Y\u00C0\x04,u\u0084\u00D7F\u00F1\u00F7\u00DC\u00D1\u00AE\u00BB\u00E6\u009F`\u00A5M\x18\u00C2g\u00F5\x0B\x0F\u00FB\u00C1\u00CD\u00FF\u00FD\u008Cx\u0089\u00C7\u00A4\u0091\u00E0\u0087 b\u00E3\u0084\u0083?(\u00D3\u0080\x0BD\x02\u00BF\u00A7\u0084\x03\x10\u00D2;\u00FD\u00F469[\"\u00D8\u0083\u008E\r\f^\u0098\x04`Y\u00B1&\u00D5^\u00A1h\u00A2Pt_\u0087\\\u0084\u00B5w.\"c^)\u008F\x19\u00FC\u00E4\x05Q\u00A4\u0085\u00DCqYm\u00D7\u00BA\u00EA0\u0082\u0092\u0094s/\u0091\u0084\u00D5\u00D1|\u00D3\u00D9L\u00D1\u0099\u00F8\u00C1\u00E1\u00EAIC\u00EA\u00BC\x13)\u0083$T\u00F7\x00d`\u0091f)7\u00E3\x14\u00B6\u00A8\u009C<\u00C4\x17\x12{\u00CB\u00D8d1\u00EFB\u00CF\u00F9\u00A8\u00FF\n\u00D3\u0082I@~M\u00C6\fp\u00F85B\x11\u0087\x18;+W\u00F7\u00A2\x1E\u00D5V%&\u00FB\t|\x12\u00F3c\u00EF\u009E^\u0086:^)\u00BF\u00D5.I\u0094TCh\u00FC#\x04/\u008C+\u00F6e\u00A8\f\x02\x05Y\x1C\u008A\u009A$\u00EEa\u00CC\u0093\f\u00B3\x04Eiy\x1E\u00AAAPLj8h\u00C3\u00B4\u00FC\u00DA\u008A\u00A1\x12H\u00E4S\u008C\u00CC\u00ADw\u00CC>\u00FD\u00E93\u00F4\u00A3\x1Fx\u0098\u009C\u00F9\u00C8k8\u00AA\tC\u00B8b\u00F9\u0089'^9\u00BB\u00FC\x182\u0083\x06\u00F3,x\u00C9\u00B0\t\u00C1\u00D7i\u009DB\u00AF\u00E9wJ\u00C8zM\x1Ecb\u00D2>4\u00DF\u00F8m\u00865\u00D5\u00D8\x12n\x11\u008ED\u00F3,4'\u00CA\u009A|D\u0092\u00A4'\u00A11\u00E6\x00@W#~2\x06\x120\u0097iw\t9e`F\u00ACV\u00C9\u0099\u00B5\u008F2Yetd\u0090\u0091\u0092\u00E6a3?x\u00E9\u008B\u00A1\u00D5A\u00C3+\u00C6\u00A50\u008A\x11-\x18\u00B3\u00A3\u00D1\u00AA7w\x1DR\u00DA\u00C75(\x0B{*a\x11Q\u0093\\t+\u00EF\u00D3\u00BB\bD\u00A2\u00F5\u0098\u0096\u0085[\u00FB>\x04Q\u0093(+\u0093\x03\x10\u00B5\x0B\u00AB\x00\u00D6\x12\u00EB\u00CF\u0083\u00F4(D\u00DFTE\x10\u00F9\x1Fe\u00A2\u00CA\u00B9\u00E9\u00DAS\u00E6!T\u00E3e\x04\x12\u00F1>u-\u00E6\u00D4\u00C9\u00EA\u00B8\u00E3\x1C\u00FD\u00FF\u0089{\u00B7^\u00DB\u00B2\u00E3<\u00EC\u00AB1\u00E7\u00DE\u00E7\u009C\u00BE\u00F2*6E\u009ATD5E\u00C5V\b\u00EB\x02:1\x1D\u00CB@\"8\u0092\x03%A\x12+\x01b\x04A\x00\u00FF\u0080<\u00E5=\u0081\x1F\x14 \u0080\u00DFb\u00C0\x0E\u0090\u00F8\u00C1\u0090^L#\x12\x02\u00CB\u0092%@\u0092\x05\u00CA\u00B2@\u008B&e\u00D1\u00A1\u00A9\u00B6D5\u00D9d\u00F3\u00D6\u0097s\u00CE^sT\x1E\u00EA\u00FB\u00AAj\u00CC\u00BD\u009Bl\u00C1\u00BA\u00AC\u00EEu\u00D6\u00DAs\u00CD9\u00E6\x18c\u008E\u00AA\u00FA\u00EA:\x1AZ\u00A8u\u00D3\u00EF\u00EF\u00B29\u0088\u00F0\u00DB\u00DC:=\fr\u00B3\u00F6\u00A2\u00AB*>\u0083d\x18\u00FD\u00F6\u0086\u00ED\u00E5/\u00E0k?\u00F3\u0093?\x04\u00E0\u00FF\u00D2\u00E1\u0085!\u00FC\u00C2\u00CD\u00CF\u00FF\u00C5\u009B\u00FB\u00AF\u00E1O\u00EC\u0095\u00FE\u00F3^\u00B8\u009C\u00E4\u00A4\x00\u008E\x1CT,\u00A4\u00DA\u00E0\x13-\u00D0\u00A5$\u008E\u00A9-\u00B7<\u00D7\x11\u00EE\u00C3\u00AF\u00BB\u00E3I\u00F3,\u009A\u00B2a\u00C3\x05\u00B1\u00ED\u00D7cJ\u00DD*\u00B0*\u00A3\u00DF`\u00AB\u0083\u00E9\u00CA\f\x7F\u0096\u00A1P\u00D26U\u0080-\u009FwH\u00FA\u008A\\<\u00F2\u00CC\u00AA\u00B1X\t\u00B2\u0081\u0084\u00C2\u00F0\x17\u00C1Q\u00A5npd\x06\u00A4;\x0B\u0096\u00B6\u0084\u00A0{/\u00A9\u00E5c\u00A5#\u00931-\u00DA\u00AE\u009CF\u00E9\u00C1*)\u00D6\u009E\r\x17\u00AE\u00A0'\u00CCs[2\u009E\u0080Jr\u00C2\u0089\x18\u00A5\x1C\x11\u00F6fX\u00F7\u00A0JO\x1B\x01\u008B78\u009D\u00BBz\u00CCI\u00C0mw\u00EB5:\u00D0\u00D9n\u00D93\x14\u00F7Q\u008C@s\u00A5\x10f\u0084\u00E0\x11\u00F7t\u00A1+\x05\x18X\u008D\t\u009D\u00BDw\u009B\x06\x0B\u009F\x0E\x00\x07%\u00F5l\f\x03\u00D1'\u00F3\x1E\x14\u00C5y\u00F4\u00AE\u00947\u00CE1\u00F9\u00BC\u00BCv\u00D3\u008A{7\x17hhX\u00C9\x002\u00D5\"\x19\u00A3\x10\u009E\u00AF\u00E8!\u00D5\n\x07&\u00B0\u00CF\u0089\u00FD\u0093\u009F\u00FE\u008Bx#\u0086\u00F09{\u00E9\u00A3\x07zG\u00FF\u00B8_\x03\u00EB\u00AE\u00BDUG \t;\u00A5\x7FI\u00D6\u00EE\u00AE\u00A97\u0090aD^@_\u00D7\u008Eix4\u0080\u0097\u00DC\u00C3\u0086\x000\u00AE\x00\u00D8\u00DC#\x12\x11*\u0093\x16\u00F1\u00F9\x13\x1E\u00AED\u00AB\u00D2i\x07\u00E2\u00FA\u0083\u00EBj\u0098\x12\u009Dr[SXJwp\u00A9g\u0089\x16DmGY\x01\u00C2 T\x1B\u00CEV\u0088\u00B3l\x16\u00950\u00C5\u00D2ln9\u00CE\u00B4\u00FEC\u008CA\u0088i,\u008B\x05\u00C9H\x10-\u00E5z\u008C\\\b\x11I\u00AE\u0083D\x07]\x14#\u0088\u00DA.1\u00BF\u008C\x7F\u00D0B\x0F\u00E2G#\u00AC\u00B6\u00AAD\u00C8\x16*A\x1C;?\u00D7\u008E(\u00C4\u00CDJ\u00FDK\u00F5&\u00D5\u0091\x16\u00A4\u00E3\u0086\u00C5\u00D2\u00AE\u00B5\u00D5\u0099\x14\u00DB\u008C\x023rm\u0093\u00D0\u009B\x07\u00A1\x03\u008F\u00EA\x7F\x19\x1Cm1\x1E\nI\u00E8J#\u0081w&\u00D1Q\u0087\u00B5{\u00F5;\u00E9\u009C\u0086j\\;II\u00ED\u00A9\u00B0\x00\u00AD\u0087\u00A5\u008DTi\u00BA\u00D7\u00C2k\u00F8\u00D3\u0082\u00A9|\u00F1\u00C5\u008F\u00F6\u00A1%&\u00FF\u00DA|\u00F5\x1D\u009F\x1B\u009Fz\u00BE\u00FC\u00F8\x7F\u00DC\u00AFB\x07\u00F1\u008E\u00A0\u00A4[*\x01\u00CF\u00AD\u00CFB\x03\u00BD\u00AD\u0080\u008D\x15\x11x~\x05\u00DA\x0EW\u00E4\u00D71\u00F0\u009A\u00EDx\u00E4\u0086G\u0088J\u00CD7\x0E\\(\u00AB.\x16\x01J\x17\u00C6*\x1C\u0088\u00B0\u00E5xo\u00B8Al/\u00DF\u0093\u009D\x0E\"\u0080x\u00EBX1\x11\u00C5\u009A\x1D\u0098\u00BC.v\u00A9\u008E}#\u0090^\x06\u00B93\x0F\u00AF\u00EBj\u00D7\u00A9\u0088-P\u00C5\u00E5x\u00CE\u008Dq\u009A\u0085\u00CD@s\u00AA8\x03#\u00A3\u00D5\u00DF\u0083\u009F\fWVT\u00E4\u00F2V[ryj\u00F1\u00DB\x0E_\u00FC\u00F1#\u00ECzz.C\u00EA\x1F\u0090\u00D9{\u00EA\x1B\x14\u00B6\u00CB6\u00B9`U\u00C9\u00CA\x19Ay\u00FB!\u00B6>\x01\u0090\x01\u00B1b6\x001\u00BA\b1n\u00EB(\u00C3}G;fi|C\u009F;\u00FD\u0086\u0090\u00E8\u00BDL}_g\u00C8$\u00ADF\u00F8\u00F2\u00F2\u00F4k\x14f\u00CC\u00FE'\u009F\u00D5gB|\u00B5\u0081BD4l\u00D6\u00AB\u00D90Z?S\x006&\x14\u00CC 6\u00DBq\u00AAO9\u009E\x17_|\u00DE\u00FF\u00D5\u00AF\u00BFC\u00AD&B\u00F8\u00B8}\u00F6\u00CF\u00FD\u00D6\u00FC\u00B4\u00C1\u00FE\u00A4\x02\u0092\u00A2|I1\x05@\u008B\u00C0\u00F3\u00BB\x1E8\x07\u00DA\u0085N\x0B\u00D81J\u00CB5\x07@\u00EF*\u0098\x1Ar\u00CC\u00F1U\x00\u00F7\u00A6c\x1B\u00B1I\u00EC\u00EE\u00AC\u00A3\u00C0H\u00C1\r!E6T\u00AC\u00C1\u00C0\u00A0\x07b\u00E3.Q(\u0082 \u00E2P\u0090\u0093\x1EK\x14M\u00A9\x07w\u0085\nb\u00BA``\u00E3\x18\u00D4~\u00EE3\t\u00ED\u00E1P5\x15\x00\u0085k)@K#\u00D7Bi\u00D2\u00B2Gmv]\u00D24\u00BB\u009C\u00B7\u00F4U\u0083\u00F7j\u00B3o\r\u00E66\u009F\u00F9j\u008B\u0088\u00A6,\u00A1=c\u00FC\x01\x06,90\u008F`>)\u00C1%\u00C1\x06\u00BB7\u00B9\u00CB\u00DA@l\x0Bg\u00C8\u009D\u009E\u00A8\u00AFgr\u00D4t\x12/J\"\u00C2q\u00CE?\u008D\u00B1\x15a\u00BA\u00EA\u00CA\x11B;\u00A1w\x15ia\u00D7Dd9g\x16v\u0084\x05o\u00A6u\u00E8\u008E\u00F8\x042@?\b\u00ED=\x04\u00D5\u00AD\u00E2\u00AB\u00CD\x0B\u00E1=Q\u008B\u00EA\u00C0\u00ECc\u00D15\u0097\u0094\u00F4\u00B9\u008B8\u0091Dz`\u00BA\u00BB\u00D1\u00DB\u00E3NDh\x18/}\u00C1\x1E\u00FD\u00FC?\u00FAs\x00\u00FE\x1F\u00A01\u0084\x7F\u00FE\u00E8\u009F\u00FC\u00E0\u00D7\u00EF\u00BDae\u00A5?\u00E2\u0097\x16eS\x17\u00806ae\u00F3\u0086o\u0094H\u008Al\u00B3\u00C6\f\u00EA\u00FC7\u00FF\u008E<\u0084/Z\x04)_aFz4{f^E\u00D6v'\x02\u00B0\u0088O\u0088\u00A5\u00E7\u0084\u00FB[\u00EC\u00F0d\u00D1\x03\u00ED\u00F3\u00AB\u00D8\u0082\u00D5\u00D5\x18\u008B\u00EF\u00E0&\u00B4\x07\u00C7\x11*\u00CBF\x15O\u0089Ib\u008A}?\u0083x\u0098!P\x14\x04\u00A3\u0099\u00ECsUR1\u00D5fI\x1E\u00A0\b\u00A9UN.\u0097{ \b\x11t\u00FC|R\x19\u00B4\u00F0\x10\u00C5>XG\x19J\u008ENv\u009E\u00CA0\u0099\u0093\x03k\x1E\u00836\u008E\x19dJ\"\u00AA\r\u0081k\u00AD5#)Z\u00AB<\u00F8X\u0093\u00BC^\u00B3\x10]\u00E0\u008C\u00E8\u0092D\b\u0092\u0096\u00D9H\u00B47\u00EB\u00DC\u0094\u00D4yO\u00F5`\u00B6\u00F6\u0089h\u00D3C\u00D0\u00D5\x1D}\u00F7;l\f\x03\u0085\nd\u00B4\u00CC\x07\u0089\x1E\u00C8\u0094\u00E7&\u0081\u00B7k\u00F5\u00AC;\u00A3\u00F6\u0081,\\\u00DBJ\u00CF\u00F5\u0097\x01\u00B8w\u00B9\u00E0\u00CB\u009F\u00FA\u00E4\x0F\u00E2\x16C\u00B8\u00F9\u009D\x1F\u00C0\u00F5\u009FP \x12\ts%f\u00A0\u00A0n{(\x0B\u00E1\u00F7\u00D78]\x7Fn\u00AB\u00D3\u00C1\u008A6\u00DC\f\u008Fp\x0F/;p\u00C5\u00E8E\u00B3H\u00BE~\u00DC\u0096x\u00B46K\u00EAzd\u00DBE\u00CEC\u00DCJ\u00E8c\u00A0\x1B\tU\u00E19z\u0093\u00DF[.\u0084\u00BA9\u00E0\x11\x19\u009981\u00FAY\u008A\\\u0090\u00DA\u00C6\u00B3{]FS%\u00EA\u00A9\u00FD\rF\x0E\u00DA\u00BC\u00E6Bkd\u00B8\u0095\u00A1\u00AE\u0095G7\u0080\u00BEk\x00C\u0090\x13\u00B0\u00D12\u00FB\u00E0\u00B0a\x19>k\x18\u0098\u00D4\u00E9\x1D\u0091\x04\u00E5\u0083\u00D2\u00CE\u0082\u00C8\u00E7\u009C\x19\u0093\u009F\u0088\u009C\x022\u00E0\u00BD\x10\u00CA\u00A8\u0085\u009FO\u00CE\u00B1\u00DA\x01,\x17\u00BD\u00B9a\u00FAAb\u0092~/\x0E\u00A2ur\u00D2\u00F5s=9\x0B\u00D7\u00D0;C\u00F5!\x18\b\r\u0082\x1A\u0082m\u00E9\u00FAt\u00868\u00CB\u00BA\u00EFS\u00F1\n\u0088\u00FB\x1E\u0081`l\"7\u00EF\x1D\u00B0@\x0B\x1CG\u00DAc'\u00DA\u00EA\u00908\u00C9\u00C5\x1A\u008F\u00E7\u00F0\x005'\x03\u00A2\u00C2\u00AC\u00DDQ\u00FBo\u00A4\u00C1\u00D5\u00D8\x1Fk\u00E7\u0098,\u00DC\tL\u009E\u00F8\u00D7\u009F\u00FD\x01\u00DD.\x19\u00C2W\u00AE_\u00F8>7e7\x16\x11\u00FD\u00D1\u00BE\b\u00A9\u00B0\x01\u00B8\u008FH6:\x13<\u00FF\u00EE\u00BA\u00B1\u008C\u008D~\u009B\u00E8MF\u00B4s\x1B\u00E7\x1C\u0080\u00BC?-\u00B5\x06\u00BC\u0086\r_\u0081\u00E1\u00BEE\u00DD\x04\u00ED\x13\x14F\u00C3\u00C8\u00D6?\u00BCX\u008D\u008C\u0086\u00B1wdH7\x19\x15o\u00C8\u00E4\x14\u0087\u00A0\u00FEt\u00AFB\u00A6\u00E8\u0082Q\u0088\u00A88\u00BDH\u0085\x0E\u00AF\u0084\u00E4pW!\u009C\u008C\u00CC]\u00E5\u00DDc\u009C\\\u00E2\bT\u00A7@\u008A\x04\x00\x00 \x00IDAT\u00C5\u00DF\u00C8\u00BC\u00CAR\x0E\u0098\u0095A-\u00E6\u0087\u0090\\sfB\x04E\u0098\u00AE2iMj\u00E7K\x014\u008E\u008Cp\\\x11E\u0087\u00F4Hi&tcy\u00E1@\u00ED\u00A9\x10\u00CF\u00D8\x16\u00C9[\u00CC\u00DEM\u0086\u00CB\x16U\u0099\u00AE\u00CF2\u00FC%\u0093I\u00DF\u00BD\u00C6eK4\u00A6\u00DD)}i\u00DA\u00F5\u0089\u00AA=\u0080ZK\x1Ak[S\u0096\x15\u0099t\x02\x11\u0080DA\u0081\u009B\u00BA\u00D72\u00CE\u00D6\u00B6\u00B71%\u00D3\f\x06\u009B\u00EB\u00CA\u00DB\u00F8rA\t\u0089\u008Cv\u00BD\x15(\u00CB>O\x1C\u00AF\u00BE\u00FE}\u00D5{\x00\u009F\u00F3\x17\u00DE\u00F5{\u00F3w\u009E\u00FB\u00E3-\u00B5\u00BE\x01\u00FE\x00\u00C3\u009F\u0086\u00F9\u00D3\x00\u00EE\u00C3\u00F1\x00\u00F0\x07\u0080\u00DF\x03\u00FC\n\u00C0\u008E\u009E?\x7F\u00CB\u00AF\x0E\u00E0\u008C\x18j\u00F1\u00B7W\u00B3\u00C4\u00AF\f\u00A4?\u00B4\u00A8B\u00FC\r\x07\u00BE\u00E2\u0086G\u00BE\u00E3\u00B1ox\u00E8\x1B\x1E\u00FB\u008E\u00C7\u00D8\u00F1\bWxl;nl\u00E4\u00FB\u0082\u0081\x1B\x03n\fx\u00CC\u00BF\u00C3\x18H\x15\x02R\x17D\u00C8\x15\u0096\u00AC2\u00ED\x077\u009F\t\u00B5\u0083oh\u00A7i\u00C5\u00B0\u00A9\u00DEc\u00B0\u00A8If\x13F\u00C60\n.IDRXZ\u00A8\u00B5\x18\u0089I\x1D\x11\u00E3L\u00D5\u008CjX\x1A\x0E\x17VKU\u00AD\u00BBV\u00DB|\x12%X\x12Z\x19\u00EEn\u00D9r\u00DA\u00F4\u00C7\u00B3Q\u0082\u0094-\u00A7\x14hQ\x1F\u00D9\u008Fdt]\u00A0\u0088)\u00CE$\x00\u00CD\u00F7*\x10\x1A\u00D1\u00E7\u00F76\x07\u00D2\u00C7\u00BB\r&\tJ\u00EB\u0085B\u00C99\x1F\u00DEB\u00E0\f\u00D5\u00EE\u00C2\u00A6\x151hK$\u00A2\x1C\u00CF+\u0083U\u00BF\u00C44\u00E2\u009Fr\u0082\u00AA\u00D5Q\u00FD\u00F0& [\u009F\u00A5\":\u0099\u0081/\u00F7\u0089\u0095\u00B9\x7F\u00E1\u00F3\u00CF\u00F9\u00EF\u00FC\u00E6\u00BB\x00\"\u0084\u0087\u00B0\u00EF\u00FD\u00ED\u00F1/\u00D1\u00CE\u00FC#zQ\"c\x0B\u00E2\u00B7k\u00A8(H\u00EE\u00E3\u0097\u00BB2\r.\u00E2^$\u00A5G\x11\x02\u0099}\u00D6\u008F\u00A1\u00AD\u009D;_Z\x18*\u00CB\u00D5$\x0E\u00C2{\u00F0\u00B2\x03O\x00\u00D8|`\u00B3\u0089G\u0092\u00B2\by\u00D1\x1F\u00B4\x02\u009D6\u008FH\u00D6\x1B(\u00847\u00D0x\u009C!5\"\u00DE\u008A?\u0088\u00AC\u00CAZ\x10[\u00BB\u008F\u00BC\x0B\x002\x19*\u00AA@\u00D7\u00EB\u00E0\x1C\x1D}n=T\x07\x10\u00F5\u00C0\u009C\u00D2b\u00A3\u00E6\u00D5\x12\u00AE\\\u00BBJ\u0099\u00A2}\u00A1-\u00E7\u00AA\u0090\u0091\u00E5\u00BC\u00C6\u009C\u008F\u0092\u00AAF\u00FD\u009B\u00D5\u0099cj\u0084H8\u00B7Q\u00C6y\u00F1\u00AFG T\u00E8\t\x11\u008E;\u0097\u00A5\u00E7Z\u00C8w2\x7FO\x02\u009Es\u00B6\u00E71\x1A\x11\x11s\u00B9\u00B2\x1CWC]Iw\u00AD)\u0086P\u00BB\u00A3\u00D4S\"\u00A4\u00CC\x00=\u00EA\u00BAY\u00D1\u0096\u00B5U\u00DE\u0089v\u00C8@\u00B4\u00A5\x1A\x1C-\u00E6\u00A3\u00ADC\u0097*@&1i\u00B8\u0094\u00BDb\u00DA\x1Dm7u@1\u00F1\u009Da-\u00A7\x13\u00E5P\u00BD\u00F0\u00D9\u00F7y\u0088\u00F3\u00B7\u0097^\u00C2+?\u00FF\x0B\u00DF\x0B\u00E0\x0B;\x00\u00FC\u00C2k\u00BF\u00F9g^\u00BB\u00FAFM\u00F8\x1F\u00EAK\u00D0kC\u0096Q\u00C7\x15\f\x0F\u00E0\u00B8\u00E2X\u00E3\u00D8`\x1A\u00EE\\\u00D4\u0081\u00BD]_AG\u00EE\u0092b\u00FD\u00DD\f\u0092}\u00E2\u00AD,\x00+B\u00E8RC\u00B6\u008A\u0081G\x06|\x15\x07\u00AE1\u00B01\x1FrO\u00B7\u00DFl[\u00C7\x07A\x1D\u00EE\u00B8 \x16\u00C9D\u00B8\b\x07\u0099\u008B\u0081y\x10$p[\\z\u00C0\x15\u009Ca\u00CBA\x02e#\x0E\u0089\u00A2\u00FA\u008AR)\x0E\u0084\u00F4\u009D)\u00917\x14\x18\u008Ex\u00C6\u0090\u00D6X$_n\x06K\u00A3\u009DBr\u00E5\u00E2\u00CB\u00B8\x00o\u00D3\u00E3[-\u0089\u00E4\b\u00FA\u0083\u00C4\u00BE$\u00FE\x14Z\u00A86\u009B\x1D#\u00F5x\x05\u00F6\u00B4\u0086]\u00D9\u008AvZ\u00D4\u00DD\x1F_\u00CC<\bL\x12\u00D1C\u00A0\u00F8\rR\u00AC\u008A\x01e\x1B\u0093:\u00B4\x18\x07\u008D\u00A0KVb{;Pp\u00BB\u008D9a\u00BD<\x1E\u0082\u00EA\rI\u00E8\u00EC;\u00D0M \u00A2 h\u00CF\u00FC\b19\u00E54\u00A8\x1B1\u00DE<\x078uSk\u00DE\u00D7{w\u008FI\u00F7\u00AE\u00A8O\x1A\u009F\x0F`\x02W\x07\u00F0\u00F0\u00E3\u00BF\u00F2g\x00\u00FC\u00A3\x1D\x00>5~\u00FD{\x06.\u0098\u00EE\u00DFB\u00BA\u00FEA_\u00E4N\u00D8`\u00B8_\u00D2\u00DE\u00AF\u00E1\x16;8'\u00B13\u00AB1\u00BD\fK\u00C9,\x11\u00AC~\u00EB\u0088Ae\u00BCF\u00BB^\x13\u00C2\u00AA:X\u00890^\u00CA\u00A3\u00EF\u00A8\u0083\x10\u00D3\u0081\u0097\u00CD\u00B1Q\u00F2\u00EDn\u00B8\u00C2\u0086*\u008C\u00A6jM\u00D1\u00CEN\u00C6\u00A0`\u00A4\u00D8N>\u00DA\u00DB\u0081T\x19\u00CA\u008E#\u00DB\u00C1m;B &1\x1B\u00C1W\x16\x7Fu\x05>\x11q\u00E88\u00F5\u00DCn\u00AF\ba\u00DD\x18\x1D\u00CAh\u00B6\x14%\x05\u00FD\x01\x14\u00DA\x19\u00C8\x04TT!\u0098\u00D3\u0091\u00AA\u00D8\u00D0\u00CA\u00AA\u009C\u0085|\u00E4\u00AA\u009B03h\u00C7\u00A4#s\u0091\x062St!8\u00FA\u00C1\u00C9\t\u00A3[FD\u0082\u00AAJc<q\u0098s\u00ACtb\x0F\u00C7\u00E7H~!&2\u00A0\nE\u00F1\u00CC\u00E86\x14\u00A3S\u00F0\u0096\u00A3\x11'\u00FB4y\u00B7i\u00E5y\u00A0\u009B/\u00CFI\u0084y4\u00A9my?\u00C8V3k\u0085\u0095tv\u0094\u00FB\u00B5\u00FA\u00DB\u0099Vy\t\u0082\u0089\u009Av\x7FR\u00B1\x14M\u0088Y\u00B5\u00D3\f\u0089\x1D5\u00C4\u00DE\r\u00C8u\u00A0\u00DF\x07\x1C\u00E3\u008B_\u00F9\x1E\u0080*\u00C3\u0097\u00F1\u00E5\x0F]\u00B6\u00CB\x1F23\x00\u0082 \u00AFQ\u00AA\u00C0\x15\u009C\u00C7\u00ACm\u00D8\u00AA\x1D\u009Dg\x12{ \x03k\f!\u00D4\x03]\u00A3\u0087\u00A0\u009A\u008A'f\u0092\u0088\u00E2\u00AE\x01u4q\u00F7K\x15\u0099\u00BF\x06\u00E0\t8\u00AEp\u00C1\x0E\u0099\x03\u00D5g\u00B5\u0094\u00C1\u00CBI\u00D8\n\x1C5\u008E\u00D6\u00CDi\u00BD\u00B5\u00BCF\x06\u00C6s\u00BF\u00B2\u00EC\u008BEf%\u00AC\u00DB\x01\x1C=>M{Q&\u00E3t\u00F5R\u00B0\\h\u00AA\u00A4vx\x19K\x1B\u00F5d\u009A\x0E\u008C\x16\u00E6Jf\x01x\u00C6\x00,`\x00\u0092\u0080\u00CDXg\n\u00B7\x15w\u00D1\u0089d \u00B9\u0093\u00B2\u00AEQk\u00A6\u0089\u008Fs'PQ\u0083\u008E\x15%\u009C\u008F\u00E9\u00A5\u00E8E\x1A6\u00C9\b|\n\x05\u00A0\u00FA\u00C9\u00A1\u0099\u00DCz\u0082\u00E5\u00A9\u00877\x15&\u00F7\u0087\u00B0UJ\u00AB\u00DF\x1A\u00EFb\u00DD?\u008D\u00EB\u0096T\x17\u00DAh\b\u0087\u00E7\u00D6\u009E\u009E\u009Dq\u00A0\u0098L\u00A2'\u00DE\u00A3\u00AB\fh\u00E7\u00F4\bI\u00AA\x16b\x06\x19\u00E3\x00\u00CF8\u008C\u00F9\u00CA7>\x04\u0090!\u00BC\u008C\u00AF<\u00EF\u00D6&\u00EB\u00DF\u00FA\x15\x04\x19j\u00C1u,:\x17s\u00D8`\u00B8\u0086\u00F2\u00FC\u00CB^\u00D0\u00A5\u00FE\u009A?Pp\u00BF3\x04\x19\u0092J\u0095X\u00CA\u00AC-\x05>\u00CF\u00AFv\u00DE\u009D}\u008FE\u00F7\b\u0086/9\x03\u008F-\u00AE\u0089\u00AB&\u0086E]\u00C6\x0B<\u00F7\u0082\x149\x1B\x03i\x06\u00A2&\u00C2`\x1E\u0086B\u009F\x0F[\u00FB\u00A2\u00B1.\u00EEI\u00E2;\u0095\u0089\u00A9\u00A8\u0086b'\x15\x1E\u00CD\x14%sd\u00BC\x03U\u008A\x10\u00FEc\x11&\x159X\u008C\x06\u00D2\u009F\u00D1\u00C8\u00D4\u00FB\n,\u00DB\x03l6\u00B4P\u00BE\u00EE\u00CC\u00C30Gn\u00C0\"\u00D6(co\u00BA\x16\u00CFs?0\u00CD\u00D3`Y\u0084?\x1A!PZ\u00BA\x18\u00C2\u00FA\u00DC*\u00F6b\r\u00F4)\u0082U\u009B\t# F\u00AC\x04\u00A2\u00BAg\u00F5\u00BD\u00A4m\u00BB\u00DD\"\u0081\u00C5\u00FA\u00F5\u00F4\u00CE\f(\u00DA\x121.F\u00CB\u00F4+\u0089\u00C1\u0096\u00A8)\x06\u00D2\u00EF\u00D9\u00A6\u00D5\u0085\u008386\u00A7\u00AD\x06\u008D\u00A9\t\x1D\u00F8\u00CA\x104<\u00B3\u00E0\u00A1W\u00AF\u00BC\u00F6<\x00\u00EC\u0097\u00E3\u00F1\u0093\x7F\u00FE\u00F2\u00A3\u00CF\u00E1\u00DF\u00FA%\"e\u00E9\u00F4D\x05\u00C1\x04`\x1B\u00DC\u00AFQq\u00FD\x0600\u00C7\u0093\t\u0088\u00E8\u008BQ\u00DC\u0096\u00FA!\u00A5\u00B5o\u00E2\\\u00EE]\b#c\u00DEq\u00F60lm\u0092\u00AD\u00DE\u00A7\u00C2*bB\u00AF\u00C2\u00F1\x15l\u00DC@\u00D6\u00B2^\u00C2\x15\f\x17\x1F\x186pL\u0095/\u0093V\u00CF\u00BD\x1C`\u00B8\u00B4 \u00AA\u00D1\u00A4\u00FAX\u00D4\u0085JZR\u00C4\u00E3A\u00DB\u0083\u009B\u00EA5\u00D6\u00F9\u00CA\u00A84DN\u00C5A\x06\u00A0\u00EF\u009B\u00957!^#-\u00E1\u00AB\u00FB5\x16\u00C6\u0098\u0083,%\u00DC\u00B9\u0086Iz\u0093\u00B4s\u00C0\u009Ar\u00E3\x05}'\u00801\x1C8\x18\u00DB\u00D8k d\u00CC\u00FF\u0084\u00CD\x19\u00CAB/\u00BCB\u00C9\u00EDd2c\u00C6\u00B9KYu\u00DB\u00A1\u00A8<\u00CB\b\u00BF#\bx\x0E\x1A\u00C9\u00C8 &\u00EF)~\u00C1\u00C8\u00C0,\u00B2\u00EA\u00CC\x15q\u0083Mn\u00E1\x0Ea6\u008B\u00F32\u00D0\u00D0\u009A\u00DF\x7F\u00D6\u00D85\u00A7\u008B\x04\x17\u0083\u00E3\u00BD\u00D2\u0088\u0089\u00AC\x1F\u00A1 #\u00D5V\u0080\u00EA\x19\u00F0o;\u00C8\\foS\u00E8,\u00C6#\u00E3\u00A4\"+\u00E5\u00EAM\x16\u0097\u00A8Gv\x1B\u00CF6\u00CD\u00A5\u0092]\u008Aq\u00CC\u0098{\x1B\u008E\u00F1\u00F5\u00AF>\u00E7_\u00FC\u00EC\u0093\u00FB\u00A7\u00C7\u00A3\u00EF\u00F8\u00A2\x7F\u00FE\x0F\x01\x1A\u0088\u00F8w \u008A\u0094\u00C1\u00A9&\u00C8m\u00A8\u00B0\u00DEr\x05m(/B#j\x18b\u00CB\u00F7b\x06Ys\x00\u00C5@\u00EA:\x1A\u00A3\u00D2\u00EE\u0080\u00DB\u00BF/oq`\u00E9\u00D7\u00FD\u00BC\u00D5\x009\u00CD\u00F05\x18\x1E\u00D0\u008E\u00B0\u00DBZ\u00A9\u00C1a\u00F4&\u00C4\u00FB\u00B2\u00DCE\u009E\u0085 \u00F2KJ!\u00D9\x1F\u00C4\u0088\u008AY\x053(r\u0096\x17#\u00A2t\x15\u00B6\x1Cm\u008B\x11\u0084\u00CD!\u00C6=\u00DB}\x13\x05\u0084\u00D9\u00BEIP=\u00EE8\u00ABB\u00AE:\u00FE\x00\u00C4\bJ\u00B4\u0080\x0B^\u0092-\u00B6\u009F)\u0089\u00DD\u00C5\u0097\u00B5\b\u00C2\u00F0\u00B4D\u00A0\u00A2\x16\u00BB\u00AE\u00EBbW\u008B\u00BC!\u0080\u00F4\u00B1c\u00E9w1\x1E\u009D\u00DFavk/\tx\"\u00ED\x05]2w\u00C2\u00D6Ks\u0096(b\u00A0vE\u00EA\u00C7\x1A\u008A\u00C8\u00FEKZ{^n\u00D9\u00DE\x1D\u00AF\u00C5`\u00D8\u00D1\u0088\u00A4|\u00FD\u00AD\u00FD\u00BA\r\u00ED\x19L\u00F6M]!#\x17\u00D3H\u008FMGG\u0099\u00F8D\x0F\u00C8\x04n\u00BE\u00F0\u0092\u00DD\u00FF\u00C4\u00A7\u00BFc\u00FF<>\u00FB\u00FE/\u00F9\x17\u00EF\u00EE\u00EC\u00B7|IrQ\x1D\u00F0\x07\u008D\u00C8O6\x02/\u0089\x1F:q7\b6\u00EF\u0081\b$\u0089[\u0099\u0081\"\u00D6\x1E\u00DELF\u0090\x0F\u00BE\x18B\u00A1\u0082~\u00AEBxuNg\x06\u009C\u00F8\u008C\x1D\u00AD\u00C5t\u00C0\u00F1\x12.\u0098\u0088\u008A\u00CCW\x1E[\u00C2)\x1D9\u008Dv\u0090\u00F6^\u00FDm\u00A4\u0085^\x19\u00C9@wb\x12\u00A1X\u0091\u00DA\x03\u00C3\u00A6\u0091\u00C7\f(\u0086\u00E0#\u00C3\u009E\x15\u00E2\u00EC(\u0086\x03\x18v\u00EF\x006\u0098\u008Fc\u00CBEb\u00CAl\u00D4\u00FAu\u00D4\x02\x1A\u0088]\u0093\u0086\u0091/H\u00E4\u00B5\u00CAG1\u008A6\x7F\u00BC\x0F\u00A5tm\u00D3.\x04\"f\u00AF2\u00B6@\x11~\u00BF^\u00F3\x0F\u00DA\x00R\x06V\u00FB\u00BA\u00D6\x00WPOJ\u00EC\u00B6D\r\u00D0\u00EEN\u00B9;\u00B6\u00B7D\u00A6\u0084\u00DE\u00ED>\u00CD\x1EP\x04\u00AD\u00A0\x1E\x06f\u00BB\u0096JS\u008D\x1C\u00C9^\x01@\tDRE\\\x1E\u0086[/^\u0091\u00FDg\x1Fd\u00D4\u00F4B\u00BC\u00F5;r\f\u00C6s+\u00C7\x03\u00AB\u0087#\x19R\u00C4\u00B1\x18Z\u00B1\x19\u00A2\u008E\u00ABG7x\u00F5W\x7F\u00ED\u00FD\u00FBg/\u00BF\u00FD\u00BE\u0087\u00FBk\u00B9\b\u00DF\u00D4\u00CB\u00B50\u00AE\x11U\u00826D \u00D1\x15\u00E0\u00D7X\u00F5w\x12~\x0B\"\u00A9\u00C1\u00B5\x1D\u009C\u0093\x19\u00A8\\Z@\u00ED\u00DA\x01I\u0093/\u00D5\"\u00CE\u00ED{2\u0096\u0085\u00BDK\u00DD\u00CEpl\u00F1,\u00B8\x01*d\u00EAP\u00AAu\u009A\u00F5\u00EAA!\n\u00A7|\u00CD\x1DO\u00C0\u00B1g\u0089\u00B6\u00E8\u00C5\u00EE\x11\u00BA\u00AC\u00F4\u00E9\b\x16r\x1C\u00A0\u00C7\u00C0T\u00CE\u00BDBe&\u00FFR:u\u0094/pL\u00D7\u00B6\u00B1u\u00B6\u00DESnH\x10\t\u00CC\u00B0mD\u00FE\x04\u00F3\b,\u0097'\u00F9\u009B!\u00C2\u008Fe)7\u00AA7q\u0082\x10\u00861\u00F0 G\u00ED@n7\u009F-\u00D2\u00C2\u00DD\u00D2\u00A9\u00C52k\u00FD\u0094\u00F45\u00B7Zx\u0090\x7F}\u00A2j\":\r\u00E8R#\u0088\u00D1\x13:\u00D3\u00BB`\x07b\u00EF\b\x0F\u0089\u0096(\u00B0\u00A0yA\u00E4r\u00DB%\u00E9Ir6\u00D8\x1D\u00C7\u00E2|m\u00C9\u00EE\u00C3aG\u00EB\x03\u00DD\u008AF\u0088mB\nn\x11\u00ADi\u00CE*\u00F1TA&\u00A0\x023\u00C6\u00EF\u0091\u00BB0\u00819\u00A9Ry\u00FE\x1DoKFU\u00B1\x131\u00E42$\u00F2\u00F9%\u00C3\u0098\u00A7\u00B1\u00AB_\u0089;\u00D7E\u00C0\u0083>g\u00C4\u00C8\u00A4Z\u00E59?\u00F7\u00E6\r^\u00FE\u00FC\u00E7\u00DE\u00B7?|\u00FC\u00D2{\u00E6\u00BD?\u00C8V\u00EF\u0082\u00D9\u00D7\x00\x1E Kx\u00F3m\u00A6\u009D\u009Ae\u00DD\u00BE\x02\x16\u0098\u00DF\u00DC\u00840\u0094j\u00D0Q\x03\u00DA\u00B9=B\u00B1\u009F\u00D7\u00A2\u00D0\u00F2S\u008B\u00E5\u00BC\u00CB\u0093\u00D4\rk\u00F7\u00B76\u0096\u00DEn\x1B\u00A7\x10\u008AK\u00C2\u0084A\u00F0u\u00D3]Fco\u00AB\u0084\x16\u0083\x1A\u0088b\u00AE\x0E\u00A4\u00FD\u00E1b%\u00F5uMh\u0083\x03\u00C3\x02\x11\u00A9\u00A2s~w\u00E6G4\u00B5\u00C3\u00C8\f\u00A2\u00D2\x12U2\u00DA\x1D\u00E4\u00BA4\u009B\u0090)tAD\t\u009D\u00C1\u00C5\x16+\u00A8\u008B\u0085UD4h\u00DC\u0092\u00A9j\u00DEY\x7F0\x11B${\u00AF\u00D7\u0091\u009F\u00F4\\\u0085^\fU\x0B\u00B5\u00FB\u00FE;\u00B17Cb\u00EA\u00D0\u00DD\u00AA/i\u0098]n\\!\u00F5\u00F8Q\u00B6\x05\u009F\u00CD\u00D0\u00D7\u00AF\u00EF#W\u00FF\x1B\u008CR{b~D\n\u00A6\u00A4\"U\u008D\u00EE\x1E\u0083\u00DE\u00C6R#\u00A1\u00882\u00E7\u00B3\u00CF\x031G\u00CD\u0099~\x17s\u00E1\u00FD\u00D2\u00D5\u00D8\u00E6LjKc\u0088\u0098-Xj2/\u0085v\u008EG/\u00FD\u00FE{\u00F6O\u00F9+\u00EF\u009Eo:\u00E5yC0\x01\x1A\rMq\x04\n8\"3p\u00C1\u00FA\r\u00A6\u0092h9!\u00A3P\u00C1\u00ADHD\u009D\x13\u00F0vv\u0086\u0090\u008Bp\u00AC\u00ED5\u0082\u00B7\u00EC\u00E3\u008E\u0082\u009D\u00B4\x00\u00F7\u00FC\u0086\u0096\x058\u009B11\u00F5{\u0097\u00F7b\u00B57h\u0087\u0081\u00CD\u0081a\u00DCW\u0081B\u00E2\u0086\u0090~\u00A3WasK\u009D\u00D9\x11\u00A6\u00D6\r\u00ABGA\u00F7\x1CP\r\u0082\x0E\u00FD\u00F5\u00AB\u00E5\\\u00E9\u00E5\u00CE]\u00A2\u00BA\u00BB\n\u008EK\u009Eb\u0080\u0089\u00DCc\x1E\x07\u008C\x05\u0089\u009A\u009D\u00C5-\u0093\x1D\u00E5%Lz\u0092\u0094\x06\x00G\u00ED\u00C6\u00C4\x13K75\x04\x02\u00EBk\u00C8\u00D9\x16\u008D\u0096\u00EAS\u00E1\u008F|\u0096f\x1B\u00A15Z\u009C\u00FE\u0089\x19d\u0092\x16W6\u00F5\u00DE\u00E9\u009EO\u00BD\u0090\t\u00E1\u00F4\u00D4\u00B3t:Q\x18\u00B5\bo\u00FD\x11CQ\f\u0081%a)y)\u00F7A\u00D05\u00D4\u00C5}\u0081\u00E9\u00BC\u00F5\x1C\u00C0lR\u00DE\x03\x04X\u00CF\u009E\u00F4>\x0FA\u00C0\x15\u00F5\u00D8\u00C7_\u00F7*\u00E2/\u00F5\x05\u00ED\x1E]\u00B5(\u00A60\u00D9?2\u00C1\u00F4\u00864\u00A6\u00A6\u00A7\u00C1\u00B6\u009E\u00FA\u00CA\u00D7\u00DE\u00BD;^~\u008E\u00A7}\u008B\u00D7\x15\x02\x15\u0084\u00C10\u0088\u00EE\x1A\u00A5\u00E7Sjg\u00ECz\x10\u00A6\u00DBJ\u00EC\u00B5\u00AF_?n\u00AD\u009DA\u00C9\u00B9\u00EA\u00FEk\u00C2R\x19\x19\u00E3\u00D5\u0099\x06\u00D3\u00A3\u00CD\u00DA\x02\x13Zimb\u0090n\u00D4\u00AE\x16\u009C\u0098A\u008D)\u00C8\r,\u00DE\u00EE\u00DCR\u00BET\u0097\u0091\x12W\x11\u0086b\u00C6m\u009Bx\u00D3Vp\u00C6\rdK\u00BD\u00E831\x01\x19\u00B811\u00D3\u00AD(\u00CF\u00CC$\u00F3\u00C8\u00E4\u00A6T-\u00E2)N\u008F\u0080\u009F0:V\u0095\u00E7$\u0083\u00AC\u00D8\u00CC\x05\u00A1\x07o\r\u0096\u0082\u00D9\u0092,\u00A2*\x0B{2\x01\u0084z\u00E4\u00A6\x055P\x16q\x11P,J-8x\u0099I]\u0090\x17\bk\u00BB\x18\u00CA\u00C9\u00D3#\u00E5K\u00CC\u00A1\u00EA\x19\x02n\n\u00C1\u00F5bJ\u009D\u0099\u00F9d\u00DB^\u00DE\u0089\u00DE\u0097DH\"\u00E8\u00D9$7\u00C8\x14\x1A\u0081\nb\u0093I\u0098\u0098\u008ES\u0086\u00BB\u00E7\u00DC\x01\u00C5X\u00D2\u008A\u00D4\x19\x0F\u00E7\u00ABl\x00\u00EDY8\u00D0\x0B\u00A1\u0094\x04G1\x13\u00CECg$\x19T\x06+F!f\u00E1\u00F5N\x03\u00E7\u00D43\x15rr\u00EC\u00AF\u00FBs\u00FB\u00EF]\u00BF\u00FC\u00CE76\x1F\x18$\u00DB\"\u00A6`Gls\u00B2\u00C2\u00FF5\x16\u00A0\u00DB\x0B\u00E8BL\u00CB\u00B6\u00AE\x0BY\u00EB\u009D\u00A0}\u00A06\x10\u00ED\u0092\\\u00FC\u00BC\x1B\x13\x0B\x15tDQjDW\x11\u00C4\u0088\u00F4\u0080\u00E3>\u00B5z\u00D4\u00AF\"\u00FE\u0090\\T=\x04\x07\u00CD\u00B1\u00DB\u0086\u00E1\u008E\u00E1{\u00C9x\x0B\u00F7\u00E0P\u00A6\x1E\u00F6\b-\u0086\x12\u009AT;1<\x10]!\u009A\u00C6\u008D^|\u00D0Uit\x0F\x1A.\u00AD?\x1A\u0091\u0092\u00A2\u00B8\u0099z\u00FC\u00E2\u00D1\x7F7\u009A_\u008D\u00BA;\u00E3<\u00CC\u0094!IF\u00BA\x18\x05{\u00F0\u0090\u00DA\u0094e\x1A\u00F0\u00BE\u00A2\u00F2\u00FC&\u00C1\r%m\u00D2(\u0088|\u00E6\u00B1(e\x11\x07R\u00DA\u0081\x16\x7F\u00BD8\u0086\u00D2\u00DD5C\u0088s\x17c\u009F\u00EENt\u00E0\u00FDw\x11\x1A\u00AF\u00EF}\u00C3\u00865kR\u00C7G\x0EG\x03H\u00EF~\x0F\x06\"\u0083\u00ABk\u00D5w\u0096L\u00A3\u00A1T\u00C6<'s,5\r\u00C8\x1C\u0085\u008Cv\x14\u0083\u00CB\u00C6\u009AAP\x03\u00ED\u008CVcT\x07t\f\u00E8\u008CF\u00CC\u00CCN}-F\x11c\u00A9jN\u00C1\\\u00E6\u00CD\u00F1\u00CE}\u00C7\u00E5\u00ED\u00B1L/X_\u0086@\x03\x0F\u0090\u009B\u00A4`\x07p\x1F]\u00E7\u00D6\u00C6\u00ABE\u00C8*E.c\u00A3\x16,?\u00DB\u00E2\f\u00E9ZFG\u00B9\u00CE\u00C2\u00D8\u00D8\u0089\u00FCl/\u00E8de\u00E8\u00E1\u00C7J\x7F.\u00EB\u00FF\u00DE\u00AE\x03\u00D6\u008AI\rnz\u00DB\u00AD\u00B8\u00E5>8\t\u00E5\n\x03W\u00D8\u00B1\u00D9\u00C4\u00E6;v\u00CC\u0088K\x00\u00F7uH\u0099OF\u0097\x1E\x05\u008DA\u00C9O\u00F1\u00BA\u00A9\x1E\u0087\u00E1\f\u0091\u00FC\u00DD\u0093\u0087\u00D6 \x1D=\u00D7b\u0086\u0096\u00AADy+\u00C2\u00EB \u00B7c\u0095Z\u0093d\u009F\u00EE\x18C\u00F3\u00D7\u0088\u00D85_\u00B1\u00D0Ls\t@\u00F5\x12\u00D9@#\u00D87R5\u009B$C\u00A4\u00FDj\u00E1f\u00FD\u00C2)\u00E2'#\u00CD\u00E2\u00A7lw!\u008AQ\u00DF\u00F5\u00C4\u00D2-W\u00AB]\u00F6\u0080,4\u0092HH\u00E3\u0092pJ\b\u00B7H_\u00C5(\u00C0Uu\u00BA\u00F5\u00A7\u00EE\u009CR5U\u00A6\u00C9\x1D\u00AB\u00E4\nmFI\u00F5\u00AD\f\u00A5\u00D5W\u0099I\u00CC{_\u00BC\u008D\u00B53\x13\u00CEIG\x0BT\u009D\u0084\x0E\u00DC\u00F5]H\u00AE1\x1C?\u00BD\u00F9|=\u00D5$\u00C7\u00E5\u00F1\u00ABo\u00DF\u00E1\u008F\u00DE6M\u00C0\u00D4['\u00AE\x11\u00F9\x07\x11[\x10\u008B\u00BC\u00D2k\u009Dh`\u00A2\x16h7\u00C4I\u00C2gFb\u00CBE(\u008F\u00C0\u00EA\u0092\u00AC\x1A\x07\u00E5\u00BE\u00F3\u00A5\u00FD\u0093n/\x0EkM\u00A5\u00B0\u0086,Nj\u00C6\u00AAj\b\u0095\u00F4\u0089\u00D7\u00BD\u00E3X!\u008C\u008Dx'R\u009D\u00E2\u0092\u00D8E\u00CAhK\u0080\u00CB\u00FDW)\u00C0\u00D0o\u00F9x\u009AM\x00\u00E1a\u00F0\f(*5\u00E2B\x06(\u0095\u00C5x.,f\u00EF@\u00CDc\n\u00EAT\x1F\u00E45Q\u00B95@EZ\u00D4\u00BB\"\u0094Q\u0084\u0092\u0084\x03\u0094\x18N\u00F1X\u0084)I\u00B9\\\u00D7(5\u00D1\x03\x19\u008C\u00AF\u0086\u00CA\u0080\u00D3\u0092\u00CA\u008A\u0082hm5x[\x018\u008D\u00B8\u00FA\u00EBdsX\n:'\x1C\u00A7\u00D1o\u00F6q7\u00A9\u009C\x12\u00D6\x01g0X7\u00DA-p\x1Dd\x06\u00EC-\u00DB\x15sr\x12\u00ECZ7\x01\u0089\br]pU\u00F4\u00B1v\u00E9\u00DE\u00D1A\u00ADs!\x1EM\u00CE<\u009DKD\u00A09\u009B\u00A76\u00DB\u009E\u0090i\x7F\u0098\u0086\u00AE\u00E6\u0099\u00FB\u00DB\u00F6/\u00CEG\u00CF\u0098S2I\u00BF\u00C7= \u0093\u009168\x17\u00FF\u00C0\u0086HS\u00EE.\u00C2\"P[\u00D4\x04\u00C2\u00C0\u0085\u00D8*\"\u00D1\u0093\u00F8\u00B6\u00F5\u00BC\u00D4\u00F3\u00B1\u00A0\u0082$d/\u00E2N\u00A2\u00F5-\u00D5\u0080\u0094\u00A2\u00D9\u00BF\u00CE\b\u0080\u0085\x19\u00F4\u00E3V\u008C\u00C8\u00FBy\x00\u0080-\x1D\u008D\u00AB_\u00A0\u00F7GD\x1A\u00D7f\u00FEA{\u00F70%\u00CD\u0091\u0082\u0081\u00B6\u00A6\u00E6D\u0095e@E\u00C9\u00E2X\\3\u00C1 %\u00AE3c\u00D8\u00F4\u00C4\u00A0\u00AA2pX\u00CD\u00CD\u0086\u00B2Y$\u00EAZ\f[T\x03d\u00B8\u00E0K\u00E5\u00D0\u0082\u00A8\u009C\x0BZ\u00BA>o\u009E\u00B0\\\u0084v\u00BB\u00D2OJ+;/p\u00A1\u0093\ri\x02o\u0084\u0094a\u00D2\u00A9\x1B\u00FBz\u00DDd\u00F8\u00B4\\\u0098$ \u00DDf)E\u0096\u00D1\x7FXxWyV\u00E4\u00C6\x0B\u00C2\u00B3D\x19\u009Di\x18\x19\u00C5\u0091\u008Cx\u0089*\u00840\u0098l-\r\u00D1\u00A4\u00CE\u00DE\x11C!D\u009F#*\"\u009D\u008C\u0082\u00B59-n3F\x11\u00BDxs3\u00B6\u00BE\u0091\u00B7!\x19JC\x12u=\u00B0=\u00BCyf\x7F\x1D\u00AFmS\u00FA2\u00EEC\tIB\x06)\u00BDIx\u008EkT\u00F8k\u00CFV\u0094\u00B4\x152\u00E8\x04\u00D9\t]a\u00C7\u00ED\u00BA\u0085iti~\x1B}\u0094zPRX\u00DF\u00CDV\u00BB\u00C1\u00DA\u0086\x18\x14\u00892\u0083\u00A3\u0092_\u00C7\u00C3\u00B9C51\f\u00EC\x0En\u00CDN7$\u0089+\u00D2\u009B\u00AB\u00ACz\u00B4\u00AAH\u0082\u00DA\u00C2E\x7F[~G\u00A8\x04&\u00B5\u00A9\u0098h\u00852\u008B\u00D8\x01\x05\u00CF\u00EA\u00BAD\bdB\"\u00BA\u00B346p\u00E3\u0098&ae\x14\u008DS\u00A4\u00D6y<&\u00D7\u0095y6\u009F\u009F\bVL`\u00A2\x16<\u009F{\u00A78Z\u00F4\u00D3\n>u\u008E\u00EC\x10\u0094\u0094\\\u00A8\u00DE$kAi=\u00E7\u00F5xy\x02f\u009E\u00A7\u0082\u00A8\u00F2(\u00A8\u00ED@\x19\u00B3]\x1F\fN<$\u00CF\u00F7\u00D6\x17Il\x00\u00C9\u00A8\x14c\u0080fsX\u00D4\u008D\u00D6_(\x00\u00C8\u008B\u00B1\b\u00BDt\x067\u00AB?\u0080\u00FA\u00AA9\u00AD\u00FE\x04\u00A1\u00CF\u00AAe\u00C0P\u0089\u00B2\x07\u00F8\x12\u00B3\u00B00\x1E\x04\u0093\u00AB@\u00ACv^\u00DA\x10\u00E25^\x7Fe\u00DB_\u00B5\u0087\x18\u00B8\u008F\u00E9\x0F`\u00B8\n\u0088\u00EF*\u0081\u00BE\"\u0080i\"\u00E0\u0093\u00E4\u00F7\u00FA\u00F4,(q:\u00AF\x1B\x16\u0097\u00CDTn\x13lq\u00DB\u00C6\f\u00BC3\x17\x0END\u00DDR|;C\u00A9\u00EF\u00DD\u009Eayn\u00FAw\r\u00B8\x1D\u00D3\u00B0\"\f\u00E5\x11\x02\u0083EXO\u009E\x0E\x03\u008A\x01\u009D\u00D1\u00C0\u00E0}*\u00EAR5\x04\x07\u0090\u00C7\u00F5\u00F0:Z\u0091\n\u0093\u00FB4x\u0086\u00D10OB\u0085\u00B9\u00E8\u0089p\u0087<\x06\u008CIc\u00EC\u0082\x18\x07\u0099\u0092\u00F5\x05\u00AC\u0085\u00C4\u00A1\u00A8\u0084Y\x1E\u00D2\"\x12%\u0088X\n\u00C2\x06AtH+\u00F8Z\u00A5W\u00EB\u0092\u00C6\u00B6|\x04\u00CCNHOi\u009B\x0B\u0096Ld1\u0080\x19\x1Cs%\bJ\u00CC4\u0094y\u00BF\u00D7@\u00A6'/\u00F7\u00D6\u0083\x0BE\u00AC\u00FA.b\u00B3\u00A6\u00DE\x00\u00DAt%!7\f\u00C9YZ\u00CA\u00B2\u00A1\u00D56\u00E2\u009Cx\x1F\u00BB\x1B\u00B2^C\u00AB\u0095X.E1N_\u00AE1\x18\u0094\u009D)\u00E6$1\x11\u00ED\x0B\u00BDx\u00A9\x06sf\u00FE\u0084\u00EB\u00BE\u009C\u00A7\u00F0\u00C0\x14\u00F3\u00D8_\x7F\u008C\u00FDw\u00AF^\u0081\u00F9\x13\u0088\u00A8C\x11\u00FC\u0080T\u0083a\u00FBj'\u00B0\u00C6$(\u0095a\u00BDv`\u00A0\r\u00E5.\u0088\u00F0|\u00D1\u00E7\x1B\u0083H\u00BBBG\x07\u00FA\x04\x16\u0084\u00A2\u00C5`\u00E5\u00BD0\u0093\u00C1\x12\u0089\x0En\u0087-\u00F3X\x0BB\u00EA\u00F9\n\u00C5Pz`T\u00FF\u00BD\b\u00BC\b^\u00E3\u00E3\u00B9\x0E\u0084aT\u00FD\u00DC2\u00A48\u00E2\u00F8k>\u00AC1\u00A5\u00F5\x1C}\u00E3\u00BD|5\x1A\x02\u008A\u00F2'Q\u00FB\u00A4\u00ED \u0096\\\u00C4\u00DC\x05\u00E3\u00AB:\t@\u00B7'\fhWjFCz\u00A9\x06\u008B\u00C4`\u0084`\u00FD\u008Ez^\u008Cjt\u009F\u00CDY \u00C2\u00D4\u009F\u00C6\"\u00AE[$\u00F1\u00A4\u00D8g\u00DB<\u00A4'w\u00FB\u009B\b\u00A3\u00FAd4\u00AC\u0095*\u0082$H1\u0087\u00B9\u0094!?Z\u009F\u0094\x03\u0080\u00B4'd$\u00A1\u00A2\x1Fy\u00BE\u00A9#\t\u00BFQL\u00C0CZg\u00A2\u0091\u00E6M\u00F7\u0091Q\u00CF\u00C1\u0098\x04\u00A4\u00E1\u00CF%\u00E53\u00DD\u00BAT\u009DDI\x19\u00FB1\u00A2\u00AD\u00E3(\x03\u00A8n \x14\u0093%\u00E4\u00C5L\x06\u00E0\x17\u009E\x1F\u00CCL\u00F75%y\u00B1\x7F\u00A3\x1B.i\u00D0\u00B4\u00CB\r\u00F6\u008B=\u00C2a\x0F\u0082\u0087\u009B$\u00F1\u0080\u00BC\x04k\u00E0\u00D0\u008E\x0E\u00E3k\u00FF\u00C5N\u00CC\x05\u0092\x01y\x0E\x1Aq)\u00A2\u00CE\u00BA\x0E\u00AFs\x1C+\u00C3 Ax\u009A\u00C3Je\u00F0\x1E\x06-\x02VnEh\u00CFKTbC\x05\u00F5\u00A9\u00DC\u0086\u008E\b\u00C6\u00D2\u009E\u00D6c\x10\u00E9\u00C6\u00C5\u00A2\u00F6\n\u00AEG\u00BD\u008E\u00DA\u00EA\u00CD\u00BAjs\u008Ai\u00E8o\x15N\u00D5}\u00CB0\u00B9\u00A1*\x1A\u0097$7\x14\u00A3\t\u00A3\\\u008D'\u00CA\u00C0\u00C7\u00DF\x17\u0088}X\u00CE\u00EC\u00EE#\u00B20\u00AD\x10G\x19@\u0081\u00B2\tt$P\u00C5<s\u00EC\u00F97\x17\u0099`3F\x0B\u00CA\u00D1\x02\u00AD\u00DF\u0093i\u00A0\u00AA7\u00F7\u00D0c\u00A7\x0B/\b\u00A8\x13\x0B\u00AA\u008D<f\u008B\u00E1\u00CC\u0093({\u009B\u00D6\u00FC\u00F1\u00A1&\u0088\x18\u0095\u00F8\u0093\bB:~\u0087\u00D3\x0B\x02A\x12\u00F7\u00DA\u00973\u00C3\u00A0\x17\u00E2T\x7F\u00A0\f\u00A7\u009A\x07\u00AA\x15\u00CD8X*\u0092\u00DA$\u0083\u00EC\u00A8g\u009E\u00FA4\u0085b\u008A\u00F9\u00D5\u00FC\u0083\u00FD\u00E6:\u00CE\x00%\u0090\u0099pL\b\x01\u00B2=\u00BA`\u009F\u00CAX\u00C3N\u00F8\u00AA]n\u0094C w\u00E3\n\u0081\x157P\x7FK\u00DAWA\u00D4\n\x15n\u00E7`\x00g\u00FBB\x12 \u0089\u00B8[\u00C1\x13\u00F2\u0091\u00D0\\y\r\u00ED\x1C\x11\u0093\u0088z\u00AA/\u00EB9kt\u00E3\x1B\u00A3\x15,\x0B\u009F\u00BD\u00B3\u009D\u00FE}\x1A\u00B2\u009A\u00814\u00CE\x0F\u00D5Cd\u00E6\u00E8h\u00A2#\u0095\"`\u00CF\u00BE5\x14\u00E0;\u0096\u0082\u00A3}n\u00BC\u0098^0\u00C9\u00F5zEN\u0086}\u00B0R\u008B\u00A6\x01\u00C3\u0099\u0086D\u00FB\u0087\u00B6\u0085\x1B\u008C\u00B0L\bl'b\u00D0k1\u00EC\r.\u00E03\u00C1\u00B3\u00AF\u00AEg7sQ\u00EAx,p\u00AC\u00ED\u00B3\u00CDe3\u00D5\u00B6\u00A0W\u00F8o0\x12\u00B7\u00A0\u00B57\u0086\x10L\u00CB\u00D7\u00EB:u\t6\u0083L\u0081\u00C7M\u00CF\x10b\x14\"\u00DD\u00AE\u00CB[#*1\t\u00F5U\u0081F@\u00D6V\u0090\x04\u00AFU\u00C4\u00F6W&\u00E7\u009C\u00AF*\u00ED\x1E(b\r|j\u00ED\u00B2?\u0099ZM&QQ\u0099\x14\x1E\u00ECS\u0096^\u00CF\u00FE\u008A9\u00D5\x031\x18ps\u00C1\u00EE\u00B8\x00\u00CEb\u00A7\u00A9\x16\u0094\u00C7\u00C0Z\x1ArL\u00F7~\"\x1E\x12\x07\u00FF\x1E\x103\u00E9D\u00A1v\u0081\u00DBR\u00BD\x13\u00BC\x18@\u008B\x12\x1Bb.h\u00F7)\u0089\u00BEz\x0F\u00A2\u00CD\u00AA(\u00DCT\x16\u00FE\u00BE0\x05\u0096m[\u0092\u00B1\u00BC\u00DA\u0089\u00B6hg\u00C0\u008EaLP\u009A\u00D6\u0098\u00A1\u00D5=Q\u00BB*\r\u0096\u008AO\u00B5\u00A91\u00C3\u00D4\u00E7\u009B\u009B\u00D2NsR*\u0084\u0088I\x06H2\x03\u00AA8\u0092*1\u00E6bH#\u00DB\u00D2\u00DA#\u00A2\u00CBHR\u00CD\tK|i\u00CDJ\u00FA\u00BAQ\u00CA\x19J\u009F\x15aI\u00BA\u00D1\u00FF>\x0F\u00C0\x0F\u00E6\u00F4\u00CB\u0088\u00E7\u00CB\"\u00CD\u00EF\u00DC\u00AF\x00\u00CE'6\u008F<W\u00D08K\u00C9&\u008C\u009E\u0081D\u00E0'\u00F7\u00A1\u00B7MU\u00D8\u00EF\u00C3\u0088<\u00A8\u0098\u00A3\u00FA\u00A1k\u00CA\"o\u00D5\u00B6\u00AA+\x1DF\u00D5\u0084\u00E3\u00CF\u00B1\x10\u008E\u00FB\u008C\u0080\x12\u00F7\u00E8\u00FB4hC\x141\u00BA\u00D1\u00D0\u00CB\u0098\x06\u009FG0\u0092y\u00B0M\x12\u00FA\u00BC@\u009B\u00AFV\u00F5\u00A6\u009A\u008Bs\u00B4\u00A1\u00B5\u00D8\u0089\u00AA\u00B3\x00\u00C8\u00C0kto\x0E=\x13\u00DEO6\x05\u00B9#=\r\u0090\u009A\u008B\u00B2\u00D1\u00EC1\u00B5W\u009C*\u00AA\f2,\u00B6x\u0082[\f@n;\u00DB\x1A\u0091U\u00E1\u0092U\u008D\u00E8\u00D6\u00FB3t\u00D6=\u00E46\u00E4\u00C3V\x1F\u009A\x11\u00B3\u00EC\x10w\u00BD[\u00DF\u00DA1_>\u00B1\u00DE\u00B338 \u00C7\u00B4\u00B6\u00D9\u0088\u009E\x10ZRZ\u00A1\u00B8\u00BA\u00B7\b\u00BBB\u0089;\u00F3\u00AA\u00F7\u00D9\x13R\b\n\u00ED\u009CB\x1F\x15\u00E2\u00DA\u00E6\"\u00D5#$\u00C3\x0En\x7F\u00F7\u00DCd\u009F\x18tu\u00B4\u00DF\u00B6\x06\x04\x16\u00E9\u00DA\u0099A\u00FEnPH\u00B2R}\u009D\u00AB'\u00A5?\ne\u0094\u00BB\fm#\x11\u0090N9&\u00EA\u00D3\u0096\u00CC\u00C3\u00E0MeX\u00AA&w}\x1D\u00E5A(C\x1C\x19\u00BF\x0B\u00B2{k\u00B7\u008FO\u00D0\u00B9\u0090Cm\u00F7&)\u00DA\u00FA+i\n\u00ACs\"i\u00DB\x11M\u008B\x17.\u0084\u0081\u00EAgJ\u00E8\r\u00E5Z\u00D4\u00F9\x1AKC4hm\u00A7\u00D1\u0091\u00F7q\u00CF\u00AB\x01\u00CE7\u00D6\u0082\u00ED\u00D5\u00D7\x1Ag=\u00ABz\u0099;\u00F6\u00F2&\x10\u00EAZ\u008B3\u00F0N\u00C0\u00D2\u00C9iSh6\u0080\u0095\u00D8\u008B8V\x03\u00DEh\u00BF\u00AD\u0086\u00C2(\u00FE\u00C0\u00EF=\u00F3q\u00F1\u0099\u00DF\u0086\u00DD+\u00D3i\u0086IC\u00B6}\u009B\u00F8\x1A\u00D3\u00D0\u00BD\x16\u00B8\x1B\bia\u0080\u0086\u00C6\x14\u0089\x1A:C\u00B0>\u00B6\u0090\u00D6JbN\u00C6`\x1D\t4\u00B5\u00C4:\u00E3\x00\u00AA\u00DEC\x11\u00B4[p\u00FE2\u00A06\u00F4chc\u00D4\u00B8\u00CFh\u00A7\x10\u009B\u0082\u0094\u0092q%\u00E1\x17iW\u009F<\x17J\u00FCNK\u00BC$\u00E0ls;\u00AFR\"{JAk\u00EE\u00B0\x18\u00AF\u0082~R=\u00C88\x04C\u00E8\u00C1\u00A3I\u00C7\tO\u00EF\u0092\x0E\x02i'\u0090;S)\u00C6\x1D\x0E{\u00FB\u008D\u00D22\u00E3\u00F6\x1BS0\u00CE\u0099{\u00B5+\tj\u00D9_\u00D6\u0093\u00CCpl\u009E3\x0F,AH\u0089\u008A\u0090\u00CC\u00A8\x18\x0E\u00C0\x1D\u0086O\u00CCc *@\u00A9oV\u00F7Y\bY\u00E7\x04\u00E37\u00DEn\u0099\x07^\x13)\u00E5\x03!\u00D4{\u00D4g\x13n\u00CB<i\u00ED8vw\u00C5\x12h\u0091U\u00A8\u00AF\u00A5\u00AA\u00D0\u00A5\u00AF\u00D4\x02!\u0082\u00BA\u00B6\x16{\u008F\u00D0[\u0099\u00C3\x1A\u00C5\u00C8c\u00860\u00C6,\u008CB\u00C4X\u008B\u00AEt\u00F1.\u0095O\u00CC\x05\x15\u00E5\u00D8\u008D\x7F8\u008D\u00A1\x18A\x11h$\u00ECt\u00E2\u00D6y1\u0092\u00C8h\x17\u00C4\x16r\"Wn\f\u00F2\u00B6G\u00A2\u00A2\x0E\u00B3O.oB\u008B\x1E\u00EC*\x06\u00D6h\u00C58\u00E5\u008C\u00BAb\u0087)\x03U\u0092\u00C5\x00I\x0FPcrg\u00C6\x1C\u00BC\u00C0\u00B2\u0084\x00\x18\u00B9\u00B6\u00FA\u00B8k\u00A1I\u0092\u008B\u00F9\u0088\u00A0#Ym\u00C2\u00EC@5\u00D6\x18m\n\u00DBH\u00B5\u00A2\u00F9\u009C\u00CF\u00A8\x11\u00B2\u0091Xl@n\u00C2|\u008Eb\n\u00D5X;\x1E\fhbFb\u0097\u00F8\x17\x06\u00EB\x16\u00C4\u00F8-#,\u00E3\u00FE%\u00B0jL\u0080lD\u00E9\u0093\u00E1X\u0088\u008A\\\x1E\u00A6\u00F8\u00DD\u00AD\u00DC\u0099i8t\x07\x18\u009B\u00E2\u00D9g>\u00F7I\u00E9\u009D\x15\u00A3f\u00CCa\"\u008B\x18gHp\u00AA1I\u0093\u00AA\x18=\u0081\u00A9m\u0083\u00F5,jz\u00CA\u009D|i\u00AA\u0092\u00CE\u00A5\x10rC\u00D6\x0172\x06\x18v\u00C3\u00D3p\u00BC\u0086\u00F2\u00D5\u008BH\u00EFH42Y\u00F6\u00CF\x04\u00A6\u00C9\u00EC\f\u00E4,\u0095\u0081\u00D5hhK\u00DB\u00D9\u00A6\u00A4Z+\u0096R\u008Cde(\u008B\u0094O\"9Cr\u00D4\u00B8\x14\x1F\u00B1\x18\fW\x02[s\x1Ft}\u00EB;\x1CU\u00C6M\u00C7\u0081u\u008C\u008D\u0090\u00DB\u00B1@\u0081M\u0092g\u0088\u00F5y>8\u00FF\u008B\u00AA\u00D6\u00C7X\u00FD^\r\u00B75\u008En\u00C8\\6\u00B4q\u00A5\u009DG;\u00C7\x04F\u00A3\u0087\u00DA\x01\b)\u00D5\u00D7\u00A4\x1EJq8*\u00E3\u00B0\u00E5\x0E$\u0081s\u00B1q\u00E1\u00BB_P6\u0088\u008E8\u008Cs\u00AAx\u0085K.\u00CE0\x18N\u00C4\u00EE\u00C9$R\x17c\u00D0b\u0096\u009D \u00CE\u008B>6\u00FB\x01\u00A3'=\tJ\u00D7n\u00F5\u00BB\x18\u009D\u0088\u00D4[\u00FB\x18\b\u00DB\u0081\u0098{C!b`\u00CE\u00FD,\u00F3\u00DE[\u00EB\u00CFl\u00ED\u00F5\u00ECM\u00D9I.\u00EC\u00D3V\u00EB\u00C0\u00F5tf\u00FE\u00BD0\x10\u00D5[H\u00E9?\u0090\u00B9HY_\x02\u0081\x10\u00CE\u00F3\u00A5k0\u00E1Y\u00B3\u00E2&\u00E6\u00D1\f\u00BB\u00F9\x13p{\u008C\u00C8](\"\u00A8\x14f-Z\u00E9\u00AC\u00DDfp&\u009A\nI^\u00A0q?\u00B7\u00BB\x13\u00B5\u0098E\u00FC\x0Bt\u00D7\x04\x01\u00E9\u00AAL\x03\u009A&n\u00CFI\x14\x1F\\\u00DC\u008A-7\x02\x19\x07\u00B0\u00A1x\u00A61\u00BAqE\x18\u00854jl\u00B91K\u00FE\u00C6\u00BE\u00B8\u0082BH\u0084\u00E7LJG\u008EC.AW\u00F2V\x1B\u008B\u00E7\u00F9\u00B4\x0Bd\x7F\u00DA+\x11\u008F^\u009DY\u00C4\u00F5\x13*\u00ED62\x0EA\u00F1\f\u0086\b\u0081\u008E\u0080,\u0086\x0ByT\u0082\x0E\u00C1S9\u00F6\x15\u00B02\x1A\u00A1Sh\u0098\u00C7b\u00B2\x03>[\u00A5\u00E1\u00D4\u00ED\u00D1\u00E6R\x12-qs|\u00FA\u008E\u0089\r\u00C3\x0E\u00C08\u00B3\x0E8v>\u008A\t\u008C\u0090\u00E21\u00C7A\u0094Q\u00D2\u00ED\u00C8\u00F1$\u00F15Cd>\u00CBD8!\u00AB]\f\u00C0\x0E\u00B8\u008A\u00C6\u009A%\u008A\u008859\u00AB\u00DF\"H\u00F5'%\u00BA\x18\u00CFF\u00E8\u00ADJ\u009AD\x15\u00D6\u00F7\u00FE>\u00C88\x1D*\x18\u00EBv\u00C4F\u00B9\u00A9rq\u00D2\u00FDB\x06G\u00D5,\x11\u00DFd7\u00CE\u008CH\u00EA\x16\u00E9t\x1C\u00A8\u00CAI\u009C\u00F7dH\u00D1\u008Fb\u00A2\u0091n\u00EE\u0089\u00D4.\u00F0}\u00C3>\u00FC-\u0098x5&\u009A\x0F\u00B2$J!\x04[\x18A\u00FD\u00DEc\u00F3o\u00FF~\u0092\u00D0:O\x12\u00C0z\u00FB\u008DI\x106.\u0081?\"\x1EB\u00B1\x18\f\u008A\u0090\x00\u00DCfT\u0092\u00BEg\u00E6e\u00F9\u00DB\u0099\x19h_e\u00EFR\u00D7\x10\u00D2\u009AR>\u00FAM\"\u00B0\u00B0$[O\u00AA\x02\u008A\u00DB7\u00A8\x1E\x0B\u009E\f\u00D1\u00BB\u00F1Q\u00F3R\u0084\u00AB\u00E7057h\u0086A\u0097qp\u009C$\u00FEj\u00D0T\u00F9\u0090\u00F2\x12\u00898L\u0086g\u00C0\u008D\u009F\x01\u00BBG\u00D2m\u00E8\u009CA_q\u009F\n\u00F6!JH.\u00ACE}\u00C0\u0099~-\t\u00CF\t\u00E3\u00B3\u0093t\u00F3x\u00B6)M/(\b/D\x00\u0082\u0089\"pK\u00E9\bd\u008CC\u00C2l\u00AD_y\x05\u00D8'!\u0097\u00A6n\u00B8\fo6I\u00E7b\u0090Z\x1B\u00ABj\x14\x0B@\u00C6\u00CB#\u009E\x7F\u00D6\u0085\u009C\u00C8\u00F8\x1C!\u0082\u00F6\u0092Z\x06\u00CCl-\u00C7\u0092\b\u00A4I}Ix\"\x15\u00B7\u00A6\x1A\u0098\u00A4;\u009F\u0089]\u00F8y \u00D3\f\u009C\u00CFhr\x1E\u008D\u00B9'\x14\x02\u00EA\u00A3\x00\u00DF\u00A2\u00E6\u00EF\u00D7\u00D8\u00DF=\u009F\u00C5\u00BF\u00D9_\u00E4$(W\x00(\u0088,\u00F8\u00D9\u00D0\x02\f&c\u00CF\u009D\u0085N\u0080\u00B2G4x\u009F\u008FD\u00AAC\u00AB\u00B8l\u00ED:\u00C3\u00C2hV5\u00A11\x1C\u008B\u00F3K\u0092\u00EB\u00DCv\u008D\u00EE\u0097\u00D2U\u00D7v\u00C4\"\u0086s\x1B\u009E/\u00E3q\u00A9\f[\u00B9\x11\u00B3\x1FE\u00A4\u0082\u00BF1w\u00C5XJ\u00BF\u008F\x07\x1ALA\u009F\u0080v|\u00CE\u00D4i\x17\u00E3;\u00ABa\u00BC\x1F\x06k,\x0E\u00DA\u00F9d\u00C8\u00EC\u00DF\u0089N@\u00C9\u00CF\u00AD\u00D8\u00C5\f\u00E0\u00F2\u00E8\x19\u00B4\x11\u00CB\u0096\x06C\u00DEILB\u00EA\u0084k>\u009C\u00CF\u00F0\x12\x12\x06@\u00AE4\x12\u00A0t\u00E8\u00B5\u009C\u009A$\x17\u0089/\u00E1{\u00F4:R\u0090\u00C5t\x1C\u00A52 \u00EE\u00B3\u0084\u00F6\x1E@\u00AFS\u00ED\u0092\u00B0\u00C6\u00CF=\u00A4\u00A0\u00E2\x07\x16Uc\u00C0-$\u00B1\u00A2'\x0BY\x18\u00F9\t\x05\u0094ww\u00A8\u00D6\u00D6\u0081\u00CEF\u0096\u00D2f\u0098|\u00AE\u00CC$\u00A6\u009B\x16\u0086e\x0F\u009BZ\u0093\u009CS1\x0E\u00F7Z\u009F2V\u00E2\x06\u00B5?x\u00F7Nh\x1E/\x10b\u00E8q0\x19\x0B1\u00D5\u00FF\x15\u00D5\u00C7<\x1D\u00B8\\=\u0089\u00FD-\u0097\u00A7\x1E\u00DDN\u00DE\x00\x00 \x00IDAT\u00F1\u00BB\u00BB\fL\u00B5\x11J\u00ED\u00B8\u00AC\x12\u00DF\u00AB\u00E4W}\u0083U\u00BA\u008E[\u00C7\u0096\x14hM&\u008D<\x0Bj\x00P\x04\u00D3\u00A5z\u00F5\x07\u00AD\x1D\x11\u00D0mD\u00D2uz\u00DD\x13y^\u00D5*\u00A0\u00AE\x7F\u0087\r\u00E2\u008Cp\x1C\u00C0AC\u00CC\u00E4#\u009BV*\x04\u00CBg\x06\u00E1\u00F2\u00BCE\u00F2C^\x07\u00E4xT|uRzn\u00A97\u00F7\u00F9C\u00F6\u00C5y\u00CF-\u008F\x15\n\u0098\x10\u00BB)\u00A4T\x1E\u0085x2\rNaN`\x10\x19d\u0099/\u0099\b<l\n\u00A9:\u00F4k'\u008A!\u00A4>k\u0094L\"\u00A4\u00C9\u00D3\u00A5\x1B\u00EBaI\u00AF\u00F6\u00D6\u00F7\u00F8{\u00A9]`\u0093\u00F5!b\u0081\u0097QO\u00C7b-\u00B8]\u00E0C#\x0F\u00E2\u00B4\u0083\x062\x11\u00B8\u00ED!ai$\u00B4\u00B4\u00BC\x1D\u00C0T\x7F\u00D0\u0088\u0098\x10\u00DC\x1C>\u008E\u00C83@\u0084\u009D\u00C3z\u0081\u00FD\u0099\u00E0#\u00B4\x0B\u00A3\u00BCi6\x020\u008E\u00C4\u00E5Z<\u00F2:]\u00EC\x12~\u00C3\u00E3^D\n\u00B1\u008E\u008Ed \u0081\x00\x0E\u00C0\u00E9\u00C9i\u00AE\u00D6\u00F0\u00D6\x1C\b;\x00i$\u00A8\u00BF\x18\u00B8\u0091\u00F1\u008DIM\u0081\u00E3\u00CD\x02\u00AF1\u00AEy\u00EF\x19\u00EC\u00D7v\u00EF0\u00EC[-\u00BC2\u00AA-F\u00C5\u0093\u00AAp\u00F7q\u00CEPOD\"\u00F2H\x04 \u00A2N\u00E9p&@\u00B5S\tI\u0096H\u0080\u00CB\u00DB5\u00E8\u008E\x04z\u00DF\u00F8\u00DB\x12dt\u008A\u009C\u00F4\u00DB\u00CC\u00E0.t 2;<vh\u008A\x1C>\u00E4\u00A2V\u00C4\u009F\x02\u0092\x02\u00F6#!\u00BE\u00F2\x0E\u00BC3\r\u008D\u00B3y'\u0082\u009E\x14\u00845R\u00AD\u00AA\x10k\u00A9\b\x1Di\u00E9\u00DFb@\x07F\u00DA\x10\u0084\u009CD\u00F8\"tAqkLAE\u0084\u008D\u00F41g\u009B\t\u00AD\u00F1\u0094\u009C\u0092Z$\u00EA\u009CoI5\u00B9\x1D\x19\u00B0\u00B4\u00B8\u00E6\u00AER\u00EA\u0097>n\u00EA\x14*\u00ED8\"h5\u00D7\u00850t/\u00F5g\x12\x1E\x13\u00C63mX^\x12\u00EBF5\x0F\u00C4\x12*X\u00D5\u009DR\u00AB]\x00\x14\u0092\u00A1\u00B0\u00B2=\u00DAm\x06\u00DAtK\u009E\u00FBF\u009D\u00BFl/D8\u0089z\u009A\u00D1\u00D1UR.\u0098\u0099LD\u00B2\x1D$\"\u00A0\u00D1/\u00D7h\u00A2\u00B3\u00A62\u00A5q\u00F4\u00E0:\u0092\x11Q\u00CF\u00A6\f\u0099I\u00A3i\x006\x1C\u00D7\u00F7\u008F\u00FDm\u00E3\u00FE\u00D7\u00CD\u00F6\u00B7\n\u00A2O\u00EC)a\u00CE\u0092>\r%-\u0087\u00A1\u00A4\u00FAI\u00B2\u00B1\u00BE\u0082+\u00966\t\u00B1!\x04=X\u00EB\u00B6\bU\\\u0092*\u00D1\t\u00B4\x19\x0BA\u0083\u00DEyS\u00D8\u009C\u009C\x13a\u00AB\u00CF\u00DE\x1F\u00A6E\u00F1\u00D0&Y\u00CF\x16{\u00F5\u00E3\u00B0\u00C9\u00EB\u00A92\u0088\u00E0\u008C\u00BBG\u00D9`\u00C1\u0093\u00D2\u00F5E\u00DC\u00F2\u00F9O\u0093{\u0090\x0B\u00DD\u00CB6\u00A0\u00B1U\u009D\bd\x1B\u0089\x10P\u00F5\x1A\u00A6\u00D3]i{\u00DE/\u00B2\x0E\u0082a\u008E6\u00BF\u00EE\u00E1M\x00\u0099\x02\u00BC\u0098\u0084+j\u0090\u00BE\u00F7aB\x10|4\x0E\u008C\u008C\u008C\x03\u00FBY\u00D1vK5\u00E0)\u009D\u00DC\u00A1\u00F8yo\x121\u00D6\u0085\u00D3\x1F/\u009B\u0080`>\tc\x16\u00B3\u00E9B&\u00B2\x1B=\x16s\u00EA\u00DE`?6\u00C0o\u0088j:\u0081\n\u00F6\u0084\u008A\u00E0\u00C9h\u00DA\u00DA\x13\u0094O\x042\x11\u00C8Dc\u00D5\u00B3!\u00D7\u00C4\u0085\u00CB\u008B\x0Ec\u00F7\u0088sp!\u0088#\u00EF\u0095\u00C8\u0085\u00AB+.\x14S\u00B8\u00D4\u00FD\u0098\u00C3a|\u00E6\u00F5)b\u00A7A\u00D7y\u00FF\u00B4?hN\u00B5\u0084\x1Bs6Gz>8V\u00938cL\u00CB\u00E4\u00D6\u00C4\u00C4\u0090\u00C0\u00FD{_\u00DF\u00AFa/O\u00C7[{|\u00FEm\x02+i\u00EAw\x11\u00DFI\u00C7\u0097q0 \u00D5\u00C6\x07\x06fF\u009E\u00DC\u0082\u00E9{o\u00EDf\u00C1\u00CC\x15\u00A9\x14\u0091i\u00D0gTq\x1B\x15\u00E8\u00BC\x1E<e\u00B0X\u00F9I\u008C\u00B85\u00DEU\u0082\x0F\u00DC \u00F6V\u00B8\u00B1`\u009A]]\x00\x1F\u00E0a\u00F2P\u00AFLAEP\u00E2A7\u00E3`{\u00A2\u0093s,\u00D5\u00C2\u00A9N\u008Cv\x0F\u00C0p\u00B18\x16\u0089J\x01\u009F\u0095\x04\u00EB\u0090-\u009D}\u0093\u0094\u00CF\u00C5&[\u0082\x07\u00C1\u00CB\u00FEFUH\x06\u00C5\x0B\u00E9w\u00F0zxEU\u0084p\u00B7\n\u008AIUAL\u00987rC\u00BA\u00BD2\u00848\u00CEq\u009B\u00D4\u00A9%\u00A1(=\x11\u008B\u00BA\u009E\tPu\x1D\u0095\u00B4\u00D6\"\u00FF\x00\u00A4\u00A5\u009D\x0B>\u00E3\x1B\u0092hX\x17\u00D3I\u00B4\u00DE\u00CA\u009D\u00A5\u00BD\u00A33\u0083b\x14\u00E9\u00E2K&\u00A3u\u00DDvJ\u00EA\u0082\u008A\x04I\u00B3-\u00A5:\u00D7\u0092\u00A9\x1D\u00A9%Z\u00F74n\u0082\u00D0\u00DFG\u00EB\u009F\u00DEZ\u009B\u00B2\u00BBL\u0084\x01\u00B7?U\u00F5Qs\u00A0\u00B1\r\x18.\u00E4\u00FEuO\u00F8\rF\x06\u0085\x05Z\u00BBl\u00F7_\u00DE_\u00C3\u0093_\x06\u00AE?P\u0092\u00AC\x11\u0099w\u0082\u00EAj@'\"\u0085\x17sj\u00F3\x1A>hS\u00C4\u00E1\u0099P%%\u00BA\u00F1O\u00EA\x06\u00D6~t&\u00B0\u00F4\u00A1\u00A9/KlA\u00FB-\u00FB\u00D1\b\u00DE\u00CE}\u00E9\u00E39\u00C7\x15\u00C42<|\u00CFi\u008E\u00E2\u00A8\u00A1.\u00B8\u008F\u00F6H\f\u00B7J\u0098\u00F9\u00A0\u00B4\x16\u009D\fLZ\u00A53\u00C1\b\u00C5(tLRbM+\u00AF\nK\u00B2\u00F9%\x12O\u00A6\u00B0G\x7F&p\u0099\x1C\u0085P\x01b\u008D\u008Eiw \x044\"\u00E3gg(\u0084\u00E0~\u00BAq\u00EEUH\u00C4\u00B5Z\u00F7\u00E99\u00C8\u0085\u00ED\u0094\u00C8\x07Ty\u00B9\x16\u00B2\x18\u0087\u00A4\u00DC\u00D1\u009E\u00A9\u008ESM\u00A1\x1A\u00E2i\u00C7\u00E8*CAe\u00F3~\u009D\f\u0097V\u009F\u00B2\u00A2j0\x0B\u0083j\u00C4\u00A8\u00BE\u00CF\u00F2\u00B0\x18&\u00D2\u00DB``_\x19\u00F3\u0090\u00A8\u00A3o\u008A\u00AB\u0095D\u00F4#\u00A3\u00B4;\u00C7\u00D2\u008C\u00A8\u008D\u00B0\u008B1\u00A9\u00EFV\u00E3\u00C9{L\u00D8\u0094\u00D7\u00E3\u0080\u00D3\u00F6bhh\u00AB#\u0092|\u00C6\u00CEg\u00B4\x018\u00B0\u008F\u00AB/\u00EF\u00CF\x1D\u00CF\u00BE\u0084k-b$A\u0084kO\u0092\u00F9.\u00DD\u00FA\u00C44`\t{\x04\u0095\u00CBp\x18\u0084\u00E9\u00CB\u00B5'i\f\x04sH$\x02t\u00C8v\u008B\x01\u00F4\u00F7\u0089\u00D9X\u008F\u00CA\u00F3\u00B1\u00DE\u00D3\u00B0\x10Xg\b\u00E3\x1C\u00F5\u00A8\u00E8C\u00DFh\x00Dn\u00A8\u00AA\u008DP\u0090S<\u00A0\u00AD\u00BC\u008B8\u00B38W\u008E%=\n\r\u00B5\u00F4c=\x0E\u00C1\u00AD3\u0083\u00EEv\u00C4\u0082\u00C2\n(\x0E\x1C\u00EE\u00B4bKN:\u00B6T\x11\f\u00F3@Z\u00B9\x0F\t1G\u00E6\x0E\u0089\\<\u00AFAJd\x03\u00DD\u0092\u00B31\u0088\u00B4\x17\x00KJq\u00C0\u00C3\u00B6\u0090I\u00C8$\u0088\u009C\u00B9<\x0F\x15m\u00A7\x05\u00EB\x06k\u00C4\u00E9\u00E9q\x10\x10\u009E\\\u00E8\u008C%@\u00B3\u00EF\u00B0\u00BF\u00D2\u00F1\u00B5\"B\"\u0087\x0F\u00DE\u009A\u00C4\u00F5|\u009A\x16\u00C6\u00C7\u008C\x13\u00E1\u00BArURB\u00F5=\u0091\x02\u00BDn\\\u00EB.\"%\u00B3*$\u00A8I\u00EE\u00F3\u00E6\u00C1\x14\x18\u009E^\u00ABFj\u0091T\x1C\u008E\u00D7d_:`\u00B8\u00D0\u0088\u00ED9'A\u00B3\u00B3\u00BE\u00AB\x1Ax\u00AAb\x07*\u00F6 tC\u0085D_\u00AE\u00AF_\u00DA\u00AFn\x1E\u00BC\u00E8\x0F\u009Ad\u00CC0\u00D7\u00AE\x1A\u009CR\u009F\x11\u00D0\x1B\u00BEU,Q\u00BA\u00C86J\u0095-\u00F4\u00FBn\b\u00C9\x7F\u008B\u00DB\u00AD\b\u00A1\x11\u008E\u00EE\u00D1\u008E\u00DF\u00A5\u00CA\u00DC\u008Az\u00ECD\u00E4\u00AD\u00AF\u00C9\u00A7\u00EFj\u00E7\u00AE7\u00E7\u0084D>\x01<\x060\u00AD,\u00FEQ\x12\u00BDvY\u00DA\u00B1a\u00D2\u0096\u00A09\x14$\x17*qF \u00A6G\x02\u008A7\u00A0\u009B\u00D0\u0094\u00C2\\\u00E5\u00D3\u00CBKA\u00C3\u00A1\u009E=\x1F\u00AD\x02i\u00E1\u00C0&\u00A2\x04m\x01\b\u00C2\u00DF(\u00D9e\n\x18\x0El\"b\tQ\u00A7\u00B1\u009BD,\u00CF\u00C3\u00C1\u00DF\u0086\x18\x04\u0080J8\x02\u00E9\u00DA\u0080\u00C6\x1C\n\r\b-\x00\u008Bz\u00B0d#\u008A0\u00B5\u0096t\u00AE\x0E\u0088\u00F17\u00BD9\u00D7P#\u0080\u00FCI\u00C2J\u00C4E+}\u00CC\x00*\u00BA\u00F0\u00EC\u00AAT\u00BBjC(eFP\u00CF\u0082\x1E\x1A\u00EA\u00F5\u00AD\u00AC\u00F5\x1C\u00D7r_\u00D7\u00BA\u00EE\u0091\u0092\u00ECKC'1\u00A2f\x07\u00D0\x10\x15\u00C0\u0094FC!\x06y\u00E0@\u00B4\u00A3\u00DF\u0091\u00CCW\u008C\u00CE\u00C7\b\x1B\x0F\x06r\x1F\f\x06@E\x0F6\u00F8\u00F6\u00C4\u008B\u00FB\x07\u00F6g~?R\u009C\u00F9\x10\u00D2g\u00DF\u00A5q'\x1E1\x0E\u00E35\u008D\u0098\x15\u00DA\u00ECa\u00B4P6^\u00A9\x07\u00FA\u00DEl\x0E\u00B6\x12\u00BD/\u00D7\u0094G\u00A0$\u00B6\u00CEGNtF56w\u00E2\u00A2B$\u00B3\u00AA\u00BET\u00FB\u008E\u00BB\u0099\x03%2%\u0084\u00C1\u00F0\u00C8\x1D7VL\x00\u00B0|\u00C4Q\u0081\u00BA\n\u00A4H\u008FW\t\u0095\u00A8\u00B1\u00D7\u00BC\x05yN\u00F3\x17\u00EBoC^\u00BFVP6-aLlY\u00A99%7%v\u00D8\t\"\x02^\u00C1E\u0092n\x13M\u00E2\u008B&[j\u00EC\x007{\u00C9\u00A7\u00E2i\u0080\u00D55\u0083\u00CC@9\u00FB\u0099\u00DF\x0Fkk\\\u008CA\u00CFI\u00CF\u008C\u00CF]\u009D\u00F2\x1B\x14,\x16\u00B3\x00J\u008D\u00B8\x0B\u00CA\u00AB\u00DD\u00A6\u00E3\u00E7w]\u00D3U\x11\u009D/\u00EB~\u00BDs\x13Z\u00A9\x1C\u0099\n,\u00F4\u00B2\u00BA\u0090\x13\u00B1\u00A0$7\u00D0}Ozi\u00DD\u00CA \u00DA\u00D5\x10\u00A0\u0082\u00B1\u00D2\u0090\u00C3\u00F9ij\x16,\u00CE3\u00CD\u00CBy.v\u00C0/0y\x1B\u00D2{\x13\u00F3\x1CZ\u00C1%\u00FB\u00EB\u0090%KQ\u00C1D\x0ED:\u00AF>\u00F3\u00CC\u00EF\u00EFo\x1Do\u00FB=;\u00EE\x01\u00FB\r\u00BA\u00AD\u00A0b\nDDEL\u00B91\u00AA\x1B\"vAS1\u00928\x0Ba\u00E8\u00D7Fhs0\x7F\x7F;\u00B5\u00DBU\x04\x12\u00A9:\u00DE\u00F5\u00FE\\`\u00F4\x1E\u009Cb\u00F5\x03\u00EA\u00D5\u00FD\x15\x1B\u00B0\x04?\u00F1\u00FCq\u00BE\u009F\x18\u0081\x16\u00B8U<\u00C6a\u00A5\u009D\x1D\x1E\u00B1\t{\u00DA\x11\x14\u00C9\u00B9%\u008C\u00B7\u00BC\u00F7\u0096\f$\u0090\u00C1\u00C6\u00CA\u00C9e#0\u00A2\x101\x14A\u00D6\u00BEE{\u00CD#\u00AD\u00D2\x19\u00F3 \u00A1a\u0090\u00A4\u00EF\u00C2\x07m\u009D\b\u009A\u00BB{,\x11\x0F\u008F\u008B\u00BC\x03a\u00EF\u008A67g\u008F\u00E9\u00B3\u00CE\u00B6\u00A6P\x02\x19\x11\u0089.\u00DC\u00F0Z\u00D8:\u009F\u009F\x07\u0090\u00A9\u00CE\b\u00B9d\u00CE\u0080\u00A1\u00B6\u00D7b\u00BDF\u00DD,\t\u00B0\u0090e\u00D4/\x10\u008A\u00E9\u0088\u00B3\u0090\u0087\u00DB\u00803\tHi\u00C1u\u009FK\u00AD%\u008E\u00B3\u008C\x7FL.b\u0096TT\u00AF:\u00E0\u0098\u00E4\u00A2\x1A[1\r\u00A3@\u008D0\u00E8\u0089\u00A8\nMF\u00C15l\u00A6:V\x13\u00DA\u00C0x\u00D8`\u00D7\u00C94l\x0B{\u0082]8O\u00D71Of\u0088pkn\u0098\u00CB\u0087\u0091\u00D0_\u0091\u0093\u008AC\u00B0#<C\u00B6sLV\u00AB\u00D2\x1CU\\76\x1Fr\\\u00B0\u00BD\u00ED\u00A9\u00DF\u00DB\u00BF\u00FD\u00FE{_x\u00E2\u00F1\x03\u00BC\u009AK\u00B8\u00A9\t\u00A9\x12T\u00F6b\x11\u00FEz\u00EEB\u00BC\x0B$\u00EF\\3\u00A2\x13C\u0098\x17Q\u00BFQ.ATG:!\u0094\u00C5^\x10\x7F/a\u00CF\u00A7w\u00A2\u0082S\u008A\u00F2z\u00AF\u00BE\b\u009B\u00FD\u00A3y7\f\u00C0\r\x06\x1Ec\u00C3\x05Q#cR\u00A5p7\x1C#\u008A\u0099N_4@T\u00ACB\u00F4\u00F3 \x132\u008B\u009A\u0083\u00DAXe\u0082\u00AEPp\x07'\u00C8\u00C3P\u00FDL\u009DX\u00B9\x11\x1E\x15q\u00B4.\u00E5.T\u009D\u008D\u008B\x03\u00BB#\u00AB\u009C\r\u00A1\u0082&\u00E1\u00C1:~\u00E3\u00E0\x1D\u00A8\x1A\x00\u00B41\u00A4\u0084\u008D\u00CF1\u00A3\u00ED\u00EE\u00A50\u00D1dJ9^C\u00DA\\\u00EB\x01\u00F0\u0099M1\u0099.\u00B5\u0081\u008AS\u00F0\u0092\u0092\u00D9\u00BET\u008B\u00A6[\u00DF\u00B2\u00C87\u00E2\u00F0\u00C95\u00C7\u00F5\u00D2\u0082\u009B\u00A2=qI\x14\u00B1hM\u00A5$\u0096Z#\u00E4\u00A1k.\u00C8\u00BD\u00B8Z\u00C0\u00D5\x12\u0086\u00AC\u00BE\x13\u00CE\x07\u00F3\u0092\x17\u0084B$m\r\x1A\u008B\u00C6\x15\u00EDZ\u00BA@\u0085\x12\u00B8\x1E;\u00D7\u00B7\u00AE\u00FE\u008C\u008A\u008F`\u00BF\u009C\u0088\u00C3\u0096\u0084+C\u0097\x1A\u0097ax\u00EA=\u00EF\x7Fa\x7F\x1F\u00BE\u00EDw\u009E\u00F5\u00A7\u00F1*^\u00BFE\u00F4\u00D2qW&\u00A0A\nz\u0090\u00D0,\u00A4\u00A9\u0088\u00D5\x16b\u0093NG)\u00B7\x18+\u00D1\u00E0XIF\u00F3\u00B6_d2\x1B=\u00D8\u0091\u00E7\u00B9m\u00B1\u00E1\x04\x1A\u00AC3k\u00E7\u00B5\u00FB\u008B\u00D1,6\u008B\u00C6\u00D4\x18Gp\u009B9IZ\x03\u008F)\u00D1\x0F>\u00AA\x1BD$\u00FBt\u00EE\u00DDh\u00B1\u00D1\u00AB\u00B6n\u008F}\x12\u00AA\x16B\u00EE\u00A1\u0080\u00F0V\u00C8\u00AD(\u00BB\u00C4\u00C1\u00FB\x1E\u009C7\u0095r\x17\u00969\u00E0\u00DCg!\u0088+\u0089\u0093\u00EFd\n$\u00A2\u00C3\u0081\u00CD\u009D\u0085sbQ\u0087!\u00D1\u00C3\u00AD\u0098UxCj\u008F\u0089\u00F4r\x04c\x18!\u00F4e\u0088\u009ChFJ\u0084\u0097\u0082k>\u00E8\u00AA\x13\u00F0\u0099\x19T;\u00B9\u0096\u00F4|\u00FC\u00B22\u0095\u0084\u00FB\u009D0\u00BB\u00FE\u00AC6$\u00F5\u008F:\x1FjG\u00D7v\u00C8\u00DDaw\u00CFI\u00A0\x14\u009DB&\u0092\u00EC\x1D\u00D2\u008Bi\u00CC\u0090\u00BC\u008DH\u00B3?i_`\x1E\u00C1\f}\u00DDR\u00E7\u00AF\x1C\u00880\u00B0^\x1A\u0093\u00E9\u00CC\u00AE\"K\x16\u00E9\u009EL\u00D2s\u00CD\u008A)\u00AE^\u008C\x1E\u0089\x19\u00F1\x06\u00DER\u00B9\u00CBs\x11\u00DF_\u00BF\u00DE\u00F0\u00CC\u00F7\x7F\u00FF\u00EF\u00EC\u00DF\u00EDW\u009F{\u00CE\u00DE\u00E6\u009F\u00C7\u0097\u00CCN\u0084\x13\u00D2WD\u00B2\u0086\x0E\u00DF\u0085\b\u00ECD@uLL\x03\u00D9~\u00A9\x07\u00C8\u00F3U\u009C\x05\u00BAg\u00DA)Z\u009B>\u0080q\"\u00EEqF\x05\u00EC\u00D7\u00A2\"4{DC'\u00A9\u00E6\u00C0V;Vcj\u00F2\x1A\x18\x19\u00C0\u008D\x1B\u00EE\u0091x\x0F\u00C4\u00CE\u00CF\u00831\b\u00E5k\x0FUBh\u00C1A\u0081\u00E8H\x15&\u0093\u0094,\x18\u008AQ\u00D5: i-\u00E6\u00A6\u00D8t0\x0F\u00A1\fz\u0087;\u00B6\\\u00B3\u0096h =j$z\u00B9\u00E9\u00B2|V\u00EA\u00FE\u00D1\u00A9\u0083\x06\u00C19-#\x7F\x01_\u0099MC\x06b6zml3\u00D1\u0082\u00D6\u00BD\u00DE@\x11\u00F2\u00B4\u008A~<t\\\u00F6\u00AA\u00B8\u0099\u00EA\x07\u00CA;\u00B2\x18\u00FF\u00FC@\x16N\u00C9E\x1D$\x14j\x14\u00B1!\u008B\u008Ff\u00B2\x15]*!\u0090.A \x19\x0E\f(\u00A6\u00A1\u008C\x7FB\x17\"`1\x0B\u00ADI\u00D1\u0084\u00A4/\u00EA\u00B7d.\u0092\u00C6JO\u0096\u00B4\u0096\u00FA$\x15qk\u00E7\"\u00DBKuqr\u00B51\u00932\x12\u00B38o\x1E\"\u00AAB\u009F\u00DBs\u0080W\u00BF\x01\u00AA\x1D\u00A2\u0083x\x00\x0E\u0083\u00BD\u00FDi\u00C7G?\u00FC\u00B9\u00FD\u00D91^\u00FD\u00E1\u0087\u00FF\u00C7\u008B\x06{wZ\u00F6\u0097\u00D0c\u0094\u00C7`\u00D1\u00E1Hp\u009A\u0098v~}?\u00878\u00EB\u00B7\u00DB\u009E\u0085z\u0097[Q\x06\u00BDx\u00F5\u0089\x13\u00DA8\x13w;o\u00B9\x7F\u00DD\u00A7\u00F4q\u00E3\"\x12\u00E3\u00A0\u009DA\u008CF\tF\u00A7>>\x06\u00F0:\f\u00F71p\x10\x05\u0084aMR~\u00B0\u00F4=U\x05\u00E5<\u00B8\u00BC\x04\u008C3\u00B0\u00B6\u009B3\u00DBQ\u00C9\x14\x00\u00A9JH\u00CD\u00D0k\u008A\u00F0\b\u00DF\u0093&$\u00C4\u00B8\x10f IHJ\u008FYR?a<\u0089\u00D1\x0E$c\u00B0Yl0\u00D7\u00BE\u00DA\x012\x11j\u00B0\u00AD\u0083\u00C7\u00D3\u00D8\u00B8TH\x02\u00D6\u008E\u00C7\u00FD\u00E2\u00FE\u00D6\x10\u00EBh\u009FM\x1A\u00EB\x128l\u0091\u00EC\u0082\u00C3\u00DD\u00D0\u00A6k\x1Ba&\u00D4\u0097\x14\u00A7\u0084\x16\x03\u00CA\u00F9\x1Ad\x1E4\u00BEI\u00E7\u0097\u00AD&\u008D\u0094\u0092\u00BE\r\u008E{\u00CB\x02\u009D\u00DDS1\u00B0\u00D8=|o\u00E3\u00D2\u00B5^\u008CA\u00EAH\u00F6U\u00A2\u00A4\x19/S]Rx6\u00DB\u00C8\u0089\u008A\u00F9\u00B1^/a\u00A1Y\u00A9&\u00BE\u00B4mp\u00DC{\u00F2\u0099\x17\u00ED\x03O\u00BD\u00BA\x03\u00C0\u0093\u00FE\u00E03\u00C0\u00FE\u00EE\u00AA/\u00D0uvC\x05\u00F5H\u0097m\u00A5\u00BC\u00A8\x0B\x17\u00F1\u00DC\u00A5\u00A7\x17\u00F2\u00E8\x16\u00F6\u0085\x11\u009C\u0083\u0087\x12\u0081\u0088@\u00CBh\u00B7\u00A8.K;w\u00C3\u00FD*w\x06\u00F4\u00E2\u00A8\u00F34\u00A6\u00BE\u00FDZ\u00E9y\u00C5\u00C5\x1D\x03\x17\x00\u008F\u00A0\u00C8\u00C5\u00B0\u00F4\x1FV\u00D1\u0081\u00B1\u00ED\u00FBP\u00AF\u00A1\u00E0\u00A2d\f\u00A6\u00DD\u0098\u00C2V\x10\x19\u00F3UeIp\u00DD\u00C4,\u00C0\u00D0hg0\u00AB\u00ECZ)\u00B1=\u0093\u0093\u00FA\x1Bn\x18s\u00F2\u00B1S\u00DEM\u00C31\x01;\u0082\u00C0\u00E6\u0094\"C\u00B67\r\u00F3p\u00C0,\u008Dp\u00CA\u008A\x17})U\u009A]\nd\u00E0\u0080O\u00C3\u00D1\u0098\u0081\u00D8\u00B3\u008B1\u00F1\u00FA\u00CE\u00B4\u00C4p\u0096\u00C8CHB\n\x0E\u008B\u00E8\u0081e\u00B3\x15\u00BD\u009B\x1B\u00B1\u00CEkR\x1F\u0088\u00B5\u00EA\u00CA\"\x14\x01v\u00DB\u0085\u00B8\u00A3\u00DA\u0094\rB\u008C\u00CA\u00EB\\\u00AD\u00AB\fzj*L2 \u00ED\u0092\u00E1\u0080_\u00C1z\u00DFx\u009DCi\u00C84\u0084v.\u00DA\u00ED\"BF\x0B\x13\u008C\u00B9P\x1B5\u00EE\x01\u00D8\rJ\u00BDo\x13\u009ELS\u00C7\x15P\x15(\u00E6\u00F1\u00BDg?\x03D\u00E2\x00\u00DE\u00E6\u00EF\u00FC-\u00F3\u00AB\u00FF0Cd\u00E5Ah\u00D23\u009E\\\u00AF\u008B\u00D0\u00B8\u00A8e`k\x12TO:\u00EA1\rk\u00AArSQ\u00EEHG\u00EE\u00E9\u00CA\u00E5%(\u00CF\u0084e;\u009D\u00C1(\u00B0\u00AA\b_\x0E\u00CFz\x15cZ34\u0089\u0088\u00B2=\u00DC\u00D9\u00A7G6p\u00E3\u0083\x06\u00C4 \u00E8\u00C3\u00C2\u0096p\u00806\x04>\u00E6\u0083\f \u00C3M<\u00A2\f\u00E5a\u0098\x1EhA\u00A6&\x19\x1DG_&'\u00EFA\u00B7\u00B9i\u008DM\x12a\u00DA\u00C0P\u00814N\x06Q\u0081F\u0096\u00C1E\u00DD\u00B8\u00A8\bF\u00E7q-\u00D1\f\x04Jf\x13m\x0F\x00\u0098\u0091\u00A9)\u00D4!\x17dn 2{\x1F\u00B40k\u00ED\u00C7\u00EF\u00BC\u00D9\u0082.\u0082p\u0087[X\u00EByN\x19\u00FBZ[\\\u009F\u0095\x1BA7\u00AF+\u009DZ\u00D7!t\u00FA\u0094\u00C6\x17(|+\u0089\u0099\u00CF_\u008CB\x15\u00A1J=\u0096\x0E\u00CF\u0088\u00C5\u00B4A\u0088V\u00C4\u00B1\x15)(D\u00A2\u00F3\u0080>\u00FE\u00A4\u00B5zp\u00CB\u00BA\u008E99\u008A\x1E\u0092\u00A1\u0095\u00D8P\u0088\u00B4\u00FB%b\fR\u00E7\x13s\x0Btc4>z\u00B8|8\u00CE`]7\u00CF\u00DC\u00FB-\u0080\f\u00E1;\u00E7;?\u00BDM\u00C3\u00DC|!\u00DE\u00D0\u00D7\u00B7\u009C\u00A8\u00D5#\u00D0\u00E3\x15z~\u0082-\u00C7o\x13l'4C\u00ED\x04e\u00ED>\u00D4\x053\u00F3\u00B23\u00A0\u0080\u00F6\u0096i\u009Et\u0083\u009E\x19L\x12\u00BB\u00DA\u0094\u00AAQ\u00F6\x02\u00F5S[\x7FW\t\x00\u00E3sk*Q\x1A\u008E\u0080G\x03x\u00DD\f\x0F\u00B0\u00E1\u00C6\"\u009B\u00E0\u00A0\n\u00B1\u00A11\u0083\u0094\u00F0\u00F1\x1EtgM(\u00E2@\u00F9\b\u00F4@44\u0096\u00E6+\x1A\t\x1DXlj\u00D3\u00C1\u00EC\u00C5\u0090\u00FA\u009E\u0092\f\u0099\u0093 \"\u00E8\u0086\u00C79\u00B5f\u00A9v\u00A0\u00CE\u009D\u00EE8<\\\u0089\u0083\u00F4\x19\f\u00C8\x0B\u00B9\u00CC\u0098\u009F\u00C1\u00FEH5\u0091w\u00C2i(I\x06\u00A0\u00CDX\u00D2 \u00BE2\u0084[\x04\u0082bH\u009A{m\u00BE\u00BA0\x00\x11rJz\x11qAi\u00C1{KI\u00DA\u00A5\u00BC>\u00BD\u00AD\u00BDhgIv\u00D2\u009AHBT8qC\x12\x1C\u0084\u0083kR\u0097\u0085o\u00B8\u00EE\u00D5=\x10\u00EA[2\x02\u0096i[<,\x13\u00BEx\x19\u00E2\u0098a\u00D6\u00FCr\f\u00F1\u00DF\u0080\u00C9H\u0099\u00E8b\u00AF\u00FB\u00BAvyo\u00F3\u00CE\u00CE\u008Eg\u009E\u00FD4@\u0086\u00F0\x1F=\u00F9\u0081O\u00FE\u00AF7\u00F7\u00F1x<B\u00AA\f\u00D6\u00D0\u0081\u0095\u00B4\u00CF\u00E4 \u00D4\u00E2\x15\x11e\u00D4aJv$d\x06\u00D6sW\x14\u00C1cM]Y\x19\u00C8\u00D6R\u0095\x01\x1B\u00CD\u009D\u00D8\x19\x14\u0099\u00C2\u00B8u\u00AFB\x1F\u00B3\u00A1\u008E5\u00FD\u00B9Im\x04\u00C20\u00A9\f9\u0083\u0080\u00A2\n\x1F\"\\\u0090W>p\x05\u00C7Aubs\u00C3f#5\u00BF\u00CDA\u00A2G\x04k%\u00BC\u008C{o\\\\\u00B1\u00D6=\x17Q\x12\u009F\u00D7\x1A\u00E9\u00DB\x13\x18\u00D7\u00CC\u00CC\u008E\u00AD#\u008E5\x15\u008B\u00DD\u00A7\u00D5\u00B9\u00B2\x1F\u00E82\u00D2HT\u00D5\u00B2(\u00A3\u00D6\u00DA\x01=\x14\u00C2Y\u00DDk \u00C4\u0090\u00F6\nh\f\u0084\u00C2D\t[g\x02\u00B3}vt\u00A0\u009BNp\x7F\u0087\u00FA\u00BB$\u00BC\x04\u008E\x17gL\u00A8\u008F *T\u00FF\ny\x04AL\u00D6h\u00A814\"\x17SH\u0095A\u00F7\u00E9u\t\u00F5\u00DCnP5 \u00AC\u00EE\u0093\u00D1\u008E\u0086\u00CA5\u00B8\u00E8\u0089\u00C4\u00BA2\u00E1ON\u0082_h{\u00D8\u00D6{\u00E78v\u00DC\u00AE\u00C4\x14\u00A82B\u00FDew\u00F0\u00D6\u00FFH\u00EFN\x1BC\u00DA=\x06\x1C\x17\u00A2\u00BET\u00EApc\x13\u00C7\u00F7}\u00D7'\u00F13d\b\u00EF\u00C03\u00BF\u00F9\x1D7\u00EF\u00C7\u00A7\u00F7\u00CFB\u00D5{\u0093\u008B%\u0091v\u0088]Du\u0097\u008D\u00C1s9\u00E9\u00A6g\u00DD\u00BE\u00C1\u00F0;U\u0084~^cP9\u00D9\u00FD\u00DC\u00BB\u00FAV\x13\u00A7\x18\nW\u00FB\x19\u00B8THe\n-,}U\u00BB^\x7F\x1B\u00B2\u00FD\u0087\u00EEx\b\u00E0\n\x03;\x0E\u00EE\u0095\x1D}r\u00A7aQ\x01Q\nU\u00E6xB\u00C8\t\t\u00B0\u0090\x06,\u00F4u\u00EA\u00AD}\u00CD\u00A7\u008B\u00AF3\x07.\x11\u00E5\x16\x00@\u00ED\x1C\u0084\"\u00E2N\u00C0\\d\u00B9\u00A1\u00C8A\u00A6\u00E1\u0096R\x1E\u00B3?\u00E1\u00F8\u00ED\u00F0\x16SI/D!\u0094b\n\u00EE\u00CE$)2X\x17r\b\u0082It\u00D0R\u00A9\u00B9&qr\u00F1\u00D4wO<\u00A2A\"P\u0080H\u008CD\r\u00CD\u009D\u0092x\u00BC\u008E#\u00D0\u0082y\u0095\u008AO\u00FBDN^\u00BBq\x164\u00E5D'z\u0090\u00E4\u00BEB&\x1E\u00A5\u00B7@\u00C8\x04\u00C8\u00BC\x01\u00F6\u0081\u00D6\u009F\u00EAS\u0089wT\u00AC\u00CBD\x16\u0083\u0091\n\u0092O\u0099\u00E8\x07\u00ED\u009D\u00AE\u00C3\"\u00EC\\\u00AB\u00F2\u00CA\u00A4-\u0084c\u00B4`p\u0096\u00DE\u0094(U\u00E7\u00CF<\u00C0\u00DB~\u00EC\u0087~\x13\u00FF\x0B\x19\u00C2\x07l\u00FB\u00C2\x7F\u00FC\u00E8\u00FF~\u00F1S6\u009E+X]\u009DM}\u00C5\u0094\x11)\"!|o\u00D2\u00F6\u0096\u008D`a0\u0094\u00E4Y\x0Fad\u00DBqE\u00E9\u00F6\u00D9\x0F2\u009CE\u00A7\u00CF\u00F6\u00D7D\u00A7\u00F2 \u00D4\u00C3Mf\u00C0v\u00D4\u00CF\u00C8\x06\u0095\u00E5c\x14?pF?vx\u00DA\u00CA\u0094\u00C9xz\u00B1@\t\u00F7a\u00B8\u00F1\u0081\u00C7\x00\u0086\u00E7\u00EE\u008F\u00D0>\f7\u00ECS\u0094 \u00A7\u00A11\x13\u0093b'\u00E92>\x16\u00D1\x06\u00D4\u00F7\u00ACc\u00A0\u009D\u00A2S\u00A0\u00BA\u00B6fkk\u0086k\u00ED\u00A0\u009A\u00A1\u009A\u009AZ\u0087\u00C9<x\u00A2)\u00EBq\u00D6\u00B9\u00AA$\x16\u00EAD\u00F4I\u00B1\f\u008Ep[N\u008B\u00DF\u008F\u0089B\r\u00B3\b>J\u00A2\u00F3)\u0092QT@\u00945B\u00D5X\u00AD\u00EC\x16\u00CB\x1E\u008B\x1C\u00BB\u00C60\u0089\x14\u00B8\u00D3r\u008D\u00CF\u00B1\x06(\u00A1\x11\x0F\u009Fa&Tu\x1D\u00BC\u00C1x\x07!\u00B7\u0084@\u00B4\u00A5\f\u00CE\u00B0E\u00CCbP\u00BAG\u0086]k\u00ECr\u00FF\u0089\u00F0\u00F7\u00EC\u0097\u00A5\u008A \u0098$\u009Ap0\u00C2\x04f\x17z\x0ED\u00C4m]\u00B4\u00B5\u00BE\u00BC\x1C\u00A8\u00BD34~]\u00A1\u00B9\u00E6\u00DF\u0099y{pz\x1C\u0097\u00E7\u00DE\u00F6\u00A2\u00FD\u00E0\u00BB\u00BE\x00\u0090!\x00\u00C0[\u008E\u00A7\u00FE\x19\x1C?\x12\u00C4z\u00CA(4\u0085\u00C6D\x03=y\u00C8F\u00C5\x1AT\x1E\x02\u0089\u00D3\u00B5\u00F8)m[\u00F4\u00DF\u0082\f\u00B2\u00EB\u00ABZb\u0094\u00EAk\u0080\u00D4\u008AHFg K{\n'\u00E6\u00FDN\x1E\u0084\u00F4\"\u00901 \u00ED\x12\u00A3\x18x2.\u00E4\u00B8\u0090\u00E3\x1A\u00F8\x06\u0080\u00FB\x00\u00AEh\x14\u00BC\u00B1\u0081\u00DD\u00A3'\x1B\u0098\u0080jat\u009BpL\u0097\x0B\u0091nJ\u00B3&\x17\u00BCT\u0082\u00C6\x1AK\u00A8\u009C\u00A2\x12i\u00F0R4\u00A1\u00898I\u00DC\u0092\u00E0\u00A0\x17B%\u00D3\u00CAR\x191\x07\x00Je\u00F0\u0088n\u00DCH\u009C\\^\u008C\u00A0\u0094j\u00C0\u00CC\u00BC\u0086\n\u00DC\u00A3\x0E\u00E3\u0080\u00A5\u00BD\u00C3y\u00FF\u00890\u00A4f\u00F1V\u008E.\x11\u0081\u0090\u00BF\x16\u00F6lK\u00B8\u008D\u00DB\u008EB6\u00EB\u00F3n\u0093\u0084\x01\u00CCk6\u00AA\u0098\u00FE\u0093\u00C4o\u00E1\u00C6\u00D1\u0087\u00EE~l\x1DZB\u00A6;\u00A1q\u0080\"\u00F4d}\u008A \x04\u00D2;\u00A1~\u00E4}*V\u00A0{A\u00D2\x16\u0092\f\u00E2R\u00E3\u00C9\u00F6\u00B6\u00B5_\u00E9\u00A2T\x1F\u00B5P\u0080\u00F2\u00B2\u0088\u00F9\u0089\u00C9\t5\x1C\x00\u00A3\u0080\u00DD.\x18O\u00DC\u00FFg\u00EAI2\u0084\x0F\u00D8;\u00FF)\u00FC\u0089\x1F\x01<c\u00D9\x0B\u008A+0\u00E4\u0094\u00C7\u0090l\u00A2\u0095\x05\u00E3#\u00AF2\u00EE+\u00AC\u00EF\u00B5\x13\u00E2o\x11,\u00EF\u00D7\u008A\u00B7\u00BA\u00D4\u0084\x16\u0099\u00B8\"\u0083\u00B3\u008A\u00A0>K%9\u00AB<\u00FA\u00DD\x1B\u0093i\u00EA\x0BP\x0BU\u00FD[\x18M\u00FD-\x17\u00E4+nx\x02\x03\u008F\x11Pzo\u00E1]Y\x18\u0085\x06V\u00A5\u00D2z\"\u00AA\u00E8S_\u00F8\x11X\x14=\u008B-\x07-U\x00\u00BD\u00E1h\x01C\x1EL\u0081D\u00E73\u00A4\u00F9\u0090\u008B\u0091\u00D27\u00A4\u00BFC1\f\u00EE\u0091\u008F\u0091u\x10BH\u00E1\u00D2\u00DA\u008F$\u00A7r\u0083&AK\u00BD`;)\u00AD\u00D5gt4\u0092\u0082\b\u00B2\u00DAo\u00F4r\u00A0\u00D3\x04\u00C7R\u008C\u00C2\u0093a \u00CB\u00C3[ \u0088Ts\u00880s\u009F\u00C3T\u00A4\u00C2\u009B\u00C0D\u00A5\u00A8\u009F\u00D0`F\x0E\x18$\x1C\u00D9\x03\x1C\x151Y\u00CC\u00DF\\\u009CZD\u0086F\u00D4'\x06\u0092\u00D1gg\u00E6\u00B3J\u00EA\\\x07\u00A9z\u00B4k2UY\u0084\u00DF\u00DAj\u00C6\u00C1X\u00BB=\u00A1K\x13&f\b\x1E\x13\ni\u00B4\u0091\u008Cd\u00E0\u0095\u00E7\u009E\u00FE\u00A7z\f\u00C9\x10\u00BE\u00FF\u00DE\u009F\u00FE\u00B5'\x1F\u00FD\"^\u00BB\u00F7\b\u009D\u00D0\u008B\u00FB!\u00A1\u00AE\u00A1\x13h/\x03\x06,\u00C4z\u00B2-\u00DC\u0082<\u008A\u00CE\x13\u008C\x17\u00B19\u0090Qg@#jMB\x1C\x1B\u00D96\u00D6\u00B6=\u0098\u0089'\u00A7\u0096\u00CD\u00A0\u00A3\x07\u00DDCVlF\u00EE\x199\u00BE\n\u00BB\u00C8\u00D8\u00E3\x00\u0088\u0086BPD\u00DF\x1E\u009A\u00E1U\u0084\u00FD\u00E0\u00CA\u00C3\u00D2;\x19y\u00B8A5\f*\bIy\n\u0086\u00B2\u00E6\u00870\u00A1\u00B4\u00D6:\u00A5\u00D5_H \u0098BA|\x07R\u00FF\u0097\u00B4\x06%\u00BB\"\x01\u00A3b\u0092W`\u00D2$\x13\u00A0%}6bN\u0095\u00D9\u00CB\u00FD\x18\u00A8\t\x19\u00B5(\x04\u00A2\u00E5\bGl\u00DE\n\u00D1d\x10\u00BAT\x1B\u00A5_\u0097A3\u00C6\u009Cq\x13<oU9$\u00E5x\u00FF\\\u00D8m|I\u00CC\ri\u00E4w1\u00D9 \"\u00CFMV\u009A\u00AA\u00C0|n[,\u00FB\u00FA\fx\u00E53\x18\u00CE\u00B2n\u0092Q\u00E8S\tR\u00B3\u00FA\u0098\u009D\x173\u0090Z\\\u00CF\u00AA\u00CC\u00B6\u00DAcq\u00B2?RA\u00F4\u00BB\u00D6\u00FC\u00C15\u00D1\u00A2\f5\u00D6Y\x04n\x19\u00D6\u00CC\u00F5\u0094\u00EA\u0088\u00A1\u00B2(c\u00E2\u009D\u008B\u00EDf8\u009E|\u00FE\u00BD\u00BF\u00C6\x1B\x16C\u00F8\u0088\u00BD\u00E5W?8\u00DE\u00E5\u009F\u00B0\x17\u00AC\u0092\u0099Dl\u00E5ehql(\u0086p&v]\u00BB\u00DA \x12\u00B2K:\u00B7\u00DA\u008C\u008B\u00AB\u0092ha\u00CD|l\f\u00C1\u00CE\x06\u00C4Vl\u00846\n[\u0098\u0080P\f h'\u00A4\x11\u0084\u00C0\u0087\x10YWXb\"\f\u00EDo2\u00C5\u00B6H.\x18\u00F8:\u0080k\f\\Y\x18\x19eS\u00B1Y\u00FDH\u0094\u00C5o\x1B\u0098\u00AA\u00EC\x01\u00B5'J\u00D8\f1E\u00E5\x19\u00A0\b\u00B6\u00DB\u00A4\u0084(\f\u0096\u00B1\b\u0092\u00DC\x17\x0Fc\u00DE\u00F0b\x0E! \u009D\u00E7[&*eD#\u0085\u00E0D\u0085%\x1B\x17\u00F0>\u0085\x1A,\u009F<fx\x10\u0084\x00D\u00EC\\kdZ\u00B9\x06oy(R5\u00E9j\u00B5\u00D4\u00FE4@\u00B6\u00DF\u0092\u00F0\u00C5\u00E8\u00FB\u00B1\u00F8\u00D4\u00E6\u00A9\u00C6uQ\u00D2\x7FV\u00870\x11!\u00CB\x1B-\u00FC\u0095_\x00\u00BF\u00C6\u00A2.t}&p[\u00DD;\x13\u009B\u00B8\u00862h\u00A8\u00A1\x01G\u00B5\u00DF\u0098VV\u008D\u00EA\x12\u00BC\u0095\u0083\u00CB\x01\u00A7\u0084\u00E0\x18\u00D6\u0081c\u008D\u009C\u00A4\x1A\x012\u00AB\u00DEN\u00D2a\u00ACu#3{\u00FC\u00F6k\x7F\u00FA\u00C7\u00FF\u00F2\u00AF\u00E2\x7F\u008FV\u0093!\u00BC\u00CF\u00ECK?\u00F6\u00FA\u00DF\u00FF\u00CC'\u00F0\u00E2\x07ej+H\u00CD`\u009F;\tL\u00D3\u00AF:\t\"^\u00C5y\u00EBw\u00BEO^\u008B\u0085q\u00E4\u00EF\u00FD}\x0E\u008B\u0096\u00DD\x00K\x1BI\u00E4\u00B9+\u00D2\u00AA\u009A\u0094\u00FF\u00B5\u00A3\x15qo\u00E3\u00FFb\x16=\x1A\u0092D\u00BC\u00A8Qu\u00DF\t\u00C3C\x07^\u00B7\r\u00D7pl\x1E\u00EE\u00A0a\u00A1>l\x1E6\x02\u00DE\"\u00D9B\x1A-\u00D3&\u0090\b\u00B7\u00D4\u0082F\u00E4\"0\u00C5\x14\u00A4t\u00A7Tw\x0F\x02\u00DFR\x1A\u00C7=\u00BA\u00EBR\u00A877Q:\x1AA\u00F2S\u00C6\u00BF\u00AA\x1F\u00C4>\u008B05\x16\u00E7\u00BD:\"H)Y}\u00D6\u00BDG\u00BB\x0F\u009C*\u00D5\\\u008F\u00F5\u009D\u0098\u00D3\u008E#U\u00A71\u00C1\u00BE\u00A3t\x11\x14\u008A\u00B97\u00D5\u00C3\x16b\x01\u0096*\u00C4\u00A9\x16\u00E8\x1C\u00BD%}\x19\u00AE\u009F\u00FAz\u00D3\u00FDS\u009A\u00AB\u00B8js\u00EF\u00E1\u0092\u00F7\u00EF\x10]\u00F5!Cu\u00DB`\u00CE\u00CDl\u00BB\x0BuQA4\x0E\x11\u00B9\u0090\u0081~\x13\u00C7\u00F4\u00EC\u00C3:6\u00A9\x1B\u00CD~!\u00E6#Zy\u00FB[?c\x1Fy\u00CB\u0097D)\u00C9\x10\x00\u00E0\u00BD\u00FE\u00F6_2\u00B7\x0F\u008Ah3\u008A\u00CFD\b@\u00A1\x07 \u00FD\u00F4\u00A0\u00CF\u0099\x06\u00C9\u0099\u0093`yM\u00955\x0B\u00FEtk\x0F\u0087[\x05L\u008A \u0097\u00D0\u00E3\x055D{\u00B3\u009D\u0087\u0093j\u00D0c\x0B:\u00C3pI\u0096\u00AC\x16\u00B2\u0096+\x13*\u00E8\u00C6\u00C7\u008A\u0094\u00F4\u00E5\u00FE\u0087\x01\u00AF\u00B8\u00E3\u00DA\f\u00BB\x19v\x0F\u00C6p\x03$:\x00h\u00AD\u00EFk\x7Fz\u00956s\x12\u00E2\u008C~\u00DA\x01\u00AA\f\"\x18K\u00AF\u00C2\u00A1.O\u00A1\u00DFF\u00B0d\x12\x10s\u00F0 \u00A8\u0083D\u0099\x16}\u009E\u00DFK\u00B0\u00FBD\u00C4\x00\u00E8\u00E5\u00C0\u00B0\u00C6\u0090<l\u00E1rM\u00CEYL+\u0097dcf@yBrW\u00B1\u00C6\u00D8\u00D4\u00D7286\x15A\u00CC\"\u009F\x1BNo1\u00D4\u00FA-\u00E3+d\u00A3\u00E8\u00E7\u0083*\u00E1\u00E4:q\x12:\u00AA\u00AD\u008A\u00AF\u00D9B\u0082J\u00D7q\x0B5,\u0083\u00DB\u00C44\u00E4.\u00D4+\b\u00CE'\u00C5\x0F\u00ED\x01\f\\\u0084\b\u00D1\u00DD\u0083V\u00BC%9e\x0E\u00C3\u0085\u00B5\x15\u00A4\u00E7\u008Bx\u00D5H#\u00F4\u009C\u00F5\u0081^\u00DD\u00A9\x06m\u00C5h$\u009CY/\u00CF\u00E0p\x03.\u00CF=\u00F5K\u00F8T=\u00F2\u0085!|\u009F}\u00C7/\u00DE\u00BB\u00F9\u0095\u00FF\u00E1\u00D1\u0095\u00A3\u0082\u0091\u00F8@nA\u00EE\u0095p\u009D\u00C5V\u00ED\u00D6o\u00ED\u00A1v\u0082KH\u00DE8_2\u009E&\u0099\u00FB\u00F9\u00F9\u00E2\u00C4*A\u00A5\u00D5:\x18\u00D4!\u00D7\u00ED\u00CD8\u00C1\u0089\"z\u00BF\u00C6r}\u00D9(\u00AA\u00DF\u00B1\u009EVd\u0091\u00F5\x13\u00B9j_7\u00E05\x18\u00EEa`\u0087\u00A5;\x11*)\u0097\u00FD\x103X\u00AD\u00EF!\u00C1\u00ED\x14{\x10v\u0084\u0084\u00E3(\u00E8\u009F\u00926\x19\u0081S\u0087\u00AFLHy\x16\x04\u00E5\u00C3\u00F2\u00EFI0\u009D(\u0085\x0Ez^\u00C1\u0092F\r \u00CAzX\u00D9\u00BF\u00BCl\u00EC\u00AA\u00C3\x004\x1E\u008B\"\u00F8\u00AE\u00CEt\u00C4\u00D0]\u00E4\u0098\x1E\u00DC\u00B5\u00F5\u00A1\u008F\u00D5[\x1B\u0089\x0E\u00A4\u0097\u00CF:&\x06\\\u008C\u0083\t{\x0E\u00944\u00E6\x059wh\u0086G\u00E7\u00F9#\u00CE\u00CB\u00F5\u00A2\u008E4\"\u00CE\u00AD\u00E8[\u00DB\u008B\u00D1\u008E\x1C\u00D0\x07\u00A0\u008D\\\x12>\x01\x05\u00BB\u00B8\u00BEr\\\u00FCM\u00ED\u00E6\u00EF\u00CD\u00CE\u0090\u00A8\u00C2\u00EA\x1Egd\u00A1\u00F3'\u00DA\u0084\u0087 \x7F\u00BC\x01\u00F6\u00FEw\u00FFb#\u0086\u0095!|\u00F4\u00FE\u00BB~\u00E1}\u00AF\u00BF\x03\u00BF}\u00F5\u00E5vt\u0095\u00C6\u009E\u00C7:\u00DC\x1F\u00C8-\u00C7\u00FC\u00FC;\u00FFn\u00C4\x1F>\u00DD \u00CC,n\u0092\u00CC\u00E0\u008D\x18\u00C2\u008A\x1ATqF\u00D7\u00A4m\u00C3\n\u00AA\u00A9\n\u00D1r\u00AD\u00B7<\u0085\u00B4\x17l\u00B7\u00EE\x1B\u0083\x1D\u008D\x19l\u00CB\u00FD\u00FB\u00F6\u00EF\u00B1L\f\u00DFp\u00E0\x1Evlp\u00EC\x18\u00D8<\u0082\u008D.\x1E\u00E5\u00CC\u00A4\x16\x04\u0093\u008E\u00E4\"-M\u00D5\x18H\x15\x01Z\u00ABA\u00D4\x07\x17\u00D0\u00D1\u00A4\u00A2\b9\u00D2\u009A\u00D9e\x14\u0081\u00E4\u008ELd\x00Z\u0087C\u00D2\u00B7\u00A1\n\x1D\u00D3\u0086\u00AFB$\u00C3%\u0093\u00C2\u00FBdIG\u00B1\u008F\u00C2\u0086-=\x1E:\u00B7\u00EE\u00CB>u\u00D5g\x16\"\u00A8\u00BC\b>=\x07\"\u008B\u008F\ts\x0B\u00E1\u00AB\u00CF'\u00A2!1;\x12_\u00AC\u00AF<O\u00CFT\u008C\u00E1\u00A8\u00CF)\u0089?Q;:\u00B5\u00CE\u00FB\u00A5\u00D94\u00F8w\x12\u00B4\u0088\x10+\u00A3\x01\u00EF\u0099\u00F0\u009D\u008Cb\nRq2\u00BA1S\b\u00C3\u00B5\x07EW\x11f1\"\u00B9%\u0093qh\u00CD{1\u00B1T\u00EB/\u00A8jQU\x0F\u00C1|\u00E0\u00F2\u00F4\u008Eg\u00FF\u00AB\x1F\u00FC\x05\u00FC\u009F5]\x0BC\u00F8n\u00BB~\u00E1G\x1E\u00FE\u00F4g\u00FE%^~\u00BE\u00D7\x02\u00C0\u00F2\x1Dy\u00B3\u0090\u00EA\u008D\u0098\u0092\u00936I\u00DC\u00F6?\u00E8j\u0082\u00BC\x0B\u0095r\u00DC\x19\f\u009A\u009A\u00D0\u00B9\u00F3\u0086\u00D9\u00C3\u009D\u00A5\u00A64\u0086\u00E1\u00E9\u00D6T@\u0087\f\u008E\u00C0Rm)\u0099A\u00BF?\u00ED \u00C9TP\b\u00A6\u00A3\u0083\u00A5_\x15\u00DCt\u00B1\u0081\u00AF\u00C33\x16\u00C1\f,f\u00CA\x18\x03\x00GZ\u00DA-\u0098\x02\u00AF\u00EF\u00D0^~\u00FF1[P\x10\u00AF\x1F\u00D3\x1B\u0081\u0095\x0BQQ\u0081Z\u0093\u00DDX\x18\u00C2\u00C4)\u0095-\u00897\u0089qz\"\u008F\u00E1\u0096\u00CCE\u00C2-\x10\u0080\u0095\u0080rP\u00ED\x1A\u008B\u00E4\u00EFu\x1A\u00A09\u00C8\u00BFcN7\u00ADc/\u0084\u00B2%\u00BA\u0089\u00B5\u00B5\u00A0\u0080\u00E6r\u00ACc\u00D5\u00DEtz\x04H\u00A0v\u00CB\x18\x19\u0081tB+\u0091\u00F4E\u00CC\u00E6\u00DA\u00EBA\u0091\u0084\u0094\u00BC\u00F3dO\u00A0\u00A2\u0097\tV\x18pS\u00A1\x19I`\u00C6Kx\u00EC\u00BF\u00AD\n\u00CA\u009AD\u00F3\u0083\u0091\u0092\u00E5F\u008C\u00BC\u00A8\u009Dm4\u00FA\u00E9\u008C\x105VU\u00D3\u008Cc\u00EA\x1F\u00DAuz\u00F8\u00FA\u00EE\u0088\u00BD-\u0095\u00D8\u00C4\u00B9\u0085a\u009A\x03\u00DF\u00FE\u00F6\u00CF\u00D8\u008F\u00BC\u00FF\x05\u00B4\u00D7\u00C2\x10\x00\u00E0{\u00E6;~\u00F6gl</\u00E2\u008C.u\u00B8>8\u0091\u009D\x10[\u00A7:\u00F1t(\u009E\u00E9\u00CD\u00BD\u00AD\u008E\"\u00B6\u00D3\u00F1\u00DB\u00EF\u00DB\u009B\u00C4\u00C4\u00F7\u00E1\u0083s\u00C6\u00A4%\u00FD\u00A6\u00CC/-\u00A6\x1E1\u0099{ET?\u00D3^\u0080vn2\u0081\r\u0089.\u00AC\u0098\u00CD:f\u00C7C\x18\u00BEj\x03\u00FB\x04\u00EE9\x0B\u00A5R\u008A\u00B1FN\x12\u00F4\u00A4J\u00A0\u00C8>\u00C0\u00D2((&!\u00D5\u00C2\u0088\u00DD\u008F\x19.\u00D2M\u00FA\u00BF\x0Bq`\u00B1!dfb'tIq\u00AE\u00A5(\u0092\u00EA\u00CC\x1Dp8\u0089o\u00CCbJ{5Q\x11\u008D a\u00B1\u008Fi\u008Bh\u00FD\u00D7\u00A2\u00B6\u00F6]R\u00DE\t\u00D5\x1Dq\u009F\u0091q5\u0085|\u00DC\x11a\u00FAn,\x04\u0082$t\u009F\u0091\u00BE\u00ED\u00D2\u00ED3\x14:\u00A4q\x06Z\u00E5\u00B9\u0096L\u00B1\u0092\u00AB(\u00A4\u00BA\u0084NC]\t\u0084 rI\u00EA\u00BBb\x06&m#\u009D@\u00DBy\u00B7tz\u00D4y\u00ECo\u00ACC]\u0083Z\u00AF\u00F9\u00BD\u00DFW*\u00C2D\u00EE\u00A9\u00B0\u00C4\"\u00F4s\r\u00E6\x17T\u00887\u00F2\x1E\u00E6\x1B\u008Eo{\u00FAgqz\u008D\u00F3\u0081\u00FF\u00E0\u00FEw\u00FD\u00C3g\x1F\u00DD\u00C7\u0098w\u00D4QDd&\u009A]a\u00D8\x0E\x187iI\u00FD\u00BC%7\u0099\u00D0C\u0087\u00E3\"\u00C8\u00E4\x1B\u00B5A\x00\x00 \x00IDAT*\u00E6\x1A.\u00C2\u00BD\u00A1\x07\x15\r\u00EBz}\u00B4\u00E3\u00CB\u00DF\u00CDGl\x1CJ\u00BAU\u00E4\u00FA\u00B3\u00E6\u00A9!\u00E13|9\u008C\u00A0[\"\x1C\u00A91\u00E9eX\u00DE,^\u00D2B\u009F\u0085z\u00AA\u00F2\u0093\u008C\u0097\x03\u00AF{\x04*\x1Dn\u00B8x\u00F8\u00FB\u00C3F\u00E0\u008B'\u00A1\u00DE\u008E\u00C9E\u00ADu\")/f//\u00C1\u009C\u0091[p\u00F0\u009A9\u0083\u0090\u00E7\u00E9\u00AD\u00B5\u00AAuz\u00F0^B\u00C8\x19\u00DF3\x19\u00EF0\u0091\x04\x16*J]w\u00CC~\u008DS\u00F5\u0089\u00C0\u00A7c:n\u00DC\u0097\x02IP\x7FI\x0E\x1D!\u00EB\u00DA\u00E9V(\u00A9\u00CD\u0083\u00CF@I*\u00FD\u00BE@b\u00D7*%\u0093\u00F6\n\u009A\x1A@\u0096\u0083[\u00DD\u009B\u0085\x18neZfM\u00C7\r\u00F0\x1D\u0098;07\u00F8l\u00C7\u00F2S\x1B!\u00C7\u00DF\u00A6\u00E8A\u00EC\u00A8\u00AD\u00D8u\u00DEu\u009E\x17\u00EE\u00CD\u00ABjK\x05\u0088\u00F4\u00EE\u00D7\u00EB\x1A\u00EDk\u00BA\u00D0^[\u00FB\u00DA}\u00BA\u00F5\u00CF\u00FB\u00F5\u00DE\u00CE\u00CF\u00FB_5Z\x1C\u00B8l\x03\u00E3\u00FB\u00DF\u00F7\x0F\u00CF\u00F4\x7F\x0B!\u00FCy{\u00F6\u00E7\u00FE]\u00BC\u00E7\u00D1\u00AF\u00DA\u00EF\u00DE\u00EB\u00B0\u00B8\u0088zG\x16\u00FAL\x02\x04\x1F\u008B\u00A1P\u0085\u00A44P\u00D27\u00AEY\u00C2\u0099\u00F9\u00C0+\u00D9H\u009F\u00ED\u00E1;\u00D1\u00C1\u00B2\x07\u00A4\u00E5\u00B92\x1C\u00F6\u00C0\u00A9RE\u00D8Fk?@b\x0F\u00A1V7\u00FA\u00C4\x03\u00C5\\\u00BA\u00BA\u00A4>j\f\u008E\u00B6$\u0089\x13\x1C\x17g\x1E\u0085#\u00BD\tA\u00DC\u00D4yi\x1B\u0088JJ\n>\u00F2B\x04\u0094\u0094\u0087\x16\u00F8\u008C\b?\u009Fq\u0097\u00CE$J\u00AA:#\x15u\x1FKB\u00CC\x1C\x05\u009D?\u00CB \u00A9\u00DC\x07\u0097D%\x172X\u00AA1Q\u0088K^\x10!\x02\u00B2E\u00A7\u00AD]\u0089Y3f\x19^\x06\u00C5\u0090\u00B4\u00D1\t\u00C1\u00F7\u00C12\u00EE\u00E9\x01\u00A14W\u0094\u00A3\x10s\"\u009DE\x05\u00AA\u00EFe\u0098;3\u008E\u00F6J&P\u00DF\u00EB\u0089\u00EA:\u00A3T\u00D5X\x1CY*=\u00DB\x10\u00F4\u00E8\u00A1\u00C4\n\x18\x02T\u00D2,\u008D\u0094\u00D3\u00E1\u00C9@\u0094:}\u00E4*\u00F2D%\u00CCjT?:\u00A2\u0080\u00A4\u00BF\x10E\x1B\u00A3;j\u00C3]\u00F6\x07\u00EC'\u008D\u008F\u00F2x\u0098\u00E0\u009A9n\u00DE\u00FB\u00F4\u00A3\u00A7\u00FE\u00BB\u00BF\u00F0s\u00F8\u0089u\u009An1\u0084\u00E7l\x7F\u00E5\u00BF|\u00F8s\u00BF\u00E86~\u00B8\u008E\x0E\u009E*C\u00C5\u00A8\x0E\u00A5\u00CAP\u00C5RB\u00B7\u00E7r\u00D1\u0080\u0086\u008C~\u00DDx\u00A7c\x01\u00BFWVP\u00F5\x0B\u009C\u00C3Z`?V\x02\u00F7$\u00EE\x16\u00FF\u0090\u00C8@j\u0081\u00AE\u00DB\u00E0]e\u00C8qX\u009B\x12\u00E3\u00BF\u00C5\u00F4\x16F\u00D7\x18agnN\x11yxHP\x11\u00BD\x13*O!\x06\x1A\x15\u00A7\x1E\x19\u00AF\u00D5nJ\u00C3\x11\u00D5\u0090\u00C8\x14@\u00B5A\x19\u0086\u008E\u00D2\u00FB\x15\u008E\u009C;(u&\u00D1\u0088\u00DD\u0080\u00DC\u00D9I\x11\u008D8\u00BC\u00DC\u009E-\u00F3\u00D1!b\u00B6\x1Ce\u00E4^h\u00B1\u00B3\r\x0B\u00C2\x0E\x1E\x12\u008B0\u0092\u0098|\u0089\u00A3\b&`\x00fTnj\u00AE\u00C1n\u00EB0\u00F6\u00CFip\u00D5\x18\x143\u00A1\x07\x11\f\u00816\u008B\u0084\u00DE\u00FC\u009C\u00F5\u00B7\u00C3\x19\u00E2\u008Cb*qi2\u009Ae\u00D3\u0099\u00CC\u00C2\u00CD\u0089F\u0096Ws\u008B\u008E\u00E4\u00C6\u00AB\u0084\u00ED\u00D3\u00B1Z\u00F8y.K\u00B1+\u00DE!\u0093\u00962\u00B0J6\x01^\u00DF\u00C2\u00AD\u0093\u00DB\u00FB\x01\u00CCKk\u00B7\u00F5#!%\x10\x1B\bKl\u00B5\u00E8Z8*J\u00F1\n\u00C0\u0084\u009B\u00E3x\u00F7\x13\u00BFh\u00FF\u009E\u00BD\u0082\u00D3\u00EB\x16C\x00\u0080\u00BF\u00E0\u00DF\u00F5\x0F>v\u00F9\u00FF~\u00F8f\u00D7\u00CD\u00A5\u00FF\x17\u00A1\u00E8e\u00F2\u00DF\u00B3F`\x11\x19\u0089\u00C4\u0080\u008A18C 0\u0083\u00F2.\u00BB\x02=\t\u008B~\u00DF\u0091\n+\x17\u00C7\u00D2E7\x1E\u00CAJ^5\x1D\u00A4N\u00C4\u00C4\u00DD2&.\u0086I\u00B4\u00F6;\u00E3\x11S\x18\u00CB1Y\u00B6\u0095\u00C9\u00E7,2\u00F8h\x1An\x1ATO\u00D8\u00EC\u0096\x06F\x00\u00CCh\f5@\u0086\u00C0L0\x02\x16\x03\u009A\b\u00C4dg\u0090\u00AE\u00CF\u00B5\u0093\u00C4\u00E4\x15\u00B9\u00E8It\u008C\x18\u0099u\x1D\u00846\u00DA\u00B1@3\u00B1\u00FD\u00DB!\x15\u008A\u008B.\ri\u009C\u0081m\x063\u00BF\u00C0\u00B1\x13\u008EOg\u00D19\x0Fu \u00D9*\u0089=\x19\x1B<m#\x19k!\u0083\u00AB\u008C\u00A5\x1A/\u00AF\u00DD\u009A\u008D!dh\x10\u00BD\u00F2lJ\x1D\u0090@\u00A0\u00B4\u00EFK+\x16\r2\u00D8\t\u0086\u00B21\x00UC\u0080s?\u0085\x16J\u00F0E\x04\u00E9\x01LUS\u008E\u0095\u0091\bb\x1A,a}/\u0088\u0082\u00C6H\u00FA\u00C2h5\rP\u00CD\u0095\u00ADA\u008B\u00FA\u00A8\u00BE$s\u00D2\u00B9^c'zq\x16e\r\u00C0\x11\u0093f>p\x19\u00C0\u00CDw\u00BE\u00FD\x1F\u00E0\u009F\u00E0\u00D6\u00EB\u0096\r\x01\x00\u00FE\u0093\u00FB\u00EF\u00FD\u00D8\x07\u00E6;|\u00CCU\u008F\u00AE\b>\x12ZfE\u008E;\u00DE\"\u00C0~\u00AB\u00B3M\u00A1\b\u00AA\u00AE\u00DB\x11[\u00D2K\u00AF:\x13&JE\u00A0\u00B1/\f~\u00E2\u00EC\u00D4\u00B1ny\x10\x06\u00A2tv\u00BB\u00FF9\u00FE u\u00C4\u00DB\u009E\u0084*\u00F4\u00D2\u00DA\u00CB{\u00C6;\u009F\u00E74\\(\u00D9\u00F5\u00CC\u00F3;\u00A5c\u00EA\u00CF\u0093L\u00C1\u0095Oa\u00A9\u00EE$\u00E4\u00EF\u00C2Az\u00BD\x17\u00C1\u00CF\u00A3\u00E9\u00E6\u00A9\u00DB\u00CB\u00E6@\u009B\x02\x17N!\u0096B\x1F\u0093\u00E7\x1FG\u00BC'\u00EB#\u00CAF0\u00B3-\u00ABX\u0089n\x0F\u0098#\u008D\u009D\u00C1\u008C\u00C8\u0090P\u00B6\u0082 \u00A2\u00F8\u009C\x138\x0Ek}\u00D4\u00FCx\u00DA=\x0E\tH\u00BD\x1D\u00CB8\u009C\u00C6\tsh\u0093\u008C|{\x12\x1B\u00EEx'w\x03\u00AB\u00E1\u009E\u00D4\x11\u00CB\x18\u0093e-S\u008D\u0090g\u00A7J\u00B9\u00C5zr\u00A1S\u00DFB\u00D27;\u0081\u00B9\u00EC\x0E\u00D7\u0080_\x03\u00F3:\u00EC\x15\u008B\u00DE\u00AF\u00B2\u00EE\u00ED\u009D\u00F7\x1E\u00ED<}\u00B2\x1D\u00D9\x07\u00E65l\u00B6\u00F6}\x0F\u00BA\u0090\u00DD\x0F;l\u00EEp\f\u00DC\u00BC\u00E5\u00CA\u009F\u00F9o>\u00FC\u00B1\u00BBh\u00FFN\u0084\u00F0A\u00DB~\u00F7\u00BF~\u00F8K\x1F\u00FFW\u00FE\u00D5\u008F\u00CC\u00A5nA\x10\u00AEe\x0EB\u00B9%m!\u00B23\f/+\u00FDZ\u00DB\u00E0,\u00F5\x19l\u0094\x04\u00DC\u00EB&\u00A2\u00A1\x00\u009D\x1B&HG\x11\x11 \u0097\u00A6\u00FA\u008D\u00ECWff\u00BA\x173XB\u00A9\u00FB8\u00D1\u00EE\u00D3\x19K\u00EF;\u009A\x0BO\x12&\u00A4\u00CD\r3\x07':J\u00B0\u008A\u00CEu\u00E0\u009C\u00C9\x18Q\u0088\u0094\u00F2\u00D0o\x11\u0085\u0098\u0082%\u00D1E;N\u00E2\u00A9\x00$\u00CF\u00F6A\u00C4\u0090:\u00F3\u008C\bFg\x00P\u00EE\u00FE\u00EC\u008C\u00E4\u00F3\u00AA\u00BB\x10\u00B6\x03/\u00CF\x01\u00CA\u00D87\u00E0\u0090{V\u0099\u0091@\u00FB\x1B\u00CA\u00B3@Ju\x17\u0082\u0090\u00CA\u00D2\u00E6m\u00B4\u00B9\x03\u00D1VO\u00BA\u0082\u00AB&\u00A4\u00B7\x18\x05e?\u00A2\u00A9\x1D\u00D1`\x0F\u00DB\u00C6\u00F2\u00DB\u00E9\u00D8<}w\u00F0\u0081\u0090\u00C1\x1B#\x0F}T\u00C9x\u00D9\r\x14\u00A3 \u00AEE\u008B\u00BFv\u00A7\x06c*\u00EAw\u00D9\x11\u00C8\u00B4R\u00FA\u00CB\u00BE\u00E2\u0088HJM\x16\u00E0SnI\u00B95\u00E3\u00D9G\u00ACB<\u00D0r[:J\r\t\u00E1\x1A\u00DB\u00BC\u00D5\u00F6\u00F06\x07\u00E6\u009Fz\u00FA\u00E3W\x7F\u00E5\u00B9\u00DF\u00C5\x1D\u00AF;\x19\x02\x00\u00FC\x00\u00DE\u00F9S\x1F\u00B3\x7F\u00FD\u0091\u00AAfUDy[\u00C2\x07\u0087\u00B4\u00D4\u00CBA\u0082\x04:\u0087\x1DY\x7FQ\u00EDm\u00D9\u00AE\u009F\u0099\u00C1be\rh;{{I\u00DC@VC\u0082\x01v\u00F2\u008E\x18\x00\u00A2\b=\u00E0\u00DB\u00DB\u00C1\u00F7\u00B2pg\x15\x01\u00D5Vg^\r\u00A2NJ*\u0083\u00D5\u00A2\x02p\x03\u00C7\r\u0089T\u0096{\u0085/\u008B\t\u008CR7\u00C38\u00D7\bG>{\x05\u00FA\fG\x06\x0B\x01\u00F1\u00DB\u0085\u0084\u00B4\u00CFb*N5\u00C3\u00F8\u0099q\x0B@\u00EA\u00F5\x1A\u009C\u0098\u0098\u00F4v\x19\x1F\u00BB\u00F1o\u00BAs\u0099\u00D5\u0098\u00C3U\u00CA4m\u00AF1\u009B\u00CF\u00A62 \u00F5~#\u00C3\x19\u008C\x19\x18d\f\x19\u00FC$\u00E64G\u00AA\n@\u00AF\u00CD\u00C0\x152\u0095m\u008A\u00AA\u00CE\u00D4\b\u00BE\x04\u0083\x06\u00D9\u00C6\u00AAx\u0085\u00C6\u00BC\u00CE\u00E7d\u00ECB\u00DA'\u0082).\u00A1\u00D2\x13\u008D\u00B9lM\u00AD\u00F0\x12(\u00F9}\u00AE7\u00E8\u00AEE\u00D9 \u00A4\u00DFg\u00CE\x01 [\u0081)\x122C\u0093\x072E[}N\u009BF\u00CF]\x10zi\u00CC\u00C2\x01\u00C7\u00C4\u00FCw\u009E\u00FA)\u00FC:\u00EE|\u00DD\u00A92\x00\u00C0\u008F\u00DE\u00FB\u00E0O}\u00F0\u00E6-\u00BE\x10\u0081`\u00B3 \u00CCbl$l61\x03\x11<\u00DF\x19\u00C0\u00D4a7\u00BB\u00E0;\u0099A\x18\x11\u00ED\u00D69\u00E7p\u00E9jG\u008B#N;K\u00F2\u00DEO;\u00FD^\u00FD\u00B1\u00E5\x1A\u00AC}\u00EB\u00EA\u0092\u00EE+#\x1E%SE\u00F9\u00A1`\u00EB\x04\x1EM\u00C7\r@\x17\u00A1\u0098\u0080K\u00FDL{\u00D4\u00CC\u009C\x16K\x1B\u0083O\u00C3<,az\u00BEy\u00CC\u008F\u0080\u00F5B\x1D\u00F9NhO(~4\u00F5\u00E1\u00A0\n\u0090\u00AA\u0081G{\x07\u00DD\u009ErW\u00EAw^{L\u00F0\u00BE\u00C5\u00A0\x0E\u00DA\x1Az\u00DF|:\u00D5\u0085~\u00CC\u00B8e\u0081T\u008F\u00F35\u00D5\u00EF\u00EE\x02\u009D\u00D3\u00DB=J]\u0099\u00AE~G\u00BFr\u00D76\u0097:ABey\u00B8\u0088\u00AD\u00A8\u00DFJ\r\u0093\x04\u00D6\x066\u00BC\u0096\u00EB\u00C9\u00D4Tz]\u0096\u0085F\u00C6P\u00AA\u00A6\u00DDrU\u0096*\u00E0R\t\u00F2-\u0098\u00AF\u00BF\u00EFP\u00B9\u00FD\u00B4\u0096{\u00DBrUN\u00B9\x14\u00AF\x01\u00BF\u00C7\u00F75\x7F\u0097\u009BQ;\u00A0E\u00B1\u00A0\u00D7\u00DF\u00BE\u00F93\u00FF\u00C5\u009F\u00FD\u00A97 \u00FB7F\b\x7F\u00DA\u00EC\u0085\x1F\x7F\u00FDW~\u00F9_\u00E0\u0095\u008F\u00C2YJ\u00AAy\nn\u0085\x14\u00B7\u00FA\u0081\u00E7\u00A2$\u008A:\\#\x1D\x01\u00E9\u00EB\u00B3\u00B9\x0B\u00D3H\t\u00B9\x07\u0085 4I\u008Ct\u0084\u009E\u009D5\u00A9/]\x0B\u00AD\x0F@\x1A\x18\u00D1\u008E\u0091)\u00DC\u00AE\u00C3\u00B8A\u008F>$\u00A4T\x0B.\x07.\x0EA\u00D9\n\rnp\u0094R\u00F6r8\x0Es\u00CC9\u00B8\u00CFb\x15AI\u0084\u00C0\u00CB\u00F2;%|W#F;\u0096\x05Mx\u008D<\x12\x12|K*q\u00EB\u00A3\u00DC\u0097F\"\u00DCH\u0080\u0092z\u0087\u00EE\u00D5\u00AE-\u00A3=U\x01\u008D\x1F\u0092\u00F8H\u0097\u00A190\x19\u00DA,dQ\x11\u00C0U\x02\u00DE=\"\x13\u00D30*\u00F4\u0091\u00F7\x1F\x10\x021_\u00C7\u00BCTt\u0086\u00B3\u00DC\u00BDW(\u00F4\"\u00F5%\u00A9\u00DB|\b9,\u00A8\u00A2\u00A9*\u0089\u00F0|}\u00B62\u00C0\u00E6\u009C\u00B6\u00B61\u008A\u0091\u00A4\u00D1C\u00AE\u00C7\u0086\x0E\x16\u0086R\u00D0$\u009E\u0097\u00D0\u0085\u00AE\x15\u00E4?\u00A0\u00DCu\u00CF\u00FCu\u00F5O\u00E8ChH.M\u00A1W\"\x03\u00C5\x04\u00F9\u00C4\x1C\u00F7p\u00F3\u009DW\u00BFl\u00FF\u00ED;_\u00C0\x1B\u00BC\u00DE\u0090!\x00\u00C0G\u00ECO\u00FD\u00DD\u00BF\x7F\u00F3{\x1F}\u00BC]\x16\"\u00AF=\x12:q\u00F5c\u00C5\u00D9\u00AA\x0E\u00C0*\u00F5\u00B3\u00E8\u00E8\u00A9\\\u009B\u00B6\u00DD\u00AA\u0088\u00C0j#\u00A7\u00B1\x0F\u00B4\u00DF\u00FF.$\u0090v\u008B\u0095!\f\x17\u0091\u009FQAj[q\u00EF\u00BE/E.\x12\u00AC\x0BD\u00D0U\u00DFy\u00F8\u0082\u0081\u00C3A\x03c\x04\u00EF\x1C$\u00AC\u00E9U\u009D\u00C8QD==\x12j\x05SwJho\u00E7ed\u00A0W\u00E6\u00E3\u00A51\x0F\u00E88\u00FD\u00FAJ3\x16\u00C1\u00F7\u00A8FL\u00CE\u009A$hk[\x0B\u00FF\u00A0\u00E7@%\u00C2&G\u00E8\u008D\u00C8\u009D\u00E3rxf:b\x02\u009BE\u00F4\"\u00FA9\u00C9\u0080\x14\u00EBPm`\"c\x17\u00E4M\u00E8\u00CC\u00AD\u00CF\u00BDP\u0095\u00C6\t1D\u00AC\u00E3[?m\u00B5\x1B\u00DCq\u00CE\u00CA\u00ECQ\x04\u00B8x2\u00B8fRU\x00\u00B2&\x02\b\u00D1U\x1C\u008F\u00B1\x07\u0091'b\u00A8m\u00DF\u00FA\u00F5z\u00C8\u0082\u00FD:F\x18\u00E4\x07\u0096\u00ED\u00E0 \x15aba\x10d\x04A?\u00CC\u00A6\u00E4\u00E0|8\u00F0\u00DD\u00EF\u00F8\u00BB\u00F88\u00DE\u00F0\u00F5\u0086*\x03\x00\u00FC\u00A7\u00F7\u00DE\u00FB\u0093\x1F\u009E\u00EFx\x18\u00C4Qq\b\ti8 opz\u00F8\u0086\u00D1\u00AC\u00F4+\x1C\u0097\x0E\u00B4\u009F\u00DA\u00D3y\u0081\x16n\x1B\u00F1h\u0094LuE\u00CFF\u0088A\u00D1]c=\u0097\u0086\u00C9\u00DBpl\u0087\u009B\u00FA\u008D\u00EC\x03\u00D2h)\u00A4\u00D1l\x1Cm!\u00F4\u00A2\u009F\t==\u00D4\u0081\\\u00B03\u00DCv\u008F\x0E\u00C3\u008Dw\u00CF\u00C2\u00EA%\u0098h\x7F\x0B\u00E6;\u00D5\u0081YB'\u00ED\x10\u00B3\u009D\u00D7>/^P^P\u00DB\x1D8\u00E6\f\u0082\x16\u00C3Q{\u00BA\x7F\u00FB\u00EE\u00ED\u009E\u00A1J \u00A3\n\u00D3s\u00A0hH\u00AA\x15\x19U\u0098\u00D0\u009Fj\u008FGM\u00C9\u009B\u00D6\u00DF\u00F3\u00BB\u00E6\u00C4\u009AJ\u00C2m\u00D4\u00BDy7\u00BC\u00F7\u00B7\f\u00C8a\u00E0l\u00A5\u00E7\u00F8\u00EE\x04\u00EEd\u008Cg\u0086\u0082~\x1C\u00ED\u00B7\u00E4L\u00BE0)\u009D\u00B3\u00A8%\u00C9\x14\u00F8\u0096-`^#\u00EA\x1AF\u0084\u00A2\u00F9\x06\u00CC+\u00B8\u0087\u00F5\x7FQ\u00A53\u00E2\u00F1\u00A4\x0E\u00EBxF4n\u0080\u00BC\x14\u008A\u00AA<\u00AB\"\u00E9\u00B9 \u00CAV\u008A\x01\u00D5\u008C\u0087\u00DF\u00BE=|\u00F6\u00AF\x7F\u00EFO~3\u009A\u00FF\u00A6\f\u00E1\u00BB\u00CC\u00BE\u00F2!\x7F\u00EB\u00C7`{K\"\u00A2\u00F1P\u0095\u00833\b(\f\x19\u00D3\x00U,\u00AAP\u00A3u\u00A0\u00B2H\x1BTL\u00B5\u00D0\u00831\u00F6 \x02\u0087\u00C2]\x02l\u0084\u00AD\u00BC\u00EF8\u00D9#\\L\u0083;K\u00A5j\u00D1\u0099\x00\u00F2\u00F7^\u00E8%\u00D3\u00A5q\u00DB\u00FB\u0091\x15j\u00B5\u00C8\u00A6g\u00DC|H\u00E30\u0092i\u00B1\u0098\u00BE\u00F3Ca\u00BF\u00C7\u00F4 X\u00EF\u00E1\u00C5\u0080\u00C2\u008E1'\u00E6\x11\x15\u0096/\x13\u00B418\x0E\u00BE/\u00D4\u00EDU\u00C2_\x06\u00CA\u00EE\u00A1\x10\u00B1\x1E\u008D\u0080\u0093\u00A9t[@cHB\x1E\u00E1Z\u009C\u00D0\u00FE\u00C1\u00D3\u008D\f\u00AAl\n\u00EA\u00B3\u0098\u0095\x18\u0090\u00B3\u00E0\u0090\u00BE;\u00EF\u0083\u00A3\u00C6z\u0099\u009EnWW_$\f\u00B3]\u00B5QL\u00A2\u00E6O\u008C\u00C1\u00E9\u00A2\u008Dy\n\u0082\u00ED;\\\x05u\u008B\u0088+l]' \u00E3y4qFA[\u00BB\u00A2ibi\u00D0\u0093K\u0093}\u00CDm\u00EC\u00B5\u00EE\x16w+\u0088^\f\u0098#\x18\u00C1\u00B1\u00F1;\u00D5\u008EcPE\bB\u00CF\u00CD\u0088f\u00B9+\u00FD\x0E\u00B7\u00A5\u00DE>7\"\x0EC\x0F[\u008E>\u00D0\u00A6g;\x06\u00AE`\u00B6\u00C3,\u00B6]\u00F4a\u00C0{\u009F\u00FE\u0098}\u00F4\u00C1W\u00BE\x19\u00CD\x7FS\u0095\x01\x00\u00FE\u00CA\u00F5\x07\u00FE\u00F6O_\u00FE\u00CD_\u00FD\u00F2\u0095f\u00B7$wF\x1D\u009E\u0092\u0084\n~\u00F7\u0097\u0091\u00E8\u00B68\u00F5\u0096\x1A\x11\u00D7\u00CC\u00A4\u00A8R\x01\u0094*\r2\x1B\u00E49D*M\u00ED\b\u00A6}R!h8\u00CC\u009A\x04@\x12\u00FF\u00BC\x15\u00AFP\x0F\u00DB\x05Y\u00C5\x10\u00A8:\u00C8\x00%\x1D\\\u00D0\u00B9K\x0EG,\u0080\u00C7\x1E\u00BBCk\u00D7\u00E8\u00DD=k\x1B\u00CE\x19\u00FBB\x0E\u00BA\u00B8X\u00AEcI.\u00F2l\x0F\u00F2D\u00C59 \u00F4O\u0083\x19\x16U\"\u0089APZ\u00C7f\u00D9$\u00B2\u00BF\x13\t\u00A5\u009Djk\x1E\u00E3l\x01\u0080\u009B\u00A0i\u00CC\u00E8\u009C\u00C8=\x1A\u00A4\u00EF'\u00CC\u009F\u00B6\u00F6\u0093\u00CDHmI\x01-\u00FB\u0084#\x03\u0092\u00A4\u00C2H\u00F5H;Bs\u00D3f\u00FD\x05G\x1Av\x0F\u00D9r\u00A0:\x13~z>\u00D5\u008F86\u009A\u00A4oCms^\u0093\u00DF\u00D4\u00A8\u009Cs[\u00ED\n\u00D3s\u00BE\u00E3\u00D2\r\x19\u00D7\u0090\u0081G\x1E\u0084O.S\u00D5\u00A0f[{\u00EC\u00A07\u009AKw\u00B8\u00D4\f\u00A9%\x13\u0085\u00D69\u00B1T\u00DE\u00CA\u00E2z\u00C1\u00E3\u00AB\x1B\u00F8\u00BF\u00FFm\x7F\x1B\u00BF\u008Co\u00FA\u00FA\u0096\f\u00E1/\u008F\u00A7~\u00EE#7\u00EF\u00FC\u00EC\u00CF\u00E0\x0B\u00DF\u00D9\u0089\u00BFB\u0090\x15\x04\x04\f\u009C\x19\x02\x7F\u00A7\x04w%\x17%0\u00E9\u009F\u00F2\x18P\u0085PI\u00F4\u00D9\u009E\u00D6\x1B\u00DA-Z\u00FEB\u00DA::\f\u00B3\u00AC\\\u00E4\u00FDZ\u009C\u0083\u008D\u00F40\u00F5p\u0083\u00B0\u00B3\u00BA\x10\u00D0\u00A4\x0BO\u00F5R!\u00D2G,\x1F\u009F\x03\u008F\u00A7\u00E3\x06e\u0080;\u00DC\x18\x05\x18\u009Bt\u00D9\x01\u00EC\x13\u0094\u00CCqMU:\n\u00A9X\u0099\u008B\u00B18\u00E6\u00AC\u00C2*e{h\u00BA8U\x16K\x1Ff[\u00B8\u0094\u009C\u00C6v#Z\u00B06\u008C\x15\u00D2\u00B0\u00C9(B\x032C\u00E3\u00E4R3\tK1\"\u0080FB\x16f\u00E1\u00A9\u00AA\u00C4l@\u00DA3z\u00AD\x05w\u00CD\x01\x055\u00C7\u00A5\x10\u00EA\u00CA\u00DA\u008C\x1B\u00AAv\x04\x10\u00C7\u00D3\u0095\u00AAq\u00A3\x13\u00AC\u0097\u008A\u0090\u0084^\u0084\u009BL\u009F\u00EDed\u00A3\x18Bc\u00AAu\u008D-mZg\x06\u00B3\x11\u00B0\x03\u00ABZ\u00A0\x10dU[\u00AE\u00B9L\u00A9C\u00FB@\u00C6)\u00CC\u0081\u00AA\u00D1\u00A02h\u008D\u0089\u00B86wU5%\u00B4\u00DF\u00C4\x18\u00AEp<\x7F\u00FD\u00D9\u00A7\u00FF\u00A7\u00E7\x7F\x0E\u00FF\x1B\u00BE\u00E9\u00EB\u009B\u00AA\f\x00\u00F0\u00B4\u00D9\u00FC\u00C8|\u00EEo]\x1F\x01Q\x12\u00CE/\u00C4n\x18\u00BDNA\u00B2\u00C8P\x11\u00A2\x12\u00B1&\u00D4\u00DA\u00EF\x1A\u0082\n\u00B1m\u0091\u0081\u0088\u0088kp\x05\u00E0\u00A7\u009A\u00D0\u00F4\u00AE\u00B4\x1D\u00F0\x1E\u00CE\u00F3\u0096~\u00C4\x1D\u0082\x118f\u00E2\x0F*4\u00BEg\u00D4\u00D9\u00F2\u009F\u008E\u00F9Z\u009A\u00AC\u00A2NipL\u00A9\u00D1\u00E3\x10h\x01\u00A1;\u00EB\u00E2\u008EG\u0097\u0089\u008B\u00D4\u0080\u0093\u00CA\u0090P\u009Cn9\x1C\u00A5\u0093w\u0097\\@\u00E6\u00E6\u00AA\x13\u00FCOH\u00ED\u00B4\x1F\u0094}\u00E2\u00E2H\u00DD\x7F\u0085\u00DD\u00D4\u00DF\x1D\u00CD\u0085\x17\u00EE@EX\u008A\u0081\u00F5\u00FBkM*\x1AR\u00EE\u00D3y\x04\u0084?\u00A8\u00F6\u0094\u00AB\u0092\u00EA\u008A\u009F\u00FA\u009B}C\u00DA\u00CB\u00CE\u0091\u0089]\u008D\u0088\u00EF\u009E.V\u0085y\u00CFv^Fn\u00CA.\u00E1\u0096c\u00C5a\x01\u00F9\u00C5m\x14\u008F\u0080\u00CElPB\u0080j\u0080\x1D\u00FA\u00EE\u008BJ\u00D2\u00F1o\u00DA\x0E\u00C5\x00L\u00EB;\u00B8M\u00AA\x18\x13\u00E5\u009A\u0094^?\u00B7\"\u00F8)w\u00A4\u00D4\x04\u00ED4%\u00D5A\u00E7m\u00B0\u00B977\u00E75lR\u00A5P\u0096\u00A4m\u0080\u00B2\u0091m\u00C0\u0087\u00E1\u00D1w=\u00F1\u00B7\u00EC\u00DDU\u0094\u00EE\u008D^\u00DF\u0092!\x00\u00C0\u008F?x\u00DF\u00DF\u00F9\u009E\u009B\u00B7?,\x12\x161vC\u009F\u009D~\u00BB\u0082\u00FB\x0EW\n\u00F4\x1D\u0086\u0093\nF\u00EA\u00BA\u00BE8\u00EA\u00C9\u00D8\u00B2\u00F8j\u00E3\u00DE\u00A6{\u009F\u00DD\u008E\u00A8{\u00DA\u00E9\u009E]=\u00A9\u00FEJ5)\u00A2\u00EF\u00D24%\x0F\to\u00958\x12%\u00A0O[a\u00BA\x00\u00A8\x0F?\u0086\u00E1\x11\"\u00E6\u00FFp\x11\u008Dt\u00FC\u00B1\u0084!\u00CB\u00B7~\u00D1Bg\u00A8\u00F3b\u0094$\u00A38\x1C\x19\u0097p\x1CE 3u\u00FA5\u0094Y\be:\u00D5\u00E6\u00C6h\u0082\u0090*m\u00BA\u00EE\u00AF\u00F3\u00C2\u00C8\u00B8\x18&\u00F3\u00FA\u0095a-\u0084\u00DD\u0098[o\u00FB\x1C#\u00B1\u00F4\u009F\f\u00A9\u00DBJd+\u0088\u00A9/uj\u00E6\u00EF\u00EDoh\u00BC\u00B4\u00A7\u00F07x\u0095\u0099\u008B\x07\u0086\u00E5\u00B7\u00C5\u009B\u00C0\u009BIUY\x10\u0083\u00C8\u00CA\u009D5\x1B$\u00B1\u00F5\u00AEPmE\u008E\u0096\u00910\b\u00DB\u00E7\x06?\x18\u0082,C\u00A3\u008C\u0082\u00F9\u00EE\u00EB\u009E\u00B6\u0083\u009E6\u00ED\u00BAFo\x1A3q\x05\u00D9\x12\u00E0;\x1E}\u00FB\u00FE\u00F0\u00D9\u00BF\u00F6\u00A1\u00BF\u00F3fh\u00FD[\u00AA\f\x00\u00F0A\x1B/\u00FD\u00F5\u00D7>\u00F9\u00F7\u00FE9\u00BE\u00FA\u00DF\u009F\x0B\u00A3\u008C;\u00F6^\u00C8\u00ECC\u00EE\u00F8\u00B4\u0086 \u0087\x14\u008E9\u00ED\u00A9\u00D2[\u00D9\n\u00A42\u00C0\u00A8:\u008D<\x1E\u00BFm|v]E8C\u00FF^\u00BB@\u00CF\u009F\u00AA\u008B\u008EY\u00FBu6i\u0081\u00A6G\u00FBz\\a\u00B3g\u00BD]\r*\u00DC\u00B6*\x00\x01\u008F\u00CC\"\u0094\x19\u0086\u00CB\x04vI\u00B9i\u00B5A\u00AC\u0087\u00F1m\u00D3\"d\u00CFv\x07z\u00D5\u00E1\u0088;\u00A8\u0084&\u00A1\x13\u009F\u00EB\u00B6lZ\u00E3\u0087G\u00A8o\u00BA#\u00D9\u00BFHk\u00B6$\x06\u009B\u0081\u0086\u00E4\u0096\u008C\u0094f\u00A2\x1E\u00B6\x0B\x04mt\u00FD]\u0084\u0092\u00FB\x1A:\u00FB\u009E\u00E8)'\u00BF!\u00AA8t\x00-6A*R\u009D\u00A3B(\u0080e\\B\u00CE/\u0090\u00E3U\u00FF\u00F4\u009B!\u00FA8\u00C8p\u00C0\u00F6\u00C11\u00AEj@t\u00CE\u00F9\u00BB\u00EE\u00DD\u00ABUk\u008E\u00D3k\u0091s\u00A6\u00E7oy\u00AC\u00E7\u00B4\u00E4\u00B2\u00E8\u00F7\u009A\u00DA\x12N\u00C2\u00D49_\u00E2\u0098\x1Bl\x0E8\u00EB5z\"\x1A\n?fP\u00AArs\u00C6.\u00A4RF\u00F5.V+\u00DC&.\u00EF\u00BF\u00F7\u00F7\u009E\u00F8\u00CF\u009Fx\to\u00E2\u00F5\u00A6\x10\x02\x00\u00FC\u00C8\u0083\u00F7\u00FF\u00CD\u00F7\u00DF<\u0085\b\fVRQW\x11\u00A2C\u00DE\n\u0099\u00ACII\u00F5\u00D9\u00A3\x0E3\x01#\u008D&N\u00FA\u0097~\u00DF#\x1D{\br\u00B7\x13\x14\x17U\u00BF\u00AA\u00BE\u0082\u00F3\u00DF\u00D1\u00EE\u00D9\u00E2#\x16\u00CE\x0E41T\x0B\u00DEyXPu\u0091,@F\u00BFI\u00C5\u009B\u0088\u00AD\u00C7\u00F8\u00FD8\u0080\u009B\x19\u00EFC\u0089m\u00CDr\x1FR\u00D3R\x15\u00C9\u009C\u0087\u0094\u0098k\u00F4\u009FP\u0080\x13\u00D2V\x04\x1Fc\x1E\x1C\u0098\u0097RC\u00E6,(/F2\x19A\x18\u00EB\u00D0Jb\x1F\u00CA\u0083@F\x18\x1E\x07\u008B\u0096\u00A8\u009D\x03\u00B7\" \u00FD\u00F0j\u00CB;\u008C/\x17h\u00CE\u00A5\u00BC-\u00BE\u00BAC\u0085~\u00D2\u00BD\u00E9B\x1D5\u00B7\u00D3\x03a\\\u009A\u00E7\u00A4\u008F\u00CD\u0081\u00F4\\4 \u00B0\x18g\u00B1\x100\u009F\u00D7\u00AC\u00AC\u00C7s\u00BD\u00C9d\u008Ah\u00F8\u0092\fd\u00AA\u00ED\u00E9\u00CB}t}\u00A8\u00A3\u00DE:'\x06\u00D2\u00EA.\u00CC\u00EEy\u0090\x0B\u00F1\x1A\u00E6\u00D7Eg\x1E\u0095\u00CA\fJ\u0096:#k\u00EER\u00ED\u00FCN\u00DAx\u00F5\u0099k\u00DC\u00FF\u00D1\u00F7\u00FC\u00CD7K\u00E7o\n!\x00\u00C0\u008F\u00D9\u00D3\u00BF\u00F1W_\u00FF\u00C4?~a\u00DE\u00FC%\x1BgO\u0082ES^\u00F6\u0085\u00D0\u00C5\x03\x19\u00A4z\u0095\u00E8\u00A1\u00A9\x19D\x0F.\u00C9\u00D2\u0083\u008AT\u0084%#\x19\u00CF\f&\x18R$p\u00F4k\u00FB\u00EB\u00B6\u00E1Pq\x0E2\x02\u00F6\x12\u00E1\x19\u00BF\u00DE$\u0095\u00A4V\x04\u009E\u0085\x14\u0088`\u0098Z\x1C\u00A5n\u00B4\u00DCz\x18\u00C2\x1B\x11\u00DE\u0086\x0B\u00DF74,\u00CE\u00C9uC\x1D\x1A@\u00A9'(\t\u00D8%\u00B2\u00E0\u00B4\u00A4a\x1A\u00D3\u00DA\u00F7\u00F4&L\u00CB\u00FE\u00A9M\u00B5\u008FI\u0097)\u00BF\u0087\x0Bn4\u00A4TFC\u00ED\u00D1\bXz\f\f\u00C1%g\u00DAR\u00A2\u008C]&?9\x18x\u00E4u]RL\u00A1\u0085\u00990\u009D\u00FD\u00E4\u00E7\u0098\u008D\b\u009Bd\u009Em\u00ECzV\u00D3#ZQ\x06[m\u00A7&/P\u009FG]\u00A7<\u008F\u0090\u00FE\u0096\u00EDg9\u00B6Y\u0092\u00BE\u0090\x04\u008A\u00D0i[\u00B0\u00BE\u00DE\u00D2\u00B8\u00A8\u00F9+\u0086S\fA\u00CC\u00A0\u00AFQ\u00A9\u00C9\u00E2\u00C4\u00E2nz~jw\u00B6s$\u0081,\u00C7\x11\u00D6\u00E2cY\u00C0\u00F6\u0081\u00ED\x1F_\u00FF\u00CF\u00DF\u00F6\x1Bx\u0093\u00AF7\u00CD\x10\x00\u00E0?\u00DB\u00DF\u00F7\x13?{\u00F3\u00D5\u00BF\u00F4\u00D5{\x05M\u00E2E\u0097b\u00D6.\u00E8jD\f\u00C8\u00AC%'5\x17\u008A\u00AC\u00C1\u0090\u00F1\u00F0\x1CD\x04$\u00F3\u00A80\u00E5\u009E\x04E\u00E6c\u00AA\u00B0\u00DC_2\u00FEu\u00B7(\u00EF-\t\x00\u0084\u008E7\u00FB\u0083m\u00C4\x02-@\u00BF\u00E3\u00FB\u00AA>\u00A4\u00CB\u00AF?|\u00B6\u00F3\x18\u00C1\x14\x1E\x1C\x01\u0095/\u0088<\x07\u00A3\u00CF_\u00D6\u00F1\u00D4\u00A3\x1B\u00F1az\u00EE\u0087xq`\u009B\u008E\u008B\u00DC\u00A2\x1E\u00A1\u00C088#\u00B3\u00AEs\u00AB\u00FE\u00C8\u0095\u0089\u00C9\u00DD\u009C\u00DCr\u00BE\u00D4\u00CE\u0098m\u0083\x16W%\u00E75:q\u00A2\b\u00E5jJ\u00AD\u0088\u00F1O\u0094:\u00A3\u00E4\u00A0,\x18\u00CB{\x1Cd\u0092\u00C1P\x18\u00AB\u0092\u008C\u00AC\u0092\u00A5\u00AE\u008EZa\x07}\u00FC\x06\u0086\\\u0093\x01\\<\u0098\u00D5v\u00A86eA\u00FB!\u00BF?j\u0099\u00CA})\x0F\u00CC\u0098\u0094\u00FE\u00C9\x04\u009D0\u009D\u00CF]\u008C \u0099G\u00FB{A\u0091d\u00A8\u00CD\u00D8,\u00A6\u00D0\u00ED\n\u00B9\u00BC4g\u00BC\u0097\u00EADD?\u0085\u00BA'\u00B2|\u00FA\x042\x14Y.\x1BeWB\u00A8@\x0B\u0091\u00DE\f\x00\u008F\u00AE\x1E\u00C3\x7F\u00E8\u0099\u009F@\u00EE\u00DC\u00F8\u00AD_gq\u00FAM__p\u00B7\u00FF\u00F1\u00E1\u00BF\u00F8\u008D\u009F\u00BE\u00FF\u00F2\u0087c\u008EE\u00A8\x1D\u008E\u009F\u008Cx\u0092\u0094}#\x14\u00D9\x03\u00BAo\u00F5\rK\u00A2\u00A3\u00CEK/\x02\x11\x01\u00CF\u00A9\u00A8\u00C8\u00AC\u00AF\u008B\u008E\x04\u00EA\u009ChK\x10/\u0082\u008BJ:\u00A0\x11\u00B3\u00A4d\u00D7\x19\u0081UZ\u00A9\u00A8\u0088\fG\u00E5\x1A\u00E4\u00EF\u00ED\u0081\x0E\x07\u009Eq\u00E0-\u0087\u00E3\x01\u0080{0\u00DC\u009F\u00C0\u00B5\x03\u00F7\u008E\u00B0\x15\u00EC\b\u00F7\u00DB\u00EE\u00F1\u00B9\u0091HwJ\u00DC}rvf\x10\u00C66\u0099\x10>\u0083I\u0084W\u00C4*L9\t=\u00DAQ.\u00C38(\u00BD\x13-\x00v8\u00FD\u00F9\u0096\x12iL\u00C7\u0086\x11\u0095\u00A3\x01dL*\u00DDd\u00D7\u00B3\x14\u00C3m\x02c \u00E3\b6\u008Fcz\u008A;\u00DD\u0085\x0EVS\u00E28\x06\u00DB\u00AF\u009D\u009D\u0082\u00D8\u00AFy\u00AD\u00F3\x19mm,Q`\u00A5\u00C68fI\u00FD\u00A5\u00F8\u00AC\u00BE\u00EB^\u00B3\u00EE\u0093L\u0081RX\u00A8\u00A9\u00F6@Q\u00B6(V\u00E2g\x00S\u00E9\u008E\x03r9\u00CA\u00DD\u009B\x06\u008E\u00A3\u00AEW\x1E\u0086\x1D1\u00B7i\u00B3\u00D09\u00D2K\u0099b\x1D\u00C5o\u00BDt2\u00EA@~\u00A8D\u00FB\x05e\u00DD\u00E5\u00FD\u00A2Q8\u00E1\u00EE\u00EB\x1F~\u00F4\u0089'~\u00F6\u00F9?k\u00EF\\\u00F1\u00C87{\u00BDi\x1B\x02\x00\u00BC\u00CB\u00CC\x7Fx\u00FF\u00B6\u00BF\u00F1\u00E4\u00A5\u0092\u0095\x14\x15\u00A8B%\u00A1&4\u00A2dm\x02w\u00C3R\u00CC\u00C4\u008BX\u00A1b\u00A7\u00EDx\u0096a\u00EF\u00E7\u00C9\x0B\u0081\u00D2\u00BFz\u00B0\u0091\u00AE\u00CB<\u0089\u0093\u00CD\u00A0\u00B6O\u00F3|\u00C0\u0081\u00C4\u00BC8\u00B1\"\u00D6\u00E6\u00CA(\u00F4\u00C0U\u0088T\u00EF\u0092\u0086\r\u00EDH?\u00CC\u00C5\x13\u00F7y\x1D\u00C0CC\u00BA\u00F6z\x01\u0095\u00D9\u008E\u00F5\u00D0by\n\u00E0Ul\u00E4\u00A0\x15;P\"\u00ED\x0B\u00C7H\x17\u00E3\"\u00B8\u00B2-E0\x06\u00C4\u00CE(F\u008D+\u00C3\u0096U\u00B8\u00C5\u00E9\u00D9\u00C0\u00E2\x06\u00D4y\u00EE\u00A3\u00DC{i\u00C3P_*\x13\u00D3a\u00E5\u00D9`?\u009Czs\u00B4\u0081\u00C5~\u0090\x1E\u008F\u00E5]\u00E3\u0090\u009A$\u00D5\u00A9\u00FF\u00DD\u00DD\u009A\u00B7\u008A\u00D3\u009C\u00BC\x185'm\u00AE\u0093p\u0091\x02\u00A0G?:\t\u00B5\u00EF@\u009D\u009E%/4V\u00D9\u0095\u00ED=\u00D1\x10C\u00AC\u009D\u0085yt\u00C6##\"6D\x14\u00A2\u00EC\x02\u00F1vlp\u00BF\u0082\u00DFU\x00\u0096\u0086\u00FC\u009Bk\u00C7\u00CDG\u009E\u00FA\x1B\x7F\x10f\x00\u00FC\x01\x11\x02\x00|\u00D9}\u00FBk\x0F\x7F\u00FB\u0093\u00FF\u00EF\u00F5W>t\f@\u0084*&0\u00E8\x06\u009CwH\u00E8\u0098$\u00C1w\u00D9\b\u0090D,\u0084`\u00A7k\u00AB\u009B\u00C1|\x06\u00B4\tK\x1C\u00F7\u0085\u00AF\u009D\u00BC\r\x10\u00E3@F\u00E7\t\u00CA\u00A6\u00DE\u00CA\x18\u0091\u00E4\u00E6\u00FC.\tu\u00F66T<\u0082PC\u00B5\u0095\u00C5R\x1A\u00AC\u00D4b\x1A0\u00BC\u00D5\u0081g'\u00F0\u0084\x03\x0Ff8\u0088\u00EEM\u00E0j\x06L\x1E\b\u00E98< \u00F9\x15\u0083\u00906\u0084D\u00DB&35\u0088\x18\x14\u00F7puXIZ/\x14\u00E1\u00EE\u00D8\u008E\n\u00D0\u00D9fH(\x13b8\x06\u00B6\u00A3\u00A4\u00D98\x1CR\u00E5\u00C6\u00E1\u00CDL\x0B\fL\\90h\x19\u00DF<\u009E\u0086\x01\u00D8|\u0086\u00A9\u00B9\u00F5as`X\u00AC\u008C}VV\u00E2F\u0084`>R\u00C2\u0083c:\u00BFAuG\u0088 \x11\x00b,\u008AR\x14JP\u00E99!\x00\u00A9Q\u00FD\u00F7\u00B4\u00D3\u00B4~voEHr\u00AA;\u00ED\u00B8\u0093\u00AB\u0099PT\u00DA\b\u009A\x1A\u00AAR\x05D]\u0081*\u00EC\u00842<U\u00C9\u00FF\u00BF\u00BDo\u008F\u00BA\u00F4\u00AC\u00EA\u00FB\u00ED\u00E7=\u00E7\u00FB\u00BE\u0099df2\u0099\u00DC\x00\t\u0082@\u00B8#wQ,\u00B1,\u00AC\b\u0088\u00B5\u00A6\x0B\u00A8\u00B4R\u0090.\u00DAJ\u00ADE\u00B0\u00DAbU\u00BCVY\n\u00AC\u00A5b\u00B5\x15X\u008A\u008D-\u00A2(\u0082J\u00B1R*\x17A@0\x01\u008A\x10\b\u00B9\x13&s\u00F9.\u00E7\u00BC\u00CF\u00EE\x1F{\u00FF\u00F6\u00DE\u00EF\u0099Q\u0099\u00CC$\u0099$\u00F3\u00CC\u00FA\u00D6\u00F7\u00CD9\u00EF\u00FD}\u00F6\u00ED\u00B7\x7F{?\u0093\u00F0\u00A3\u00FE\u009F\u009C\t\u0085e\x15\u00C6\u00B1P\u00A7\u00D5\u00BD\u00881\u00BD\x05^\u008B\u00EF|\u00F4\u00E1\u00E3\x15\u00BB\x7F\u00E7^\x0F\u0093\u00FB\x10T\u00F8\u00F2\u00C6\ta\b\x00p@d\u00FC\u00A9\u00C5\u00F5\u00AF|w?\u00F8\u00C6[D\u00A12mJ:u\u00D5Kh %|\x00\x10x\u0081\x00\\oO+-\u00B9\u0080\u0089S!?\x1E\u009F\x00Hg\u00E7X\u00AE\u00C1\u00B4BQR\u00F8G\u00FFC\u00A7\u0096>\u00C3\x07\u00B8\"H+\x10\u00BD-\u00A9\u00E9I9\u00E5\u00A4)\u00E7b,J\u00C5a\u00BC~\u0099\u00E4\u00F8E\u00DC\u00DD\u00A6\u00FB\u00DA\u00FD\u00B2h\u00ADy\u00AEn\u00E9\u00C9UPMz.\u00B1\u00CE\u00EB\u0092\u00B2O(3\x07\u00B9\u00A4+0f\n/\u00C2\x06\u009F\u00D8\u00AAE\x10z}\u00AF\u0080\n\x1B\u00B1\u00F8\u0092!\u009Ao\u00A4\u00FB\u00BB%\x00\u00DA\u00FC\u00D1v\x17l\u00A68\u00A3\x0B3\u00F2\u00B92M\u008A\u00F2}Z\u00D6\x12\u0087\x03\u0093\u00F2\u00EAi\u00F5\u00A6WN\u00D6\u0090A\u00CB\u00B3\u00F1wA\u00F7\u00BAi\u00A6 \u00A3\u0081L(\x043I\u0083\u00F2\u00C6\x11\u009EA\u00D3:\u00E7$CE\x1A\x01\u00E2\x01\u00EEm\u00C4w|/~\u00F3\u0089\x1Bh\u00CC\u009Fc\x7F\u0088\u00E7\u0090\u008BS^jP\u009D)W|\u0089\x03\u0096\u00F3\u008E\u00C5c\u00F1\u00CA\x13U\x06\u00D3\u00B7}\x02\u00E3\x0B\u00BA\x18^\u00B4\u00F9\u00E9\u008F\u00BC}\u00FD\u0096\u0087,\u009B\u00A5\x19\u00DD?\u0080\u00A0\u00D9\u0082\u00A0H\u00D7\u00DF\u0098\u0084\u00C5\u00CA\u00B7\"\u00B4\u00D1)\u0099\\\u0085\u00BA\u00B0j\u00C1\n\u00FC\u00B3\u00D5^\u0087\u0088\u00F0@\u00FC\u0081\x14\u00BC\u00A0\x1B\u00AA\x10\u008A`Uh\u00FD%M\u0084?0\u0080\u00E2:\x16w/\u00F6\x05\u00C2\u00D7\u00CC\x05;}\x7F\x0F\x1B\x02\u00E7\u00E9y\u009E55\x0Fa\u008F*vw\u00C1\x1A\u00CCCX\u00EF6\x01\u00D7F\u00D8\u00DA\u0090\u00DD,\u00E9\u009Ag\n\u0086\x11\u0098+-\u00A4\u00FA\u008APn\u00FD\u00FC\u00F3\x16\u00F7c\x13w\u00E6!K\u00C4\u00CDj\u00C7i%\u00B6m]18\u00D3\u00AE{\u008CKv\u00A68.1\u0083\u00BD\u00B2\x06\u00BB\u009E\u00D65\u00B1\x03\u00A0`\f\u00C9'\x18\u0090\u00D6\u009A\u00D7e\u009EB\u00BE9Z\u00E7Yw\u00E6\u008A\u008Ay0\u00E58\u00D2\u00BB\x0B\u00AF\u00C4\u00B1\x1A\u00EF\u009Fx\u0089\u00DF[S5\u0080U\u00E1\u00CA\u0095\x19\u0090\x04\x1C\x07\u00EF\u00B7@\x0FJ\u00CA\u00BBi\u00E5o>\u00F3\u00C8.-\u00F9~\u0085\u00DAob\u00FDY6~\u008C\u00B5WD\x19\u0083yd\u00A6\u0090c\u009B\u00C0\x10\u00CA>\u00AB\u009F\u00BB\u00B7`J\u00BAC\"^r\u00ED\u00989h\x00\u00C0\u00D1\u0087\u008E\x1F\u00DF\u00FD\x1B\x07\x1E!\x0F;q\u0085p\u00C2\x1E\x02\x00\u00DCS\u00E6\u00E3kw\x0E\u00FE\u00D0\u00FF\x19\u008F^~s\u00AB\x00\u009E\u00CB-\u00B9\x02\u00E5sS\x04\u00C5\u00DA\u00D3k(\x05Q\x1A\u00D9\u0086\n.\u00C2~\u00C7*\u00CA\u00AB\u00CA\u00A0z#\u00A5i+s\u00CAD\u009Bu\u00E5\u0085izY\u0093\u0094\x1C\u00B5\u00B8 4=_\u00A0\u00D2\u008CUE2A\u0092\u00E1J\b\u00F1\u0082\u00EB9\u009B\x02;\u00AA8\u00D2\x15k\x00\u00E6\x0E\u0096Y\u0097e\u00EF]\u00E0\u00E7\u00E9n!\u00BA\u00FA\x1D\u00AAF\u00AE=\u00D2gL\u00CDi\u00C6\u00D7\u0083O(\u00C6\u00CESo\u00C2~:\u0080\u00ACe\u00E0\u00F5i(\u00CC\b\x7F\u00FC\u00F3.\x06~u!\u00C5Y\u00CB\u00DB\u00A1\x153o\u00A7\u00BB{\u00DF\u00F9\x19\u00CA\u00F9a\u00E0'\x1F\u00CF\u00A4E\x1C\u00DC;p7\x7F\u00D4$\x13\u00B1AK\u00EC\u00D8\u00D3\u0083\u00A9\u00DE\u0082yq\u00DE8\u00A5\u00A3x\x13\x02\u00AEX=IwvL<\u0085\u00CE\u00E7\u00A7\u00E4\x14\x14\u00B7\u009Es\u0089\u0083\u00DFQ\u0081\u00AC\u0086\x0F\u00FE\\\u00DD9,D'\u00C99\u00C1\u00FD15\x1C\u00AA9\x1F'\u00DE\u0082\x02\x1AM[\u00A9\u00A9\x04\u00C0\u00C2\x1D\x13\u00C1\u00CE\u00DA\x02x\u00FC\u00EC\u0087n\u008D2\u00C8\u00B7y+\u00C6-\u00AA\u00F2\u00DC\u009DO\u00BC\u00F7\u00F7\u00D6\u00B6\x1E\u0097\u0082\u00EF\u00F1:\u00D7l\u008C\x07\u00E8\u0082\u00DD\u00DC\u00A6(\u00C3\u0085\u00B2H+\u0095D`\t5T\u00A8\u00DD\u0099\u00EDxZ\u0095E\u0080\u0087vK\u00C7\u00B8g=_^6\u00D0\u00F0\u0085T\u0090/+&KW\u00D0E\u00D3N\u00E4\x1D`<g\u00FB\u00DB\x04\u00E9\u00A3\u009D\u0093\u0096yBs-\u00EE)]JU`C;\u00CE\u00E9\u0082\u00B3 \u00D8\u00D5\u0081uu\x1CA\x15k\u00A3+\u008Anw9Wz\x02\u00863\x04\u00B2\u00AE\u00F6\x7FNh\u00C6\u00D7\u009C\u00D0\u00D2\u00BD1\t\u00F9\x06\u00AE\x00fK\u00BB\u00DE(\x1E\x1A\u0081\u0099s\u00A7\r\bM7wX\u00BA%\u0096\\Lf\u00EEnx\x13s\u00D1\u0087\u009E\u00DE@\x13\x04\u0086\u00D0\u0080(^b\u00E6A\u00A0\u0098\u008D\u00E5\u00AD\u00BA\u00C0\u00F2\u00FEV\u00BD\u0089yX\u00F0\u00E4S\u00D0\x1B\u00AAx\x020\u00C5\x11f\u008E;\u00B0n\u0086a\x15\u00D4\u00EE5\u00B1\x03Stl:\x03\x0F\x13\u00E8\u00E5\u00CD\u00AA\x07\u00C2y\u00A3H\f@\u0091\u00C0\u00B1\u0083\u0089\u00B6,^z\r\u00AB\u009E\x00\u009Fy(\x12b6,\u00AF.JH\u008A'\u0097\u00D8U\tk\u00BB?tGL\x15\x1D\x07\x1F\u00B9\u00F5\u00FEs~k\u00DF\x13\u00E4\u00FE'\x06&r\u00DC*\x0F\x01\x00\u00F6\u008A\u00E8\x1B\u00B7o|\u00F9\u0087v\u00AE{\u00E75su*\u0081e\f\"\u00D4\u0081\u00C0HLH|@\x05\u00D3\u00E5\u00D3\u0080\u00C4\x13*F@\u00F2\u0092\u008FP\u00BC5dhHI\u00CD\u00E6\u009C\u00B1\u00EE_<\u00B8bE\u0080\u00D0\u00A6\u00E15\x10h\x04s\u00EC\u00C4\x04\u00FC\u00C5\u00FAY \bB\u008A\t]sk\u00CD^\u00FE\u0092\u00D5\u0099\u00DD\u00F7GN\x0E\u0085\u009Dk\u00D4\u0086m(\u00D6\u00BBy\x07\u00B3\u00EE\x14\u00E3n\u00B1v\x02j\u00B6^\x03'\u00D2\u00E8B`\u00C8=2\x06.\x7F\u00F3\u00BA\u00B3S\u00F3\u00D4\u0083ag\u00E5\u00D1\x05\b=\x17\u0098%\u00D0H\u00CB\u00D8\x1C\u00C3\u0080p\u00AD\x05\u00BF\u00D7\x15\u008F\u0090\x1E\t\x04\u00B1\u00B8\u008C\u00DDj\t\u00F0\u00BA=_\x12\u0091\u00F8.hY\u0089]\u00D0]\x17\u00B5y\u009Ex@z\x1B\u00DD\x15\u00DF\u0088\x14T\u00A1\u00DB\u00DE\u00E9aK(\x05\u00BB&\u00C7g\u00A8@\u00B9\u00AF&\u0081\u0089\u00EF\u009F\u00CA\u00A6\u00FB\u00FDFj\x12\u00F6\u00BC\u00A4(\x03\x1E\u00C3\u009E{\u00CBgM%BY\u00A8\u009F\u0097\u00BF9?\u00E8\u0081PaLZ\u00E1\u00D1\u00B0Q\x10(\u00EA\u008D\u00A1\u00F4\x004\u00E0\u00E8\u00EE\x05\u0086\u00AF\u00C7\u00CBo\u00AD2\x00\u00EF\u00F1d\u00C6e\u009B\u009F\u00F9\u00DD7\u00AF\x1Dz\u00C62\u00AC\x7FI\x15\u00D2\u00D2\u00D76d%\u00930\u00C5\x0B8u\n\u00E9\u00C8\u00A5\u00D0X\u00C8l\u00A1\u00B6\u009AE\x00\u00B2\u0097\x1C\x02M\u009F<h>\\\x00\\\u00D04<\u008A\u00F0\"\u00F8}\u00BA\u00E15\u0093\u00C0\x14\u0093L44\u0095\x032^\u00E4dA\u00F1\f&\u00B9f\x13\u00F85(\u00CE\u00E9\u00C0Y*\u00D8\u00E8\u008A\u00F5\u00AEX\u0083`\u00DE\x05kjX\u0082hf\x10fj\u0096tN\u00A1W\u00B3\u00A0D\u00C8E\u00BD\x0E\u00C2\x05\u00BB\u008D\u0088\u009C\u00BD\u0091\u009A\u00E8!\u00F8z\u00C7=\x17Y\u00CD<>-\x1C\u0080\u00D1\u00B3\f\u009A\u00A8\u008C\u00C00\x10Q\u00F3\x10\u00CC30\u00A0\u0091*bp\x014k\u00EFX\u0083\u00FA[\u00F5{h\u00F4P\u0090\u0082>\u00A3\u0087\u00D0\u00E3\u00ED\u009B\x07\u00E4\u00CF\u0095\u00DB\u00E7=\u00E5s\u0080oKk\u00CF\u00E3\x0Eu\u00DF>\u00DD\u00DE\u00E9^\u00CF\x00\x00 \x00IDAT\u009F\u009C\u0084\x00\x18\u00C19\u00A2Q\u0092NrS\u00DD?\u0095\x00\u009C\u009EN+\u00C3\u00F0\u0092\u00F3`E!\u00F0\u00EFR\u00C1\x1C\u00DC\x07-\x1C\u0086\u0092\u00AAF1.\x18\u00CD\u00DBY\x05Y}\u00D2\u00A2Cq\u00F81\u0087\u00DE\u00BA\u00EF}\u00FB\u009F\u0089\u0093\x18'\u00C4C8\u00DE\u00F8Gk\x17\u00BE\u00F4\u00BE\u00CB\u00B5E\u00AE\u009E\u00E3\u0082\u00DA\u00DC\u00F5\u00AF\u0099\u0082P\x06\u00B9P\u00EA\u00DF\u00DC\u0087\u00D1\u00D8\u008DT\x06S%P\u008E\u00C9\u00C53\u00F8\x10'\x0F\x14\u00A1\u00A9\u00834T\u00E3\u00C2\u00F2\u00BD\u00D22N4\u00BA+\x17\x02I\u00DD\u00CC\x0FIK\x00\u00F2\u009E' Vz\x17S\x1C\u0081q \u00B0\u00E8\u008A\u00EDn\u00F5\r\u00CBnU\u008D\x0B5\u008EYt4\u00F2Sv\u00D5\u00B85\u00B6u\u00CF\u00D2h.\u00F6Z\u00F2\u00EF\u00AC'\x00\u00B9\n\u00AC3\x00\u00D8M\u00A9\u00E6\u00F5\u00AD{\u0091:\x7F@\u00A3\u00CEbY\u00AE\u0081\u00CF\u0084\x19\u00CA\u00B1\x1CgT\u00A0\u00C3R\u00CD\u00C6\u00AB\x11_\t\u00C0+(\x15\u00D3\u009F>\u00BD\u0087z\u00AF\u00BC\u00CE\u00E8\x1EU\x7F\u00C6\u00E9\u00F7<V\u00E5I\u00F0\u00F9\u00F5\u00E3\u009D+\u00EA/4\u00CE]\u00AF\u00A9\u00FE\u009Ep\x14\u00FA\u00CA\u00F5i\nu\u00E0\x06uN\u00B9A\u00E0\n\u00D9\u00F5\u00DE#4\u00AD\u00FBW\u00A3\u00B5b`\u00C0PZs\u00FE\x00\u00F5xv\u0096\u00ED\x03\u008B\u00C5\u00C67o\u00BC\u00F4$D\x19\u0094\u00B4\u0093\x1A\u00CF\x1Ev]\u00F9\u00D4q\u00EFk7\x16\u00D6\u009AL\u009Ada\u0091\n\u00A6e\u00CB\u00ECe \u00F9\u00FF\u00F2S3\u00DE6\u00DC\u008B\b\u00CC`JY&\x01\u00A8>\u00ECI\u0098@+0\u0099\u0090\u009E\u009ErA\x11>tz\x14\x14\u00F8\u00D1[\u008AGx\u0080p\x1Dc\u0081\u0095\u00A2\u00E9'/\x18\u0098Z\x06?\u008FY'\u00EFu\u00A8\u0082E\u00B7~\t#\n\u00C1\u0087\u0093\u0096\n\u00CA\u00BD\u0094\u00DA+1\n\u0086z\u00AE\u0094\\\u00E3L+\f\u0092\u0089\u00B0\u0090t\x13-\u00E1W~\u0082\u00E8\u00A4t\u00EB\u00CD\u0085\u00ED\u00FEy\u00F6&pr\u00CE\u0098\u0082be\u00D8\be\u00ECd;?&\tS\u0095p\u0084\x00=\u00B34\u00DA\x15\u009Bf\u008F\u0088\u00C9J\u00D5\x14\u00FA\u009E\x02?!v\x01HR\u0090N\u00AF\u00ADk(\u00CFT\x06\u009A\u008A\u0096\u00C2>\x02\x18]\u00D1)&\n\u00A1\u00D7s\u00B9qQ\u00E5\u00CA\x14\u00F9\u00EE9\u00C7\"\u00E4\\\t{\x10j\u00C24\u00CBj\u00B3\x15\x14\x0F\u00B3*\u008C8\x07\u0087\u0094\x10B\x04\u00CBG._\u00BB\u00FE\u009Fv]y\"\u00B2{\u00BCq\u00D2!\x03\x00|Hu\u00DF\u00BF\u00D8\u00FA\u00EC\u0095\u00EF__^h\x12C:3\u008B\u008E\u008A\u00DEQS\x1C\x13&!\u009B\u0099\u00CA\u00AA~\u00E2\u00A2+\u00A9 \u00C8\x17G\b5L`+\u00D0B\u00CE\u0080\u00A7\u00C7\u00A6\u00F1\u00B3_\u009F\x0B9\x00LR\u008AT\x12\u00AE(\u00A84\u00E2<NJQ`\u0092\x1A\u0092z\x0E\u0086\x1D\u00D5\u009DT\u00EE\u008F\u0088o\x07\u00ED\u00D8\u00A7\rg+\u00B0\u00BB\u009B\u00DB\u00BB\u00A6FL2r\u0092Ze\u00BB\u0083\u008C\x02\u00A35\u00B7Q\u0093\u00CA\u00ACL\u00A1I(@*\u00A8A\u00E1\u00EE\u00AFZ\b\x00\u00C7\t\u00E85\u0095<y\x0BE\u0098\u008A\u00ABy\u00F8@\u0095-\u00F0\u00B0\x04\u00A6\u00BEg0\x07P\u00B4\u00D0\u00AA\u00D5B[\u00BA\u00EC\u00E6\u00C2\u00DB\u00C2,\x06N\u0096\x18^\x13\u00C4\u008A\u00B2\u00EF\u00CE7.Q\u00CF@ u\u00F57\x14\u00C1\x15\u0098\u00D1\x00\u00F0\u00D8\x05Le(E\u00F7?0\x1A\u00C0(\u00DB*\x18\u00C6\fC\u00E0\u00F7He_\u00C3\u0096\u00D6\u0093\u00E2M\u00CC%:a\u008F\u0089A\u0098\u00C6*\x1Eg7U\u0080Q \u00DD\u00975\u00E8bD'*\u00FE\x12\u008E\u00847\u00CB\u00FD\u00F9\u009Bb\u00C49\x0F\u00E0\u00E8}\x0E_\u00B7\u00FB\u00A7v_\"\u0097\r\x07\u008F+\u00A0'0N\u00DAC\x00\u0080G\u0089\x1C|z;\u00FBe\u00FB\u0096|\t9\u0085\x12?p\u0090P\u00ACDzZ\u00BA,\u00DE\u00BB\u0080\u00A3x\x01!\u00FC\u00CD\x18\u008A<\u009E?d{!R\u00C2\x02{\u0088\u008D\u0093\u0080Z;\b!\u0080\u00E5\u00E9\u008F\u00E3\u00DA\u00F7\u009Cp\u00D5\u00F2s\x02\u00B4\u00E8e\u0097aH\x02\u0080~\u00E5.d,&\u00AAu\u00FCV7!\u00A1\u00FC\u0097*\u00D8T\x0B\x03v\u00BA\u00FD^\u00AA7[U\u0096\x1C\x0B\u0096]\u00AD5\u00FB\u00E8n\u00B3\u00B2\x11*i\u00C1i\u00D1\u00AA+l\u00EE\u00BD\u00AFD\rZ\u00C5\\@%\u00D6R\x1Ck\u00B92\u00BC)\u00AAL\u00AD\u00A3{\x11<\u0087*\u00DD\u00FD\u00F4X\u0096\f3\u00E8Eh^\x0B\u008F\u00BBpO\u00C7<0\u00C5rDt\u0093\u008A\u00B5\x1B\u00FD\u009A\u0096\u009D\u00E1TV\u008AF\u00EB\u00FA\u00D1\x1B\u00C3\u008E\x1A%\u00DA\u00CB\u00DE1\u00F6\x11}\u00EC\x16V@'tk^\u00EF\u0092\u00D7L\u00CF\u00C8\u00BF[\u00F2\u009E\u00B0\x12\u00D2\u00C0\u00BD\x0E\u00D5\u00A0k/\u00E1+Oi\u00E9\u00FE\u00A4\u00D5S,\u00B1~\u00CC\u00A7t\u00FDWC\u0086jT2T\u00C0\u00B1\u00A1\b\u0095\u0085{:\u008B\u00D9\x02\u00CB'\u00F6\u0097\u009D\ne@\u00C9;%\u00E3FUy\u00E1\u00E65\u00EF\u00FC\u00DD\u00F5\u00EDK;\u00BCu\u00D3J\u0083\x12\u00B7q\u00A8\u00C2^C\x04\u0083M\u00ECs\u009D\u0084\x0E\u008E\x15\u00F8\u00FF\x02\u0094\u00D1\u00D4\u00AE\u00F9\u00B0\u00FCyF\ff\u00BF\u0089\u00FEWaO\u00B7\u0098\x1A\x17H '\u0081\u00C3\u00E9q\u00CA\u00B1\x1D\u0081\u008E\u0090\u00A5W\u00AF\x00\u0088\u0082\u0096\u00F2\u00B2\u00FB\x04\u00F5W\u00CC;\f\\\u00EC\u0096\u0082\\S{Bk\u00DD\x00\u00C49L\u00B9\u00CC\x14\u0098\u00B9\x15\x0B\u00F2O'\u00F8\u0095)8\x16.\rE1\u0091hD\u008F!\u00AC\u009E\u0093~\u00C8\u00AB\u009F\x14;u?\x16\u0098J\u00B4{\u00ADA\x1ES\u0089\r~\x1D\x0E\u00D4\u00F2\x1A-\u00EF\u00EF\u00C0\u00A4\u00A7kE\u00C5\u0080H\x07k\u009B+\u00CC$Z\u00B99\u00F0l\u008B\u00C4\u00FD\x12\u00A8,\u00DBQ\u00A9\u00C7\u00B6Z\u008A\u009D\u00DC\u00A1\x1E\u008D\x02^{\x1D4\u0094\u00F3\u00D4\u00E7\u0081L\u00DBFS\u0099\u00EE\u00E7.\u00DB\x13\x0F2\x0FF\u00D33\u00E9E\u00E8;J\u00E1\x12&\u0085N\u00D5\u00E2OR\u008D\u0095\u00AE\\\u008F\u00E5\u0099\u0099\u009C\u0084\u0082\u00EE\u00FF6\x1Fy\u00F4]{~\x7F\u00EF\u00DF\u0097\x0Bo}f\u00A1\u008E[\u009Dv\\\x1D\u00E7\u0089\u00E8ol\x1Dy\u00F1\x15\u008B\x1B\u00FF\u00E2\x13k\u00C3:S\u0088\u00B6\u00B0ju\u00FB\x07\x00\u0080h.#\u00AF0\u00D5@g\u00D1\u00A7\u008AoO\x1C\u00A2\n:\u0085\u008E\x05E\u00F9P\u00D9\u0094\u00B4\u0096\u009BN\u00E20\u0086\x07\u00FER\x02W`\x16\u0081\u00AC\u00C3\u00AE\u0088\u00BAz\u0086'\u00AA\u00EE\x06Z\u00B6\u0081<\u0086\x04+5\u00D1`\u009F\u00AC$\u0093\u00992\x00\u00A6\u00EE\u009F`\x1C\x15G\x15X\u00EB\x14\u009C\u00A4\u00DB\u0092\u009CC\x04\u009A\u00CDE+\u00C9\u0088\x1D\u0098\u0082\u00F8\x12\x13S\x03l\x1D\u00CB\u00F7\u00CD\u00D3f\u00DA\u0081\u00A6\rc'o?\u008F\u00CB\u00A0|B\u00BD\u00F5\u00A0\u00D5h\u00C8\u00F9\\\x05VF\u00DD\u00BA\u00BD*\u0092\u0092\u00C2\u00EAy\u0098\x12\n\u009D\u008F\u00D6\u00FF\u00DF\u0095\u00E9L\x04-\u00BB\u00BE\u00E6\u00A8u\u00F00mB\u00C2\u00F2\u00FB\r\u00BAs\u0080\u00A8\x19\x12\u00A47h;\r\u00DE\x7F\u0093\u00D7\u00CC\u0095\u00A78?\u009A\x1B\u0081\u00BC\x07z\u00BD|\u0087I\u00B5S\u009FO\u009C\u0083q\x1C\u00DE;\u00FF^\u00F1\x0624-\u00C6\u00C1o\u0098i\u00E1\u00C8Z\u00F9|V\u0097\u00F7 G\t\u00B0\u00D8?n\u008F\u00DF,/>U\u00CA\x008E!\x03\u00C7s6\u00CE\u00BA\u00E2Y\u00D8\u00FBc\x1BK\x00\u008C\u0093\u00A4\u00F6_\u00B40\u00A2a@\u0093\u00A1\u0084\t\u0099u\u0098b\x06\u00E9a0\u00BE\u0095N\u00A2IZ\u00B5\u00DA\u00BB\u00A0E\u00A6#'9=\x01\u00EE\u0093\x15\u008D^f\u00EA\u00FB\u00D3\u00D2X|\u00D8\u00C0.:A&\x19\x052r-\u0086V\u00E2K\u0099Z\u00A5n\u0084\x17\u00B3\u00C6\x0E\u00A8\u00D1\u00B2\u00F07\u00EC\u00DA\x15\u0082-(\u00B6\u0094\x19\x07kz\u00BADv?\u00A2\x0B;]\u00E6\x1D\u0093,\x00\x01?\x02rK\u00B5\u0086\u00A9\x0B\u0094\u00EDK(\u00A0\u00B1\u009F$J\u00EF\u00F7\u00C9NL\x04\u00F9\u00CC\u00CDv\u00D7\x1D\u00D6\u00CBa\x02\u00DA\u00B9\x10N\u00D7\u009C\u00C8\u00AAN.\u00C2R\u00AF\u0093\u008CG-?]5\u00DC\u00FC\u00E8\u0084\u00E4 \u00AB}\u00EE l\x00\u00AA\x1Aa\u0084e!,|X\u00F6\x1E\u008DX\u00A7\u009D\u00A6\u00B2'\u00E5\u00B2#\u00C0\u00CC\u009A\u00E5\u00B0\u00BF\u00F3\u00D8\u00B9N&\u00AF7\u00DF\u00A7u\u00D4f\x18\"Xj\u0086Y\x15\u00E8\u00A6\u00FD\x02\x10^J0h\x1DxL%\u00E2Y3\x0F\x19\u00B8\u0092Y\u00E0\f~\u00E0\u008E\x11;\u008F\u00DE\u00FA\u00B1\u00FD?\u00BA\u00F7\u008AS$\u00BE6'O\u00E5\u00C1\x00\u00E0\u00AFT\u00E7/\u00D9\u00BE\u00E9\u00FD\u00EF\u009C/\x1E9\n[\u00B4W6\u00E1qx\x04\u00A5\x1E\u00C1:\u00EFL\u00AD;5ih~j\u00D4\x0Et\u00A4\u00A6\u00D5\x00\u00FDP,T\u00D9\u00DE\x7F\u00F7\u0089\x16w\u008D\x1CV\u00D4\u00DF\x1E\u00E9\u00B1(\u00C7u\u00E5a\u0096\u00CD&G\u00E4\u00AF\u00FD\u00FA\u008C\u0080\u00A38\u00A6\u00F6\u00C1'\u00C9j\u00ECh\x16@\u00B1\u00A1\u0082}#\u00B0\u00A1\u0082\r\u00F5>\t\u00DD~7\u00B5pa\u00EE\u00AE\u00EC\u008C.\u00AA[\u00C9\u00F9\u00D2\u009FfO\u00E0\u008B!\u0083\u00A8s\u00F2\u00B9\u00BD\u00BB\u00B2\u00D5\u00CB\u00A0G\x01\x15\fK\u008D\u00EB\u0095\u00B1\u00D4\x0F !\u00DE\x01F\u00B9f\u009F\x06\u0081_\x1B$\u00F8\x06\u00AB\u00F5\x0B\u00B6\x1F\u00C2Z[\x1F\u00C9\fI\u0092\u00DA\u00EC3B\x11\u00E7&\u00DD\x19J\u009EC\u0086\r\u0080fX\u00C1\u00D0G\u0093[ \u009D\u00E0\u00A6i.\u00D6J@\x05k\u00ACr\u00EDy\u00CD\u00E4.0\x1Ce\u00BDC\u00E5j\u00B4\u008Aa\u00F1\u0099\u00FB\u00F3\x1C\u00C8\u00ED\u00E0\u00F5\u00F5\u00E2u\u00A9=\u00D3I\u00DDC\u0084\x12\u00F6\u00BD\u008E9\u00DF'\u009E-\x10\u00F3\x11\u00D2\u00B1y\u00C9\u0091\x0F\u00EF\u00FE\u00CF{\x1E'\u00DF,\u008B\u00BFM\x1EOt\u009C\u00B2\u0090\u0081\u00E3\u00C1\"\u008B\u00FF\u00B2s\u00F4\u00F9W.\x0F\u00BE\u00F7\u00AA9\u00E6!\u00F8\u008A\u00B2b\u0092\u00BB\x7F@\u00FC_\u00948B*\u008Ax\x00\u00F1\u00920\x11\u00EC\x10*d,\t\u008F5k\x05c\u00C5\x02&\u00DDp\u00F8\x12\"\x04IA\x0E\"\x13?sO T\u00952\u008C\u0098^\x13\u00DB{GM<\u00EC\u00DC\u00E1\u00A9\u00F8i\u0098\u00BD\x10\u00FF~\u0084Yu\u0082T\u0083\u00DAa\u0097\x14\u00E2\u009ETa\u008C\u00D3x\u009Bno^O\u00D2\u0099\x19\u00AAD\x15`\u00B9\u00D6\u00DAX$Z\u0096\u00F1Z{y\u00FE\u00AA\x1E\x1AH\u0084\x04\u0093\u00D0\x05\u00D99it\u00E5A\u00A4^a\x169\\\u00D1nX\u00C3\u00E8\u00D7\x16\u00F5\x05\u00BE\x7F,\u00CE\x02\x0F\x05\u0090\u00EF^|Nt\u0098\u00C5\u009E9[\u009FF\u0082\u008A@\u00CA\u00BB\u00E1\u00EF\u00DE\u00F33\u00DE\u00D7\x18\u00F7\u0087l\x13\u00E7.:\u00B3.\u009D\u00DFu*\u00DD\x14V>'\x1A\x18q\u00EF\u008FF\u0088\u0082\u00DFz\u00EEW\rD\u0086\x0B\x1AaB8\u00FF+\u00CA \u00E6\x0E\x14[\u00E7\x1E]\u00C8S\u00DB\u00F3O\u00B52\x00Nq\u00C8\u00C0\u00F1\u00C2\u00B5\u00DD\x1F\u00FA\u0096\u00BE\u00EB\u0095k\u009D \u00A2\u00AD\u00B7\u00D0&\u00DEA\u00F2\x0B\u00AC\u00FD\x1A`@d\n\u00AE\x1C\u00EFg\u00CC\u00BFc\x02\u00BB&\x0E\x16\x19y\u00E3\u00AE$X\x0F_\u00B5\u00BC\u00F6\u00EE8\x02\u00BFg\u0098\u0080|\x11.(\x15\u00C0\"\u00FA|<r\u0093x\u00BC\u0099EG99\u00E9\u0081D\u00BF\u00C3:1F`\x1C\x15[\u00AA\u0081\u00ACGSVE!\t\u00E9\u00D4\x15W\u00C4\x12p\u00C7\u0086\x0E\u00C5\x05F\n\u0082\x03\u00FC6\x1F\u00B9=VHP\u009D\u00C74\u00D7\u00DE\u0090~\u00C5r\u00EC\u0091\u00E9\u00C0\b\u008CK\u00B8\u00EB\u00CF\u0090C3\x1Cpa:\u00F6\u0087\u00CDUK8R\u00CE_\u00FF\u00D6\bA\u009CX5\u0096\u00B0\u0084\u00C6\u00A0\u00FCp\t:\u0086CyO\u00AE\u00A0;\u0082W\u00C1%\u00E1j\x16\u0084Y\x18.\u00CB\u00C6F\u00B0I\u00C6\u00B2\u00D0e\x1Ar\u00E51T\u00F3\u00BE\u00EB\u00B3\x185\u00C3\x12\u00BE\x07\u00E5\x01\x148^F\u0082#\u008C\x15L\x19\u008C\u00B2\u00C0\u00D1\u00C7\x1Cz\u00E5\u00EE\u009F;\u00FB\u00CB\u00EE\u0093x\"\u00E3\u0094\u0087\f\x1C\x1FS\u009D\u00BDt\u00EB\u0096w\u00BF}\u00AD=A\u00A5Y\u00BE\x1A4\u00BC\u00B5\u00A3\x11\u0087c\u00D4\u009A\u00B9\u00DC\u00E8\x17Y\u00B4i\u00F0\u00CF\u00FDAR\u00E3\u00D6\u009A\x04`\u00DA\u00BB +\u00CD\x00\u00C0;\u00DE\u00B8\u00E57\u00FE:{\x05\x00\u00D1\u00F7\u00A0x\x0Bm\u00B2?\u00D2DN\u00BC\x04f)r\x7F\u00D5\u00A95\u00A1\u0092c\u0098\u00A0Tf<?\x04\u00FB:\u008C\u00CA\u00EC\u00A1\u00C3z\u00F7\u00B6j\u00DD\\t\x16\u00FCX\u008B2\rD\x7F6V\x1E\u0082b\u00D6\u00B3\u008AO\u00D4B\u008E\u00D6\u00DDj\u00BA\x0B>_\u00DA\u00FDR\u00A1\u00B6\x0E\u00B4\u00A5\u0086%&\u008D\u0099\u00DC\x03\x16[\u00D1\u009D\u009F\u00A9`\u0090\u0092\u00F9@\u00F2\x02\u0086\u00F2w4x\u0081_3\u00B3\x11\u00B4\u00BA\u009A\u00D9\u0083\b\x1DT\u0093\u009E\f\u00CD,\u008A\u00B6\u00B0\u00A2k\u00A3=K\x16R!0\u00A0\u00F4\u0098\u00E2\u00FF=\u00C9a\u00E8\x02\u0095\u00CC\u00D0\u00D8sS\x10\u009C\x1E\u00BA\u0084\u00EB\x0F\x14O(\u008E\u0085r\u00ACr\u00BE\u008E\u00C825\x05\u00DA\u0092\u00F3/\u0097\u0096\u009B4\u00A8!\u0088\u00DDK\x18\u00E1\u008A\u0085\x18B\u00E5\x1Btt\x1Cy\u00C8\u00E1\u00F7\u00EE\u00F9\u00A5\u00BDO\u0092\u00AF\u0095\u00E5\t\u0088\u00E3\u0097=Ny\u00C8\u00C0\u00F1P\u0091\u00E5\x1B\u00FA\u00E2y\u009FYn~\u00F0\u00CA\u00B9\u009E\u009D\u00CEv\u00A5*#?#xR\u0084\x7F\"\u00EC>y\u00BA:\u00D3\u008B\u009AT\u00B2\x12\u00CE\u00F6\u00F1\u00E3\u00D6*\u00B4\x0E\u0098\u0092\u00D0xA\x14\u00C2\u00EE\u00BF\x03\x04*iC\u00BAp\u0091)p\x173\u00B2\x18n\r\u00A8\fX\u008D\x06\u0094}9\u00C9c;qE\u00E3\u00E7u\u009FX}\u00E2o\u00BA\u00E0\x0Fn\u0099\x07\x17\u00D8@\u00C4{*(\u00F1,\b\u0095^\u0084\t]\u0082\u00DA\x1B\n\u00B1kL\u00DAT\u00AEN\u00CEr\u00E5A\x0B\x16\u009F\u00F93\u00ECJw\u00D5\u00AC\u00B0\x02V\u00B8\u00EA\u00F7\u00DCk\x00\u00D83t\b\f\x07)\u00F8\u00D1\u0097B\\A!\u0089`\u0082L5*\u00A4\u0084,F\u0081\u00B6\x10\u00C2\u00F1\x1Ca\u00F6$[\u00A13\x05\u00D8\u00E9\u00F9i\u00A58O\u00E7\t\u00C3\x01zk\u00DC\u00C7\x04\u00DD\u00F8\x06@n\u00CBP\u0086\u00EB<D\u00F8\u00EA\u00CF\u00BD\u00C7v\u0099\u0091\u00EA\u00E1\x1D\u0092\u0091\u00C8\u00FBp/\u00C4\u00B1\x14z\u008D\u009D\u00CFbr\u009D\u00AE,\x04\u00D8\u00BC`\u00E7p\u00FB\u00B6\u00D9\u00F3n+e\x00\u00DCF!\x03\u00C7\u00F3\u00DA\u00FC\u0093\u00FFP\u00DBw\u00EF]v\u00A86t\u00E7 d\u00C5\u00A2)\x07f\x00\b\u00BCU\u00D2\u0091\u00BDD\u00CD\x17\u00A0\x12\x02\r\u00D0\r/\u00F1\u00BA\x02Q@\u00E2\u009E@-@\u00AA\u00AE\u00BA\u00F6\x16\x02$t\u00F5\u00FD\u00A7\u00E6\u00E4\x03{\u0088\u00FD`\u00EB\x10\x04XG7S\u00F2\u00FA\u0098\u00B9(\u00FB\u00D52\u00EC\u00F0S\u00C1\u00FB\x15`\x14\u00EC\u00A8`\u00A7{\u00D8\u00E0!DE\u00C6\x17=\u00DD\u00EF$\x05\u00C1;9\u00BBP\u00BB\u00EBonrG\u00AC\x7F\u00D03\u00E41\u0097:q\u0096\u008Et\u008F{\u00D9\u0096n\u00EF\u00B2\u00AB\u00AD)\u00E1J\u00C3B\x17\u008D\u00CCE\u00D4\x1Dhn\u00C3\u00DB\f\u00C5\u00A1\u00B9\r3\b\u00B9\u008C\u009CN~/\u00BBb\u00A1\x1A\u0099\u0083\\\r;\u00D7\u00A5X\u00D6c)\u008E\u00C9\u0098L\u00B2\x03\f\u0085\u00F8\u00CC\u00EA\u00F5\u00F6\u00BCft\t\"W\r)\u00F8\x7F\x1A\u0081\u00B1\u00DCk\u00BE\u008FZ\u008B\"\u00E55K\t\x192\x1C\u0089\u00F7\u00E1\u00D3 C\u00CCcA\u00C5\u00ED\u00F5m\u00E0\u00EF-\u00BE\u00FB\u00EC\x1F>\u00EB\u0093\u00A7L@\u008F3n\u00B3\u0090\u00A1\u008E\u00E7\u00EE\x1C~\u00C3o\r\u00F2\x1D\x0BY\x07 \x13\u008A@\u00E4\u00A7)<@\u00B8O\u00B5\u00F5y\x05\x05iU\u00A8\u00E5\u00CD\x05v\u00F7\u00BF\u00A2\u00B6.p\u00E6v\u00B5\u00CCR\u00C4\x04(\x00\u00A2z>\u009CV\u00A9\u00E7\u00DFD\u00E0#\u00DB\u00E0\u0096(\x1A\u009A\x14\u00AB\x1B\u00C0\x10\x15\u0089j\u00B8\u00B3\u00DA}\u00A5g\u00B0\\\u009Ai,\u00C0L\u009EY\u00B15U\u009C=\x02\x1B\n\u00EB\u00AA\u00D4\u00D3\u00BD\u009DuC\u00F4\x07\x18]\u00D9:+%uwp\x0F\u00A3uX\x7FD\u00BA\u00C1c>\u00C7\u00EC`\u00ACAUV\u009F\u00D9m\x14\f\u008E\u00A5p-D\u00D1\u00CC,\u00CC\x15IM\u0086F\x06\u0082\u00FD\x14\u008D\u00ACna\u00C1\u008C\u00E7\u0081\u00B9\u00E4\u00E1\u00C2{\x16imi/7\u00C3\x04\u00C1L\u00D3\u00927d\u0086 i\u00C2\x12\f\u00D4\x19\u00AD(\x18\u008E\u00AC\x10\u008B:\u00C3\u0081\u00E9\u00F9\u00E9\u00C50\u00A5<\u00F4\u009CO\u00B1\u0096Ex\\\u00C9\u00E7\x10d\x17%\u0086\u00B4\u00ADO)\u00CF|\x07@\u0086\x12\u00B5B2B\u00B7\u009E-\u00F3\u00F8\u008Cj\u0088R\u00A9\u00CB\u00A3(\x0E\x7F\u00ED\u00E17\u009E\u00F3\u00EE\u00BD\u00CF;!\u00C1\u00BB\x15\u00E36\x0B\x19\u00EA\u00F8W\u00F3\u00B3^\u00FC\u00D9\u00A3G\x1E\u00FB\u009E\u00F5\u00FE \x1Df\u00E1~\u00CAD \u00FD\x01\x14\u0081\u008A%\u00D1\u00FDe\u00A8\u00C9}\u0080v\u00DD_\u00BC\u00C2\u00E22z\x17&l\x1D\x19&4\x10\u00F5\u00B6\u00EF\u008B;\u00C8\u00F3\x15mL\u00AB\u0096D\u0093\u0095\u00EB\u00F4c\u00F0\u00DA\x18J\u00A4G\u00A0yl^\x7F\u00B7\u00C9l\nM\u008A\u00D2h\x06r\u0096s,\x14\u00D8D\u00C7L\x1B\u0096\u009C\u0098>\u0081:\u00CC\u00FAL\x14O\u00F9;p\nZ\x1E\u008F_\u00B53\u00BE6\u00EB\u00D8 \u00C17\u00E8\u00BCV\u00FE\u00BF\x1C\u0087\u00E4,q%\u00BC\x14\u00AF\u00C3\x00B0\u00FDQ\x068I\u00AF\u008EY\u0099\x16\u008A\x02\t\u00AA\u00C1\u00EEk\u00E6\x19'\u00C0\u00DE\u00E7RS\u00F0\u00C5-.\u00DB\u00A5Y\u00C8 \x11>VRQ5\x0E\x04\x7F\u00C5\u00CF\u00A3\u00FE\u00BE\x18\u00C2\u0091u)\u009D\u00DEN*\u0081t\u00D5\u00B3n\u0085\u0099\u0086\u00C8\u00C8h\u00F1|4\u0085\u009D^%\u00C3\x07Z\u00FFZc\u00D1\x03[r\x03\x03\u00F8j\u00E0\x00$C&\u009B\u00E8@oKl\u00DE\x7F\u00F3\u008A}\u00FFr\u00CF\u008B\u00F1\u00EE[#}'6n\x17\u0085\u00F0u\"\u0087\x7Fe\u00B1s\u00D9\u00F5\u00CB\u00F1\u00CF\u00FEZfg\u008D\u00E4\x19\u00C4\x0BP\u00B0\u00F5\u0098\x14\u00CD\u00C8\u0087\x1E3\u00A6hb0\u0096\u00F4\u0097\x17}\b\b\u00EE\u0085\u00DB\u00E5\x0F\u009F/'\x00I\u00A4\u00A7@\u0081\x02\u0092J\x1A\u00E7\u00D7\x10\n\u00F8$\u0099\u0080\u008BeB&\b\u0084\u00D8?\u00D9\x7F~\x1BJ\u00EFG\u00E2>\u00AA\u00A2\u00A1\x17\u00B4\u00A3\u0082-L\u00EB\u00FE[U\x1C\u00DA]\u00C1(\u00E0\u008D9\x06\u00BF\u009F\u00A5\u00D2\u009B\u0090P6\u00E1\u00C6\x17w\u0094q,\u00C3%\u0082\u00AA|\u008E=\u00C22o\u0094\u0082d\u00E9Q \x15\t\x1A\u00F2s\n.i\u00C2\u00E6r'\u00AD\u0099\x19\u0082\u00DE\u0081\u00D11\u00A0\u008A\x1B\u0090?\x10\u0082\u0085\x14n\nce\x05N\x18\u0081\u00E4\u0086\u00F0\u00F9#\u00BDB\n}\x02\u00C79\x07\u00EA1L\u00A1I\u0080\u00B044\u00AD\\;\u0085\u009Fn\x7F\u00E0AZK\u00E0\u00D3\u009B\u0088g\u00DE\u0099X\u00D7\u00C8@\u0091UY\u00E7\u00BB\u00DD\u00ABb\u00FB\u00DC\u00C5\u0091\u00E5S\x16\u0097\u00C9s\u00E5\u00F0\u00DF,a\u00A7n\u00DC.!\x03\u00C7\x0Fnm?\u00E7u\u00D2\x7F\u00FD\u00C6\u00F9FX\u00B5\u00C0\f\\\u00F8d\u00B4K\u009A(\u0083\u00D5\x1F`j\x195_\\Xh\x07\x07M\u00D8[\x1E\x0FSl\x00e\x7F\u0081B\u00DDm\u00A7\u00F5\bBIy\u00A1q}\u00E58i\u00A1\u008BBb&\u00A2O\u00CF3Qvq\x1F\u00EA\x12F\x0Bh\u00C4\u0099\u00B3\x15\u00D8\u00A5\u008A\u008D\u00D1\u009B\u00AC\u00AA-\f;S\u0089\u00D0 \u00C2\u00841\u00D1\u00FA\u00E6U\u008E\u008D\u00D5t>\u00F9\x06'1\x11\u009C\u00D4n\u00A1E\x00\u008C\u00DA\u00CC\u009A\u0095n@<\u00AE\u00887\u0080\u00D5\u00CC:\b\u009C(\x05\u00ADkrg}\x054\u00DB\u00B1\u00FBs\u008A\u0090E\u0081Ah\u00B1\x11\u00A1C\u00A0\u00FFE\u00A0'\u00D5\u008E\u00E5\u00F8\u00F1\u00B9\u0083y<6\u00CA\u00FE\f%\u00F8^\u00E9\u00FD\u00CDz\u00BE\x076\u009A\u0099Tb\u008Ei,\u009A{}\fE\x18:@\u00E9=tW\x12-\u00CE3x\u0096LF\u0086oTh\x06(G\u0095\u00AAf\u00D8C\x1EK\u0083b\u00B9k\u0081\u009D\u00A7\x1F}\u00EE\u00BE\u00DF<\u00F77n\u00BD\u00D4\u009D\u00D8\u00B8]\x15\x02\x00<\x7F\u00FB\u00C8\u00CF\u00FE:\u00D6\u00BEw\u00C4,d\u0086\x16i\u00E2~\x13\u00A1\x05Bp&\u00CB\u0083\x15aLP\x06\u0091t'\u00BAkB\u00DC\u008A@j\u00E0\x11t\x0B\u00AD-\u0098\u009F\u00D3\u0089\u00FA6\x11<\u00EE\x0F\r\u00EE\u00A9BZ\u0098\u00E3\b|]\u00E3\u0081\x16\u00825\u00FF\u00C7x:\x1E\u009F*\u0089\x02\x1DY2\u00EB\x13\u00DE\u00D6oP[\u00C3A\u00815\u00C7\x00\u00E6H\u00C1\x1F\u00D4\u00D2r\u00C3\b\u00B0\x0BsS\u00EF\u00BAT\u0094&\u00D4R\u008D\u0099\u00A5\u00F0\u00F3,M!\u00D4\u00C5C\u0086\u0091\x1E\u0083F\u00B8bBo1|\u0093d\x1E\u00CE\u00BA\u00E1\n\r\u00885\x17\x06%k1k4\x04H\\\u0081\u00CA\x01S\u00C1W\u00E4\u00CAUA`\u00D7\u00F4\b\u00A2;SG4\u00A6\u00AD\x05R\u00A1H4\u0085\u00BBi.e\x17)Cn\u00E7\u00F3mV\u00B8+\u00C1:,\u00EFp\u00D2]\u00C9\u009F\u00B5\"=\x05\u00D1\x1E\u00CF\u009E\u00F8R%\u0083\u00D5\u00B4%\rY\u00AClU\u0094W\u00CC\u00F96b\u00F3\u00D2\u00A3\u00AF\u00DA\u00FFG{\u00FF\u00DD\t\t\u00D8I\u008E\u00DB%d\u00A8\u00E3%k\u00BB_v\u00DD\u00D1\u00AD\u0087\u00BD}\u00C07J\u00B7\u00D3'\x1BP\x01\u00C6\u00D7!p\u0098\u00B8\u0086\x15\u00B5N\u00E5\x01D6!\x18a\u00C7\u00D2\u0098\u00A3\x1E=\u008E\u00EFB^\u00D2C\u00D9\tI\u00D3\u00F2\u00C3<\x03U\u0098\u00C0\n\u00DD\u00C5\u008C\u00FB'\u00E9\u00A5r\u008DUq\u00F0\u00B0qo\u00DC?\u00E8\u00AA\\\u00C6\u00DB\u008E?*\u00B0\u00A5\u00E6-4\u00A4\x0B-=Kn-\u00A4\x10g\u00C9\u00E9\x04\u008Cb\u00E8P'!3\x05\u00E1\u00CAr\u00E1\x11\u00AF\u00924\u00CCAb\u00DD\u00C4\u00C0\x12\u00EC\u00AA\x02=wq0\u00D7\u00B6\u00E7k`\u00EB{\x03N1q\u00DF\u009B8k\u00D1\u00DFE\u008D\u00FF\x13W\x02\x14\x12\u00E4\u00A9\u00DA\u00E0&R\u00BB\f\u00954\u00D7\u0086\u00ACJ/\x04]3L\u00E0\x1C\u00C1X\u00D6\u008EPs\u00F7!EI\u00F2Zy\u00FF\u00FE\u009B\u0085i\u008A\u00A2\u00DC\u008B\u00B0\x0F\u00DA\u00B28\u00AB\\3\x15}4\u0084\u00F5w\u00D3\u00D4l\x17\u00D9\u0098\x13\u0082\u00BF(\u00B6\x1F\u00BE\u00F3\u008Es^\u00B5\u00E7ex\u00C4\u00DF)R\u00A7t\u00DC\u00EE\n\u00E1Q\"\u00E3\u00DBT\u009F}\u00F3\u00E1\u00CD\u00FF\u00FB\u0081\u00D6.\x01$\x1E\x12 \u00FE\u00F0s\u00A5\u0087hP\u00C2\x17\u00EFnX\u00C4\u00DD\x10D\x1FEmeR\u00C81\x02\x1A\u00AC\u00C1\u00F0,\u00F2\u00E50\u00A5\u00A9\u00F5E\u00FB66\u00D15C\x04\u009E\u00DA5<\u00CA\u00FE\u00D3x\u00B6\u00A4<y\u00FD\x1EVT:sN\u009E\x04\u00BAx\x1D\u008B\u00B1cP\u00C1\\\r\x0FX\u00F85\u00AF\u00F1\u00FE+8V\u00EE1Ro\u009A\u00CDGxL\u00F2\nH\u00A9%\u00B8%\u00CE\u00D8\u00E4\u00C4fZ\u008D(x\u008F\u00DF\u00EA\u009C\x01\u0085\u008A\u00E3\x0B\u00DA-\u00CF\u00E3\n,dA\u00DD\x13So\u00E7\u00EE\u00CF\u00A6Y\u0080\x16B\u00AF\u00AE\x11\u00D8<\u0095\u00D9\x19>\x0B\u0086\n\u00CB\u009Ea\u0081\u00A5\x05{\u009C\u0093\u0095\u00A2y\u00BF%\u00C3\u00E3/\u008D^\b\u00A7E\u00BC\u00BF\u00FA\x1E\u00FC\u00DE\u00C7\u00E2\u00E1q\x15(f\u00B4\u0080\u00F4`b>h\u00C1\x18\x14\u00A1\u009C[7\u00E6\u00A7\u0091\u00E0\u00FC\x19z\u00A6F\u00CBo\x00\u00E8}\u00C4\u00E2+\x0F_\u00B9\u00EFE\u00BB\u009F-\u008F\u00B8u\u00AD\u00D4Of\u00DC\u00EE\n\x01\x00\u009E&r\u00F3\u00AB\x17\u00DB\u00CF8tt\u00FB\u00CF>\u00D66\x0E\u00F0%\u0085\u00E0\u00A2Z\u00F6\u00D2\u0085\u0086\x13$\u00B6\u00D5\u00B0\u00C4\u00B4x\u00B5 )\u00ADr\x11\u00C0\x12f\u00C4q'\x1A_CYh9G\u0086\x19+\u00D6\u00C8\x15\x05_\u00F6$\x05\x19\u00D7\u00AFay\u00C8w\u00AF\x13PBy \t4\x11\x12\t\u0096\u00A3b\u00E1\x13)]\u00DE\u00AC\u00C3\u00E7\u00FA\x0B\u00A1\u00D8\u00FA\u00D4%>\u00E6\x1E\u00A9\u0098\u00A2\x17\u0080\x04:\x1F\x18\u0088\x13\u0093\b4Z\u008D\u0082#\u00EE*\u00DE\u00EC\u00C7\u0098\u008A\u00BD\x03\u00A1\u00F0\nV0bZ\u008A\u00DEt\u00F5=\u00DA\u00E7,~\u00A2\u00D5\u00B6\u00F7;}\u00DEI\u00FCq\u0090\u00D1\u00FF\u008E\u008CMy\u00E7\u00E4<4'-Qqg\u00EF\x0BW\u0088@d<\u0096\u009A \x1FT\x03\u0093H\x0F\u0086\x041;\u0099\u00FAs\x1F\u00E8\u0089N\u00DE\u00A9\u00960\u00C1\u008D\x12\x14u\u00DE\u00F1\u00B8\u00EE\u00A0\u00D8\u00B9\u00A4cy\u00AF\u00AD\u009B\u00E4\u0099\u00B3g\f/^\u00BB\u00F9\u00C4%\u00EB\u00E4\u00C7\x1D\u00A2\x10\x00\u00E0%\u00F3\u00F5O\u00FD\u00A7\u00AD\u009Do=\u00BC\u00B9\u00FC\u00C3\u00AB\u0086\u00D9F\x15\u009E\u00AC\t\u0097I\x18\u00C0\u0087m\u0093\u008FT\u00E3d~U%\u00C1c\x01\u00B0\t\u00E1\u009A=\x15\u0086\u00BB\u00C8\x13\u00C4\u00B9f\b4\u00CEy\u00BC\u00E2$(_6{(\u00F8\u00A9\x03\u0084\u00AC\u0093D&\u00C4\u00A6\u008ADW`r\u00F2\u00D3\u00F3X]\u009B)\x04\u00B5\u00DC\u00FF\u008E\x0Bt\u00E3*K\u00CA\"\u00A8\u00E3\x1C\u0097n/\x05h\u00AC\u00CA\u0082J\u00A0\u00D6kHxC\u00D1\u00ECe4\u00C1\u00E3\u00E3\u00A5@\u00AA\"V\u00C3c\u00A8\u00C7\u00EF\u00CC\u00BF\u00CB\f\u0082\u00F8kc\u00F8Q\u00F1\u00A1d$\u00A6\x17\x12\u0082\x03D\u00E8U?\u00D7r\x1E\x14%BA\u00E5\u00FD\u00A8\x7F\u00CF\u00D0#\u00C2.Me\u00AC\u00D0\u00C8\x14X\u00EC\u00EF}%}\u00DE\r\u00AE4l.\u00E5<\x0BP\u00B1\bx\u00ADUi\u00E5\u00BD\u00B7\be\u00F3\x19\u00D9\u0083H\x0Fa{\u00EF\u00E6\u00D6\u00DAS\u0096\u00DF\u00BA\u00FF\u00E7\u00CF\u00F9\u00D4\u0097#C\u00B7\u00C5\u00B8\u00DDA\u00C5\u00D5\u00F1\u00FD\u0087\u00B6.\u00FB\u00E5\u00A5\u00BC\u00E9\u00A0\u00CCm\u009D\u00D1\u00D1\\\u00C9I\x1F\u0082x\u00F1\u009A\x02\u00DD;Zw\u00A7\u00AD\u0082|\u00A5\u0096`\u00D5\u00AA\x0B\u00DC\u009A\u0085\u00D0\u0090R\u00AA\u00A1\x1CZ)~\u00A1\u00D5;f\u00B9-N\x06W2\u00ADX%\u009D\x1C\u00FF\u00D8\u00BF'\u00BF;\u008E\u00F1(2\u00BB\u0091\u00F1\u00A8\u00AA-\u00CD\u00BE\u00A6\u00C0n\x15\u00CC\u00D5\u0097\x7F\x1B\u00B9X\u008B\u00F74\u00EC$)e1W\x05\u00C2*:.\u008A\u00E0\u00DA\u00B3i\u008A\u00A8\u0081\u0094\u00EA\u00CAbX\u00A6\u0095c91\x17ba[\\\x02\u0085\\\u00C8e\x10\u0099\u00D46\u0088f\u00BBvZ\u00E5\u0086\\\u008A\u008E\u00E0\x1AC\x02\u00DBOJ\u00A9\u00F4\nP\u00E8\u008AAx\u00DD\u00FCL\u00E9A\u00D1\u00DBI\u00F4>j\x19\u00C0X\u00BE\u0086\u008A\x1A\u0099\u008D\n(\u00D6mf|\x0F\u00DD\u00B2;Tj\u00CC\u00D8X&\u00C6\u0095\u00DF\u0098\x00&\x17\u0096\u00D5r\u008D\u00F5>\x04\u0096e\u0081*\x16g\u00ED\u00F4\u00E1\x1F,\u009E}\u00D1\u00E5{.?I\u0091:\u00A9q\u0087+\x04\x00x\u00E1\u0097\u00B6\u00BF\u00FB\u00F2e{\u00F5!\f\u00E9\t\u00C0\u0080.s\u00B3\u00BD\u00E0\u0086BJ\u00A1\u00EC\x00\u00AAu\u00F6mk'\u00A5t\u00913\u00F4\u0098\u0084\x02L\r\u00ADz%\u008AH1\u00D6\u00F4&\u00B1\u0081\x10\u00F4\u00C2YXm\u00B0\x1Ay\u00FD*\u00F4+\u00C7Ze9\u00C66=\u00F3\u00DA4Om\u00EC\u00D8\u00E8\u0082]\x00\u00D6\u00BB`}\u00CC\u0095\u00A2C!t\x16>\u00D5\u00F0\x02\u0099\u0092\x1CY\u0091\u0089\u00F81\u00A5\u0090?P@GE[d\u00A3R\u00AE\u00CD\x10\u00A4$\u0098\u00A0\u00CF\u00D0r\u00B2\u00C3W\u008Bv\u0090\u00CEX\u0089\u00DE\x10\u0096\n\u00C1\u00B7#\x0BQ\u00B4d\x1E\u00E0\x19\x12\u0094^\x04(\b\u00BF\u0094\x15\u00AE\u00B9?\u00AC\x1E\u0080\u00AC\u00C2X\x03\u0092\x1E\x0F\x18\x16\u00A5r\x10?\x16\u0095\n\u00C0\u00E7u,\u0087\u0080d.\u00BE\u00F3\x19\u008B\u00AB\u00D4\u00FB4\u0094U\u00B7\u00C9n\u00E4\u00DFdM\u0082\u00D7\x00\u00DEg^[\u0083\u00A0\u00AF\u00ED\x00\u0097\x1E}\u00C9\u00BD\u00DE\u00B6\u00FF5\u00A7B\u009ENf\u009C\x16\n\x01\x00^t\u00CB\u00E6\u008F\u00BC\u00E1\u00A8\u00FC\u00C7\x1D\u0099\x03hnm]h]\u00E3G\u00E5\x17\x1F\u00B43\u00C9\u00C2\u00E5W$\u00E8X\x05?\u00D2i\u009A\x02\x16\u00F1&\x17T\u00B1s\x19kM#\u00ED\x18 b(!)\u00D7\x04\x18\u0093\u00AD\x1C\u00D7'\u0098)\u00A6\u00964l*\x11fS\u00FC\u00D8t\u008B\u00E9E\u00E4\u00F2]~\x7F\x00\u00D8[AF[\u00EAm\u0097\n6\u00C4R\u0090\u00EBN\u0085\u00AD\u009E\x02\u00C3\x03\u00AB\u0086\u0094\u00E8\u00B3h\u00FC\x02\x13\u009A\u00A1TG\u00D2#hK$\u00FBpt\x0FA\u0081X\x17\x11\u00DE=\u00D9\u0085w\u00A6\u00E6\x11\u0090\x1A\x1C\u00A9G\u0094&&\u00C8\u00CA\u00C7\x14bL<\u0084\u00B0\u00FA\u00FC\u00BC\u00E7\u00B6L\u00F9\u00F2\u00BBJC\u00B6\u00FD\u00F3\\\u00D0\u00E9\u00F1\u00AB+?I7\u00F6\u0082\u00E8\u008F+\u00DE\x06\u0089CE\u00B0M\u00C8\u00ED\u009D5\u008F\u0093\x04l\u009E\u0092\u00FD\x17\u00E3<\u009DJ\u00C8\x19\u009E\u00C8P\u00C9\u00B2\b\x12\u00F7\u00A0\u00C3\b\u00BDt\u00F3G/~\u00C7\u00BEW\u009C\x021:\u00E9q\u0087a\b\u00AB\u00E3\u00C7\u00F7l\u00BC\u00E2\u00D0\u00CE\u00E1}o\u00DEi/YHKk\t\x14a\u00AB(~\u0092\u008D\"\u00C5\u00E4\u00FFW\u00D4\u00CF+O@\u0082\u00F1\x16e\u00BF!\u00F4\x068\x11\u0095\u00AE\u00E0cZ\u008C\u00FC\u00DC\u0080.\x05J\u0096\u0084\n\u00C2\u00BC\u0085\u00CCC\x13S\u00C8\u00D0A\u00F2:QB\u0083h\u00B2\u0099%\u00AFZ\u00D8\u0089\u00B6\x00\n\u00B0\u00ADe;\u00AFu0\u00DE\u008B\x1D18\u00FE%nm^*\u00CC~\u008A\x1D)X\u00E2iO\u00A3\u0082k2\u00F4 N\u00DE\u00E9\x01\u00C4\x01\x1E\x1B\u00FB3dzp\x1E\u008AQ!\u00AE_\u0089\u0098\x11$n\u00AE\u0088#{\x00\u00A0\u00C9\u00B4\u0084=>\u00E7\u00ABG\u0089\u00FF\u0081\u00D8\u00D6\u0096Z\u0093\u00C9<!\x01\u0096\u008B\u00C8\u008E\u00E5\u00DD\x05\u00B0\u00D8\u00ED\u0099\x1A\u00CC'\u0091\u0089`\u00DF\u00C9\u00CA\u0094\u00ED\u00A1\u0098\u00E1\u0098\x05\u0095t-\u00A5\u00F6K\u0098xZ\u00CC\u008C\x15\u00E5\u0094\u00CE\u00A6\u009F[\u00D1\u0087\x1D\u00B4'\u00ED\u00BC\u00FA>\u00AF\u00DF\u00F7\n\\\u00F4\u00E5H\u00C9m?N\x1B\u0085p\u009E\b>\u00AD\u00FA=;7n\u009D\u00F5;\u00DB\u00ED\x05#Z\bRX]\n\u00BC\u00CF\u008C\u0089;\u00DEsB1\u00EE>&\u00B3\u0080\u00F4\x1A\u0098R\u00C4X?\u0087\u0083K\u00C7Q2=\x15\r4\x17\x04\u00A9^G\u00E0\x18\u009A.y\x02\u0096\u00B9\x7F%)\u00D5\u00ED\u00ECo\x07HyM\u00BC\u00EF\x0E`4%\u00B4tr\x14\u00BB.\u008F\u008E\u00EC\t\x10\u0098K\u00F3\u0090c\u00E8Rp\r\x16\x0E\u0089O|\u0086\x04\u00F4V$B\"[\u008CE\x03\u00EB\u00B0\u0094\u00A2\u00ED\u00CF&\u00ABK8\x1E\u00E0\u00BC\u0081P\u00A6\u00C8\u00F6e$\x18(\x15\u0096\u00AA\x0B\u0097\x1Dz\x06\n^\n\x0F\u0095\x11\u0090\u00EF\u008E\u00E0!\u008Fk\u00AE\u00BD)N\u00AB\u00F0\u00B40 C1\r\u0081\x1CF\u00D8\\(\u00C7Su\u00E2TyG\u00CD\u00EB8\u00F8^\u009A\x1B\n\x05\"$\u00B1\x05]\u00EDb\u0082\u00A7\x10\u00FB\u00C3\u00B1$g\"\u00A24^u\u00D0U\x01H\x13`Xb\u00FE\u00D8\u00E5\u00AF\u00DC\u00FB\u00F5\u00FB\u00BEG.:m\x1C\u00F5\u00D3G!\x00\u00C0\u00FDD\u00F4\x13\u00AA/\u00C2\u00F5\u009B\u00B3\u00B7\u00EC\u00AC\u00FD\u00B3Q\u0087\u0089P\u00860u\u009F0\x13eP8\x07\x00&H>\u0090\u0093\u008A\u00E9\u00BD\u00C2O\u00E0\u00F7S \u00CF\u00AD\x050\u00C9\x04hy\u00C1\x14\u0094p\u00FD;\u00A2b1\u00EA\x17\u00A8m\"\u00FCI\u00A6\u00A3\u00E1\x04\u00D3\u00FB`\u00B8`\u00BB\u0099\u00B0NR\u0095]\u00C2\u009A-4\u009B\u0090p1\x17\u00E6\u00BCSY\u00B2\u00CE\u00C3\u00EEw\u00E6\u00A5\u00C49y\x19#'\u0088\u00DB=\u00AC!\u00EE\u00C24\x1A\u00DB\u00A7\u00C5\u00F4us\u00DEDaEGt\r\x10\u00D9\x18\u00EA\u00C8 \u0091\x05W\u0081\u00E8\u00BD\x1D-:L\u00F3=#\u00AD\u00BC\u00BA\u00F0\u00C7\u00F9\x19\u00EA\u00F8{k\u00AE\u00EC\u0098\u008D\u0088\u00E5\u00E74\u0081F\u00B6@\u00B3y\u0090\\\x0BhR\u00AD\u00BB\u00A6W\x11s\x00\u00A9\u00B4\r_\u00EA!\u00D8\u00AD\x18+\u00DE{\x16|\u00D1\u008B\u00F2g\x03x\u0093 {\x18k\u008F\u00DA\u00FE\u00B5{\u00FF\u00CC\u00DE\x17\u00C9W\u00C4\f=-\u00C6i\u00A5\x10\x00\u00E0\u0081\"\u00FDJ\u00D5\x17,\u00AF;\u0082?\u00D8\u00DA\u00F8g\u008B>L,\u00FCd\u00B1\u00CB\u0089\x15\u00972\u00F9\u00D3\u00BD\u009B\u00E0\x0B+J\u00A3\u00BA\u00AA5\u00E7\u009C_f\u0098\u0090\u00C7\u00D1\u00DC\u00AE\u00B8\u00E4\u00D5KY\u00BD\u00B6\u00C95\x04\u00FB\u00D2\u00FB'\x14\u0092R\u00E0\x14\u00A1\u0090|?\u00BA\u00FBE\u00B8G\x05\u00B6\u00DD\x1BI\u00A5S\x14\x1A-\u00BB[|z\x19\u00F4\u0080jX\u00D3\u00BBD\u00F6\u0081\u009E\u0085\u00B8\u00E2\x19\x01_,\u00D6n7\n|\u00F8l@\\6\u009F\u0097\x02\x18]pjHe>\u00BD\u00DD?\u008B\u009CF ,wM\u00E3\u00C5\u00A3.\u009Fu \u0084\u00D1X\u009A\u00C5\u0093\u00A2\x07\u00E6\u00F7\u00DD\u00F8\x1DX\u0081\u00E9\u00D6\u009A\u009EB=n}\x7F\u00F1\u00DE40\x1C\u00E2\x0E\u00E9\u00B1\u009AR\u0089\u00CAN\u00BF\u00F6\u00DE\u00F9\u009D\u008D\x0EWr>UZ\x17,gK\u00CC\x1E{\u00F4\u00D7\u00BE\u00EAU\u00FB^ _\u0093\x1C\u00D0\u00D3e\u009Cv\n\x01\x00.\x11\x19\u00FFJ\u00F5\u009F\u00CF\u00AE9\u00B2|\u00EB\u00D1\u008D\x17,\x1C\u009C\u009B\u00F4\u009E+\x13(x\x0B\u008A\u00A8E\u0088\u00859B\u00D0r\u00FF*\u00A0\f=\x18&\x103\u00E0[\u00D4\u0095s\u00C5Lu+\x1C` \u0090@ \x05\u00CEc\u00D5\u0089\u00F5\u00E7D\u009Bx\f\u0088I\x18\x1Dr\x14e\u00D5\u00E8\u00B4fp\u00D0\u00B3wk\u00FB\u00CD%\u00CB\u0088\u0092s\u009DG\u00A6\x1C\u0087\u0091\x16\u00DA\u00CEC\u00F6\x1D\u00A0\u008E5H\u00C6\u00D8\u008APR\u00B4\u0088\x00\u00A2\u009E\u00BFAc\x01Y*h+k\u00EE\u00FE\x7Fs\u0095\x15F)\x1E;\u0082\u0081G\u00EC\u00C6\x18zL\u00ED\u009A\u008E`\u00980*\u00CA3\u00F6\u00FB\x06\u009FM\u00E8\u00E8t\u00C3Kz\x11\u00C0D\u00A0\u00B9\u009Dm\u00A6\u00A9$\u00CB\\!+\u0096\u00FBV\x12\\cM\f\x10\rZ9\u0087\u00D8\u0099\u00B9\u00BB\u00C2\u0093\u00F2n#3\x05\u0080\u00AB86X\u00EB4\u009Dob\u00FE\u0098\u009D_\u00B9\u00E4g\u00F6\u00BD\u00E8tT\x06\u00C0i\u00AA\x10\x00\u00E0\u00C1\"\u00FDj\u00D5\u00EF\u00DA\u00F5\u0085\u00C3G\u00DErd\u00FD%Gd\x0E\x00\u00C1\u00AD\u009FZQ\u00BE\u00C8\u00ACy\x0F\u00A1\fSC\u00F4\x1C9\u00E1\u00A0E ]1\u0084\u00A0\u00A2\b\t\u00D2}t7\x1E\u00C0D\u0090\u00A3n\u0081\u00D7\u00E4\u00E7\u00B1\u00D3\u0088#\u00D3\u00F99S\u0092\u00AB\u0093{r^*\u00BB:\u00D1\u00FD~\u00F9=\u00BB\x15-YX\x13}(\u00AD\u00E0i\u008Cs\u00E5\u00BD\x18*\u00EF\u00E7Z\u00DA\u00BD\u00F7\u00A2\x18\u00E0\x1EB\\\u0087c\x17\u00BC\u0084\u00C8\x0E\u0080:\u00C3\x1A\u00AA\u00F0\u00B6'\u00E9XI\u00AF\u00AB\u00C3\u0094V,\u00D9\u00A3EX\u0091\u00F7\x1Cy\x7F R\u0085\u00A3k\x03k\u00A3.q\x1Ef\x0EB\u00A1\u00F8>ld\u00CA\u00FD\u00ADn\u0081\u00CA\u009F\u0082n7\u00C0\u00BA\x02\u008A\u00B2({*d\u00D1\x14i\u00DCCxY\x1A\u00A1\x0F\u00FB)\u0088\u00DA\u00C9D\u00E9=\u00D9\u009DvU\u00B4\u00D9\x0Ef\u008F\u00DFy\u00F5%\u00BF\u00B4\u00EF{\u00E4!\u00A7W\u0098P\u00C7i\u00AB\x10\x00\u00E0^\"z\u0093\u00EA\u00BF\u0099}a<\u00F8\u00DB\x07\x17\u00FF\u00F1\x16\u0099E\u00E3O\x00\x13W\u00DE\u00F4mZh s\u00EA=P}M\u00ABW'\u00AD\u00BA\x00(\u00AB\x19\x01\u0086\x06\u00D5\u009B\u00E0\x04\u00A5`\u00AE\u00B6U\u00CB\u00F0\u00A5\u00DC\x043\x1B]b\u00D2\u00F3\u00DCU\x19To$Zz\u00D5T\u00A5\x0B\u00F3\x04XuA\u00D9!\u00FB\u00D0\u00D3}v\x1C\u0089u\x10\u009B\u00DF\b\u00C9G\u00A3zO\u0088\u00D5\u00F5\x19\u00E2Z\x10a\x06\u00E3o\u00ED\x02\x11\u008D\u009A\x06>n\"\u00FBl\u00B5\x1E\u0082\u00C1\u00EF\u00B9m}vq\u00DF\u00E6UPY\x11w\u00A0+\u00CFc\u00D9\u00BB%(g\u0099\x10\b\u00A2U\u00BA\u0096sq\u00DB\u00C6k.\u00F3\u0084\u00CF\u0087\u00E7'\u008E\u00A0\u00E5\u00BC\n\x03!\u00C7\u009E\u00A9\u00C4j \u00B8O\u009C\u00CB\u0081\u00CC\x16\u00D7\u009F|\x0B^\u0094\u00ACw\fO<\u00F4\u00A3\x0F\u00FA\u008D\u00F3^!\x17\u009E>\x00\u00E2\u00F1\u00C6i\u00AD\x10\x00\u00E0\u0080\u00CD\u00B8W<\u00EF\u00BA\u009Box\u00DBM\x1B?\u00F7%]o\x14\u00F0\u009CX\u00EAVS\u00FF\u00F5_]\x00\x00\x17\u00F9IDAT\u00F2\u00ED\u00BAPL\u00B6\u00C3\u00CA\u00FF\u00EB$r!\u00AD-\u00D4\u00E8Y(_.\u00B2\u00ECZ'B\u0094\x05F5\u00AC\b\u00F7\u009F\x16\u008F\x13k%\u00F4\u0099\u00AC\x05A\x0B\u00AF\x1A\u0093p\x12\u00C6\x14e@\u0080t\u00A9\u00B6X,\u00AD\u00F9\x1ASe\u00BE\u00AD5\x01\x15\u00B4\u0091\u00F8@GG\x0BO\u00C0\u00D6\u0082t\u008B\u00D7\u00BD\u00A0\u00CC\x19\x7Fl_\u00AE\u00DD\u00B2\t|<K8\u00F1\u0086R\u00EE\u00D8\u0081\t\u00B1\u0086pwL=\x05*\u00E5P\u00E4R\x14\u009D\x1F\u008A\u00AF\u0083\\\u0083\u00AEi\u00BD\u00B5\u00D3\x13\u00B0\u00FBi\u00E5\x12\u0082e\u00E8!\u00D5*]\x19\u00AE\b\t\u00C4\u00F6\u00E3.\u008Ab\u00BD\x17\u00D9\x1Eo\u00A6\u00C8\x0ERT\u00A2H\u00EF\u0084J\u0084\u00AB\u008A\fPp\u00E1AQ@\u00F6l\u00F6\u008D\u00AF\u00DD\u00FC\u009E\u0087\u00BF\u00ED\u00FC\u00D7\u00E0\u00C2\u00BFs\u00BA\u00DF\u00E1\u00E3\u00F4VW+\u00E3\u00E5Wo^\u00F6\u00EB7\u00EB\u00EB??\u00AEo\u0090\u0087\u00C0:\u00FE\x10p\u00C6\u0084@\u0096'\u00BB\u00B0\x05\u009E\x10\x02\u00CA\u009C\u00B8\x1FC*\u00E2_\u008E\x0B\u00A40\u00AAZ&\u00A1\u00A3\u009C\x13)\u00A8\u00DCF\u008B\u00DB]\u00B6\u00D58\u00AE\u00FA$N\u00A5\u00C1\u00B5\b\x00\u00BF\u00DE\u00BA\u00BCx\u00D9_\u00D8~<\u00BC\n\u008Bk\u00D7\u00BAb\u00AD\x1B\u008B1\u00DA\u00B3w`>&+p\bwW0_$\u00F9\u0086\u00CC\u00CA\u00B6D(\x06\x02\u0092\u00CD;\u008C\n\x043\u00B6\u00F9\x12o\r\u008FB\u00F2Q\u00EF\u00B9\b\u00F6D\u00D0d\x1F\x164?[\u00B2#Rs\x14\u00B2\fG$HIl\x04c\u00C0\u00A0\u00C4\x020\u00B6\u00F2R\u0092\u0094jk4R\u0087\u00E9\u00F2\u00B3\f;\u00FB$:\u0089\u00ABg\u00F8G\u00A5\u00D4\x1C\u0097\u0099\u00B0\x1By\u00AC\u00CEtd\u0092\u00A6\u0082<\u00C5s\u00B9\u00F2k\u00FB\u008El\u009D}\u00E9\u0091\x7F\u00FA\u00F07_x\u0087\u00D2\u0091Od\u00DC\u00A9\x14\x02\x00\u00BC\u00FC\u00DACOz\u00F3\r\u00ED\u00B7?\u00B5\u00D88\u00A0*e\u00E9+Mp/\u00C8A\u009A\u009E\u0082\u00BFD\x19i\u00C9\u00B5\u00E0\x05\u008E\x0BHZy\u0089NCi\u00D9\x05fU\u00A8\\\b\x0B\u00A5\u00AB?U\"\u0093~\x02.\u00E8:\u00F2$\u0098(\rZ\u00E1\u00C0;|RO\u00C3\x04E\u00AC\x10\f\u00B7\u00E6\u00B1\u00F8l\u00AE\u00DD\u00B0\u00E1\na\u00D6\u0081\u008D\u00A2\f\u00B8\x04\x1C\\1\u00CC\u0096\u00C5\u00AA2L\u00F0&+V<\u00C5\u00CF\u00F8l\x053\u00B8K,y>*\u0084\x01N\u00A1\u00F6YE\u0081d5#k!\x06\u0099\njU\b\u00F3\u009E\x7F\u00F3\u00F3`'\u0082M]\u00CD\x06\u00AF\u0095\u00DE\x0EA\u009D\u00EE^c\x11J$\u00EF\u008F\u00D4kT\u0085@\u00D4\u00B3\u00F3<\u00A9$\u00EB\u00B2r\u00F0k\u00E5\u00B3\f\x05\u0081\fw\u00E2Z\x05\x18/<t\u00D3\u00DE\u00A7\u00F6o}\u00F4\u00AF\u009Ds;tB<u\u00E3N\u00A7\x10\x00\u00E0g\x0Fn\u00DD\u00FFM\u009F[\u00BE\u00F5\u00C3G6.Y(\u00EB\x1F\u00B2\u00A6\u009Fn\\6(Y\u0089\x05\u00B5\x14'\x15R\u008E\u00B9\u00B9\u00DE\u00D8c\u00C5\u00BB\b`\u00B1\u00A7'\u00C0\u00C5U4\u0094L9\x17\u00BD\u0082\u0091\x15\u0085\x00S\u00A3\x00\u00F7\u0097\u00B2~\u00C4T\u00A1d\u00E7\u00E9\u009C\u00A0\u00DA\x11\u008D\f\u00ED\u00BC\\\u00ECEC\u00F14\x00\u00BB\u009C\u00BD8/\u00B5\x0E\f\t\u00B8V\u00E1\u00AC\x1B\u00A5\u0099\u00DC~\x02am\u00F4\x02\u00A8\u00D2pE\u00DCCh\x10/^\u00CA8\u0099\x1E\x02=\u0083\u0099c\r& \x12kLL\u00FE\u008F$\x185)\u0082\u00DF\u00FF&\u0085\u00A0Q<%\u00B0f$\x02\x07\x1F{\u00CF\u0085Z:=\x05\x0B\x1F\u00AB\x05\u00E7\u00FD\u00C7\u00FD\u00C2\x00J6X\u0081j\u00D4\u0081\u00E4\u00FA\f\x14|\u008D9c\u00CA\u00AF\x15E5U\b\x02\u00C5p\u00F1\u0091+/x\u0086<\u00E3\u00C1\u00AF9\u00FB\x0E\u00ABZ\u00BC\u00B5\u00E3N\u00A9\x10\x00\u00E0\x7F\x1E\u00D5\u00FD\u00BF\u00FC\u0099\u00AD7\u00BD\u00F3\u00E0\u00F0\u008D\x0B\x1D\u008C_\x00)18B\u00D0B@\u0081@\u00C4\u00A8\x104\u008A\u00A3\x14\u0088\x14\u00D2\u00B4\u00DB\u00D2$\u00CC\u0088\x10\u00C0YkhSP\u0090\u00C5R\u00BE\u009Dj\x0F\u0082O\u00C6\u00AA\u00D9\u00DC\u0094\u00EEzz\x19\u0092\u00D7Lo\u00A5x\x10R\u0094\x18F6YEx:\x02`\u00BD[\u00CD\u00C3Z\x07\u00E6]\u00AC\u00B7\"h\x15]\u00E8\u008B\x17@!\u0081\u00FF\x7F\u00E8~,\u00B6v\x1B\u00CD\u008D\u00B6\u00B6h^; \u00C5\u00A2\x02\u0098Ac}o\x13Pq\u00E1e\x1D\u0083F\u00ABv\u00B6M\u009B\x15\u00E1\u009Fx\bj!\u00C9P>\x1FT\u00DDKH\u00EBl!G\u009B\u00B4Q\u00A7\x07\u0093L\u00C3\u00A9\u00E0\u00D6\u00B6h\u00ACFl\u00E59\u00B3\u00FE\"i\u00CC\u00A6\x10\"\u00E4\x00\\\x1D kF,\x7F\u0082&K\u00AC=\u00EC\u00C8;\x1E\u00F8\u009D\u00EB\u00CF\u00BE\u00E8\u00DF\u00EE\u00BEC\u00FA\x19\u009C\u00EC\u00B8\u00D3*\x04\x00\u00F8\u00A0\u00EA\u00F0\u0093\u009F\u00D9\u00FA\u00E9\u00B7]/\u00DF{x\u00B1\x06@&\u00D6VV\u0084+R\u0088.\u00D0\u0093\u00BC\u00B1\x0B\u00AA\x05\u00F2\u00E4\x17\x14\u00B0/\x14\nR\x00\u00A9H\nEZ\u0099\u00FB\u00EA\x05\x1FP\u00B2#\u00BDwB\u00D7\u0089\u0092\u00A9\u00FC\u00F9\u00D5\u00AEM\x01,v\x05z\x07\u00D7\u0097Hfa\u00D6\u00E5\u00F3x\u00B3nK\u00BB\u00CD}\u0082ot\n\x0F\u00AD\u00AA\u00F5\x10\x14\x05\u00DAR}\u00CD\x066\u00F5\u0090P\b\u00F5Y\x0EK\u00B3\u00FE\x112\u00C0\u00AB\x14Qp\x04\n\u009C\u00A4`\u00B1z\u00B1\u00A9\u00C6\u00DA\x0E\u00EC\u00930\x1F33\u00C1T\u00E4\u00DC\x15j\u0093\x04\u00FF\u00A2h\u008Ba_Q$3L\u00DDx*\x11\n+\u00F7\u009F\x14\x1F\u00D5\u00FFs\u00BB\u00A2d&\u00E9\u00CC\u00AE\u00A1\x042{P\u00CF\u00E5+J\u00ED\u00DA\u00C6\u00FE\u00AF9\u00FC\u00AA'\u00FE\u00E4y/\u0093\u00C7\u00DF\u00FE\u009D\u008EN\u00D5\u00B8S+\x04\u008E\u0097|\u00F6\u00D0s\u00DE\u00FA\u0085\u00D9/\x7Ff{\u00FD,\u00A2\u00DA\x13\u00E6\x1B\u0095\x000\t\x19\u00A2G>\x15\u0087\x7F\x1Fi\u00B0\u00A8<DZ\u00F7\x1A\x1E\u00F0<\u00DC/\u00BC\u0087\u00E2\u00F2W\u0090\x10\x05/\u00F0N\u00C7\u00F6]6x\t\u00E5\u00C5\u00E3D\u00C1\x13\u00CF'\u00A9\u0094\u00E850\u00B5\x19\u00F8\u0083\t\u00F7Z7\u00A5\u0090\u00EBCf'\u00A0\u00A1x\x033\u00F6Sw\u00AF\u0083\u00DFE\u00C8\u00E3\n\u00A3)0\x0F\x0F\u00C1\u009B\u008DR\u00F8\x1D\x17\u0098\u008F\u00A6\x10R\x19\u00F0\u00EF\u00EE\u00DEE\u00BA\u00F2\u00F3\u00DE\u00AD\u00C3\x12\x12p\u009Cw@\x1D\u0094\u009C\x05\u00DF\u00C3Vz\u00E6~\u0083\x16.\u0083\u00DF\x17y\"\x14~\u00AE\u00E3\x00\u00AC(\x04\u00CD{\u0089\u009E\tE\u0099\u00B0d\u00D9\u00C2FSb\x00\u0095\u0096\x1F\u00B3\u00A7\u00A7\u00D2\u00DA\x12\u00B3\u00FD[G.x\u00F2\u00F6w=\u00F6\x7F\u009C\x7F\u00BBuG\u00BE\u00AD\u00C6]B!\x00\u00C0\u00CF}q\u00EBa\u00AF\u00FF\u00D4x\u00F9\u0087\u008F\u00CC\x1F\u00A4:\u009F\u00BA\u00EF\u00A3N\u00AC\u00BDW\n\u0098\u00D0BV\u00B2\x11\x1A\u00827\x11N*\x14\x12\u008E\u00FC'\u0094Fx%\bkO\f \x04\x0B\x00\x17x\u00E5JI\u0093\u00C2\"*\u0084\x10\u00F8\f%\u00C2\x0BXN;N\x13\u00DC4\u00AF\u00A7\u009Brq/\u00A7u\u00C1\u00C6\u0098\u008A\u0081V\u0096\x15\u008D\u00CD=\u0089!\u00C2(S&\u00C3h)=fHH\u00B42\u00CC@\"S\x10\u0099\x04\u00CD\u0086)\u00D9\u00A2}U! \u009A\u009Ed\u00F6@#\u0086\u00E763\u00CF16\u00D5\u00E8\u0093`\u00F8\u0082\u00E4\u00F1\u00AA\x10\u00C3\u00DB\u00A5\u00A3X|5\u00EF\u00AC\u0082\u0082\x15\u00A7\b\u0085\u0080T\n$/\u00F1\u00FA\u00BB+\x0E\u00B6\u0095\x17\u0098\u00A2\u00E3\u00FB!\u00C8\u00B9v\u00FF\u0083W\u00DC\u00F7i\u00F3\u00CB\x1E\u00FA\u00EA=\x7FyJ&\u00F2\x1D<\u00EE2\n\x01\x00\u00FE\u00F7B\u00CF\u00FE\u00D9\u008F\x1D\u00FA\u0085w\u00DD\u00B4\u00F1\x1D\u00B7\u00F4\x19\x02\u00C4\x1B\x11\u0084&3\u00CA\u00DE!\u00A9\x03\u0082\u0096\u008C\u00C6b\u00E1\u0083W\u0080\"p\u00C4\x05P0\n\n\u00AB\x0Bo\u0086\tU\x19\u00F8\x0E\u00C5s@\u00F7\u00B5!\u00A5M\x04\u009CJ,\u00D6i\u00A7\x07SHJ5L\u0088\u00A2\u009E^\u00F7\u00F1\u00FDF`\u00CDC\u0087y7\u00EB\u00CD\u00CC@\b\x14ADNtv\u00FC\u00F1g&.\x18\u00FC{\u0086bM\u0091B^\u00B3\r\x12\x16\x1E\u00C7\u0082\u0089U8\u0091x\x02\u00E3yz\x1B\u0083+-\u00EE\u00DF\u00CAv\u0091*\u00D5\u00F4*\u0080\u00A2\x10x\x1E\x7F\x16\u0091\u00EA<\u00C6C \x00Y\x15\t\x1C\\Ne\u00C4\u00B0\u0088^\x01T\u00D1\u00D6vp\u00EEW\x1F}\u00E3W\u00BFt\u00FF\u008B\x0F|\u00FB\u00ED\u00B3\u0088\u00CA\u00ED1\u00EER\n\u0081\u00E3\u00A5\u009F<\u00FA\u009Do\u00F9<^\u00F3\u00FF\u00B67\u00CE\u00A6\x15\u00AF\u00BD\x01\u00D2\u00B5\u00B6\u00EDW\u00DBj\u00C7\u00DFE\u00A0\u0093c\u00E0\x0F\u008D\u009E\x02)\u00C7E\u00A1P\u0091T\u0097~\u008A\x17\u00F8u\u008C@\u00E0\x1E\u00FD\u00D8\u00F3S\thm\x1D?vpm\u00888\u00D7\u0088HY\u0092\x12\r\u00CF>\u00C8h\u00AE73\x0E\u00F3\u009Em\u00C0\x18O\u00CF\u0096\u009Aq\u00F4\u00D2-\u00F1X\x04\u008A<\x04ZL5\u00F7\u0099\u00D8\u00C1\f+\u00DE\x00hm\u00D5+\u00FC\u009C\x0BQ\x05\u00DB\u00EE|B\u0083\u00E6o\n\u00FD\x04\x13@\u00F9\u00BF&\x1F\u00C1\u00C2\x03{\u00DC5\x14 \u00EE\u00C0\u0090\u00AEr\x1F\b$\u009A\"\u00C8\f\u00CB\u00F1\u00D2\u0088@*\u00B2A\x15\u00DA:\u00DA\u00B9\u009B\u0087\u00EF\u00F1\u00A4\u00ED\u00EF~\u00F2\u00FF<\u00EF\u00BF\u009D\u00E4T=\u00ED\u00C6]R!\x00\u00C0/_\u00B7|\u00C0\u00AF\u00FF\u00F5\u00D6\x1B\u00DE}\u00E3\u00DA\x13F\u009D\u0085\u00B55,\u00C1-\u00A9\u00F3\x0F\u0092\u00FC\u00A3\u0089'\u00ACX\u00F8\u008A\x1B\u00D4\u00B4bd\b\u0082;\u0090\u00DB\u008A+\u0092\x001\u0091\u008A\u0089\x1EB\u00ACVCE\u0080<N*\x1D*\n\u008D\u00EB\u00E65t\x0F-\u00B2\u0083S+\u00DC\x07\u00C3*\u00B8(\u00EC\u009AZ\x1F\u00C6A\x0B\u00B8\u00E6\x18BcX0\u00A6\u00B2`\x11\x0FF\u00CD\u00AEKZ\u00C3\x02c\u00E6\u00B1=Z\b\x0E3\x10\u00DD\u00B1\x05\u0098[\u009F\x19\b\u00EE\u009F\u0096:\x17l\u00F1\x15\u00A9\\\u00A9\u00D6~\u008B\u00E1! \x15\x02\u00F1\x10\u0085\tw\u00AC\u00D0\u00A4\u00C0|\u0094\u0088\u00F7\x1B\u00D2\x13\x10\u00CD>\x05\u00D5[R\u0092\u00AE\u0090\u00A1\x03x\u00CD\x00\x1A\u00B6\u00B0\u00EBA\u00B7\u00BC\u00F7\x01\u00DF6<\u00EF\x11?z\u00DEm\u00BA\n\u00F3\x1D5\u00EE\u00B2\n\x01\x00nP\u009D}\u00DF\u00C7\x0F\u00FF\u00C0;\u00AEn\u00FF\u00E1\u00BA\u00CD\u00B59tf2\u00E7\x02\u00CE\u00BC\u00BE\x1CO\u00A0};\u00A0\u0084\t\u009E^\u00A40\x06\u00BF\u00A0\u00B8\u00AC\u00BD\u0097\u00E3\u00AD\n4\u00A6\x1E@\u00BA\u00FAT2=\u00F0\u0087)x\u00A8\x01v\u00C2\u00BD\u008A\x00,\u00A9\f\bL\u00B2\u00D6\u00A3S!e\x0F\u00C59\x14\u00EBKKCJ\u0097X1\u009A\u00B8\u0082t\u00B16jc\n\u00B4:S\u0091\u00D7\u00CD\\\u00BD\u0088uIb\u00CFDZ\u00FF\u009AV\u00AC`\u00E3\u00CC\u00D3\u0096)\\\u00CE\u008B\u0080L\x04\x1E\u00F0%\u00EBz\x11H\u00CD\u0098\x7F\u00E8\u0092<\x06\u00F7\u00A8\"\u00E4P\u00A3`\u00DBwb\u0085P\u00BA\x12\u00A6(\u008F\u00B9\x12&(\x00\u0099z\"\u00D6\u00EE\f\x10\u008C\u0098\u00ED\u00DBY\u00EC\x7F\u00C2\u00D1W>\u00FDG\x0E\u00FC\u00B8<N\u0096'=9O\u00D3q\u0097V\b\x1C?\u00F5\u00D9\u00A3\u008Fz\u00CBU\u00FD\u00BF~\u00E0\u00C6\u00B5G\u00F6>\u00CF\u00EE\u00C8$\u00F90\u00D5\x17\u00C2\u00AA\u00A8\u008B\u00AE\u00AC2\x11\u0089\x01\u00D4\u00DC\u00FF\u0094\x15\u00A9\u00A1\x10Hf\u008A,Fa\u00D7\u0099\x05\u00F7\u00CF\u0095\x1C\u00FA\u00E45\u00D0\u00C3\u00A0\u00F5'M\u00B9\u0086\x14\u00E4!\x18\u00960\u00CD@\u00ACfI\u0086n\na\u00DE\u00E9\x19 \u0080\u00B6\x16\u00D4e\t\u00E5\x10k\x1BF\x16B-\u0095)m\u0082\x11Tl\u0080L\u00C4\u00CAQ\u00E0\u00B6\u00C1+\u00A8\u00FB\x00\x13\u00AB\u00CE\u00EF\u00AAg@\x16\"\x15B+\u00E7k\u00FE\x1E\u00B2\u0083sV\x1E\u0092;0\u00A10k\u009EG\u00FC\u00B8\x11>\u0094\u0085g\x07\u00D8\x1F3Yb\u00EF\x03\u00B6>|\u00CF\u00A7.\u009F\u00FF\u00A4\u009F?\u00F7C\u00A7|r\u009Ef\u00E3n\u00A1\x10\x00\u00E0}\u00AA\u00F3\u00D7\u00FE\u00F9\u00C1\u00EF\u00FF\u0093k\u00D7\x7F\u00F0\u00AA\u00A3\u00EB\u00EBY\u009C$S\u008F \\w\x14\u00C1C\u00C4\u00E9\u00AB}\x15\x01W\x14\x10T\u00A6a\x05\"Y\u00E84\u00E14\x14A\u0095n=\x04\u00C2\u00D2\x17\u00A1\u00D61\u00AB\x14\u00B9\u00EC\\\x1E\u0087\u00A9KR\u0098\u00CB=\u00B8\u00D0O\u00C0\u00CF\u00AE\u0098\u008F&\u00E8\u00A46\x1BkQ\u00A39h[z7\u0083n\u00EB@\x06\x0E\u00E2\u00CAf\u00EE\u00AE\u00BF\u00C8T!DCUMjr\u0082\u008A\u0096Q \u00A5\u0098.9=\u0089\u00B9[gvB\u00AA\x1EF\u00C4\u00F5<NG\u00F4P\x18\x14Q\u00EE=\u00F8s\u009C\x00\u0091\u00FE\u00FEV\u00BD\u0081\u00BA\u009E$\u0090\u008A\u00878\x03`D\u00AE\u00E1\u00C0\u00C1\u00ED{>Z\x7F\u00EC\u00E9?p\u00EEO\x0E\x7FO\x16'5\x01\u00EF$\u00E3n\u00A3\x108~\u00ED\u00BA#\x0Fz\u00FD\u00C7\x17\u00BF\u00F0\u00DE\u00EBw]\u00BA=\u00CE0\u00F6\x16a\u00C4\u00B4W\x02\x02\u00B4\u00E3:\u0082(\u0082\x01wc\u00ED\u00CF\u00A9e\x060\u00C9XT\x1E\u00C3jQT4Q\u00ED\u00A4!\u0097\x10\u00C3\u00BD\t\u00BA\u00B9q-%L\u00806\u00AF\u00E7\u00C8\u00FDB\u00D9uW\"]\u0081nB>\u0090{\u00D0\u00D3\n\u00CF:0\u008C\u009EI\u00A0@\u008DV\u00EB\x10)Wz\b\u00A3\x1CCH2k\u00EF\u0099\x05\u00CB\u00DB\u0080]\u0099i\u00A5\u00C5\u00D3\u0088\x03$)\u00CB\u0098\u00A6\u00FA\x02\u00F4\u00C3\u00B1\u00C0b\u00F3d\u00B1-\x02+\u00A1\x1C\u00E8m\u00CDz\x12\u0099\u00C0\u00EBQ@\u00A4\u00B6s/\u00FC\x03\x14O\x01E\u00B9\u00A9B\u00E6Gq\u00EEC\u0097\u00EF\u00BA\u00E4i\u00FD\u00C5\u008F\u00F9\u00F1s\u00AF8\x15\u00F3\u00EE\u00CE2\u00EEv\n\x01\x00\u00BE\u00A8*?\u00F1\u00B1#\u00CF\u00FB\u0083\u00BFn?\u00FD\u00F1\u009B\u00D7.\u00EC:\u0084\u0090O*\x1C\u00DD\n\u009B[_\u00C0>n\u00AB@\x10\u00A1h\u00991\r\x07\"\u009E\u00D7\x12>\u0084\u0087a\u008Af\u00B5\u00A4\u009A\u00CDM'\u00A5\u00B9\u00A0\u00C7\u00D1#$\u0091\u00DE&\u00DEDz\x02\u00C80#>\u0097\b#\b\u00C4\u00CD\u00C7$\u00E3\u00CC\u00D8\x15i\x04\x00\u009D(\x04*\x1Cx\x18\x11\u0085L\u00A8\x1EBw\u00901\u0089C\u0095\u00AF\x00\u00FF\u009Bt\u00E5\u008A\x03$\u00BBP\u00A7t\u00E5n\u00DD\u00A1b\u0089w0\u00F4(\u00ACAw\u00EF\u00E8\u00F5\u00A4\u0090'\u00EE@B\u0091\u00F8\u00B5\x05\u00B7\x01\u00F6\x0E\x1B\x18\u00E6t\u00EC\u00BE\u00F7\u00E6u_\u00F1\u00B5\u00CB\u0097=\u00FD\u00D5\u00E7\u00BCA\u00CE\u00E7Y\u00EF>\u00E3n\u00A9\x108\u00FEd[\u00F7\u00FD\u00E2\x07\x0E\u00FF\u00D0\u00BB>/\u00FF\u00FA\u00BA\u00C3\u00BB\u00E7Q\u00D3O\u00CB\u00CAJ\u00CAb\u00E9\x05\u00C8\u00AC\x00$\x1B\u0088v+t\u008A\u00B4\u00A2\x0Ba\u00E57\u00B0Y)\u00AD\u00ADhK\u00A0\u0090\u00FB\u008C+a\t*\u0086\u00D1\u00CB\u00B1\u00E4\u00B8\u00C0c\u00D0\u00B5\u00EB\u00825\x04\x05\u00A9\u00A4\\A\u0091\u0097\u00C0\u00D4]\u00EB\u00C0\u00B0T\u00A0[\u00FD\u00C5|l\x19~\u00F85\u00B6\u009E\u00A1A-}\x1E\\\x00\t0r\u00C5\u00A6Y\u00B0\n\u00CDk\u0098\u00BB\u00CB\x1Fk5(\u00A6\u0098\u0080\u00D7\u00944X\u009AT\\\u00F1\u00D6\u00E5\u00E4#EI\x0F\x04\u00CC\u009A\u00E8\u00E4\u00FC\u00C2\u00CC\x0E\u008F/\u0080h\x0B\u00CA\u00B1\u00A83%\u00A5cc\u00FF\u00F6\u00E2\x1E\x0F\u00DF~\u00ED\u00D7\u00BFp\u00DF\x0F\u00DF\u00FB\u00B9\u00B3\u0083\u00A7|\u00B2\u00DDI\u00C6\u00DDZ!p\u00BC\u00F6\u00FA\u00EDK~\u00EFC;?\u00F3\u009Ekf\u00CF8\u00B2\u00B3\u00EE\x0B\u0082f\u009DCm'\u00C6N\u00C9\u00C7\u00C4\u00F3>q3\u00AD\u0088\u00E47L\u00C2\x07\u00AE\x07\u00E9\u00DD\u0097+n\u00A1\u00F0\u0096f\u00E9Q\x00\b,\u00C1x\x06\r\u00AC\u00C1\u0098tm\u00A6w\u00C0\u009E\u0092\u00A5\u00ACz\u00EAAx\x1B\u00B1\u00D1\u00AC*\x19\u008B\\\u00E8\u00A5-5\u0084kXz\u00B1\u00D7\u0098@j\u00AC\f%iy#\u00DD\b\u00B7\u00F2\u00C5\u00A5O\x0F\u00C1\u00DA\u00A4\u0093Dd\u00C0\u00A1\x06\u00907\x14\u0085@\u00AB\x1E\u0085N\u00C8\u00F0\u0081J \u0084\\\u00A7\u00DBP\u00B9\u00F9z\u00CF\u00B1\u00DA\u0093(\n\u00A5ZC\u00F1\f\u00BB\x0E\u00E3\u00A2\u0087\u00E2\u00AD_\u00FD\u008C\u00E1\u00A5\u008F}\u00C5YW\u009E\u00D2\u0089u'\x1Cg\x14B\x19?\u00F1\u00C9\u00A3\u00DF\u00F0\u00FBW\u00F4\u009F\u00FA\u00E0\u00D5\u00F3\u00C7m\u00F6\x19b\u00E5\u00A4\x11`S\u0093\x00\u00FD\\\u0080k\u00A7\u00E4\f\x0F\u00B2%x\u0084\x0F\u0091\u0095(\u00E1\x00\u00BB\x13\u0091\u00BE\\\u00B3\x18\u00A1h\u00E0a\x02\u00CF;\u00F5X\u00D8\u00BA\u00D8\u00CE\u00A9%\u009C\u00E01\u00BB\x0B\u00B4/Q\u00C7\u00E6.%Dh=\u00B3\x00\u00ACoh]\u00D1\u0096\x12\u00CA\u008C\u0095\u008F\u008D\n\u00C1\u00C3\x03\"\u00F2\x0348\x04\x04\u00FD,#\u0091\x02[C\u0086Ua\u00AE\u00DF\u00D1k \x1FaU!\u0084W\x01\u00842\u00A1sOO`\u0082K\u00F0oq\u008C\x00\x00f[\u00B8\u00F0\u0081[\u00EF\u00BF\u00FFS\u00F1\u00F2o|\u00D5\u00B9\u00FF\u00EB6\u009ARw\u00BAqF!\u00AC\u008Ck\x16*\u00BF\u00F0\u0097\u009B\u00FF\u00E8\u00ED\u009F\u00DA\u00FE\u00E1\u008F\\\u00BB\u00EB!\u00DB}\u00EE\x02\u00ECe\u00D2\u0085\u00B5\x18\u00AE?\x00\u00AE\t\u00D9\u00BADCNV\u00DB\x05\u0093\x10\u00E9Ap)\u00F6\u009A\x05\u00A8\u00A0\u00A3N\u0094H*\u0099)\u0093q\x1A\x02\u00C0\u00C3\x04\u0092\u0089\u00A8p\u00F2s\x01\nP\u00A8T\b\u009AJ\u0080$&\x19\u0093\u00E5\u0088\x0EH,\u00EBV\u00D2\u0088@\x10\u0091\x06e\u0097$\t\u0081\x1C:\u00A2\u00DF\x01\u00BA\u0085\x10s\u0095\u00E8\u00C6\x1E\x0B\u00BA\x02\u0098\u00ABN\u00AD=Jz\u00B1\u00F3\u00F8\x12a\x14\x0B\u00AB*\u00C7@\u0080Ia\x15y\x10\u00E6U\x18(9\u00C76\x0E<x\u00E7\u00E3\u00F7y\u00E2\u00F8C\u00FF\u00F0\u00A7\u00F7\u00FF\x0F\u00D9\x7F\u00F7\u00C3\t\u00FE\u00B6qF!\u00FC\r\u00E3\u00F3\u00AA\u00C3\u00AB>p\u00CB\u00B3\u00DF\u00F3\u00A9\u00F6\x1F>t\u00ED\u00ECA;}\x1D\u00D10\u0095`!\u00A6 \u00A1\u0096\u00DF\u00ABl\u00C6\u00E43\u00ACd$\u00A8\x1C\u008E\u00F1\ntE\u00F10l\u00D1\u00F8;\u00EB+\u00E8\x150\u0084\u00D0\u00C0\x13t\u00B5\u00D4ztO\u00C3\x15\x12\u00AF\u00DFV\u0086\u00F6\u0085Y\u00F9\u00DD\u0098+\x18K\u00C1!fj\u00EC\u00C4\x106a\u0083\x14Zo\u00EF\u009D\x10\x02\u00C9\u00E6\"\u00CE\u0081\u00F0g\u00CC0\x03\u0092\u008D\\(\u00D8\u0095\u00C7P3\x0E\u0099\u0086,m\u00DA\x14\u0096fDvs\u008A\u00F0\u0081\ni\u00D8\u00C4E\u0097l^\u00F1\u0095\u008F\u00D7W~\u00DB\x0F\x1Ex\u0093|\u00D5\u009D\u00B7D\u00F9\u00B6\x1Cg\x14\u00C2\u00DF1nP\x1D~\u00E6\u00CF\x0F}\u00FB\u00FF\u00FE\u0084\u00FE\u00FB\u00BF\u00B8z\u00E3\u0091[\u00E3\x1C\u00D1\u0099\u00B9g#US\x04:\u00C1\x10\b\u0088u-K\u00A6\x05\rZ\x0B~0\r\x13&MO\"\u00A5Y\u00D6J(\u00E7\u00AAaB\x0B\x0ECn\x1B\u00DC\u0088\u00DE}?\u00C9\u00DA\x0E*\u0095\u00D1\u00B6\x1F\u00BA@F5\u00D7\u00DD\u008B\u009B\x06 J\u00A0\u00A1@s%1\u00D7\u00E4#\b\u008C\x16m\u0096=-t\u00F6IP\u00F7\b$\u00B0\u008A\u00E0\x00\u00F8\u00CF\u00BC\n\u00BB \x17\u008E\u0091\u00A2\x10\u0090^\u0085\u00BAWR\u00B9\x0E\x02\t\x16\u00A5\u00A5\x1C;\u00E6\u00F3M\u009C\u00F3\u00A0\u00C5\u0087\u00EF\u00F7\u0084\u009D\u009F\u00F8'?v\u00C1o\u00C9yg\x14\u00C1\u00DF6\u00CE(\u0084/s\u00DC\u00A4*\u00BF\u00F8\u0091[\u00BE\u00E9\u008F>\u008E\u00EF\u00FB\u00F0\u00E7\u00E7\u00DFpp{\u00CD\u00AC\u00EF8K\x10\u00B0\x02\u0089,o\x06\u009CX$\u00D30A1\u00E5\x19\u00D0\u00C3\u0088B\u00A5\u00C2\u0094t\u00A1]]T%HC\x05\x1F\b2\u0093V\u00A6c\u00CF~\x10\u00A3D\u00E5'\u0097\u0088\u00AB\u00EBA\u00A2K\u00B4P\u0093\u00DEm\u00F9s\u00E7h\u0088Z(1\u00C0:1\u0091\u00C8\x13\x1E\u0082\x0B4-4\u0097\u008D\u00E7\u008A\u00CA\u0086\x13h\bpM\x1F2Kaq\u00BEd\u00FA\u0091\u00C7*\n#AE-\u00D8\u0080g\x19\x00\u00B4\x06\u00CCv\x1F\u00C2=/\u00D9\u00FE_\x0F\u00FFz\u00FC\u00E7g\u00BE\u00EC\u0082?\u0090\u008B\u00CE\u0084\x06_\u00CE8\u00A3\x10n\u00C5x\u00DD\u00A7\u00B7\x1Eu\u00F9\u00FB\x0F\u00BF\u00E4\u0093\u00D7\u00AC=\u00FBs7\u00ED\u00DE\x18\u00D1\f\u00D5\x1E%\u0080H\u0096CG\u00DD\u00C3\u0098\x169\u0081\u00C8\u009A\u00A5pE\x10\u00DC\u0085Z\u00E1X>\u00AF\u00A0\u00A2f/\u00C5\x00\x1DGWD\u00DD\u0081E\u00ED\b\u00A6%$\u00AE#\u0088OU\u00C1x3\x16\u00E9ITj\u00DEg1\x14\u00D1h\u0085E\u00F3\x1A\u00A3\u00A3T<V\u00AB\x0ED\x01\u00D3\u00E0\u0084%\u00F6<\u009C\u00D4\x17\u00C0B\x00\u00B3\u00FE2\u00A15\x1B&P\u008B\u00A0\u00A4(\tE\u0093\x0E\u00A0y\u00B8\u00D0\u00B1\u00FF\u0082\u00A3[\u00E7\u00DDw\u00E7MO|\u00D6\u00AEW\u00FF\u00FD\u0097\u00EF\u00BE\u00CBS\u008DO\u00F58\u00A3\x10Nb\u00BC\u00E7\u0090\u009E\u00FF\u00BA?\u00BD\u00E5\u009F\u00FF\u00E5\u00D5x\u00D1\u00C7>7\u00BB\u00DF\u00D6\u00F6\x06 \u00CD\u0090} \u00847]t\u00F5\u00EAD\u0084\x070\u00A9U`\x16\u00C1\u00853j&jj\u00D2\u00C1\u00CB\u00BA\u00D2S\u00E0\x02+!\u0087Q\u0097uJ`\u00A2\u0097r\x1C\u0085@\u009C@\u00C7\u00EE]\u0093\u00DA\x04?\x10\x05\u00DA\u00C8\u00B6\u00E7\x12\x1D\u0096\u00A3\x7F\x01d\n\u00E4)\u00D0\u009A\u0096\u00BE\u008A\x12\u00D6~V\u0094\x070\r5\u00C87\b<\x00\u00EC\u00A7\u00E8\u00CA\u00C23\x17\u00B3\x0EH\x1B1\f\x0B\u00DC\u00E3\u0092\u00FE\u00E9\x0B\u00EEw\u00E4u\u00DF\u00FC\u00C2\u00F3\x7F\u00F5\u00C1\u00CFl7\u00DC>3\u00E0\u00AE7\u00CE(\u0084S0nPm\u00BF\u00FA\u00C1\u00AD\u00A7\u00FC\u00D1G7_p\u00E5\u00B5\u00C3\u00B3\u00AE\u00BEq\u00D7F\u00979d\u00EC\u00D0\u009E\u00E5\u00C8\u00E6\x01$m6\x00H\u00EF\u00F8\u00B3\u00DA\u0082\u00AD\x15\u00C1\r\u008F\u00A2\u0084\t\x13\u009EAaE\u00B2{R\x1B\u00C5\u00D6.\u00EC\x19&P\u00C0'@\u00A8\u00EF\u009B\n\u00C1\x0B\u009DF\u00C9\u00BF\u00BB@tD\x1B\u00CD\u00E1\u00B7\u00B4\u00A2U;\x1A\x01)\x05\u00BAIV5\x0E\u00A2\u0091%\u00A8\u00B5\fMR\u00A1\x10,\u0094\u00A6%4(U\u008D\x00\x04=k%\u009Ab\u00AE#\u00F6\u00DEck\u00EB\u00C2\u008B\u00FB[\x1E\u00F1u\u00F2+\u0097}\u00EF\u00BE?\u0096{\u00B0\u00A6\u00F4\u00CC\u00B8\u00B5\u00E3\u008CB8\u00C5\u00E3\u00A3\u00DB\u00BA\u00FFu\u00EF8\u00F4\u008F?x\u00D5\u00F8\x1D\u009F\u00B9v\u00F6u_\u00B8e]0\x0E%\u00BB\u00E0\u008F\u00FC\x18\x001]y\u00F5X=\x0B\u00A4\u00DC\u009B\x00\u0080\u00B1\u00B4U\u00EB2\u00B5\u00F8\u009E\u0081`wf\u00E9\r\u00DD\u00B9\x13Qe\u00E9\x05KUy\u00C4Z\x15\u00A3\u00A5!\u0089u\u0084\u0097\u00C2f)\u00DD\u00BEg\u00E5!\x15B\u0083Z\u00B3S\u0086\x02\u0092\u00C2L\u009As\u00E5\x05\x10+`\u00B6\x02\u00D2]\t\u00B4l\u00AC\u008A\u00C4 \u00C4=\u0084&\u0082=\u00FB\u008E\u00E8=\u00BEj\u00FC?\u00F7{X{\u00E37}\u00E7\u00DE\u00FF\u00FE\u00C0K\u00E5N\u00D9\u00DD\u00F8t\x1Dg\x14\u00C2m8\u00DEv\u0093^|\u00F9;o\u00BC\u00EC\x13\u009F\u00DB}\u00D9g\u00AE\u00E9\u008F\u00BF\u00E1K\x1B\u00B2h\u0080\u00F6Y\u00A4\x13\u00938d\x19\x00x#\u0092\x1A&\u00E4\u0092\u00F4Z\u00D2\u0089\u0098x\x05LSF\x1B\u00F9\u00B1\u00B4V+\x00c\u00F5\x0Ejed\u00FDa\u00F6\u00A3\u0091\u00E30j\\#y\x0B@\x12\u0092\x06\u00F1\u00DF\x10\u00D4\u00F6\u00EB\u0081/\x1400\u00BD\b\x0F%JS\x12\x02\u008F\u00CC.4\x05\u00B4m\u00E3\u009C\u00FDK\u00BD\u00E7}v\u00DEw\u00AF\u008B\u00FB\u00E5O\u00BB\u00EC\u00C0\u00E5\u008F~\u008E\\u\u00DB\u00BF\u00BD\u00BB\u00E78\u00A3\x10n\u00A7\u00F1\u00A7\u00D7\u00EAW\u00BC\u00FEO\u00BF\u00F8\u00AC+>7|\u00CBu7\u00CC\u009E\u00FC\u00E9\u00EB\u00DB\u00BA\u00F6\r\u00F4>B\u00FAP\\\u00FF$\x16\u00B1\u00D1\u00CA$\u00ADY]\u00FF\x122\u00B0\u0085Z\x1Bk\u00AAq\u00CAy\u0098\u0084!\x05C\u00A0\x17\u0090\u00C5U\u00E4!\u00A4\x12!\u0086 E!4'\x18\u00AD\u00B9R\b\u008C@\x10\x1D\u008BY\u00B7\x10\u009C\x02$.@\u00C6c\u0093\x1E\x15\u0088\u0096\u00A5\u00D8\u00C2E_\u00B1\u00D8>\u00FF\u00C2\u00FE'\x17\u00DF\u00B7\u00FF\u00CE3\u009F\u00B7\u00E7-\u008Fx\u00FA\u00DA\u00E7o\u00CF\u00F7uw\x1Dg\x14\u00C2\x1D0>\u00BE\u00D0\u00B3\x7F\u00F3O7\u009F\u00F2\u00BE\x0Fo~\u00E3\u00F57\u00F7\u00A7^u\u00ED\u00EE\x07\u00DC|x\u008E\u00DEg\u00C1\u0084\u00AC\u009C\u0083\u00EA\x1D`d\x1A\u00D3>\u00EF$*\u00D5\x02&\x0F\x13j\x0B\u00B7\u00C8\x12\x14\u00E5\x10\u00D8\u00C3q?K\u00E5\x12e\u00D1\x1E\u00CAp\u00DA\x18\u00E3P\u00B1\x06\u00F1\u00DA\u0086\x04\n[\u00CFjH\u0092\u0093\u00A2\u00AB\u0092\u00A470\x03 \u00B2\u0085\u00B3\u00F6\u00EE\u00E0\u009E\u00F7\\~\u00F2\u00FC\u00F3\u00C7?|\u00F0c\u00E7\u00EFx\u00CE\u00F3\u00CF\u00F9\u00E3\x03\x0F\u00B9\u00EB4/\u00BD\u00B3\u008C3\n\u00E14\x18\x1F\u00B8Q/~\u00FD\x1F|\u00F1\u00D2+\u00AF\u009A?\u00F9\u00FA\u0083\u00FDI_\u00B8\x01\x0F\u00B8\u00F1Kk\u0082\u00E5\x06\u00FA\u00D8\x01VE\u00BA\u0092hZ\u00D8\u0087U\u00E0'!@\u0082\u008E\u00D19\tn\u00FD\u00C9+\b\u00D0R\u00DD\x13\u00D1LK\u008E\u0088B\u00AB\u00C8Bxf@\u00FD\x070\u00D7\x7F\x069\u0086\x1D\u00C8\u008E\u00CC\x19\x06X\u008ApP\u00C5 K\u009Cs\u00EE\u00B6^x\u00E1\u00E2\u0093\u00FB\x0F,\u00DF}\u00DF\u00FB\x0F\x7F\u00F2-\u00CF=\u00FF]\u008Fy\u00CA\u0099P\u00E0\u008E\x1Eg\x14\u00C2i8>pT\u00CF{\u00F3\u00DB\u008F|\u00CDG>q\u00E4q7\u00DC8\x7F\u00EC\u00E6Qy\u00F4\u00E7\u00AF_\u00BB\u00E8\u00E6\u0083\u0082\u00D6\u00D7c\t\u00B7\u00DE-o?\u00EAh\u00DE\u00C08K*uu\u00F9)\u00C4\u00A55[\u00A65\u00E1\u0095\u0094\x1E^,\u00CB\u00BET$c\u00F6\x16`\u00898\u00E0J\x02\u008A\u00D6\x14M\u009B\t|o\u0096Y\x000H\u00C7\\\x17\u00D8\u00BBg\u00C4\x05\x17m_{\u00F6Y\u00F3\x0F\x1E\u00B8\u00E0\u00E0\x07\x1E\u00F2\u0088s\u00DE\u00FF\u00DC\x7Fz\u00F6\u009F]\u00FCP\u00B9\u00F1\u00F6\x7F\u00BAg\u00C6\u00DF6\u00CE(\u0084;\u00C9\u00F8\u00C4!\u00BD\u00F0w\u00FE\u00E8\u00E6\u0087\u00BF\u00E7\u00A3\u00FA\u00B0\u009B\u00BE\u00D8\x1E|\u00F0\u00E8\u00F8\u00A0qs\u00FD\x01_:\u0084\u008B\u00AE\u00F9\u00E2R\u0096\u00DB\u00EB\u00C0\u00B8\x11K\u00C8G\u00C6\u0080)\u00BD\x0Et_\x1C\u00D6\u00BAC\x19zo\x1C\x05\u008D\x05`\u00C4S\u00A3p\u00CFA<,\x19\u00E0\u00D4kXH\u00A2\u009EZ\x1C\u00A0\x18t\u0089\u00F9p\x14\u00E7\u009E\u00DFt\u00FF\u00DE\u00E1\u00DA=\u00B3\u00ADO\u009E\u00BDG\u00AF\u00D8\x7F`\u00FC\u00ABG>\u00BA\u00FF\u00E5\u00B7?\u00E7\u00A2\u008F\u00DE\u00EF\u00C1r\u00DD\x1D\u00F8\u00F8\u00CE\u008C/s\u009CQ\bw\u00F2q\u00D5\u00A8g\u00BD\u00FFS\u00F8\u00CA\u00F7\u00BD\u00EB\u00E6\u00FB\\\u00FD\u00B9\u00E5\u00C5\u009F\u00BFe\u00F3^\u0087\x0F\u00EE\u00B9\u00C7\u00F6\u0091\u00D9E}G\u00CE_.\x16\x07\x16\u0090s\u0097\u00DB\u00B3\u00BD[Gt\u00D8\u00DC\u009Ec\u00B15\u00C3r{\u0080.\x15:6\u00E8\u00C2\u00B3\x1A\u00EA\x1D\u008A\u00A0\u0098\r#\u00D6\u00D0\u00B1\u00BE\u00B6\u00C4\u00AE\u008D>\u00CEf\u008B[f\u00D0/\x0Em\u00FD\u00A6a\u00BE\u00BCa>\u00C7\u00B5{\u00F6}\u00F1\u009A\u008B\u00F6\u00AE_}\u00EF\u008B\u00CF\u00BA\u00EA\u00D2'\u009F\u00F3\u00D9\u00C7=\x11\u009F\u00B9\u00F0^r\u00E4\u008E~&g\u00C6\u00AD\x1F\u00FF\x1F\x00\u00F3\u00AA\r=e\u0082\u0081\x00\x00\x00\x00IEND\u00AEB`\u0082";
    this.slash = '/';
    var targetFolder = new Folder(Folder.userData.fullName + this.slash + 'Aescripts' + this.slash + 'colorPicker');
    !targetFolder.exists && targetFolder.create();

    this.settingFile = new File(targetFolder.fullName + this.slash + 'colorPicker.xml');
    if (!this.settingFile.exists) {
      this.settingFile.open('w');
      this.settingFile.write('<setting></setting>');
      this.settingFile.close();
    }

    this.haveSetting = function (name) {
      this.settingFile.open('r');
      var content = this.settingFile.read();
      this.settingFile.close();
      return content.toString().indexOf('<' + name + '>') !== -1;
    };

    this.getSetting = function (name) {
      this.settingFile.open('r');
      var xml = new XML(this.settingFile.read());
      this.settingFile.close();
      return xml[name].toString();
    };

    this.getSettingAsBool = function (name) {
      var result = this.getSetting(name);
      return result === 'true';
    };

    this.saveSetting = function (name, value) {
      this.settingFile.open('r');
      var xml = new XML(this.settingFile.read());
      this.settingFile.close();
      var isOk = true;
      try {
        xml[name] = value.toString();
      } catch (err) {
        isOk = false;
      }
      this.settingFile.open('w');
      this.settingFile.write(xml);
      this.settingFile.close();
      return isOk;
    };
  };
  $.global.colorPicker = colorPicker;
  return colorPicker;
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/** ***********************************新界面网格视图的构造函数****************************************/
$.global.GridView = GridView;
function GridView(parent, attrs) {
  var keepRef = this;
  /** **********************继承函数************************************************************/
  this.extend = function (target, source) {
    for (var i in source) target[i] = source[i];
    return target;
  };
  /** *********************item 构造器***********************************************************************/
  this.item = function (text, image, parent) {
    // item 构造器
    if (!text) text = '';
    if (!image) image = null;
    keepRef.extend(this, {
      id: 'item',
      index: 0,
      type: 'item',
      image: image,
      text: text,
      selected: false,
      prev: null,
      next: null,
      parent: parent,
      backgroundColor: null,
      strokeColor: null,
      rect: [0, 0, 100, 60], // item的矩阵信息
      imageRect: [0, 0, 100, 60], // item中图片的矩阵信息，为相对rect的量
      fontRect: [0, 90, 100, 10] // item中文字背景的矩阵信息，为相对rect的量
    });
    /** *****************item 原型****************************************************************************/
    keepRef.extend(this, {
      remove: function (notRefreshList) {
        // 移除元素, 若notRefreshList为true，默认不刷新列表
        var e = this.parent;
        var prev = this.prev;
        var next = this.next;
        if (prev) {
          prev.next = next;
          if (next) {
            next.prev = prev;
          }
        } else {
          next.prev = null;
        }

        if (this === e.lastSelectedItem) e.lastSelectedItem = null;
        e.getChildren();
        e.getSelection();

        if (!notRefreshList) e.refresh();
      },
      moveUp: function () {
        // 元素上移
        try {
          var e = this.parent;
          var prev = this.prev;
          var next = this.next;
          if (prev) {
            if (prev.prev) {
              prev.prev.next = this;
            }
            this.prev = prev.prev;
            this.next = prev;
            prev.prev = this;
            prev.next = next;
            if (next) {
              next.prev = prev;
            }
          }
          if (this.prev === null) {
            e.first = this;
          }
          e.getChildren();
          e.refresh();
        } catch (err) {
          alert(err.line.toString());
        }
      },
      moveDown: function () {
        // 元素下移
        try {
          var e = this.parent;
          var prev = this.prev;
          var next = this.next;
          if (next) {
            var right = this.next.next;
            if (prev) {
              prev.next = next;
            }
            next.prev = prev;
            next.next = this;
            this.prev = next;
            this.next = right;
            if (right) {
              right.prev = this;
            }
          }
          if (next.prev === null) {
            e.first = next;
          }
          e.getChildren();
          e.refresh();
        } catch (err) {
          alert(err.line.toString());
        }
      },
      moveBefore: function (item) {
        // 将当前item移动到指定item之前
        var e = this.parent;
        this.remove(1);
        if (this.next) {
          this.next.prev = this.prev;
        }
        if (this.prev) {
          this.prev.next = this.next;
        }
        this.next = item;
        this.prev = item.prev;
        if (item.prev) {
          item.prev.next = this;
        }
        item.prev = this;
        if (this.prev === null) {
          e.first = this;
        }
        e.getChildren();
        e.refresh();
      },
      moveAfter: function (item) {
        // 将当前item移动到指定item之后
        var e = this.parent;
        this.remove(1);
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.prev = item;
        this.next = item.next;
        if (item.next) {
          item.next.prev = this;
        }
        item.next = this;

        e.getChildren();
        e.refresh();
      }
    });
  };

  /** *********************网格视图的默认属性***********************************************************************/
  this.extend(this, {
    id: 'GridView',
    type: 'GridView',

    listHeight: 400, // 列表的总高度
    scale: 1, // 列表缩放
    backgroundColor: [0.15, 0.15, 0.15], // 背景色
    scrollBlockColor: [0.16, 0.16, 0.16], // 滚动条滑块颜色
    scrollBarColor: [0.08, 0.08, 0.08], // 滚动条背景颜色
    scrollBarWidth: 17, // 滚动条宽度
    scrollBarValue: 0, // 滚动条值
    scrollBlockRect: [0, 0, 20, 100], // 滚动条滑块的矩阵信息
    scrollScale: 1, // 滚动条是否显示,为0时滚动条消失（不可设置）
    spacing: [3, 3], // item的间距
    itemBackgroundColor: [0, 0, 0, 0], // item的背景颜色
    itemStrokeColor: [0.2, 0.2, 0.2, 0], // item的边框描边颜色
    itemSelectedColor: [38 / 255, 38 / 255, 38 / 255], // item被选中时的颜色
    itemSelectedRecColor: [0.2, 0.7, 1], // item被选中时的颜色
    itemFontColor: [1, 1, 1], // item的字体颜色
    // ~         itemFontColor: [0.023, 0.023, 0.023],//item的字体颜色
    itemSize: [100, 60], // item的大小
    itemStrokeSize: 1.6, // item的边框描边大小
    itemFontHeight: 0, // item的字体大小
    itemFontSize: 20, // item的字体大小
    showText: false, // 是否显示文字
    limitText: false,
    version: 'CC2014',
    first: null, // 第一个item
    last: null, // 最后一个item
    children: [], // 所有的item
    selection: [], // 被选中的item
    lastSelectedItem: null, // 最后一次被选中的item

    leftClick: function (event) {}, // 左键单击事件
    leftDoubleClick: function (event) {}, // 左键双击事件
    rightClick: function (event) {}, // 右键单击事件
    rightDoubleClick: function (event) {}, // 右键双击事件
    mouseMove: function (event) {}, // 鼠标移动事件
    mouseOut: function (event) {}
  });

  /** *******************网格视图的原型*************************************************************************/
  this.extend(this, {
    add: function (text, image) {
      // 添加元素
      var newItem = new this.item(text, image, this);
      if (this.first) {
        this.last.next = newItem;
        newItem.prev = this.last;
        this.children.push(newItem);
        this.last = this.children[this.children.length - 1];
        this.last.index = this.last.prev.index + 1;
      } else {
        this.first = this.last = newItem;
        this.children.push(newItem);
        this.first.index = 0;
      }

      this.getSelection();

      return newItem;
    },
    removeAll: function () {
      // 移除所有元素
      this.first = this.last = this.lastSelectedItem = null;
      this.selection = this.children = [];
    },
    getChildren: function () {
      // 获取子元素
      var children = [];
      var item = this.first;
      var index = 0;

      while (item) {
        children.push(item);
        item.index = index;
        item = item.next;
        index++;
      }

      this.children = children;
      if (children.length) {
        this.first = children[0];
        this.last = children[children.length - 1];
      }
      return children;
    },
    getSelection: function () {
      // 获取选中元素
      var selection = [];
      var item = this.first;

      while (item) {
        if (item.selected) selection.push(item);
        item = item.next;
      }

      this.selection = selection;
      return selection;
    },
    create: function (parent) {
      // 创建网格视图，包括监听在内
      var e = this;
      var GV = e.GV = parent.add("group{orientation: 'stack', alignment: ['fill','fill'], margins: 0, spacing: 0}");
      var list = e.list = GV.add("button{alignment:['fill','fill']}");
      var eventRect = e.eventRect = GV.add("group{alignment:['fill','fill']}");

      eventRect.addEventListener('mousedown', function (event) {
        e.event.mouseMoving = false;
        e.event.targetScrollBar = e.getScrollBarFromLocation(event.clientX, event.clientY);
        e.event.targetItem = e.getItemFromLocation(event.clientX, event.clientY);
        if (event.button === 0) {
          // 左键
          if (event.detail === 1) {
            // 左键单击
            e.event.leftButtonPressed = true;
            e.event.leftButtonPressedLocation = [event.clientX, event.clientY];
            e.event.leftButtonPressedScrollBarValue = e.scrollBarValue;
            /***************************************/
            if (event.ctrlKey === false) {
              e.mouseMove(event, e.event.targetItem, true);
            }

            /***************************************/
          } else if (event.detail === 2) {
            // 左键双击
            e.leftDoubleClick(event);
          }
        } else if (event.button === 2) {
          // 右键
          if (event.detail === 1) {
            // 右键单击
            e.event.rightButtonPressed = true;
            e.event.rightButtonPressedLocation = [event.clientX, event.clientY];
            e.event.rightButtonPressedScrollBarValue = e.scrollBarValue;
            /***************************************/

            /***************************************/
          } else if (event.detail === 2) {// 右键双击
          }
        }
      });
      eventRect.addEventListener('mousemove', function (event) {
        e.event.mouseMoving = true;
        if (e.event.leftButtonPressed) {
          // 左键移动
          /***************************************/
          e.defaultLeftMouseMove(event);
          e.refresh();
          /***************************************/
        } else if (e.event.rightButtonPressed) {// 右键移动

          /***************************************/

          /***************************************/
        }
        if (event.ctrlKey === false) {
          e.mouseMove(event, e.getItemFromLocation(event.clientX, event.clientY));
        }
      });
      eventRect.addEventListener('mouseup', function (event) {
        if (e.event.leftButtonPressed) {
          // 左键
          if (e.event.mouseMoving) {
            /***************************************/
            e.defaultLeftClick(event);
            e.leftClick(event);
            /***************************************/
          } else {
            e.defaultLeftClick(event);
            e.leftClick(event);
          }
        } else if (e.event.rightButtonPressed) {
          // 右键
          if (e.event.mouseMoving) {
            /***************************************/
            e.rightClick(event);
            /***************************************/
          } else if (event.detail === 1) {
            e.rightClick(event);
          } else if (event.detail === 2) {
            e.rightDoubleClick(event);
          }
        }
        e.event.leftButtonPressed = false;
        e.event.rightButtonPressed = false;
        e.event.mouseMoving = false;
        e.event.targetScrollBar = false;
        e.refresh();
      });
      /*
          eventRect.addEventListener('mouseout', function(event) {
              e.event.leftButtonPressed = false;
              e.event.rightButtonPressed = false;
              e.event.mouseMoving = false;
              e.event.targetScrollBar = false;
              e.mouseOut();
              e.refresh();
          });
          */

      list.onDraw = e.listDraw;
      list.GV = e;
    },
    alignment: function (alignment) {
      this.GV.alignment = alignment;
    },
    size: function (size) {
      this.GV.size = size;
      this.list.size = size;
      this.eventRect.size = size;
    },
    location: function (location) {
      this.GV.location = location;
    },
    listDraw: function () {
      // 重绘函数
      var e = this.GV;
      var g = this.graphics;
      var items = e.children;

      var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, e.backgroundColor);
      var itemBgBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemBackgroundColor);
      var strokePen = g.newPen(g.PenType.SOLID_COLOR, e.itemStrokeColor, e.itemStrokeSize);
      var selectedPen = g.newPen(g.PenType.SOLID_COLOR, e.itemSelectedRecColor, e.itemStrokeSize);
      var fontBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemStrokeColor);
      var selectedBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemSelectedColor);
      var scrollBarBrush = g.newBrush(g.PenType.SOLID_COLOR, e.scrollBarColor);
      var scrollBlockBrush = g.newBrush(g.PenType.SOLID_COLOR, e.scrollBlockColor);

      if (e.showText) e.itemFontHeight = e.itemFontSize;else e.itemFontHeight = 0;
      e.relocationItems();
      e.resizeItems();
      e.resizeScrollBar();
      /******************************************************************************************/
      // 绘制背景
      g.rectPath(0, 0, e.list.size[0] - e.scrollBarWidth * e.scrollScale, e.list.size[1]);
      g.fillPath(bgBrush);
      /******************************************************************************************/
      // item背景色填充
      for (var i = 0; i < items.length; i++) {
        if (items[i].backgroundColor) continue;
        g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3] - items[i].fontRect[3]);
      }
      g.fillPath(itemBgBrush);
      // 添加item指定的背景色
      for (i = 0; i < items.length; i++) {
        if (items[i].backgroundColor) {
          var brush = g.newBrush(g.PenType.SOLID_COLOR, items[i].backgroundColor);
          g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          g.fillPath(brush);
        }
      }

      /******************************************************************************************/
      // item图片绘制
      for (i = 0; i < items.length; i++) {
        if (items[i].image) {
          var image = ScriptUI.newImage(items[i].image);
          var a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.drawImage(image, items[i].rect[0] + items[i].imageRect[0], items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue, items[i].imageRect[2], items[i].imageRect[3]);
          }
        }
      }

      /******************************************************************************************/
      // item描边
      for (i = 0; i < items.length; i++) {
        if (!items[i].selected) {
          if (items[i].strokeColor) continue;
          a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          }
        }
      }
      g.strokePath(strokePen);
      // 为指定了描边颜色的item描边
      for (i = 0; i < items.length; i++) {
        if (items[i].strokeColor) {
          var pen = g.newPen(g.PenType.SOLID_COLOR, items[i].strokeColor, e.itemStrokeSize);
          g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.strokePath(pen);
          }
        }
      }
      // 为被选中的item描边
      for (i = 0; i < items.length; i++) {
        if (items[i].selected) {
          a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          }
        }
      }
      g.strokePath(selectedPen);

      /******************************************************************************************/
      if (e.showText) {
        // item文字背景填充
        for (i = 0; i < items.length; i++) {
          if (!items[i].selected) {
            if (items[i].strokeColor) continue;
            g.rectPath(items[i].rect[0] + items[i].fontRect[0], items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, items[i].fontRect[2], items[i].fontRect[3]);
          }
        }
        g.fillPath(fontBrush);
        // 为指定了描边颜色的item添加文字背景色
        for (i = 0; i < items.length; i++) {
          if (items[i].strokeColor) {
            brush = g.newBrush(g.PenType.SOLID_COLOR, items[i].strokeColor);
            g.rectPath(items[i].rect[0] + items[i].fontRect[0], items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, items[i].fontRect[2], items[i].fontRect[3]);
            a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
            if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
              g.strokePath(brush);
            }
          }
        }
        // 为被选中的item文字添加背景色
        for (i = 0; i < items.length; i++) {
          if (items[i].selected) {
            a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
            if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
              g.rectPath(items[i].rect[0] + items[i].fontRect[0] + 1, items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, items[i].fontRect[2] - 2, items[i].fontRect[3]);
            }
          }
        }
        g.fillPath(selectedBrush);

        /******************************************************************************************/
        // item文字
        var fontPen = g.newPen(g.PenType.SOLID_COLOR, e.itemFontColor, e.itemFontSize * e.scale);

        for (i = 0; i < items.length; i++) {
          var font = ScriptUI.newFont('Microsoft YaHei', ScriptUI.FontStyle.REGULAR, e.itemFontSize * e.scale * 0.6);
          var textWh = g.measureString(items[i].text, font);
          var thisText = items[i].text;
          var totalText = items[i].text;
          if (e.limitText === true) {
            if (e.version === 'CC2014') {
              if (textWh.width >= items[i].imageRect[2] - e.spacing[0] * 2 - 5) {
                for (var j = 0; j < items[i].text.length; j++) {
                  thisText = items[i].text.slice(0, totalText.length - 2 - j);
                  textWh = g.measureString(thisText, font);
                  if (textWh.width < items[i].imageRect[2] - e.spacing[0] * 2 - 5) {
                    break;
                  }
                }
                textWh = 0;
              }
            } else {
              if (textWh.width >= items[i].imageRect[2] - e.spacing[0] * 2 + 5) {
                for (j = 0; j < items[i].text.length; j++) {
                  thisText = items[i].text.slice(0, totalText.length - 2 - j);
                  textWh = g.measureString(thisText, font);
                  if (textWh.width < items[i].imageRect[2] - e.spacing[0] * 2 + 5) {
                    break;
                  }
                }
                textWh = 0;
              }
            }
          }
          if (e.version === 'CC2014') {
            g.drawString(thisText, fontPen, items[i].rect[0] + items[i].fontRect[0], items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue - 10, font);
          } else {
            g.drawString(thisText, fontPen, items[i].rect[0] + items[i].fontRect[0], items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, font);
          }
        }
      } // end of showText

      /******************************************************************************************/
      if (e.scrollScale) {
        // 绘制滚动条背景
        g.rectPath(e.list.size[0] - e.scrollBarWidth, 0, e.scrollBarWidth, e.list.size[1]);
        g.fillPath(scrollBarBrush);

        // 绘制滚动条滑块
        g.rectPath(e.scrollBlockRect[0], e.scrollBlockRect[1], e.scrollBlockRect[2], e.scrollBlockRect[3]);
        g.fillPath(scrollBlockBrush);
      }
    },
    resizeItems: function () {
      // 对所有的item的大小重新指定
      var e = this;
      var items = e.children;
      for (var i = 0; i < items.length; i++) {
        items[i].rect[2] = e.itemSize[0] * e.scale;
        items[i].rect[3] = e.itemSize[1] * e.scale;
        // ~             items[i].imageRect = e.resizeImage(ScriptUI.newImage(items[i].image));
        items[i].fontRect[0] = 0;
        items[i].fontRect[1] = (e.itemSize[1] - e.itemFontHeight) * e.scale + 5;
        items[i].fontRect[2] = e.itemSize[0] * e.scale;
        items[i].fontRect[3] = 15;
      }
    },
    relocationItems: function () {
      // 对所有的item的位置重新指定
      var e = this;
      var list = e.list;
      var items = e.children;
      e.scrollScale = 0;

      var numWidth = Math.floor((list.size[0] - e.scrollBarWidth * e.scrollScale) / (e.itemSize[0] * e.scale + e.spacing[0]));
      if (numWidth === 0) numWidth = 1;
      e.listHeight = Math.ceil(items.length / numWidth) * (e.itemSize[1] * e.scale + e.spacing[1]);

      for (var i = 0; i < items.length; i++) {
        items[i].rect[0] = e.spacing[0] + i % numWidth * (e.itemSize[0] * e.scale + e.spacing[0]);
        items[i].rect[1] = e.spacing[1] + Math.floor(i / numWidth) * (e.itemSize[1] * e.scale + e.spacing[1]);
      }
      e.scrollScale = 1;
    },
    resizeImage: function (image) {
      // 在不改变图片比例的情况下重新指定图片大小
      var e = this;

      var WH = [e.itemSize[0], e.itemSize[1]];
      var wh = image.size;
      var k = Math.min(WH[0] / wh[0], WH[1] / wh[1]);
      var xy;
      wh = [k * wh[0], k * wh[1]];
      xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2];

      return [xy[0] * e.scale, xy[1] * e.scale, wh[0] * e.scale, wh[1] * e.scale];
    },
    resizeScrollBar: function () {
      // 重新指定滚动条的尺寸
      var e = this;
      var list = e.list;
      e.scrollBarMaxValue = e.listHeight - list.size[1] + 7;
      if (e.scrollBarMaxValue < 0) e.scrollBarValue = 0;

      e.scrollBlockRect[0] = list.size[0] - e.scrollBarWidth + 1; // 这里加1是为了让滚动条有一条边线
      e.scrollBlockRect[2] = e.scrollBarWidth - 2; // 这里减2是为了让滚动条有一条边线
      if (e.listHeight < list.size[1]) {
        e.scrollScale = 0;
        e.scrollBlockRect[3] = list.size[1];
      } else {
        e.scrollScale = 1;
        e.scrollBlockRect[3] = list.size[1] * list.size[1] / e.listHeight;
      }
      e.scrollBlockRect[1] = (e.list.size[1] - e.scrollBlockRect[3]) * e.scrollBarValue / e.scrollBarMaxValue;
    },
    defaultLeftClick: function (event) {
      // 默认的左键点击事件
      var e = this;
      var s = e.selection;
      var c = e.children;
      var currentItem = e.event.targetItem;
      if (!currentItem) {
        for (var i = 0; i < s.length; i++) s[i].selected = 0;
        e.lastSelectedItem = null;
        e.getSelection();
      }

      if (currentItem) {
        var preSelected = currentItem.selected;
        if (event.ctrlKey === false) {
          for (i = 0; i < c.length; i++) c[i].selected = 0;
        }
        if (e.lastSelectedItem && event.shiftKey === true) {
          var startIndex = e.lastSelectedItem.index;
          var endIndex = currentItem.index;
          for (i = 0; i < c.length; i++) {
            if ((c[i].index - startIndex) * (c[i].index - endIndex) <= 0) {
              // 判断e.index是否在startIndex和endIndex之间
              c[i].selected = 1;
            }
          }
        }

        currentItem.selected = true;
        if (e.lastSelectedItem && event.ctrlKey === true) {
          if (preSelected === true) {
            currentItem.selected = false;
          }
        } else {
          e.lastSelectedItem = currentItem;
        }

        e.getSelection();
      } else if (e.event.targetScrollBar === 1) {
        e.scrollBarValue = e.scrollBarMaxValue * event.clientY / e.list.size[1];
      }
      /** **********这里添加点击事件***************/

      /********************************************/
    },
    defaultLeftMouseMove: function (event) {
      // 默认的左键移动事件
      var e = this;

      if (e.event.targetScrollBar === 2) {
        e.scrollBarValue = e.event.leftButtonPressedScrollBarValue + (event.clientY - e.event.leftButtonPressedLocation[1]) * e.scrollBarMaxValue / (e.list.size[1] - e.scrollBlockRect[3]);
      } else {
        e.scrollBarValue = e.event.leftButtonPressedScrollBarValue - event.clientY + e.event.leftButtonPressedLocation[1];
      }
      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0;
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue;
      }
      // ~        }
    },
    defaultRightMouseMove: function (event) {
      // 默认的右键移动事件
      var e = this;
      e.scrollBarValue = e.event.rightButtonPressedScrollBarValue - event.clientY + e.event.rightButtonPressedLocation[1];

      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0;
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue;
      }
    },
    getItemFromLocation: function (x, y) {
      // 从点击位置获取当前item
      var e = this;
      var c = e.children;
      for (var i = 0; i < c.length; i++) {
        if (x - c[i].rect[0] > 0 && x - c[i].rect[0] < c[i].rect[2] && y - c[i].rect[1] + e.scrollBarValue > 0 && y - c[i].rect[1] + e.scrollBarValue < c[i].rect[3]) {
          return c[i];
        }
      }
      return null;
    },
    getScrollBarFromLocation: function (x, y) {
      // 当前位置不是滚动条返回0，为滚动条背景返回1，为滚动条滑块返回2
      var e = this;

      if (x > e.list.size[0] - e.scrollBarWidth) {
        if (y > e.scrollBlockRect[1] && y < e.scrollBlockRect[1] + e.scrollBlockRect[3]) {
          return 2;
        }
        return 1;
      }
      return 0;
    },
    refresh: function () {
      // 刷新列表
      this.list.notify('onDraw');
    }
  });

  if (attrs) this.extend(this, attrs); // 将指定属性赋值给新的网格视图

  this.event = { // 监听事件的辅助变量
    leftButtonPressed: false, // 左键是否在按下状态
    leftButtonPressedLocation: [0, 0], // 左键按下时的位置
    rightButtonPressed: false, // 右键是否在按下状态
    rightButtonPressedLocation: [0, 0], // 右键按下时的位置
    leftButtonPressedScrollBarValue: 0, // 左键在按下时的滚动条值
    rightButtonPressedScrollBarValue: 0, // 右键在按下时的滚动条值
    targetItem: null, // 左键在按下时的item目标，没有item为null
    targetScrollBar: 0, // 左键在按下时的滚动条目标，不是滚动条为0，滚动条背景为1，滚动条滑块为2
    mouseMoving: false // 鼠标是否在移动
  };

  if (parent) this.create(parent);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(12);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

//  json2.js
//  2016-05-01
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file is provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/* jslint
    eval, for, this
*/

/* property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
  JSON = {};
}

(function () {
  'use strict';

  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }

  function this_value() {
    return this.valueOf();
  }

  if (typeof Date.prototype.toJSON !== 'function') {
    Date.prototype.toJSON = function () {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
    };

    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }

  var gap;
  var indent;
  var meta;
  var rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string) ? '"' + string.replace(rx_escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }

  function str(key, holder) {
    // Produce a string from holder[key].

    var i; // The loop counter.
    var k; // The member key.
    var v; // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === 'function') {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case 'string':
        return quote(value);

      case 'number':

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is "object", we might be dealing with an object or an array or
      // null.

      case 'object':

        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return 'null';
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === '[object Array]') {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === 'string') {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== 'function') {
    meta = { // table of character substitutions
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    };
    JSON.stringify = function (value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
          indent += ' ';
        }

        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === 'string') {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
      }

      // Make a fake root object containing our value under the key of "".
      // Return the result of stringifying the value.

      return str('', { '': value });
    };
  }

  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== 'function') {
    JSON.parse = function (text, reviver) {
      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        var k;
        var v;
        var value = holder[key];
        if (value && typeof value === 'object') {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with "()" and "new"
      // because they can cause invocation, and "=" because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
      // replace all simple value tokens with "]" characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or "]" or
      // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

      if (rx_one.test(text.replace(rx_two, '@').replace(rx_three, ']').replace(rx_four, ''))) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval('(' + text + ')');

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === 'function' ? walk({ '': j }, '') : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
    };
  }
})();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function OperatorOverload(call, operator) {
  var meta = [
  // Unary operator
  '+', '-', '~',
  // Binary operator
  '*', '/', '%', '^', '<', '<=', '==', '<<', '>>', '>>>', '&', '|', '==='];
  var toObject = function () {
    for (var i = 0; i < arguments.length; i++) {
      this[arguments[i]] = true;
    }
    return this;
  };
  var metaObj = toObject.apply({}, meta);
  if (!metaObj.hasOwnProperty(operator)) {
    return alert('Operator not supported.');
  }

  this.call = call;
  this[operator] = function (operand, rev) {
    this.call(operand, rev);
    return this;
  };
  return this;
}

var cout = $.global.cout = new OperatorOverload(function (operand, rev) {
  if (!rev) {
    $.writeln(operand);
  } else {
    alert(operand);
  }
}, '<<');
$.global.cout = cout;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

$.global.createMenu = createMenu;
function createMenu() {
  var itemList = [{ name: loc(sp.settings), type: 'button' }, { name: 'helperScripts', type: 'dropdownlist' }, { name: 'preview', type: 'button' }, { name: loc(sp.yushe), type: 'button' }, { name: loc(sp.changeName), type: 'button' }, { name: loc(sp.importPicture), type: 'button' }, { name: loc(sp.addModule), type: 'button' }, { name: loc(sp.deleteModule), type: 'button' }, { name: loc(sp.importFile), type: 'button' }, { name: loc(sp.exportFile), type: 'button' }, { name: loc(sp.addGroup), type: 'button' }, { name: loc(sp.deleteGroup), type: 'button' }, { name: loc(sp.addElement), type: 'button' }, { name: loc(sp.cover), type: 'button' }, { name: loc(sp.create), type: 'button' }, { name: loc(sp.deleteElement), type: 'button' }, { name: loc(sp.isShow), type: 'checkbox' }, { name: loc(sp.isName), type: 'checkbox' }, { name: loc(sp.isSavePreview), type: 'checkbox' }, { name: loc(sp.isOffset), type: 'checkbox' }, { name: loc(sp.isPrecomp), type: 'checkbox' }, { name: loc(sp.isEffect), type: 'checkbox' }, { name: loc(sp.cleanProperty), type: 'checkbox' }, { name: loc(sp.offsetKey), type: 'checkbox' }];

  var length = itemList.length;

  var Space = 102 / 5;
  var buttonWidth = 40;
  var checkBoxWidth = 41;
  var buttonHeight = 20;
  var checkBoxHeight = 21;

  if (sp.lang === 'ch') {
    var maxWidth = 180;
  } else {
    maxWidth = 190;
  }

  var ShortMenu = new Window('palette', 'huhu', [0, 0, maxWidth, length * Space / 2 + 2], {
    borderless: true
  });

  for (var i = 0; i < length; i++) {
    var itemWidth, itemHeight;
    if (itemList[i].type === 'button') {
      itemWidth = buttonWidth;
      itemHeight = buttonHeight;
    } else if (itemList[i].type === 'checkbox') {
      itemWidth = checkBoxWidth;
      itemHeight = checkBoxHeight;
    } else if (itemList[i].type === 'dropdownlist') {
      itemWidth = buttonWidth;
      itemHeight = buttonHeight;
    }
    if (itemWidth) {}
    if (i % 2 === 0) {
      ShortMenu[itemList[i].name] = ShortMenu.add(itemList[i].type, [0, parseInt(i / 2) * itemHeight, maxWidth / 2, 22 + parseInt(i / 2) * itemHeight], itemList[i].name);
    } else {
      ShortMenu[itemList[i].name] = ShortMenu.add(itemList[i].type, [maxWidth / 2, parseInt((i - 1) / 2) * itemHeight, maxWidth, 22 + parseInt((i - 1) / 2) * itemHeight], itemList[i].name);
    }
  }

  var isCheckBoxClicked = false;

  ShortMenu[loc(sp.settings)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    $.global.settingsButtonFunc();
  };

  ShortMenu['helperScripts'].add('item', loc(sp.helperScripts));
  ShortMenu['helperScripts'].add('item', loc(sp.expressionTranslate));
  ShortMenu['helperScripts'].add('item', loc(sp.reloadGroup));
  ShortMenu['helperScripts'].add('item', loc(sp.saveEachLayer));
  ShortMenu['helperScripts'].add('item', loc(sp.cutLength));
  ShortMenu['helperScripts'].selection = 0;

  ShortMenu['helperScripts'].onChange = ShortMenu['helperScripts'].onChanging = function () {
    try {
      // run sp_translate script
      this.selection.index === 1 && $.global.translate() ||

      // generate and then save the whole group
      this.selection.index === 2 && $.global.reloadPic() ||

      // auto save every layer in current comp,one layer as one element
      this.selection.index === 3 && $.global.autoSave() ||

      // cut layers' length by opacity and comp length
      this.selection.index === 4 && $.global.cutLength();
    } catch (err) {
      err.printa();
    }

    // back list's selection
    this.selection = 0;
  };

  ShortMenu['preview'].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.previewAll();
  };

  ShortMenu[loc(sp.yushe)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    $.global.presetWindow();
  };

  ShortMenu[loc(sp.changeName)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.changeName();
  };

  ShortMenu[loc(sp.importPicture)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.importImage();
  };

  ShortMenu[loc(sp.addModule)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.addModule();
  };

  ShortMenu[loc(sp.deleteModule)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.deleteModule();
  };

  ShortMenu[loc(sp.importFile)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.importFiles();
  };

  ShortMenu[loc(sp.exportFile)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.exportFile();
  };

  ShortMenu[loc(sp.addGroup)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.addGroup();
  };

  ShortMenu[loc(sp.deleteGroup)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.deleteGroup();
  };

  ShortMenu[loc(sp.addElement)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.newItem();
  };

  ShortMenu[loc(sp.cover)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.cover();
  };

  ShortMenu[loc(sp.create)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.newLayer();
  };

  ShortMenu[loc(sp.deleteElement)].onClick = function () {
    isCheckBoxClicked = false;
    ShortMenu.hide();
    sp.fns.deleteItem();
  };

  ShortMenu[loc(sp.isShow)].value = sp.showThumbValue;
  ShortMenu[loc(sp.isName)].value = sp.autoNameValue;
  ShortMenu[loc(sp.isSavePreview)].value = sp.savePreviewValue;
  ShortMenu[loc(sp.isOffset)].value = sp.saveMaterialValue;
  ShortMenu[loc(sp.isPrecomp)].value = sp.preComposeValue;
  ShortMenu[loc(sp.isEffect)].value = sp.onlyEffectValue;
  ShortMenu[loc(sp.cleanProperty)].value = sp.cleanGroupValue;
  ShortMenu[loc(sp.offsetKey)].value = sp.offsetKeyframeValue;

  ShortMenu[loc(sp.isShow)].onClick = function () {
    sp.showThumbValue = this.value;
    $.global.gv.showText = this.value;
    sp.saveSetting('showThumb', this.value.toString());
    isCheckBoxClicked = true;
    sp.gv.refresh();
  };

  ShortMenu[loc(sp.isName)].onClick = function () {
    sp.autoNameValue = this.value;
    sp.saveSetting('autoName', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu[loc(sp.isSavePreview)].onClick = function () {
    sp.savePreviewValue = this.value;
    sp.saveSetting('savePreview', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu[loc(sp.isOffset)].onClick = function () {
    sp.saveMaterialValue = this.value;
    sp.saveSetting('saveMaterial', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu[loc(sp.isPrecomp)].onClick = function () {
    sp.preComposeValue = this.value;
    sp.saveSetting('preCompose', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu[loc(sp.isEffect)].onClick = function () {
    sp.onlyEffectValue = this.value;
    sp.saveSetting('onlyEffect', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu[loc(sp.cleanProperty)].onClick = function () {
    sp.cleanGroupValue = this.value;
    sp.saveSetting('cleanGroup', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu[loc(sp.offsetKey)].onClick = function () {
    sp.offsetKeyframeValue = this.value;
    sp.saveSetting('offsetKeyframe', this.value.toString());
    isCheckBoxClicked = true;
  };

  ShortMenu.addEventListener('blur', function () {
    if (isCheckBoxClicked === false) {
      ShortMenu.hide();
    } else {
      isCheckBoxClicked = true;
    }
  });

  ShortMenu.onDeactivate = function () {
    ShortMenu.hide();
  };

  ShortMenu.addEventListener('keydown', function (event) {
    ShortMenu.hide();
  });

  return ShortMenu;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {


/** **********************************界面的字符串资源***************************************/
sp.extend(sp, {
  isDown: { en: 'Would you like to download new version now?', ch: '现在开始下载新版本吗?' },
  settings: { en: 'Setting', ch: '设置' },
  groupName: { en: 'Group name :', ch: '组名 :' },
  elementName: { en: 'Element Name :', ch: '元素名 :' },
  changeName: { en: 'Rename item', ch: '重命名元素' },
  importPicture: { en: 'Import picture', ch: '导入图片' },
  importFile: { en: 'Import file', ch: '导入组' },
  exportFile: { en: 'Export file', ch: '导出组' },
  addGroup: { en: 'New group', ch: '新建组' },
  deleteGroup: { en: 'Remove group', ch: '删除组' },
  addElement: { en: 'New item', ch: '新建元素' },
  deleteElement: { en: 'Remove item', ch: '删除元素' },
  create: { en: 'New layer', ch: '生成层' },
  cover: { en: 'Cover item', ch: '覆盖元素' },
  isShow: { en: 'Show text', ch: '显示文字' },
  isAlert: { en: 'Deleting Alert', ch: '删除时警告' },
  isPrecomp: { en: 'Pre-compose', ch: '预合成' },
  isOffset: { en: 'Save material', ch: '存储素材' },
  isName: { en: 'Auto rename', ch: '自动取名' },
  isEffect: { en: 'Only property', ch: '仅生成效果' },
  cleanProperty: { en: 'Empty prop', ch: '清空属性组' },
  offsetKey: { en: 'Shift keyframe', ch: '关键帧偏移' },
  sureDelete: { en: 'Are you sure to delete it?', ch: '确认删除?' },
  helperScripts: { en: 'Help scripts', ch: '辅助脚本' },
  expressionTranslate: { en: 'Fix expression errors', ch: '表达式翻译' },
  script: { en: 'Sp_palette v1.0', ch: '形状层画板' },
  reloadGroup: { en: 'Reload previews of group', ch: '重载组内预览动画' },
  saveEachLayer: { en: 'Save every layer in active comp', ch: '自动存储每一层' },
  cutLength: { en: 'Cut layer length', ch: '裁剪层长度' },
  blankName: { en: 'Name should not be empty!', ch: '名字不应为空!' },
  existName: { en: 'Element with the same name exists already!', ch: '相同名字的元素已存在!' },
  overWritten: { en: 'File with the same name exists already!', ch: '相同名字的文件已存在!' },
  inputName: { en: 'Please input your name!', ch: '请输入名字!' },
  alertSpe: { en: 'There are special symbols in selectedLayers,please rename them first!', ch: '选中层名字有特殊符号,请首先重命名选中层!' },
  deleteFolder: { en: 'Empty temp folder', ch: '清空素材文件夹' },
  changeGroupName: { en: 'Change name of group', ch: '重命名选中组' },
  deleteOk: { en: 'Clean folder successfully!', ch: '清空文件夹完毕!' },
  yushe: { en: 'Preset Setting', ch: '预设设置' },
  jinOne: { en: 'Please select groups that will be created on selectedLayers', ch: '请选择在仅生成效果时要在选中层上生成的属性组' },
  jinTwo: { en: 'Please select groups that will be empty on selectedLayers before creating Properties', ch: '请选择在仅生成效果之前要清空的选中层的属性组' },
  isSureGroup: { en: 'What you are deleting is a Group.\rAre you sure?', ch: '你正在删除的是一个组.\r确定删除吗?' },
  isSureGroup2: { en: 'Repeat!\rWhat you are deleting is a Group.\rAre you sure?\r', ch: '重复!\r你正在删除的是一个组.\r确定删除吗?' },
  _1: { en: 'Mask', ch: '遮罩' },
  _2: { en: 'Effect', ch: '效果' },
  _3: { en: 'Transform', ch: '变换' },
  _4: { en: 'Material options', ch: '3D材质选项' },
  _5: { en: 'Layer styles', ch: '图层样式' },
  _6: { en: 'Shape content', ch: '形状层形状组' },
  _7: { en: 'Text animators', ch: '文字层动画器' },
  _8: { en: 'Light options', ch: '灯光选项' },
  _9: { en: 'Camera options', ch: '摄像机选项' },
  setName: { en: 'Please input the name.', ch: '请输入名字' },
  checkVersion: { en: 'Check version', ch: '检查更新' },
  newVersionFind: { en: 'New version found,please download the new version ', ch: '存在新版本,请下载最新版v' },
  newVersionNotFind: { en: 'No new version!', ch: '已是最新版!' },
  link: { en: 'Weibo', ch: '作者微博' },
  about: {
    en: `Made by:Smallpath
E-mail:smallpath2013@gmail.com
Source Code:
github.com/Smallpath/Memory

DoubleClick:generate new layers or properties on selected layers from selected element.
RightClick:call the shortcut menu.
Ctrl/Alt+RightClick:save selected layers as a new element.
Shift+Rightclick:call the up and down window

Shortcutkey when script runs as Window:
Key 'D' or 'Delete':delete selected element.
Key 'F': overlap selected element.
Key 'Up':drop up selected element.
Key 'Down':drop down selected element.`,
    ch: `作者:
    Smallpath
邮箱:
    smallpath2013@gmail.com
源码托管地址:
github.com/Smallpath/Memory

右键点击:呼出右键菜单.
双击:从选中元素创建层或创建效果.
Ctrl/Alt+右键点击:从选中的层读取层信息以创建新元素.
Shift+右键:唤出移动元素的窗口

窗口模式运行脚本时:
D键:删除选中元素.
F键:覆盖选中元素.
上键:上移选中元素.
下键:下移选中元素.`
  },
  refresh: {
    en: `Please run this script to refresh pictures only when your group has been created with wrong thumbnails(such as all black)\rIt will spent a lot of time.\rNew thumbnails will be created at the time of active comp,so set your comp's time first.`,
    ch: `生成组内所有元素的预览动画:
##请用本功能对非3.x版本保存的组进行生成预览动画的操作:

此功能将生成组内所有元素的主缩略图和预览动画,其中主缩略图为当前合成的当前时间点的画面

注意:此功能将耗费大量时间,脚本会弹出图片文件夹,你可以根据其中的图片判断预览动画的生成进度
`
  },
  auto: {
    en: `This script helps you simplify you saving proccess\rIt will save every layer in active comp as a new element.`,
    ch: `批量存储功能:

这会将当前合成中每一层都分别存储为一个新元素.

此功能可以帮助你快速存储新元素,十分适合存储大量的MG合成层
脚本会弹出图片文件夹,你可以根据其中的图片来判断预览动画的生成进度
` },
  cutLengthTwo: {
    en: 'This script will cut every layer in current comp, related to opacity for common layer and content length for comp layer.',
    ch: '此功能将会裁剪当前合成中每一层的长度,根据普通层的透明度与合成层内容的长度.'
  },
  output: { en: 'Export groups', ch: '批量导出组' },
  ok: { en: 'Ok', ch: '确定' },
  cancel: { en: 'Cancel', ch: '取消' },
  complete: { en: 'Complete!', ch: '导出完成!' },
  showText: { en: 'Show text', ch: '显示文字' },
  ui1: { en: 'The newer UI', ch: '新界面' },
  ui2: { en: 'The older UI', ch: '旧界面' },
  sys: { en: 'Script find that Sp_memory v1.4 has been used the first time.\rPlease select the UI type,Yes for new UI and No for previous UI.', ch: '脚本检测到Sp_memory v1.4首次被使用.\r请选择脚本界面,Yes为新界面,No为旧界面.' },
  uiC: { en: 'Please restart script,ui will be changed.', ch: '界面已更新,请重启脚本' },
  from: { en: 'Range is 0.', ch: '元素下标范围为:0' },
  ud: { en: 'Up and down', ch: '上下移动选中元素' },
  up: { en: 'Up', ch: '上移' },
  down: { en: 'Down', ch: '下移' },
  jmp: { en: 'Jump', ch: '跳转' },
  coverChange: { en: 'Update thumb when cover', ch: '覆盖时更新缩略图' },
  folderName: { en: 'The folder name of collect feature:', ch: '收集生成层时的文件夹名:' },
  effectName: { en: "The group name that can enable 'Only property' :", ch: '默认开启仅生成效果的组名:' },
  limitText: { en: 'Limit the text for UI', ch: '限制新界面的文字' },
  scriptSetting: { en: 'Setting', ch: '设置' },
  settingPre: { en: 'Preference', ch: '预设' },
  thumbType: { en: 'Enable new type of thumb', ch: '启用另一种缩略图' },
  addModule: { en: 'New module', ch: '新建模块' },
  deleteModule: { en: 'Remove module', ch: '删除模块' },
  deleteModuleAlert: {
    en: 'Dangerous!\r\nYou are deleting a module!\r\nAll groups in this module will be removed!\r\nDo you really want to remove this module?',
    ch: '警告!\r\n你正在删除一个模块!\r\n所有包含在此模块中的组都将被删除!\r\n你想要继续删除吗?'
  },
  addAlert: { en: 'Repeart:\r\n', ch: '重复:\r\n' },
  move: { en: 'Cut selected group to other module', ch: '剪切选中组到其他模块' },
  editModule: { en: 'Move module or rename module', ch: '改变模块顺序或重命名模块' },
  changeModuleName: { en: 'Change module name', ch: '重命名选中模块' },
  moduleHelpTip: { en: "press key 'Up' and 'Down can move the selected module' ", ch: '方向上下键可移动选中模块' },
  quit: { en: 'Quit', ch: '退出' },
  selectGroupFirst: { en: 'Please select a group first!', ch: '请先选中一个组!' },
  selectModuleFirst: { en: 'Please select a module first!', ch: '请先选中一个模块!' },
  frameSecondText: { en: 'The milliseconds length of frame continues when preview:', ch: '预览时一张图片持续的毫秒数:' },
  frameNumText: { en: 'The number of picture sequence generated for preview', ch: '生成供预览的图片序列时图片的数量:' },
  reloadNeedFrames: {
    en: "Please input the max frames which will be used to correct the duration of Preview.Keep blank if you don't what this feature",
    ch: '请输入最大帧数,这将被用来使预览动画的时间范围更加准确\r\n不输入则将不进行校准'
  },
  needComp: { en: 'Please select a comp first', ch: '脚本需要一个合成,当前合成不存在!' },
  previewAll: { en: 'Preview all', ch: '预览全部' },
  previewSelected: { en: 'Preview selected', ch: '预览选中' },
  needElement: { en: 'Please select a element in the group', ch: '组内元素未被选中,请首先选中一个元素' },
  needElements: { en: 'Please select at least one element in the group', ch: '组内元素未被选中,请至少选中一个元素' },
  needLayers: { en: 'Please select at least one layer in the current comp', ch: '请选中至少一个层' },
  needModule: { en: 'Please create a module first', ch: '请先新建一个模块' },
  isSavePreview: { en: 'Save preview', ch: '存储预览' },
  searchWindow: { en: 'Search', ch: '搜索' },
  getReport: { en: 'Get report', ch: '生成报告' }

});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var settingsButtonFunc = function () {
  var _ = $.global.UIParser(global);

  var UIJson = {
    newWin: {
      type: 'palette',
      text: sp.scriptName + ' v' + sp.scriptVersion,
      margins: 10,
      children: {

        group1: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            helpText: {
              type: 'edittext',
              properties: {
                multiline: true,
                scrolling: false
              },
              preferredSize: [150, 280],
              text: '',
              enabled: 1
            },
            gr: {
              type: 'group',
              orientation: 'column',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              margins: 0,
              spacing: 0,
              children: {
                drop: {
                  type: 'dropdownlist',
                  preferredSize: [150, 20]
                },
                wlist: {
                  type: 'listbox',
                  preferredSize: [150, 260]
                }
              }
            }
          }
        },
        group2: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            deleteFolder: {
              type: 'Button',
              preferredSize: [165, 27],
              text: loc(sp.deleteFolder),
              enabled: 1
            },
            changeGroupName: {
              type: 'Button',
              preferredSize: [165, 27],
              text: loc(sp.changeGroupName),
              enabled: 1
            }
          }
        },
        group3: {
          type: 'group',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            output: {
              type: 'Button',
              text: loc(sp.output),
              enabled: 1
            },
            move: {
              type: 'Button',
              text: loc(sp.move),
              enabled: 1
            }
          }
        },
        group35: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            editModule: {
              type: 'Button',
              preferredSize: [330, 27],
              text: loc(sp.editModule),
              enabled: 1
            }
          }
        },
        group4: {
          type: 'group',
          orientation: 'column',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            g0: {
              type: 'group',
              orientation: 'row',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                gr1: {
                  type: 'group',
                  children: {
                    limitText: {
                      type: 'checkbox',
                      text: loc(sp.limitText)
                    }
                  }
                },
                gr2: {
                  type: 'group',
                  children: {
                    coverChange: {
                      type: 'checkbox',
                      text: loc(sp.coverChange)
                    }
                  }
                }
              }
            },
            gr1: {
              type: 'group',
              orientation: 'row',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                gr1: {
                  type: 'group',
                  children: {
                    thumbType: {
                      type: 'checkbox',
                      text: loc(sp.thumbType)
                    }
                  }
                },
                gr2: {
                  type: 'group',
                  children: {
                    deleteAlert: {
                      type: 'checkbox',
                      text: loc(sp.isAlert)
                    }
                  }
                }
              }
            },
            gr4: {
              type: 'group',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                frameSecond: {
                  type: 'statictext',
                  text: loc(sp.frameSecondText)
                },
                frameSecondText: {
                  type: 'edittext',
                  text: '',
                  characters: 18
                }
              }
            },
            gr5: {
              type: 'group',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                frameNum: {
                  type: 'statictext',
                  text: loc(sp.frameNumText)
                },
                frameNumText: {
                  type: 'edittext',
                  text: '',
                  characters: 18
                }
              }
            },
            gr0: {
              type: 'group',
              orientation: 'row',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                gr2: {
                  type: 'group',
                  alignment: ['fill', 'fill'],
                  alignChildren: ['fill', 'fill'],
                  children: {
                    folderName: {
                      type: 'statictext',
                      text: loc(sp.folderName)
                    },
                    folderNameText: {
                      type: 'edittext',
                      text: '',
                      justify: 'center',
                      characters: 17
                    }
                  }
                }
              }
            },
            gr3: {
              type: 'group',
              alignment: ['fill', 'fill'],
              alignChildren: ['fill', 'fill'],
              children: {
                effectName: {
                  type: 'statictext',
                  text: loc(sp.effectName)
                },
                effectNameText: {
                  type: 'edittext',
                  text: '',
                  characters: 18
                }
              }
            }

          }
        }, // end of group4
        group5: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            ch: {
              type: 'Button',
              text: '中文',
              enabled: 0
            },
            en: {
              type: 'Button',
              text: 'English',
              enabled: 0
            }
          }
        },
        // ~                         group6:{type:'group',orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],children:{
        // ~                                           ui1:{type:'Button',text:loc(sp.ui1),enabled:0},
        // ~                                           ui2:{type:'Button',text:loc(sp.ui2),enabled:0}
        // ~                                     }},
        group7: {
          type: 'group',
          orientation: 'row',
          alignment: ['fill', 'fill'],
          alignChildren: ['fill', 'fill'],
          children: {
            checkVersion: {
              type: 'Button',
              text: loc(sp.checkVersion),
              enabled: 1
            },
            openLink: {
              type: 'Button',
              text: loc(sp.link),
              enabled: 1
            }
          }
        }

      }
    } // end of newWin

  };

  var win = _.newWindow(UIJson)[0];

  _('*').each(function (e) {
    switch (e.id) {
      case 'deleteAlert':
        e.value = sp.getSettingAsBool('deleteAlert');
        e.onClick = function () {
          sp.deleteAlertValue = this.value;
          sp.saveSetting('deleteAlert', this.value.toString());
        };
        break;
      case 'frameSecondText':
        e.text = sp.frameSecond.toString();
        e.onChange = function () {
          if (isNaN(this.text)) {
            this.text = sp.frameSecond;
            return;
          }

          var value = parseInt(this.text);
          if (value >= 200) value = 200;
          if (value <= 33) value = 33;
          sp.frameSecond = value;
          sp.saveSetting('frameSecond', value);
          this.text = value.toString();
        };
        break;
      case 'frameNumText':
        e.text = sp.frameNum.toString();
        e.onChange = function () {
          if (isNaN(this.text)) {
            this.text = sp.frameNum;
            return;
          }

          var value = parseInt(this.text);
          if (sp.isCC2015) {
            if (value >= 300) value = 300;
          } else {
            if (value >= 50) value = 50;
          }
          if (value <= 0) value = 0;
          sp.frameNum = value;
          sp.saveSetting('frameNum', value);
          this.text = value.toString();
        };
        break;
      case 'move':
        e.onClick = function () {
          if (!_('#wlist')[0].selection || !_('#drop')[0]) return alert(loc(sp.selectGroupFirst));
          moveWindow(_('#wlist')[0].selection, _('#drop')[0].selection, win);
        };
        break;
      case 'editModule':
        e.onClick = function () {
          if (!_('#drop')[0]) return alert(loc(sp.selectModuleFirst));
          moduleWindow(_('#drop')[0].selection, win);
        };
        break;
      case 'drop':
        sp.xmlGroupNames.forEach(function (item, index) {
          this.add('item', item);
        }, e);
        var wlist = _('#wlist')[0];
        e.onChange = function () {
          if (!this.selection) return;
          if (!sp.parentDroplist.selection) return;
          wlist.removeAll();
          sp.parentDroplist.selection = this.selection.index;
          sp.xmlCurrentFileNames.forEach(function (item, index) {
            this.add('item', item);
          }, wlist);
          sp.gv.refresh();
        };
        e.selection = sp.parentDroplist.selection ? sp.parentDroplist.selection.index : 0;
        break;
      case 'helpText':
        e.text = loc(sp.about);
        e.onChange = e.onChanging = function () {
          this.text = loc(sp.about);
        };
        break;
      case 'wlist':
        break;
      case 'deleteFolder':
        e.onClick = function () {
          var folder = sp.materialFolder;
          deleteThisFolder(folder);
          alert(loc(sp.deleteOk));
        };
        break;
      case 'changeGroupName':
        e.onClick = function () {
          var wlist = _('#wlist')[0];
          if (!wlist.selection) return alert(loc(sp.selectGroupFirst));
          var newGroupName = prompt(loc(sp.setName), wlist.selection.text);
          if (!newGroupName) return;
          if (sp.xmlFileNames.has(newGroupName)) {
            alert(loc(sp.existName));
            return;
          }

          var file = sp.getFileByName(wlist.selection.text);
          file.rename(newGroupName + '.xml');
          var xml = new XML(sp.settingsFile.readd());
          var index = sp.getGlobalIndexFromFileName(wlist.selection.text);
          xml.ListItems.insertChildAfter(xml.ListItems.child(index), new XML('<Name>' + newGroupName.toString() + '</Name>'));
          xml.ListItems.child(index).setLocalName('waitToDelete');
          delete xml.ListItems.waitToDelete;
          sp.settingsFile.writee(xml);
          var folder = sp.getImageFolderByName(wlist.selection.text);
          if (folder.exists) {
            folder.rename(newGroupName);
          }
          wlist.items[wlist.selection.index].text = newGroupName;
          sp.droplist.items[wlist.selection.index].text = newGroupName;
          sp.xmlFileNames[index] = newGroupName;
          sp.droplist.notify('onChange');
        };
        break;
      case 'output':
        e.onClick = function () {
          outputWindow();
        };
        break;
      case 'limitText':
        e.value = sp.getSettingAsBool('limitText');
        e.onClick = function () {
          sp.saveSetting('limitText', this.value.toString());
        };
        break;
      case 'coverChange':
        e.value = sp.getSettingAsBool('coverChange');
        e.onClick = function () {
          sp.saveSetting('coverChange', this.value.toString());
          sp.coverChangeValue = this.value;
        };
        break;
      case 'thumbType':
        e.value = sp.getSettingAsBool('thumbType');
        e.onClick = function () {
          sp.saveSetting('thumbType', this.value.toString());
          sp.thumbTypeValue = this.value;
        };
        break;
      case 'folderNameText':
        e.text = sp.getSetting('folderName');
        e.onChange = function () {
          sp.saveSetting('folderName', this.text);
        };
        break;
      case 'effectNameText':
        e.text = sp.getSetting('effectName');
        e.onChange = function () {
          sp.saveSetting('effectName', this.text);
        };
        break;
      case 'ch':
        e.enabled = sp.lang === 'en';
        if (e.enabled === true) {
          e.enabled = !sp.isForceEnglish();
        }
        e.onClick = function () {
          sp.saveSetting('language', 'ch');
          alert('请重新打开脚本,语言会将自动变更为中文.');
          _('#en')[0].enabled = true;
          _('#ch')[0].enabled = false;
        };
        break;
      case 'en':
        e.enabled = sp.lang === 'ch';
        e.onClick = function () {
          sp.saveSetting('language', 'en');
          alert('Please restart script,language will be changed into English.');
          _('#en')[0].enabled = false;
          _('#ch')[0].enabled = true;
        };
        break;
      case 'checkVersion':
        if (sp.lang === 'en') {
          e.size = _('#openLink')[0].size = [211, 27];
        }
        e.onClick = function () {
          var latest = parseFloat(sp.getVersion('Sp_memory'));
          var nowVersion = sp.version;
          if (latest > nowVersion) {
            alert(loc(sp.newVersionFind) + latest.toString());
            if (confirm(loc(sp.isDown))) {
              sp.openLink(sp.downloadLink + ' v' + latest.toString() + '.jsxbin');
            }
          } else {
            alert(loc(sp.newVersionNotFind));
          }
        };
        break;
      case 'openLink':
        e.onClick = function () {
          sp.openLink(sp.weiboLink);
        };
        break;
    }
  });

  var warpDrop = function (a, b, index1, index2) {
    var tempD = a.text;
    a.text = b.text;
    b.text = tempD;
    var tempXML = sp.xmlCurrentFileNames[index1];
    sp.xmlCurrentFileNames[index1] = sp.xmlCurrentFileNames[index2];
    sp.xmlCurrentFileNames[index2] = tempXML;
  };

  var exchange = function (isUp, wXML) {
    var xmlIndex = _('#wlist')[0].selection.index;
    var groupIndex = _('#drop')[0].selection.index;
    var name = sp.droplist.selection.text;

    if (isUp === true) {
      var wupxml = new XML(wXML.ParentGroup.child(groupIndex).child(xmlIndex));
      wXML.ParentGroup.child(groupIndex).insertChildBefore(wXML.ParentGroup.child(groupIndex).child(xmlIndex - 1), wupxml);

      wXML.ParentGroup.child(groupIndex).child(xmlIndex + 1).setLocalName('waitToDelete');

      delete wXML.ParentGroup.child(groupIndex).waitToDelete;

      sp.settingsFile.writee(wXML);
      sp.swap(_('#wlist')[0].items[xmlIndex - 1], _('#wlist')[0].items[xmlIndex]);
      warpDrop(sp.droplist.items[xmlIndex - 1], sp.droplist.items[xmlIndex], xmlIndex - 1, xmlIndex);
    } else {
      var wdownxml = new XML(wXML.ParentGroup.child(groupIndex).child(xmlIndex));

      wXML.ParentGroup.child(groupIndex).insertChildAfter(wXML.ParentGroup.child(groupIndex).child(xmlIndex + 1), wdownxml);
      wXML.ParentGroup.child(groupIndex).child(xmlIndex).setLocalName('waitToDelete');
      delete wXML.ParentGroup.child(groupIndex).waitToDelete;

      sp.settingsFile.writee(wXML);
      sp.swap(_('#wlist')[0].items[xmlIndex + 1], _('#wlist')[0].items[xmlIndex]);
      warpDrop(sp.droplist.items[xmlIndex + 1], sp.droplist.items[xmlIndex], xmlIndex + 1, xmlIndex);
    }
    sp.droplist.selection = sp.droplist.find(name);
    sp.droplist.notify('onChange');
    sp.gv.refresh();
  };

  var handleKey = function (key, control) {
    var wXML = new XML(sp.settingsFile.readd());
    switch (key.keyName) {
      case 'Up':
        if (_('#wlist')[0].selection !== null && _('#wlist')[0].selection.index > 0 && _('#drop')[0].selection) {
          exchange(true, wXML);
        };
        break;
      case 'Down':
        if (_('#wlist')[0].selection !== null && _('#wlist')[0].selection.index < _('#wlist')[0].items.length - 1 && _('#drop')[0].selection) {
          exchange(false, wXML);
        };
        break;
    }
  };

  _('#wlist')[0].addEventListener('keydown', function (k) {
    handleKey(k, this);
  });

  win.center();
  win.show();
};

function moduleWindow(groupItem, win) {
  var moveWin = new Window('dialog', 'Module', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = `Group{
                            orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                            helpTip:StaticText{text:'` + loc(sp.moduleHelpTip) + `'},
                            wlist:ListBox{properties:{multiselect:0}},
                            oc:Group{
                                alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
                                ok:Button{text:'` + loc(sp.changeModuleName) + `'},
                                cancel:Button{text:'` + loc(sp.quit) + `'}
                            }}`;
  try {
    outRes = moveWin.add(outRes);
  } catch (err) {
    alert(err);
  }
  sp.xmlGroupNames.forEach(function (item, index) {
    this.add('item', item);
  }, outRes.wlist);

  outRes.wlist.addEventListener('keydown', function (k) {
    switch (k.keyName) {
      case 'Up':

        if (this.selection !== null && this.selection.index > 0) {
          var xml = new XML(sp.settingsFile.readd());
          var groupIndex = this.selection.index;
          var targetXml = xml.ParentGroup.child(groupIndex);

          xml.ParentGroup.insertChildBefore(xml.ParentGroup.child(groupIndex - 1), new XML(targetXml));
          xml.ParentGroup.child(groupIndex + 1).setLocalName('waitToDelete');
          delete xml.ParentGroup.waitToDelete;

          sp.settingsFile.writee(xml);

          sp.reloadParentDroplist();
          var selection = parseInt(sp.getSetting('parentSelection'));
          sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
          selection = parseInt(sp.getSetting('thisSelection'));
          sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

          sp.swap(outRes.wlist.items[this.selection.index - 1], outRes.wlist.items[this.selection.index]);
        };
        break;
      case 'Down':
        if (this.selection !== null && this.selection.index < this.items.length - 1) {
          xml = new XML(sp.settingsFile.readd());
          groupIndex = this.selection.index;
          targetXml = xml.ParentGroup.child(groupIndex);

          xml.ParentGroup.insertChildAfter(xml.ParentGroup.child(groupIndex + 1), new XML(targetXml));
          xml.ParentGroup.child(groupIndex).setLocalName('waitToDelete');
          delete xml.ParentGroup.waitToDelete;

          sp.settingsFile.writee(xml);

          sp.reloadParentDroplist();
          selection = parseInt(sp.getSetting('parentSelection'));
          sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
          selection = parseInt(sp.getSetting('thisSelection'));
          sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

          sp.swap(outRes.wlist.items[this.selection.index], outRes.wlist.items[this.selection.index + 1]);
        };
        break;
    }
  });

  outRes.oc.cancel.onClick = function () {
    moveWin.close();
    win.close();
    settingsButtonFunc();
  };

  outRes.oc.ok.onClick = function () {
    var wlist = outRes.wlist;
    if (!wlist.selection) return;
    var newGroupName = prompt(loc(sp.setName), wlist.selection.text);
    if (!newGroupName) return;
    if (sp.xmlGroupNames.has(newGroupName)) {
      alert(loc(sp.existName));
      return;
    }

    var xml = new XML(sp.settingsFile.readd());
    var parentGroup = xml.ParentGroup;
    var groupIndex = wlist.selection.index;

    var editXml = parentGroup.child(groupIndex);
    editXml['@groupName'] = newGroupName;

    sp.settingsFile.writee(xml);

    sp.reloadParentDroplist();
    var selection = parseInt(sp.getSetting('parentSelection'));
    sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
    selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

    moveWin.close();
    win.close();
  }; // last

  outRes.wlist.size = [200, 300];
  moveWin.show();
}

function moveWindow(xmlItem, groupItem, win) {
  var moveWin = new Window('dialog', 'Move', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = `Group{
                            orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                            wlist:ListBox{properties:{multiselect:0}},
                            oc:Group{
                                alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
                                ok:Button{text:'` + loc(sp.ok) + `'},
                                cancel:Button{text:'` + loc(sp.cancel) + `'}
                            }}`;
  try {
    outRes = moveWin.add(outRes);
  } catch (err) {
    alert(err);
  }
  sp.xmlGroupNames.forEach(function (item, index) {
    this.add('item', item);
  }, outRes.wlist);

  outRes.oc.cancel.onClick = function () {
    moveWin.close();
    win.close();
    settingsButtonFunc();
  };

  outRes.oc.ok.onClick = function () {
    if (!outRes.wlist.selection) return;
    if (outRes.wlist.selection.text === groupItem.text) return;
    var xml = new XML(sp.settingsFile.readd());
    var parentGroup = xml.ParentGroup;
    var xmlIndex = xmlItem.index;
    var groupIndex = groupItem.index;

    var editXml = parentGroup.child(groupIndex).child(xmlIndex);
    var targetXml = parentGroup.child(outRes.wlist.selection.index);
    targetXml.appendChild(new XML(editXml));

    parentGroup.child(groupIndex).child(xmlIndex).setLocalName('waitToDelete');
    delete parentGroup.child(groupIndex).waitToDelete;
    sp.settingsFile.writee(xml);

    sp.reloadParentDroplist();
    var selection = parseInt(sp.getSetting('parentSelection'));
    sp.parentDroplist.selection = selection <= sp.parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
    selection = parseInt(sp.getSetting('thisSelection'));
    sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;

    moveWin.close();
    win.close();
    settingsButtonFunc();
  }; // last

  outRes.wlist.size = [200, 300];
  moveWin.show();
}

function outputWindow() {
  var outWin = new Window('window', 'Export', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = `Group{
                            orientation: 'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                            wlist:ListBox{properties:{multiselect:1}},
                            oc:Group{
                                alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],
                                ok:Button{text:'` + loc(sp.ok) + `'},
                                cancel:Button{text:'` + loc(sp.cancel) + `'}
                            }}`;
  try {
    outRes = outWin.add(outRes);
  } catch (err) {
    alert(err);
  }
  for (var i = 0; i < sp.xmlFileNames.length; i++) {
    outRes.wlist.add('item', sp.xmlFileNames[i]);
  }
  outRes.wlist.size = [200, 400];
  outWin.show();

  outRes.oc.cancel.onClick = function () {
    outWin.close();
  };

  outRes.oc.ok.onClick = function () {
    if (outRes.wlist.selection !== null) {
      var exportFolder = Folder.selectDialog('Please select folder');
      if (exportFolder !== null && exportFolder instanceof Folder) {
        for (var i = 0; i < outRes.wlist.selection.length; i++) {
          var sourceFile = sp.getFileByName(outRes.wlist.selection[i].text);
          var targetFile = File(exportFolder.toString() + sp.slash + outRes.wlist.selection[i].text + '.xml');
          if (targetFile.exists) {
            continue;
          }

          var images = sp.getImageFolderByName(outRes.wlist.selection[i].text).getFiles();
          var picXml = new XML('<pic></pic>');
          var seqXml = new XML('<seq></seq>');
          images.forEach(function (item, index) {
            if (item.name.indexOf('.png') !== -1) {
              item.open('r');
              item.encoding = 'binary';
              var str = encodeURIComponent(item.read());
              item.close();
              var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(item.name) + '</imgName>');
              var tempXmlHeres = new XML('<img>' + str + '</img>');
              var guluTempA = new XML('<imgInfo></imgInfo>');
              guluTempA.appendChild(tempXmlBigHere);
              guluTempA.appendChild(tempXmlHeres);
              picXml.appendChild(guluTempA);
            } else if (item instanceof Folder && item.name.indexOf('_seq') !== -1) {
              var thisFolder = item;
              var folderXml = new XML("<folder name='" + encodeURIComponent(item.name) + "'></folder>");
              var seqFiles = thisFolder.getFiles();
              seqFiles.forEach(function (imageFile, imageIndex) {
                imageFile.open('r');
                imageFile.encoding = 'binary';
                var str = encodeURIComponent(imageFile.read());
                imageFile.close();
                var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(imageFile.name) + '</imgName>');
                var tempXmlHeres = new XML('<img>' + str + '</img>');
                var guluTempA = new XML('<imgInfo></imgInfo>');
                guluTempA.appendChild(tempXmlBigHere);
                guluTempA.appendChild(tempXmlHeres);
                folderXml.appendChild(guluTempA);
              });
              seqXml.appendChild(folderXml);
            }
          });
          var xml = new XML(sourceFile.readd());
          if (picXml.children().length() > 0) {
            xml.appendChild(picXml);
          }
          if (seqXml.children().length() > 0) {
            xml.appendChild(seqXml);
          }
          if (xml.children().length() === 0) {
            xml = '<tree></tree>';
          }
          targetFile.writee(xml);
        } // for loop
        clearOutput();
        writeLn('Complete!');
      } // not null
    } // last
  };
}

var upAndDown = function (isUp, isW) {
  var file = sp.getFileByName(sp.droplist.selection.text);
  var xml = new XML(file.readd());
  if (isUp === true && sp.gv.lastSelectedItem !== null && sp.gv.lastSelectedItem.index > 0) {
    var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
    xml.insertChildBefore(xml.child(sp.gv.lastSelectedItem.index - 1), upxml);
    xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete');
    delete xml.waitToDelete;
    file.writee(xml);
    sp.gv.lastSelectedItem.moveUp();
  } else if (isUp === false && sp.gv.lastSelectedItem !== null && sp.gv.lastSelectedItem.index < xml.children().length() - 1) {
    var downxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
    xml.insertChildAfter(xml.child(sp.gv.lastSelectedItem.index + 1), downxml);
    xml.child(sp.gv.lastSelectedItem.index).setLocalName('waitToDelete');
    delete xml.waitToDelete;
    file.writee(xml);
    sp.gv.lastSelectedItem.moveDown();
  }
};

$.global.upAndDownWindow = function (cu) {
  var udWin = new Window('palette', loc(sp.ud));
  var udWins = udWin.add('Group{}');
  var a = udWins.add("Button{text:'" + loc(sp.up) + "'}");
  var b = udWins.add("Button{text:'" + loc(sp.down) + "'}");
  var c = udWins.add("Group{et:EditText{text:'0',characters:3,justify:'center'},j:Button{text:'" + loc(sp.jmp) + "'}}");
  udWin.frameLocation = cu;
  udWin.show();
  a.onClick = function () {
    upAndDown(true, true);
  };
  b.onClick = function () {
    upAndDown(false, true);
  };
  c.j.onClick = function () {
    var d = parseInt(c.et.text);
    var file = sp.getFileByName(sp.droplist.selection.text);
    var xml = new XML(file.readd());
    if (sp.gv.children.length === 0) return;
    if (sp.gv.lastSelectedItem === null) return;
    if (d >= 0 && d < sp.gv.children.length - 1 && sp.gv.lastSelectedItem.index !== d) {
      var upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
      xml.insertChildBefore(xml.child(d), upxml);
      xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete');
      delete xml.waitToDelete;
      file.writee(xml);
      sp.gv.lastSelectedItem.moveBefore(sp.gv.children[d]);
    } else if (d === sp.gv.children.length - 1 && sp.gv.lastSelectedItem.index !== d) {
      upxml = new XML(xml.child(sp.gv.lastSelectedItem.index));
      xml.insertChildAfter(xml.child(d), upxml);
      xml.child(sp.gv.lastSelectedItem.index + 1).setLocalName('waitToDelete');
      delete xml.waitToDelete;
      file.writee(xml);
      sp.gv.lastSelectedItem.moveAfter(sp.gv.children[d]);
    } else {
      try {
        alert(loc(sp.from) + '~' + (sp.gv.children.length - 1).toString());
      } catch (er) {}
    }
  };
};

$.global.deleteThisFolder = deleteThisFolder;
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

$.global.presetWindow = function () {
  var jinWin = new Window('dialog', loc(sp.settingPre));
  var jinRes = "group{\
                  orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                  guluG:Group{\
                  orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                  jinGroup:Group{\
                  orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                  isJin:StaticText{text:'" + loc(sp.isEffect) + "'}\
                  isJinSt:StaticText{text:'" + loc(sp.jinOne) + "',properties:{multiline:1}}\
                  jin:Panel{\
                  orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                  _1:Checkbox{text:'" + loc(sp._1) + "'},\
                  _2:Checkbox{text:'" + loc(sp._2) + "'},\
                  _3:Checkbox{text:'" + loc(sp._3) + "'},\
                  _4:Checkbox{text:'" + loc(sp._4) + "'},\
                  _5:Checkbox{text:'" + loc(sp._5) + "'},\
                  _6:Checkbox{text:'" + loc(sp._6) + "'},\
                  _7:Checkbox{text:'" + loc(sp._7) + "'},\
                  _8:Checkbox{text:'" + loc(sp._8) + "'},\
                  _9:Checkbox{text:'" + loc(sp._9) + "'},\
                  }\
                  },\
                  delGroup:Group{\
                  orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                  isJin:StaticText{text:'" + loc(sp.cleanProperty) + "'}\
                  isJinSt:StaticText{text:'" + loc(sp.jinTwo) + "',properties:{multiline:1}}\
                  del:Panel{\
                  orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],\
                  _1:Checkbox{text:'" + loc(sp._1) + "'},\
                  _2:Checkbox{text:'" + loc(sp._2) + "'},\
                  _3:Checkbox{text:'" + loc(sp._3) + "',enabled:0},\
                  _4:Checkbox{text:'" + loc(sp._4) + "',enabled:0},\
                  _5:Checkbox{text:'" + loc(sp._5) + "'},\
                  _6:Checkbox{text:'" + loc(sp._6) + "'},\
                  _7:Checkbox{text:'" + loc(sp._7) + "'},\
                  _8:Checkbox{text:'" + loc(sp._8) + "',enabled:0},\
                  _9:Checkbox{text:'" + loc(sp._9) + "',enabled:0},\
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
    if (app.settings.haveSetting('Sp_memory', '_1_' + i) === false) {
      if (i === 1 || i === 2 || i === 5) {
        app.settings.saveSetting('Sp_memory', '_1_' + i, '1');
      } else {
        app.settings.saveSetting('Sp_memory', '_1_' + i, '0');
      }
    }
    try {
      jinGulu.guluG.jinGroup.jin['_' + i].value = app.settings.getSetting('Sp_memory', '_1_' + i) === '1';
      jinGulu.guluG.jinGroup.jin['_' + i].onClick = function () {
        app.settings.getSetting('Sp_memory', '_1_' + i);
        app.settings.saveSetting('Sp_memory', '_1_' + i, jinGulu.guluG.jinGroup.jin['_' + i].value === true ? '1' : '0');
      };
    } catch (err) {}
  }
  for (i = 1; i <= 9; i++) {
    if (app.settings.haveSetting('Sp_memory', '_2_' + i) === false) {
      app.settings.saveSetting('Sp_memory', '_2_' + i, '0');
    }

    try {
      jinGulu.guluG.delGroup.del['_' + i].value = app.settings.getSetting('Sp_memory', '_2_' + i) === '1';
      jinGulu.guluG.delGroup.del['_' + i].onClick = function () {
        app.settings.getSetting('Sp_memory', '_2_' + i);
        app.settings.saveSetting('Sp_memory', '_2_' + i, jinGulu.guluG.delGroup.del['_' + i].value === true ? '1' : '0');
      };
    } catch (err) {}
  }
  jinGulu.oc.ok.onClick = function () {
    jinWin.close();
  };
  jinWin.center();
  jinWin.show();
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function UIParser(global) {
  var _ = global._ = function (selector) {
    if (_.isUI(selector.type)) {
      return _.extend([selector], _.proto);
    }
    return _.proto.find(selector);
  };
  _.global = global;

  _.root = {
    children: []
  };
  _.windows = _.root.children;
  _.extend = function (target, source) {
    // give the source to target
    for (var i in source) target[i] = source[i];
    return target;
  };
  _.dir = function (obj) {
    var str = '';
    for (var i in obj) str += i + ' : ' + typeof obj[i] + '\n';
    return str;
  };
  _.removeWin = function (id) {
    for (var i = 0; i < _.windows.length; i++) {
      if (_.windows[i].id === id) _.windows.splice(i, 1);
    }
  };
  _.proto = { // 这里的函数将赋给返回的解析器对象
    find: function (selector, recursive) {
      // find函数用来返回一个递归匹配后的数组，并且将_.proto的函数也给这个数组
      var matchs = [];
      var elements = 'length' in this ? this : [_.root];
      if (!selector) return _.extend(elements, _.proto);

      // 选择器为选择器表达式
      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector); // 正规化选择器
        for (var i = 0; i < selectors.length; i++) {
          var match = elements;
          var process = _.parserSelector(selectors[i]); // 解析选择器
          for (var j = 0; j < process.length; j++) {
            // 逐步执行
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5]); // 如果有:标记执行过滤操作
            } else {
              match = _.findElementsByProp(match, process[j][0], process[j][1], process[j][2]);
            }
          }
          matchs = _.merge(match, matchs);
        }
      } else if (typeof selector === 'function') {
        if (!recursive) recursive = 1;
        matchs = _.findElementsByFn(elements, selector, recursive);
      }

      return _.extend(matchs, _.proto);
    },
    filter: function (selector) {
      var matchs = [];
      var elements = 'length' in this ? this : [_.root];
      if (!selector) return _.extend(elements, _.proto);

      // 选择器为选择器表达式
      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector); // 正规化选择器
        for (var i = 0; i < selectors.length; i++) {
          var match = elements;
          var process = _.parserSelector(selectors[i]); // 解析选择器
          for (var j = 0; j < process.length; j++) {
            // 逐步执行
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5]); // 如果有:标记执行过滤操作
            } else {
              match = _.findElementsByProp(match, process[j][0], process[j][1]);
            }
          }
          matchs = _.merge(match, matchs);
        }
      } else if (typeof selector === 'function') {
        matchs = _.filterElementsByFn(elements, selector);
      }

      return _.extend(matchs, _.proto);
    },
    style: function (style, target) {
      if (!target) target = this;
      for (var i = 0; i < target.length; i++) {
        for (var j in style) {
          if (target[i].type === j) _.proto.style(style[j], [target[i]]);else target[i][j] = style[j];
        }
      }
    },
    each: function (command) {
      for (var i = 0; i < this.length; i++) command(this[i]);
    }, // command is a function
    setAttr: function (prop, value) {
      this.each(function (e) {
        e[prop] = value;
      });
    },
    getAttr: function (prop) {
      if (this.length) return this[0][prop];
    },
    children: function (selector) {
      return this.find(selector || '>*');
    },
    parent: function () {
      if (this.length > 0 && this[0].parent) return this[0].parent;else return _.extend([], _.proto);
    },
    on: function (event, fn, useCapture) {
      this.each(function (e) {
        e.addEventListener(event, fn, useCapture);
      });
    },
    exe: function (fn, args) {
      this.each(function (e) {
        e[fn].apply(e, args);
      });
    },
    addUI: function () {
      return _.addUI.apply(this[0], arguments);
    },
    first: function () {
      return _.extend([this[0]], _.proto);
    },
    last: function () {
      return _.extend([this[this.length - 1]], _.proto);
    },
    eq: function (index) {
      if (index < this.length && index >= 0) {
        return _.extend([this[index]], _.proto);
      } else {
        return _.extend([], _.proto);
      }
    },
    layout: function () {
      this.each(function (e) {
        _.layout(e);
      });
    },
    remove: function () {
      this.each(function (e) {
        e.parent.remove(e);
      });
    },
    empty: function () {
      this.children().remove();
    }
  };
  /** ***********************functions for createUI****************************************************/
  _.createUI = function (UIJson) {
    // 创建UI
    if (!UIJson) return;
    var ISPANEL = global instanceof Panel;
    if (ISPANEL) {
      var _newElement = _.addUI(UIJson, global);
      _.root.children.push(global);
      global.layout.layout(true);
      return _newElement;
    } else {
      return _.newWindow(UIJson);
    }
  };

  _.newWindow = function (UIJson) {
    // 添加窗口
    if (!UIJson) return;
    var newWindows = [];
    for (var i in UIJson) {
      var json = UIJson[i];
      if (_.isWindow(UIJson[i].type)) {
        // create window
        var s = json.type;
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
        var newWindow = _.root.children[_.root.children.length] = new Window(s);
        newWindows.push(newWindow);
        if (!json.id) newWindow.id = i;
        // add other properties for newWindow
        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue;
          newWindow[j] = json[j];
        }
        // create children for newWindow
        if (json.children) _.addUI(json.children, newWindow);
      }
    }
    return _.extend(newWindows, _.proto);
  };

  _.addUI = function (UIJson, parent) {
    // 为parent添加UI
    if (!UIJson) return;
    if (!parent) parent = this;

    var newItem = [];
    for (var i in UIJson) {
      var json = UIJson[i];
      if (_.isElement(json.type)) {
        // create element
        var s = json.type;
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
        var newElement = parent.add(s);
        if (!json.id) newElement.id = i;
        // add other properties for newElement
        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue;
          newElement[j] = json[j];
        }
        newItem.push(newElement);
        // create children for newElement
        if (_.isContainer(json.type) && json.children) arguments.callee(json.children, newElement);
      }
    }
    return _.extend(newItem, _.proto);
  };

  _.isWindow = function (type) {
    // 判断是否为window元素
    var winType = ['window', 'palette', 'dialog', 'Window', 'Palette', 'Dialog'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isContainer = function (type) {
    // 判断是否为容器
    var winType = ['window', 'palette', 'dialog', 'group', 'panel', 'tabbedpanel', 'treeview', 'dropdownlist', 'listbox', 'listitem', 'tab', 'node', 'Window', 'Palette', 'Dialog', 'Group', 'Panel', 'TabbedPanel', 'Treeview', 'DropDownList', 'ListBox', 'ListItem', 'Tab', 'Node'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isElement = function (type) {
    // 判断是否是window元素外的其他UI元素
    var winType = ['panel', 'tabbedpanel', 'tab', 'group', 'button', 'checkbox', 'dropdownlist', 'edittext', 'flashplayer', 'iconbutton', 'image', 'item', 'listbox', 'listitem', 'progressbar', 'radiobutton', 'scrollbar', 'slider', 'statictext', 'treeview', 'tab', 'node', 'Panel', 'TabbedPanel', 'Tab', 'Group', 'Button', 'CheckBox', 'DropDownList', 'EditText', 'FlashPlayer', 'IconButton', 'Image', 'Item', 'ListBox', 'ListItem', 'ProgressBar', 'RadioButton', 'Scrollbar', 'Slider', 'StaticText', 'Treeview', 'Tab', 'Node'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isUI = function (type) {
    // 判断是否为UI元素
    if (_.isWindow(type) || _.isElement(type)) return true;
    return false;
  };
  /** ********************functions for find*********************************************************/
  _.findElementsByProp = function (elements, prop, value, recursive) {
    var matchs = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].children) var atoms = elements[i].children;else if (elements[i].items) atoms = elements[i].items;else continue;
      var match = [];
      for (var j = 0; j < atoms.length; j++) {
        if (atoms[j][prop] && (value === '' || atoms[j][prop].toString() === value)) {
          match.push(atoms[j]);
        }
        if (recursive && (atoms[j].children || atoms[j].items)) {
          var temp = arguments.callee([atoms[j]], prop, value, 1);
          match = _.merge(temp, match);
        }
      }
      matchs = _.merge(match, matchs);
    }
    return matchs;
  };
  _.findElementsByFn = function (elements, fn, recursive) {
    var match = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].children) var atoms = elements[i].children;else if (elements[i].items) atoms = elements[i].items;else continue;
      for (var j = 0; j < atoms.length; j++) {
        if (fn(atoms[j])) match.push(atoms[j]);
        if (recursive && (atoms[j].children || atoms[j].items)) {
          var temp = arguments.callee(atoms[j].children, fn, 1);
          match = _.merge(temp, match);
        }
      }
    }
    return match;
  };
  _.filterElementByProp = function (elements, prop, value) {
    var matchs = [];
    for (var i = 0; i < elements.length; i++) {
      if (elements[i][prop] && (value === '' || elements[i][prop].toString() === value)) {
        matchs.push(elements[i]);
      }
    }
    return matchs;
  };
  _.filterElementByFn = function (elements, fn) {
    var matchs = [];
    for (var i = 0; i < elements.length; i++) {
      if (fn(elements[i])) matchs.push(elements[i]);
    }
    return matchs;
  };
  _.formalSelector = function (selector) {
    // 正规化选择器，去掉所有空格，多余字母和多余标记符，得到并列选择器，这时每个选择器中的每个标记符均有效
    /**
      1.去掉空格])及后面的字母，如'[er t ]a:w (w)e'变为'[er:w(w'
      2.去掉标记符前面的所有标记符号，遇到*>,不删除，因为标记号*>,后面不需要字母
      3.将*及其后面的字母替换为*
      4.将,及其后面的字母替换为,
      5.将>及其后面的字母替换为>
      6.将开始处的字母及逗号去掉
      7.用逗号分隔选择器，得到正规化的若干个选择器
      8.返回选择器数组
    */
    return selector.replace(/[\s\]\)]\w*/g, '').replace(/[\#\.\[\:\=]+(?=[\#\.\[\]\,\:\=\>\*])/g, '').replace(/\*+\w*/g, '*').replace(/\,+\w*/g, ',').replace(/\>+\w*/g, '>').replace(/^\w*\,/g, '').split(/\,/g);
  };
  _.parserSelector = function (selector) {
    // 解析单个的选择器，返回一个表示过程的数组
    var sign, content, prop, value, func, param, doFind; // recursive是否递归，doFind是否查找，否则过滤操作
    var recursive = 1;
    var process = [];
    var parts = selector.replace(/(?=[\#\.\[\:\>\*])/g, '@').replace(/^\@/, '').split('@'); // 将选择器根据标记分开

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '>') {
        // 当出现>的时候find函数将不会递归
        recursive = 0;
        i++;
      }
      // 初始化
      sign = parts[i][0];
      content = parts[i].substr(1);
      prop = value = func = param = '';
      doFind = 1;
      // 判断
      switch (sign) {
        case '*':
          prop = 'type';break;
        case '#':
          prop = 'id';value = content;break;
        case '.':
          prop = 'type';value = content;break;
        case '[':
          var p = content.split('=');
          prop = p[0];
          if (p.length === 2) value = p[1];
          break;
        case ':':
          var fn = content.split('(');
          func = fn[0];
          if (fn.length === 2) param = fn[1];
          doFind = 0;
          break;
      }
      process.push([prop, value, recursive, doFind, func, param]);
      recursive = 1;
    }

    return process;
  };
  _.merge = function (newArray, oldArray) {
    // 合并两个数组，并且去掉重复元素
    var temp = [];
    var b = 1;
    for (var i = 0; i < newArray.length; i++) {
      for (var j = 0; j < oldArray.length; j++) {
        if (newArray[i] === oldArray[j]) {
          b = 0;
          break;
        }
      }
      if (b) temp.push(newArray[i]);
    }
    return oldArray.concat(temp);
  };
  /** ********************layout functions*********************************************************/
  _.layout = function (e) {
    // 默认布局方式
    e.margins = 0;
    e.spacing = 5;
    if (e.align) {
      switch (e.align) {
        case 'fill':
        case 'fill_fill':
          e.alignment = ['fill', 'fill'];break;

        case 'center':
        case 'center_center':
          e.alignment = ['center', 'center'];break;

        case 'left_fill':
        case 'left':
          e.alignment = ['left', 'fill'];break;
        case 'center_fill':
          e.alignment = ['center', 'fill'];break;
        case 'right_fill':
        case 'right':
          e.alignment = ['right', 'fill'];break;

        case 'fill_top':
        case 'top':
          e.alignment = ['fill', 'top'];break;
        case 'fill_center':
          e.alignment = ['fill', 'center'];break;
        case 'fill_bottom':
        case 'bottom':
          e.alignment = ['fill', 'bottom'];break;

        case 'left_center':
          e.alignment = ['left', 'center'];break;
        case 'right_center':
          e.alignment = ['right', 'center'];break;
        case 'center_top':
          e.alignment = ['center', 'top'];break;
        case 'center_bottom':
          e.alignment = ['center', 'bottom'];break;

        case 'left_top':
          e.alignment = ['left', 'top'];break;
        case 'left_bottom':
          e.alignment = ['left', 'bottom'];break;
        case 'right_top':
          e.alignment = ['right', 'top'];break;
        case 'right_bottom':
          e.alignment = ['right', 'bottom'];break;
      }
    }
  };
  _.extend(_.windows, _.proto);
  /** ********************other functions*********************************************************/
  /*
  {
    JSON: {},
    xml: {},
    folder: {},
    file: {},
    treeview: {},
    dropdownlist: {},
    project: {},
    window: {},
    array: {},
    check: {},
  }
  */
  /*
  _.errorLog = {
    text: '',
    add: function(line, error) {
      this.text += line.toString + ':' + error + '\n';
    }
  } */
  _.JSON = $.global.JSON;
  _.xml = {
    read: function (xmlFile) {
      // 读取xml文件，返回一个XML对象
      xmlFile.open('r');
      var xmlString = xmlFile.read();
      var myXML = new XML(xmlString);
      xmlFile.close();

      return myXML;
    }
  };

  _.folder = {
    create: function (path) {
      // 创建文件夹，返回Folder对象（文件夹路径）
      var newFolder = new Folder(path);
      newFolder.create();

      return newFolder;
    },
    remove: function (folder, option) {
      // 删除文件夹（文件夹路径，模式）这个因为懒还没写完，呵呵
      switch (option) {
        case 0:
        case 1:
          break;
        default:
          {
            folder.remove();
          }
      }
    }
  };

  _.file = {
    help: function () {
      var str = 'file:\n';
      str += 'read(path) 参数: path 路径字符串 读取文本文件，返回String对象\n';
      str += 'create(path， text) 参数: path 路径字符串，text 内容字符串 创建文本文件，返回File对象\n';
      str += 'getFileFromFolder(folder, format) 参数: folder 文件夹，format 格式如\'png|jpg\' 从文件夹获取文件\n';
      str += 'help() 返回帮助信息\n';
      str += 'alertHelp() 弹出帮助信息\n';
      return str;
    },
    read: function (file) {
      // 读取文本文件，返回String对象（文本文件路径）
      file.open('r');
      var myString = file.read();
      file.close();

      return myString;
    },
    create: function (path, text) {
      // 创建文本文件，返回File对象（文本文件路径，文本内容）
      var newFile = new File(path);
      newFile.open('w');
      newFile.encoding = 'UTF-8';
      if (text !== null) {
        newFile.write(text);
      }
      newFile.close();

      return newFile;
    }
  };

  _.dropdownlist = {
    addItem: function (list, array) {
      // 下拉列表添加项目（下拉列表，数组）
      for (var i = 0; i < array.length; i++) {
        if (array[i] === null) {
          list.add('separator');
        } else {
          list.add('item', array[i]);
        }
      }
      return list;
    }
  };

  _.project = {
    getActiveComp: function () {
      // 如果当前项为合成，返回合成，否则返回false
      var thisComp = app.project.activeItem;
      if (thisComp instanceof CompItem) {
        return thisComp;
      }
      return null;
    },
    getSelectedLayers: function () {
      // 获取选中的图层，返回图层数组，否则返回false
      var thisComp = app.project.activeItem;
      if (!(thisComp instanceof CompItem) || thisComp.selectedLayers.length === 0) {
        return false;
      }
      return thisComp.selectedLayers;
    },
    findLayer: function (name, comp) {
      // 根据名称找到对应图层，否则返回false
      // 找到指定名称的图层
      if (!comp) comp = app.project.activeItem;
      if (!(comp instanceof CompItem)) return false;

      var l = comp.layers;
      if (l.length === 0) return false;

      for (var i = 1; i <= l.length; i++) {
        if (l[i].name === name) return l[i];
      }
      return false;
    },
    getItemById: function (id) {
      // 通过item的id获取对应item，否则返回false (id)
      for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i).id === parseInt(id)) {
          return app.project.item(i);
        }
      }

      return false;
    },
    lookItemInProjectPanel: function (item) {
      // 在窗口中找到并选中项目 (项目)
      for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i).selected) {
          app.project.item(i).selected = 0;
        }
      }
      item.selected = 1;
    },
    looklayerInComp: function (layer) {
      // 在显示合成并选中图层 (图层)
      var myComp = layer.containingComp;
      if (parseInt(app.version) > 9) {
        // 因为cs4不支持openInViewer()函数
        myComp.openInViewer();
      }
      var sl = myComp.selectedLayers;
      for (var i = 0; i < sl.length; i++) {
        sl[i].selected = 0;
      }
      layer.selected = 1;
    }
  };

  _.app = {
    allowAccessFile: function () {
      // 保证ae允许写入文件
      if (isSecurityPrefSet()) return true;
      alert('脚本正在请求文件写入或访问网络，请到"首选项->常规"确保"允许脚本写入文件和访问网络"一项被勾选');
      try {
        app.executeCommand(2359);
      } catch (e) {
        alert(e);
      }
      if (isSecurityPrefSet()) {
        return true;
      } else {
        return false;
      }

      function isSecurityPrefSet() {
        // 是否可以写入文件
        try {
          var securitySetting = app.preferences.getPrefAsLong('Main Pref Section', 'Pref_SCRIPTING_FILE_NETWORK_SECURITY');
          return securitySetting === 1;
        } catch (e) {
          return securitySetting === 1;
        }
      }
    },
    getOS: function () {
      if ($.os.indexOf('Windows') > -1) return 'windows';else if ($.os.indexOf('Mac') > -1) return 'Mac';else return '';
    }
  };

  _.window = {
    resize: function (window) {
      // 自动改变布局大小（窗口）
      window.layout.layout(true);
      window.layout.resize();
      window.onResizing = window.onResize = function () {
        this.layout.resize();
      };
    }
  };

  _.array = {
    invert: function (array) {
      // 数组倒序，不改变原数组，返回一个新数组（数组）
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        newArray[i] = array[array.length - 1 - i];
      }
      return newArray;
    },
    random: function (array) {
      // 数组顺序打乱，不改变原数组，返回一个新数组（数组）
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        var start = Math.round(Math.random() * newArray.length);
        newArray.splice(start, 0, array[i]);
      }
      return newArray;
    },
    find: function (array, item) {
      // 从一个数组里面匹配某一项,找到返回序号，否则返回-1
      for (var i = 0; i < array.length; i++) {
        if (array[i] === item) return i;
      }
      return -1;
    },
    merge: function (array1, array2) {
      // 合并两个数组，并且去掉重复元素
      var temp = [];
      var b = 1;
      for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
          if (array1[i] === array2[j]) {
            b = 0;
            break;
          }
        }
        if (b) temp.push(array1[i]);
      }
      return array2.concat(temp);
    }
  };

  _.check = {
    isNumber: function (str) {
      // 检验是否为数字，否则返回0（字符串）
      var myNum = parseFloat(str);
      if (isNaN(myNum)) {
        return 0;
      } else {
        return myNum;
      }
    }

  };

  // 弹出帮助信息
  _.alertHelp = UIParser.alertHelp;
  for (var i in _) {
    _[i].alertHelp = _.alertHelp;
  }

  return _;
};

UIParser.alertHelp = function () {
  if (this.help) alert(this.help());else alert('No Help!');
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

try {
  (function (global) {
    __webpack_require__(4);
    __webpack_require__(0);
    __webpack_require__(7);
    __webpack_require__(1);
    __webpack_require__(3);
    __webpack_require__(8);
    __webpack_require__(6);
    __webpack_require__(2);
    __webpack_require__(9);

    $.layer.slash = sp.slash;
    $.layer.tempFolder = new Folder(sp.scriptFolder.toString() + $.layer.slash + 'tempFile');
    $.layer.translate = $.global.translate;

    sp.fns = new Fns();

    // ~ Create UI
    var win = global instanceof Panel ? global : new Window('window', sp.scriptName, undefined, { resizeable: true });
    var group1 = win.add("Group{orientation: 'column', alignment: ['fill','fill'],spacing:0,margins:0}");
    var group11 = group1.add("Group{orientation: 'row', alignment: ['fill','fill'],spacing:0,margins:0}");
    var parentDroplist = sp.parentDroplist = group11.add('Dropdownlist{}');
    var droplist = sp.droplist = group11.add('Dropdownlist{}');
    var gv = sp.gv = new GridView(group1);

    // ~ Set GridView's attributes
    gv.limitText = sp.getSettingAsBool('limitText');
    gv.showText = sp.showThumbValue;
    gv.version = parseInt(app.version.split('.')[0]) === 12 || parseInt(app.version.split('.')[0]) === 14 ? 'CC' : 'CC2014';

    // ~ Binding eventHandlers to mouse click and Window
    gv.leftClick = sp.fns.leftClick;
    gv.rightClick = sp.fns.rightClick;
    gv.leftDoubleClick = sp.fns.newLayer;
    gv.mouseMove = sp.fns.moveOver;
    parentDroplist.onChange = sp.fns.parentDroplistChange;
    droplist.onChange = sp.fns.droplistChange;

    sp.reloadParentDroplist();
    var selection = parseInt(sp.getSetting('parentSelection'));
    parentDroplist.selection = selection <= parentDroplist.items.length - 1 && selection >= 0 ? selection : 0;
    selection = parseInt(sp.getSetting('thisSelection'));
    droplist.selection = selection <= droplist.items.length - 1 && selection >= 0 ? selection : 0;

    sp.renderTaskArray.forEach(function (item, index) {
      app.cancelTask(item);
    });
    sp.renderTaskArray.length = 0;
    sp.previewHelper = {};

    win.onResize = win.onResizing = sp.fns.winResize;

    if (win instanceof Panel) {
      win.layout.layout(1);
    } else {
      win.location = sp.getSetting('winLocation').split(',');
      if (win.location[0] <= 0 || win.location[1] <= 0) {
        win.location = [100, 200];
      }
      win.show();
      win.size = sp.getSetting('winSize').split(',');
      win.onClose = sp.fns.winClose;
    }

    win.onResize();

    function Fns() {
      var keepRef = this;
      this.previewAll = function () {
        if (sp.gv.children.length === 0) return;

        keepRef.moveOut();

        var lenArr = [];
        var oneFrame = sp.frameSecond;
        sp.previewHelper = {};
        var items = sp.gv.selection.length === 0 ? sp.gv.children : sp.gv.selection;

        for (var iter = 0, thisLen = items.length; iter < thisLen; iter++) {
          var item = items[iter];
          var img = item.image;
          var index = item.index;

          if (!img.parent) return;
          var folder = new Folder(img.parent);

          if (!(folder instanceof Folder)) return;
          var targetFolder = new Folder(folder.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');

          try {
            if (!targetFolder.exists) {
              if (targetFolder.parent.toString().indexOf('_seq') === -1) {
                targetFolder = new Folder(folder.parent.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');
                img = new File(folder.parent.toString() + sp.slash + item.text + '.png');
              }
            }
          } catch (err) {
            // ~                                 cout<<"----"+decodeURIComponent ( targetFolder.toString())+'\r\nseq folder not found\r'+iter ;
          }

          if (!targetFolder.exists) {
            // ~                                 cout<<decodeURIComponent ( targetFolder.toString())+'\r\nseq folder not found\r'+iter;
            continue;
          }
          if (!img.exists) {
            // ~                                 cout<<'image not found\r'+iter ;
            continue;
          }

          sp.previewHelper['item' + index] = {};
          sp.previewHelper['item' + index]['tempItem'] = item;
          sp.previewHelper['item' + index]['tempImg'] = img;
          sp.previewHelper['item' + index]['currentIndex'] = 0;
          sp.previewHelper['item' + index]['tempFiles'] = function (f) {
            var len = f.getFiles().length;
            var arr = [];
            for (var i = 0; i < len; i++) {
              var newFile = new File(f.toString() + sp.slash + i.toString() + '.png');
              if (newFile.exists) {
                arr.push(newFile);
              }
            }
            return arr;
          }(targetFolder);

          lenArr.push(sp.previewHelper['item' + index]['tempFiles']);
        }

        lenArr.sort(function (a, b) {
          return a.length - b.length;
        });

        if (lenArr.length === 0) return;

        var maxLen = lenArr[lenArr.length - 1].length;

        for (var i = 0, len = maxLen; i <= len; i++) {
          var stringToCall = ` 
                                                                
                                                                if(sp){
                                                                    if(sp.gv){
                                                                        if(sp.gv.children){
                                                                    
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
                                                                                            currentItem["currentIndex"] = 0;
                                                                                        }
                                                                                    }
                                                                                }
                                                                        }
                                                                    if(isValid(sp.gv.list))
                                                                        sp.gv.refresh();
                                                                    
                                                                    }
                                                                 }
                                                              }   
                                                              

                                                                `;
          sp.renderTaskArray.push(app.scheduleTask(stringToCall, 0 + oneFrame * i, true));
        }

        sp.isLoopPreview = true;
      };
      this.moveOver = function (event, item, isClick) {
        if (sp.isLoopPreview === true) return;

        if (!item) {
          sp.isOutside = true;
          return;
        }

        if (typeof isClick !== 'undefined') {
          if (sp.isOutside === true) {
            return;
          }
        } else {
          if (sp.isOutside === false) {
            return;
          }
        }

        var img = item.image;
        var index = item.index;
        var oneFrame = sp.frameSecond;

        if (!img.parent) return;
        var folder = new Folder(img.parent);

        if (!(folder instanceof Folder)) return;
        var targetFolder = new Folder(folder.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');

        if (!targetFolder.exists) {
          if (targetFolder.parent.toString().indexOf('_seq') === -1) {
            targetFolder = new Folder(folder.parent.toString() + sp.slash + img.displayName.replace(/.png/i, '') + '_seq');
            img = new File(folder.parent.toString() + sp.slash + item.text + '.png');
          }
        }

        if (!targetFolder.exists) {
          return;
        }
        if (!img.exists) {
          return;
        }

        sp.previewHelper['item' + index] = {};
        sp.previewHelper['item' + index]['tempItem'] = item;
        sp.previewHelper['item' + index]['tempImg'] = img;
        sp.previewHelper['item' + index]['currentIndex'] = 0;
        sp.previewHelper['item' + index]['tempFiles'] = function (f) {
          var len = f.getFiles().length;
          var arr = [];
          for (var i = 0; i < len; i++) {
            var newFile = new File(f.toString() + sp.slash + i.toString() + '.png');
            if (newFile.exists) {
              arr.push(newFile);
            }
          }
          return arr;
        }(targetFolder);

        if (sp.previewHelper['item' + index]['tempFiles'].length === 0) return;

        for (var i = 0, len = sp.previewHelper['item' + index]['tempFiles'].length; i <= len; i++) {
          var stringToCall = `if(sp){
                                                                  if(sp.gv){
                                                                      if(sp.gv.children){
                                                                  
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
                                                                  if(isValid(sp.gv.list))
                                                                      sp.gv.refresh();
                                                                  
                                                                  }
                                                                }
                                                            }  
                                                              `;
          sp.renderTaskArray.push(app.scheduleTask(stringToCall, 0 + oneFrame * i, false));
        }

        sp.isOutside = false;
        sp.isLoopPreview = false;
      };

      this.leftClick = function () {
        if (sp.isLoopPreview === false) return;

        keepRef.moveOut();

        sp.isLoopPreview = false;
      };
      this.moveOut = function () {
        sp.renderTaskArray.forEach(function (item, index) {
          app.cancelTask(item);
        });
        sp.renderTaskArray.length = 0;

        if (sp.gv.children.length !== 0) {
          sp.preImageArr.forEach(function (item, index) {
            sp.gv.children[index].image = item;
          });
        }

        sp.previewHelper = {};
      };
      this.addModule = function () {
        var newEleName = prompt(loc(sp.setName), 'Default');
        if (!newEleName) {
          return;
        }
        newEleName.trim();
        if (sp.lookUpTextInChildren(newEleName, sp.parentDroplist.items)) {
          alert(loc(sp.existName));return;
        }

        var content = new XML(sp.settingsFile.readd());
        content.ParentGroup.appendChild(new XML("<item groupName = '" + newEleName + "'></item>"));
        sp.settingsFile.writee(content);
        sp.reloadParentDroplist();
        sp.parentDroplist.selection = sp.parentDroplist.items.length - 1;
        sp.preImageArr = [];
        var selection = parseInt(sp.getSetting('thisSelection'));
        sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;
        sp.gv.refresh();
      };
      this.deleteModule = function () {
        if (!sp.parentDroplist.selection) return;
        var isSureDelete = confirm(loc(sp.deleteModuleAlert));
        if (isSureDelete === true) isSureDelete = confirm(loc(sp.addAlert) + loc(sp.deleteModuleAlert));
        if (isSureDelete === false) return;

        var groupName = sp.parentDroplist.selection.text;

        sp.xmlCurrentFileNames.forEach(function (item, index) {
          var xml = new XML(sp.settingsFile.readd());
          var selectionText = item;

          var preIndex = sp.getGlobalIndexFromFileName(item);
          xml.ListItems.child(preIndex).setLocalName('waitToDelete');
          delete xml.ListItems.waitToDelete;
          sp.settingsFile.writee(xml);
          sp.deleteIndexAndReload(preIndex);

          var imageFolder = sp.getImageFolderByName(selectionText);
          $.global.deleteThisFolder(imageFolder);
          imageFolder.remove();

          var file = sp.getFileByName(selectionText);
          file.remove();
        });

        var xml = new XML(sp.settingsFile.readd());
        sp.forEach(xml.ParentGroup, function (item, index) {
          if (item['@groupName'] === groupName) {
            item.setLocalName('waitToDelete');
          }
        });
        delete xml.ParentGroup.waitToDelete;
        sp.settingsFile.writee(xml);

        sp.reloadParentDroplist();
        sp.preImageArr = [];
        var selection = parseInt(sp.getSetting('parentSelection'));
        sp.parentDroplist.selection = selection - 1 <= sp.parentDroplist.items.length - 1 && selection - 1 >= 0 ? selection - 1 : 0;
        selection = parseInt(sp.getSetting('thisSelection'));
        sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;
        sp.gv.refresh();
      };

      this.newLayer = function () {
        if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElements));
        if (!(app.project.activeItem instanceof CompItem)) return alert(loc(sp.needComp));
        if (sp.onlyEffectValue === true && app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers));

        var xml = new XML(sp.getFileByName(sp.droplist.selection.text).readd());
        xml = xml.child(sp.gv.lastSelectedItem.index);

        var precomposeName = decodeURIComponent(xml['@name']);

        app.beginUndoGroup('Undo new');

        if (sp.onlyEffectValue === false) {
          var folderName = sp.getSetting('folderName');
          var text = sp.gv.lastSelectedItem.text;
          var compFolder = app.project.items.addFolder(text + '.sp');
          var sourceFolder = app.project.items.addFolder('Sources');

          var resultArr = sp.lookUpInItem(folderName, app.project.items);
          if (resultArr[0] === true) {
            var parentFolder = resultArr[1];
            compFolder.parentFolder = parentFolder;
          } else {
            parentFolder = app.project.items.addFolder(folderName);
            compFolder.parentFolder = parentFolder;
          }
          sourceFolder.parentFolder = compFolder;
          sp.compFolder = compFolder;
          sp.sourceFolder = sourceFolder;

          var currentTime = app.project.activeItem.time;
          var options = {
            compFolder: sp.compFolder,
            sourceFolder: sp.sourceFolder
          };

          // ~                                     $.hiresTimer/1000000;

          var activeCompLayersArr = sp.newLayers(xml, app.project.activeItem, options);

          // ~                                     $.writeln($.hiresTimer/1000000);

          app.project.activeItem.time = currentTime;

          sourceFolder.numItems === 0 && sourceFolder.remove();
          compFolder.numItems === 0 && compFolder.remove();
        } else {
          activeCompLayersArr = app.project.activeItem.selectedLayers;
          sp.newProperties(xml, app.project.activeItem.selectedLayers, sp.cleanGroupValue, sp.offsetKeyframeValue);
        }

        app.endUndoGroup();

        // ~ Precompose layers and cut their length,no matter whether they are created by newLayers() or selected by user.
        if (sp.preComposeValue === true) {
          var indexArr = [];
          var inPointArr = [];
          var outPointArr = [];

          activeCompLayersArr.forEach(function (item, index) {
            indexArr.push(item.index);
            inPointArr.push(item.inPoint);
            outPointArr.push(item.outPoint);
          });

          inPointArr.sort(function (a, b) {
            return a - b;
          });
          outPointArr.sort(function (a, b) {
            return b - a;
          });

          app.beginUndoGroup('Undo precomp');
          app.project.activeItem.layers.precompose(indexArr, precomposeName, true);
          app.project.activeItem.selectedLayers[0].inPoint = inPointArr[0];
          app.project.activeItem.selectedLayers[0].outPoint = outPointArr[0];
          app.endUndoGroup();
        }

        // ~ Return the layer array
        if (sp.onlyEffectValue === false) {
          return activeCompLayersArr;
        } else {
          return null;
        }
      };

      this.cover = function () {
        if (!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers));
        var thisComp = app.project.activeItem;
        if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
        var itemName = sp.gv.lastSelectedItem.text;

        app.beginSuppressDialogs();
        app.beginUndoGroup('Undo save');

        var imageFile = sp.getImageFile(sp.droplist.selection.text, itemName);

        var seqFolder = new Folder(imageFile.toString().replace(/.png/i, '') + '_seq');
        if (seqFolder.exists) {
          $.global.deleteThisFolder(seqFolder);
          seqFolder.remove();
        }

        sp.newItemOrCover = 'cover';

        if (sp.isCC2015 === true) {
          itemName = sp.savePng2(imageFile);
        } else {
          itemName = sp.savePng(imageFile);
        }

        var xml = sp.getXmlFromLayers(thisComp.selectedLayers, itemName, sp);

        sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text), xml, sp.gv.lastSelectedItem.index);

        sp.gv.lastSelectedItem.image = null;
        sp.gv.lastSelectedItem.image = sp.getImage(sp.droplist.selection.text, itemName);
        sp.gv.refresh();

        app.endUndoGroup();
        app.endSuppressDialogs(false);
      };

      this.newItem = function () {
        try {
          if (!(app.project.activeItem instanceof CompItem) || app.project.activeItem.selectedLayers.length === 0) return alert(loc(sp.needLayers));
          var thisComp = app.project.activeItem;
          if (sp.autoNameValue === false) {
            var itemName = prompt(loc(sp.setName), 'Name');
          } else {
            itemName = thisComp.selectedLayers[0].name.replace('/', '_').replace('.', '_');
          }

          if (sp.autoNameValue === false && itemName === '' || itemName === null) return;

          itemName.trim();

          app.beginSuppressDialogs();
          app.beginUndoGroup('Undo save');

          sp.newItemOrCover = 'newItem';

          if (sp.isCC2015 === true) {
            itemName = sp.savePng2(sp.getImageFile(sp.droplist.selection.text, itemName));
          } else {
            itemName = sp.savePng(sp.getImageFile(sp.droplist.selection.text, itemName));
          }

          var xml = sp.getXmlFromLayers(thisComp.selectedLayers, itemName, sp);

          sp.saveItemToFile(sp.getFileByName(sp.droplist.selection.text), xml);

          var item = sp.gv.add(decodeURIComponent(itemName), sp.getImage(sp.droplist.selection.text, itemName));
          sp.preImageArr.push(item.image);
          sp.gv.refresh();

          app.endUndoGroup();
          app.endSuppressDialogs(false);
        } catch (err) {
          err.printc();err.printa();
        }
      };

      this.deleteItem = function () {
        if (sp.gv.selection.length === 0) return alert(loc(sp.needElements));
        if (sp.deleteAlertValue === true) {
          var sure = confirm(loc(sp.sureDelete));
        }
        if (sp.deleteAlertValue === true && sure === false) return;

        var file = sp.getFileByName(sp.droplist.selection.text);
        var xml = new XML(file.readd());
        sp.gv.selection.forEach(function (item, index) {
          xml.child(item.index).setLocalName('waitToDelete');
          var preText = item.text;
          var image = sp.getImageFile(sp.droplist.selection.text, preText);
          if (image.exists) {
            image.remove();
          }
          var seqFolder = new Folder(image.toString().replace(/.png/i, '') + '_seq');
          if (seqFolder.exists) {
            $.global.deleteThisFolder(seqFolder);
            seqFolder.remove();
          }
        });
        delete xml.waitToDelete;
        if (xml.children().length() !== 0) {
          file.writee(xml);
        } else {
          file.writee('<tree></tree>');
        }

        sp.gv.removeAll();
        sp.droplist.notify('onChange');
        sp.gv.refresh();
      };

      this.importImage = function () {
        if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
        var file = File.openDialog('Please select pictures', false);
        if (!file) return;
        if (file.name.split('.').last() !== 'jpg' && file.name.split('.').last() !== 'png') return;
        var imageFile = sp.getImageFile(sp.droplist.selection.text, sp.gv.lastSelectedItem.text);

        sp.cropImage(file, imageFile);
        sp.gv.lastSelectedItem.image = imageFile;
        sp.gv.refresh();
      };

      this.deleteGroup = function () {
        if (!sp.parentDroplist.selection) return;
        if (!sp.droplist.selection) return;
        var isSureDelete = confirm(loc(sp.isSureGroup));
        if (isSureDelete === true) isSureDelete = confirm(loc(sp.isSureGroup2));
        if (isSureDelete === false) return;

        var xml = new XML(sp.settingsFile.readd());
        var selectionText = sp.droplist.selection.text;

        var preIndex = sp.getGlobalIndexFromFileName(selectionText);

        // ~delete the child
        xml.ListItems.child(preIndex).setLocalName('waitToDelete');
        delete xml.ListItems.waitToDelete;
        sp.settingsFile.writee(xml);
        sp.deleteIndexAndReload(preIndex);

        // ~ delete the imagesFolder

        var imageFolder = sp.getImageFolderByName(selectionText);
        $.global.deleteThisFolder(imageFolder);
        imageFolder.remove();

        // ~delete the files
        var file = sp.getFileByName(selectionText);
        file.remove();

        sp.reloadParentDroplist();
        sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'));

        sp.preImageArr = [];
        var selection = parseInt(sp.getSetting('thisSelection'));
        sp.droplist.selection = selection - 1;
        sp.gv.refresh();
      };

      this.addGroup = function () {
        var newEleName = prompt(loc(sp.setName), 'Default');
        if (!newEleName) {
          return;
        }
        if (!sp.parentDroplist.selection) return alert(loc(sp.needModule));
        newEleName.trim();
        if (sp.xmlFileNames.has(newEleName)) {
          alert(loc(sp.existName));return;
        }

        var file = sp.getFileByName(newEleName);
        sp.getImageFolderByName(newEleName);
        var str = '<tree></tree>';
        file.writee(str);
        var xml = new XML(sp.settingsFile.readd());
        xml.ListItems.appendChild(new XML('<Name>' + newEleName + '</Name>'));

        var groupName = sp.parentDroplist.selection.text;
        sp.forEach(xml.ParentGroup, function (item, index) {
          if (item['@groupName'] === groupName) {
            item.appendChild(new XML('<Index>' + (xml.ListItems.children().length() - 1).toString() + '</Index>'));
          }
        });

        sp.settingsFile.writee(xml);
        sp.reloadParentDroplist();
        sp.preImageArr = [];
        sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'));
        sp.droplist.selection = sp.droplist.items.length - 1;
        sp.gv.refresh();
      };

      this.exportFile = function () {
        var exportFolder = Folder.selectDialog('Please select folder');
        if (!exportFolder) return;
        if (!(exportFolder instanceof Folder)) return;
        var sourceFile = sp.getFileByName(sp.droplist.selection.text);
        var targetFile = File(exportFolder.toString() + sp.slash + sp.droplist.selection.text + '.xml');
        if (targetFile.exists) {
          alert(loc(sp.overWritten));return;
        }
        if (!sp.droplist.selection) return;

        var images = sp.getImageFolderByName(sp.droplist.selection.text).getFiles();
        var picXml = new XML('<pic></pic>');
        var seqXml = new XML('<seq></seq>');
        images.forEach(function (item, index) {
          if (item.name.indexOf('.png') !== -1) {
            item.open('r');
            item.encoding = 'binary';
            var str = encodeURIComponent(item.read());
            item.close();
            var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(item.name) + '</imgName>');
            var tempXmlHeres = new XML('<img>' + str + '</img>');
            var guluTempA = new XML('<imgInfo></imgInfo>');
            guluTempA.appendChild(tempXmlBigHere);
            guluTempA.appendChild(tempXmlHeres);
            picXml.appendChild(guluTempA);
          } else if (item instanceof Folder && item.name.indexOf('_seq') !== -1) {
            var thisFolder = item;
            var folderXml = new XML("<folder name='" + encodeURIComponent(item.name) + "'></folder>");
            var seqFiles = thisFolder.getFiles();
            seqFiles.forEach(function (imageFile, imageIndex) {
              imageFile.open('r');
              imageFile.encoding = 'binary';
              var str = encodeURIComponent(imageFile.read());
              imageFile.close();
              var tempXmlBigHere = new XML('<imgName>' + encodeURIComponent(imageFile.name) + '</imgName>');
              var tempXmlHeres = new XML('<img>' + str + '</img>');
              var guluTempA = new XML('<imgInfo></imgInfo>');
              guluTempA.appendChild(tempXmlBigHere);
              guluTempA.appendChild(tempXmlHeres);
              folderXml.appendChild(guluTempA);
            });
            seqXml.appendChild(folderXml);
          }
        });
        var xml = new XML(sourceFile.readd());
        if (picXml.children().length() > 0) {
          xml.appendChild(picXml);
        }
        if (seqXml.children().length() > 0) {
          xml.appendChild(seqXml);
        }
        if (xml.children().length() === 0) {
          xml = '<tree></tree>';
        }
        targetFile.writee(xml);
        clearOutput();
        writeLn('Complete!');
      };

      this.importFiles = function () {
        var files = File.openDialog('Please select xmls', '*.xml', true);
        if (!files) return;
        if (!sp.parentDroplist.selection) return alert(loc(sp.needModule));

        var selectionIndex = sp.parentDroplist.selection.index;
        files.forEach(function (item, index) {
          var file = sp.getFileByName(item.name.replace('.xml', ''));
          if (file.exists) return;
          item.copy(file.toString());
          var xml = new XML(file.readd());
          sp.forEach(xml.pic, function (item, index) {
            var image = sp.getImageFile(this.name.replace('.xml', ''), decodeURIComponent(item.imgName.toString()).replace('.png', ''));
            image.open('w');
            image.encoding = 'binary';
            image.write(decodeURIComponent(item.img.toString()));
            image.close();
          }, item);
          sp.forEach(xml.seq, function (folder, folderIndex) {
            var name = decodeURIComponent(folder['@name']);
            var parentFolder = sp.getImageFolderByName(this.name.replace('.xml', ''));
            var targetFolder = new Folder(parentFolder.toString() + sp.slash + name);
            if (!targetFolder.exists) {
              targetFolder.create();
            }

            sp.forEach(folder, function (imageXml, imageIndex) {
              var imageFile = new File(this.toString() + sp.slash + decodeURIComponent(imageXml.imgName.toString()));
              imageFile.open('w');
              imageFile.encoding = 'binary';
              imageFile.write(decodeURIComponent(imageXml.img.toString()));
              imageFile.close();
            }, targetFolder);
          }, item);
          delete xml.pic;
          delete xml.seq;
          file.writee(xml);
          xml = new XML(sp.settingsFile.readd());
          xml.ListItems.appendChild(new XML('<Name>' + decodeURIComponent(item.name.replace('.xml', '')) + '</Name>'));
          xml.ParentGroup.child(selectionIndex).appendChild(new XML('<Index>' + (xml.ListItems.children().length() - 1).toString() + '</Index>'));

          sp.settingsFile.writee(xml.toString());
        });
        sp.reloadParentDroplist();
        sp.parentDroplist.selection = parseInt(sp.getSetting('parentSelection'));
        selection = parseInt(sp.getSetting('thisSelection'));
        sp.preImageArr = [];
        sp.droplist.selection = sp.droplist.items.length - 1;
        sp.gv.refresh();
      };
      this.changeName = function () {
        if (!sp.gv.children) return alert(loc(sp.needElement));
        if (!sp.gv.lastSelectedItem) return alert(loc(sp.needElement));
        var newEleName = prompt(loc(sp.setName), sp.gv.lastSelectedItem.text);
        if (!newEleName) {
          alert(loc(sp.blankName));return;
        }
        newEleName.trim();
        if (sp.lookUpTextInChildren(newEleName, sp.gv.children)) {
          alert(loc(sp.existName));return;
        }

        var file = sp.getFileByName(sp.droplist.selection.text);
        var xml = new XML(file.readd());
        var image = sp.getImage(sp.droplist.selection.text, sp.gv.lastSelectedItem.text);

        if (sp.gv.lastSelectedItem.text === decodeURIComponent(xml.child(sp.gv.lastSelectedItem.index)['@name'])) {
          xml.child(sp.gv.lastSelectedItem.index)['@name'] = encodeURIComponent(newEleName.toString());
          file.writee(xml);
        }

        var targetImage = sp.noImage;
        if (image.exists) {
          var seqFolder = new Folder(image.toString().replace(/.png/i, '') + '_seq');
          if (seqFolder.exists) {
            seqFolder.rename(newEleName.toString() + '_seq');
          }
          image.rename(newEleName.toString() + '.png');
          targetImage = sp.getImage(sp.droplist.selection.text, newEleName.toString());
          if (image.toString() !== targetImage.toString()) {
            image.remove();
          }
        }

        sp.gv.lastSelectedItem.text = newEleName.toString();
        sp.gv.lastSelectedItem.image = targetImage;
        sp.gv.refresh();
      };
      this.parentDroplistChange = function () {
        if (!this.selection) return;

        sp.saveSetting('parentSelection', this.selection.index.toString());
        sp.reloadDroplist();
        sp.preImageArr = [];
        var selection = parseInt(sp.getSetting('thisSelection'));
        sp.droplist.selection = selection <= sp.droplist.items.length - 1 && selection >= 0 ? selection : 0;
      };
      this.droplistChange = function () {
        if (!this.selection) return;
        var text = this.selection.text;
        var file = sp.getFileByName(text);
        if (file === -1) return;
        var content = file.readd();

        var indexArr = [];
        var j = -1;
        try {
          var thisStr = '<Element name="';
          j = content.indexOf(thisStr);
        } catch (err) {
          alert(err);
        }
        while (j !== -1) {
          var inputStr = '';
          var k = 0;
          while (content[j + thisStr.length + k] !== '"') {
            inputStr += content[j + thisStr.length + k];
            k++;
          }
          indexArr.push(inputStr);
          j = content.indexOf(thisStr, j + thisStr.length);
        }
        sp.gv.removeAll();
        sp.preImageArr = [];
        for (var i = 0; i < indexArr.length; i++) {
          var item = sp.gv.add(decodeURIComponent(indexArr[i]), sp.getImage(this.selection.text, indexArr[i]));
          sp.preImageArr.push(item.image);
        }
        sp.saveSetting('thisSelection', this.selection.index.toString());
        var arr = sp.getSetting('effectName').split(',');
        if (sp.lookUpInArray(this.selection.text, arr)) {
          sp.onlyEffectValue = true;
        } else {
          sp.onlyEffectValue = false;
        }
        sp.saveSetting('onlyEffect', sp.onlyEffectValue.toString());
        sp.droplist.itemSize.height = 20;
        sp.gv.scrollBarValue = 0;
        sp.gv.refresh();
      };
      this.winResize = function () {
        group1.location = [2, 0];
        group1.size = [win.size[0], win.size[1]];
        gv.size([group1.size[0], group1.size[1] - 20]);
        group11.location = [1, 1];
        group11.size.width = win.size[0] + 12;
        droplist.size = [win.size[0] - 64, group11.size[1] - 3];
        droplist.location.x = 60;
        sp.parentDroplist.size.width = 60;
        sp.parentDroplist.size.height = droplist.size.height;
        sp.parentDroplist.itemSize.width = 33;
        droplist.itemSize.width = droplist.size.width - 27;
        sp.gv.refresh();
      };
      this.winClose = function () {
        var thisStr = win.size[0].toString() + ',' + win.size[1].toString();
        sp.saveSetting('winSize', thisStr);
        thisStr = win.location[0].toString() + ',' + win.location[1].toString();
        sp.saveSetting('winLocation', thisStr);

        sp.renderTaskArray.forEach(function (item, index) {
          app.cancelTask(item);
        });
        sp.renderTaskArray.length = 0;
        sp.previewHelper = {};
      };
      this.rightClick = function (event) {
        keepRef.leftClick();

        var alt = event.altKey;
        var key = ScriptUI.environment.keyboardState;
        if (key.ctrlKey === false && key.shiftKey === false && alt === false) {
          keepRef.shortMenu(event);
        } else if (key.ctrlKey === true && key.shiftKey === false && alt === false) {
          keepRef.newItem(event);
        } else if (key.ctrlKey === false && key.shiftKey === true && alt === false) {
          var currentPosition = [event.screenX - 152, event.screenY];
          $.global.upAndDownWindow(currentPosition);
        } else if (key.ctrlKey === false && key.shiftKey === false && alt === true) {
          keepRef.newItem(event);
        } else if (key.ctrlKey === true && key.shiftKey === true && alt === true) {
          // ~                                                         alert(sp.gv.lastSelectedItem.index);
        }
      };
      this.shortMenu = function (event) {
        if (!event) return;
        if (event.button === 2 && event.detail === 1 && event.altKey === false) {
          var currentPosition = [event.screenX, event.screenY];
          var screenString = $.screens[0].toString();
          var finalPositionXString = '';
          for (var i = 0; i < screenString.length; i++) {
            if (screenString[i + 4] !== '-' && screenString[i + 4] !== ':') {
              finalPositionXString += screenString[i + 4];
            } else {
              break;
            }
          }
          if (currentPosition[0] + 180 > parseInt(finalPositionXString)) {
            currentPosition = [event.screenX - 180, event.screenY];
          }

          try {
            if (!sp.menu) {
              sp.menu = $.global.createMenu();
            }
            sp.menu['preview'].text = sp.gv.selection.length === 0 ? loc(sp.previewAll) : loc(sp.previewSelected);
            sp.menu.frameLocation = currentPosition;
            sp.menu.show();
          } catch (err) {
            err.printa();
          }
        }
      };
    } // ~ fns function end
  })(

  // ~ global
  this,

  // ~ create singleton helper object for script,and store it into Global
  function () {
    var sp = function () {
      return new sp.prototype.init();
    };

    sp.prototype = {

      scriptName: 'Sp_memory',
      scriptVersion: '3.0',
      version: 3.0,
      slash: '/',

      setting: app.settings,
      inXml: null,

      isCC2015: !!(app.version.indexOf('13.5') !== -1 || app.version.indexOf('13.6') !== -1 || app.version.indexOf('13.7') !== -1 || app.version.indexOf('13.8') !== -1 || app.version.indexOf('14') !== -1),

      ui: 1,
      lang: 0,

      ip: '139.129.132.60',
      downloadLink: 'http://139.129.132.60/script/Sp_memory',
      weiboLink: 'http://weibo.com/u/3893928357',

      noImage: "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00d\x00\x00\x00<\b\x06\x00\x00\x00\u0090?\x1F\u00CE\x00\x00\t/IDATx\u009C\u00ED\u009BiL\x13]\x17\u00C7\u00FF\u00ED\u00B0\u00B4u\x01,QpA\u0094\u00B4\u00FAA\u0089J\t\u00A8X5b\x1E\u008D1~0\u00D1D\u00FC 1\u00A81FI\u008C\u009A(\u0089\u008D\x0B.\u0089!j\u0088\u00B2\x18\x17\u00F0\u0093Jp%\x1A\u00C5\u0088\u0080\u00DA\u00D4\x05\u0085Z!\u0080\u0082\x16D,\u00B6,-]8\u00CF\x07_&\u008E-L\u00CD\u00D3\u00F7y\u00E7\u00D5\u00F9%7\u00E9\u009C{\u00EE\u0099\u00E5?w\u00EE\u009Ds\u00A7\x12\x00\x04\x11\u00C1 \u00FD_\x1F\u0080\b\x17Q\x10\u0081!\n\"0DA\x04\u0086(\u0088\u00C0\x10\x05\x11\x18\u00A2 \x02C\x14D`\u0088\u0082\b\fQ\x10\u0081\x11\u00C4\u00E7 \u0095J1z\u00F4h\u0084\u0084\u0084x\u00D5\x11\x11\\.\x17\u00ACV+\u0088\u00FE\u00CC\f\u008CD\"\x01\x000\f\x03\u00B9\\\u008E\u00D0\u00D0PH\u00A5\u00DE\u00F7\u00B9\u00D3\u00E9\u0084\u00CDf\u00C3\u00C0\u00C0\u00C0\u00B0\u00F1x\x05\x19=z4222\x10\x17\x17\u0087\u00FE\u00FE~N\u009D\u00CB\u00E5BSS\x13\n\x0B\x0B\u00E1t:\x7F\u00E5<~+\u00A4R)\"\"\"\u0090\u0092\u0092\u0082\u00E4\u00E4d\u00C8d2N}hh(\x1A\x1B\x1BQPP\u0080o\u00DF\u00BE\r\x1B\u008BW\x10\u00B9\\\u008E\u00A4\u00A4$8\x1C\x0E\u0098L&N\u009D\u00DB\u00EDF[[\x1B\u00AF\u00EA\u00BF;\u0083O\n\u008B\u00C5\u0082\u00F7\u00EF\u00DF#44\u0094S\u00AF\u00D1h\u0090\u009C\u009C\u008C\u00E2\u00E2b^A\u0080\u00EF\u00D9\u00DE!Ktt4\x15\x15\x15\u00D1\u00FA\u00F5\u00EB\u0087\u00F5\x13\u00CB\u00D0e\u00FD\u00FA\u00F5TTTD\u00D1\u00D1\u00D1\u00BC\u00BE\u00E2\u00A0.0DA\x04\x06\u00AF \u0083\u00CFG\u00B7\u00DB\u00FDo\x1C\u00CFo\u0089\u00DB\u00ED\u0086\u00CB\u00E5\u00F2k&\u00CA+\u0088\u00D3\u00E9\u0084\u00C9dBGGG@\x0E\u00EEO\u00A4\u00A3\u00A3\x03&\u0093\u00C9\u00AF\u0099\u00A8\x04<K\u00B8\x12\u0089\x04\u00C1\u00C1\u00C1\u00F0x<\u00F0x<\u0081:\u00C6?\n\u0086a\u00C00\u008C_\u00BD\u0084W\x10\u0091\x7F\x17qP\x17\x18\u00A2 \x02C\x14D`\u00F0\u00A6N\u00FC%66\x16\x1F?~\u00F4\u009A\x1EO\u009B6\r2\u0099\f555\x1C{RR\x12\u00D2\u00D2\u00D2 \u0095JQRR\u0082\u00F2\u00F2\u00F2!cGEEA\u00ADV\u00A3\u00A2\u00A2\x02\x000n\u00DC8X\u00ADV8\x1C\x0E/\u00DFQ\u00A3F!((\b]]]^u\u0087\x0F\x1FFnn.\u00CCf\u00F3\u0090\u00FB\n\x0B\x0B\u00C3\u00F6\u00ED\u00DB1a\u00C2\x04\u00B4\u00B5\u00B5\u00E1\u00E4\u00C9\u0093\u009Ct\u00C7\u00DC\u00B9s\x11\x1E\x1E\u00CEic2\u0099\u00D0\u00DC\u00DC<d\u00CC_% \u00E9\u0081\u00A2\u00A2\"\u00BA|\u00F9\u00B2\u0097\u00BD\u00B4\u00B4\u0094***\u00D8m\u0086a\u00E8\u00C6\u008D\x1Bd\u00B7\u00DB\u00A9\u00BD\u00BD\u009D\u00CCf3\u00F5\u00F7\u00F7SEE\x05\u008D\x1C9\u00D2g\u00EC\u00EC\u00ECljmme\u00B7sss)''\u00C7\u00A7\u00EF\u00C5\u008B\x17\u00E9\u00D0\u00A1C^v\u0086a\u00A8\u00A9\u00A9\u0089\u00F2\u00F3\u00F3\u0087<\u0087={\u00F6\u0090\u00D9l&\u0087\u00C3Af\u00B3\u0099\u00FA\u00FA\u00FA\u00A8\u00A3\u00A3\u0083rssY\u009F\u00B7o\u00DF\u00D2\u00CF\\\u00BAt)`i\u0096\u0080=\u00B2\u00FA\u00FA\u00FA\u00B0j\u00D5*\u00A4\u00A7\u00A7s\u00ECn\u00B7\u009B3\u00FF\u00BEr\u00E5\n\u00B4Z-rrr\x10\x13\x13\u0083I\u0093&A\u00A7\u00D3A\u00ADV\u00E3\u00EE\u00DD\u00BBC\u00C6w\u00B9\\\u00ECo\u00A5R\u0089\u00D4\u00D4T/\x1F\u0086a0w\u00EE\\DGG{\u00D5m\u00DA\u00B4\t\u00B1\u00B1\u00B1\u00987o\u009E\u00CF\u00F8\x1B6l@VV\x16>~\u00FC\u0088\u00A5K\u0097b\u00FC\u00F8\u00F1\u00D0h4\u00D0\u00EB\u00F5\u00D8\u00B8q#\u008A\u008A\u008A\x00|\x7F/\u00BBy\u00F3&\u00B4Z-[\u00F6\u00ED\u00DB7\u00FC\u00C5\u00F9E\x02\u00A2l^^\x1E\u00D9\u00EDvjmm\u00A5\u0098\u0098\x18\u00D6~\u00F5\u00EAU\u00BA\x7F\u00FF>\x01\u00A0\u00F8\u00F8x\u00EA\u00E9\u00E9!\u009DN\u00E7\u00D5>##\u0083\u00FA\u00FA\u00FA|&1\u00B3\u00B3\u00B3\u00A9\u00A9\u00A9\u0089\u00DD.++#\u00B7\u00DBMiii\x1C\u00BF\u00CC\u00CCL\x1A\x18\x18\u00A0\u00D2\u00D2R\u00AF\x18\u00E5\u00E5\u00E5T__Ov\u00BB\u009D\u0096/_\u00CE\u00A9\u0093H$T[[K\x06\u0083\u0081\x18\u0086\u00F1j{\u00E2\u00C4\tJHH \x00TSSC\x05\x05\x05\x01\u00EB\x11?\u0097\u0080\x0E\u00EAF\u00A3\x11N\u00A7\x13W\u00AE\\a\x17n~d\u00DB\u00B6m0\u009B\u00CD8p\u00E0\u0080W]AA\x01jkk\u00B1z\u00F5j\u00DE\u00FDDFF\u00A2\u00BB\u00BB\x1B\x1B7n\u00E4\u00D8\u00D7\u00ACY\x03\u009B\u00CD\u0086\u00B0\u00B00\u008E=**\ns\u00E6\u00CC\u00C1\u00E5\u00CB\u0097a2\u0099\u00B0u\u00EBVN\u00BDV\u00AB\u0085J\u00A5\u00C2\u00A1C\u0087|\u00BE\u00FC\u00EE\u00DC\u00B9\x13\u00CF\u009F?\u00E7=\u00AE@\x10PA\\.\x17v\u00EC\u00D8\u0081\u00E9\u00D3\u00A7\u00E3\u00CC\u00993^\u00F5QQQhnn\x1Er\u00FD\u00A4\u00B1\u00B1\x11J\u00A5\u0092w?c\u00C7\u008EEyy94\x1A\r\u00E2\u00E2\u00E2\x00\x00\u0089\u0089\u0089\u0088\u008F\u008FGuu5\"##9\u00FE:\u009D\x0E\u00BD\u00BD\u00BD8v\u00EC\x18\u00AA\u00AA\u00AA\u00A0\u00D1h8\u008BH\u008B\x17/\u0086\u00C5b\u00C1\u00F5\u00EB\u00D7\u00FD:\u00CF\u00B5k\u00D7\u00E2\u00EB\u00D7\u00AFl9{\u00F6\u00AC_\u00ED\u00FC!`\u00B3\u00ACAn\u00DD\u00BA\u0085\x0B\x17. ==\u00DDkL\x18L\x1F\f\u0085\u00CB\u00E5Bpp\u00F0\u00B0\u00F1CBB\x10\x11\x11\u0081\u00E3\u00C7\u008FC\u00A5R\u00E1\u00E0\u00C1\u0083X\u00B7n\x1D\u00F6\u00EE\u00DD\x0B\u00A3\u00D1\u0088\u00ABW\u00AF\u00E2\u00C8\u0091#\u009C6\u00F3\u00E6\u00CD\u0083\u00DB\u00EDFqq1\x14\n\x05\u0094J%v\u00EF\u00DE\u00CD\u00F6\u00D4\u00C1\u00D4\u00D0\u00CFi\u008D\u00DA\u00DAZv\u00E9Z&\u0093a\u00D9\u00B2e\x00\u00BE\u00DF8eee\u00AC\u00DF\u009D;wx\u00AE\u008A\u00FF\u00FCW\u00DEC233\u00F1\u00FA\u00F5k\u009C8q\u0082s'Z,\x16L\u009E<y\u00C8v\u0093'O\u0086\u00C5b\x196vll,\u00A4R)\u00DE\u00BD{\u0087\u00BBw\u00EFb\u00C1\u0082\x05\b\x0F\x0F\u00C7\u00FC\u00F9\u00F3q\u00FD\u00FAu<y\u00F2\x04#G\u008Ed{\u00C9\u008A\x15+\u00A0R\u00A9\u00E0v\u00BB1{\u00F6lL\u009B6\r\x16\u008B\x05\x7F\u00FD\u00F5\x17\x1B\u00F3\u00F1\u00E3\u00C7\x18;v,\u00B4Z-g_\u00F7\u00EE\u00DD\u00C3\u00C3\u0087\x0F\u00D1\u00D2\u00D2\x02\u00A5R\u0089/_\u00BE\x00\x00\f\x06\x03\u00F6\u00EE\u00DD\u00CB\u0096\u00CA\u00CA\u00CA_\u00BEF\u00C3\x11\u00B0A\u00FD\u00E9\u00D3\u00A7\u00ECvTT\x14}\u00F8\u00F0\u0081\u00ACV+;\u00A8/Y\u00B2\u0084\u00ECv;m\u00DE\u00BC\u00D9\u00AB}JJ\n\u00D9l6\u00CA\u00CC\u00CC\x1CvPOOO\u00A7\u00F6\u00F6v\x02@\n\u0085\u0082>\x7F\u00FELF\u00A3\u0091ZZZ(88\u0098d2\x19uwwSjj*\x01\u00A0[\u00B7n\u00D1\u00CB\u0097/9\u00F1\u00B6l\u00D9B===\u00A4V\u00AB\t\u00F8>%\u00AE\u00AF\u00AF\u00A7G\u008F\x1E\u00F9<\u00B7\u0092\u0092\x12\u00AA\u00AB\u00AB\u00FB\u00FF\x1B\u00D4\x7F\u00A4\u00BD\u00BD\x1D\u00BBv\u00ED\u00E2\u00D8\x1E<x\x00\u0083\u00C1\x00\u009DN\u0087\u00B4\u00B44\u00D6\u00BEh\u00D1\"\u009C?\x7F\x1E\u00EF\u00DF\u00BF\u00C7\u00A9S\u00A7\u0086\u008D;c\u00C6\f\u00F6N\u00ED\u00EB\u00EBCee%T*\x15***\u00E0r\u00B9\u00E0p8`\u00B1X\u00A0\u00D1h\u00A0P(\u0090\u0090\u0090\u0080\u00AA\u00AA*N\u008C\u00FC\u00FC|\u00B4\u00B5\u00B5\u00B1\u00D3U\u008F\u00C7\u0083s\u00E7\u00CE!11\x11\u00A5\u00A5\u00A5\u0090\u00CB\u00E5\u00AC\u00EF\u00FE\u00FD\u00FB\u0091\u009A\u009A\u008A\u00DB\u00B7o\u00B3\u00B6\u0090\u0090\x10\u0084\u0087\u0087\u00B3\u00E5\u00E75\u00F4\x7FJ@\u0094\u00CD\u00CF\u00CF'\u00BD^\u00EF\u00D3\u00FEc\u00CF\u0089\u0088\u0088 \u00BD^O\x0E\u0087\u0083\u00DE\u00BCyC\u00AF^\u00BD\u00A2\u00DE\u00DE^\u00AA\u00AB\u00AB#\u0095J\u00E53vvv6577\x13\x00*..\u00E6\u00BCh\u00CE\u009A5\u008B\u00ACV+M\u009D:\u0095\u00B5\u00BDx\u00F1\u0082\n\x0B\x0B\u00E9\u00F0\u00E1\u00C3\u00D4\u00D5\u00D5Ec\u00C6\u008C\u00F1\u008AY\\\\L\r\r\r$\u0091HX\u00DB\u00E9\u00D3\u00A7\u00C9j\u00B5\u00D2\u00A7O\u009F\u00E8\u00C9\u0093'd4\x1A\u00C9n\u00B7\u00D3\u008D\x1B7X\u00BF7o\u00DEPww7uuu\u00B1%///`=\u0084\x01\u00A0\x0B\u0084\u00AA===\u00F8\u00F0\u00E1\u0083\u00D7\u00F4\u00F0\u00F6\u00ED\u00DB\u00E8\u00EC\u00ECd\u00BFXq8\x1C(,,\u0084\u00CDf\u0083B\u00A1@WW\x17JJJ\u0090\u0096\u0096\u0086\u00CE\u00CEN\u009F\u00B1\x07g3\u00D5\u00D5\u00D5\x18\x18\x18\u00C0\u00F3\u00E7\u00CFQWW\x07\u00E0{Olhh@uu5\u00EB\u00DF\u00DF\u00DF\u008Fg\u00CF\u009E\u00A1\u00B3\u00B3\x13\u00D5\u00D5\u00D5>\u009F\u00F1\x06\u0083\x012\u0099\fz\u00BD\u009E}q-++\u00C3\u00BD{\u00F7\u00A0T*\u00E1v\u00BB\u00D1\u00DA\u00DA\u008A\u00A3G\u008F\"++\u008Bm\x17\x14\x14\x04\u00A3\u00D1\b\u0083\u00C1\u00C0\u0096k\u00D7\u00AE\u00A1\u00A5\u00A5\u00E5\u009F]\u00C0\u00FF \u00AE\u0087\b\f1\u00DB+0DA\x04\x06\u00AF \x12\u0089\x04\f\u00C3\u00F8\u00FC^U\u00C4?\u00A4R)\x18\u0086\u00F1\u0099N\u00F2\u00F2\u00E5s`\x18\x06\u0091\u0091\u0091\x181bD@\x0E\u00EEOd\u00C4\u0088\x11\u0088\u008C\u008C\x04\u00C30\u00BC\u00BE\u00BC\u0082(\x14\n\u00A4\u00A6\u00A6B\u00ADV\x07\u00E4\u00E0\u00FED\u00D4j5\u0096.]\n\u0085B\u00C1\u00EB\u00CB+\u0088\\.\u00C7\u00C2\u0085\x0B\u00D9$\u009E\u00C8\u00AF\x13\x17\x17\x07\u00ADV\u00CBy\u00E1\x1C\n^A\u00A4R)\u00E4r\u00B9\u00CF\u00FF\u0087\u0088\u00F8GHH\b\u00E4r\u00B9_\u00E3\u00B08R\x0B\fQ\x10\u0081\u00E1\u00D7z\u0088B\u00A1\u00C0\u00CA\u0095+1q\u00E2D\u008E}0\u00BDPRR2\u00EC:\u00C7\u00EF\u008ET*EXX\x18\x12\x12\x120s\u00E6L\u00AFd\u00E3\u00EC\u00D9\u00B3\x11\x14\u00E4\u00DF\u00D2\x13\u00AF\u0097\u00DDn\u00C7\u00B3g\u00CF0}\u00FAt\u00AF\u0081\u00DD\u00E9t\u00C2\u00E3\u00F1\u00F85\u00BF\u00FE]\u0091H$\u00EC\u00F7\u00CFJ\u00A5\x12S\u00A6L\u00F1\x1A\u00BC{{{a2\u0099`\u00B7\u00DB\u00F9\u00E3\u0081'\u0097%\u00FE\u00E9sx\x02\u00FD\u00A7O1\u00B9(0\u00C4A]`\u0088\u0082\b\fQ\x10\u0081!\n\"0DA\x04\u0086(\u0088\u00C0\x10\x05\x11\x18\u00A2 \x02C\x14D`\u0088\u0082\b\u008C\u00BF\x01O\u00C5\u0098\x01\u00ABf\u00E6Y\x00\x00\x00\x00IEND\u00AEB`\u0082",

      xmlFileNames: [],
      xmlGroupNames: [],
      xmlCurrentFileNames: [],

      layerTypePropertyArr: [],
      layerTypePropertyValueArr: [],

      expPropertyArr: [],

      layerArr: [],
      layerParentNameArr: [],

      init: function () {
        return this;
      },

      // ~            give source to target
      extend: function (target, source) {
        for (var i in source) target[i] = source[i];
        return target;
      }

    };

    sp.prototype.extend(sp.prototype, {

      scriptFile: new File($.fileName),
      scriptFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory'),
      materialFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory' + sp.prototype.slash + 'tempFile'),
      settingsFile: new File(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory' + sp.prototype.slash + 'settings.xml'),
      imageFolder: new Folder(File($.fileName).parent.fsName + sp.prototype.slash + 'Sp_memory' + sp.prototype.slash + 'image'),
      roamingFolder: new Folder(Folder.userData.fullName + sp.prototype.slash + 'Aescripts' + sp.prototype.slash + 'Sp_memory'),

      isOutside: true,
      isLoopPreview: false,
      previewHelper: {},
      renderTaskArray: [],
      preImageArr: [],
      newItemOrCover: 'newItem',

      haveSetting: function (keyName) {
        return this.setting.haveSetting(this.scriptName, keyName);
      },

      saveSetting: function (keyName, value) {
        this.setting.saveSetting(this.scriptName, keyName, value);
      },

      getSetting: function (keyName) {
        return this.setting.getSetting(this.scriptName, keyName);
      },

      getSettingAsBool: function (keyName) {
        return this.getSetting(keyName) === 'true';
      },

      getFileByName: function (name) {
        var string = this.scriptFolder.toString() + this.slash + name + '.xml';
        var file = new File(string);
        return file;
      },

      isForceEnglish: function () {
        var string = this.scriptFolder.toString() + this.slash + 'force_en.txt';
        var file = new File(string);
        return file.exists;
      },

      getImageFolderByName: function (name) {
        var string = this.imageFolder.toString() + this.slash + name + '';
        var folder = new Folder(string);
        if (!folder.exists) {
          folder.create();
        }
        return folder;
      },

      getImage: function (groupName, imageName) {
        var folder = this.getImageFolderByName(groupName);
        if (!folder.exists) {
          folder.create();
        }
        var string = folder.toString() + this.slash + imageName + '.png';
        var file = new File(string);
        if (file.exists) {
          return file;
        } else {
          return this.noImage;
        }
      },

      getImageFile: function (groupName, imageName) {
        var folder = this.getImageFolderByName(groupName);
        if (!folder.exists) {
          folder.create();
        }
        var string = folder.toString() + this.slash + imageName + '.png';
        var file = new File(string);
        return file;
      },

      getGlobalIndexFromFileName: function (name) {
        var content = new XML(this.settingsFile.readd());
        var thisIndex = -1;
        this.forEach(content.ListItems, function (item, index) {
          if (item.toString() === name) {
            thisIndex = index;
          }
        });
        return thisIndex;
      },

      openLink: function (url) {
        var cmd = '';
        if ($.os.indexOf('Win') !== -1) {
          cmd += 'explorer ' + url;
        } else {
          cmd += 'open "' + url + '"';
        }
        try {
          system.callSystem(cmd);
        } catch (e) {}
      },

      getVersion: function (scriptname) {
        var url = this.ip + '/script/' + scriptname + '.txt';

        var port = 80;
        var domain = url.split('/')[0] + ':' + port;
        var call = 'GET ';
        if (url.indexOf('/') < 0) {
          call += '/';
        } else {
          call += url.substr(url.indexOf('/'));
        }
        call += ' HTTP/1.1\n';
        call += 'Host: ' + domain + '\n\n';
        call += 'Connection: close\n\n';

        var reply = '';
        var file = new File();
        file.encoding = 'binary';
        file.open('w');
        var conn = new Socket();
        conn.encoding = 'binary';
        if (conn.open(domain, 'binary')) {
          conn.write(call);
          reply = conn.read(300);
          var contentLengthHeader = String(reply.match(/Content-Length: [0-9]*/));
          var contentLength = contentLengthHeader.substr(16);
          var headerLength = reply.indexOf('\n\n') + 2;
          reply += conn.read(contentLength + headerLength - 300);
          var recievedVersion = reply.toString().substring(reply.toString().lastIndexOf('BeginVersion') + 12, reply.toString().lastIndexOf('EndVersion'));
          conn.close();
        } else {
          reply = '';
        }

        return recievedVersion;
      }

    });

    sp.prototype.extend(sp.prototype, {
      getTimeInfoArr: function (comp) {
        var layers = [];
        if (comp.selectedLayers.length === 0) {
          for (var i = 0; i < comp.numLayers; i++) {
            if (comp.layer(i + 1).enabled === true) {
              layers.push(comp.layer(i + 1));
            }
          }
        } else {
          for (i = 0; i < comp.selectedLayers.length; i++) {
            if (comp.selectedLayers[i].enabled === true) {
              layers.push(comp.selectedLayers[i]);
            }
          }
        }

        var inPointArr = [];
        var outPointArr = [];

        for (i = 0; i < layers.length; i++) {
          var layer = layers[i];
          inPointArr.push(layer.inPoint);
          outPointArr.push(layer.outPoint);
        }

        if (layers.length === 0) return null;
        inPointArr.sort(function (a, b) {
          return a - b;
        });
        outPointArr.sort(function (a, b) {
          return a - b;
        });

        return [inPointArr[0], outPointArr[outPointArr.length - 1]];
      },
      swap: function (a, b) {
        var tempA = a.text;
        a.text = b.text;
        b.text = tempA;
      },
      lookUpTextInChildren: function (text, children) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
          if (children[i].text === text) {
            return true;
          }
        }
        return false;
      },

      lookUpInArray: function (text, arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
          if (arr[i] === text) {
            return true;
          }
        }
        return false;
      },
      lookUpInItem: function (text, items) {
        var len = items.length;
        for (var i = 1; i <= len; i++) {
          if (items[i].name === text) {
            return [true, items[i]];
          }
        }
        return [false, null];
      },
      deleteIndexAndReload: function (deleteIndex) {
        var settingxml = new XML(this.settingsFile.readd());
        this.forEach(settingxml.ParentGroup, function (item, index) {
          for (var j = 0, len = item.children().length(); j < len; j++) {
            var thisItem = item.child(j);
            if (parseInt(thisItem.toString()) === deleteIndex) {
              thisItem.setLocalName('waitToDelete');
              delete item.waitToDelete;
            }
          }
        });
        this.forEach(settingxml.ParentGroup, function (item, index) {
          for (var j = 0, len = item.children().length(); j < len; j++) {
            var thisItem = item.child(j);
            if (parseInt(thisItem.toString()) > deleteIndex) {
              item.insertChildBefore(thisItem, new XML('<Index>' + (parseInt(thisItem.toString()) - 1).toString() + '</Index>'));
              thisItem.setLocalName('waitToDelete');
              delete item.waitToDelete;
            }
          }
        });

        this.settingsFile.writee(settingxml);
      },
      reloadParentDroplist: function () {
        this.parentDroplist.removeAll();
        var settingxml = new XML(this.settingsFile.readd());
        this.xmlGroupNames.length = 0;
        this.forEach(settingxml.ParentGroup, function (item, index) {
          this.push(item['@groupName'].toString());
        }, this.xmlGroupNames);
        this.xmlGroupNames.forEach(function (item, index) {
          this.add('item', item);
        }, this.parentDroplist);
        this.reloadDroplist();
      },
      reloadDroplist: function () {
        this.droplist.removeAll();
        this.gv.removeAll();
        var parentSelection = parseInt(this.getSetting('parentSelection'));
        var groupName = this.xmlGroupNames[parentSelection];

        var settingxml = new XML(this.settingsFile.readd());
        this.xmlFileNames.length = 0;
        this.xmlCurrentFileNames.length = 0;

        var indexArr = [];

        this.forEach(settingxml.ParentGroup, function (item, index) {
          if (item['@groupName'] === groupName) {
            for (var j = 0; j < item.children().length(); j++) {
              indexArr.push(parseInt(item.child(j).toString()));
            }
          }
        });

        var listArr = [];
        this.forEach(settingxml.ListItems, function (item, index) {
          this.push(item.toString());
        }, this.xmlFileNames);
        for (var i = 0, len = indexArr.length; i < len; i++) {
          listArr.push(settingxml.ListItems.child(indexArr[i]).toString());
        }

        listArr.forEach(function (item, index) {
          this.add('item', item);
        }, this.droplist);

        this.xmlCurrentFileNames = listArr;
      },
      cropImage: function (fi, inImageFileA) {
        var f = new ImportOptions();
        f.file = fi;
        f.forceAlphabetical = false;
        f.importAs = ImportAsType.FOOTAGE;
        f.sequence = false;
        f = app.project.importFile(f);
        var tempComp3 = app.project.items.addComp('tempComp', 100, 60, 1, 5, 30);
        var BGtemp3 = tempComp3.layers.addSolid([0, 0, 0], 'BG', tempComp3.width, tempComp3.height, 1, 10800);
        var ima = tempComp3.layers.add(f);
        var scaleX = 10000 / ima.source.width;
        var scaleY = 6000 / ima.source.height;
        if (scaleX / 60 < scaleY / 100) {
          ima.transform.scale.setValue([scaleX, scaleX]);
        } else {
          ima.transform.scale.setValue([scaleY, scaleY]);
        }
        tempComp3.saveFrameToPng(0, inImageFileA);
        f.remove();
        try {
          if (BGtemp3.source.parentFolder.numItems === 1) {
            var BGparent = BGtemp3.source.parentFolder;
            BGtemp3.source.remove();
            BGparent.remove();
          } else {
            BGtemp3.source.remove();
          }
        } catch (err) {}
        tempComp3.remove();
      },

      savePng2: function (pngPath) {
        app.beginSuppressDialogs();
        var comps = app.project.activeItem;
        var timeArr = this.getTimeInfoArr(comps);
        var layers = comps.selectedLayers;
        var jishushuzu = [];
        var waitToPre = [];
        var tempComp2 = app.project.items.addComp('tempComp2', comps.width, comps.height, comps.pixelAspect, comps.duration, comps.frameRate);
        var BGtemp = tempComp2.layers.addSolid([0, 0, 0], 'BG', 100, 60, 1, 10800);
        var cunLengthA = layers.length;
        var iq;
        for (iq = 0; iq < layers.length; iq++) {
          jishushuzu.push(layers[iq].index);
        }
        for (iq = 0; iq < layers.length; iq++) {
          var wocaoName = layers[iq].name;
          waitToPre[waitToPre.length] = layers[iq].duplicate();
          waitToPre[iq].name = wocaoName;
        }
        var wwwww = [];
        for (iq = 0; iq < cunLengthA; iq++) {
          wwwww.push(waitToPre[iq].index);
        }
        var precomposeComp = comps.layers.precompose(wwwww, 'tempA', true);
        comps.layer('tempA').copyToComp(tempComp2);
        comps.layer('tempA').remove();
        for (iq = 0; iq < cunLengthA; iq++) {
          comps.layer(jishushuzu[iq]).selected = true;
        }
        try {
          tempComp2.layer(1).solo = false;
        } catch (err) {}
        var preVVVV = tempComp2.layer(1).property('ADBE Transform Group').property('ADBE Scale').value;
        tempComp2.layer(1).property('ADBE Transform Group').property('ADBE Scale').setValue([100 / tempComp2.width * preVVVV[0], 60 / tempComp2.height * preVVVV[1]]);
        tempComp2.width = 100;
        tempComp2.height = 60;
        BGtemp.property('ADBE Transform Group').property('ADBE Position').setValue([50, 30]);
        tempComp2.layer(1).property('ADBE Transform Group').property('ADBE Position').setValue([50, 30]);
        var nameStr = '';
        pngPath = File(pngPath);

        if (this.newItemOrCover === 'newItem' || this.newItemOrCover === 'cover' && this.coverChangeValue === true) {
          if (this.newItemOrCover === 'newItem') {
            while (pngPath.exists) {
              pngPath = pngPath.toString().split('.')[0].toString() + '_' + '.png';
              pngPath = File(pngPath);
            }
          }
          try {
            tempComp2.saveFrameToPng(comps.time, pngPath);
          } catch (err) {}
        }

        if (this.savePreviewValue === true) {
          tempComp2.layer(1).inPoint = timeArr[0];
          tempComp2.layer(1).outPoint = timeArr[1];
          tempComp2.layer(2).inPoint = timeArr[0];
          tempComp2.layer(2).outPoint = timeArr[1];
          timeArr = this.getTimeInfoArr(tempComp2);
          var targetFolder = new Folder(pngPath.toString().replace(/.png/i, '') + '_seq');
          !targetFolder.exists && targetFolder.create();
          var num = this.frameNum;
          for (var i = 0; i < num; i++) {
            try {
              var time = timeArr[0] + i * (timeArr[1] - timeArr[0]) / num;
              var seqPath = new File(targetFolder.toString() + this.slash + i.toString() + '.png');

              tempComp2.saveFrameToPng(time, seqPath);

              app.purge(PurgeTarget.IMAGE_CACHES);
            } catch (err) {}
          }
        }
        BGtemp.source.remove();
        tempComp2.remove();
        precomposeComp.remove();
        try {
          nameStr = decodeURIComponent(File(pngPath).displayName.split('.')[0].toString());
        } catch (err) {}
        app.endSuppressDialogs(false);
        return encodeURIComponent(nameStr);
      },
      savePng: function (pngPath) {
        try {
          app.beginSuppressDialogs();
          var comps = app.project.activeItem;
          var layers = comps.selectedLayers;
          var inArr = [];
          for (var i = 0; i < layers.length; i++) {
            inArr.push(layers[i].index);
          }
          var otherIndexArr = [];
          var otherEnabledArr = [];
          for (i = 0; i < comps.numLayers; i++) {
            var thisLayer = comps.layer(i + 1);
            if (inArr.toString().indexOf(thisLayer.index) === -1) {
              otherEnabledArr.push(thisLayer.enabled);
              otherIndexArr.push(thisLayer.index);
              try {
                thisLayer.enabled = false;
              } catch (err) {}
            }
          }
          var nameStr = '';
          pngPath = File(pngPath);

          if (this.newItemOrCover === 'newItem' || this.newItemOrCover === 'cover' && this.coverChangeValue === true) {
            if (this.newItemOrCover === 'newItem') {
              while (pngPath.exists) {
                pngPath = pngPath.toString().split('.')[0].toString() + '_' + '.png';
                pngPath = File(pngPath);
              }
            }
            if (this.thumbTypeValue === true) {
              app.activeViewer.views[0].saveBlittedImageToPng(comps.time, pngPath, 1000, "what's this? I don't know");
            } else {
              comps.saveFrameToPng(comps.time, pngPath);
            }
            this.cropImage(pngPath, pngPath);
          }

          if (this.savePreviewValue === true) {
            var targetFolder = new Folder(pngPath.toString().replace(/.png/i, '') + '_seq');
            !targetFolder.exists && targetFolder.create();
            var num = this.frameNum;
            var timeArr = this.getTimeInfoArr(comps);
            for (i = 0; i < num; i++) {
              var time = timeArr[0] + i * (timeArr[1] - timeArr[0]) / num;
              var seqPath = new File(targetFolder.toString() + this.slash + i.toString() + '.png');
              if (this.thumbTypeValue) {
                app.activeViewer.views[0].saveBlittedImageToPng(time, seqPath, 1000, "what's this? I don't know");
              } else {
                comps.saveFrameToPng(time, seqPath);
              }
              this.cropImage(seqPath, seqPath);
              app.purge(PurgeTarget.IMAGE_CACHES);
            }
          }

          for (i = 0; i < otherIndexArr.length; i++) {
            try {
              thisLayer = comps.layer(otherIndexArr[i]);
              thisLayer.enabled = otherEnabledArr[i];
            } catch (err) {}
          }
          app.endSuppressDialogs(false);
          nameStr = decodeURIComponent(File(pngPath).displayName.split('.')[0].toString());
          return encodeURIComponent(nameStr);
        } catch (err) {
          alert(err.line.toString() + err.toString());
        }
      }

    });

    sp.prototype.extend(sp.prototype, {

      newLayers: function (elementXml, comp, options) {
        var layerArr = $.layer(elementXml, options).toLayer(comp);

        return layerArr;
      },

      getXmlFromLayers: function (layers, itemName, sp) {
        var options = {
          isSaveMaterial: sp.saveMaterialValue
        };
        return $.layer(layers, options).toXML(itemName);
      },

      newProperties: function (xml, selectedLayers, isCleanGroup, isKeyframeOffset) {
        isCleanGroup = isCleanGroup || false;
        isKeyframeOffset = isKeyframeOffset || false;

        var layerXml = new XML(xml);

        // ~ Ignore xml according to presets.Empty groups according to presets
        var options = {};
        options.newPropertiesSettingArr = [];
        options.cleanPropertiesSettingArr = [];

        options.isCleanGroup = isCleanGroup;
        options.isKeyframeOffset = isKeyframeOffset;

        for (var i = 1; i <= 9; i++) {
          if (sp.prototype.getSetting('_1_' + i) === '1') {
            options.newPropertiesSettingArr.push(1);
          } else {
            options.newPropertiesSettingArr.push(0);
          }

          if (sp.prototype.getSetting('_2_' + i) === '1') {
            options.cleanPropertiesSettingArr.push(1);
          } else {
            options.cleanPropertiesSettingArr.push(0);
          }
        }

        $.layer.newProperties(layerXml.child(0).Properties, selectedLayers, options);
      },

      saveItemToFile: function (file, xml, position) {
        var newXml = new XML(file.readd());
        if (typeof position === 'undefined') {
          newXml.appendChild(xml);
        } else {
          newXml.appendChild(xml);
          var newInsertxml = new XML(newXml.child(newXml.children().length() - 1));
          newXml.insertChildAfter(newXml.child(position), newInsertxml);
          newXml.child(position).setLocalName('waitToDelete');
          newXml.child(newXml.children().length() - 1).setLocalName('waitToDelete');
          delete newXml.waitToDelete;
        }
        file.writee(newXml);
      }

    });

    sp.prototype.init.prototype = sp.prototype;
    $.global.sp = sp();
    return $.global.sp;
  }(),

  // ~ Add methods to objects
  function (sp) {
    __webpack_require__(5);

    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };

    Array.prototype.has = function (value) {
      for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === value) {
          return true;
        }
      }
      return false;
    };

    // ~   getter/setter for  last  element of array
    Array.prototype.last = function (value) {
      if (typeof value === 'undefined') {
        return this[this.length - 1];
      } else {
        this[this.length - 1] = value;
      }
    };

    // ~     add array.forEach()
    Array.prototype.forEach = function (callback, context) {
      if (Object.prototype.toString.call(this) === '[object Array]') {
        var i, len;
        for (i = 0, len = this.length; i < len; i++) {
          if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
            if (callback.call(context, this[i], i, this) === false) {
              break; // or return;
            }
          }
        }
      }
    };

    sp.extend(sp, {
      forEach: function (xml, callback, context) {
        if (!(xml instanceof XML)) return;
        var i, len;
        for (i = 0, len = xml.children().length(); i < len; i++) {
          if (callback.call(context, xml.child(i), i, xml) === false) {
            break;
          }
        }
      }
    });

    Error.prototype.print = Error.prototype.print || function () {
      return 'Line #' + this.line.toString() + '\r\n' + this.toString();
    };

    Error.prototype.printc = Error.prototype.printc || function () {
      cout << '\n---------';
      cout << this.print();
      cout << '---------\n';
    };

    Error.prototype.printa = Error.prototype.printa || function () {
      this.print() << cout;
    };

    File.prototype.writee = function (str) {
      // method to write file
      this.open('w');
      this.write(str);
      this.close();
    };

    File.prototype.readd = function () {
      // method to read from file
      this.open('r');
      var temp = this.read();
      this.close();
      return temp;
    };

    Array.prototype.pushh = function (str) {
      // chains call for Array.push()
      this.push(str);
      return this;
    };
  }(sp),

  // ~ Save default presets if there isn't, then load presets and parse them
  function (sp) {
    var keyNameArr = [];
    var valueArr = [];

    for (var i = 1; i <= 9; i++) {
      keyNameArr.push('_1_' + i);
      if (i === 1 || i === 2 || i === 5) {
        valueArr.push('1');
      } else {
        valueArr.push('0');
      }
    }

    for (i = 1; i <= 9; i++) {
      keyNameArr.push('_2_' + i);
      valueArr.push('0');
    }

    keyNameArr.pushh('thisSelection').pushh('limitText').pushh('thumbType').pushh('winLocation').pushh('winSize').pushh('coverChange').pushh('folderName').pushh('effectName').pushh('deleteAlert').pushh('preCompose').pushh('saveMaterial').pushh('autoName').pushh('onlyEffect').pushh('cleanGroup').pushh('offsetKeyframe').pushh('language').pushh('showThumb').pushh('parentSelection').pushh('frameSecond').pushh('frameNum').pushh('savePreview');

    valueArr.pushh('1').pushh('true').pushh('false').pushh('200,500').pushh('300,500').pushh('false').pushh('Sp_memory Folder').pushh('Effects,Effect,effect,effects,特效,效果').pushh('true').pushh('false').pushh('true').pushh('true').pushh('false').pushh('false').pushh('false').pushh('ch').pushh('true').pushh('0').pushh('33').pushh('30').pushh('true');

    keyNameArr.forEach(function (item, index) {
      (function (item, value) {
        if (sp.haveSetting(item) === false) {
          sp.saveSetting(item, value);
        }
      })(item, valueArr[index]);
    });

    sp.showThumbValue = sp.getSettingAsBool('showThumb');
    sp.deleteAlertValue = sp.getSettingAsBool('deleteAlert');
    sp.preComposeValue = sp.getSettingAsBool('preCompose');
    sp.saveMaterialValue = sp.getSettingAsBool('saveMaterial');
    sp.autoNameValue = sp.getSettingAsBool('autoName');
    sp.onlyEffectValue = sp.getSettingAsBool('onlyEffect');
    sp.cleanGroupValue = sp.getSettingAsBool('cleanGroup');
    sp.offsetKeyframeValue = sp.getSettingAsBool('offsetKeyframe');
    sp.savePreviewValue = sp.getSettingAsBool('savePreview');

    sp.thumbTypeValue = sp.getSettingAsBool('thumbType');
    sp.coverChangeValue = sp.getSettingAsBool('coverChange');

    sp.frameSecond = parseInt(sp.getSetting('frameSecond'));
    sp.frameNum = parseInt(sp.getSetting('frameNum'));

    !sp.roamingFolder.exists && sp.roamingFolder.create();
    !sp.materialFolder.exists && sp.materialFolder.create();

    var loc = function (string) {
      if (sp.lang === 0) {
        sp.lang = sp.getSetting('language');

        if (sp.isForceEnglish()) {
          sp.lang = 'en';
        }
      }
      return string[sp.lang];
    };

    $.global.loc = loc;

    sp.extend(sp, {
      beyondCS6: true,
      versionUpdateInfo: {
        ch: `层存储脚本Sp_Memory 3.0 @秋风_小径

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


`,
        en: `Sp_memory 3.0 @smallpath
                        
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
                        
`
      }
    });

    if (sp.haveSetting('version') === false || sp.getSetting('version') < sp.version) {
      alert(loc(sp.versionUpdateInfo));
      sp.saveSetting('version', sp.version);
    }
  }(sp), function () {
    // ~ if the file is not here,create it
    if (!sp.settingsFile.exists || sp.settingsFile.length === 0) {
      if (sp.settingsFile.exists) sp.settingsFile.remove();
      var settingsText = '<settings>\
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
</settings>';
      var newsettingsxml = new XML(settingsText);
      var allFiles = sp.scriptFolder.getFiles();
      newsettingsxml.ParentGroup.appendChild(new XML("<item groupName='Default'/>"));
      var i = 0;
      allFiles.forEach(function (item, index) {
        if (item.toString().indexOf('.xml') !== -1 && item.name.indexOf('settings.xml') === -1) {
          newsettingsxml.ListItems.appendChild(new XML('<Name>' + item.displayName.replace('.xml', '') + '</Name>'));
          newsettingsxml.ParentGroup.child(0).appendChild(new XML('<Index>' + i + '</Index>'));
          i++;
        }
      });
      sp.settingsFile.writee(newsettingsxml);
    }

    // ~ If the file do not have the ParentGroup,add parentGroup to it
    var content = new XML(sp.settingsFile.readd());
    if (!content.hasOwnProperty('ParentGroup')) {
      content.appendChild(new XML('<ParentGroup/>'));
    }
    if (content.ParentGroup.children().length() === 0) {
      content.ParentGroup.appendChild(new XML("<item groupName='Default'/>"));
      sp.forEach(content.ListItems, function (item, index) {
        content.ParentGroup.child(0).appendChild(new XML('<Index>' + index.toString() + '</Index>'));
      });
      sp.settingsFile.writee(content);
    }

    // ~ If the file do not have a group,give it
    content = new XML(sp.settingsFile.readd());
    if (!content.hasOwnProperty('ListItems')) {
      content.appendChild(new XML('<ListItems/>'));
    }
    if (content.ListItems.children().length() === 0) {
      allFiles = sp.scriptFolder.getFiles();
      allFiles.forEach(function (item, index) {
        if (item.toString().indexOf('.xml') !== -1 && item.name.indexOf('settings.xml') === -1) {
          content.ListItems.appendChild(new XML('<Name>' + item.displayName.replace('.xml', '') + '</Name>'));
          content.ParentGroup.child(0).appendChild(new XML('<Index>' + index.toString() + '</Index>'));
        }
      });
    }
    if (content.ListItems.children().length() === 0) {
      content.ListItems.appendChild(new XML('<Name>Default</Name>'));
      content.ParentGroup.child(0).appendChild(new XML('<Index>' + 0 + '</Index>'));
      var file = sp.getFileByName('Default');
      sp.getImageFolderByName('Default');
      var str = '<tree></tree>';
      file.writee(str);
    }

    sp.settingsFile.writee(content);
  }(sp));
} catch (err) {
  alert('Line #' + err.line.toString() + '\r\n' + err.toString());
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {


// 批量自动保存每一层为新Item
$.global.autoSave = autoSave;
function autoSave() {
  if (confirm(loc(sp.auto)) === false) return;
  if (!(app.project.activeItem instanceof CompItem)) return alert(loc(sp.needComp));
  if (!sp.droplist.selection) return;

  if (app.project.activeItem.numLayers !== 0) {
    var specialFolder = sp.getImageFolderByName(sp.droplist.selection.text);
    specialFolder.execute();
  }

  try {
    var preRenameValue = sp.autoNameValue;
    sp.autoNameValue = true;
    for (var i = 0; i < app.project.activeItem.numLayers; i++) {
      for (var j = 1; j <= app.project.activeItem.numLayers; j++) {
        app.project.activeItem.layer(j).selected = false;
      }
      app.project.activeItem.layer(i + 1).selected = true;
      sp.fns.newItem();
      app.project.activeItem.layer(i + 1).selected = false;
    }
    sp.autoNameValue = preRenameValue;
  } catch (err) {}
  sp.droplist.notify('onChange');
  sp.gv.refresh();
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {


/** ***********************************Sp_cutLength v1.1,自动裁剪图层长度,根据普通层的透明度与合成层内容的长度进行裁剪**************************************/
$.global.cutLength = cutLength;
function cutLength() {
  if (confirm(loc(sp.cutLength)) === false) return;
  var thisComp = app.project.activeItem;

  Array.prototype.search = function (isZero) {
    var isOk = false;
    var b;
    if (isZero === 0) {
      for (b = 0; b < this.length - 1; b++) {
        if (this[b] === 0 && this[b + 1] > 0) {
          isOk = true;
          break;
        }
      }
      if (isOk === true) {
        return b;
      } else {
        return -1;
      }
    } else if (isZero === 100) {
      for (b = this.length - 1; b > 0; b--) {
        if (this[b - 1] > 0 && this[b] === 0) {
          isOk = true;
          break;
        }
      }
      if (isOk === true) {
        return b;
      } else {
        return -1;
      }
    }
  };
  app.beginUndoGroup('Undo crop');
  try {
    cutLayers(thisComp, {});
  } catch (err) {}
  app.endUndoGroup();
  clearOutput();
  writeLn('Complete!');

  function cutLayers(comp, obj) {
    try {
      if (obj.hasOwnProperty('_' + comp.id)) {} else {
        obj['_' + comp.id] = {
          inPointArr: [],
          outPointArr: []
        };
      }
    } catch (err) {}

    for (var i = 0; i < comp.layers.length; i++) {
      try {
        if (comp.layer(i + 1).source instanceof CompItem) {
          if (obj.hasOwnProperty('_' + comp.layer(i + 1).source.id)) {} else {
            cutLayers(comp.layer(i + 1).source, obj);
          }
          try {
            obj['_' + comp.layer(i + 1).source.id].inPointArr.sort(function (a, b) {
              return a - b;
            });
          } catch (err) {}
          try {
            obj['_' + comp.layer(i + 1).source.id].outPointArr.sort(function (a, b) {
              return b - a;
            });
          } catch (err) {}
          if (comp.layer(i + 1).inPoint - comp.layer(i + 1).startTime < obj['_' + comp.layer(i + 1).source.id].inPointArr[0]) {
            try {
              comp.layer(i + 1).inPoint = comp.layer(i + 1).startTime + obj['_' + comp.layer(i + 1).source.id].inPointArr[0];
            } catch (err) {}
          }
          if (comp.layer(i + 1).outPoint - comp.layer(i + 1).startTime < obj['_' + comp.layer(i + 1).source.id].outPointArr[0]) {
            try {
              comp.layer(i + 1).outPoint = comp.layer(i + 1).startTime + obj['_' + comp.layer(i + 1).source.id].outPointArr[0];
            } catch (err) {}
          }
        }
        try {
          obj['_' + comp.id].inPointArr.push(comp.layer(i + 1).inPoint);
        } catch (err) {}
        try {
          obj['_' + comp.id].outPointArr.push(comp.layer(i + 1).outPoint);
        } catch (err) {}
        cut(comp.layer(i + 1));
      } catch (err) {}
    }
  }

  function cut(layer) {
    var thisOpa = layer.transform.opacity;
    var thisKeysNum = thisOpa.numKeys;
    var arr = [];
    for (var a = 0; a < thisKeysNum; a++) {
      arr.push(thisOpa.keyValue(a + 1));
    }
    if (arr.length === 0) {
      if (thisOpa.value === 0) {
        layer.inPoint = 0;
        layer.outPoint = 0 + layer.containingComp.frameDuration;
      }
    } else if (arr.length === 1) {
      if (arr[0] === 0) {
        layer.inPoint = thisOpa.keyTime(1);
        layer.outPoint = thisOpa.keyTime(1) + layer.containingComp.frameDuration;
      }
    } else if (arr.length > 1) {
      if (arr.search(0) !== -1) {
        if (layer.inPoint < thisOpa.keyTime(arr.search(0) + 1) && arr.search(0) === 0) {
          layer.inPoint = thisOpa.keyTime(arr.search(0) + 1);
        }
      }
      if (thisOpa.keyValue(thisKeysNum) === 0) {
        layer.outPoint = thisOpa.keyTime(thisKeysNum);
      } else {}
    }
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/** ***********************************自动重载图片**************************************/
$.global.reloadPic = reloadPic;
function reloadPic() {
  var thisComp = app.project.activeItem;
  if (!(thisComp instanceof CompItem)) return alert(loc(sp.needComp));
  if (!sp.droplist.selection) return;

  if (confirm(loc(sp.refresh)) === false) return;

  var frames = prompt(loc(sp.reloadNeedFrames), '');
  var shouldLimit = true;
  if (!frames || isNaN(frames)) shouldLimit = false;
  if (frames === '') shouldLimit = false;

  try {
    frames = parseInt(frames);
    var SpeciallimitTime = frames / thisComp.frameRate;
  } catch (err) {}

  var preRenameValue = sp.autoNameValue;
  sp.autoNameValue = true;
  var preCompValue = sp.preComposeValue;
  sp.preComposeValue = false;
  if (sp.gv.children.length !== 0) {
    var specialFolder = sp.getImageFolderByName(sp.droplist.selection.text);
    specialFolder.execute();
  }

  for (var i = 0; i < sp.gv.children.length; i++) {
    try {
      sp.gv.children[i].selected = true;

      try {
        sp.gv.children[i - 1].selected = false;
      } catch (err) {}

      sp.gv.lastSelectedItem = sp.gv.children[i];

      var layerArr = sp.fns.newLayer();
      var j;
      for (j = 0; j < thisComp.selectedLayers.length; j++) {
        thisComp.selectedLayers[j].selected = false;
      }

      if (!layerArr) continue;

      if (!(layerArr instanceof Array)) layerArr = [layerArr];

      for (j = 0; j < layerArr.length; j++) {
        layerArr[j].selected = true;

        if (shouldLimit === false) continue;

        if (layerArr[j].outPoint > SpeciallimitTime) {
          layerArr[j].outPoint = SpeciallimitTime;
        }
      }

      sp.fns.cover();

      for (j = layerArr.length - 1; j >= 0; j--) {
        layerArr[j].remove();
      }

      sp.gv.children[i].selected = false;
    } catch (err) {
      alert(err.line.toString() + '\r' + err.toString());
    }
  }

  sp.autoNameValue = preRenameValue;
  sp.preComposeValue = preCompValue;
  sp.gv.refresh();
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/** ***********************************Sp_translate v1.7,自动修复多语言版本造成的表达式报错问题**************************************/
$.global.translate = translate;
function translate(thisObj, expProps) {
  var you = this;

  var tsp = {
    trans: { en: 'Translate', ch: '开始' },
    allComp: { en: 'Translate all comps', ch: '翻译所有合成' },
    activeComp: { en: 'Translate active comp', ch: '翻译当前合成' },
    selectedComp: { en: 'Translate selected comps', ch: '翻译选中合成' },
    wrongExp: { en: 'Translate wrong exps', ch: '仅翻译错误表达式' },
    rightExp: { en: 'Translate right exps', ch: '仅翻译正确表达式' },
    allExp: { en: 'Translate all expressions', ch: '翻译所有的表达式' },
    log: { en: 'log', ch: '记录' },
    about: { en: 'About', ch: '关于' },
    editBtn: { en: 'Edit hot words', ch: '编辑关键词' },
    str: {
      en: 'This script can fix wrong expressions caused by different language version of AE.By Smallpath',
      ch: '外文工程表达式报错?本脚本可以快速解决这个问题~ @秋风_小径'
    },
    ok: { en: 'Ok', ch: '确认' },
    cancel: { en: 'Cancel', ch: '取消' },
    add: { en: 'Add', ch: '增加' },
    edit: { en: 'Edit', ch: '编辑' },
    change: { en: 'Change', ch: '更改' },
    deleteE: { en: 'Delete', ch: '删除' },
    sureDelete: { en: 'Are you sure to delete it ?', ch: '确认删除吗?' },
    addHelp: {
      en: 'Input new hot words,or choose one item to edit and delete.Make sure what you input has double quotation.',
      ch: '你可以新增关键词,编辑或者删除选中的条目.请确认你输入的名称有双引号'
    },
    openFile: { en: 'Do you want to open the log file?', ch: '想要打开记录文件吗?' },
    complete: { en: 'Complete!', ch: '完成!' },
    _1: { en: 'This is the log file', ch: '这里是记录文件' },
    _2: {
      en: '\r\rWrong expressions that can not be fixed at all are as follows.Check them in their comp.\r',
      ch: '\r\r没有被修复的表达式的位置如下,请进入合成检查'
    },
    _3: { en: '\rComp index =', ch: '\r合成索引数 =' },
    _4: { en: 'Comp name =', ch: '合成名    =' },
    _5: {
      en: '\r\rInfo above is the expressions that has not been fixed.\r\r',
      ch: '上面的是没有被修复的表达式的位置.\r\r'
    },
    _6: {
      en: '\r\rInfo as follows is the expressions that has been fixed.\r',
      ch: '下面的信息是被成功修复的表达式.'
    },
    _7: { en: '\rComp index =', ch: '\r合成索引数' },
    _8: { en: 'Comp name    =', ch: '合成名    =' },
    _9: { en: '\r    Layer index =', ch: '\r    图层索引数 =' },
    _10: { en: '    Layer name =', ch: '\r    图层名       =' },
    _11: { en: '        Property name   =', ch: '        属性名             =' }

  };

  this.supportedLanguages = $.global.translate.supportedLanguages = 4;
  this.hotWords = [];

  var thisFolder = Folder(Folder.userData.fullName + '/Aescripts/Sp_memory');
  if (!thisFolder.exists) thisFolder.create();
  var thisFile = File(thisFolder.fullName + '/WhiteList.xml');
  var allWords = [['"Angle Control"', '"角度控制"', '"角度制御"', '"ADBE Angle Control"'], ['"Checkbox Control"', '"复选框控制"', '"チェックボックス制御"', '"ADBE Checkbox Control"'], ['"Color Control"', '"色彩控制"', '"カラー制御"', '"ADBE Color Control"'], ['"Layer Control"', '"图层控制"', '"レイヤー制御"', '"ADBE Layer Control"'], ['"Point Control"', '"点控制"', '"ポイント制御"', '"ADBE Point Control"'], ['"Slider Control"', '"滑杆控制"', '"スライダー制御"', '"ADBE Slider Control"'], ['"Angle"', '"角度"', '"角度"', '"ADBE Angle Control-0001"'], ['"Checkbox"', '"检测框"', '"チェックボックス"', '"ADBE Checkbox Control-0001"'], ['"Color"', '"颜色"', '"カラー"', '"ADBE Color Control-0001"'], ['"Layer"', '"图层"', '"レイヤー"', '"ADBE Layer Control-0001"'], ['"Point"', '"点"', '"ポイント"', '"ADBE Point Control-0001"'], ['"Slider"', '"滑块"', '"スライダー"', '"ADBE Slider Control-0001"'], ['"Motion Tile"', '"动态平铺"', '"モーションタイル"', '"ADBE Tile"'], ['"Tile Width"', '"平铺宽度"', '"タイルの幅"', '"ADBE Tile-0003"']];
  if (thisFile.exists) {
    var content = thisFile.readd();
    var hahaxml = new XML(content);
    if (hahaxml.settings.version !== '1.6') thisFile.remove();
  }
  var iii;
  if (!thisFile.exists) {
    var newxml = new XML('<WhiteList></WhiteList>');
    newxml.settings.version = '1.6';
    newxml.settings.author = 'Smallpath';
    for (iii = 0; iii < allWords.length; iii++) {
      newxml.words.words[iii] = allWords[iii];
    }
    thisFile.writee(newxml);
  }
  content = thisFile.readd();
  var myxml = new XML(content);
  for (iii = 0; iii < myxml.words.words.length(); iii++) {
    var arr = myxml.words.words[iii].split(',');
    this.hotWords.push(arr);
  }

  this.changeNode = function (index, en, ch, ja, adbe) {
    if (en !== '' || ch !== '' || ja !== '' || adbe !== '') {
      if (en === '') en = 'None';
      if (ch === '') ch = 'None';
      if (ja === '') ja = 'None';
      if (adbe === '') adbe = 'None';

      content = thisFile.readd();
      var xml = new XML(content);
      xml.words.words[index] = [en, ch, ja, adbe];
      thisFile.writee(xml);

      this.hotWords = [];
      for (var iii = 0; iii < xml.words.words.length(); iii++) {
        arr = xml.words.words[iii];
        arr = arr.split(',');
        this.hotWords.push(arr);
      }
    }
  };

  this.deleteNode = function (index) {
    content = thisFile.readd();
    var deletexml = new XML(content);
    delete deletexml.words.words[index];
    thisFile.writee(deletexml);
    this.hotWords = [];
    for (var iii = 0; iii < deletexml.words.words.length(); iii++) {
      arr = deletexml.words.words[iii];
      arr = arr.split(',');
      this.hotWords.push(arr);
    }
  };

  this.addNode = function (en, ch, ja, adbe) {
    if (en !== '' || ch !== '' || ja !== '' || adbe !== '') {
      if (en === '') en = 'None';
      if (ch === '') ch = 'None';
      if (ja === '') ja = 'None';
      if (adbe === '') adbe = 'None';

      content = thisFile.readd();
      var addxml = new XML(content);
      addxml.words.words[addxml.words.words.length()] = [en, ch, ja, adbe];
      thisFile.writee(addxml);

      this.hotWords = [];
      for (var iii = 0; iii < addxml.words.words.length(); iii++) {
        arr = addxml.words.words[iii];
        arr = arr.split(',');
        this.hotWords.push(arr);
      }
    }
  };

  this.findReplace = function (prop, langId, compid) {
    try {
      var expr = prop.expression;
      var oldExp = prop.expression;
      if (expr !== '') {
        for (var l = 0; l < this.supportedLanguages; l++) {
          if (l !== langId) {
            for (var i = 0; i < this.hotWords.length; i++) {
              if (this.hotWords[i][l] !== 'None') {
                var regExp = new RegExp(this.hotWords[i][l], 'g');
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
            prop.valueAtTime(0, false);
            if (lista.selection.index === 0) {
              if (prop.expressionEnabled === false) {
                prop.expression = oldExp;
              }
            }
          } catch (er) {
            // writeLn("Skip wrong expressions.");
            wrongcomps.push(compid);
          };
        }
        app.endSuppressDialogs(false);
      }
    } catch (err) {}
  };

  Array.prototype.add = function (str) {
    var check = false;
    for (var ia = 0; ia < this.length; ia++) {
      if (this[ia] === str) {
        check = true;
      }
    }
    if (check === false) {
      this[this.length] = str;
    }
  };

  function recursiveScanLayerForExpr(ref, compindex, ja) {
    var global = $.global.translate.helper;
    if (ref !== null) {
      var prop;
      for (var i = 1; i <= ref.numProperties; i++) {
        prop = ref.property(i);

        if (checkb.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression && prop.expressionEnabled === true) {
            // .expressionError
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false || prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false || prop.matchName === 'ADBE Audio Group' && prop.propertyGroup(prop.propertyDepth).hasAudio === false || prop.matchName === 'ADBE Extrsn Options Group' || prop.matchName === 'ADBE Plane Options Group' || prop.matchName === 'ADBE Vector Materials Group') {} else {
              recursiveScanLayerForExpr(prop, compindex, ja);
            }
          }
        } else if (checka.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression && prop.expressionEnabled === false) {
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false || prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false || prop.matchName === 'ADBE Audio Group' && prop.propertyGroup(prop.propertyDepth).hasAudio === false || prop.matchName === 'ADBE Extrsn Options Group' || prop.matchName === 'ADBE Plane Options Group' || prop.matchName === 'ADBE Vector Materials Group') {} else {
              recursiveScanLayerForExpr(prop, compindex, ja);
            }
          }
        } else if (checkc.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression) {
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false || prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false || prop.matchName === 'ADBE Audio Group' && prop.propertyGroup(prop.propertyDepth).hasAudio === false || prop.matchName === 'ADBE Extrsn Options Group' || prop.matchName === 'ADBE Plane Options Group' || prop.matchName === 'ADBE Vector Materials Group') {} else {
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
      if (itemid === array[ie]) {
        check = true;
      }
    }
    return check;
  }

  function ScanProjectForExpr(blackList) {
    var global = $.global.translate.helper = {};
    global.propArr = [];
    global.exps = [];
    global.layerExps = [];
    global.comps = [];
    global.layers = [];
    global.layerTemp = [];
    wrongcomps = [];
    var j;
    for (var i = 1; i <= app.project.numItems; i++) {
      var item = app.project.item(i);
      if (item instanceof CompItem) {
        if (isInId(i, blackList) === true) {
          writeLn('Proccessing: ' + item.name);
          for (j = 1; j <= item.numLayers; j++) {
            item.layer(j).selected = false;
            recursiveScanLayerForExpr(item.layer(j), i, j);
            if (global.exps.length !== 0) {
              global.layerExps.push(global.exps);
            }
            global.exps = [];
          }
        }
        if (global.layerTemp.length !== 0) {
          global.layers.push(global.layerTemp);
        }
        global.layerTemp = [];
        var selProps = global.propArr;
        app.beginUndoGroup('Undo translate');
        for (var ic = 0; ic < selProps.length; ic++) {
          if (lista.selection.index === 0) {
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
          } else if (lista.selection.index === 1) {
            you.findReplace(selProps[ic], 0, i);
          } else if (lista.selection.index === 2) {
            you.findReplace(selProps[ic], 1, i);
          } else if (lista.selection.index === 3) {
            you.findReplace(selProps[ic], 2, i);
          } else if (lista.selection.index === 4) {
            you.findReplace(selProps[ic], 3, i);
          }
        }
        app.endUndoGroup();
        for (j = 1; j <= item.numLayers; j++) {
          item.layer(j).selected = false;
        }
      }
    }
    return [global.comps, global.layers, global.layerExps, wrongcomps];
  }

  function searchExpression(excludeByName, expFilters) {
    var allExps = ScanProjectForExpr(excludeByName);
    return allExps;
  }

  var winW = thisObj instanceof Panel ? thisObj : new Window('palette', 'Sp_translate v1.7', undefined, {
    resizeable: true
  });
  winW.margins = 10;
  var thisRes = `Group{
        orientation:'column',
        alignChildren:['left','fill'],
        list:DropDownList{preferredSize:[200,25],properties:{items:['` + loc(tsp.allComp) + `','` + loc(tsp.activeComp) + `','` + loc(tsp.selectedComp) + `']}},
        start:Button{text:'` + loc(tsp.trans) + `',preferredSize:[200,50]},
        group:Group{
                alignChildren:['left','fill'],
                checka:Checkbox{text:'` + loc(tsp.wrongExp) + `',value:1},
                lista:DropDownList{properties:{items:['Default','English','中文','日本語','Common']},size:[60,25]}
        }
        groupa:Group{
                alignChildren:['left','fill'],
                checkb:Checkbox{text:'` + loc(tsp.rightExp) + `',value:0},
                about:Button{text:'` + loc(tsp.about) + `',size:[70,25]},
        }
        groupb:Group{
                alignChildren:['left','fill'],
                checkc:Checkbox{text:'` + loc(tsp.allExp) + `',value:0},
                checkFile:Checkbox{text:'` + loc(tsp.log) + `',size:[80,10]}
                }
         addbtn:Button{text:'` + loc(tsp.editBtn) + `',preferredSize:[200,30]}
        }`;
  try {
    var winTempA = winW.add(thisRes);
  } catch (err) {}
  winW.maximumSize.width = 220;
  winTempA.list.selection = 1;
  winTempA.group.lista.selection = 0;
  var list = winTempA.list;
  var start = winTempA.start;
  var group = winTempA.group;
  var checka = group.checka;
  var lista = group.lista;
  var groupa = winTempA.groupa;
  var checkb = groupa.checkb;
  var about = groupa.about;
  var groupb = winTempA.groupb;
  var checkc = groupb.checkc;
  var checkFile = groupb.checkFile;
  var addbtn = winTempA.addbtn;
  var outFile;

  lista.selection = 0;

  about.onClick = function () {
    var text = loc(tsp.str);
    var wina = new Window('palette', loc(tsp.about));
    var a = wina.add('edittext');
    a.text = text;
    var groupa = wina.add('group');
    var abtn = groupa.add('button', undefined, loc(tsp.ok));
    var bbtn = groupa.add('button', undefined, loc(tsp.cancel));

    a.onChange = a.onChanging = function () {
      this.text = text;
    };

    abtn.onClick = bbtn.onClick = function () {
      wina.close();
    };
    wina.center();
    wina.show();
  };

  checkFile.onClick = function () {
    if (checkFile.value === true) {
      outFile = File.saveDialog('', 'txt');
      if (outFile === null) checkFile.value = false;
    }
  };

  addbtn.onClick = function () {
    var www = new Window('palette', loc(tsp.editBtn), undefined, {
      resizeable: false
    });
    var gr1 = www.add('group');
    var stat1 = gr1.add('statictext', undefined, 'English   ');
    stat1.characters = 19;
    var stat2 = gr1.add('statictext', undefined, '中文 ');
    stat2.characters = 19;
    var stat3 = gr1.add('statictext', undefined, ' 日本語');
    stat3.characters = 19;
    var stat4 = gr1.add('statictext', undefined, '   Common');
    stat4.characters = 19;
    var gr2 = www.add('group');
    var edit1 = gr2.add('edittext', undefined);
    edit1.characters = 19;
    var edit2 = gr2.add('edittext', undefined);
    edit2.characters = 19;
    var edit3 = gr2.add('edittext', undefined);
    edit3.characters = 19;
    var edit4 = gr2.add('edittext', undefined);
    edit4.characters = 19;
    var addde = www.add('group');
    var adda = addde.add('button', undefined, loc(tsp.add));
    adda.size = [180, 40];
    var stackgroup = addde.add('group');
    stackgroup.orientation = 'stack';
    var addb = stackgroup.add('button', undefined, loc(tsp.edit));
    addb.size = [180, 40];
    addb.visible = true;
    var addchange = stackgroup.add('button', undefined, loc(tsp.change));
    addchange.size = [180, 40];
    addchange.visible = false;
    var addc = addde.add('button', undefined, loc(tsp.deleteE));
    addc.size = [180, 40];
    var stackgroupa = addde.add('group');
    stackgroupa.orientation = 'stack';
    var addd = stackgroupa.add('button', undefined, loc(tsp.about));
    addd.size = [180, 40];
    addd.visible = true;
    var cancel = stackgroupa.add('button', undefined, loc(tsp.cancel));
    cancel.size = [180, 40];
    cancel.visible = false;
    var myList = www.add('listbox', undefined, '', {
      numberOfColumns: 5,
      showHeaders: true,
      columnTitles: ['No', 'English', '中文', '日本語', 'Common'],
      columnWidths: [45, 165, 165, 165, 205]
    });
    for (var iii = 0; iii < you.hotWords.length; iii++) {
      var item = myList.add('item', iii + 1);
      for (var jjj = 0; jjj < you.hotWords[iii].length; jjj++) {
        if (you.hotWords[iii][jjj] !== 'None') {
          item.subItems[jjj].text = you.hotWords[iii][jjj];
        } else {
          item.subItems[jjj].text = '';
        }
      }
    }

    adda.onClick = function () {
      you.addNode(edit1.text, edit2.text, edit3.text, edit4.text);
      if (edit1.text !== '' || edit2.text !== '' || edit3.text !== '' || edit4.text !== '') {
        var item = myList.add('item', myList.children.length + 1);
        item.subItems[0].text = edit1.text;
        item.subItems[1].text = edit2.text;
        item.subItems[2].text = edit3.text;
        item.subItems[3].text = edit4.text;
      }
      edit1.text = '';
      edit2.text = '';
      edit3.text = '';
      edit4.text = '';
    };

    addb.onClick = function () {
      if (myList.selection instanceof Object) {
        adda.enabled = addc.enabled = false;
        cancel.visible = true;
        addd.visible = false;
        edit1.text = you.hotWords[myList.selection.index][0] !== 'None' ? you.hotWords[myList.selection.index][0] : '';
        edit2.text = you.hotWords[myList.selection.index][1] !== 'None' ? you.hotWords[myList.selection.index][1] : '';
        edit3.text = you.hotWords[myList.selection.index][2] !== 'None' ? you.hotWords[myList.selection.index][2] : '';
        edit4.text = you.hotWords[myList.selection.index][3] !== 'None' ? you.hotWords[myList.selection.index][3] : '';
        addchange.visible = true;
        addb.visible = false;
        myList.enabled = false;
      }
    };

    cancel.onClick = function () {
      adda.enabled = addc.enabled = true;
      addd.visible = addb.visible = true;
      cancel.visible = addchange.visible = false;
      edit1.text = '';
      edit2.text = '';
      edit3.text = '';
      edit4.text = '';
      myList.enabled = true;
    };

    addchange.onClick = function () {
      you.changeNode(myList.selection.index, edit1.text, edit2.text, edit3.text, edit4.text);
      adda.enabled = addc.enabled = true;
      cancel.visible = false;
      addd.visible = true;
      var creatindex = myList.selection.index;
      myList.remove(myList.items[creatindex]);
      var item = myList.add('item', creatindex + 1, creatindex);
      item.subItems[0].text = edit1.text;
      item.subItems[1].text = edit2.text;
      item.subItems[2].text = edit3.text;
      item.subItems[3].text = edit4.text;
      edit1.text = edit2.text = edit3.text = edit4.text = '';
      addb.visible = true;
      addchange.visible = false;
      myList.enabled = true;
    };

    addc.onClick = function () {
      if (myList.selection instanceof Object) {
        var wwww = new Window('palette', 'Alert', undefined);
        wwww.add('statictext', undefined, loc(tsp.sureDelete));
        var g = wwww.add('group');
        var yes = g.add('button', undefined, loc(tsp.ok), {
          name: 'ok'
        });
        yes.size = [60, 30];
        var no = g.add('button', undefined, loc(tsp.cancel), {
          name: 'cancel'
        });
        no.size = [60, 30];
        wwww.show();
        yes.onClick = function () {
          you.deleteNode(myList.selection.index);
          myList.remove(myList.items[myList.selection.index]);
          wwww.close();
        };
        no.onClick = function () {
          wwww.close();
        };
      }
    };

    addd.onClick = function () {
      var text = loc(tsp.addHelp);
      var winb = new Window('palette', 'About');
      var a = winb.add('edittext');
      a.text = text;
      var groupa = winb.add('group');
      var abtn = groupa.add('button', undefined, loc(tsp.ok));
      var bbtn = groupa.add('button', undefined, loc(tsp.cancel));

      a.onChange = a.onChanging = function () {
        this.text = text;
      };

      abtn.onClick = bbtn.onClick = function () {
        winb.close();
      };
      winb.center();
      winb.show();
    };

    www.center();
    www.show();
  };

  checka.onClick = function () {
    if (checka.value === true) {
      checkb.value = false;
      checkc.value = false;
    }
  };

  checkb.onClick = function () {
    if (checkb.value === true) {
      checka.value = false;
      checkc.value = false;
    }
  };

  checkc.onClick = function () {
    if (checkc.value === true) {
      checkb.value = false;
      checka.value = false;
    }
  };

  if (typeof expProps === 'undefined') {
    if (winW instanceof Window) {
      winW.center();
      winW.show();
      // winW.size=[268,100];
    } else {
      winW.layout.layout(true);
    }
  } else {
    try {
      var wrongcomps = wrongcomps || [];
      var selProps = expProps;
      var i = -1;
      for (var ic = 0; ic < selProps.length; ic++) {
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
      }
      clearOutput();
      if (wrongcomps.length !== 0) {
        if (loc(tsp.trans) === 'Translate') {
          writeLn(wrongcomps.length + ' wrong expressions found,which can not be translated.');
        } else {
          writeLn('存在' + wrongcomps.length + '个不能被正确翻译的表达式');
        }
      } else {
        if (loc(tsp.trans) === 'Translate') {
          writeLn(selProps.length + ' wrong expressions were translated correctly.');
        } else {
          writeLn('存在' + selProps.length + '个已经被正确翻译的表达式');
        }
      }
    } catch (err) {}
  }

  start.onClick = function () {
    var ib;
    var allId = [];
    var compid = [];
    if (list.selection === 1) {
      var thisCompnames = [];
      for (ib = 0; ib < app.project.items.length; ib++) {
        if (app.project.item(ib + 1) === app.project.activeItem && app.project.item(ib + 1) instanceof CompItem) {
          compid.push(ib + 1);
          thisCompnames.push(app.project.item(ib + 1).name);
        }
      }
      var excludeByName = compid;
    }

    if (list.selection === 0) {
      for (ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1);
      }
    }
    if (list.selection === 2) {
      var thisCompname = [];
      var tempId = [];
      for (ib = 0; ib < app.project.items.length; ib++) {
        allId.push(ib + 1);
        for (var haha = 0; haha < app.project.selection.length; haha++) {
          if (app.project.item(ib + 1) === app.project.selection[haha] && app.project.item(ib + 1) instanceof CompItem) {
            tempId.add(ib + 1);
            thisCompname.push(app.project.item(ib + 1).name);
          }
        }
      }
    }
    var expFilters = [];
    var result = searchExpression(excludeByName, expFilters);
    clearOutput();
    if (checkFile.value === true) {
      var outString = '';
      outString += loc(tsp._1);
      outString += '\r----------------------------------------------------------------\r';
      outString += loc(tsp._2);
      var i;
      for (i = 0; i < result[3].length; i++) {
        outString += loc(tsp._3) + result[3][i].toString() + '\r';
        outString += loc(tsp._4) + app.project.item(result[3][i]).name.toString() + '\r';
      }
      outString += loc(tsp._5);
      outString += loc(tsp._6);
      if (result[0].length !== 0) {
        for (i = 0; i < result[0].length; i++) {
          outString += loc(tsp._7) + result[0][i].toString() + '\r';
          outString += loc(tsp._8) + app.project.item(result[0][i]).name.toString() + '\r';
          var thisComp = app.project.item(result[0][i]);
          var layerArray = result[1][i].toString();
          layerArray = layerArray.split(',');
          for (var j = 0; j < layerArray.length; j++) {
            var number = parseInt(layerArray[j].toString());
            var thisLayer = thisComp.layer(number);
            outString += loc(tsp._9) + layerArray[j].toString() + '\r';
            outString += loc(tsp._10) + thisLayer.name.toString() + '\r\r';
            var propertyArray = result[2][j].toString();
            propertyArray = propertyArray.split(',');
            for (var x = 0; x < propertyArray.length; x++) {
              outString += loc(tsp._11) + propertyArray[x].toString() + '\r';
            }
          }
        }
      }
      outFile.writee(outString);
      if (confirm(loc(tsp.openFile))) {
        outFile = outFile.fsName;
        outFile = encodeURI(outFile);
        outFile = String(outFile);
        system.callSystem('explorer  ' + decodeURI(outFile));
      }
      checkFile.value = false;
    } else {
      alert(loc(tsp.complete));
    }
  };
}

/***/ })
/******/ ]);