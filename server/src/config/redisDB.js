const redis = require("redis")
const redisDB = redis.createClient(6379)

module.exports = redisDB