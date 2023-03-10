import { AppService } from '@root/services/app/app.service';

describe('Application Service', () => {
	it('should start token visitor after 14 minutes', () => {
		jest.useFakeTimers();
		const logSpy = jest.spyOn(console, 'log');
		AppService.startWatchExpired();
		expect(logSpy).toBeCalledWith('\x1b[32m' + 'Token expired visitor start.');
		logSpy.mockReset();
	});
});
