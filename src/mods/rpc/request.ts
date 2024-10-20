export type RpcId = number | string | null

export type RpcRequestPreinit<T = unknown> =
  | (undefined extends T ? RpcParamlessRequestPreinit : never)
  | RpcParamfulRequestPreinit<T>

export interface RpcParamfulRequestPreinit<T = unknown> {
  readonly id?: RpcId
  readonly method: string,
  readonly params: T
}

export interface RpcParamlessRequestPreinit {
  readonly id?: RpcId
  readonly method: string
  readonly params?: undefined
}

export type RpcRequestInit<T = unknown> =
  | (undefined extends T ? RpcParamlessRequestInit : never)
  | RpcParamfulRequestInit<T>

export interface RpcParamfulRequestInit<T = unknown> {
  readonly jsonrpc: "2.0"
  readonly id: RpcId
  readonly method: string
  readonly params: T
}

export interface RpcParamlessRequestInit {
  readonly jsonrpc: "2.0"
  readonly id: RpcId
  readonly method: string
  readonly params?: undefined
}

export class RpcRequest<T = unknown> {
  readonly jsonrpc = "2.0" as const

  constructor(
    readonly id: RpcId,
    readonly method: string,
    readonly params: T
  ) { }

  static from<T>(init: RpcRequestInit<T>): RpcRequest<T>

  static from<T>(init: RpcParamfulRequestInit<T>) {
    const { id, method, params } = init
    return new RpcRequest(id, method, params)
  }

  toJSON(): RpcRequestInit<T> {
    const { jsonrpc, id, method, params } = this
    return { jsonrpc, id, method, params } as const
  }

}