const express = require('express');
const router = express.Router();
const { getAllUsers, getById, createUser, updatedUser, deleteUser, login,useSite,getCount } = require("../controllers/user.controller")

router.get('/', getAllUsers);
router.get('/getCount', getCount);
router.get('/:userId', getById);

router.post('/', createUser);
router.post('/login', login);
router.post('/useSite', useSite);
router.put('/:userId', updatedUser);
router.delete('/:userId', deleteUser);

module.exports = router;