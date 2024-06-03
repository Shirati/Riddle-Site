const express = require('express');
const { getAllSubject, getById, createSubject, updatedSubject, deleteSubject  } = require('../controllers/subject.controller');

const router = express.Router();


router.get('/', getAllSubject);
router.get('/:SubjectId', getById);
router.post('/', createSubject);
router.put('/:subjectId', updatedSubject);
router.delete('/:subjectId', deleteSubject);

module.exports = router;