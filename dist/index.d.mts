type Pipe<I, O> = (input: I, timeLimitSecs?: number) => Promise<O>;
declare class Pipeline {
    private _pipings;
    private _pipe;
    private _exec;
    pipe<O>(pipe: Pipe<null, O>): PipeLink<O>;
    pipe<O>(pipe: Pipe<null, O>, timeLimitSecs: number): PipeLink<O | null>;
    pipe<O>(pipe: Pipe<null, O>, timeLimitSecs: number, fallbackValue: O): PipeLink<O>;
}
declare class PipeLink<I> {
    private _pipe;
    private _exec;
    constructor(_pipe: (pipe: Pipe<any, any>, timeLimitSecs?: number, fallbackValue?: any) => void, _exec: () => Promise<any>);
    pipe<O>(pipe: Pipe<I, O>): PipeLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipeLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipeLink<O>;
    exec(): Promise<I>;
}

export { type Pipe, PipeLink, Pipeline };
