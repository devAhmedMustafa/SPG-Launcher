const {app, BrowserWindow, ipcMain, webContents, dialog} = require('electron');
const path = require('path');
const {google} = require('googleapis')
const url = require('url')
const axios = require('axios');
const unzipper = require('unzipper');
const fs = require('fs');
const {createExtractorFromFile} = require('node-unrar-js')

const gamesStorage = "Star Plus Games";
const defaultPath = app.getPath("documents")

(function PathValidation (){
    if (!fs.existsSync(path.join(defaultPath, gamesStorage))) {
        fs.mkdirSync(path.join(defaultPath, gamesStorage))
    }
})();

const defaultInstallPath = defaultPath +"/"+ gamesStorage;

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// )

// oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
// const drive = google.drive({
//     version: 'v3', 
//     auth: oauth2Client
// })

const devEnv = "http://localhost:5173/"

async function extractRarArchive(file, destination) {
    try {
      // Create the extractor with the file information (returns a promise)
      const extractor = await createExtractorFromFile({
        filepath: file,
        targetPath: destination
      });
  
      [...extractor.extract().files];
      console.log('Extraction completed successfully');
    } catch (err) {
      // May throw UnrarError, see docs
      console.error(err);
    }
}

function createMainWindow(){

    const mainWindow = new BrowserWindow({
        title: 'Star Plus Games',
        width: 1024,
        height: 768,
        frame: false,
        icon: path.join(__dirname, 'assets/Logo.ico'),
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.webContents.openDevTools();

    const initUrl = url.format({
        pathname: path.join(__dirname, 'app/dist/index.html'),
        protocol: 'file'
    })

    mainWindow.setMinimumSize(1000, 400);

    ipcMain.on("window:minimize", ()=>{
        mainWindow.minimize();
    })
    
    ipcMain.on("window:toggleMaximize", ()=>{
        if(mainWindow.isMaximized()){
            mainWindow.unmaximize()
        }else{
            mainWindow.maximize()
        }
    })
    
    ipcMain.on("window:move", (event, args)=>{
        mainWindow.setPosition(args[0], args[1]);
        console.log(args)
    })
    
    ipcMain.on("window:close", ()=>{
        app.quit();
    })
    
    ipcMain.on("game:install", async (event, {payload})=>{
        const url = payload.url;
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            onDownloadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(`Donwload Progress: ${progress}%`)
                mainWindow.webContents.send("downloading", {process: progress})
            }
        });

        const tempFilePath = `${defaultInstallPath}/${payload.filename}.rar`;
    
        const writer = fs.createWriteStream(`${tempFilePath}`);

        writer.on('finish', () => {
            console.log('File saved successfully.');
            dialog.showMessageBox({ message: 'File saved successfully.' });
        });
    
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        //const reader = fs.createReadStream(tempFilePath);

        //await reader.pipe(unzipper.Extract({ path: `${defaultInstallPath}` }));

        await extractRarArchive(tempFilePath, defaultInstallPath)

        //reader.close();
        fs.unlinkSync(`${tempFilePath}`);
    })

    mainWindow.loadURL(devEnv)
}

app.whenReady().then(createMainWindow)

