import { RpcParamfulRequestPreinit, RpcRequest, RpcRequestPreinit } from "./request.js"

export class RpcCounter {

  id = 0

  prepare<T>(init: RpcRequestPreinit<T>): RpcRequest<T>

  prepare<T>(init: RpcParamfulRequestPreinit<T>): RpcRequest<T> {
    const { id = this.id++, method, params } = init
    return new RpcRequest(id, method, params)
  }

}
