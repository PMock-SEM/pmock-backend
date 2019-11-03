const UserController = require('../controllers/UserController');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'Default' }), function (req, res) { });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin'), function (req, res) {
  res.redirect('/users');
});

router.get('/api/current_user', function (req, res) {
  res.send(req.user);
});

router.get('/auth/linkedin/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

/* GET users listing. */
router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.get('/:id/videos', UserController.getVideosByUserId);

router.post('/login', UserController.signIn);

router.post('/', UserController.signUp);

router.patch('/:id', UserController.updateUserById);

router.delete('/:id', UserController.deleteUserById);

module.exports = router;
