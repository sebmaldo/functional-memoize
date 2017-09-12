let cache = {};

module.exports = {
    find: async (key) => {
        return cache[key];
    },
    save: async (key, date, cachedResult) => {
        cache[key] = {timestamp: date, result: cachedResult};
    }
};