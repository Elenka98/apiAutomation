import {errorMessage} from "../../helper/dataHomeWork";
import {
    differentPasswords2,
    differentPasswordsHW,
    getUserHW, invalidEmail2, invalidEmailHW, shortPassword2, shortPasswordHW, usedEmail2, usedEmailHW, withoutEmail2,
    withoutEmailHW, withoutName2,
    withoutNameHW, withoutPassword2, withoutPasswordConfirm2,
    withoutPasswordConfirmHW,
    withoutPasswordHW
} from "../../helper/temporary";
import {User} from "../../helper/interface";

describe('NEGATIVE TESTING - VERSION 2', () => {
    const user: User = getUserHW()

    describe('NEGATIVE TESTING - async / await', () => {
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

    describe('NEGATIVE TESTING - .then', () => {
        it('Verify sign up without Name', () => {
            return withoutNameHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.name)
                })
        })

        it('Verify sign up without Password', () => {
            return withoutPasswordHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.password)
                })
        })

        it('Verify sign up without PasswordConfirm', () => {
            return withoutPasswordConfirmHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.passwordConfirm)
                })
        })

        it('Verify sign up without Email', () => {
            return withoutEmailHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.email)
                })
        })

        it('Verify with different passwords', () => {
            return differentPasswordsHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.different)
                })
        })

        it('Verify if the email already used', () => {
            return usedEmailHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.used)
                })
        })

        it('Verify with Invalid Email', () => {
            return invalidEmailHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.invalidEmail)
                })
        })

        it('Verify with short password', () => {
            return shortPasswordHW(user)
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.shortPassword)
                })
        })
    })

    describe('NEGATIVE TESTING - .end', () => {
        it('Verify sign up without Name', (done) => {
            withoutName2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.name)
                    done()
                })
        })

        it('Verify sign up without Password', (done) => {
            withoutPassword2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.password)
                    done()
                })
        })

        it('Verify sign up without PasswordConfirm', (done) => {
            withoutPasswordConfirm2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.passwordConfirm)
                    done()
                })
        })

        it('Verify sign up without Email', (done) => {
            withoutEmail2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.email)
                    done()
                })
        })

        it('Verify with different passwords', (done) => {
            differentPasswords2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.different)
                    done()
                })
        })

        it('Verify if the email already used', (done) => {
            usedEmail2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.used)
                    done()
                })
        })

        it('Verify with Invalid Email', (done) => {
            invalidEmail2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.invalidEmail)
                    done()
                })
        })

        it('Verify with short password', (done) => {
            shortPassword2(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessage.status);
                    expect(res.body.message).toBe(errorMessage.shortPassword)
                    done()
                })
        })
    })
})