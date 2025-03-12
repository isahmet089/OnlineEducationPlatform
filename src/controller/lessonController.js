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
const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID bilgisi eksik!" });
        const deletedLesson = await Lesson.findByIdAndDelete(id);
        if (!deletedLesson) {
            return res.status(404).json({ message: "Böyle bir ders bulunamadı." });
        }

        res.status(200).json({ message: "Ders başarıyla silindi!", deletedLesson });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateLesson = async (req, res) => {                                                                                          
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!id) return res.status(400).json({ message: "ID bilgisi eksik!" });

        const updatedLesson = await Lesson.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ message: "Böyle bir ders bulunamadı." });
        }

        res.status(200).json({ message: "Ders başarıyla güncellendi!", updatedLesson });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports ={
    getLesson,
    addLesson,
    deleteLesson,
    updateLesson
}