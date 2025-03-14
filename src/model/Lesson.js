const mongoose = require("mongoose");
const path = require("path"); 
const slugify = require("slugify");
const Course = require("./Course");

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    content: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    file: { type: String }, // Dosya yolu saklanacak
    folderPath: {
      type: String,
      required: true,
      default: function () {
        return path.join(__dirname, "uploads", "courses", this.course.toString(), this.title);
      },
    },
  },
  { timestamps: true }
);

// **Slug oluşturma middleware**
lessonSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });

    let slug = baseSlug;
    let counter = 1;

    while (await mongoose.model("Lesson").findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

// **Ders eklendiğinde Course modeline ekle**
lessonSchema.post("save", async function (doc) {
  await Course.findByIdAndUpdate(doc.course, {
    $addToSet: { lessons: doc._id },
  });
});

// **Ders silindiğinde Course modelinden kaldır**
lessonSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Course.findByIdAndUpdate(doc.course, {
      $pull: { lessons: doc._id },
    });
  }
});

// **Eğer ders farklı bir kursa taşınırsa eski kurstan çıkarıp yeni kursa ekle**
lessonSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    const oldCourseId = doc.course;
    const newCourseId = this.getUpdate().course;

    if (oldCourseId.toString() !== newCourseId.toString()) {
      await Course.findByIdAndUpdate(oldCourseId, { $pull: { lessons: doc._id } });
      await Course.findByIdAndUpdate(newCourseId, { $addToSet: { lessons: doc._id } });
    }
  }
});

// **Slug ile ders bulma fonksiyonu**
lessonSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug }).populate("course");
};

module.exports = mongoose.model("Lesson", lessonSchema);
