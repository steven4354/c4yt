const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send("route working")
})

module.exports = router
