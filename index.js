const wrapper = require('./src/wrapper');
const strategies = require('./src/cacheStrategies');

module.exports = {
    cacheWrapper: wrapper,
    inMemoryCacheWrapper: wrapper(strategies.find, strategies.save)
}