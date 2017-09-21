/**
 * Functional Memoize is a package to implement an 
 * approach of a generic memoization of functions 
 * from a functional programming point of view.
 * @module functional-memoize
 */

const wrapper = require('./src/wrapper');
const strategies = require('./src/cacheStrategies');


module.exports = {
    /**
     * Curriable function to wrapp the function to be memoized with a provided cache strategy.
     * 
     * @param {function} findInCache - Function to find in the cache implemented.
     * @param {function} saveInCache - Function to save in the cache implemented.
     * @param {object} memoizeConfigOptions - Object to configure the cahe options.
     * @param {number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
     * @param {string} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment 
     * (miliseconds, seconds, minutes, hours, days ...) by default is days.
     * @param {string} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
     * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
     */
    cacheWrapper: wrapper,

    /**
     * Curriable function to wrapp the function to be memoized with a in Memory cache strategy.
     * 
     * @param {object} memoizeConfigOptions - Object to configure the cahe options.
     * @param {number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
     * @param {string} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment 
     * (miliseconds, seconds, minutes, hours, days ...) by default is days.
     * @param {string} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
     * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
     */
    inMemoryCacheWrapper: wrapper(strategies.find, strategies.save),
    
    /**
     * Curriable function to wrapp the function to be memoized with a mongodb cache strategy.
     * 
     * @param {string} mongodbUri - Function to find in the cache implemented.
     * @param {string} mongodbCacheCollection - Function to save in the cache implemented.
     * @param {object} memoizeConfigOptions - Object to configure the cahe options.
     * @param {number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
     * @param {string} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment 
     * (miliseconds, seconds, minutes, hours, days ...) by default is days.
     * @param {string} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
     * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
     */
    inMongoCacheWrapper: R.curry((mongodbUri, mongodbCacheCollection, memoizeConfigOptions, functionToMemoize) => {
        const mongoStrategy = strategies.inMongo(mongodbUri, mongodbCacheCollection);
        return wrapper(mongoStrategy.find, mongoStrategy.save, memoizeConfigOptions, functionToMemoize);
        
    })
};