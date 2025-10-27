import type { RpcId } from "@/mods/rpc/request/mod.ts"
import { Ok } from "@hazae41/result-and-option"

export interface RpcOkInit<T = unknown> {
  readonly jsonrpc: "2.0"
  readonly id: RpcId
  readonly result: T
}

export class RpcOk<T = unknown> extends Ok<T> {
  readonly jsonrpc = "2.0"

  constructor(
    readonly id: RpcId,
    readonly result: T
  ) {
    super(result)
  }

  static from<T>(init: RpcOkInit<T>): RpcOk<T> {
    return new RpcOk(init.id, init.result)
  }

  static rewrap<T extends Ok.Infer<T>>(id: RpcId, result: T): RpcOk<Ok.Inner<T>> {
    return new RpcOk(id, result.inner)
  }

  toJSON(): RpcOkInit<T> {
    const { jsonrpc, id, result } = this
    return { jsonrpc, id, result } as const
  }

}
