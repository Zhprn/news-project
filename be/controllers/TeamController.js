const db = require('../models');
const Team = db.team;
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

exports.addTeam = [upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'portofolio', maxCount: 1 }]), async (req, res) => {
    const { nama, spesialis, posisi, deskripsi, instagram, linkedin } = req.body;
    const foto = req.files['foto'] ? req.files['foto'][0] : null;
    const portofolio = req.files['portofolio'] ? req.files['portofolio'][0] : null;

    if (!foto) {
        return res.status(422).json({ msg: 'Foto is required' });
    }

    const allowedImageTypes = ['.png', '.jpg', '.jpeg'];
    const fotoExt = path.extname(foto.originalname).toLowerCase();
    if (!allowedImageTypes.includes(fotoExt)) {
        return res.status(422).json({ msg: 'Invalid image type. Only .png, .jpg, .jpeg are allowed.' });
    }

    if (foto.size > 5000000) { 
        return res.status(422).json({ msg: 'Image must be less than 5 MB' });
    }

    if (portofolio) {
        const allowedPdfTypes = ['.pdf'];
        const portofolioExt = path.extname(portofolio.originalname).toLowerCase();
        if (!allowedPdfTypes.includes(portofolioExt)) {
            return res.status(422).json({ msg: 'Invalid file type. Only .pdf is allowed for portofolio.' });
        }

        if (portofolio.size > 10000000) { // 10 MB
            return res.status(422).json({ msg: 'Portofolio must be less than 10 MB' });
        }
    }

    try {
        const fotoUrl = `${req.protocol}://${req.get('host')}/public/uploads/${foto.filename}`;
        const portofolioUrl = portofolio ? `${req.protocol}://${req.get('host')}/public/uploads/${portofolio.filename}` : null;

        const team = await Team.create({
            nama,
            spesialis,
            posisi,
            deskripsi,
            foto: fotoUrl,
            portofolio: portofolioUrl,
            instagram,
            linkedin
        });

        res.status(201).json({ team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

// Fungsi untuk memperbarui data Team
exports.updateTeam = [upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'portofolio', maxCount: 1 }]), async (req, res) => {
    const id = req.params.id;
    const { nama, spesialis, posisi, deskripsi, instagram, linkedin } = req.body;
    const foto = req.files['foto'] ? req.files['foto'][0] : null;
    const portofolio = req.files['portofolio'] ? req.files['portofolio'][0] : null;

    try {
        const team = await Team.findOne({ where: { id: id } });
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        let fotoUrl = team.foto;
        let portofolioUrl = team.portofolio;
        
        // Update foto jika ada file baru
        if (foto) {
            const allowedImageTypes = ['.png', '.jpg', '.jpeg'];
            const fotoExt = path.extname(foto.originalname).toLowerCase();
            if (!allowedImageTypes.includes(fotoExt)) {
                return res.status(422).json({ msg: 'Invalid image type. Only .png, .jpg, .jpeg are allowed.' });
            }

            if (foto.size > 5000000) { // 5 MB
                return res.status(422).json({ msg: 'Image must be less than 5 MB' });
            }

            // Hapus foto lama jika ada
            if (team.foto) {
                const oldFotoPath = path.join(__dirname, '../', team.foto.replace(`${req.protocol}://${req.get('host')}/`, ''));
                if (fs.existsSync(oldFotoPath)) {
                    fs.unlinkSync(oldFotoPath);
                }
            }

            fotoUrl = `${req.protocol}://${req.get('host')}/public/uploads/${foto.filename}`;
        }

        // Update portofolio jika ada file baru
        if (portofolio) {
            const allowedPdfTypes = ['.pdf'];
            const portofolioExt = path.extname(portofolio.originalname).toLowerCase();
            if (!allowedPdfTypes.includes(portofolioExt)) {
                return res.status(422).json({ msg: 'Invalid file type. Only .pdf is allowed for portofolio.' });
            }

            if (portofolio.size > 10000000) { // 10 MB
                return res.status(422).json({ msg: 'Portofolio must be less than 10 MB' });
            }

            // Hapus portofolio lama jika ada
            if (team.portofolio) {
                const oldPortofolioPath = path.join(__dirname, '../', team.portofolio.replace(`${req.protocol}://${req.get('host')}/`, ''));
                if (fs.existsSync(oldPortofolioPath)) {
                    fs.unlinkSync(oldPortofolioPath);
                }
            }

            portofolioUrl = `${req.protocol}://${req.get('host')}/public/uploads/${portofolio.filename}`;
        }

        const [updated] = await Team.update({
            nama,
            spesialis,
            posisi,
            deskripsi,
            foto: fotoUrl,
            portofolio: portofolioUrl,
            instagram,
            linkedin
        }, { where: { id: id } });

        if (updated) {
            const updatedTeam = await Team.findOne({ where: { id: id } });
            res.status(200).json({ updatedTeam });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

// Fungsi untuk mendapatkan semua data Team
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.status(200).json({ teams });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk mendapatkan satu data Team berdasarkan ID
exports.getOneTeam = async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Team.findOne({ where: { id: id } });
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }
        res.status(200).json({ team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk menghapus data Team
exports.deleteTeam = async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Team.findOne({ where: { id: id } });
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Hapus file foto jika ada
        if (team.foto) {
            const fotoPath = path.join(__dirname, '../', team.foto.replace(`${req.protocol}://${req.get('host')}/`, ''));
            if (fs.existsSync(fotoPath)) {
                fs.unlinkSync(fotoPath);
            }
        }

        // Hapus file portofolio jika ada
        if (team.portofolio) {
            const portofolioPath = path.join(__dirname, '../', team.portofolio.replace(`${req.protocol}://${req.get('host')}/`, ''));
            if (fs.existsSync(portofolioPath)) {
                fs.unlinkSync(portofolioPath);
            }
        }

        // Hapus data dari database
        await Team.destroy({ where: { id: id } });
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};