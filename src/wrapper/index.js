/**
 * Wrapper Function Module
 * 
 * 
 */

const R = require('rambda');
const moment = require('moment');
const getTtlMeasure = R.defaultTo('days');

let isCachedInvalid = (ttl, ttlMeasure, cached) => {

        //Check if the cache exists
    return R.isNil(cached)
        //Check if the cache have timestamp
        || R.isNil(cached.timestamp)
        //check if the date of the timestamp is acording with the time to live
        || moment(new Date())
            .isAfter(
            moment(cached.timestamp)
                .add(ttl, getTtlMeasure(ttlMeasure))
            );
}

let wrapp = (findInCache, saveInCache, memoizeConfigOptions, functionToMemoize) => {
    return async (...args) => {

        //Create the key, with the arguments of the function and the service name
        let key = JSON.stringify(R.append(memoizeConfigOptions.serviceName, args));
        //Search in the cache stategy provided in the function
        let cached = await findInCache(key);

        //check if the cache is inValid according with the config object
        if (isCachedInvalid(memoizeConfigOptions.ttl, memoizeConfigOptions.ttlMeasure, cached)) {
            //Fetch the results from the function if the cache is not valid
            let result = await functionToMemoize(args);
            //save in the cache with the cache stategy provided
            await saveInCache(key, new Date(), result);
            //Return the result of the function
            return result;
        }

        //Return the cached result in case it is valid.
        return cached.result;
    }
}

module.exports = R.curry(wrapp);