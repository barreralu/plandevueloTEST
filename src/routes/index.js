const express = require('express');

const userRoutes = require('./user.routes');

const router = express.Router();

//
router.get('/', (req, res) => {
  res.render('index', { messages: 'Home View' });
});

router.use('/user', userRoutes);
router.use('/pilotos', userRoutes);

module.exports = router;
