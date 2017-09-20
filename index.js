const wrapper = require('./src/wrapper');
const strategies = require('./src/cacheStrategies');

module.exports = {
    cacheWrapper: wrapper,
    inMemoryCacheWrapper: wrapper(strategies.find, strategies.save),
    inMongoCacheWrapper: R.curry((mongodb_uri, mongodb_cache, memoizeConfigOptions, functionToMemoize) => {
        const mongoStrategy = strategies.inMongo(process.env.MONGODB_URI, process.env.MONGODB_CACHE);
        return wrapper(mongoStrategy.find, mongoStrategy.save, memoizeConfigOptions, functionToMemoize);
        
    })
};