import { JobApplication } from "../models/jobApplicationSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import cloudinary from 'cloudinary';

// Function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
  return await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "jobApplications",
  });
};

// Mock database to store OTPs for simplicity (same as in otpController.js)
const otpDatabase = {};

export const postJobApplication = catchAsyncErrors(async (req, res, next) => {
  const {
    reg,
    fullName,
    email,
    phone,
    cgpa,
    dob,
    gender,
    address,
    caste,
    gapYears,
    careerPlans,
    ssc,
    sscSchool,
    hsc,
    hscSchool,
    branch,
    projects,
    internship,
    workExperience,
    skills,
    electiveSubjects,
    communicationLanguages,
    references,
    research,
    certifications,
    workshops,
    achievements,
    resume,
    idCard,
    linkedinProfile,
    githubProfile,
    portfolio,
    preferredLocation,
    noticePeriod,
    expectedSalary,
    currentSalary,
    availability,
    awards,
    hobbies,
    extraCurricularActivities,
    patents,
    professionalMemberships,
    languagesKnown,
    maritalStatus,
    nationality,
    passportNumber,
    visaStatus,
    drivingLicense,
    disability
    // otp
  } = req.body;

  // Verify OTP
  // if (!otpDatabase[email] || otpDatabase[email] !== parseInt(otp)) {
  //   return next(new ErrorHandler("Invalid or missing OTP", 400));
  // }

  // Check for missing fields
  if (
    !reg ||
    !fullName ||
    !email ||
    !phone ||
    !cgpa ||
    !dob ||
    !gender ||
    !address ||
    !caste ||
    !gapYears ||
    !careerPlans ||
    !ssc ||
    !sscSchool ||
    !hsc ||
    !hscSchool ||
    !branch ||
    !projects ||
    !internship ||
    !workExperience ||
    !skills ||
    !electiveSubjects ||
    !communicationLanguages ||
    !references ||
    !research ||
    !resume ||
    !idCard ||
    !preferredLocation ||
    !noticePeriod ||
    !expectedSalary ||
    !currentSalary ||
    !availability ||
    !hobbies ||
    !extraCurricularActivities ||
    !patents ||
    !professionalMemberships ||
    !languagesKnown ||
    !maritalStatus ||
    !nationality ||
    !passportNumber ||
    !visaStatus ||
    !drivingLicense ||
    !disability
  ) {
    return next(new ErrorHandler("Please fill out the entire form!", 400));
  }

  const jobApplication = new JobApplication({
    reg,
    fullName,
    email,
    phone,
    cgpa,
    dob,
    gender,
    address,
    caste,
    gapYears,
    careerPlans,
    ssc,
    sscSchool,
    hsc,
    hscSchool,
    branch,
    projects,
    internship,
    workExperience,
    skills,
    electiveSubjects,
    communicationLanguages,
    references,
    research,
    linkedinProfile,
    githubProfile,
    portfolio,
    preferredLocation,
    noticePeriod,
    expectedSalary,
    currentSalary,
    availability,
    hobbies,
    extraCurricularActivities,
    patents,
    professionalMemberships,
    languagesKnown,
    maritalStatus,
    nationality,
    passportNumber,
    visaStatus,
    disability,
  });

  // Upload proofs and documents if available
  const uploadFiles = async (files) => {
    const proofs = {};
    for (const [key, file] of Object.entries(files)) {
      const upload = await uploadToCloudinary(file);
      proofs[key] = {
        public_id: upload.public_id,
        url: upload.secure_url,
        verification: {
          isVerified: false,
          verifiedBy: null,
          verifiedAt: null,
        },
      };
    }
    return proofs;
  };

  if (req.files) {
    const uploadedFiles = await uploadFiles(req.files);
    Object.assign(jobApplication, uploadedFiles);
  }

  await jobApplication.save();

  res.status(200).json({
    success: true,
    jobApplication,
    message: "Job Application Submitted!",
  });

  // Remove OTP after successful application submission
  // delete otpDatabase[email];
});

