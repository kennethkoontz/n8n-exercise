// Cache an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
//
// The function should return a function that, when called, will check if it has
// already computed the result and return that value instead if possible.
//
// Example:
// cacheAdd = myFunction(add);
// add(1,2) = 3
// cacheAdd(1,2) = 3 --> executes add function
// cacheAdd(1,2) = 3 --> returns from cache
// cacheAdd(2,2) = 4--> executes add function
//

function myFunction(fn) {
    const cache = {};

    return (...args) => {
        const key = args.join(',');

        if (key in cache) {
            console.log(`${cache[key]} --> returns from cache`);
            return cache[key];
        }

        cache[key] = fn(...args);
        console.log(`${cache[key]} --> executes function`)
        return cache[key];
    }
}

const add = (...args) => args.reduce((p, c) => p + c, 0)

const cacheAdd = myFunction(add);
cacheAdd(1, 2);
cacheAdd(1, 2);
cacheAdd(2, 2);
