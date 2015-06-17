/* global jQuery */

var ui = require('./shepherd.ui')(jQuery);
var actionTypes = require('./shepherd.actionTypes');
var core = require('./shepherd.core')(jQuery, actionTypes, ui);