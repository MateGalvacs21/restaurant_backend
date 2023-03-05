import {Request, Response} from "express";
import {AuthenticationService} from "../service/authentication.service";
import {LoginDTO, RegisterDTO} from "../../models/authentication.dto";
import {StatusCodes} from "http-status-codes";

export class AuthenticationController {
    public login = (req: Request, res: Response) => {
        const loginData: LoginDTO = req.body;
        AuthenticationService.login(loginData)
            .then((user) => {
                res.status(StatusCodes.ACCEPTED).json(user);
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_ACCEPTABLE).json(error);
            })
    }

    public loginOut = (req: Request, res: Response) => {
        AuthenticationService.logOut(req.params.id)
            .then(() => {
                res.status(StatusCodes.ACCEPTED).json({logOut: req.params.id});
            })
            .catch((error) => {
                res.status(StatusCodes.NOT_ACCEPTABLE).json(error);
            })
    }

    public getLoggedUser = (req: Request, res: Response) => {
        AuthenticationService.getLoggedUser(req.params.id)
            .then((user)=>{
                res.status(StatusCodes.OK).json(user);
            })
            .catch((error)=>{
                res.status(StatusCodes.NOT_FOUND).json(error);
            })
    }

    public signUp = (req: Request, res: Response) => {
        const user : RegisterDTO= req.body;
        AuthenticationService.registration(user)
            .then((createdUser)=>{
                res.status(StatusCodes.CREATED).json(createdUser);
            })
            .catch((error)=>{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            })
    }

    public addRestaurant = (req: Request, res: Response) => {

        AuthenticationService.addRestaurant(req.params.id, req.params.restaurantId)
            .then((user)=>{
                res.status(StatusCodes.ACCEPTED).json(user);
            })
            .catch((error)=>{
                res.status(StatusCodes.BAD_REQUEST).json(error);
            })
    }
}