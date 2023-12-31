import { Err, Ok, Result } from "@hazae41/result"
import { RpcErr, RpcErrInit } from "./err.js"
import { RpcOk, RpcOkInit } from "./ok.js"
import { RpcId } from "./request.js"

export type RpcResponseInit<T = unknown> =
  | RpcOkInit<T>
  | RpcErrInit

export type RpcResponse<T = unknown> =
  | RpcOk<T>
  | RpcErr

export namespace RpcResponse {

  export function from<T>(init: RpcResponseInit<T>) {
    if ("error" in init)
      return RpcErr.from(init)
    return RpcOk.from(init)
  }

  export function rewrap<T extends Ok.Infer<T>>(id: RpcId, result: T): RpcOk<Ok.Inner<T>>

  export function rewrap<T extends Err.Infer<T>>(id: RpcId, result: T): RpcErr

  export function rewrap<T extends Result.Infer<T>>(id: RpcId, result: T): RpcResponse<Ok.Inner<T>>

  export function rewrap<T extends Result.Infer<T>>(id: RpcId, result: T): RpcResponse<Ok.Inner<T>> {
    if (result.isErr())
      return RpcErr.rewrap(id, result)
    return RpcOk.rewrap(id, result)
  }

}