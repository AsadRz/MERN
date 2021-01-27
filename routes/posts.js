const postRouter = require('express').Router();
const postController = require('../controllers/postController');

postRouter.get('/', (req, res) => {
  res.send('Post Route');
});
module.exports = postRouter;
