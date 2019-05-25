import xml from 'xml-string'

const mime = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'

export default data => {
  const gpx = xml.create('gpx')
  gpx.a({
    'creator': "Garmin Connect",
    'version': "1.1",
    'xsi:schemaLocation': "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/11.xsd",
    'xmlns': "http://www.topografix.com/GPX/1/1",
    'xmlns:ns3': "http://www.garmin.com/xmlschemas/TrackPointExtension/v1",
    'xmlns:ns2': "http://www.garmin.com/xmlschemas/GpxExtensions/v3",
    'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
  })
  const trk = gpx.c('trk')
  const trkseg = trk.c('trkseg')
  data.forEach(({ lat, lng, alt, timestamp }) => {
      const trkpt = trkseg.c('trkpt').a({ lat, lon: lng })
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
