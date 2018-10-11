const {app, BrowserWindow, ipcMain} = require('electron');


let win;

function createWindow() {
    win = new BrowserWindow({frame:false});
    win.loadFile('index.html');
    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null
    })
}


// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});


ipcMain.on('load_pkl', (event, filePath) => {
    console.log(filePath);

});

const path = require('path');

let pyProc = null
let pyPort = null

const createPyProc = () => {
    let port = '4242'
    // let script = path.join(__dirname, 'py', 'api.py')
    // pyProc = require('child_process').spawn('python', [script, port])
    let script = path.join(__dirname, 'pydist', 'api', 'api')
    pyProc = require('child_process').execFile(script, [port])


    if (pyProc != null) {
        console.log('child process success');
        createWindow();
    }
}

const exitPyProc = () => {
    pyProc.kill()
    pyProc = null
    pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)
// app.on('ready', createWindow);
