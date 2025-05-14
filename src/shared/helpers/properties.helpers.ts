export const asyncMap = (array, handler, callback?): Promise<[void]> =>
    new Promise((resolve, reject) => {
        const results: any = [];
        try {
            for (const item of array) {
                const result = handler(item);
                results.push(result);
            }

            if (callback) callback(results);
            return resolve(results);
        } catch (error) {
            console.log('async map error catch');
            return reject(error);
        }
    });
