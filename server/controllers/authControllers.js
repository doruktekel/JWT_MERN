import userModel from "../models/userModels.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

const test = (req, res) => {
  res.status(200).json("test func is working");
};

// register   endpoint

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /// name

    if (!name) {
      return res.status(500).json({ error: "Name cant be empty !" });
    }

    /// password

    if (!password || password.length < 6) {
      return res
        .status(500)
        .json({ error: "Password is required and must be at least 6 char !" });
    }

    /// email

    if (!email) {
      return res.status(500).json({ error: "Email is required !" });
    }

    const haveEmail = await userModel.findOne({ email });

    if (haveEmail) {
      return res
        .status(500)
        .json({ error: "We have already a user with this email !" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

// login endpoint

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      return res.status(500).json({ error: "User not found" });
    }

    const compareResult = await comparePassword(password, foundUser.password); // comparePassword(password , hashedPassword) queue is important

    if (!compareResult) {
      return res.status(500).json({ error: "Credentials are wrong" });
    }

    jwt.sign(
      {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token).status(200).json(foundUser);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const profileInfo = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, (err, profile) => {
    if (err) throw err;
    res.status(200).json(profile);
  });
};

export { test, register, login, profileInfo };
