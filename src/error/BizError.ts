/**
 * 业务异常会报给用户看
 */
import {ErrorType} from "./ErrorType";

export type BizError = Error & {
    errorType: ErrorType;
}

export class BaseBizError implements BizError {
    readonly message: string;
    readonly name: string;
    readonly stack?: string;
    readonly errorType = ErrorType.BIZ_ERROR

    constructor(message: string, name = "", stack?: string) {
        this.message = message;
        this.name = name;
        this.stack = stack;
    }
}

class StdBizError extends BaseBizError {
    constructor(message: string, name = "", stack?: string) {
        super(message, name, stack);
    }
}

export default function berror(
    message: string,
    name = "",
    stack: string | undefined = undefined
): never {
    throw new StdBizError(message, name, stack)
}

export function isBizError(obj: object): obj is BizError {
    const bizError = obj as BizError;
    return bizError.errorType == ErrorType.BIZ_ERROR
}
