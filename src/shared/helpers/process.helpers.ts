export const handleAppProcessExists = (): void => {
    // Handle uncaught exceptions
    process.on('uncaughtException', (err: Error) => {
        console.error('Uncaught Exception: ', err);
        // Additional handling, logging, cleanup, etc.
        process.exit(1); // Exit the process due to the uncaught exception
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // Additional handling, logging, cleanup, etc.
    });
};
