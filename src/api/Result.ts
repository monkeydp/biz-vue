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