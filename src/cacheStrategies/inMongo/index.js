
module.exports = (mongodbUri, mongodbCache = 'MONGODB_CACHE') => {
    const collection = require('monk')(mongodbUri)
        .get(mongodbCache);

    return {
        find: async (key) => {
            return collection.findOne({ key });
        },
        save: async (key, date, resultToCache) => {
            return collection.insert({ key, timestamp: date, result: resultToCache });
        }
    };
};