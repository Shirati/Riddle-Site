const express = require('express');
const { getAllRiddle, getById, createRiddle, updatedRiddle, deleteRiddle,entryRiddle ,getCountSatisfied,getCountUnSatisfied,setCertified,getAllCertified} = require('../controllers/riddle.controller');
const upload = require('../middlewares/upload')
const router = express.Router();


router.get('/', getAllRiddle);
router.get('/getCountSatisfied', getCountSatisfied);
router.get('/getCountUnSatisfied', getCountUnSatisfied);
router.get('/getAllCertified', getAllCertified);


router.get('/:riddleId', getById);
router.post('/',upload.single('image'), createRiddle);
router.patch('/entryRiddle/:riddleId', entryRiddle);
router.patch('/setCertified/:riddleId', setCertified);

// router.post('/',   upload.single('image'), (req, res, next) => {
//     console.log(req.file);
//     if (!req.file) {
//       return res.status(400).send('Please upload a file');
//     }
//     next()
//   },
//   createRiddle)
router.put('/:riddleId', upload.single('image'), updatedRiddle);
router.delete('/:riddleId', deleteRiddle);

module.exports = router;