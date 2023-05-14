import mongoose from "mongoose";
import User from "./models/user.js";
import Company from "./models/company.js";
import Vacancy from "./models/vacancy.js";
import Applies from "./models/vacancyApplies.js";

export async function connectDB(connectionString) {
  await mongoose.connect(connectionString);
}
