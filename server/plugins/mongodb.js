// import mongoose from 'mongoose';

// export default defineNitroPlugin(async () => {
//   const config = useRuntimeConfig();
//   console.log('Mongo URI:', config.mongoUri); // Debug the URI
//   try {
//     await mongoose.connect(config.mongoUri);
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//   }
// });


// FOR LOCAL DB CONNECTION

import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(config.mongoUri, { //CHNAGE 'mongoUri' to whatever it is in the nuxt.config file
        dbName: 'auth', // optional
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      console.log('✅ Connected to MongoDB successfully!')
    } catch (err) {
      console.error('❌ Failed to connect to MongoDB:', err.message)
    }
  } else {
    console.log('⚠️ MongoDB already connected. Skipping reconnection.')
  }
})