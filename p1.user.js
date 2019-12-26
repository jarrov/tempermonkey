// ==UserScript==
// @name         p1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function run() {
    var data = { titulo: "TAI/1656112641293349", contenido: JSON.stringify(Array.from(document.querySelectorAll("._60rh")).map((a)=>{ return a.id.slice(17); }))};
    download(data.titulo + '.md', data.contenido);
}

function addCustomSearchResult (jNode) {
    var command = document.createElement("button");
    command.innerHTML = "Run";
    command.onclick=run;
    jNode.prepend (
        command
    );
}

(function() {
    'use strict';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    //xhttp.open("POST", "http://localhost:2233/track", true);
    //xhttp.send(data);
    // Your code here...
    waitForKeyElements("div.noGrip", addCustomSearchResult);
})();