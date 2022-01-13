import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const usersService = {
  async getUsers() {
    const users = await User.find();
    if (!users) {
      throw new Error('No users have been registered!');
    }
    return users;
  },
  async getUser(_id) {
    const user = await User.findById({_id});
    if (!user) {
      throw new Error('No user has been found!');
    }
    return user;
  },
  async updateUser(updatedUser) {
    const _id = updatedUser._id
    const res = await User.replaceOne({_id}, updatedUser);
    if (!res.acknowledged) {
      throw new Error('User modification went wrong!')
    }
    return {message: 'User successfully modified!'}
  },
  async updateUserPassword(_id, oldPassword, newPassword) {
    const user = await User.findById({_id});
    const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
    if (isValidPassword) {
      user.password = bcrypt.hashSync(newPassword, 5);
      await user.save();
      return {message: `User's password successfully modified!`}
    } else {
      throw new Error('Wrong password!');
    }
  },
  async deleteUser(_id) {
    const res = await User.deleteOne({_id});
    if (res.deletedCount === 0) {
      throw new Error('User deletion went wrong!')
    }
    return {message: 'User successfully deleted!'}
  }
};
