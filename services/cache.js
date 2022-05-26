const utils = require("util");
const mongoose = require("mongoose");
const redisUrl = "redis://127.0.0.1:6379";
const redis = require("redis");
const client = redis.createClient();

client.on("connect", function () {
  console.log("Redis client connected");
});
client.on("error", function (err) {
  console.log("Something went wrong " + err);
});
client.hget = utils.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.hget(this.hashKey, key);
  if (cacheValue) {
    console.log("----------cache----------------");
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  console.log("----------database----------------");
  client.hset(this.hashKey, key, JSON.stringify(result));
  return result;
};

module.exports = {
  clearCache(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
