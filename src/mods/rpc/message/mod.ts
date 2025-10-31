import type { RpcRequest, RpcRequestInit } from "../request/mod.ts";
import type { RpcResponse, RpcResponseInit } from "../response/mod.ts";

export type RpcMessageInit =
  | RpcRequestInit
  | RpcResponseInit

export type RpcMessage =
  | RpcRequest
  | RpcResponse