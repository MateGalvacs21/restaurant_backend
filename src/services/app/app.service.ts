import { AuthenticationService } from '../../authentication/service/authentication.service';
import { Logger } from '../logger/logger.service';

export class AppService {
	private static loggerService = new Logger();
	public static startWatchExpired() {
		this.loggerService.success('Token expired visitor start.');
		setInterval(AuthenticationService.expired, 839988);
	}
}
