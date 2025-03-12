const CategoryService = require("../services/CategoryService");

const getCategory = async (req, res) => {
    try {
        const allCategories = await CategoryService.getAll();
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await CategoryService.add(name);
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryService.delete(id);
        res.status(200).json({ message: "Kategori başarılı bir şekilde silindi", deletedCategory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await CategoryService.update(id, name);
        res.status(200).json({ message: "Kategori başarıyla güncellendi!", updatedCategory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
};
