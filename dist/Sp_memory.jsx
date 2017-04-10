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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  $.layer = function (item, options) {
    return new $.layer.prototype.Init(item, options);
  };

  $.layer.prototype = {
    Init: function Init(item, options, helperObj) {
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
    for (var i in source) {
      target[i] = source[i];
    }return target;
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

    getLayerAttr: function getLayerAttr(index) {
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

    getCompLayerAttr: function getCompLayerAttr(layerInfo, thisLayer) {
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

    getMaterial: function getMaterial(layerInf, layerInfo, helperObj, thisLayer) {
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

    getProperties: function getProperties(ref, layerxml, layerInfo) {
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

    addToLastChild: function addToLastChild(xml, str, propertyDepth, arrLen) {
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

    getProperty: function getProperty(thisProperty) {
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

    getXmlFromLayer: function getXmlFromLayer(index) {
      var thisLayer = this.item;

      var layerInfo = this.getLayerAttr(index);

      var layerPropertiesXml = this.getProperties(thisLayer, new XML('<Properties></Properties>'), layerInfo);

      layerInfo.appendChild(layerPropertiesXml);

      return layerInfo;
    },

    toXML: function toXML(elementName, helperObj) {
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

      var loopFunc = function loopFunc(thisLayer, index) {
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

    newLayer: function newLayer(xml, thisComp) {
      var layer;

      var type = xml['@type'].toString();
      var name = xml['@name'].toString();
      if (type === 'Solid' || type === 'VideoWithSound' || type === 'VideoWithoutSound' || type === 'Comp') {
        var solidcolor = xml.solidColor.toString().split(',').slice(0, 3);
        if (xml.solidColor.toString() !== '') {
          layer = thisComp.layers.addSolid(solidcolor, decodeURIComponent(name), parseInt(xml.width), parseInt(xml.height), 1);
        } else if (type === 'Comp') {
          layer = this.newComp(xml, thisComp);
        } else if (type === 'VideoWithSound' || type === 'VideoWithoutSound') {
          layer = this.newMaterial(xml, thisComp);
        }
      } else if (type === 'Text') {
        layer = xml.textType.toString() === 'point' ? thisComp.layers.addText() : thisComp.layers.addBoxText(xml.boxSize.toString().split(',').slice(0, 2));
      } else if (type === 'Shape') {
        layer = thisComp.layers.addShape();
      } else if (type === 'null') {
        layer = thisComp.layers.addNull();
      } else if (type === 'Light') {
        layer = thisComp.layers.addLight(decodeURIComponent(name), [0, 0]);
        layer.lightType = $.layer.getDistance(layer.lightType, parseInt(xml.light));
      } else if (type === 'Camera') {
        layer = thisComp.layers.addCamera(decodeURIComponent(name), [0, 0]);
      }
      try {
        layer.name = decodeURIComponent(name);

        if (layer.index !== parseInt(xml.index)) {
          layer.moveAfter(thisComp.layer(parseInt(xml.index)));
        }

        layer.label = parseInt(xml.label.toString());

        if (xml.geoType.toString() === 'small' || xml.geoType.toString() === 'large') {
          layer.containingComp.renderer = 'ADBE Picasso';
        }

        if (xml.inPoint.toString() !== 'undefined') {
          layer.inPoint = parseFloat(xml.inPoint);
        }

        if (xml.outPoint.toString() !== 'undefined') {
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

        if (typeof xml.trackMatteType !== 'undefined') {
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

        if (typeof xml.blendingMode.toString() !== 'undefined') {
          layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode));
        }

        if (typeof xml.autoOrient.toString() !== 'undefined') {
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

      try {
        $.layer.prototype.newPropertyGroup(xml.Properties, layer);
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err });
      }


      return layer;
    },

    newComp: function newComp(xml, thisComp) {
      var layer;
      var thisItem;

      if (xml['@type'].toString() === 'Comp') {
        var isComp = false;

        if (xml['@type'].toString() === 'Comp') {
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
          layer.countForImport = xml.descendants('Layer').length() + 1;
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

    newMaterial: function newMaterial(xml, thisComp) {
      var isExist = false;
      var waitIm;
      var thisItem;
      var layer;
      if (xml['@type'].toString() === 'VideoWithSound' || xml['@type'].toString() === 'VideoWithoutSound') {
        for (var isA = 0; isA < app.project.numItems; isA++) {
          var type = _typeof(app.project.item(isA + 1).file);
          if (type !== 'undefiend' && app.project.item(isA + 1).file !== null) {
            if (File(app.project.item(isA + 1).file).toString() === File(xml.file.toString()).toString() || File(app.project.item(isA + 1).file.toString()).toString() === File($.layer.tempFolder.toString() + decodeURIComponent(File(xml.file.toString()).toString())).toString()) {
              isExist = true;
              thisItem = app.project.item(isA + 1);
              break;
            }
          }
        }
      }

      var isVideo = xml['@type'].toString() === 'VideoWithSound' || xml['@type'].toString() === 'VideoWithoutSound';
      if (isVideo && isExist) {
        layer = thisComp.layers.add(thisItem);
        layer.strectch = parseFloat(xml.stretch);

        if (typeof xml.startTime !== 'undefined') {
          layer.startTime = parseFloat(xml.startTime);
        }
      }

      try {
        if (isVideo && !isExist) {
          try {
            try {
              var genFileFolder;
              var genFilePath;
              var file = File(xml.file.toString());
              if (file.exists) {
                waitIm = file;
              } else if (File($.layer.tempFolder.toString() + $.layer.slash + decodeURIComponent(file.toString())).exists) {
                if (decodeURIComponent(file.toString())[0] === '~') {
                  genFilePath = File(genFileFolder.toString() + $.layer.slash + 'D' + decodeURIComponent(file.toString()));
                } else {
                  genFilePath = File(genFileFolder.toString() + decodeURIComponent(file.toString()));
                }
                waitIm = genFilePath;
              } else if (xml.fileBin.toString() !== '') {
                try {
                  if ($.layer.arrayIndexOf($.layer.pictureType, xml.file.toString().split('.').slice(-1)) !== -1) {
                    genFileFolder = Folder($.layer.tempFolder);
                    if (!genFileFolder.exists) {
                      genFileFolder.create();
                    }
                    if (decodeURIComponent(file.toString())[0] === '~') {
                      genFilePath = File(genFileFolder.toString() + $.layer.slash + 'D' + decodeURIComponent(file.toString()));
                    } else {
                      genFilePath = File(genFileFolder.toString() + $.layer.slash + decodeURIComponent(file.toString()));
                    }
                    if (!genFilePath.parent.exists) {
                      genFilePath.parent.create();
                    }

                    var waitToWrite = decodeURIComponent(xml.fileBin.toString());
                    var notExists = !genFilePath.exists;
                    var genFileLengthNotEqual = genFilePath.exists && genFilePath.length !== waitToWrite.length;
                    if (notExists || genFileLengthNotEqual) {
                      if (!genFilePath.parent.exists) {
                        genFilePath.create();
                      }
                      if (!genFilePath.parent.exists) {
                        genFilePath = File($.layer.tempFolder.toString() + $.layer.slash + decodeURIComponent(file.name.toString()));
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
                    if (decodeURIComponent(file.toString())[0] === '~') {
                      genFilePath = File(genFileFolder.toString() + $.layer.slash + 'D' + decodeURIComponent(file.toString()));
                    } else {
                      genFilePath = File(genFileFolder.toString() + +$.layer.slash + decodeURIComponent(file.toString()));
                    }
                    if (!genFilePath.parent.exists) {
                      genFilePath.parent.create();
                    }
                    waitToWrite = decodeURIComponent(xml.fileBin.toString());
                    notExists = !genFilePath.exists;
                    genFileLengthNotEqual = genFilePath.exists && genFilePath.length !== waitToWrite.length;
                    if (notExists || genFileLengthNotEqual) {
                      if (!genFilePath.parent.exists) {
                        genFilePath.create();
                      }
                      if (!genFilePath.parent.exists) {
                        genFilePath = File($.layer.tempFolder + $.layer.slash + decodeURIComponent(file.name.toString()));
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

    newPropertyGroup: function newPropertyGroup(xml, layers, inTime) {
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
        if (currentXML.name().toString() === 'Group') {
          prop = 0;
          try {
            if (layers.canAddProperty(matchName)) {
              try {
                prop = layers.addProperty(matchName);

                if (layers.property(propIndex).matchName === 'ADBE Mask Atom') {
                  layers.property(propIndex).maskMode = $.layer.getDistance(layers.property(propIndex).maskMode, parseInt(currentXML['@maskmode']));
                  layers.property(propIndex).inverted = currentXML['@inverted'].toString() !== 'false';
                  layers.property(propIndex).rotoBezier = currentXML['@rotoBezier'].toString() !== 'false';
                  layers.property(propIndex).color = currentXML['@color'].toString().split(',').slice(0, 3);
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
            var enabled = currentXML['@enabled'].toString();
            if (enabled !== 'None') {
              if (layers.property(propIndex).canSetEnabled === true) {
                if (prop === 0) {
                  if (enabled === 'false') {
                    layers.property(propIndex).enabled = false;
                  }
                } else {
                  if (enabled === 'false') {
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
              var matchNameHere = currentXML['@matchName'].toString();
              if (prop === 0 && matchNameHere !== 'ADBE Mask Parade' && matchNameHere !== 'ADBE Effect Parade' && matchNameHere !== 'ADBE Layer Styles') {
                $.layer.prototype.newPropertyGroup(currentXML, layers.property(propIndex), inTime);
              } else {
                if (matchNameHere !== 'ADBE Mask Parade' && matchNameHere !== 'ADBE Effect Parade' && matchNameHere !== 'ADBE Layer Styles') {
                  $.layer.prototype.newPropertyGroup(currentXML, layers.property(prop.propertyIndex), inTime);
                } else {
                  $.layer.prototype.newPropertyGroup(currentXML, layers.property(matchName), inTime);
                }
              }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        } else if (currentXML.name().toString() === 'prop') {
          try {
            $.layer.prototype.newProperty(currentXML, layers, inTime);
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err });
          }
        }

        if (currentXML.name().toString() === 'prop') {
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
            } catch (err) {};
          }
        }
      }
    },

    newProperty: function newProperty(xml, layers, inTime) {
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
        if (xml['@key'].toString() === '0') {
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

            var thisChild = xml.child(ia + 4);
            var clamp = parseFloat(thisChild.InIn);
            clamp = $.layer.clampInfluence(clamp);
            var easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp);

            var clampb = parseFloat(thisChild.OutIn);
            clampb = $.layer.clampInfluence(clampb);
            var easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb);

            try {
              var inSpatialArr = thisChild.keyInSpatialTangent.toString().split(',');
              var outSpatialArr = thisChild.keyOutSpatialTangent.toString().split(',');
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
                clamp = parseFloat(thisChild.InIn);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp);

                clampb = parseFloat(thisChild.OutIn);
                clampb = $.layer.clampInfluence(clampb);

                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb);
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.TwoD) {
                clamp = parseFloat(thisChild.InIn.toString().split(',')[0]);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[0]), clamp);

                clampb = parseFloat(thisChild.OutIn.toString().split(',')[0]);
                clampb = $.layer.clampInfluence(clampb);
                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[0]), clampb);

                var clamp1 = parseFloat(thisChild.InIn.toString().split(',')[1]);
                clamp1 = $.layer.clampInfluence(clamp1);
                var easeIn1 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[1]), clamp1);

                var clampb1 = parseFloat(thisChild.OutIn.toString().split(',')[1]);
                clampb1 = $.layer.clampInfluence(clampb1);
                var easeOut1 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[1]), clampb1);

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1], [easeOut, easeOut1]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.ThreeD) {
                clamp = parseFloat(thisChild.InIn.toString().split(',')[0]);
                clamp = $.layer.clampInfluence(clamp);
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[0]), clamp);

                clampb = parseFloat(thisChild.OutIn.toString().split(',')[0]);
                clampb = $.layer.clampInfluence(clampb);
                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[0]), clampb);

                clamp1 = parseFloat(thisChild.InIn.toString().split(',')[1]);
                clamp1 = $.layer.clampInfluence(clamp1);
                easeIn1 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[1]), clamp1);

                clampb1 = parseFloat(thisChild.OutIn.toString().split(',')[1]);
                clampb1 = $.layer.clampInfluence(clampb1);
                easeOut1 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[1]), clampb1);

                var clamp2 = parseFloat(thisChild.InIn.toString().split(',')[2]);
                clamp2 = $.layer.clampInfluence(clamp2);
                var easeIn2 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[2]), clamp2);

                var clampb2 = parseFloat(thisChild.OutIn.toString().split(',')[2]);
                clampb2 = $.layer.clampInfluence(clampb2);
                var easeOut2 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[2]), clampb2);

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1, easeIn2], [easeOut, easeOut1, easeOut2]);
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err });
                }
              }
              try {
                var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(thisChild.inInterType));
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(thisChild.outInterType));
                if (!isNaN(inIn) && !isNaN(outIn)) {
                  myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn);
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err });
              }
              try {
                if (thisChild.isRoving.toString() === 'true') {
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
        if (xml['@key'].toString() === '0') {
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
        if (xml['@key'].toString() === '0') {} else {
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
        if (xml['@key'].toString() === '0') {
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
          myShape.closed = xml.closed.toString() === 'true';
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
            myShape.closed = xml.keyValue.child(ic).closed.toString() === 'true';
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
            thisChild = xml.child(ia + 4);
            clamp = parseFloat(thisChild.InIn);
            clamp = $.layer.clampInfluence(clamp);
            easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp);

            clampb = parseFloat(thisChild.OutIn);
            clampb = $.layer.clampInfluence(clampb);
            easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb);

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

    toLayer: function toLayer(thisComp, xml) {
      xml = xml || this.item;
      var isFirstStage;
      var len = xml.descendants('Layer').length();


      if ($.layer.numLayers === 0) {
        isFirstStage = true;
        $.layer.clearHelperArr();
        app.beginSuppressDialogs();
        $.layer.willCreateLayers(len);
      } else {
        isFirstStage = false;
      }

      var layerArr = [];

      $.layer.forEachXML(xml, function (item, index) {
        $.layer.numLayers++;
        try {
          var thisLayer = $.layer.layerArr[$.layer.layerArr.length] = layerArr[layerArr.length] = $.layer.prototype.newLayer(item, thisComp);
          var shouldCall = !(thisLayer.source instanceof CompItem);
          if (shouldCall) {
            $.layer.didCreateLayer(1);
          } else {
            $.layer.didCreateLayer(thisLayer.countForImport || 1);
          }
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
        $.layer.didCreateLayers();
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

    for (i = effectxml.children().length(); i >= 0; i--) {
      var xml = effectxml.child(i);
      if (xml.name().toString() === 'Group') {
        if (xml['@matchName'].toString() === 'ADBE Text Properties') {
          xml.child(0).setLocalName('textignore');
          if (effectxml.children().length() >= 4) {
            $.layer.lookUpInArray(xml.child(3)['@matchName'], idGen) === false && xml.child(3).setLocalName('ignore');
          }
        }
        if ($.layer.lookUpInArray(xml['@matchName'], idGen) === false) {
          xml['@matchName'].toString() !== 'ADBE Text Properties' && xml.setLocalName('ignore');
        }
      } else {
        xml.name().toString() === 'Comptent' && xml.setLocalName('compignore');
      }
    }

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
        });
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
  };
  $.layer.correctProperty = function () {
    $.layer.forEach.call($.layer.layerTypePropertyArr, function (item, index) {
      try {
        item.setValue($.layer.layerTypePropertyValueArr[index]);
      } catch (err) {}
    });
  };

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

  $.layer.setParent = function () {
    $.layer.forEach.call($.layer.layerArr, function (item, index) {
      try {
        if (!isNaN(parseInt($.layer.layerParentNameArr[index]))) {
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
            break;
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
            break;
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
  $.layer.didCreateLayer = function () {};
  $.layer.willCreateLayers = function () {};
  $.layer.didCreateLayers = function () {};

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

  $.layer.prototype.Init.prototype = $.layer.prototype;
  return $.layer;
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


;(function () {

  function colorPicker(inputColour, options) {
    if (!(this instanceof colorPicker)) {
      return new colorPicker(inputColour, options);
    }

    this.options = {
      name: 'Adobe Color Picker ',
      version: 'v2.0',
      shouldUpdateCursor: false,
      backupLocation: [],

      windowType: 'dialog' };

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
      return colorPicker.parseRgb(inputValue);
    } else if (colorPicker.isLargeRgb(inputValue)) {
      return colorPicker.parseLargeRgb(inputValue);
    } else if (colorPicker.isHex(inputValue)) {
      return colorPicker.parseHex(inputValue);
    } else if (colorPicker.isShortHex(inputValue)) {
      return colorPicker.parseShortHex(inputValue);
    } else if (colorPicker.isHsb(inputValue)) {
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
    var pickerRes = 'Group{orientation:\'column\',\n                    gulu:Group{\n                        uni:Group{\n                            spacing:' + spacing + ',\n                          Ed:StaticText{text:"#"},\n                          unicode:EditText{characters:6,justify:"center",text:\'FF0000\'}\n                        },\n                        color:Custom {\n                            type: \'customBoundedValue\',\n                            text:\'Redraw original image\',\n                            size:[80,25]\n                        }\n                    },\n                    colorHolder:Group{orientation:\'row\',\n                        colorCol1:Group{orientation:\'column\',\n                        hGroup:Group{spacing:' + spacing + ',hRad:StaticText{text:"H:"},hValue:EditText{characters:' + character + ',justify:"center",text:\'0\',_index:0}},\n                        rGroup:Group{spacing:' + spacing + ',rRad:StaticText{text:"R:"},rValue:EditText{characters:' + character + ',justify:"center",text:\'0\',_index:0}}\n                    },\n                      colorCol2:Group{orientation:\'column\',\n                        sGroup:Group{spacing:' + spacing + ',sRad:StaticText{text:"S:"},sValue:EditText{characters:' + character + ',justify:"center",text:\'0\',_index:1}},\n                        gGroup:Group{spacing:' + spacing + ',gRad:StaticText{text:"G:"},gValue:EditText{characters:' + character + ',justify:"center",text:\'0\',_index:1}}\n                    },\n                      colorCol3:Group{orientation:\'column\',\n                        lGroup:Group{spacing:' + spacing + ',lRad:StaticText{text:"B:"},lValue:EditText{characters:' + character + ',justify:"center",text:\'0\',_index:2}},\n                        bGroup:Group{spacing:' + spacing + ',bRad:StaticText{text:"B:"},bValue:EditText{characters:' + character + ',justify:"center",text:\'0\',_index:2}}\n                    },\n                  },\n\n                }';
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

    var keyDownHandle1 = function keyDownHandle1(k) {
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
    this.img = '\x89PNG\r\n\x1A\n\0\0\0\rIHDR\0\0\x01\x04\0\0\x01\x04\b\x06\0\0\0\xCE\bJ\n\0\0\0\tpHYs\0\0\0\x01\0\0\0\x01\x018"\xF4@\0\0\0$zTXtCreator\0\0\b\x99sL\xC9OJUpL+I-RpMKKM.)\x06\0Az\x06\xCEjz\x15\xC5\0\0 \0IDATx\x9C\xEC\xBD{\xBCeWU&\xFA\x8D\xB9\xF6>\xE7T*\x02I\x88\x04A\xD4hLT\xBC\b-\bb\x0B\x11[\xEDn\x04\xFBj\xBC\xF8k\x105\xB7\xEDn\x1Ft\xB7^_\r\xAD\x17\xC5\xA6\x01\xDB\x9F\xB7\xB1\x1BE\xBD`@\x1E"\xD7\x80\xA1\x95\x97B\b\x10\f\x1D\b\t\x18\b\x04\b\xAF<I\xAAR\x8Fs\xCE\xDEk\x8E\xFB\xC7\x18\xDF\x18c\xEDS\x95\xA4\x8A$\x95\x84\x9ApR{\xEF\xB5\xD6\\s\xCD5\xC7\x18\xDFxN\xC1\xF1v\xAFn\xAA\xFBw\xA3\xDF\xF8\xB5\x90\x8F}\r\xB6\xAE}\xD8\xE6\x81[\x1E\xD2\xC6\x1B\x1F\xDC\x967\x9E\xA6\xBA\xE7T\xF4}\xA7\xE88\x9C\x8C>\xDEO\xC6[\x06\xE8\x8D\x90\xC5-h\x8B\xBD\x90\xBE\x1F2\x8E\x806\0\x02@\x01\b\xBA\x9C\0\x9D\xED\x86\xB6\x07`9<\x10\x83\xEC\x1E\x81\x8D\xBD\xE3\xAC\x7F\xB1\xC9\xEE\x9B\xBA|\xC5\r\xD2\xBE\xF2Zi\xA7~a~\xE2\xFD>\'\xF7\xFB\xAAk0\xFF\xFAO\x8F\xFA\xD0O\xCD\x86]\xFB\x8F\xF1\x94\x1Co_B\x93c=\x80\xE3\xED\x8E\xB5\xDE?\xF5 \x197\xBFu\\^\xFE\xF0\xBE\xF5\xC1o\x92\xC5\xCDg\xE9\xF2\x8630\xDEx\x9An\xDE \xC3\xE2F\xA8\xDE\x02\xC56\xA0\x8A\xD6gh\xAA\x10\x85\xD19:\xA0\x02h\x07\x7F\x12\0\xD2\xFD\x8B\x8A\xFD\xA2\x80\xEA\b\x85@\xB4\x01\xBDC\xBA\x02*PQ(\x06@;D\xED\xB2\xA5\xAE\x01r?\xC8\xFCd\f\xB3Su\xB9~\xEA\xB5m~\xD2U2\xBF\xFF\x95\x8B\xFB\x9F\xF9\x0F\xEB\x0Fx\xCC\x152?\xE5r\x91\xAF\xB9\xEEX\xCD\xDD\xF1v\xC7\xDBq\x86p\x0Fl\xAA\xB7<P\xF5\xEF\x1F+\x07\xAEy\xF4x\xF0#\xDF\xDE\xFB\x17\x1E%\xDB\x9F9M\x16\x9F\xC4\xB8\xBC\x193l\x03\xB2\x84\x8Cpb\xE7kT@\xC4\x88\xBB7\x88*T\x9DrU\xED\xAC`\0~\x9D\xAA\xFDu\x01\xA4\xF9\xB5\xA3\xFD\x16\x03r\xF4\xD0\xF3^\xDD\xFBU\0\xAD[\xBF\x12\xC7\x05\xA36\x8Ch\xC0\xB0\x1B\xBA\xFB\xEB\xD0\xD6\xBE\xE1\xDA\xE5\xC6)\x97\xCEv\x9D\xFE\xFE\xF9i\xDFr\t6\xBE\xFDb\x91\xAF\xBC\xF1\xAE\x9E\xCB\xE3\xED\xC8\xDAq\x86p\x0Fh\xAAW?\f\xCB\x1B\x9F\xB8\xDC|\xF3\x13d\xF3\x0B\xDF\xD5\xC7\x8F\x9E\xA1\x8B\xABd\xB6}=\x1A\x96\0:\xD0;T\x05]\x14\xA2\x02\x81K\xFF.\xDE\x87N\xFA\x94n\x8C\xA1\xBB4\x07\x0Fk\xB3\xEFPC\tD\x07\n\'x\x04\x03a\xBF\x93\xEB\x01h\xCF\xAF\x810\xBA3\rm\xCE|$\x18\x8F\xF5!q\xED8;\t\xF8\x8A\xB3\xB4\xAF\x9Fq\x15v=\xF8\xA2\xF9\x83\xFF\xF1;\xE5\xFEg\xBDC\xDA\xE9\xD7\xDCi\x93z\xBC\x1DU;\xCE\x10\x8EAS\xDD{\xA2\xF6\x0F=i{\xEB\xB2\xEF\x9Fm_\xFA\xBD\xD8\xFE\xF8\x19}\xFB\x83\x10=\0\xC1\x12\xAD\xCF\xA1:\xA2\x05\xB1\x1ACX\x11\xD2.\x99\x1D\x11\xA8B\xA5R- *\xE8\xDD~\x13%\x1Ahf-P\xA3V\xFB]\x92\th^\x0F\x15\xA8vg"\xC9\x15\xB4\xE7m\xD0\xADoU\xC4qh2\xA4`4\x93\x8B\0\x8C\xE2\xC0\xC4m\x16\xBB\xBF\t\xFD\x01_\x7F\x95\xEC\xFE\xA6\xB7\xAD?\xF8\xF1o\xD6]\x8Fz{\x9B\x9D\xBC\xEFN\x99\xF0\xE3\xED\x0E\xB7\xE3\f\xE1nj\xDA?\xFD\xD0qq\xD9Se\xEB\xA2\xA7\xE8\xF8\x91\'\x8C[\x97\xAF\x8B~\x1Es\xC2\xF3\x15\t\x8F.P\'(C\x02\xC6\x10H\xD7\0\xD0\xD4\xE8L\x0Eq\xB9\xDD\xB4\x15\xE9,\xE8\xDD\x98\xCC\xE4\xFC\xEE\x8B@\x04\xE8\x85!t^\xDF\xED\x18\0\xED\x8A\xD6\xA7\xF72\x1E\xD4\xFC\x11\x12\x8D\x88#\x97\xE8\xB32\x1Ax\x1F\xCA\x05(\x86:D\xA0P\x8Cr\x1A\xDA\xC9\x8F\xD8\xD2\xDD\xDF\xF8N|\xE5\xB7\xBDq\xFE\xA0\xEF~\x83\xB4o\xF8\xEC\x91\xCF\xFA\xF1v\xA4\xED8C\xB8\x0B\x9B\xEA\xE7\x1F\xA6\xE3\xC5\xE7\xF4}\x17\x9E#\xFD\x83\x8F\xD1\xED\xF7\x8B\xE8\x01\x93\xEC\nhs8n\'\x17\xE3\x1E\x92\x88*J \xBD\xFA\xBFBf\xA1I`\xD3\x01\x14\x86\x82f\xEACg\x07\x85`A\x04\x81r\x03\xDA"4\f\x90\xDAs\xBC\x13\x06\xB4\x8A0t\xB5?8\x83\tS\xA6\xDB6\xAA:"9|\x15H\x17ho\x18e\x06}\xC0\xB7h\x7F\xC0#\xFE~v\xD2\xE3^\'\x0Fy\xFC\xEB\x86\xF97\x1DW-\xEE\xA2v\x9C!\xDC\xC9M\xF5\xB3\'a\xFC\xF0\x8F\xEA\xE6\xDB\x9F\xDE\x17\x97<\x1E[\x97\x89\xC8^4\b:\x16\xC1\fr\xF5K\xBD\x18\xE8-\xA9-\x88L\xF28\x7Fr\x04\xDE\x82Z\x91\xA8\x02T\x07\xF8\xD1\x11\x82\xA3\x05\xA2\x06\x81\xA2Ol\x11\xE2\xE8\x81\xD7\xB6D/ac\xD0\xB0E\x06_\xF1c\xD5\xD6`*\x03\x9F\xCB\xFB\xD7\x0E\xA09\xCFQc\x01\x9C\x0F\x01\xB4O\xE7B|.\x94\fMf\x18\xBF\xE2\xE1:\x9C\xF4\xA8w\xE3k\xBE\xF7\x95\xC3\xC9\x8F\xFAs\x19\xCE\xB8\xF9(_\xD5\xF1v\x88v\x9C!\xDC\tm\xB9\xD8\xD7\x06\\\xF6\xA4\xAE\x17\x9E\xDB\xB7/~j\xDBz\xD7\x86\xF4\xBD\x10\x1D\xFD\x8CJP(\x04\xCC/~\x96\x16\xA3\\X\xFC\x10\xC4j\x12Z\x0F\xCF\x10T\x12\xE6\x17\xB8@\xC2\xA2\xB4\xAF\xE8\xA2\xA3\x10\xB28C\x18\x15\x82\x06\xA0%3Pu\x95@\xCAE\xC0\xA8H5$\xDC\x96\x8A6J\x1D\x82\xDD{\x82*\xA8\na\xC2\x10\xBAx\x7F\xBD2GI\xA68\x8EP\x05\xC6a7\x96\x0F|\xDC&N\xF9\x8E7\xAC\x7F\xED\xD9\x7F"\xBB\x1F\xFFv\x19v\xAD\x18*\x8E\xB7#m\xC7\x19\xC2\x97\xD0T\xAF:\xB5/\xDE\xFFS\xBAx\xC7O\xCB\xE2\x1D\xA7k\xFF\x14\x9A*\x80\xD1\x8CpA\x01+\f\x01HB\xA8\f\xA1\xFC^\xED\x83\x8C\x0F q\xAA\xEB\xE5\xEA\xE7E\x0Fa\xC9\x9F\xEA\x0ER\x8D{\xD0T/(\xDE\xDD0!$\xBC\x9E\xD0~\xCA\x10\xEC\xB3t\x89\x01\xF6^\xEF\xEF\x06F\x1F\x1F\x8D\x8D\x02^o\xF7\x94 \xF2|&\x1Bw\xCE\x07c\x1Fv\xB8H\xF9\xEC\xBD\xC5\xB9\xDBk\x0F\x81<\xF8\xB1W\xB7\x07=\xF6\xA5\xB3\xD3\x7F\xF8\xFF\x15\xF9\x9A\x1Bn\xE7\xD5\x1Do\x87i\xC7\x19\xC2Q\xB4\xBE\xFC\xC0#\xD1/|\x96.\xDE\xF64]\xBC{\xA3\xF5\xBD\x10\x8CyB\xD1\xA5\xA7\x17\x02\x80\x13\x1C!\xF5\xEA\x1B\xA8\xC4\x1A\xFC\xA4X\x12\x01wA\xDA\xEF\xAA\x8A\xA6\xD4\xCB{\xDC~\x95\xA1H\x10\xBA\x8D\x83h$"\x18h_\xD06}\x86\x18SJx\x19WPM\x19\xBBT\xA3\xA3\x1B5\x9B\xE6\xB9\x81VB\r\xEAq\xADj2\xAFP[\xF8\xFC\0z\xD7psNb*`\xF6\x86e\xDB\x80\x9E\xF4\xE8M<\xF81\xAFY\xFB\xFA\x7F\xF1\xDF\xE4+\x1E\xF7\x01\x1CoG\xD4\x8E3\x84;\xD8T\xAF\x17\xE8U?0.\xDE\xF8K\xB2x\xD7\xD9\xB2|?\x04K\xA4B\x8D)\xD1R\x02\xF6\x02\x0B\xC8\x10&F8\xCD\xF3\xE3^\xE9\x19\x98\xA0\n\x12\xD2\nC\0\xDC\x95\x88\x1E\x9E\x87\x1D\xCC\b\b\xE9\xCE\xA0"\xC2|\t\xC9\xEF\xE3\x90\x12\xB0\x14\x92\xDC\xA5}Hz\x9D0\x1D%R\xE0e\n\xA0\xB7\x15\xC2V\x8F~\x9C"\x04u\xDD\xC5\xAE\x97\0TfG\xF0>\x91\xF7\x97\x8E\xF0\xAELl1*\xE8\x1E\x86\xBD}\xE27b8\xED\xBB\xFF\xAE\x9D\xFE/^4<\xF0\xB1\x7F#\xED~\x87\x9A\x91\xE3m\xA5\x1Dg\b\xB7\xD3Tu\xD0\xE5[\x7Fd\xEC\x17\xFC\x9A.\xFE\xFA\x11\xD2?\x85\x06E\xEB\x87\x80\0U\xAA\x020\x82.Q<\x13\x98\x8E\t\xEC\x8F\xF3\xE1\f\xA1\xC2w\x91 \x10\xB3\xC0\x17\x86\xD0\x8D!Xs\x86\xB0\xAA\x9E\x94\xE1I7\xD7^\xC4\x0F\x88\x13\x1D\x10\xFF\xD2\xE2OF\x116\fu\x1BF\xC0w\xF7Hja\b(\fI\x0BC\x0B&\x92\f&\x18\x82O\x90I})\xFCU\x8B\'%\xBD/\xDA\x01\x14\xB4\x90\x0F\xE8j\x84\x02\x18\xE7PUl\x9Ep\n\xF0\xE0\xEF\xB9l\xFEuO~\xFE\xEC\xC1\xFF\xE4/d8\xA5@\xB9\xE3m\xB5\x1Dg\b\x87i\xAA\xD7\x0F\xD0\x0F?M\x17\xAF\x7FN_\xBE\xF1\xAC\xA1_\x0B\xC8\xB6/H\x87\xE0h\0z\x12+\xCA\x84V=~\x07\xE4OF\xD0\x1D\xFE\x8AN\xAE\x9E\xC2k0\x8F\xC0m\x06\xBD\x10g\x91\xDE\xADx!v\xA8,D\x1C\x107\xD8\xF9u\x18w\xBA\x12\x15\x19i\xB8\xD4\xB8n\xE2\xFA\xF4F\xF5\x81\xAAC\xC48L\x90\x8D\xDB\x1DbNJ|D\x18:]\xB5\xD0\x16@H\xDCf\x10h\x896\x14\xF5\xF9%##\xE3\x99\xDC3U.\xED\xC0b~\n\xF0\x90\xB3\xAF\x1C\xBE\xFE\x9F?o\xF8\xEA\x1F|\x8D\xC8\xC9\xC7\x19\xC3!\xDAq\x86\xB0\xD2TU\xFA\xF8\x8E\x1F\xD6\xF1\x82\xE7\x02\xAF\xFDf\x19o@\xEB\xDB)\xC6}\xD1\x86qK\xA6D\xDC\x82Z\x14\x13\xA3Xa\b\n\x14(\\\xAC\xED\xAB\xAF\xA3\xB8(\xABI\x81\xC4%+\f \rx\xE5F;`u\xD1\xF3\xCB\xB8\xC4\xEFA\xDBF\xC0w\x12\xF1\x04\xD9PUQg\b9\x8E\n\xE3\x95\xFF\xE9S7\xA4B\x92\xD0\xE3\xF9z\xAA,Z\x80E\xD7\xF0b\xD49RG(D:\x93\xA0\xAA\x1A}\xC9\x81i\x03\xC6\x8E\xED\xF9\x03\xD0\x1F\xF6O?2\xFF\xFA\x1F\xFC\x8D~\xEA\xF7\xBD~m\xD7)\xC7U\x89\xD2\x8E3\x84\xD2\xC6\xF1\xD2\xB3u|\xD5\x0B\xB4\xBF\xE1\xD1\rW\xFB\xE2\x1E\'\xBA\xB2-22\x04\x87\xCFe\x91N\x18\x02m\0\xAB\fA\x9C!t\xB1K\x8B\xB4\x9B\xBC\x12^W \xB3\xB2\x83\xC2\x10\xE0\xA7u]\xF5: u\xED\xC9\x83\x8A\x8F\xDD\xCE\xA9\xC6;\t\xD5\0\x888\x84\xA2\xE2\x98+\x12\x80v\'J\x89\x90\xA2\xC9\xBD\x9COtOz\x92\x12c@\x04!\xD5\xCB\x81>\x91\xF0]\xBD\xD7C1\x04\xD1D!=\x19\xE4\x04\xBA\xF4\xB6\xC2\x10`>RiP\fX\xCENA\xFF\xEA\xEF\xBF\x04\xDFr\xCE\xAFl<\xE8\xC9\x7F\x87\xE3\r\xC0q\x86\0\0\xE8\xFA\xE13\xFB\xF8W\xBF\x83\xEDW=\xB9\rW\x01\xD8\x86\xD0\xFAM\x1D\xBEH\xD2$\x14\x93`\xD5\x18\x16m\x95\bU\xA0\xBDO\x88\x15\xB1\xC8W~\xB3;\xD9OaX+\x04\x15\x92\xBE\x01\xBA\xF4\xF3\x8C \xD3\xA2O\x82\xF3{\xD7\x1B\x15\xEB?\x01\x800\nq\x15U\xD0\xC0X=\x10\xB4a\xDC\xCE\xB3P\xB5\x89\x9F\x14h+\xAAC\x18]\xFBT\xAD\xD22\x9F\x93x\x05m\xC6a\xC2\xFD\x88dj<\xDE\x89X\x8C\xD9H\xA7\xE7\x04\xC1\xC8\xCC%\xDA\xB0\xBD\xFBk\xA0_}\xF6\x05\x1B\x0F\xFF\xF1\xFFKN~\xC2G\xF1e\xDE\xBE\xAC\x19\x82\xEA\xA7\xEE?\x8Eo\xFB\r\xED\xAF\xFD\xB9\x86w\xCE\x1B:\x80\x11\x1A\xBEr$\xE1\xC3\x8Cq\x93\xEC@\x97\xE0i\xF4\x92\xC95\xAB\fbjq/\xFFR\bWi]\xFB\xAA\xF7\x8C\xB1\x8B\xDF\x97H\x05\xA0:0\x85\xCE\xDEw\xB9\x98\f\xA5Q(ke\b+\xCF0\x89E :\xC8\x98\x04E\xBA\nWU\x98I\xCE\x84\x16\x86\x80\xD2\x1F\x19\x02\x9F\xBF\xCC\x17m#S\x82\'\xF4\xD0\xB8\x06\xF5\x9C\xBE\xC2\x10 \xAE\xD6\xD0k\xD3\x11\x01Vj\x91\x9D#\x80\xF1\xE4oY\xC8\xD7\xFD\xE0\xEF\xAF}\xEB\x8F?W\xD6\xCF\xDC\x83/\xD3\xF6e\xC9\x10\xC6qK\x9A\xBE\xED\x19\x1D\x7F\xFE\xC2\xAEox\xD0L\xF6B\xA5\xE7"\xEE2\xCD1\0\xA0\xAD\xA1\xFB\xE2m!\x11\x9DI8\x94\x15\x14\t*\x98\x12\xBF\x1B\0W\xE1;\xD5\x07\x1DI\\\xF6\xBB\x14D\x90\x12\xD8\x16\xB8\rK]\xEFoa|c\xEB\x0E\xC7\x05\x88 \xA1\t3q\x84\xDE\xBA\xA07u\xC8\r\x84[\x10\x80\xD6\xEC\xC4\x9A\x13\xA1\x80\xA2\x01}\xCCHG\x97\xEE4\xA70@s5\x89\x8A\f!\xDC\x8C\x95!`\xFA\xFC6^\x81\x8EN\xD4\x95\xA1\x16\xDBF\f\x93Lal\x89J\x98\xA7\xC1\xCC\xCB`\bD\b\xD3\xF7\xB1\xA5s\xE8iO\xBC\xAE\x9Du\xCE/\xEB\xD7\xFE\xD0+66N]y[\xF7\xFD\xF6e\xC7\x10\xB4_qV\xD7\xBFx\t\xFA+\x9E\x88\xE1\x93\x96[P\xCD\xEC\xAB\b .\xAC\x04M\xA3\x95QVD\xF0\xD5\xA0\x1E\x94\xEB\x15\x0E\xBD\xD9w1pS\x1D \x95\xC6}\x0FaK\x88\xCF2\xFDL\x94P\xA5\xAA\x9FP\xDDv\t\xDF\x93@\xA4{\x05%WM\xEATD\xCA4\xC7\xC2\x80*\xB1\xAAI\xF0k\xD9\xA8\xDA\xD4\xFBs\xCE\x98CAU"]\xB45_B\xA6\xCF\n\x89\xE8E\x16{YuA\xC2]\x90;T\x96.1\x96L\xE8B0>\xDE&\f\x9B\x81Z\x06\x8C\xEDT,N\xFF\xA7\xEFX\xFF\xDF\x9E\xFEo\x87\x07=\xE9J|\x19\xB5/\x1B\x86\xA0\xBAw\xDE\xFB\x1B~u\xC4\x9F>[\xE5]\xEB\x03\xB6\xC3\x1C\xB8#\xE30\x8C\x81\xE9\xDF?$CpW\x9C\xC6"n\t\xE3\x81)C\xA1\x1B/\xEE\xB3B\xE0\xBCn\xC2\x88n\xDB\xC08\xD5\xF7ih3\xC2\xAB\b\xA5\x05\xA1\xEEd\b\xE1Jt\xA9)u\f\xD5]*\0F\xDE{\x88\xEB\x8C!\xFA)\xE5>\xBC\xFF\xE1\x19B\xCE\x19B\x05Xa\b\x13\xE6\x027\xA4\x96\xE7\x87\x8F\xA9\x97w\x13\x88$\x19B\xA83\xEC\xBB\x0B\xBA[U\x9A\xA3\x8DV\xE7s\\G\xEFKl\x9D\xF2\xAD[\xC3YO\xFB\xED\xB53\xFF\xE5\x7F\x91\x13\xBFz\x81/\x83\xF6e\xC1\x10T/}\xE4v\x7F\xF9\xCB\xC6\xFE\xDAG\xCCf7`\0Cy:F\xE4\x82\x05\x17q\r\xACA\xEA\xC6\x94\x96\xD5\x16\xC0\f=\xE1a^3\x89C\xC0\xE4z\x88CeU\xFBL\xC8\xDF\xF34\xA9\xD7y\xF4\xA0z\x90S\xB5\xD8\x1Bn\x97B\xD4\x85\xDFh\x9E2\xD1\xC5\xEB\xDC\x90\x89\x157\xE0\xA4\xC2\x11k\x1C\x84-A\x10\xB6\x04\x9B\x80D\'%8\xA9\xD7{\xD5\xFB\x1F\xC2\xE3\xC0\xFB\'\x93J\x86Y\xF3\x1Bb\xDE\xBB\xE4\xC2-\f!\xCE\x1B=\x9C\xDB\x9F\xC5\x90P\xCE\x87M\xA33\xA7C1\x84\xCE\xC7j\xE8\xB2\x0B\x8B\xD3\xFF\xD9e\xB3o>\xE7\'\xD7\xBE\xEEG\xEF\xF3\xA1\xD0\xF7i\x860\xEA\xFE\xD9\xF6\xF2u\xFFq\xD9^\xF6\x1C\x95w\xCF\x9B\x8C\x98\x01\x98\xC1\x18\x82\xD0\xD4\xA6\f4*R\xA4"\x05\xB6j4\xF3\x96\xC4\xE6zt@\xD0\xDB20\xD6E_\xEE;1\b\xA2\xF4#y\x80\x16\x7F\xF6\x13\xFD!\xFA\\5\xE4\xED0\x84N\f\n-$(\x0F\xD1\xF7_\x87/\x15\x95T\xAF\x87GlV\x064E.+\xDF\xCB_\xCD\xAF\xA8\xE3\\5\xBE\xF2\x1D\xC5\xFD\x82\xD9H\x06$\xD1\xC8\x19\x8Cg\x85!\xF8\x9C\xD7w\x156\x99nk\x01\xCEl8\x07\xE8\xE6\xA1\xE8\xDA\xB0}\xCA7.\xE4\xE1?\xFA\xBC\xF5\x87\xFF\xEB\xFF,\xEB\xA7-q\x1Fm\xF7Y\x860\x8E\x97\x9F\xB1\x1F\x7F\xF6\x8A\x03\xF2\xF2\xEFX\xC3u\x18\f\0`\x06\xC5\f\x02\xF3F{\x8B\x90W\xEA\xF0\x85\x88\x8B\xD4?\x1CC\0\x1C)L\x16\xF2a\xEC\t\xF0\xFE\x0E\x15\xFA\x1C\xF6\x04\x9D\xDE\xB72\x04 u\xE6\x18W\xC6\x06L\x18\x02\x92\xD0\x12\xA6\xAF\xBA \x93Xz\x19+m\x0F;\x19\x82\x06\xD1\xC4X\x90C\x16\x7F\x8EP\x11\xD8\xDF\xE1\\\x90\x85\x90s.W\x90\x8C\x02\x1Ah\ra\xEF\b5\x8C\f\xA1\x04rU\xA6\x15\xB6\x02\xC0S\xC8\x0BCX\xAD\xF9@d\xD1\x01\x19\xED\xB7\x8E\x01\xAA\x02\xC5.\x8Cg<\xE5}k\xFF\xE8\'\x9F\xD1\xBE\xEA{\xAF\xC2}\xB0\xDD\'\x19\xC2\xA6\xFE\xE5O\xEC\xD5\x97\xBEx\x81\xB7\x9F8\x93%\x06tg\x02\x86\fLeP\xCC\x14hu\x06V\nt\xC4B\xED\xAB\xD3\xB4s\x11\xD7H\xBE\x94v\xA5\xD8I\xB94\xFA\xC7\x8A\x95\xBD\x10!\xEF\xA8\xBD\x10c\x9C\xA7IP\x93\x03\x94\x8A\x19\xE4\x93:|J\xCFU>\x04PZ\xD3X\xDA\x83\xB8\xE9\xCB\xAF\xEAG\xCC\xD5\xA4\b\x8AzAW/\xD3\xEE\x07\xE8\x05\x88\xBA\x8B\n0\x97\x82\x1E\x87\f=&GX\xB5%\xDC\x06C\0\x92A\xB2\n\xF5\xEAs\x86\x97\xE1(\x18\xC2d^\x15\xAA\r\x9B\x0F|\xCC\xBE\xD9\xB7\xFD\x1F?\xBF\xFEm\xFF\xE1\xE5;g\xF2\xDE\xDD\xEES\f\xA1\xEBU\'\xDE\xDA\xDF\xF4\x92\xBD\xF2\xE2\xA7\x8F\xF8\x14\x06\xE9\x98A1\xA8\xAB\t\x02\fh\xCE\x10z0\x84\xA9\xDE[\xF4SMC\x1DP\xA5\x96\x11\x89\xADWM\xF8\xAA\xE5\x1A\x05\xCC\xC8\xA8+\xE8 \xFB\x06\x122\xF3\x10m\x18S\x86\xE0\xFD\xC7y\x8A\xACPT\x99\x18\x8D\xA1=nQ\x19B\xDC\xB6\x8E\xB7\\+\x8E4*\xCC\xD6J,X\xC9\xC2\f\x02"#\xEC\xF1]\xDC\xA8\xA2\x85\xC8\x15E\xA5\xF2\xF1\xF3\x99\'\x92\x1E8D\xA0\x12\xC7\x88T)\xF8\x1C4*\xD6|\x06\x8Em\xC5-\x19\f\x96\xCF\xB5\xC2\xD4\xAA\xCA\x10\xC9^nS`\x9F\x1D\r\xE3\xDA)\xC07=\xE3\x95k\xDF\xF5o\xFE\xAD\x9Cp\xC6}\xA6\x18\xEC}\x86!l\xE9\xDF?\xFC\x96\xF1O_w\x13^q\xD6l\xB8\x15\r\xC0\\\xA9"\0\x03\x04\x83\x003/f&P\xAC)m\t\xB0\x1A\xA3\0@\xE9L?\xFE\x8A\xE4\x98X\xB2U\xD0\xD1\xC3S\xD1\'\x0B\x96\xBA?\xAF)\xD4W\xBFW\x1BE=\xCE\\\x87\x90\xCC+\xAFj\x87\xDA\xC01\xEA\x8E{\xA9\x1B\x02E\x07\xC0]y\x82\x16L\xCDG\t\xBA?\xED7~\xF6\x10\xE9\xF8k;\xEF\xEB\f*m\x18|\xB6\x9E\x8C\b\xF4\x04\xD896\xC7\x9A\xCF\x11:|_\xE9\xBF0\x85\xA2\x8AL\x18\x02\x99X\xECSAC\xE5j\x90\x92\xA3\xBD.9\xCE\x82\xB22\xE9+\xE7\xD3\x18\x83\x04C\xA0\xF1R\xD1\xA0}\x8E\xED\xAF\xFB\x9E+7\xBE\xFD\'\xCE\x19N?\xE7\x8AC\xBC\xC9{]\xBBO0\x84}\xFD\x8D?v}\x7F\xC9\x1F\xED\x93\xB7\xEC\x9EA14\xB3\x0F\xCC\xD4U\x03\x18Ch\x02\xCC\x91L`\xEEv\x84\xAC\xBDS\xBC\x055\x18\xC6\x8F)-\xE4Q/\0\x18\xA1\x93\x12b;\xA5j\xEA\xE8\xD1\xAAd\x0E=\x98\x18\x7F\xA5@I\xFC[\xCE\x9F\x1Co\xD9\x15\x17q,\xFE9h\xB57\x1B\xC7\0\xE8,\x9F\xCF\xAF\x11\xDE7\xAE_a@\x94\xAE!\xA5\xD5C&\x82\xDA\xD3\xD7\x0Fx0T\xCEA\x10?\f1\xD8\x9C*DGG\x15=\xBD*\x9C\x06g&\xAB\xF3\x9F^\x88\xA9\xB1\x94j\x14\x19\x85\xA1\x85\x12\xA4\xC4k<\x98,\x10\xC5\xB8\xCA\x10\xAA\r\xA7\x99g\xA7\xA3xr\xCA\xBCu@\xBB`\xFB\x94o\xDD\x8FG\x9F\xFB\xAF6\x1E\xF5\xF3\xAF\xC6\xBD\xBC\xDD\xAB\x19\xC2Ro\x1En\xEE\xAFz\xE1u\xFD\x0F~a{v\x15\x1A\xB6ME\x80\x18C\x80\xBA\xCD@\\= s\xB0s\x1A\x14s\xFF\x97d\x15\f\xA1 \x04JPJ\x0B4\x87\xFA\xAAQ^\xB02\x04(-\xF6\\\xB8\xAB\xF0\xBC|\x16\xB8>~\x1B\f\x81\xD7P"\xFAw\x052N\x1F\xCD\t\xBE\x19\xE1\x88B\xFAZH}\xAA0\xCCc\xA8\x03\x91p%\x96sw\x8CYr\fa|M\xE1n\x04R~<\xDC\xF8u4"#aw\xAF\xD5\b\xB7\xF4w\x86\x8F\x8F\xA0\xCA!\xD0\xA9[\xD7\xFB]\rR\xEA\xBD\x04b9\x11O\x1E\xD5\x89\xB8\xFB\xFC\xEEd\b\x98x,\xA6\bA\xC1P\xE7\f\xF62T\xA2\x10,\xD7O\x83~\xFB\xD3\x7Fw\xED\x1F?\xEB\x97ex\xE8\xBD6\xB5\xFA^\xCB\x10\x0E\xEA\'O\xBA\xBE\xBF\xEC5\xD7\xEB\x7F\xFF\xBE\xDE\xF6\xB8}\xA0\xFB\x9F`\x0E\xC1\xCC%\xD1\0\xC1\f\x82A\xD4\x98\x84\xC2\xD5\x07\t\x840\x14\xA6p(\xE2c\xE8\xAD\xD9\x05\xAA\x95\xDE\xFF\r]\xB9\xF8\xE8A\x1D\xFA0(A\xF3\x16v\x8F\x95\xE3E\x8FN\xD4\xC2\xE2\xA7\xFC\xD7\xEEi\xF9\tm\x82\0Z$#\xB5\xF2<\xAD\xD4\\\xA4-\xC0\xF5\xFE\x18\xBF\x96gpc\x9C3\x8B\x88\xAF\xA0z\0E\xA6\x83\xAF$H\xA1F\x17\xF22\x8D\xE8H\x06\x1A1\x95\x1APHw\x8F^\x1F\xBD\xEF\x0EQ\xCB?P\xEF\xAFi\x86N\xC7s\x89\x98\xCA0\xF6\t\xD2\xC8\xB9l\x8E \xEC\xDA(#\x07\x84=\xC3\xC2\xB0Q\x10\x06\x19\xBFLl!\x93\xEC\xCA\xD2\xC7\x12\xBB\xB1x\xF8\x8F\xBCe\xE3;\xFF\xDD\xD3\xDAW>\xEA^Y\r\xFA^\xC9\x106\xF5\xB2o\xF8\xF4\xF8\xE2\x0B>\x83W\x9E9o\xDB\x98\xA1\x192\x10\r\x860\x80\xEA\x81\x19\x15\x07\x11\fP\xFB\xCD\x19\x82\x9D\xA7\xE9\x81P\x844\x9A2\x84b`(\x8B\xDB\x8E\x15\t\xC8s\xAB\xF4\x9C\x14,\x05d\x95)H\xE9s\xD5\x9E@F\xE4\xA3\xB2HB\xC38F\xB8\xCD\x89}\xF0\xFE\xE9G\xA1E\xDF\x18\xC2\x84p*\x13@\xF3b\xA5q\xA3x\xD6\x88\xCB\0b\xEC\xD3}"\x8DP\xBA\xDF\xC7\xA4\xB2)\xF1B\xD8@&\xB7\x03)\x88\xA3\x8C\xD1\xC7\x99\xD7di4\xBAPml\xA2#\x14\x0B\xA8v\xB4b\xA7\x90\x92\xDF\x81\x11\x11\xBCU\xFFjH\xB5\xA83\x8E\x89\xAD\xE30\fa\x15!\xF8\xFB\xAD\f!\x12\xDE:\xA0\xE3\x80\x0E\xC1\xF2\xF4\x1F\xF8\xE8\xFAc\xFF\xCF\'\xCB\x19?\xF4q\xDC\xCB\xDA\xBD\x8E!\xEC\xD1\x8B\xBE\xEB\xEA\xE5\xEF\x9E\x7F\xED\xF0\xA6S\x06,\xB0\xAE\xDD<\x07\x8D\xAA\x80\xD9\x05\xA6\x7Fb\xAA\x82*f\x82\xC2 \xD2\x0598S\x18T\xD1\\0\x87\x1E\x1D\x95\x8B\xFCo\xE2\xEE#\xE5\xAFD0N\xA2\xFE\xEC8\xED\x12\x13\xA4P\x98L\xE8\xC0q\xC8\x89^\x07\'\xFA6\xFDW\xC5\xC7F\x86\x01\x7F\x9A\xFCl\xE3ru\xA0,^2\x90\x90\xD4\0\x18\x85\x18F\xD1\t!3\xBEA1\x89\xE0,\xEED\xD0\0\t>\xB7&\xDA\x98\x140\xD1\xF2\x07\xD4B\xAB\x93\xDF\xB4g\xBC\x86.m\xEA\xB5\xA31\\\xDA\xD1\x03\x9Ci\xA0\xAB\xAB#\xF9\xFEt\xA4\x1A\xC1\xF7\xE3hf\x05!\xA4\n\x86\x9D\f\x81\b\xC1\x99\xD9\xE1\x18\x02T\xD0G`\xD4\x86\xE5\x83\x1FyS{\xDCO\xFE\xD0\xC6#~\xF6\xA2\x9D\xAB\xF8\x9E\xDB\xEEU\f\xE1\xDA\xF1/\xCE\xB9\xBA\xBF\xF8\xBC\x1B\x87wm4\x98+q\r\xDD\x88\xBC\xD8\x04\x8C\xD0i/\0\x06m\x18\xC4T\x05C\x12<\xD7Hf\xA6\x82A\x1A\x1Az\xD8\x1381]=\xDE\x9DR\r\xC8p\xE5\x15\xA4P\xE9<\xF7L\\\x85\x96\x94\xC8\xBC.\xAEp}\xBA!\xCA\xB3\x05\xF1\xCF\xCBg\xAA\n\x82\xD4\x9F\xAB\xE5\xBF\xD4\x15\fd\xD0\x10~\xFC\x12\xA0d\xD7\xA69\xB5\xC6\x1Cd\xE0\x0F\t\x99\xCFa\f\x83?5\'\x8A\x89\xA4\xAFAW\x135bu.4%\xB5\xC7.h\t\x0E\xCB\xA4$\'>\x1D\xC1\xBD.\xB42\x03\xED\xE8:\xA2\xC5\x1E\x98Z\x90\t\xE7\x96]\xB14\x9D\xA1\x1B\xE9c\x18\x18\xA5\xBA\x81i\x83`\xDC\x02]\x8F\x9C\xC3\x8A|z\xF6\xCFu\xA0\xE3\x80\xC5Ign\xEAw\xFE\xC4\x8F\xEFz\xDC/\xBF\x0E\xF7\x92v\xAFa\b\xD7\x8D\xE7\xFD\xFCe\xFA_\x7Fo\xDFpEk\x1Ehd\x84\xDF=\x1C9\x89<U\x01`-\xBE\x1B\x01O\x8C\x8D\xC2\xEFfc\x90@\x17I\xB0\x944\xA1F(\x8B\x8C\xDA\xF7i\x9A4\xF5\xED\x95\xBA\t<\xEE\x04\x95\xE7\xB3Q\xA5\x10\xA0\xCF\0]+\xA8\x80\xCC\x01 #\x982\x8DrmA\x05S\xD8,\xB9\x98\xD1V\x02\xB0\xCA\xFD\xB9\x93tx\tVT\x0E\x8F3PZ\xF8V\x9E\x9Fi\xD7\x13\x04\xE0\xC7\xCC`\xA8\xD1\x7F\x86\n;S\b\xB5e\x8C\xDF\'\xE1\xD2N\xF8\xDCNN1B\xB0\xF49\xEB\xCE,\xC8 Fg\f\xFC~\xFB\f\x01d\xFC+\f\xA1\xD3\x90\\\x98\xFB\xED1\x04\0\xBE\x99\xED\x80\xED\xDD\xA7\xF5\xF6\xD8s\xFF\xFD\xDA\xD9\xCF}1\xEE\x05\xED\x1E\xCF\x10\xC6q\x0B\x9F\xEB\xAF\xFE\xCD\xCB\xF0\xBC\xFF\xB4o\xB8\xDA\r\x83\xA6\x02\x98\x87\xA0O\xBC\x06\xF6\xBB\x91\x851\x83\xE9\x9F\xA1\x81\xAA*0\xB7\xA1M\xBEG\xA4\x1D\x10\x903\'K\xBD\xF2\xEF*Rh~\xAC\xF8\xDF\t3\x85\x84\xD6L\x12Q\xEA\xC9\xCC\t\x7Fpb\x9A\xD9_ \x04)\xD6\xF2J\xFC\x02\xF4\x01"m\xB2X\xAB\rAz=\x9F\x03j\xA5/8Q\xAF\xF6QS\xA9i\xBB\x88\x87\x99.\xFC\xF2\x99nA\xEE0U\x99\xC2\x84q2\x90\xA8|\x87\xAAmu\xDFG\x1F\x13\x19\x883Z\xBF\xB7\x8E\xDD\xFB\x1B\xE1~``tOE\x07\xC8T\fu,\xD2\xF8\xC8\xCDr\'\fAK\x05\xEB\xC33\x04\x9Bk7\xBC\x1E\x8E!8?\x8B\xB9\xF0>{o\xD0\xF5\xD3\xD0\xFF\xD13\x7Fk\xEDI\xBF\xF4\xEB\xB2~\xF2!\xD7\xF9=\xA5\xCD\x8E\xF5\0n\xAB\x8Dz\xB3\\\xD3_\xFE{\xEF\xD7\xE7=k\xFF\xEC\xB3\x98\xF9\xE2h\x10\xF3\xFF\x9B\xAC\xB6\x80\xA0X\xDF\x96\xDA*H\x1B\x9D/I\xC0\t\x9E\xEF\x90\xE0]\xCBy\xBE\xEC\x02\x11\xD4H\xC6z\x92\0n\x89\xAA\xD2\x96w\x948Y\xD8\x91\xA64\xB7\xFB\xB9\xD2\xA3\xFCwf\xBA>\x1A,\x03\xD2q\x8D#\x01\xBB_G\xE8\xFD\xD2 \xE2\fC\xA4\xD0\x8C\xE4\xF8\x9Am`"~\x8E\x11\xA1\xD7M$\x8A\x80B\xC5~\xA3\xC8\xD7\xCE\xF9l\xE1N\xE5V\xF3\xA2\xCD9$\xE2\xFA` \xE2\bA(\xF5;l{8I\xCD\xA4\xDAb8\xF1\xCD~o]\x1D\xBB)\x80\xD1\xF5\x11\x8E\x93\xCA}\xDAa\xB3o5\xC6\xE5\xFFF\x9C\b\xD4\x9F\xDB\xDC\x9A\xD6\x15\xDF\x89\x97\xACG\xB0Y\xF0\xD2\xAA\xC61\x01N@F$\x01\xAA\x025\x06\xB7[\x91\xAF]0t\x85\xEE\xBF\x0E\xFD\xBD/\xFEO[\xBA\xE7\xFE\xBA\xBC\xF6\xDF\xCB\xEC4\xC5=\xB4\xDDc\x19\xC2R\x0F\xB6\xAB\xC7\x97\xBF\xF4\xDD\xFD\xB7\xCE\xDD\x9A]\x8B9\x14\x0B8\x87\xF7\x85\xEB\xB5}<\x1F\xC1\x16\x12]\xC9\xA2\xC0R\x82\xEC\xD0}\xA9\x19\x13w\x15\xC2\xA1\xEF\xE8o\xB6\xA9\x1A\xB3\xF1\xF7\x1A\xB6\x84\xA4ooE\xE2N\x1A\x97W\xADG\xE00\x9CT\xAA\xF4\x10x\xDEex\x06\x86\xF2\xAF r2\xE3\xD9\x04*\xCD\xD8a!\xA4P\x1Fj\x1C\x01\xF2\xBE\x12{:\xB8\x8E\xEC\xA3\xB1\xE7\xF2\xB1\xD2&\0\xEBK\xA4\xF4#:}\xFCbK\xB1\x1F]4J\x92\x16\xDF\x8F\bc\x1E\x8A\xEA\x84\x0Ei@\xD4\x9F\xAF\xAEVa\xC5&\x85\x15a\x81\x13\xB3\x82\t\xEB\x12o\xB8\x99\x9A\xE0oU\xD0,/\x02\n\xC5h\xF3\x0F\x010\x022B\xC5\xFBq\xF7\xA5\x84\x9A\xA2\xABd<\x99\xBF\xE0\x93\xA8\xAF\xBF0\xB3rN=i\x12{"\x8A6\xEEG\x7F\xEFy\xCF:\xB8\xDC\xDE\xAD\xE3M?-\xC3)\x87\x8AQ=\xE6\xED\x1E\xC9\x10\x96\xBAg\xB8r|\xF1\x9F\\\xA8/zf\x9F}\x11\x03\x80\xA5\xBB\r;\x80\xAE\xCA\xEA\x87q\rQ\xC1\b_:\xB1 \x92I(\x80%\xCC\xA8(\x10\x8C\x10\x80\x0B\x85D\f\xBBX\\\x92\xF4\xE8\x8F\x92\x82\x12\b&\x05\x93n@\x98\xC2u\xA1\x11E\xD8\xA0b\x84/\xE1\xE4\x9C\xC5\xEF\n\xB7\x17\x88\xA3\x01f_F\x92v\x04X\xDBgJb\xC0T\x06\x8E)\f\x81\x1C\xA3\x11\x97LV\xEA\n\x83PJA\x81\x8A\xAB\b1\x7F6{\xC67\x8D\xC3\xA9\x8B\xD2`.\x05I\0$\xAF,\xA7\xC6\x98\x8D\xC8\xB0\x94\x01\xE1NQMi^)\x8Eh\x86\x1AO \x11\xF8\xDC\x8D\x10\xC9\xE0&\xF1\xB8b\xCD\xB2\'\xC68\xB4\x8A\x83\x0E\xC5\x12\r\x1D\x90%\xB4\x99\xD12\xEC!\x13\n\xBF\xBDv\x18Dp\x98&\x10\xCCT\xA0\xDB\xFB\x80\xF7\xBE\xF2\xDC\xADq>S\xDDs\xAE\xC8\xFD\xEFq\x01L\xF78\x86\xB0\xA5\x07\xDB\x87\x17\xBF\xFF\'\x7F+/x\xE6r\xD8\x8B\xB9sc\n \x93\x07d\f\xF6\xEA\x15U\x05\xB0%\xEC\xCB\x12\xC5\\er\xC4\x17XG\xB7eSP\xBFi\0\x1A\xB0\xDAH\x92\x8C\xC0\x9Ae\xE7\xF1\x07\x814\xB7*\xA3\xD4a\xCC\xC30\xCC\xE1\x8EO\x9D#\xAB1\xE4_\xE4a\nU\x04\x87\xF8\xF08\x83\x80\xF9\xEC\xD9\x88\xD7\xB2%+s\0"\xBC*\xF0o2\x96\xC9\xD8\x9C\x19$\xAD\xB9\x11\xAF0\xBB\xC9\xD9b\xE8\f"@\x1B\xC2//\xBC\x17\xFB\x10\x9B\xF1@H"6\xF3\xAC\xD5\x88\x02>2\xDA\x0B\x14\xC3\xEA8>\x8C\x8E\xBC>E/R\xDD\xE8\xC6H\xA1P,\x91f\xE1\x0ES\xA9J\xFF\x02Ge\xBD\xA0\x1CgD\xBE7\xDC4\xA2tU-J\xE45\xF1.\xDD\xD1\xE6hqm{\x0B\xCB\x8B\xFF\xF4\x99\x9B\xE3\x12z\xF0s?%\xBB\x1Er\x8FB\n\xF7(\x860\xEA\xADr\xE9\xF2\x8F_\xFA\x0E\xBC\xE8\x99\x07\xDB\x1E\xACa\x89\xA6\xE4\xF7)\xE7T\x9C!\x888X\x04\0\r\xE2\x1E\xE1h\xD4\xDFn\x87\xA9\xA3K\xAA\x06\xE29\f\xCA\xFB\xDA\xBF\x12L\x85\xCC\x84\xEB\xA3\xFE\xB7\x90\x16\xE1\xA4\xB8J\x90+\x1D\xE9\x02\x9CC1\xF7\x80\xA2\x99\x11=\x04i\'pI.\xE9Q \xA9I\x1B\\b\x1398t\x0E\xD1I\xDD\xDCg\xA0\xAA(\xBE\xB5;%xz7\x9A\x11\0!@\x18Z\xB4\x1COB\x97B\x18R\xE7Bh\x18,\x93G\x03\xA2T\x17\xAC\xC2\xD4 \x83\xEB9\x89!\x9E\x1D\x11\xB8\xF1\x12\x1AR{\xBA\xAD=\x19\xA11l\xA5\xFBQ\x9A\x1Fi@\xEF\x10LK\xDA\x01\x1D\xAC\xA2\xCD\xBC\t3\xDCv@\x17\xBEz\x16\xC6\xC0V=\x05\xAB\xA8a\xF2Uv\x1E?ls&\xD7\x01H\xC3l\xDC\xC2\xF8\xF7\x7F\xF6\xCC\xADa\xB6\xD4\xC5-\xFFJ\xE6\x0F8\x1A\x16s\x97\xB4{\fC\xD0\xAD\x11\x97-_\xFE{\x7F\x83\xDF>\xF7\xC0\xFCzxZ\x0E\x06 \xF6U\xE6\xFA]\x80\x81\x83\xB1Ja\x84\x9E\xF2\x90\x88\0\xFEy\x94\xA9\xA4\x17X\x18;\rl\x9DF# P\x85\x8B\xF8\xEC7`B\xED\xC9\xFB\x13\xB8ZA?\x85\xFB5t\x0E\xE1w)\x01E\x81\x10\xF8\x94D\t\x04\xE3$b\x0F:\xA2>\x1E^\x05J\xB3\xA2R\x04s\xA0\xB4GJ\xD9\x96q\x06\xC6\x9C\\\x01j\xAE\x0E\x18lr\x06\xE0\xE2]\x87\x88\xE1\x07\xABR\xC3\x8E9y"8bw\x1C\xA6\x85\xB7\xC0&-=\f-$\xB3\xEA\0\xB4fx\xAE\'\xA22\x17\xA5]-\x92\x18M\xBDc\x81@\xDBhs\xC2\x98\x0E\xD1\x9C\x93@\\\x9E8%\x03\xC4sO\x04n\x10E\x87\x88[\x95\xB4\x032\x03t\x01\x95\x11"N\xB9\xBD2#\x7F\x9A\x98\xCF\xFC\xE9h\xDB\xFAr\x13\xDB\xEFy\xD9\xB9\xFBe}\xBF.n\xFDw2\xFF\x8A\xA3\xEF\xECNl\xF7\x18\x86\xF0\xA1\xF6\x87\xBFy~\x7F\xFE\xB3n\x9E\xDF\x80\r\x95p\xED.\x8B\x84\x18\x1C\xD2Sr\x8Dj\xCB\xC5\b\xDE\xDE\xD3\x120i@\xFA0`\x1A\x8B\x8C\x9F\x93i\xE4yD\x15\xFCNx\xABJ\xC9d\xAD;\xBD\xACj\x90*\xE2\x10v\xCD\x99@a\x04\xD5X\x18\x84\xDB\xCC\xCE\xE0\xC7\r\r{\xCC\x814\x87\xBD\xC2\xCE!\xAD\x01}@\xD8\x01\\\x95\x80\x1B\x013i\xA9\xC4"\xF8yS\x89V\xD4\x89\bT2\xC9n\xF7*\xB1\x16\x01\xCB\xDA\xB4o\xF4\x82\x84\x9C\x88\x88.B\xC2W\x1D\x8AP_\xCAW\x93\xDC\x12F\xC9\xA2\x0Ex\x1F\x89*\x9C\xE1\xC0\x18\x958S\x96\xF0&\x901\xE43ReP\xFF\xACq/z|L\xBD\x10\x1A\x1A\xA5\x85\xFA\xE0b\x04\x81\x15w\xA8\x0FD\x8De\x0F\x8F\xBA\x16@\xDBMY%\x02\xEF\xBBA\x1B0loB\xDF\xF5\xB2g\x1D\x18\x96{\0\xFC\xFA\x8EN\x8EA[]\xD3\xC7\xA4]\xBE|\xFD\xCF\xBF\xB6\xFF\xDA\x7F\xBBi\xF6q\xCCDqB\x17\xCC\x04\x98\x89bM\x1531S\xDC\x1AJ$\xA2*\xE6\xB0c\x19ld\tM$\xC5\x994Ot\xB2\x90f\xF1\xF3"&\x01-\n\xA8X\xBD\x84\x15\xF9\xAE\x04\xFDN\xBE\x92\xE5\xBB\x01\x94\xC0\x19z\r\x06\x88\x0E@\xF7\b\b\x9D\x95\x85G"u\xCF\xC2J"\x920\xF8(\b/%^\xA2\x01z(d\xB2\xF0\xE3\x9C\x12\xC5[\xC3\xA5\xF3\xBCr\x0E\x88\x16\xA8~\xA0\x04\xD7\xF8aU\b}s\xB5`IHc\x8D\x90]\x85Z^A\xA0\x01\x9D0\x85\xDCI\xDA\xFF\x8D\x18\x05\xF6\xAB\xC8\x9D\xB2=\xA7\xC13\x1FA/\x88\xC7\r\0\xDEOw\x86\xC1\xA6c\xC44\xD89\x16\xAB\xA0,\x19\xDF\x01\x19\x1D7v5\xB5\xA3\xBBQR\x97\x1E\xCB\xD03\xA6A\x17\x88 \xA7\xD1\xE7\xA3\xFA\xB2\xBB\xF8\x1E\x1E\x1C\x0B\x91\x92]\x16\x99\xA8\xBD\x8C7\n\xB2\xF8s/\x05\xDB\xEB\xA7B\xBF\xFB\'\x9F\xB5\xF1\x94\xFFr\xCC\x83\x97\x8E9C\xB8r\xFC\xFF\xCEy\xF5\xF8\xBC\xD7|j\xFE\x81\xB6\xA6\xC0\\\x04\x1B\xAAX\x93\x86\x19:\xD6\x9C\x80\xE7h\xCE\x10j$\xA2\x05)\x19(\xAF\x84\xCE\xC2(\xCD\xCDy\x1A\xD9\x8C5\xA4\x99\xA9\xCF3\x98\x15XD\'\xC7\xC3\x1F\xA0\x99\xE3\0\xA0\xACaIu@\xE7\x16e\x88\x99\xA5\x1DC\x90a\xC65\xA2\x90\xC1D\xE6YP\xFF]"\b\xC8n\x10j\x80\xBA\xD7\xA1J\xE8\x12D\x14)\xD7\x90\b\xCCc\x1F\xD3\xAD\xDC\xE0\xC4\xE9\xB1\x05N\x90\x96\x1198\xF1J\b\xFE\xE4|I\x8C\n\x84\xE1\x8D\x12>\xF7\xA4@\xBA\x10W\x82\x92\xF2\xB7<F=?j\x1E\x94\0%\xF0\xFE\xBE\xA9\x8A\xE16\x1B\x8B\xD594\xE6\x91\xF5\x12$\xCE7\x061\x16\xA6\xB0\xB4>z\xB7\xFEGEl\xE7\x16\x01T~~Wg"dN#\xB4/\x01\xED\x90\t\x03I&\xF9%3\x84Q\xA1}\xC0b\xF7\x83\xFB\xF2\xEC\x9Fy\xDA\xEE\x1F\xF8\x8F\xC74\xCC\xF9\x98\xAA\f\x9F\xD3\x8B\xBF\xEB\x8F\xB7\xFE\xC6\x92\xE1\xEF\0\0 \0IDAT\xC3yW\xCD.kM\xCD)\xD4`j\x82 \xEB\xFA\x01\xAE\x1A\xB8\xBBQ\\\xCF^"d+\xA8y\x8B\x9A\x83\xC9T\b3E\xA6\fQ\xF7J\xA8\xDB"XhUC\x93W\x15\xF74\xD0\xADiq\t*\x99/A\xB7\xA6b\x06\xE8:\x98U\xD1\x18G\x10*\x02\xD5\x04\xEF]\x05\xE6I\x18,~`"\xC1\xDBDUI\x86R\xEC\x0B<7\x14\xEE\xC2h\xAAB\x1Bq\x04U\xE9\x95\xBC\x954\x97\xE6\xE5\xB8\xB8\x9F\xBF\xB1\xD0\b\xFB\x0F\xB8\x10s\x9C0\xA2\x8E\x9B\x90}\xF58\xA6\xD7(h\x11\x88w<a\x1E\xE5_\x83\xFA\x80\xA2\x83\x1B\xB5\x84j\xD1X\xDE\x8E(AA\xE3j\xDE\xDE\x99\x1C:,\x94\x8Dc\xF2\x10i~\xA7\xD7abL\x94\xF2G\xF5\x81\xABB\xCB\xAAJ\xA5\xF3\x88\x9B\xC2\xE7]1\xDB\xFB\xF9\xB6\xBC\xE8e\xE7m\xBD\xFB\xC5_X\x7F\xFC\xCF\x1F\xB3\x84\xA8c\xC6\x10n\xD2+\xBF\xE1\xA5[\xBFr\xFE\xC5k\x7F\xBF\xB1K\x15k*\x18\x9A@\xDD\xBC\xD7U1\x8A\xED\xBBg\x9E\x063&\x9A\x85\xD9\xD6|Ss\x1F\x9A\xC6\xD7\xCC\xA5(\xD5\xCB`\xCB`\x12\x9D\x17\xCBB\xE2\xDB\b\xAF\x87\xE0:0e\x12\xED\f\xC2\xFB\x82\xC6\xB4\xE6\xACa\xDD0\x0BC\x8D#\f\xD9\x89\t\xE5\xB3x\x9C\x81\xCE|\xBD6\xD8\xFE\x02$j\x06!\x99\x94\x11\xA1m\xC1\x8E\xF1\xCEP\x84\xB5\x1A\x92L\x04>\'\xA1\x02x_\xE1*\xF49H\xBF}\x03Z\x9B\x84s\xB2/\xEA\xE7\x9C\x8B\xEC\x93\xA4?\x86\xE7f\xE2\x82\xF3/v\xF5\n: \x1Bh0\xC9,\xFE\xCE\xF8@\xA4A\xAA(\xD4aD\x81n\x1E\x16\x86 \xAB\xF4\x18\x8BMFs\x91L&\xEA\x04\xCE\xF7\x1EF\xD8\x9E\xB6\x07\x7F\x8E\x12B\x89p\xB9b\xCC\xB9\xE7"@2D-\xCC@\xF8\xDC+<ygc\xDF-\x19`\xD7x\x87\x02\xC5\xDA\x8D\x9F\xDC\xD8z\xFB\x1F\x9E?^\xF6\xCA\xC7\x0E\x8Fx\xFA1I\x9D>&\fa\xAF~\xEE\xA4\x97m\xFD\xE6\x05\x17\fo:eC:\xEA\xB2o\xBE2m\x8E-\x85\xA5I\xC6\xA9\x91\x88\x07h\x18\xF7\x962\xF5\xD2\x03\xC9\xD3k\x135oC:0=b1z\x15\x8C*\xE8b\tSc\xC82.\xAD\xE6\x98\xC3c\nt#z\0\x86\b>\x82\x1B\x17Y\xC3\x90\xA8\xA0Ju\x01\xDD\x8A\x1A\x18\x07\xEA\x01L\xE4l\x9A\xAB,\xD0\x83\f\xD0F4T$\x13\xE3\x12\xFCX\xEC\xCD\xC8\xD8\x86\x9E\xBD$zh\x11\x92L\b\x1BFJ\xE1y\xD5MN\xF68\xC0\x82\x94\xC4\r\x91\xCE\xCC\x9C\xF0\x05\x1A\x9Fsl\x894\xD2;+\x1E\x04\xA2P\xA9o\xCB\x98\x96\x05]u\xA7}I\x81\x9D\xAC\x0B\x8AE\x12\x9A \x11\x84\x88{\n\x8A\xDB\xD6v\x89\x01\xBDS;\x98\x99\xABTTO\xAA\x91R\xFD\x02\x11q\x86\xBA\xF4a\xF4\xC9{:\xE2V\x9C\x193U\f\x9F\xFB\xC8)\x07\xDE\xFC\x07\x17\xE8\xE7.|\x9C<\xE4\xBB\xEF\xF6"+w;CX\xE8bx\xCD\xF6\xEF\xBC\xE6\xE5\xF8\xB33g2\xA2\xF9"\xA4\x83\x8D\x84_u\xFE\xD1\x7F#`\xB3(C\x7F\xFF\x0E\xB9\xC4\t\xBC9q\x93\xEB2\x1C\xBEC\xB0\x94\xEE\xA1\xB9\xF6\x06\xE8\xA10\x15\xC3\xA4\xE9\f\x04\x86\xF4\xE33/\xC2=\x01X\x03\x03\x8DDf\xE6\xC2\x13\xD3\xF15P\x82\xBB\xBE\x1A\xF5\xFD\xC1\b\x93\xCC\x80D\xA4\xA6\xB0$K\xF4\x85.-\xFC\xF2\xD3\xA0"\x97xe\x9FH\x1B"\xCFQ\x97l\xB47\x18\xD22\x15\'\x99L\x8F\xD9\xB3\x19h\xAE\xD3\xD6\xA8g\xA6?\x13_\x01pz\xA6;\xD0\x8C\r]Z\xBC3;\xE6~\xFF \x94\xAA\xBD\xD8{\xEA\xEE\x9ElE\'Tm%\x8F\xA0\xA8\x0F\xE2\xDF\x93\x87#\xFCF\xAA\x80\f\xE6.D\x0BI\x1E\x1E\x87\x98\x13G!\x9D\xF3I\x1F@\x89\xC9\b\xA2v/\0Fgl\xCD\xC3\x9CGD\x15Ww\xC9&|PL\xF6\xEB\xBC\xCDv(Uj\xFA\xDC\xF3\x8F\xBF\xE7\xCC\xAD7\xFD\xFEk\xF4\xC0g\xFF\x99\x9Cp\xF7\x96c\xBB\xDB\x19\xC2\x9B\x97\x7F\xF6\xC2g\xE3w\xBF\xEF\xE0\xDAA\x9C\xEC\x849\xF8+\x1E\xA1Xz\xED\x82\x11\x82\xB1\xDBk\xA0\xCD`\x8Cs\xD5\xED\x07\xBEdI\x1F\xC8 $\xF5\x05\xDE\xC5Q\x87;\x14M\xE6\xFB\xA2piU\xDD\x8F\xDD\r\x8B\nE\x17[4\x1A\xBE\x865\x003\x8C:G\x93\x19\x86\x82\x06B\x12\xAB\xD9\x10\xCC\xD8\xC7p\xE4\x82\x10\x84z\xAE\xA9\x11\xA2\xEAIJ-\x17\x1A\xC3\xFC\xDA\xAA\xAB\x0F\xA6fpM5\xF3L\xA8C\x7F\x91b\xC0\xF4\xC8\xBB\x18#<\xBB\x0F\x80\x88Ey\xA4\x844\x82\xA0\xA1\x0F\xC1^}\xA8\xE2\xD2X\x11\xCCT(\x91\x9B\'\x16\xC5~\x07\xAErHs;\xA8"\n\xB0\b|\xF6\x07W;\x8C\x15B\x05\x8D\xB9\x0BN\x14\x16p\xA4\xB0\xC2(+\xE2\xDC\x19S\x07\xD0d\x16H\xC2\xE2@<\xAA\x91h\x81U\x99\x18\x8F\xA0\x8C\xA7\xF0\'t&b\xD6%\x8F[@)\xA4"#\x88R\xC2;\x83f\xB9\x11tO\xEA\x12io\xF1\x19%wsf\x9B\x8C$\xBF\xFA\x0BE\x85+\xD2\x05k]\xB1\xBC\xE4\x82\xEF\xDB\xDE\xF5U/\x04\xF0\x8B\xB8\x1B\xDB\xDD\xCA\x10.\x19\xFF\xE6\xC7~v\xF9\x0B\xBFp\xDD\xB0\x17\xA2\x1Dk\x10\xCC\x05\x98k\xC7\xDC%Q\xA4&\x8B\x04B\xE0,\x8A\x87\r\xAB\x18\xD1\x0F\n,]\x124\x15\x8C\xCE8Dh1\x90@\x8F\x84\xB1\x1D\rcx\f\b\x93\xBD\x1F!\xBA \x82\0:\x064\x9D\xA3\xCB:\x809\xBA\x17r763\xA0\xD68\xAC5\x98\x02\xC2\xF3)\xC2\x88\x98\nR\x1A\xC1\xF8\x99\xAB\x858\xC5\xC7\b\xAA\x01\x94\xCE\x1C;|!\x931%2\b\x98Mb\x17\xFFQ\xA4\xAC[\x0F\xEEqF\x10\x91\xCE\x8AHpj\xE1\x1D\x002\0\bH\xDF\xA63\x10i\x99\xD9Y\xD4\x9C0\x04R{\bJ\xA8\x19\x16\xDD\x19MB\xF4tw\xF8|uC%6\fC Lz"\x83\x17\xD0>\xB2,\x04\x97R<\xA2\xB9+\xBB\x8B\xB1y\x16L\xB5)\x04"\xE0@MY\r\xF1\xA4\xDD\xD1\x89\xA0\x84\xCB\xA1\xDC\xFC0\xAD\xB2\xDBC\x1F\x9E\x8D[\xD8|\xDF+~a\xF3M/x\xFF\xC6?\xFF\x95\xBB\xAD\x9A\xF3\xDD\xC6\x10\xAE\xEE\x1F|\xF8\xAFn\xFF\xEA\x1F]\xBA\xF6\t\xA8,\0\x15\xEC\x83b\x03\x82\r\xC0+\x1AYu\xE49\x8C\xB8G\xE9\x18\xFD}\x8C\xA2\x1E\x98\x84\0oKAl\xD1f 8\x93\x9E\x04\x12\xA1\xC9U\xF5\xA4i\xD1\x12\x9B8:;q\xF4\xC5lK\xB0ad\xD8\xB1\xB1.d9\x16E:>[2\x05\x1A\x0F\x03\xC2\xB3\xB2Bs\x98O\xC8\xEF\x06A\xF5\xDF\x9D\x98\xA3\xCAR\xE8\xC3\xFC\xEE\f\xC1Q\x8Ee<\x0E\xC8\xD0b\xB1\xAC\xC6@\x0F\x8A\x89\x87\xC3\xC5\x9BiW\x92nG\xCE\x8E\xDF+\xA6\xC3\xA0\x12\nwp~\xA5N[\xDE\x7F\xC4&9Y7\xA60k\x8C\x83\xC6X{\0\'\x04\xCD\xF7\xD1\xDD(\xC8B\xAB\x89@\xFC9\xAA\x9D$xM\x03\xD5\x8F\xA9\x8D\xC3\x8Fu\x8F\xC4t&ch\x8D\xCA:W\x89\xC6<\xC7|\xA2;"(\x0B\xC6\xDF\x87B\x90\xE9\xE9\xDD\x99l\xF7\x9A\x13#B\xD2+\x19Im\xB7\xC7 \x0E\xD1\xA4c\xE3\xC0\x17q\xF0\x9D/\xFF\xA3\xE5%\xE7]>{\xF4\x8F\xDF-\xFB>\xDC-\f\xE1:\xBD\xF6\xC4\xFFg\xEB\xFF~\xDD\xEBgo\xDB=zv\xA1\n\xB0\x1F\x8A\r\0\xBB\x9D\xD8\xE7\xA2\x98\xAB\xB9\x13\xE1\x84\xEBk\x18J\xF0\xAEf7\x1B\x85\x0E/\xF7\x06\x88\x86l\xCF?_L\xAA\xEE\xFEe-\x85\x89\xDD\xDE\x92\xA4\xC4\xE4\xCF\0\xAF\xC7\xA4\x16\xE1\0Y\x87\xCA\x1C\xAAV@\xB3\x83\x9E\x81\xE6\f\x01\x0E3kHr\xF54\x98\x112\f\x80"\xA9\xF3\xABDxn\xD4i\xA2\xFB/\x98\x03\xE2\\\xB7\xC9\x83\x99\x89\xADY_\xEA1\f\0\x11j\x89\x92s\xC8*\xAB\xC8\x80\xA9\xC6\x0EL\f\x95;\xEA\x98l\xB0"\xFE\f\xE2\b\xA20R\x8F\x11`\xBD\xC2\xA6-\x8D\x99\x1C\r\xD1\x19\xBF\xA7Ng$\xE9\x86K\xA6`k\xF3\xD4\xE4\x0E3\nJ\x0B[\x8E\xBD,\xCE\x87\x02\xDA\xED\xB9\x9A\xD9\x07\x94\f\x85\xCCK\xC9\xE0\x8DX5\x90\xD2\x10\xC7L\xCDr\x13\xB4$Z\xE2\xD8\xB5\xD3q=:j"\x9B$\xD4\xA7w\xC8\xD5\x0BzL\x94\xC7{\xBC\x83T\x1FJ+?O7\xE31\xE6\xB5~\xDD\x95\xBB\xB7\xDF\xFA\xB2\xD7\xE9\x8DW>Z\x1Ex\xD6]\xBEC\xD4\xDD\xC2\x10\xDE\xBC|\xFD\x1F\xFC\x0Fy\xC5Y\xE3@\x8E\r\0f\x07\xD8\x03`\x17\f\xA22\xB8\xA8\t\x17\x8B\xBB\x1A\xD5\x10\x04\xE3:h?`_\x16\xA3 XJz\x88=\x80\x0Es\0py>\xC0\xFA0f\xC2Q$\xCA\xB0W?@\xB0\x8E\xE6\xEA\x01\xD3\x95\xBB\'\x1FY1\x96\x01c\x893hn`J\x95\x80jDa\f\x8CjR\xC2{\tn\xA7\x91P4\xF89dU\xC3!\x16Q\xDA\x13\xD4\xA5;},\x12\xC7\x81\xF0\xCD\x16\xC6B\xA1\x17\x8B\x90\xD2\x96C\xF3\'Hwg\x89\xE2H|\x9F\\:\x16;\xBB\x90\xA2\xD2\xF8\xAF$\x8C\xF8\xC9G*H\xC4`\xD4\xE0\x844P\xA6\xDB\x7F\xC5\xC2\xC6\x8D\x10\x9D\0\xB9\xD7]\x10ZU\xB7\xAA4\xEE9\xE7\xEA1)\xEAy\f\x81\x8A\xA8\xD2\x144F5\xC9\x89\\\xC3`H\xC6\xC2\xACI+\xD3#D\x04\xE1\x95I\xC7\xF74\xAA\xB4\xBEK\x9D\xFE\xA4\x89\xA7j\xD3\xA6\x98]y\xD1Y\x07\xCE\x7F\xFEK\0<\x03wqk\xB7\x7F\xCA\x97\xD6\xFEn|\xDBO<\xBF\xFF\xDE\xBF\xBCem\xD3\x7F\x99.\x98-\x007w\xC1\x01\x05\xB6\xE1\x7F*X@\xB0\0\xB0\x10S\r\x9605b\xE1\x9F\x97Hc \xD5\x87\xB12\x03\x18\xBB\xE8\xE5\xBC\xE2\xE1\t\x90\x97\x7F\x86\f:\xD61b\rK\x99\xFBw\xEE\xF6\xD0\xCC\xD0)3\x8C\x180\xA2a\x84\x95e\xEDbj\x80\xB6\x01*\x03\xD0\xD2\x8E\xE0\x9A-hs\xC8\x90ff?\xCE\xD2\xA8\b\x01\xCB\xA9A\x06\xA0\x89\xB9\x18K\x1A\xB3\xD9\x0BL5\xD1\xE6\xFF\x8A\xC7gj\xAA\t*\x83\x1Fs\x06\xE4}(\x1A\xBA\xD7`0\x17g\xB3\xF1\x8A\xA9/v\x1DK\xB8!\xCB\x12\xC2\xA4\xAB\xD9,\xFD\xD9\xA4\xF9\xBD%\xFAS\x99#b=e\x06\xC8\xDC\xFF\xEC\xB3\xCA\x1C\xC6\xA6\x1D\x811\x03\xD4\x9F\t\x8E\xC0\x04\x16\xD1\x99\xCFkc\x17&j\x89\xC4\xBCU4e\xCF\xE0\xCF\x1B\xCF\xE4\x9F\x83i\'\xA3\xCF\x87J[\xD0\x0E;\x8Fr<\xF6\xA7\x8E\x14w2\x7F\xFE1\xCD}\x96(5\xDA\x91\xA9\x0FV\x1D\xBC\xA3\xBD\xEF\x8DO?\xF8\xC6\xDF\xFE\x89#\xBA\xF8(\xDA]\x8A\x10>\xAB\x9F>\xE3Y\xDB?\xF3\xE2\x8F\xAD]\x8D\x9D\xBA^B\xDC}M\xB1\x0B\x82u\b\xE6\xA2\xE6\x8F\x85\x05\x05/\xE0S\xAE,u!\x1Epd\x10\xBF\x03\xF1]\xDCX\xD8\xE2\x18\x19D\xAA\x07K\xCFGH\xB3\x1D\xE3\x0B\xE6\xE8:\xC3(\xEB`\xD4!\x03\x9E\x15\x03\xBA641\x06\xD0\xD4\x88\xCA\xCD\xA0h\x93\x85\xD4\xA0\x13\x8F\x82\x13\xB2\x0ENX-~\x97N\xE3\xA3K?\xD8B\x8E\x94gM\x87l\xCC\x19\xDDs!\xD6K>\x02]h\x94\x9A\x8A\xD0\xC9\xAD\xC0\t2\xAC9R\xA8{~\xDF\x11\xD7\x80@6R~WwwB\xA8Z\fn\x8F-\xEA\x04u\x82bhS\xA2\x02A\tSN4\x02\xB1\xDC\t\xD6Q\x88x\xD40Lj\x10\xB0\x94d&cVn\x98,v\x8A\x90\xF6\0Pl\b6_\x8CTl\xB9\x1CUa\xF5.V\x95N\x12\xFD\x98\xEF\xC4\x8B\xC1\x8A\xBB)s\xDE\xDD\xD8\b\x81H\t\xA1\x0E\x83K\xA6=\x11D\x88j<\xE2\xA4)\x02\xB5l\x1C\xB8\x05\xFB\xDE\xF9\x8A\x17/\xAEx\xCD\xBB\xE7\x0F\x7F\xDA]\xB6\x15\xFD]\xC6\x10\x0E\xEA\xDE\xD9\x8B\xB6^\xF8\x8A\x0B\xE6o9\xD1\xEA\xF0\xD5$f\xFE\xD9bQ\0\xB7\xC0\x98\xC2\xCC\'\xA5\xA9\xD9\x15\xC8\x87\x07\xA4\xFA\xD0\xC4\xC3\x93\x15\x90\xF0F \xEA#0]vt\xAB|\xB5g7G\xD2\xB6<\x1A\x80\x19T-K\xA23\xBE\0n/\x10+\xBD\xDAK\xA6b\xC3\f#\xA5\x86\xB8g\x81\xAE\xBE *\'\xFA0k\xD3\xED\bp\xF1h,\xFA"\x91\x8A\xAB*\xAD\xD9T18}\x1E\x9D\x18\x1E\x85JT.\xAD\xC3bo\xF3\xAD\x939\xAFYx\x84\xEE|/pI\fD\x90R\x10\xB9C\xF5\xD0M\xCC\x06aR\x9BC\x99\xE8\x0F9\x86J\x97\xF5p\xB42\x16\x0E\xA8\xFA\x92\xC3\x1E\xC0\x9C\x06\'\x1E\xB7#\xD8}\x06\xEFi\x84\xEA2\x99G0\xA4\xF46\x04*\x10\x80\xD9\x87\xD9\xF7\x88(\x82\x13\x9E\x8E2\xC7\xD2<\xF1\xC9\\\x94\x18\x07c\x022&\x12\xD3% \xDD\x8D\x90\x03R\x1D\xCA\xF5\x1E\x8F\xE9?L\x83\xA4\x80Pa\x14f\x10m\x82]\x9F\xFF\xF8\x89\x07\xDF\xF4\xA7\xAF\xD0[>\xF3]\xF2\x80\xAF^\xEE\x98\xC6;\xA1\r\xB7\x7F\xCA\xD1\xB5o\x7F\xCE\xA3\x9E\xF3\x9Bx\xDE\xD3o\x9D\xDD\n\x95\x8E|\xDE\xE9\xE2\x84\xFF\xD7\xDC\xC1\x8254/q\xA6\xBE=\x9B3\x04\x117vk\xAC\x1D\xBA\x0E\x05\0\x8B\x87\x88\xA4\xDB0\xD5\xD9B\x02\xC2o\xC6\f\x809D\xD6\0Y\x83A\xE5L\x9F\xCA\x14\xE6\x99\xFB\xEE\xFDw\x87\xAB\x82\x01\x83\xE7.\b\x04M\x04\x01u\xA5\xC0^G\f\xBC&\xE11\xAD\xD6\x8E\x06\xDC\xC0H\x98ly\x9A\xCE\xD0\b\xAB\xA3\x9E\x82\xCFeQ\'\xD8\xAF\x90\xD1DNE+4\xCF-i\x1C\x867\xEF[[<\x87\x05<\x91\xB90\xD8\xAB\xF2\r\xBBg\xD4\\\xF0\xE3\xB9\xE35]\x81-\x98\x9E\x10\xAE\x0B \xEEuI\xECA\xA3g\xFE\xC6O\x11v,\x16\xC5\xD9d%~\x02\xEE\xE5q\xE9+\xF0\xC5\xC4\xD4q\xA6\xAD\x07s\xA1\xDA@\xE4\x94\xC4\x18k\x83a\xD2<Ki\xBE\xAE\xAB\xB8\xA8*\xBC\x01\xEFA\x01\xE2L+7\xBD\xC9>\'\x8C \x8EI\x9EP\x8D\xCA\n\xA0+Z\xEFh7\\\xF3\xD0\x83\x1D\xE3\x7F\xFE\xCB\xF7\xBC\x13wA\xBBKl\b\x9F\xD2+\x1E\xF9?\x96\xBF\xFF\x9C\x1B\xE6_\xF4_\x0E\x89\x85&\xBFt\0\xB7\x8Ab/\x80\x83*\xD8\x12`\xE16\x83\x11\x96\xA46"\xED\x07\xF69\x99I\xA8\x10\n\x0B?\x8Ec\xF4<\xA4}\x816\x83\x11st\xDB\xEA\xC5m\b\f\x9E\x9E\xC1\x92\xAB\xD7L\x95\x88|\xC9T!\xEA\xF7\x0E\xC1\xE8\xEA\xC4\xA4\xE8{\x842\xA7\x9A\x90\xB5\x15\xCB\xB1\xD5]\x99\x88(\x88@"\xCA1\xED\x01\xA9\xBFS\x0F\x97<G\x19Z\xCD])\x8C)\x89\x9A\x9D!k46H\x9FC:\x170%\xDA\xE0\xC4T\xC6\tVy\xAE\xEE\xCC\x86d\x9E\xABI]\xE5Y\xCA\x1F\xB7\xA2c\xD2z-&cP|6\xBD\x07\xEF\x13\xC4\xBA\xF3\x1E\xE9\x8F"cL\x9B\f\xCD\xC9\xB9\x7FW\xCB>\x94\xD7S%\x90$F\xBE\x0F/{\xC7\xC4x\x89=1\x1C\x91M\xE2MZ\x8C]&\xE3\xA4\xF0\xE1\xB3\xDFN\xA3As\x95n\x04\x98\x8DK\xB4\xF7\xBE\xF19[\xEF\xFE\xE3G\xDE^7G\xD3\xEEt\x95a\xEF\xC1/\xCC\x9F\xBF\xFD\xC2\x97\xBDc\xED]\xF31\x92]\x0E5\x05\xAB\x18\xC9\x88z\xAF\0\xBBT\xB1\x0E\xC16\xCA\x94\x8A\xA1\0\xBE\xE6\xEEn\xAA\xA5d\xA6\xE2\b\xDA\x10\f&\xAF\x94\xD8\x07m\xB8\x1D\x03D\xE7hn8\x1C}\x81Z\xC2\xB5%M\'s\x90\xC2\x04\x9C\xA8\xC1\x1D \x9A\xD9\x97}\x81\x8Chh\\\x10\xAE2\x984pi\\-\xD9~\x8E(\x17\xBCd\x96\xA1b"\xC5s\xBA\b\x8D)\x95|\xEE(]C\xCAH^\xEBY\x8DR\xCF\xED\xD3\xEAQ$\x9C\x94\xF6~\r\xAD\xF1 |e?\xE9y\x90IG:\xF9\x87\'\xD9)\x9E\x90\x14\xFA9\x93\xC5\x04\x8C/\xA7\xA4\x8F-\xE3\xA3\xE2r\xC4\x91z\xDF-\xFAQ\xF4\x12\xC8H\xBB\x89\xC3v\0\xA1\x86\xE5\xE3\xDB\xDD\xF9\x1EZ\xB3~\x18g\x15\xEB\xB1\x8CSl\xE3\\\x9B^\xCD\xE35\xA9\xC9k;\x9A\xAA\x90o!m\x14\xEA\xFE\xF2\x05b\'\xA8\xFA^W\x9B\xA3\x82\xA2\x8F\xF9.b\x1D\xB3\x1B?1_\xBC\xE3\xCF_\xA6\x07>\xFFh9\xE1\xAB\x16;/>\xFAv\xA7\xAB\f\x8F\xFD\x8Do{\xF6\xAF\xCB\x8B~l\xFFl\x13\xAB.\x94;\xD2FX\x04\xE2L|\xF7f\xE1r\xA5\xAD\xA0\x85<`H-\xA1(\xE1s\xFC\xD7\xED\x0BI?\xACz\xBC\xE6\x7F\xEBP\xB1\x12*\xC9\xBD\xD3B\x1CP\x97\xB9\t\x10\'x\xC2\xDFT\x0B\xE0\x16\xE8p\x1DJIv\x02%.s \xAA\x04\xF3\x01\xB2\x1F0X\x89\xD2:\xF7U\x88x\x85\x12\xB0\x94\xC9\xDF\x84\xAF\x94\xD4\xDE\x187\x10(\xC5\xA5ZQeR\xDA\xC3\x8D\xA5\r\x11\x06\x1DR\xCF\xE1\x7F\x98&\b\xEB\x93\xF9X\xF0N\xC2t\x8B]\xE0\x82vD\xC2\x8F@a|dB~P\xCBx\xA9\x12Q\rb\f\x07\xD5+M\x0BId\xB4P\xD2\x07\xDDfNF\xA2sJ\xF1\xA2\x06\x043\xB6\x0B\x15,\xF0\xE2\xEA\x11U\t\x8FgH\xB8\xEF6\x0EWIb\xF3[\xDA!\xAAJ@B\xE7\xF3\x87zP&\xA6\xAA\x11aK\xD1`4\x03\x04\xB8\xEE\xDA\xD3\x0E.\x16\x8B\xE7\x9F\xFF\x9E\x0Bq\'\xB6;\x15!\\\xADW\x9D\xF53[\xFF\xE6\xD9{\xE77\xE3\x90\\\xEF\x0E4\x05\xB0G\x14\xBB0`\x1D\x96x3\x13C\x0B\x16s\xD2\x83A\0S\xB0F\xB3Q\x87\xE7@\xC4\x12\xF0\0\x18ihj1\x06\x90\x19D-`\xBA\xEB\x1C"t-\x9A\xE4\x17w-\x02\n\x96J\x1F\xFC.44j%F\x1F\x95\x11T\xA6+\x19\x81\x0Fe:x\r\xB7p\xF7\xE5\\\xF4\xEF\\\xCD<\xC6\xDE\xAA\xFF\xDD\x89^\xF3Nv\xAC\x95\xFB\xD8\x8C\x06yN\x02_lB#\xF7S\x90\xCC,F@\xE9\xE6\xBF\xA8\xAF\xDD@\nH\xB1Z\xB3))\xC1\x8B\xFF=\f\x9D \x120\x8FBTb"qNR\xAF5\x98\x9C1\xA2\x1A\x9D\xC8\xFE\x86\xF2\x99\xCF\xDB\x1D\xBD$\xE7!+\xA8\xBE\xA7@\\\x9A\x88\x83\xE5\xD32\xEF\xC5v\x9B\xAE\x88!\x99W\xCFk\xF9\xBD\x9E\xA7\xFE\xDE\xD5\x9D\xDC\xEA\xF1\t\f\x80\xC2\xEA5\x85)\xD6\xB9\xF5\x93\x03\xEC(0\x1B\x0F`\xF3\xE27>{\xF3\xD27\xBEn\xE3QO\xB9\x12wR\xBB\xD3\x18\xC28\x8E\xF2\x82\xAD\xE7\xBE\xE4\xEF\xE6\x17\xAE/\x9AW\xC4=\x8A~\x14f;\xB8\tK\xAC\x89\xA1\x85Z:mA\xA9\xEA\xFFI\xCD\x91\x1E\xFF\xEA\x04R41\xF2\\\xCA\x80\x01\xA6&\bf\x98\xD3\x06\xA03LU\x02\x97\xD2\xFE\xD7\x89\n\xC2\xE8f\xDC\x9F\x06\xC0\x0E\xA0\xEB\f\xCD!\xBF\xA5d\x9B+R\xA4\xEC\xB1P!\xAA\xA6\xB1\r\0\xB4{\xA4\x9FL\x19\fd\x06\xED\x1DQA\xD9\xF5\xDC\xC8] \xBBc\xE0Q\x18\x18\xEB\x84\x96\xF3}\xCEr\x0Bu\x12\t\xE7\xDE\xC3\xBD]\x1AUo&\x85X\x0B\xB4\xC4.z\xB9\x1A\xC82\xEC4\x14\xBA:@f&\0\x98?\x01&$y\xDF\xA2\xCE\xF3\x9C\0v \x07\x8E\x94L\xB3\x97\xCFD\x8D\xB5\xB0\x0E\x99M\x12\x9C\xB8\x84\xAE\xE6K\x8B\x94d\xD7bN\x035\xC5\xD3J\xF4\x17OE\r228\x92\xDFc>*c\xD7r\xCC\xD7\x816\0\xBEq\xAD\xF2=\x10\tHv\xED*\x16Yz\xDE\xD7\xC6\x7F\xE2\x17>\xB1~\xF0m/\x7F\x89\x1E\xB8\xE1{\xE4\x84S\x8FN\x02\xAF\xB4;\x8D!\\\xA4o\x7F\xC6Kq\xDE\x13\x17mt\xB9\xFC\xA5\x8D\xEF \x80[`\xB5\x15\xD7\x94\x1A{\xA9\x1F\xA4fN\xEBPw72\x1B\x12\x1E\x8DH\xDB\x82I\xF3\x063\xB2)\xE6P\x190b\x0E\xC1<\x82_\f\x11T\x83VZ\xE3G\'*\xD1\x861`,\xF7[\x10tF.\n3\r\xFC\x9E\xDA\xFC}K\x10p\x1A\xA4\x9C\x8D\t,\x0BO\x80\xDC\xD8\x05\xA0e;\xB6k\x8B\x05V\x10\x01\xFB\x93\xB2\x88\xB8\xB0\xC85\xE9\xEB\xE7\x16l\n\xB0\xA4\xBDAz"\xD2\xBA\xE8\xBC?Z\xD0\xC3\r\xC7G\x91X\xE7\x14[\xCA\xF8\x01\xB8\x1F\x9F\xCC\xA7\xC0nk\xFE\x1C\x82\x18w\x12>Q\x90F\xFF\xE1\xC5U\xB8*\xA5EpV\x06\xE8\xF51z\x9B\xC2y\xA2\x0E\xA5\x94\x95\x98\x16a\xDDu\xE5\x1E\x0EH\x06J\xA6\x14\xCC\xC8\x11\x94(\xAC\xDC;%}\xF7q\regm\xA2\x1C\xCDg\xED\x92\xCC"\xF6\xA8(s>)9\x7F\xC7\x9A@1\\\xF2\xF6\'n\xBE\xE5%\xCF\0p\xDE\x11]|\x98v\xA70\x84\xEB\xFA\x17\xEF\xFF\x8B[\xBF\xF8\xC2k\xD6?\xF3%\xB2\x81l\x02\xE0V\0\xBB\xB4a\x1D\x1D3\xA1\xF4\xCF\x05\xD0\x80\x02%\x93\x0El\xBD\x12\xB8[(\xB2`\x06\x88%)\x89G\xAAu\xC9(\xC4\xB4t\xDBw\x93i)y\xBB6,\xC5l\x10<wBX\xE5\x7F\x90\x06fDr\xB9G\t\xB5B\x18\x1D\xE2\xE8\xB8\xA1(7\x91\x19\xC9\xB5(a\rG\xCC@\xCAP2\t\'V\x95\xE9y\xA2\xC9\x84\x94k^b\x9D\x9A\xCB\xB1O$}\xBE\x03\x12~\xD1\xF3\x85\x05N\xA8\'\xBB\xE4\xE5Eua\xFB\xF1\xD8+\xA1\xCA9-\xE7\xC65\x96\xBB\xB0J\x18\x81\xC8\xE1\xB1\x0F\xCC\xD5\x10^\xEBs\x13\xB0\xBF2P.\b~V\'\xE4)\x1C7\xF2\x1A\x0B\xA1[\xDF\xA6\xDA1/\xA1>\x9F\x1B\x8D\xB5\x01\xBAD\x98H\xE39\x15\x901\x88?\x8D\xA0\x1C\x8E\x0B\x04H\xB8\xCCw\x06\xEF\xDD\x1E\x8BP\xACm\xED\xC3\xFE\x0B\xCF\x7F\xA1\xDEt\xE5\x1B\xE4\x94\xB3\xF6\xDC\xE6\xE9w\xA0\xDD)F\xC5oy\xF6\x99\xCF\xFF\xDD\xE1\xF7\xBEw9l}\xC9\xC8\x80-\xC2C\x05X\x070\x17/v*40j\x98\xF7X-\xB9z\xBC\xF9m\xC0\x1C\xA2s\fX\x03d\x8E\x06n\x1C\xDF\x1C\xDA\'\xA4\x96\xE8\x01.\xE7\x8D\x014\x1D\xD0\xE8\xBE\xE39\x8E\x12Z\x04\x10\xF1~t\xAF\xF9\xB9\xD2\xDC\xD8\x98\xD7\0\xF4\xEFs\xC7\xE74\xE0\x89G"\xDA\xF9\xC5\x855qw9k\x9C\xC4\x01\xB0\xFF!\xC6\b\xBF?&\xA8\xC6\x9E*~W\xB2\xB5\xEA\xE2\xF4\xF1G<\x85\xDB;\xC2\rI#f+\x92^\x12\xE6\x86J\xE1\xE8\xA5DuJ\xB8M\x81\xAA\xFAX\xFA\xB5\x11\x19\xB8\xFD:\xEC\xDFF5-\x882\xE3\x14r\xB5p(I\xE0t\xEBN\xEC\x0EZ\xC6\xAB\xCEP\'(\xA0el\x02\xA3;\xA3w2 )\xE7\x93q\x92)\xFA\xC8\x98\x19\n\xA4\x1A@\x04\xE5\xEFN\xE2>\xD8\xC9\x1Ci\xA7\xE9Ts\xC4\x02\xA2F\xAAa\xA9\xA2\r_\xBC\xFE\xC4\xED}\xDB\xEB\xBF\xFD\xD7\xFF\xEB\xCDw\x9C\xC2\x0E\xDD\xDA\xED\x9Fr\xDB\xED\x1F\xF4cg\x9E\xD7_\xF9s\x9B\xB3}w\x1A:\xA8\xEDV(n\x05\xB0\t\x8BM\xD8V\x8BI\xE8\xEA\xF1\tb\xDF\x97\x9A\xA1\xCC\xA33\x93\x0ES\rF\xCC\xB1\x88X\x82\x99\xC7\x15\xCC\xD0\xA5a\x94\x01\xA3\xD0\x97M\xA16\xB3\xECF\xCF9P\f\xA6\x16\x88\xA9\f\x8C\x88\xE4\xBD\x98\xD7`\x7F\x83\xE7<\xD8_\xC4A\x04\xE1f\xAEBz!$\x18R\xAEl\x93\xE4\x96#\xC0`&\xDA\x02<F\xBF%\xB2\x99\xC61T+\x8AD\xFF\xD3\x80(\x1E/)\xD8q\x0E\xCF+}\xFB\xEF\x8C\x7FPa\xEEB\xBAg%\x9E\xA7x\'\xD4\xC7\xA5\x19\x97\xA1\x931\xD6\x7F[\xB9\x7F\xF9\xC3\xCA\x98"\x7F\x83\xB1\f~\x1F2\xA9\x959\xB0V\xECC\xBAz^\xAAaL\xE5\x8E\x1C\b\xCE\x81\xAE\x8E\xD7\x19\x1B\x99%\x8FM\xEC\x04\x9C\x03\xFB\x0B&Z\xFB\xAA\xDF\'\f\x1F\t\x0Fn\x87\xB0\x06U\xE8\xA5o\xF9\xB9\xF1\x83\xAF:\xF3\xB6\xCF\xBC\xFD\xF6%\xAB\f\xE7o\x9D\xFF;\x17\x0E\xEF\x993d\xF8\xCEl\x9C\x9A\xBD\x10\x0Bk\x86o\xC3\xA6\xBEc\xA2\xD6\x18\x05C\x10\xA3\b\x06\x15\x8C\x98a\xC0\x1A\x96\x1E\x81(\x18\xB0\xC4\fC\x91\xA0\xDD=\t\x8CAXj\x91\x82\xFEoS)v\x062\x82D\n,\xEF\xA6\xE5\xBB8\xE1\'\xAA\0\x02f\x92\xF0(\xF9]\x8F\xB6\xA2\xAE\x02\x0B\x1C2\x83\\D\xE0\x11U\x14\x1B\x82\x04\xE4,\xFAz\xA0\x8D\x0E\x15\xF7\x8E\xF8\\M\xD0\x84\x12BK\x98\x16\xA0\x16\xFA\xDD4\x80\xAD\x9B\x07\\Jz\xDC\x07\x04\xB1\xFF\x82\b#L]b\xD1\xC5\xC8\xEB\x8A\x14\xA7}C\xE3\x1B_2\xE7\xDC\x9FS,t\x98u\xAD\xC2\xD7F{\xC0\x04\xEE\xFB=z\x95\xDE\x8A\xCC6\xF4\xCF>\'\xA0F\x11\x92\xBD\x95k\x1C]u@\xB1\x8D\x9D\x16\x95\x96\xD7\x07\xE2\xA8\xCFE$\xE2\x89W\x05E\xD8\x89\x82pG\xA2\xC3\x18E\xA5x\xCF\xA0\x8C\xF1W\x1BFm\x87\xA6\xB1\xB5\xEB?3?\xF87o\xF8\x1D\0?x\xC8\x13\xEE`\xFB\x92\x10\xC2\x07\xFB\xA5g\x9F\x87\xF3\x9E\x9C\xBBW\xDC\xB9\x8D\x12\x7FS\x80/B\xB1\t`\xA1\x8A\x85\xA2dC\xAA\xA3\x03\x8FPT\xC5(\x03\x14\x1B\xE8X\xF3D#\xF3&\x8ChX\xAAI\xF1\xAE\xCD\xAB\xE6\x99d_\xC2\xD1\x02f\xFEo\xC3\x12\x9Em\t\xBE*\x93\xD8d\n\xE9\x04#q\xD2n\xD1\xCAw\xB8\x141cf\x84\x15O$\xB3\xC3u\f\xE1\xE2\xD4\bw\x96\x8C\x1Ad\xB90\x15\x87\x9C\x02f\xE0e\xB5&\x01\xEB34\x88\xBB[%$9\x17\xAC6\x97\xF4T\xBE\xC2x\xC9\xF0\xEC6E1B\xD5\b\xB6!\xAB\x0B\xC3\xE6cD\x93\xAC\xA9\xE2F\xB6\x88\xD6\x14\xAA?\xB0g\xF2{(w\xDE\x85\xC0jQ\x02\xDC\xB7\xA2\x81\x90\xDC\xA0}\x87\xA1\x11{n\x1F\x0B\x03\x83\x9A#\x9BT"\x8Da\x07\x83*\xE3\xC1`\xE5\xDA|\xAE\x12\xAD\xC0\xBC"\x82xV\xDA\xA8\xA6.a\xF6O\x81\x91q*LG\xB7\xE7\xE1x\xD8\nbp\xC4\xA1b\x1E.D\x86)\xEDSE\x88\x04_\xA2\r\xC4\x9F\xA7\xB9\xDD\xA4\x03\xE8&\xDA\xE4\xD2\xBF}\xF2\xD6\x9B\xFF\xE8\xEC;H^\x87lG\x8D\x10\x0E\x8E\x07\xE4\xB9[\xBF\xF5\x82O\xCC>j\x05*\nG\xBD3\x1B\xF9\xE1>(\xF6B\xAC\xAA\xA1\xB8\x9C\x8C\xC9O\xAE\xD9\x9D\x19\xA8\xAC{\xAC@\xC2\xCC\x0E\x9B\xF8\xCE\x97\x80\x06`\x869\xA6)\xCAF\x90N\xECB\x9Em\x0B!\xCBm\xB0z\x12\x1Cm\xD0\x1A\xC1\rh\xD3(\xD9\x9D<c\x8E\xDC\x1D\xA9\x13\x88h\x12\xDDBw\xB12\x9F\xBE\x18\x05\x98d;\xD6\xB8\x02\nD\xB1\x85\x12\xF1\xF9P\xE4vq\xD4\x975\xAE\xB5\xFA\x86\x9Cg\xFF$(\xE7\xDAYI\xAC\xBD\xE8\xF7\xC5\x10\xA6\xD9\x8B\xDDXR\xDF\x16 \xB6z\xAB\x83\xD3\x01\xAA\xCC\x98\xD4r\r\xAF\xBF\r\xC4\x19\x1E\x99\x9A\xEC.ak\xC8\xAAH%N\x81\tv%\xEE\x80\x86X\x80\x92\x1Fn\xD4\xE5\xA4\xF2\xF9\x90\xF3=\x19W\xDA\x14\x18\xBC\x94\b\xAC\xB8E\xA5\xCCQE\r\x81\xFA,z\xC6\xFA`\xCE\xF9r\xBA\fx\x19\xF8\xBA\xD3\x88\xA9\x006n\xBD\t\x07.\xFC\xCB\x17\xE8\xBE\xEB\xBECN|\xD0Q\xC1\xF5\xA3f\b\xEF\xD3\xCB\x7F\xF8\xD5\xF2\xBAG/fGu\xDF#j\xACy\xFBE\xB5\x92k.K1Sc\x0E#hS\x104]\xC7\fs\xABQ\x80\xE6q\x063\xE4\x9E\t\x06\xD3US\xBFVm\x18\x1B\xF3\xE5\x93\xC97\'\xF4\x91\xFA\xB9KK\x0Bc\xB5\x85>\x03C\xA5\bBSG\x16g4\r4P\x02\xDC\x1E\x1E\x80I\xE1\xCE\x85H)\x9C\x069\xB35y\xAD(\xC9\xFEke\x9F\xEE\xC93\xA2\xCD%\xAE\xC4\x9A3)J\x15\xC5I\xA6y\x1C\x02\x17Z\xB7\xE3\xDD-i\x1D\xE2^\x8D\x18\x86\xAF\xE3\x1EFK\xB0\xB2\xB2G7\x9AV\xA3\x163\x81\xB2\x86=\x07\xA1\x86\xE0\x8Ad\x81\x1CSm\x1AI\xD9\x18E\x17Xm\x87\f&\x120%\xD9\xC3\x9F#\x18\xAA\xC2n\xEF3\xEEns\xC1\xCA\xCA*K \b\x1D\xA0\x92F:\xCFRh\xDE\x07\x03\xA6\x9C\x99\x91\x17\x84\x17\xC1\xA3E3\xA2\x81\f\xD7\x82\xE8\xC9\xBC\xCD9>B=5]\xF8n\'\xA8\xC3\x99e\xA8"\xFC\xCC\xE7+\xAA\x85\xBFwn\xC2\xCB\xB9#\x0F\x9F}\xE8\x9D\x8F\xDE|\xDB\x1F\xFD0\x80\xBF\xC0Q\xB4\xA3R\x19\xB6t\xFF\xF0\xDA\xC5\xAB\x9E\xFB\x99\xB5O\x82\xE9C\x99Nt\xD7\xB5-\xB1\nK\x9B"\xD8tMo\xE9\x8C`[\x1A\x16\xB2fFDI5`!\x16\x94\xB4\x80`)\xE2\xC7\x868Gai\xCE\x195oU\x91\xBA\x0E\x18\xB5E\xD2\x13\xD0\xD0\xB5\xA1\xAB\x17\x19\xE1y@\xE6=\xA8\xB8\x1Ab\x7F\xA32\xB8)\xD5\x89\f\x9Dr\xC4\xD0\f\xB5\xD0gR"-\x10!\xC4\xC5\x86\x91(\x03\xF9\xBB\x1B\x1D\x99xcp\xD9\xD5\0I\x88*Q\xC4\x83Q\x1D\xEC\xCEJ\x8F%\xC6)\x85[\x985\xD8\xA8>P\x1D\xA9R\xD4\xFF\xFC|\xA5\xAD$\x1A\xD5\x02S-x?\x86\xA5\xF3\x98\xF8^\x16i\x0Ba\x02\x92\x87\x93s_L^\x13\xA1\xDA\x86\xDC\xC2\xA8\xE9\x89E5iI&\x04\x98\xFFf9\xBCz\x7F2f\x9E7\xE4\xBB\xE0\xEFJ^\xC4\xF7\xC5\xC7\xF4\xF7\xC1\x94xJpE2\xE7\x89\xD4\xF7\xFB3\x97#\f\xB1+\x06O\xE5\xF6w\xAE*Z\xAF`\f\x07\xC3\xBB\xD6\xB6\x0E\xA0\xBF\xFBo\x9F\xAB{\xAE=*\x0F\xE2Q!\x84\x8B\x97\x97<\xED|\xFD\x8Bo\xF6G=\x9A.\x8E\xBA\xED\x85b\xB7\x96\xDC1q\t\xACs,\xB1\x86\x19\xE6X\xAAW\xE8\xC1\f\x03f\x18\xA9\x97\xAAy\0\xA8\xC7\x0BfX\xC0\xCB\xA3\xA9\xEB\xB5B\xC8_\x89\xD9\xEC\x0BT\x03h-\xCE\xCC\xC9d\x02\xAA\xD6\x87*U\x10[l#\xA6.Q\x84\xA4\xA1^\xAF\xC8\x1C\x87\x1E\x92H\x84\x8B5-\xD8*\xC4\x14\xB9\xA0\x01\xF8\ne\xBCCK\xD5W\xE9\xEB&a\x02\xDA\xE7\x81dW\xDF\xA1]\xE7\x12H\x11\x84\xCB\x05\xE9g\xD9\xFF]\xC2\xC7\xBD\xBA\xDF\xA7\xBB\xC2TC\x1EaRXH\xCC\xA1\xAC\xB4<\x17\xFC\x9DF\xBB\x94\xC1\xC4R\xA6n1\xB88\x8Dyv\xFD8\x91K\x19\xFCS=\0<\xCFK\xAE\x03\xA6b\xB0\xA8\xCC$\x9C\x98\x90\xDF\xDF\x99\b \xA3\xDB"+\xE2(\xA8\xCB\xE3\x13\xD2\x80\xE8\xEF\x03\0d,9\x14n\0\xAE\x8C\xBE\xC4P\xA8_?\xD9\x87\xC2_M<#U\x11g>\x82\x86\xF9\x15\x97|\xF3\xD6\xDF\x9E\xF74\0\x7F\x86#lG\xCC\x10Tu\xF8\xD9\x83?\xFB\x9C\xEB7\xAEu\x18tH5\xE7.i\n\xDB\xA5\xE9F\xB0(+\xA3\x18\x07\fXC\x935\xCCt\x0E\x11&\'\xCD0b\x86&&\xD1Fa\xDC\x80y\0F\xD0\xAFN\x1F\xFEDi\0`\x1E\x0B\x11[z45\xD1\x7F^\xD1\xC1\b7zQ\xAATKsi#\xEF\xD7`\xBEeg\n\xE1U\xD8\x01\xDA$\x18\x15\x02\x86*\x9A[\xF0\x94\x12<\x16\x14U"\xE4o\x023B1b\xAF\x19\xB3b\x982O\xC9O$\x07z\x16\xC8P\0\x90qu~v5@5rv\x92\xD1\x95\xA8\xC3\xB8~\x063B\x1B4\xAE~\x87\xD8iZ\x19\xAF\x90\xCCJ\x99\x02\xDD\xFD\xDF\xD8\x9B\xD1G-\x95\xC1\x98\xAD\xC0\xC2\x8E\r-51U\'\x8B\xA0:\xE3\xB5\xCEB\xFD\tB\rX\xCF\xC2|~\x8C\x84\xA7\fX"\xD3HT\xA4|n\xC9\xFB\x90)\x88o\xFAjU\x92\xB8;\x15\xD5\xA0\xCA8\x874\x8D\xF5\xC1\x18\xEC\xA4\x80\xAD\x8F\xA8\xDA,\xBA1\xB3\xF9\xD6\xAD8\xF8\x8E\x0B\x9E\xA3\xDB7\xBEF\xD6\x1ExD\x1B\xBD\x1C1Cx\xDB\xF2\xA2\x1Fy\x03\xDEpV/n\x97\xBB\xBBmA\xB0G\xD4\x03\x96\xB2\xCAQ\xD3\x01s\xCF#\x98\xC1\xCA\x9C\x8D\n/\\".\xF7\xFD|e\x88q\x03\xD3\x91\b\xEBI\x9C\xDDa"\x11C/\x7F\xB4*\xAB\xAB\x12Le\xEEE\xD7\x0F\x1D\x15\xA9Tqy4\x80\xC2\xDA\x9B\xBB\xABVtT.\x8E\tq3\\9"\x1A+|\xAF\f\xC5\xDF\x8E\xD6s)I\x9Cx\x18z\\\x89\x19(v\xDA\xB0F\xF8\x93d\xB7\xF1\xC5C\t[q\xEDY3\xA2\x11.\xF6\xC8\n\x94\t\xAA\x91\xB8\x7FYM\xD2\x9Cq\x90\xE0Sb&\xFB\xE2x\x14\x19i\xC99\xF0-\xE0\xE8^-Oa\xFD\xF9y\xB1\xE9m+D\xC9q4\xC4N\xCF1A\xEE2\x8C\x99R\xD8\x96\xF1d\xC8\xEA\xF3\xCBq8\xEAP\xB1\xF3\xC2>\xC0s<\xE9I\xC9D\x15i\xF4\xE4\xA9\xE5])\x19d\xFE\f\xAA\x12Dm\0p\xE5\xFB\xCF\xDA\xFC\xAB?\xFE\x11\0\xAF\xC5\x11\xB4#b\b\xB7\xEA\xA6\xFC\xD2\xE6\xAF\xFD\xDA\xB5\xEB\xD7q\xCAA\x18ww5\xF5\xFB\xEE\x85`C\x05\x1BX\xC3\x809\xE6\x98a\x01\xC16\x18\x13g:\xF3\xE8\x8C\xC2T\x06\x8F\x13\x103\xD4u\xD0v\x90\xCC\x80\fB\xC5\\\x7FZ\xCEcP\r=\n\xC6\f\\\xCE021\x10\x85\xDB\x1E\x94\xB5\x18m\xC1\xD8\xB5\x8C5pfA\xD7\xA0/\xA4\x88\xD8\xA3\xF4p\xC6\xA4Z\xB2\x8Cb<izk\\\xE4\xB1\x80\xAB\xC4\xA1k\rf\xA8\xF4Eg\xC2%\xD3\x95c\x92)\xD0\xF3c\xF9\xC4\xB0j\x85p\xFF\xC4\x02\x84\x18\x1A\xADN\xC4y\xCC\x19B-G\xC4\xBD\x16\xE3\x86\x03"\x9BR\xB8\x1D\xBC\xC6b\xCF\xC1\f\xC8\xA2\x02\xF4| \x18\x8D\xD0c!\x85q\x88\x13\xBD{J\x8CQ\x15C\xA2\x1FWe\x9C\xAC1\xAExVN\b\xFC\x19B\xFD\xD0\x1CK\xBC\x1FH\xCF|h\0\0 \0IDAT2)\x7F\x7F\x1C<\xBD\b\xBC\'g\xD9kn\xE6\x032\xE4\xDC\xFB\x0EF?\xB5\xD5I\xE9)z\x14`}q\x10\xFB\xDF\xFD\xE6_\xD3\xCD[\xFE\\6\x1Ep\x87I\xF4\x88\x18\xC2\xC7\xFA\'\x7F\xE0\xAF\xDB_=bl\f\xC79vm\x84`\x0F\x04\xBB\xC4\xEA\x1C\xCE0\x83e32\'\xC1\fg\xAD\x18\xEBf\x10c\x10\xC8=\x16\xAC@\xAB1\x91\x11\xE9\x11\xC8\xFA\x04<f\x9F\xC7X\xE0R\0/\xE2Md\xC0\x921\xA4\xD0\xFF\x1D9\xB0\xCA\xD3\f\x82\x81Y\x8F\xD5_\xAE\xE2{\x01\xB4\x82\x10\\\xAD\xE0\xFD\x1A\xDC5V\xAC\xFC(\x8CB\x90P\x14\xF9\x9B\xAAB:\xDD\x96\x1A\xBF\x1B:\xF1\x05\xC8 \x1F\xC2__\xBC\x11\xDE\xCFE/.\xF5\x8A\xCBW\xD1\x80\xD6c\x1Cy<%\\\xF0\x83\xC2{\xF2\xFA\xCA\xEC\x90D\xEEscS(\xC9T\xC4\xC4Q\xE8\xE4\xA1V\xA1\xF4SB\x96i\x83\xC12\x99\x02\0f\x1F\x16\xA3K\x19\xD8*j`\xBF\xC5\xE5\n\xF3\x10\xE5\xFE\x8E\x95<\xCBg\xAA\x0F\x15!\xC5\xF7\xBE\xD2o\xB9\'\xDD\xB5\xDEO0\xDA\x95Qq\xB8\xCCg\x99\x7F\xE4\x92Gl\xBE\xF5U?\0\xE0\xAFWO;\\;"\x86\xF0\xEA\xCD\xD7\xFE\xD2\x17v}z\x02\xBD\x8E]k8 k\xD8\xA3s\xCCd\x869\x1A\xE6\x180s\xA8O/\xC2\xA8\x1E\x13\xE0\xDF\x850^\x8C`\xC3=\t\x16S\xB5z\xCC3\xA4=\xA0*\x1C\xF4H\x88\x87(CX\x8E\xADM\x18\x87@0J\x95\xE3l\xCC\xA5\xABe\xC1\xEDy\xF2\xAF\xC0X\xBF\x86\xE7\b\xA6n\xCEC.< \x98\xCB\xE4\xFA\xD2\'\xA5\x1E\xC7\x1A;9\xC5@\x9D\x89q\x0B5Bog&\xC9\x07\x8A\x8A"\x15\x0Ep1S\x15J\xC8\x1D\xDF\x05\x98\xD6\x13 %\x93\xC0c\xA0S\xE6P\xFA\xB1\xCAHb\x04\xC9\xB4n2\x8D\x89\xC4\xADh\x96(\xCA\\\x8F\x10xl\x1D\xE7\xA3>W%\xE0\xAA\x96\bl\xAD\xAC\x14\x0FV\x1ASW\x86\x8BJ\xF0\xE5\x84>\x94gc\xFF3djt\xB9\x07U\x03E\xB9o\xB6:C\r\x82\xF5\xAD\xFD\xB8\xF5\xA2\xF3\x7F\tG\xC0\x10\xEE\xB0\xDB\xF1\xE3\xFD\xEAG\xBEux\xD3\xD9KYB\xCB\xFF\x8EE3\x0B\xFE\0\xC5:\xF6\xA0a?f8\x88\x01\xDB\x10l\xA3a[\x1A\xB6\x01l\x01\xD8\x86E$.\x01l\x0B\xF7o\xF0hEa\xF8\xB2\xFD\xD1\x9E\xABJ\x97\xA2\xAB\x12d2\xA8\xC1K\xB5fB\x8D^l\x81:\xF2x+\xE7\x0F\x18\xDD\xDB\x11\x05R"\xB1I\\j\t\xD0\x9C i0\xEC\xEE\x92r\x03\xA9%\xFA\t\xCCHg.B\xEE\r\xD1\x99\xF3\xD0\xFC\xCFU\x17\t\xB7\xA0\xF5),\x0E\x02\t\xF7&\xC2\xAB\xA7N\x93\x19\x89g\x11\x84\x8C\xA9\xF0\xF14\xAB\xC0\xC4\xF8\nV\x84b\xA2T\xBAS\x19\x88\xD5\xC2\xE8\xCB\xF8~i\rh\x12\x02^buq\xFC\xC0D\xAD a\x85\xEE\xEF\x7F\xF1y\xC8\xF9\xEC\0m.dzT\xEF\x10\xEB\xC8\x9F\x85\xE4P\\\x83\fI\'z\x8A\xF8\x01\x97\xDA\x1A\xE7\x0Bv\xD6\x93l\xD8\xC1\x94\xE3\xB3\xC4\xDC\x07\x02,\x11\xA8\xF9"xIA\x8C\x8C\x8E\xE4\xB9\xEA\xE3\xAA\x81Sn\xBC\x1C>|\xF9\xD9\xE3\xBB^}\x87\xEB/\xDEa\x84\xF0\x9A\x83\xAF{\xD6G\xD6?\xE4\x93w\xD7\x84*\xDF\xB1F\xAEi\x05D\x972\xC7\x1E\x15l`\xC0L\xE6\xB0\xC0\xA1\x19\x06\x190x\xCA\xF2\xB6\xFB\xB3\x1B\x06,]\xCF\x1EP\x8D\x84%\xB6\xC0\x89\x19\x11b\xEC/\xCB?\xB7\xA4\x98\xF2?#\x06\xBB\xD6j9u4,]M\xD1bl\x14HT\x8B\xEER\xFAP&\xD3\xF8\xBD\xB9(\x14\xBE\xD8J\x04\xA2\x87\xAE\xDA\x16WC\xAA\xB3\xCD\xB3\x02C\xFAJ\\_\xAB;\xD9\xFE\xD9U\x1E\xDAB\xCA\xFD\x1E\xFDwJ\xFBf\xC4\xA4]3.H\xD2\xA1G_\xF8\xA1\xE5\x83\x93\xB8 \xA1~Qv\x15\xD5\x80\xD6\fvG\xBEB\xCFc\x85\b\x01@\x19\xA4t8\x99\xE4\xE1\xDE\fr\x9A")\x1F\xB5\xD8;\xB0@\xDB\x15[\x06\xEF)\xE4\'R\x0EW\x14\xB4\x82\xCC\x82\xC9{\xB5\xA4\x89)\xB9\x8Ew\x8Ax\xD4\x03\xCCRm\xC9\xB9\xCBHF\xAEI\x18\xBA\xD1j[\xC8!e\xAE\x06\xB0~\xCB\r\xD8\xF7?\xDF\xF4,\0?y\x98\x99\x9A\xB4;\x84\x10>\xA7\x9F9\xF5\xA2\xE1\xA2\xA7\xF5\xB6<D\xB2\xC5\xDD\xDD\x1A,P\xC5j()\x1A\xF6\xA3a\x0F\x06\x1CD\xC3\xA64l\xA2a\x1B\rK\x98\x91q[\x04\x0B4,\xD0\xB0\xD4!*7/a;D-1\xD81\xFF\x1Ba\x9E\x83Q%\xBE\xDB\x06\xB3\xE2N(\x1A!3\x16>\xAB0\xF38\x02Ce\\\x82\xEC@\x12,\xE3\x82\xF8\f3 \x8A@=?\xA03\xAB\x90\x01+2\0\xADAZ#]\xD9\xF9\xB1x\x1A,\x04\x9A\xEAAap\xDE\x17\x19]\x81\x04N\x9C)\xBD#8F\x9A#\x11{F"+\x8D\xBE\xAC\xD8LV\x8F\xAE\xFD\x16U\xA8d;\xC6_0\xAB\x1A4\xC51\x94\xB1\xC0\x88\x9B\xD7\xB115|zO\x9F\x94*\xA9\xCBsR\xC5\xD06C\xA8\x07\xBC>\xE2=*\xE3\xF79.\xEF{\x95\xA0\x03\xADL\xA4\xBB\x8F!\xCA\xB4U\x02\'\x1AA9\xB7\xF1e\x96\xE7\xA9\x81JD\0\xF5y\x15\x99FM\x04\x91c\x12\fh\x9F\xFC\xC0\xD3\xF4\xAA\xCBO\xC5\x1Dhw\b!\xFC\xED\xF6\xC5?ua{\xD7F\x96!96\xCD\x8Cj\x1E=\xC7\x04\x19X\xC5"C\t\xCD}\x0E\x19\xC1\xD8\\j\xE7&.$\xCC\xC1\xA59\x8D\x89\bb\xA6\rB\xD4\xE0q]\b\xA6B\b\x96\x0E\xE1\xE8A\x10 \f\x8E)u\x1D\x11\xB8[\x12\n4\x87\xEC\xA3/\x9C\xEER\xD8\x02\xAC\x9C0Cof\x8C\x81C\xC4\x80\xA5\xBE\t\x8D\xB2\xEC\x1A\r\xA1@\xC1\xDD\xDE\x97\xBA\xF7.%\x8F\xC8\xE0k\x89\x12\xDB\xA0u\xF3\xEB\x1DX\x17\xC9\xED\xA8#\x10\x93\xAD\x82Fh\x1A\x02\xD8-\xFF\xF5\x9D\xB5\x9Ee\xD1\xC4;\x8B\xBF\x0E\xD1\xB9I\xBBncQ\xD7\xFFm\xF8\r\xDA\xDDU\xE7\xAB^\xD0l3Z\x12\x1F\x91\x07\xFC\xDF \x8AUi\xEF\xCF\xAD<\xDF\xF2\x1D\xC2\xDB\x02\x84qR\xDD0\x87.\xE6\xFB\xF7\xAEl\x95\x8C\xD0\x88_h\x85\x10]4\xA3\xC16m\xB1\xF1\x87]#\b\xDE\xCFS\x18Qw\xD8<0N\x82\xE7\xF0\x9A\xE2\x16\x15\xF5\xFE\xB8\xDB\x16\x8D\xC0\xBD\xC73\x11aj\x17HW\xB4q\x81\xF5O\x7Flc\xFF\x9B\xFE\xF8\xA7\0\xBC\xE00\xA4\x15\xEDv\x19\xC2\xD6\xF2@\xFB\xD7\x8B_\xF8\xE9\xAD\xB5\xBDH\x7F\xF7\xB1jU\x82\f\x93\xBFmi\xB8Q\x15\xEB\xDA0\x97\x86-\xD7y)M\xA2\xDC\x89\x13\x961\x8A\x04\xD1\x91\x81H\xE2\xF2\xF3\xA8\x0E\xD4\xC2 \xEA\xC46\x80\xB6\x06\x7F\tN\xB0\n\xEE\x1C\xE8\x88@H\x10\x8C9K)\x93\x9E\x02\xC5\x10\x9B\xC6\x12\x99\xB2\x10k\x03\x03\x9D\xD2Ah\x8B\x9D\xC7\x03\xE2\xFB\xFAa\x90S\b\xA0p\x11\xB8z\x000\x04\x01\x88s\x10\xC7\x11gec\xE4\xBCS\x07b\xB7e\xEA2A\x1C@\xD8\x97\x18OP\x02\x9BHaY-\xC8]\x80\x11}\xC8-\xD58\x1E#B\xEB;\x0B\xBA\xA0\xE4E\x04\xC3!\x8C.\x1B\xD1N\x1F\'\x1F:B\xA4\xC3\xE0gk,\\\x84\x84\xFB\xCED\xECJF \xFA\\2\xDD\\\xBB\x07Ka\xF2{DG\x06\xAA\xF1\xBE\xAB1\x95\xEE\xCBp3R-(\x88F+\xB3@\x9E\x17\xC6S\xFF\x8Dh!fE1h\x07>|\xE9O\xEB\xDE/\xBEH\xEEw\xF2m\xEA\xFB\xB7\xCB\x10\xAE\x18>\xF1\xA4\xBF[\xBC\xF5\xF4\xDE\0\xA0\xEF\x98\xE3\xBB\xAFQ:\xCE\x01\x9D\x81\xA9\xBB\xB99\xEA\f\x0B\x01n\x15\xB3.\x18A\x0E\x98\x17\x83\xE0\x82\x84\xAA\x1E\xB4\xE4}2\x8Dut\xA2[B\xC0-\xE0\x1A\xEAn\xD3\xFE\xAA\xD4<\b\xCB\x88\x104\xF7\xE6\0\x17dRC\x953\x17"\xD3PZ\b7[BL[\xCE\xBA\xC7\x11\xB5X\x16\x14mF\xCCW0\xB4Rc\b\xA8\x1Ad\x16\x9F\xF9\xD4\x9B\xAB\xA1I$<>\r \0i}:\xEFQ\xE3P\xDD\x80\xEF\x96tqw%\xD1\x86\xEAd\xB9F?\xE2\x01J<&d-\n\x0B\x97\xE4\xD8\x8C\xE0+\xE1\x9A\xFA\xE4\xDE\0h\xCE\x0BLR\xAA\xBB\x1Fm\x88C\xDC\xDD\xEE\xC5 \xA2\x8E\xF0\xFD\x0B\x90\xAEK\xB7~T\xC3\xDF!9e\x12\xA5\xACfY2"\xB1\xAF\x9C\x1B\xAB\xA5\xA0\x178\x93\x88w\xCE\xE1\x92q\x14\x84\x03gT\x93\xEFd4dF<V]\xAB|\x17\x1C\x8F\xA1\xBB\xE1\xC3\x1F<}\xEB\x9D\xE7?\t\xC0[q\x1B\xEDv\x19\xC2_\x1D\xB8\xE0\xDC\xCF\xAD\x7F\n\xC7\xCA\xA3\x90-\xE3\x0B&\xBB(\x17i\xDB!\xB8\x19\x8A\xB96\xCC\xBC\xE8\x063\xD7\x07\x15\f\xD2\xB0\xD4\xC8\x96\x8FpUb\0\x06+\x8D\x92\xB6\xF4\x8E\x16D\x1D\xDF\x85F\xC3|\xF9\xE6\xAC\xE4&\xB0\fE1o\x86p\xFB\xB5\xE6\xEA\x853\x8D\x0E&#Y7m\xB2\xA0\x04f\x85\x07ha6!\xCB@\x19;G\xDD\0\x99\xB1\xF3\xD6\x99]\xA7\x11Al\x8Bgp:3\xA6\x91&\xA96]\xC7\x94\x80nL\x14\x1D\x9C\xE2\xB8\xD0lQ\xA6+\xD1\xCEW\x12\xB8z\xBF\xCCk\xF0p\xE90\x12v\x89\xF8 \xBB\xB4\x85!\xCC\x1Em4\x03\xA7\xC0\r\x9D\x83=\xB5\xAA1\x8E\b\x02\x82\xABt\f\xA1\x97\x82\x12lL\x89\xA5\xEA\xD4:\x1AQ\xCFbd9\xF8|\x14\xFE\'\x99\xF8\xA4\x93\x16\xCFaII\xEA|\x95\xBFs\xD2\xF3\xA6\x96\xDA>\xC6\x1C\n\t\x9EHG\x99\xB3A\xA9\xAFN\xE3\xBD\x80\xAA\xD5~\xBD\xBE$#\x1C+\x8D\xBA\xAA\xC8\x9A\xA3\xEB\xCB\xFD\xB8\xE5\xC27\x9D\x8B/\x85!\\\xA3\xD7\x9Dt\xEE\xE6\xB9O\xEDm5\x93\xF1\xEEW\x1C\x04\xBE=\x19\xB7>\x8F\xB7\x9B\xC6 \x95\x86\x05\x06|\x11\x03v\xA1\x99r!3\xCB\xCD\xF3\xAAI\x83\xDB\x06b\x03\x14"\x044\xB0\xB8i\x0B\x84\x90\x0E\xB6\xE0\xC3*\x8E$\xCC\xE0\xA3j/\xBBF;\xDA\xB9C \x03\xAB\xC8l\xE3\xED\xA0{\x8D9\x11\x88gY\xF2\xEEb(fbd\xE2i\xA17\x0B&\x1B\xBF\x86[\x8D~\xF4B\xE1d\x1E\r\x99\x0B\0\x97\xAE\x15\x89D\xD3\x89\n\x10\xD6mF\xFD)-\xFCIx\xB9:8>\xEFg\xD2\xAF\x13\x06\xC7O\xA9\x06M\xA9\x1D\x1D\xD5<\x01B\xEC\xACM\xC0\xE4&S\x97\xB4\x9C\xEB\xF7Q\x14\x86UU\xAD\xD2\xBF\x02\xCAd#\x12\xDFd\xD1\x89?\x7FM\xBEb\xAA\xB2\xA3\x96\n\xD7\x0F\x19qE"g\xFF2\xF9=\n\xB8\x06\xA6j\xE5x\x99\xA7\xC9q&b9\xE3\b\xF5&\x91\x8D"U\x07\xAA8kW\x7F\xF8\xA9\xFA\xF9\x8F\x9D$_\xF5\x8D7\xE30\xED6\x19\xC2\xFF\xDA\xBE\xE2G\xDF\x87\xF7l\x88\xCE\0\xB9Sw\x8C:\xC2f\x15\x8F\xB8\x11+K\xA21;P\x95\xB6\x02\xB3\xE8n\x8Ab\x8F6\xAC\xC9\xCC\xE2\x15\x15\x18$}\x01\x10\xB5]\xA0}\xF1\xB2@\xC6L@\xEC\0q\xD4\xD0a\x1E\x07\x06%\x8D\x92R\xA3\x01\x101\xCF\x04\xB9;\x97g\x87y(\x06\xB4\xA0\x91\x80\xF9HGT\xDE\xD1\x18\xC4\b+Y\xA2M`{1j\xBA#\t\xFF\x95R\xCF1\x85\x1B\xB7\xB4\x19R\xE0\x1Aa\xB5\xA4\x88e\x80\x86kR\x89>J\xB3{"U\x0B\xA1\xDE\xCCPe\x01\x0B\x1D\x87\xFBs\x82\x12J#4\'\xDD\x13\xDD\x88B\x86\xF2\xA3\xDFk"1\xC3m\xD7\x91\n[\x81\xF0\xD2`%\xD4\xFD\x9C\x1D1\n\xF53\\\xAD \xF3\x17d\x895\x87\xE0\xF5\xBB]Q\xFE\xF1\xC8N\x9A\xF2\x83\xD1\x19^\xA4*S\xDFh\xBD\xF7\xE4_\xA2\xB4\x18\x9F\xAFY q\xCC\xAA\xCA0Q\x1D\x14\xC9\xDC\xE2\xE9l\x8D\x94\xBD&\x0E\xD5T\x15\xC35\x9F\xDC\xB8\xF5/\xCF\xFBQ\0\x7Fx\xB8\xF3n\x93!\xBCe|\xEB\xD3\xF7m\xDC\x8A.U\x8B\xBE\xBB\x1B_d\rr\xA9\x93\xE6\xA4F\x03\x9C\xBB\xDFn\x11\xC5\t\xAE&\f\xD20\x87\xA55\xCD\xB5\xC4\x1C\x88\xA4\xFB\xAC\xFC\xAE\x1E\x13\x90\x11\x88TQ\x10\xD2\xDD\x18\xD1,\xDCf\xD3\x94ic2\xCD\xEF\xD1\x8A\r!\xAB)Q\xEE\xD4c\xF463\x10\x88l$\tz\x12\xAB\x0F8<\xA5A3\x99\x1B\xAB\x1B\x07\xC4wv\xC4\xFC\x88\x80\xC1&\xFA|\xAE)R(\x95\xED\xB70\xA4z\xEE\x83m6\x83P\t4\xA4\xA3&\xBC\xADR\x9F\xF7\x86\x16T\xE1\xC3\xEA\xE5^\xE1?K\xF4!A@=\xC7\x05\xD7/te\xDC\x05N\xA7\xBF>\xF36R\xF7N\xC9\x9E\xDB\xB7\xAD\xA2`#D\xFA\x9F\x02\xB2+@+\x7F\xC6\xE4Ti^\xA4\xBDq\xD1r\x1FC9\xE6\x1D\xA0\xFA@\xA3$\xC7\xE1\x8CC\x810pr>\xCB\xBA\xB7\x90mu E\xEF\x8E3\x07N\xA3??\xA7k\xDE\x17\xD8\xFA\xD0%O\xC7\xD10\x84\xEBu\xDF\xC3~x\xF3\xA9\x8F\xEF\x93\x82\x95\xC7\xA25\xE4\x8E\xC0\xB5\xEA\x11an\x81\xD6\x85\xE3.z\xC3\r\xE2\xFB.\xA9:B\x80o5_!\xB9\x873\xD3\xBD\x07I}0\x8EcBLD#\xAC\x8A<C\xCD\x8Bp\t\\\xDC\x91D\f-\xA4\xA4\xF8{\x9A\x16+\xB1:\x07\x95\xE1\xA1\xC0k\xFF]\xA6\x0B-\x17_e\x1E\x88\xB1&\x13\x91\x102\xA1s\x9Ae\x91O\x97:\xBD\xF0?\x89\0\xEC\xD2\x8C\xDD\'I0/B\xBB)H\x13)jGR\xFA\xF5d\x1A\xB1\x9A\x1A"<:\x9FSs\xC9\x15t\x13\x03\xE9\x1E\xA4\x15\xDC\x87\xCF\x8A$|Jc\x1Da\xA9\xC6\x8A\xC8W\xE0\xC6\xACT7xM/\x88\xA3zE&\xC9H\xF5\xCF\x07\x14\xF5\rP\x1E\xAC0\xAENU\x87\b!\x99"\xED?vz\xEEx&\xD1\xEF0\xED\xDBm*\x93\xA4,\xAE}\x9D\x868\x93\xFF\xA6\xEA \x18>\xF9\x0F\x8F\xD7\xCB\xDF\xF30\xF9\xD6\xEF\xBC\x06\x87h\x87e\b\x17,\xDE|\xCE\xA5\xB8\xF4X\xC1\x82\xD2\x06\0\xEB\xB0\x82\'T\x0B\x8CP\xE9\xC3O\x89@\xA9`\xBA\xEAAi\xD8\x8B\x01\xBB X\xD3\xC1\xB3!\r1\x88\x133\xC9\x88\fB\x85\x92:\xE3\x16F\xCF\x94\xCC<\x82V\xCE\x99\x02Nj\xDC\x95M\x13\x94\x0E\x18\x10!\xF3\xB0\xD4lH\x8F1\x18w\xEFf\x98\x94d\x02M\xB88\x04\x16PC\xAEoz}x.T3\xE8\xC8\xE7\xA5\x92s\xA0\x064wo8\xD1\xBA$\x0F\x95As+\xB6j\xC0\x8B0\xE7p\x0F\xE6\xECW\x9BB\x8F\x1C\t\xD8\xEFf|q\xE3\xDD\f\xDDk\x1B\xC6NG\x85iA\x96\x80\x88mQ/\n\x1DK=o\x0E?f\xD5\xF3"\x9C\x89\x18O44\x1B\x8E\x826\0\xA3\xBF\xA5\x89\x04w\xA2\x9A0\xD7\n\xD5\x81\x84\xE9\xD3\x16\x01\xA0$\xBC\xB0\xC1tT\x94\x92\xE8\x8CL\x0B\x98\xAA\x15~\xA6\xB62\x9B\xFE,\xAAa\xC7\x9DVkv\x83\xEC\xC4\xC0Xb\x14z\xBE\xF5\xC9\xF8; :b\xD7\xF5\x9F\x93[\xDF\xFC\xFAs\0\xFC\xD7\x1D\x03\xC1m0\x84\x8B\xB7\xDFs\xCE\xD6\t{o3:\xF4\xAEo3\b\xE6\x80\xB8\xED\xA0J\xCFp\x99\xD5(?\x12\x8E\x9D\xD7\xB5a\xAF4\x9C\x80\x86\x990\xA2\xC0\\\x91\x83\xD7JX\x8A\x95Z_\x82\x81A\xFE_\x157\xEE\x05\xB9\x01ji\xD5]\xC4K\xA9\x99ps\xF9\x1E\xB2p\x14\xC6\xC8\x0F\xCEt<\x91I\xAA\xCA\0\x8F\xF8K5\x83\xF5\x12\xC9"\xFC\x97\x88S\x97\xF2\xFCA\x17\x93\b\xC5\x9E\x04\x16\x11n\\\xEE\xC5\xAFO\xAA\xAA\xEE5!\xCA@\xFE6! \xF5s|\xF1\x92"\nl\xCF\xCB\xC9A\xEA8y.k\fT\t\xCC\x11\x8E\x10\f&\xCDc+xx?V\x90\x154hv\x92\x10359\xDE\x01;\xA4\xBB\xF8\xF5A\x98\x9C\xA7\x01,r"Er[\xA1\x9B\xAA\n ?\xC7\xFC\xF3\x98\x14T\xE2\xFDO\xEA\x19\xF8\xF3\xD1\x9B\xA4\xD9\xC7\x04Y\xF0;]\x90q\xE3D\x7F\xC9|\xC6@\x01Y\xAF\xA1\xA2\x14\xC5\x84\xF1P\x8DTE\x1B;\xDAG/?,Ch\x87\xFA\xF1\x1A\xBD\xFE\xA1\x1F\x1A.}L\x8F\x9B\x1C\x1B\x96 \xA8nE\xFF<\t\xD6\xA0\x91h\n\xB3Eh\x12\xB4R\xEA7\x03\xD8\xAF\x82\xED>`\xA1V\x9Bq\x01\xDF\xE8E\x8Dq\xA8\n\x16RB\x9A\xDDE\xB9\x84y\x15\x16\xC2\xD8\x03\x0Fe\x96\x86\xA50\xF4\xD9\xA2!\x97:\xF3$)\xBAH[\xB8}\0\r\xC4A\x06\xC6d\x9F\xF8\x8E\x06\xAB\xC1\xC0Me2\xCC\xB9BCF\xC9\xE5\xC6-\x96\xAA\x1D\xB1\x8E%\xECX\xA4\x95\x99\xF1F\x9F\xB94d\xD9u\x0F\xBE\xF2MP\x04Y\x8A\xCDB\xA5g\x906\xC45\x93\xC4%\x8F\x8B\xC8$##\xCCI\rB\x8E=\xDE\r\xAB@\re\x0EL\x85\x8A\xE7\xAD*a\x9C\x97HP\xB50! %\xA7r>\xB9\\\x8C\tN\x0B\x9B\x165\n\xE2\xF3\x9Eu\x18i\x93\xD1\x80\xDF-\xFE\x15w%KOi\xAE\x11\xB1\xC9\xA45^\x87\xBCg\x8Dw\xF0\xB9\xB3\rar\xC5\xC7\xF9\xBA\xF2\xD6\xD8/\xF2x\x84\xB2\xABL\xE9\x02b\xB6\x19gJ\xE1\x1C\xF1Ml\xF5\xEA\x8F>F\xAF|\xEFCq\x88vH\x84\xF0\xFE\xAD\xCB\x9E\xFA\xA1\xE1\xFD\xA2my\f\xD1A\xF1\x1C\xAC,\xAA\x86\x06\x15"\x83\xBA\xE8\x10\xE7\xE4\xAEH\r\xFB\xC5\\\x913X|\xC2L\x1B\xE6\xF0\x9D\xA4=\x18H`Kq\tF X\x12\x12\xF3\x17\x8C\xB9\xA4\x8C\x1E}<FF\xA6\x8E\f\xB5\xA0\tG,\b\x82Q\x0F\xBD\rP\')o\xA8\\t\x91\xE8\x9F\xFF\x83H\xEE\f]\x02\x95\b\x8D\xCD\xB6$h\xAD\x81U\x94\xF9TF4\xD58\xD5\xF2\xC6\xFC\xB7\xB3\x90\x89\x8F:\xF2\xED\x05\xA5.\x1A\xA0c\xA8\x1D\x99.\xDDL\x15PK\xCEQt\xCB^,\xE89z\x10xucJ\xE9"\xCD\xA9\xD2(\xD0\x18\xB4#\x007aM\xD5\x87L\xDF\xCEQ\xED\x89\xCD\x9A\x8D\xB7\xEE:\r4\xD7\xE1}N\x94\x03+h\x01\x05)9Q**J\xE0q\xA2\x01DH\x85\xC6\x88\xB0B\x94\xAD\\#\x98n\x01\xE7\xCFD\x06S\xDD\xAD\x81.\x88,r\x0E%\xD4\xE5\x11\xB9[H\x99O\x9B\xC5\x12I\xD9,\xD6\x02\xB5\t\xD6\xAE\xFB\x82\xEC\xF9\x9F\xE7?\x15\xC0\x7F\xC7J;$Cxk\x7F\xFBS\xB6\xE6\x07\x8F!3 \xF4\xF3\xD4^\x12~$xP\x8A\x90a\xAC\xA0\x04\xF7\xCBW\x8Ey+\x14\'H\xC7\xBA\xD2\xF9d5\x17\x15\x88JC\xAA&)c\xC7\xC7P%l\'gi\fF\xF2\x80"\xC9\xF0d\xD6C`\xBA\xF3\xE8\x8Ce\x04\0\xE1\x1E\r\xF4Z\xD83f\xD5&\x80L\x84\x9E\b\xEA\x85M&\xEC\x05N%\xC8\x04\x97l\x1Dno\x90\xB2\x10\xFD^\\\xB8\x91\xE8T\x16\x9B\xD9!\xD4\b\x14(\x90;.B\x12\x10\x10*G\xFC\xEE\x8C\x85\xCCj\x02Y\xB5tT\x89\xA2\xEA\xD6\x0E\xDB\'>w\xEF/\x8Cg<\xB7\x9E#\xC6\xA4xn0\x97\xD1\xCF*\xF7v\x0FCT7V\xC4oY^\x0E\xD1w\xA3\xF1N\x81Iy6\x91\x12\xC4\xA4\xE6\x1A\xF6\xD4\xB7\xBCW\xCE\xF7\xC4\x86\x10\xDE\x0E\x81j\xDDQJP\x19\x81\xD0u\xCC\xF9\xE2\x98{QM\xB49\n\0&5\x19BUi\xC1\x84\xAA%\t\xDA1W\xC5\xF2\x8A\x0F>\x05\x87`\b;T\x86\xEBu\xCF\x89\x1F\x97\x8F>\xA1\xB7#\xAA\xCDx\'6\xBE\xF8\x1606e8\0pwf\xFA\xFE\x8B\xB4\x04w0\x02\xA6j\x86\xA1\x8D\xBD*\xD8\'\x03\x0E\xC8\x80M\x01\xB6\xA0\x18;0v\xC1B\xADL\xBB\x11\xB7\x0B\x01\x11\xDF!\xDA\xD2\xA8\xBB\xC34F3\x9A\xCF\xBF\xB9\xCAQ\xBE\xD3.\xA04P\xDA\xA6.\xDD\xEB p\x03\x99t5f\xF6\x1F\xF7\x98P(zx\x1D\xCA_0:>\xA63&\xF1\x04*i\xE6\x16\x94f\x06\xB5\xC6\xD0*GU~N\x17Af;\xBA\xB7#j\txt%\xB8\xAFd\xE6\xF8\x87\x9A#T\t\xCAq\xAA.m\x80xv\xA41\xF4\x96\xEF\xD1\xC7FH\x0E(\x10\xAACaR\xC1\xD0\x8A\xAA ^\x86\xDD\xE1\x15\x8D\xC1\xB6#t\x81\xCD\xC5\xB5Ji\xA9\x91.\xEC}\x93=\xF6Da\x02\x98\xC14\xF4~7\xD6\xF9|\xD3\x13\x05\x87~\xA9\xA6\xB1\xBE\x82\xA2\x06k\xE5\xC6\xADpDAAW\x18\x9B?\x8B\r\xB3\xAC\xE5b\x06I\xA3\xADf2Y\xD7\x12z\xCE\xE3\xE2\xD1\x93\x151#\xF9g\xED\xF3\xBA\xCF?A\xBF\xF0\xF1\x13\xB1\xD2v \x84\xCB\xF5\xD3O\xFA\0\xDE\xBB~\xCC\xD1\x81\xEBsf\f\x02rQ &\xB1\xEA\x82)u\xEAb\xB3\xF3\x18SpP\x047\xA9\x15g\x9D\t0\x13\xAB\x8C\xC4x\x01\xC0\xF6\x8B\x14\x01\x18\xA3\xD8`\xF6\x03\x86\xD6r\xA9\xD9\xF6b\x99\xB3\x90\xA8@\x10\x8BQh=f\xF2\x8D\xA2a\xC0\xA8\x8C\x844\xCE?\x82\xBA\xB7\x19\x11\xAD\xD2\x92\xE5G0\xC6\x813\xC0\bE\xA2\x84L\0\xF2\x81\xC3\t&\x82\x99\x98\x1D\x8A \b\x03\x0E\x1E;Q|\xF21cQ\xFD\x18\xC8\x83\x9Ak\x98\x96f\xF1\xDF\x95\xF7\xF6]\xA2\xE0\x86<\xBE\xAB\xA8oP\xDF[\x05\xDBD\x0F<w,\xE7M\xC3\xB8\x12\x1DQ\xADa_c>{\x18\xF7xOw/JJ\xCB\x98\x9B\x8A\xC9\xB5\x8E\x8B\x86\xC7\xD2\x8F\xC3\xEF\xA9\x85\xBF0"~\xA6D\xAFT\xC8\x89\xF7\xECE\x06\xA9\xD9\x14\xB6\x8C\xAA\xD4\xB2\xD9M \xAE\x1CN\xAE\xEC\x82|\x94/\xB5E\x1F\xC1l&\xC75\x9EE\xAF\xFE\xC4\xFA\xD6\xDB\xDE\xF8$\0o@i;\x18\xC2\x85\x9Bo\xFD\xFE\x9B7n\xC2\xA0\r\xE3]\xB4g\xE3\xED6ui\xE00\xDE\x16\t\xE3\x10l"\n\bBr|\x0F\x8D]\xF9\r>\xF9#\x04\xFBD\xB0\x07\x16\xCE<\x87{\x1F\x14\xBEAl\x1A\x1A\xB7\x0B\x83\xE8jD\xCA\xA4\xA7\xE0\xC8(\xDE\rg\x02\x99\xF3`)\xCE,\x9C\xD2\xC5\x7F\xF7B-\xAA-<\x14D<\xBC\x8E\xEEM\x16de<\x03\xC3\x9E\xE1\xE7X \x14\xA1v\xDA/\x8Cp\xD3hF\x8B8\x19YX\x9D\xA1\xE9%\xD1:gH\xCB}e\b\x10\xC0c\xE7\x95:.\x95i0\xA8\xAA\x07dV?\x1Fp/M,b }3F\x1A\x91\xBC\xB4\xCA\0\xF89\x18\x97\x07(\x85NNX]\xC0n\xC0e\x12%R\x90\x94J\xCEq@K\xB2UxH\xFCZ\xE3\0\xE5\x92U\xC3\b\x9B\xCF;\x98R\xBDb\x7F\x98\xCC\xAF3\xF3`\x18\x1C+\x92\x80s\xC0E\xC2\xF37\xCEe\xB9\x8FGv\n4\xDFq\\\xA7\xF9\xDD\xEF\xB11.\xB0\xEF\xE2\xF7}\x1Fn\x8F!\\\xD5>\xFA\xBD\x90\x05\xD2\xA2y76Up\xE7\x9B\xA6^\fClkv\x80\xD0\x89\xE8\xA10\x035\b\x9B\xCC\x80\x05V\x1D1\x805\r\xCC\x92\xFDE\xED\x98K\xC3\x1C\xDD\\\x90hh\x1Eq8hn\x9BjD\xED\x89NJw\xA3\x85/\x13\x15\xC4\x06\xAA\x90\xD8\xA2\x9ED\xDB0x\xA4b\xB8\x88\xC1\xADAX\xB9\xB9C#\xE6\x80\x9E\x06\xCA\xB14\x13\x99\x04\xB1\xBB\rf`t&\xC0 *\x85\xD7=\bfe\x86\xBD\xE6?q\x91\x8B\x87,\xB3\x9Aql\x0B\x07\x9D\xD2\xE0\xAA\x0F^\xC4\xE2\x14\\\x8F\x8D:\x01\0\x98\x04\xD5\x88^\xD0\x1C\xD2\xF2\t`\xEF\x8D\x0BS\x80\x88\xE0\x10\xC0\xAA\x1F\xF9Vq$l\xD2\x82.!\x9E\xA4\xC5\xED\xCB\xC8PRS\xAF\x84\xE6\x918\xEAv\'I\x17]\x18J\x0B\x86\xE6\x9E\x1BtcN\x10\x87x\x1A\xB6\xF9\x88\xD3\xF6@q=r\r\x92y\xF0\xF9\x97\xF6\xAC4\xA0\xF6\xCA\x84$\x9F/~\xCE=\x1E\x04j\xA5\xF1T2i\xCD\x14I\x0B\xC4\xEA\xD6\xAF\xF6\x16\x15\xAF\xC3\xFE`\xD5t\x8A7Y\xC0\x04,u\x84\xD7F\xF1\xF7\xDC\xD1\xAE\xBB\xE6\x9F`\xA5M\x18\xC2g\xF5\x0B\x0F\xFB\xC1\xCD\xFF\xFD\x8Cx\x89\xC7\xA4\x91\xE0\x87 b\xE3\x84\x83?(\xD3\x80\x0BD\x02\xBF\xA7\x84\x03\x10\xD2;\xFD\xF469["\xD8\x83\x8E\r\f^\x98\x04`Y\xB1&\xD5^\xA1h\xA2Pt_\x87\\\x84\xB5w."c^)\x8F\x19\xFC\xE4\x05Q\xA4\x85\xDCqYm\xD7\xBA\xEA0\x82\x92\x94s/\x91\x84\xD5\xD1|\xD3\xD9L\xD1\x99\xF8\xC1\xE1\xEAIC\xEA\xBC\x13)\x83$T\xF7\0d`\x91f)7\xE3\x14\xB6\xA8\x9C<\xC4\x17\x12{\xCB\xD8d1\xEFB\xCF\xF9\xA8\xFF\n\xD3\x82I@~M\xC6\fp\xF85B\x11\x87\x18;+W\xF7\xA2\x1E\xD5V%&\xFB\t|\x12\xF3c\xEF\x9E^\x86:^)\xBF\xD5.I\x94TCh\xFC#\x04/\x8C+\xF6e\xA8\f\x02\x05Y\x1C\x8A\x9A$\xEEa\xCC\x93\f\xB3\x04Eiy\x1E\xAAAPLj8h\xC3\xB4\xFC\xDA\x8A\xA1\x12H\xE4S\x8C\xCC\xADw\xCC>\xFD\xE93\xF4\xA3\x1Fx\x98\x9C\xF9\xC8k8\xAA\tC\xB8b\xF9\x89\'^9\xBB\xFC\x182\x83\x06\xF3,x\xC9\xB0\t\xC1\xD7i\x9DB\xAF\xE9wJ\xC8zM\x1Ecb\xD2>4\xDF\xF8m\x865\xD5\xD8\x12n\x11\x8ED\xF3,4\'\xCA\x9A|D\x92\xA4\'\xA11\xE6\0@W#~2\x06\x120\x97iw\t9e`F\xACV\xC9\x99\xB5\x8F2Yetd\x90\x91\x92\xE6a3?x\xE9\x8B\xA1\xD5A\xC3+\xC6\xA50\x8A\x11-\x18\xB3\xA3\xD1\xAA7w\x1DR\xDA\xC75(\x0B{*a\x11Q\x93\\t+\xEF\xD3\xBB\bD\xA2\xF5\x98\x96\x85[\xFB>\x04Q\x93(+\x93\x03\x10\xB5\x0B\xAB\0\xD6\x12\xEB\xCF\x83\xF4(D\xDFTE\x10\xF9\x1Fe\xA2\xCA\xB9\xE9\xDAS\xE6!T\xE3e\x04\x12\xF1>u-\xE6\xD4\xC9\xEA\xB8\xE3\x1C\xFD\xFF\x89{\xB7^\xDB\xB2\xE3<\xEC\xAB1\xE7\xDE\xE7\x9C\xBE\xF2*6E\x9ATD5E\xC5V\b\xEB\x02:1\x1D\xCB@"8\x92\x03%A\x12+\x01b\x04A\0\xFF\x80<\xE5=\x81\x1F\x14 \x80\xDFb\xC0\x0E\x90\xF8\xC1\x90^L#\x12\x02\xCB\x92%@\x92\x05\xCA\xB2@\x8B&e\xD1\xA1\xA9\xB6D5\xD9d\xF3\xD6\x97s\xCE^sT\x1E\xEA\xFB\xAAj\xCC\xBD\x9Bl\xC1\xBA\xAC\xEEu\xD6\xDAs\xCD9\xE6\x18c\x8E\xAA\xFA\xEA:\x1AZ\xA8u\xD3\xEF\xEF\xB29\x88\xF0\xDB\xDC:=\fr\xB3\xF6\xA2\xAB*>\x83d\x18\xFD\xF6\x86\xED\xE5/\xE0k?\xF3\x93?\x04\xE0\xFF\xD2\xE1\x85!\xFC\xC2\xCD\xCF\xFF\xC5\x9B\xFB\xAF\xE1O\xEC\x95\xFE\xF3^\xB8\x9C\xE4\xA4\0\x8E\x1CT,\xA4\xDA\xE0\x13-\xD0\xA5$\x8E\xA9-\xB7<\xD7\x11\xEE\xC3\xAF\xBB\xE3I\xF3,\x9A\xB2a\xC3\x05\xB1\xED\xD7cJ\xDD*\xB0*\xA3\xDF`\xAB\x83\xE9\xCA\f\x7F\x96\xA1P\xD26U\x80-\x9FwH\xFA\x8A\\<\xF2\xCC\xAA\xB1X\t\xB2\x81\x84\xC2\xF0\x17\xC1Q\xA5npd\x06\xA4;\x0B\x96\xB6\x84\xA0{/\xA9\xE5c\xA5#\x931-\xDA\xAE\x9CF\xE9\xC1*)\xD6\x9E\r\x17\xAE\xA0\'\xCCs[2\x9E\x80Jr\xC2\x89\x18\xA5\x1C\x11\xF6fX\xF7\xA0JO\x1B\x01\x8B78\x9D\xBBz\xCCI\xC0mw\xEB5:\xD0\xD9n\xD93\x14\xF7Q\x8C@s\xA5\x10f\x84\xE0\x11\xF7t\xA1+\x05\x18X\x8D\t\x9D\xBDw\x9B\x06\x0B\x9F\x0E\0\x07%\xF5l\f\x03\xD1\'\xF3\x1E\x14\xC5y\xF4\xAE\x947\xCE1\xF9\xBC\xBCv\xD3\x8A{7\x17hhX\xC9\x002\xD5"\x19\xA3\x10\x9E\xAF\xE8!\xD5\n\x07&\xB0\xCF\x89\xFD\x93\x9F\xFE\x8Bx#\x86\xF09{\xE9\xA3\x07zG\xFF\xB8_\x03\xEB\xAE\xBDUG \t;\xA5\x7FI\xD6\xEE\xAE\xA97\x90aD^@_\xD7\x8Eix4\x80\x97\xDC\xC3\x86\x000\xAE\0\xD8\xDC#\x12\x11*\x93\x16\xF1\xF9\x13\x1E\xAED\xAB\xD2i\x07\xE2\xFA\x83\xEBj\x98\x12\x9Dr[SXJwp\xA9g\x89\x16DmGY\x01\xC2 T\x1B\xCEV\x88\xB3l\x16\x950\xC5\xD2ln9\xCE\xB4\xFEC\x8CA\x88i,\x8B\x05\xC9H\x10-\xE5z\x8C\\\b\x11I\xAE\x83D\x07]\x14#\x88\xDA.1\xBF\x8C\x7F\xD0B\x0F\xE2G#\xAC\xB6\xAAD\xC8\x16*A\x1C;?\xD7\x8E(\xC4\xCDJ\xFDK\xF5&\xD5\x91\x16\xA4\xE3\x86\xC5\xD2\xAE\xB5\xD5\x99\x14\xDB\x8C\x023rm\x93\xD0\x9B\x07\xA1\x03\x8F\xEA\x7F\x19\x1Cm1\x1E\nI\xE8J#\x81w&\xD1Q\x87\xB5{\xF5;\xE9\x9C\x86j\\;II\xED\xA9\xB0\0\xAD\x87\xA5\x8DTi\xBA\xD7\xC2k\xF8\xD3\x82\xA9|\xF1\xC5\x8F\xF6\xA1%&\xFF\xDA|\xF5\x1D\x9F\x1B\x9Fz\xBE\xFC\xF8\x7F\xDC\xAFB\x07\xF1\x8E\xA0\xA4[*\x01\xCF\xAD\xCFB\x03\xBD\xAD\x80\x8D\x15\x11x~\x05\xDA\x0EW\xE4\xD71\xF0\x9A\xEDx\xE4\x86G\x88J\xCD7\x0E\\(\xAB.\x16\x01J\x17\xC6*\x1C\x88\xB0\xE5xo\xB8Al/\xDF\x93\x9D\x0E"\x80x\xEBX1\x11\xC5\x9A\x1D\x98\xBC.v\xA9\x8E}#\x90^\x06\xB93\x0F\xAF\xEBj\xD7\xA9\x88-P\xC5\xE5x\xCE\x8Dq\x9A\x85\xCD@s\xAA8\x03#\xA3\xD5\xDF\x83\x9F\fWVT\xE4\xF2V[ryj\xF1\xDB\x0E_\xFC\xF1#\xECzz.C\xEA\x1F\x90\xD9{\xEA\x1B\x14\xB6\xCB6\xB9`U\xC9\xCA\x19Ay\xFB!\xB6>\x01\x90\x01\xB1b6\x001\xBA\b1n\xEB(\xC3}G;fi|C\x9F;\xFD\x86\x90\xE8\xBDL}_g\xC8$\xADF\xF8\xF2\xF2\xF4k\x14f\xCC\xFE\'\x9F\xD5gB|\xB5\x81BD4l\xD6\xAB\xD90Z?S\x006&\x14\xCC 6\xDBq\xAAO9\x9E\x17_|\xDE\xFF\xD5\xAF\xBFC\xAD&B\xF8\xB8}\xF6\xCF\xFD\xD6\xFC\xB4\xC1\xFE\xA4\x02\x92\xA2|I1\x05@\x8B\xC0\xF3\xBB\x1E8\x07\xDA\x85N\x0B\xD81J\xCB5\x07@\xEF*\x98\x1Ar\xCC\xF1U\0\xF7\xA6c\x1B\xB1I\xEC\xEE\xAC\xA3\xC0H\xC1\r!E6T\xAC\xC1\xC0\xA0\x07b\xE3.Q(\x82 \xE2P\x90\x93\x1EK\x14M\xA9\x07w\x85\nb\xBA``\xE3\x18\xD4~\xEE3\t\xED\xE1P5\x15\0\x85k)@K#\xD7Bi\xD2\xB2Gmv]\xD24\xBB\x9C\xB7\xF4U\x83\xF7j\xB3o\r\xE66\x9F\xF9j\x8B\x88\xA6,\xA1=c\xFC\x01\x06,90\x8F`>)\xC1%\xC1\x06\xBB7\xB9\xCB\xDA@l\x0Bg\xC8\x9D\x9E\xA8\xAFgr\xD4t\x12/J"\xC2q\xCE?\x8D\xB1\x15a\xBA\xEA\xCA\x11B;\xA1w\x15ia\xD7Dd9g\x16v\x84\x05o\xA6u\xE8\x8E\xF8\x042@?\b\xED=\x04\xD5\xAD\xE2\xAB\xCD\x0B\xE1=Q\x8B\xEA\xC0\xECc\xD15\x97\x94\xF4\xB9\x8B8\x91Dz`\xBA\xBB\xD1\xDB\xE3NDh\x18/}\xC1\x1E\xFD\xFC?\xFAs\0\xFE\x1F\xA01\x84\x7F\xFE\xE8\x9F\xFC\xE0\xD7\xEF\xBDae\xA5?\xE2\x97\x16eS\x17\x806ae\xF3\x86o\x94H\x8Al\xB3\xC6\f\xEA\xFC7\xFF\x8E<\x84/Z\x04)_aFz4{f^E\xD6v\'\x02\xB0\x88O\x88\xA5\xE7\x84\xFB[\xEC\xF0d\xD1\x03\xED\xF3\xAB\xD8\x82\xD5\xD5\x18\x8B\xEF\xE0&\xB4\x07\xC7\x11*\xCBF\x15O\x89Ib\x8A}?\x83x\x98!P\x14\x04\xA3\x99\xECsUR1\xD5fI\x1E\xA0\b\xA9UN.\x97{ \b\x11t\xFC|R\x19\xB4\xF0\x10\xC5>XG\x19J\x8ENv\x9E\xCA0\x99\x93\x03k\x1E\x836\x8E\x19dJ"\xAA\r\x81k\xAD5#)Z\xAB<\xF8X\x93\xBC^\xB3\x10]\xE0\x8C\xE8\x92D\b\x92\x96\xD9H\xB47\xEB\xDC\x94\xD4yO\xF5`\xB6\xF6\x89h\xD3C\xD0\xD5\x1D}\xF7;l\f\x03\x85\nd\xB4\xCC\x07\x89\x1E\xC8\x94\xE7&\x81\xB7k\xF5\xAC;\xA3\xF6\x81,\\\xDBJ\xCF\xF5\x97\x01\xB8w\xB9\xE0\xCB\x9F\xFA\xE4\x0F\xE2\x16C\xB8\xF9\x9D\x1F\xC0\xF5\x9FP \x12\ts%f\xA0\xA0n{(\x0B\xE1\xF7\xD78]\x7Fn\xAB\xD3\xC1\x8A6\xDC\f\x8Fp\x0F/;p\xC5\xE8E\xB3H\xBE~\xDC\x96x\xB46K\xEAzd\xDBE\xCEC\xDCJ\xE8c\xA0\x1B\tU\xE19z\x93\xDF[.\x84\xBA9\xE0\x11\x19\x9981\xFAY\x8A\\\x90\xDA\xC6\xB3{]FS%\xEA\xA9\xFD\rF\x0E\xDA\xBC\xE6Bkd\xB8\x95\xA1\xAE\x95G7\x80\xBEk\0C\x90\x13\xB0\xD12\xFB\xE0\xB0a\x19>k\x18\x98\xD4\xE9\x1D\x91\x04\xE5\x83\xD2\xCE\x82\xC8\xE7\x9C\x19\x93\x9F\x88\x9C\x022\xE0\xBD\x10\xCA\xA8\x85\x9FO\xCE\xB1\xDA\x01,\x17\xBD\xB9a\xFAAb\x92~/\x0E\xA2ur\xD2\xF5s=9\x0B\xD7\xD0;C\xF5!\x18\b\r\x82\x1A\x82m\xE9\xFAt\x868\xCB\xBA\xEFS\xF1\n\x88\xFB\x1E\x81`l"7\xEF\x1D\xB0@\x0B\x1CG\xDAc\'\xDA\xEA\x908\xC9\xC5\x1A\x8F\xE7\xF0\x005\'\x03\xA2\xC2\xAC\xDDQ\xFBo\xA4\xC1\xD5\xD8\x1Fk\xE7\x98,\xDC\tL\x9E\xF8\xD7\x9F\xFD\x01\xDD.\x19\xC2W\xAE_\xF8>7e7\x16\x11\xFD\xD1\xBE\b\xA9\xB0\x01\xB8\x8FH6:\x13<\xFF\xEE\xBA\xB1\x8C\x8D~\x9B\xE8MF\xB4s\x1B\xE7\x1C\x80\xBC?-\xB5\x06\xBC\x86\r_\x81\xE1\xBEE\xDD\x04\xED\x13\x14F\xC3\xC8\xD6?\xBCX\x8D\x8C\x86\xB1wdH7\x19\x15o\xC8\xE4\x14\x87\xA0\xFEt\xAFB\xA6\xE8\x82Q\x88\xA88\xBDH\x85\x0E\xAF\x84\xE4pW!\x9C\x8C\xCC]\xE5\xDDc\x9C\\\xE2\bT\xA7@\x8A\x04\0\0 \0IDAT\xC5\xDF\xC8\xBC\xCAR\x0E\x98\x95A-\xE6\x87\x90\\sfB\x04E\x98\xAE2iMj\xE7K\x014\x8E\x8Cp\\\x11E\x87\xF4Hi&tcy\xE1@\xED\xA9\x10\xCF\xD8\x16\xC9[\xCC\xDEM\x86\xCB\x16U\x99\xAE\xCF2\xFC%\x93I\xDF\xBD\xC6eK4\xA6\xDD)}i\xDA\xF5\x89\xAA=\x80ZK\x1Ak[S\x96\x15\x99t\x02\x11\x80DA\x81\x9B\xBA\xD72\xCE\xD6\xB6\xB71%\xD3\f\x06\x9B\xEB\xCA\xDB\xF8rA\t\x89\x8Cv\xBD\x15(\xCB>O\x1C\xAF\xBE\xFE}\xD5{\0\x9F\xF3\x17\xDE\xF5{\xF3w\x9E\xFB\xE3-\xB5\xBE\x01\xFE\0\xC3\x9F\x86\xF9\xD3\0\xEE\xC3\xF1\0\xF0\x07\x80\xDF\x03\xFC\n\xC0\x8E\x9E?\x7F\xCB\xAF\x0E\xE0\x8C\x18j\xF1\xB7W\xB3\xC4\xAF\f\xA4?\xB4\xA8B\xFC\r\x07\xBE\xE2\x86G\xBE\xE3\xB1ox\xE8\x1B\x1E\xFB\x8E\xC7\xD8\xF1\bWxl;nl\xE4\xFB\x82\x81\x1B\x03n\fx\xCC\xBF\xC3\x18H\x15\x02R\x17D\xC8\x15\x96\xAC2\xED\x077\x9F\t\xB5\x83oh\xA7i\xC5\xB0\xA9\xDEc\xB0\xA8If\x13F\xC60\n.IDRXZ\xA8\xB5\x18\x89I\x1D\x11\xE3L\xD5\x8CjX\x1A\x0E\x17VKU\xAD\xBBV\xDB|\x12%X\x12Z\x19\xEEn\xD9r\xDA\xF4\xC7\xB3Q\x82\x94-\xA7\x14hQ\x1F\xD9\x8Fdt]\xA0\x88)\xCE$\0\xCD\xF7*\x10\x1A\xD1\xE7\xF76\x07\xD2\xC7\xBB\r&\tJ\xEB\x85B\xC99\x1F\xDEB\xE0\f\xD5\xEE\xC2\xA6\x151hK$\xA2\x1C\xCF+\x83U\xBF\xC44\xE2\x9Fr\x82\xAA\xD5Q\xFD\xF0& [\x9F\xA5":\x99\x81/\xF7\x89\x95\xB9\x7F\xE1\xF3\xCF\xF9\xEF\xFC\xE6\xBB\0"\x84\x87\xB0\xEF\xFD\xED\xF1/\xD1\xCE\xFC#zQ"c\x0B\xE2\xB7k\xA8(H\xEE\xE3\x97\xBB2\r.\xE2^$\xA5G\x11\x02\x99}\xD6\x8F\xA1\xAD\x9D;_Z\x18*\xCB\xD5$\x0E\xC2{\xF0\xB2\x03O\0\xD8|`\xB3\x89G\x92\xB2\by\xD1\x1F\xB4\x02\x9D6\x8FH\xD6\x1B(\x847\xD0x\x9C!5"\xDE\x8A?\x88\xAC\xCAZ\x10[\xBB\x8F\xBC\x0B\x002\x19*\xAA@\xD7\xEB\xE0\x1C\x1D}n=T\x07\x10\xF5\xC0\x9C\xD2b\xA3\xE6\xD5\x12\xAE\\\xBBJ\x99\xA2}\xA1-\xE7\xAA\x90\x91\xE5\xBC\xC6\x9C\x8F\x92\xAAF\xFD\x9B\xD5\x99cj\x84H8\xB7Q\xC6y\xF1\xAFG T\xE8\t\x11\x8E;\x97\xA5\xE7Z\xC8w2\x7FO\x02\x9Es\xB6\xE71\x1A\x11\x11s\xB9\xB2\x1CWC]Iw\xAD)\x86P\xBB\xA3\xD4S"\xA4\xCC\0=\xEA\xBAY\xD1\x96\xB5U\xDE\x89v\xC8@\xB4\xA5\x1A\x1C-\xE6\xA3\xADC\x97*@&1i\xB8\x94\xBDb\xDA\x1Dm7u@1\xF1\x9Da-\xA7\x13\xE5P\xBD\xF0\xD9\xF7y\x88\xF3\xB7\x97^\xC2+?\xFF\x0B\xDF\x0B\xE0\x0B;\0\xFC\xC2k\xBF\xF9g^\xBB\xFAFM\xF8\x1F\xEAK\xD0kC\x96Q\xC7\x15\f\x0F\xE0\xB8\xE2X\xE3\xD8`\x1A\xEE\\\xD4\x81\xBD]_AG\xEE\x92b\xFD\xDD\f\x92}\xE2\xAD,\0+B\xE8RC\xB6\x8A\x81G\x06|\x15\x07\xAE1\xB01\x1FrO\xB7\xDFl[\xC7\x07A\x1D\xEE\xB8 \x16\xC9D\xB8\b\x07\x99\x8B\x81y\x10$p[\\z\xC0\x15\x9Ca\xCBA\x02e#\x0E\x89\xA2\xFA\x8AR)\x0E\x84\xF4\x9D)\x917\x14\x18\x8Ex\xC6\x90\xD6X$_n\x06K\xA3\x9DBr\xE5\xE2\xCB\xB8\0o\xD3\xE3[-\x89\xE4\b\xFA\x83\xC4\xBE$\xFE\x14Z\xA86\x9B\x1D#\xF5x\x05\xF6\xB4\x86]\xD9\x8AvZ\xD4\xDD\x1F_\xCC<\bL\x12\xD1C\xA0\xF8\rR\xAC\x8A\x01e\x1B\x93:\xB4\x18\x07\x8D\xA0KVb{;Pp\xBB\x8D9a\xBD<\x1E\x82\xEA\rI\xE8\xEC;\xD0M \xA2 h\xCF\xFC\b19\xE54\xA8\x1B1\xDE<\x078uSk\xDE\xD7{w\x8FI\xF7\xAE\xA8O\x1A\x9F\x0F`\x02W\x07\xF0\xF0\xE3\xBF\xF2g\0\xFC\xA3\x1D\0>5~\xFD{\x06.\x98\xEE\xDFB\xBA\xFEA_\xE4N\xD8`\xB8_\xD2\xDE\xAF\xE1\x16;8\'\xB13\xAB1\xBD\fK\xC9,\x11\xAC~\xEB\x88Ae\xBCF\xBB^\x13\xC2\xAA:X\x890^\xCA\xA3\xEF\xA8\x83\x10\xD3\x81\x97\xCD\xB1Q\xF2\xEDn\xB8\xC2\x86*\x8C\xA6jM\xD1\xCEN\xC6\xA0`\xA4\xD8N>\xDA\xDB\x81T\x19\xCA\x8E#\xDB\xC1m;B &1\x1B\xC1W\x16\x7Fu\x05>\x11q\xE88\xF5\xDCn\xAF\ba\xDD\x18\x1D\xCAh\xB6\x14%\x05\xFD\x01\x14\xDA\x19\xC8\x04TT!\x98\xD3\x91\xAA\xD8\xD0\xCA\xAA\x9C\x85|\xE4\xAA\x9B03h\xC7\xA4#s\x91\x062St!8\xFA\xC1\xC9\t\xA3[FD\x82\xAAJc<q\x98s\xACtb\x0F\xC7\xE7H~!&2\xA0\nE\xF1\xCC\xE86\x14\xA3S\xF0\x96\xA3\x11\'\xFB4y\xB7i\xE5y\xA0\x9B/\xCFI\x84y4\xA9my?\xC8V3k\x85\x95tv\x94\xFB\xB5\xFA\xDB\x99Vy\t\x82\x89\x9Av\x7FR\xB1\x14M\x88Y\xB5\xD3\f\x89\x1D5\xC4\xDE\r\xC8u\xA0\xDF\x07\x1C\xE3\x8B_\xF9\x1E\x80*\xC3\x97\xF1\xE5\x0F]\xB6\xCB\x1F23\0\x82 \xAFQ\xAA\xC0\x15\x9C\xC7\xACm\xD8\xAA\x1D\x9Dg\x12{ \x03k\f!\xD4\x03]\xA3\x87\xA0\x9A\x8A\'f\x92\x88\xE2\xAE\x01u4q\xF7K\x15\x99\xBF\x06\xE0\t8\xAEp\xC1\x0E\x99\x03\xD5g\xB5\x94\xC1\xCBI\xD8\n\x1C5\x8E\xD6\xCDi\xBD\xB5\xBCF\x06\xC6s\xBF\xB2\xEC\x8BEf%\xAC\xDB\x01\x1C=>M{Q&\xE3t\xF5R\xB0\\h\xAA\xA4vx\x19K\x1B\xF5d\x9A\x0E\x8C\x16\xE6Jf\x01x\xC6\0,`\0\x92\x80\xCDXg\n\xB7\x15w\xD1\x89d \xB9\x93\xB2\xAEQk\xA6\x89\x8Fs\'PQ\x83\x8E\x15%\x9C\x8F\xE9\xA5\xE8E\x1A6\xC9\b|\n\x05\xA0\xFA\xC9\xA1\x99\xDCz\x82\xE5\xA9\x877\x15&\xF7\x87\xB0UJ\xAB\xDF\x1A\xEFb\xDD?\x8D\xEB\x96T\x17\xDAh\b\x87\xE7\xD6\x9E\x9E\x9Dq\xA0\x98L\xA2\'\xDE\xA3\xAB\fh\xE7\xF4\bI\xAA\x16b\x06\x19\xE3\0\xCF8\x8C\xF9\xCA7>\x04\x90!\xBC\x8C\xAF<\xEF\xD6&\xEB\xDF\xFA\x15\x04\x19j\xC1u,:\x17s\xD8`\xB8\x86\xF2\xFC\xCB^\xD0\xA5\xFE\x9A?Pp\xBF3\x04\x19\x92J\x95X\xCA\xAC-\x05>\xCF\xAFv\xDE\x9D}\x8FE\xF7\b\x86/9\x03\x8F-\xAE\x89\xAB&\x86E]\xC6\x0B<\xF7\x82\x149\x1B\x03i\x06\xA2&\xC2`\x1E\x86B\x9F\x0F[\xFB\xA2\xB1.\xEEI\xE2;\x95\x89\xA9\xA8\x86b\'\x15\x1E\xCD\x14%sd\xBC\x03U\x8A\x10\xFEc\x11&\x159X\x8C\x06\xD2\x9F\xD1\xC8\xD4\xFB\n,\xDB\x03l6\xB4P\xBE\xEE\xCC\xC30Gn\xC0"\xD6(co\xBA\x16\xCFs?0\xCD\xD3`Y\x84?\x1A!PZ\xBA\x18\xC2\xFA\xDC*\xF6b\r\xF4)\x82U\x9B\t# F\xAC\x04\xA2\xBAg\xF5\xBD\xA4m\xBB\xDD"\x81\xC5\xFA\xF5\xF4\xCE\f(\xDA\x121.F\xCB\xF4+\x89\xC1\x96\xA8)\x06\xD2\xEF\xD9\xA6\xD5\x85\x8386\xA7\xAD\x06\x8D\xA9\t\x1D\xF8\xCA\x104<\xB3\xE0\xA1W\xAF\xBC\xF6<\0\xEC\x97\xE3\xF1\x93\x7F\xFE\xF2\xA3\xCF\xE1\xDF\xFA%"e\xE9\xF4D\x05\xC1\x04`\x1B\xDC\xAFQq\xFD\x0600\xC7\x93\t\x88\xE8\x8BQ\xDC\x96\xFA!\xA5\xB5o\xE2\\\xEE]\b#c\xDEq\xF60lm\x92\xAD\xDE\xA7\xC2*bB\xAF\xC2\xF1\x15l\xDC@\xD6\xB2^\xC2\x15\f\x17\x1F\x186pL\x95/\x93V\xCF\xBD\x1C`\xB8\xB4 \xAA\xD1\xA4\xFAX\xD4\x85JZR\xC4\xE3A\xDB\x83\x9B\xEA5\xD6\xF9\xCA\xA84DN\xC5A\x06\xA0\xEF\x9B\x957!^#-\xE1\xAB\xFB5\x16\xC6\x98\x83,%\xDC\xB9\x86Iz\x93\xB4s\xC0\x9Ar\xE3\x05}\'\x801\x1C8\x18\xDB\xD8k d\xCC\xFF\x84\xCD\x19\xCAB/\xBCB\xC9\xEDd2c\xC6\xB9KYu\xDB\xA1\xA8<\xCB\b\xBF#\bx\x0E\x1A\xC9\xC8 &\xEF)~\xC1\xC8\xC0,\xB2\xEA\xCC\x15q\x83Mn\xE1\x0Ea6\x8B\xF32\xD0\xD0\x9A\xDF\x7F\xD6\xD85\xA7\x8B\x04\x17\x83\xE3\xBD\xD2\x88\x89\xAC\x1F\xA1 #\xD5V\x80\xEA\x19\xF0o;\xC8\\foS\xE8,\xC6#\xE3\xA4"+\xE5\xEAM\x16\x97\xA8Gv\x1B\xCF6\xCD\xA5\x92]\x8Aq\xCC\x98{\x1B\x8E\xF1\xF5\xAF>\xE7_\xFC\xEC\x93\xFB\xA7\xC7\xA3\xEF\xF8\xA2\x7F\xFE\x0F\x01\x1A\x88\xF8w \x8A\x94\xC1\xA9&\xC8m\xA8\xB0\xDEr\x05m(/B#j\x18b\xCB\xF7b\x06Ys\0\xC5@\xEA:\x1A\xA3\xD2\xEE\x80\xDB\xBF/oq`\xE9\xD7\xFD\xBC\xD5\x009\xCD\xF05\x18\x1E\xD0\x8E\xB0\xDBZ\xA9\xC1a\xF4&\xC4\xFB\xB2\xDCE\x9E\x85 \xF2KJ!\xD9\x1F\xC4\x88\x8AY\x053(r\x96\x17#\xA2t\x15\xB6\x1Cm\x8B\x11\x84\xCD!\xC6=\xDB}\x13\x05\x84\xD9\xBEIP=\xEE8\xABB\xAE:\xFE\0\xC4\bJ\xB4\x80\x0B^\x92-\xB6\x9F)\x89\xDD\xC5\x97\xB5\b\xC2\xF0\xB4D\xA0\xA2\x16\xBB\xAE\xEBbW\x8B\xBC!\x80\xF4\xB1c\xE9w1\x1E\x9D\xDFavk/\tx"\xED\x05]2w\xC2\xD6Ks\x96(b\xA0vE\xEA\xC7\x1A\x8A\xC8\xFEKZ{^n\xD9\xDE\x1D\xAF\xC5`\xD8\xD1\x88\xA4|\xFD\xAD\xFD\xBA\r\xED\x19L\xF6M]!#\x17\xD3H\x8FMGG\x99\xF8D\x0F\xC8\x04n\xBE\xF0\x92\xDD\xFF\xC4\xA7\xBFc\xFF<>\xFB\xFE/\xF9\x17\xEF\xEE\xEC\xB7|IrQ\x1D\xF0\x07\x8D\xC8O6\x02/\x89\x1F:q7\b6\xEF\x81\b$\x89[\x99\x81"\xD6\x1E\xDELF\x90\x0F\xBE\x18B\xA1\x82~\xAEBxuNg\x06\x9C\xF8\x8C\x1D\xAD\xC5t\xC0\xF1\x12.\x98\x88\x8A\xCCW\x1E[\xC2)\x1D9\x8Dv\x90\xF6^\xFDm\xA4\x85^\x19\xC9@wb\x12\xA1X\x91\xDA\x03\xC3\xA6\x91\xC7\f(\x86\xE0#\xC3\x9E\x15\xE2\xEC(\x86\x03\x18v\xEF\x006\x98\x8Fc\xCBEb\xCAl\xD4\xFAu\xD4\x02\x1A\x88]\x93\x86\x91/H\xE4\xB5\xCAG1\x8A6\x7F\xBC\x0F\xA5tm\xD3.\x04"f\xAF2\xB6@\x11~\xBF^\xF3\x0F\xDA\0R\x06V\xFB\xBA\xD6\0WPOJ\xEC\xB6D\r\xD0\xEEN\xB9;\xB6\xB7D\xA6\x84\xDE\xED>\xCD\x1EP\x04\xAD\xA0\x1E\x06f\xBB\x96JS\x8D\x1C\xC9^\x01@\tDRE\\\x1E\x86[/^\x91\xFDg\x1Fd\xD4\xF4B\xBC\xF5;r\f\xC6s+\xC7\x03\xAB\x87#\x19R\xC4\xB1\x18Z\xB1\x19\xA2\x8E\xABG7x\xF5W\x7F\xED\xFD\xFBg/\xBF\xFD\xBE\x87\xFBk\xB9\b\xDF\xD4\xCB\xB50\xAE\x11U\x826D \xD1\x15\xE0\xD7X\xF5w\x12~\x0B"\xA9\xC1\xB5\x1D\x9C\x93\x19\xA8\\Z@\xED\xDA\x01I\x93/\xD5"\xCE\xED{2\x96\x85\xBDK\xDD\xCEpl\xF1,\xB8\x01*d\xEAP\xAAu\x9A\xF5\xEAA!\n\xA7|\xCD\x1DO\xC0\xB1g\x89\xB6\xE8\xC5\xEE\x11\xBA\xAC\xF4\xE9\b\x16r\x1C\xA0\xC7\xC0T\xCE\xBDBe&\xFFR:u\x94/pL\xD7\xB6\xB1u\xB6\xDESnH\x10\t\xCC\xB0mD\xFE\x04\xF3\b,\x97\'\xF9\x9B!\xC2\x8Fe)7\xAA7q\x82\x10\x861\xF0 G\xED@n7\x9F-\xD2\xC2\xDD\xD2\xA9\xC52k\xFD\x94\xF45\xB7Zx\x90\x7F}\xA2j":\r\xE8R#\x88\xD1\x13:\xD3\xBB`\x07b\xEF\b\x0F\x89\x96(\xB0\xA0yA\xE4r\xDB%\xE9Ir6\xD8\x1D\xC7\xE2|m\xC9\xEE\xC3aG\xEB\x03\xDD\x8AF\x88mB\nn\x11\xADi\xCE*\xF1TA&\xA0\x023\xC6\xEF\x91\xBB0\x819\xA9Ry\xFE\x1DoKFU\xB1\x131\xE42$\xF2\xF9%\xC3\x98\xA7\xB1\xAB_\x89;\xD7E\xC0\x83>g\xC4\xC8\xA4Z\xE59?\xF7\xE6\r^\xFE\xFC\xE7\xDE\xB7?|\xFC\xD2{\xE6\xBD?\xC8V\xEF\x82\xD9\xD7\0\x1E Kx\xF3m\xA6\x9D\x9Ae\xDD\xBE\x02\x16\x98\xDF\xDC\x840\x94j\xD0Q\x03\xDA\xB9=B\xB1\x9F\xD7\xA2\xD0\xF2S\x8B\xE5\xBC\xCB\x93\xD4\rk\xF7\xB76\x96\xDEn\x1B\xA7\x10\x8AK\xC2\x84A\xF0u\xD3]Fco\xAB\x84\x16\x83\x1A\x88b\xAE\x0E\xA4\xFD\xE1b%\xF5uMh\x83\x03\xC3\x02\x11\xA9\xA2s~w\xE6G4\xB5\xC3\xC8\f\xA2\xD2\x12U2\xDA\x1D\xE4\xBA4\x9B\x90)tAD\t\x9D\xC1\xC5\x16+\xA8\x8B\x85UD4h\xDC\x92\xA9j\xDEY\x7F0\x11B${\xAF\xD7\x91\x9F\xF4\\\x85^\fU\x0B\xB5\xFB\xFE;\xB17Cb\xEA\xD0\xDD\xAA/i\x98]n\\!\xF5\xF8Q\xB6\x05\x9F\xCD\xD0\xD7\xAF\xEF#W\xFF\x1B\x8CR{b~D\n\xA6\xA4"U\x8D\xEE\x1E\x83\xDE\xC6R#\xA1\x882\xE7\xB3\xCF\x031G\xCD\x99~\x17s\xE1\xFD\xD2\xD5\xD8\xE6LjKc\x88\x98-Xj2/\x85v\x8EG/\xFD\xFE{\xF6O\xF9+\xEF\x9Eo:\xE5yC0\x01\x1A\rMq\x04\n8"3p\xC1\xFA\r\xA6\x92h9!\xA3P\xC1\xADHD\x9D\x13\xF0vv\x86\x90\x8Bp\xAC\xED5\x82\xB7\xEC\xE3\x8E\x82\x9D\xB4\0\xF7\xFC\x86\x96\x058\x9B11\xF5{\x97\xF7b\xB57h\x87\x81\xCD\x81a\xDCW\x81B\xE2\x86\x90~\xA3WasK\x9D\xD9\x11\xA6\xD6\r\xABGA\xF7\x1CP\r\x82\x0E\xFD\xF5\xAB\xE5\\\xE9\xE5\xCE]\xA2\xBA\xBB\n\x8EK\x9Eb\x80\x89\xDCc\x1E\x07\x8C\x05\x89\x9A\x9D\xC5-\x93\x1D\xE5%Lz\x92\x94\x06\0G\xED\xC6\xC4\x13K75\x04\x02\xEBk\xC8\xD9\x16\x8D\x96\xEAS\xE1\x8F|\x96f\x1B\xA15Z\x9C\xFE\x89\x19d\x92\x16W6\xF5\xDE\xE9\x9EO\xBD\x90\t\xE1\xF4\xD4\xB3t:Q\x18\xB5\bo\xFD\x11CQ\f\x81%a)y)\xF7A\xD05\xD4\xC5}\x81\xE9\xBC\xF5\x1C\xC0lR\xDE\x03\x04X\xCF\x9E\xF4>\x0FA\xC0\x15\xF5\xD8\xC7_\xF7*\xE2/\xF5\x05\xED\x1E]\xB5(\xA60\xD9?2\xC1\xF4\x864\xA6\xA6\xA7\xC1\xB6\x9E\xFA\xCA\xD7\xDE\xBD;^~\x8E\xA7}\x8B\xD7\x15\x02\x15\x84\xC10\x88\xEE\x1A\xA5\xE7Sjg\xECz\x10\xA6\xDBJ\xEC\xB5\xAF_?n\xAD\x9DA\xC9\xB9\xEA\xFEk\xC2R\x19\x19\xE3\xD5\x99\x06\xD3\xA3\xCD\xDA\x02\x13Zimb\x90n\xD4\xAE\x16\x9C\x98A\x8D)\xC8\r,\xDE\xEE\xDCR\xBET\x97\x91\x12W\x11\x86b\xC6m\x9Bx\xD3Vp\xC6\rdK\xBD\xE831\x01\x19\xB811\xD3\xAD(\xCF\xCC$\xF3\xC8\xE4\xA6T-\xE2)N\x8F\x80\x9F0:V\x95\xE7$\x83\xAC\xD8\xCC\x05\xA1\x07o\r\x96\x82\xD9\x92,\xA2*\x0B{2\x01\x84z\xE4\xA6\x055P\x16q\x11P,J-8x\x99I]\x90\x17\bk\xBB\x18\xCA\xC9\xD3#\xE5K\xCC\xA1\xEA\x19\x02n\n\xC1\xF5bJ\x9D\x99\xF9d\xDB^\xDE\x89\xDE\x97DH"\xE8\xD9$7\xC8\x14\x1A\x81\nb\x93I\x98\x98\x8ES\x86\xBB\xE7\xDC\x01\xC5X\xD2\x8A\xD4\x19\x0F\xE7\xABl\0\xEDY8\xD0\x0B\xA1\x94\x04G1\x13\xCECg$\x19T\x06+F!f\xE1\xF5N\x03\xE7\xD43\x15rr\xEC\xAF\xFBs\xFB\xEF]\xBF\xFC\xCE76\x1F\x18$\xDB"\xA6`Gls\xB2\xC2\xFF5\x16\xA0\xDB\x0B\xE8BL\xCB\xB6\xAE\x0BY\xEB\x9D\xA0}\xA06\x10\xED\x92\\\xFC\xBC\x1B\x13\x0B\x15tDQjDW\x11\xC4\x88\xF4\x80\xE3>\xB5z\xD4\xAF"\xFE\x90\\T=\x04\x07\xCD\xB1\xDB\x86\xE1\x8E\xE1{\xC9x\x0B\xF7\xE0P\xA6\x1E\xF6\b-\x86\x12\x9AT;1<\x10]!\x9A\xC6\x8D^|\xD0Uit\x0F\x1A.\xAD?\x1A\x91\x92\xA2\xB8\x99z\xFC\xE2\xD1\x7F7\x9A_\x8D\xBA;\xE3<\xCC\x94!IF\xBA\x18\x05{\xF0\x90\xDA\x94e\x1A\xF0\xBE\xA2\xF2\xFC&\xC1\r%m\xD2(\x88|\xE6\xB1(e\x11\x07R\xDA\x81\x16\x7F\xBD8\x86\xD2\xDD5C\x88s\x17c\x9F\xEENt\xE0\xFDw\x11\x1A\xAF\xEF}\xC3\x865kR\xC7G\x0EG\x03H\xEF~\x0F\x06"\x83\xABk\xD5w\x96L\xA3\xA1T\xC6<\'s,5\r\xC8\x1C\x85\x8Cv\x14\x83\xCB\xC6\x9AAP\x03\xED\x8CVcT\x07t\f\xE8\x8CF\xCC\xCCN}-F\x11c\xA9jN\xC1\\\xE6\xCD\xF1\xCE}\xC7\xE5\xED\xB1L/X_\x86@\x03\x0F\x90\x9B\xA4`\x07p\x1F]\xE7\xD6\xC6\xABE\xC8*E.c\xA3\x16,?\xDB\xE2\f\xE9ZFG\xB9\xCE\xC2\xD8\xD8\x89\xFCl/\xE8de\xE8\xE1\xC7J\x7F.\xEB\xFF\xDE\xAE\x03\xD6\x8AI\rnz\xDB\xAD\xB8\xE5>8\t\xE5\n\x03W\xD8\xB1\xD9\xC4\xE6;v\xCC\x88K\0\xF7uH\x99OF\x97\x1E\x05\x8DA\xC9O\xF1\xBA\xA9\x1E\x87\xE1\f\x91\xFC\xDD\x93\x87\xD6 \x1D=\xD7b\x86\x96\xAADy+\xC2\xEB \xB7c\x95Z\x93d\x9F\xEE\x18C\xF3\xD7\x88\xD85_\xB1\xD0Ls\t@\xF5\x12\xD9@#\xD87R5\x9B$C\xA4\xFDj\xE1f\xFD\xC2)\xE2\'#\xCD\xE2\xA7lw!\x8AQ\xDF\xF5\xC4\xD2-W\xAB]\xF6\x80,4\x92HH\xE3\x92pJ\b\xB7H_\xC5(\xC0Uu\xBA\xF5\xA7\xEE\x9CR5U\xA6\xC9\x1D\xAB\xE4\nmFI\xF5\xAD\f\xA5\xD5W\x99I\xCC{_\xBC\x8D\xB53\x13\xCEIG\x0BT\x9D\x84\x0E\xDC\xF5]H\xAE1\x1C?\xBD\xF9|=\xD5$\xC7\xE5\xF1\xABo\xDF\xE1\x8F\xDE6M\xC0\xD4[\'\xAE\x11\xF9\x07\x11[\x10\x8B\xBC\xD2k\x9Dh`\xA2\x16h7\xC4I\xC2gFb\xCBE(\x8F\xC0\xEA\x92\xAC\x1A\x07\xE5\xBE\xF3\xA5\xFD\x93n/\x0EkM\xA5\xB0\x86,Nj\xC6\xAAj\b\x95\xF4\x89\xD7\xBD\xE3X!\x8C\x8Dx\'R\x9D\xE2\x92\xD8E\xCAhK\x80\xCB\xFDW)\xC0\xD0o\xF9x\x9AM\0\xE1a\xF0\f(*5\xE2B\x06(\x95\xC5x.,f\xEF@\xCDc\n\xEAT\x1F\xE45Q\xB95@EZ\xD4\xBB"\x94Q\x84\x92\x84\x03\x94\x18N\xF1X\x84)I\xB9\\\xD7(5\xD1\x03\x19\x8C\xAF\x86\xCA\x80\xD3\x92\xCA\x8A\x82hm5x[\x018\x8D\xB8\xFA\xEBdsX\n:\'\x1C\xA7\xD1o\xF6q7\xA9\x9C\x12\xD6\x01g0X7\xDA-p\x1Dd\x06\xEC-\xDB\x15sr\x12\xECZ7\x01\x89\br]pU\xF4\xB1v\xE9\xDE\xD1A\xADs!\x1EM\xCE<\x9DKD\xA09\x9B\xA76\xDB\x9E\x90i\x7F\x98\x86\xAE\xE6\x99\xFB\xDB\xF6/\xCEG\xCF\x98S2I\xBF\xC7= \x93\x9168\x17\xFF\xC0\x86HS\xEE.\xC2"P[\xD4\x04\xC2\xC0\x85\xD8*"\xD1\x93\xF8\xB6\xF5\xBC\xD4\xF3\xB1\xA0\x82$d/\xE2N\xA2\xF5-\xD5\x80\x94\xA2\xD9\xBF\xCE\b\x80\x85\x19\xF4\xE3V\x8C\xC8\xFBy\0\x80-\x1D\x8D\xAB_\xA0\xF7GD\x1A\xD7f\xFEA{\xF70%\xCD\x91\x82\x81\xB6\xA6\xE6D\x95e@E\xC9\xE2X\\3\xC1 %\xAE3c\xD8\xF4\xC4\xA0\xAA2pX\xCD\xCD\x86\xB2Y$\xEAZ\f[T\x03d\xB8\xE0K\xE5\xD0\x82\xA8\x9C\x0BZ\xBA>o\x9E\xB0\\\x84v\xBB\xD2OJ+;/p\xA1\x93\ri\x02o\x84\x94a\xD2\xA9\x1B\xFBz\xDDd\xF8\xB4\\\x98$ \xDDf)E\x96\xD1\x7FXxWyV\xE4\xC6\x0B\xC2\xB3D\x19\x9Di\x18\x19\xC5\x91\x8Cx\x89*\x840\x98l-\r\xD1\xA4\xCE\xDE\x11C!D\x9F#*"\x9D\x8C\x82\xB59-n3F\x11\xBDxs3\xB6\xBE\x91\xB7!\x19JC\x12u=\xB0=\xBCyf\x7F\x1D\xAFmS\xFA2\xEEC\tIB\x06)\xBDIx\x8EkT\xF8k\xCFV\x94\xB4\x152\xE8\x04\xD9\t]a\xC7\xED\xBA\x85iti~\x1B}\x94zPRX\xDF\xCDV\xBB\xC1\xDA\x86\x18\x14\x892\x83\xA3\x92_\xC7\xC3\xB9C51\f\xEC\x0En\xCDN7$\x89+\xD2\x9B\xAB\xACz\xB4\xAAH\x82\xDA\xC2E\x7F[~G\xA8\x04&\xB5\xA9\x98h\x852\x8B\xD8\x01\x05\xCF\xEA\xBAD\bdB"\xBA\xB346p\xE3\x98&ae\x14\x8DS\xA4\xD6y<&\xD7\x95y6\x9F\x9F\bVL`\xA2\x16<\x9F{\xA78Z\xF4\xD3\n>u\x8E\xEC\x10\x94\x94\\\xA8\xDE$kAi=\xE7\xF5xy\x02f\x9E\xA7\x82\xA8\xF2(\xA8\xED@\x19\xB3]\x1F\fN<$\xCF\xF7\xD6\x17Il\0\xC9\xA8\x14c\x80fsX\xD4\x8D\xD6_(\0\xC8\x8B\xB1\b\xBDt\x067\xAB?\x80\xFA\xAA9\xAD\xFE\x04\xA1\xCF\xAAe\xC0P\x89\xB2\x07\xF8\x12\xB3\xB00\x1E\x04\x93\xAB@\xACv^\xDA\x10\xE25^\x7Fe\xDB_\xB5\x87\x18\xB8\x8F\xE9\x0F`\xB8\n\x88\xEF*\x81\xBE"\x80i"\xE0\x93\xE4\xF7\xFA\xF4,(q:\xAF\x1B\x16\x97\xCDTn\x13lq\xDB\xC6\f\xBC3\x17\x0END\xDDR|;C\xA9\xEF\xDD\x9Eayn\xFAw\r\xB8\x1D\xD3\xB0"\f\xE5\x11\x02\x83EXO\x9E\x0E\x03\x8A\x01\x9D\xD1\xC0\xE0}*\xEAR5\x04\x07\x90\xC7\xF5\xF0:Z\x91\n\x93\xFB4x\x86\xD10OB\x85\xB9\xE8\x89p\x87<\x06\x8CIc\xEC\x82\x18\x07\x99\x92\xF5\x05\xAC\x85\xC4\xA1\xA8\x84Y\x1E\xD2"\x12%\x88X\n\xC2\x06AtH+\xF8Z\xA5W\xEB\x92\xC6\xB6|\x04\xCCNHOi\x9B\x0B\x96Ld1\x80\x19\x1Cs%\bJ\xCC4\x94y\xBF\xD7@\xA6\'/\xF7\xD6\x83\x0BE\xAC\xFA.b\xB3\xA6\xDE\0\xDAt%!7\f\xC9YZ\xCA\xB2\xA1\xD56\xE2\x9Cx\x1F\xBB\x1B\xB2^C\xAB\x95X.E1N_\xAE1\x18\x94\x9D)\xE6$1\x11\xED\x0B\xBDx\xA9\x06sf\xFE\x84\xEB\xBE\x9C\xA7\xF0\xC0\x14\xF3\xD8_\x7F\x8C\xFDw\xAF^\x81\xF9\x13\x88\xA8C\x11\xFC\x80T\x83a\xFBj\'\xB0\xC6$(\x95a\xBDv`\xA0\r\xE5.\x88\xF0|\xD1\xE7\x1B\x83H\xBBBG\x07\xFA\x04\x16\x84\xA2\xC5`\xE5\xBD0\x93\xC1\x12\x89\x0En\x87-\xF3X\x0BB\xEA\xF9\n\xC5Pz`T\xFF\xBD\b\xBC\b^\xE3\xE3\xB9\x0E\x84aT\xFD\xDC2\xA48\xE2\xF8k>\xAC1\xA5\xF5\x1C}\xE3\xBD|5\x1A\x02\x8A\xF2\'Q\xFB\xA4\xED \x96\\\xC4\xDC\x05\xE3\xAB:\t@\xB7\'\fhWjFCz\xA9\x06\x8B\xC4`\x84`\xFD\x8Ez^\x8Cjt\x9F\xCDY \xC2\xD4\x9F\xC6"\xAE[$\xF1\xA4\xD8g\xDB<\xA4\'w\xFB\x9B\b\xA3\xFAd4\xAC\x95*\x82$H1\x87\xB9\x94!?Z\x9F\x94\x03\x80\xB4\'d$\xA1\xA2\x1Fy\xBE\xA9#\t\xBFQL\xC0CZg\xA2\x91\xE6M\xF7\x91Q\xCF\xC1\x98\x04\xA4\xE1\xCF%\xE53\xDD\xBAT\x9DDI\x19\xFB1\xA2\xAD\xE3(\x03\xA8n \x14\x93%\xE4\xC5L\x06\xE0\x17\x9E\x1F\xCCL\xF75%y\xB1\x7F\xA3\x1B.i\xD0\xB4\xCB\r\xF6\x8B=\xC2a\x0F\x82\x87\x9B$\xF1\x80\xBC\x04k\xE0\xD0\x8E\x0E\xE3k\xFF\xC5N\xCC\x05\x92\x01y\x0E\x1Aq)\xA2\xCE\xBA\x0E\xAFs\x1C+\xC3 Ax\x9A\xC3Je\xF0\x1E\x06-\x02VnEh\xCFKTbC\x05\xF5\xA9\xDC\x86\x8E\b\xC6\xD2\x9E\xD6c\x10\xE9\xC6\xC5\xA2\xF6\n\xAEG\xBD\x8E\xDA\xEA\xCD\xBAjs\x8Ai\xE8o\x15N\xD5}\xCB0\xB9\xA1*\x1A\x97$7\x14\xA3\t\xA3\\\x8D\'\xCA\xC0\xC7\xDF\x17\x88}X\xCE\xEC\xEE#\xB20\xAD\x10G\x19@\x81\xB2\tt$P\xC5<s\xEC\xF97\x17\x99`3F\x0B\xCA\xD1\x02\xAD\xDF\x93i\xA0\xAA7\xF7\xD0c\xA7\x0B/\b\xA8\x13\x0B\xAA\x8D<f\x8B\xE1\xCC\x93({\x9B\xD6\xFC\xF1\xA1&\x88\x18\x95\xF8\x93\bB:~\x87\xD3\x0B\x02A\x12\xF7\xDA\x973\xC3\xA0\x17\xE2T\x7F\xA0\f\xA7\x9A\x07\xAA\x15\xCD8X*\x92\xDA$\x83\xEC\xA8g\x9E\xFA4\x85b\x8A\xF9\xD5\xFC\x83\xFD\xE6:\xCE\0%\x90\x99pL\b\x01\xB2=\xBA`\x9F\xCAX\xC3N\xF8\xAA]n\x94C w\xE3\n\x81\x157P\x7FK\xDAWA\xD4\n\x15n\xE7`\0g\xFBB\x12 \x89\xB8[\xC1\x13\xF2\x91\xD0\\y\r\xED\x1C\x11\x93\x88z\xAA/\xEB9kt\xE3\x1B\xA3\x15,\x0B\x9F\xBD\xB3\x9D\xFE}\x1A\xB2\x9A\x814\xCE\x0F\xD5Cd\xE6\xE8h\xA2#\x95"`\xCF\xBE5\x14\xE0;\x96\x82\xA3}n\xBC\x98^0\xC9\xF5zEN\x86}\xB0R\x8B\xA6\x01\xC3\x99\x86D\xFB\x87\xB6\x85\x1B\x8C\xB0L\bl\'b\xD0k1\xEC\r.\xE03\xC1\xB3\xAF\xAEg7sQ\xEAx,p\xAC\xED\xB3\xCDe3\xD5\xB6\xA0W\xF8o0\x12\xB7\xA0\xB57\x86\x10L\xCB\xD7\xEB:u\t6\x83L\x81\xC7M\xCF\x10b\x14"\xDD\xAE\xCB[#*1\t\xF5U\x81F@\xD6V\x90\x04\xAFU\xC4\xF6W&\xE7\x9C\xAF*\xED\x1E(b\r|j\xED\xB2?\x99ZM&QQ\x99\x14\x1E\xECS\x96^\xCF\xFE\x8A9\xD5\x031\x18ps\xC1\xEE\xB8\0\xCEb\xA7\xA9\x16\x94\xC7\xC0Z\x1ArL\xF7~"\x1E\x12\x07\xFF\x1E\x103\xE9D\xA1v\x81\xDBR\xBD\x13\xBC\x18@\x8B\x12\x1Bb.h\xF7)\x89\xBEz\x0F\xA2\xCD\xAA(\xDCT\x16\xFE\xBE0\x05\x96m[\x92\xB1\xBC\xDA\x89\xB6hg\xC0\x8EaLP\x9A\xD6\x98\xA1\xD5=Q\xBB*\r\x96\x8AO\xB5\xA91\xC3\xD4\xE7\x9B\x9B\xD2NsR*\x84\x88I\x06H2\x03\xAA8\x92*1\xE6bH#\xDB\xD2\xDA#\xA2\xCBHR\xCD\tK|i\xCDJ\xFA\xBAQ\xCA\x19J\x9F\x15aI\xBA\xD1\xFF>\x0F\xC0\x0F\xE6\xF4\xCB\x88\xE7\xCB"\xCD\xEF\xDC\xAF\0\xCE\'6\x8F<W\xD08K\xC9&\x8C\x9E\x81D\xE0\'\xF7\xA1\xB7MU\xD8\xEF\xC3\x88<\xA8\x98\xA3\xFA\xA1k\xCA"o\xD5\xB6\xAA+\x1DF\xD5\x84\xE3\xCF\xB1\x10\x8E\xFB\x8C\x80\x12\xF7\xE8\xFB4hC\x141\xBA\xD1\xD0\xCB\x98\x06\x9FG0\x92y\xB0M\x12\xFA\xBC@\x9B\xAFV\xF5\xA6\x9A\x8Bs\xB4\xA1\xB5\xD8\x89\xAA\xB3\0\xC8\xC0kto\x0E=\x13\xDEO6\x05\xB9#=\r\x90\x9A\x8B\xB2\xD1\xEC1\xB5W\x9C*\xAA\f2,\xB6x\x82[\f@n;\xDB\x1A\x91U\xE1\x92U\x8D\xE8\xD6\xFB3t\xD6=\xE46\xE4\xC3V\x1F\x9A\x11\xB3\xEC\x10w\xBD[\xDF\xDA1_>\xB1\xDE\xB338 \xC7\xB4\xB6\xD9\x88\x9E\x10ZRZ\xA1\xB8\xBA\xB7\b\xBBB\x89;\xF3\xAA\xF7\xD9\x13R\b\n\xED\x9CB\x1F\x15\xE2\xDA\xE6"\xD5#$\xC3\x0En\x7F\xF7\xDCd\x9F\x18tu\xB4\xDF\xB6\x06\x04\x16\xE9\xDA\x99A\xFEnPH\xB2R}\x9D\xAB\'\xA5?\ne\x94\xBB\fm#\x11\x90N9&\xEA\xD3\x96\xCC\xC3\xE0MeX\xAA&w}\x1D\xE5A(C\x1C\x19\xBF\x0B\xB2{k\xB7\x8FO\xD0\xB9\x90Cm\xF7&)\xDA\xFA+i\n\xACs"i\xDB\x11M\x8B\x17.\x84\x81\xEAgJ\xE8\r\xE5Z\xD4\xF9\x1AKC4hm\xA7\xD1\x91\xF7q\xCF\xAB\x01\xCE7\xD6\x82\xED\xD5\xD7\x1Ag=\xABz\x99;\xF6\xF2&\x10\xEAZ\x8B3\xF0N\xC0\xD2\xC9iSh6\x80\x95\xD8\x8B8V\x03\xDEh\xBF\xAD\x86\xC2(\xFE\xC0\xEF=\xF3q\xF1\x99\xDF\x86\xDD+\xD3i\x86IC\xB6}\x9B\xF8\x1A\xD3\xD0\xBD\x16\xB8\x1B\bia\x80\x86\xC6\x14\x89\x1A:C\xB0>\xB6\x90\xD6JbN\xC6`\x1D\t4\xB5\xC4:\xE3\0\xAA\xDEC\x11\xB4[p\xFE2\xA06\xF4chc\xD4\xB8\xCFh\xA7\x10\x9B\x82\x94\x92q%\xE1\x17iW\x9F<\x17J\xFCNK\xBC$\xE0ls;\xAFR"{JAk\xEE\xB0\x18\xAF\x82~R=\xC88\x04C\xE8\xC1\xA3I\xC7\tO\xEF\x92\x0E\x02i\'\x90;S)\xC6\x1D\x0E{\xFB\x8D\xD22\xE3\xF6\x1BS0\xCE\x99{\xB5+\tj\xD9_\xD6\x93\xCCpl\x9E3\x0F,AH\x89\x8A\x90\xCC\xA8\x18\x0E\xC0\x1D\x86O\xCCc *@\xA9oV\xF7Y\bY\xE7\x04\xE37\xDEn\x99\x07^\x13)\xE5\x03!\xD4{\xD4g\x13n\xCB<i\xED8vw\xC5\x12h\x91U\xA8\xAF\xA5\xAA\xD0\xA5\xAF\xD4\x02!\x82\xBA\xB6\x16{\x8F\xD0[\x99\xC3\x1A\xC5\xC8c\x860\xC6,\x8CB\xC4X\x8B\xAEt\xF1.\x95O\xCC\x05\x15\xE5\xD8\x8D\x7F8\x8D\xA1\x18A\x11h$\xECt\xE2\xD6y1\x92\xC8h\x17\xC4\x16r"Wn\f\xF2\xB6G\xA2\xA2\x0E\xB3O.oB\x8B\x1E\xEC*\x06\xD6h\xC58\xE5\x8C\xBAb\x87)\x03U\x92\xC5\0I\x0FPcrg\xC6\x1C\xBC\xC0\xB2\x84\0\x18\xB9\xB6\xFA\xB8k\xA1I\x92\x8B\xF9\x88\xA0#Ym\xC2\xEC@5\xD6\x18m\n\xDBH\xB5\xA2\xF9\x9C\xCF\xA8\x11\xB2\x91Xl@n\xC2|\x8Eb\n\xD5X;\x1E\fhbFb\x97\xF8\x17\x06\xEB\x16\xC4\xF8-#,\xE3\xFE%\xB0jL\x80lD\xE9\x93\xE1X\x88\x8A\\\x1E\xA6\xF8\xDD\xAD\xDC\x99i8t\x07\x18\x9B\xE2\xD9g>\xF7I\xE9\x9D\x15\xA3f\xCCa"\x8B\x18gHp\xAA1I\x93\xAA\x18=\x81\xA9m\x83\xF5,jz\xCA\x9D|i\xAA\x92\xCE\xA5\x10rC\xD6\x0172\x06\x18v\xC3\xD3p\xBC\x86\xF2\xD5\x8BH\xEFH42Y\xF6\xCF\x04\xA6\xC9\xEC\f\xE4,\x95\x81\xD5hhK\xDB\xD9\xA6\xA4Z+\x96R\x8Cde(\x8B\x94O"9Cr\xD4\xB8\x14\x1F\xB1\x18\fW\x02[s\x1Ft}\xEB;\x1CU\xC6M\xC7\x81u\x8C\x8D\x90\xDB\xB1@\x81M\x92g\x88\xF5y>8\xFF\x8B\xAA\xD6\xC7X\xFD^\r\xB75\x8En\xC8\\6\xB4q\xA5\x9DG;\xC7\x04F\xA3\x87\xDA\x01\b)\xD5\xD7\xA4\x1EJq8*\xE3\xB0\xE5\x0E$\x81s\xB1q\xE1\xBB_P6\x88\x8E8\x8Cs\xAAx\x85K.\xCE0\x18N\xC4\xEE\xC9$R\x17c\xD0b\x96\x9D \xCE\x8B>6\xFB\x01\xA3\'=\tJ\xD7n\xF5\xBB\x18\x9D\x88\xD4[\xFB\x18\b\xDB\x81\x98{C!b`\xCE\xFD,\xF3\xDE[\xEB\xCFl\xED\xF5\xECM\xD9I.\xEC\xD3V\xEB\xC0\xF5tf\xFE\xBD0\x10\xD5[H\xE9?\x90\xB9HY_\x02\x81\x10\xCE\xF3\xA5k0\xE1Y\xB3\xE2&\xE6\xD1\f\xBB\xF9\x13p{\x8C\xC8]("\xA8\x14f-Z\xE9\xAC\xDDfp&\x9A\nI^\xA0q?\xB7\xBB\x13\xB5\x98E\xFC\x0Bt\xD7\x04\x01\xE9\xAAL\x03\x9A&n\xCFI\x14\x1F\\\xDC\x8A-7\x02\x19\x07\xB0\xA1x\xA61\xBAqE\x18\x854jl\xB91K\xFE\xC6\xBE\xB8\x82BH\x84\xE7LJG\x8EC.AW\xF2V\x1B\x8B\xE7\xF9\xB4\x0Bd\x7F\xDA+\x11\x8F^\x9DY\xC4\xF5\x13*\xED62\x0EA\xF1\f\x86\b\x81\x8E\x80,\x86\x0ByT\x82\x0E\xC1S9\xF6\x15\xB02\x1A\xA1Sh\x98\xC7b\xB2\x03>[\xA5\xE1\xD4\xED\xD1\xE6R\x12-qs|\xFA\x8E\x89\r\xC3\x0E\xC08\xB3\x0E8v>\x8A\t\x8C\x90\xE21\xC7A\x94Q\xD2\xED\xC8\xF1$\xF15Cd>\xCBD8!\xAB]\f\xC0\x0E\xB8\x8A\xC6\x9A%\x8A\x8859\xAB\xDF"H\xF5\'%\xBA\x18\xCFF\xE8\xADJ\x9AD\x15\xD6\xF7\xFE>\xC88\x1D*\x18\xEBv\xC4F\xB9\xA9rq\xD2\xFDB\x06G\xD5,\x11\xDFd7\xCE\x8CH\xEA\x16\xE9t\x1C\xA8\xCAI\x9C\xF7dH\xD1\x8Fb\xA2\x91n\xEE\x89\xD4.\xF0}\xC3>\xFC-\x98x5&\x9A\x0F\xB2$J!\x04[\x18A\xFD\xDEc\xF3o\xFF~\x92\xD0:O\x12\xC0z\xFB\x8DI\x106.\x81?"\x1EB\xB1\x18\f\x8A\x90\0\xDCfT\x92\xBEg\xE6e\xF9\xDB\x99\x19h_e\xEFR\xD7\x10\xD2\x9AR>\xFAM"\xB0\xB0$[O\xAA\x02\x8A\xDB7\xA8\x1E\x0B\x9E\f\xD1\xBB\xF1Q\xF3R\x84\xAB\xE7057h\x86A\x97qp\x9C$\xFEj\xD0T\xF9\x90\xF2\x12\x898L\x86g\xC0\x8D\x9F\x01\xBBG\xD2m\xE8\x9CA_q\x9F\n\xF6!JH.\xACE}\xC0\x99~-\t\xCF\t\xE3\xB3\x93t\xF3x\xB6)M/(\b/D\0\x82\x89"pK\xE9\bd\x8CC\xC2l\xAD_y\x05\xD8\'!\x97\xA6n\xB8\fo6I\xE7b\x90Z\x1B\xABj\x14\x0B@\xC6\xCB#\x9E\x7F\xD6\x85\x9C\xC8\xF8\x1C!\x82\xF6\x92Z\x06\xCCl-\xC7\x92\b\xA4I}Ix"\x15\xB7\xA6\x1A\x98\xA4;\x9F\x89]\xF8y \xD3\f\x9C\xCFhr\x1E\x8D\xB9\'\x14\x02\xEA\xA3\0\xDF\xA2\xE6\xEF\xD7\xD8\xDF=\x9F\xC5\xBF\xD9_\xE4$(W\0(\x88,\xF8\xD9\xD0\x02\f&c\xCF\x9D\x85N\x80\xB2G4x\x9F\x8FD\xAAC\xAB\xB8l\xED:\xC3\xC2hV5\xA11\x1C\x8B\xF3K\x92\xEB\xDCv\x8D\xEE\x97\xD2U\xD7v\xC4"\x86s\x1B\x9E/\xE3q\xA9\f[\xB9\x11\xB3\x1FE\xA4\x82\xBF1w\xC5XJ\xBF\x8F\x07\x1ALA\x9F\x80v|\xCE\xD4i\x17\xE3;\xABa\xBC\x1F\x06k,\x0E\xDA\xF9d\xC8\xEC\xDF\x89N@\xC9\xCF\xAD\xD8\xC5\f\xE0\xF2\xE8\x19\xB4\x11\xCB\x96\x06C\xDEILB\xEA\x84k>\x9C\xCF\xF0\x12\x12\x06@\xAE4\x12\xA0t\xE8\xB5\x9C\x9A$\x17\x89/\xE1{\xF4:R\x90\xC5t\x1C\xA52 \xEE\xB3\x84\xF6\x1E@\xAFS\xED\x92\xB0\xC6\xCF=\xA4\xA0\xE2\x07\x16Uc\xC0-$\xB1\xA2\'\x0BY\x18\xF9\t\x05\x94ww\xA8\xD6\xD6\x81\xCEF\x96\xD2f\x98|\xAE\xCC$\xA6\x9B\x16\x86e\x0F\x9BZ\x93\x9CS1\x0E\xF7Z\x9F2V\xE2\x06\xB5?x\xF7Nh\x1E/\x10b\xE8q0\x19\x0B1\xD5\xFF\x15\xD5\xC7<\x1D\xB8\\=\x89\xFD-\x97\xA7\x1E\xDDN\xDE\0\0 \0IDAT\xF1\xBB\xBB\fL\xB5\x11J\xED\xB8\xAC\x12\xDF\xAB\xE4W}\x83U\xBA\x8E[\xC7\x96\x14hM&\x8D<\x0Bj\0P\x04\xD3\xA5z\xF5\x07\xAD\x1D\x11\xD0mD\xD2uz\xDD\x13y^\xD5*\xA0\xAE\x7F\x87\r\xE2\x8Cp\x1C\xC0AC\xCC\xE4#\x9BV*\x04\xCBg\x06\xE1\xF2\xBCE\xF2C^\x07\xE4xT|uRzn\xA97\xF7\xF9C\xF6\xC5y\xCF-\x8F\x15\n\x98\x10\xBB)\xA4T\x1E\x85x2\rNaN`\x10\x19d\x99/\x99\b<l\n\xA9:\xF4k\'\x8A!\xA4>k\x94L"\xA4\xC9\xD3\xA5\x1B\xEBaI\xAF\xF6\xD6\xF7\xF8{\xA9]`\x93\xF5!b\x81\x97QO\xC7b-\xB8]\xE0C#\x0F\xE2\xB4\x83\x062\x11\xB8\xED!ai$\xB4\xB4\xBC\x1D\xC0T\x7F\xD0\x88\x98\x10\xDC\x1C>\x8E\xC83@\x84\x9D\xC3z\x81\xFD\x99\xE0#\xB4\x0B\xA3\xBCi6\x020\x8E\xC4\xE5Z<\xF2:]\xEC\x12~\xC3\xE3^D\n\xB1\x8E\x8Ed \x81\0\x0E\xC0\xE9\xC9i\xAE\xD6\xF0\xD6\x1C\b;\0i$\xA8\xBF\x18\xB8\x91\xF1\x8DIM\x81\xE3\xCD\x02\xAF1\xAEy\xEF\x19\xEC\xD7v\xEF0\xEC[-\xBC2\xAA-F\xC5\x93\xAAp\xF7q\xCEPOD"\xF2H\x04 \xA2N\xE9p&@\xB5S\tI\x96H\x80\xCB\xDB5\xE8\x8E\x04z\xDF\xF8\xDB\x12dt\x8A\x9C\xF4\xDB\xCC\xE0.t 2;<vh\x8A\x1C>\xE4\xA2V\xC4\x9F\x02\x92\x02\xF6#!\xBE\xF2\x0E\xBC3\r\x8D\xB3y\'\x82\x9E\x14\x845R\xAD\xAA\x10k\xA9\b\x1Di\xE9\xDFb@\x07F\xDA\x10\x84\x9CD\xF8"tAqkLAE\x84\x8D\xF41g\x9B\t\xAD\xF1\x94\x9C\x92Z$\xEA\x9CoI5\xB9\x1D\x19\xB0\xB4\xB8\xE6\xAER\xEA\x97>n\xEA\x14*\xED8"h5\xD7\x850t/\xF5g\x12\x1E\x13\xC63mX^\x12\xEBF5\x0F\xC4\x12*X\xD5\x9DR\xAB]\0\x14\x92\xA1\xB0\xB2=\xDAm\x06\xDAtK\x9E\xFBF\x9D\xBFl/D8\x89z\x9A\xD1\xD1UR.\x98\x99LD\xB2\x1D$"\xA0\xD1/\xD7h\xA2\xB3\xA62\xA5q\xF4\xE0:\x92\x11Q\xCF\xA6\f\x99I\xA3i\x006\x1C\xD7\xF7\x8F\xFDm\xE3\xFE\xD7\xCD\xF6\xB7\n\xA2O\xEC)a\xCE\x92>\r%-\x87\xA1\xA4\xFAI\xB2\xB1\xBE\x82+\x966\t\xB1!\x04=X\xEB\xB6\bU\\\x92*\xD1\t\xB4\x19\x0BA\x83\xDEyS\xD8\x9C\x9C\x13a\xAB\xCF\xDE\x1F\xA6E\xF1\xD0&Y\xCF\x16{\xF5\xE3\xB0\xC9\xEB\xA92\x88\xE0\x8C\xBBG\xD9`\xC1\x93\xD2\xF5E\xDC\xF2\xF9O\x93{\x90\x0B\xDD\xCB6\xA0\xB1U\x9D\bd\x1B\x89\x10P\xF5\x1A\xA6\xD3]i{\xDE/\xB2\x0E\x82a\x8E6\xBF\xEE\xE1M\0\x99\x02\xBC\x98\x84+j\x90\xBE\xF7aB\x10|4\x0E\x8C\x8C\x8C\x03\xFBY\xD1vK5\xE0)\x9D\xDC\xA1\xF8yo\x121\xD6\x85\xD3\x1F/\x9B\x80`>\tc\x16\xB3\xE9B&\xB2\x1B=\x16s\xEA\xDE`?6\xC0o\x88j:\x81\n\xF6\x84\x8A\xE0\xC9h\xDA\xDA\x13\x94O\x042\x11\xC8Dc\xD5\xB3!\xD7\xC4\x85\xCB\x8B\x0Ec\xF7\x88sp!\x88#\xEF\x95\xC8\x85\xAB+.\x14S\xB8\xD4\xFD\x98\xC3a|\xE6\xF5)b\xA7A\xD7y\xFF\xB4?hN\xB5\x84\x1Bs6Gz>8V\x938cL\xCB\xE4\xD6\xC4\xC4\x90\xC0\xFD{_\xDF\xAFa/O\xC7[{|\xFEm\x02+i\xEAw\x11\xDFI\xC7\x97q0 \xD5\xC6\x07\x06fF\x9E\xDC\x82\xE9{o\xEDf\xC1\xCC\x15\xA9\x14\x91i\xD0gTq\x1B\x15\xE8\xBC\x1E<e\xB0X\xF9I\x8C\xB85\xDEU\x82\x0F\xDC \xF6V\xB8\xB1`\x9A]]\0\x1F\xE0a\xF2P\xAFLAEP\xE2A7\xE3`{\xA2\x93s,\xD5\xC2\xA9N\x8Cv\x0F\xC0p\xB18\x16\x89J\x01\x9F\x95\x04\xEB\x90-\x9D}\x93\x94\xCF\xC5&[\x82\x07\xC1\xCB\xFEFUH\x06\xC5\x0B\xE9w\xF0zxEU\x84p\xB7\n\x8AIUAL\x987rC\xBA\xBD2\x848\xCEq\x9B\xD4\xA9%\xA1(=\x11\x8B\xBA\x9E\tPu\x1D\x95\xB4\xD6"\xFF\0\xA4\xA5\x9D\x0B>\xE3\x1B\x92hX\x17\xD3I\xB4\xDE\xCA\x9D\xA5\xBD\xA33\x83b\x14\xE9\xE2K&\xA3u\xDDvJ\xEA\x82\x8A\x04I\xB3-\xA5:\xD7\x92\xA9\x1D\xA9%Z\xF74n\x82\xD0\xDFG\xEB\x9F\xDEZ\x9B\xB2\xBBL\x84\x01\xB7?U\xF5Qs\xA0\xB1\r\x18.\xE4\xFEuO\xF8\rF\x06\x85\x05Z\xBBl\xF7_\xDE_\xC3\x93_\x06\xAE?P\x92\xAC\x11\x99w\x82\xEAj@\'"\x85\x17sj\xF3\x1A>hS\xC4\xE1\x99P%%\xBA\xF1O\xEA\x06\xD6~t&\xB0\xF4\xA1\xA9/KlA\xFB-\xFB\xD1\b\xDE\xCE}\xE9\xE39\xC7\x15\xC42<|\xCFi\x8E\xE2\xA8\xA1.\xB8\x8F\xF6H\f\xB7J\x98\xF9\xA0\xB4\x16\x9D\fLZ\xA53\xC1\b\xC5(tLRbM+\xAF\nK\xB2\xF9%\x12O\xA6\xB0G\x7F&p\x99\x1C\x85P\x01b\x8D\x8Eiw \x044"\xE3gg(\x84\xE0~\xBAq\xEEUH\xC4\xB5Z\xF7\xE99\xC8\x85\xED\x94\xC8\x07Ty\xB9\x16\xB2\x18\x87\xA4\xDC\xD1\x9E\xA9\x8ESM\xA1\x1A\xE2i\xC7\xE8*CAe\xF3~\x9D\f\x97V\x9F\xB2\xA2j0\x0B\x83j\xC4\xA8\xBE\xCF\xF2\xB0\x18&\xD2\xDB``_\x19\xF3\x90\xA8\xA3o\x8A\xAB\x95D\xF4#\xA3\xB4;\xC7\xD2\x8C\xA8\x8D\xB0\x8B1\xA9\xEFV\xE3\xC9{L\xD8\x94\xD7\xE3\x80\xD3\xF6bhh\xAB#\x92|\xC6\xCEg\xB4\x018\xB0\x8F\xAB/\xEF\xCF\x1D\xCF\xBE\x84k-b$A\x84kO\x92\xF9.\xDD\xFA\xC44`\t{\x04\x95\xCBp\x18\x84\xE9\xCB\xB5\'i\f\x04sH$\x02t\xC8v\x8B\x01\xF4\xF7\x89\xD9X\x8F\xCA\xF3\xB1\xDE\xD3\xB0\x10Xg\b\xE3\x1C\xF5\xA8\xE8C\xDFh\0Dn\xA8\xAA\x8DP\x90S<\xA0\xAD\xBC\x8B8\xB38W\x8E%=\n\r\xB5\xF4c=\x0E\xC1\xAD3\x83\xEEv\xC4\x82\xC2\n(\x0E\x1C\xEE\xB4bKN:\xB6T\x11\f\xF3@Z\xB9\x0F\t1G\xE6\x0E\x89\\<\xAFAJd\x03\xDD\x92\xB31\x88\xB4\x17\0KJq\xC0\xC3\xB6\x90I\xC8$\x88\x9C\xB9<\x0F\x15m\xA7\x05\xEB\x06k\xC4\xE9\xE9q\x10\x10\x9E\\\xE8\x8C%@\xB3\xEF\xB0\xBF\xD2\xF1\xB5"B"\x87\x0F\xDE\x9A\xC4\xF5|\x9A\x16\xC6\xC7\x8C\x13\xE1\xBArURB\xF5=\x91\x02\xBDn\\\xEB."%\xB3*$\xA8I\xEE\xF3\xE6\xC1\x14\x18\x9E^\xABFj\x91T\x1C\x8E\xD7d_:`\xB8\xD0\x88\xED9\'A\xB3\xB3\xBE\xAB\x1Ax\xAAb\x07*\xF6 tC\x85D_\xAE\xAF_\xDA\xAFn\x1E\xBC\xE8\x0F\x9Ad\xCC0\xD7\xAE\x1A\x9CR\x9F\x11\xD0\x1B\xBEU,Q\xBA\xC86J\x95-\xF4\xFBn\b\xC9\x7F\x8B\xDB\xAD\b\xA1\x11\x8E\xEE\xD1\x8E\xDF\xA5\xCA\xDC\x8Az\xECD\xE4\xAD\xAF\xC9\xA7\xEFj\xE7\xAE7\xE7\x84D>\x01<\x060\xAD,\xFEQ\x12\xBDvY\xDA\xB1a\xD2\x96\xA09\x14$\x17*qF \xA6G\x02\x8A7\xA0\x9B\xD0\x94\xC2\\\xE5\xD3\xCBKA\xC3\xA1\x9E=\x1F\xAD\x02i\xE1\xC0&\xA2\x04m\x01\b\xC2\xDF(\xD9e\n\x18\x0El"b\tQ\xA7\xB1\x9BD,\xCF\xC3\xC1\xDF\x86\x18\x04\x80J8\x02\xE9\xDA\x80\xC6\x1C\n\r\b-\0\x8Bz\xB0d#\x8A0\xB5\x96t\xAE\x0E\x88\xF17\xBD9\xD7P#\x80\xFCI\xC2J\xC4E+}\xCC\0*\xBA\xF0\xEC\xAAT\xBBjC(eFP\xCF\x82\x1E\x1A\xEA\xF5\xAD\xAC\xF5\x1C\xD7r_\xD7\xBA\xEE\x91\x92\xECKC\'1\xA2f\x07\xD0\x10\x15\xC0\x94FC!\x06y\xE0@\xB4\xA3\xDF\x91\xCCW\x8C\xCE\xC7\b\x1B\x0F\x06r\x1F\f\x06@E\x0F6\xF8\xF6\xC4\x8B\xFB\x07\xF6g~?R\x9C\xF9\x10\xD2g\xDF\xA5q\'\x1E1\x0E\xE35\x8D\x98\x15\xDA\xECa\xB4P6^\xA9\x07\xFA\xDEl\x0E\xB6\x12\xBD/\xD7\x94G\xA0$\xB6\xCEGNtF56w\xE2\xA2B$\xB3\xAA\xBET\xFB\x8E\xBB\x99\x03%2%\x84\xC1\xF0\xC8\x1D7VL\0\xB0|\xC4Q\x81\xBA\n\xA4H\x8FW\t\x95\xA8\xB1\xD7\xBC\x05yN\xF3\x17\xEBoC^\xBFVP6-aLlY\xA99%7%v\xD8\t"\x02^\xC1E\x92n\x13M\xE2\x8B&[j\xEC\x007{\xC9\xA7\xE2i\x80\xD55\x83\xCC@9\xFB\x99\xDF\x0Fkk\\\x8CA\xCFI\xCF\x8C\xCF]\x9D\xF2\x1B\x14,\x16\xB3\0J\x8D\xB8\x0B\xCA\xAB\xDD\xA6\xE3\xE7w]\xD3U\x11\x9D/\xEB~\xBDs\x13Z\xA9\x1C\x99\n,\xF4\xB2\xBA\x90\x13\xB1\xA0$7\xD0}Ozi\xDD\xCA \xDA\xD5\x10\xA0\x82\xB1\xD2\x90\xC3\xF9ij\x16,\xCE3\xCD\xCBy.v\xC0/0y\x1B\xD2{\x13\xF3\x1CZ\xC1%\xFB\xEB\x90%KQ\xC1D\x0ED:\xAF>\xF3\xCC\xEF\xEFo\x1Do\xFB=;\xEE\x01\xFB\r\xBA\xAD\xA0b\nDDEL\xB91\xAA\x1B"vAS1\x928\x0Ba\xE8\xD7Fhs0\x7F\x7F;\xB5\xDBU\x04\x12\xA9:\xDE\xF5\xFE\\`\xF4\x1E\x9Cb\xF5\x03\xEA\xD5\xFD\x15\x1B\xB0\x04?\xF1\xFCq\xBE\x9F\x18\x81\x16\xB8U<\xC6a\xA5\x9D\x1D\x1E\xB1\t{\xDA\x11\x14\xC9\xB9%\x8C\xB7\xBC\xF7\x96\f$\x90\xC1\xC6\xCA\xC9e#0\xA2\x101\x14A\xD6\xBEE{\xCD#\xAD\xD2\x19\xF3 \xA1a\x90\xA4\xEF\xC2\x07m\x9D\b\x9A\xBB{,\x11\x0F\x8F\x8B\xBC\x03a\xEF\x8A67g\x8F\xE9\xB3\xCE\xB6\xA6P\x02\x19\x11\x89.\xDC\xF0Z\xD8:\x9F\x9F\x07\x90\xA9\xCE\b\xB9d\xCE\x80\xA1\xB6\xD7b\xBDF\xDD,\t\xB0\x90e\xD4/\x10\x8A\xE9\x88\xB3\x90\x87\xDB\x803\tHi\xC1u\x9FK\xAD%\x8E\xB3\x8C\x7FL.b\x96TT\xAF:\xE0\x98\xE4\xA2\x1A[1\r\xA3@\x8D0\xE8\x89\xA8\nMF\xC15l\xA6:V\x13\xDA\xC0x\xD8`\xD7\xC94l\x0B{\x82]8O\xD71Of\x88pkn\x98\xCB\x87\x91\xD0_\x91\x93\x8AC\xB0#<C\xB6sLV\xAB\xD2\x1CU\\76\x1Fr\\\xB0\xBD\xED\xA9\xDF\xDB\xBF\xFD\xFE{_x\xE2\xF1\x03\xBC\x9AK\xB8\xA9\t\xA9\x12T\xF6b\x11\xFEz\xEEB\xBC\x0B$\xEF\\3\xA2\x13C\x98\x17Q\xBFQ.ATG:!\x94\xC5^\x10\x7F/a\xCF\xA7w\xA2\x82S\x8A\xF2z\xAF\xBE\b\x9B\xFD\xA3y7\f\xC0\r\x06\x1Ec\xC3\x05Q#cR\xA5p7\x1C#\x8A\x99N_4@T\xACB\xF4\xF3 \x132\x8B\x9A\x83\xDAXe\x82\xAEPp\x07\'\xC8\xC3P\xFDL\x9DX\xB9\x11\x1E\x15q\xB4.\xE5.T\x9D\x8D\x8B\x03\xBB#\xAB\x9C\r\xA1\x82&\xE1\xC1:~\xE3\xE0\x1D\xA8\x1A\0\xB41\xA4\x84\x8D\xCF1\xA3\xED\xEE\xA50\xD1dJ9^C\xDA\\\xEB\x01\xF0\x99M1\x99.\xB5\x81\x8AS\xF0\x92\x92\xD9\xBET\x8B\xA6[\xDF\xB2\xC87\xE2\xF0\xC95\xC7\xF5\xD2\x82\x9B\xA2=qI\x14\xB1hM\xA5$\x96Z#\xE4\xA1k.\xC8\xBD\xB8Z\xC0\xD5\x12\x86\xAC\xBE\x13\xCE\x07\xF3\x92\x17\x84B$m\r\x1A\x8B\xC6\x15\xEDZ\xBA@\x85\x12\xB8\x1E;\xD7\xB7\xAE\xFE\x8C\x8A\x8F`\xBF\x9C\x88\xC3\x96\x84+C\x97\x1A\x97ax\xEA=\xEF\x7Fa\x7F\x1F\xBE\xEDw\x9E\xF5\xA7\xF1*^\xBFE\xF4\xD2qW&\xA0A\nz\x90\xD0,\xA4\xA9\x88\xD5\x16b\x93NG)\xB7\x18+\xD1\xE0XIF\xF3\xB6_d2\x1B=\xD8\x91\xE7\xB9m\xB1\xE1\x04\x1A\xAC3k\xE7\xB5\xFB\x8B\xD1,6\x8B\xC6\xD4\x18Gp\x9B9IZ\x03\x8F)\xD1\x0F>\xAA\x1BD$\xFBt\xEE\xDDh\xB1\xD1\xAB\xB6n\x8F}\x12\xAA\x16B\xEE\xA1\x80\xF0V\xC8\xAD(\xBB\xC4\xC1\xFB\x1E\x9C7\x95r\x17\x969\xE0\xDCg!\x88+\x89\x93\xEFd\n$\xA2\xC3\x81\xCD\x9D\x85sbQ\x87!\xD1\xC3\xAD\x98UxCj\x8F\x89\xF4r\x04c\x18!\xF4e\x88\x9ChFJ\x84\x97\x82k>\xE8\xAA\x13\xF0\x99\x19T;\xB9\x96\xF4|\xFC\xB22\x95\x84\xFB\x9D0\xBB\xFE\xAC6$\xF5\x8F:\x1FjG\xD7v\xC8\xDDaw\xCFI\xA0\x14\x9DB&\x92\xEC\x1D\xD2\x8Bi\xCC\x90\xBC\x8DH\xB3?i_`\x1E\xC1\f}\xDDR\xE7\xAF\x1C\x880\xB0^\x1A\x93\xE9\xCC\xAE"K\x16\xE9\x9EL\xD2s\xCD\x8A)\xAE^\x8C\x1E\x89\x19\xF1\x06\xDER\xB9\xCBs\x11\xDF_\xBF\xDE\xF0\xCC\xF7\x7F\xFF\xEF\xEC\xDF\xEDW\x9F{\xCE\xDE\xE6\x9F\xC7\x97\xCCN\x84\x13\xD2WD\xB2\x86\x0E\xDF\x85\b\xECD@uLL\x03\xD9~\xA9\x07\xC8\xF3U\x9C\x05\xBAg\xDA)Z\x9B>\x80q"\xEEqF\x05\xEC\xD7\xA2"4{DC\'\xA9\xE6\xC0V;Vcj\xF2\x1A\x18\x19\xC0\x8D\x1B\xEE\x91x\x0F\xC4\xCE\xCF\x831\b\xE5k\x0FUBh\xC1A\x81\xE8H\x15&\x93\x94,\x18\x8AQ\xD5: i-\xE6\xA6\xD8t0\x0F\xA1\fz\x87;\xB6\\\xB3\x96h =j$z\xB9\xE9\xB2|V\xEA\xFE\xD1\xA9\x83\x06\xC19-#\x7F\x01_\x99MC\x06b6zml3\xD1\x82\xD6\xBD\xDE@\x11\xF2\xB4\x8A~<t\\\xF6\xAA\xB8\x99\xEA\x07\xCA;\xB2\x18\xFF\xFC@\x16N\xC9E\x1D$\x14j\x14\xB1!\x8B\x8Ff\xB2\x15]*!\x90.A \x19\x0E\f(\xA6\xA1\x8C\x7FB\x17"`1\x0B\xADI\xD1\x84\xA4/\xEA\xB7d.\x92\xC6JO\x96\xB4\x96\xFA$\x15qk\xE7"\xDBKuqr\xB51\x932\x12\xB38o\x1E"\xAAB\x9F\xDBs\x80W\xBF\x01\xAA\x1D\xA2\x83x\0\x0E\x83\xBD\xFDi\xC7G?\xFC\xB9\xFD\xD91^\xFD\xE1\x87\xFF\xC7\x8B\x06{wZ\xF6\x97\xD0c\x94\xC7`\xD1\xE1Hp\x9A\x98v~}?\x878\xEB\xB7\xDB\x9E\x85z\x97[Q\x06\xBDx\xF5\x89\x13\xDA8\x13w;o\xB9\x7F\xDD\xA7\xF4q\xE3"\x12\xE3\xA0\x9DA\x8CF\tF\xA7>>\x06\xF0:\f\xF71p\x10\x05\x84aMR~\xB0\xF4=U\x05\xE5<\xB8\xBC\x04\x8C3\xB0\xB6\x9B3\xDBQ\xC9\x14\0\xA9JH\xCD\xD0k\x8A\xF0\b\xDF\x93&$\xC4\xB8\x10f IHJ\x8FYR?a<\x89\xD1\x0E$c\xB0Yl0\xD7\xBE\xDA\x012\x11j\xB0\xAD\x83\xC7\xD3\xD8\xB8TH\x02\xD6\x8E\xC7\xFD\xE2\xFE\xD6\x10\xEBh\x9FM\x1A\xEB\x128l\x91\xEC\x82\xC3\xDD\xD0\xA6k\x1Ba&\xD4\x97\x14\xA7\x84\x16\x03\xCA\xF9\x1Ad\x1E4\xBEI\xE7\x97\xAD&\x8D\x94\x92\xBE\r\x8E{\xCB\x02\x9D\xDDS1\xB0\xD8=|o\xE3\xD2\xB5^\x8CA\xEAH\xF6U\xA2\xA4\x19/S]Rx6\xDB\xC8\x89\x8A\xF9\xB1^/a\xA1Y\xA9&\xBE\xB4mp\xDC{\xF2\x99\x17\xED\x03O\xBD\xBA\x03\xC0\x93\xFE\xE03\xC0\xFE\xEE\xAA/\xD0uvC\x05\xF5H\x97m\xA5\xBC\xA8\x0B\x17\xF1\xDC\xA5\xA7\x17\xF2\xE8\x16\xF6\x85\x11\x9C\x83\x87\x12\x81\x88@\xCBh\xB7\xA8.K;w\xC3\xFD*w\x06\xF4\xE2\xA8\xF34\xA6\xBE\xFDZ\xE9y\xC5\xC5\x1D\x03\x17\0\x8F\xA0\xC8\xC5\xB0\xF4\x1FV\xD1\x81\xB1\xED\xFBP\xAF\xA1\xE0\xA2d\f\xA6\xDD\x98\xC2V\x10\x19\xF3UeIp\xDD\xC4,\xC0\xD0hg0\xAB\xECZ)\xB1=\x93\x93\xFA\x1Bn\x18s\xF2\xB1S\xDEM\xC31\x01;\x82\xC0\xE6\x94"C\xB67\r\xF3p\xC0,\x8Dp\xCA\x8A\x17})U\x9A]\nd\xE0\x80O\xC3\xD1\x98\x81\xD8\xB3\x8B1\xF1\xFA\xCE\xB4\xC4p\x96\xC8CHB\n\x0E\x8B\xE8\x81e\xB3\x15\xBD\x9B\x1B\xB1\xCEkR\x1F\x88\xB5\xEA\xCA"\x14\x01v\xDB\x85\xB8\xA3\xDA\x94\rB\x8C\xCA\xEB\\\xAD\xAB\fzj*L2 \xED\x92\xE1\x80_\xC1z\xDFx\x9DCi\xC84\x84v.\xDA\xED"BF\x0B\x13\x8C\xB9P\x1B5\xEE\x01\xD8\rJ\xBDo\x13\x9ELS\xC7\x15P\x15(\xE6\xF1\xBDg?\x03D\xE2\0\xDE\xE6\xEF\xFC-\xF3\xAB\xFF0Cd\xE5Ah\xD23\x9E\\\xAF\x8B\xD0\xB8\xA8e`k\x12TO:\xEA1\rk\xAArSQ\xEEHG\xEE\xE9\xCA\xE5%(\xCF\x84e;\x9D\xC1(\xB0\xAA\b_\x0E\xCFz\x15cZ34\x89\x88\xB2=\xDC\xD9\xA7G6p\xE3\x83\x06\xC4 \xE8\xC3\xC2\x96p\x806\x04>\xE6\x83\f \xC3M<\xA2\f\xE5a\x98\x1EhA\xA6&\x19\x1DG_&\'\xEFA\xB7\xB9i\x8DM\x12a\xDA\xC0P\x814N\x06Q\x81F\x96\xC1E\xDD\xB8\xA8\bF\xE7q-\xD1\f\x04Jf\x13m\x0F\0\x98\x91\xA9)\xD4!\x17dn 2{\x1F\xB40k\xED\xC7\xEF\xBC\xD9\x82.\x82p\x87[X\xEByN\x19\xFBZ[\\\x9F\x95\x1BA7\xAF+\x9DZ\xD7!t\xFA\x94\xC6\x17(|+\x89\x99\xCF_\x8CB\x15\xA1J=\x96\x0E\xCF\x88\xC5\xB4A\x88V\xC4\xB1\x15)(D\xA2\xF3\x80>\xFE\xA4\xB5zp\xCB\xBA\x8E99\x8A\x1E\x92\xA1\x95\xD8P\x88\xB4\xFB%b\fR\xE7\x13s\x0Btc4>z\xB8|8\xCE`]7\xCF\xDC\xFB-\x80\f\xE1;\xE7;?\xBDM\xC3\xDC|!\xDE\xD0\xD7\xB7\x9C\xA8\xD5#\xD0\xE3\x15z~\x82-\xC7o\x13l\'4C\xED\x04e\xED>\xD4\x053\xF3\xB23\xA0\x80\xF6\x96i\x9Et\x83\x9E\x19L\x12\xBB\xDA\x94\xAAQ\xF6\x02\xF5S[\x7FW\t\0\xE3sk*Q\x1A\x8E\x80G\x03x\xDD\f\x0F\xB0\xE1\xC6"\x9B\xE0\xA0\n\xB1\xA11\x83\x94\xF0\xF1\x1EtgM(\xE2@\xF9\b\xF4@44\x96\xE6+\x1A\t\x1DXlj\xD3\xC1\xEC\xC5\x90\xFA\x9E\x92\f\x99\x93 "\xE8\x86\xC79\xB5f\xA9v\xA0\xCE\x9D\xEE8<\\\x89\x83\xF4\x19\f\xC8\x0B\xB9\xCC\x98\x9F\xC1\xFEH5\x91w\xC2i(I\x06\xA0\xCDX\xD2 \xBE2\x84[\x04\x82bH\x9A{m\xBE\xBA0\0\x11rJz\x11qAi\xC1{KI\xDA\xA5\xBC>\xBD\xAD\xBDhgIv\xD2\x9AHBT8qC\x12\x1C\x84\x83kR\x97\x85o\xB8\xEE\xD5=\x10\xEA[2\x02\x96i[<,\x13\xBEx\x19\xE2\x98a\xD6\xFCr\f\xF1\xDF\x80\xC9H\x99\xE8b\xAF\xFB\xBAvyo\xF3\xCE\xCE\x8Eg\x9E\xFD4@\x86\xF0\x1F=\xF9\x81O\xFE\xAF7\xF7\xF1x<B\xAA\f\xD6\xD0\x81\x95\xB4\xCF\xE4 \xD4\xE2\x15\x11e\xD4aJv$d\x06\xD6sW\x14\xC1cM]Y\x19\xC8\xD6R\x95\x01\x1B\xCD\x9D\xD8\x19\x14\x99\xC2\xB8u\xAFB\x1F\xB3\xA1\x8E5\xFD\xB9Im\x04\xC20\xA9\f9\x83\x80\xA2\n\x1F"\\\x90W>p\x05\xC7Aubs\xC3f#5\xBF\xCDA\xA2G\x04k%\xBC\x8C{o\\\\\xB1\xD6=\x17Q\x12\x9F\xD7\x1A\xE9\xDB\x13\x18\xD7\xCC\xCC\x8E\xAD#\x8E5\x15\x8B\xDD\xA7\xD5\xB9\xB2\x1F\xE82\xD2HT\xD5\xB2(\xA3\xD6\xDA\x01=\x14\xC2Y\xDDk \xC4\x90\xF6\nh\f\x84\xC2D\t[g\x02\xB3}vt\xA0\x9BNp\x7F\x87\xFA\xBB$\xBC\x04\x8E\x17gL\xA8\x8F *T\xFF\ny\x04AL\xD6h\xA814"\x17SH\x95A\xF7\xE9u\t\xF5\xDCnP5 \xAC\xEE\x93\xD1\x8E\x86\xCA5\xB8\xE8\x89\xC4\xBA2\xE1ON\x82_h{\xD8\xD6{\xE78v\xDC\xAE\xC4\x14\xA82B\xFDew\xF0\xD6\xFFH\xEFN\x1BC\xDA=\x06\x1C\x17\xA2\xBET\xEApc\x13\xC7\xF7}\xD7\'\xF13d\b\xEF\xC03\xBF\xF9\x1D7\xEF\xC7\xA7\xF7\xCFB\xD5{\x93\x8B%\x91v\x88]Du\x97\x8D\xC1s9\xE9\xA6g\xDD\xBE\xC1\xF0;U\x84~^cP9\xD9\xFD\xDC\xBB\xFAV\x13\xA7\x18\nW\xFB\x19\xB8THe\n-,}U\xBB^\x7F\x1B\xB2\xFD\x87\xEEx\b\xE0\n\x03;\x0E\xEE\x95\x1D}r\xA7aQ\x01Q\nU\xE6xB\xC8\t\t\xB0\x90\x06,\xF4u\xEA\xAD}\xCD\xA7\x8B\xAF3\x07.\x11\xE5\x16\0@\xED\x1C\x84"\xE2N\xC0\\d\xB9\xA1\xC8A\xA6\xE1\x96R\x1E\xB3?\xE1\xF8\xED\xF0\x16SI/D!\x94b\n\xEE\xCE$)2X\x17r\b\x82It\xD0R\xA9\xB9&qr\xF1\xD4wO<\xA2A"P\x80H\x8CD\r\xCD\x9D\x92x\xBC\x8E#\xD0\x82y\x95\x8AO\xFBDN^\xBBq\x164\xE5D\'z\x90\xE4\xBEB&\x1E\xA5\xB7@\xC8\x04\xC8\xBC\x01\xF6\x81\xD6\x9F\xEAS\x89wT\xAC\xCBD\x16\x83\x91\n\x92O\x99\xE8\x07\xED\x9D\xAE\xC3"\xEC\\\xAB\xF2\xCA\xA4-\x84c\xB4`p\x96\xDE\x94(U\xE7\xCF<\xC0\xDB~\xEC\x87~\x13\xFF\x0B\x19\xC2\x07l\xFB\xC2\x7F\xFC\xE8\xFF~\xF1S6\x9E+X]\x9DM}\xC5\x94\x11)"!|o\xD2\xF6\x96\x8D`a0\x94\xE4Y\x0Fad\xDBqE\xE9\xF6\xD9\x0F2\x9CE\xA7\xCF\xF6\xD7D\xA7\xF2 \xD4\xC3Mf\xC0v\xD4\xCF\xC8\x06\x95\xE5c\x14?pF?vx\xDA\xCA\x94\xC9xz\xB1@\t\xF7a\xB8\xF1\x81\xC7\0\x86\xE7\xEE\x8F\xD0>\f7\xECS\x94 \xA7\xA11\x13\x93b\'\xE92>\x16\xD1\x06\xD4\xF7\xACc\xA0\x9D\xA2S\xA0\xBA\xB6fkk\x86k\xED\xA0\x9A\xA1\x9A\x9AZ\x87\xC9<x\xA2)\xEBq\xD6\xB9\xAA$\x16\xEAD\xF4I\xB1\f\x8Ep[N\x8B\xDF\x8F\x89B\r\xB3\b>J\xA2\xF3)\x92QT@\x945B\xD5X\xAD\xEC\x16\xCB\x1E\x8B\x1C\xBB\xC60\x89\x14\xB8\xD3r\x8D\xCF\xB1\x06(\xA1\x11\x0F\x9Fa&Tu\x1D\xBC\xC1x\x07!\xB7\x84@\xB4\xA5\f\xCE\xB0E\xCCbP\xBAG\x86]k\xECr\xFF\x89\xF0\xF7\xEC\x97\xA5\x8A \x98$\x9Ap0\xC2\x04f\x17z\x0ED\xC4m]\xB4\xB5\xBE\xBC\x1C\xA8\xBD34~]\xA1\xB9\xE6\xDF\x99y{pz\x1C\x97\xE7\xDE\xF6\xA2\xFD\xE0\xBB\xBE\0\x90!\0\xC0[\x8E\xA7\xFE\x19\x1C?\x12\xC4z\xCA(4\x85\xC6D\x03=y\xC8F\xC5\x1AT\x1E\x02\x89\xD3\xB5\xF8)m[\xF4\xDF\x82\f\xB2\xEB\xABZb\x94\xEAk\x80\xD4\x8AHFg K{\n\'\xE6\xFDN\x1E\x84\xF4"\x901 \xED\x12\xA3\x18x2.\xE4\xB8\x90\xE3\x1A\xF8\x06\x80\xFB\0\xAEh\x14\xBC\xB1\x81\xDD\xA3\'\x1B\x98\x80jat\x9BpL\x97\x0B\x91nJ\xB3&\x17\xBCT\x82\xC6\x1AK\xA8\x9C\xA2\x12i\xF0R4\xA1\x898I\xDC\x92\xE0\xA0\x17B%\xD3\xCAR\x191\x07\0Je\xF0\x88n\xDCH\x9C\\^\x8C\xA0\x94j\xC0\xCC\xBC\x86\n\xDC\xA3\x0E\xE3\x80\xA5\xBD\xC3y\xFF\x890\xA4f\xF1V\x8E.\x11\x81\x90\xBF\x16\xF6lK\xB8\x8D\xDB\x8EB6\xEB\xF3n\x93\x84\x01\xCCk6\xAA\x98\xFE\x93\xC4o\xE1\xC6\xD1\x87\xEE~l\x1DZB\xA6;\xA1q\x80"\xF4d}\x8A \x04\xD2;\xA1~\xE4}*V\xA0{A\xD2\x16\x92\f\xE2R\xE3\xC9\xF6\xB6\xB5_\xE9\xA2T\x1F\xB5P\x80\xF2\xB2\x88\xF9\x89\xC9\t5\x1C\0\xA3\x80\xDD.\x18O\xDC\xFFg\xEAI2\x84\x0F\xD8;\xFF)\xFC\x89\x1F\x01<c\xD9\x0B\x8A+0\xE4\x94\xC7\x90l\xA2\x95\x05\xE3#\xAF2\xEE+\xAC\xEF\xB5\x13\xE2o\x11,\xEF\xD7\x8A\xB7\xBA\xD4\x84\x16\x99\xB8"\x83\xB3\x8A\xA0>K%9\xAB<\xFA\xDD\x1B\x93i\xEA\x0BP\x0BU\xFD[\x18M\xFD-\x17\xE4+nx\x02\x03\x8F\x11Pzo\xE1]Y\x18\x85\x06V\xA5\xD2z"\xAA\xE8S_\xF8\x11X\x14=\x8B-\x07-U\0\xBD\xE1h\x01C\x1EL\x81D\xE73\xA4\xF9\x90\x8B\x91\xD27\xA4\xBFC1\f\xEE\x91\x8F\x91u\x10BH\xE1\xD2\xDA\x8F$\xA7r\x83&AK\xBD`;)\xAD\xD5gt4\x92\x82\b\xB2\xDAo\xF4r\xA0\xD3\x04\xC7R\x8C\xC2\x93a \xCB\xC3[ \x88Ts\x880s\x9F\xC3T\xA4\xC2\x9B\xC0D\xA5\xA8\x9F\xD0`F\x0E\x18$\x1C\xD9\x03\x1C\x151Y\xCC\xDF\\\x9CZD\x86F\xD4\'\x06\x92\xD1gg\xE6\xB3J\xEA\\\x07\xA9z\xB4k2UY\x84\xDF\xDAj\xC6\xC1X\xBB=\xA1K\x13&f\b\x1E\x13\ni\xB4\x91\x8Cd\xE0\x95\xE7\x9E\xFE\xA7z\f\xC9\x10\xBE\xFF\xDE\x9F\xFE\xB5\'\x1F\xFD"^\xBB\xF7\b\x9D\xD0\x8B\xFB!\xA1\xAE\xA1\x13h/\x03\x06,\xC4z\xB2-\xDC\x82<\x8A\xCE\x13\x8C\x17\xB19\x90Qg@#jMB\x1C\x1B\xD96\xD6\xB6=\x98\x89\'\xA7\x96\xCD\xA0\xA3\x07\xDDCVlF\xEE\x199\xBE\n\xBB\xC8\xD8\xE3\0\x88\x86BPD\xDF\x1E\x9A\xE1U\x84\xFD\xE0\xCA\xC3\xD2;\x19y\xB8A5\f*\bIy\n\x86\xB2\xE6\x870\xA1\xB4\xD6:\xA5\xD5_H \x98BA|\x07R\xFF\x97\xB4\x06%\xBB"\x01\xA3b\x92W`\xD2$\x13\xA0%}6bN\x95\xD9\xCB\xFD\x18\xA8\t\x19\xB5(\x04\xA2\xE5\bGl\xDE\n\xD1d\x10\xBAT\x1B\xA5_\x97A3\xC6\x9Cq\x13<oU9$\xE5x\xFF\\\xD8m|I\xCC\ri\xE4w1\xD9 "\xCFMV\x9A\xAA\xC0|n[,\xFB\xFA\fx\xE53\x18\xCE\xB2n\x92Q\xE8S\tR\xB3\xFA\x98\x9D\x173\x90Z\\\xCF\xAA\xCC\xB6\xDAcq\xB2?RA\xF4\xBB\xD6\xFC\xC15\xD1\xA2\f5\xD6Y\x04n\x19\xD6\xCC\xF5\x94\xEA\x88\xA1\xB2(c\xE2\x9D\x8B\xEDf8\x9E|\xFE\xBD\xBF\xC6\x1B\x16C\xF8\x88\xBD\xE5W?8\xDE\xE5\x9F\xB0\x17\xAC\x92\x99Dl\xE5ehql(\x86p&v]\xBB\xDA \x12\xB2K:\xB7\xDA\x8C\x8B\xAB\x92ha\xCD|l\f\xC1\xCE\x06\xC4Vl\x846\n[\x98\x80P\f h\'\xA4\x11\x84\xC0\x87\x10YWXb"\f\xEDo2\xC5\xB6H.\x18\xF8:\x80k\f\\Y\x18\x19eS\xB1Y\xFDH\x94\xC5o\x1B\x98\xAA\xEC\x01\xB5\'J\xD8\f1E\xE5\x19\xA0\b\xB6\xDB\xA4\x84(\f\x96\xB1\b\x92\xDC\x17\x0Fc\xDE\xF0b\x0E! \x9D\xE7[&*eD#\x85\xE0D\x85%\x1B\x17\xF0>\x85\x1A,\x9F<fx\x10\x84\0D\xEC\\kdZ\xB9\x06oy(R5\xE9j\xB5\xD4\xFE4@\xB6\xDF\x92\xF0\xC5\xE8\xFB\xB1\xF8\xD4\xE6\xA9\xC6uQ\xD2\x7FV\x870\x11!\xCB\x1B-\xFC\x95_\0\xBF\xC6\xA2.t}&p[\xDD;\x13\x9B\xB8\x862h\xA8\xA1\x01G\xB5\xDF\x98VV\x8D\xEA\x12\xBC\x95\x83\xCB\x01\xA7\x84\xE0\x18\xD6\x81c\x8D\x9C\xA4\x1A\x012\xAB\xDEN\xD2a\xACu#3{\xFC\xF6k\x7F\xFA\xC7\xFF\xF2\xAF\xE2\x7F\x8FV\x93!\xBC\xCF\xECK?\xF6\xFA\xDF\xFF\xCC\'\xF0\xE2\x07ej+H\xCD`\x9F;\tL\xD3\xAF:\t"^\xC5y\xEBw\xBEO^\x8B\x85q\xE4\xEF\xFD}\x0E\x8B\x96\xDD\0K\x1BI\xE4\xB9+\xD2\xAA\x9A\x94\xFF\xB5\xA3\x15qo\xE3\xFFb\x16=\x1A\x92D\xBC\xA8Qu\xDF\t\xC3C\x07^\xB7\r\xD7pl\x1E\xEE\xA0a\xA1>l\x1E6\x02\xDE"\xD9B\x1A-\xD3&\x90\b\xB7\xD4\x82F\xE4"0\xC5\x14\xA4t\xA7Tw\x0F\x02\xDFR\x1A\xC7=\xBA\xEBR\xA877Q:\x1AA\xF2S\xC6\xBF\xAA\x1F\xC4>\x8B05\x16\xE7\xBD:"H)Y}\xD6\xBDG\xBB\x0F\x9C*\xD5\\\x8F\xF5\x9D\x98\xD3\x8E#U\xA71\xC1\xBE\xA3t\x11\x14\x8A\xB97\xD5\xC3\x16b\x01\x96*\xC4\xA9\x16\xE8\x1C\xBD%}\x19\xAE\x9F\xFAz\xD3\xFDS\x9A\xAB\xB8js\xEF\xE1\x92\xF7\xEF\x10]\xF5!Cu\xDB`\xCE\xCDl\xBB\x0BuQA4\x0E\x11\xB9\x90\x81~\x13\xC7\xF4\xEC\xC3:6\xA9\x1B\xCD~!\xE6#Zy\xFB[?c\x1Fy\xCB\x97D)\xC9\x10\0\xE0\xBD\xFE\xF6_2\xB7\x0F\x8Ah3\x8A\xCFD\b@\xA1\x07 \xFD\xF4\xA0\xCF\x99\x06\xC9\x99\x93`yM\x955\x0B\xFEtk\x0F\x87[\x05L\x8A \x97\xD0\xE3\x055D{\xB3\x9D\x87\x93j\xD0c\x0B:\xC3pI\x96\xAC\x16\xB2\x96+\x13*\xE8\xC6\xC7\x8A\x94\xF4\xE5\xFE\x87\x01\xAF\xB8\xE3\xDA\f\xBB\x19v\x0F\xC6p\x03$:\0h\xAD\xEFk\x7Fz\x956s\x12\xE2\x8C~\xDA\x01\xAA\f"\x18K\xAF\xC2\xA1.O\xA1\xDFF\xB0d\x12\x10s\xF0 \xA8\x83D\x99\x16}\x9E\xDFK\xB0\xFBD\xC4\0\xE8\xE5\xC0\xB0\xC6\x90<l\xE1rM\xCEYL+\x97dcf@yBrW\xB1\xC6\xD8\xD4\xD7286\x15A\xCC"\x9F\x1BNo1\xD4\xFA-\xE3+d\xA3\xE8\xE7\x83*\xE1\xE4:q\x12:\xAA\xAD\x8A\xAF\xD9B\x82J\xD7q\x0B5,\x83\xDB\xC44\xE4.\xD4+\b\xCE\'\xC5\x0F\xED\x01\f\\\x84\b\xD1\xDD\x83V\xBC%9e\x0E\xC3\x85\xB5\x15\xA4\xE7\x8Bx\xD5H#\xF4\x9C\xF5\x81^\xDD\xA9\x06m\xC5h$\x9CY/\xCF\xE0p\x03.\xCF=\xF5K\xF8T=\xF2\x85!|\x9F}\xC7/\xDE\xBB\xF9\x95\xFF\xE1\xD1\x95\xA3\x82\x91\xF8@nA\xEE\x95p\x9D\xC5V\xED\xD6o\xED\xA1v\x82KH\xDE8_2\x9E&\x99\xFB\xF9\xF9\xE2\xC4*A\xA5\xD5:\x18\xD4!\xD7\xED\xCD8\xC1\x89"z\xBF\xC6r}\xD9(\xAA\xDF\xB1\x9EVd\x91\xF5\x13\xB9j_7\xE05\x18\xEEa`\x87\xA5;\x11*)\x97\xFD\x103X\xAD\xEF!\xC1\xED\x14{\x10v\x84\x84\xE3(\xE8\x9F\x926\x19\x81S\x87\xAFLHy\x16\x04\xE5\xC3\xF2\xEFI0\x9D(\x85\x0Ez^\xC1\x92F\r \xCAzX\xD9\xBF\xBCl\xEC\xAA\xC3\x004\x1E\x8B"\xF8\xAE\xCEt\xC4\xD0]\xE4\x98\x1E\xDC\xB5\xF5\xA1\x8F\xD5[\x1B\x89\x0E\xA4\x97\xCF:&\x06\\\x8C\x83\t{\x0E\x944\xE6\x059wh\x86G\xE7\xF9#\xCE\xCB\xF5\xA2\x8E4"\xCE\xAD\xE8[\xDB\x8B\xD1\x8E\x1C\xD0\x07\xA0\x8D\\\x12>\x01\x05\xBB\xB8\xBEr\\\xFCM\xED\xE6\xEF\xCD\xCE\x90\xA8\xC2\xEA\x1Egd\xA1\xF3\'\xDA\x84\x87 \x7F\xBC\x01\xF6\xFEw\xFFb#\x86\x95!|\xF4\xFE\xBB~\xE1}\xAF\xBF\x03\xBF}\xF5\xE5vt\x95\xC6\x9E\xC7:\xDC\x1F\xC8-\xC7\xFC\xFC;\xFFn\xC4\x1F>\xDD \xCC,n\x92\xCC\xE0\x8D\x18\xC2\x8A\x1ATqF\xD7\xA4m\xC3\n\xAA\xA9\n\xD1r\xAD\xB7<\x85\xB4\x17l\xB7\xEE\x1B\x83\x1D\x8D\x19l\xCB\xFD\xFB\xF6\xEF\xB1L\f\xDFp\xE0\x1Evlp\xEC\x18\xD8<\x82\x8D.\x1E\xE5\xCC\xA4\x16\x04\x93\x8E\xE4"-M\xD5\x18H\x15\x01Z\xABA\xD4\x07\x17\xD0\xD1\xA4\xA2\b9\xD2\x9A\xD9e\x14\x81\xE4\x8ELd\0Z\x87C\xD2\xB7\xA1\n\x1D\xD3\x86\xAFB$\xC3%\x93\xC2\xFBdIG\xB1\x8F\xC2\x86-=\x1E:\xB7\xEE\xCB>u\xD5g\x16"\xA8\xBC\b>=\x07"\x8B\x8F\ts\x0B\xE1\xAB\xCF\'\xA2!1;\x12_\xAC\xAF<O\xCFT\x8C\xE1\xA8\xCF)\x89?Q;:\xB5\xCE\xFB\xA5\xD94\xF8w\x12\xB4\x88\x10+\xA3\x01\xEF\x99\xF0\x9D\x8Cb\nRq2\xBA1S\b\xC3\xB5\x07EW\x11f1"\xB9%\x93qh\xCD{1\xB1T\xEB/\xA8jQU\x0F\xC1|\xE0\xF2\xF4\x8Eg\xFF\xAB\x1F\xFC\x05\xFC\x9F5]\x0BC\xF8n\xBB~\xE1G\x1E\xFE\xF4g\xFE%^~\xBE\xD7\x02\xC0\xF2\x1Dy\xB3\x90\xEA\x8D\x98\x92\x936I\xDC\xF6?\xE8j\x82\xBC\x0B\x95r\xDC\x19\f\x9A\x9A\xD0\xB9\xF3\x86\xD9\xC3\x9D\xA5\xA64\x86\xE1\xE9\xD6T@\x87\f\x8E\xC0Rm)\x99A\xBF?\xED \xC9TP\b\xA6\xA3\x83\xA5_\x15\xDCt\xB1\x81\xAF\xC33\x16\xC1\f,f\xCA\x18\x03\0GZ\xDA-\x98\x02\xAF\xEF\xD0^~\xFF1[P\x10\xAF\x1F\xD3\x1B\x81\x95\x0BQQ\x81Z\x93\xDDX\x18\xC2\xC4)\x95-\x897\x89qz"\x8F\xE1\x96\xCCE\xC2-\x10\x80\x95\x80rP\xED\x1A\x8B\xE4\xEFu\x1A\xA09\xC8\xBFcN7\xADc/\x84\xB2%\xBA\x89\xB5\xB5\xA0\x80\xE6r\xACc\xD5\xDEtz\x04H\xA0v\xCB\x18\x19\x81tB+\x91\xF4E\xCC\xE6\xDA\xEBA\x91\x84\x94\xBC\xF3dO\xA0\xA2\x97\tV\x18pS\xA1\x19I`\xC6Kx\xEC\xBF\xAD\n\xCA\x9AD\xF3\x83\x91\x92\xE5F\x8C\xBC\xA8\x9Dm4\xFA\xE9\x8C\x105VU\xD3\x8Cc\xEA\x1F\xDAuz\xF8\xFA\xEE\x88\xBD-\x95\xD8\xC4\xB9\x85a\x9A\x03\xDF\xFE\xF6\xCF\xD8\x8F\xBC\xFF\x05\xB4\xD7\xC2\x10\0\xE0{\xE6;~\xF6gl</\xE2\x8C.u\xB8>8\x91\x9D\x10[\xA7:\xF1t(\x9E\xE9\xCD\xBD\xAD\x8E"\xB6\xD3\xF1\xDB\xEF\xDB\x9B\xC4\xC4\xF7\xE1\x83s\xC6\xA4%\xFD\xA6\xCC/-\xA6\x1E1\x99{ET?\xD3^\x80vn2\x81\r\x89.\xAC\x98\xCD:f\xC7C\x18\xBEj\x03\xFB\x04\xEE9\x0B\xA5R\x8A\xB1FN\x12\xF4\xA4J\xA0\xC8>\xC0\xD2((&!\xD5\xC2\x88\xDD\x8F\x19.\xD2M\xFA\xBF\x0Bq`\xB1!dfb\'tIq\xAE\xA5(\x92\xEA\xCC\x1Dp8\x89o\xCCbJ{5Q\x11\x8D a\xB1\x8Fi\x8Bh\xFD\xD7\xA2\xB6\xF6]R\xDE\t\xD5\x1Dq\x9F\x91q5\x85|\xDC\x11a\xFAn,\x04\x82$t\x9F\x91\xBE\xED\xD2\xED3\x14:\xA4q\x06Z\xE5\xB9\x96L\xB1\x92\xAB(\xA4\xBA\x84NC]\t\x84 rI\xEA\xBBb\x06&m#\x9D@\xDBy\xB7tz\xD4y\xECo\xACC]\x83Z\xAF\xF9\xBD\xDFW*\xC2D\xEE\xA9\xB0\xC4"\xF4s\r\xE6\x17T\x887\xF2\x1E\xE6\x1B\x8Eo{\xFAgqz\x8D\xF3\x81\xFF\xE0\xFEw\xFD\xC3g\x1F\xDD\xC7\x98w\xD4QDd&\x9A]a\xD8\x0E\x187iI\xFD\xBC%7\x99\xD0C\x87\xE3"\xC8\xE4\x1B\xB5A\0\0 \0IDAT*\xE6\x1A.\xC2\xBD\xA1\x07\x15\r\xEBz}\xB4\xE3\xCB\xDF\xCDGl\x1CJ\xBAU\xE4\xFA\xB3\xE6\xA9!\xE13|9\x8C\xA0["\x1C\xA91\xE9eX\xDE,^\xD2B\x9F\x85z\xAA\xF2\x93\x8C\x97\x03\xAF{\x04*\x1Dn\xB8x\xF8\xFB\xC3F\xE0\x8B\'\xA1\xDE\x8E\xC9E\xADu")/f//\xC1\x9C\x91[p\xF0\x9A9\x83\x90\xE7\xE9\xAD\xB5\xAAuz\xF0^B\xC8\x19\xDF3\x19\xEF0\x91\x04\x16*J]w\xCC~\x8DS\xF5\x89\xC0\xA7c:n\xDC\x97\x02IP\x7FI\x0E\x1D!\xEB\xDA\xE9V(\xA9\xCD\x83\xCF@I*\xFD\xBE@b\xD7*%\x93\xF6\n\x9A\x1A@\x96\x83[\xDD\x9B\x85\x18neZfM\xC7\r\xF0\x1D\x98;07\xF8l\xC7\xF2S\x1B!\xC7\xDF\xA6\xE8A\xEC\xA8\xAD\xD8u\xDEu\x9E\x17\xEE\xCD\xABjK\x05\x88\xF4\xEE\xD7\xEB\x1A\xEDk\xBA\xD0^[\xFB\xDA}\xBA\xF5\xCF\xFB\xF5\xDE\xCE\xCF\xFB_5Z\x1C\xB8l\x03\xE3\xFB\xDF\xF7\x0F\xCF\xF4\x7F\x0B!\xFCy{\xF6\xE7\xFE]\xBC\xE7\xD1\xAF\xDA\xEF\xDE\xEB\xB0\xB8\x88zG\x16\xFAL\x02\x04\x1F\x8B\xA1P\x85\xA44P\xD27\xAEY\xC2\x99\xF9\xC0+\xD9H\x9F\xED\xE1;\xD1\xC1\xB2\x07\xA4\xE5\xB92\x1C\xF6\xC0\xA9RE\xD8Fk?@b\x0F\xA1V7\xFA\xC4\x03\xC5\\\xBA\xBA\xA4>j\f\x8E\xB6$\x89\x13\x1C\x17g\x1E\x85#\xBD\tA\xDC\xD4yi\x1B\x88JJ\n>\xF2B\x04\x94\x94\x87\x16\xF8\x8C\b?\x9Fq\x97\xCE$J\xAA:#\x15u\x1FKB\xCC\x1C\x05\x9D?\xCB \xA9\xDC\x07\x97D%\x172X\xAA1Q\x88K^\x10!\x02\xB2E\xA7\xAD]\x89Y3f\x19^\x06\xC5\x90\xB4\xD1\t\xC1\xF7\xC12\xEE\xE9\x01\xA14W\x94\xA3\x10s"\x9DE\x05\xAA\xEFe\x98;3\x8E\xF6J&P\xDF\xEB\x89\xEA:\xA3T\xD5X\x1CY*=\xDB\x10\xF4\xE8\xA1\xC4\n\x18\x02T\xD2,\x8D\x94\xD3\xE1\xC9@\x94:}\xE4*\xF2D%\xCCjT?:\xA2\x80\xA4\xBF\x10E\x1B\xA3;j\xC3]\xF6\x07\xEC\'\x8D\x8F\xF2x\x98\xE0\x9A9n\xDE\xFB\xF4\xA3\xA7\xFE\xBB\xBF\xF0s\xF8\x89u\x9An1\x84\xE7l\x7F\xE5\xBF|\xF8s\xBF\xE86~\xB8\x8E\x0E\x9E*C\xC5\xA8\x0E\xA5\xCAP\xC5RB\xB7\xE7r\xD1\x80\x86\x8C~\xDDx\xA7c\x01\xBFWVP\xF5\x0B\x9C\xC3Z`?V\x02\xF7$\xEE\x16\xFF\x90\xC8@j\x81\xAE\xDB\xE0]e\xC8qX\x9B\x12\xE3\xBF\xC5\xF4\x16F\xD7\x18agnN\x11yxHP\x11\xBD\x13*O!\x06\x1A\x15\xA7\x1E\x19\xAF\xD5nJ\xC3\x11\xD5\x90\xC8\x14@\xB5A\x19\x86\x8E\xD2\xFB\x15\x8E\x9C;(u&\xD1\x88\xDD\x80\xDC\xD9I\x11\x8D8\xBC\xDC\x9E-\xF3\xD1!b\xB6\x1Ce\xE4^h\xB1\xB3\r\x0B\xC2\x0E\x1E\x12\x8B0\x92\x98|\x89\xA3\b&`\0fTnj\xAE\xC1n\xEB0\xF6\xCFip\xD5\x18\x143\xA1\x07\x11\f\x816\x8B\x84\xDE\xFC\x9C\xF5\xB7\xC3\x19\xE2\x8Cb*qi2\x9Ae\xD3\x99\xCC\xC2\xCD\x89F\x96Ws\x8B\x8E\xE4\xC6\xAB\x84\xED\xD3\xB1Z\xF8y.K\xB1+\xDE!\x93\x962\xB0J6\x01^\xDF\xC2\xAD\x93\xDB\xFB\x01\xCCKk\xB7\xF5#!%\x10\x1B\bKl\xB5\xE8Z8*J\xF1\n\xC0\x84\x9B\xE3x\xF7\x13\xBFh\xFF\x9E\xBD\x82\xD3\xEB\x16C\0\x80\xBF\xE0\xDF\xF5\x0F>v\xF9\xFF~\xF8f\xD7\xCD\xA5\xFF\x17\xA1\xE8e\xF2\xDF\xB3F`\x11\x19\x89\xC4\x80\x8A18C 0\x83\xF2.\xBB\x02=\t\x8B~\xDF\x91\n+\x17\xC7\xD2E7\x1E\xCAJ^5\x1D\xA4N\xC4\xC4\xDD2&.\x86I\xB4\xF6;\xE3\x11S\x18\xCB1Y\xB6\x95\xC9\xE7,2\xF8h\x1An\x1ATO\xD8\xEC\x96\x06F\0\xCCh\f5@\x86\xC0L0\x02\x16\x03\x9A\b\xC4dg\x90\xAE\xCF\xB5\x93\xC4\xE4\x15\xB9\xE8It\x8C\x18\x99u\x1D\x846\xDA\xB1@3\xB1\xFD\xDB!\x15\x8A\x8B.\ri\x9C\x81m\x063\xBF\xC0\xB1\x13\x8EOg\xD19\x0Fu \xD9*\x89=\x19\x1B<m#\x19k!\x83\xAB\x8C\xA5\x1A/\xAF\xDD\x9A\x8D!dh\x10\xBD\xF2lJ\x1D\x90@\xA0\xB4\xEFK+\x16\r2\xD8\t\x86\xB21\0UC\x80s?\x85\x16J\xF0E\x04\xE9\x01LUS\x8E\x95\x91\bb\x1A,a}/\x88\x82\xC6H\xFA\xC2h5\rP\xCD\x95\xADA\x8B\xFA\xA8\xBE$s\xD2\xB9^c\'zq\x16e\r\xC0\x11\x93f>p\x19\xC0\xCDw\xBE\xFD\x1F\xE0\x9F\xE0\xD6\xEB\x96\r\x01\0\xFE\x93\xFB\xEF\xFD\xD8\x07\xE6;|\xCCU\x8F\xAE\b>\x12ZfE\x8E;\xDE"\xC0~\xAB\xB3M\xA1\b\xAA\xAE\xDB\x11[\xD2K\xAF:\x13&JE\xA0\xB1/\f~\xE2\xEC\xD4\xB1ny\x10\x06\xA2tv\xBB\xFF9\xFE u\xC4\xDB\x9E\x84*\xF4\xD2\xDA\xCB{\xC6;\x9F\xE74\\(\xD9\xF5\xCC\xF3;\xA5c\xEA\xCF\x93L\xC1\x95Oa\xA9\xEE$\xE4\xEF\xC2Az\xBD\x17\xC1\xCF\xA3\xE9\xE6\xA9\xDB\xCB\xE6@\x9B\x02\x17N!\x96B\x1F\x93\xE7\x1FG\xBC\'\xEB#\xCAF0\xB3-\xABX\x89n\x0F\x98#\x8D\x9D\xC1\x8C\xC8\x90P\xB6\x82 \xA2\xF8\x9C\x138\x0Ek}\xD4\xFCx\xDA=\x0E\tH\xBD\x1D\xCB8\x9C\xC6\tsh\x93\x8C|{\x12\x1B\xEEx\'w\x03\xAB\xE1\x9E\xD4\x11\xCB\x18\x93e-S\x8D\x90g\xA7J\xB9\xC5zr\xA1S\xDFB\xD27;\x81\xB9\xEC\x0E\xD7\x80_\x03\xF3:\xEC\x15\x8B\xDE\xAF\xB2\xEE\xED\x9D\xF7\x1E\xED<}\xB2\x1D\xD9\x07\xE65l\xB6\xF6}\x0F\xBA\x90\xDD\x0F;l\xEEp\f\xDC\xBC\xE5\xCA\x9F\xF9o>\xFC\xB1\xBBh\xFFN\x84\xF0A\xDB~\xF7\xBF~\xF8K\x1F\xFFW\xFE\xD5\x8F\xCC\xA5nA\x10\xAEe\x0EB\xB9%m!\xB23\f/+\xFDZ\xDB\xE0,\xF5\x19l\x94\x04\xDC\xEB&\xA2\xA1\0\x9D\x1B&HG\x11\x11 \x97\xA6\xFA\x8D\xECWff\xBA\x173XB\xA9\xFB8\xD1\xEE\xD3\x19K\xEF;\x9A\x0BO\x12&\xA4\xCD\r3\x07\':J\xB0\x8A\xCEu\xE0\x9C\xC9\x18Q\x88\x94\xF2\xD0o\x11\x85\x98\x82%\xD1E;N\xE2\xA9\0$\xCF\xF6A\xC4\x90:\xF3\x8C\bFg\0P\xEE\xFE\xEC\x8C\xE4\xF3\xAA\xBB\x10\xB6\x03/\xCF\x01\xCA\xD87\xE0\x90{V\x99\x91@\xFB\x1B\xCA\xB3@Ju\x17\x82\x90\xCA\xD2\xE6m\xB4\xB9\x03\xD1VO\xBA\x82\xAB&\xA4\xB7\x18\x05e?\xA2\xA9\x1D\xD1`\x0F\xDB\xC6\xF2\xDB\xE9\xD8<}w\xF0\x81\x90\xC1\x1B#\x0F}T\xC9x\xD9\r\x14\xA3 \xAEE\x8B\xBFv\xA7\x06c*\xEAw\xD9\x11\xC8\xB4R\xFA\xCB\xBE\xE2\x88HJM\x16\xE0SnI\xB95\xE3\xD9G\xACB<\xD0r[:J\r\t\xE1\x1A\xDB\xBC\xD5\xF6\xF06\x07\xE6\x9Fz\xFA\xE3W\x7F\xE5\xB9\xDF\xC5\x1D\xAF;\x19\x02\0\xFC\0\xDE\xF9S\x1F\xB3\x7F\xFD\x91\xAAfUDy[\xC2\x07\x87\xB4\xD4\xCBA\x82\x04:\x87\x1DY\x7FQ\xEDm\xD9\xAE\x9F\x99\xC1be\rh;{{I\xDC@VC\x82\x01v\xF2\x8E\x18\0\xA2\b=\xE0\xDB\xDB\xC1\xF7\xB2pg\x15\x01\xD5Vg^\r\xA2NJ*\x83\xD5\xA2\x02p\x03\xC7\r\x89T\x96{\x85/\x8B\t\x8CR7\xC38\xD7\bG>{\x05\xFA\fG\x06\x0B\x01\xF1\xDB\x85\x84\xB4\xCFb*N5\xC3\xF8\x99q\x0B@\xEA\xF5\x1A\x9C\x98\x98\xF4v\x19\x1F\xBB\xF1o\xBAs\x99\xD5\x98\xC3U\xCA4m\xAF1\x9B\xCF\xA62 \xF5~#\xC3\x19\x8C\x19\x18d\f\x19\xFC$\xE64G\xAA\n@\xAF\xCD\xC0\x152\x95m\x8A\xAA\xCE\xD4\b\xBE\x04\x83\x06\xD9\xC6\xAAx\x85\xC6\xBC\xCE\xE7d\xECB\xDA\'\x82).\xA1\xD2\x13\x8D\xB9lM\xAD\xF0\x12(\xF9}\xAE7\xE8\xAEE\xD9 \xA4\xDFg\xCE\x01 [\x81)\x122C\x93\x072E[}N\x9BF\xCF]\x10zi\xCC\xC2\x01\xC7\xC4\xFCw\x9E\xFA)\xFC:\xEE|\xDD\xA92\0\xC0\x8F\xDE\xFB\xE0O}\xF0\xE6-\xBE\x10\x81`\xB3 \xCCbl$l61\x03\x11<\xDF\x19\xC0\xD4a7\xBB\xE0;\x99A\x18\x11\xED\xD69\xE7p\xE9jG\x8B#N;K\xF2\xDEO;\xFD^\xFD\xB1\xE5\x1A\xAC}\xEB\xEA\x92\xEE+#\x1E%SE\xF9\xA1`\xEB\x04\x1EM\xC7\r@\x17\xA1\x98\x80K\xFDL{\xD4\xCC\x9C\x16K\x1B\x83O\xC3<,az\xBEy\xCC\x8F\x80\xF5B\x1D\xF9NhO(~4\xF5\xE1\xA0\n\x90\xAA\x81G{\x07\xDD\x9ErW\xEAw^{L\xF0\xBE\xC5\xA0\x0E\xDA\x1Az\xDF|:\xD5\x85~\xCC\xB8e\x81T\x8F\xF35\xD5\xEF\xEE\x02\x9D\xD3\xDB=J]\x99\xAE~G\xBFr\xD76\x97:ABey\xB8\x88\xAD\xA8\xDFJ\r\x93\x04\xD6\x066\xBC\x96\xEB\xC9\xD4Tz]\x96\x85F\xC6P\xAA\xA6\xDDrU\x96*\xE0R\t\xF2-\x98\xAF\xBF\xEFP\xB9\xFD\xB4\x96{\xDBrUN\xB9\x14\xAF\x01\xBF\xC7\xF75\x7F\x97\x9BQ;\xA0E\xB1\xA0\xD7\xDF\xBE\xF93\xFF\xC5\x9F\xFD\xA97 \xFB7F\b\x7F\xDA\xEC\x85\x1F\x7F\xFDW~\xF9_\xE0\x95\x8F\xC2YJ\xAAy\nn\x85\x14\xB7\xFA\x81\xE7\xA2$\x8A:\\#\x1D\x01\xE9\xEB\xB3\xB9\x0B\xD3H\t\xB9\x07\x85 4I\x8Ct\x84\x9E\x9D5\xA9/]\x0B\xAD\x0F@\x1A\x18\xD1\x8E\x91)\xDC\xAE\xC3\xB8A\x8F>$\xA4T\x0B.\x07.\x0EA\xD9\n\rnp\x94R\xF6r8\x0Es\xCC9\xB8\xCFb\x15AI\x84\xC0\xCB\xF2;%|W#F;\x96\x05Mx\x8D<\x12\x12|K*q\xEB\xA3\xDC\x97F"\xDCH\x80\x92z\x87\xEE\xD5\xAE-\xA3=U\x01\x8D\x1F\x92\xF8H\x97\xA190\x19\xDA,dQ\x11\xC0U\x02\xDE="\x13\xD30*\xF4\x91\xF7\x1F\x10\x021_\xC7\xBCTt\x86\xB3\xDC\xBDW(\xF4"\xF5%\xA9\xDB|\b9,\xA8\xA2\xA9*\x89\xF0|}\xB62\xC0\xE6\x9C\xB6\xB61\x8A\x91\xA4\xD1C\xAE\xC7\x86\x0E\x16\x86R\xD0$\x9E\x97\xD0\x85\xAE\x15\xE4?\xA0\xDCu\xCF\xFCu\xF5O\xE8ChH.M\xA1W"\x03\xC5\x04\xF9\xC4\x1C\xF7p\xF3\x9DW\xBFl\xFF\xED;_\xC0\x1B\xBC\xDE\x90!\0\xC0G\xECO\xFD\xDD\xBF\x7F\xF3{\x1F}\xBC]\x16"\xAF=\x12:q\xF5c\xC5\xD9\xAA\x0E\xC0*\xF5\xB3\xE8\xE8\xA9\\\x9B\xB6\xDD\xAA\x88\xC0j#\xA7\xB1\x0F\xB4\xDF\xFF.$\x90v\x8B\x95!\f\x17\x91\x9FQAj[q\xEF\xBE/E.\x12\xAC\x0BD\xD0U\xDFy\xF8\x82\x81\xC3A\x03c\x04\xEF\x1C$\xAC\xE9U\x9D\xC8QD==\x12j\x05SwJho\xE7ed\xA0W\xE6\xE3\xA51\x0F\xE88\xFD\xFAJ3\x16\xC1\xF7\xA8FL\xCE\x9A$hk[\x0B\xFF\xA0\xE7@%\xC2&G\xE8\x8D\xC8\x9D\xE3rxf:b\x02\x9BE\xF4"\xFA9\xC9\x80\x14\xEBPm`"c\x17\xE4M\xE8\xCC\xAD\xCF\xBDP\x95\xC6\t1D\xAC\xE3[?m\xB5\x1B\xDCq\xCE\xCA\xECQ\x04\xB8x2\xB8fRU\0\xB2&\x02\b\xD1U\x1C\x8F\xB1\x07\x91\'b\xA8m\xDF\xFA\xF5z\xC8\x82\xFD:F\x18\xE4\x07\x96\xED\xE0 \x15aba\x10d\x04A?\xCC\xA6\xE4\xE0|8\xF0\xDD\xEF\xF8\xBB\xF88\xDE\xF0\xF5\x86*\x03\0\xFC\xA7\xF7\xDE\xFB\x93\x1F\x9E\xEFx\x18\xC4Qq\b\ti8 opz\xF8\x86\xD1\xAC\xF4+\x1C\x97\x0E\xB4\x9F\xDA\xD3y\x81\x16n\x1B\xF1h\x94LuE\xCFF\x88A\xD1]c=\x97\x86\xC9\xDBpl\x87\x9B\xFA\x8D\xEC\x03\xD2h)\xA4\xD1l\x1Cm!\xF4\xA2\x9F\t==\xD4\x81\\\xB03\xDCv\x8F\x0E\xC3\x8Dw\xCF\xC2\xEA%\x98h\x7F\x0B\xE6;\xD5\x81YB\'\xED\x10\xB3\x9D\xD7>/^P^P\xDB\x1D8\xE6\f\x82\x16\xC3Q{\xBA\x7F\xFB\xEE\xED\x9E\xA1J \xA3\n\xD3s\xA0hH\xAA\x15\x19U\x98\xD0\x9Fj\x8FGM\xC9\x9B\xD6\xDF\xF3\xBB\xE6\xC4\x9AJ\xC2m\xD4\xBDy7\xBC\xF7\xB7\f\xC8a\xE0l\xA5\xE7\xF8\xEE\x04\xEEd\x8Cg\x86\x82~\x1C\xED\xB7\xE4L\xBE0)\x9D\xB3\xA8%\xC9\x14\xF8\x96-`^#\xEA\x1AF\x84\xA2\xF9\x06\xCC+\xB8\x87\xF5\x7FQ\xA53\xE2\xF1\xA4\x0E\xEBxF4n\x80\xBC\x14\x8A\xAA<\xAB"\xE9\xB9 \xCAV\x8A\x01\xD5\x8C\x87\xDF\xBE=|\xF6\xAF\x7F\xEFO~3\x9A\xFF\xA6\f\xE1\xBB\xCC\xBE\xF2!\x7F\xEB\xC7`{K"\xA2\xF1P\x95\x833\b(\f\x19\xD3\0U,\xAAP\xA3u\xA0\xB2H\x1BTL\xB5\xD0\x831\xF6 \x02\x87\xC2]\x02l\x84\xAD\xBC\xEF8\xD9#\\L\x83;K\xA5j\xD1\x99\0\xF2\xF7^\xE8%\xD3\xA5q\xDB\xFB\x91\x15j\xB5\xC8\xA6g\xDC|H\xE30\x92i\xB1\x98\xBE\xF3Ca\xBF\xC7\xF4 X\xEF\xE1\xC5\x80\xC2\x8E1\'\xE6\x11\x15\x96/\x13\xB418\x0E\xBE/\xD4\xEDU\xC2_\x06\xCA\xEE\xA1\x10\xB1\x1E\x8D\x80\x93\xA9t[@cHB\x1E\xE1Z\x9C\xD0\xFE\xC1\xD3\x8D\f\xAAl\n\xEA\xB3\x98\x95\x18\x90\xB3\xE0\x90\xBE;\xEF\x83\xA3\xC6z\x99\x9EnWW_$\f\xB3]\xB5QL\xA2\xE6O\x8C\xC1\xE9\xA2\x8Dy\n\x82\xED;\\\x05u\x8B\x88+l]\' \xE3y4qFA[\xBB\xA2ibi\xD0\x93K\x93}\xCDm\xEC\xB5\xEE\x16w+\x88^\f\x98#\x18\xC1\xB1\xF1;\xD5\x8EcPE\bB\xCF\xCD\x88f\xB9+\xFD\x0E\xB7\xA5\xDE>7"\x0EC\x0F[\x8E>\xD0\xA6g;\x06\xAE`\xB6\xC3,\xB6]\xF4a\xC0{\x9F\xFE\x98}\xF4\xC1W\xBE\x19\xCD\x7FS\x95\x01\0\xFE\xCA\xF5\x07\xFE\xF6O_\xFE\xCD_\xFD\xF2\x95f\xB7$wF\x1D\x9E\x92\x84\n~\xF7\x97\x91\xE8\xB68\xF5\x96\x1A\x11\xD7\xCC\xA4\xA8R\x01\x94*\r2\x1B\xE49D*M\xED\b\xA6}R!h8\xCC\x9A\x04@\x12\xFF\xBC\x15\xAFP\x0F\xDB\x05Y\xC5\x10\xA8:\xC8\0%\x1D\\\xD0\xB9K\x0EG,\x80\xC7\x1E\xBBCk\xD7\xE8\xDD=k\x1B\xCE\x19\xFBB\x0E\xBA\xB8X\xAEcI.\xF2l\x0F\xF2D\xC59 \xF4O\x83\x19\x16U"\x89APZ\xC7f\xD9$\xB2\xBF\x13\t\xA5\x9Djk\x1E\xE3l\x01\x80\x9B\xA0i\xCC\xE8\x9C\xC8=\x1A\xA4\xEF\'\xCC\x9F\xB6\xF6\x93\xCDHmI\x01-\xFB\x84#\x03\x92\xA4\xC2H\xF5H;Bs\xD3f\xFD\x05G\x1Av\x0F\xD9r\xA0:\x13~z>\xD5\x8F86\x9A\xA4oCms^\x93\xDF\xD4\xA8\x9Cs[\xED\n\xD3s\xBE\xE3\xD2\r\x19\xD7\x90\x81G\x1E\x84O.S\xD5\xA0f[{\xEC\xA07\x9AKw\xB8\xD4\f\xA9%\x13\x85\xD69\xB1T\xDE\xCA\xE2z\xC1\xE3\xAB\x1B\xF8\xBF\xFFm\x7F\x1B\xBF\x8Co\xFA\xFA\x96\f\xE1/\x8F\xA7~\xEE#7\xEF\xFC\xEC\xCF\xE0\x0B\xDF\xD9\x89\xBFB\x90\x15\x04\x04\f\x9C\x19\x02\x7F\xA7\x04w%\x17%0\xE9\x9F\xF2\x18P\x85PI\xF4\xD9\x9E\xD6\x1B\xDA-Z\xFEB\xDA::\f\xB3\xAC\\\xE4\xFDZ\x9C\x83\x8D\xF40\xF5p\x83\xB0\xB3\xBA\x10\xD0\xA4\x0BO\xF5R!\xD2G,\x1F\x9F\x03\x8F\xA7\xE3\x06e\x80;\xDC\x18\x05\x18\x9Bt\xD9\x01\xEC\x13\x94\xCCqMU:\n\xA9X\x99\x8B\xB18\xE6\xAC\xC2*e{h\xBA8U\x16K\x1Ff[\xB8\x94\x9C\xC6v#Z\xB06\x8C\x15\xD2\xB0\xC9(B\x032C\xE3\xE4R3\tK1"\x80FB\x16f\xE1\xA9\xAA\xC4l@\xDA3z\xAD\x05w\xCD\x01\x055\xC7\xA5\x10\xEA\xCA\xDA\x8C\x1B\xAAv\x04\x10\xC7\xD3\x95\xAAq\xA3\x13\xAC\x97\x8A\x90\x84^\x84\x9BL\x9F\xEDed\xA3\x18Bc\xAAu\x8D-mZg\x06\xB3\x11\xB0\x03\xABZ\xA0\x10dU[\xAE\xB9L\xA9C\xFB@\xC6)\xCC\x81\xAA\xD1\xA02h\x8D\x89\xB86wU5%\xB4\xDF\xC4\x18\xAEp<\x7F\xFD\xD9\xA7\xFF\xA7\xE7\x7F\x0E\xFF\x1B\xBE\xE9\xEB\x9B\xAA\f\0\xF0\xB4\xD9\xFC\xC8|\xEEo]\x1F\x01Q\x12\xCE/\xC4n\x18\xBDNA\xB2\xC8P\x11\xA2\x12\xB1&\xD4\xDA\xEF\x1A\x82\n\xB1m\x91\x81\x88\x88kp\x05\xE0\xA7\x9A\xD0\xF4\xAE\xB4\x1D\xF0\x1E\xCE\xF3\x96~\xC4\x1D\x82\x118f\xE2\x0F*4\xBEg\xD4\xD9\xF2\x9F\x8E\xF9Z\x9A\xAC\xA2NipL\xA9\xD1\xE3\x10h\x01\xA1;\xEB\xE2\x8EG\x97\x89\x8B\xD4\x80\x93\xCA\x90P\x9Cn9\x1C\xA5\x93w\x97\\@\xE6\xE6\xAA\x13\xFCOH\xED\xB4\x1F\x94}\xE2\xE2H\xDD\x7F\x85\xDD\xD4\xDF\x1D\xCD\x85\x17\xEE@EX\x8A\x81\xF5\xFBkM*\x1AR\xEE\xD3y\x04\x84?\xA8\xF6\x94\xAB\x92\xEA\x8A\x9F\xFA\x9B}C\xDA\xCB\xCE\x91\x89]\x8D\x88\xEF\x9E.V\x85y\xCFv^Fn\xCA.\xE1\x96c\xC5a\x01\xF9\xC5m\x14\x8F\x80\xCElPB\x80j\x80\x1D\xFA\xEE\x8BJ\xD2\xF1o\xDA\x0E\xC5\0L\xEB;\xB8M\xAA\x18\x13\xE5\x9A\x94^?\xB7"\xF8)w\xA4\xD4\x04\xED4%\xD5A\xE7m\xB0\xB977\xE75lR\xA5P\x96\xA4m\x80\xB2\x91m\xC0\x87\xE1\xD1w=\xF1\xB7\xEC\xDDU\x94\xEE\x8D^\xDF\x92!\0\xC0\x8F?x\xDF\xDF\xF9\x9E\x9B\xB7?,\x12\x161vC\x9F\x9D~\xBB\x82\xFB\x0EW\n\xF4\x1D\x86\x93\nF\xEA\xBA\xBE8\xEA\xC9\xD8\xB2\xF8j\xE3\xDE\xA6{\x9F\xDD\x8E\xA8{\xDA\xE9\x9E]=\xA9\xFEJ5)\xA2\xEF\xD24%\x0F\to\x958\x12%\xA0O[a\xBA\0\xA8\x0F?\x86\xE1\x11"\xE6\xFFp\x11\x8Dt\xFC\xB1\x84!\xCB\xB7~\xD1Bg\xA8\xF3b\x94$\xA38\x1C\x19\x97p\x1CE 3u\xFA5\x94Y\be:\xD5\xE6\xC6h\x82\x90*m\xBA\xEE\xAF\xF3\xC2\xC8\xB8\x18&\xF3\xFA\x95a-\x84\xDD\x98[o\xFB\x1C#\xB1\xF4\x9F\f\xA9\xDBJd+\x88\xA9/uj\xE6\xEF\xEDoh\xBC\xB4\xA7\xF07x\x95\x99\x8B\x07\x86\xE5\xB7\xC5\x9B\xC0\x9BIUY\x10\x83\xC8\xCA\x9D5\x1B$\xB1\xF5\xAEPmE\x8E\x96\x910\b\xDB\xE7\x06?\x18\x82,C\xA3\x8C\x82\xF9\xEE\xEB\x9E\xB6\x83\x9E6\xED\xBAFo\x1A3q\x05\xD9\x12\xE0;\x1E}\xFB\xFE\xF0\xD9\xBF\xF6\xA1\xBF\xF3fh\xFD[\xAA\f\0\xF0A\x1B/\xFD\xF5\xD7>\xF9\xF7\xFE9\xBE\xFA\xDF\x9F\x0B\xA3\x8C;\xF6^\xC8\xECC\xEE\xF8\xB4\x86 \x87\x14\x8E9\xED\xA9\xD2[\xD9\n\xA42\xC0\xA8:\x8D<\x1E\xBFm|v]E8C\xFF^\xBB@\xCF\x9F\xAA\x8B\x8EY\xFBu6i\x81\xA6G\xFBz\\a\xB3g\xBD]\r*\xDC\xB6*\0\x01\x8F\xCC"\x94\x19\x86\xCB\x04vI\xB9i\xB5A\xAC\x87\xF1m\xD3"d\xCFv\x07z\xD5\xE1\x88;\xA8\x84&\xA1\x13\x9F\xEB\xB6lZ\xE3\x87G\xA8o\xBA#\xD9\xBFHk\xB6$\x06\x9B\x81\x86\xE4\x96\x8C\x94f\xA2\x1E\xB6\x0B\x04mt\xFD]\x84\x92\xFB\x1A:\xFB\x9E\xE8)\'\xBF!\xAA8t\0-6A*R\x9D\xA3B(\x80e\\B\xCE/\x90\xE3U\xFF\xF4\x9B!\xFA8\xC8p\xC0\xF6\xC11\xAEj@t\xCE\xF9\xBB\xEE\xDD\xABUk\x8E\xD3k\x91s\xA6\xE7oy\xAC\xE7\xB4\xE4\xB2\xE8\xF7\x9A\xDA\x12N\xC2\xD49_\xE2\x98\x1Bl\x0E8\xEB5z"\x1A\n?fP\xAArs\xC6.\xA4RF\xF5.V+\xDC&.\xEF\xBF\xF7\xF7\x9E\xF8\xCF\x9Fx\to\xE2\xF5\xA6\x10\x02\0\xFC\xC8\x83\xF7\xFF\xCD\xF7\xDF<\x85\b\fVRQW\x11\xA2C\xDE\n\x99\xACII\xF5\xD9\xA3\x0E3\x01#\x8D&N\xFA\x97~\xDF#\x1D{\br\xB7\x13\x14\x17U\xBF\xAA\xBE\x82\xF3\xDF\xD1\xEE\xD9\xE2#\x16\xCE\x0E41T\x0B\xDEyXPu\x91,@F\xBFI\xC5\x9B\x88\xAD\xC7\xF8\xFD8\x80\x9B\x19\xEFC\x89m\xCDr\x1FR\xD3R\x15\xC9\x9C\x87\x94\x98k\xF4\x9FP\x80\x13\xD2V\x04\x1Fc\x1E\x1C\x98\x97RC\xE6,(/F2\x19A\x18\xEB\xD0Jb\x1F\xCA\x83@F\x18\x1E\x07\x8B\x96\xA8\x9D\x03\xB7" \xFD\xF0j\xCB;\x8C/\x17h\xCE\xA5\xBC-\xBE\xBAC\x85~\xD2\xBD\xE9B\x1D5\xB7\xD3\x03a\\\x9A\xE7\xA4\x8F\xCD\x81\xF4\\4 \xB0\x18g\xB1\x100\x9F\xD7\xAC\xAC\xC7s\xBD\xC9d\x8Ah\xF8\x92\fd\xAA\xED\xE9\xCB}t}\xA8\xA3\xDE:\'\x06\xD2\xEA.\xCC\xEEy\x90\x0B\xF1\x1A\xE6\xD7Eg\x1E\x95\xCA\fJ\x96:#k\xEER\xED\xFCN\xDAx\xF5\x99k\xDC\xFF\xD1\xF7\xFC\xCD7K\xE7o\n!\0\xC0\x8F\xD9\xD3\xBF\xF1W_\xFF\xC4?~a\xDE\xFC%\x1BgO\x82ES^\xF6\x85\xD0\xC5\x03\x19\xA4z\x95\xE8\xA1\xA9\x19D\x0F.\xC9\xD2\x83\x8AT\x84%#\x19\xCF\f&\x18R$p\xF4k\xFB\xEB\xB6\xE1Pq\x0E2\x02\xF6\x12\xE1\x19\xBF\xDE$\x95\xA4V\x04\x9E\x85\x14\x88`\x98Z\x1C\xA5n\xB4\xDCz\x18\xC2\x1B\x11\xDE\x86\x0B\xDF74,\xCE\xC9uC\x1D\x1A@\xA9\'(\t\xD8%\xB2\xE0\xB4\xA4a\x1A\xD3\xDA\xF7\xF4&L\xCB\xFE\xA9M\xB5\x8FI\x97)\xBF\x87\x0Bn4\xA4TFC\xED\xD1\bXz\f\f\xC1%g\xDAR\xA2\x8C]&?9\x18x\xE4u]RL\xA1\x85\x990\x9D\xFD\xE4\xE7\x98\x8D\b\x9Bd\x9Em\xECzV\xD3#ZQ\x06[m\xA7&/P\x9FG]\xA7<\x8F\x90\xFE\x96\xEDg9\xB6Y\x92\xBE\x90\x04\x8A\xD0i[\xB0\xBE\xDE\xD2\xB8\xA8\xF9+\x86S\fA\xCC\xA0\xAFQ\xA9\xC9\xE2\xC4\xE2nz~jw\xB6s$\x81,\xC7\x11\xD6\xE2cY\xC0\xF6\x81\xED\x1F_\xFF\xCF\xDF\xF6\x1Bx\x93\xAF7\xCD\x10\0\xE0?\xDB\xDF\xF7\x13?{\xF3\xD5\xBF\xF4\xD5{\x05M\xE2E\x97b\xD6.\xE8jD\f\xC8\xAC%\'5\x17\x8A\xAC\xC1\x90\xF1\xF0\x1CD\x04$\xF3\xA80\xE5\x9E\x04E\xE6c\xAA\xB0\xDC_2\xFEu\xB7(\xEF-\t\0\x84\x8E7\xFB\x83m\xC4\x02-@\xBF\xE3\xFB\xAA>\xA4\xCB\xAF?|\xB6\xF3\x18\xC1\x14\x1E\x1C\x01\x95/\x88<\x07\xA3\xCF_\xD6\xF1\xD4\xA3\x1B\xF1az\xEE\x87xq`\x9B\x8E\x8B\xDC\xA2\x1E\xA1\xC088#\xB3\xAEs\xAB\xFE\xC8\x95\x89\xC9\xDD\x9C\xDCr\xBE\xD4\xCE\x98m\x83\x16W%\xE75:q\xA2\b\xE5jJ\xAD\x88\xF1O\x94:\xA3\xE4\xA0,\x18\xCB{\x1Cd\x92\xC1P\x18\xAB\x92\x8C\xAC\x92\xA5\xAE\x8EZa\x07}\xFC\x06\x86\\\x93\x01\\<\x98\xD5v\xA86eA\xFB!\xBF?j\x99\xCA})\x0F\xCC\x98\x94\xFE\xC9\x04\x9D0\x9D\xCF]\x8C \x99G\xFB{A\x91d\xA8\xCD\xD8,\xA6\xD0\xED\n\xB9\xBC4g\xBC\x97\xEADD?\x85\xBA\'\xB2|\xFA\x042\x14Y.\x1BeWB\xA8@\x0B\x91\xDE\f\0\x8F\xAE\x1E\xC3\x7F\xE8\x99\x9F@\xEE\xDC\xF8\xAD_gq\xFAM__p\xB7\xFF\xF1\xE1\xBF\xF8\x8D\x9F\xBE\xFF\xF2\x87c\x8EE\xA8\x1D\x8E\x9F\x8Cx\x92\x94}#\x14\xD9\x03\xBAo\xF5\rK\xA2\xA3\xCEK/\x02\x11\x01\xCF\xA9\xA8\xC8\xAC\xAF\x8B\x8E\x04\xEA\x9ChK\x10/\x82\x8BJ:\xA0\x11\xB3\xA4d\xD7\x19\x81UZ\xA9\xA8\x88\fG\xE5\x1A\xE4\xEF\xED\x81\x0E\x07\x9Eq\xE0-\x87\xE3\x01\x80{0\xDC\x9F\xC0\xB5\x03\xF7\x8E\xB0\x15\xEC\b\xF7\xDB\xEE\xF1\xB9\x91HwJ\xDC}rvf\x10\xC66\x99\x10>\x83I\x84W\xC4*L9\t=\xDAQ.\xC38(\xBD\x13-\0v8\xFD\xF9\x96\x12iL\xC7\x86\x11\x95\xA3\x01dL*\xDDd\xD7\xB3\x14\xC3m\x02c \xE3\b6\x8Fcz\x8A;\xDD\x85\x0EVS\xE28\x06\xDB\xAF\x9D\x9D\x82\xD8\xAFy\xAD\xF3\x19mm,Q`\xA5\xC68fI\xFD\xA5\xF8\xAC\xBE\xEB^\xB3\xEE\x93L\x81RX\xA8\xA9\xF6@Q\xB6(V\xE2g\0S\xE9\x8E\x03r9\xCA\xDD\x9B\x06\x8E\xA3\xAEW\x1E\x86\x1D1\xB7i\xB3\xD09\xD2K\x99b\x1D\xC5o\xBDt2\xEA@~\xA8D\xFB\x05e\xDD\xE5\xFD\xA2Q8\xE1\xEE\xEB\x1F~\xF4\x89\'~\xF6\xF9?k\xEF\\\xF1\xC87{\xBDi\x1B\x02\0\xBC\xCB\xCC\x7Fx\xFF\xB6\xBF\xF1\xE4\xA5\x92\x95\x14\x15\xA8B%\xA1&4\xA2dm\x02w\xC3R\xCC\xC4\x8BX\xA1b\xA7\xEDx\x96a\xEF\xE7\xC9\x0B\x81\xD2\xBFz\xB0\x91\xAE\xCB<\x89\x93\xCD\xA0\xB6O\xF3|\xC0\x81\xC4\xBC8\xB1"\xD6\xE6\xCA(\xF4\xC0U\x88T\xEF\x92\x86\r\xEDH?\xCC\xC5\x13\xF7y\x1D\xC0CC\xBA\xF6z\x01\x95\xD9\x8E\xF5\xD0by\n\xE0Ul\xE4\xA0\x15;P"\xED\x0B\xC7H\x17\xE3"\xB8\xB2-E0\x06\xC4\xCE(F\x8D+\xC3\x96U\xB8\xC5\xE9\xD9\xC0\xE2\x06\xD4y\xEE\xA3\xDC{i\xC3P_*\x13\xD3a\xE5\xD9`?\x9Czs\xB4\x81\xC5~\x90\x1E\x8F\xE5]\xE3\x90\x9A$\xD5\xA9\xFF\xDD\xDD\x9A\xB7\x8A\xD3\x9C\xBC\x185\'m\xAE\x93p\x91\x02\xA0G?:\t\xB5\xEF@\x9D\x9E%/4V\xD9\x95\xED=\xD1\x10C\xAC\x9D\x85yt\xC6##"6D\x14\xA2\xEC\x02\xF1vlp\xBF\x82\xDFU\0\x96\x86\xFC\x9Bk\xC7\xCDG\x9E\xFA\x1B\x7F\x10f\0\xFC\x01\x11\x02\0|\xD9}\xFBk\x0F\x7F\xFB\x93\xFF\xEF\xF5W>t\f@\x84*&0\xE8\x06\x9CwH\xE8\x98$\xC1w\xD9\b\x90D,\x84`\xA7k\xAB\x9B\xC1|\x06\xB4\tK\x1C\xF7\x85\xAF\x9D\xBC\r\x10\xE3@F\xE7\t\xCA\xA6\xDE\xCA\x18\x91\xE4\xE6\xFC.\tu\xF66T<\x82PC\xB5\x95\xC5R\x1A\xAC\xD4b\x1A0\xBC\xD5\x81g\'\xF0\x84\x03\x0Ff8\x88\xEEM\xE0j\x06L\x1E\b\xE98< \xF9\x15\x83\x906\x84D\xDB&35\x88\x18\x14\xF7puXIZ/\x14\xE1\xEE\xD8\x8E\n\xD0\xD9fH(\x13b8\x06\xB6\xA3\xA4\xD98\x1CR\xE5\xC6\xE1\xCDL\x0B\fL\\90h\x19\xDF<\x9E\x86\x01\xD8|\x86\xA9\xB9\xF5as`X\xAC\x8C}VV\xE2F\x84`>R\xC2\x83c:\xBFAuG\x88 \x11\0b,\x8AR\x14JP\xE99!\0\xA9Q\xFD\xF7\xB4\xD3\xB4~voEHr\xAA;\xED\xB8\x93\xAB\x99PT\xDA\b\x9A\x1A\xAAR\x05D]\x81*\xEC\x842<U\xC9\xFF\xBF\xBDo\x8F\xBA\xF4\xAC\xEA\xFB\xED\xE7=\xE7\xFB\xBE\x99df2\x99\xDC\0\t\x82@\xB8#wQ,\xB1,\xAC\b\x88\xB5\xA6\x0B\xA8\xB4R\x90.\xDAJ\xADE\xB0\xDAbU\xBCVY\n\xAC\xA5b\xB5\x15X\x8A\x8D-\xA2(\x82J\xB1R*\x17A@0\x01\x8A\x10\b\xB9\x13&s\xF9.\xE7\xBC\xCF\xEE\x1F{\xFF\xF6\xDE\xEF\x99Q\x99\xCC$\x99$\xF3\xCC\xFA\xD6\xF7\xCD9\xEF\xFD}\xF6\xED\xB7\x7F{?\x93\xF0\xA3\xFE\x9F\x9C\t\x85e\x15\xC6\xB1P\xA7\xD5\xBD\x881\xBD\x05^\x8B\xEF|\xF4\xE1\xE3\x15\xBB\x7F\xE7^\x0F\x93\xFB\x10T\xF8\xF2\xC6\ta\b\0p@d\xFC\xA9\xC5\xF5\xAF|w?\xF8\xC6[D\xA12mJ:u\xD5Kh %|\0\x10x\x81\0\\oO+-\xB9\x80\x89S!?\x1E\x9F\0Hg\xE7X\xAE\xC1\xB4BQR\xF8G\xFFC\xA7\x96>\xC3\x07\xB8"H+\x10\xBD-\xA9\xE9I9\xE5\xA4)\xE7b,J\xC5a\xBC~\x99\xE4\xF8E\xDC\xDD\xA6\xFB\xDA\xFD\xB2h\xADy\xAEn\xE9\xC9UPMz.\xB1\xCE\xEB\x92\xB2O(3\x07\xB9\xA4+0f\n/\xC2\x06\x9F\xD8\xAAE\x10z}\xAF\x80\n\x1B\xB1\xF8\x92!\x9Ao\xA4\xFB\xBB%\0\xDA\xFC\xD1v\x17l\xA68\xA3\x0B3\xF2\xB92M\x8A\xF2}Z\xD6\x12\x87\x03\x93\xF2\xEAi\xF5\xA6WN\xD6\x90A\xCB\xB3\xF1wA\xF7\xBAi\xA6 \xA3\x81L(\x043I\x83\xF2\xC6\x11\x9EA\xD3:\xE7$CE\x1A\x01\xE2\x01\xEEm\xC4w|/~\xF3\x89\x1Bh\xCC\x9Fc\x7F\x88\xE7\x90\x8BS^jP\x9D)W|\x89\x03\x96\xF3\x8E\xC5c\xF1\xCA\x13U\x06\xD3\xB7}\x02\xE3\x0B\xBA\x18^\xB4\xF9\xE9\x8F\xBC}\xFD\x96\x87,\x9B\xA5\x19\xDD?\x80\xA0\xD9\x82\xA0H\xD7\xDF\x98\x84\xC5\xCA\xB7"\xB4\xD1)\x99\\\x85\xBA\xB0j\xC1\n\xFC\xB3\xD5^\x87\x88\xF0@\xFC\x81\x14\xBC\xA0\x1B\xAA\x10\x8A`Uh\xFD%M\x84?0\x80\xE2:\x16w/\xF6\x05\xC2\xD7\xCC\x05;}\x7F\x0F\x1B\x02\xE7\xE9y\x9E55\x0Fa\x8F*vw\xC1\x1A\xCCCX\xEF6\x01\xD7F\xD8\xDA\x90\xDD,\xE9\x9Ag\n\x86\x11\x98+-\xA4\xFA\x8APn\xFD\xFC\xF3\x16\xF7c\x13w\xE6!K\xC4\xCDj\xC7i%\xB6m]18\xD3\xAE{\x8CKv\xA68.1\x83\xBD\xB2\x06\xBB\x9E\xD65\xB1\x03\xA0`\f\xC9\'\x18\x90\xD6\x9A\xD7e\x9EB\xBE9Z\xE7Yw\xE6\x8A\x8Ay0\xE58\xD2\xBB\x0B\xAF\xC4\xB1\x1A\xEF\x9Fx\x89\xDF[S5\x80U\xE1\xCA\x95\x19\x90\x04\x1C\x07\xEF\xB7@\x0FJ\xCA\xBBi\xE5o>\xF3\xC8.-\xF9~\x85\xDAob\xFDY6~\x8C\xB5WD\x19\x83yd\xA6\x90c\x9B\xC0\x10\xCA>\xAB\x9F\xBB\xB7`J\xBAC"^r\xED\x989h\0\xC0\xD1\x87\x8E\x1F\xDF\xFD\x1B\x07\x1E!\x0F;q\x85p\xC2\x1E\x02\0\xDCS\xE6\xE3kw\x0E\xFE\xD0\xFF\x19\x8F^~s\xAB\0\x9E\xCB-\xB9\x02\xE5sS\x04\xC5\xDA\xD3k(\x05Q\x1A\xD9\x86\n.\xC2~\xC7*\xCA\xAB\xCA\xA0z#\xA5i+s\xCAD\x9Bu\xE5\x85izY\x93\x94\x1C\xB5\xB8 4=_\xA0\xD2\x8CUE2A\x92\xE1J\b\xF1\x82\xEB9\x9B\x02;\xAA8\xD2\x15k\0\xE6\x0E\x96Y\x97e\xEF]\xE0\xE7\xE9n!\xBA\xFA\x1D\xAAF\xAE=\xD2gL\xCDi\xC6\xD7\x83O(\xC6\xCESo\xC2~:\x80\xACe\xE0\xF5i(\xCC\b\x7F\xFC\xF3.\x06~u!\xC5Y\xCB\xDB\xA1\x153o\xA7\xBB{\xDF\xF9\x19\xCA\xF9a\xE0\'\x1F\xCF\xA4E\x1C\xDC;p7\x7F\xD4$\x13\xB1AK\xEC\xD8\xD3\x83\xA9\xDE\x82yq\xDE8\xA5\xA3x\x13\x02\xAEX=IwvL<\x85\xCE\xE7\xA7\xE4\x14\x14\xB7\x9Es\x89\x83\xDFQ\x81\xAC\x86\x0F\xFE\\\xDD9,D\'\xC99\xC1\xFD15\x1C\xAA9\x1F\'\xDE\x82\x02\x1AM[\xA9\xA9\x04\xC0\xC2\x1D\x13\xC1\xCE\xDA\x02x\xFC\xEC\x87n\x8D2\xC8\xB7y+\xC6-\xAA\xF2\xDC\x9DO\xBC\xF7\xF7\xD6\xB6\x1E\x97\x82\xEF\xF1:\xD7l\x8C\x07\xE8\x82\xDD\xDC\xA6(\xC3\x85\xB2H+\x95D`\t5T\xA8\xDD\x99\xEDxZ\x95E\x80\x87vK\xC7\xB8g=_^6\xD0\xF0\x85T\x90/+&KW\xD0E\xD3N\xE4\x1D`<g\xFB\xDB\x04\xE9\xA3\x9D\x93\x96yBs-\xEE)]JU`C;\xCE\xE9\x82\xB3 \xD8\xD5\x81uu\x1CA\x15k\xA3+\x8Anw9Wz\x02\x863\x04\xB2\xAE\xF6\x7FNh\xC6\xD7\x9C\xD0\xD2\xBD1\t\xF9\x06\xAE\0fK\xBB\xDE(\x1E\x1A\x81\x99s\xA7\r\bM7wX\xBA%\x96\\Lf\xEEnx\x13s\xD1\x87\x9E\xDE@\x13\x04\x86\xD0\x80(^b\xE6A\xA0\x98\x8D\xE5\xAD\xBA\xC0\xF2\xFEV\xBD\x89yX\xF0\xE4S\xD0\x1B\xAAx\x020\xC5\x11f\x8E;\xB0n\x86a\x15\xD4\xEE5\xB1\x03Stl:\x03\x0F\x13\xE8\xE5\xCD\xAA\x07\xC2y\xA3H\f@\x91\xC0\xB1\x83\x89\xB6,^z\r\xAB\x9E\0\x9Fy(\x12b6,\xAF.JH\x8A\'\x97\xD8U\tk\xBB?tGL\x15\x1D\x07\x1F\xB9\xF5\xFEs~k\xDF\x13\xE4\xFE\'\x06&r\xDC*\x0F\x01\0\xF6\x8A\xE8\x1B\xB7o|\xF9\x87v\xAE{\xE75su*\x81e\f"\xD4\x81\xC0HLH|@\x05\xD3\xE5\xD3\x80\xC4\x13*F@\xF2\x92\x8FP\xBC5dhHI\xCD\xE6\x9C\xB1\xEE_<\xB8bE\x80\xD0\xA6\xE15\x10h\x04s\xEC\xC4\x04\xFC\xC5\xFAY \bB\x8A\t]sk\xCD^\xFE\x92\xD5\x99\xDD\xF7GN\x0E\x85\x9Dk\xD4\x86m(\xD6\xBBy\x07\xB3\xEE\x14\xE3n\xB1v\x02j\xB6^\x03\'\xD2\xE8B`\xC8=2\x06.\x7F\xF3\xBA\xB3S\xF3\xD4\x83ag\xE5\xD1\x05\b=\x17\x98%\xD0H\xCB\xD8\x1C\xC3\x80p\xAD\x05\xBF\xD7\x15\x8F\x90\x1E\t\x04\xB1\xB8\x8C\xDDj\t\xF0\xBA=_\x12\x91\xF8.hY\x89]\xD0]\x17\xB5y\x9Ex@z\x1B\xDD\x15\xDF\x88\x14T\xA1\xDB\xDE\xE9aK(\x05\xBB&\xC7g\xA8@\xB9\xAF&\x81\x89\xEF\x9F\xCA\xA6\xFB\xFDFj\x12\xF6\xBC\xA4(\x03\x1E\xC3\x9E{\xCBgM%BY\xA8\x9F\x97\xBF9?\xE8\x81PaLZ\xE1\xD1\xB0Q\x10(\xEA\x8D\xA1\xF4\x004\xE0\xE8\xEE\x05\x86\xAF\xC7\xCBo\xAD2\0\xEF\xF1d\xC6e\x9B\x9F\xF9\xDD7\xAF\x1Dz\xC62\xAC\x7FI\x15\xD2\xD2\xD76d%\x930\xC5\x0B8u\n\xE9\xC8\xA5\xD0X\xC8l\xA1\xB6\x9AE\0\xB2\x97\x1C\x02M\x9F<h>\\\0\\\xD04<\x8A\xF0"\xF8}\xBA\xE15\x93\xC0\x14\x93L44\x95\x032^\xE4dA\xF1\f&\xB9f\x13\xF85(\xCE\xE9\xC0Y*\xD8\xE8\x8A\xF5\xAEX\x83`\xDE\x05kjX\x82hf\x10fj\x96tN\xA1W\xB3\xA0D\xC8E\xBD\x0E\xC2\x05\xBB\x8D\x88\x9C\xBD\x91\x9A\xE8!\xF8z\xC7=\x17Y\xCD<>-\x1C\x80\xD1\xB3\f\x9A\xA8\x8C\xC00\x10Q\xF3\x10\xCC30\xA0\x91*bp\x014k\xEFX\x83\xFA[\xF5{h\xF4P\x90\x82>\xA3\x87\xD0\xE3\xED\x9B\x07\xE4\xCF\x95\xDB\xE7=\xE5s\x80oKk\xCF\xE3\x0Eu\xDF>\xDD\xDE\xE9^\xCF\0\0 \0IDAT\x9F\x9C\x84\0\x18\xC19\xA2Q\x92NrS\xDD?\x95\0\x9C\x9EN+\xC3\xF0\x92\xF3`E!\xF0\xEFR\xC1\x1C\xDC\x07-\x1C\x86\x92\xAAF1.\x18\xCD\xDBY\x05Y}\xD2\xA2Cq\xF81\x87\xDE\xBA\xEF}\xFB\x9F\x89\x93\x18\'\xC4C8\xDE\xF8Gk\x17\xBE\xF4\xBE\xCB\xB5E\xAE\x9E\xE3\x82\xDA\xDC\xF5\xAF\x99\x82P\x06\xB9P\xEA\xDF\xDC\x87\xD1\xD8\x8DT\x06S%P\x8E\xC9\xC53\xF8\x10\'\x0F\x14\xA1\xA9\x834T\xE3\xC2\xF2\xBD\xD22N4\xBA+\x17\x02I\xDD\xCC\x0FIK\0\xF2\x9E\' Vz\x17S\x1C\x81q \xB0\xE8\x8A\xEDn\xF5\r\xCBnU\x8D\x0B5\x8EYt4\xF2Sv\xD5\xB85\xB6u\xCF\xD2h.\xF6Z\xF2\xEF\xAC\'\0\xB9\n\xAC3\0\xD8M\xA9\xE6\xF5\xAD{\x91:\x7F@\xA3\xCEbY\xAE\x81\xCF\x84\x19\xCA\xB1\x1CgT\xA0\xC3R\xCD\xC6\xAB\x11_\t\xC0+(\x15\xD3\x9F>\xBD\x87z\xAF\xBC\xCE\xE8\x1EU\x7F\xC6\xE9\xF7<V\xE5I\xF0\xF9\xF5\xE3\x9D+\xEA/4\xCE]\xAF\xA9\xFE\x9Ep\x14\xFA\xCA\xF5i\nu\xE0\x06uN\xB9A\xE0\n\xD9\xF5\xDE#4\xAD\xFBW\xA3\xB5b`\xC0PZs\xFE\0\xF5xv\x96\xED\x03\x8B\xC5\xC67o\xBC\xF4$D\x19\x94\xB4\x93\x1A\xCF\x1Ev]\xF9\xD4q\xEFk7\x16\xD6\x9AL\x9Ada\x91\n\xA6e\xCB\xECe \xF9\xFF\xF2S3\xDE6\xDC\x8B\b\xCC`JY&\x01\xA8>\xECI\x98@+0\x99\x90\x9E\x9ErA\x11>tz\x14\x14\xF8\xD1[\x8AGx\x80p\x1Dc\x81\x95\xA2\xE9\'/\x18\x98Z\x06?\x8FY\'\xEFu\xA8\x82E\xB7~\t#\n\xC1\x87\x93\x96\n\xCA\xBD\x94\xDA+1\n\x86z\xAE\x94\\\xE3L+\f\x92\x89\xB0\x90t\x13-\xE1W~\x82\xE8\xA4t\xEB\xCD\x85\xED\xFEy\xF6&pr\xCE\x98\x82be\xD8\be\xECd;?&\tS\x95p\x84\0=\xB34\xDA\x15\x9Bf\x8F\x88\xC9J\xD5\x14\xFA\x9E\x02?!v\x01HR\x90N\xAF\xADk(\xCFT\x06\x9A\x8A\x96\xC2>\x02\x18]\xD1)&\n\xA1\xD7s\xB9qQ\xE5\xCA\x14\xF9\xEE9\xC7"\xE4\\\t{\x10j\xC24\xCBj\xB3\x15\x14\x0F\xB3*\x8C8\x07\x87\x94\x10B\x04\xCBG._\xBB\xFE\x9Fv]y"\xB2{\xBCq\xD2!\x03\0|Hu\xDF\xBF\xD8\xFA\xEC\x95\xEF__^h\x12C:3\x8B\x8E\x8A\xDEQS\x1C\x13&!\x9B\x99\xCA\xAA~\xE2\xA2+\xA9 \xC8\x17G\b5L`+\xD0B\xCE\x80\xA7\xC7\xA6\xF1\xB3_\x9F\x0B9\0LR\x8AT\x12\xAE(\xA84\xE2<NJQ`\x92\x1A\x92z\x0E\x86\x1D\xD5\x9DT\xEE\x8F\x88o\x07\xED\xD8\xA7\rg+\xB0\xBB\x9B\xDB\xBB\xA6FL2r\x92Ze\xBB\x83\x8C\x02\xA35\xB7Q\x93\xCA\xACL\xA1I(@*\xA8A\xE1\xEE\xAFZ\b\0\xC7\t\xE85\x95<y\x0BE\x98\x8A\xABy\xF8@\x95-\xF0\xB0\x04\xA6\xBEg0\x07P\xB4\xD0\xAA\xD5B[\xBA\xEC\xE6\xC2\xDB\xC2,\x06N\x96\x18^\x13\xC4\x8A\xB2\xEF\xCE7.Q\xCF@ u\xF57\x14\xC1\x15\x98\xD1\0\xF0\xD8\x05Le(E\xF7?0\x1A\xC0(\xDB*\x18\xC6\fC\xE0\xF7He_\xC3\x96\xD6\x93\xE2M\xCC%:a\x8F\x89A\x98\xC6*\x1Eg7U\x80Q \xDD\x975\xE8bD\'*\xFE\x12\x8E\x847\xCB\xFD\xF9\x9Bb\xC49\x0F\xE0\xE8}\x0E_\xB7\xFB\xA7v_"\x97\r\x07\x8F+\xA0\'0N\xDAC\0\x80G\x89\x1C|z;\xFBe\xFB\x96|\t9\x85\x12?p\x90P\xACDzZ\xBA,\xDE\xBB\x80\xA3x\x01!\xFC\xCD\x18\x8A<\x9E?d{!R\xC2\x02{\x88\x8D\x93\x80Z;\b!\x80\xE5\xE9\x8F\xE3\xDA\xF7\x9Cp\xD5\xF2s\x02\xB4\xE8e\x97aH\x02\x80~\xE5.d,&\xAAu\xFCV7!\xA1\xFC\x97*\xD8T\x0B\x03v\xBA\xFD^\xAA7[U\x96\x1C\x0B\x96]\xAD5\xFB\xE8n\xB3\xB2\x11*i\xC1i\xD1\xAA+l\xEE\xBD\xAFD\rZ\xC5\\@%\xD6R\x1Ck\xB92\xBC)\xAAL\xAD\xA3{\x11<\x87*\xDD\xFD\xF4X\x96\f3\xE8Eh^\x0B\x8F\xBBpO\xC7<0\xC5rDt\x93\x8A\xB5\x1B\xFD\x9A\x96\x9D\xE1TV\x8AF\xEB\xFA\xD1\x1B\xC3\x8E\x1A%\xDA\xCB\xDE1\xF6\x11}\xEC\x16V@\'tk^\xEF\x92\xD7L\xCF\xC8\xBF[\xF2\x9E\xB0\x12\xD2\xC0\xBD\x0E\xD5\xA0k/\xE1+Oi\xE9\xFE\xA4\xD5S,\xB1~\xCC\xA7t\xFDWC\x86jT2T\xC0\xB1\xA1\b\x95\x85{:\x8B\xD9\x02\xCB\'\xF6\x97\x9D\ne@\xC9;%\xE3FUy\xE1\xE65\xEF\xFC\xDD\xF5\xEDK;\xBCu\xD3J\x83\x12\xB7q\xA8\xC2^C\x04\x83M\xECs\x9D\x84\x0E\x8E\x15\xF8\xFF\x02\x94\xD1\xD4\xAE\xF9\xB0\xFCyF\ff\xBF\x89\xFEWaO\xB7\x98\x1A\x17H \'\x81\xC3\xE9q\xCA\xB1\x1D\x81\x8E\x90\xA5W\xAF\0\x88\x82\x96\xF2\xB2\xFB\x04\xF5W\xCC;\f\\\xEC\x96\x82\\S{Bk\xDD\0\xC49L\xB9\xCC\x14\x98\xB9\x15\x0B\xF2O\'\xF8\x95)8\x16.\rE1\x91hD\x8F!\xAC\x9E\x93~\xC8\xAB\x9F\x14;u?\x16\x98J\xB4{\xADA\x1ES\x89\r~\x1D\x0E\xD4\xF2\x1A-\xEF\xEF\xC0\xA4\xA7kE\xC5\x80H\x07k\x9B+\xCC$Z\xB99\xF0l\x8B\xC4\xFD\x12\xA8,\xDBQ\xA9\xC7\xB6Z\x8A\x9D\xDC\xA1\x1E\x8D\x02^{\x1D4\x94\xF3\xD4\xE7\x81L\xDBFS\x99\xEE\xE7.\xDB\x13\x0F2\x0FF\xD33\xE9E\xE8;J\xE1\x12&\x85N\xD5\xE2OR\x8D\x95\xAE\\\x8F\xE5\x99\x99\x9C\x84\x82\xEE\xFF6\x1Fy\xF4]{~\x7F\xEF\xDF\x97\x0Bo}f\xA1\x8E[\x9Dv\\\x1D\xE7\x89\xE8ol\x1Dy\xF1\x15\x8B\x1B\xFF\xE2\x13k\xC3:S\x88\xB6\xB0ju\xFB\x07\0\x80h.#\xAF0\xD5@g\xD1\xA7\x8AoO\x1C\xA2\n:\x85\x8E\x05E\xF9P\xD9\x94\xB4\x96\x9BN\xE20\x86\x07\xFER\x02W`\x16\x81\xAC\xC3\xAE\x88\xBAz\x86\'\xAA\xEE\x06Z\xB6\x81<\x86\x04+5\xD1`\x9F\xAC$\x93\x992\0\xA6\xEE\x9F`\x1C\x15G\x15X\xEB\x14\x9C\xA4\xDB\x92\x9CC\x04\x9A\xCDE+\xC9\x88\x1D\x98\x82\xF8\x12\x13S\x03l\x1D\xCB\xF7\xCD\xD3f\xDA\x81\xA6\rc\'o?\x8F\xCB\xA0|B\xBD\xF5\xA0\xD5h\xC8\xF9\\\x05VF\xDD\xBA\xBD*\x92\x92\xC2\xEAy\x98\x12\n\x9D\x8F\xD6\xFF\xDF\x95\xE9L\x04-\xBB\xBE\xE6\xA8u\xF00mB\xC2\xF2\xFB\r\xBAs\x80\xA8\x19\x12\xA47h;\r\xDE\x7F\x93\xD7\xCC\x95\xA78?\x9A\x1B\x81\xBC\x07z\xBD|\x87I\xB5S\x9FO\x9C\x83q\x1C\xDE;\xFF^\xF1\x0624-\xC6\xC1o\x98i\xE1\xC8Z\xF9|V\x97\xF7 G\t\xB0\xD8?n\x8F\xDF,/>U\xCA\x008E!\x03\xC7s6\xCE\xBA\xE2Y\xD8\xFBc\x1BK\0\x8C\x93\xA4\xF6_\xB40\xA2a@\x93\xA1\x84\t\x99u\x98b\x06\xE9a0\xBE\x95N\xA2IZ\xB5\xDA\xBB\xA0E\xA6#\'9=\x01\xEE\x93\x15\x8D^f\xEA\xFB\xD3\xD2X|\xD8\xC0.:A&\x19\x052r-\x86V\xE2K\x99Z\xA5n\x84\x17\xB3\xC6\x0E\xA8\xD1\xB2\xF07\xEC\xDA\x15\x82-(\xB6\x94\x19\x07kz\xBADv?\xA2\x0B;]\xE6\x1D\x93,\0\x01?\x02rK\xB5\x86\xA9\x0B\x94\xEDK(\xA0\xB1\x9F$J\xEF\xF7\xC9NL\x04\xF9\xCC\xCDv\xD7\x1D\xD6\xCBa\x02\xDA\xB9\x10N\xD7\x9C\xC8\xAAN.\xC2R\xAF\x93\x8CG-?]5\xDC\xFC\xE8\x84\xE4 \xAB}\xEE l\0\xAA\x1Aa\x84e!,|X\xF6\x1E\x8DX\xA7\x9D\xA6\xB2\'\xE5\xB2#\xC0\xCC\x9A\xE5\xB0\xBF\xF3\xD8\xB9N&\xAF7\xDF\xA7u\xD4f\x18"Xj\x86Y\x15\xE8\xA6\xFD\x02\x10^J0h\x1DxL%\xE2Y3\x0F\x19\xB8\x92Y\xE0\f~\xE0\x8E\x11;\x8F\xDE\xFA\xB1\xFD?\xBA\xF7\x8AS$\xBE6\'O\xE5\xC1\0\xE0\xAFT\xE7/\xD9\xBE\xE9\xFD\xEF\x9C/\x1E9\n[\xB4W6\xE1qx\x04\xA5\x1E\xC1:\xEFL\xAD;5ih~j\xD4\x0Et\xA4\xA6\xD5\0\xFDP,T\xD9\xDE\x7F\xF7\x89\x16w\x8D\x1CV\xD4\xDF\x1E\xE9\xB1(\xC7u\xE5a\x96\xCD&G\xE4\xAF\xFD\xFA\x8C\x80\xA38\xA6\xF6\xC1\'\xC9j\xECh\x16@\xB1\xA1\x82}#\xB0\xA1\x82\r\xF5>\t\xDD~7\xB5pa\xEE\xAE\xEC\x8C.\xAA[\xC9\xF9\xD2\x9FfO\xE0\x8B!\x83\xA8s\xF2\xB9\xBD\xBB\xB2\xD5\xCB\xA0G\x01\x15\fK\x8D\xEB\x95\xB1\xD4\x0F !\xDE\x01F\xB9f\x9F\x06\x81_\x1B$\xF8\x06\xAB\xF5\x0B\xB6\x1F\xC2Z[\x1F\xC9\fI\x92\xDA\xEC3B\x11\xE7&\xDD\x19J\x9EC\x86\r\x80fX\xC1\xD0G\x93[ \x9D\xE0\xA6i.\xD6J@\x05k\xACr\xEDy\xCD\xE4.0\x1Ce\xBDC\xE5j\xB4\x8Aa\xF1\x99\xFB\xF3\x1C\xC8\xED\xE0\xF5\xF5\xE2u\xA9=\xD3I\xDDC\x84\x12\xF6\xBD\x8E9\xDF\'\x9E-\x10\xF3\x11\xD2\xB1y\xC9\x91\x0F\xEF\xFE\xCF{\x1E\'\xDF,\x8B\xBFM\x1EOt\x9C\xB2\x90\x81\xE3\xC1"\x8B\xFF\xB2s\xF4\xF9W.\x0F\xBE\xF7\xAA9\xE6!\xF8\x8A\xB2b\x92\xBB\x7F@\xFC_\x948B*\x8Ax\0\xF1\x920\x11\xEC\x10*d,\t\x8F5k\x05c\xC5\x02&\xDDp\xF8\x12"\x04IA\x0E"\x13?sO T\x952\x8C\x98^\x13\xDB{GM<\xEC\xDC\xE1\xA9\xF8i\x98\xBD\x10\xFF~\x84Yu\x82T\x83\xDAa\x97\x14\xE2\x9ETa\x8C\xD3x\x9Bno^O\xD2\x99\x19\xAAD\x15`\xB9\xD6\xDAX$Z\x96\xF1Z{y\xFE\xAA\x1E\x1AH\x84\x04\x93\xD0\x05\xD99it\xE5A\xA4^a\x169\\\xD1nX\xC3\xE8\xD7\x16\xF5\x05\xBE\x7F,\xCE\x02\x0F\x05\x90\xEF^|Nt\x98\xC5\x9E9[\x9FF\x82\x8A@\xCA\xBB\xE1\xEF\xDE\xF33\xDE\xD7\x18\xF7\x87l\x13\xE7.:\xB3.\x9D\xDFu*\xDD\x14V>\'\x1A\x18q\xEF\x8FF\x88\x82\xDFz\xEEW\rD\x86\x0B\x1AaB8\xFF+\xCA \xE6\x0E\x14[\xE7\x1E]\xC8S\xDB\xF3O\xB52\0Nq\xC8\xC0\xF1\xC2\xB5\xDD\x1F\xFA\x96\xBE\xEB\x95k\x9D \xA2\xAD\xB7\xD0&\xDEA\xF2\x0B\xAC\xFD\x1A`@d\n\xAE\x1C\xEFg\xCC\xBFc\x02\xBB&\x0E\x16\x19y\xE3\xAE$X\x0F_\xB5\xBC\xF6\xEE8\x02\xBFg\x98\x80|\x11.(\x15\xC0"\xFA|<r\x93x\xBC\x99EG99\xE9\x81D\xBF\xC3:1F`\x1C\x15[\xAA\x81\xACGSVE!\t\xE9\xD4\x15W\xC4\x12p\xC7\x86\x0E\xC5\x05F\n\x82\x03\xFC6\x1F\xB9=VHP\x9D\xC74\xD7\xDE\x90~\xC5r\xEC\x91\xE9\xC0\b\x8CK\xB8\xEB\xCF\x90C3\x1Cpa:\xF6\x87\xCDUK8R\xCE_\xFF\xD6\bA\x9CX5\x96\xB0\x84\xC6\xA0\xFCp\t:\x86CyO\xAE\xA0;\x82W\xC1%\xE1j\x16\x84Y\x18.\xCB\xC6F\xB0I\xC6\xB2\xD0e\x1Ar\xE51T\xF3\xBE\xEB\xB3\x185\xC3\x12\xBE\x07\xE5\x01\x148^F\x82#\x8C\x15L\x19\x8C\xB2\xC0\xD1\xC7\x1Cz\xE5\xEE\x9F;\xFB\xCB\xEE\x93x"\xE3\x94\x87\f\x1C\x1FS\x9D\xBDt\xEB\x96w\xBF}\xAD=A\xA5Y\xBE\x1A4\xBC\xB5\xA3\x11\x87c\xD4\x9A\xB9\xDC\xE8\x17Y\xB4i\xF0\xCF\xFDAR\xE3\xD6\x9A\x04`\xDA\xBB +\xCD\0\xC0;\xDE\xB8\xE57\xFE:{\x05\0\xD1\xF7\xA0x\x0Bm\xB2?\xD2DN\xBC\x04f)r\x7F\xD5\xA95\xA1\x92c\x98\xA0Tf<?\x04\xFB:\x8C\xCA\xEC\xA1\xC3z\xF7\xB6j\xDD\\t\x16\xFCX\x8B2\rD\x7F6V\x1E\x82b\xD6\xB3\x8AO\xD4B\x8E\xD6\xDDj\xBA\x0B>_\xDA\xFDR\xA1\xB6\x0E\xB4\xA5\x86%&\x8D\x99\xDC\x03\x16[\xD1\x9D\x9F\xA9`\x90\x92\xF9@\xF2\x02\x86\xF2w4x\x81_3\xB3\x11\xB4\xBA\x9A\xD9\x83\b\x1DT\x93\x9E\f\xCD,\x8A\xB6\xB0\xA2k\xA3=K\x16R!0\xA0\xF4\x98\xE2\xFF=\xC9a\xE8\x02\x95\xCC\xD0\xD8sS\x10\x9C\x1E\xBA\x84\xEB\x0F\x14O(\x8E\x85r\xACr\xBE\x8E\xC825\x05\xDA\x92\xF3/\x97\x96\x9B4\xA8!\x88\xDDK\x18\xE1\x8A\x85\x18B\xE5\x1Btt\x1Cy\xC8\xE1\xF7\xEE\xF9\xA5\xBDO\x92\xAF\x95\xE5\t\x88\xE3\x97=Ny\xC8\xC0\xF1P\x91\xE5\x1B\xFA\xE2y\x9FYn~\xF0\xCA\xB9\x9E\x9D\xCEv\xA5*#?#xR\x84\x7F"\xEC>y\xBA:\xD3\x8B\x9AT\xB2\x12\xCE\xF6\xF1\xE3\xD6*\xB4\x0E\x98\x92\xD0xA\x14\xC2\xEE\xBF\x03\x04*iC\xBAp\x91)p\x173\xB2\x18n\r\xA8\fX\x8D\x06\x94}9\xC9c;qE\xE3\xE7u\x9FX}\xE2o\xBA\xE0\x0Fn\x99\x07\x17\xD8@\xC4{*(\xF1,\b\x95^\x84\t]\x82\xDA\x1B\n\xB1kL\xDAT\xAEN\xCEr\xE5A\x0B\x16\x9F\xF93\xECJw\xD5\xAC\xB0\x02V\xB8\xEA\xF7\xDCk\0\xD83t\b\f\x07)\xF8\xD1\x97B\\A!\x89`\x82L5*\xA4\x84,F\x81\xB6\x10\xC2\xF1\x1Ca\xF6$[\xA13\x05\xD8\xE9\xF9i\xA58O\xE7\t\xC3\x01zk\xDC\xC7\x04\xDD\xF8\x06@n\xCBP\x86\xEB<D\xF8\xEA\xCF\xBD\xC7v\x99\x91\xEA\xE1\x1D\x92\x91\xC8\xFBp/\xC4\xB1\x14z\x8D\x9D\xCFbr\x9D\xAE,\x04\xD8\xBC`\xE7p\xFB\xB6\xD9\xF3n+e\0\xDCF!\x03\xC7\xF3\xDA\xFC\x93\xFFP\xDBw\xEF]v\xA86t\xE7 d\xC5\xA2)\x07f\0\b\xBCU\xD2\x91\xBDD\xCD\x17\xA0\x12\x02\r\xD0\r/\xF1\xBA\x02Q@\xE2\x9E@-@\xAA\xAE\xBA\xF6\x16\x02$t\xF5\xFD\xA7\xE6\xE4\x03{\x88\xFD`\xEB\x10\x04XG7S\xF2\xFA\x98\xB9(\xFB\xD52\xEC\xF0S\xC1\xFB\x15`\x14\xEC\xA8`\xA7{\xD8\xE0!DE\xC6\x17=\xDD\xEF$\x05\xC1;9\xBBP\xBB\xEBonrG\xAC\x7F\xD03\xE41\x97:q\x96\x8Et\x8F{\xD9\x96n\xEF\xB2\xAB\xAD)\xE1J\xC3B\x17\x8D\xCCE\xD4\x1Dhn\xC3\xDB\f\xC5\xA1\xB9\r3\b\xB9\x8C\x9CN~/\xBBb\xA1\x1A\x99\x83\\\r;\xD7\xA5X\xD6c)\x8E\xC9\x98L\xB2\x03\f\x85\xF8\xCC\xEA\xF5\xF6\xBCft\t"W\r)\xF8\x7F\x1A\x81\xB1\xDCk\xBE\x8FZ\x8B"\xE55K\t\x192\x1C\x89\xF7\xE1\xD3 C\xCCcA\xC5\xED\xF5m\xE0\xEF-\xBE\xFB\xEC\x1F>\xEB\x93\xA7L@\x8F3n\xB3\x90\xA1\x8E\xE7\xEE\x1C~\xC3o\r\xF2\x1D\x0BY\x07 \x13\x8A@\xE4\xA7)<@\xB8O\xB5\xF5y\x05\x05iU\xA8\xE5\xCD\x05v\xF7\xBF\xA2\xB6.p\xE6v\xB5\xCCR\xC4\x04(\0\xA2z>\x9CV\xA9\xE7\xDFD\xE0#\xDB\xE0\x96(\x1A\x9A\x14\xAB\x1B\xC0\x10\x15\x89j\xB8\xB3\xDA}\xA5g\xB0\\\x9Ai,\xC0L\x9EY\xB15U\x9C=\x02\x1B\n\xEB\xAA\xD4\xD3\xBD\x9DuC\xF4\x07\x18]\xD9:+%uwp\x0F\xA3uX\x7FD\xBA\xC1c>\xC7\xEC`\xACAUV\x9F\xD9m\x14\f\x8E\xA5p-D\xD1\xCC,\xCC\x15IM\x86F\x06\x82\xFD\x14\x8D\xACna\xC1\x8C\xE7\x81\xB9\xE4\xE1\xC2{\x16imi/7\xC3\x04\xC1L\xD3\x927d\x86 i\xC2\x12\f\xD4\x19\xAD(\x18\x8E\xAC\x10\x8B:\xC3\x81\xE9\xF9\xE9\xC50\xA5<\xF4\x9CO\xB1\x96Ex\\\xC9\xE7\x10d\x17%\x86\xB4\xADO)\xCF|\x07@\x86\x12\xB5B2B\xB7\x9E-\xF3\xF8\x8Cj\x88R\xA9\xCB\xA3(\x0E\x7F\xED\xE17\x9E\xF3\xEE\xBD\xCF;!\xC1\xBB\x15\xE36\x0B\x19\xEA\xF8W\xF3\xB3^\xFC\xD9\xA3G\x1E\xFB\x9E\xF5\xFE \x1Df\xE1~\xCAD \xFD\x01\x14\x81\x8A%\xD1\xFDe\xA8\xC9}\x80v\xDD_\xBC\xC2\xE22z\x17&l\x1D\x19&4\x10\xF5\xB6\xEF\x8B;\xC8\xF3\x15mL\xAB\x96D\x93\x95\xEB\xF4c\xF0\xDA\x18J\xA4G\xA0yl^\x7F\xB7\xC9l\nM\x8A\xD2h\x06r\x96s,\x14\xD8D\xC7L\x1B\x96\x9C\x98>\x81:\xCC\xFAL\x14O\xF9;p\nZ\x1E\x8F_\xB53\xBE6\xEB\xD8 \xC17\xE8\xBCV\xFE\xBF\x1C\x87\xE4,q%\xBC\x14\xAF\xC3\0B0\xFDQ\x068I\xAF\x8EY\x99\x16\x8A\x02\t\xAA\xC1\xEEk\xE6\x19\'\xC0\xDE\xE7RS\xF0\xC5-.\xDB\xA5Y\xC8 \x11>VRQ5\x0E\x04\x7F\xC5\xCF\xA3\xFE\xBE\x18\xC2\x91u)\x9D\xDEN*\x81t\xD5\xB3n\x85\x99\x86\xC8\xC8h\xF1|4\x85\x9D^%\xC3\x07Z\xFFZc\xD1\x03[r\x03\x03\xF8j\xE0\0$C&\x9B\xE8@oKl\xDE\x7F\xF3\x8A}\xFFr\xCF\x8B\xF1\xEE[#}\'6n\x17\x85\xF0u"\x87\x7Fe\xB1s\xD9\xF5\xCB\xF1\xCF\xFEZfg\x8D\xE4\x19\xC4\x0BP\xB0\xF5\x98\x14\xCD\xC8\x87\x1E3\xA6hb0\x96\xF4\x97\x17}\b\b\xEE\x85\xDB\xE5\x0F\x9F/\'\0I\xA4\xA7@\x81\x02\x92J\x1A\xE7\xD7\x10\n\xF8$\x99\x80\x8BeB&\b\x84\xD8?\xD9\x7F~\x1BJ\xEFG\xE2>\xAA\xA2\xA1\x17\xB4\xA3\x82-L\xEB\xFE[U\x1C\xDA]\xC1(\xE0\x8D9\x06\xBF\x9F\xA5\xD2\x9B\x90P6\xE1\xC6\x17w\x94q,\xC3%\x82\xAA|\x8E=\xC22o\x94\x82d\xE9Q \x15\t\x1A\xF2s\n.i\xC2\xE6r\'\xAD\x99\x19\x82\xDE\x81\xD11\xA0\x8A\x1B\x90?\x10\x82\x85\x14n\nce\x05N\x18\x81\xE4\x86\xF0\xF9#\xBDB\n}\x02\xC79\x07\xEA1L\xA1I\x80\xB044\xAD\\;\x85\x9Fn\x7F\xE0AZK\xE0\xD3\x9B\x88g\xDE\x99X\xD7\xC8@\x91UY\xE7\xBB\xDD\xABb\xFB\xDC\xC5\x91\xE5S\x16\x97\xC9s\xE5\xF0\xDF,a\xA7n\xDC.!\x03\xC7\x0Fnm?\xE7u\xD2\x7F\xFD\xC6\xF9FX\xB5\xC0\f\\\xF8d\xB4K\x9A(\x83\xD5\x1F`j\x195_\\Xh\x07\x07M\xD8[\x1E\x0FSl\0e\x7F\x81B\xDDm\xA7\xF5\bBIy\xA1q}\xE58i\xA1\x8BBb&\xA2O\xCF3Qvq\x1F\xEA\x12F\x0Bh\xC4\x99\xB3\x15\xD8\xA5\x8A\x8D\xD1\x9B\xAC\xAA-\f;S\x89\xD0 \xC2\x841\xD1\xFA\xE6U\x8E\x8D\xD5t>\xF9\x06\'1\x11\x9C\xD4n\xA1E\0\x8C\xDA\xCC\x9A\x95n@<\xAE\x887\x80\xD5\xCC:\b\x9C(\x05\xADkrg}\x054\xDB\xB1\xFBs\x8A\x90E\x81Ah\xB1\x11\xA1C\xA0\xFFE\xA0\'\xD5\x8E\xE5\xF8\xF1\xB9\x83y<6\xCA\xFE\f%\xF8^\xE9\xFD\xCDz\xBE\x076\x9A\x99Tb\x8Ei,\x9A{}\fE\x18:@\xE9=tW\x12-\xCE3x\x96LF\x86oTh\x06(G\x95\xAAf\xD8C\x1EK\x83b\xB9k\x81\x9D\xA7\x1F}\xEE\xBE\xDF<\xF77n\xBD\xD4\x9D\xD8\xB8]\x15\x02\0<\x7F\xFB\xC8\xCF\xFE:\xD6\xBEw\xC4,d\x86\x16i\xE2~\x13\xA1\x05Bp&\xCB\x83\x15aLP\x06\x91t\'\xBAkB\xDC\x8A@j\xE0\x11t\x0B\xAD-\x98\x9F\xD3\x89\xFA6\x11<\xEE\x0F\r\xEE\xA9BZ\x98\xE3\b|]\xE3\x81\x16\x825\xFF\xC7x:\x1E\x9F*\x89\x02\x1DY2\xEB\x13\xDE\xD6oP[\xC3A\x815\xC7\0\xE6H\xC1\x1F\xD4\xD2r\xC3\b\xB0\x0BsS\xEF\xBAT\x94&\xD4R\x8D\x99\xA5\xF0\xF3,M!\xD4\xC5C\x86\x91\x1E\x83F\xB8bBo1|\x93d\x1E\xCE\xBA\xE1\n\r\x885\x17\x06%k1k4\x04H\\\x81\xCA\x01S\xC1W\xE4\xCAUA`\xD7\xF4\b\xA2;SG4\xA6\xAD\x05R\xA1H4\x85\xBBi.e\x17)Cn\xE7\xF3mV\xB8+\xC1:,\xEFp\xD2]\xC9\x9F\xB5"=\x05\xD1\x1E\xCF\x9E\xF8R%\x83\xD5\xB4%\rY\xAClU\x94W\xCC\xF96b\xF3\xD2\xA3\xAF\xDA\xFFG{\xFF\xDD\t\t\xD8I\x8E\xDB%d\xA8\xE3%k\xBB_v\xDD\xD1\xAD\x87\xBD}\xC07J\xB7\xD3\'\x1BP\x01\xC6\xD7!p\x98\xB8\x86\x15\xB5N\xE5\x01D6!\x18a\xC7\xD2\x98\xA3\x1E=\x8E\xEFB^\xD2C\xD9\tI\xD3\xF2\xC3<\x03U\x98\xC0\n\xDD\xC5\x8C\xFB\'\xE9\xA5r\x8DUq\xF0\xB0qo\xDC?\xE8\xAA\\\xC6\xDB\x8E?*\xB0\xA5\xE6-4\xA4\x0B-=Kn-\xA4\x10g\xC9\xE9\x04\x8Cb\xE8P\'!3\x05\xE1\xCAr\xE1\x11\xAF\x924\xCCAb\xDD\xC4\xC0\x12\xEC\xAA\x02=wq0\xD7\xB6\xE7k`\xEB{\x03N1q\xDF\x9B8k\xD1\xDFE\x8D\xFF\x13W\x02\x14\x12\xE4\xA9\xDA\xE0&R\xBB\f\x954\xD7\x86\xACJ/\x04]3L\xE0\x1C\xC1X\xD6\x8EPs\xF7!EI\xF2Zy\xFF\xFE\x9B\x85i\x8A\xA2\xDC\x8B\xB0\x0F\xDA\xB28\xAB\\3\x15}4\x84\xF5w\xD3\xD4l\x17\xD9\x98\x13\x82\xBF(\xB6\x1F\xBE\xF3\x8Es^\xB5\xE7ex\xC4\xDF)R\xA7t\xDC\xEE\n\xE1Q"\xE3\xDBT\x9F}\xF3\xE1\xCD\xFF\xFB\x81\xD6.\x01$\x1E\x12 \xFE\xF0s\xA5\x87hP\xC2\x17\xEFnX\xC4\xDD\x10D\x1FEmeR\xC81\x02\x1A\xAC\xC1\xF0,\xF2\xE50\xA5\xA9\xF5E\xFB66\xD15C\x04\x9E\xDA5<\xCA\xFE\xD3x\xB6\xA4<y\xFD\x1EVT:sN\x9E\x04\xBAx\x1D\x8B\xB1cP\xC1\\\r\x0FX\xF85\xAF\xF1\xFE+8V\xEE1Ro\x9A\xCDGxL\xF2\nH\xA9%\xB8%\xCE\xD8\xE4\xC4fZ\x8D(x\x8F\xDF\xEA\x9C\x01\x85\x8A\xE3\x0B\xDA-\xCF\xE3\n,dA\xDD\x13So\xE7\xEE\xCF\xA6Y\x80\x16B\xAF\xAE\x11\xD8<\x95\xD9\x19>\x0B\x86\n\xCB\x9Ea\x81\xA5\x05{\x9C\x93\x95\xA2y\xBF%\xC3\xE3/\x8D^\b\xA7E\xBC\xBF\xFA\x1E\xFC\xDE\xC7\xE2\xE1q\x15(f\xB4\x80\xF4`b>h\xC1\x18\x14\xA1\x9C[7\xE6\xA7\x91\xE0\xFC\x19z\xA6F\xCBo\0\xE8}\xC4\xE2+\x0F_\xB9\xEFE\xBB\x9F-\x8F\xB8u\xAD\xD4Of\xDC\xEE\n\x01\0\x9E&r\xF3\xAB\x17\xDB\xCF8tt\xFB\xCF>\xD66\x0E\xF0%\x85\xE0\xA2Z\xF6\xD2\x85\x86\x13$\xB6\xD5\xB0\xC4\xB4x\xB5 )\xADr\x11\xC0\x12f\xC4q\'\x1A_CYh9G\x86\x19+\xD6\xC8\x15\x05_\xF6$\x05\x19\xD7\xAFay\xC8w\xAF\x13PBy \t4\x11\x12\t\x96\xA3b\xE1\x13)]\xDE\xAC\xC3\xE7\xFA\x0B\xA1\xD8\xFA\xD4%>\xE6\x1E\xA9\x98\xA2\x17\x80\x04:\x1F\x18\x88\x13\x93\b4Z\x8D\x82#\xEE*\xDE\xEC\xC7\x98\x8A\xBD\x03\xA1\xF0\nV0bZ\x8A\xDEt\xF5=\xDA\xE7,~\xA2\xD5\xB6\xF7;}\xDEI\xFCq\x90\xD1\xFF\x8E\x8CMy\xE7\xE4<4\'-Qqg\xEF\x0BW\x88@d<\x96\x9A \x1FT\x03\x93H\x0F\x86\x041;\x99\xFAs\x1F\xE8\x89N\xDE\xA9\x960\xC1\x8D\x12\x14u\xDE\xF1\xB8\xEE\xA0\xD8\xB9\xA4cy\xAF\xAD\x9B\xE4\x99\xB3g\f/^\xBB\xF9\xC4%\xEB\xE4\xC7\x1D\xA2\x10\0\xE0%\xF3\xF5O\xFD\xA7\xAD\x9Do=\xBC\xB9\xFC\xC3\xAB\x86\xD9F\x15\x9E\xAC\t\x97I\x18\xC0\x87m\x93\x8FT\xE3d~U%\xC1c\x01\xB0\t\xE1\x9A=\x15\x86\xBB\xC8\x13\xC4\xB9f\b4\xCEy\xBC\xE2$(_6{(\xF8\xA9\x03\x84\xAC\x93D&\xC4\xA6\x8ADW`r\xF2\xD3\xF3X]\x9B)\x04\xB5\xDC\xFF\x8E\x0Bt\xE3*K\xCA"\xA8\xE3\x1C\x97n/\x05h\xAC\xCA\x82J\xA0\xD6kHxC\xD1\xECe4\xC1\xE3\xE3\xA5@\xAA"V\xC3c\xA8\xC7\xEF\xCC\xBF\xCB\f\x82\xF8kc\xF8Q\xF1\xA1d$\xA6\x17\x12\x82\x03D\xE8U?\xD7r\x1E\x14%BA\xE5\xFD\xA8\x7F\xCF\xD0#\xC2.Me\xAC\xD0\xC8\x14X\xEC\xEF}%}\xDE\r\xAE4l.\xE5<\x0BP\xB1\bx\xADUi\xE5\xBD\xB7\be\xF3\x19\xD9\x83H\x0Fa{\xEF\xE6\xD6\xDAS\x96\xDF\xBA\xFF\xE7\xCF\xF9\xD4\x97#C\xB7\xC5\xB8\xDDA\xC5\xD5\xF1\xFD\x87\xB6.\xFB\xE5\xA5\xBC\xE9\xA0\xCCm\x9D\xD1\xD1\\\xC9I\x1F\x82x\xF1\x9A\x02\xDD;Zw\xA7\xAD\x82|\xA5\x96`\xD5\xAA\x0B\xDC\x9A\x85\xD0\x90R\xAA\xA1\x1CZ)~\xA1\xD5;f\xB9-N\x06W2\xADX%\x9D\x1C\xFF\xD8\xBF\'\xBF;\x8E\xF1(2\xBB\x91\xF1\xA8\xAA-\xCD\xBE\xA6\xC0n\x15\xCC\xD5\x97\x7F\x1B\xB9X\x8B\xF74\xEC$)e1W\x05\xC2*:.\x8A\xE0\xDA\xB3i\x8A\xA8\x81\x94\xEA\xCAbX\xA6\x95c91\x17ba[\\\x02\x85\\\xC8e\x10\x99\xD46\x88f\xBBvZ\xE5\x86\\\x8A\x8E\xE0\x1AC\x02\xDBOJ\xA9\xF4\nP\xE8\x8AAx\xDD\xFCL\xE9A\xD1\xDBI\xF4>j\x19\xC0X\xBE\x86\x8A\x1A\x99\x8D\n(\xD6mf|\x0F\xDD\xB2;Tj\xCC\xD8X&\xC6\x95\xDF\x98\0&\x17\x96\xD5r\x8D\xF5>\x04\x96e\x81*\x16g\xED\xF4\xE1\x1F,\x9E}\xD1\xE5{.?I\x91:\xA9q\x87+\x04\0x\xE1\x97\xB6\xBF\xFB\xF2e{\xF5!\f\xE9\t\xC0\x80.s\xB3\xBD\xE0\x86BJ\xA1\xEC\0\xAAu\xF6mk\'\xA5t\x913\xF4\x98\x84\x02L\r\xADz%\x8AH1\xD6\xF4&\xB1\x81\x10\xF4\xC2YXm\xB0\x1Ay\xFD*\xF4+\xC7Ze9\xC66=\xF3\xDA4Om\xEC\xD8\xE8\x82]\0\xD6\xBB`}\xCC\x95\xA2C!t\x16>\xD5\xF0\x02\x99\x92\x1CY\x91\x89\xF81\xA5\x90?P@GE[d\xA3R\xAE\xCD\x10\xA4$\x98\xA0\xCF\xD0r\xB2\xC3W\x8Bv\x90\xCEX\x89\xDE\x10\x96\n\xC1\xB7#\x0BQ\xB4d\x1E\xE0\x19\x12\x94^\x04(\b\xBF\x94\x15\xAE\xB9?\xAC\x1E\x80\xAC\xC2X\x03\x92\x1E\x0F\x18\x16\xA5r\x10?\x16\x95\n\xC0\xE7u,\x87\x80d.\xBE\xF3\x19\x8B\xAB\xD4\xFB4\x94U\xB7\xC9n\xE4\xDFdM\x82\xD7\0\xDEg^[\x83\xA0\xAF\xED\0\x97\x1E}\xC9\xBD\xDE\xB6\xFF5\xA7B\x9ENf\x9C\x16\n\x01\0^t\xCB\xE6\x8F\xBC\xE1\xA8\xFC\xC7\x1D\x99\x03hnm]h]\xE3G\xE5\x17\x1F\xB43\xC9\xC2\xE5W$\xE8X\x05?\xD2i\x9A\x02\x16\xF1&\x17T\xB1s\x19kM#\xED\x18 b(!)\xD7\x04\x18\x93\xAD\x1C\xD7\'\x98)\xA6\x964l*\x11fS\xFC\xD8t\x8B\xE9E\xE4\xF2]~\x7F\0\xD8[AF[\xEAm\x97\n6\xC4R\x90\xEBN\x85\xAD\x9E\x02\xC3\x03\xAB\x86\x94\xE8\xB3h\xFC\x02\x13\x9A\xA1TG\xD2#hK$\xFBpt\x0FA\x81X\x17\x11\xDE=\xD9\x85w\xA6\xE6\x11\x90\x1A\x1C\xA9G\x94&&\xC8\xCA\xC7\x14bL<\x84\xB0\xFA\xFC\xBC\xE7\xB6L\xF9\xF2\xBBJC\xB6\xFD\xF3\\\xD0\xE9\xF1\xAB+?I7\xF6\x82\xE8\x8F+\xDE\x06\x89CE\xB0M\xC8\xED\x9D5\x8F\x93\x04l\x9E\x92\xFD\x17\xE3<\x9DJ\xC8\x19\x9E\xC8P\xC9\xB2\b\x12\xF7\xA0\xC3\b\xBDt\xF3G/~\xC7\xBEW\x9C\x021:\xE9q\x87a\b\xAB\xE3\xC7\xF7l\xBC\xE2\xD0\xCE\xE1}o\xDEi/YHKk\t\x14a\xAB(~\x92\x8D"\xC5\xE4\xFFW\xD4\xCF+O@\x82\xF1\x16e\xBF!\xF4\x068\x11\x95\xAE\xE0cZ\x8C\xFC\xDC\x80.\x05J\x96\x84\n\xC2\xBC\x85\xCCC\x13S\xC8\xD0A\xF2:QB\x83h\xB2\x99%\xAFZ\xD8\x89\xB6\0\n\xB0\xADe;\xAFu0\xDE\x8B\x1D18\xFE%nm^*\xCC~\x8A\x1D)X\xE2iO\xA3\x82k2\xF4 N\xDE\xE9\x01\xC4\x01\x1E\x1B\xFB3dzp\x1E\x8AQ!\xAE_\x89\x98\x11$n\xAE\x88#{\0\xA0\xC9\xB4\x84=>\xE7\xABG\x89\xFF\x81\xD8\xD6\x96Z\x93\xC9<!\x01\x96\x8B\xC8\x8E\xE5\xDD\x05\xB0\xD8\xED\x99\x1A\xCC\'\x91\x89`\xDF\xC9\xCA\x94\xED\xA1\x98\xE1\x98\x05\x95t-\xA5\xF6K\x98xZ\xCC\x8C\x15\xE5\x94\xCE\xA6\x9F[\xD1\x87\x1D\xB4\'\xED\xBC\xFA>\xAF\xDF\xF7\n\\\xF4\xE5H\xC9m?N\x1B\x85p\x9E\b>\xAD\xFA=;7n\x9D\xF5;\xDB\xED\x05#Z\bRX]\n\xBC\xCF\x8C\x89;\xDEsB1\xEE>&\xB3\x80\xF4\x1A\x98R\xC4X?\x87\x83K\xC7Q2=\x15\r4\x17\x04\xA9^G\xE0\x18\x9A.y\x02\x96\xB9\x7F%)\xD5\xED\xECo\x07HyM\xBC\xEF\x0E`4%\xB4tr\x14\xBB.\x8F\x8E\xEC\t\x10\x98K\xF3\x90c\xE8Rp\r\x16\x0E\x89O|\x86\x04\xF4V$B"[\x8CE\x03\xEB\xB0\x94\xA2\xED\xCF&\xABK8\x1E\xE0\xBC\x81P\xA6\xC8\xF6e$\x18(\x15\x96\xAA\x0B\x97\x1Dz\x06\n^\n\x0F\x95\x11\x90\xEF\x8E\xE0!\x8Fk\xAE\xBD)N\xAB\xF0\xB40 C1\r\x81\x1CF\xD8\\(\xC7Su\xE2TyG\xCD\xEB8\xF8^\x9A\x1B\n\x05"$\xB1\x05]\xEDb\x82\xA7\x10\xFB\xC3\xB1$g"\xA24^u\xD0U\x01H\x13`Xb\xFE\xD8\xE5\xAF\xDC\xFB\xF5\xFB\xBEG.:m\x1C\xF5\xD3G!\0\xC0\xFDD\xF4\x13\xAA/\xC2\xF5\x9B\xB3\xB7\xEC\xAC\xFD\xB3Q\x87\x89P\x860u\x9F0\x13eP8\x07\0&H>\x90\x93\x8A\xE9\xBD\xC2O\xE0\xF7S \xCF\xAD\x050\xC9\x04hy\xC1\x14\x94p\xFD;\xA2b1\xEA\x17\xA8m"\xFCI\xA6\xA3\xE1\x04\xD3\xFB`\xB8`\xBB\x99\xB0NR\x95]\xC2\x9A-4\x9B\x90p1\x17\xE6\xBCSY\xB2\xCE\xC3\xEEw\xE6\xA5\xC49y\x19#\'\x88\xDB=\xAC!\xEE\xC24\x1A\xDB\xA7\xC5\xF4us\xDEDaEGt\r\x10\xD9\x18\xEA\xC8 \x91\x05W\x81\xE8\xBD\x1D-:L\xF3=#\xAD\xBC\xBA\xF0\xC7\xF9\x19\xEA\xF8{k\xAE\xEC\x98\x8D\x88\xE5\xE74\x81F\xB6@\xB3y\x90\\\x0BhR\xAD\xBB\xA6W\x11s\0\xA9\xB4\r_\xEA!\xD8\xAD\x18+\xDE{\x16|\xD1\x8B\xF2g\x03x\x93 {\x18k\x8F\xDA\xFE\xB5{\xFF\xCC\xDE\x17\xC9W\xC4\f=-\xC6i\xA5\x10\0\xE0\x81"\xFDJ\xD5\x17,\xAF;\x82?\xD8\xDA\xF8g\x8B>L,\xFCd\xB1\xCB\x89\x15\x972\xF9\xD3\xBD\x9B\xE0\x0B+J\xA3\xBA\xAA5\xE7\x9C_f\x98\x90\xC7\xD1\xDC\xAE\xB8\xE4\xD5KY\xBD\xB6\xC95\x04\xFB\xD2\xFB\'\x14\x92R\xE0\x14\xA1\x90|?\xBA\xFBE\xB8G\x05\xB6\xDD\x1BI\xA5S\x14\x1A-\xBB[|z\x19\xF4\x80jX\xD3\xBBD\xF6\x81\x9E\x85\xB8\xE2\x19\x01_,\xD6n7\n|\xF8l@\\6\x9F\x97\x02\x18]pjHe>\xBD\xDD?\x8B\x9CF ,wM\xE3\xC5\xA3.\x9Fu \x84\xD1X\x9A\xC5\x93\xA2\x07\xE6\xF7\xDD\xF8\x1DX\x81\xE9\xD6\x9A\x9EB=n}\x7F\xF1\xDE40\x1C\xE2\x0E\xE9\xB1\x9AR\x89\xCAN\xBF\xF6\xDE\xF9\x9D\x8D\x0EWr>UZ\x17,gK\xCC\x1E{\xF4\xD7\xBE\xEAU\xFB^ _\x93\x1C\xD0\xD3e\x9Cv\n\x01\0.\x11\x19\xFFJ\xF5\x9F\xCF\xAE9\xB2|\xEB\xD1\x8D\x17,\x1C\x9C\x9B\xF4\x9E+\x13(x\x0B\x8A\xA8E\x88\x859B\xD0r\xFF*\xA0\f=\x18&\x103\xE0[\xD4\x95s\xC5Lu+\x1C` \x90@ \x05\xCEc\xD5\x89\xF5\xE7D\x9Bx\f\x88I\x18\x1Dr\x14e\xD5\xE8\xB4fp\xD0\xB3wk\xFB\xCD%\xCB\x88\x92s\x9DG\xA6\x1C\x87\x91\x16\xDA\xCEC\xF6\x1D\xA0\x8E5H\xC6\xD8\x8APR\xB4\x88\0\xA2\x9E\xBFAc\x01Y*h+k\xEE\xFE\x7Fs\x95\x15F)\x1E;\x82\x81G\xEC\xC6\x18zL\xED\x9A\x8E`\x980*\xCA3\xF6\xFB\x06\x9FM\xE8\xE8t\xC3Kz\x11\xC0D\xA0\xB9\x9Dm\xA6\xA9$\xCB\\!+\x96\xFBV\x12\\cM\f\x10\rZ9\x87\xD8\x99\xB9\xBB\xC2\x93\xF2n#3\x05\x80\xAB86X\xEB4\x9Dob\xFE\x98\x9D_\xB9\xE4g\xF6\xBD\xE8tT\x06\xC0i\xAA\x10\0\xE0\xC1"\xFDj\xD5\xEF\xDA\xF5\x85\xC3G\xDErd\xFD%Gd\x0E\0\xC1\xAD\x9FZQ\xBE\xC8\xACy\x0F\xA1\fSC\xF4\x1C9\xE1\xA0E ]1\x84\xA0\xA2\b\t\xD2}t7\x1E\xC0D\x90\xA3n\x81\xD7\xE4\xE7\xB1\xD3\x88#\xD3\xF99S\x92\xAB\x93{r^*\xBB:\xD1\xFD~\xF9=\xBB\x15-YX\x13}(\xAD\xE0i\x8Cs\xE5\xBD\x18*\xEF\xE7Z\xDA\xBD\xF7\xA2\x18\xE0\x1EB\\\x87c\x17\xBC\x84\xC8\x0E\x80:\xC3\x1A\xAA\xF0\xB6\'\xE9XI\xAF\xAB\xC3\x94V,\xD9\xA3EX\x91\xF7\x1Cy\x7F R\x85\xA3k\x03k\xA3.q\x1Ef\x0EB\xA1\xF8>ld\xCA\xFD\xADn\x81\xCA\x9F\x82n7\xC0\xBA\x02\x8A\xB2({*d\xD1\x14i\xDCCxY\x1A\xA1\x0F\xFB)\x88\xDA\xC9D\xE9=\xD9\x9DvU\xB4\xD9\x0Ef\x8F\xDFy\xF5%\xBF\xB4\xEF{\xE4!\xA7W\x98P\xC7i\xAB\x10\0\xE0^"z\x93\xEA\xBF\x99}a<\xF8\xDB\x07\x17\xFF\xF1\x16\x99E\xE3O\0\x13W\xDE\xF4mZh s\xEA=P}M\xABW\'\xAD\xBA\0(\xAB\x19\x01\x86\x06\xD5\x9B\xE0\x04\xA5`\xAE\xB6U\xCB\xF0\xA5\xDC\x043\x1B]b\xD2\xF3\xDCU\x19To$Zz\xD5T\xA5\x0B\xF3\x04XuA\xD9!\xFB\xD0\xD3}v\x1C\x89u\x10\x9B\xDF\b\xC9G\xA3zO\x88\xD5\xF5\x19\xE2Z\x10a\x06\xE3o\xED\x02\x11\x8D\x9A\x06>n"\xFBl\xB5\x1E\x82\xC1\xEF\xB9m}vq\xDF\xE6UPY\x11w\xA0+\xCFc\xD9\xBB%(g\x99\x10\b\xA2U\xBA\x96sq\xDB\xC6k.\xF3\x84\xCF\x87\xE7\'\x8E\xA0\xE5\xBC\n\x03!\xC7\x9E\xA9\xC4j \xB8O\x9C\xCB\x81\xCC\x16\xD7\x9F|\x0B^\x94\xACw\fO<\xF4\xA3\x0F\xFA\x8D\xF3^!\x17\x9E>\0\xE2\xF1\xC6i\xAD\x10\0\xE0\x80\xCD\xB8W<\xEF\xBA\x9Box\xDBM\x1B?\xF7%]o\x14\xF0\x9CX\xEAVS\xFF\xF5_]\0\0\x17\xF9IDAT\xF2\xED\xBAPL\xB6\xC3\xCA\xFF\xEB$r!\xAD-\xD4\xE8Y(_.\xB2\xECZ\'B\x94\x05F5\xAC\b\xF7\x9F\x16\x8F\x13k%\xF4\x99\xAC\x05A\x0B\xAF\x1A\x93p\x12\xC6\x14e@\x80t\xA9\xB6X,\xAD\xF9\x1ASe\xBE\xAD5\x01\x15\xB4\x91\xF8@GG\x0BO\xC0\xD6\x82t\x8B\xD7\xBD\xA0\xCC\x19\x7Fl_\xAE\xDD\xB2\t|<K8\xF1\x86R\xEE\xD8\x81\t\xB1\x86pwL=\x05*\xE5P\xE4R\x14\x9D\x1F\x8A\xAF\x83\\\x83\xAEi\xBD\xB5\xD3\x13\xB0\xFBi\xE5\x12\x82e\xE8!\xD5*]\x19\xAE\b\t\xC4\xF6\xE3.\x8Ab\xBD\x17\xD9\x1Eo\xA6\xC8\x0ERT\xA2H\xEF\x84J\x84\xAB\x8A\fPp\xE1AQ@\xF6l\xF6\x8D\xAF\xDD\xFC\x9E\x87\xBF\xED\xFC\xD7\xE0\xC2\xBFs\xBA\xDF\xE1\xE3\xF4VW+\xE3\xE5Wo^\xF6\xEB7\xEB\xEB??\xAEo\x90\x87\xC0:\xFE\x10p\xC6\x84@\x96\'\xBB\xB0\x05\x9E\x10\x02\xCA\x9C\xB8\x1FC*\xE2_\x8E\x0B\xA40\xAAZ&\xA1\xA3\x9C\x13)\xA8\xDCF\x8B\xDB]\xB6\xD58\xAE\xFA$N\xA5\xC1\xB5\b\0\xBF\xDE\xBA\xBCx\xD9_\xD8~<\xBC\n\x8Bk\xD7\xBAb\xAD\x1B\x8B1\xDA\xB3w`>&+p\bwW0_$\xF9\x86\xCC\xCA\xB6D(\x06\x02\x92\xCD;\x8C\n\x043\xB6\xF9\x12o\r\x8FB\xF2Q\xEF\xB9\b\xF6D\xD0d\x1F\x164?[\xB2#Rs\x14\xB2\fG$HIl\x04c\xC0\xA0\xC4\x020\xB6\xF2R\x92\x94jk4R\x87\xE9\xF2\xB3\f;\xFB$:\x89\xABg\xF8G\xA5\xD4\x1C\x97\x99\xB0\x1By\xAC\xCEtd\x92\xA6\x82<\xC5s\xB9\xF2k\xFB\x8El\x9D}\xE9\x91\x7F\xFA\xF07_x\x87\xD2\x91Od\xDC\xA9\x14\x02\0\xBC\xFC\xDACOz\xF3\r\xED\xB7?\xB5\xD88\xA0*e\xE9+Mp/\xC8A\x9A\x9E\x82\xBFD\x19i\xC9\xB5\xE0\x05\x8E\x0BHZy\x89NCi\xD9\x05fU\xA8\\\b\x0B\xA5\xAB?U"\x93~\x02.\xE8:\xF2$\x98(\rZ\xE1\xC0;|RO\xC3\x04E\xAC\x10\f\xB7\xE6\xB1\xF8l\xAE\xDD\xB0\xE1\na\xD6\x81\x8D\xA2\f\xB8\x04\x1C\\1\xCC\x96\xC5\xAA2L\xF0&+V<\xC5\xCF\xF8l\x053\xB8K,y>*\x84\x01N\xA1\xF6YE\x81d5#k!\x06\x99\njU\b\xF3\x9E\x7F\xF3\xF3`\'\x82M]\xCD\x06\xAF\x95\xDE\x0EA\x9D\xEE^c\x11J$\xEF\x8F\xD4kT\x85@\xD4\xB3\xF3<\xA9$\xEB\xB2r\xF0k\xE5\xB3\f\x05\x81\fw\xE2Z\x05\x18/<t\xD3\xDE\xA7\xF6o}\xF4\xAF\x9Ds;tB<u\xE3N\xA7\x10\0\xE0g\x0Fn\xDD\xFFM\x9F[\xBE\xF5\xC3G6.Y(\xEB\x1F\xB2\xA6\x9Fn\\6(Y\x89\x05\xB5\x14\'\x15R\x8E\xB9\xB9\xDE\xD8c\xC5\xBB\b`\xB1\xA7\'\xC0\xC5U4\x94L9\x17\xBD\x82\x91\x15\x85\0S\xA3\0\xF7\x97\xB2~\xC4T\xA1d\xE7\xE9\x9C\xA0\xDA\x11\x8D\f\xED\xBC\\\xECEC\xF14\0\xBB\x9C\xBD8/\xB5\x0E\f\t\xB8V\xE1\xAC\x1B\xA5\x99\xDC~\x02am\xF4\x02\xA8\xD2pE\xDCCh\x10/^\xCA8\x99\x1E\x02=\x83\x99c\r& \x12kLL\xFE\x8F$\x185)\x82\xDF\xFF&\x85\xA0Q<%\xB0f$\x02\x07\x1F{\xCF\x85Z:=\x05\x0B\x1F\xAB\x05\xE7\xFD\xC7\xFD\xC2\0J6X\x81j\xD4\x81\xE4\xFA\f\x14|\x8D9c\xCA\xAF\x15E5U\b\x02\xC5p\xF1\x91+/x\x86<\xE3\xC1\xAF9\xFB\x0E\xABZ\xBC\xB5\xE3N\xA9\x10\0\xE0\x7F\x1E\xD5\xFD\xBF\xFC\x99\xAD7\xBD\xF3\xE0\xF0\x8D\x0B\x1D\x8C_\0)18B\xD0B@\x81@\xC4\xA8\x104\x8A\xA3\x14\x88\x14\xD2\xB4\xDB\xD2$\xCC\x88\x10\xC0YkhSP\x90\xC5R\xBE\x9Dj\x0F\x82O\xC6\xAA\xD9\xDC\x94\xEEzz\x19\x92\xD7Lo\xA5x\x10R\x94\x18F6YEx:\x02`\xBD[\xCD\xC3Z\x07\xE6]\xAC\xB7"h\x15]\xE8\x8B\x17@!\x81\xFF\x7F\xE8~,\xB6v\x1B\xCD\x8D\xB6\xB6h^; \xC5\xA2\x02\x98Ac}o\x13Pq\xE1e\x1D\x83F\xABv\xB6M\x9B\x15\xE1\x9Fx\bj!\xC9P>\x1FT\xDDKH\xEBl!G\x9B\xB4Q\xA7\x07\x93L\xC3\xA9\xE0\xD6\xB6h\xACFl\xE59\xB3\xFE"i\xCC\xA6\x10"\xE4\0\\\x1D kF,\x7F\x82&K\xAC=\xEC\xC8;\x1E\xF8\x9D\xEB\xCF\xBE\xE8\xDF\xEE\xBEC\xFA\x19\x9C\xEC\xB8\xD3*\x04\0\xF8\xA0\xEA\xF0\x93\x9F\xD9\xFA\xE9\xB7]/\xDF{x\xB1\x06@&\xD6VV\x84+R\x88.\xD0\x93\xBC\xB1\x0B\xAA\x05\xF2\xE4\x17\x14\xB0/\x14\nR\0\xA9H\nEZ\x99\xFB\xEA\x05\x1FP\xB2#\xBDwB\xD7\x89\x92\xA9\xFC\xF9\xD5\xAEM\x01,v\x05z\x07\xD7\x97Hfa\xD6\xE5\xF3x\xB3nK\xBB\xCD}\x82ot\n\x0F\xAD\xAA\xF5\x10\x14\x05\xDAR}\xCD\x066\xF5\x90P\b\xF5Y\x0EK\xB3\xFE\x112\xC0\xAB\x14Qp\x04\n\x9C\xA4`\xB1z\xB1\xA9\xC6\xDA\x0E\xEC\x930\x1F33\xC1T\xE4\xDC\x15j\x93\x04\xFF\xA2h\x8Ba_Q$3L\xDDx*\x11\n+\xF7\x9F\x14\x1F\xD5\xFFs\xBB\xA2d&\xE9\xCC\xAE\xA1\x042{P\xCF\xE5+J\xED\xDA\xC6\xFE\xAF9\xFC\xAA\'\xFE\xE4y/\x93\xC7\xDF\xFE\x9D\x8EN\xD5\xB8S+\x04\x8E\x97|\xF6\xD0s\xDE\xFA\x85\xD9/\x7Ff{\xFD,\xA2\xDA\x13\xE6\x1B\x95\x000\t\x19\xA2G>\x15\x87\x7F\x1Fi\xB0\xA8<DZ\xF7\x1A\x1E\xF0<\xDC/\xBC\x87\xE2\xF2W\x90\x10\x05/\xF0N\xC7\xF6]6x\t\xE5\xC5\xE3D\xC1\x13\xCF\'\xA9\x94\xE850\xB5\x19\xF8\x83\t\xF7Z7\xA5\x90\xEBCf\'\xA0\xA1x\x033\xF6Sw\xAF\x83\xDFE\xC8\xE3\n\xA3)0\x0F\x0F\xC1\x9B\x8DR\xF8\x1D\x17\x98\x8F\xA6\x10R\x19\xF0\xEF\xEE\xDEE\xBA\xF2\xF3\xDE\xAD\xC3\x12\x12p\x9Cw@\x1D\x94\x9C\x05\xDF\xC3Vz\xE6~\x83\x16.\x83\xDF\x17y"\x14~\xAE\xE3\0\xAC(\x04\xCD{\x89\x9E\tE\x99\xB0d\xD9\xC2FSb\0\x95\x96\x1F\xB3\xA7\xA7\xD2\xDA\x12\xB3\xFD[G.x\xF2\xF6w=\xF6\x7F\x9C\x7F\xBBuG\xBE\xAD\xC6]B!\0\xC0\xCF}q\xEBa\xAF\xFF\xD4x\xF9\x87\x8F\xCC\x1F\xA4:\x9F\xBA\xEF\xA3N\xAC\xBDW\n\x98\xD0BV\xB2\x11\x1A\x827\x11N*\x14\x12\x8E\xFC\'\x94Fx%\bkO\f \x04\x0B\0\x17x\xE5JI\x93\xC2"*\x84\x10\xF8\f%\xC2\x0BXN;N\x13\xDC4\xAF\xA7\x9Brq/\xA7u\xC1\xC6\x98\x8A\x81V\x96\x15\x8D\xCD=\x89!\xC2(S&\xC3h)=fHH\xB42\xCC@"S\x10\x99\x04\xCD\x86)\xD9\xA2}U! \x9A\x9Ed\xF6@#\x86\xE763\xCF16\xD5\xE8\x93`\xF8\x82\xE4\xF1\xAA\x10\xC3\xDB\xA5\xA3X|5\xEF\xAC\x82\x82\x15\xA7\b\x85\x80T\n$/\xF1\xFA\xBB+\x0E\xB6\x95\x17\x98\xA2\xE3\xFB!\xC8\xB9v\xFF\x83W\xDC\xF7i\xF3\xCB\x1E\xFA\xEA=\x7FyJ&\xF2\x1D<\xEE2\n\x01\0\xFE\xF7B\xCF\xFE\xD9\x8F\x1D\xFA\x85w\xDD\xB4\xF1\x1D\xB7\xF4\x19\x02\xC4\x1B\x11\x84&3\xCA\xDE!\xA9\x03\x82\x96\x8C\xC6b\xE1\x83W\x80"p\xC4\x05P0\n\n\xAB\x0Bo\x86\tU\x19\xF8\x0E\xC5s@\xF7\xB5!\xA5M\x04\x9CJ,\xD6i\xA7\x07SHJ5L\x88\xA2\x9E^\xF7\xF1\xFDF`\xCDC\x87y7\xEB\xCD\xCC@\b\x14ADNtv\xFC\xF1g&.\x18\xFC{\x86bM\x91B^\xB3\r\x12\x16\x1E\xC7\x82\x89U8\x91x\x02\xE3yz\x1B\x83+-\xEE\xDF\xCAv\x91*\xD5\xF4*\x80\xA2\x10x\x1E\x7F\x16\x91\xEA<\xC6C \0Y\x15\t\x1C\\Ne\xC4\xB0\x88^\x01T\xD1\xD6vp\xEEW\x1F}\xE3W\xBFt\xFF\x8B\x0F|\xFB\xED\xB3\x88\xCA\xED1\xEER\n\x81\xE3\xA5\x9F<\xFA\x9Do\xF9<^\xF3\xFF\xB67\xCE\xA6\x15\xAF\xBD\x01\xD2\xB5\xB6\xEDW\xDBj\xC7\xDFE\xA0\x93c\xE0\x0F\x8D\x9E\x02)\xC7E\xA1P\x91T\x97~\x8A\x17\xF8u\x8C@\xE0\x1E\xFD\xD8\xF3S\thm\x1D?vpm\x888\xD7\x88HY\x92\x12\r\xCF>\xC8h\xAE73\x0E\xF3\x9Em\xC0\x18O\xCF\x96\x9Aq\xF4\xD2-\xF1X\x04\x8A<\x04ZL5\xF7\x99\xD8\xC1\f+\xDE\0hm\xD5+\xFC\x9C\x0BQ\x05\xDB\xEE|B\x83\xE6o\n\xFD\x04\x13@\xF9\xBF&\x1F\xC1\xC2\x03{\xDC5\x14 \xEE\xC0\x90\xAEr\x1F\b$\x9A"\xC8\f\xCB\xF1\xD2\x88@*\xB2A\x15\xDA:\xDA\xB9\x9B\x87\xEF\xF1\xA4\xED\xEF~\xF2\xFF<\xEF\xBF\x9D\xE4T=\xED\xC6]R!\0\xC0/_\xB7|\xC0\xAF\xFF\xF5\xD6\x1B\xDE}\xE3\xDA\x13F\x9D\x85\xB55,\xC1-\xA9\xF3\x0F\x92\xFC\xA3\x89\'\xACX\xF8\x8A\x1B\xD4\xB4bd\b\x82;\x90\xDB\x8A+\x92\x001\x91\x8A\x89\x1EB\xACVCE\x80<N*\x1D*\n\x8D\xEB\xE65t\x0F-\xB2\x83S+\xDC\x07\xC3*\xB8(\xEC\x9AZ\x1F\xC6A\x0B\xB8\xE6\x18BcX0\xA6\xB2`\x11\x0FF\xCD\xAEKZ\xC3\x02c\xE6\xB1=Z\b\x0E3\x10\xDD\xB1\x05\x98[\x9F\x19\b\xEE\x9F\x96:\x17l\xF1\x15\xA9\\\xA9\xD6~\x8B\xE1! \x15\x02\xF1\x10\x85\tw\xAC\xD0\xA4\xC0|\x94\x88\xF7\x1B\xD2\x13\x10\xCD>\x05\xD5[R\x92\xAE\x90\xA1\x03x\xCD\0\x1A\xB6\xB0\xEBA\xB7\xBC\xF7\x01\xDF6<\xEF\x11?z\xDEm\xBA\n\xF3\x1D5\xEE\xB2\n\x01\0nP\x9D}\xDF\xC7\x0F\xFF\xC0;\xAEn\xFF\xE1\xBA\xCD\xB59tf2\xE7\x02\xCE\xBC\xBE\x1CO\xA0};\xA0\x84\t\x9E^\xA40\x06\xBF\xA0\xB8\xAC\xBD\x97\xE3\xAD\n4\xA6\x1E@\xBA\xFAT2=\xF0\x87)x\xA8\x01v\xC2\xBD\x8A\0,\xA9\f\bL\xB2\xD6\xA3S!e\x0F\xC59\x14\xEBKKCJ\x97X1\x9A\xB8\x82t\xB16jc\n\xB4:S\x91\xD7\xCD\\\xBD\x88uIb\xCFDZ\xFF\x9AV\xAC`\xE3\xCC\xD3\x96)\\\xCE\x8B\x80L\x04\x1E\xF0%\xEBz\x11H\xCD\x98\x7F\xE8\x92<\x06\xF7\xA8"\xE4P\xA3`\xDBwb\x85P\xBA\x12\xA6(\x8F\xB9\x12&(\0\x99z"\xD6\xEE\f\x10\x8C\x98\xED\xDBY\xEC\x7F\xC2\xD1W>\xFDG\x0E\xFC\xB8<N\x96\'=9O\xD3q\x97V\b\x1C?\xF5\xD9\xA3\x8Fz\xCBU\xFD\xBF~\xE0\xC6\xB5G\xF6>\xCF\xEE\xC8$\xF90\xD5\x17\xC2\xAA\xA8\x8B\xAE\xAC2\x11\x89\x01\xD4\xDC\xFF\x94\x15\xA9\xA1\x10Hf\x8A,Fa\xD7\x99\x05\xF7\xCF\x95\x1C\xFA\xE45\xD0\xC3\xA0\xF5\'M\xB9\x86\x14\xE4!\x18\x960\xCD@\xACfI\x86n\na\xDE\xE9\x19 \x80\xB6\x16\xD4e\t\xE5\x10k\x1BF\x16B-\x95)m\x82\x11Tl\x80L\xC4\xCAQ\xE0\xB6\xC1+\xA8\xFB\0\x13\xAB\xCE\xEF\xAAg@\x16"\x15B+\xE7k\xFE\x1E\xB2\x83sV\x1E\x92;0\xA10k\x9EG\xFC\xB8\x11>\x94\x85g\x07\xD8\x1F3Yb\xEF\x03\xB6>|\xCF\xA7.\x9F\xFF\xA4\x9F?\xF7C\xA7|r\x9Ef\xE3n\xA1\x10\0\xE0}\xAA\xF3\xD7\xFE\xF9\xC1\xEF\xFF\x93k\xD7\x7F\xF0\xAA\xA3\xEB\xEBY\x9C$S\x8F \\w\x14\xC1C\xC4\xE9\xAB}\x15\x01W\x14\x10T\xA6a\x05"Y\xE84\xE14\x14A\x95n=\x04\xC2\xD2\x17\xA1\xD61\xAB\x14\xB9\xEC\\\x1E\x87\xA9KR\x98\xCB=\xB8\xD0O\xC0\xCF\xAE\x98\x8F&\xE8\xA46\x1BkQ\xA39h[z7\x83n\xEB@\x06\x0E\xE2\xCAf\xEE\xAE\xBF\xC8T!DCUMjr\x82\x8A\x96Q \xA5\x98.9=\x89\xB9[gvB\xAA\x1EF\xC4\xF5<NG\xF4P\x18\x14Q\xEE=\xF8s\x9C\0\x91\xFE\xFEV\xBD\x81\xBA\x9E$\x90\x8A\x878\x03`D\xAE\xE1\xC0\xC1\xED{>Z\x7F\xEC\xE9?p\xEEO\x0E\x7FO\x16\'5\x01\xEF$\xE3n\xA3\x108~\xED\xBA#\x0Fz\xFD\xC7\x17\xBF\xF0\xDE\xEBw]\xBA=\xCE0\xF6\x16a\xC4\xB4W\x02\x02\xB4\xE3:\x82(\x82\x01wc\xED\xCF\xA9e\x060\xC9XT\x1E\xC3jQT4Q\xED\xA4!\x97\x10\xC3\xBD\t\xBA\xB9q-%L\x806\xAF\xE7\xC8\xFDB\xD9uW"]\x81nB>\x90{\xD0\xD3\n\xCF:0\x8C\x9EI\xA0@\x8DV\xEB\x10)Wz\b\xA3\x1CCH2k\xEF\x99\x05\xCB\xDB\x80]\x99i\xA5\xC5\xD3\x88\x03$)\xCB\x98\xA6\xFA\x02\xF4\xC3\xB1\xC0b\xF3d\xB1-\x02+\xA1\x1C\xE8m\xCDz\x12\x99\xC0\xEBQ@\xA4\xB6s/\xFC\x03\x14O\x01E\xB9\xA9B\xE6Gq\xEEC\x97\xEF\xBA\xE4i\xFD\xC5\x8F\xF9\xF1s\xAF8\x15\xF3\xEE\xCE2\xEEv\n\x01\0\xBE\xA8*?\xF1\xB1#\xCF\xFB\x83\xBFn?\xFD\xF1\x9B\xD7.\xEC:\x84\x90O*\x1C\xDD\n\x9B[_\xC0>n\xAB@\x10\xA1h\x991\r\x07"\x9E\xD7\x12>\x84\x87a\x8Af\xB5\xA4\x9A\xCDM\'\xA5\xB9\xA0\xC7\xD1#$\x91\xDE&\xDEDz\x02\xC80#>\x97\b#\b\xC4\xCD\xC7$\xE3\xCC\xD8\x15i\x04\0\x9D(\x04*\x1Cx\x18\x11\x85L\xA8\x1EBw\x901\x89C\x95\xAF\0\xFF\x9Bt\xE5\x8A\x03$\xBBP\xA7t\xE5n\xDD\xA1b\x89w0\xF4(\xACAw\xEF\xE8\xF5\xA4\x90\'\xEE@B\x91\xF8\xB5\x05\xB7\x01\xF6\x0E\x1B\x18\xE6t\xEC\xBE\xF7\xE6u_\xF1\xB5\xCB\x97=\xFD\xD5\xE7\xBCA\xCE\xE7Y\xEF>\xE3n\xA9\x108\xFEd[\xF7\xFD\xE2\x07\x0E\xFF\xD0\xBB>/\xFF\xFA\xBA\xC3\xBB\xE7Q\xD3O\xCB\xCAJ\xCAb\xE9\x05\xC8\xAC\0$\x1B\x88v+t\x8A\xB4\xA2\x0Ba\xE57\xB0Y)\xAD\xADhK\xA0\x90\xFB\x8C+a\t*\x86\xD1\xCB\xB1\xE4\xB8\xC0c\xD0\xB5\xEB\x825\x04\x05\xA9\xA4\\A\x91\x97\xC0\xD4]\xEB\xC0\xB0T\xA0[\xFD\xC5|l\x19~\xF85\xB6\x9E\xA1A-}\x1E\\\0\t0r\xC5\xA6Y\xB0\n\xCDk\x98\xBB\xCB\x1Fk5(\xA6\x98\x80\xD7\x944X\x9AT\\\xF1\xD6\xE5\xE4#EI\x0F\x04\xCC\x9A\xE8\xE4\xFC\xC2\xCC\x0E\x8F/\x80h\x0B\xCA\xB1\xA83%\xA5cc\xFF\xF6\xE2\x1E\x0F\xDF~\xED\xD7\xBFp\xDF\x0F\xDF\xFB\xB9\xB3\x83\xA7|\xB2\xDDI\xC6\xDDZ!p\xBC\xF6\xFA\xEDK~\xEFC;?\xF3\x9Ekf\xCF8\xB2\xB3\xEE\x0B\x82f\x9DCm\'\xC6N\xC9\xC7\xC4\xF3>q3\xAD\x88\xE47L\xC2\x07\xAE\x07\xE9\xDD\x97+n\xA1\xF0\x96f\xE9Q\0\b,\xC1x\x06\r\xAC\xC1\x98tm\xA6w\xC0\x9E\x92\xA5\xACz\xEAAx\x1B\xB1\xD1\xAC*\x19\x8B\\\xE8\xA5-5\x84kXz\xB1\xD7\x98@j\xAC\f%iy#\xDD\b\xB7\xF2\xC5\xA5O\x0F\xC1\xDA\xA4\x93Dd\xC0\xA1\x06\x907\x14\x85@\xAB\x1E\x85N\xC8\xF0\x81J \x84\\\xA7\xDBP\xB9\xF9z\xCF\xB1\xDA\x93(\n\xA5ZC\xF1\f\xBB\x0E\xE3\xA2\x87\xE2\xAD_\xFD\x8C\xE1\xA5\x8F}\xC5YW\x9E\xD2\x89u\'\x1Cg\x14B\x19?\xF1\xC9\xA3\xDF\xF0\xFBW\xF4\x9F\xFA\xE0\xD5\xF3\xC7m\xF6\x19b\xE5\xA4\x11`S\x93\0\xFD\\\x80k\xA7\xE4\f\x0F\xB2%x\x84\x0F\x91\x95(\xE1\0\xBB\x13\x91\xBE\\\xB3\x18\xA1h\xE0a\x02\xCF;\xF5X\xD8\xBA\xD8\xCE\xA9%\x9C\xE01\xBB\x0B\xB4/Q\xC7\xE6.%Dh=\xB3\0\xACoh]\xD1\x96\x12\xCA\x8C\x95\x8F\x8D\n\xC1\xC3\x03"\xF2\x0348\x04\x04\xFD,#\x91\x02[C\x86Ua\xAE\xDF\xD1k \x1FaU!\x84W\x01\x842\xA1sOO`\x82K\xF0oq\x8C\0\0f[\xB8\xF0\x81[\xEF\xBF\xFFS\xF1\xF2o|\xD5\xB9\xFF\xEB6\x9ARw\xBAqF!\xAC\x8Ck\x16*\xBF\xF0\x97\x9B\xFF\xE8\xED\x9F\xDA\xFE\xE1\x8F\\\xBB\xEB!\xDB}\xEE\x02\xECe\xD2\x85\xB5\x18\xAE?\0\xAE\t\xD9\xBADCNV\xDB\x05\x93\x10\xE9Ap)\xF6\x9A\x05\xA8\xA0\xA3N\x94H*\x99)\x93q\x1A\x02\xC0\xC3\x04\x92\x89\xA8p\xF2s\x01\nP\xA8T\b\x9AJ\x80$&\x19\x93\xE5\x88\x0EH,\xEBV\xD2\x88@\x10\x91\x06e\x97$\t\x81\x1C:\xA2\xDF\x01\xBA\x85\x10s\x95\xE8\xC6\x1E\x0B\xBA\x02\x98\xABN\xAD=Jz\xB1\xF3\xF8\x12a\x14\x0B\xAB*\xC7@\x80Ia\x15y\x10\xE6U\x18(9\xC76\x0E<x\xE7\xE3\xF7y\xE2\xF8C\xFF\xF0\xA7\xF7\xFF\x0F\xD9\x7F\xF7\xC3\t\xFE\xB6qF!\xFC\r\xE3\xF3\xAA\xC3\xAB>p\xCB\xB3\xDF\xF3\xA9\xF6\x1F>t\xED\xECA;}\x1D\xD10\x95`!\xA6 \xA1\x96\xDF\xABl\xC6\xE43\xACd$\xA8\x1C\x8E\xF1\ntE\xF10l\xD1\xF8;\xEB+\xE8\x150\x84\xD0\xC0\x13t\xB5\xD4ztO\xC3\x15\x12\xAF\xDFV\x86\xF6\x85Y\xF9\xDD\x98+\x18K\xC1!fj\xEC\xC4\x106a\x83\x14Zo\xEF\x9D\x10\x02\xC9\xE6"\xCE\x81\xF0g\xCC0\x03\x92\x8D\\(\xD8\x95\xC7P3\x0E\x99\x86,m\xDA\x14\x96fDvs\x8A\xF0\x81\ni\xD8\xC4E\x97l^\xF1\x95\x8F\xD7W~\xDB\x0F\x1Ex\x93|\xD5\x9D\xB7D\xF9\xB6\x1Cg\x14\xC2\xDF1nP\x1D~\xE6\xCF\x0F}\xFB\xFF\xFE\x84\xFE\xFB\xBF\xB8z\xE3\x91[\xE3\x1C\xD1\x99\xB9g#US\x04:\xC1\x10\b\x88u-K\xA6\x05\rZ\x0B~0\r\x13&MO"\xA5Y\xD6J(\xE7\xAAaB\x0B\x0ECn\x1B\xDC\x88\xDE}?\xC9\xDA\x0E*\x95\xD1\xB6\x1F\xBA@F5\xD7\xDD\x8B\x9B\x06 J\xA0\xA1@s%1\xD7\xE4#\b\x8C\x16m\x96=-t\xF6IP\xF7\b$\xB0\x8A\xE0\0\xF8\xCF\xBC\n\xBB \x17\x8E\x91\xA2\x10\x90^\x85\xBAWR\xB9\x0E\x02\t\x16\xA5\xA5\x1C;\xE6\xF3M\x9C\xF3\xA0\xC5\x87\xEF\xF7\x84\x9D\x9F\xF8\'?v\xC1o\xC9yg\x14\xC1\xDF6\xCE(\x84/s\xDC\xA4*\xBF\xF8\x91[\xBE\xE9\x8F>\x8E\xEF\xFB\xF0\xE7\xE7\xDFpp{\xCD\xAC\xEF8K\x10\xB0\x02\x89,o\x06\x9CX$\xD30A1\xE5\x19\xD0\xC3\x88B\xA5\xC2\x94t\xA1]]T%HC\x05\x1F\b2\x93V\xA6c\xCF~\x10\xA3D\xE5\'\x97\x88\xAB\xEBA\xA2K\xB4P\x93\xDEm\xF9s\xE7h\x88Z(1\xC0:1\x91\xC8\x13\x1E\x82\x0B4-4\x97\x8D\xE7\x8A\xCA\x86\x13h\bpM\x1F2Kaq\xBEd\xFA\x91\xC7*\n#AE-\xD8\x80g\x19\0\xB4\x06\xCCv\x1F\xC2=/\xD9\xFE_\x0F\xFFz\xFC\xE7g\xBE\xEC\x82?\x90\x8B\xCE\x84\x06_\xCE8\xA3\x10n\xC5x\xDD\xA7\xB7\x1Eu\xF9\xFB\x0F\xBF\xE4\x93\xD7\xAC=\xFBs7\xED\xDE\x18\xD1\f\xD5\x1E%\x80H\x96CG\xDD\xC3\x98\x169\x81\xC8\x9A\xA5pE\x10\xDC\x85Z\xE1X>\xAF\xA0\xA2f/\xC5\0\x1DGWD\xDD\x81E\xED\b\xA6%$\xAE#\x88OU\xC1x3\x16\xE9ITj\xDEg1\x14\xD1h\x85E\xF3\x1A\xA3\xA3T<V\xAB\x0ED\x01\xD3\xE0\x84%\xF6<\x9C\xD4\x17\xC0B\0\xB3\xFE2\xA15\x1B&P\x8B\xA0\xA4(\tE\x93\x0E\xA0y\xB8\xD0\xB1\xFF\x82\xA3[\xE7\xDDw\xE7MO|\xD6\xAEW\xFF\xFD\x97\xEF\xBE\xCBS\x8DO\xF58\xA3\x10Nb\xBC\xE7\x90\x9E\xFF\xBA?\xBD\xE5\x9F\xFF\xE5\xD5x\xD1\xC7>7\xBB\xDF\xD6\xF6\x06 \xCD\x90} \x847]t\xF5\xEAD\x84\x070\xA9U`\x16\xC1\x853j&jj\xD2\xC1\xCB\xBA\xD2S\xE0\x02+!\x87Q\x97uJ`\xA2\x97r\x1C\x85@\x9C@\xC7\xEE]\x93\xDA\x04?\x10\x05\xDA\xC8\xB6\xE7\x12\x1D\x96\xA3\x7F\x01d\n\xE4)\xD0\x9A\x96\xBE\x8A\x12\xD6~V\x94\x070\r5\xC87\b<\0\xEC\xA7\xE8\xCA\xC23\x17\xB3\x0EH\x1B1\f\x0B\xDC\xE3\x92\xFE\xE9\x0B\xEEw\xE4u\xDF\xFC\xC2\xF3\x7F\xF5\xC1\xCFl7\xDC>3\xE0\xAE7\xCE(\x84S0nPm\xBF\xFA\xC1\xAD\xA7\xFC\xD1G7_p\xE5\xB5\xC3\xB3\xAE\xBEq\xD7F\x979d\xEC\xD0\x9E\xE5\xC8\xE6\x01$m6\0H\xEF\xF8\xB3\xDA\x82\xAD\x15\xC1\r\x8F\xA2\x84\t\x13\x9EAaE\xB2{R\x1B\xC5\xD6.\xEC\x19&P\xC0\'@\xA8\xEF\x9B\n\xC1\x0B\x9DF\xC9\xBF\xBB@tD\x1B\xCD\xE1\xB7\xB4\xA2U;\x1A\x01)\x05\xBAIV5\x0E\xA2\x91%\xA8\xB5\fMR\xA1\x10,\x94\xA6%4(U\x8D\0\x04=k%\x9Ab\xAE#\xF6\xDEck\xEB\xC2\x8B\xFB[\x1E\xF1u\xF2+\x97}\xEF\xBE?\x96{\xB0\xA6\xF4\xCC\xB8\xB5\xE3\x8CB8\xC5\xE3\xA3\xDB\xBA\xFFu\xEF8\xF4\x8F?x\xD5\xF8\x1D\x9F\xB9v\xF6u_\xB8e]0\x0E%\xBB\xE0\x8F\xFC\x18\x001]y\xF5X=\x0B\xA4\xDC\x9B\0\x80\xB1\xB4U\xEB2\xB5\xF8\x9E\x81`wf\xE9\r\xDD\xB9\x13Qe\xE9\x05KUy\xC4Z\x15\xA3\xA5!\x89u\x84\x97\xC2f)\xDD\xBEg\xE5!\x15B\x83Z\xB3S\x86\x02\x92\xC2L\x9As\xE5\x05\x10+`\xB6\x02\xD2]\t\xB4l\xAC\x8A\xC4 \xC4=\x84&\x82=\xFB\x8E\xE8=\xBEj\xFC?\xF7{X{\xE37}\xE7\xDE\xFF\xFE\xC0K\xE5N\xD9\xDD\xF8t\x1Dg\x14\xC2m8\xDEv\x93^|\xF9;o\xBC\xEC\x13\x9F\xDB}\xD9g\xAE\xE9\x8F\xBF\xE1K\x1B\xB2h\x80\xF6Y\xA4\x13\x938d\x19\0x#\x92\x1A&\xE4\x92\xF4Z\xD2\x89\x98x\x05LSF\x1B\xF9\xB1\xB4V+\0c\xF5\x0Ejed\xFDa\xF6\xA3\x91\xE30j\\#y\x0B@\x12\x92\x06\xF1\xDF\x10\xD4\xF6\xEB\x81/\x1400\xBD\b\x0F%JS\x12\x02\x8F\xCC.4\x05\xB4m\xE3\x9C\xFDK\xBD\xE7}v\xDEw\xAF\x8B\xFB\xE5O\xBB\xEC\xC0\xE5\x8F~\x8E\\u\xDB\xBF\xBD\xBB\xE78\xA3\x10n\xA7\xF1\xA7\xD7\xEAW\xBC\xFEO\xBF\xF8\xAC+>7|\xCBu7\xCC\x9E\xFC\xE9\xEB\xDB\xBA\xF6\r\xF4>B\xFAP\\\xFF$\x16\xB1\xD1\xCA$\xADY]\xFF\x122\xB0\x85Z\x1Bk\xAAq\xCAy\x98\x84!\x05C\xA0\x17\x90\xC5U\xE4!\xA4\x12!\x86 E!4\'\x18\xAD\xB9R\b\x8C@\x10\x1D\x8BY\xB7\x10\x9C\x02$.@\xC6c\x93\x1E\x15\x88\x96\xA5\xD8\xC2E_\xB1\xD8>\xFF\xC2\xFE\'\x17\xDF\xB7\xFF\xCE3\x9F\xB7\xE7-\x8Fx\xFA\xDA\xE7o\xCF\xF7uw\x1Dg\x14\xC2\x1D0>\xBE\xD0\xB3\x7F\xF3O7\x9F\xF2\xBE\x0Fo~\xE3\xF57\xF7\xA7^u\xED\xEE\x07\xDC|x\x8E\xDEg\xC1\x84\xAC\x9C\x83\xEA\x1D`d\x1A\xD3>\xEF$*\xD5\x02&\x0F\x13j\x0B\xB7\xC8\x12\x14\xE5\x10\xD8\xC3q?K\xE5\x12e\xD1\x1E\xCAp\xDA\x18\xE3P\xB1\x06\xF1\xDA\x86\x04\n[\xCFjH\x92\x93\xA2\xAB\x92\xA470\x03 \xB2\x85\xB3\xF6\xEE\xE0\x9E\xF7\\~\xF2\xFC\xF3\xC7?|\xF0c\xE7\xEFx\xCE\xF3\xCF\xF9\xE3\x03\x0F\xB9\xEB4/\xBD\xB3\x8C3\n\xE14\x18\x1F\xB8Q/~\xFD\x1F|\xF1\xD2+\xAF\x9A?\xF9\xFA\x83\xFDI_\xB8\x01\x0F\xB8\xF1Kk\x82\xE5\x06\xFA\xD8\x01VE\xBA\x92hZ\xD8\x87U\xE0\'!@\x82\x8E\xD19\tn\xFD\xC9+\b\xD0R\xDD\x13\xD1LK\x8E\x88B\xAB\xC8Bxf@\xFD\x070\xD7\x7F\x069\x86\x1D\xC8\x8E\xCC\x19\x06X\x8ApP\xC5 K\x9Cs\xEE\xB6^x\xE1\xE2\x93\xFB\x0F,\xDF}\xDF\xFB\x0F\x7F\xF2-\xCF=\xFF]\x8Fy\xCA\x99P\xE0\x8E\x1Eg\x14\xC2i8>pT\xCF{\xF3\xDB\x8F|\xCDG>q\xE4q7\xDC8\x7F\xEC\xE6Qy\xF4\xE7\xAF_\xBB\xE8\xE6\x83\x82\xD6\xD7c\t\xB7\xDE-o?\xEAh\xDE\xC08K*uu\xF9)\xC4\xA55[\xA65\xE1\x95\x94\x1E^,\xCB\xBET$c\xF6\x16`\x898\xE0J\x02\x8A\xD6\x14M\x9B\t|o\x96Y\x000H\xC7\\\x17\xD8\xBBg\xC4\x05\x17m_{\xF6Y\xF3\x0F\x1E\xB8\xE0\xE0\x07\x1E\xF2\x88s\xDE\xFF\xDC\x7Fz\xF6\x9F]\xFCP\xB9\xF1\xF6\x7F\xBAg\xC6\xDF6\xCE(\x84;\xC9\xF8\xC4!\xBD\xF0w\xFE\xE8\xE6\x87\xBF\xE7\xA3\xFA\xB0\x9B\xBE\xD8\x1E|\xF0\xE8\xF8\xA0qs\xFD\x01_:\x84\x8B\xAE\xF9\xE2R\x96\xDB\xEB\xC0\xB8\x11K\xC8G\xC6\x80)\xBD\x0Et_\x1C\xD6\xBAC\x19zo\x1C\x05\x8D\x05`\xC4S\xA3p\xCFA<,\x19\xE0\xD4kXH\xA2\x9EZ\x1C\xA0\x18t\x89\xF9p\x14\xE7\x9E\xDFt\xFF\xDE\xE1\xDA=\xB3\xADO\x9E\xBDG\xAF\xD8\x7F`\xFC\xABG>\xBA\xFF\xE5\xB7?\xE7\xA2\x8F\xDE\xEF\xC1r\xDD\x1D\xF8\xF8\xCE\x8C/s\x9CQ\bw\xF2q\xD5\xA8g\xBD\xFFS\xF8\xCA\xF7\xBD\xEB\xE6\xFB\\\xFD\xB9\xE5\xC5\x9F\xBFe\xF3^\x87\x0F\xEE\xB9\xC7\xF6\x91\xD9E}G\xCE_.\x16\x07\x16\x90s\x97\xDB\xB3\xBD[Gt\xD8\xDC\x9Ec\xB15\xC3r{\x80.\x15:6\xE8\xC2\xB3\x1A\xEA\x1D\x8A\xA0\x98\r#\xD6\xD0\xB1\xBE\xB6\xC4\xAE\x8D>\xCEf\x8B[f\xD0/\x0Em\xFD\xA6a\xBE\xBCa>\xC7\xB5{\xF6}\xF1\x9A\x8B\xF6\xAE_}\xEF\x8B\xCF\xBA\xEA\xD2\'\x9F\xF3\xD9\xC7=\x11\x9F\xB9\xF0^r\xE4\x8E~&g\xC6\xAD\x1F\xFF\x1F\0\xF3\xAA\r=e\x82\x81\0\0\0\0IEND\xAEB`\x82';
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.global.GridView = GridView;
function GridView(parent, attrs) {
  var keepRef = this;

  this.extend = function (target, source) {
    for (var i in source) {
      target[i] = source[i];
    }return target;
  };

  this.item = function (text, image, parent) {
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
      rect: [0, 0, 100, 60],
      imageRect: [0, 0, 100, 60],
      fontRect: [0, 90, 100, 10] });

    keepRef.extend(this, {
      remove: function remove(notRefreshList) {
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
      moveUp: function moveUp() {
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
      moveDown: function moveDown() {
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
      moveBefore: function moveBefore(item) {
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
      moveAfter: function moveAfter(item) {
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

  this.extend(this, {
    id: 'GridView',
    type: 'GridView',

    listHeight: 400,
    scale: 1,
    backgroundColor: [0.15, 0.15, 0.15],
    scrollBlockColor: [0.16, 0.16, 0.16],
    scrollBarColor: [0.08, 0.08, 0.08],
    scrollBarWidth: 17,
    scrollBarValue: 0,
    scrollBlockRect: [0, 0, 20, 100],
    scrollScale: 1,
    spacing: [3, 3],
    itemBackgroundColor: [0, 0, 0, 0],
    itemStrokeColor: [0.2, 0.2, 0.2, 0],
    itemSelectedColor: [38 / 255, 38 / 255, 38 / 255],
    itemSelectedRecColor: [0.2, 0.7, 1],
    itemFontColor: [1, 1, 1],
    itemSize: [100, 60],
    itemStrokeSize: 1.6,
    itemFontHeight: 0,
    itemFontSize: 20,
    showText: false,
    limitText: false,
    version: 'CC2014',
    first: null,
    last: null,
    children: [],
    selection: [],
    lastSelectedItem: null,

    leftClick: function leftClick(event) {},
    leftDoubleClick: function leftDoubleClick(event) {},
    rightClick: function rightClick(event) {},
    rightDoubleClick: function rightDoubleClick(event) {},
    mouseMove: function mouseMove(event) {},
    mouseOut: function mouseOut(event) {}
  });

  this.extend(this, {
    add: function add(text, image) {
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
    removeAll: function removeAll() {
      this.first = this.last = this.lastSelectedItem = null;
      this.selection = this.children = [];
    },
    getChildren: function getChildren() {
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
    getSelection: function getSelection() {
      var selection = [];
      var item = this.first;

      while (item) {
        if (item.selected) selection.push(item);
        item = item.next;
      }

      this.selection = selection;
      return selection;
    },
    create: function create(parent) {
      var e = this;
      var GV = e.GV = parent.add("group{orientation: 'stack', alignment: ['fill','fill'], margins: 0, spacing: 0}");
      var list = e.list = GV.add("button{alignment:['fill','fill']}");
      var eventRect = e.eventRect = GV.add("group{alignment:['fill','fill']}");

      eventRect.addEventListener('mousedown', function (event) {
        e.event.mouseMoving = false;
        e.event.targetScrollBar = e.getScrollBarFromLocation(event.clientX, event.clientY);
        e.event.targetItem = e.getItemFromLocation(event.clientX, event.clientY);
        if (event.button === 0) {
          if (event.detail === 1) {
            e.event.leftButtonPressed = true;
            e.event.leftButtonPressedLocation = [event.clientX, event.clientY];
            e.event.leftButtonPressedScrollBarValue = e.scrollBarValue;

            if (event.ctrlKey === false) {
              e.mouseMove(event, e.event.targetItem, true);
            }
          } else if (event.detail === 2) {
            e.leftDoubleClick(event);
          }
        } else if (event.button === 2) {
          if (event.detail === 1) {
            e.event.rightButtonPressed = true;
            e.event.rightButtonPressedLocation = [event.clientX, event.clientY];
            e.event.rightButtonPressedScrollBarValue = e.scrollBarValue;
          } else if (event.detail === 2) {}
        }
      });
      eventRect.addEventListener('mousemove', function (event) {
        e.event.mouseMoving = true;
        if (e.event.leftButtonPressed) {
          e.defaultLeftMouseMove(event);
          e.refresh();
        } else if (e.event.rightButtonPressed) {}
        if (event.ctrlKey === false) {
          e.mouseMove(event, e.getItemFromLocation(event.clientX, event.clientY));
        }
      });
      eventRect.addEventListener('mouseup', function (event) {
        if (e.event.leftButtonPressed) {
          if (e.event.mouseMoving) {
            e.defaultLeftClick(event);
            e.leftClick(event);
          } else {
            e.defaultLeftClick(event);
            e.leftClick(event);
          }
        } else if (e.event.rightButtonPressed) {
          if (e.event.mouseMoving) {
            e.rightClick(event);
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


      list.onDraw = e.listDraw;
      list.GV = e;
    },
    alignment: function alignment(_alignment) {
      this.GV.alignment = _alignment;
    },
    size: function size(_size) {
      this.GV.size = _size;
      this.list.size = _size;
      this.eventRect.size = _size;
    },
    location: function location(_location) {
      this.GV.location = _location;
    },
    listDraw: function listDraw() {
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

      g.newPath();
      g.rectPath(0, 0, e.list.size[0] - e.scrollBarWidth * e.scrollScale, e.list.size[1]);
      g.fillPath(bgBrush);

      g.newPath();
      for (var i = 0; i < items.length; i++) {
        if (items[i].backgroundColor) continue;
        g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3] - items[i].fontRect[3]);
      }
      g.fillPath(itemBgBrush);

      for (i = 0; i < items.length; i++) {
        if (items[i].backgroundColor) {
          var brush = g.newBrush(g.PenType.SOLID_COLOR, items[i].backgroundColor);
          g.newPath();
          g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          g.fillPath(brush);
        }
      }

      for (i = 0; i < items.length; i++) {
        if (items[i].image) {
          var image = ScriptUI.newImage(items[i].image);
          var a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.drawImage(image, items[i].rect[0] + items[i].imageRect[0], items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue, items[i].imageRect[2], items[i].imageRect[3]);
          }
        }
      }

      g.newPath();
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

      for (i = 0; i < items.length; i++) {
        if (items[i].strokeColor) {
          var pen = g.newPen(g.PenType.SOLID_COLOR, items[i].strokeColor, e.itemStrokeSize);
          g.newPath();
          g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.strokePath(pen);
          }
        }
      }

      g.newPath();
      for (i = 0; i < items.length; i++) {
        if (items[i].selected) {
          a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
          if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
            g.rectPath(items[i].rect[0], items[i].rect[1] - e.scrollBarValue, items[i].rect[2], items[i].rect[3]);
          }
        }
      }
      g.strokePath(selectedPen);

      if (e.showText) {
        g.newPath();
        for (i = 0; i < items.length; i++) {
          if (!items[i].selected) {
            if (items[i].strokeColor) continue;
            g.rectPath(items[i].rect[0] + items[i].fontRect[0], items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, items[i].fontRect[2], items[i].fontRect[3]);
          }
        }
        g.fillPath(fontBrush);

        for (i = 0; i < items.length; i++) {
          if (items[i].strokeColor) {
            brush = g.newBrush(g.PenType.SOLID_COLOR, items[i].strokeColor);
            g.newPath();
            g.rectPath(items[i].rect[0] + items[i].fontRect[0], items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, items[i].fontRect[2], items[i].fontRect[3]);
            a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
            if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
              g.strokePath(brush);
            }
          }
        }

        g.newPath();
        for (i = 0; i < items.length; i++) {
          if (items[i].selected) {
            a = items[i].rect[1] + items[i].imageRect[1] - e.scrollBarValue + items[i].imageRect[3];
            if (a > 0 && a - items[i].imageRect[3] < e.GV.size[1]) {
              g.rectPath(items[i].rect[0] + items[i].fontRect[0] + 1, items[i].rect[1] + items[i].fontRect[1] - e.scrollBarValue, items[i].fontRect[2] - 2, items[i].fontRect[3]);
            }
          }
        }
        g.fillPath(selectedBrush);

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
      }
      if (e.scrollScale) {
        g.newPath();
        g.rectPath(e.list.size[0] - e.scrollBarWidth, 0, e.scrollBarWidth, e.list.size[1]);
        g.fillPath(scrollBarBrush);

        g.newPath();
        g.rectPath(e.scrollBlockRect[0], e.scrollBlockRect[1], e.scrollBlockRect[2], e.scrollBlockRect[3]);
        g.fillPath(scrollBlockBrush);
      }
    },
    resizeItems: function resizeItems() {
      var e = this;
      var items = e.children;
      for (var i = 0; i < items.length; i++) {
        items[i].rect[2] = e.itemSize[0] * e.scale;
        items[i].rect[3] = e.itemSize[1] * e.scale;

        items[i].fontRect[0] = 0;
        items[i].fontRect[1] = (e.itemSize[1] - e.itemFontHeight) * e.scale + 5;
        items[i].fontRect[2] = e.itemSize[0] * e.scale;
        items[i].fontRect[3] = 15;
      }
    },
    relocationItems: function relocationItems() {
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
    resizeImage: function resizeImage(image) {
      var e = this;

      var WH = [e.itemSize[0], e.itemSize[1]];
      var wh = image.size;
      var k = Math.min(WH[0] / wh[0], WH[1] / wh[1]);
      var xy;
      wh = [k * wh[0], k * wh[1]];
      xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2];

      return [xy[0] * e.scale, xy[1] * e.scale, wh[0] * e.scale, wh[1] * e.scale];
    },
    resizeScrollBar: function resizeScrollBar() {
      var e = this;
      var list = e.list;
      e.scrollBarMaxValue = e.listHeight - list.size[1] + 7;
      if (e.scrollBarMaxValue < 0) e.scrollBarValue = 0;

      e.scrollBlockRect[0] = list.size[0] - e.scrollBarWidth + 1;
      e.scrollBlockRect[2] = e.scrollBarWidth - 2;
      if (e.listHeight < list.size[1]) {
        e.scrollScale = 0;
        e.scrollBlockRect[3] = list.size[1];
      } else {
        e.scrollScale = 1;
        e.scrollBlockRect[3] = list.size[1] * list.size[1] / e.listHeight;
      }
      e.scrollBlockRect[1] = (e.list.size[1] - e.scrollBlockRect[3]) * e.scrollBarValue / e.scrollBarMaxValue;
    },
    defaultLeftClick: function defaultLeftClick(event) {
      var e = this;
      var s = e.selection;
      var c = e.children;
      var currentItem = e.event.targetItem;
      if (!currentItem) {
        for (var i = 0; i < s.length; i++) {
          s[i].selected = 0;
        }e.lastSelectedItem = null;
        e.getSelection();
      }

      if (currentItem) {
        var preSelected = currentItem.selected;
        if (event.ctrlKey === false) {
          for (i = 0; i < c.length; i++) {
            c[i].selected = 0;
          }
        }
        if (e.lastSelectedItem && event.shiftKey === true) {
          var startIndex = e.lastSelectedItem.index;
          var endIndex = currentItem.index;
          for (i = 0; i < c.length; i++) {
            if ((c[i].index - startIndex) * (c[i].index - endIndex) <= 0) {
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
    },
    defaultLeftMouseMove: function defaultLeftMouseMove(event) {
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
    },
    defaultRightMouseMove: function defaultRightMouseMove(event) {
      var e = this;
      e.scrollBarValue = e.event.rightButtonPressedScrollBarValue - event.clientY + e.event.rightButtonPressedLocation[1];

      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0;
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue;
      }
    },
    getItemFromLocation: function getItemFromLocation(x, y) {
      var e = this;
      var c = e.children;
      for (var i = 0; i < c.length; i++) {
        if (x - c[i].rect[0] > 0 && x - c[i].rect[0] < c[i].rect[2] && y - c[i].rect[1] + e.scrollBarValue > 0 && y - c[i].rect[1] + e.scrollBarValue < c[i].rect[3]) {
          return c[i];
        }
      }
      return null;
    },
    getScrollBarFromLocation: function getScrollBarFromLocation(x, y) {
      var e = this;

      if (x > e.list.size[0] - e.scrollBarWidth) {
        if (y > e.scrollBlockRect[1] && y < e.scrollBlockRect[1] + e.scrollBlockRect[3]) {
          return 2;
        }
        return 1;
      }
      return 0;
    },
    refresh: function refresh() {
      this.list.notify('onDraw');
    }
  });

  if (attrs) this.extend(this, attrs);

  this.event = {
    leftButtonPressed: false,
    leftButtonPressedLocation: [0, 0],
    rightButtonPressed: false,
    rightButtonPressedLocation: [0, 0],
    leftButtonPressedScrollBarValue: 0,
    rightButtonPressedScrollBarValue: 0,
    targetItem: null,
    targetScrollBar: 0,
    mouseMoving: false };

  if (parent) this.create(parent);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(10);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function OperatorOverload(call, operator) {
  var meta = ['+', '-', '~', '*', '/', '%', '^', '<', '<=', '==', '<<', '>>', '>>>', '&', '|', '==='];
  var toObject = function toObject() {
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
      this.selection.index === 1 && $.global.translate() || this.selection.index === 2 && $.global.reloadPic() || this.selection.index === 3 && $.global.autoSave() || this.selection.index === 4 && $.global.cutLength();
    } catch (err) {
      err.printa();
    }

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
    $.global.sp.gv.showText = this.value;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    en: 'Made by:Smallpath\nE-mail:smallpath2013@gmail.com\nSource Code:\ngithub.com/Smallpath/Memory\n\nDoubleClick:generate new layers or properties on selected layers from selected element.\nRightClick:call the shortcut menu.\nCtrl/Alt+RightClick:save selected layers as a new element.\nShift+Rightclick:call the up and down window\n\nShortcutkey when script runs as Window:\nKey \'D\' or \'Delete\':delete selected element.\nKey \'F\': overlap selected element.\nKey \'Up\':drop up selected element.\nKey \'Down\':drop down selected element.',
    ch: '\u4F5C\u8005:\n    Smallpath\n\u90AE\u7BB1:\n    smallpath2013@gmail.com\n\u6E90\u7801\u6258\u7BA1\u5730\u5740:\ngithub.com/Smallpath/Memory\n\n\u53F3\u952E\u70B9\u51FB:\u547C\u51FA\u53F3\u952E\u83DC\u5355.\n\u53CC\u51FB:\u4ECE\u9009\u4E2D\u5143\u7D20\u521B\u5EFA\u5C42\u6216\u521B\u5EFA\u6548\u679C.\nCtrl/Alt+\u53F3\u952E\u70B9\u51FB:\u4ECE\u9009\u4E2D\u7684\u5C42\u8BFB\u53D6\u5C42\u4FE1\u606F\u4EE5\u521B\u5EFA\u65B0\u5143\u7D20.\nShift+\u53F3\u952E:\u5524\u51FA\u79FB\u52A8\u5143\u7D20\u7684\u7A97\u53E3\n\n\u7A97\u53E3\u6A21\u5F0F\u8FD0\u884C\u811A\u672C\u65F6:\nD\u952E:\u5220\u9664\u9009\u4E2D\u5143\u7D20.\nF\u952E:\u8986\u76D6\u9009\u4E2D\u5143\u7D20.\n\u4E0A\u952E:\u4E0A\u79FB\u9009\u4E2D\u5143\u7D20.\n\u4E0B\u952E:\u4E0B\u79FB\u9009\u4E2D\u5143\u7D20.'
  },
  refresh: {
    en: 'Please run this script to refresh pictures only when your group has been created with wrong thumbnails(such as all black)\rIt will spent a lot of time.\rNew thumbnails will be created at the time of active comp,so set your comp\'s time first.',
    ch: '\u751F\u6210\u7EC4\u5185\u6240\u6709\u5143\u7D20\u7684\u9884\u89C8\u52A8\u753B:\n##\u8BF7\u7528\u672C\u529F\u80FD\u5BF9\u975E3.x\u7248\u672C\u4FDD\u5B58\u7684\u7EC4\u8FDB\u884C\u751F\u6210\u9884\u89C8\u52A8\u753B\u7684\u64CD\u4F5C:\n\n\u6B64\u529F\u80FD\u5C06\u751F\u6210\u7EC4\u5185\u6240\u6709\u5143\u7D20\u7684\u4E3B\u7F29\u7565\u56FE\u548C\u9884\u89C8\u52A8\u753B,\u5176\u4E2D\u4E3B\u7F29\u7565\u56FE\u4E3A\u5F53\u524D\u5408\u6210\u7684\u5F53\u524D\u65F6\u95F4\u70B9\u7684\u753B\u9762\n\n\u6CE8\u610F:\u6B64\u529F\u80FD\u5C06\u8017\u8D39\u5927\u91CF\u65F6\u95F4,\u811A\u672C\u4F1A\u5F39\u51FA\u56FE\u7247\u6587\u4EF6\u5939,\u4F60\u53EF\u4EE5\u6839\u636E\u5176\u4E2D\u7684\u56FE\u7247\u5224\u65AD\u9884\u89C8\u52A8\u753B\u7684\u751F\u6210\u8FDB\u5EA6\n'
  },
  auto: {
    en: 'This script helps you simplify you saving proccess\rIt will save every layer in active comp as a new element.',
    ch: '\u6279\u91CF\u5B58\u50A8\u529F\u80FD:\n\n\u8FD9\u4F1A\u5C06\u5F53\u524D\u5408\u6210\u4E2D\u6BCF\u4E00\u5C42\u90FD\u5206\u522B\u5B58\u50A8\u4E3A\u4E00\u4E2A\u65B0\u5143\u7D20.\n\n\u6B64\u529F\u80FD\u53EF\u4EE5\u5E2E\u52A9\u4F60\u5FEB\u901F\u5B58\u50A8\u65B0\u5143\u7D20,\u5341\u5206\u9002\u5408\u5B58\u50A8\u5927\u91CF\u7684MG\u5408\u6210\u5C42\n\u811A\u672C\u4F1A\u5F39\u51FA\u56FE\u7247\u6587\u4EF6\u5939,\u4F60\u53EF\u4EE5\u6839\u636E\u5176\u4E2D\u7684\u56FE\u7247\u6765\u5224\u65AD\u9884\u89C8\u52A8\u753B\u7684\u751F\u6210\u8FDB\u5EA6\n' },
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
  getReport: { en: 'Get report', ch: '生成报告' },
  processTitle: { en: 'Now generating...', ch: '少女祈祷中...' },
  processingPrefix: { en: 'Processing the ', ch: '正在生成第' },
  processAfter: { en: ' th layer', ch: ' 个层' }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var settingsButtonFunc = $.global.settingsButtonFunc = function () {
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
        },
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
    } };

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
          if (sp.xmlFileNames.includes(newGroupName)) {
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

  var warpDrop = function warpDrop(a, b, index1, index2) {
    var tempD = a.text;
    a.text = b.text;
    b.text = tempD;
    var tempXML = sp.xmlCurrentFileNames[index1];
    sp.xmlCurrentFileNames[index1] = sp.xmlCurrentFileNames[index2];
    sp.xmlCurrentFileNames[index2] = tempXML;
  };

  var exchange = function exchange(isUp, wXML) {
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

  var handleKey = function handleKey(key, control) {
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
  var outRes = 'Group{\n    orientation: \'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],    helpTip:StaticText{text:\'' + loc(sp.moduleHelpTip) + '\'},\n    wlist:ListBox{properties:{multiselect:0}},\n    oc:Group{\n        alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],\n        ok:Button{text:\'' + loc(sp.changeModuleName) + '\'},\n        cancel:Button{text:\'' + loc(sp.quit) + '\'}\n    }\n  }';
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
    if (sp.xmlGroupNames.includes(newGroupName)) {
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
  };

  outRes.wlist.size = [200, 300];
  moveWin.show();
}

function moveWindow(xmlItem, groupItem, win) {
  var moveWin = new Window('dialog', 'Move', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = 'Group{\n    orientation: \'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],    wlist:ListBox{properties:{multiselect:0}},\n    oc:Group{\n        alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],\n        ok:Button{text:\'' + loc(sp.ok) + '\'},\n        cancel:Button{text:\'' + loc(sp.cancel) + '\'}\n    }\n  }';
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
  };

  outRes.wlist.size = [200, 300];
  moveWin.show();
}

function outputWindow() {
  var outWin = new Window('window', 'Export', undefined, {
    resizeable: 0,
    maximizeButton: 0
  });
  var outRes = 'Group{\n    orientation: \'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],    wlist:ListBox{properties:{multiselect:1}},\n    oc:Group{\n        alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'],\n        ok:Button{text:\'' + loc(sp.ok) + '\'},\n        cancel:Button{text:\'' + loc(sp.cancel) + '\'}\n    }\n  }';
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
        }
        clearOutput();
        writeLn('Complete!');
      }
    }
  };
}

var upAndDown = function upAndDown(isUp, isW) {
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
  for (var i = 0; i < waitClFile.length; i++) {
    if (waitClFile[i] instanceof Folder) {
      deleteThisFolder(waitClFile[i]);
      waitClFile[i].remove();
    } else {
      waitClFile[i].remove();
    }
  }
}

$.global.presetWindow = function () {
  var jinWin = new Window('dialog', loc(sp.settingPre));
  var jinRes = 'group{\n    orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n    guluG:Group{\n      orientation:\'row\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n      jinGroup:Group{\n        orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n        isJin:StaticText{text:\'' + loc(sp.isEffect) + '\'}\n        isJinSt:StaticText{text:\'' + loc(sp.jinOne) + '\',properties:{multiline:1}}\n        jin:Panel{\n          orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n          _1:Checkbox{text:\'' + loc(sp._1) + '\'},\n          _2:Checkbox{text:\'' + loc(sp._2) + '\'},\n          _3:Checkbox{text:\'' + loc(sp._3) + '\'},\n          _4:Checkbox{text:\'' + loc(sp._4) + '\'},\n          _5:Checkbox{text:\'' + loc(sp._5) + '\'},\n          _6:Checkbox{text:\'' + loc(sp._6) + '\'},\n          _7:Checkbox{text:\'' + loc(sp._7) + '\'},\n          _8:Checkbox{text:\'' + loc(sp._8) + '\'},\n          _9:Checkbox{text:\'' + loc(sp._9) + '\'},\n        }\n      },\n      delGroup:Group{\n        orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n        isJin:StaticText{text:\'' + loc(sp.cleanProperty) + '\'},\n        isJinSt:StaticText{text:\'' + loc(sp.jinTwo) + '\',properties:{multiline:1}},\n        del:Panel{\n          orientation:\'column\',alignment:[\'fill\',\'fill\'],alignChildren:[\'fill\',\'fill\'],\n          _1:Checkbox{text:\'' + loc(sp._1) + '\'},\n          _2:Checkbox{text:\'' + loc(sp._2) + '\'},\n          _3:Checkbox{text:\'' + loc(sp._3) + '\',enabled:0},\n          _4:Checkbox{text:\'' + loc(sp._4) + '\',enabled:0},\n          _5:Checkbox{text:\'' + loc(sp._5) + '\'},\n          _6:Checkbox{text:\'' + loc(sp._6) + '\'},\n          _7:Checkbox{text:\'' + loc(sp._7) + '\'},\n          _8:Checkbox{text:\'' + loc(sp._8) + '\',enabled:0},\n          _9:Checkbox{text:\'' + loc(sp._9) + '\',enabled:0},\n        }\n      },\n    },\n    oc:Group{\n      orientation:\'row\',alignment:[\'fill\',\'center\'],alignChildren:[\'center\',\'fill\'],\n      ok:Button{text:\'Ok\',preferredSize:[160,30]},\n    }\n  }';
  var jinGulu = jinWin.add(jinRes);

  var _loop = function _loop(i) {
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
  };

  for (var i = 1; i <= 9; i++) {
    _loop(i);
  }

  var _loop2 = function _loop2(i) {
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
  };

  for (var i = 1; i <= 9; i++) {
    _loop2(i);
  }
  jinGulu.oc.ok.onClick = function () {
    jinWin.close();
  };
  jinWin.center();
  jinWin.show();
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$.global.UIParser = UIParser;
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
    for (var i in source) {
      target[i] = source[i];
    }return target;
  };
  _.dir = function (obj) {
    var str = '';
    for (var i in obj) {
      str += i + ' : ' + _typeof(obj[i]) + '\n';
    }return str;
  };
  _.removeWin = function (id) {
    for (var i = 0; i < _.windows.length; i++) {
      if (_.windows[i].id === id) _.windows.splice(i, 1);
    }
  };
  _.proto = {
    find: function find(selector, recursive) {
      var matchs = [];
      var elements = 'length' in this ? this : [_.root];
      if (!selector) return _.extend(elements, _.proto);

      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector);
        for (var i = 0; i < selectors.length; i++) {
          var match = elements;
          var process = _.parserSelector(selectors[i]);
          for (var j = 0; j < process.length; j++) {
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5]);
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
    filter: function filter(selector) {
      var matchs = [];
      var elements = 'length' in this ? this : [_.root];
      if (!selector) return _.extend(elements, _.proto);

      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector);
        for (var i = 0; i < selectors.length; i++) {
          var match = elements;
          var process = _.parserSelector(selectors[i]);
          for (var j = 0; j < process.length; j++) {
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5]);
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
    style: function style(_style, target) {
      if (!target) target = this;
      for (var i = 0; i < target.length; i++) {
        for (var j in _style) {
          if (target[i].type === j) _.proto.style(_style[j], [target[i]]);else target[i][j] = _style[j];
        }
      }
    },
    each: function each(command) {
      for (var i = 0; i < this.length; i++) {
        command(this[i]);
      }
    },
    setAttr: function setAttr(prop, value) {
      this.each(function (e) {
        e[prop] = value;
      });
    },
    getAttr: function getAttr(prop) {
      if (this.length) return this[0][prop];
    },
    children: function children(selector) {
      return this.find(selector || '>*');
    },
    parent: function parent() {
      if (this.length > 0 && this[0].parent) return this[0].parent;else return _.extend([], _.proto);
    },
    on: function on(event, fn, useCapture) {
      this.each(function (e) {
        e.addEventListener(event, fn, useCapture);
      });
    },
    exe: function exe(fn, args) {
      this.each(function (e) {
        e[fn].apply(e, args);
      });
    },
    addUI: function addUI() {
      return _.addUI.apply(this[0], arguments);
    },
    first: function first() {
      return _.extend([this[0]], _.proto);
    },
    last: function last() {
      return _.extend([this[this.length - 1]], _.proto);
    },
    eq: function eq(index) {
      if (index < this.length && index >= 0) {
        return _.extend([this[index]], _.proto);
      } else {
        return _.extend([], _.proto);
      }
    },
    layout: function layout() {
      this.each(function (e) {
        _.layout(e);
      });
    },
    remove: function remove() {
      this.each(function (e) {
        e.parent.remove(e);
      });
    },
    empty: function empty() {
      this.children().remove();
    }
  };

  _.createUI = function (UIJson) {
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
    if (!UIJson) return;
    var newWindows = [];
    for (var i in UIJson) {
      var json = UIJson[i];
      if (_.isWindow(UIJson[i].type)) {
        var s = json.type;
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
        var newWindow = _.root.children[_.root.children.length] = new Window(s);
        newWindows.push(newWindow);
        if (!json.id) newWindow.id = i;

        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue;
          newWindow[j] = json[j];
        }

        if (json.children) _.addUI(json.children, newWindow);
      }
    }
    return _.extend(newWindows, _.proto);
  };

  _.addUI = function (UIJson, parent) {
    if (!UIJson) return;
    if (!parent) parent = this;

    var newItem = [];
    for (var i in UIJson) {
      var json = UIJson[i];
      if (_.isElement(json.type)) {
        var s = json.type;
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
        var newElement = parent.add(s);
        if (!json.id) newElement.id = i;

        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue;
          newElement[j] = json[j];
        }
        newItem.push(newElement);

        if (_.isContainer(json.type) && json.children) arguments.callee(json.children, newElement);
      }
    }
    return _.extend(newItem, _.proto);
  };

  _.isWindow = function (type) {
    var winType = ['window', 'palette', 'dialog', 'Window', 'Palette', 'Dialog'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isContainer = function (type) {
    var winType = ['window', 'palette', 'dialog', 'group', 'panel', 'tabbedpanel', 'treeview', 'dropdownlist', 'listbox', 'listitem', 'tab', 'node', 'Window', 'Palette', 'Dialog', 'Group', 'Panel', 'TabbedPanel', 'Treeview', 'DropDownList', 'ListBox', 'ListItem', 'Tab', 'Node'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isElement = function (type) {
    var winType = ['panel', 'tabbedpanel', 'tab', 'group', 'button', 'checkbox', 'dropdownlist', 'edittext', 'flashplayer', 'iconbutton', 'image', 'item', 'listbox', 'listitem', 'progressbar', 'radiobutton', 'scrollbar', 'slider', 'statictext', 'treeview', 'tab', 'node', 'Panel', 'TabbedPanel', 'Tab', 'Group', 'Button', 'CheckBox', 'DropDownList', 'EditText', 'FlashPlayer', 'IconButton', 'Image', 'Item', 'ListBox', 'ListItem', 'ProgressBar', 'RadioButton', 'Scrollbar', 'Slider', 'StaticText', 'Treeview', 'Tab', 'Node'];
    var len = winType.length;
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true;
    }
    return false;
  };

  _.isUI = function (type) {
    if (_.isWindow(type) || _.isElement(type)) return true;
    return false;
  };

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
    return selector.replace(/[\s\]\)]\w*/g, '').replace(/[\#\.\[\:\=]+(?=[\#\.\[\]\,\:\=\>\*])/g, '').replace(/\*+\w*/g, '*').replace(/\,+\w*/g, ',').replace(/\>+\w*/g, '>').replace(/^\w*\,/g, '').split(/\,/g);
  };
  _.parserSelector = function (selector) {
    var sign, content, prop, value, func, param, doFind;
    var recursive = 1;
    var process = [];
    var parts = selector.replace(/(?=[\#\.\[\:\>\*])/g, '@').replace(/^\@/, '').split('@');

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '>') {
        recursive = 0;
        i++;
      }

      sign = parts[i][0];
      content = parts[i].substr(1);
      prop = value = func = param = '';
      doFind = 1;

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

  _.layout = function (e) {
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

  _.JSON = {
    parse: function parse(strJSON) {
      return eval('(' + strJSON + ')');
    },
    stringify: function () {
      var toString = Object.prototype.toString;
      var isArray = Array.isArray || function (a) {
        return toString.call(a) === '[object Array]';
      };
      var escMap = { '"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
      var escFunc = function escFunc(m) {
        return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
      };
      var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
      return function stringify(value) {
        if (value == null) {
          return 'null';
        } else if (typeof value === 'number') {
          return isFinite(value) ? value.toString() : 'null';
        } else if (typeof value === 'boolean') {
          return value.toString();
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if (typeof value.toJSON === 'function') {
            return stringify(value.toJSON());
          } else if (isArray(value)) {
            var res = '[';
            for (var i = 0; i < value.length; i++) {
              res += (i ? ', ' : '') + stringify(value[i]);
            }return res + ']';
          } else if (toString.call(value) === '[object Object]') {
            var tmp = [];
            for (var k in value) {
              if (value.hasOwnProperty(k)) tmp.push(stringify(k) + ': ' + stringify(value[k]));
            }
            return '{' + tmp.join(', ') + '}';
          }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"';
      };
    }()
  };
  _.xml = {
    read: function read(xmlFile) {
      xmlFile.open('r');
      var xmlString = xmlFile.read();
      var myXML = new XML(xmlString);
      xmlFile.close();

      return myXML;
    }
  };

  _.folder = {
    create: function create(path) {
      var newFolder = new Folder(path);
      newFolder.create();

      return newFolder;
    },
    remove: function remove(folder, option) {
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
    help: function help() {
      var str = 'file:\n';
      str += 'read(path) 参数: path 路径字符串 读取文本文件，返回String对象\n';
      str += 'create(path， text) 参数: path 路径字符串，text 内容字符串 创建文本文件，返回File对象\n';
      str += 'getFileFromFolder(folder, format) 参数: folder 文件夹，format 格式如\'png|jpg\' 从文件夹获取文件\n';
      str += 'help() 返回帮助信息\n';
      str += 'alertHelp() 弹出帮助信息\n';
      return str;
    },
    read: function read(file) {
      file.open('r');
      var myString = file.read();
      file.close();

      return myString;
    },
    create: function create(path, text) {
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
    addItem: function addItem(list, array) {
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
    getActiveComp: function getActiveComp() {
      var thisComp = app.project.activeItem;
      if (thisComp instanceof CompItem) {
        return thisComp;
      }
      return null;
    },
    getSelectedLayers: function getSelectedLayers() {
      var thisComp = app.project.activeItem;
      if (!(thisComp instanceof CompItem) || thisComp.selectedLayers.length === 0) {
        return false;
      }
      return thisComp.selectedLayers;
    },
    findLayer: function findLayer(name, comp) {
      if (!comp) comp = app.project.activeItem;
      if (!(comp instanceof CompItem)) return false;

      var l = comp.layers;
      if (l.length === 0) return false;

      for (var i = 1; i <= l.length; i++) {
        if (l[i].name === name) return l[i];
      }
      return false;
    },
    getItemById: function getItemById(id) {
      for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i).id === parseInt(id)) {
          return app.project.item(i);
        }
      }

      return false;
    },
    lookItemInProjectPanel: function lookItemInProjectPanel(item) {
      for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i).selected) {
          app.project.item(i).selected = 0;
        }
      }
      item.selected = 1;
    },
    looklayerInComp: function looklayerInComp(layer) {
      var myComp = layer.containingComp;
      if (parseInt(app.version) > 9) {
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
    allowAccessFile: function allowAccessFile() {
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
        try {
          var securitySetting = app.preferences.getPrefAsLong('Main Pref Section', 'Pref_SCRIPTING_FILE_NETWORK_SECURITY');
          return securitySetting === 1;
        } catch (e) {
          return securitySetting === 1;
        }
      }
    },
    getOS: function getOS() {
      if ($.os.indexOf('Windows') > -1) return 'windows';else if ($.os.indexOf('Mac') > -1) return 'Mac';else return '';
    }
  };

  _.window = {
    resize: function resize(window) {
      window.layout.layout(true);
      window.layout.resize();
      window.onResizing = window.onResize = function () {
        this.layout.resize();
      };
    }
  };

  _.array = {
    invert: function invert(array) {
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        newArray[i] = array[array.length - 1 - i];
      }
      return newArray;
    },
    random: function random(array) {
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        var start = Math.round(Math.random() * newArray.length);
        newArray.splice(start, 0, array[i]);
      }
      return newArray;
    },
    find: function find(array, item) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === item) return i;
      }
      return -1;
    },
    merge: function merge(array1, array2) {
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
    isNumber: function isNumber(str) {
      var myNum = parseFloat(str);
      if (isNaN(myNum)) {
        return 0;
      } else {
        return myNum;
      }
    }

  };

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
  (function (global) {
    __webpack_require__(0);
    __webpack_require__(6);
    __webpack_require__(1);
    __webpack_require__(3);
    __webpack_require__(7);
    __webpack_require__(5);
    __webpack_require__(2);
    __webpack_require__(8);

    $.layer.slash = sp.slash;
    $.layer.tempFolder = new Folder(sp.scriptFolder.toString() + $.layer.slash + 'tempFile');
    $.layer.translate = $.global.translate;

    var prefixString = loc(sp.processingPrefix);
    var suffixString = loc(sp.processAfter);
    $.layer.willCreateLayers = function (len) {
      ProgressWin = new Window('palette', loc(sp.processTitle));
      var group = ProgressWin.add('Group{orientation:\'column\',alignment: [\'fill\',\'fill\'],\n        ProgressText: StaticText {text:"", justify:\'center\'},\n        ProgressBar: Progressbar{alignment: [\'fill\',\'fill\'],value:0, minvalue:0, maxvalue:' + len + '}\n      }');
      ProgressText = group.ProgressText;
      ProgressBar = group.ProgressBar;
      var replaced = '';
      len.toString().split('').forEach(function (item) {
        replaced += '  ';
      });
      var divide = replaced + '0' + '/' + ProgressBar.maxvalue;
      ProgressText.text = prefixString + divide + suffixString;
      ProgressWin.show();
      ProgressWin.center();
    };
    $.layer.didCreateLayer = function (count) {
      ProgressBar.value = ProgressBar.value + count;
      var divide = ProgressBar.value + '/' + ProgressBar.maxvalue;
      ProgressText.text = prefixString + divide + suffixString;
      ProgressWin.update && ProgressWin.update();
      win.update && win.update();
    };
    $.layer.didCreateLayers = function () {
      ProgressWin.close();
    };

    var ProgressWin, ProgressText, ProgressBar;

    sp.fns = new Fns();

    $.global.callbackBeforeWebpackBuild && $.global.callbackBeforeWebpackBuild();
    if (!(global instanceof Panel)) {
      $.global.callbackBeforeWebpackBuild = function () {
        win.close();
      };
    }
    var win = global instanceof Panel ? global : new Window('window', sp.scriptName, undefined, { resizeable: true });
    var group1 = win.add("Group{orientation: 'column', alignment: ['fill','fill'],spacing:0,margins:0}");
    var group11 = group1.add("Group{orientation: 'row', alignment: ['fill','fill'],spacing:0,margins:0}");
    var parentDroplist = sp.parentDroplist = group11.add('Dropdownlist{}');
    var droplist = sp.droplist = group11.add('Dropdownlist{}');
    var gv = sp.gv = new GridView(group1);

    gv.limitText = sp.getSettingAsBool('limitText');
    gv.showText = sp.showThumbValue;
    gv.version = parseInt(app.version.split('.')[0]) === 12 || parseInt(app.version.split('.')[0]) === 14 ? 'CC' : 'CC2014';

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
          } catch (err) {}

          if (!targetFolder.exists) {
            continue;
          }
          if (!img.exists) {
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
          var stringToCall = '\n          if (sp) {\n            if (sp.gv) {\n              if (sp.gv.children) {\n\n                var len = sp.gv.children.length;\n                for (var itemIndex = 0; itemIndex < len; itemIndex++) {\n                  var currentItem = sp.previewHelper["item" + itemIndex];\n                  if (currentItem) {\n\n                    var currentIndex = currentItem["currentIndex"];\n                    currentItem["currentIndex"]++;\n                    var currentIndexTemp = currentItem["tempFiles"];\n                    if (currentIndexTemp) {\n                      var currentFile = currentIndexTemp[currentIndex];\n                      if (currentFile) {\n\n                        if (currentItem["tempItem"])\n                          currentItem["tempItem"].image = currentFile;\n\n                      } else {\n                        currentItem["currentIndex"] = 0;\n                      }\n                    }\n                  }\n                }\n                if (isValid(sp.gv.list))\n                  sp.gv.refresh();\n\n              }\n            }\n          }';
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
          var stringToCall = '\n          if (sp) {\n            if (sp.gv) {\n              if (sp.gv.children) {\n\n                var len = sp.gv.children.length;\n                for (var itemIndex = 0; itemIndex < len; itemIndex++) {\n                  var currentItem = sp.previewHelper["item" + itemIndex];\n                  if (currentItem) {\n                    var currentIndex = currentItem["currentIndex"];\n                    currentItem["currentIndex"]++;\n\n                    var currentIndexTemp = currentItem["tempFiles"];\n                    if (currentIndexTemp) {\n                      var currentFile = currentIndexTemp[currentIndex];\n                      if (currentFile) {\n                        if (currentItem["tempItem"])\n                          currentItem["tempItem"].image = currentFile;\n                      } else {\n                        var currentImg = currentItem["tempImg"];\n                        if (currentImg) {\n                          currentItem["tempItem"].image = currentImg;\n                        }\n                        sp.previewHelper["item" + itemIndex] = {};\n                      }\n                    }\n                  }\n                }\n                if (isValid(sp.gv.list))\n                  sp.gv.refresh();\n\n              }\n            }\n          }';
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
          if (item['@groupName'].toString() === groupName) {
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

        var precomposeName = decodeURIComponent(xml['@name'].toString());

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

          var activeCompLayersArr = sp.newLayers(xml, app.project.activeItem, options);

          app.project.activeItem.time = currentTime;

          sourceFolder.numItems === 0 && sourceFolder.remove();
          compFolder.numItems === 0 && compFolder.remove();
        } else {
          activeCompLayersArr = app.project.activeItem.selectedLayers;
          sp.newProperties(xml, app.project.activeItem.selectedLayers, sp.cleanGroupValue, sp.offsetKeyframeValue);
        }

        app.endUndoGroup();

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
        if (file.name.split('.').pop() !== 'jpg' && file.name.split('.').pop() !== 'png') return;
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

        xml.ListItems.child(preIndex).setLocalName('waitToDelete');
        delete xml.ListItems.waitToDelete;
        sp.settingsFile.writee(xml);
        sp.deleteIndexAndReload(preIndex);

        var imageFolder = sp.getImageFolderByName(selectionText);
        $.global.deleteThisFolder(imageFolder);
        imageFolder.remove();

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
        if (sp.xmlFileNames.includes(newEleName)) {
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
          if (item['@groupName'].toString() === groupName) {
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
            var name = decodeURIComponent(folder['@name'].toString());
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

        if (sp.gv.lastSelectedItem.text === decodeURIComponent(xml.child(sp.gv.lastSelectedItem.index)['@name'].toString())) {
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
        var spacing = 2;
        var parentDroplistWidth = 100;
        group1.location = [spacing, 0];
        group1.size = [win.size[0], win.size[1]];
        gv.size([group1.size[0], group1.size[1] - 20]);
        group11.location = [1, 1];
        group11.size.width = win.size[0] + 12;
        droplist.size = [win.size[0] - parentDroplistWidth - spacing * 2, group11.size[1] - 3];
        droplist.location.x = parentDroplistWidth;
        droplist.itemSize.width = droplist.size.width - 27;
        sp.parentDroplist.size.width = parentDroplistWidth;
        sp.parentDroplist.size.height = droplist.size.height;
        sp.parentDroplist.itemSize.width = parentDroplistWidth - 27;
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
        } else if (key.ctrlKey === true && key.shiftKey === true && alt === true) {}
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
    }
  })(undefined, function () {
    var sp = function sp() {
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

      noImage: '\x89PNG\r\n\x1A\n\0\0\0\rIHDR\0\0\0d\0\0\0<\b\x06\0\0\0\x90?\x1F\xCE\0\0\t/IDATx\x9C\xED\x9BiL\x13]\x17\xC7\xFF\xED\xB0\xB4u\x01,QpA\x94\xB4\xFAA\x89J\t\xA8X5b\x1E\x8D1~0\xD1D\xFC 1\xA81FI\x8C\x9A(\x89\x8D\x0B.\x89!j\x88\xB2\x18\x17\xF0\x93Jp%\x1A\xC5\x88\x80\xDA\xD4\x05\x85Z!\x80\x82\x16D,\xB6,-]8\xCF\x07_&\x8E-L\xCD\xD3\xF7y\xE7\xD5\xF9%7\xE9\x9C{\xEE\x99\xE5?w\xEE\x9Ds\xA7\x12\0\x04\x11\xC1 \xFD_\x1F\x80\b\x17Q\x10\x81!\n"0DA\x04\x86(\x88\xC0\x10\x05\x11\x18\xA2 \x02C\x14D`\x88\x82\b\fQ\x10\x81\x11\xC4\xE7 \x95J1z\xF4h\x84\x84\x84x\xD5\x11\x11\\.\x17\xACV+\x88\xFE\xCC\f\x8CD"\x01\x000\f\x03\xB9\\\x8E\xD0\xD0PH\xA5\xDE\xF7\xB9\xD3\xE9\x84\xCDf\xC3\xC0\xC0\xC0\xB0\xF1x\x05\x19=z4222\x10\x17\x17\x87\xFE\xFE~N\x9D\xCB\xE5BSS\x13\n\x0B\x0B\xE1t:\x7F\xE5<~+\xA4R)"""\x90\x92\x92\x82\xE4\xE4d\xC8d2N}hh(\x1A\x1B\x1BQPP\x80o\xDF\xBE\r\x1B\x8BW\x10\xB9\\\x8E\xA4\xA4$8\x1C\x0E\x98L&N\x9D\xDB\xEDF[[\x1B\xAF\xEA\xBF;\x83O\n\x8B\xC5\x82\xF7\xEF\xDF#44\x94S\xAF\xD1h\x90\x9C\x9C\x8C\xE2\xE2b^A\x80\xEF\xD9\xDE!Ktt4\x15\x15\x15\xD1\xFA\xF5\xEB\x87\xF5\x13\xCB\xD0e\xFD\xFA\xF5TTTD\xD1\xD1\xD1\xBC\xBE\xE2\xA0.0DA\x04\x06\xAF \x83\xCFG\xB7\xDB\xFDo\x1C\xCFo\x89\xDB\xED\x86\xCB\xE5\xF2k&\xCA+\x88\xD3\xE9\x84\xC9dBGGG@\x0E\xEEO\xA4\xA3\xA3\x03&\x93\xC9\xAF\x99\xA8\x04<K\xB8\x12\x89\x04\xC1\xC1\xC1\xF0x<\xF0x<\x81:\xC6?\n\x86a\xC00\x8C_\xBD\x84W\x10\x91\x7F\x17qP\x17\x18\xA2 \x02C\x14D`\xF0\xA6N\xFC%66\x16\x1F?~\xF4\x9A\x1EO\x9B6\r2\x99\f555\x1C{RR\x12\xD2\xD2\xD2 \x95JQRR\x82\xF2\xF2\xF2!cGEEA\xADV\xA3\xA2\xA2\x02\x000n\xDC8X\xADV8\x1C\x0E/\xDFQ\xA3F!((\b]]]^u\x87\x0F\x1FFnn.\xCCf\xF3\x90\xFB\n\x0B\x0B\xC3\xF6\xED\xDB1a\xC2\x04\xB4\xB5\xB5\xE1\xE4\xC9\x93\x9Ct\xC7\xDC\xB9s\x11\x1E\x1E\xCEic2\x99\xD0\xDC\xDC<d\xCC_% \xE9\x81\xA2\xA2"\xBA|\xF9\xB2\x97\xBD\xB4\xB4\x94***\xD8m\x86a\xE8\xC6\x8D\x1Bd\xB7\xDB\xA9\xBD\xBD\x9D\xCCf3\xF5\xF7\xF7SEE\x05\x8D\x1C9\xD2g\xEC\xEC\xECljmme\xB7sss)\'\'\xC7\xA7\xEF\xC5\x8B\x17\xE9\xD0\xA1C^v\x86a\xA8\xA9\xA9\x89\xF2\xF3\xF3\x87<\x87={\xF6\x90\xD9l&\x87\xC3Af\xB3\x99\xFA\xFA\xFA\xA8\xA3\xA3\x83rssY\x9F\xB7o\xDF\xD2\xCF\\\xBAt)`i\x96\x80=\xB2\xFA\xFA\xFA\xB0j\xD5*\xA4\xA7\xA7s\xECn\xB7\x9B3\xFF\xBEr\xE5\n\xB4Z-rrr\x10\x13\x13\x83I\x93&A\xA7\xD3A\xADV\xE3\xEE\xDD\xBBC\xC6w\xB9\\\xECo\xA5R\x89\xD4\xD4T/\x1F\x86a0w\xEE\\DGG{\xD5m\xDA\xB4\t\xB1\xB1\xB1\x987o\x9E\xCF\xF8\x1B6l@VV\x16>~\xFC\x88\xA5K\x97b\xFC\xF8\xF1\xD0h4\xD0\xEB\xF5\xD8\xB8q#\x8A\x8A\x8A\0|\x7F/\xBBy\xF3&\xB4Z-[\xF6\xED\xDB7\xFC\xC5\xF9E\x02\xA2l^^\x1E\xD9\xEDvjmm\xA5\x98\x98\x18\xD6~\xF5\xEAU\xBA\x7F\xFF>\x01\xA0\xF8\xF8x\xEA\xE9\xE9!\x9DN\xE7\xD5>##\x83\xFA\xFA\xFA|&1\xB3\xB3\xB3\xA9\xA9\xA9\x89\xDD.++#\xB7\xDBMiii\x1C\xBF\xCC\xCCL\x1A\x18\x18\xA0\xD2\xD2R\xAF\x18\xE5\xE5\xE5T__Ov\xBB\x9D\x96/_\xCE\xA9\x93H$T[[K\x06\x83\x81\x18\x86\xF1j{\xE2\xC4\tJHH \0TSSC\x05\x05\x05\x01\xEB\x11?\x97\x80\x0E\xEAF\xA3\x11N\xA7\x13W\xAE\\a\x17n~d\xDB\xB6m0\x9B\xCD8p\xE0\x80W]AA\x01jkk\xB1z\xF5j\xDE\xFDDFF\xA2\xBB\xBB\x1B\x1B7n\xE4\xD8\xD7\xACY\x03\x9B\xCD\x86\xB0\xB00\x8E=**\ns\xE6\xCC\xC1\xE5\xCB\x97a2\x99\xB0u\xEBVN\xBDV\xAB\x85J\xA5\xC2\xA1C\x87|\xBE\xFC\xEE\xDC\xB9\x13\xCF\x9F?\xE7=\xAE@\x10PA\\.\x17v\xEC\xD8\x81\xE9\xD3\xA7\xE3\xCC\x993^\xF5QQQhnn\x1Er\xFD\xA4\xB1\xB1\x11J\xA5\x92w?c\xC7\x8EEyy94\x1A\r\xE2\xE2\xE2\0\0\x89\x89\x89\x88\x8F\x8FGuu5"##9\xFE:\x9D\x0E\xBD\xBD\xBD8v\xEC\x18\xAA\xAA\xAA\xA0\xD1h8\x8BH\x8B\x17/\x86\xC5b\xC1\xF5\xEB\xD7\xFD:\xCF\xB5k\xD7\xE2\xEB\xD7\xAFl9{\xF6\xAC_\xED\xFC!`\xB3\xACAn\xDD\xBA\x85\x0B\x17. ==\xDDkL\x18L\x1F\f\x85\xCB\xE5Bpp\xF0\xB0\xF1CBB\x10\x11\x11\x81\xE3\xC7\x8FC\xA5R\xE1\xE0\xC1\x83X\xB7n\x1D\xF6\xEE\xDD\x0B\xA3\xD1\x88\xABW\xAF\xE2\xC8\x91#\x9C6\xF3\xE6\xCD\x83\xDB\xEDFqq1\x14\n\x05\x94J%v\xEF\xDE\xCD\xF6\xD4\xC1\xD4\xD0\xCFi\x8D\xDA\xDAZv\xE9Z&\x93a\xD9\xB2e\0\xBE\xDF8eee\xAC\xDF\x9D;wx\xAE\x8A\xFF\xFCW\xDEC233\xF1\xFA\xF5k\x9C8q\x82s\'Z,\x16L\x9E<y\xC8v\x93\'O\x86\xC5b\x196vll,\xA4R)\xDE\xBD{\x87\xBBw\xEFb\xC1\x82\x05\b\x0F\x0F\xC7\xFC\xF9\xF3q\xFD\xFAu<y\xF2\x04#G\x8Ed{\xC9\x8A\x15+\xA0R\xA9\xE0v\xBB1{\xF6lL\x9B6\r\x16\x8B\x05\x7F\xFD\xF5\x17\x1B\xF3\xF1\xE3\xC7\x18;v,\xB4Z-g_\xF7\xEE\xDD\xC3\xC3\x87\x0F\xD1\xD2\xD2\x02\xA5R\x89/_\xBE\0\0\f\x06\x03\xF6\xEE\xDD\xCB\x96\xCA\xCA\xCA_\xBEF\xC3\x11\xB0A\xFD\xE9\xD3\xA7\xECvTT\x14}\xF8\xF0\x81\xACV+;\xA8/Y\xB2\x84\xECv;m\xDE\xBC\xD9\xAB}JJ\n\xD9l6\xCA\xCC\xCC\x1CvPOOO\xA7\xF6\xF6v\x02@\n\x85\x82>\x7F\xFELF\xA3\x91ZZZ(88\x98d2\x19uwwSjj*\x01\xA0[\xB7n\xD1\xCB\x97/9\xF1\xB6l\xD9B===\xA4V\xAB\t\xF8>%\xAE\xAF\xAF\xA7G\x8F\x1E\xF9<\xB7\x92\x92\x12\xAA\xAB\xAB\xFB\xFF\x1B\xD4\x7F\xA4\xBD\xBD\x1D\xBBv\xED\xE2\xD8\x1E<x\0\x83\xC1\0\x9DN\x87\xB4\xB44\xD6\xBEh\xD1"\x9C?\x7F\x1E\xEF\xDF\xBF\xC7\xA9S\xA7\x86\x8D;c\xC6\f\xF6N\xED\xEB\xEBCee%T*\x15***\xE0r\xB9\xE0p8`\xB1X\xA0\xD1h\xA0P(\x90\x90\x90\x80\xAA\xAA*N\x8C\xFC\xFC|\xB4\xB5\xB5\xB1\xD3U\x8F\xC7\x83s\xE7\xCE!11\x11\xA5\xA5\xA5\x90\xCB\xE5\xAC\xEF\xFE\xFD\xFB\x91\x9A\x9A\x8A\xDB\xB7o\xB3\xB6\x90\x90\x10\x84\x87\x87\xB3\xE5\xE75\xF4\x7FJ@\x94\xCD\xCF\xCF\'\xBD^\xEF\xD3\xFEc\xCF\x89\x88\x88 \xBD^O\x0E\x87\x83\xDE\xBCyC\xAF^\xBD\xA2\xDE\xDE^\xAA\xAB\xAB#\x95J\xE53vvv6577\x13\0*..\xE6\xBCh\xCE\x9A5\x8B\xACV+M\x9D:\x95\xB5\xBDx\xF1\x82\n\x0B\x0B\xE9\xF0\xE1\xC3\xD4\xD5\xD5Ec\xC6\x8C\xF1\x8AY\\\\L\r\r\r$\x91HX\xDB\xE9\xD3\xA7\xC9j\xB5\xD2\xA7O\x9F\xE8\xC9\x93\'d4\x1A\xC9n\xB7\xD3\x8D\x1B7X\xBF7o\xDEPww7uuu\xB1%///`=\x84\x01\xA0\x0B\x84\xAA===\xF8\xF0\xE1\x83\xD7\xF4\xF0\xF6\xED\xDB\xE8\xEC\xECd\xBFXq8\x1C(,,\x84\xCDf\x83B\xA1@WW\x17JJJ\x90\x96\x96\x86\xCE\xCEN\x9F\xB1\x07g3\xD5\xD5\xD5\x18\x18\x18\xC0\xF3\xE7\xCFQWW\x07\xE0{Olhh@uu5\xEB\xDF\xDF\xDF\x8Fg\xCF\x9E\xA1\xB3\xB3\x13\xD5\xD5\xD5>\x9F\xF1\x06\x83\x012\x99\fz\xBD\x9E}q-++\xC3\xBD{\xF7\xA0T*\xE1v\xBB\xD1\xDA\xDA\x8A\xA3G\x8F"++\x8Bm\x17\x14\x14\x04\xA3\xD1\b\x83\xC1\xC0\x96k\xD7\xAE\xA1\xA5\xA5\xE5\x9F]\xC0\xFF \xAE\x87\b\f1\xDB+0DA\x04\x06\xAF \x12\x89\x04\f\xC3\xF8\xFC^U\xC4?\xA4R)\x18\x86\xF1\x99N\xF2\xF2\xE5s`\x18\x06\x91\x91\x91\x181bD@\x0E\xEEOd\xC4\x88\x11\x88\x8C\x8C\x04\xC30\xBC\xBE\xBC\x82(\x14\n\xA4\xA6\xA6B\xADV\x07\xE4\xE0\xFED\xD4j5\x96.]\n\x85B\xC1\xEB\xCB+\x88\\.\xC7\xC2\x85\x0B\xD9$\x9E\xC8\xAF\x13\x17\x17\x07\xADV\xCBy\xE1\x1C\n^A\xA4R)\xE4r\xB9\xCF\xFF\x87\x88\xF8GHH\b\xE4r\xB9_\xE3\xB08R\x0B\fQ\x10\x81\xE1\xD7z\x88B\xA1\xC0\xCA\x95+1q\xE2D\x8E}0\xBDPRR2\xEC:\xC7\xEF\x8ET*EXX\x18\x12\x12\x120s\xE6L\xAFd\xE3\xEC\xD9\xB3\x11\x14\xE4\xDF\xD2\x13\xAF\x97\xDDn\xC7\xB3g\xCF0}\xFAt\xAF\x81\xDD\xE9t\xC2\xE3\xF1\xF85\xBF\xFE]\x91H$\xEC\xF7\xCFJ\xA5\x12S\xA6L\xF1\x1A\xBC{{{a2\x99`\xB7\xDB\xF9\xE3\x81\'\x97%\xFE\xE9sx\x02\xFD\xA7O1\xB9(0\xC4A]`\x88\x82\b\fQ\x10\x81!\n"0DA\x04\x86(\x88\xC0\x10\x05\x11\x18\xA2 \x02C\x14D`\x88\x82\b\x8C\xBF\x01O\xC5\x98\x01\xABf\xE6Y\0\0\0\0IEND\xAEB`\x82',

      xmlFileNames: [],
      xmlGroupNames: [],
      xmlCurrentFileNames: [],

      layerTypePropertyArr: [],
      layerTypePropertyValueArr: [],

      expPropertyArr: [],

      layerArr: [],
      layerParentNameArr: [],

      init: function init() {
        return this;
      },

      extend: function extend(target, source) {
        for (var i in source) {
          target[i] = source[i];
        }return target;
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

      haveSetting: function haveSetting(keyName) {
        return this.setting.haveSetting(this.scriptName, keyName);
      },

      saveSetting: function saveSetting(keyName, value) {
        this.setting.saveSetting(this.scriptName, keyName, value);
      },

      getSetting: function getSetting(keyName) {
        return this.setting.getSetting(this.scriptName, keyName);
      },

      getSettingAsBool: function getSettingAsBool(keyName) {
        return this.getSetting(keyName) === 'true';
      },

      getFileByName: function getFileByName(name) {
        var string = this.scriptFolder.toString() + this.slash + name + '.xml';
        var file = new File(string);
        return file;
      },

      isForceEnglish: function isForceEnglish() {
        var string = this.scriptFolder.toString() + this.slash + 'force_en.txt';
        var file = new File(string);
        return file.exists;
      },

      getImageFolderByName: function getImageFolderByName(name) {
        var string = this.imageFolder.toString() + this.slash + name + '';
        var folder = new Folder(string);
        if (!folder.exists) {
          folder.create();
        }
        return folder;
      },

      getImage: function getImage(groupName, imageName) {
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

      getImageFile: function getImageFile(groupName, imageName) {
        var folder = this.getImageFolderByName(groupName);
        if (!folder.exists) {
          folder.create();
        }
        var string = folder.toString() + this.slash + imageName + '.png';
        var file = new File(string);
        return file;
      },

      getGlobalIndexFromFileName: function getGlobalIndexFromFileName(name) {
        var content = new XML(this.settingsFile.readd());
        var thisIndex = -1;
        this.forEach(content.ListItems, function (item, index) {
          if (item.toString() === name) {
            thisIndex = index;
          }
        });
        return thisIndex;
      },

      openLink: function openLink(url) {
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

      getVersion: function getVersion(scriptname) {
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
      getTimeInfoArr: function getTimeInfoArr(comp) {
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
      swap: function swap(a, b) {
        var tempA = a.text;
        a.text = b.text;
        b.text = tempA;
      },
      lookUpTextInChildren: function lookUpTextInChildren(text, children) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
          if (children[i].text === text) {
            return true;
          }
        }
        return false;
      },

      lookUpInArray: function lookUpInArray(text, arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
          if (arr[i] === text) {
            return true;
          }
        }
        return false;
      },
      lookUpInItem: function lookUpInItem(text, items) {
        var len = items.length;
        for (var i = 1; i <= len; i++) {
          if (items[i].name === text) {
            return [true, items[i]];
          }
        }
        return [false, null];
      },
      deleteIndexAndReload: function deleteIndexAndReload(deleteIndex) {
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
      reloadParentDroplist: function reloadParentDroplist() {
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
      reloadDroplist: function reloadDroplist() {
        this.droplist.removeAll();
        this.gv.removeAll();
        var parentSelection = parseInt(this.getSetting('parentSelection'));
        var groupName = this.xmlGroupNames[parentSelection];

        var settingxml = new XML(this.settingsFile.readd());
        this.xmlFileNames.length = 0;
        this.xmlCurrentFileNames.length = 0;

        var indexArr = [];

        this.forEach(settingxml.ParentGroup, function (item, index) {
          if (item['@groupName'].toString() === groupName) {
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
      cropImage: function cropImage(fi, inImageFileA) {
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

      savePng2: function savePng2(pngPath) {
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

        var isNewItem = this.newItemOrCover === 'newItem';
        var isCover = this.newItemOrCover === 'cover' && this.coverChangeValue === true;
        if (isNewItem || isCover) {
          if (isNewItem) {
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
      savePng: function savePng(pngPath) {
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
          var isNewItem = this.newItemOrCover === 'newItem';
          var isCover = this.newItemOrCover === 'cover' && this.coverChangeValue === true;
          if (isNewItem || isCover) {
            if (isNewItem) {
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

      newLayers: function newLayers(elementXml, comp, options) {
        var layerArr = $.layer(elementXml, options).toLayer(comp);

        return layerArr;
      },

      getXmlFromLayers: function getXmlFromLayers(layers, itemName, sp) {
        var options = {
          isSaveMaterial: sp.saveMaterialValue
        };
        return $.layer(layers, options).toXML(itemName);
      },

      newProperties: function newProperties(xml, selectedLayers, isCleanGroup, isKeyframeOffset) {
        isCleanGroup = isCleanGroup || false;
        isKeyframeOffset = isKeyframeOffset || false;

        var layerXml = new XML(xml);

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

      saveItemToFile: function saveItemToFile(file, xml, position) {
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
  }(), function (sp) {
    __webpack_require__(4);

    sp.extend(sp, {
      forEach: function forEach(xml, callback, context) {
        if (!(xml instanceof XML)) return;
        var i, len;
        for (i = 0, len = xml.children().length(); i < len; i++) {
          if (callback.call(context, xml.child(i), i, xml) === false) {
            break;
          }
        }
      }
    });

    String.prototype.trim = String.prototype.trim || function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };

    Array.prototype.includes = function (value) {
      for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === value) {
          return true;
        }
      }
      return false;
    };

    Array.prototype.forEach = function (callback, context) {
      if (Object.prototype.toString.call(this) === '[object Array]') {
        var i, len;
        for (i = 0, len = this.length; i < len; i++) {
          if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
            if (callback.call(context, this[i], i, this) === false) {
              break;
            }
          }
        }
      }
    };

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
      this.open('w');
      this.write(str);
      this.close();
    };

    File.prototype.readd = function () {
      this.open('r');
      var temp = this.read();
      this.close();
      return temp;
    };

    Array.prototype.pushh = function (str) {
      this.push(str);
      return this;
    };
  }(sp), function (sp) {
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
      var value = valueArr[index];
      if (sp.haveSetting(item) === false) sp.saveSetting(item, value);
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

    !sp.scriptFolder.exists && sp.scriptFolder.create();
    !sp.roamingFolder.exists && sp.roamingFolder.create();
    !sp.materialFolder.exists && sp.materialFolder.create();

    var loc = function loc(string) {
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
        ch: '\u5C42\u5B58\u50A8\u811A\u672CSp_Memory 3.0 @\u79CB\u98CE_\u5C0F\u5F84\n\n\u529F\u80FD\u6DFB\u52A0:\n1.\u9ED8\u8BA4\u5F00\u542F\u9884\u89C8\u52A8\u753B\u529F\u80FD\n2.\u5B58\u50A8\u5C42\u65F6\u9ED8\u8BA4\u5B58\u50A8\u9884\u89C8\u52A8\u753B,\u53EF\u8BBE\u5B9A\u9884\u89C8\u7684\u5E27\u7387\u548C\u5E27\u6570\n3.\u5BFC\u5165\u5BFC\u51FA\u529F\u80FD\u652F\u6301\u9884\u89C8\u52A8\u753B\n3.\u6DFB\u52A0\u7EC4\u7684\u5206\u7C7B-\u6A21\u5757\n\n\u53F3\u952E\u83DC\u5355\u65B0\u589E:\n1.\u9884\u89C8\u5168\u90E8/\u9884\u89C8\u9009\u4E2D\n2.\u65B0\u5EFA\u6A21\u5757\n3.\u5220\u9664\u6A21\u5757\n\n\n\u5C0F\u63D0\u793A:\n1.\u57283.x\u7248\u672C\u524D\u4FDD\u5B58\u7684\u7EC4,\u53EF\u4EE5\u7528"\u53F3\u952E->\u8F85\u52A9\u811A\u672C->\u91CD\u8F7D\u7EC4\u5185\u9884\u89C8\u52A8\u753B"\u6765\u4E3A\u7EC4\u6240\u6709\u5143\u7D20\u8FDB\u884C\u6279\u91CF\u751F\u6210\u9884\u89C8\u52A8\u753B\n2.\u53EF\u4F7F\u7528ctrl\u4E0Eshift\u5BF9\u5143\u7D20\u8FDB\u884C\u81EA\u7531\u9009\u62E9,\u4E4B\u540E\u53F3\u952E->\u9884\u89C8\u9009\u4E2D,\u5373\u53EF\u540C\u65F6\u9884\u89C8\u6240\u6709\u88AB\u9009\u4E2D\u5143\u7D20\u7684\u52A8\u753B\n3.\u5728\u672A\u9009\u4E2D\u4EFB\u4F55\u5143\u7D20\u65F6,\u53F3\u952E->\u9884\u89C8\u5168\u90E8,\u5373\u53EF\u9884\u89C8\u7EC4\u5185\u7684\u5168\u90E8\u5143\u7D20\u7684\u52A8\u753B\n4.\u5728\u8BBE\u7F6E\u7A97\u53E3\u4E2D,\u9009\u4E2D\u4E00\u4E2A\u7EC4,\u4E4B\u540E\u70B9\u51FB"\u526A\u5207\u9009\u4E2D\u7EC4\u5230\u5176\u4ED6\u6A21\u5757",\u53EF\u5C06\u7EC4\u79FB\u52A8\u5230\u5176\u4ED6\u6A21\u5757\u4E2D\n\n\n',
        en: 'Sp_memory 3.0 @smallpath\n                        \nNew Feature:\n1.Enable preview element\n2.Create preview animation while saving layers,you can set the frame rate and frame number\n3.Export/Import group support preview animation\n4.Add module - the group of group\n\nTips:\n1.When your group is saved  before v3.0,you can use "RightClick->Helper scripts->Reload previews of group" to create all the preview animation\n2.Use ctrl key and shift key to select element,then use "RightClick->Preview selected" to preview the animations of selected element at the same time.\n3.When there isn\'t any element being selected, us "RightClick->Preview all" to preview all the animations of group.\n4.To cut the group from its module into another module,use "Cut selected group to other module" in the settings window\n                        \n'
      }
    });

    if (sp.haveSetting('version') === false || sp.getSetting('version') < sp.version) {
      alert(loc(sp.versionUpdateInfo));
      sp.saveSetting('version', sp.version);
    }
  }(sp), function () {
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        var isLayerStyle = prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false;
        var isMaterial = prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false;
        var isAudio = prop.matchName === 'ADBE Audio Group' && prop.propertyGroup(prop.propertyDepth).hasAudio === false;
        var isExtra = prop.matchName === 'ADBE Extrsn Options Group';
        var isPlane = prop.matchName === 'ADBE Plane Options Group';
        var isVector = prop.matchName === 'ADBE Vector Materials Group';
        var shouldRecursiveScan = !(isLayerStyle || isMaterial || isAudio || isExtra || isPlane || isVector);
        if (checkb.value === true) {
          if (prop.propertyType === PropertyType.PROPERTY && prop.expression !== '' && prop.canSetExpression && prop.expressionEnabled === true) {
            global.propArr.push(prop);
            prop.selected = true;
            global.exps.push(prop.name);
            global.comps.add(compindex);
            global.layerTemp.add(ja);
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP) {
            if (shouldRecursiveScan) {
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
            if (shouldRecursiveScan) {
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
            if (shouldRecursiveScan) {
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
  var thisRes = 'Group{\n        orientation:\'column\',\n        alignChildren:[\'left\',\'fill\'],\n        list:DropDownList{preferredSize:[200,25],properties:{items:[\'' + loc(tsp.allComp) + '\',\'' + loc(tsp.activeComp) + '\',\'' + loc(tsp.selectedComp) + '\']}},\n        start:Button{text:\'' + loc(tsp.trans) + '\',preferredSize:[200,50]},\n        group:Group{\n                alignChildren:[\'left\',\'fill\'],\n                checka:Checkbox{text:\'' + loc(tsp.wrongExp) + '\',value:1},\n                lista:DropDownList{properties:{items:[\'Default\',\'English\',\'\u4E2D\u6587\',\'\u65E5\u672C\u8A9E\',\'Common\']},size:[60,25]}\n        }\n        groupa:Group{\n                alignChildren:[\'left\',\'fill\'],\n                checkb:Checkbox{text:\'' + loc(tsp.rightExp) + '\',value:0},\n                about:Button{text:\'' + loc(tsp.about) + '\',size:[70,25]},\n        }\n        groupb:Group{\n                alignChildren:[\'left\',\'fill\'],\n                checkc:Checkbox{text:\'' + loc(tsp.allExp) + '\',value:0},\n                checkFile:Checkbox{text:\'' + loc(tsp.log) + '\',size:[80,10]}\n                }\n         addbtn:Button{text:\'' + loc(tsp.editBtn) + '\',preferredSize:[200,30]}\n        }';
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

/***/ }),
/* 14 */
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


/***/ })
/******/ ]);