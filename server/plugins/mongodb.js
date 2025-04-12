import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  console.log('Mongo URI:', config.mongoUri); // Debug the URI
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
});