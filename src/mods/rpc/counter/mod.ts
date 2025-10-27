import { type RpcParamfulRequestPreinit, RpcRequest, type RpcRequestPreinit } from "@/mods/rpc/request/mod.ts"

export class RpcCounter {

  id = 0

  prepare<T>(init: RpcRequestPreinit<T>): RpcRequest<T>

  prepare<T>(init: RpcParamfulRequestPreinit<T>): RpcRequest<T> {
    const { id = this.id++, method, params } = init
    return new RpcRequest(id, method, params)
  }

}
