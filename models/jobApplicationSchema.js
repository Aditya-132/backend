import mongoose from "mongoose";
import validator from "validator";

// Schema for verification status
const verificationStatusSchema = new mongoose.Schema({
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: String,
    default: null,
  },
  verifiedAt: {
    type: Date,
    default: null,
  }
}, { _id: false });

// Schema for proofs and documents
const proofSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Proof URL is required!"]
  },
  public_id: {
    type: String,
    required: [true, "Proof Public ID is required!"]
  },
  verification: {
    type: verificationStatusSchema,
    default: () => ({})
  }
}, { _id: false });

const jobApplicationSchema = new mongoose.Schema({
  reg: {
    type: String,
    required: [true, "Registration Number is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  fullName: {
    type: String,
    required: [true, "Full Name is Required!"],
    minLength: [3, "Full Name Must Contain At Least 3 Characters!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  phone: {
    type: String,
    required: [true, "Phone is Required!"],
    minLength: [10, "Phone Number Must Contain At Least 10 Digits!"],
    maxLength: [15, "Phone Number Must Contain No More Than 15 Digits!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  cgpa: {
    type: Number,
    required: [true, "CGPA is Required!"],
    min: [0, "CGPA Must Be At Least 0!"],
    max: [10, "CGPA Must Be At Most 10!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  cgpaProof: {
    type: proofSchema,
    required: [true, "CGPA Proof is Required!"],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  gender: {
    type: String,
    required: [true, "Gender is Required!"],
    enum: ["Male", "Female", "Other"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  address: {
    type: String,
    required: [true, "Address is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  caste: {
    type: String,
    required: [true, "Caste is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  gapYears: {
    type: Number,
    required: [true, "Gap Years are Required!"],
    min: [0, "Gap Years Must Be At Least 0!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  careerPlans: {
    type: String,
    required: [true, "Career Plans are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  ssc: {
    type: Number,
    required: [true, "SSC Percentage is Required!"],
    min: [0, "SSC Percentage Must Be At Least 0!"],
    max: [100, "SSC Percentage Must Be At Most 100!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  sscProof: {
    type: proofSchema,
    required: [true, "SSC Proof is Required!"],
  },
  sscSchool: {
    type: String,
    required: [true, "SSC School is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  hsc: {
    type: Number,
    required: [true, "HSC Percentage is Required!"],
    min: [0, "HSC Percentage Must Be At Least 0!"],
    max: [100, "HSC Percentage Must Be At Most 100!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  hscProof: {
    type: proofSchema,
    required: [true, "HSC Proof is Required!"],
  },
  hscSchool: {
    type: String,
    required: [true, "HSC School is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  branch: {
    type: String,
    required: [true, "Branch is Required!"],
    enum: ["Electrical", "Mechanical", "CSE", "Civil", "Electronics"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  projects: {
    type: String,
    required: [true, "Projects are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  internship: {
    type: String,
    required: [true, "Internship Details are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  workExperience: {
    type: String,
    required: [true, "Work Experience is Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  skills: {
    type: String,
    required: [true, "Skills are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  electiveSubjects: {
    type: String,
    required: [true, "Elective Subjects are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  communicationLanguages: {
    type: String,
    required: [true, "Communication Languages are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  references: {
    type: String,
    required: [true, "References are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  research: {
    type: String,
    required: [true, "Research Details are Required!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  certifications: {
    type: [proofSchema],
    required: [true, "Certifications are Required!"],
  },
  workshops: {
    type: [proofSchema],
    required: [true, "Workshops are Required!"],
  },
  achievements: {
    type: [proofSchema],
    required: [true, "Achievements are Required!"],
  },
  resume: {
    type: proofSchema,
    required: [true, "Resume is Required!"],
  },
  idCard: {
    type: proofSchema,
    required: [true, "ID Card is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Additional Fields
  linkedinProfile: {
    type: String,
    validate: [validator.isURL, "Provide A Valid LinkedIn Profile URL!"]
  },
  githubProfile: {
    type: String,
    validate: [validator.isURL, "Provide A Valid GitHub Profile URL!"]
  },
  portfolio: {
    type: String,
    validate: [validator.isURL, "Provide A Valid Portfolio URL!"]
  },
  preferredLocation: {
    type: String,
    required: [true, "Preferred Job Location is Required!"]
  },
  noticePeriod: {
    type: Number,
    required: [true, "Notice Period (in days) is Required!"]
  },
  expectedSalary: {
    type: Number,
    required: [true, "Expected Salary is Required!"]
  },
  currentSalary: {
    type: Number,
    required: [true, "Current Salary is Required!"]
  },
  availability: {
    type: String,
    required: [true, "Availability is Required!"],
    enum: ["Immediate", "Within 1 Month", "Within 3 Months"]
  },
  certifications: {
    type: [proofSchema],
    required: [true, "Certifications are Required!"]
  },
  awards: {
    type: [proofSchema],
    required: [true, "Awards are Required!"]
  },
  hobbies: {
    type: String,
    required: [true, "Hobbies are Required!"]
  },
  extraCurricularActivities: {
    type: String,
    required: [true, "Extra Curricular Activities are Required!"]
  },
  patents: {
    type: String,
    required: [true, "Patents are Required!"]
  },
  professionalMemberships: {
    type: String,
    required: [true, "Professional Memberships are Required!"]
  },
  languagesKnown: {
    type: String,
    required: [true, "Languages Known are Required!"]
  },
  maritalStatus: {
    type: String,
    required: [true, "Marital Status is Required!"],
    enum: ["Single", "Married", "Divorced", "Widowed"]
  },
  nationality: {
    type: String,
    required: [true, "Nationality is Required!"]
  },
  passportNumber: {
    type: String,
    required: [true, "Passport Number is Required!"],
    minLength: [8, "Passport Number Must Be At Least 8 Characters!"],
    maxLength: [9, "Passport Number Must Be No More Than 9 Characters!"],
    verification: {
      type: verificationStatusSchema,
      default: () => ({})
    }
  },
  visaStatus: {
    type: String,
    required: [true, "Visa Status is Required!"]
  },
  drivingLicense: {
    type: proofSchema,
    required: [true, "Driving License Proof is Required!"],
  },
  disability: {
    type: String,
    required: [true, "Disability Details are Required!"]
  }
});

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
