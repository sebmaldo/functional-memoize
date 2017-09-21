<a name="module_functional-memoize"></a>

## functional-memoize
Functional Memoize is a package to implement an 
approach of a generic memoization of functions 
from a functional programming point of view.


* [functional-memoize](#module_functional-memoize)
    * [.inMemoryCacheWrapper](#module_functional-memoize.inMemoryCacheWrapper)
    * [.inMongoCacheWrapper](#module_functional-memoize.inMongoCacheWrapper)
    * [.cacheWrapper(findInCache, saveInCache, memoizeConfigOptions, functionToMemoize)](#module_functional-memoize.cacheWrapper) ⇒ <code>function</code>

<a name="module_functional-memoize.inMemoryCacheWrapper"></a>

### functional-memoize.inMemoryCacheWrapper
Curriable function to wrapp the function to be memoized with a in Memory cache strategy.

**Kind**: static property of [<code>functional-memoize</code>](#module_functional-memoize)  

| Param | Type | Description |
| --- | --- | --- |
| memoizeConfigOptions | <code>object</code> | Object to configure the cahe options. |
| memoizeConfigOptions.ttl | <code>number</code> | Time to live for the memoization by default is 1. |
| memoizeConfigOptions.ttlMeasure | <code>string</code> | Measure of the time to live, ir use the same as moment  (miliseconds, seconds, minutes, hours, days ...) by default is days. |
| memoizeConfigOptions.functionName | <code>string</code> | The Implementation consider a unique cached. |
| functionToMemoize | <code>function</code> | Function to be memoized by the cache wrapper. |

<a name="module_functional-memoize.inMongoCacheWrapper"></a>

### functional-memoize.inMongoCacheWrapper
Curriable function to wrapp the function to be memoized with a mongodb cache strategy.

**Kind**: static property of [<code>functional-memoize</code>](#module_functional-memoize)  

| Param | Type | Description |
| --- | --- | --- |
| mongodbUri | <code>string</code> | Function to find in the cache implemented. |
| mongodbCacheCollection | <code>string</code> | Function to save in the cache implemented. |
| memoizeConfigOptions | <code>object</code> | Object to configure the cahe options. |
| memoizeConfigOptions.ttl | <code>number</code> | Time to live for the memoization by default is 1. |
| memoizeConfigOptions.ttlMeasure | <code>string</code> | Measure of the time to live, ir use the same as moment  (miliseconds, seconds, minutes, hours, days ...) by default is days. |
| memoizeConfigOptions.functionName | <code>string</code> | The Implementation consider a unique cached. |
| functionToMemoize | <code>function</code> | Function to be memoized by the cache wrapper. |

<a name="module_functional-memoize.cacheWrapper"></a>

### functional-memoize.cacheWrapper(findInCache, saveInCache, memoizeConfigOptions, functionToMemoize) ⇒ <code>function</code>
Curriable function to wrapp the function to be memoized with a provided cache strategy.

**Kind**: static method of [<code>functional-memoize</code>](#module_functional-memoize)  
**Returns**: <code>function</code> - - Async function that wrapp the functionToMemoize with the strategy of cache.
This function return Promises.  

| Param | Type | Description |
| --- | --- | --- |
| findInCache | <code>function</code> | Function to find in the cache implemented. |
| saveInCache | <code>function</code> | Function to save in the cache implemented. |
| memoizeConfigOptions | <code>object</code> | Object to configure the cahe options. |
| memoizeConfigOptions.ttl | <code>number</code> | Time to live for the memoization by default is 1. |
| memoizeConfigOptions.ttlMeasure | <code>string</code> | Measure of the time to live, ir use the same as moment  (miliseconds, seconds, minutes, hours, days ...) by default is days. |
| memoizeConfigOptions.functionName | <code>string</code> | The Implementation consider a unique cached. |
| functionToMemoize | <code>function</code> | Function to be memoized by the cache wrapper. |

