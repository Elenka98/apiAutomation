import * as supertest from 'supertest';
import { faker } from '@faker-js/faker'

const request = supertest('http://localhost:8001/api/v1')
import { Response } from 'superagent';
interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

describe('USER SIGN UP - POSITIVE TESTING', () => {
    describe('POSITIVE TESTING with async/await', () => {
        it('Should sign up a new user', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'test1234',
                passwordConfirm: 'test1234'
            }
            console.log(userData);
            try {
                //Make the POST request
                const res:Response = await request.post('/users/signup').send(userData).expect(201);
                //Log the response
                console.log(res.body)
                //Validate response body
                expect(res.body.status).toBe("success");
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe("string");
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe("string");
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe("string");

                // Additional checks for user object
                expect(res.body.data.user).toHaveProperty("_id");
                expect(res.body.data.user).not.toHaveProperty("password");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })
    })

    describe('POSITIVE TESTING with .then', () => {
        it('Should sign up a new user', async () => {
            const userData: UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'test1234',
                passwordConfirm: 'test1234'
            }
            console.log(userData);
            //Make the POST request using .then
            return request
                .post('/users/signup')
                .send(userData)
                .expect(201)
                .then((res:Response) => {
                    expect(res.body.status).toBe("success");
                    expect(res.body.data.user.name).toBe(userData.name);
                    expect(typeof res.body.data.user.name).toBe("string");
                    expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                    expect(typeof res.body.data.user.email).toBe("string");
                    expect(res.body.token).toBeDefined();
                    expect(typeof res.body.token).toBe("string");

                    // Additional checks for user object
                    expect(res.body.data.user).toHaveProperty("_id");
                    expect(res.body.data.user).not.toHaveProperty("password");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })
    })

    describe('POSITIVE TESTING with .end() and done()', () => {
        it('Should sign up a new user', (done) => {
            const userData: UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'test1234',
                passwordConfirm: 'test1234'
            }
            console.log(userData);

            request
                .post('/users/signup')
                .send(userData)
                .expect(201)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("success");
                        expect(res.body.data.user.name).toBe(userData.name);
                        expect(typeof res.body.data.user.name).toBe("string");
                        expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                        expect(typeof res.body.data.user.email).toBe("string");
                        expect(res.body.token).toBeDefined();
                        expect(typeof res.body.token).toBe("string");

                        // Additional checks for user object
                        expect(res.body.data.user).toHaveProperty("_id");
                        expect(res.body.data.user).not.toHaveProperty("password");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })
    })
})

describe('USER SIGN UP - NEGATIVE TESTING', () => {
    describe('NEGATIVE TESTING with async/await', () => {
        it('Verify when all fields are missing', async () => {
            const userData = {}
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Missing required fields: name, email, password, passwordConfirm");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when name is missing', async () => {
            const userData = {
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Missing required fields: name");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when email is missing', async () => {
            const userData = {
                name: faker.person.fullName(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Missing required fields: email");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when password is missing', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Missing required fields: password");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when passwordConfirm is missing', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Missing required fields: passwordConfirm");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when email is invalid', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: "test1example?.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("User validation failed: email: Please provide a valid email");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when passwordConfirm does not match password', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword1234"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("User validation failed: passwordConfirm: Passwords are not the same!");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when password is longer than 30 chars', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "myp4123456789123456789123456789",
                passwordConfirm: "myp4123456789123456789123456789"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Password longer then 30 characters");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify with already used email', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: "test1@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("This email is already in use. Please use another email.");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })

        it('Verify when password is shorter than 8 chars', async () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "myp4123",
                passwordConfirm: "myp4123"
            }
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData);
                console.log(res.body)
                expect(res.body.error.statusCode).toBe(400);
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("User validation failed: password: Path `password` (`myp4123`) is shorter than the minimum allowed length (8).");
                expect(typeof res.body.message).toBe("string");
            } catch (error) {
                console.error('Error during sign up', error);
                throw error;
            }
        })
    })

    describe('NEGATIVE TESTING with .then', () => {
        it('Verify when all fields are missing', () => {
            const userData = {}
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Missing required fields: name, email, password, passwordConfirm");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when name is missing', () => {
            const userData = {
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Missing required fields: name");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when email is missing', () => {
            const userData = {
                name: faker.person.fullName(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Missing required fields: email");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when password is missing', () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Missing required fields: password");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when passwordConfirm is missing', () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Missing required fields: passwordConfirm");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when email is invalid', () => {
            const userData = {
                name: faker.person.fullName(),
                email: "test1example?.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("User validation failed: email: Please provide a valid email");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when passwordConfirm does not match password', () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword1234"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("User validation failed: passwordConfirm: Passwords are not the same!");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when password is longer than 30 chars', () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "myp4123456789123456789123456789",
                passwordConfirm: "myp4123456789123456789123456789"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Password longer then 30 characters");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify with already used email', () => {
            const userData = {
                name: faker.person.fullName(),
                email: "test1@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("This email is already in use. Please use another email.");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })

        it('Verify when password is shorter than 8 chars', () => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "myp4123",
                passwordConfirm: "myp4123"
            }
            console.log(userData);
            return request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("User validation failed: password: Path `password` (`myp4123`) is shorter than the minimum allowed length (8).");
                    expect(typeof res.body.message).toBe("string");
                })
                .catch((error) => {
                    console.error('Error during sign up', error);
                    throw error;
                })
        })
    })

    describe('NEGATIVE TESTING with .end() and done()', () => {
        it('Verify when all fields are missing', (done) => {
            const userData = {}
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Missing required fields: name, email, password, passwordConfirm");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when name is missing', (done) => {
            const userData = {
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Missing required fields: name");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when email is missing', (done) => {
            const userData = {
                name: faker.person.fullName(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Missing required fields: email");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when password is missing', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Missing required fields: password");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when passwordConfirm is missing', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Missing required fields: passwordConfirm");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when email is invalid', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: "test1example?.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("User validation failed: email: Please provide a valid email");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when passwordConfirm does not match password', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword1234"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("User validation failed: passwordConfirm: Passwords are not the same!");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify when password is longer than 30 chars', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "myp4123456789123456789123456789",
                passwordConfirm: "myp4123456789123456789123456789"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Password longer then 30 characters");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })

        it('Verify with already used email', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: "test1@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("This email is already in use. Please use another email.");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })})

        it('Verify when password is shorter than 8 chars', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "myp4123",
                passwordConfirm: "myp4123"
            }
            console.log(userData);
            request
                .post('/users/signup')
                .send(userData)
                .expect(400)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during sign up', err);
                        return done(err)
                    }
                    try{
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("User validation failed: password: Path `password` (`myp4123`) is shorter than the minimum allowed length (8).");
                        expect(typeof res.body.message).toBe("string");
                        done()
                    }catch(err){
                        console.error('Error during sign up', err);
                        done(err);
                    }
                })
        })
    })
})