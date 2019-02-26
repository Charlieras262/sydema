const express = require('express');
const passport = require('passport');
const router = express.Router();

const career = require('../controllers/careers.controller');

router.get('/', passport.authenticate('jwt', {session:false}), career.getCareers);
router.get('/:id', career.getCareer);
router.get('/auth/:id', career.authCareerInfo);
router.post('/', career.createCareer);
router.put('/:id', career.editCareers);
router.delete('/:id', career.deleteCareers);

module.exports = router;
