export enum USER_ROLE {
    client = "client",
    expert = "expert"
}

export interface IUser{
    id: number
    name: string
    pic?: string
    role: USER_ROLE
    email: string
    phone: string
}