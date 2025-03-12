const mongoose = require('mongoose');
const path = require('path'); // Node.js path modülü (dosya yolunu kontrol etmek için)

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  file: {
    type: String,  // Ders materyali için dosya yolunun saklanacağı alan
    // Dosya uzantısına göre validasyon eklenebilir (örneğin sadece PDF, MP4 vs.)
  },
  // Ders materyali için ilgili klasör yolu (belirtilen kurs adına göre)
  folderPath: {
    type: String, 
    required: true,
    default: function() {
      return path.join(__dirname, 'uploads', 'courses', this.course.toString(), this.title); // Dinamik olarak klasör yolu oluşturulur.
    },
  }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
