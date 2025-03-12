const Category =require("../model/Category");


const getCategory = async(req,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const addCategory = async(req,res)=>{
    try {
        const {name}=req.body;
        const matchCATname = await Category.findOne({name});
        if(matchCATname) return res.status(400).json({message : "bu kadegoriden var zaten"});
        const newCategory = new Category({
            name:name,
        });
        await newCategory.save();
        res.status(200).json({message: "başarılı bir şekilde eklendi",newCategory});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const deleteCategory = async(req,res)=>{
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        if(!deleteCategory) return res.status(400).json({message : "böyle  bir kadegori yok!"})
        res.status(200).json({message: "kadegori başarılı bir şekilde silindi",deleteCategory});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
   
};
const updateCategory = async(req,res)=>{
    try {
        const {id}=req.params;
        const {name} =req.body;
        const updateCategory = await Category.findById(id);
        console.log(updateCategory)
        updateCategory.name = name;
        await updateCategory.save();
        res.status(200).json({message : "kadegori başarıyla güncellendi!",updateCategory});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    

};

module.exports={
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}