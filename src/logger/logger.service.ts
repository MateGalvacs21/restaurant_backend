export class Logger {
    public static success = (message: any) => console.log("\x1b[32m" + message);
    public static error = (message: any) => console.log("\x1b[31m" + message);
    public static info = (message: any) => console.log("\x1b[36m" + message);
    public static warn = (message: any) => console.log("\x1b[33m" + message);
}