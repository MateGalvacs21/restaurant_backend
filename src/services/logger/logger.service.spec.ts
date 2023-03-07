import SpyInstance = jest.SpyInstance;
import { Logger } from '@root/services/logger/logger.service';

describe('Logger Service', () => {
	let consoleSpy: SpyInstance;
	const loggerService = new Logger();

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'log');
	});

	afterEach(() => {
		consoleSpy.mockReset();
	});

	it('should green text if we call logger success method', () => {
		loggerService.success('Test');
		expect(consoleSpy).toBeCalled();
		expect(consoleSpy.mock.calls).toEqual([['\x1b[32m' + 'Test']]);
	});

	it('should yellow text if we call logger warn method', () => {
		loggerService.warn('Test');
		expect(consoleSpy).toBeCalled();
		expect(consoleSpy.mock.calls).toEqual([['\x1b[33m' + 'Test']]);
	});

	it('should red text if we call logger error method', () => {
		loggerService.error('Test');
		expect(consoleSpy).toBeCalled();
		expect(consoleSpy.mock.calls).toEqual([['\x1b[31m' + 'Test']]);
	});

	it('should light blue text if we call logger info method', () => {
		loggerService.info('Test');
		expect(consoleSpy).toBeCalled();
		expect(consoleSpy.mock.calls).toEqual([['\x1b[36m' + 'Test']]);
	});
});
