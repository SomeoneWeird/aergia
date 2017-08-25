import os from 'os'
import path from 'path'

import { app, BrowserWindow, ipcMain } from 'electron'

let downloadPath = path.join(os.tmpdir(), 'aergia.zip')

export default function () {
  ipcMain.on('3dssetup', function (event, arg) {
    let data = JSON.parse(arg)

    const js = `
    selector()
    window.STEP_FORM_DATA = ${JSON.stringify(data)}
    window.global_version = ${JSON.stringify(data.reduce((b, e, i) => {
      b[i] = e
      return b
    }, {}))}

    window.consoleinfo = function () {
      return ${JSON.stringify(data.map(e => ({ value: e })))}
    }

    startup_CFW()

    setTimeout(function () {
      function check() {
        if (document.querySelectorAll('#download_btn')[0].text === 'Download') {
          document.querySelectorAll('#download_btn')[0].click()
        } else {
          setTimeout(check, 200)
        }
      }
      check()
    }, 200)
    `

    let win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false // required
      },
      show: false
    })

    win.webContents.session.on('will-download', (event, item, webContents) => {
      item.setSavePath(downloadPath)

      item.once('done', (event, state) => {
        win.close()
        if (state === 'completed') {
          event.sender.send('3dssetup_finish', downloadPath)
        } else {
          event.sender.send('3dssetup_fail')
        }
      })
    })

    win.loadURL('https://rikumax25.github.io/3SDSetup/')

    win.webContents.on('did-finish-load', () => {
      win.webContents.executeJavaScript(js);
    })
  })
}
