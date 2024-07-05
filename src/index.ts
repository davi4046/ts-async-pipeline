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

    private _exec = async () => {
        return await this._pipings.reduce(
            async (promise: Promise<any> | null, [pipe, timeLimitSecs, fallbackValue]) => {
                const input = await promise;

                return new Promise(async (resolve) => {
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
            },
            new Promise((resolve) => resolve(this._input)) // Initial input
        );
    };

    pipe<O>(pipe: Pipe<I, O>): PipeLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipeLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipeLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs?: number, fallbackValue?: O): PipeLink<O> {
        this._pipe(pipe, timeLimitSecs, fallbackValue);
        return new PipeLink(this._pipe, this._exec);
    }
}

export class PipeLink<I> {
    constructor(
        private _pipe: (pipe: Pipe<any, any>, timeLimitSecs?: number, fallbackValue?: any) => void,
        private _exec: () => Promise<any>
    ) {}

    pipe<O>(pipe: Pipe<I, O>): PipeLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipeLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipeLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs?: number, fallbackValue?: O): PipeLink<O> {
        this._pipe(pipe, timeLimitSecs, fallbackValue);
        return new PipeLink(this._pipe, this._exec);
    }

    exec(): Promise<I> {
        return this._exec();
    }
}
