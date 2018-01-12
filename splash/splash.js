"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const { ipcRenderer } = require("electron");
const { app, BrowserWindow }  = require("electron");
const remote = require("electron").remote;

window.$ = window.jQuery = require("jquery");

let arg = remote.getGlobal("sharedObject").prop;

function createWindowConfig(){
    let conf = { 
        resizable: remote.getGlobal("sharedObject").debug ? true : false,
        minHeight: 600,
        minWidth:  1000, 
        width:     1000, 
        heigth:    600,  
        show:      false,
        frame:     true
    };
    return conf;
}

let next = function(){ 
    window.location = "../main/main.html"; 
    /*let win = new BrowserWindow(createWindowConfig());
    win.setMenu(null); 
    win.loadURL(`file://${__dirname}/splash/splash.html`);
    win.on("ready-to-show", () => { win.show(); });
    win.on("closed",        () => { app.quit(); });
    win.center();*/
};

window.onload = () => {
    $(document).ready(function() {
        (!!~arg.indexOf("--skip-splash") || !!~arg.indexOf("-s")) ? next() : setTimeout(next, 5000);
        return;
    });
}
