// server/models/LoginLog.js

import mongoose from 'mongoose'

const loginLogSchema = new mongoose.Schema({
  email: String,
  ip: String,
  userAgent: String,
  device: String,
  status: String, // 'success' or 'fail'
  location: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.LoginLog || mongoose.model('LoginLog', loginLogSchema)
