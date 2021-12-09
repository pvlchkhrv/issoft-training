import {authService} from "./authService.js";

export const authController = {
  async register(req, res) {
    try {
      const {email, password} = req.body;
      await authService.register(email, password);
      res.json({message: 'User has been registered!'});
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  },

  async login(req, res) {
    console.log(req.body)
    try {
      const {email, password} = req.body;
      const {user, token} = await authService.login(email, password);
      res.json({user, token});
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  }
};
