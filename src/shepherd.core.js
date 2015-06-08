// shepherd.core.js

var Modernizr = Modernizr || {};
Modernizr.localstorage = Modernizr.localstorage
	|| 'localStorage' in window && window.localStorage !== null;
	
var currentPage = {
	url: window.location.href,
	title: document.title,
	actions: []
};

console.log("Loading shepherd...");
if(Modernizr.localstorage) {
	console.log("Local storage is supported.");
	
	// attach to anchors
	$('a').click(function() {
		var $this = $(this);
		
		var action = {
			actionType: 'clicked link',
			href: $this.attr('href'),
			title: $this.attr('title'),
			text: $this.text()
		};
		currentPage.actions.push(action);
	});
	
	// attach to inputs
	$('input, textarea').change(function() {
		var $this = $(this);
		
		var value = $this.val();
		if($this.attr('type') === 'password') {
			value = '********';
		}
		
		var action = {
			actionType: 'entered text',
			value: value
		};
		currentPage.actions.push(action);
	});
	
	// attach to dropdowns
	$('select').change(function() {
		var $this = $(this);
		
		var action = {
			actionType: 'selected option'
		};
		currentPage.actions.push(action);
	});
	
	// attach to forms
	$('form').submit(function() {
		var $this = $(this);
		
		var action = {
			actionType: 'submitted form',
			source: $this.data('focussed')
		};
		currentPage.actions.push(action);
	});
	
	$('form').focus(function(event) {
		$(this).data('focussed', $(event.target))
	});
	
	showSummary();
	
} else {
	console.log("Local storage is not supported.");
}

window.addEventListener("beforeunload", function (e) {
	saveCurrentPage();
});

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