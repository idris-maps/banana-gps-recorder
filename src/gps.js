const options = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 9000,
}

const start = (success, error) =>
  navigator.geolocation.watchPosition(success, error, options)

const stop = watchId =>
  navigator.geolocation.clearWatch(watchId)

const retry = (watchId, success, error) => {
  stop(watchId)
  return start(success, error)
}

const parsePosition = ({ coords, timestamp }) => ({
  lat: coords.latitude,
  lng: coords.longitude,
  alt: coords.altitude,
  timestamp,
})

function Gps () {
  this.data = []
  this.watchId = null
  this.errors = []
  this.onError = error => {
    this.errors.push(error)
    const newId = retry(this.watchId, this.onPosition, this.onError)
    this.watchId = newId
  }
  this.onPosition = position => {
    this.data.push(parsePosition(position))
  }
  this.start = () => {
    const newId = start(this.onPosition, this.onError)
    this.watchId = newId
  }
  this.stop = () => {
    stop(this.watchId)
    this.watchId = null
  }
  this.clear = () => {
    this.data = []
    this.watchId = null
  }
}

export default Gps