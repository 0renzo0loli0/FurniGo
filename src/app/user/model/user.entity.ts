export enum USER_ROLE {
    client = "CLIENT",
    expert = "EXPERT"
}

export class UserEntity {
    id: number = -1;
    name: string = "Unknown";
    lastName: string = "Unknown";
    pic: string = "";
    role: USER_ROLE = USER_ROLE.client;
    email: string = "user@domain.com";
    phone: string = "+00-999999999";

    constructor(
        nId: number = -1,
        nName: string = "Unknown",
        nLastName: string = "Unknown",
        nRole: USER_ROLE = USER_ROLE.client,
        nEmail: string = "user@domain.com",
        nPhone: string = "+00-999999999",
        nPic: string = ""
    ) {
        this.id = nId;
        this.name = nName;
        this.lastName = nLastName;
        this.role = nRole;
        this.email = nEmail;
        this.phone = nPhone;
        this.pic = nPic;
    }

    public static fromObject(obj: any): UserEntity{
        let nUser = new UserEntity();
        nUser.id = obj.id;
        nUser.lastName = obj.lastName;
        nUser.name = obj.name;
        nUser.email = obj.email;
        nUser.role = obj.role;
        nUser.phone = obj.phone;
        nUser.pic = obj.pic;
        return nUser;
    }

}