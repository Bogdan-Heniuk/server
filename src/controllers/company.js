import { BadRequest } from "../common/errors.js";
import CompanyService from "../services/company.js";
class Company {
  async get(req, res) {
    try {
      const { user } = req;
      const company = await CompanyService.get(user);
      res.json(company);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async update(req, res) {
    try {
      const { _id: userId } = req.user;
      const payload = req.body;
      const location = req.file?.location;

      const updated = await CompanyService.update(userId, {
        ...payload,
        avatar: location,
      });
      res.json(updated);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }
}

export default new Company();
