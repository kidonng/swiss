# 🔪 Swiss

Swiss is a collection of random utilities, mostly for [@kidonng](https://github.com/kidonng)'s personal use.

## API

API ([`/api`](api)) are free to use, but responses won't include CORS headers for the moment.

### `cet-score`

(Work in progress)

### `diagrams`

(Work in progress)

### `xkcd-why`

- **GET** `/api/xkcd-why`

    | Params   | Type     | Required | Description            |
    | -------- | -------- | :------: | ---------------------- |
    | `number` | *string* |    ❌     | Number of the question |

    ```json
    {
      "number": 42,
      "question": "why do utis hurt"
    }
    ```
