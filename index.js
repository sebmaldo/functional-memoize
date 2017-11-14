/**
 * Functional Memoize is a package to implement an
 * approach of a generic memoization of functions
 * from a functional programming point of view.
 * @module functional-memoize
 */

const wrapper = require('./src/wrapper');
const strategies = require('./src/cacheStrategies');
const R = require('ramda');


module.exports = {
    /**
     * Curriable function to wrapp the function to be memoized with a provided cache strategy.
     * @kind function
     * @param {function} findInCache - Function to find in the cache implemented.
     * @param {function} saveInCache - Function to save in the cache implemented.
     * @param {object} memoizeConfigOptions - Object to configure the cahe options.
     * @param {number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
     * @param {string} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment
     * (miliseconds, seconds, minutes, hours, days ...) by default is days.
     * @param {string} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
     * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
     * @returns {function} - Function that wrapp the functionToMemoize with the strategy of cache.
     * This function is always async, return a Promise. The returned function has an atribute force, this force atribute is a function 
     * that force the use of the functionToMemoize and saveit in the cache.
     */
    cacheWrapper: wrapper,

    /**
     * Curriable function to wrapp the function to be memoized with a in Memory cache strategy.
     * @kind function
     * @param {object} memoizeConfigOptions - Object to configure the cahe options.
     * @param {number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
     * @param {string} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment
     * (miliseconds, seconds, minutes, hours, days ...) by default is days.
     * @param {string} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
     * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
     * @returns {function} - Function that wrapp the functionToMemoize with the strategy of cache.
     * This function is always async, return a Promise. The returned function has an atribute force, this force atribute is a function 
     * that force the use of the functionToMemoize and saveit in the cache.
     */
    inMemoryCacheWrapper: wrapper(strategies.find, strategies.save),

    /**
     * Curriable function to wrapp the function to be memoized with a mongodb cache strategy.
     * @kind function
     * @param {Object} mongoDBConfig - MongoDB configuration options.
     * @param {String} mongoDBConfig.mongodbUri - mongoDB connection string.
     * @param {String} mongoDBConfig.mongodbCacheCollection - Name of the mongoDB collection.
     * @param {Object} memoizeConfigOptions - Object to configure the cahe options.
     * @param {Number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
     * @param {String} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment
     * (miliseconds, seconds, minutes, hours, days ...) by default is days.
     * @param {String} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
     * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
     * @returns {function} - Function that wrapp the functionToMemoize with the strategy of cache.
     * This function is always async, return a Promise. The returned function has an atribute force, this force atribute is a function 
     * that force the use of the functionToMemoize and saveit in the cache.
     */
    inMongoCacheWrapper: R.curry((
        mongoDBConfig,
        memoizeConfigOptions,
        functionToMemoize
    ) => {
        const mongoStrategy = strategies.inMongo(
            mongoDBConfig.mongodbUri,
            mongoDBConfig.mongodbCacheCollection
        );
        let func = wrapper(
            mongoStrategy.find,
            mongoStrategy.save,
            memoizeConfigOptions,
            functionToMemoize
        );

        func.close = () => {
            mongoStrategy.close();
        };

        return func;
    })
};