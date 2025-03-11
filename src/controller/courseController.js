const Course = require("../model/Course");

const getCourse = async (req,res)=>{
    try {
        const courses = await Course.find()
        if(!courses) return res.status(404).json({message : "Kurs bulunamadı!"});
        res.status(200).json({message : {courses}});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};
const addCourse =async (req,res)=>{
    
};
const updateCourse =async(req,res)=>{
    
};
const deleteCourse =async (req,res)=>{
    
};

module.exports = {
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}