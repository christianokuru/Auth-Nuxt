// server/routes/signup.post.js

import { z } from 'zod'
import User from '../models/User'
import { readBody, createError, setHeader } from 'h3'

// Define the input validation schema for sign up
const bodySchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const body = await readBody(event)

  try {
    // Validate the body using Zod schema
    const { email, username, password } = bodySchema.parse(body)

    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already in use',
      })
    }

    // Create new user instance and hash the password
    const newUser = new User({
      email,
      username,
      password,
    })

    // Save the user in the database
    await newUser.save()

    // Return the user data as a success response
    return {
      success: true,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    }
  } catch (error) {
    // Ensure the response is in JSON format
    setHeader(event, 'Content-Type', 'application/json')

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Sign up failed',
    })
  }
})
