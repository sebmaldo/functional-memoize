
module.exports = (mongodb_uri, mongodb_cache='MONGODB_CACHE') => {
    const collection = require('monk')(mongodb_uri)
                        .get(mongodb_cache);

    return {
        find: async (key) => {
            return collection.findOne({key});
            },
        save: async (key, date, resultToCache) => {
            return collection.insert({key, timestamp:date, result:resultToCache});
        }
    }
};