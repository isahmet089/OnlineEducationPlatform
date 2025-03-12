const Review = require("../model/Review");
const User = require("../model/User");
const Course =require("../model/Course");


const getReview = async (req,res)=>{
    try {
        const reviews = await Review.find();
        res.status(200).json({message : reviews});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const addReview = async (req, res) => {
    try {
      const { courseId, userId, rating, comment } = req.body;
  
      // Kursu bul
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Kurs bulunamadı" });
      }
  
      // Kullanıcıyı bul
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }
  
      // Yeni yorumu oluştur
      const newReview = new Review({
        course: courseId,
        user: userId,
        rating: rating,
        comment: comment,
      });
  
      // Yorum veritabanına kaydet
      await newReview.save();
  
      // Yorum ekledikten sonra kursun ortalama puanını güncelle (Review modelinden)
      await Review.updateCourseRating(courseId);  // Review modelinin fonksiyonu
  
      // Kursun reviews dizisine yeni yorumu ekle
      await Course.findByIdAndUpdate(courseId, { $addToSet: { reviews: newReview._id } });
  
      // Başarı mesajı gönder
      res.status(200).json({ message: "Başarıyla yorum eklendi", newReview });
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };
const deleteReview = async (req,res)=>{
    try {
        const {id} = req.body;
        const deleteReview = await Review.findById(id);
        if(!deleteReview) return res.json({messge : "boyle bir yorum  yok"});
        await Review.findByIdAndDelete(id);
        await Review.updateCourseRating(deleteReview.course);
        res.status(200).json({message : "yorum silindi",deleteReview});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};
const updateReview = async (req, res) => {
    try {
      const { courseId, userId, reviewId, rating, comment } = req.body;
  
      // Yorumun var olup olmadığını kontrol et
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Yorum bulunamadı" });
      }
  
      // Kullanıcı ve kurs doğrulaması
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "Bu yorumu sadece sahibi güncelleyebilir" });
      }
  
      // Yorumun güncellenmesi
      review.rating = rating;
      review.comment = comment;
  
      // Güncellenmiş yorumu kaydet
      await review.save();
  
      // Ortalama puanı güncelle
      await Review.updateCourseRating(courseId);
  
      res.status(200).json({ message: "Yorum başarıyla güncellendi", review });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports ={
    getReview,
    addReview,
    deleteReview,
    updateReview
}

