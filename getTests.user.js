// ==UserScript==
// @name         getTests
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.daypo.com/tai-*.html
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var id = parseInt(window.location.pathname.slice(5, -5)) + 1;
    var next = "https://www.daypo.com/tai-" + id + ".html";
    var datos = {
        titulo: window.location.pathname.slice(1, -5),
        contenido: $('table.w.tal')[1].innerText
    };

    $.post("http://localhost:2233/?track", datos, function(data){
        console.log(data);
        window.location.href = next;
        //console.log(next);
        //console.log(id);
    });

    // Your code here...
})();