import express from "express";
import {
  deleteJobApplication,
  getAllJobApplications,
  postJobApplication,
  updateJobApplication,
  // updateJobApplicationStatus,
  getJobApplicationDetail,
  getJobApplicationByEmail
  // toggleVerificationStatus
  
  // updateProofs
} from "../controller/jobApplicationController.js";
// import {sendOtp,verifyOtp} from "../controller/otpController.js";
// import upload from "../middlewares/multer.js";

const router = express.Router();
// router.post("/api/v1/sendOtp", sendOtp);

// router.post("/api/v1/verifyOtp", verifyOtp);
// Route to post a new job application
router.post("/post", postJobApplication);

// Route to get all job applications
router.get("/getall", getAllJobApplications);

// Route to update the status of a job application
// router.put("/update-status/:id", updateJobApplicationStatus);

// Route to update an existing job application
router.put("/update/:id", updateJobApplication);

// Route to update the proofs of a job application
// router.put("/update-proofs/:id", upload.fields([
//   { name: 'cgpaProof', maxCount: 1 },
//   { name: 'sscProof', maxCount: 1 },
//   { name: 'hscProof', maxCount: 1 }
// ]), updateProofs);

// Route to delete a job application
router.delete("/delete/:id", deleteJobApplication);

// Route to get the details of a job application
router.get("/detail/:reg", getJobApplicationDetail);
router.get('/details/:email', getJobApplicationByEmail);
// router.put('/jobApplication/verify/:id', toggleVerificationStatus);



export default router;
