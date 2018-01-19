"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const remote = require("electron").remote;

window.$ = window.jQuery = require("jquery");

let lowres = remote.getGlobal("sharedObject").lowres;
let win    = remote.getCurrentWindow();

window.onload = () => {
    win.center();
    $(document).ready(function(){ if (lowres) $("body").addClass("low-res"); });
}
