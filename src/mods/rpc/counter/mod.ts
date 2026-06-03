import { type RpcParamfulRequestPreinit, RpcRequest, type RpcRequestPreinit } from "@/mods/rpc/request/mod.ts"

export class RpcCounter {

  id = 0

  prepare<T>(init: RpcRequestPreinit<T>): RpcRequest<T>

  prepare<T>(init: RpcParamfulRequestPreinit<T>): RpcRequest<T> {
    return new RpcRequest(this.id++, init.method, init.params)
  }

}
