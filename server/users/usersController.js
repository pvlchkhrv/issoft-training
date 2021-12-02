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
};
