import {errorMessage} from "../../helper/dataHomeWork";
import {
    differentPasswordsHW,
    getUserHW, invalidEmailHW, shortPasswordHW, usedEmailHW,
    withoutEmailHW,
    withoutNameHW,
    withoutPasswordConfirmHW,
    withoutPasswordHW
} from "../../helper/temporary";
import {User} from "../../helper/interface";

describe('NEGATIVE TESTING - VERSION 2', () => {
    const user: User = getUserHW()
    it('Verify sign up without Name', async () => {
        try {
            const res = await withoutNameHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.name)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify sign up without Password', async () => {
        try {
            const res = await withoutPasswordHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.password)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify sign up without PasswordConfirm', async () => {
        try {
            const res = await withoutPasswordConfirmHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.passwordConfirm)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify sign up without Email', async () => {
        try {
            const res = await withoutEmailHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.email)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify with with different passwords', async () => {
        try {
            const res = await differentPasswordsHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.different)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify if the email already used', async () => {
        try {
            const res = await usedEmailHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.used)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify with Invalid Email', async () => {
        try {
            const res = await invalidEmailHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.invalidEmail)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })

    it('Verify with short password', async () => {
        try {
            const res = await shortPasswordHW(user);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.shortPassword)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })
})