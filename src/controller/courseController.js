const Course = require("../model/Course");
const User = require("../model/User");

const getCourse = async (req, res) => { 
    try {
        const userId = req.user;
        
        const courses = await Course.find()
            .populate("category", "name") 
            .populate("instructor", "name email"); 
        if (courses.length === 0) {
            return res.status(404).json({ message: "Kurs bulunamadı!" });
        }
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getCourseSlug = async (req, res) => { 
    try {
        const {slug} = req.params;
        const findSlug = await Course.findOne({slug});
        console.log(findSlug)
        const userId = req.user;
        const courses = await Course.find()
            .populate("category", "name") 
            .populate("instructor", "name email"); 
        if (courses.length === 0) {
            return res.status(404).json({ message: "Kurs bulunamadı!" });
        }
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addCourse =async (req,res)=>{
    try {
        const userId = req.user._id;
        const {title,description,category} = req.body;
        const addCourse = new Course({
            title:title,
            description:description,
            category:category,
            instructor:userId
        });
        await addCourse.save();
        res.status(200).json({message : "Başarılı bir şekilde kurs eklendi!",addCourse});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};
const updateCourse =async(req,res)=>{
    try {
        const {id} =req.params;
        const {title,description} =req.body;
        const course = await Course.findById(id);
        if(!course) return res.status(404).json({message : "kurs bulunamadı!"});
        if(title) course.title = title;
        if(description) course.description = description;
        await course.save();    
        res.status(200).json({message :"Başarıyla güncellendi", course});
    } catch (error) {
        res.status(500).json({message :error.message});
    }
};
const deleteCourse =async (req,res)=>{
    try {
        const {id} = req.params;
        const courseCheck = await Course.findById(id);
        if(!courseCheck) return res.status(404).json({message : "kurs bulunamadı!"});
        const deleteCourse = await Course.findByIdAndDelete(id);
        res.status(200).json({message : "Başarılı bir şekilde silindi", deleteCourse});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

module.exports = {
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseSlug
}