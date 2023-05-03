import express from 'express'
import { nanoid } from 'nanoid'
import { validateUrl } from './src/utils/url.js'
import dotenv from 'dotenv'
import UrlModel from './src/models/Url.model.js'
import TrackingModel from './src/models/Tracking.model.js'
import useragent from 'express-useragent'
import connection from './src/config/database.js'
import loggerMiddleware from './src/utils/logger.js'

dotenv.config({
  path: './.env',
})

connection()

const app = express()
const PORT = 3001 || process.env.PORT

app.use(useragent.express())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(loggerMiddleware)

const router = express.Router()

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body

  if (!originalUrl) {
    return res.status(400).json({
      message: 'Missing required information',
    })
  }

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({
      message: 'Invalid URL',
    })
  }
  const urlId = nanoid(10)
  try {
    const shortUrl = `${process.env.BASE_URL}/${urlId}`
    const url = await UrlModel.create({
      originalUrl,
      urlId,
      shortUrl,
    })
    return res.status(201).json({
      message: 'URL shortened successfully',
      data: {
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        id: url.urlId,
        createdAt: url.created_at,
      },
    })
  } catch (err) {
    console.log(err)
    const code = err.code || 500
    const message = err.message || 'Internal Server Error'
    res.status(code).json({
      message,
    })
  }
})

app.use('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const url = await UrlModel.findOne({ urlId: id })
    if (!url) {
      return res.status(404).json({
        message: 'URL not found',
      })
    }
    await UrlModel.updateOne({ urlId: id }, { $inc: { clicks: 1 } })

    // await TrackingModel.create({
    //   urlId: id,
    //   ipAddress: req.ip,
    //   userAgent: req.get('User-Agent'),
    //   source: req.get('Referrer'),
    //   platform: req.get('Platform'),
    //   system: req.get('System'),
    //   browser: req.get('Browser'),
    //   brand: req.get('Brand'),
    //   language: req.get('Language'),
    //   location: req.get('Location'),
    // })
    // return res.redirect(url.originalUrl)
    return res.json({
      message: 'URL found',
    })
  } catch (err) {
    console.log(err)
    const code = err.code || 500
    const message = err.message || 'Internal Server Error'
    res.status(code).json({
      message,
    })
  }
})

app.use('/api', router)

app.listen(PORT, () => {
  console.info(`[LOG] > Server is running on port ${PORT}`)
})
