import User from "../models/User.js";

export const usersService = {
   async getUsers() {
    const users = await User.find();
    if (!users) {
      throw new Error('No registered users!');
    }
  }
};
