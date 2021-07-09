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

| Name            | Description                                | Default value |
| --------------- | ------------------------------------------ | ------------- |
| TARGET_QUANTATY | Quantatiy of fake data records to generate | 500000        |
| LINES_PER_FILE  | Users per csv file.                         | 10000         |

##### Examples

```bash
TARGET_QUANTATY=90000 LINES_PER_FILE=5000 yarn start
```

```bash
docker run -it -v $PWD:/app -w /app -e TARGET_QUANTATY=9000000 node yarn start
```

## Wanna know more about?

I wrote an article on medium about my journey in this topic.
Go ahead! [https://medium.com/p/98b990967824]

## Contributors

- [André Lademann](https://github.com/vergissberlin)
- [TheDevMinerTV](https://github.com/TheDevMinerTV)
