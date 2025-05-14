import { server } from './app';
import config from './config';
import { mongoConnect } from './providers/db';

async function startServer() {
    await mongoConnect();
    server.listen(config.port, async () => {
        console.log('****************************************\n');
        console.log(`\n ====> App running on port ${config.port}\n`);
        console.log('****************************************');
    });
}

startServer();
