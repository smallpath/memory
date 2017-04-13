module.exports = function() {
  var jinWin = new Window('dialog', loc(sp.settingPre))
  var jinRes = `group{
    orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
    guluG:Group{
      orientation:'row',alignment:['fill','fill'],alignChildren:['fill','fill'],
      jinGroup:Group{
        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
        isJin:StaticText{text:'${loc(sp.isEffect)}'}
        isJinSt:StaticText{text:'${loc(sp.jinOne)}',properties:{multiline:1}}
        jin:Panel{
          orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
          _1:Checkbox{text:'${loc(sp._1)}'},
          _2:Checkbox{text:'${loc(sp._2)}'},
          _3:Checkbox{text:'${loc(sp._3)}'},
          _4:Checkbox{text:'${loc(sp._4)}'},
          _5:Checkbox{text:'${loc(sp._5)}'},
          _6:Checkbox{text:'${loc(sp._6)}'},
          _7:Checkbox{text:'${loc(sp._7)}'},
          _8:Checkbox{text:'${loc(sp._8)}'},
          _9:Checkbox{text:'${loc(sp._9)}'},
        }
      },
      delGroup:Group{
        orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
        isJin:StaticText{text:'${loc(sp.cleanProperty)}'},
        isJinSt:StaticText{text:'${loc(sp.jinTwo)}',properties:{multiline:1}},
        del:Panel{
          orientation:'column',alignment:['fill','fill'],alignChildren:['fill','fill'],
          _1:Checkbox{text:'${loc(sp._1)}'},
          _2:Checkbox{text:'${loc(sp._2)}'},
          _3:Checkbox{text:'${loc(sp._3)}',enabled:0},
          _4:Checkbox{text:'${loc(sp._4)}',enabled:0},
          _5:Checkbox{text:'${loc(sp._5)}'},
          _6:Checkbox{text:'${loc(sp._6)}'},
          _7:Checkbox{text:'${loc(sp._7)}'},
          _8:Checkbox{text:'${loc(sp._8)}',enabled:0},
          _9:Checkbox{text:'${loc(sp._9)}',enabled:0},
        }
      },
    },
    oc:Group{
      orientation:'row',alignment:['fill','center'],alignChildren:['center','fill'],
      ok:Button{text:'Ok',preferredSize:[160,30]},
    }
  }`
  var jinGulu = jinWin.add(jinRes)
  for (let i = 1; i <= 9; i++) {
    if (sp.haveSetting('_1_' + i) === false) {
      if (i === 1 || i === 2 || i === 5) {
        sp.saveSetting('_1_' + i, '1')
      } else {
        sp.saveSetting('_1_' + i, '0')
      }
    }
    try {
      jinGulu.guluG.jinGroup.jin['_' + i].value = sp.getSetting('_1_' + i) === '1'
      jinGulu.guluG.jinGroup.jin['_' + i].onClick = function() {
        sp.getSetting('_1_' + i)
        sp.saveSetting('_1_' + i, (jinGulu.guluG.jinGroup.jin['_' + i].value === true) ? '1' : '0')
      }
    } catch (err) { }
  }
  for (let i = 1; i <= 9; i++) {
    if (sp.haveSetting('_2_' + i) === false) {
      sp.saveSetting('_2_' + i, '0')
    }

    try {
      jinGulu.guluG.delGroup.del['_' + i].value = sp.getSetting('_2_' + i) === '1'
      jinGulu.guluG.delGroup.del['_' + i].onClick = function() {
        sp.getSetting('_2_' + i)
        sp.saveSetting('_2_' + i, (jinGulu.guluG.delGroup.del['_' + i].value === true) ? '1' : '0')
      }
    } catch (err) { }
  }
  jinGulu.oc.ok.onClick = function() {
    jinWin.close()
  }
  jinWin.center()
  jinWin.show()
}
