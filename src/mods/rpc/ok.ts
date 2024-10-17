import { Ok } from "@hazae41/result"
import { RpcId } from "./request.js"

export type RpcOkInit<T = unknown> =
  | (undefined extends T ? RpcResultlessOkInit : never)
  | RpcResultfulOkInit<T>

export interface RpcResultfulOkInit<T = unknown> {
  readonly jsonrpc: "2.0"
  readonly id: RpcId
  readonly result: T
}

export interface RpcResultlessOkInit {
  readonly jsonrpc: "2.0"
  readonly id: RpcId
}

export namespace RpcOkInit {

  export function from<T>(response: RpcOk<T>): RpcOkInit<T> {
    return response.toJSON()
  }

}

export class RpcOk<T = unknown> extends Ok<T> {
  readonly jsonrpc = "2.0"

  constructor(
    readonly id: RpcId,
    readonly result: T
  ) {
    super(result)
  }

  static from<T>(init: RpcOkInit<T>): RpcOk<T>

  static from<T>(init: RpcResultfulOkInit<T>) {
    return new RpcOk(init.id, init.result)
  }

  static rewrap<T extends Ok.Infer<T>>(id: RpcId, result: T) {
    return new RpcOk(id, result.inner)
  }

  toJSON(): RpcOkInit<T> {
    const { jsonrpc, id, result } = this
    return { jsonrpc, id, result } as const
  }

}
