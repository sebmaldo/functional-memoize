
module.exports = (mongodbUri, mongodbCache = 'MONGODB_CACHE') => {
    const collection = require('monk')(mongodbUri)
        .get(mongodbCache);

    return {
        find: async (key) => {
            return await collection.findOne({ key });
        },
        save: async (key, timestamp, result) => {
            await collection.remove({ key });
            return await collection.insert({ key, timestamp, result });
        },
        close : async ()=> {
            await collection.manager.close();
        }
    };
};