## Installation

```
npm install
```

## How to use

1. Run redis on default port

2. On your terminal, run consumer

    ```
    node consumer.js
    ```

3. Open another terminal. Run the package producer

    ```
    node producer.js
    ```

4. Produced package will be sent through "testing" queue and consumed by the consumer.
