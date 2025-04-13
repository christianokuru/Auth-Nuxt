// server/api/login.post.js

import { z } from 'zod'
import User from '../models/User'
import LoginLog from '../models/LoginLog'
import { readBody, getRequestIP, getRequestHeaders, createError } from 'h3'
import { UAParser } from 'ua-parser-js'
// Optional geoIP support
// import { $fetch } from 'ofetch'

const bodySchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export default defineEventHandler(async (event) => {
    // Set response header to indicate JSON response
    event.res.setHeader('Content-Type', 'application/json')
  
    const body = await readBody(event)
    const headers = getRequestHeaders(event)
    const ip = getRequestIP(event)
  
    const userAgent = headers['user-agent'] || ''
    const parser = new UAParser(userAgent)
    const parsedUA = parser.getResult()
    const deviceInfo = `${parsedUA.device?.type || 'desktop'} - ${parsedUA.os?.name || 'Unknown OS'}`
  
    let loginStatus = 'fail'
  
    try {
      // Validate body
      const { email, password } = bodySchema.parse(body)
  
      // Check if user exists
      const user = await User.findOne({ email })
      if (!user) throw createError({ statusCode: 401, message: 'Invalid email or password' })
  
      // Check password
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) throw createError({ statusCode: 401, message: 'Invalid email or password' })
  
      loginStatus = 'success'
  
      // Set session
      await setUserSession(event, {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          loggedInAt: new Date().toISOString(),
        },
      })
  
      // Return JSON response
      return {
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.username,
        },
      }
    } catch (error) {
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.message || 'Login failed',
      })
    } finally {
      // Optional: GeoIP location
      // let location = 'Unknown'
      // try {
      //   const geo = await $fetch(`http://ip-api.com/json/${ip}`)
      //   location = `${geo.city}, ${geo.country}`
      // } catch (e) {}
  
      await LoginLog.create({
        email: body?.email || 'unknown',
        ip,
        userAgent,
        device: deviceInfo,
        status: loginStatus,
        // location, // ← Uncomment if you're using geoIP
        timestamp: new Date(),
      })
    }
  })
  