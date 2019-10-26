const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.get('/:id/videos', UserController.getVideosByUserId);

router.post('/login', UserController.signIn);

router.post('/', UserController.signUp);

router.patch('/:id', UserController.updateUserById);

router.delete('/:id', UserController.deleteUserById);

module.exports = router;
