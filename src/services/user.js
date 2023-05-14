import UserModel from "../db/models/user.js";
import { Roles } from "../common/enums.js";
import CompanyService from "../services/company.js";
import { mapUserProfileUpdateData } from "../dataMappers/userProfile.js";

class User {
  async getByFitler(filter, user = null) {
    try {
      const users = await UserModel.find({
        ...filter,
        _id: { $ne: user?._id },
      }).lean();

      return users;
    } catch (e) {
      console.log("Failted to get users by filter", e);
      throw e;
    }
  }
  async getById(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (e) {
      console.log("Failed to get user by id", e);
      throw e;
    }
  }

  async create({ username, email, password, role, avatar }) {
    try {
      const newUser = await UserModel.create({
        username,
        email,
        password,
        role,
        avatar,
      });

      if (newUser.role === Roles.Recruter) {
        await CompanyService.create({
          creator: newUser._id,
        });
      }

      return newUser;
    } catch (e) {
      console.log("Failed to create user", e);
      throw e;
    }
  }

  async update(id, payload) {
    try {
      const updated = await UserModel.findByIdAndUpdate(id, payload);
      return updated;
    } catch (e) {
      console.log("Failed to update user", e);
      throw e;
    }
  }
}

export default new User();
