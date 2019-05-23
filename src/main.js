import Gps from './gps'
import toGpx from './toGpx'

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
}

const onStart = () => {
  gps.start()
  state.page = 'running'
  footer.center.innerText = 'Stop'
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

window.addEventListener('keydown', ({ key }) => {
  if (state && state.page === 'load') {
    if (key === 'Enter') { return onStart() }
  }
  if (state && state.page === 'running') {
    if (key === 'Enter') { return onStop() }
  }
  if (state && state.page === 'stopped') {
    if (key === 'Enter') { console.log(gps.data, toGpx(gps.data)) } // TODO
    if (key === 'SoftKeyLeft') { return onReset() }
    if (key === 'SoftKeyRight') { return onStart() }
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