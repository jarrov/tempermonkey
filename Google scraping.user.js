// ==UserScript==
// @name         Google scraping
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.es/search?q=operadores+especiales+de+b%C3%BAsqueda+en+google&oq=operadores+especiales+de+b%C3%BAsqueda+en+google&aqs=chrome..69i57.15311j0j1&sourceid=chrome&ie=UTF-8
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
  var arr = [], l = document.links;
    for(var i=0; i<l.length; i++) {
    arr.push(l[i].href);
  }
  console.log(arr);
})();