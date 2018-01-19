"use strict";

///////////////////////////
//-----------------------//
// Copyright (c) NullDev //
//-----------------------//
///////////////////////////

const { app, BrowserWindow } = require("electron");
const path                   = require("path");
const { shell }              = require("electron");
const os                     = require("os");
const ipc                    = require("electron").ipcMain;

let arg = process.argv.slice(2).map(v => v.toLowerCase());

const debug = (!!~arg.indexOf("--debug")       || !!~arg.indexOf("-d")) ? true : false;
const lowrs = (!!~arg.indexOf("--low-res")     || !!~arg.indexOf("-l")) ? true : false;
const skips = (!!~arg.indexOf("--skip-splash") || !!~arg.indexOf("-s")) ? true : false;

global.sharedObject = { debug: debug, lowres: lowrs, skips: skips }

let win, loading;
app.mainWindow = win;

if (debug){
    require("electron-context-menu")({
        prepend: (params, browserWindow) => [{
            label: "Rainbow",
            visible: params.mediaType === "image"
        }]
    });
}

function getLogoPath(){
    if (os.platform() === "darwin")     return "/icon/icon.icns";
    else if (os.platform() === "win32") return "/icon/icon.ico";
    else                                return "/icon/icon.png";
}

ipc.on("UI-windowID", function(event){ event.returnValue = win.id; });

app.setName("dPro");

function initApp(){ showLoading(initRender); }

function showLoading(callback) {
    loading = new BrowserWindow({ 
        resizable: debug ? true : false,
        minHeight: 600,
        minWidth:  300, 
        width:     300, 
        heigth:    600, 
        icon:      __dirname + getLogoPath(), 
        show:      false,
        frame:     false
    });
    loading.once("show", callback);
    loading.loadURL(`file://${__dirname}/splash/splash.html`);
    loading.show();
    loading.center();
}

function switchWins(){
    win.setMenu(null);
    win.show();
    win.center();
    loading.hide();
    loading.close();
}

function initRender() {
    win = new BrowserWindow({ 
        resizable: true,
        minHeight: 600,
        maxHeight: 600,
        minWidth:  1000, 
        width:     1000, 
        heigth:    600,  
        icon:      __dirname + getLogoPath(),
        show:      false,
        frame:     true
    });

    win.webContents.once("dom-ready", () => { (skips || lowrs) ? switchWins() : setTimeout(switchWins, 4000); });

    win.on("closed", () => { win = null; })

    win.loadURL(`file://${__dirname}/main/main.html`);
}

app.on("ready", () => { 
    if (os.platform() === "win32"){
        console.log(
            "\n     ___ _____ _   ___ _____ ___ ___  \n    / __|_   _/_\\ | _ \\_   _| __|   \\ " + 
            "\n    \__ \\ | |/ _ \\|   / | | | _|| |) |\n    |___/ |_/_/ \\_\\_|_\\ |_| |___|___/"
        );
    }
    else console.log("\n    ╔═╗╔╦╗╔═╗╦═╗╔╦╗╔═╗╔╦╗\n    ╚═╗ ║ ╠═╣╠╦╝ ║ ║╣  ║║\n    ╚═╝ ╩ ╩ ╩╩╚═ ╩ ╚═╝═╩╝\n"); 
});
                                   
app.on("ready", initApp)

app.on("window-all-closed", () => { if (process.platform !== "darwin"){ app.quit(); } });

app.on("activate", () => { if (win === null) initApp(); });
