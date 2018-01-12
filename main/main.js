"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const { ipcRenderer } = require("electron");
const remote = require("electron").remote;
const { app, BrowserWindow }  = require("electron");

window.$ = window.jQuery = require("jquery");

window.onload = () => {
    let win = remote.getCurrentWindow();
	let currentWindow = remote.getCurrentWindow().removeAllListeners();

win.setTitle(win.getTitle() + " - Main");
}
