export class Logger {
	public success = (message: any) => console.log('\x1b[32m' + message);
	public error = (message: any) => console.log('\x1b[31m' + message);
	public info = (message: any) => console.log('\x1b[36m' + message);
	public warn = (message: any) => console.log('\x1b[33m' + message);
}
