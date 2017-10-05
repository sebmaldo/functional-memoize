//Declare an object to store the cache in memory
let cache = {};

module.exports = {
    find: async (key) => {
        //return the Attribute with the name in the variable key
        return cache[key];
    },
    save: async (key, timestamp, result) => {
        //Store an attribute in the object cache in the attribute key, with a timestamp and the result.
        cache[key] = {timestamp, result};
    }
};