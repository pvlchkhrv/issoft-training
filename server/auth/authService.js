import jwt from "jsonwebtoken";
import secret from "../config.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const authService = {
  async register(email, password) {
    const registeredUser = await User.findOne({email});
    if (registeredUser) {
      throw new Error('User has been already registered!');
    }
    const hashPassword = bcrypt.hashSync(password, 5);
    const user = new User({
      email,
      password: hashPassword,
      birthDate: null,
      name: null,
      sex: null,
      isSmoker: null
    });
    await user.save();
  },

  async login(email, password) {
    const user = await User.findOne({email});
    if (!user) {
      throw new Error(`No user with email: ${email}`);
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error('Wrong password');
    }
    return await this.generateAccessToken(user._id)
  },

  generateAccessToken(userId) {
    const payload = {
      userId
    }
    return jwt.sign(payload, secret.key, {expiresIn: '24h'});
  }
};
