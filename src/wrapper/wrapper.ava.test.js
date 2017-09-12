import test from 'ava';
const rewire = require('rewire');
const moment = require('moment');

let mem = rewire('./');

let isCachedExpired = mem.__get__('isCachedExpired');

test('The cache null must return true', t => {
    t.is(isCachedExpired(1000, null), true);
});

test('The cache without timestamp must return true', t => {
    t.is(isCachedExpired(1000, {}), true);
});

test('The cache of an old date must be true', t => {
    t.is(isCachedExpired(1000, {timestamp: moment().subtract(5000, 'seconds').toDate()}), true);
});

test('The cache of a current date must be false', t => {
    t.is(isCachedExpired(1000, {timestamp: moment().add(5000, 'seconds').toDate()}), false);
});