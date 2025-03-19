export namespace Errors {

  export function toJSON(error: unknown): unknown {
    if (Array.isArray(error))
      return error.map(toJSON)
    if (error instanceof Error)
      return { name: error.name, message: error.message, cause: toJSON(error.cause) }
    return error
  }

  export function toString(error: unknown) {
    return JSON.stringify(toJSON(error))
  }

}