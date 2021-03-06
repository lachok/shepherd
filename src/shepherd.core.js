
module.exports = function($, actionTypes, shepherdUi, integration) {
	
	var Modernizr = Modernizr || {};
	Modernizr.sessionstorage = Modernizr.sessionstorage || 'sessionStorage' in window && window.sessionStorage !== null;
	
	var currentPage = {
		url: window.location.href,
		title: document.title,
		actions: []
	};
	
	console.log("Loading shepherd...");
	if(Modernizr.sessionstorage) {
		console.log("Session storage is supported.");
		
		attachActionTypes(actionTypes);
		
		attachToForms();		
		
		attachUi();
		
		attachIntegration();
	
		window.addEventListener("beforeunload", function (e) {
			saveCurrentPage();
		});
		
	} else {
		console.log("Session storage is not supported.");
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
				source: $this.data('focussed'),
				timestamp: new Date().toISOString()
			};
			currentPage.actions.push(action);
		});
		
		$('form').focus(function(event) {
			$(this).data('focussed', $(event.target));
		});
	}
	
	function attachIntegration() {
		if(integration) {
			$(function() {
				if(integration.when()) {
					var pages = getPages();
					integration.how(pages);
				}
			});
		}
	}
	
	function attachUi() {
		if(shepherdUi) {
			var pages = getPages();
			shepherdUi.showSummary(pages);
		}
	}
	
	function saveCurrentPage() {
		var pages = getPages();
		pages.push(currentPage);
		pages.splice(0, pages.length - 5);
		window.sessionStorage["Shepherd.pages"] = JSON.stringify(pages);
	}
	
	function getPages() {
		var pages = [];
		if(typeof(window.sessionStorage["Shepherd.pages"]) !=='undefined') {
			pages = JSON.parse(window.sessionStorage["Shepherd.pages"]);
		}
		return pages;
	}
	
	function logUserActionsToConsole() {
		var userActions = JSON.parse(window.sessionStorage["Shepherd.pages"]);
		console.log(userActions);
	}
		
};