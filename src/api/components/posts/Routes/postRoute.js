const postRouter = require('express').Router();
// const postController = require('../Controller/postController');

postRouter.get('/', (req, res) => {
  res.send('Post Route');
});
module.exports = postRouter;
