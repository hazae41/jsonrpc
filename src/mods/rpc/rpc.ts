import { RpcRequest, RpcRequestPreinit } from "./request.js"

export class RpcCounter {

  id = 0

  prepare<T>(init: RpcRequestPreinit<T>): RpcRequest<T> {
    return new RpcRequest(this.id++, init.method, init.params)
  }

}
