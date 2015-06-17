// ==UserScript==
// @name         Shepherd
// @namespace    https://github.com/lachok
// @version      0.0.0
// @description  Bug report capturing tool
// @include      https://*
// @author       You
// @match        http://tampermonkey.net/index.php?version=3.10.109&ext=dhdg&updated=true
// @grant        none
// ==/UserScript==

/* global jQuery */

//if (window.top != window.self) {  //-- Don't run on frames or iframes
//    console.log('Tampermonkey:Shepherd: Not supposed to run in frames/iframes');
//    return;
//}


if(typeof(jQuery) === 'undefined') {
	console.log('Shepherd requries jQuery. Skipping...');
	return;
}

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
var attachToAnchors = {
	actionType: 'clicked link',
	selector: 'a',
	events: 'click',
	attributesExtractor: function($element) {
		return {
			href: $element.attr('href'),
			title: $element.attr('title'),
			text: $element.text()
		};
	}
};

var attachToInputs = {
	actionType: 'entered text',
	selector: 'input, textarea',
	events: 'change',
	attributesExtractor: function($element) {
		var value = $element.val();
		if($element.attr('type') === 'password') {
			value = '********';
		}
		return {
			value: value
		};
	}
};

var attachToDropdowns = {		
	actionType: 'selected option',
	selector: 'select',
	events: 'change',
	attributesExtractor: function($element) {
		return {};
	}
};

