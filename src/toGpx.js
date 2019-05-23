import xml from 'xml-string'

const mime = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'

export default data => {
  const gpx = xml.create('gpx')
  gpx.a({
      'xmlns': 'http://www.topografix.com/GPX/1/1',
      'creator': 'geolocation-to-gpx by Idris maps',
      'version': '1.1',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
  })
  const trk = gpx.c('trk')
  const trkseg = trk.c('trkseg')
  data.forEach(({ lat, lng, alt, timestamp }) => {
      const trkpt = trkseg.c('trkpt').a({ lat, lng })
      if(alt) {
        trkpt.c('ele').d(alt)
      }
      if(timestamp) {
        var t = (new Date(timestamp)).toISOString()
        trkpt.c('time').d(t)
      }
  })
  return mime + '\n' + gpx.outer()
}
