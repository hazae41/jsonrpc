# JSON-RPC

Rust-like JSON-RPC for TypeScript

```bash
npm i @hazae41/jsonrpc
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/jsonrpc)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- Rust-like patterns
- Uses `@hazae41/result`
- Specification compliant

## Usage

### Request over HTTP

```tsx
import { RpcCounter } from "@hazae41/jsonrpc"

/**
 * Assign an incremental id to a request
 */
const counter = new RpcCounter()
const request = counter.prepare({ method: "hello_world", params: ["hello"] })

/**
 * JSON-stringify and send the request using your preferred transport
 */
const body = JSON.stringify(request)
const headers = { "Content-Type": "application/json" }
const res = await fetch("https://example.com", { method: "POST", body, headers })

/**
 * JSON-parse the response and unwrap it
 */
const response = RpcResponse.from<string>(await res.json()) // RpcOk<string> | RpcErr
const data = response.unwrap() // string
console.log(data) // "world"
```

### Handle requests

```tsx
/**
 * Handle JSON requests and returns a JSON response
 */
function onMessage(message: string): string {
  const request = JSON.parse(message) as RpcRequestInit<unknown>
  const result = onRequest(request)
  const response = RpcResponse.rewrap(request.id, result)
  return JSON.stringify(response)
}

/**
 * Route requests and returns a result
 */
function onRequest(request: RpcRequestPreinit<unknown>): Result<unknown, Error> {
  if (request.method === "hello_world")
    return onHelloWorld(request)
  return new Err(new RpcMethodNotFoundError())
}

/**
 * Handle "hello_world" requests
 */
function onHelloWorld(request: RpcRequestPreinit<unknown>): Result<string, RpcInvalidParamsError> {
  const [hello] = (request as RpcRequestInit<[string]>).params

  if (hello === "hello")
    return new Ok("world")
  return new Err(new RpcInvalidParamsError())
}
```