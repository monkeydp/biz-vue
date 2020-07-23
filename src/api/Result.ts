import _ from "lodash"
export class Result {
    readonly code!: string;

    constructor(code: string) {
        this.code = code;
    }
}

export class SuccessResult extends Result {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    readonly data: any;

    constructor(code: string, data: any) {
        super(code);
        this.data = data;
    }
}

export class FailResult extends Result {
    readonly msg!: string;

    constructor(code: string, msg: string) {
        super(code);
        this.msg = msg;
    }
}

export class ArgsIllegalResult extends FailResult {
    readonly validErrors!: Array<ValidError>

    constructor(code: string, msg: string, validErrors: Array<ValidError>) {
        super(code, msg);
        this.validErrors = validErrors;
    }

    errorMessagesOneLine(): string {
        return _.map(this.validErrors, "message")
            .join(", ")
    }
}

class ValidError {
    message!: string
    cstrName!: string
    objName!: string
    propName!: string
    illegalValue!: string
}
