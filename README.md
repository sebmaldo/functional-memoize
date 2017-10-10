<a name="module_functional-memoize"></a>

## functional-memoize
Functional Memoize is a package to implement an
approach of a generic memoization of functions
from a functional programming point of view.


* [functional-memoize](#module_functional-memoize)
    * [.cacheWrapper(findInCache, saveInCache, memoizeConfigOptions, functionToMemoize)](#module_functional-memoize.cacheWrapper) ⇒ <code>function</code>
    * [.inMemoryCacheWrapper(memoizeConfigOptions, functionToMemoize)](#module_functional-memoize.inMemoryCacheWrapper) ⇒ <code>function</code>
    * [.inMongoCacheWrapper(mongoDBConfig, memoizeConfigOptions, functionToMemoize)](#module_functional-memoize.inMongoCacheWrapper) ⇒ <code>function</code>

<a name="module_functional-memoize.cacheWrapper"></a>

### functional-memoize.cacheWrapper(findInCache, saveInCache, memoizeConfigOptions, functionToMemoize) ⇒ <code>function</code>
Curriable function to wrapp the function to be memoized with a provided cache strategy.

**Kind**: static method of [<code>functional-memoize</code>](#module_functional-memoize)  
**Returns**: <code>function</code> - - Function that wrapp the functionToMemoize with the strategy of cache.
This function is always async, return a Promise.  

| Param | Type | Description |
| --- | --- | --- |
| findInCache | <code>function</code> | Function to find in the cache implemented. |
| saveInCache | <code>function</code> | Function to save in the cache implemented. |
| memoizeConfigOptions | <code>object</code> | Object to configure the cahe options. |
| memoizeConfigOptions.ttl | <code>number</code> | Time to live for the memoization by default is 1. |
| memoizeConfigOptions.ttlMeasure | <code>string</code> | Measure of the time to live, ir use the same as moment (miliseconds, seconds, minutes, hours, days ...) by default is days. |
| memoizeConfigOptions.functionName | <code>string</code> | The Implementation consider a unique cached. |
| functionToMemoize | <code>function</code> | Function to be memoized by the cache wrapper. |

<a name="module_functional-memoize.inMemoryCacheWrapper"></a>

### functional-memoize.inMemoryCacheWrapper(memoizeConfigOptions, functionToMemoize) ⇒ <code>function</code>
Curriable function to wrapp the function to be memoized with a in Memory cache strategy.

**Kind**: static method of [<code>functional-memoize</code>](#module_functional-memoize)  
**Returns**: <code>function</code> - - Function that wrapp the functionToMemoize with the strategy of cache.
This function is always async, return a Promise.  

| Param | Type | Description |
| --- | --- | --- |
| memoizeConfigOptions | <code>object</code> | Object to configure the cahe options. |
| memoizeConfigOptions.ttl | <code>number</code> | Time to live for the memoization by default is 1. |
| memoizeConfigOptions.ttlMeasure | <code>string</code> | Measure of the time to live, ir use the same as moment (miliseconds, seconds, minutes, hours, days ...) by default is days. |
| memoizeConfigOptions.functionName | <code>string</code> | The Implementation consider a unique cached. |
| functionToMemoize | <code>function</code> | Function to be memoized by the cache wrapper. |

<a name="module_functional-memoize.inMongoCacheWrapper"></a>

### functional-memoize.inMongoCacheWrapper(mongoDBConfig, memoizeConfigOptions, functionToMemoize) ⇒ <code>function</code>
Curriable function to wrapp the function to be memoized with a mongodb cache strategy.

**Kind**: static method of [<code>functional-memoize</code>](#module_functional-memoize)  
**Returns**: <code>function</code> - - Function that wrapp the functionToMemoize with the strategy of cache.
This function is always async, return a Promise.  

| Param | Type | Description |
| --- | --- | --- |
| mongoDBConfig | <code>Object</code> | MongoDB configuration options. |
| mongoDBConfig.mongodbUri | <code>String</code> | mongoDB connection string. |
| mongoDBConfig.mongodbCacheCollection | <code>String</code> | Name of the mongoDB collection. |
| memoizeConfigOptions | <code>Object</code> | Object to configure the cahe options. |
| memoizeConfigOptions.ttl | <code>Number</code> | Time to live for the memoization by default is 1. |
| memoizeConfigOptions.ttlMeasure | <code>String</code> | Measure of the time to live, ir use the same as moment (miliseconds, seconds, minutes, hours, days ...) by default is days. |
| memoizeConfigOptions.functionName | <code>String</code> | The Implementation consider a unique cached. |
| functionToMemoize | <code>function</code> | Function to be memoized by the cache wrapper. |

