/* global jQuery */

var template = require('./templates/shepherd.ui.tree');
var actionTypes = require('./shepherd.actionTypes');
var ui = require('./shepherd.ui')(jQuery, template);
var core = require('./shepherd.core')(jQuery, actionTypes, ui);