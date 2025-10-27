import { Errors } from "@/libs/errors/mod.ts"
import type { RpcId } from "@/mods/rpc/request/mod.ts"
import { Err } from "@hazae41/result-and-option"

export interface RpcErrorInit {
  readonly code: number,
  readonly message: string,
  readonly data: unknown
}

export class RpcError extends Error {
  readonly #class = RpcError
  readonly name: string = this.#class.name

  static readonly codes = {
    ParseError: -32700,
    InvalidRequest: -32600,
    MethodNotFound: -32601,
    InvalidParams: -32602,
    InternalError: -32603
  } as const

  static readonly messages = {
    ParseError: "Parse error",
    InvalidRequest: "Invalid Request",
    MethodNotFound: "Method not found",
    InvalidParams: "Invalid params",
    InternalError: "Internal error",
    ServerError: "Server error"
  } as const

  constructor(
    readonly code: number,
    readonly message: string,
    readonly data: unknown = undefined
  ) {
    super(message)
  }

  static from(init: RpcErrorInit): RpcError {
    const { code, message, data } = init
    return new RpcError(code, message, data)
  }

  static rewrap(error: unknown): RpcError {
    if (error instanceof RpcError)
      return error
    return new RpcInternalError(Errors.toString(error))
  }

  toJSON(): RpcErrorInit {
    const { code, message, data } = this
    return { code, message, data }
  }

}

export class RpcParseError extends RpcError {
  readonly #class = RpcParseError
  readonly name: string = this.#class.name

  static readonly code = RpcError.codes.ParseError
  static readonly message = RpcError.messages.ParseError

  constructor(message: string = RpcError.messages.ParseError) {
    super(RpcError.codes.ParseError, message)
  }
}

export class RpcInvalidRequestError extends RpcError {
  readonly #class = RpcInvalidRequestError
  readonly name: string = this.#class.name

  static readonly code = RpcError.codes.InvalidRequest
  static readonly message = RpcError.messages.InvalidRequest

  constructor(message: string = RpcError.messages.InvalidRequest) {
    super(RpcError.codes.InvalidRequest, message)
  }

}

export class RpcMethodNotFoundError extends RpcError {
  readonly #class = RpcMethodNotFoundError
  readonly name: string = this.#class.name

  static readonly code = RpcError.codes.MethodNotFound
  static readonly message = RpcError.messages.MethodNotFound

  constructor(message: string = RpcError.messages.MethodNotFound) {
    super(RpcError.codes.MethodNotFound, message)
  }

}

export class RpcInvalidParamsError extends RpcError {
  readonly #class = RpcInvalidParamsError
  readonly name: string = this.#class.name

  static readonly code = RpcError.codes.InvalidParams
  static readonly message = RpcError.messages.InvalidParams

  constructor(message: string = RpcError.messages.InvalidParams) {
    super(RpcError.codes.InvalidParams, message)
  }

}

export class RpcInternalError extends RpcError {
  readonly #class = RpcInternalError
  readonly name: string = this.#class.name

  static readonly code = RpcError.codes.InternalError
  static readonly message = RpcError.messages.InternalError

  constructor(message: string = RpcError.messages.InternalError) {
    super(RpcError.codes.InternalError, message)
  }

}

export interface RpcErrInit {
  readonly jsonrpc: "2.0"
  readonly id: RpcId
  readonly error: RpcErrorInit
}

export class RpcErr extends Err<RpcError> {
  readonly jsonrpc = "2.0"

  constructor(
    readonly id: RpcId,
    readonly error: RpcError
  ) {
    super(error)
  }

  static from(init: RpcErrInit): RpcErr {
    return new RpcErr(init.id, RpcError.from(init.error))
  }

  static rewrap<T extends Err.Infer<T>>(id: RpcId, result: T): RpcErr {
    return new RpcErr(id, RpcError.rewrap(result.inner))
  }

  toJSON(): RpcErrInit {
    const { jsonrpc, id } = this

    const error = this.error.toJSON()

    return { jsonrpc, id, error } as const
  }

}