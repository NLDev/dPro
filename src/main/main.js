"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const { ipcRenderer } = require("electron");
const remote = require("electron").remote;
const { app, BrowserWindow }  = require("electron");
const shell = require("electron").shell;

window.$ = window.jQuery = require("jquery");

let lowres = remote.getGlobal("sharedObject").lowres;

function msg(msg){
    $("#nlmsg-text").html(msg);
    $(".nlmsg").addClass("nlmsg-show");
    setTimeout(function(){ $(".nlmsg").removeClass("nlmsg-show"); }, 3000);
}

function modal(msg, headeroff, footeroff){
    if (headeroff){
        $(".nlmodal-header").css("display", "none");
        $(".close-hide").css("display", "block");
    }
    if (footeroff) $(".nlmodal-footer").css("display", "none");
    $(".nlmodal").css("display", "block");
    $("#nlmodal-text").html(msg);
}

function forceModalClose(){ 
    $(".nlmodal").css("display", "none"); 
    $(".nlmodal-header").css("display", "block");
    $(".nlmodal-footer").css("display", "block");
    $(".close-hide").css("display", "none");
}

function classCheck(){
    if ($("#menu-drawer").hasClass("open")){
        $("#menu-drawer").removeClass("open");
        $("#menu-drawer").addClass("close");
    }
    else {
        $("#menu-drawer").removeClass("close");
        $("#menu-drawer").addClass("open")
    }
    if ($("#overlay").hasClass("over")){
        $("#overlay").removeClass("over");
        $("#overlay").addClass("under");
    }
    else {
        $("#overlay").removeClass("under");
        $("#overlay").addClass("over")
    }
}

$(document).ready(function(){
    let win = remote.getCurrentWindow();

    if (lowres) $("body").addClass("low-res");

    $(".container").on("click", function(){
        $(this).toggleClass("change");
        classCheck();
    });

    $("#overlay").on("click", function(){
        $(".container").toggleClass("change");
        classCheck();
    });

    $("#code").on("click", function(){
        classCheck();
        $(".container").removeClass("change");
        shell.openExternal("https://github.com/NullDev/dPro");
        modal(
            "Opening link in browser..." +
            "<br><br>" +
            "Note: This may take a while depending on your standard browser."
        );
    });

    $("#about").on("click", function(){
        classCheck();
        $(".container").removeClass("change");
        modal(
            "<center>" + 
                "<h2>dPro</h2> Developed by NullDev (Chris)<br>" + 
                "for a HTML Bulme project." +
            "</center>" + 
            "<br><br>" +
            "Copyright &copy; " + (new Date()).getFullYear() + " NullDev",
            true,
            true
        );
    });

    $("#reload").on("click", function(){ win.reload(); });

    $("#dev").on("click", function(){ remote.getCurrentWindow().toggleDevTools(); });

    $("#exit").on("click", function(){
        classCheck();
        $(".container").removeClass("change");
        msg("Exiting...");
        let winObj = remote.getCurrentWindow();
        lowres ? winObj.close() : setTimeout(function(){ winObj.close(); }, 1500);
    });

    $(".nlmodal-close").click(function(e) { forceModalClose(); });
    window.onclick = function(event) { if (event.target == document.getElementById("nlmodal")) forceModalClose(); }

    $(".export-btn").on("click", function(){
        msg("Exporting to Excel...");
        exportXLSX();
    });
});
