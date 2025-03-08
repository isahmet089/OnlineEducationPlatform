const mongoose = require('mongoose');

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
    type: String,  // Ders materyali için dosya URL'si
  },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
