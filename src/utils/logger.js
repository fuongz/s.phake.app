import { getSystemVersion } from './tracking.js'

export default function loggerMiddleware(req, res, next) {
  console.log(req.useragent)

  console.log({
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
    source: req.get('Referrer'),
    platform: req.useragent.platform,
    os: req.useragent.os,
    osVersion: getSystemVersion(req.get('User-Agent')),
    browser: req.useragent.browser,
    browserVersion: req.useragent.version,
    brand: req.get('Brand'),
    language: req.get('Language'),
    location: req.get('Location'),
  })

  console.log(`[LOG] > ${req.method} ${req.originalUrl} ${new Date().toLocaleString()} ${req.ip} ${req.get('User-Agent')}`)
  next()
}
