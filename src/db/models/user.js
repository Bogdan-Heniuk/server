import mongoose from "mongoose";
import { Roles, EnglishLevel, filters } from "../../common/enums.js"; 

const { specialties } = filters;
const userSchema = new mongoose.Schema(
  {
    email: { type: "string", required: true },
    username: { type: "string", required: true },
    password: { type: "string", required: true },
    avatar: { type: "string", default: "" },
    role: {
      type: "string",
      required: true,
      enum: [Roles.Candidate, Roles.Recruter],
    },
    searchingStatus: {
      type: "Boolean",
      default: true,
      enum: [],
    },
    contacts: {
      phoneNumber: String,
      telegram: String,
      linkedInLink: String,
      githubLink: String,
      portfolioLink: String,
    },
    cv: {
      fileName: String,
      location: String,
    },
    jobSpecs: {
      salaryExpectations: Number,
      workExperience: Number,
      specialty: {
        type: "string",
        enum: [...specialties.nonTechnical, ...specialties.technical],
      },
      englishLevel: {
        type: "string",
        enum: Object.values(EnglishLevel),
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
