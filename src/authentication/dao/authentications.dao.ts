import {LoginDTO, RegisterDTO} from "../../models/authentication.dto";
import {DocumentType} from "@typegoose/typegoose";
import {AuthenticationModel, User} from "../model/authentication.model";
import {compare} from "bcrypt"
import {Logger} from "../../services/logger/logger.service";
import {AuthenticationMapper} from "../mapper/authentication.mapper";
export class AuthenticationsDAO {
    public static async login(authentication: LoginDTO): Promise<DocumentType<User>> {
        const user = await AuthenticationModel.findOne({email: authentication.email});
        if(!user) throw new Error('Not found user with this data');
        if(!user.password) throw new Error('Not found user with this data');
        if(user&&(await compare(authentication.password,user.password))) {
            Logger.info(`[LOGIN] ${user.email}...`)
            return user as DocumentType<User>;
        }
        else{
            throw new Error('Password or email was wrong');
        }
    }
    public static async singUp(registerData: RegisterDTO): Promise<DocumentType<User>>{
        const user = await AuthenticationModel.findOne({email: registerData.email});
        if(user) throw new Error('This email already exist');
        return AuthenticationModel.create(AuthenticationMapper.mapToDAO(registerData));
    }
}