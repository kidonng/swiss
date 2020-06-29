# 🔪 Swiss

Swiss is a collection of random utilities and demos.

## Utilities

Most utility functions are in standalone TypeScript files for general use. You can import them via whatever method or simply copy & paste. 

## API

API ([`/api`](api)) are free to use, but responses won't include CORS headers for the moment.

### `cet-score`

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
