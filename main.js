const { app, BrowserWindow } = require('electron')
const dev = require('electron-is-dev')

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function openWindow(){
  return new Promise((resolve, reject) => {
    resolve(new BrowserWindow({ width: 800, height: 600 }))
  })
  .then(main => {
    const loc = dev ? 'http://localhost:3000' : `file://${__dirname}/build/index.html`
    main.loadURL(loc)
    main.on('closed', () => {
      win = null
    })
    return main
  })
}
