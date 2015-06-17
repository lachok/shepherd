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