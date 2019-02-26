const express = require('express');
const router = express.Router();

const Upload = require('../models/upload');
const upload = require('../controllers/upload.controller');

router.post('/file', Upload.single('file'), upload.uploadFile);
router.get('/', upload.getUploadedFiles);
router.get('/:filename', upload.getUploadedFile);
router.get('/download/:filename', upload.downloadFile);
router.get('/image/:filename', upload.showUploadedFile);
router.delete('/file/delete/:id', upload.DeleteUploadedFile);
module.exports = router;
