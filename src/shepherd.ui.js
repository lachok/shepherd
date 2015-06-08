// shepherd.ui.js

function showSummary() {
		
	var pages = [];
	if(typeof(window.localStorage["Shepherd.pages"]) !=='undefined') {
		pages = JSON.parse(window.localStorage["Shepherd.pages"]);
	}
	
	injectCSS();
	
	var html = ['<div class="shepherd-summary-tree">'];
	
	html.push('<ul>');
	for(var i=0;i<pages.length;i++) {
		var page = pages[i];
		
		html.push('<li>');
		html.push('<span>' + page.title + '</span>');

		html.push('<ul>');
		var pageActions = page.actions;
		for(var j=0;j<pageActions.length;j++) {
			var action = pageActions[j];
			
			html.push('<li>');
			html.push('<span>' + action.actionType + '</span>');
			html.push('<ul>');
			for(var propName in action) {
				if(propName === 'actionType')
					continue;
					
				html.push('<li>');
				html.push('<span>' + propName + ' - ' + action[propName] + '</span>');
				html.push('</li>');
			}
			html.push('</ul>');
			html.push('</li>');
		}
		html.push('</ul>');
		html.push('</li>');
	}
	html.push('</ul>');
	html.push('</div>');
	
	$('body').append(html.join('\n'));
	
	console.log("Rendering Shepherd tree...");
	renderTree();
}


function renderTree() {
    $('.shepherd-summary-tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
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