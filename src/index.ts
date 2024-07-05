export type Pipe<I, O> = (input: I, timeLimitSecs?: number) => Promise<O>;

export class Pipeline<I = void> {
    private _input?: I;

    constructor();
    constructor(input: I);
    constructor(input?: I) {
        this._input = input;
    }

    private _pipings: [Pipe<any, any>, number | undefined, any | undefined][] = [];

    private _pipe = (pipe: Pipe<any, any>, timeLimitSecs?: number, fallbackValue?: any) => {
        this._pipings.push([pipe, timeLimitSecs, fallbackValue]);
    };

    private _exec = () => {
        return new Promise<any>(async (resolve, reject) => {
            let input: any = this._input;

            for (const [pipe, timeLimitSecs, fallbackValue] of this._pipings) {
                if (this._isCancelled) {
                    reject('Pipeline was cancelled');
                    return;
                }

                input = await new Promise(async (resolve) => {
                    let timeout = undefined;

                    if (timeLimitSecs !== undefined) {
                        timeout = setTimeout(() => {
                            resolve(fallbackValue !== undefined ? fallbackValue : null);
                        }, timeLimitSecs * 1000);
                    }

                    pipe(input, timeLimitSecs).then((output) => {
                        clearTimeout(timeout);
                        resolve(output);
                    });
                });
            }

            resolve(input);
        });
    };

    pipe<O>(pipe: Pipe<I, O>): PipelineLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipelineLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipelineLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs?: number, fallbackValue?: O): PipelineLink<O> {
        this._pipe(pipe, timeLimitSecs, fallbackValue);
        return new PipelineLink(this._pipe, this._exec, this._cancel);
    }

    private _isCancelled = false;

    private _cancel = () => {
        this._isCancelled = true;
    };

    cancel() {
        this._cancel();
    }
}

export class PipelineLink<I> {
    constructor(
        private _pipe: (pipe: Pipe<any, any>, timeLimitSecs?: number, fallbackValue?: any) => void,
        private _exec: () => Promise<any>,
        private _cancel: () => void
    ) {}

    pipe<O>(pipe: Pipe<I, O>): PipelineLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipelineLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipelineLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs?: number, fallbackValue?: O): PipelineLink<O> {
        this._pipe(pipe, timeLimitSecs, fallbackValue);
        return new PipelineLink(this._pipe, this._exec, this._cancel);
    }

    exec(): Promise<I> {
        return this._exec();
    }

    cancel() {
        this._cancel();
    }
}
