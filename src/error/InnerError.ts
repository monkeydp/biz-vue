import {ErrorType} from "./ErrorType";

/**
 * 内部异常不会报给用户看
 */
export type InnerError = Error & {
    errorType: ErrorType;
}

export class BaseInnerError implements InnerError {
    readonly message: string;
    readonly name: string;
    readonly stack?: string;
    readonly errorType = ErrorType.INNER_ERROR

    constructor(message: string, name = "", stack?: string) {
        this.message = message;
        this.name = name;
        this.stack = stack;
    }
}

class StdInnerError extends BaseInnerError {
    constructor(message: string, name = "", stack?: string) {
        super(message, name, stack);
    }
}

export default function ierror(
    message: string,
    name = "",
    stack: string | undefined = undefined
): never {
    throw new StdInnerError(message, name, stack)
}

export function isInnerError(obj: object): obj is InnerError {
    const innerError = obj as InnerError;
    return innerError.errorType == ErrorType.INNER_ERROR
}
