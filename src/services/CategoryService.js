const Category = require("../model/Category");
class CategoryService {
    constructor(categoryModel) {
        this.categoryModel= categoryModel;
    }
    async getAll() {
        const allCategories = await this.categoryModel.find();
        if (allCategories.length === 0) {
            throw new Error("Sistemde kayıtlı bir kategori bulunamadı.");
        }
        return {allCategories};
    }
    async add(name){
        const newCategory = new this.categoryModel({ name :name});
        await newCategory.save();
        return {newCategory}
    }
    async delete(id) {
        const deleteCategory = await this.categoryModel.findByIdAndDelete(id);
        if (!deleteCategory) {
            throw new Error("Böyle bir kategori bulunamadı.");
        }
        return deleteCategory;
    }
    async update(id, name) {
        const updateCategory = await this.categoryModel.findByIdAndUpdate(
            id, 
            { name: name },
            { new: true } // Güncellenmiş veriyi döndürmesi için
        );
        if (!updateCategory) {
            throw new Error("Güncellenecek kategori bulunamadı.");
        }
        return updateCategory;
    }
    async getOneSlugCategori(categoriSlug) {
        const slugCategori = await this.categoryModel.findOne(categoriSlug);
        if (slugCategori.length === 0) {
            throw new Error("Sistemde kayıtlı bir kategori bulunamadı.");
        }
        return {slugCategori};
    }
}

module.exports= new CategoryService(Category);