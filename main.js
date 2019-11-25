const { app, BrowserWindow, shell } = require('electron')
const DEV = require('electron-is-dev')
const URL = require('url').URL

let win = null

app.on('ready', () => {
  openWindow()
    .then(browser => win = browser)
    .catch(console.error)
})

app.on('activate', () => {
  if (win === null) {
    openWindow()
      .then(browser => win = browser)
      .catch(console.error)
  }
})


const open = async (e, url) => {
  e.preventDefault()
  const { href } = new URL(url)
  await shell.openExternal(href)
}

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', open)
  contents.on('will-navigate', (e, url) => {
    const { href } = new URL(url)
    if (DEV) {
      if (
        !href.startsWith('http://localhost:3000/')
        && !href.startsWith('devtools:')
      ) {
        open(e, href)
      }
    }
    if (!DEV) {
      if (
        (!href.startsWith('file://'))
        || (!href.includes('/build/'))
      ) {
        try {
          open(e, href)

        } catch (e) {
          console.log('counldnt open', href)
          console.log(e)
        }
      }
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function openWindow(){
  return new Promise((resolve, reject) => {
    resolve(new BrowserWindow({
      width: 800,
      height: 600,
      // webPreferences: {
      //   contextIsolation: true,
      //   preload: path.join(app.getAppPath(), 'preload.js'),
      //   webSecurity: false
      // }
    }))
  })
    .then(main => {
      const loc = DEV ? 'http://localhost:3000' : `file://${__dirname}/build/index.html`
      main.loadURL(loc)
      main.on('closed', () => {
        win = null
      })
      if (DEV){
        main.webContents.openDevTools()
      }
      return main
    })
}
