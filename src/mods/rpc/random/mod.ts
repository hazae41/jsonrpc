import { RpcParamfulRequestPreinit, RpcRequest, RpcRequestPreinit } from "../mod.ts";

export class RpcRandom {

  static prepare<T>(init: RpcRequestPreinit<T>): RpcRequest<T>

  static prepare<T>(init: RpcParamfulRequestPreinit<T>): RpcRequest<T> {
    return new RpcRequest(crypto.randomUUID(), init.method, init.params)
  }

}