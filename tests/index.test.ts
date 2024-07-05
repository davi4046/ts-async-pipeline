import { Pipeline } from '../src/index';

test(
    'Basic piping',
    async () => {
        const result = await new Pipeline()
            .pipe(() => {
                return new Promise<string>((resolve) => {
                    resolve('hello');
                });
            })
            .pipe((result) => {
                return new Promise<number>((resolve) => {
                    resolve(result.length);
                });
            })
            .exec();

        expect(result).toBe(5);
    },
    20 * 1000
);

test(
    'Initial input',
    async () => {
        await new Pipeline(['hej', 'med', 'dig'])
            .pipe((input) => {
                return new Promise<number[]>((resolve) => {
                    resolve(input.map((string) => string.length));
                });
            })
            .pipe((input) => {
                expect(input).toEqual([3, 3, 3]);
                return new Promise<void>((resolve) => resolve());
            })
            .exec();
    },
    20 * 1000
);

test(
    'Timeout',
    async () => {
        const result = await new Pipeline()
            .pipe(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve('hello');
                    }, 10 * 1000);
                });
            }, 5)
            .exec();

        expect(result).toBeNull();
    },
    20 * 1000
);

test(
    'Timeout with fallback',
    async () => {
        const result = await new Pipeline()
            .pipe(
                () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('hello');
                        }, 10 * 1000);
                    });
                },
                5,
                'fallback'
            )
            .exec();

        expect(result).toBe('fallback');
    },
    20 * 1000
);

test('Cancellation rejects promise', async () => {
    async function threeSecondTimeout() {
        return new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 3000);
        });
    }

    const pipeline = new Pipeline()
        .pipe(threeSecondTimeout)
        .pipe(threeSecondTimeout)
        .pipe(threeSecondTimeout);

    new Promise(() => {
        setTimeout(() => pipeline.cancel(), 5000);
    });

    await pipeline.exec().catch((reason) => {
        expect(reason).toBe('Pipeline was cancelled');
    });
}, 20000);

test('Cancellation stops flow', async () => {
    async function threeSecondTimeout() {
        return new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 3000);
        });
    }

    let counter = 0;

    const pipeline = new Pipeline()
        .pipe(() => {
            counter += 1;
            return threeSecondTimeout();
        })
        .pipe(() => {
            counter += 1;
            return threeSecondTimeout();
        })
        .pipe(() => {
            counter += 1;
            return threeSecondTimeout();
        });

    new Promise(() => {
        setTimeout(() => pipeline.cancel(), 5000);
    });

    pipeline.exec().catch(() => {});

    // Wait until every pipe could potentially have run
    await threeSecondTimeout();
    await threeSecondTimeout();
    await threeSecondTimeout();
    await threeSecondTimeout();
    expect(counter).toBe(2);
}, 20000);
