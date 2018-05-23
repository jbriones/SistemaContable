const restifyRouter = require('restify-router').Router;

const router = new restifyRouter();

router.get("", (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
