import {deleteFunction, getUser, login, signUp, userUpdateName, userUpdatePhoto} from "../../helper/user";
import {User} from "../../helper/interface";
let user: User;
export let cookie: string;
import * as supertest from 'supertest';

const request = supertest('http://localhost:8001/api/v1')
describe('USER UPDATE - /users/updateMe', () => {
    beforeAll(async() => {
        user = getUser('admin');

        const signUpRes = await signUp(user)
        expect(signUpRes.statusCode).toBe(201)

        const loginRes = await login(user)
        expect(loginRes.statusCode).toBe(200)
        cookie = loginRes.headers['set-cookie'][0].split(';')[0];
        console.log('User was created')
    })

    afterAll(async() => {
        await deleteFunction(cookie).then((res) => {
            expect(res.statusCode).toBe(200)
        })
        console.log('User was deleted')
    })

    it('Should update the user and email', async () => {
        const res = await userUpdateName(user)
        expect(res.statusCode).toBe(200)
    })

    it('Should update the Photo', async () => {
        const resPhoto = await userUpdatePhoto(user)
        expect(resPhoto.statusCode).toBe(200)
    })
})