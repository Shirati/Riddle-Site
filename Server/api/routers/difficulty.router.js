const express = require('express');
const { getAllDifficulty, getById, createDifficulty, updatedDifficulty, deleteDifficulty } = require('../controllers/difficulty.controller');

const router = express.Router();


router.get('/', getAllDifficulty);
router.get('/:difficultyId', getById);
router.post('/', createDifficulty);
router.put('/:difficultyId', updatedDifficulty);
router.delete('/:difficultyId', deleteDifficulty);

module.exports = router;