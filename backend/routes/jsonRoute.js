const express = require('express');
const FetchData = require('../Controler/dataFetch');
const router = express.Router();


router.get('/json', FetchData);

module.exports = router;