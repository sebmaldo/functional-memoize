/**
 * Wrapper Function Module
 * 
 * 
 */

const R = require('rambda');
const moment = require('moment');
const getTtlMeasure = R.defaultTo('days');

let isExpired = R.curry((ttl, ttlMeasure, timestamp) => {
    return moment(new Date())
        .isAfter(
            moment(timestamp)
            .add(ttl, getTtlMeasure(ttlMeasure))
        );
});

let isCachedInvalid = (ttl, ttlMeasure, cached) => {

    return R.isNil(cached)
        || R.isNil(cached.timestamp)
        || isExpired(ttl, ttlMeasure, cached.timestamp);
}

let wrapp = (findInCache, saveInCache, memoizeConfigOptions, functionToMemoize) => {
    return async (...args) => {
        let key = JSON.stringify(R.append(memoizeConfigOptions.serviceName, args));
        let cached = await findInCache(key);
        
        if(isCachedInvalid(memoizeConfigOptions.ttl, memoizeConfigOptions.ttlMeasure, cached)){
            let result = await functionToMemoize(args);
            await saveInCache(key, new Date(), result);
            return result;
        }

        return cached.result;
    }
}

module.exports = R.curry(wrapp);