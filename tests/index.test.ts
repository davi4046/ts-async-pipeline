import { Pipeline } from '../src/index';

test('Basic piping', async () => {
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
});

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
