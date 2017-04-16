module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  globals: {
    "sp": true,
    "$": true,
    "Panel": true,
    "Folder": true,
    "GridView": true,
    "Window": true,
    "app": true,
    "File": true,
    "prompt": true,
    "alert": true,
    "XML": true,
    "confirm": true,
    "loc": true,
    "CompItem": true,
    "ScriptUI": true,
    "Socket": true,
    "ImportOptions": true,
    "ImportAsType": true,
    "cout": true,
    "clearOutput": true,
    "writeLn": true,
    "PropertyType": true,
    "Language": true,
    "system": true,
    "TextLayer": true,
    "LightLayer": true,
    "ShapeLayer": true,
    "AVLayer": true,
    "SolidSource": true,
    "FileSource": true,
    "CameraLayer": true,
    "Shape": true,
    "KeyframeEase": true,
    "PropertyValueType": true,
    "MarkerValue": true,
    "PurgeTarget": true,
    "memoryGlobal": true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': ['error', 'never'],
    'no-return-assign': 0,
    'no-extend-native': 'off',
    'no-unused-expressions': 'off',
    'no-caller': 'off',
    'no-mixed-operators': 'off',
    'no-template-curly-in-string': 'off',
    'new-cap': 'off',
    'no-multi-str': 'off',
    'no-useless-escape': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
