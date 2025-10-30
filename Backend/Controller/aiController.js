
import Resume from "../models/Resume.js"


export const enhanceProfessionalSummary = async (req, res) =>{
    try {
        const {userContent} = req.body
        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }
         const response = await ai.chat.completions.create({
            module: process.env.OPENAI_MODEL,
            message:[
                {role: "system", content: "You are an expert in resume writing Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Makeit compelling and ATS-friendly. and only return text no options or anything else."},
                {
                    role:"user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
         return res.status(400).json({message: error.message})
    }
}


export const enhanceJobDescription= async (req, res) =>{
    try {
        const {userContent} = req.body
        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }
         const response = await ai.chat.completions.create({
            module: process.env.OPENAI_MODEL,
            message:[
                {role: "system", 
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. use action verbs and quantifiable results where possible. Make its ATS-friendly. and only return text no options or anything else."},
                {
                    role:"user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
         return res.status(400).json({message: error.message})
    }
}




export const uploadResume= async (req, res) =>{
    try {
          const {resumeText, title} =req.body
          const userId = req.userId

          if(!resumeText){
             return res.status(400).json({message: 'Missing required fields'})
          }

          const systemPrompt ="You are an expert AI Agent to extract data from resume."
          const userPrompt = `extract data fromthis resume: ${resumeText}
           Provide data in the following JSON format with no additional text before or after:
          `

          
         const response = await ai.chat.completions.create({
            module: process.env.OPENAI_MODEL,
            message:[
                {role: "system", 
                    content:systemPrompt},
                {
                    role:"user",
                    content: userPrompt,
                },
            ],  
            response_format:{type:'json_object'}
        })
        const extractedData = response.choices[0].message.content;
        const parseData =JSON.parse( extractedData)
        const newResume = await Resume.create({userId, title, ...parseData})
         res.json({resumeId: newResume._id})
    } catch (error) {
         return res.status(400).json({message: error.message})
    }
}