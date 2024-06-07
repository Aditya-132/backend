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
    ssc,
    hsc,
    projects,
    internship,
    branch,
    address,
    skills,
    references
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
    !ssc ||
    !hsc ||
    !projects ||
    !internship ||
    !branch ||
    !address ||
    !skills ||
    !references
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
    ssc,
    hsc,
    projects,
    internship,
    branch,
    address,
    skills,
    references,
  });

  // Upload proofs if available
  if (req.files && req.files.cgpaProof) {
    const cgpaProofUpload = await uploadToCloudinary(req.files.cgpaProof);
    jobApplication.cgpaProof = {
      public_id: cgpaProofUpload.public_id,
      url: cgpaProofUpload.secure_url,
      verification: {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null,
      },
    };
  }

  if (req.files && req.files.sscProof) {
    const sscProofUpload = await uploadToCloudinary(req.files.sscProof);
    jobApplication.sscProof = {
      public_id: sscProofUpload.public_id,
      url: sscProofUpload.secure_url,
      verification: {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null,
      },
    };
  }

  if (req.files && req.files.hscProof) {
    const hscProofUpload = await uploadToCloudinary(req.files.hscProof);
    jobApplication.hscProof = {
      public_id: hscProofUpload.public_id,
      url: hscProofUpload.secure_url,
      verification: {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null,
      },
    };
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
    ssc,
    hsc,
    projects,
    internship,
    branch,
    address,
    skills,
    references,
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
  jobApplication.ssc = ssc || jobApplication.ssc;
  jobApplication.hsc = hsc || jobApplication.hsc;
  jobApplication.projects = projects || jobApplication.projects;
  jobApplication.internship = internship || jobApplication.internship;
  jobApplication.branch = branch || jobApplication.branch;
  jobApplication.address = address || jobApplication.address;
  jobApplication.skills = skills || jobApplication.skills;
  jobApplication.references = references || jobApplication.references;

  // Upload and update proofs if available
  if (req.files && req.files.cgpaProof) {
    await cloudinary.v2.uploader.destroy(jobApplication.cgpaProof.public_id);
    const cgpaProofUpload = await uploadToCloudinary(req.files.cgpaProof);
    jobApplication.cgpaProof = {
      public_id: cgpaProofUpload.public_id,
      url: cgpaProofUpload.secure_url,
      verification: jobApplication.cgpaProof.verification || {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null,
      },
    };
  }

  if (req.files && req.files.sscProof) {
    await cloudinary.v2.uploader.destroy(jobApplication.sscProof.public_id);
    const sscProofUpload = await uploadToCloudinary(req.files.sscProof);
    jobApplication.sscProof = {
      public_id: sscProofUpload.public_id,
      url: sscProofUpload.secure_url,
      verification: jobApplication.sscProof.verification || {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null,
      },
    };
  }

  if (req.files && req.files.hscProof) {
    await cloudinary.v2.uploader.destroy(jobApplication.hscProof.public_id);
    const hscProofUpload = await uploadToCloudinary(req.files.hscProof);
    jobApplication.hscProof = {
      public_id: hscProofUpload.public_id,
      url: hscProofUpload.secure_url,
      verification: jobApplication.hscProof.verification || {
        isVerified: false,
        verifiedBy: null,
        verifiedAt: null,
      },
    };
  }

  // Update verification status if provided
  if (verificationUpdates) {
    Object.keys(verificationUpdates).forEach(field => {
      if (jobApplication[field] && jobApplication[field].verification) {
        jobApplication[field].verification.isVerified = verificationUpdates[field].isVerified;
        jobApplication[field].verification.verifiedBy = verificationUpdates[field].verifiedBy;
        jobApplication[field].verification.verifiedAt = new Date();
      }
    });
  }

  await jobApplication.save();

  res.status(200).json({
    success: true,
    jobApplication,
    message: "Job Application Updated!",
  });
});

// The remaining CRUD operations code...

export const getAllJobApplications = catchAsyncErrors(async (req, res, next) => {
  const jobApplications = await JobApplication.find();
  res.status(200).json({
    success: true,
    jobApplications,
  });
});

export const getJobApplicationDetail = catchAsyncErrors(async (req, res, next) => {
  const { reg } = req.params;
  const jobApplication = await JobApplication.findOne({ reg: reg });
  if (!jobApplication) {
    return next(new ErrorHandler("Job Application Not Found!", 404));
  }
  res.status(200).json({
    success: true,
    jobApplication,
  });
});

export const deleteJobApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const jobApplication = await JobApplication.findById(id);
  if (!jobApplication) {
    return next(new ErrorHandler("Job Application Not Found!", 404));
  }
  await cloudinary.v2.uploader.destroy(jobApplication.cgpaProof.public_id);
  await cloudinary.v2.uploader.destroy(jobApplication.sscProof.public_id);
  await cloudinary.v2.uploader.destroy(jobApplication.hscProof.public_id);
  await jobApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Application Deleted!",
  });
});

export const getJobApplicationByEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.params;

  try {
    const jobApplication = await JobApplication.findOne({ email });
    if (!jobApplication) {
      return next(new ErrorHandler("Job Application Not Found!", 404));
    }
    res.status(200).json({
      success: true,
      jobApplication,
    });
  } catch (error) {
    console.error("Error fetching job application:", error);
    return next(new ErrorHandler("An error occurred while fetching the job application", 500));
  }
});
