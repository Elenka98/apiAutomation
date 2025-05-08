import * as supertest from 'supertest';
import {
    deleteFunction,
    getUser,
    invalidFormat,
    invalidToken, logIn,
    login, login2, pictureUpdate,
    signUp, successUpdate,
    withoutToken,
    wrongRoute
} from "../../helper/user";
import {User} from "../../helper/interface";
let user: User;
export let cookieHome: string;
const request = supertest('http://localhost:8001/api/v1')

describe('HOMEWORK TESTING', () => {
    beforeAll(async() => {
        user = getUser('admin');

        const signUpRes = await signUp(user)
        expect(signUpRes.statusCode).toBe(201)

        const loginRes = await login(user)
        expect(loginRes.statusCode).toBe(200)
        cookieHome = loginRes.headers['set-cookie'][0].split(';')[0];
        console.log('User was created')
    })

    afterAll(async() => {
        await deleteFunction(cookieHome).then((res) => {
            expect(res.statusCode).toBe(200)
        })
        console.log('User was deleted')
    })

    it('Reject password update via this route', async () => {
        const resPassword = await wrongRoute(user)
        expect(resPassword.statusCode).toBe(400)
        expect(resPassword.body.message).toBe('This route is not for password updates. Please use /updateMyPassword.')
    })

    it('Reject updates without token', async () => {
        const resToken = await withoutToken(user)
        expect(resToken.statusCode).toBe(401)
        expect(resToken.body.message).toBe('You are not logged in! Please log in to get access.')
    })

    it('Reject invalid email format', async() => {
        const resEmail = await invalidFormat(user)
        //expect(resEmail.statusCode).toBe(400)
        expect(resEmail.body.message).toBe('Validation failed: email: Please provide a valid email')
    })

    // it('Reject empty request body', async () => {
    //     const resBody = await request
    //         .patch('/users/updateMe')
    //         .set('Cookie', cookie)
    //     expect(resBody.statusCode).toBe(400)
    //     console.log(resBody.body)
    // })

    //it('Reject unauthorized field updates (role, reset token)', async () => {})

    it('Reject requests with an invalid token', async () => {
        const resToken = await invalidToken(user)
        expect(resToken.statusCode).toBe(401)
        expect(resToken.body.message).toBe('Invalid token. Please log in again.')
    })

    it('Successfully update the user and email', async () => {
        const resPos = await successUpdate(user)
        expect(resPos.statusCode).toBe(200)
    })

    it('Successfully upload profile picture', async () => {
        const resPhoto = await pictureUpdate(user)
        expect(resPhoto.statusCode).toBe(200)
    })

    it('Ensure login still works after updates', async () => {
        const res = await logIn(user)
        expect(res.statusCode).toBe(200)
        const respLogin = await login2(user)
        expect(respLogin.statusCode).toBe(200)
    })
})