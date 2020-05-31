const express = require('express');
const userControllers = require('../controllers/user.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('user', {
    messages: 'User View',
  });
});
router.get('/get/:id?', userControllers.getUser);
router.get('/search', userControllers.getSearchUser);
router.post('/create', userControllers.createUser);
router.put('/edit/:id', userControllers.updateUser);
router.delete('/delete/:id', userControllers.deleteUser);

module.exports = router;
