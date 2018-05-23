const restifyRouter = require('restify-router').Router;

const router = new restifyRouter();

router.add("/auth", require("./auth"));

module.exports = router;
