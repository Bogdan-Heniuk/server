import UserService from "../services/user.js";
import AuthService from "../services/auth.js";

import { mapUserProfileUpdateData } from "../dataMappers/userProfile.js";
class User {
  async getByFitler(req, res) {
    try {
      const filter = req.body || {};
      const user = req.user;
      const users = await UserService.getByFitler(filter, user);
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async getById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getById(userId);
      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async update(req, res) {
    try {
      const payload = req.body;
      const files = req.files;
      const userId = req.user._id;

      const preparedData = mapUserProfileUpdateData({ ...payload, files });

      const updated = await UserService.update(userId, preparedData);
      const token = await AuthService.generateToken(updated);
      res.json(token);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async apply(req, res) {
    try {
      const cv = req.file;
      const { coverLetter = "" } = req.body;
      const { vacancyId } = req.params;
      const { user } = req;

      await VacancyService.apply(vacancyId, user._id, cv, coverLetter);

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }
}

export default new User();
