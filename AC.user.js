// ==UserScript==
// @name         AC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Análisis cuantitativo de palabras usadas en artículos de El Catoblepas.
// @author       You
// @match        http://nodulo.org/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function conteo() {
  var regex1=/[–\-\.,;:\(\)«»0-9\?\¿•©!¡“”]/g;
  var regex2=/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\ ]/g;
  var vec = $("#cuerpo")[0].innerText
    .replace(regex2, ' ')
    .replace(/\n/g, ' ')
    .toLowerCase()
    .split(' ');
  var dic = {};
  for(var i=0; i<vec.length; i++) {
    if(isNaN(dic[vec[i]])) dic[vec[i]]=1;
    else dic[vec[i]]++;
  }
  return dic;
}

function addConteo() {
  console.log(("#cuerpo").innerText);
  $("head").append($("<style>tr:nth-child(even) {background: #CCC} tr:nth-child(odd) {background: #FFF}</style>"));
  var str = "<table width='100%'>";
  var dic = conteo();
  var keysSorted = Object.keys(dic).sort(function(a,b){return dic[b]-dic[a];});
  var i=1;
  keysSorted.forEach((elm)=>{
    if(elm) str += "<tr><td>" + (i++) + "</td><td>" + elm + "</td><td>" + dic[elm] + "</td></tr>";
  });
  str += "</table>";
  $("#ultimo").prepend($(str));
}

(function() {
    'use strict';
    waitForKeyElements("#cuerpo", addConteo);
    // Your code here...
})();