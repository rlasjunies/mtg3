export interface IUser {
    email: string;
    password?: string;
    active: boolean;
    googleId: string;
    facebookId: string;
    displayName: string;
    picture: string;
    allowedRoles: string[];
    toJSON?: () => any;
}
export interface IUserDoc extends IUser {
    _id?: string;
}
