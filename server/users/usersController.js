import {usersService} from "./usersService.js";

export const usersController = {
  async getUsers(req, res) {
    try {
      const users = await usersService.getUsers();
      res.json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },
  async getUser(req, res) {
    try {
      const {userId} = req.body;
      const user = await usersService.getUser(userId)
    } catch (e) {

    }
  },
  async updateUser(req, res) {
    try {

    } catch (e) {

    }
  },
  async deleteUser(req, res) {
    try {

    } catch (e) {

    }
  }
};