export const updateJobApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const {
    reg,
    fullName,
    email,
    phone,
    cgpa,
    dob,
    gender,
    address,
    caste,
    gapYears,
    careerPlans,
    ssc,
    sscSchool,
    hsc,
    hscSchool,
    branch,
    projects,
    internship,
    workExperience,
    skills,
    electiveSubjects,
    communicationLanguages,
    references,
    research,
    linkedinProfile,
    githubProfile,
    portfolio,
    preferredLocation,
    noticePeriod,
    expectedSalary,
    currentSalary,
    availability,
    hobbies,
    extraCurricularActivities,
    patents,
    professionalMemberships,
    languagesKnown,
    maritalStatus,
    nationality,
    passportNumber,
    visaStatus,
    disability,
    verificationUpdates // New field for verification updates
  } = req.body;

  const jobApplication = await JobApplication.findById(id);
  if (!jobApplication) {
    return next(new ErrorHandler("Job Application Not Found!", 404));
  }

  jobApplication.reg = reg || jobApplication.reg;
  jobApplication.fullName = fullName || jobApplication.fullName;
  jobApplication.email = email || jobApplication.email;
  jobApplication.phone = phone || jobApplication.phone;
  jobApplication.cgpa = cgpa || jobApplication.cgpa;
  jobApplication.dob = dob || jobApplication.dob;
  jobApplication.gender = gender || jobApplication.gender;
  jobApplication.address = address || jobApplication.address;
  jobApplication.caste = caste || jobApplication.caste;
  jobApplication.gapYears = gapYears || jobApplication.gapYears;
  jobApplication.careerPlans = careerPlans || jobApplication.careerPlans;
  jobApplication.ssc = ssc || jobApplication.ssc;
  jobApplication.sscSchool = sscSchool || jobApplication.sscSchool;
  jobApplication.hsc = hsc || jobApplication.hsc;
  jobApplication.hscSchool = hscSchool || jobApplication.hscSchool;
  jobApplication.branch = branch || jobApplication.branch;
  jobApplication.projects = projects || jobApplication.projects;
  jobApplication.internship = internship || jobApplication.internship;
  jobApplication.workExperience = workExperience || jobApplication.workExperience;
  jobApplication.skills = skills || jobApplication.skills;
  jobApplication.electiveSubjects = electiveSubjects || jobApplication.electiveSubjects;
  jobApplication.communicationLanguages = communicationLanguages || jobApplication.communicationLanguages;
  jobApplication.references = references || jobApplication.references;
  jobApplication.research = research || jobApplication.research;
  jobApplication.linkedinProfile = linkedinProfile || jobApplication.linkedinProfile;
  jobApplication.githubProfile = githubProfile || jobApplication.githubProfile;
  jobApplication.portfolio = portfolio || jobApplication.portfolio;
  jobApplication.preferredLocation = preferredLocation || jobApplication.preferredLocation;
  jobApplication.noticePeriod = noticePeriod || jobApplication.noticePeriod;
  jobApplication.expectedSalary = expectedSalary || jobApplication.expectedSalary;
  jobApplication.currentSalary = currentSalary || jobApplication.currentSalary;
  jobApplication.availability = availability || jobApplication.availability;
  jobApplication.hobbies = hobbies || jobApplication.hobbies;
  jobApplication.extraCurricularActivities = extraCurricularActivities || jobApplication.extraCurricularActivities;
  jobApplication.patents = patents || jobApplication.patents;
  jobApplication.professionalMemberships = professionalMemberships || jobApplication.professionalMemberships;
  jobApplication.languagesKnown = languagesKnown || jobApplication.languagesKnown;
  jobApplication.maritalStatus = maritalStatus || jobApplication.maritalStatus;
  jobApplication.nationality = nationality || jobApplication.nationality;
  jobApplication.passportNumber = passportNumber || jobApplication.passportNumber;
  jobApplication.visaStatus = visaStatus || jobApplication.visaStatus;
  jobApplication.disability = disability || jobApplication.disability;

  // Upload and update proofs if available
  const uploadFiles = async (files) => {
    const proofs = {};
    for (const [key, file] of Object.entries(files)) {
      await cloudinary.v2.uploader.destroy(jobApplication[key].public_id);
      const upload = await uploadToCloudinary(file);
      proofs[key] = {
        public_id: upload.public_id,
        url: upload.secure_url,
        verification: jobApplication[key].verification || {
          isVerified: false,
          verifiedBy: null,
          verifiedAt: null,
        },
      };
    }
    return proofs;
  };

  if (req.files) {
    const uploadedFiles = await uploadFiles(req.files);
    Object.assign(jobApplication, uploadedFiles);
  }

  // Update verification status if provided
  if (verificationUpdates) {
    Object.keys(verificationUpdates).forEach(field => {
      if (jobApplication[field] && jobApplication[field].verification) {
        jobApplication[field].verification.isVerified = verificationUpdates[field].isVerified;
        jobApplication[field].verification.verifiedBy = verificationUpdates[field].verifiedBy;
        jobApplication[field].verification.verifiedAt = verificationUpdates[field].verifiedAt;
      }
    });
  }

  await jobApplication.save();

  res.status(200).json({
    success: true,
    jobApplication,
    message: "Job Application Updated Successfully!",
  });
});

export const getJobApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const jobApplication = await JobApplication.findById(id);
  if (!jobApplication) {
    return next(new ErrorHandler("Job Application Not Found!", 404));
  }
  res.status(200).json({
    success: true,
    jobApplication,
  });
});

export const getAllJobApplications = catchAsyncErrors(async (req, res, next) => {
  const jobApplications = await JobApplication.find();
  res.status(200).json({
    success: true,
    jobApplications,
  });
});

export const deleteJobApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const jobApplication = await JobApplication.findById(id);
  if (!jobApplication) {
    return next(new ErrorHandler("Job Application Not Found!", 404));
  }

  // Delete files from Cloudinary
  const deleteFiles = async (proof) => {
    if (proof && proof.public_id) {
      await cloudinary.v2.uploader.destroy(proof.public_id);
    }
  };

  for (const key in jobApplication._doc) {
    if (jobApplication[key] && jobApplication[key].public_id) {
      await deleteFiles(jobApplication[key]);
    }
  }

  await jobApplication.remove();

  res.status(200).json({
    success: true,
    message: "Job Application Deleted Successfully!",
  });
});
