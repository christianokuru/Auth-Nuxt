import { z } from 'zod';
import User from '../models/User';
import { readBody, createError, setHeader } from 'h3';


// Define the input validation schema for sign up
const bodySchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const body = await readBody(event);

  try {
    // Validate the body using Zod schema
    const { email, username, password } = bodySchema.parse(body);

    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already in use',
      });
    }

    // Create new user instance
    const newUser = new User({
      email,
      username,
      password, // Password will be hashed by User model's pre-save hook
    });

    // Save the user in the database
    await newUser.save();

    // Create a session to log the user in automatically
    await setUserSession(event, {
      user: {
        id: newUser._id.toString(), // Convert MongoDB ObjectId to string for session
        email: newUser.email,
        username: newUser.username,
        loggedInAt: new Date().toISOString(), // Track login time
      },
    });

    // get the user session
    const session = await getUserSession(event);

    // Return the user data as a success response
    return {
      success: true,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      session,
    };
  } catch (error) {
    // Ensure the response is in JSON format
    setHeader(event, 'Content-Type', 'application/json');

    // Handle validation or database errors
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Sign up failed',
    });
  }
});