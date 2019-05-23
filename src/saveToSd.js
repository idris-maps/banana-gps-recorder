export default (gpx, callback) => {
  if (!navigator.getDeviceStorage) {
    return callback('Could not access sdcard')
  }
  const sdcard = navigator.getDeviceStorage('sdcard')
  if (!sdcard) {
    return callback('Could not access sdcard')
  }
  const file   = new Blob([gpx], {type: 'application/gpx-xml'})
  const fileName = `${new Date().toISOString()}.gpx`
	const request = sdcard.addNamed(file, fileName)
	request.onsuccess = function () {
		return callback(null, this.result, this)
	}
	request.onerror = function () {
		return callback(this.error, null, this)
	}
}
