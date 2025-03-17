const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Connection"); // Import the connection function
const cors = require("cors");
const User = require("./models/User");
const MechanicProfile = require("./models/MechanicProfile");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
 // Call the connection function

// Routes

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { email, password, name, shopName, location, pincode, images } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ email, password });
    await user.save();

    // Create a mechanic profile linked to the user
    const mechanicProfile = new MechanicProfile({
      userId: user._id,
      name,
      shopName,
      location,
      pincode,
      images,
    });
    await mechanicProfile.save();

    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login a user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get mechanic profile by user ID
app.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the mechanic profile
    const profile = await MechanicProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});