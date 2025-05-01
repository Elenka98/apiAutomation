import {faker} from "@faker-js/faker";
import {Response} from "superagent";
import {User} from "../../helper/interface";
import {
    deleteFunction,
    deleteFunction2,
    getUser,
    login,
    login2, login2InvalidEmail, login2InvalidPassword,
    loginInvalidEmail, loginInvalidPassword,
    signUp,
    signUp2
} from "../../helper/user";
import * as supertest from 'supertest';
import {errorMessage} from "../../helper/dataHomeWork";
const request = supertest('http://localhost:8001/api/v1')

describe('USER SIGNUP AND LOGIN', () => {
    const user:User = getUser('admin');
    let cookie: string;
    describe('POSITIVE TESTING', () => {
        //Async/await + try and catch
        it('Should signup, login and delete the user', async () => {
            try {
                //Make the POST request
                const res = await signUp(user);
                expect(res.statusCode).toBe(201);
                expect(res.body.data.user.email).toEqual(user.email);
                expect(res.body.status).toEqual('success');
                //login user
                const loginRes = await login(user)
                expect(loginRes.statusCode).toBe(200);
                expect(res.body.status).toEqual('success');
                cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                //delete user
                const deleteRes = await deleteFunction(cookie)
                expect(deleteRes.statusCode).toBe(200);
                expect(deleteRes.body.message).toEqual('User deleted successfully');
                //login
                const loginAfterDeletion = await login2(user);
                expect(loginAfterDeletion.statusCode).toBe(401);
                expect(loginAfterDeletion.body.message).toBe('Incorrect email or password');
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Should signup, login and delete the user .then()', () => {
            return signUp(user)
                .then((res) => {
                    console.log(res.body)
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);
                    expect(res.body.status).toEqual('success');
                    return login(user)
                })
                .then((loginRes) => {
                    console.log(loginRes.body, 'loginRes');
                    expect(loginRes.statusCode).toBe(200);
                    expect(loginRes.body.status).toBe('success');
                    console.log('cookie', loginRes.headers['set-cookie'][0])
                    cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                    return deleteFunction(cookie)
                })
                .then((deleteRes) => {
                    expect(deleteRes.statusCode).toBe(200);
                    expect(deleteRes.body.message).toEqual('User deleted successfully');
                    return login(user)
                })
                .then((loginAfrerDelete) => {
                    expect(loginAfrerDelete.statusCode).toBe(401);
                    expect(loginAfrerDelete.body.message).toEqual('Incorrect email or password');
                })
        })

        it('Should not sign up, login and delete the user .end', (done) => {
            signUp2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);

                    login2(user)
                        .end((err, loginRes) => {
                            if (err) return done(err)

                            expect(loginRes.statusCode).toBe(200);
                            expect(loginRes.body.status).toEqual('success');
                            cookie = loginRes.headers['set-cookie'][0].split(';')[0];

                            deleteFunction2(cookie)
                                .end((err, deleteRes) => {
                                    if (err) return done(err)
                                    expect(deleteRes.statusCode).toBe(200);
                                    expect(deleteRes.body.message).toEqual('User deleted successfully');
                                    login2(user)
                                        .end((err, loginAfterDelete) => {
                                            if (err) return done(err)
                                            expect(loginAfterDelete.statusCode).toBe(401)
                                            expect(loginAfterDelete.body.message).toEqual('Incorrect email or password');
                                            done()
                                        })
                                })
                        })
                })
        })
    })
    describe('NEGATIVE TESTING', () => {

        describe('NEGATIVE TESTING - async/await', () => {
            it('Should signup, but must not login, invalid email', async () => {
                try {
                    const res = await signUp(user);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);
                    expect(res.body.status).toEqual('success');

                    const loginRes = await loginInvalidEmail(user)
                    expect(loginRes.statusCode).toBe(401);
                    expect(loginRes.body.status).toBe(errorMessage.status);
                    expect(loginRes.body.message).toEqual('Incorrect email or password');
                } catch (error) {
                    console.error('Error during sign up', error);
                    throw error;
                }
            })

            it('Should signup, but must not login, invalid password', async () => {
                try {
                    const res = await signUp(user);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);
                    expect(res.body.status).toEqual('success');

                    const loginRes = await loginInvalidPassword(user)
                    expect(loginRes.statusCode).toBe(401);
                    expect(loginRes.body.status).toBe(errorMessage.status);
                    expect(loginRes.body.message).toEqual('Incorrect email or password');
                } catch (error) {
                    console.error('Error during sign up', error);
                    throw error;
                }
            })
        })

        describe('NEGATIVE TESTING - .then', () => {
            it('Should signup, but must not login, invalid email - .then', () => {
                return signUp(user)
                    .then((res) => {
                        console.log(res.body)
                        expect(res.statusCode).toBe(201);
                        expect(res.body.data.user.email).toEqual(user.email);
                        expect(res.body.status).toEqual('success');
                        return loginInvalidEmail(user)
                    })
                    .then((loginRes) => {
                        expect(loginRes.statusCode).toBe(401);
                        expect(loginRes.body.status).toBe(errorMessage.status);
                        expect(loginRes.body.message).toEqual('Incorrect email or password');
                    })
            })

            it('Should signup, but must not login invalid password - .then', () => {
                return signUp(user)
                    .then((res) => {
                        console.log(res.body)
                        expect(res.statusCode).toBe(201);
                        expect(res.body.data.user.email).toEqual(user.email);
                        expect(res.body.status).toEqual('success');
                        return loginInvalidPassword(user)
                    })
                    .then((loginRes) => {
                        expect(loginRes.statusCode).toBe(401);
                        expect(loginRes.body.status).toBe(errorMessage.status);
                        expect(loginRes.body.message).toEqual('Incorrect email or password');
                    })
            })
        })

        describe('NEGATIVE TESTING - .end', () => {
            it('Should signup, but must not login invalid email - .end', (done) => {
                signUp2(user)
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res.statusCode).toBe(201);
                        expect(res.body.data.user.email).toEqual(user.email);

                        login2InvalidEmail(user)
                            .end((err, loginRes) => {
                                if (err) return done(err)
                                expect(loginRes.statusCode).toBe(401);
                                expect(loginRes.body.status).toBe(errorMessage.status);
                                expect(loginRes.body.message).toEqual('Incorrect email or password');
                                done()
                            })
                    })
            })

            it('Should signup, but must not login invalid password - .end', (done) => {
                signUp2(user)
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res.statusCode).toBe(201);
                        expect(res.body.data.user.email).toEqual(user.email);

                        login2InvalidPassword(user)
                            .end((err, loginRes) => {
                                if (err) return done(err)
                                expect(loginRes.statusCode).toBe(401);
                                expect(loginRes.body.status).toBe(errorMessage.status);
                                expect(loginRes.body.message).toEqual('Incorrect email or password');
                                done()
                            })
                    })
            })
        })
    })
})