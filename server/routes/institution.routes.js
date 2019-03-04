const express = require('express');
const passport = require('passport');
const router = express.Router();

const institution = require('../controllers/institution.controller');

router.get('/', passport.authenticate('jwt', {session:false}), institution.getInstitutions);
router.get('/:id', institution.getInstitution);
router.get('/auth/:id', institution.authInstitutionInfo);
router.post('/', institution.createInstitution);
router.put('/:id', institution.editInstitutions);
router.delete('/:id', institution.deleteInstitutions);

module.exports = router;
