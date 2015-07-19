/* global jQuery */

var template = require('./templates/shepherd.ui.tree');
var actionTypes = require('./shepherd.actionTypes');
var ui = require('./shepherd.ui')(jQuery, template);
var integration = require('./shepherd.integration')(jQuery);
var core = require('./shepherd.core')(jQuery, actionTypes, ui, integration);