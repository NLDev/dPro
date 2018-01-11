"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

window.$ = window.jQuery = require("jquery");

let next = function(){ window.location = "../main/main.html"; };

window.onload = () => {
    $(document).ready(function() {
        setTimeout(next, 5000);
        return;
    });
}
