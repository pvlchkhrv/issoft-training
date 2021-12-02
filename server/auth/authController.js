import {authService} from "./authService.js";

export const authController = {
  async register(req, res) {
    try {
      const {email, password} = req.body;
      console.log(req.body)
      await authService.register(email, password);
      res.json({message: 'User has been registered!'}); // return???
    } catch (e) {
      console.log(e)
      res.status(400).json({message: e.message});
    }
  },

  async login(req, res) {
    try {
      const {email, password} = req.body;
      await authService.login(email, password);
      const token = await authService.generateAccessToken()
      res.json({token});
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  }
};
