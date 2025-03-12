const Lesson = require("../model/Lesson");
const {createLessonFolder} = require("../middleware/fsLesson");
const getLesson = async (req,res)=>{
    try {
        const lessons =await Lesson.find();
        res.status(200).json({message : "BÜTÜN DERSLER : ",lessons});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const addLesson = async (req,res)=>{
    try {
        const { title, content, courseId } = req.body;
        
        // Yeni ders için klasör oluştur
        const lessonFolderPath = createLessonFolder(courseId+title, title);

        // Yeni ders verisini kaydet
        const newLesson = new Lesson({
            title,
            content,
            course: courseId,
            folderPath: lessonFolderPath, // Yeni oluşturulan klasör yolu
        });

        await newLesson.save();
        res.status(200).json({ message: 'Ders başarıyla eklendi!', newLesson });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteLesson = async (req,res)=>{
    try {
        const {id} = req.body;
        const deleteLesson=await Lesson.findById(id);
        if(!id) return res.status(404).json({message :"boyle bir ders  yok"});
        res.status(200).json({message :"basarıyla silindi", deleteLesson});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const updateLesson = async (req,res)=>{

};

module.exports ={
    getLesson,
    addLesson,
    deleteLesson,
    updateLesson
}