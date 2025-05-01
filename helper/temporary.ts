import {faker} from "@faker-js/faker";
import {User} from "./interface";

import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1')

export function getUserHW():User {
    const randomUserHW = createRandomUserHW()
    const passwordHW = 'test12345';
    return {
        name: randomUserHW.username,
        email: randomUserHW.email.toLowerCase(),
        password: passwordHW,
        passwordConfirm: passwordHW
    }
}

export function createRandomUserHW() {
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

export function withoutNameHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                email: user.email,
                password: user.password,
                passwordConfirm: user.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function withoutPasswordHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                email: user.email,
                passwordConfirm: user.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function withoutPasswordConfirmHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                email: user.email,
                password:  user.password
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function withoutEmailHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                password:  user.password,
                passwordConfirm: user.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function differentPasswordsHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                email: user.email,
                password: 'test12345',
                passwordConfirm: 'mypassword123'
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function usedEmailHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                email: "test1@example.com",
                password: user.password,
                passwordConfirm: user.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function invalidEmailHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                email: 'user.user.com',
                password: user.password,
                passwordConfirm: user.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function shortPasswordHW(user: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: user.name,
                email: user.email,
                password: 'myp4',
                passwordConfirm: 'myp4'
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}