const db = require('../models');
const Gallery = db.galery;
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// Tambah Gambar
exports.addImage = [upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(422).json({ msg: 'No file uploaded' });

        const allowedTypes = ['.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedTypes.includes(ext)) {
            fs.unlinkSync(file.path);
            return res.status(422).json({ msg: 'Invalid image type. Only .png, .jpg, .jpeg are allowed.' });
        }

        if (file.size > 5000000) {
            fs.unlinkSync(file.path);
            return res.status(422).json({ msg: 'Image must be less than 5 MB' });
        }

        const url = `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`;
        const image = await Gallery.create({ foto: url });
        res.status(201).json({ image });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

// Update Gambar
exports.updateImage = [upload.single('file'), async (req, res) => {
    try {
        const id = req.params.id;
        const file = req.file;
        const image = await Gallery.findOne({ where: { id: id } });
        if (!image) return res.status(404).json({ msg: 'Image not found' });

        let url = image.foto;

        if (file) {
            const allowedTypes = ['.png', '.jpg', '.jpeg'];
            const ext = path.extname(file.originalname).toLowerCase();
            if (!allowedTypes.includes(ext)) {
                fs.unlinkSync(file.path);
                return res.status(422).json({ msg: 'Invalid image type. Only .png, .jpg, .jpeg are allowed.' });
            }

            if (file.size > 5000000) {
                fs.unlinkSync(file.path);
                return res.status(422).json({ msg: 'Image must be less than 5 MB' });
            }

            url = `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`;

            // Hapus gambar lama jika ada
            if (image.foto) {
                const oldImagePath = path.join(__dirname, '../public/uploads', path.basename(image.foto));
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
        }

        await Gallery.update({ foto: url }, { where: { id: id } });
        const updatedImage = await Gallery.findOne({ where: { id: id } });
        res.status(200).json({ updatedImage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

// Get Semua Gambar
exports.getAllImages = async (req, res) => {
    try {
        const images = await Gallery.findAll();
        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Satu Gambar
exports.getOneImage = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await Gallery.findOne({ where: { id: id } });
        if (!image) return res.status(404).json({ msg: 'Image not found' });
        res.status(200).json({ image });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hapus Gambar
exports.deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await Gallery.findOne({ where: { id: id } });
        if (!image) return res.status(404).json({ message: 'Image not found' });

        if (image.foto) {
            const imagePath = path.join(__dirname, '../public/uploads', path.basename(image.foto));
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await Gallery.destroy({ where: { id: id } });
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};