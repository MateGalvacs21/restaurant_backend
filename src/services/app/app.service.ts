import {AuthenticationService} from "../../authentication/service/authentication.service";
import {Logger} from "../logger/logger.service";

export class AppService {
    public static startWatchExpired(){
        Logger.success('Token expired visitor start.');
        setInterval(AuthenticationService.expired,18000000);
    }
}