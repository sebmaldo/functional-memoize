import test from 'ava';
const wrapper = require('../');
const cachedStrategies = require('../../cacheStrategies');
const Promise = require('bluebird');

function randomString(largo) {
    return Math.random().toString(36).substring(largo);
}

function randomError() {
    throw new Error(randomString(4));
}

function randomSyntaxError() {
    throw new SyntaxError(randomString(4));
}

let cachedFunction = wrapper(cachedStrategies.inMemory.find
    , cachedStrategies.inMemory.save
    , { ttl: 2, ttlMeasure: 'days', functionName: 'stringFunction' }
    , randomString
);

let cachedFunction2 = wrapper(cachedStrategies.inMemory.find
    , cachedStrategies.inMemory.save
    , { ttl: 2, ttlMeasure: 'days', functionName: 'stringFunction2' }
    , randomString
);

let cachedErrorFunction = wrapper(cachedStrategies.inMemory.find
    , cachedStrategies.inMemory.save
    , { ttl: 2, ttlMeasure: 'seconds', functionName: 'errorFunction' }
    , randomError
);

let cachedErrorFunction2 = wrapper(
    cachedStrategies.inMemory.find,
    cachedStrategies.inMemory.save,
    { ttl: 2, ttlMeasure: 'seconds', functionName: 'errorFunction2' },
    randomSyntaxError
);

let shortCachedFunction = wrapper(cachedStrategies.inMemory.find
    , cachedStrategies.inMemory.save
    , { ttl: 1, ttlMeasure: 'seconds', functionName: 'shortFunction' }
    , randomString
);

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

test('Diff cached must return diff results and call same functions with same return', async t => {
    let result = await cachedFunction(11);
    let result2 = await cachedFunction2(11);
    let result3 = await cachedFunction(11);
    let result4 = await cachedFunction2(11);

    t.is(result === result2, false);
    t.is(result3 === result4, false);
    t.is(result === result3, true);
    t.is(result2 === result4, true);
});

test('Call different cached must return different results', async t => {
    let result = await shortCachedFunction(1);
    let result2 = await Promise.delay(100).then(() => shortCachedFunction(1));
    t.is(result === result2, true);
    let result3 = await Promise.delay(2000).then(() => shortCachedFunction(1));

    t.is(result === result3, false);
});

test('Call of force must return diferent result', async t => {
    
    let result = await shortCachedFunction(2);
    let result2 = await shortCachedFunction.force(2);
    let result3 = await shortCachedFunction(2);
    t.is(result === result2, false);
    t.is(result2 === result3, true);

});

test('Call two time a error function must return the same error', async t => {

    let e1;
    try {
        await cachedErrorFunction();
    } catch (error) {
        e1 = error;
    }
    
    let e2;
    try{
        await cachedErrorFunction();
    } catch(error){
        e2 = error;
    }
    t.not(e1, undefined);
    t.deepEqual(e1, e2);
});

test('Call two time a error function must return the same sytaxerror', async t => {

    let e1;
    try {
        await cachedErrorFunction2();
    } catch (error) {
        e1 = error;
    }
    
    let e2;
    try{
        await cachedErrorFunction2();
    } catch(error){
        e2 = error;
    }
    t.not(e1, undefined);
    t.deepEqual(e1, e2);
});