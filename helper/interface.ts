export interface User {
    userId?: string;
    username?: string;
    email: string;
    avatar?: string;
    password: string;
    birthdate?: Date;
    registeredAt?: Date;
    name: string;
    passwordConfirm: string;
    role?: string;
}