# fake data generator

> Generate fake user data with JavaScript

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

#### Configuration

| Name    | Description                                        | Default value |
| ------- | -------------------------------------------------- | ------------- |
| THREADS | Amount of processes it should use to generate data | $(nproc)      |
| TARGET_PER_THREAD  | Total of fake users it should generate             | 100000        |

```bash
docker run -it -v $PWD:/app -w /app -e TARGET=144 node yarn start
```

## Wanna know more about?

I wrote an article on medium about my journey in this topic.
Go ahead! [https://medium.com/p/98b990967824]

## Contributors

- [TheDevMinerTV](https://github.com/TheDevMinerTV)
- [André Lademann](https://github.com/vergissberlin)
