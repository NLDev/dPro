"use strict";
global.cptable = require("../lib/plugins/export/libs/xlsx/cpexcel.js");

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

var chartData = generateChartData();
var chart = AmCharts.makeChart("wrapper", {
    "type": "serial",
    "theme": "black",
    "marginRight": 80,
    "autoMarginOffset": 20,
    "marginTop": 7,
    "dataProvider": chartData,
    "valueAxes": [{
        "axisAlpha": 0.2,
        "dashLength": 1,
        "position": "left"
    }],
    "mouseWheelZoomEnabled": true,
    "graphs": [{
        "id": "g1",
        "balloonText": "[[value]]",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "hideBulletsCount": 50,
        "title": "red line",
        "valueField": "visits",
        "useLineColorForBulletBorder": true,
        "balloon":{
            "drop":true
        }
    }],
    "chartScrollbar": {
        "autoGridCount": true,
        "graph": "g1",
        "scrollbarHeight": 40
    },
    "chartCursor": {
       "limitToGraph":"g1"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "dashLength": 1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true
    }
});

chart.addListener("rendered", zoomChart);
zoomChart();

function zoomChart(){ chart.zoomToIndexes(chartData.length - 40, chartData.length - 1); }

function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);
    var visits = 1200;
    for (var i = 0; i < 1000; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}

function exportXLSX(){ chart.export.toXLSX({}, function(data){ this.download(data, this.defaults.formats.XLSX.mimeType, "dPro.xlsx"); }); }
