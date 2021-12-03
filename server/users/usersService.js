import User from "../models/User.js";

export const usersService = {
   async getUsers() {
    const users = await User.find();
    if (!users) {
      throw new Error('No users have been registered!');
    }
    return users;
  },
  async getUser(userId) {
     const user = await User.findById({_id: userId});
     if (!user) {
       throw new Error('No user has been found!');
     }
     return user;
  },
  async updateUser(userId, updatedUser) {
     const res = await User.replaceOne({_id: userId}, updatedUser);
     if (!res.acknowledged) {
       throw new Error ('User modification went wrong!')
     }
     return {message: 'User successfully modified!'}
  }
};
