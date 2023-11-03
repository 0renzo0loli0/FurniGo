import { UserEntity } from "src/app/user/model/user.entity";

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

    export const getCurrentUser = (): UserEntity | null => {
        const userStorage = localStorage.getItem('currentUser');
        if (userStorage != null) {
            const userJSON = JSON.parse(userStorage); 
            return UserEntity.fromObject(userJSON)
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