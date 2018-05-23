const restifyRouter = require('restify-router').Router;

const router = new restifyRouter();

router.add("/v1", require("./v1/routes"));

module.exports = router;
