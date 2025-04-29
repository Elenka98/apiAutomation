import {
    withoutName,
    errorMessage,
    userHW,
    withoutPassword,
    withoutPasswordConfirm,
    withoutEmail, differentPasswords, usedEmail, invalidEmail, shortPassword
} from "../../helper/dataHomeWork";

describe('USER SIGN UP - NEGATIVE TESTING', () => {
    it('Verify sign up without Name', async () => {
        try {
            const res = await withoutName(userHW);
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
            const res = await withoutPassword(userHW);
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
            const res = await withoutPasswordConfirm(userHW);
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
            const res = await withoutEmail(userHW);
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
            const res = await differentPasswords(userHW);
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
            const res = await usedEmail(userHW);
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
            const res = await invalidEmail(userHW);
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
            const res = await shortPassword(userHW);
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBe(errorMessage.status);
            expect(res.body.message).toBe(errorMessage.shortPassword)
        } catch (error) {
            console.error('Error during sign up', error);
            throw error;
        }
    })
})