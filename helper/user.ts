import {faker} from "@faker-js/faker";
import {User} from "./interface";

import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1')
//
// const userData:UserData = {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     password: 'test1234',
//     passwordConfirm: 'test1234'
// }
import { cookie } from '../src/tests/user_update.spec'
import {cookieHome} from "../src/tests/user_update_HomeWork.spec";
export function getUser(role: string):User {
    const randomUser = createRandomUser()
    const password = 'test12345';
    return {
        name: randomUser.username,
        email: randomUser.email.toLowerCase(),
        password: password,
        passwordConfirm: password,
        role: role
    }
}

export function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(), // before version 9.1.0, use userName()
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}

//Signup user (Promise with async/await)
export function signUp(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send(user)
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function signUp2(user: User){
    return request
        .post('/users/signup')
        .send(user)
}

export function login(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/login')
            .send(user)
            .end((err, res)=>{
                if(err) reject(err)
                else resolve(res);
            })
    })
}

export function login2(user: User){
    return request.post('/users/login').send(user)
}

export function deleteFunction(cookie: string):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .delete('/users/deleteMe')
            .set('Cookie', cookie)
            .end((err, res)=>{
                if(err) reject(err)
                else resolve(res);
            })
    })
}

export function deleteFunction2(cookie: string){
    return request.delete('/users/deleteMe').set('Cookie', cookie)
}

export function loginInvalidEmail(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/login')
            .send({
                email: 'user@user.com',
                password: user.password
            })
            .end((err, res)=>{
                if(err) reject(err)
                else resolve(res);
            })
    })
}

export function loginInvalidPassword(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/login')
            .send({
                email: user.email,
                password: 'test123456'
            })
            .end((err, res)=>{
                if(err) reject(err)
                else resolve(res);
            })
    })
}

export function login2InvalidEmail(user: User){
    return request.post('/users/login').send({
        email: 'user@user.com',
        password: user.password
    })
}

export function login2InvalidPassword(user: User){
    return request.post('/users/login').send({
        email: user.email,
        password: 'test123456'
    })
}

export function userUpdatePhoto(user: User){
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .attach('photo', 'data/photo/pasv.png')
}

export function userUpdateName(user: User){
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            name: "John Doe"
        })
}

export function wrongRoute(user: User) {
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookieHome)
        .send({
            password: "testFrog12"
        })
}

export function withoutToken(user: User) {
    return request
        .patch('/users/updateMe')
        .send({
            name: 'Strong Beaver'
        })
}

export function invalidFormat(user: User) {
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookieHome)
        .send({
            email: 'frog.frog.com'
        })
}

export function invalidToken(user: User) {
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookieHome+1)
        .send({
            name: 'Frog'
        })
}

export function successUpdate(user: User){
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookieHome)
        .send({
            name: "Strong Beaver",
            email: "beaver@strong.com"
        })
}

export function pictureUpdate(user: User) {
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookieHome)
        .attach('photo', 'data/photo/pasv.png')
}

export function logIn(user: User) {
    return request
        .patch('/users/updateMe')
        .set('Cookie', cookieHome)
        .send({
            name: "Frog"
        })
}