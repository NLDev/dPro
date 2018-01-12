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

var MONTHS = ["{{ZEIT}}"];
var config = {
    type: 'line',
    data: {
        labels: ["15", "15", "15", "15", "15", "15", "15"],
        datasets: [{
            label: "",
            backgroundColor: "rgb(54, 162, 235)",
            borderColor: "rgb(54, 162, 235)",
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
            responsive: true,
    title:{
            display:true,
            text: "{{TITLE}}"
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "{{ZEIT}}"
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "{{MENGE}}"
                }
            }]
        }
    }
};

$(document).ready(function(){
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

    $(".container").on("click", function(){
        $(this).toggleClass("change");
        classCheck();
    });

    $("#overlay").on("click", function(){
        $(".container").toggleClass("change");
        classCheck();
    });
});

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
};
