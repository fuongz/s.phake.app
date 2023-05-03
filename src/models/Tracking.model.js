import mongoose from 'mongoose'

const TrackingSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  osVersion: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  browserVersion: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const TrackingModel = mongoose.model('Tracking', TrackingSchema)
export default TrackingModel
