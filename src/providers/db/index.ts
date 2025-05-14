import * as mongoose from 'mongoose';

export async function mongoConnect(): Promise<void> {
    const mongodbUrl = process.env.MONGODB_URL || '';
    const mongoDbName = process.env.MONGODB_NAME || '';
    await mongoose
        .connect(mongodbUrl, {
            dbName: mongoDbName
        })
        .then(() => {
            console.log('Connect to mongo DB successfully 🚀');
        })
        .catch(() => {
            console.log('Cannot connect to mongo DB \u{1F3AF}');
            process.exit(1);
        });
}
