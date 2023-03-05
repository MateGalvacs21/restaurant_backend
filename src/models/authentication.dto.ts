export type LoginDTO = {
    email: string;
    password: string;
}
export type RegisterDTO = LoginDTO & {
    restaurantId?: string;
    isAdmin: boolean;
    name: string;
}