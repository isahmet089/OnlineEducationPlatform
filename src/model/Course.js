const mongoose = require("mongoose");
const slugify = require("slugify");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 }, // Ortalama puan
    reviewCount: { type: Number, default: 0 }, // Değerlendirme sayısı
  },
  { timestamps: true }
);

// Slug oluşturma middleware
courseSchema.pre("save", async function (next) {
  try {
    if (this.isModified("title") || !this.slug) {
      // Slug options
      const slugOptions = {
        lower: true,        // Küçük harfe çevir
        strict: true,       // Özel karakterleri kaldır
        trim: true,         // Başındaki ve sonundaki boşlukları temizle
        locale: "tr",       // Türkçe karakter desteği
      };

      // Base slug oluştur
      let baseSlug = slugify(this.title, slugOptions);

      // Eğer aynı slug'dan varsa, sonuna numara ekle
      let slug = baseSlug;
      let counter = 1;

      while (await mongoose.model("Course").findOne({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      this.slug = slug;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Slug ile kurs bulma için static method
courseSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug }).populate("category instructor lessons");
};
module.exports = mongoose.model("Course", courseSchema);
