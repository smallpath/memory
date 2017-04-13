(function() {
  var encode = encodeURIComponent
  var decode = decodeURIComponent

  $.layer = function(item, options) {
    return new $.layer.prototype.Init(item, options)
  }

  $.layer.prototype = {
    Init: function(item, options, helperObj) {
      this.item = item

      this.helperObj = helperObj || {}

      $.layer.parseFolderItem(item, options)

      if ($.layer.isType(options, 'Object')) {
        this.isSaveMaterial = options.isSaveMaterial || false
      } else {
        this.isSaveMaterial = false
      }

      return this
    }
  }

  $.layer.extend = function(target, source) {
    for (var i in source) target[i] = source[i]
    return target
  }

  $.layer.parseFolderItem = function(item, options) {
    if ($.layer.isType(options, 'Object') && (item instanceof XML)) {
      if (!($.layer.isType(options.compFolder, 'FolderItem'))) {
        $.layer.compFolder = null
      } else {
        $.layer.compFolder = options.compFolder
      }
      if (!($.layer.isType(options.sourceFolder, 'FolderItem'))) {
        if ($.layer.compFolder !== null) {
          $.layer.sourceFolder = $.layer.compFolder
        } else {
          $.layer.sourceFolder = null
        }
      } else {
        $.layer.sourceFolder = options.sourceFolder
      }
    }
  }

  $.layer.extend($.layer.prototype, {

    getLayerAttr: function(index) {
      var thisLayer = this.item
      var helperObj = this.helperObj

      var text = '<Layer name="' + encode(thisLayer.name) + '"></Layer>'
      var layerInfo = new XML(text)

      layerInfo.type = 'null'
      switch (true) {
        case thisLayer instanceof TextLayer:
          layerInfo.type = 'Text'
          break
        case thisLayer instanceof LightLayer:
          layerInfo.type = 'Light'
          layerInfo.light = thisLayer.lightType
          break
        case thisLayer instanceof ShapeLayer:
          layerInfo.type = 'Shape'
          break
        case thisLayer instanceof AVLayer:
          var mainSource = thisLayer.source.mainSource
          var isNullLayer = thisLayer.nullLayer === true
          var isComp = thisLayer.source instanceof CompItem
          if (mainSource instanceof SolidSource && !isNullLayer && !isComp) {
            layerInfo.type = 'Solid'
            layerInfo.solidColor = mainSource.color
          } else if (mainSource instanceof FileSource && !isNullLayer && !isComp) {
            layerInfo.sound = thisLayer.hasAudio
            if (layerInfo.sound) {
              layerInfo.type = 'VideoWithSound'
            } else {
              layerInfo.type = 'VideoWithoutSound'
            }
          } else if (isComp) {
            layerInfo.type = 'Comp'
          } else if (isNullLayer) {
            layerInfo.type = 'Null'
          }
          break
        case thisLayer instanceof CameraLayer:
          layerInfo.type = 'Camera'
          break
      }

      layerInfo.name = thisLayer.name
      layerInfo['@type'] = layerInfo.type

      var type = layerInfo.type.toString()

      if (type === 'VideoWithSound' || type === 'VideoWithoutSound') {
        layerInfo = this.getMaterial(layerInfo, helperObj, thisLayer)
      }
      if (type === 'Comp') {
        layerInfo = this.getCompLayerAttr(layerInfo, thisLayer, helperObj, thisLayer)
      }
      if (type === 'Text') {
        var isPointText = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).pointText
        var isBoxText = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).boxText
        layerInfo.textType = (isPointText === true) ? 'point' : 'box'
        if (isBoxText === true) {
          layerInfo.boxSize = thisLayer.property('ADBE Text Properties')('ADBE Text Document').valueAtTime(0, false).boxTextSize.toString()
        }
      }

      layerInfo.searchName = thisLayer.name
      layerInfo.label = thisLayer.label
      layerInfo.width = thisLayer.source ? thisLayer.width : 'None'
      layerInfo.height = thisLayer.source ? thisLayer.height : 'None'
      layerInfo.index = index

      layerInfo.parent = (thisLayer.parent === null) ? 'false' : thisLayer.parent.index
      layerInfo.inPoint = thisLayer.inPoint
      layerInfo.outPoint = thisLayer.outPoint
      layerInfo.enabled = thisLayer.enabled
      layerInfo.three = (typeof thisLayer.threeDLayer === 'undefined') ? 'undefined' : thisLayer.threeDLayer
      layerInfo.trackMatteType = (typeof thisLayer.trackMatteType === 'undefined') ? 'undefined' : thisLayer.trackMatteType
      layerInfo.solo = thisLayer.solo
      layerInfo.shy = thisLayer.shy
      layerInfo.collapseTransformation = thisLayer.collapseTransformation
      if (type === 'VideoWithSound' || type === 'Comp') {
        layerInfo.audioEnabled = thisLayer.audioEnabled
      }
      layerInfo.motionBlur = thisLayer.motionBlur
      layerInfo.guideLayer = (typeof thisLayer.guideLayer === 'undefined') ? 'undefined' : thisLayer.guideLayer
      layerInfo.environmentLayer = (typeof thisLayer.environmentLayer === 'undefined') ? 'undefined' : thisLayer.environmentLayer
      layerInfo.adjustmentLayer = (typeof thisLayer.adjustmentLayer === 'undefined') ? 'undefined' : thisLayer.adjustmentLayer
      layerInfo.blendingMode = (typeof thisLayer.trackMatteType === 'undefined') ? 'undefined' : thisLayer.blendingMode
      layerInfo.autoOrient = (typeof thisLayer.autoOrient === 'undefined') ? 'undefined' : thisLayer.autoOrient
      layerInfo.preserveTransparency = (typeof thisLayer.preserveTransparency === 'undefined') ? 'undefined' : thisLayer.preserveTransparency
      try {
        layerInfo.separated = thisLayer('ADBE Transform Group')('ADBE Position').dimensionsSeparated
      } catch (err) { }
      layerInfo.timeRemap = thisLayer.timeRemapEnabled
      layerInfo.stretch = thisLayer.stretch
      layerInfo.startTime = thisLayer.startTime
      layerInfo.ray = thisLayer.containingComp.renderer === 'ADBE Picasso'
      layerInfo.geoType = 'null'
      var isNotNullLayer = type !== 'null' && type !== 'Null'
      if (isNotNullLayer && layerInfo.three.toString() === true && layerInfo.ray.toString() === true) {
        if (type === 'Shape' || type === 'Text') {
          layerInfo.geoType = 'small'
        } else {
          layerInfo.geoType = 'large'
        }
      }
      return layerInfo
    },

    getCompLayerAttr: function(layerInfo, thisLayer) {
      var source = thisLayer.source
      layerInfo.frameDuration = source.frameDuration
      layerInfo.dropFrame = source.dropFrame
      layerInfo.workAreaStart = source.workAreaStart
      layerInfo.workAreaDuration = source.workAreaDuration
      layerInfo.hideShyLayers = source.hideShyLayers
      layerInfo.motionBlur = source.motionBlur
      layerInfo.draft3d = source.draft3d
      layerInfo.frameBlending = source.frameBlending
      layerInfo.preserveNestedFrameRate = source.preserveNestedFrameRate
      layerInfo.preserveNestedResolution = source.preserveNestedResolution
      layerInfo.bgColor = source.bgColor
      layerInfo.resolutionFactor = source.resolutionFactor
      layerInfo.shutterAngle = source.shutterAngle
      layerInfo.shutterPhase = source.shutterPhase
      layerInfo.motionBlurSamplesPerFrame = source.motionBlurSamplesPerFrame
      layerInfo.motionBlurAdaptiveSampleLimit = source.motionBlurAdaptiveSampleLimit
      layerInfo.renderer = source.renderer
      layerInfo.compframeDuration = source.frameDuration
      layerInfo.comppixelAspect = source.pixelAspect
      layerInfo.compframeRate = source.frameRate
      layerInfo.compduration = source.duration
      layerInfo.compwidth = source.width
      layerInfo.compheight = source.height
      layerInfo.compname = encode(source.name)
      layerInfo.comptime = source.time
      return layerInfo
    },

    getMaterial: function(layerInfo, helperObj, thisLayer) {
      var file = layerInfo.file = thisLayer.source.mainSource.file
      if (this.isSaveMaterial === false) return layerInfo

      var hasProperty = helperObj.hasOwnProperty('_' + thisLayer.source.id)
      if (!hasProperty) {
        try {
          helperObj['_' + thisLayer.source.id] = {}
          try {
            var thisFile = new File(file)
            thisFile.open('r')
            thisFile.encoding = 'BINARY'
            var fileContent = thisFile.read()
            thisFile.close()
            layerInfo.fileBin = encode(fileContent)
          } catch (err) { }
        } catch (err) { }
      }

      return layerInfo
    },

    getProperties: function(ref, layerxml, layerInfo) {
      if (!ref) return layerxml

      for (var i = 1; i <= ref.numProperties; i++) {
        var prop = ref.property(i)
        if ((prop.propertyType === PropertyType.PROPERTY)) {
          var canGetValue
          try {
            canGetValue = prop.value.toString()
            canGetValue = true
          } catch (err) {
            canGetValue = false
          }
          var isNotHiddenProp = true
          try {
            if (isNotHiddenProp.matchName !== 'ADBE Marker') {
              prop.setValue(prop.valueAtTime(0, true))
            }
          } catch (r) {
            isNotHiddenProp = false
          }
          var thisBool = isNotHiddenProp || (prop.canSetExpression || prop.matchName === 'ADBE Marker')
          if (thisBool && canGetValue) {
            if (prop.matchName === 'ADBE Marker' && prop.numKeys === 0) { } else {
              try {
                if (prop.matchName === 'ADBE Glo2-0007') {
                  prop.setValue($.layer.glowtype)
                }
              } catch (err) { }
              try {
                $.layer.prototype.addToLastChild(layerxml, new XML($.layer.prototype.getProperty(prop)), prop.propertyDepth, [])
              } catch (err) { }
            }
          }
        } else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP)) {
          var layerStyle = (prop.matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false)
          var layerChild = (prop.propertyGroup(1).matchName === 'ADBE Layer Styles' && prop.canSetEnabled === false && prop.propertyIndex > 1)
          var material = (prop.matchName === 'ADBE Material Options Group' && prop.propertyGroup(prop.propertyDepth).threeDLayer === false)
          var audio = (prop.matchName === 'ADBE Audio Group')
          var geosmall = (prop.matchName === 'ADBE Extrsn Options Group' && layerInfo.geoType !== 'small')
          var geolarge = (prop.matchName === 'ADBE Plane Options Group' && layerInfo.geoType !== 'large')
          var vector = (prop.matchName === 'ADBE Vector Materials Group')
          var motion = (prop.matchName === 'ADBE MTrackers' && prop.numProperties === 0)
          if (layerStyle || material || audio || geosmall || geolarge || vector || motion || layerChild) { } else {
            var propName = prop.name.toString()
            var matchName = prop.matchName.toString()

            if (prop.matchName === 'ADBE Mask Atom') {
              var obj
              var temp
              var text
              try {
                text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '" maskFeatherFalloff="' + prop.maskFeatherFalloff.toString() + '" enabled="' + ((prop.canSetEnabled === false) ? 'None' : prop.enabled).toString() + '"></Group>'
                try {
                  temp = new XML(text)
                  if (temp) {}
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err })
                  obj = {
                    propName: propName,
                    matchName: matchName
                  }
                  $.layer.encode(obj)
                  text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '" maskFeatherFalloff="' + prop.maskFeatherFalloff.toString() + '" enabled="' + ((prop.canSetEnabled === false) ? 'None' : prop.enabled).toString() + '"></Group>'
                }
              } catch (err) {
                // cs4 compatible for mask group
                $.layer.errorInfoArr.push({ line: $.line, error: err })
                text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '"  enabled="' + ((prop.canSetEnabled === false) ? 'None' : prop.enabled).toString() + '"></Group>'
                try {
                  temp = new XML(text)
                  if (temp) {}
                } catch (err) {
                  $.layer.errorInfoArr.push({ line: $.line, error: err })
                  obj = {
                    propName: propName,
                    matchName: matchName
                  }
                  $.layer.encode(obj)
                  text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" maskmode="' + prop.maskMode.toString() + '" inverted="' + prop.inverted.toString() + '" rotoBezier="' + prop.rotoBezier.toString() + '" maskMotionBlur="' + prop.maskMotionBlur.toString() + '" color="' + prop.color.toString() + '"  enabled="' + ((prop.canSetEnabled === false) ? 'None' : prop.enabled).toString() + '"></Group>'
                }
              }
            } else {
              text = '<Group name="' + propName + '" matchName="' + matchName + '" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" enabled="' + ((prop.canSetEnabled === false) ? 'None' : prop.enabled).toString() + '"></Group>'
              try {
                temp = new XML(text)
                if (temp) {}
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err })
                obj = {
                  propName: propName,
                  matchName: matchName
                }
                $.layer.encode(obj)
                text = '<Group name="' + obj.propName + '" matchName="' + obj.matchName + '" isEncoded="true" type="' + prop.propertyType.toString() + '" propertyIndex="' + prop.propertyIndex.toString() + '" enabled="' + ((prop.canSetEnabled === false) ? 'None' : prop.enabled).toString() + '"></Group>'
              }
            }
            try {
              if (prop.matchName === 'ADBE Glo2') {
                try {
                  $.layer.glowtype = prop.property('ADBE Glo2-0007').value
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              }

              try {
                var currentXml = new XML(text)
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err })
              }

              $.layer.prototype.addToLastChild(layerxml, currentXml, prop.propertyDepth, [])
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            arguments.callee(prop, layerxml, layerInfo)
          }
        }
      }

      return layerxml
    },

    addToLastChild: function(xml, str, propertyDepth, arrLen) {
      var length = xml.children().length()
      arrLen.push(length)
      if (length > 0) {
        arguments.callee(xml.child(length - 1), str, propertyDepth, arrLen)
      } else {
        for (var LastCh = 0; LastCh < arrLen.length - propertyDepth; LastCh++) {
          xml = xml.parent()
        }
        xml.appendChild(new XML(str))
        arrLen.length = 0
      }
    },

    getProperty: function(thisProperty) {
      var text
      if (thisProperty.numKeys !== 0) {
        var keyTime = []
        var keyValue = []
        var propi
        var propxml
        if ((thisProperty.valueAtTime(0, true) instanceof Shape === false) && (thisProperty.matchName !== 'ADBE Marker') && (thisProperty.matchName !== 'ADBE Text Document')) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>'
          propxml = new XML(text)
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            keyTime.push(thisProperty.keyTime(propi))
            keyValue.push(thisProperty.keyValue(propi))
          }
          propxml.keyValue = keyValue
          propxml.keyTime = keyTime
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
        } else if (thisProperty.valueAtTime(0, true) instanceof Shape === true) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>'
          propxml = new XML(text)
          propxml.keyValue = 0
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'))
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<shapeValue></shapeValue>'
            var shapexml = new XML(text)
            keyTime.push(thisProperty.keyTime(propi))
            var closed = XML('<closed>' + thisProperty.keyValue(propi).closed + '</closed>')
            var vertices = XML('<vertices>' + thisProperty.keyValue(propi).vertices.toString() + '</vertices>')
            var inTan = XML('<inTan>' + thisProperty.keyValue(propi).inTangents.toString() + '</inTan>')
            var outTan = XML('<outTan>' + thisProperty.keyValue(propi).outTangents.toString() + '</outTan>')
            shapexml.appendChild(closed)
            shapexml.appendChild(vertices)
            shapexml.appendChild(inTan)
            shapexml.appendChild(outTan)
            propxml.keyValue.appendChild(shapexml)
          }
          delete propxml.keyValue.zhanwei
          propxml.keyTime = keyTime
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
        } else if (thisProperty.matchName === 'ADBE Marker') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>'
          propxml = new XML(text)
          propxml.keyValue = 0
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'))
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<markerValue></markerValue>'
            var markxml = new XML(text)
            keyTime.push(thisProperty.keyTime(propi))
            var comment = XML('<comment>' + thisProperty.keyValue(propi).comment + '</comment>')
            var duration = XML('<duration>' + thisProperty.keyValue(propi).duration.toString() + '</duration>')
            var chapter = XML('<chapter>' + thisProperty.keyValue(propi).chapter.toString() + '</chapter>')
            var cuePointName = XML('<cuePointName>' + thisProperty.keyValue(propi).cuePointName.toString() + '</cuePointName>')
            var eventCuePoint = XML('<eventCuePoint>' + thisProperty.keyValue(propi).eventCuePoint.toString() + '</eventCuePoint>')
            var url = XML('<url>' + thisProperty.keyValue(propi).url.toString() + '</url>')
            var frameTarget = XML('<frameTarget>' + thisProperty.keyValue(propi).frameTarget.toString() + '</frameTarget>')
            markxml.appendChild(comment)
            markxml.appendChild(duration)
            markxml.appendChild(chapter)
            markxml.appendChild(cuePointName)
            markxml.appendChild(eventCuePoint)
            markxml.appendChild(url)
            markxml.appendChild(frameTarget)
            propxml.keyValue.appendChild(markxml)
          }
          delete propxml.keyValue.zhanwei
          propxml.keyTime = keyTime
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
        } else if (thisProperty.matchName === 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>'
          propxml = new XML(text)
          propxml.keyValue = 0
          propxml.keyValue.setChildren(new XML('<zhanwei>wa</zhanwei>'))
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            text = '<textValue></textValue>'
            var textxml = new XML(text)
            keyTime.push(thisProperty.keyTime(propi))
            text = XML('<text>' + thisProperty.keyValue(propi).text + '</text>')
            var font = XML('<font>' + thisProperty.keyValue(propi).font.toString() + '</font>')
            var fontSize = XML('<fontSize>' + thisProperty.keyValue(propi).fontSize.toString() + '</fontSize>')
            var applyFill = XML('<applyFill>' + thisProperty.keyValue(propi).applyFill.toString() + '</applyFill>')
            var applyStroke = XML('<applyStroke>' + thisProperty.keyValue(propi).applyStroke.toString() + '</applyStroke>')
            var fillColor = XML('<fillColor>' + ((thisProperty.keyValue(propi).applyFill === true) ? thisProperty.keyValue(propi).fillColor.toString() : 'None').toString() + '</fillColor>')
            var strokeColor = XML('<strokeColor>' + ((thisProperty.keyValue(propi).applyStroke === true) ? thisProperty.keyValue(propi).strokeColor.toString() : 'None').toString() + '</strokeColor>')
            var strokeOverFill = XML('<strokeOverFill>' + thisProperty.keyValue(propi).strokeOverFill.toString() + '</strokeOverFill>')
            var strokeWidth = XML('<strokeWidth>' + thisProperty.keyValue(propi).strokeWidth.toString() + '</strokeWidth>')
            var justification = XML('<justification>' + thisProperty.keyValue(propi).justification.toString() + '</justification>')
            var tracking = XML('<tracking>' + thisProperty.keyValue(propi).tracking.toString() + '</tracking>')
            var pointText = XML('<pointText>' + thisProperty.keyValue(propi).pointText.toString() + '</pointText>')
            var boxText = XML('<boxText>' + thisProperty.keyValue(propi).boxText.toString() + '</boxText>')
            var boxTextSize
            if (thisProperty.keyValue(propi).boxText === true) {
              boxTextSize = XML('<boxTextSize>' + thisProperty.keyValue(propi).boxTextSize.toString() + '</boxTextSize>')
            } else {
              boxTextSize = XML('<boxTextSize>None</boxTextSize>')
            }
            textxml.appendChild(text)
            textxml.appendChild(font)
            textxml.appendChild(fontSize)
            textxml.appendChild(applyFill)
            textxml.appendChild(applyStroke)
            textxml.appendChild(fillColor)
            textxml.appendChild(strokeColor)
            textxml.appendChild(strokeOverFill)
            textxml.appendChild(strokeWidth)
            textxml.appendChild(justification)
            textxml.appendChild(tracking)
            textxml.appendChild(pointText)
            textxml.appendChild(boxText)
            textxml.appendChild(boxTextSize)
            propxml.keyValue.appendChild(textxml)
          }
          delete propxml.keyValue.zhanwei
          propxml.keyTime = keyTime
          propxml.inType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
          propxml.outType = [thisProperty.propertyValueType, thisProperty.propertyValueType].toString()
        }
        if (thisProperty.matchName !== 'ADBE Marker' && thisProperty.matchName !== 'ADBE Text Document') {
          for (propi = 1; propi <= thisProperty.numKeys; propi++) {
            var ease = '<Ease></Ease>'
            var easexml = new XML(ease)
            try {
              easexml.keyInSpatialTangent = thisProperty.keyInSpatialTangent(propi)
              easexml.keyOutSpatialTangent = thisProperty.keyOutSpatialTangent(propi)
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err })
            }
            if (thisProperty.keyInTemporalEase(1).length === 1) {
              easexml.InSpeed = thisProperty.keyInTemporalEase(propi)[0].speed
              easexml.InIn = thisProperty.keyInTemporalEase(propi)[0].influence
              easexml.OutSpeed = thisProperty.keyOutTemporalEase(propi)[0].speed
              easexml.OutIn = thisProperty.keyOutTemporalEase(propi)[0].influence
            } else if (thisProperty.keyInTemporalEase(1).length === 2) {
              easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed]
              easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence]
              easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed]
              easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence]
            } else if (thisProperty.keyInTemporalEase(1).length === 3) {
              easexml.InSpeed = [thisProperty.keyInTemporalEase(propi)[0].speed, thisProperty.keyInTemporalEase(propi)[1].speed, thisProperty.keyInTemporalEase(propi)[2].speed]
              easexml.InIn = [thisProperty.keyInTemporalEase(propi)[0].influence, thisProperty.keyInTemporalEase(propi)[1].influence, thisProperty.keyInTemporalEase(propi)[2].influence]
              easexml.OutSpeed = [thisProperty.keyOutTemporalEase(propi)[0].speed, thisProperty.keyOutTemporalEase(propi)[1].speed, thisProperty.keyOutTemporalEase(propi)[2].speed]
              easexml.OutIn = [thisProperty.keyOutTemporalEase(propi)[0].influence, thisProperty.keyOutTemporalEase(propi)[1].influence, thisProperty.keyOutTemporalEase(propi)[2].influence]
            }
            try {
              easexml.inInterType = thisProperty.keyInInterpolationType(propi)
              easexml.outInterType = thisProperty.keyOutInterpolationType(propi)
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            try {
              easexml.isRoving = thisProperty.keyRoving(propi)
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            propxml.appendChild(easexml)
          }
        }
        if (thisProperty.expression !== '') {
          propxml.exp = encode(thisProperty.expression).toString()
          propxml.expEn = encode(thisProperty.expressionEnabled).toString()
        }
      } else {
        if ((thisProperty.valueAtTime(0, true) instanceof Shape === false) && thisProperty.matchName !== 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="0">' + thisProperty.valueAtTime(0, true).toString() + '</prop>'
          propxml = new XML(text)
          if (thisProperty.expression !== '') {
            propxml.exp = encode(thisProperty.expression).toString()
            propxml.expEn = encode(thisProperty.expressionEnabled).toString()
          }
        } else if (thisProperty.valueAtTime(0, true) instanceof Shape === true) {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>'
          shapexml = new XML(text)
          shapexml.closed = thisProperty.valueAtTime(0, true).closed
          shapexml.vertices = thisProperty.valueAtTime(0, true).vertices.toString()
          shapexml.inTan = thisProperty.valueAtTime(0, true).inTangents.toString()
          shapexml.outTan = thisProperty.valueAtTime(0, true).outTangents.toString()
          if (thisProperty.expression !== '') {
            shapexml.exp = encode(thisProperty.expression).toString()
            shapexml.expEn = encode(thisProperty.expressionEnabled).toString()
          }
          propxml = shapexml
        } else if (thisProperty.matchName === 'ADBE Text Document') {
          text = '<prop matchName="' + thisProperty.matchName.toString() + '" propertyIndex="' + thisProperty.propertyIndex.toString() + '" key="' + thisProperty.numKeys.toString() + '"></prop>'
          textxml = new XML(text)
          textxml.text = ((thisProperty.valueAtTime(0, true).text === undefined) ? 'None' : thisProperty.valueAtTime(0, true).text).toString()
          textxml.font = thisProperty.valueAtTime(0, true).font.toString()
          textxml.fontSize = thisProperty.valueAtTime(0, true).fontSize.toString()
          textxml.applyFill = thisProperty.valueAtTime(0, true).applyFill.toString()
          textxml.applyStroke = thisProperty.valueAtTime(0, true).applyStroke.toString()
          textxml.fillColor = ((thisProperty.valueAtTime(0, true).applyFill === true) ? thisProperty.valueAtTime(0, true).fillColor.toString() : 'None').toString()
          textxml.strokeColor = ((thisProperty.valueAtTime(0, true).applyStroke === true) ? thisProperty.valueAtTime(0, true).strokeColor.toString() : 'None').toString()
          textxml.strokeOverFill = thisProperty.valueAtTime(0, true).strokeOverFill.toString()
          textxml.strokeWidth = thisProperty.valueAtTime(0, true).strokeWidth.toString()
          textxml.justification = thisProperty.valueAtTime(0, true).justification.toString()
          textxml.tracking = thisProperty.valueAtTime(0, true).tracking.toString()
          textxml.pointText = thisProperty.valueAtTime(0, true).pointText.toString()
          textxml.boxText = thisProperty.valueAtTime(0, true).boxText.toString()
          textxml.boxTextSize = ((thisProperty.valueAtTime(0, true).boxText === true) ? thisProperty.valueAtTime(0, true).boxTextSize.toString() : 'None').toString()
          if (thisProperty.expression !== '') {
            textxml.exp = encode(thisProperty.expression).toString()
            textxml.expEn = encode(thisProperty.expressionEnabled).toString()
          }
          propxml = textxml
        }
      }
      return propxml
    },

    getXmlFromLayer: function(index) {
      var thisLayer = this.item

      var layerInfo = this.getLayerAttr(index)

      var layerPropertiesXml = this.getProperties(thisLayer, new XML('<Properties></Properties>'), layerInfo)

      layerInfo.appendChild(layerPropertiesXml)

      return layerInfo
    },

    // recuisive get all xmls from selected layers, support comp layer
    toXML: function(elementName, helperObj) {
      var layers = this.item
      var comp
      var isFirstStage = layers instanceof Array
      if (isFirstStage) {
        comp = layers[0].containingComp
      } else {
        comp = layers[1].containingComp
      }

      elementName = elementName || 'Default'
      helperObj = helperObj || {}
      helperObj['_' + comp.id] = helperObj['_' + comp.id] || {}
      helperObj['elementArr'] = helperObj['elementArr'] || []

      var elementArr = helperObj.elementArr
      var elementxml
      if (isFirstStage) {
        $.layer.willSaveLayers(layers)
        elementxml = new XML('<Element name="' + elementName + '"></Element>')
      } else {
        elementxml = new XML('<Comptent name="' + elementName + '"></Comptent>')
      }

      var options = {
        isSaveMaterial: this.isSaveMaterial
      }

      var loopFunc = function(thisLayer, index) {
        var thisIndex = elementArr.length === 0 ? index + 1 : index
        var xml = $.layer(thisLayer, options).getXmlFromLayer(thisIndex)
        $.layer.didSaveLayer(1)
        var tempLength
        if (thisLayer.source instanceof CompItem) {
          if (helperObj.hasOwnProperty('_' + thisLayer.source.id)) {
            var elementxmltemp = helperObj['_' + thisLayer.source.id]['ele']
            tempLength = elementxmltemp.descendants('Layer').length()
            $.layer.didSaveLayer(tempLength)
            xml.Properties.appendChild(elementxmltemp)
          } else {
            elementArr.push(elementxml)
            var comptentXml = $.layer(thisLayer.source.layers, options, helperObj).toXML(encode(thisLayer.source.name), helperObj)
            tempLength = comptentXml.descendants('Layer').length()
            $.layer.didSaveLayer(tempLength)
            xml.Properties.appendChild(comptentXml)
            elementxml = elementArr.pop()
          }
        }
        elementxml.appendChild(xml)
      }
      if (isFirstStage) {
        $.layer.forEach.call(layers, loopFunc)
        $.layer.didSaveLayers()
      } else {
        $.layer.forEachLayer.call(layers, loopFunc)
      }

      if (!isFirstStage) {
        var cTemp = new XML(elementxml)
        for (var i = 0; i < cTemp.children().length(); i++) {
          cTemp.child(i).setChildren(1)
        }
        helperObj['_' + comp.id]['ele'] = cTemp
      }

      return elementxml
    }

  })

  $.layer.extend($.layer.prototype, {

    newLayer: function(xml, thisComp) {
      var layer

      var type = xml['@type'].toString()
      var name = xml['@name'].toString()
      if (type === 'Solid' || type === 'VideoWithSound' || type === 'VideoWithoutSound' || type === 'Comp') {
        var solidcolor = xml.solidColor.toString().split(',').slice(0, 3)
        if (xml.solidColor.toString() !== '') {
          layer = thisComp.layers.addSolid(solidcolor, decode(name), parseInt(xml.width), parseInt(xml.height), 1)
        } else if (type === 'Comp') {
          layer = this.newComp(xml, thisComp)
        } else if (type === 'VideoWithSound' || type === 'VideoWithoutSound') {
          layer = this.newMaterial(xml, thisComp)
        }
      } else if (type === 'Text') {
        layer = (xml.textType.toString() === 'point') ? thisComp.layers.addText() : thisComp.layers.addBoxText(xml.boxSize.toString().split(',').slice(0, 2))
      } else if (type === 'Shape') {
        layer = thisComp.layers.addShape()
      } else if (type === 'null' || type === 'Null') {
        layer = thisComp.layers.addNull()
      } else if (type === 'Light') {
        layer = thisComp.layers.addLight(decode(name), [0, 0])
        layer.lightType = $.layer.getDistance(layer.lightType, parseInt(xml.light))
      } else if (type === 'Camera') {
        layer = thisComp.layers.addCamera(decode(name), [0, 0])
      }
      try {
        layer.name = decode(name)

        if (layer.index !== parseInt(xml.index)) { layer.moveAfter(thisComp.layer(parseInt(xml.index))) }

        layer.label = parseInt(xml.label.toString())

        if (xml.geoType.toString() === 'small' || xml.geoType.toString() === 'large') {
          layer.containingComp.renderer = 'ADBE Picasso'
        }

        if (xml.inPoint.toString() !== 'undefined') {
          layer.inPoint = parseFloat(xml.inPoint)
        }

        if (xml.outPoint.toString() !== 'undefined') { layer.outPoint = parseFloat(xml.outPoint) }

        if (xml.solo.toString() === 'true') { layer.solo = true }

        if (xml.enabled.toString() === 'false') { layer.enabled = false }

        if (xml.three.toString() === 'true') { layer.threeDLayer = true }

        if (xml.timeRemap.toString() === 'true') {
          layer.timeRemapEnabled = true
        }

        if (xml.collapseTransformation.toString() === 'true' && layer.canSetCollapseTransformation === true) { layer.collapseTransformation = true }

        if (xml.audioEnabled.toString() === 'false') {
          layer.audioEnabled = false
        }

        if (typeof xml.trackMatteType !== 'undefined') {
          layer.trackMatteType = $.layer.getDistance(layer.trackMatteType, parseInt(xml.trackMatteType))
        }

        if (xml.shy.toString() === 'true') {
          layer.shy = true
        }

        if (xml.motionBlur.toString() === 'true') {
          layer.motionBlur = true
        }

        if (xml.guideLayer.toString() === 'true') {
          layer.guideLayer = true
        }

        if (xml.environmentLayer.toString() === 'true') {
          layer.environmentLayer = true
        }

        if (xml.adjustmentLayer.toString() === 'true') {
          layer.adjustmentLayer = true
        }

        if (typeof xml.blendingMode.toString() !== 'undefined') {
          layer.blendingMode = $.layer.getDistance(layer.blendingMode, parseInt(xml.blendingMode))
        }

        if (typeof xml.autoOrient.toString() !== 'undefined') {
          layer.autoOrient = $.layer.getDistance(layer.autoOrient, parseInt(xml.autoOrient))
        }

        if (xml.preserveTransparency.toString() === 'true') {
          layer.preserveTransparency = true
        }

        if (xml.separated.toString() === 'true') {
          layer.property('ADBE Transform Group')('ADBE Position').dimensionsSeparated = true
        }
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err })
      }

      // if (xml['@type'].toString() !== 'VideoWithSound') {
      try {
        $.layer.prototype.newPropertyGroup(xml.Properties, layer)
      } catch (err) {
        $.layer.errorInfoArr.push({ line: $.line, error: err })
      }
      // }

      return layer
    },

    newComp: function(xml, thisComp) {
      var layer
      var thisItem

      if (xml['@type'].toString() === 'Comp') {
        var isComp = false

        if (xml['@type'].toString() === 'Comp') {
          for (var i = 0; i < app.project.numItems; i++) {
            var item = app.project.item(i + 1)

            var isCompItem = item instanceof CompItem
            var isNameEqual = item.name === decode(xml.compname.toString())
            var compXml = xml.Properties.Comptent
            var numLayersInXml = compXml.children().length()
            var isNumberEqual = item.numLayers === numLayersInXml

            if (isCompItem && isNameEqual && isNumberEqual) {
              thisItem = item
              isComp = true
              for (var j = 0; j < item.numLayers; j++) {
                if (item.layer(j + 1).name !== decode(compXml.child(j)['@name'])) {
                  isComp = false
                }
              }
              if (isComp === true) {
                break
              }
            }
          }
        }

        if (isComp === true) {
          layer = thisComp.layers.add(thisItem)
          layer.countForImport = xml.descendants('Layer').length() + 1
        } else {
          try {
            var comp = app.project.items.addComp(
              decode(xml.compname.toString()),
              parseInt(xml.compwidth),
              parseInt(xml.compheight),
              parseFloat(xml.comppixelAspect),
              parseFloat(xml.compduration),
              parseFloat(xml.compframeRate)
            )

            if (comp.id !== app.project.activeItem.id) {
              comp.parentFolder = $.layer.compFolder
            }

            comp.frameDuration = parseFloat(xml.frameDuration)

            if (xml.dropFrame.toString() === 'true') { comp.dropFrame = true }

            comp.workAreaStart = parseFloat(xml.workAreaStart)

            try {
              comp.workAreaDuration = parseFloat(xml.workAreaDuration)
            } catch (err) { }

            if (xml.hideShyLayers.toString() === 'true') { comp.hideShyLayers = true }

            if (xml.motionBlur.toString() === 'true') { comp.motionBlur = true }

            if (xml.draft3d.toString() === 'true') { comp.draft3d = true }

            if (xml.preserveNestedFrameRate.toString() === 'true') { comp.preserveNestedFrameRate = true }

            if (xml.preserveNestedResolution.toString() === 'true') { comp.preserveNestedResolution = true }

            var bgArr = xml.bgColor.toString().split(',')
            comp.bgColor = [parseFloat(bgArr[0]), parseFloat(bgArr[1]), parseFloat(bgArr[2])]

            var resolutionArr = xml.resolutionFactor.toString().split(',')
            comp.resolutionFactor = [parseInt(resolutionArr[0]), parseInt(resolutionArr[1])]

            comp.shutterAngle = parseFloat(xml.shutterAngle)

            comp.shutterPhase = parseFloat(xml.shutterPhase)

            comp.motionBlurSamplesPerFrame = parseInt(xml.motionBlurSamplesPerFrame)

            comp.motionBlurAdaptiveSampleLimit = parseInt(xml.motionBlurAdaptiveSampleLimit)

            if (xml.renderer.toString() !== 'ADBE Advanced 3d') { comp.renderer = xml.renderer.toString() }
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }

          try {
            layer = thisComp.layers.add(comp)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
        }

        try {
          layer.strectch = parseFloat(xml.stretch)

          if (xml.startTime.toString() !== 'undefined') {
            layer.startTime = parseFloat(xml.startTime)
          }
        } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }

        if (isComp === false) {
          try {
            $.layer.prototype.toLayer(comp, xml.Properties.Comptent)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
        }
      }
      return layer
    },

    newMaterial: function(xml, thisComp) {
      var isExist = false
      var waitImportedItem
      var thisItem
      var layer
      if (xml['@type'].toString() === 'VideoWithSound' || xml['@type'].toString() === 'VideoWithoutSound') {
        for (var i = 0; i < app.project.numItems; i++) {
          var item = app.project.item(i + 1)
          var type = typeof item.file
          if (type !== 'undefiend' && item.file !== null) {
            var footageFile = new File(item.file)
            var xmlFile = new File(xml.file.toString())
            var tempFile = new File($.layer.tempFolder.toString() + decode(xmlFile.toString()))
            if (footageFile.toString() === xmlFile.toString() ||
              footageFile.toString() === tempFile.toString()) {
              isExist = true
              thisItem = item
              break
            }
          }
        }
      }

      var isVideo = xml['@type'].toString() === 'VideoWithSound' || xml['@type'].toString() === 'VideoWithoutSound'
      if (isVideo && isExist) {
        layer = thisComp.layers.add(thisItem)
        layer.strectch = parseFloat(xml.stretch)

        if (typeof xml.startTime !== 'undefined') {
          layer.startTime = parseFloat(xml.startTime)
        }
        return layer
      }

      if (isVideo && !isExist) {
        try {
          try {
            var genFileFolder = new Folder($.layer.tempFolder)
            !genFileFolder.exists && genFileFolder.create()

            var file = new File(xml.file.toString())
            var fileIntempFolder = new File($.layer.tempFolder.toString() + $.layer.slash + decode(file.toString()))
            var generatedFile
            if (decode(file.toString())[0] === '~') {
              generatedFile = new File(genFileFolder.toString() + $.layer.slash + 'D' + decode(file.toString()))
            } else {
              // which one is correct?
              // generatedFile = new File(genFileFolder.toString() + decode(file.toString()))
              generatedFile = new File(genFileFolder.toString() + $.layer.slash + decode(file.toString()))
            }
            if (file.exists) {
              waitImportedItem = file
            } else if (fileIntempFolder.exists) {
              waitImportedItem = generatedFile
            } else if (xml.fileBin.toString() !== '') {
              try {
                if (!generatedFile.parent.exists) {
                  generatedFile.parent.create()
                }

                var waitToWrite = decode(xml.fileBin.toString())
                var notExists = !generatedFile.exists
                var genFileLengthNotEqual = generatedFile.exists && generatedFile.length !== waitToWrite.length
                if (notExists || genFileLengthNotEqual) {
                  if (!generatedFile.parent.exists) {
                    generatedFile.create()
                    // correct genFilePath using file.name
                    generatedFile = new File($.layer.tempFolder.toString() + $.layer.slash + decode(file.name.toString()))
                  }

                  generatedFile.open('w')
                  generatedFile.encoding = 'BINARY'
                  generatedFile.write(waitToWrite)
                  generatedFile.close()
                }
                waitImportedItem = generatedFile
              } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            }
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }

          // import waitImportedItemportedItem
          try {
            var im = new ImportOptions()
            im.file = waitImportedItem // will throw errors after ae cc2015
            try {
              im.sequence = false
              im.forceAlphabetical = false
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err })
            layer = thisComp.layers.addSolid([0, 0, 0], 'fail due to cc2015', 100, 100, 1)
            return layer
          }
          if (im.canImportAs(ImportAsType.FOOTAGE)) {
            im.importAs = ImportAsType.FOOTAGE
            var footage = app.project.importFile(im)
            layer = thisComp.layers.add(footage)
            layer.name = decode(xml['@name'])
            try {
              layer.moveAfter(thisComp.layer(parseInt(xml.index)))
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) };
            try {
              layer.strectch = parseFloat(xml.stretch)
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            try {
              if (typeof xml.startTime !== 'undefined') {
                layer.startTime = parseFloat(xml.startTime)
              }
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            layer.source.parentFolder = $.layer.sourceFolder
          } else {
            layer = thisComp.layers.addSolid([0, 0, 0], 'fail due to canImportAs equals to false', 100, 100, 1)
          }
        } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
      }
      if (layer instanceof AVLayer) {
        return layer
      } else {
        layer = thisComp.layers.addSolid([0, 0, 0], 'fail due to not instanceof AVLayer', 100, 100, 1)
        return layer
      }
    },

    newPropertyGroup: function(xml, layers, inTime) {
      for (var addi = 0; addi < xml.children().length(); addi++) {
        var currentXML = xml.child(addi)
        var matchName = currentXML['@matchName'].toString()
        var propName = currentXML['@name'].toString()
        var propIndex = parseInt(currentXML['@propertyIndex'])
        var tagName = currentXML.name().toString()
        // decode name for special characters such as & and <
        if (currentXML['@isEncoded'].toString() !== '') {
          var obj = {
            matchName: matchName,
            propName: propName
          }
          $.layer.decode(obj)
          matchName = obj.matchName
          propName = obj.propName
        }
        var prop

        if (tagName === 'Group') {
          prop = 0 // prop = 0 means there isn't a property which is added

          try {
            // if we can add the property, add it
            if (layers.canAddProperty(matchName)) {
              try {
                prop = layers.addProperty(matchName)

                // why I get the property by the propIndex at previous version of AELayer ?? 
                // var indexProp = layers.property(propIndex)
                var indexProp = prop
                // mask group has special properties, so we should specific them here
                if (indexProp.matchName === 'ADBE Mask Atom') {
                  indexProp.maskMode = $.layer.getDistance(indexProp.maskMode, parseInt(currentXML['@maskmode']))
                  indexProp.inverted = currentXML['@inverted'].toString() !== 'false'
                  indexProp.rotoBezier = currentXML['@rotoBezier'].toString() !== 'false'
                  indexProp.color = currentXML['@color'].toString().split(',').slice(0, 3)
                  indexProp.maskMotionBlur = $.layer.getDistance(indexProp.maskMotionBlur, parseInt(currentXML['@maskMotionBlur']))
                  indexProp.maskFeatherFalloff = $.layer.getDistance(indexProp.maskFeatherFalloff, parseInt(currentXML['@maskFeatherFalloff']))
                }
              } catch (err) {
                $.layer.errorInfoArr.push({ line: $.line, error: err })
              }
            } else if (matchName === 'ADBE Layer Styles') {
              // the property is layer styles
              try {
                var group = currentXML.children()
                var layerStyleArr = []
                var commandNameArr = []
                var i
                for (i = 0; i < group.length(); i++) {
                  layerStyleArr.push(currentXML.child(i)['@matchName'])
                  commandNameArr.push(currentXML.child(i)['@name'])
                }
                // excute the command name by using their names
                for (i = 0; i < layerStyleArr.length; i++) {
                  if (layerStyleArr[i].indexOf('/') !== -1) {
                    if (layers.propertyDepth === 0 && layers.containingComp.id === app.project.activeItem.id) {
                      app.executeCommand(app.findMenuCommandId(commandNameArr[i]))
                    } else if (layers.propertyGroup(layers.propertyDepth).containingComp.id === app.project.activeItem.id) {
                      app.executeCommand(app.findMenuCommandId(commandNameArr[i]))
                    }
                  }
                }
              } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            }
          } catch (err) {
            $.layer.errorInfoArr.push({ line: $.line, error: err })
          }

          // set the enabled property for group
          try {
            var enabled = currentXML['@enabled'].toString()
            if (enabled !== 'None') {
              if (layers.property(propIndex).canSetEnabled === true) {
                if (prop === 0 && enabled === 'false') {
                  // prop === 0, so the real property is indexProp
                  layers.property(propIndex).enabled = false
                } else if (enabled === 'false') {
                  // prop !== 0, so the real property is prop
                  prop.enabled = false
                }
              }
            }
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }

          var isIndexedGroup = layers.propertyType === PropertyType.INDEXED_GROUP
          try {
            if (prop === 0 && isIndexedGroup) {
              indexProp.name = propName
            } else if (isIndexedGroup) {
              layers.property(prop.propertyIndex).name = propName
            }
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }

          try {
            if (currentXML.children().length() > 0) {
              // generating property group
              var isNotMask = matchName !== 'ADBE Mask Parade'
              var isNotEffect = matchName !== 'ADBE Effect Parade'
              var isNotLayerStyles = matchName !== 'ADBE Layer Styles'
              if (prop === 0 && isNotMask && isNotEffect && isNotLayerStyles) {
                $.layer.prototype.newPropertyGroup(currentXML, layers.property(propIndex), inTime)
              } else {
                if (isNotMask && isNotEffect && isNotLayerStyles) {
                  $.layer.prototype.newPropertyGroup(currentXML, prop, inTime)
                } else {
                  $.layer.prototype.newPropertyGroup(currentXML, layers.property(matchName), inTime)
                }
              }
            }
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
        } else if (tagName === 'prop') {
          try {
            // generating prop
            $.layer.prototype.newProperty(currentXML, layers, inTime)
          } catch (err) {
            $.writeln()
            $.layer.errorInfoArr.push({ line: $.line, error: err })
            try {
              $.layer.errorInfoArr.push({
                line: $.line,
                error: {
                  line: err.line,
                  toString: function() {
                    return `[NOTICE] Above error may be ok because of source xml is saved with previous version of AELayer with matchName${currentXML['@matchName'].toString()}`
                  }
                }
              })
            } catch (err) {}
          }

          if (currentXML.exp.toString() !== '') {
            try {
              var expArr = []

              var expProperty = layers.property(matchName)

              expArr.push(expProperty.propertyIndex)
              var len = expProperty.propertyDepth
              for (i = 1; i < len; i++) {
                expArr.push(expProperty.propertyGroup(i).propertyIndex)
              }
              expArr.push(expProperty.propertyGroup(i))

              $.layer.expPropertyArr.push(expArr)

              expProperty.expression = decode(currentXML.exp.toString())
            } catch (err) {
              /* ignore */
              // $.layer.errorInfoArr.push({line:$.line,error:err});
            };
          }
        }
      }
    },

    newProperty: function(xml, layers, inTime) {
      var matchName = xml['@matchName'].toString()
      var isNotText = layers.property(matchName).matchName !== 'ADBE Text Document'
      var isNotMarker = layers.property(matchName).matchName !== 'ADBE Marker'
      var isNotMaskShape = layers.property(matchName).matchName !== 'ADBE Mask Shape'
      var isNotVectorShape = layers.property(matchName).matchName !== 'ADBE Vector Shape'
      var isNotTextAnimatorProp = layers.matchName !== 'ADBE Text Animator Properties'
      var isNotDash = layers.matchName !== 'ADBE Vector Stroke Dashes'
      if (isNotText && isNotMarker && isNotMaskShape && isNotVectorShape) {
        if (!isNotTextAnimatorProp || !isNotDash) {
          if (layers.canAddProperty(matchName)) {
            layers.addProperty(matchName)
          }
        }
        if (xml['@key'].toString() === '0') {
          var value = []
          if (xml.child(0).toString().split(',').length > 1) {
            for (var ia = 0; ia < xml.child(0).toString().split(',').length; ia++) {
              value.push(xml.child(0).toString().split(',')[ia])
            }
          } else {
            value = parseFloat(xml.child(0).toString())
          }
          try {
            layers.property(matchName).setValue(value)
          } catch (err) {
            /* ignore */
            if (err.toString().indexOf('hidden') === -1) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          }
          try {
            var a = layers.property(matchName).propertyValueType.toString()
            if (a.indexOf('17') !== -1 || a.indexOf('21') !== -1 || a.indexOf('22') !== -1) {
              $.layer.layerTypePropertyArr.push(layers.property(matchName))
              $.layer.layerTypePropertyValueArr.push(value)
            }
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
        } else {
          var values = []
          var valueTemp = []
          var times = []
          var div = xml.keyTime.toString().split(',')
          var vas = xml.keyValue.toString().split(',')
          var ib
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia])
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime))
            }
          }
          for (ia = 0; ia < div.length; ia++) {
            for (ib = 0; ib < vas.length / div.length; ib++) {
              valueTemp.push(xml.keyValue.toString().split(',')[ia * vas.length / div.length + ib])
            }
            values.push(valueTemp)
            valueTemp = []
          }
          try {
            layers.property(matchName).setValuesAtTimes(times, values)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          var outIn = []
          var len = xml.keyTime.toString().split(',').length
          for (ia = 0; ia < len; ia++) {
            var myScaleProperty = layers.property(matchName)

            try {
              var type = $.layer.getDistance(myScaleProperty.propertyValueType, parseInt(xml.inType.split(',')[0]))
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }

            var thisChild = xml.child(ia + 4)
            var clamp = parseFloat(thisChild.InIn)
            clamp = $.layer.clampInfluence(clamp)
            var easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp)

            var clampb = parseFloat(thisChild.OutIn)
            clampb = $.layer.clampInfluence(clampb)
            var easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb)

            try {
              var inSpatialArr = thisChild.keyInSpatialTangent.toString().split(',')
              var outSpatialArr = thisChild.keyOutSpatialTangent.toString().split(',')
              if (type === PropertyValueType.TwoD_SPATIAL) {
                myScaleProperty.setSpatialTangentsAtKey(ia + 1, inSpatialArr, outSpatialArr)
              } else if (type === PropertyValueType.ThreeD_SPATIAL) {
                if (inSpatialArr.length === 3 && outSpatialArr.length === 3) {
                  myScaleProperty.setSpatialTangentsAtKey(ia + 1, inSpatialArr, outSpatialArr)
                }
              }
            } catch (err) {
              $.layer.errorInfoArr.push({ line: $.line, error: err })
              $.layer.errorInfoArr.push({
                line: $.line,
                error: {
                  line: err.line,
                  toString: function() {
                    return '[NOTICE] Above error may be ok because of source xml is saved with previous version of AELayer'
                  }
                }
              })
            }
            try {
              if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.TwoD &&
                $.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) !== PropertyValueType.ThreeD) {
                clamp = parseFloat(thisChild.InIn)
                clamp = $.layer.clampInfluence(clamp)
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp)

                clampb = parseFloat(thisChild.OutIn)
                clampb = $.layer.clampInfluence(clampb)

                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb)
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut])
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.TwoD) {
                clamp = parseFloat(thisChild.InIn.toString().split(',')[0])
                clamp = $.layer.clampInfluence(clamp)
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[0]), clamp)

                clampb = parseFloat(thisChild.OutIn.toString().split(',')[0])
                clampb = $.layer.clampInfluence(clampb)
                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[0]), clampb)

                var clamp1 = parseFloat(thisChild.InIn.toString().split(',')[1])
                clamp1 = $.layer.clampInfluence(clamp1)
                var easeIn1 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[1]), clamp1)

                var clampb1 = parseFloat(thisChild.OutIn.toString().split(',')[1])
                clampb1 = $.layer.clampInfluence(clampb1)
                var easeOut1 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[1]), clampb1)

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1], [easeOut, easeOut1])
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), xml.inType.toString().split(',')[0]) === PropertyValueType.ThreeD) {
                clamp = parseFloat(thisChild.InIn.toString().split(',')[0])
                clamp = $.layer.clampInfluence(clamp)
                easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[0]), clamp)

                clampb = parseFloat(thisChild.OutIn.toString().split(',')[0])
                clampb = $.layer.clampInfluence(clampb)
                easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[0]), clampb)

                clamp1 = parseFloat(thisChild.InIn.toString().split(',')[1])
                clamp1 = $.layer.clampInfluence(clamp1)
                easeIn1 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[1]), clamp1)

                clampb1 = parseFloat(thisChild.OutIn.toString().split(',')[1])
                clampb1 = $.layer.clampInfluence(clampb1)
                easeOut1 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[1]), clampb1)

                var clamp2 = parseFloat(thisChild.InIn.toString().split(',')[2])
                clamp2 = $.layer.clampInfluence(clamp2)
                var easeIn2 = new KeyframeEase(parseFloat(thisChild.InSpeed.toString().split(',')[2]), clamp2)

                var clampb2 = parseFloat(thisChild.OutIn.toString().split(',')[2])
                clampb2 = $.layer.clampInfluence(clampb2)
                var easeOut2 = new KeyframeEase(parseFloat(thisChild.OutSpeed.toString().split(',')[2]), clampb2)

                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn1, easeIn2], [easeOut, easeOut1, easeOut2])
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              }
              try {
                var inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(thisChild.inInterType))
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(thisChild.outInterType))
                if (!isNaN(inIn) && !isNaN(outIn)) { myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn) }
              } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              try {
                if ((thisChild.isRoving).toString() === 'true') { myScaleProperty.setRovingAtKey(ia + 1, true) }
              } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          }
        }
      } else if (layers.property(matchName).matchName === 'ADBE Text Document') {
        if (xml['@key'].toString() === '0') {
          try {
            value = []
            var myText = layers.property(matchName).value
            myText.text = xml.text.toString()
            myText.font = xml.font.toString()
            myText.fontSize = parseInt(xml.fontSize)
            myText.applyFill = (xml.applyFill.toString() === 'true')
            myText.applyStroke = (xml.applyStroke.toString() === 'true')
            if (xml.applyFill.toString() === 'true') {
              myText.fillColor = [xml.fillColor.toString().split(',')[0], xml.fillColor.toString().split(',')[1], xml.fillColor.toString().split(',')[2]]
            }
            if (xml.applyStroke.toString() === 'true') {
              myText.strokeColor = [xml.strokeColor.toString().split(',')[0], xml.strokeColor.toString().split(',')[1], xml.strokeColor.toString().split(',')[2]]
              myText.strokeOverFill = xml.strokeOverFill.toString()
              myText.strokeWidth = xml.strokeWidth.toString()
            }
            try {
              myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.justification))
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            var nextText = myText
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          try {
            layers.property(matchName).setValue(myText)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          try {
            layers.property(matchName).setValue(nextText)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
        } else {
          values = []
          valueTemp = []
          times = []
          div = xml.keyTime.toString().split(',')
          vas = xml.keyValue.toString().split(',')
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia])
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime))
            }
          }
          for (ib = 0; ib < div.length; ib++) {
            myText = null
            myText = layers.property(matchName).valueAtTime(times[ib], true)
            myText.text = xml.keyValue.child(ib).text.toString()
            myText.font = xml.keyValue.child(ib).font.toString()
            myText.fontSize = parseInt(xml.keyValue.child(ib).fontSize)
            myText.applyFill = (xml.keyValue.child(ib).applyFill.toString() === 'true')
            myText.applyStroke = (xml.keyValue.child(ib).applyStroke.toString() === 'true')
            if (xml.keyValue.child(ib).applyFill.toString() === 'true') { myText.fillColor = [xml.keyValue.child(ib).fillColor.toString().split(',')[0], xml.keyValue.child(ib).fillColor.toString().split(',')[1], xml.keyValue.child(ib).fillColor.toString().split(',')[2]] }
            if (xml.keyValue.child(ib).applyStroke.toString() === 'true') {
              myText.strokeColor = [xml.keyValue.child(ib).strokeColor.toString().split(',')[0], xml.keyValue.child(ib).strokeColor.toString().split(',')[1], xml.keyValue.child(ib).strokeColor.toString().split(',')[2]]
              myText.strokeOverFill = xml.keyValue.child(ib).strokeOverFill.toString()
              myText.strokeWidth = xml.keyValue.child(ib).strokeWidth.toString()
            }
            try {
              myText.justification = $.layer.getDistance(myText.justification, parseInt(xml.keyValue.child(ib).justification))
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            nextText = myText
            try {
              layers.property(matchName).setValueAtTime(times[ib], myText)
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            try {
              layers.property(matchName).setValueAtTime(times[ib], nextText)
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          }
        }
      } else if (!isNotMarker) {
        if (xml['@key'].toString() === '0') { } else {
          values = []
          valueTemp = []
          times = []
          div = xml.keyTime.toString().split(',')
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia])
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime))
            }
          }
          for (ib = 0; ib < div.length; ib++) {
            var myMarker = new MarkerValue('zhanwei')
            myMarker.comment = xml.keyValue.child(ib).comment.toString()
            myMarker.duration = xml.keyValue.child(ib).duration.toString()
            myMarker.chapter = xml.keyValue.child(ib).chapter.toString()
            myMarker.cuePointName = xml.keyValue.child(ib).cuePointName.toString()
            myMarker.eventCuePoint = xml.keyValue.child(ib).eventCuePoint.toString()
            myMarker.url = xml.keyValue.child(ib).url.toString()
            myMarker.frameTarget = xml.keyValue.child(ib).frameTarget.toString()
            try {
              layers.property(matchName).setValueAtTime(times[ib], myMarker)
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          }
        }
      } else if (!isNotMaskShape || !isNotVectorShape) {
        if (xml['@key'].toString() === '0') {
          var myShape = new Shape()
          var vertsArr = []
          var inTanArr = []
          var outTanArr = []
          var verts = xml.vertices.toString().split(',')
          var inTan = xml.inTan.toString().split(',')
          var outTan = xml.outTan.toString().split(',')
          for (var ic = 0; ic < verts.length / 2; ic++) {
            vertsArr.push([verts[ic * 2], verts[ic * 2 + 1]])
            inTanArr.push([inTan[ic * 2], inTan[ic * 2 + 1]])
            outTanArr.push([outTan[ic * 2], outTan[ic * 2 + 1]])
          }
          myShape.vertices = vertsArr
          myShape.inTangents = inTanArr
          myShape.outTangents = outTanArr
          myShape.closed = (xml.closed.toString() === 'true')
          try {
            layers.property(matchName).setValue(myShape)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
        } else {
          myShape = new Shape()
          vertsArr = []
          inTanArr = []
          outTanArr = []
          times = []
          var shapes = []
          div = xml.keyTime.toString().split(',')
          for (ia = 0; ia < div.length; ia++) {
            if (typeof inTime === 'undefined') {
              times.push(div[ia])
            } else {
              times.push(parseFloat(div[ia]) + parseFloat(inTime))
            }
          }
          for (ic = 0; ic < xml.keyValue.children().length(); ic++) {
            verts = xml.keyValue.child(ic).vertices.toString().split(',')
            inTan = xml.keyValue.child(ic).inTan.toString().split(',')
            outTan = xml.keyValue.child(ic).outTan.toString().split(',')
            for (ib = 0; ib < verts.length / 2; ib++) {
              vertsArr.push([verts[ib * 2], verts[ib * 2 + 1]])
              inTanArr.push([inTan[ib * 2], inTan[ib * 2 + 1]])
              outTanArr.push([outTan[ib * 2], outTan[ib * 2 + 1]])
            }
            myShape = new Shape()
            myShape.vertices = vertsArr
            myShape.inTangents = inTanArr
            myShape.outTangents = outTanArr
            myShape.closed = (xml.keyValue.child(ic).closed.toString() === 'true')
            shapes.push(myShape)
            vertsArr = []
            inTanArr = []
            outTanArr = []
          }
          try {
            layers.property(matchName).setValuesAtTimes(times, shapes)
          } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          outIn = []
          len = xml.keyTime.toString().split(',').length
          for (ia = 0; ia < len; ia++) {
            thisChild = xml.child(ia + 4)
            clamp = parseFloat(thisChild.InIn)
            clamp = $.layer.clampInfluence(clamp)
            easeIn = new KeyframeEase(parseFloat(thisChild.InSpeed), clamp)

            clampb = parseFloat(thisChild.OutIn)
            clampb = $.layer.clampInfluence(clampb)
            easeOut = new KeyframeEase(parseFloat(thisChild.OutSpeed), clampb)

            myScaleProperty = layers.property(matchName)
            try {
              var tempInType = xml.inType.toString().split(',')[0]
              if ($.layer.getDistance(PropertyValueType.TwoD.toString(), tempInType) !== PropertyValueType.TwoD &&
                $.layer.getDistance(PropertyValueType.ThreeD.toString(), tempInType) !== PropertyValueType.ThreeD) {
                try {
                  myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn], [easeOut])
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              } else if ($.layer.getDistance(PropertyValueType.TwoD.toString(), tempInType) === PropertyValueType.TwoD) {
                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn], [easeOut, easeOut])
              } else if ($.layer.getDistance(PropertyValueType.ThreeD.toString(), tempInType) === PropertyValueType.ThreeD) {
                myScaleProperty.setTemporalEaseAtKey(ia + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut])
              }
              try {
                inIn = $.layer.getDistance(myScaleProperty.keyInInterpolationType(ia + 1), parseInt(thisChild.inInterType))
                outIn = $.layer.getDistance(myScaleProperty.keyOutInterpolationType(ia + 1), parseInt(thisChild.outInterType))
                myScaleProperty.setInterpolationTypeAtKey(ia + 1, inIn, outIn)
              } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              try {
                if ((xml.isRoving).toString() === 'true') { myScaleProperty.setRovingAtKey(ia + 1, true) }
              } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
            } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
          }
        }
      }
    },

    toLayer: function(thisComp, xml) {
      xml = xml || this.item
      var isFirstStage
      var len = xml.descendants('Layer').length()

      if ($.layer.numLayers === 0) {
        isFirstStage = true
        $.layer.clearHelperArr()
        app.beginSuppressDialogs()
        $.layer.willCreateLayers(len)
      } else {
        isFirstStage = false
      }

      var layerArr = []

      $.layer.forEachXML(xml, function(item, index) {
        $.layer.numLayers++
        try {
          var thisLayer = $.layer.layerArr[$.layer.layerArr.length] = layerArr[layerArr.length] = $.layer.prototype.newLayer(item, thisComp)
          var shouldCall = !(thisLayer.source instanceof CompItem)
          if (shouldCall) {
            $.layer.didCreateLayer(1)
          } else {
            $.layer.didCreateLayer(thisLayer.countForImport || 1)
          }
        } catch (err) { $.layer.errorInfoArr.push(err) }
        $.layer.layerParentNameArr.push(item.parent.toString())
      }, this)

      if (isFirstStage === true) {
        app.endSuppressDialogs(false)
        $.layer.correctProperty()
        $.layer.fixExpression()
        $.layer.setParent()
        $.layer.writeErrorFile()
        $.layer.clearHelperArr()
        $.layer.didCreateLayers()
      }

      return layerArr
    }

  })

  $.layer.newProperties = function(effectxml, selectedLayers, options) {
    app.beginSuppressDialogs()

    var idArr = [
      'ADBE Mask Parade', 'ADBE Effect Parade', 'ADBE Transform Group',
      'ADBE Material Options Group', 'ADBE Layer Styles', 'ADBE Root Vectors Group',
      'ADBE Text Animators', 'ADBE Light Options Group', 'ADBE Camera Options Group'
    ]

    var idGen = []
    var idDel = []

    var isCleanGroup = options.isCleanGroup
    var isKeyframeOffset = options.isKeyframeOffset

    var newPropertiesSettingArr = options.newPropertiesSettingArr
    var cleanPropertiesSettingArr = options.cleanPropertiesSettingArr

    for (var i = 1; i <= 9; i++) {
      if (newPropertiesSettingArr[i - 1] === 1) {
        idGen.push(idArr[i - 1])
      }
      if (cleanPropertiesSettingArr[i - 1] === 1) {
        idDel.push(idArr[i - 1])
      }
    }

    // Set xml ignored
    for (i = effectxml.children().length(); i >= 0; i--) {
      var xml = effectxml.child(i)
      if (xml.name().toString() === 'Group') {
        var matchName = xml['@matchName'].toString()
        if (matchName === 'ADBE Text Properties') {
          xml.child(0).setLocalName('textignore')
          if (effectxml.children().length() >= 4) {
            $.layer.lookUpInArray(xml.child(3)['@matchName'].toString(), idGen) === false && xml.child(3).setLocalName('ignore')
          }
        }
        if ($.layer.lookUpInArray(matchName, idGen) === false) {
          matchName !== 'ADBE Text Properties' && xml.setLocalName('ignore')
        }
      } else {
        xml.name().toString() === 'Comptent' && xml.setLocalName('compignore')
      }
    }

    //  Delete propertyGroup in layers
    if (isCleanGroup === true) {
      $.layer.forEach.call(selectedLayers, function(layer, index) {
        $.layer.forEachPropertyGroup.call(layer, function(thisGroup, index) {
          if ($.layer.lookUpInArray(thisGroup.matchName, idDel) === true) {
            if (thisGroup.matchName !== 'ADBE Layer Styles') {
              for (var i = thisGroup.numProperties; i > 0; i--) {
                try {
                  thisGroup.property(i).remove()
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              }
            } else {
              for (i = thisGroup.numProperties; i > 0; i--) {
                try {
                  thisGroup.property(i).enabled = false
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              }
            }
          }
          if (thisGroup.matchName === 'ADBE Text Properties') {
            if ($.layer.lookUpInArray(thisGroup.property(4).matchName, idDel) === true) {
              for (i = thisGroup.property(4).numProperties; i > 0; i--) {
                try {
                  thisGroup.property(4).property(i).remove()
                } catch (err) { $.layer.errorInfoArr.push({ line: $.line, error: err }) }
              }
            }
          }
        }) //  ForEachPropertyGroup end
      })
      app.endSuppressDialogs(false)
    }

    $.layer.forEach.call(selectedLayers, function(layer, index) {
      if (isKeyframeOffset === true) {
        $.layer.prototype.newPropertyGroup(effectxml, layer, layer.inPoint)
      } else {
        $.layer.prototype.newPropertyGroup(effectxml, layer)
      }
    })
    $.layer.correctProperty()
    $.layer.fixExpression()
    $.layer.setParent()
  } // Clean group and ignore end

  // correct the value of property which's type is layerIndex or maskIndex
  $.layer.correctProperty = function() {
    $.layer.forEach.call($.layer.layerTypePropertyArr, function(item, index) {
      try {
        item.setValue($.layer.layerTypePropertyValueArr[index])
      } catch (err) { }
    })
  }

  // translate the error expressions to avoid script freezing caused by different language version of AfterEffects
  $.layer.fixExpression = function() {
    var translatedExpPropertyArr = []

    app.beginSuppressDialogs()
    $.layer.forEach.call($.layer.expPropertyArr, function(item, index) {
      try {
        item.expressionEnabled = true
        item.valueAtTime(0, false)
      } catch (eer) {
        translatedExpPropertyArr.push(item)
      };
    })
    app.endSuppressDialogs(false)

    var targetExpArr = []

    for (var i = 0; i < translatedExpPropertyArr.length; i++) {
      var refArr = translatedExpPropertyArr[i]
      var prop = refArr[refArr.length - 1]
      var j = refArr.length - 1
      while (j > 0) {
        prop = prop.property(refArr[j - 1])
        j--
      }
      targetExpArr.push(prop)
    }

    if (typeof $.layer.translate === 'function') {
      targetExpArr.length !== 0 && $.layer.translate(this, targetExpArr)
    }
  }

  // set the parent of layer using Layer.setParentWithJump()
  $.layer.setParent = function() {
    $.layer.forEach.call($.layer.layerArr, function(item, index) {
      try {
        if (!isNaN(parseInt($.layer.layerParentNameArr[index]))) { item.setParentWithJump(item.containingComp.layer(parseInt($.layer.layerParentNameArr[index]))) } else { item.setParentWithJump(item.containingComp.layer($.layer.layerParentNameArr[index])) }
      } catch (err) { }
    })
  }

  $.layer.isType = function(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }

  $.layer.clampInfluence = function(clamp) {
    if (clamp < 0.1) {
      clamp = 0.1
    } else if (clamp >= 100) {
      clamp = 100
    }
    return clamp
  }

  $.layer.arrayIndexOf = function(arr, item) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === item) { return i }
    }
    return -1
  }

  $.layer.forEachXML = function(xml, callback, context) {
    if (!(xml instanceof XML)) return
    var i,
      len
    for (i = 0, len = xml.children().length(); i < len; i++) {
      if (callback.call(context, xml.child(i), i, xml) === false) {
        break
      }
    }
  }

  $.layer.forEach = function(callback, context) {
    if (Object.prototype.toString.call(this) === '[object Array]') {
      var i,
        len
      for (i = 0, len = this.length; i < len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break // or return;
          }
        }
      }
    }
  }

  $.layer.forEachLayer = function(callback, context) {
    if (Object.prototype.toString.call(this) === '[object LayerCollection]') {
      var i,
        len
      for (i = 1, len = this.length; i <= len; i++) {
        if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
          if (callback.call(context, this[i], i, this) === false) {
            break // or return;
          }
        }
      }
    }
  }

  $.layer.forEachPropertyGroup = function(callback, context) {
    var i,
      len
    for (i = 1, len = this.numProperties; i <= len; i++) {
      if (callback.call(context, this.property(i), i, this) === false) {
        break
      }
    }
  }

  $.layer.lookUpInArray = function(text, arr) {
    var len = arr.length
    for (var i = 0; i < len; i++) {
      if (arr[i] === text) { return true }
    }
    return false
  }

  $.layer.getDistance = function(a, b) {
    return parseInt((a.toString().substring(0, 2) - b.toString().substring(0, 2))) * 100 + parseInt(b)
  }

  $.layer.tempFolder = new Folder(new File($.fileName).parent.toString())
  $.layer.slash = '/'

  $.layer.numLayers = 0
  $.layer.layerTypePropertyArr = []
  $.layer.layerTypePropertyValueArr = []
  $.layer.expPropertyArr = []
  $.layer.layerArr = []
  $.layer.layerParentNameArr = []
  $.layer.errorInfoArr = []

  $.layer.clearHelperArr = function() {
    $.layer.numLayers = 0
    $.layer.layerTypePropertyArr = []
    $.layer.layerTypePropertyValueArr = []
    $.layer.expPropertyArr = []
    $.layer.layerArr = []
    $.layer.layerParentNameArr = []
    $.layer.errorInfoArr = []
  }

  $.layer.writeErrorFile = function() {
    if ($.layer.errorInfoArr.length === 0) return
    var str = ''
    $.layer.forEach.call($.layer.errorInfoArr, function(item, index) {
      if (!(item.error)) {
        str += new Date().toLocaleString() + '\tCatched-Line# ' + item.line + '\t without error detail'
        return
      }
      str += new Date().toLocaleString() + '\tCatched-Line# ' + item.line + '\tHappened-Line# ' + item.error.line.toString() + '\t' + item.error.toString() + '\r\n'
    })
    var file = new File($.layer.tempFolder.toString() + $.layer.slash.toString() + 'error.txt')
    writeLn('Log ' + $.layer.errorInfoArr.length + ' errors in error.txt')
    file.writee(str)
  }

  $.layer.translate = function() {}
  $.layer.willSaveLayers = function() {}
  $.layer.didSaveLayer = function() {}
  $.layer.didSaveLayers = function() {}
  $.layer.didCreateLayer = function() {}
  $.layer.willCreateLayers = function() {}
  $.layer.didCreateLayers = function() {}

  $.layer.encodedArr = ['amp;', 'lt;', 'gt;', 'quot;', 'apos;']
  $.layer.decodedArr = ['&', '<', '>', '"', "'"]

  $.layer.encode = function(obj) {
    $.layer.forEach.call($.layer.decodedArr, function(item, index) {
      var reg = new RegExp(item, 'g')
      for (var j in obj) {
        obj[j] = obj[j].replace(reg, $.layer.encodedArr[index])
      }
    })
  }

  $.layer.decode = function(obj) {
    $.layer.forEach.call($.layer.encodedArr, function(item, index) {
      var reg = new RegExp(item, 'g')
      for (var j in obj) {
        obj[j] = obj[j].replace(reg, $.layer.decodedArr[index])
      }
    })
  }

  $.layer.countLayers = function(layers, isFirstStage, helperObj) {
    isFirstStage = isFirstStage || false
    helperObj = helperObj || {}
    var count = 0
    var startIndex = isFirstStage ? 0 : 1
    var maxLength = isFirstStage ? layers.length : layers.length + 1
    for (var i = startIndex; i < maxLength; i++) {
      count++
      var layer = layers[i]
      if (layer.source instanceof CompItem) {
        var id = layer.source.id
        if (helperObj[id]) {
          count += layer.source.numLayers
        } else {
          helperObj[id] = true
          count += $.layer.countLayers(layer.source.layers, false, helperObj)
        }
      }
    }

    return count
  }

  $.layer.name = 'AE Layer library'
  $.layer.version = 1.0
  $.layer.email = 'smallpath2013@gmail.com'

  $.layer.prototype.Init.prototype = $.layer.prototype
  return $.layer
})()
