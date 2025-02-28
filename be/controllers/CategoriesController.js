const db = require('../models');
const Categories = db.categories;

// add categories
exports.addEvent = async (req, res) => {
    const {nama_kategori, Slug} = req.body;

    try {
        const categories = await Categories.create({
            nama_kategori,
            Slug
        })
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
}

// update categories
exports.updateCategories = async (req, res) => {
    let id = req.params.id
    try {
        const categories = await Categories.update(req.body, {where : {id:id}})
        res.status(201).json({message : "Update Berhasil"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.getAllCategories =  async (req, res) => {
    try {
        const categories = await Categories.findAll()
        res.status(201).json({categories})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.getOneCategories = async (req, res) => {
    let id = req.params.id
    try {
        const categories = await Categories.findOne ({where : {id:id}})
        res.status(201).json({categories})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.deleteCategories = async (req, res) => {
    let id = req.params.id
    try {
        await Categories.destroy({where : {id:id}})
        res.status(201).json({message : "Berhasil DIhapus"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}