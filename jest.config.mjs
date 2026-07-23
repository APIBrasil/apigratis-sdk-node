/** @type {import('jest').Config} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts', '!src/generated/**', '!src/core/types.ts'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testMatch: ['**/tests/**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
