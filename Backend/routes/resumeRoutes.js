 import express from "express"
import protect from "../middlewares/authmiddleware"
import { createResume, deleteResume, getPublicResumeById, getResumeById } from "../Controller/resumeController"
import upload from "../config/multer"

 const resumeRouter = express.Router()

 resumeRouter.post('/create', protect, createResume)
 resumeRouter.put('/update', upload.single('image') , protect, updateResume)
  resumeRouter.delete('/delete/:resumeId', protect, deleteResume)
   resumeRouter.get('/get/:resumeId', protect, getResumeById)
    resumeRouter.get('/public/:resumeId',  getPublicResumeById)

    export default resumeRouter