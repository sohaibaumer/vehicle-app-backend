import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer"; // Import nodemailer library

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.values;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body.values;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "1662656",
    //     pass: "Abcdef@12345",
    //   },
    // });

    // const mailOptions = {
    //   from: "ropstamcars@gmail.com",
    //   to: user.email,
    //   subject: "Welcome to YourApp!",
    //   text: `Hello ${user.firstName} ${user.lastName}!\n\nWelcome to YourApp. Your password is: ${password}\n\nPlease keep your password secure.`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //   } else {
    //     console.log("Email sent:", info.response);
    //   }
    // });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  res.status(200).json({ user });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
