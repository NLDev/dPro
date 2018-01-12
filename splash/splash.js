"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const remote = require("electron").remote;

window.$ = window.jQuery = require("jquery");

let lowrs = remote.getGlobal("sharedObject").lowres;

window.onload = () => {
    $(document).ready(function() {
        if (lowrs) $("body").addClass("low-res");
    });
}
