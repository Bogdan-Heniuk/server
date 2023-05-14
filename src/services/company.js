import CompanyModel from "../db/models/company.js";

class Company {
  async get(userId) {
    try {
      const company = await CompanyModel.findOne({ creator: userId });
      return company;
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }

  async create({
    name = "",
    description = "",
    siteLink = "",
    douLink = "",
    creator,
  }) {
    try {
      const newCompany = await CompanyModel.create({
        name,
        description,
        siteLink,
        douLink,
        creator,
      });

      return newCompany;
    } catch (e) {
      console.log("Failed to create company", e);
      throw e;
    }
  }

  async update(userId, payload) {
    try {
      const updated = await CompanyModel.updateOne({ creator: userId }, payload);
      return updated;
    } catch (e) {
      console.log("Failed to update company", e);
      throw e;
    }
  }
}

export default new Company();
