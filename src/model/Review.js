const mongoose = require("mongoose");
const Course = require("./Course"); // Course modelini doğru şekilde içe aktarın

const reviewSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 🚀 Ortalama puanı güncelleyen statik metod
reviewSchema.statics.updateCourseRating = async function (courseId) {
  const reviews = await this.find({ course: courseId });
  const reviewCount = reviews.length;

  if (reviewCount === 0) {
    await Course.findByIdAndUpdate(courseId, { averageRating: 0, reviewCount: 0, reviews: [] });
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviewCount;

  await Course.findByIdAndUpdate(courseId, {
    averageRating,
    reviewCount,
    reviews: reviews.map((r) => r._id),
  });
};

// 🚀 Yorum eklendiğinde otomatik güncelle
reviewSchema.post("save", async function () {
  // `Review.updateCourseRating` fonksiyonu doğru çağrılır
  await this.constructor.updateCourseRating(this.course); // `Review` modelindeki fonksiyon çağrılıyor
  await Course.findByIdAndUpdate(this.course, { $addToSet: { reviews: this._id } });
});

// 🚀 Yorum silindiğinde otomatik güncelle
reviewSchema.post("remove", async function () {
  // `Review.updateCourseRating` fonksiyonu doğru çağrılır
  await this.constructor.updateCourseRating(this.course); // `Review` modelindeki fonksiyon çağrılıyor
  await Course.findByIdAndUpdate(this.course, { $pull: { reviews: this._id } });
});
module.exports = mongoose.model('Review', reviewSchema);
