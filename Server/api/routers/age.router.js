const express = require('express');
const { createAge, getAllAge, getById, updateAge, deleteAge } = require('../controllers/age.controller');

const router = express.Router();


router.get('/', getAllAge);
router.get('/:ageId', getById);
router.post('/', createAge);
router.put('/:ageId', updateAge);
router.delete('/:ageId', deleteAge);

module.exports = router;