"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const remote = require("electron").remote;
window.$ = window.jQuery = require("jquery");

let arg = remote.getGlobal("sharedObject").prop;

let next = function(){ window.location = "../main/main.html"; };

window.onload = () => {
    $(document).ready(function() {
        (!!~arg.indexOf("--skip-splash") || !!~arg.indexOf("-s")) ? next() : setTimeout(next, 5000);
        return;
    });
}
