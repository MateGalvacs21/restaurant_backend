const tsConfig = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');
const {resolve} = require("path");

const moduleNameMapper = pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: `${resolve(tsConfig.compilerOptions.baseUrl)}/`,
});

module.exports = {
    rootDir: tsConfig.compilerOptions.baseUrl,
    testMatch: ['**/src/**/*.spec.ts'],
    collectCoverage: false,
    coveragePathIgnorePatterns: ['.mock.ts', '.dto.ts','.enum.ts','.route.ts', '.model.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['html'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
        './src/**/*.ts': {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    moduleNameMapper,
    testEnvironment: 'node',
    setupFiles: ['./src/shared/mocks/configuration-service.mock.js'],
    setupFilesAfterEnv: ['./src/shared/polyfill.ts'],
    preset: 'ts-jest',
    verbose: true,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    }
}