module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
    transform: {
        '^.+\\.m?[tj]s?$': ['ts-jest', { useESM: true }]
    },
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@providers/(.*)$': '<rootDir>/src/providers/$1',
        '^@config$': '<rootDir>/src/config',
        '^@constants$': '<rootDir>/src/shared/constants',
        '^@controllers/(.*)$': '<rootDir>/src/API/controllers/$1',
        '^@services/(.*)$': '<rootDir>/src/API/services/$1',
        '^@routes$': '<rootDir>/src/API/routes',
        '^@docs$': '<rootDir>/src/shared/docs',
        '^@fixture/(.*)$': '<rootDir>/src/shared/fixture/$1',
        '^@middleware/(.*)$': '<rootDir>/src/shared/middleware/$1',
        '^@providers/(.*)$': '<rootDir>/src/providers/$1',
        '^@interfaces/(.*)$': '<rootDir>/src/shared/interfaces/$1',
        '^@validations/(.*)$': '<rootDir>/src/shared/validations/$1',
        '^@helpers/(.*)$': '<rootDir>/src/shared/helpers/$1'
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/.history/', 'src/**/*.ts']
};
