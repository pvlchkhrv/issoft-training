import {authService} from "./authService.js";

export const authController = {
  async register(req, res) {
    try {
      const {email, password} = req.body;
      console.log(req.body)
      await authService.register(email, password);
      res.json({message: 'User has been registered!'});
    } catch (e) {
      console.log({message: e.message})
      res.status(400).json({message: e.message});
    }
  },

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const token = await authService.login(email, password);
      res.json({token});
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  }
};
