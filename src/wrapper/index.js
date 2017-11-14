const R = require('ramda');
const moment = require('moment');
const getTtlMeasure = R.defaultTo('days');
const ttlDefault = R.defaultTo(1);


/**
 * Check if a cached item is valid to return as result
 *
 * @param {number} ttl - The duration of the time to live if it's not set it default to 1.
 * @param {string} ttlMeasure - The measure of the time to live, it use the same as moment,
 * as default it use days.
 * @param {object} cached - The cached Item returned from the cache strategy.
 * It have to be and object and have the attribute timestamp.
 * @returns {undefined}
 */
let isCachedInvalid = (ttl, ttlMeasure, cached) => {

    //Check if the cache exists
    return R.isNil(cached)
        //Check if the cache have timestamp
        || R.isNil(cached.timestamp)
        //check if the date of the timestamp is acording with the time to live
        || moment(new Date())
            .isAfter(
                moment(cached.timestamp)
                    .add(ttlDefault(ttl), getTtlMeasure(ttlMeasure))
            );
};

/**
 * Function to check the signature of the wrapper.
 *
 * @param {function} find - Function of the find strategy cache, to check.
 * @param {function} save - Function of the save strategy cache, to check.
 * @param {object} config - Object to configure the cache time to live, and service that represents, to check.
 * @param {function} service - Function to memoize, to check.
 * @returns {undefined}
 */
let checkSignatureOfFunction = (find, save, config, service) => {
    if ('function' !== typeof (find)) {
        throw new TypeError('The findInCache (1th argument) must be a function.');
    }

    if ('function' !== typeof (save)) {
        throw new TypeError('The saveInCache (2th argument) must be a function.');
    }

    if ('object' !== typeof (config)) {
        throw new TypeError('The memoizeConfigOptions (3th argument) must be an object.');
    }

    if ('function' !== typeof (service)) {
        throw new TypeError('The functionToMemoize (4th argument) must be a function.');
    }
};

let extractResult = async (key, saveInCache, functionToMemoize, ...args) => {
    //Fetch the results from the function if the cache is not valid
    let result = await functionToMemoize(...args);
    //save in the cache with the cache stategy provided
    await saveInCache(key, new Date(), result);
    //Return the result of the function
    return result;
};


/**
 * Function to wrapp the function to made the memoization with a provided cache strategy.
 *
 * @param {function} findInCache - Function to find in the cache implemented.
 * @param {function} saveInCache - Function to save in the cache implemented.
 * @param {object} memoizeConfigOptions - Object to configure the cahe options.
 * @param {number} memoizeConfigOptions.ttl - Time to live for the memoization by default is 1.
 * @param {string} memoizeConfigOptions.ttlMeasure - Measure of the time to live, ir use the same as moment
 * (miliseconds, seconds, minutes, hours, days ...) by default is days.
 * @param {string} memoizeConfigOptions.functionName - The Implementation consider a unique cached.
 * @param {function} functionToMemoize - Function to be memoized by the cache wrapper.
 * @return {undefined}
 */
let wrapp = (findInCache, saveInCache, memoizeConfigOptions, functionToMemoize) => {
    checkSignatureOfFunction(findInCache, saveInCache, memoizeConfigOptions, functionToMemoize);
    let keyGen = (...args) => {
        return JSON.stringify(R.append(memoizeConfigOptions.functionName, args));
    };

    let wrappFunction =  async (...args) => {
        //Create the key, with the arguments of the function and the service name
        let key = keyGen(args);
        //Search in the cache stategy provided in the function
        let cached = await findInCache(key);

        //check if the cache is inValid according with the config object
        if (isCachedInvalid(memoizeConfigOptions.ttl, memoizeConfigOptions.ttlMeasure, cached)) {
            return await extractResult(key, saveInCache, functionToMemoize, ...args);
        }

        //Return the cached result in case it is valid.
        return cached.result;
    };

    wrappFunction.force = async (...args) => {
        return await extractResult(keyGen(args), saveInCache, functionToMemoize, ...args);
    };

    return wrappFunction;
};

/**
 * Function to wrapp the function to made the memoization with a provided cache strategy.
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
module.exports = R.curry(wrapp);