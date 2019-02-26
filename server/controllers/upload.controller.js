const careerCTRL = {};
const config = require('../config/database');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoURI = config.database;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

careerCTRL.uploadFile = async (req, res) => {
    res.json({ file: req.file });
};

careerCTRL.getUploadedFiles = async (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.json({ success: false, code: '404', msg: 'No files exist' });
        }
        // Files exist
        return res.json({ success: true, code: '200', msg: 'Files exist', files: files });
    });
};

careerCTRL.getUploadedFile = async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.json({ success: false, code: '404', msg: 'No file exists' });
        }
        // Files exist
        return res.json({ success: true, code: '200', msg: 'File exist', file: file });
    });
};

careerCTRL.showUploadedFile = async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.json({ success: false, code: '404', msg: 'No file exists' });
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            return res.json({ success: false, code: '500', msg: 'It is not an image' });
        }
    });
};

careerCTRL.DeleteUploadedFile = async (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) throw err;
        res.json({ success: true, code: '200', msg: 'File Deleted Successfuly' });
    });
};

careerCTRL.downloadFile = async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.json({ success: false, code: '404', msg: 'No file exists' });
        }
        var readstream = gfs.createReadStream({ filename: req.params.filename });
        readstream.pipe(res);            
    });
};

module.exports = careerCTRL;