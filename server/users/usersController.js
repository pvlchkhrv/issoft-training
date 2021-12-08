import {usersService} from "./usersService.js";
export const usersController = {
  async getUsers(req, res) {
    if (req.query._id) {
      await usersController.getUser(req, res);
    } else {
      try {
        const users = await usersService.getUsers();
        res.status(200).json(users);
      } catch (e) {
        res.status(400).json({message: e.message});
      }
    }
  },
  async getUser(req, res) {
    try {
      const {_id} = req.query;
      console.log(req.query);
      const user = await usersService.getUser(_id);
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  },
  async updateUser(req, res) {
    try {
      console.log(req.body);
      const updatedUser = req.body;
      console.log(updatedUser)
      const message = await usersService.updateUser(updatedUser);
      res.status(200).json(message);
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  },
  async deleteUser(req, res) {
    try {
      const {_id} = req.body;
      console.log(req.body);
      const message = await usersService.deleteUser(_id);
      res.status(200).json(message);
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  }
};
