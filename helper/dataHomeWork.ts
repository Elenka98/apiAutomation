import {faker} from "@faker-js/faker";
import {User} from "../helper/interface";
import * as supertest from "supertest";
const request = supertest('http://localhost:8001/api/v1')

export const userHW = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: 'test1234',
    passwordConfirm: 'test1234'
}

export const errorMessage = {
    status: 'fail',
    name: 'Missing required fields: name',
    password: 'Missing required fields: password',
    email: 'Missing required fields: email',
    passwordConfirm: 'Missing required fields: passwordConfirm',
    different: 'User validation failed: passwordConfirm: Passwords are not the same!',
    used: 'This email is already in use. Please use another email.',
    invalidEmail: 'User validation failed: email: Please provide a valid email',
    shortPassword: 'User validation failed: password: Path `password` (`myp4`) is shorter than the minimum allowed length (8).'
}

export function withoutName(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                email: userHW.email,
                password: userHW.password,
                passwordConfirm: userHW.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function withoutPassword(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                email: userHW.email,
                passwordConfirm: userHW.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function withoutPasswordConfirm(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                email: userHW.email,
                password:  userHW.password
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function withoutEmail(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                password:  userHW.password,
                passwordConfirm: userHW.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function differentPasswords(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                email: userHW.email,
                password: 'test12345',
                passwordConfirm: 'mypassword123'
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function usedEmail(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                email: "test1@example.com",
                password: userHW.password,
                passwordConfirm: userHW.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function invalidEmail(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                email: 'user.user.com',
                password: userHW.password,
                passwordConfirm: userHW.passwordConfirm
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}

export function shortPassword(userHW: User):Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send({
                name: userHW.name,
                email: userHW.email,
                password: 'myp4',
                passwordConfirm: 'myp4'
            })
            .end((err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
    })
}