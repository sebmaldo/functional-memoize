import test from 'ava';

const inMemoryCacheStrategy = require('./index');
let find = inMemoryCacheStrategy.find;
let save = inMemoryCacheStrategy.save;

test('Must return undefine to not seted cache', async t => {
    let result = await find('asdf');
    t.is(result, undefined);
});

test('Must return object with ritmo in memory', async t => {

    let key = JSON.stringify([
        'hola como va', 'que ritmo', 44444, true, { foo: 'baxx' },
        'the service name'
    ]);

    let output = { foo: 'bar' };

    await save(key, new Date(), output);

    await save(JSON.stringify([
        'hola como va', 'que ritmo', { foo: 'baxx' }, 'the service name'
    ]), new Date(), { foo: 'asdf' });

    await save(JSON.stringify([
        'hola como va', 'sin ritmo', { foo: 'baxx' }, 'the service name'
    ]), new Date(), { foo: 'asaf' });

    await save(JSON.stringify([
        'hola', 'que ritmo', { foo: 'baxx' }, 'the service name'
    ]), new Date(), { foo: 'fasd' });

    await save(JSON.stringify([
        'hola como va', 'que', { foo: 'sdfa' }, 'the service name'
    ]), new Date(), { foo: 'sdda' });

    let result = await find(key);
    t.is(result.result, output);
   
});


test('Must return object in memory', async t => {
    let key = JSON.stringify([
        'hola como va', 'que ritmo', 44444, true, { foo: 'baxx' },
        'other service name'
    ]);

    let output = { foo: 'claro que si' };

    await save(key, new Date(), { other: 'other value' });
    await save(key, new Date(), output);
    await save(JSON.stringify([
        'hola como va', 'que ritmo', { foo: 'baxx' }, 'the service name'
    ]), new Date(), { foo: 'asdf' });

    await save(JSON.stringify([
        'hola como va', 'sin ritmo', { foo: 'baxx' }, 'the service name'
    ]), new Date(), { foo: 'asaf' });

    await save(JSON.stringify([
        'hola', 'que ritmo', { foo: 'baxx' }, 'the service name'
    ]), new Date(), { foo: 'fasd' });

    await save(JSON.stringify([
        'hola como va', 'que', { foo: 'sdfa' }, 'the service name'
    ]), new Date(), { foo: 'sdda' });

    let result = await find(key);
    t.is(result.result, output);
});