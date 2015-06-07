// ==UserScript==
// @name         Shepherd
// @namespace    https://github.com/lachok
// @version      0.0.0
// @description  Bug report capturing tool
// @include      https://*
// @author       You
// @match        http://tampermonkey.net/index.php?version=3.10.109&ext=dhdg&updated=true
// @grant        none
// ==/UserScript==

/* global jQuery */

//if (window.top != window.self) {  //-- Don't run on frames or iframes
//    console.log('Tampermonkey:Shepherd: Not supposed to run in frames/iframes');
//    return;
//}


if(typeof(jQuery) === 'undefined') {
	console.log('Shepherd requries jQuery. Skipping...');
	return;
}

//@@include('./shepherd.js')