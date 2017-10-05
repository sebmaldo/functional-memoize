import test from 'ava';

const inMongoCacheStrategy = require('./index')('mongo/memoize');

const find = inMongoCacheStrategy.find;
const save = inMongoCacheStrategy.save;


test('Must return undefine to not seted cache', async t => {

    let result = await find('notExistentKey');

    t.is(result, null);
});

test('Must return object in mongo', async t => {

    let key = { key: { key: 1 } };
    let object = { object: { value: 666 } };

    await save(key, new Date(), object);

    let savedObject = await find(key);

    t.deepEqual(savedObject.result, object);
});
