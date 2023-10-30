import { IUser, USER_ROLE } from "./user.interface";

export class UserEntity implements IUser{
    id: number;
    name: string;
    pic?: string | undefined;
    role: USER_ROLE;
    email: string;
    phone: string;

    constructor(){
        this.id = 0
        this.name = "Unknown"
        this.role = USER_ROLE.client
        this.email = "xxx@example.com"
        this.phone = "+51-999999999"
    }
}