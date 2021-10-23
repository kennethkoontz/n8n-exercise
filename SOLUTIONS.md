### Exercise 1
> Server.js Please review and provide comments on this code as if you were giving feedback to a junior team member.

See [PR](https://github.com/kennethkoontz/n8n-exercise/pull/1)

### Exercise 2

> Cache an expensive function's results by storing them. You may assume that the function only takes primitives as arguments.
> 
> The function should return a function that, when called, will check if it has
already computed the result and return that value instead if possible.
> 
> Example:\
> cacheAdd = myFunction(add);\
> add(1,2) = 3\
> cacheAdd(1,2) = 3 --> executes add function\
> cacheAdd(1,2) = 3 --> returns from cache\
> cacheAdd(2,2) = 4--> executes add function

```js
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
```

### Exercise 3 

> Please write some thoughts/ideas (e.g. 5 bullet points) to these questions
> 
> Dear Applicant,
> 
> As you already know is n8n a free and open, fair-code licensed Workflow Automation Tool. n8n utilizes nodes to enable users to create their workflows. A node is an entry point for retrieving data, a function to process data or an exit for sending data. The data process includes filtering, recomposing and changing data. There can be one or several nodes for an API, service or app. You can connect multiple nodes, which allows you to create simple and complex workflows with them intuitively.
> We ask you to provide your thoughts on the following problems:
> 1. We are using Node.js to execute the workflows and its nodes. Sometimes, single executions of workflows may take hours if not days to complete. We want to offer the option to timeout workflow execution. Since Javascript, and Node.js accordingly, is single-threaded, how would you implement a timeout feature without letting the whole program crash?

Implementing timeout functionality in Node.js can prove to be a little tricky. Due to the nature of Node.js and its
event loop, intensive CPU bound tasks can block the main thread. This results in the main thread being locked up and the
app would effectively become unresponsive. One strategy to address this would be to move tasks into a queue and
implement timeout functionality. A worker could then consume the tasks independent of the main program. The worker would
cancel any long-running tasks that exceed the specified workflow timeout.

> 2. We want to offer n8n as a SaaS product with thousands of concurrent users. Please create an overview of your system proposal and explain briefly to a non technical person how it works. What are the advantages and disadvantages of your system?

### Proposal Overview 
* Browser based frontend client using a frontend library like React.
* Communicates with backend via REST and/or GraphQL.
* Data stored in a DB like PostgreSQL to store user data such as workflows, settings, etc.
* Distributed queue to process jobs for workflows library + queue (Redis, RabbitMQ).

### Advantages:
* Horizontally scalable.
* Offloads work in a distributed queue. (Redis, RabbitMQ)
* Jobs are persisted in case of faults in application server. 

### Disadvantages
* Doesn't address retries in faults at the worker level.
* Doesn't address auto scaling of app/workers.
* Job throughput is limited to the concurrency of workers.

One proposal for a SaaS product that supports thousands of concurrent users and their workflows could consist of a
client interface, a backend to handle client requests, a database to store application data, and a worker queue system
to handle workflow execution. 

The UI (user interface), or frontend, is our presentation layer. It's what the users would see. It would be browser
based. The role of the frontend would be to retrieve, present, and manage workflows. The frontend would communicate
to the backend via REST and/or GraphQL. 

The product's backend is where we store, manage, and execute on data. It would consist of an API (interface) that
handles requests from the frontend. Depending on the request, workflow data could be retrieved, created, updated, or
destroyed from the database. Along with storing data in the database, the backend would also place jobs in a queue.

The queue acts as a job queue. Each job will be processed by the worker based on the user's workflow specification.
