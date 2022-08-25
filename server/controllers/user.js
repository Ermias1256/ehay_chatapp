import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mongoose from "mongoose";

import User from "../models/user.js";

import { sendMailFromGmail } from "../utils/mailer.js";
import { randomNumber } from "../utils/utils.js";
import { getError } from "../utils/constants.js";

const errorType = "AUTH";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    //check if the user exists in DB
    if (!existingUser) {
      return res.status(404).json(getError(errorType, 1001));
    }

    // check if the passowrd is correct
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res.status(404).json(getError(errorType, 1002));
    }

    /* check if email is verified and if not update the
       DB with new random 6-digit verification code
       to be emailed to the user */
    if (!existingUser.emailVerified) {
      // generate the verification code
      existingUser.verificationCode = randomNumber(100000, 200000);

      const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        existingUser,
        {
          new: true,
        }
      );

      // TODO - send email

      return res.status(200).json({ result: updatedUser });
    }

    // if everything is ok. create a token
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "4h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(404).json(getError(errorType, 1003));

    if (password !== confirmPassword)
      return res.status(404).json(getError(errorType, 1004));

    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code and save data
    const verificationCode = randomNumber(100000, 200000);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      verificationCode: verificationCode,
      emailVerified: false,
    });

    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
