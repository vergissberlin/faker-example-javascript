# fake data generator

**Generate fake user data with JavaScript in parallel**

> In Node.js everything runs in parallel, except your code. What this means is that all I/O code that you write in Node.js is non-blocking, while (conversely) all non-I/O code that you write in Node.js is blocking.

![Single thread](./docs/thread-single.png "Waiting loong")
![Multi thread](./docs/thread-multi.png "Go brrr")

## Using

### Without Docker

To use this method, you need to install node >= 14 on your local system fitst.

```bash
yarn
yarn start
```

### With Docker

To use this method, you need to install Docker on your local system first.

```bash
docker run -it -v $PWD:/app -w /app node yarn
docker run -it -v $PWD:/app -w /app node yarn start
```

### Configuration

| Name             | Description                                     | Default value       |
| ---------------- | ----------------------------------------------- | ------------------- |
| TARGET_QUANTITY  | Quantatiy of fake data records to generate      | 500000              |
| LINES_PER_FILE   | Data per csv file                               | 10000               |
| WORKER_TYPE      | 'process' or 'thread'                           | process             |
| WORKER_COUNT_MAX | The number of threads or child processes to use | Number of CPU cores |
| DATA_TYPE        | 'user' or 'product'                             | product             |

One note to DATA_TYPE. Feel free to use 'user' or 'product' as long as you are generating fake
user data or fake product data. If you are generating fake product data, you should use 'product'
as DATA_TYPE. You can find the types in the types folder. You can add your own types by adding a
new file to the types folder.

### Examples

Run with local node.js. You should have at least 4GB of free memory and node.js >= 14 installed.

```bash
TARGET_QUANTITY=90000 LINES_PER_FILE=5000 WORKER_TYPE=thread yarn start
```

Run with Docker

```bash
docker run -it -v $PWD:/app -w /app -e TARGET_QUANTITY=9000000 node yarn start
```

### Test with hyperfine

[hyperfine](https://github.com/sharkdp/hyperfine) is a tool for running benchmark tests for CLI applications.
Let's do a benchmark test with *hyperfine* for the *fake-data-generator* project.

#### 10,000 test products

```bash
hyperfine -r 10 \
    -n "Single thread"   "TARGET_QUANTITY=100000 LINES_PER_FILE=10000 WORKER_TYPE=process WORKER_COUNT_MAX=1 yarn start" \
    -n "Worker threads"  "TARGET_QUANTITY=100000 LINES_PER_FILE=10000 WORKER_TYPE=thread yarn start" \
    -n "Child processes" "TARGET_QUANTITY=100000 LINES_PER_FILE=10000 WORKER_TYPE=process yarn start"
```

#### 10,000,000 test products

```bash
hyperfine -r 10 \
    -n "Single thread"   "TARGET_QUANTITY=10000000 LINES_PER_FILE=100000 WORKER_TYPE=process WORKER_COUNT_MAX=1 yarn start" \
    -n "Worker threads"  "TARGET_QUANTITY=10000000 LINES_PER_FILE=100000 WORKER_TYPE=thread yarn start" \
    -n "Child processes" "TARGET_QUANTITY=10000000 LINES_PER_FILE=100000 WORKER_TYPE=process yarn start"
```

## Wanna know more about?

I wrote an article on medium about my journey in this topic.
Go ahead! [https://medium.com/p/98b990967824]

## Contributors

- [André Lademann](https://github.com/vergissberlin)
- [TheDevMinerTV](https://github.com/TheDevMinerTV)
