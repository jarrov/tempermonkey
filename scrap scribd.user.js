// ==UserScript==
// @name         scrap scribd
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://es.scribd.com/document/*
// @match        https://es.scribd.com/doc/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require      https://unpkg.com/jspdf@latest/dist/jspdf.min.js
// @require      http://underscorejs.org/underscore-min.js
// @require      https://raw.githubusercontent.com/mennovanslooten/underscore-observe/master/underscore-observe.js
// ==/UserScript==

window.addEventListener('load', function() {
var pgs = [];

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
  var str="";
  pgs.forEach((pagina) => {
    //str += "url=\"" + pagina + "\"\n";
    str += pagina + "\n";
  });
  var data = {
    titulo: $("h1")[0].innerText.slice(0, -4).replace(/[ \.]/g, '-'),
    contenido: str
  };
  download(data.titulo + '.md', data.contenido);
}

function repararDescarga () {
  var jNode = $("button.action_button.download_btn.flat_btn");
  console.log(jNode[0]);
  jNode[0].innerText="RESUELTO";
  jNode.removeClass("action_button download_btn");
  jNode[0].onclick=run;
}

(function() {
  'use strict';
  var length = Object.values(docManager.pages).length;
  Object.values(docManager.pages).map((pag, ind)=>{
    window["page" + (ind+1) + "_callback"] = function (arg) {
      pgs[ind] = arg[0].match(/orig="([^"]+)"/)[1];
    };
    console.log(_);
    $.ajax({url: pag.contentUrl, dataType:"jsonp"});
  });

  $.observe(pgs, function(new_array, old_array) {
    if(new_array.length == length) {
      console.log("[1]");
      repararDescarga();
    }
  });
})();
  }, false);