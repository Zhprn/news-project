const db = require('../models');
const Gallery = db.gallery;
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
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
        const image = await Gallery.create({ foto: url });
        res.status(201).json({ image });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

// Update Gambar
exports.updateImage = [upload.single('file'), async (req, res) => {
    const id = req.params.id;
    const file = req.file;

    try {
        const image = await Gallery.findOne({ where: { id: id } });
        if (!image) {
            return res.status(404).json({ msg: 'Image not found' });
        }

        let url = image.foto;

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

            // Hapus gambar lama
            if (image.foto) {
                const oldImagePath = path.join(__dirname, '../', image.foto.replace(`${req.protocol}://${req.get('host')}/`, ''));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const [updated] = await Gallery.update({ foto: url }, { where: { id: id } });

        if (updated) {
            const updatedImage = await Gallery.findOne({ where: { id: id } });
            res.status(201).json({ updatedImage });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

// Get Semua Gambar
exports.getAllImages = async (req, res) => {
    try {
        const images = await Gallery.findAll();
        res.status(201).json({ images });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Satu Gambar
exports.getOneImage = async (req, res) => {
    let id = req.params.id;
    try {
        const image = await Gallery.findOne({ where: { id: id } });
        res.status(201).json({ image });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hapus Gambar
exports.deleteImage = async (req, res) => {
    let id = req.params.id;
    try {
        const image = await Gallery.findOne({ where: { id: id } });
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        if (image.foto) {
            const imagePath = path.join(__dirname, '../', image.foto.replace(`${req.protocol}://${req.get('host')}/`, ''));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Gallery.destroy({ where: { id: id } });
        res.status(201).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
