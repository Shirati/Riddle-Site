const express = require('express');
const { getAllRiddlesUnSatisfied,getAllRiddlesSatisfied,getAllRiddlesName,getCount,getCountSatisfied,getCountUnSatisfied,popular,entryRiddle,useSite } = require('../controllers/statistic.controller');

const router = express.Router();


router.get('/getAllRiddlesName', getAllRiddlesName);
router.get('/getAllRiddlesSatisfied', getAllRiddlesSatisfied);
router.get('/getAllRiddlesUnSatisfied', getAllRiddlesUnSatisfied);
router.get('/getCountSatisfied', getCountSatisfied);
router.get('/getCountUnSatisfied', getCountUnSatisfied);


router.get('/getCount', getCount);
router.get('/popular', popular);


router.patch('/entryRiddle/:riddleId', entryRiddle);
router.post('/useSite', useSite);




module.exports = router;