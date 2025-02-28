const db = require('../models');
const Post = db.post;
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext;
        cb(null, fileName);
    }
});

const upload = multer({storage : storage});

exports.addPost = [upload.single('file'), async(req, res) => {
    const {judul, slug, kategori, body} = req.body;
    const file = req.file;

    if (!file) {
        return res.status(422).json({ msg: 'No file uploaded' });
    }

    const fileSize = file.size;
    const ext = path.extname(file.originalname);
    const fileName = file.filename;
    const url = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;

    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: 'Invalid image type. Only .png, .jpg, .jpeg are allowed.' });
    }

    if (fileSize > 5000000) {
        return res.status(422).json({ msg: 'Image must be less than 5 MB' });
    }

    try {
        const post = await Post.create({
            judul,
            slug,
            kategori,
            foto : url,
            body    
        });
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}]

exports.updatePost = [upload.single('file'), async(req, res) => {
    const id = req.params.id;
    const {judul, slug, kategori, body} = req.body;
    const file = req.file;

    try {
        const post = await Post.findOne({where : {id:id}})
        if(!post) {
            return res.status(404).json({msg : 'Post not found'})
        }

        let url = post.foto

        if (file) {
            const fileSize = file.size;
            const ext = path.extname(file.originalname);
            const fileName = file.filename; 
            url = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;

            const allowedTypes = ['.png', '.jpg', '.jpeg'];

            if (!allowedTypes.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: 'Invalid image type. Only .png, .jpg, .jpeg are allowed.' });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ msg: 'Image must be less than 5 MB' });
            }

            if (post.foto) {
                const oldImagePath = path.join(__dirname, '../', post.foto.replace(`${req.protocol}://${req.get('host')}/`, ''));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const [updated] = await Post.update({
            judul,
            slug,
            kategori,
            foto : url,
            body
        }, {where : {id:id}});

        if(updated) { 
            const updatedPost = await Post.findOne({ where : {id:id}});
            res.status(201).json({updatedPost})
        }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}]

exports.getAllPost = async(req,res) => {
    try {
        const post = await Post.findAll();
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.getOnePost = async(req, res) => {
    let id = req.params.id
    try {
        const post = await Post.findOne({where : {id:id}})
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.deletePost = async(req, res) => {
    let id = req.params.id 
    try {
        const post = await Post.findOne({where : {id:id}})
        if (!post) {
            res.status(404).json({message : "Post not found"})
        }

        if (post.foto) {
            const imagePath = path.join(__dirname, '../', post.foto.replace(`${req.protocol}://${req.get('host')}/`, ''));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Post.destroy({where : {id:id}})
        res.status(201).json({message: "post delet succes"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}