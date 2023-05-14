export function mapUserProfileUpdateData(payload) {
  const avatar = payload.files?.avatar?.[0]?.location;
  const cv = payload.files.cv && {
    location: payload.files?.cv?.[0]?.location,
    fileName: payload.files?.cv?.[0]?.originalname,
  };

  const result = {
    email: payload.email,
    username: payload.name,
    avatar,
    searchingStatus: payload.searchingStatus,
    contacts: {
      phoneNumber: payload.phoneNumber,
      telegram: payload.telegram,
      linkedInLink: payload.linkedInLink,
      githubLink: payload.githubLink,
      portfolioLink: payload.portfolioLink,
    },
    cv,
    jobSpecs: {
      salaryExpectations: !Number.isNaN(Number(payload.salaryExpectations)) ? Number(payload.salaryExpectations) : undefined,
      workExperience: !Number.isNaN(Number(payload.workExperience)) ? Number(payload.workExperience) : undefined,
      specialty: payload.specialty,
      englishLevel: payload.englishLevel,
    },
  };

  return result
}
