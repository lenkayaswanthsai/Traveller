const express = require('express');
const router = express.Router();
const TravelForm = require('../models/TravelForm');

router.post('/submit-form', async (req, res) => {
  try {
    const formData = new TravelForm(req.body);
    await formData.save();
    res.redirect('/thankyou.html');
  } catch (err) {
    res.status(500).send('Form submission error');
  }
});

module.exports = router;