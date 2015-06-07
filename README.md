# Shepherd

### Capture useful data about your users' last actions on your website leading up to the submission of feedback

Shepherd provides insight into a user's last actoins before submitting feedback on your site. This is so that:
* It's easy for users to submit feedback
* It's easy for developers to understand feedback

It does this by providing a simple and extensible interface for defining user actions that need to be tracked, and storing them in the browser's local storage. When the user wants to submit feedback the saved actions can be submitted as well.

### Philosophy
* Shepherd is easy to use and configure
* It's a single javascript file that can be dropped into a website and provide the promised functionality
* It integrates with popular feedback forms/plugins (which ones?)
* It has a minimum set of dependencies
* It's modular and its functionality can be configured and extended by choosing which modules are included

### Project status
At the moment this is more a proof-of-concept than anything really useful. The main file (shepherd.js) contains [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) headers so that it can be injected into any website for testing.

### TODO
* Use a build system (gulp?) so that the code can be easier to organise but is still compiled into a single file
* Organise the source code into core and modules, e.g. actionType modules, rendering module, etc.
* Add tests
* Make it easy to integrate with popular feedback forms
* Save a timestamp for each action
* Make it easy to create new and custom action types just by providing an action type definition, e.g.
```javascript
var linkClickedActionType = {
  actionType: 'clicked link',
  selector: 'a',
  events: ['click'],
  attributesExtractor: function($element) {
    return {
      href: $element.attr('href'),
      title: $element.attr('title'),
      text: $element.text()
    };
  }
};
```
* Remove dependency on jQuery?
