const CoachController = require('../controllers/CoachController');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'Default' }), function (req, res) { });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin'), function (req, res) {
  res.redirect('/coaches');
});

router.get('/api/current_coach', function (req, res) {
  res.send(req.coach);
});

router.get('/auth/linkedin/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

/* GET users listing. */
router.get('/', CoachController.getCoaches);

router.get('/:id', CoachController.getCoachById);

router.get('/:id/feedbacks', CoachController.getFeedbacksByCoachId);

router.post('/login', CoachController.signIn);

router.post('/', CoachController.signUp);

router.patch('/:id', CoachController.updateCoachById);

router.delete('/:id', CoachController.deleteCoachById);

module.exports = router;
