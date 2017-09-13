import test from 'ava';
const rewire = require('rewire');
const moment = require('moment');
const wrapper = require('./');
const cachedStrategies = require('../cacheStrategies');

let mem = rewire('./');

let isCachedInvalid = mem.__get__('isCachedInvalid');

function randomString(largo) {
    return Math.random().toString(36).substring(largo);
}

let cachedFunction = wrapper(cachedStrategies.inMemory.find
    , cachedStrategies.inMemory.save
    , {ttl: 2, ttlMeasure: 'days', serviceName: 'stringFunction'}
    , randomString
);

let cachedFunction2 = wrapper(cachedStrategies.inMemory.find
    , cachedStrategies.inMemory.save
    , {ttl: 2, ttlMeasure: 'days', serviceName: 'stringFunction2'}
    , randomString
);

test('The cache null must return true', t => {
    t.is(isCachedInvalid(1000, null), true);
});

test('The cache without timestamp must return true', t => {
    t.is(isCachedInvalid(1000, {}), true);
});

test('The cache of an old date must be true', t => {
    t.is(isCachedInvalid(1000, 'seconds', {timestamp: moment().subtract(5000, 'seconds').toDate()}), true);
});

test('The cache of a current date must be false', t => {
    t.is(isCachedInvalid(1000, 'seconds', {timestamp: moment().add(5000, 'seconds').toDate()}), false);
});




test('Call two time a function must return the same result', async t => {
    let result = await cachedFunction(9);
    let result2 = await cachedFunction(9);
    let result3 = await cachedFunction(9);
    let result4 = await cachedFunction(9);

    t.is(result, result2);
    t.is(result3, result4);
});

test('Call different cached must return different results', async t => {
        let result = await cachedFunction(10);
        let result2 = await cachedFunction2(10);
    
        t.is(result === result2, false);
});