import User from "../models/User";

export default defineEventHandler(async () => {
  try {
    const users = await User.find(); // Fetch all documents in the User collection
    return users; // Return the data as JSON
  } catch (error) {
    return { error: "Failed to fetch users", details: error.message };
  }
});
