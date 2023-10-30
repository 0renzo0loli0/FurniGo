import { IUser } from "src/app/user/model/user.interface";
export namespace AuthUtils {

    export const getStorageCurrentUser = (): string | null => {
        return localStorage.getItem('currentUser');
    }

    export const getStorageToken = (): string | null => {
        return localStorage.getItem('accessToken');
    }

    export const getToken = (): string | null => {
        const token = getStorageToken();
        if (token) {
            return JSON.parse(token);
        }
        return null;
    }

    export const getCurrentUser = (): IUser | null => {
        const user = localStorage.getItem('currentUser');
        if (user != null) {
            return JSON.parse(user)
        }

        return null;
    }

    export const existToken = (): boolean => {
        const token = getToken();
        return token != null;
    }

    export const existUser = (): boolean => {
        const user = getCurrentUser()
        return user != null;
    }
}