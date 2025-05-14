import { AgentConfigOptions } from 'elastic-apm-node';

import { envVars } from '../shared/validations/environment.validation';

/** @type {AppConfig} */
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,

    corsOptions: {},
    startupConfig: {
        apmConfig: {
            logLevel: 'critical',
            serverUrl: 'http://127.0.0.1:8200'
        } as AgentConfigOptions,
        eventStoreConfig: {
            connectionSettings: {
                SingleNodeOptions: { endpoint: 'localhost:2113' },
                channelCredentials: { insecure: true },
                defaultUserCredentials: {
                    username: 'admin',
                    password: '@admin@admin'
                }
            },
            defaultSubscriptionSettings: {
                resolveLinkTos: true,
                maxRetryCount: 5,
                messageTimeout: 60000,
                startFrom: 'start',
                extraStatistics: false,
                checkPointAfter: 2000,
                checkPointLowerBound: 1,
                checkPointUpperBound: 1000,
                maxSubscriberCount: 'unbounded',
                liveBufferSize: 500,
                readBatchSize: 20,
                historyBufferSize: 500,
                consumerStrategyName: 'RoundRobin'
            },
            events: [{ streamName: 'STATUS_UPDATE_V2a', groupName: 'G2' }]
        }
    }
};

export default config;
