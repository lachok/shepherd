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