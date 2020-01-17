// ==UserScript==
// @name         ETL facebook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jesús AV
// @match        https://www.facebook.com/*
// @require      https://cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js
// @grant        none
// ==/UserScript==


// Array.prototype.slice.call(document.querySelectorAll("a[ajaxify]")).map(function (elto, id) { return {url: elto.href, item: elto}; });
// document.querySelectorAll("div[data-store]")

function stad() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    let fh = localISOTime.slice(0, 19).replace('T', ' ');
    let estad = document.querySelector("[data-id='1353580681']").querySelector("div._5bon").textContent;
    addElto("hora", fh);
    addElto("estado", estad);
    let linea = fh + "; " + estad;
    //console.log(linea);
}

function stadAll() {
    Array.prototype.slice.call(document.querySelectorAll("[data-id]")).forEach((elto, id, arr)=>{
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        let fh = localISOTime.slice(0, 19).replace('T', ' ');
        let estad = elto.querySelector("div._5bon").textContent === "" ? "ACTIVO" : elto.querySelector("div._5bon").textContent;
        let id_user = elto.getAttribute("data-id");
        let nombre = elto.querySelector("div._55lr").innerText;
        addElto("id", "" + id_user);
        addElto("nombre", '"' + nombre + '"');
        addElto("hora", fh);
        addElto("estado", estad);
        console.log(".");
        //return fh + "; " + elto.getAttribute("data-id") + "; " + elto.querySelector("div._5bon").textContent;
    });
}

