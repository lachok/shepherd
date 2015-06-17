
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
				action.timestamp = new Date().toISOString();
				
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