module.exports = [attachToAnchors, attachToInputs, attachToDropdowns];
},{}],4:[function(require,module,exports){

module.exports = function($, actionTypes, shepherdUi) {
	
	var Modernizr = Modernizr || {};
	Modernizr.localstorage = Modernizr.localstorage || 'localStorage' in window && window.localStorage !== null;
		
	var currentPage = {
		url: window.location.href,
		title: document.title,
		actions: []
	};
	
	console.log("Loading shepherd...");
	if(Modernizr.localstorage) {
		console.log("Local storage is supported.");
		
		attachActionTypes(actionTypes);
		
		attachToForms();		
		
		showSummary();
	
		window.addEventListener("beforeunload", function (e) {
			saveCurrentPage();
		});
		
	} else {
		console.log("Local storage is not supported.");
	}
	
	function attachActionTypes(actionTypes) {
		
		var makeActionHandler = function(actionType) {
		    return function () {
				var action = actionType.attributesExtractor($(this));
				action.actionType = actionType.actionType;
				
				currentPage.actions.push(action);
		    };
		};
		
		// attach actionTypes
		for(var i = 0; i < actionTypes.length; i++) {
			var actionType = actionTypes[i];
			$(actionType.selector).on(actionType.events, makeActionHandler(actionType));
		}
	}
	
	function attachToForms() {
		$('form').submit(function() {
			var $this = $(this);
			
			var action = {
				actionType: 'submitted form',
				source: $this.data('focussed')
			};
			currentPage.actions.push(action);
		});
		
		$('form').focus(function(event) {
			$(this).data('focussed', $(event.target));
		});
	}
	
	function showSummary() {
		if(shepherdUi) {
			var pages = [];
			if(typeof(window.localStorage["Shepherd.pages"]) !=='undefined') {
				pages = JSON.parse(window.localStorage["Shepherd.pages"]);
			}
			shepherdUi.showSummary(pages);
		}
	}
	
	function saveCurrentPage() {
		var pages = [];
		if(typeof(window.localStorage["Shepherd.pages"]) !=='undefined') {
			pages = JSON.parse(window.localStorage["Shepherd.pages"]);
		}
		pages.push(currentPage);
		pages.splice(0, pages.length - 5);
		window.localStorage["Shepherd.pages"] = JSON.stringify(pages);
	}
	
	function logUserActionsToConsole() {
		var userActions = JSON.parse(window.localStorage["Shepherd.pages"]);
		console.log(userActions);
	}
		
};
},{}],5:[function(require,module,exports){
/* global jQuery */

var template = require('./templates/shepherd.ui.tree');
var actionTypes = require('./shepherd.actionTypes');
var ui = require('./shepherd.ui')(jQuery, template);
var core = require('./shepherd.core')(jQuery, actionTypes, ui);
},{"./shepherd.actionTypes":3,"./shepherd.core":4,"./shepherd.ui":6,"./templates/shepherd.ui.tree":7}],6:[function(require,module,exports){
module.exports = function($, template) {	
	
	function applyTreeBehaviour() {
	    $('.shepherd-summary-tree li.parent_li > span').on('click', function (e) {
	        var children = $(this).parent('li.parent_li').find(' > ul > li');
	        if (children.is(":visible")) {
	            children.hide('fast');
	            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
	        } else {
	            children.show('fast');
	            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
	        }
	        e.stopPropagation();
	    });
	}
	
	function injectCSS() {
		console.log("Injecting Shepherd tree CSS...");
		
		var style = ".shepherd-summary-tree{min-height:20px;padding:19px;margin-bottom:20px;background-color:#fbfbfb;border:1px solid #999;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.shepherd-summary-tree li{list-style-type:none;margin:0;padding:10px 5px 0;position:relative}.shepherd-summary-tree li::after,.shepherd-summary-tree li::before{content:'';left:-20px;position:absolute;right:auto}.shepherd-summary-tree li::before{border-left:1px solid #999;bottom:50px;height:100%;top:0;width:1px}.shepherd-summary-tree li::after{border-top:1px solid #999;height:20px;top:25px;width:25px}.shepherd-summary-tree li span{-moz-border-radius:5px;-webkit-border-radius:5px;border:1px solid #999;border-radius:5px;display:inline-block;padding:3px 8px;text-decoration:none}.shepherd-summary-tree li.parent_li>span{cursor:pointer}.shepherd-summary-tree>ul>li::after,.shepherd-summary-tree>ul>li::before{border:0}.shepherd-summary-tree li:last-child::before{height:30px}.shepherd-summary-tree li.parent_li>span:hover,.shepherd-summary-tree li.parent_li>span:hover+ul li span{background:#eee;border:1px solid #94a0b4;color:#000}";
		
		var styleNode = document.createElement('style');
	    styleNode.innerHTML = style;
	    document.body.appendChild(styleNode);
		
		/*
		.tree {
		    min-height:20px;
		    padding:19px;
		    margin-bottom:20px;
		    background-color:#fbfbfb;
		    border:1px solid #999;
		    -webkit-border-radius:4px;
		    -moz-border-radius:4px;
		    border-radius:4px;
		    -webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.05);
		    -moz-box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.05);
		    box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.05)
		}
		.tree li {
		    list-style-type:none;
		    margin:0;
		    padding:10px 5px 0 5px;
		    position:relative
		}
		.tree li::before, .tree li::after {
		    content:'';
		    left:-20px;
		    position:absolute;
		    right:auto
		}
		.tree li::before {
		    border-left:1px solid #999;
		    bottom:50px;
		    height:100%;
		    top:0;
		    width:1px
		}
		.tree li::after {
		    border-top:1px solid #999;
		    height:20px;
		    top:25px;
		    width:25px
		}
		.tree li span {
		    -moz-border-radius:5px;
		    -webkit-border-radius:5px;
		    border:1px solid #999;
		    border-radius:5px;
		    display:inline-block;
		    padding:3px 8px;
		    text-decoration:none
		}
		.tree li.parent_li>span {
		    cursor:pointer
		}
		.tree>ul>li::before, .tree>ul>li::after {
		    border:0
		}
		.tree li:last-child::before {
		    height:30px
		}
		.tree li.parent_li>span:hover, .tree li.parent_li>span:hover+ul li span {
		    background:#eee;
		    border:1px solid #94a0b4;
		    color:#000
		}
		*/
	}
	
	
	return {
		showSummary: function(pages) {
						
			injectCSS();
			var locals = {pages: pages};
				
			$('body').append(template(locals));
			
			console.log("Rendering Shepherd tree...");
			applyTreeBehaviour();
		}
	};
		
};
},{}],7:[function(require,module,exports){
var jade = require('../../lib/jade.runtime');
module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Object, pages, undefined) {
buf.push("<div class=\"shepherd-summary-tree\"><ul>");
// iterate pages
;(function(){
  var $$obj = pages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var page = $$obj[$index];

buf.push("<li class=\"parent_li\"><span title=\"Collapse this branch\">" + (jade.escape(null == (jade_interp = page.title + ':' + page.url) ? "" : jade_interp)) + "</span><ul>");
// iterate page.actions
;(function(){
  var $$obj = page.actions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var action = $$obj[$index];

buf.push("<li class=\"parent_li\"><span title=\"Collapse this branch\">" + (jade.escape(null == (jade_interp = action.actionType) ? "" : jade_interp)) + "</span><ul>");
// iterate Object.getOwnPropertyNames(action)
;(function(){
  var $$obj = Object.getOwnPropertyNames(action);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var action = $$obj[$index];

buf.push("<li class=\"parent_li\"><span title=\"Collapse this branch\">" + (jade.escape(null == (jade_interp = action.actionType) ? "" : jade_interp)) + "</span><ul>");
// iterate Object.getOwnPropertyNames(action)
;(function(){
  var $$obj = Object.getOwnPropertyNames(action);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var page = $$obj[$index];

buf.push("<li class=\"parent_li\"><span title=\"Collapse this branch\">" + (jade.escape(null == (jade_interp = page.title + ':' + page.url) ? "" : jade_interp)) + "</span><ul>");
// iterate page.actions
;(function(){
  var $$obj = page.actions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var action = $$obj[$index];

buf.push("<li class=\"parent_li\"><span title=\"Collapse this branch\">" + (jade.escape(null == (jade_interp = action.actionType) ? "" : jade_interp)) + "</span><ul>");
// iterate Object.getOwnPropertyNames(action)
;(function(){
  var $$obj = Object.getOwnPropertyNames(action);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var action = $$obj[$index];

buf.push("<li class=\"parent_li\"><span title=\"Collapse this branch\">" + (jade.escape(null == (jade_interp = action.actionType) ? "" : jade_interp)) + "</span><ul>");
// iterate Object.getOwnPropertyNames(action)
;(function(){
  var $$obj = Object.getOwnPropertyNames(action);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var propName = $$obj[$index];

buf.push("<li><span>" + (jade.escape(null == (jade_interp = propName + ' - ' + action[propName]) ? "" : jade_interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("</ul></div>");}.call(this,"Object" in locals_for_with?locals_for_with.Object:typeof Object!=="undefined"?Object:undefined,"pages" in locals_for_with?locals_for_with.pages:typeof pages!=="undefined"?pages:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}
},{"../../lib/jade.runtime":1}]},{},[5]);
