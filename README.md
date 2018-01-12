# dPro

<p align="center">
<img height="150" width="auto" src="https://raw.githubusercontent.com/NLDev/dPro/master/icon/icon-full.png?token=AV312Ht2FZq1c5pWT4WdiWRArkW70J1-ks5aYTPewA%3D%3D" /><br>
:bar_chart: dPro Analytics and Statistics
</p>

## :bulb: Usage

**No** deployment version yet. <br>

0. Open up your terminal (and navigate somewhere you want to download the repository to) <br><br>
1. Make sure you have nodejs installed. Test by  entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Make sure electron is installed <br>
$ `electron -v` <br>
If this returns a version number, Electron is installed. **If not**, get it by typing <br>
$ `sudo npm install -g electron` <br><br>
3. Clone the repository and navigate to it. You can either download it <a href="https://github.com/NLDev/dPro/archive/master.zip">here</a> or if you have Git installed, type <br>
$ `git clone https://github.com/NLDev/dPro.git && cd dPro` <br><br>
4. Install all dependencies <br>
$ `npm install` <br><br>
5. Wait for it to finish. After installation is done, run the programm with <br>
$ `npm start` <br><br>
6. (Optional): To enable debugging mode and skip the splash screen type <br>
$ `npm test` <br>

<hr>

## :wrench: CLI Arguments

The script takes sever CommandLine Arguments

| Argument | Alias | Function |
| -------- | ----- | -------- |
| `--debug` | `-d` | Enables debugging features such as resizeable screen and "inspect elements". |
| `--skip-splash` | `-s` | Skips the splash screen and jumpts to the main window instantly. |
| `--low-res` | `-l` | Does not load some CSS definitions and animations. Can be used for very slow PC's |

<hr>

## :copyright: Copyright

`Copyright (c) 2018 NullDev`
