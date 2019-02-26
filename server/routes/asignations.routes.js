const express = require('express');
const router = express.Router();
const passport = require('passport')

const career = require('../controllers/asignations.controller');

router.get('/', passport.authenticate('jwt', {session: false}), career.getAsignations);
router.get('/:id', career.getAsignation);
router.post('/', career.createAsignation);
router.put('/:id', career.editAsignation);
router.delete('/:id', career.deleteAsignation);
router.get('/auth/:id', career.authAsignationInfo);
router.put('/add/:id', career.addAsignation);
router.put('/del/:id', career.delAsignation);

module.exports = router;