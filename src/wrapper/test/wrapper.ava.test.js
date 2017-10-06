import test from 'ava';
const rewire = require('rewire');
const moment = require('moment');
const wrapper = require('../');

let mem = rewire('../');

let isCachedInvalid = mem.__get__('isCachedInvalid');

test('The cache null must return true', t => {
    t.is(isCachedInvalid(1000, null), true);
});

test('The cache without timestamp must return true', t => {
    t.is(isCachedInvalid(1000, {}), true);
});

test('The cache of an old date must be true', t => {
    t.is(isCachedInvalid(
        1000, 'seconds', {
            timestamp: moment().subtract(5000, 'seconds').toDate()
        }), true);
});

test('The cache of a current date must be false', t => {
    t.is(isCachedInvalid(
        1000, 'seconds', {
            timestamp: moment().add(5000, 'seconds').toDate()
        }), false);
});

test('For a diferent signature must return an exception', async t => {
    t.throws(() => {
        wrapper({}, () => 1, {}, () => 2);
    });
    t.throws(() => {
        wrapper(() => 1, {}, {}, () => 2);
    });
    t.throws(() => {
        wrapper(() => 1, () => 2, () => 3, () => 4);
    });
    t.throws(() => {
        wrapper(() => 1, () => 2, {}, {});
    });
});