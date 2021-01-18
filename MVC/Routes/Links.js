const express = require('express');
const router = express.Router();
const controller = require('./../controllers/links');

/* GET links listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', controller.get);
router.post('/', controller.post);
router.get('/:id?', controller.redirect);

module.exports = router;
