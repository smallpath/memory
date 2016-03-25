/**
	脚本UI解析器 UIParser
	
	作者：阿木亮 & 水果硬糖
	
	日期：2015/9/9
	
	此解析器模仿jquery语法，用来实现脚本界面（UI），样式（css）和功能函数的分离
	
	示例代码：
	//脚本界面部分：
		var json = {
			win: {type:'window', text:'hello', properties:{resizeable:true}, children: {
				exit: {type:'button', text:'exit'},	
				buttonNum: {type:'button', text:'buttonNum'},
			}}
		};
		
	//创建UI：
		var win = this instanceof Panel ? _(this).addUI(json.win.children)[0] : _.newWindow(json)[0];
	//样式部分：
		_('.button').style({size:[100,100]});

	//功能部分：
		_('[id=exit]')[0].onClick = function() {
			this.parent.add("button{text:'added'}");
			this.parent.layout.layout(1);
		};
		_('.button').find('#buttonNum')[0].onClick = function() {
			var c = _('.button');
			alert(c.length)
		};

		_().each(function(e){e.onResizing = function() {
			this.layout.resize();
		}});
		_('#win').each(function(e){e.show();});
		
	代码示例2：
	#include 'UIParser.jsx'//这句话是将解析器导入进来，引号里面是你的解析器路径，这里是一个相对路径

	var _ = UIParser(this);
	//先定义控制界面的信息
	var UIJson = {
		newWin : {type:'window', properties:{resizeable:true}, children:{
			btn1 : {type:'button', align:'fill_top', text:'button1'},
			txt1 : {type:'edittext', align:'fill_top', text:'edittext1'},
			txt2 : {type:'edittext', align:'fill_top', text:'edittext1'},
			txt3 : {type:'edittext', align:'fill_top', text:'edittext1'},
		}}
	}

	//创建窗口
	var win = _.newWindow(UIJson)[0];

	_(win).find('#btn1')[0].onClick = function() {alert('btn1')}
	_(win).find('.edittext').setAttr('text', 'hehe');

	_('*').layout();
	win.onResizing = function() {
		this.layout.resize();
	}

	win.show();
	win.onResizing();
		
	解析器提供了一个全局变量“_”对应于jquery的“$”，下面是对应的函数和属性
	
	函数：
		_(selector) selector:选择器，若为空，则返回_.windows
		_.createUI(UIJson) 创建UI函数，可以用来创建窗口型和面板型界面
		_.newWindow(UIJson) 创建窗口
		_.addUI(UIJson, parent) 添加UI函数
		_(selector).find(selector) 同_(selector)
		_(selector).style(style) style:样式json,为界面添加样式
		_(selector).each(command) command:为每一个过滤元素执行的函数
		_(selector).addUI(UIJson[, parent]) 添加UI函数，如果parent为空，默认为调用该函数的对象添加
		......
		
	属性：
		_.global 相当于this，当前脚本global环境，面板型时指向面板
		_.windows 所有通过解析器创建的窗口，面板型时包含主面板

*/
//为了数据安全，改为构造器或者说函数，不直接作为全局变量使用（在面板型脚本与窗口型间会产生影响，导致窗口型脚本出错）
function UIParser(global) {
var _ = global._ = function(selector) {
	if(_.isUI(selector.type)) {
		return _.extend([selector], _.proto);
	}
	return _.proto.find(selector);
}
_.global = global;

_.root = {
	children : [],
};
_.windows = _.root.children;
_.extend = function(target, source) {//give the source to target
	for(var i in source) target[i] = source[i];
	return target;
};
_.dir = function(obj) {
	var str = '';
	for(var i in obj) str += i + ' : ' + typeof(obj[i]) + '\n';
	return str;
}
_.removeWin = function(id) {//用解析器创建的窗口关闭时一律调用此函数
	for(var i = 0; i < _.windows.length; i++) {
		if(_.windows[i].id == id) _.windows.splice(i,1);
	}
}

_.help = function() {
	var str = '解析器:(假定var _ = UIParser(this);)\n';
	str += '_.global 为解析器工作的全局对象\n';
	str += '_.root.children/_.windows 数组，存放用解析器生成的UI或窗口\n';
	str += '_.newWindow(winJson) 参数：winJson 控制生成窗口对象		生成一个窗口，不显示，返回这个窗口\n';
	str += '_.removeWin(id) 参数：id 字符串id	当窗口被关闭时，或者UI被删除时，如果曾经存放在_.windows中，此函数可以通过id从_.windows中删掉对应项\n';
	str += '_.layout() 这个函数不能直接这样执行，但是可以更改这个函数，来定义默认布局方式\n';
	str += '***************************************************************************\n';
	str += '下面是解析对象的函数：\n';
	str += 'find(selector) 参数: selector 选择器 从解析对象中根据选择器找到新的解析对象\n';
	str += 'filter(selector) 参数: selector 选择器 从解析对象中根据选择器筛选对象\n';
	str += 'style(styleJson) 参数: styleJson 控制style的对象 从解析对象中根据选择器找到新的解析对象\n';
	str += 'each(fn) 参数: fn 函数 对解析出的每一个对象应用这个函数\n';
	str += 'setAttr(prop, value) 参数: prop 属性名，value 值 	设置解析对象第一项的指定属性\n';
	str += 'getAttr(prop) 参数: prop 属性名 	得到解析对象第一项的指定属性\n';
	str += 'children(selector) 获得解析对象每一项的子对象\n';
	str += 'parent() 获得解析对象第一项的父对象\n';
	str += 'on(event, fn, useCapture) 参数: event 事件字符串，fn 函数，useCapture 是否捕获阶段执行	为解析对象每一项添加监听事件\n';
	str += 'exe(fn, arguments) 参数: fn 函数，arguments 参数数组	为解析对象中的每一项执行fn函数\n';
	str += 'addUI(UIJson) 参数: UIJson 控制UI的对象 	对解析对象第一项添加指定UI，并返回第一个UI项\n';
	str += 'first() 解析对象的第一个\n';
	str += 'last() 解析对象的最后一个\n';
	str += 'eq(index) 参数: index 序号 找到指定序号下的解析对象\n';
	str += 'layout() 将对象重新布局，为默认布局方式，用户可以自定义_.layout函数\n';
	str += 'remove() 移除对象\n';
	str += 'empty() 移除所有\n';
	str += '***************************************************************************\n';
	str += '下面是解析器的扩展函数：\n';
	str += 'aeUI函数：\n';
	str += 'treeview{}	树形图函数\n';
	str += 'ae工程函数：\n';
	str += 'project{}	针对ae的函数\n';
	str += '其他辅助函数：\n';
	str += 'JSON{}	json辅助对象，内有parse和stringify函数\n';
	str += 'file{}	与文件相关的函数\n';
	str += 'array{}	数组函数\n';
	str += 'check{}	与检查相关的函数\n';
	str += 'extend(target, source)	参数: target 目标对象，source 源对象	将源对象的成员赋给目标对象\n';
	str += 'dir(obj)	参数: obj 对象		将指定对象的成员列出，返回字符串\n';
	str += 'help() 返回帮助信息\n';
	str += 'alertHelp() 弹出帮助信息\n';
	str += '***************************************************************************\n';
	str += "示例代码：\
//脚本界面部分：\
var json = {\
	win: {type:'window', text:'hello', properties:{resizeable:true}, children: {\
		exit: {type:'button', text:'exit'},	\
		buttonNum: {type:'button', text:'buttonNum'},	\
	}}\
};\
\
//创建UI：\
var win = this instanceof Panel ? _(this).addUI(json.win.children)[0] : _.newWindow(json)[0];\
\
//样式部分：\
_('.button').style({size:[100,100]});\
\
//功能部分：\
_('[id=exit]')[0].onClick = function() {\
	this.parent.add(\"button{text:'added'}\");\
	this.parent.layout.layout(1);\
};\
_('.button').find('#buttonNum')[0].onClick = function() {\
	var c = _('.button');\
	alert(c.length)\
};\
\
_().each(function(e){e.onResizing = function() {\
	this.layout.resize();\
}});\
_('#win').each(function(e){e.show();});"
	return str;
}
//
_.proto = {//这里的函数将赋给返回的解析器对象
	help : function() {
		var str = '解析器对象:\n';
		str += 'find(selector) 参数: selector 选择器 从解析对象中根据选择器找到新的解析对象\n';
		str += 'filter(selector) 参数: selector 选择器 从解析对象中根据选择器筛选对象\n';
		str += 'style(styleJson) 参数: styleJson 控制style的对象 从解析对象中根据选择器找到新的解析对象\n';
		str += 'each(fn) 参数: fn 函数 对解析出的每一个对象应用这个函数\n';
		str += 'setAttr(prop, value) 参数: prop 属性名，value 值 	设置解析对象第一项的指定属性\n';
		str += 'getAttr(prop) 参数: prop 属性名 	得到解析对象第一项的指定属性\n';
		str += 'children(selector) 获得解析对象每一项的子对象\n';
		str += 'parent() 获得解析对象第一项的父对象\n';
		str += 'on(event, fn, useCapture) 参数: event 事件字符串，fn 函数，useCapture 是否捕获阶段执行	为解析对象每一项添加监听事件\n';
		str += 'exe(fn, arguments) 参数: fn 函数，arguments 参数数组	为解析对象中的每一项执行fn函数\n';
		str += 'addUI(UIJson) 参数: UIJson 控制UI的对象 	对解析对象第一项添加指定UI，并返回第一个UI项\n';
		str += 'first() 解析对象的第一个\n';
		str += 'last() 解析对象的最后一个\n';
		str += 'eq(index) 参数: index 序号 找到指定序号下的解析对象\n';
		str += 'layout() 将对象重新布局，为默认布局方式，用户可以自定义_.layout函数\n';
		str += 'remove() 移除对象\n';
		str += 'empty() 移除所有\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	find : function(selector, recursive) {//find函数用来返回一个递归匹配后的数组，并且将_.proto的函数也给这个数组
		var matchs = [], elements = ('length' in this)? this : [_.root];
		if(!selector) return _.extend(elements , _.proto);
		
		//选择器为选择器表达式
		if(typeof selector == 'string') {
			var selectors = _.formalSelector(selector);//正规化选择器
			for(var i =0; i < selectors.length; i++) {
				var match = elements;
				var process = _.parserSelector(selectors[i]);//解析选择器
				for(var j =0; j < process.length; j++) {//逐步执行
					if(!process[j][3] && _.proto[process[j][4]]) {
						match = _.proto[process[j][4]].call(match, process[j][5]);//如果有:标记执行过滤操作
					}else {
						match = _.findElementsByProp(match, process[j][0], process[j][1], process[j][2]);
					}
				}
				matchs = _.merge(match, matchs);
			}
		}
		//选择器为函数
		else if(typeof selector == 'function') {
			if(!recursive) recursive = 1;
			matchs = _.findElementsByFn(elements, selector, recursive);
		}

		return _.extend(matchs, _.proto);
	},
	filter : function(selector) {
		var matchs = [], elements = ('length' in this)? this : [_.root];
		if(!selector) return _.extend(elements , _.proto);
		
		//选择器为选择器表达式
		if(typeof selector == 'string') {
			var selectors = _.formalSelector(selector);//正规化选择器
			for(var i =0; i < selectors.length; i++) {
				var match = elements;
				var process = _.parserSelector(selectors[i]);//解析选择器
				for(var j =0; j < process.length; j++) {//逐步执行
					if(!process[j][3] && _.proto[process[j][4]]) {
						match = _.proto[process[j][4]].call(match, process[j][5]);//如果有:标记执行过滤操作
					}else {
						match = _.findElementsByProp(match, process[j][0], process[j][1]);
					}
				}
				matchs = _.merge(match, matchs);
			}
		}
		//选择器为函数
		else if(typeof selector == 'function') {
			matchs = _.filterElementsByFn(elements, selector);
		}

		return _.extend(matchs, _.proto);
	},
	style : function(style, target) {
		if(!target) target = this;
		for(var i = 0; i < target.length; i++) {
			for(var j in style) {
				if(target[i].type == j) _.proto.style(style[j], [target[i]]);
				else target[i][j] = style[j];
			}
		}
	},
	each : function(command) {for(var i = 0; i < this.length; i++) command(this[i]);},//command is a function
	setAttr : function(prop, value) {this.each(function(e){e[prop] = value;});},
	getAttr : function(prop) {if(this.length) return this[0][prop];},
	children : function(selector) {return this.find(selector?selector:'>*');},
	parent : function() {if(this.length > 0 && this[0].parent) return this[0].parent;else return _.extend([], _.proto);},
	on : function(event, fn, useCapture) {this.each(function(e){e.addEventListener(event, fn, useCapture);});},
	exe : function(fn, arguments) {this.each(function(e){e[fn].apply(e, arguments);})},
	addUI : function(){return _.addUI.apply(this[0], arguments);},
	first : function() {return _.extend([this[0]], _.proto);},
	last : function() {return _.extend([this[this.length-1]], _.proto);},
	eq : function(index) {if(index < this.length && index >=0) {return _.extend([this[index]], _.proto);}else {return _.extend([], _.proto);}},
	layout : function() {this.each(function(e) {_.layout(e);});},
	remove : function() {this.each(function(e) {e.parent.remove(e);});},
	empty : function() {this.children().remove();},
};
/*************************functions for createUI****************************************************/
_.createUI = function(UIJson) {//创建UI
	if(!UIJson) return;
	var ISPANEL = global instanceof Panel;
	if(ISPANEL) {
		var _newElement = _.addUI(UIJson, global);
		_.root.children.push(global);
		global.layout.layout(true);
		return _newElement;
	}else {
		return _.newWindow(UIJson);
	}
}

_.newWindow = function(UIJson) {//添加窗口
	if(!UIJson) return;
	var newWindows = [];
	for(var i in UIJson) {
		var json = UIJson[i];
		if(_.isWindow(UIJson[i].type)) {
			//create window
			var s = json.type;
			if(json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
			var newWindow = _.root.children[_.root.children.length] = new Window(s);
			newWindows.push(newWindow);
			if(!json.id) newWindow.id = i;
			//add other properties for newWindow
			for(var j in json) {
				if(j == 'type' || j == 'properties' || j == 'children') continue;
				newWindow[j] = json[j];
			}
			//create children for newWindow
			if(json.children) _.addUI(json.children, newWindow);
		}
	}
	return _.extend(newWindows, _.proto);
}

_.addUI = function(UIJson, parent) {//为parent添加UI
	if(!UIJson) return;
	if(!parent) parent = this;
	
	var newItem = [];
	for(var i in UIJson) {
		var json = UIJson[i];
		if(_.isElement(json.type)) {
			//create element
			var s = json.type;
			if(json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}';
			var newElement = parent.add(s);
			if(!json.id) newElement.id = i;
			//add other properties for newElement
			for(var j in json) {
				if(j == 'type' || j == 'properties' || j == 'children') continue;
				newElement[j] = json[j];
			}
			newItem.push(newElement);
			//create children for newElement
			if(_.isContainer(json.type) && json.children) arguments.callee(json.children, newElement);
		}
	}
	return _.extend(newItem, _.proto);
}

_.isWindow = function(type) {//判断是否为window元素
	var winType = [
		'window', 'palette', 'dialog',
		'Window', 'Palette', 'Dialog'
	];
	var len = winType.length;
	for(var i = 0; i < len; i++) {
		if(type == winType[i]) return true;
	}
	return false;
}

_.isContainer = function(type) {//判断是否为容器
	var winType = [
		'window', 'palette', 'dialog', 'group', 'panel', 'tabbedpanel', 'treeview','dropdownlist', 'listbox', 'listitem', 'tab', 'node',
		'Window', 'Palette', 'Dialog', 'Group', 'Panel', 'TabbedPanel', 'Treeview','DropDownList', 'ListBox', 'ListItem', 'Tab', 'Node'
	];
	var len = winType.length;
	for(var i = 0; i < len; i++) {
		if(type == winType[i]) return true;
	}
	return false;
}

_.isElement = function(type) {//判断是否是window元素外的其他UI元素
	var winType = [
		'panel', 'tabbedpanel', 'tab', 'group', 'button', 'checkbox', 'dropdownlist', 'edittext', 'flashplayer', 'iconbutton', 'image', 'item', 'listbox', 'listitem', 'progressbar', 'radiobutton', 'scrollbar', 'slider', 'statictext', 'treeview', 'tab', 'node',
		'Panel', 'TabbedPanel', 'Tab', 'Group', 'Button', 'CheckBox', 'DropDownList', 'EditText', 'FlashPlayer', 'IconButton', 'Image', 'Item', 'ListBox', 'ListItem', 'ProgressBar', 'RadioButton', 'Scrollbar', 'Slider', 'StaticText', 'Treeview', 'Tab', 'Node'
	];
	var len = winType.length;
	for(var i = 0; i < len; i++) {
		if(type == winType[i]) return true;
	}
	return false;
}

_.isUI = function(type) {//判断是否为UI元素
	if(_.isWindow(type) || _.isElement(type)) return true;
	return false;
}
/**********************functions for find*********************************************************/
_.findElementsByProp = function(elements, prop, value, recursive) {
	var matchs = [];
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].children) var atoms = elements[i].children;
		else if(elements[i].items) var atoms = elements[i].items;
		else continue;
		var match = [];
		for(var j = 0; j < atoms.length; j++) {
			if(atoms[j][prop] && (value == '' || atoms[j][prop].toString() == value))
				match.push(atoms[j]);
			if(recursive && (atoms[j].children || atoms[j].items)) {
				var temp = arguments.callee([atoms[j]], prop, value, 1);
				match = _.merge(temp, match);
			}
		}
		matchs = _.merge(match, matchs);
	}
	return matchs;
}
_.findElementsByFn = function(elements, fn, recursive) {
	var match = [];
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].children) var atoms = elements[i].children;
		else if(elements[i].items) var atoms = elements[i].items;
		else continue;
		for(var j = 0; j < atoms.length; j++) {
			if(fn(atoms[j])) match.push(atoms[j]);
			if(recursive && (atoms[j].children || atoms[j].items)) {
				var temp = arguments.callee(atoms[j].children, fn, 1);
				match = _.merge(temp, match);
			}
		}
	}
	return match;
}
_.filterElementByProp = function(elements, prop, value) {
	var matchs = [];
	for(var i = 0; i < elements.length; i++) {
		if(elements[i][prop] && (value == '' || elements[i][prop].toString() == value))
			matchs.push(elements[i]);
	}
	return matchs;
}
_.filterElementByFn = function(elements, fn) {
	var matchs = [];
	for(var i = 0; i < elements.length; i++) {
		if(fn(elements[i])) matchs.push(elements[i]);
	}
	return matchs;
}
_.formalSelector = function(selector) {//正规化选择器，去掉所有空格，多余字母和多余标记符，得到并列选择器，这时每个选择器中的每个标记符均有效
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
}
_.parserSelector = function(selector) {//解析单个的选择器，返回一个表示过程的数组
	var str, sign, content, prop, value, func, param, recursive = 1, doFind, process = [];//recursive是否递归，doFind是否查找，否则过滤操作
	
	var parts = selector.replace(/(?=[\#\.\[\:\>\*])/g, '@').replace(/^\@/, '').split('@');//将选择器根据标记分开
	
	for(var i = 0; i < parts.length; i++) {
		if(parts[i] == '>') {//当出现>的时候find函数将不会递归
			recursive = 0;
			i++;
		}
		//初始化
		sign = parts[i][0];
		content = parts[i].substr(1);
		prop = value = func = param = '';
		doFind = 1;
		//判断
		switch(sign) {
			case '*' : prop = 'type';break;
			case '#' : prop = 'id', value = content;break;
			case '.' : prop = 'type', value = content;break;
			case '[' : {
				var p = content.split('=');
				prop = p[0];
				if(p.length == 2) value = p[1];
			};break;
			case ':' : {
				var fn = content.split('(');
				func = fn[0];
				if(fn.length == 2) param = fn[1];
				doFind = 0;
			}
		}
		process.push([prop, value, recursive, doFind, func, param]);
		recursive = 1;
	}

	return process;
}
_.merge = function(newArray, oldArray) {//合并两个数组，并且去掉重复元素
	var temp = [];
	var b = 1;
	for(var i = 0; i < newArray.length; i++) {
		for(var j = 0; j < oldArray.length; j++) {
			if(newArray[i] == oldArray[j]) {
				b = 0;
				break;
			}
		}
		if(b) temp.push(newArray[i]);
	}
	return oldArray.concat(temp);
}
/**********************layout functions*********************************************************/
_.layout = function(e) {//默认布局方式
	e.margins = 0;
	e.spacing = 5;
	if(e.align) {
		switch(e.align){
			case 'fill' :
			case 'fill_fill' : e.alignment = ['fill', 'fill']; break;
			
			case 'center' :
			case 'center_center' : e.alignment = ['center', 'center']; break;
			
			case 'left_fill' :
			case 'left' : e.alignment = ['left', 'fill']; break;
			case 'center_fill' : e.alignment = ['center', 'fill']; break;
			case 'right_fill' :
			case 'right' : e.alignment = ['right', 'fill']; break;
			
			case 'fill_top' :
			case 'top' : e.alignment = ['fill', 'top']; break;
			case 'fill_center' : e.alignment = ['fill', 'center']; break;
			case 'fill_bottom' :
			case 'bottom' : e.alignment = ['fill', 'bottom']; break;
			
			case 'left_center' : e.alignment = ['left', 'center']; break;
			case 'right_center' : e.alignment = ['right', 'center']; break;
			case 'center_top' : e.alignment = ['center', 'top']; break;
			case 'center_bottom' : e.alignment = ['center', 'bottom']; break;
			
			case 'left_top' : e.alignment = ['left', 'top']; break;
			case 'left_bottom' : e.alignment = ['left', 'bottom']; break;
			case 'right_top' : e.alignment = ['right', 'top']; break;
			case 'right_bottom' : e.alignment = ['right', 'bottom']; break;
		}
	}
}
_.extend(_.windows, _.proto);
/**********************other functions*********************************************************/
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
}*/
_.JSON = {//直接copy过来的代码
	help : function() {
		var str = 'JSON:\n';
		str += 'parse(strJSON)	参数: strJSON json字符串	将一个json字符串转为json对象\n';
		str += 'stringify(JSON)	参数: JSON json对象		将一个json对象转为json字符串\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
 	parse: function(strJSON) { return eval('(' + strJSON + ')'); },
	stringify: (function () {
	  var toString = Object.prototype.toString;
	  var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
	  var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
	  var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
	  var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
	  return function stringify(value) {
	   if (value == null) {
	    return 'null';
	   } else if (typeof value === 'number') {
	    return isFinite(value) ? value.toString() : 'null';
	   } else if (typeof value === 'boolean') { 
	    return value.toString();
	   } else if (typeof value === 'object') {
	    if (typeof value.toJSON === 'function') {
	     return stringify(value.toJSON());
	    } else if (isArray(value)) {
	     var res = '[';
	     for (var i = 0; i < value.length; i++)
	      res += (i ? ', ' : '') + stringify(value[i]);
	     return res + ']';
	    } else if (toString.call(value) === '[object Object]') {
	     var tmp = [];
	     for (var k in value) {
	      if (value.hasOwnProperty(k))
	       tmp.push(stringify(k) + ': ' + stringify(value[k]));
	     }
	     return '{' + tmp.join(', ') + '}';
	    }
	   }
	   return '"' + value.toString().replace(escRE, escFunc) + '"';
	  };
	 })()
}
_.xml = {
	help : function() {
		var str = 'xml:\n';
		str += 'read(xmlFile)	参数: xmlFile xml文件	读取xml文件，返回一个XML对象\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	read: function (xmlFile) {//读取xml文件，返回一个XML对象
		xmlFile.open("r");
		var xmlString = xmlFile.read();
		var myXML = new XML(xmlString);
		xmlFile.close();
		
		return myXML;
	},
};

_.folder = {
	create: function (path) {//创建文件夹，返回Folder对象（文件夹路径）
		var newFolder = new Folder(path);
		newFolder.create();
		
		return newFolder;
	},
	remove: function (folder, option) {//删除文件夹（文件夹路径，模式）这个因为懒还没写完，呵呵
		switch(option) {
			case 0 : {
				
			}
			case 1 : {
				
			}
			default: {
				folder.remove();
			}
		}
	}
};

_.file = {
	help : function() {
		var str = 'file:\n';
		str += 'read(path)	参数: path 路径字符串	读取文本文件，返回String对象\n';
		str += 'create(path， text)	参数: path 路径字符串，text 内容字符串		创建文本文件，返回File对象\n';
		str += 'getFileFromFolder(folder, format)	参数: folder 文件夹，format 格式如\'png|jpg\'		从文件夹获取文件\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	read: function (file) {//读取文本文件，返回String对象（文本文件路径）
		file.open("r");
		var myString = file.read();
		file.close();
		
		return myString;
	},
	create: function (path, text) {//创建文本文件，返回File对象（文本文件路径，文本内容）
		var newFile = new File(path);
		newFile.open('w');
		newFile.encoding = 'UTF-8';
		if(text != null) {
			newFile.write(text);
		}
		newFile.close();
		
		return newFile;
	},
	getFileFromFolder: function (folder, format) {//从文件夹获取文件（数组，文件夹，格式(例如'png|jpg')）
		var array = [];
		gfff(array, folder, format);
		return array;
		function gfff(array, folder, format) {
			var pathFiles = folder.getFiles();
			for(var i = 0; i < pathFiles.length; i++) {
				if (pathFiles[i] instanceof Folder){
					if(pathFiles[i].name.match(/^\(.*\)$/)) {
						continue;
					}
					arguments.callee(array, pathFiles[i], format);
				}else {
					if(format == null) {
						continue;
					}
					if(eval("pathFiles[i].name.match(/\.(" + format + ")$/)")) {
						var newItem = array.push(pathFiles[i]);
						newItem.parent = folder;
					}
				}
			}
		}
	},
};

_.treeview = {
	help : function() {
		var str = 'treeview:\n';
		str += 'addListFormFolder(node, folder, format)	参数: node 节点， folder 文件夹，format 格式如\'png|jpg\'	从文件夹创建树形图\n';
		str += 'removeEmptyNode(node)	参数: node 节点		从指定节点开始遍历，删除没有item的节点,\n';
		str += 'getPathFormNode(node, sign)	参数: node 节点，sign 连接符字符串	从指定节点开始遍历，根据树形图生成路径\n';
		str += 'expandAllNode(node)	参数: node 节点		从指定节点开始遍历，展开所有节点\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	addListFromFolder: function (node, folder, format) {//从文件夹创建树形图（节点，文件夹，格式(例如'png|jpg')）
		var pathFiles = folder.getFiles();
		for(var i = 0; i < pathFiles.length; i++) {
			if (pathFiles[i] instanceof Folder){
				if(pathFiles[i].name.match(/^\(.*\)$/)) {
					continue;
				}
				var newNode = node.add('node', File.decode(pathFiles[i].name));
				newNode.source = pathFiles[i];
				arguments.callee(newNode, pathFiles[i], format);
			}else {
				if(format == null) {
					//node.add('item', File.decode(pathFiles[i].name));
					continue;
				}
				if(eval("pathFiles[i].name.match(/\.(" + format + ")$/)")) {
					var newItem = node.add('item', File.decode(pathFiles[i].name));
					newItem.source = pathFiles[i];
					/*var imageFile = File(pathFiles[i].path + '/' + eval("pathFiles[i].name.replace(/(" + format + ")$/,'')") + 'png');
					if(imageFile.exists) {
						newItem.image = imageFile;
					}*/
				}
			}
		}
	},
	removeEmptyNode: function (node) {//删除没有item的节点(节点)
		for(var len = node.items.length, i = len - 1; i >= 0; i--) {
			if(node.items[i].type == 'node') {
				arguments.callee(node.items[i]);
				if(node.items[i].items.length == 0) {
					node.remove(node.items[i]);
				}
			}
		}
	},
	getPathFromNode: function (node, sign) {//根据树形图生成路径(节点，连接符)
		var myPath = sign;
		if(node.parent != null && node.parent.type == 'node') {
			myPath = arguments.callee(node.parent, sign) + node.parent.text + sign;
		}
		return myPath;
	},
	expandAllNode: function (node) {//展开所有节点（节点）
		node.expanded = 1;
		for(var i = 0; i < node.items.length; i++) {
			if(node.items[i].type == 'node') {
				arguments.callee(node.items[i]);
			}
		}
	},
	findItem: function(fn) {

	}
};

_.dropdownlist = {
	addItem: function (list, array) {//下拉列表添加项目（下拉列表，数组）
		for(var i = 0; i < array.length; i++) {
			if(array[i] == null) {
				list.add('separator');
			}else {
				list.add('item', array[i]);
			}
		}
		return list;
	},
};

_.project = {
	help : function() {
		var str = 'project:\n';
		str += 'getActiveComp()	如果当前项为合成，返回合成，否则返回false\n';
		str += 'getSelectedLayers()	获取选中的图层，返回图层数组，否则返回false\n';
		str += 'findLayer(name[, comp])	参数: name 图层名称，comp 合成	根据名称找到对应图层，否则返回false\n';
		str += 'getItemById(id)	参数: id 数字id		通过item的id获取对应item，否则返回false\n';
		str += 'lookItemInProjectPanel(item)	参数: item 合成		在窗口中找到并选中项目\n';
		str += 'looklayerInComp(layer)	参数: layer 图层	显示合成并选中图层\n';
		str += 'allowAccessFile()	保证ae允许写入文件并访问网络，否则返回false\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	getActiveComp: function () {//如果当前项为合成，返回合成，否则返回false
		var thisComp = app.project.activeItem;
		if(thisComp instanceof CompItem){
			return thisComp;
		}
		return null;
	},
	getSelectedLayers: function () {//获取选中的图层，返回图层数组，否则返回false
		var thisComp = app.project.activeItem;
		if(!(thisComp instanceof CompItem) || thisComp.selectedLayers.length == 0){
			return false;
		}
		return thisComp.selectedLayers;
	},
	findLayer : function(name, comp) {//根据名称找到对应图层，否则返回false
		//找到指定名称的图层
		if(!comp) var comp = app.project.activeItem;
		if(!(comp instanceof CompItem)) return false;
		
		var l = comp.layers;
		if(l.length == 0) return false;
		
		for(var i = 1; i <= l.length; i++) {
			if(l[i].name == name) return l[i];
		}
		return false;
	},
	getItemById: function (id) {//通过item的id获取对应item，否则返回false (id)
		for(var i = 1; i <= app.project.numItems; i++) {
			if(app.project.item(i).id == parseInt(id)) {
				return app.project.item(i);
			}
		}
	
		return false;
	},
	lookItemInProjectPanel: function (item) {//在窗口中找到并选中项目 (项目)
		for(var i = 1; i <= app.project.numItems; i++) {
			if(app.project.item(i).selected) {
				app.project.item(i).selected = 0;
			}
		}
		item.selected = 1;
	},
	looklayerInComp: function (layer) {//在显示合成并选中图层 (图层)
		var myComp = layer.containingComp;
		if(parseInt(app.version) > 9) {//因为cs4不支持openInViewer()函数
			myComp.openInViewer();
		}
		var sl = myComp.selectedLayers;
		for(var i = 0; i < sl.length; i++) {
			sl[i].selected = 0;
		}
		layer.selected = 1;
	},
};

_.app = {
	allowAccessFile : function() {//保证ae允许写入文件
		if (isSecurityPrefSet()) return true;
		alert ('脚本正在请求文件写入或访问网络，请到"首选项->常规"确保"允许脚本写入文件和访问网络"一项被勾选');	
		try{
			app.executeCommand(2359);
		}catch (e) {
			alert(e);
		}
		if (isSecurityPrefSet()) {
			return true;
		}else {
			return false;
		}
	
		function isSecurityPrefSet() {//是否可以写入文件
			try{
				var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
				return (securitySetting == 1);
			}catch(e){
				return (securitySetting == 1);
			}
		}
	},
	getOS : function() {
		if($.os.indexOf( 'Windows' ) > -1) return 'windows';
		else if($.os.indexOf( 'Mac' ) > -1) return 'Mac';
		else return '';
	}
};

_.window = {
	resize: function (window) {//自动改变布局大小（窗口）
		window.layout.layout(true);
		window.layout.resize();
		window.onResizing = window.onResize = function () {
			this.layout.resize();
		}
	},
};	

_.array = {
	help : function() {
		var str = 'array:\n';
		str += 'invert(array)	参数: array 数组	数组倒序，不改变原数组，返回一个新数组\n';
		str += 'random(array)	参数: array 数组	数组顺序打乱，不改变原数组，返回一个新数组\n';
		str += 'find(array)	参数: array 数组，item 要寻找的值	从一个数组里面匹配某一项,找到返回序号，否则返回-1\n';
		str += 'merge(array1, array2)	参数: array1,array2 数组	将两个数组合并并去掉重复项，返回新数组\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	invert: function (array) {//数组倒序，不改变原数组，返回一个新数组（数组）
		var newArray = new Array;
		for(var i = 0; i < array.length; i++) {
			newArray[i] = array[array.length - 1 - i];
		}
		return newArray;
	},
	random: function (array) {//数组顺序打乱，不改变原数组，返回一个新数组（数组）
		var newArray = new Array;
		for(var i = 0; i < array.length; i++) {
			var start = Math.round(Math.random() * newArray.length);
			newArray.splice(start, 0, array[i]);
		}
		return newArray;
	},
	find : function(array, item) {//从一个数组里面匹配某一项,找到返回序号，否则返回-1
		for(var i = 0; i < array.length; i++) {
			if(array[i] == item) return i;
		}
		return -1;
	},
	merge : function(array1, array2) {//合并两个数组，并且去掉重复元素
		var temp = [];
		var b = 1;
		for(var i = 0; i < array1.length; i++) {
			for(var j = 0; j < array2.length; j++) {
				if(array1[i] == array2[j]) {
					b = 0;
					break;
				}
			}
			if(b) temp.push(array1[i]);
		}
		return array2.concat(temp);
	}
};

_.check = {
	help : function() {
		var str = 'check:\n';
		str += 'isNumber(str)	参数: str 字符串	检验是否为数字，是返回数值，否则返回0\n';
		str += 'help() 返回帮助信息\n';
		str += 'alertHelp() 弹出帮助信息\n';
		return str;
	},
	isNumber: function (str) {//检验是否为数字，否则返回0（字符串）
		var myNum = parseFloat(str);
		if(isNaN(myNum)) {
			return 0;
		}else {
			return myNum;
		}
	},

};

//弹出帮助信息
_.alertHelp = UIParser.alertHelp;
for(var i in _) {
	_[i].alertHelp = _.alertHelp;
}

return _;
};


UIParser.help = function() {
	var str = '脚本UI解析器 UIParser\n作者：阿木亮 & 水果硬糖\n日期：2015/8/12\n此解析器模仿jquery语法，用来实现脚本界面（UI），样式（css）和功能函数的分离，并提供了一些实用的辅助函数\n\n';
	str += 'UIParser(global)	参数：global为指定将UIParser作为谁的下一级，通常为全局对象，如window，global，this\n';
	str += 'UIParser.help() 返回帮助信息\n';
	str += 'UIParser.alertHelp() 弹出帮助信息\n';
	str += '用法：\n';
	str += '#include \'UIParser1.0.jsx\'//此为解析器路径\n';
	str += 'var _ = UIParser(this);\n';
	str += 'alert(_.help());\n';
	str += '_.alertHelp();\n';

	return str;
}
UIParser.alertHelp = function() {
	if(this.help) alert(this.help());
	else alert('No Help!');
}















