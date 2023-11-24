const express = require("express");
const router = express.Router();
const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await User.findOne({ userName: userName });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "user already exist", success: false });
    }
    const user = await new User({
      userName,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "user registered successfully", success: true });
  } catch (err) {
    console.log("registration failed", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.status(400).json({ error: "username and password required" });
    }
    const user = await User.findOne({ userName: userName }, { password: 1 });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res.json({
      message: "login successfull",
      success: "true",
      token,
    });
  } catch (err) {
    console.log("login failed", err);
  }
});

module.exports = router;
