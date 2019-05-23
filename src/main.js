import Gps from './gps'
import toGpx from './toGpx'
import save from './saveToSd'

const gps = new Gps()

const footer = {
  left: document.getElementById('footer-left'),
  center: document.getElementById('footer-center'),
  right: document.getElementById('footer-right'),
}
const main = document.getElementById('main')

let state = {
  page: null
}

const onLoad = () => {
  state.page = 'load'
  footer.center.innerText = 'Start'
  footer.left.innerText = ''
  footer.right.innerText = ''
}

const onStart = () => {
  gps.start()
  state.page = 'running'
  footer.center.innerText = 'Stop'
  footer.left.innerText = ''
  footer.right.innerText = ''
}

const onStop = () => {
  gps.stop()
  state.page = 'stopped'
  footer.left.innerText = 'New'
  footer.center.innerText = 'Save'
  footer.right.innerText = 'Restart'
}

const onReset = () => {
  gps.clear()
  onLoad()
}

const saveFile = () => {
  save(toGpx(gps.data), (err, result) => {
    state.page = 'saved'
    footer.left.innerText = ''
    footer.right.innerText = ''
    footer.center.innerText = 'OK'
    if (err) {
      main.innerHTML = `<p>${err}</p>`
    } else {
      main.innerHTML = `<p>Saved !</p>`
    }
  })
}

window.addEventListener('keydown', ({ key }) => {
  if (state && state.page === 'load') {
    if (key === 'Enter') { return onStart() }
  }
  if (state && state.page === 'running') {
    if (key === 'Enter') { return onStop() }
  }
  if (state && state.page === 'stopped') {
    if (key === 'Enter') { return saveFile() }
    if (key === 'SoftKeyLeft') { return onReset() }
    if (key === 'SoftKeyRight') { return onStart() }
  }
  if (state && state.page === 'saved') {
    if (key === 'Enter') { return onLoad() }
  }
})

window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    onLoad()
  } else {
    main.innerHTML = `<p>Geolocation is not enabled</p>`
  }
})

setInterval(() => {
  if (gps.watchId !== null) {
    main.innerHTML = `<p>Points: ${gps.data.length}</p>`
  }
}, 1000)