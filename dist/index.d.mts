type Pipe<I, O> = (input: I, timeLimitSecs?: number) => Promise<O>;
declare class Pipeline<I = void> {
    private _input?;
    constructor();
    constructor(input: I);
    private _pipings;
    private _pipe;
    private _exec;
    pipe<O>(pipe: Pipe<I, O>): PipelineLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipelineLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipelineLink<O>;
    private _isCancelled;
    private _cancel;
    cancel(): void;
}
declare class PipelineLink<I> {
    private _pipe;
    private _exec;
    private _cancel;
    constructor(_pipe: (pipe: Pipe<any, any>, timeLimitSecs?: number, fallbackValue?: any) => void, _exec: () => Promise<any>, _cancel: () => void);
    pipe<O>(pipe: Pipe<I, O>): PipelineLink<O>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number): PipelineLink<O | null>;
    pipe<O>(pipe: Pipe<I, O>, timeLimitSecs: number, fallbackValue: O): PipelineLink<O>;
    exec(): Promise<I>;
    cancel(): void;
}

export { type Pipe, Pipeline, PipelineLink };
