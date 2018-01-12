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
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
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

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return randomScalingFactor();
        });
    });
    window.myLine.update();
});

var colorNames = Object.keys(window.chartColors);
