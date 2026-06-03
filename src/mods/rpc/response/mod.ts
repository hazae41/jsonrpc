// deno-lint-ignore-file no-namespace

export * from "./err/mod.ts"
export * from "./ok/mod.ts"

import type { RpcId } from "@/mods/rpc/request/mod.ts"
import type { Err, Ok, Result } from "@hazae41/result-and-option"
import { RpcErr, type RpcErrInit } from "./err/mod.ts"
import { RpcOk, type RpcOkInit } from "./ok/mod.ts"

export type RpcResponseInit<T = unknown> =
  | RpcOkInit<T>
  | RpcErrInit

export type RpcResponse<T = unknown> =
  | RpcOk<T>
  | RpcErr

export namespace RpcResponse {

  export function from<T>(init: RpcResponseInit<T>): RpcResponse<T> {
    if ("error" in init)
      return RpcErr.from(init)
    if ("result" in init)
      return RpcOk.from(init)
    throw new Error()
  }

  export function rewrap<T>(id: RpcId, result: Ok<T>): RpcOk<T>

  export function rewrap<T>(id: RpcId, result: Err<T>): RpcErr

  export function rewrap<T>(id: RpcId, result: Result<T, unknown>): RpcResponse<T>

  export function rewrap<T>(id: RpcId, result: Result<T, unknown>): RpcResponse<T> {
    return result.isOk() ? RpcOk.rewrap(id, result) : RpcErr.rewrap(id, result)
  }

}