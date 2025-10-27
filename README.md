# JSON-RPC

Rust-like JSON-RPC for TypeScript

```bash
npm install @hazae41/jsonrpc
```

```bash
deno install jsr:@hazae41/jsonrpc
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/jsonrpc) • [**📦 JSR**](https://jsr.io/@hazae41/jsonrpc)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- Rust-like patterns
- Uses `@hazae41/result`
- [Specification](https://www.jsonrpc.org/specification) compliant

## Usage

### Request using fetch

```tsx
import { RpcCounter, RpcResponse } from "@hazae41/jsonrpc"

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
import { RpcRequestInit, RpcRequestPreinit, RpcResponse, RpcMethodNotFoundError, RpcInvalidParamsError } from "@hazae41/jsonrpc"

/**
 * Handle JSON requests and return a JSON response
 */
function onMessage(message: string): string {
  const request = JSON.parse(message) as RpcRequestInit<unknown>
  const response = RpcResponse.rewrap(request.id, onRequest(request))
  return JSON.stringify(response)
}

/**
 * Route requests and return a result
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
  const [hello] = (request as RpcRequestPreinit<[string]>).params

  if (hello === "hello")
    return new Ok("world")
  return new Err(new RpcInvalidParamsError())
}
```