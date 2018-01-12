"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const remote = require("electron").remote;

window.$ = window.jQuery = require("jquery");

let lowrs = remote.getGlobal("sharedObject").lowres;
let win = remote.getCurrentWindow();

window.onload = () => {
    win.center();
    $(document).ready(function() {
        if (lowrs) $("body").addClass("low-res");
    });
}
