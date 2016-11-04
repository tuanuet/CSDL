var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/foodcategories', function(req, res, next) {
  res.render('foodcategories',{
    title:"tuan"
  });
});

module.exports = router;