function loadDoc(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log( this.responseText );
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
    var box = document.getElementById("msgBox");
    box.innerText += "\n--- " + msg;
}

  var repo = {
      muestraMsgBox: function(){
        var msg = document.createElement("div");
        msg.setAttribute("id", "msgBox");
        msg.style = `
position: fixed;
z-index: 999;
width: 100%;
`;
        document.body.insertBefore(msg, document.body.childNodes[0]);
      },
      Estado: function() {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        let fh = localISOTime.slice(0, 19).replace('T', ' ');
        let estad = document.querySelector("[data-id='1353580681']").querySelector("div._5bon").textContent;
        addElto("hora", fh);
        addElto("estado", estad);
        let linea = fh + "; " + estad;
        console.log(linea);
      },
      Programar: function () {
        setInterval(stad, 60000);
          console.log("[ OK ]");
      },
      ProgramarTodo: function () {
        setInterval(stadAll, 60000);
          console.log("[ OK ]");
      },
      Extraer: function () {
        var lista = Array.prototype.slice.call(document.querySelectorAll("a[ajaxify]")).map(function (elto, id) { return {url: elto.href, item: elto}; });
        while(lista.length > 0 ) {
            var elem = lista.shift();
            addElto("url", elem.url );
            addElto("dom", elem.item.outerHTML );
            //elem.parentNode.removeChild(elem);
            //log("Extracción correcta ... ");
        }
      },
      limpiar: function() {
          localStorage.clear();
          log("Limpieza correcta ...");
      },
      hlDataHover: function() {
          Array.prototype.slice.call(document.querySelectorAll("a[data-hovercard]")).forEach( (elto, id)=>{ elto.style.border="1px solid red"; } );
          log("HL data hover correcto ...");
      },
      hlDataStore: function() {
        Array.prototype.slice.call(
            document.querySelectorAll("div[data-store]")
        ).forEach( (elto, id)=>{ elto.style.border = "1px solid green"; } );
      },
      hlReactions: function() {
          Array.prototype.slice.call(document.querySelectorAll("a[data-testid='UFI2ReactionsCount/root']")).forEach( (elto, id)=>{ elto.style.border="1px solid blue"; } );
      },
      fn2: function (aa) {
          console.log("--- " + aa);
          for( var id in aa) {
              console.log("- " + id);
              console.log(aa[id]);
          }

      },
      nthScroll: async function () {
          console.log('Taking a break...');
          await sleep(3000);
          console.log('Two seconds later, showing sleep in a loop...');

          // Sleep in loop
          for (let i = 0; i < 500; i++) {
              await sleep(2000);
              console.log(i);
              window.scrollTo(0,document.body.scrollHeight);
          }
},
      irFinal: function () {
          window.scrollTo(0,document.body.scrollHeight);
          console.log("ejecutando ....");
      },
      descarga: function() {
          var text = serializarDatos(datos);
          var filename = "descarga.csv";
          var elto = document.createElement('a');
          elto.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          elto.setAttribute('download', filename);
          elto.style.display = 'none';
          document.body.appendChild(elto);
          elto.click();
          document.body.removeChild(elto);
      },
      descarga_LIB: function() {
          var filename = "ETL_" + Date.now() + ".csv";
          var content = serializarDatos(datos);
          var blob = new Blob([content], {
              type: "text/plain;charset=utf-8"
          });
          saveAs(blob, filename);
      },
      descarga_Mysql: function() {
          var filename = Date.now() + ".sql";
          var content = serializarDatosSQL(datos, "sugar.Messenger_FB");
          var blob = new Blob([content], {
              type: "text/plain;charset=utf-8"
          });
          saveAs(blob, filename);
      },
      serializar: function() {
          serializarDatos(datos);
      },
      testAdd: function() {
        addElto("nombre", "jesus");
        addElto("nombre", "Mariza");
        addElto("edad", 34);
        addElto("edad", 32);
      },
      guardar: function() {
          localStorage.setItem("datos", JSON.stringify(datos));
          console.log(JSON.parse(localStorage.getItem("datos")));
      },
      continuar: function() {
          datos = JSON.parse(localStorage.getItem("datos")) || {};
          console.log(datos);
      }
  };

  var datos = {};

  function trans(dts) {
    if (dts[0]) {
        return dts[0].map(function(_, c) {return dts.map(function (r) { return r[c]; }); });
    } else {
        return [["NADA DE NADA"]];
    }
  }

  function transpose(dts) {
      var w = dts.length || 0;
      var h = dts[0].length;

      if(h===0 || w===0) { return []; }

      var i, j, t=[];

      for(i=0; i<h; i++) {

        t[i] = [];

        for(j=0; j<w; j++) {
            t[i][j] = dts[j][i];
        }
      }
      return t;
  }

  /**
   * Objeto datos en CSV
   */
  function serializarDatos( dts={}, sep="; " ) {
      var resp = [];
      var cont = [];
      var cabs = [];
      for(var k in dts) {
          cabs.push(k);
          cont.push(dts[k]);
      }

      cont = trans(cont);
      resp.push( cabs.join(sep) );
      for(let i in cont) {
          resp.push(cont[i].join(sep) );
      }
      var txtResp = resp.join("\n");
      console.log(txtResp);
      return txtResp;
  }

  /**
   * Objeto datos en script SQL
   */
  function serializarDatosSQL( dts={}, tab_name=Date.now()) {
      var resp = [];
      var cont = [];
      var cabs = [];
      for(var k in dts) {
          cabs.push(k);
          cont.push(dts[k]);
      }

      cont = trans(cont);
      var strCabs = cabs.join(", ");
      //resp.push( cabs.join(", ") );

      for(let i in cont) {
	      cont[i] = cont[i].map((elto, id)=>{
	      	if(typeof elto === 'string') elto = elto.replace(/\"/g, '');
            console.log(" -- replace " + typeof elto);
	      	return (typeof elto === 'number')? elto : '"' + elto + '"';
	      });
          resp.push(cont[i].join(", ") );
      }
      var txtResp = resp.map( (elto, id)=>{
      	return "INSERT INTO " + tab_name + " ( " + strCabs + " ) VALUES ( " + elto +" );";
      } ).join("\n");

      console.log(txtResp);
      return txtResp;
  }

  function addElto(k, v) {
      if(k in datos) { datos[k].push(v); }
      else {datos[k]=[v]; }
  }

  function addMenu(anc, obj) {
    var style = document.createElement('style');
    style.innerHTML = `
  .dropdown {
    background-color: #000;
    position: relative;
    display: inline-block;
    text-align: center;
  }

  .dropdown span {
    text-align: center;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #000;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  .dropdown-content div:hover {
    background-color: #700;
    border: 1px dotted red;
  }
  `;
    document.head.appendChild(style);
      //inicio
      var menuFB = document.querySelector(anc);
      var dropdown = document.createElement("div");
      dropdown.setAttribute("class", "dropdown");
      var titulo = document.createElement("span");
      titulo.innerHTML= "ETL";
      dropdown.appendChild(titulo);
      var content = document.createElement("div");
      content.setAttribute("class", "dropdown-content");

      //funciones (Parte dinámica)
      for( var k in obj) {
          let boton = document.createElement("div");
          boton.appendChild( document.createTextNode(k) );
          boton.onclick = obj[k];
          content.appendChild(boton);
      }
      //cierre
      dropdown.appendChild(content);
      menuFB.appendChild(dropdown);
  }

  (function() {
      'use strict';

      // Your code here...
      var ancla = "div[aria-label='Facebook'] div";
      addMenu(ancla, repo);
  })();
