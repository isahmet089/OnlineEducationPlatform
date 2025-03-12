const fs = require('fs');
const path = require('path');

// Yeni ders eklendiğinde tetiklenecek fonksiyon
const createLessonFolder = (courseId, lessonTitle) => {
    const baseFolderPath = path.join(__dirname,'..','uploads', 'courses', courseId.toString());
    const lessonFolderPath = path.join(baseFolderPath, lessonTitle);

    // Kurs klasörünü oluştur (eğer yoksa)
    if (!fs.existsSync(baseFolderPath)) {
        fs.mkdirSync(baseFolderPath, { recursive: true });
    }

    // Ders klasörünü oluştur
    if (!fs.existsSync(lessonFolderPath)) {
        fs.mkdirSync(lessonFolderPath);
    }
    return lessonFolderPath;
};
module.exports ={createLessonFolder};