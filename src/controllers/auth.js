import AuthService from "../services/auth.js";

class Auth {
  async registration(req, res) {
    try {
      const { email, password, role, username } = req.body;
      const location = req.file?.location;

      const token = await AuthService.registration({
        username,
        email,
        password,
        role,
        avatar: location,
      });

      res.status(201).json(token);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });
      res.json(token);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }
}

export default new Auth();
