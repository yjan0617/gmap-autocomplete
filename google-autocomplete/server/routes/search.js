const express = require('express');
const router = express.Router();
const { getPlaceSuggestions } = require('../controllers/placesController');

router.get('/', getPlaceSuggestions);

module.exports = router;
