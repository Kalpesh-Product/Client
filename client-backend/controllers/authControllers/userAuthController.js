const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const registerLogs = require("../../utils/loginLogs");
const bcrypt = require("bcryptjs");
const generatePassword = require("../../utils/passwordGenerator");
const mailer = require("../../config/nodemailerConfig");
const emailTemplates = require("../../utils/emailTemplates");

const login = async (req, res, next) => {
  try {
    const ipAddress = req.ip;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
      await registerLogs({
        email,
        status: "failed",
        ip: ipAddress,
        message: "Invalid credentials format",
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!password)
      return res.status(400).json({ message: "Invalid credentials" });

    const userExists = await User.findOne({ "personalInfo.email": email })
      .lean()
      .exec();

    if (!userExists) {
      await registerLogs({
        email,
        status: "failed",
        ip: ipAddress,
        message: "Invalid credentials format",
      });
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userExists.credentials.password
    );
    if (!isPasswordValid) {
      await registerLogs({
        email,
        status: "failed",
        ip: ipAddress,
        message: "Invalid credentials format",
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          userId: userExists._id,
          role: userExists.role,
          email: userExists.personalInfo.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        email: userExists.personalInfo.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    await registerLogs({
      email,
      status: "success",
      ip: ipAddress,
      message: "Login successful",
    });

    await User.findOneAndUpdate({ _id: userExists._id }, { refreshToken });

    res.cookie("clientCookie", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    delete userExists.refreshToken;
    delete userExists.credentials.password;
    delete userExists.updatedAt;

    res.status(200).json({ user: userExists, accessToken });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.clientCookie) return res.sendStatus(204);

    const refreshToken = cookie.clientCookie;
    const foundUser = await User.findOne({ refreshToken }).lean().exec();

    if (!foundUser) {
      res.clearCookie("clientCookie", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await User.findOneAndUpdate({ _id: foundUser._id }, { refreshToken: null })
      .lean()
      .exec();

    res.clearCookie("clientCookie", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      role,
      department,
      designation,
      company,
      selectedServices,
      empId,
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !designation || !company || !empId) {
      return res
        .status(400)
        .json({ message: "Invalid data: Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email }).lean().exec();
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Generate password
    const password = generatePassword(8, {
      upper: true,
      lower: true,
      number: true,
      symbol: true,
    });

    // Hash password
    const hashPwd = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({
      empId,
      name,
      email,
      role: role || "masterAdmin", // Default to "masterAdmin" if role is not provided
      department,
      selectedServices,
      password: hashPwd,
      designation,
      company,
      phone,
    });

    // Send email with user credentials
    const userMailOptions = emailTemplates(email, name, password);
    await Promise.all([newUser.save(), mailer.sendMail(userMailOptions)]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logOut, createUser };
