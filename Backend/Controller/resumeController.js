import Resume from "../models/Resume";

export const createResume = async (req, res)=>{
    try {
        const userId = req.userId;
        const {title} = req.body

        const newResume = await Resume.create({userId , title})

        return res.status(400).json({message: 'resume create successfully', resume: newResume})
    } catch (error) {
         return res.status(400).json({message: error.message})
    }
}

export const deleteResume = async(req,res)=>{
    try {
        const userId = req.userId;
        const {resumeId} = req.params
        await Resume.findOneAndDelete({userId, _id: resumeId})

        return res.status(200).json({message: 'Resume deleted successfully'})
        
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}



export const getResumeById = async(req,res)=>{
    try {
        const userId = req.userId;
        const {resumeId} = req.params
        await Resume.findOneAndDelete({userId, _id: resumeId})


         const resume = await Resume.findOne({userId, _id: resumeId})
        if(!resume){
            return res.status(404).json({message: "Resume not found"})
        }


        resume.__v = undefined;
        resume.createAt = undefined;
        resume.updateAt = undefined;

        
        return res.status(200).json({resume})
        
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export const getPublicResumeById = async(req, res)=>{
    try {
        const {resumeId} = req.params;
        const resume = await Resume.findOne({public: true, _id: resumeId})

        if(!resume){
            return res.status(404).json({message: "Resume not found "})
        }

        return res.status(200).json({resume})
        
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


export const updateResume = async (req, res) =>{
    try {
         const userId = req.userId;
         const {resumeId , resumeData, removeBackground} = req.body
    } catch (error) {
        
    }
}