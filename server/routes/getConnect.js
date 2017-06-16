'use strict';
const express = require('express');
const router = express.Router();
const GetConnectController = require('../controllers').GetConnect;

router.route('/')
  .get(GetConnectController.getConnect)

router.route('/get-accept')
  .get(GetConnectController.getAccept)

router.route('/get-reason')
  .get(GetConnectController.getReason)

router.route('/get-vertical')
  .get(GetConnectController.getVertical)

router.route('/get-all-industry')
  .get(GetConnectController.getAllIndustry)

module.exports = router;
