const mongoose = require('mongoose');
const path = require('path'); // Node.js path modülü (dosya yolunu kontrol etmek için)
const Course = require('./Course');

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

// **Ders eklendiğinde Course modeline ekle**
lessonSchema.post("save", async function (doc) {
  await Course.findByIdAndUpdate(doc.course, {
    $addToSet: { lessons: doc._id }, // `lessons` dizisine ekler (tekrar eklemeyi önler)
  });
});

// **Ders silindiğinde Course modelinden kaldır**
lessonSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Course.findByIdAndUpdate(doc.course, {
      $pull: { lessons: doc._id }, // `lessons` dizisinden çıkarır
    });
  }
});

// **Ders güncellendiğinde bir şey yapmana gerek yok çünkü lesson ID'si değişmez.**
// Ancak `courseId` değişirse eski kurs listesinden çıkarmak gerekebilir (ekleyelim):
lessonSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    const oldCourseId = doc.course;
    const newCourseId = this.getUpdate().course;

    if (oldCourseId.toString() !== newCourseId.toString()) {
      // Eski kurstan kaldır
      await Course.findByIdAndUpdate(oldCourseId, {
        $pull: { lessons: doc._id },
      });

      // Yeni kursa ekle
      await Course.findByIdAndUpdate(newCourseId, {
        $addToSet: { lessons: doc._id },
      });
    }
  }
});


module.exports = mongoose.model('Lesson', lessonSchema);
