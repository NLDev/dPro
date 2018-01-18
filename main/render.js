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
    "thousandsSeparator": "",
    "dataProvider": chartData,
    "valueAxes": [{
        "axisAlpha": 0.2,
        "dashLength": 1,
        "title": "Menge",
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
        "title": "dPro Chart",
        "valueField": "menge",
        "useLineColorForBulletBorder": true,
        "balloon": { "drop": true }
    }],
    "chartScrollbar": {
        "autoGridCount": true,
        "graph": "g1",
        "scrollbarHeight": 40
    },
    "chartCursor": { "limitToGraph":"g1" },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "dashLength": 1,
        "minPeriod": "ss",
        "minorGridEnabled": true,
        "title": "Zeit"
    },
    "export": { "enabled": true }
});

chart.addListener("rendered", zoomChart);
zoomChart();

function zoomChart(){ chart.zoomToIndexes(chartData.length - 40, chartData.length - 1); }

function generateChartData() {
    return [
        {"date":"2018-01-20T14:00:00.000Z","menge":1208},
        {"date":"2018-01-20T14:15:00.000Z","menge":1214},
        {"date":"2018-01-20T14:30:00.000Z","menge":1223},
        {"date":"2018-01-20T14:45:00.000Z","menge":1229},
        {"date":"2018-01-20T15:00:00.000Z","menge":1229},
        {"date":"2018-01-20T15:15:00.000Z","menge":1230},
        {"date":"2018-01-20T15:30:00.000Z","menge":1226},
        {"date":"2018-01-20T15:45:00.000Z","menge":1230},
        {"date":"2018-01-20T16:00:00.000Z","menge":1222},
        {"date":"2018-01-20T16:15:00.000Z","menge":1219},
        {"date":"2018-01-20T16:30:00.000Z","menge":1228},
        {"date":"2018-01-20T16:45:00.000Z","menge":1226},
        {"date":"2018-01-20T17:00:00.000Z","menge":1217}
    ];
}

function exportXLSX(){ chart.export.toXLSX({}, function(data){ this.download(data, this.defaults.formats.XLSX.mimeType, "dPro.xlsx"); }); }
