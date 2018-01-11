"use strict";

const { app, BrowserWindow } = require("electron");
const path                   = require("path");
const { shell }              = require("electron");
const os                     = require("os");
const ipc                    = require("electron").ipcMain;

let arg = process.argv.slice(2).map(v => v.toLowerCase());

global.sharedObject = { prop: arg }

const debug = (!!~arg.indexOf("--debug") || !!~arg.indexOf("-d")) ? true : false;

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

function createWindowConfig(){
    let conf = { 
        resizable: true,
        minHeight: 600,
        minWidth:  1000, 
        width:     1000, 
        heigth:    600, 
        icon:      __dirname + getLogoPath(), 
        show:      false 
    };
    return conf;
}

ipc.on("UI-windowID", function(event){ event.returnValue = win.id; });

app.setName("dPro");

app.on("ready", () => {
    console.log(
        "    ╔═╗╔╦╗╔═╗╦═╗╔╦╗╔═╗╔╦╗\n" +
        "    ╚═╗ ║ ╠═╣╠╦╝ ║ ║╣  ║║\n" +
        "    ╚═╝ ╩ ╩ ╩╩╚═ ╩ ╚═╝═╩╝\n"
    );

    let win = new BrowserWindow(createWindowConfig());
    win.setMenu(null); 
    win.loadURL(`file://${__dirname}/main.html`);
    win.on("ready-to-show", () => { win.show(); });
    win.on("closed",        () => { app.quit(); });
    win.center();
});
