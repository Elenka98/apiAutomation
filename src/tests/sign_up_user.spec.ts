import * as supertest from 'supertest';

const request = supertest('http://localhost:8001/api/v1')

describe('USER SIGN UP',  () => {
    describe('POSITIVE TESTING', () => {
        it('Should sign up a new user', async () => {
            const userData = {
                name: "John Doe",
                email: "test1000@example.com",
                password: "mypassword1234",
                passwordConfirm: "mypassword1234"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
        })
    })

    describe('NEGATIVE TESTING', () => {
        it('Verify sign up without Name', async () => {
            const userData = {
                email: "test15@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: name');
        })

        it('Verify sign up without Password', async () => {
            const userData = {
                name: "John Doe",
                email: "test15@example.com",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: password');
        })

        it('Verify sign up without PasswordConfirm', async () => {
            const userData = {
                name: "John Doe",
                email: "test15@example.com",
                password: "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: passwordConfirm');
        })

        it('Verify sign up without Email', async () => {
            const userData = {
                name: "John Doe",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: email');
        })

        it('Verify with with different passwords', async () => {
            const userData = {
                name: "John Doe",
                email: "test15@example.com",
                password: "mypassword1236",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('User validation failed: passwordConfirm: Passwords are not the same!');
        })

        it('Verify if the email already used', async () => {
            const userData = {
                name: "John Doe",
                email: "test1@example.com",
                password: "mypassword1234",
                passwordConfirm: "mypassword1234"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('This email is already in use. Please use another email.');
        })

        it('Verify with Invalid Email', async () => {
            const userData = {
                name: "John Doe",
                email: "test1example.com",
                password: "mypassword1234",
                passwordConfirm: "mypassword1234"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('User validation failed: email: Please provide a valid email');
        })

        it('Verify with Invalid Password', async () => {
            const userData = {
                name: "John Doe",
                email: "test1@example.com",
                password: "myp4",
                passwordConfirm: "myp4"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('User validation failed: password: Path `password` (`myp4`) is shorter than the minimum allowed length (8).');
        })
    })
})