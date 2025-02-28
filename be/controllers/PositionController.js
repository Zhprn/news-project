const db = require('../models');
const Position = db.position;

// add position 
exports.addPosition = async (req, res) => {
    const {kategori} = req.body
    
    try {
        const position = await Position.create({kategori})
        res.status(201).json({position})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// update position
exports.updatePosition = async (req, res) => {
    let id = req.params.id
    try {
        const position = await Position.update({where : {id : id}})
        res.status(201).json({message : "update succes"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// delete position
exports.deletePosition = async(req, res) => {
    let id = req.params.id
    try {
        await Position.destroy({where : {id:id}})
        res.status(201).json({message : "delete succes"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get all position
exports.getAllPosition = async (req, res) => {
    try {
        const position = await Position.findAll();
        res.status(201).json({position})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get one
exports.getOnePosition = async (req, res) => {
    let id = req.params.id
    try {
        const position = await Position.findOne({where : {id:id}})
        res.status(201).json({position})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}