import * as supertest from 'supertest';
import {getUser, signUp} from "../../../helper/user";
import {User} from "../../../helper/interface";
import {
    emptyRequestBody,
    emptyRequestBody2,
    errorMessagesTour,
    invalidAverageRating,
    invalidDifficulty2,
    invalidDifficultyHW,
    invalidPrice, invalidPrice2, invalidRating2,
    missingDifficulty,
    missingDifficulty2,
    missingDuration,
    missingDuration2, missingImage2,
    missingImageCover,
    missingMaxSize,
    missingMaxSize2,
    missingName,
    missingName2, missingStartLocation2,
    missingStartLocationHW, missingSummary2,
    missingSummaryHomeWork,
    userNotLogin, userNotLogin2
} from "../../../helper/tourHomework";
export let userImportHome: User;
export let cookieHomeTour: string;
const request = supertest('http://localhost:8001/api/v1')

describe('HOMEWORK TESTING', () => {
    beforeAll(async () => {
        userImportHome = getUser('admin')
        const responseLogin = await signUp(userImportHome);
        cookieHomeTour = responseLogin.headers['set-cookie'][0].split(';')[0]
    })

    describe('Async / await', () => {
        it('Empty request body', async () => {
            const resEmpty = await emptyRequestBody();
            expect(resEmpty.statusCode).toBe(400);
            expect(resEmpty.body.status).toBe(errorMessagesTour.status);
            expect(resEmpty.body.message).toBe(errorMessagesTour.emptyBody)
        })

        it('Missing name', async () => {
            const missingNameHome = await missingName()
            expect(missingNameHome.statusCode).toBe(400);
            expect(missingNameHome.body.status).toBe(errorMessagesTour.status)
            expect(missingNameHome.body.message).toBe(errorMessagesTour.missingName)
        })

        it('Missing duration', async () => {
            const missingDurationHome = await missingDuration();
            expect(missingDurationHome.statusCode).toBe(400);
            expect(missingDurationHome.body.status).toBe(errorMessagesTour.status);
            expect(missingDurationHome.body.message).toBe(errorMessagesTour.missingDuration)
        })

        it('Missing maxGroupSize', async () => {
            const missingMaxGroupSize = await missingMaxSize();
            expect(missingMaxGroupSize.statusCode).toBe(400);
            expect(missingMaxGroupSize.body.status).toBe(errorMessagesTour.status);
            expect(missingMaxGroupSize.body.message).toBe(errorMessagesTour.missingMaxGroupSize)
        })

        it('Missing difficulty', async () => {
            const missingDifficultyHome = await missingDifficulty();
            expect(missingDifficultyHome.statusCode).toBe(400);
            expect(missingDifficultyHome.body.status).toBe(errorMessagesTour.status);
            expect(missingDifficultyHome.body.message).toBe(errorMessagesTour.missingDifficulty)
        })

        it('Invalid difficulty', async () => {
            const invalidDifficultyHome = await invalidDifficultyHW();
            expect(invalidDifficultyHome.statusCode).toBe(400);
            expect(invalidDifficultyHome.body.status).toBe(errorMessagesTour.status);
            expect(invalidDifficultyHome.body.message).toBe(errorMessagesTour.invalidDifficulty)
        })

        it('Invalid rating (out of range)', async () => {
            const invalidAverage = await invalidAverageRating();
            expect(invalidAverage.statusCode).toBe(400);
            expect(invalidAverage.body.status).toBe(errorMessagesTour.status);
            expect(invalidAverage.body.message).toBe(errorMessagesTour.invalidRating)
        })

        it('Discount price higher than price', async () => {
            const highPrice = await invalidPrice();
            expect(highPrice.statusCode).toBe(400);
            expect(highPrice.body.status).toBe(errorMessagesTour.status);
            expect(highPrice.body.message).toBe(errorMessagesTour.highDiscountPrice)
        })

        it('Missing summary', async () => {
            const missingSummary = await missingSummaryHomeWork();
            expect(missingSummary.statusCode).toBe(400);
            expect(missingSummary.body.status).toBe(errorMessagesTour.status);
            expect(missingSummary.body.message).toBe(errorMessagesTour.missingSummary)
        })

        it('Missing image cover', async () => {
            const missingImageHW = await missingImageCover();
            expect(missingImageHW.statusCode).toBe(400);
            expect(missingImageHW.body.status).toBe(errorMessagesTour.status);
            expect(missingImageHW.body.message).toBe(errorMessagesTour.missingImage);
        })

        it('Missing startLocation coordinates', async () => {
            const missingStartLocation = await missingStartLocationHW();
            expect(missingStartLocation.statusCode).toBe(400);
            expect(missingStartLocation.body.status).toBe(errorMessagesTour.status);
            expect(missingStartLocation.body.message).toBe(errorMessagesTour.missingStartLocation)
        })

        it('Unauthorized user', async () => {
            const missingCookie = await userNotLogin();
            expect(missingCookie.statusCode).toBe(401);
            expect(missingCookie.body.status).toBe(errorMessagesTour.status);
            expect(missingCookie.body.message).toBe(errorMessagesTour.userUnauthorized)
        })
    })

    describe('.then', () => {
        it('Empty request body',() => {
            return emptyRequestBody()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.emptyBody)
                })
        })

        it('Missing name',() => {
            return missingName()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingName);
                })
        })

        it('Missing duration',() => {
            return missingDuration()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingDuration)
                })
        })

        it('Missing maxGroupSize',() => {
            return missingMaxSize()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingMaxGroupSize)
                })
        })

        it('Missing difficulty',() => {
            return missingDifficulty()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingDifficulty)
                })
        })

        it('Invalid difficulty',() => {
            return invalidDifficultyHW()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.invalidDifficulty)
                })
        })

        it('Invalid rating (out of range)',() => {
            return invalidAverageRating()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.invalidRating)
                })
        })

        it('Discount price higher than price',() => {
            return invalidPrice()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.highDiscountPrice)
                })
        })

        it('Missing summary',() => {
            return missingSummaryHomeWork()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingSummary)
                })
        })

        it('Missing image cover',() => {
            return missingImageCover()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingImage)
                })
        })

        it('Missing startLocation coordinates',() => {
            return missingStartLocationHW()
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingStartLocation)
                })
        })

        it('Unauthorized user',() => {
            return userNotLogin()
                .then((res) => {
                    expect(res.statusCode).toBe(401);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.userUnauthorized)
                })
        })
    })

    describe('.end and done', () => {
        it('Empty request body',(done) => {
            emptyRequestBody2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.emptyBody)
                    done()
                })
        })

        it('Missing name',(done) => {
            missingName2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingName);
                    done()
                })
        })

        it('Missing duration',(done) => {
            missingDuration2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingDuration)
                    done()
                })
        })

        it('Missing maxGroupSize',(done) => {
            missingMaxSize2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingMaxGroupSize)
                    done()
                })
        })

        it('Missing difficulty',(done) => {
            missingDifficulty2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingDifficulty)
                    done()
                })
        })

        it('Invalid difficulty',(done) => {
            invalidDifficulty2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingDifficulty)
                    done()
                })
        })

        it('Invalid rating (out of range)',(done) => {
            invalidRating2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.invalidRating)
                    done()
                })
        })

        it('Discount price higher than price',(done) => {
            invalidPrice2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.highDiscountPrice)
                    done()
                })
        })

        it('Missing summary',(done) => {
            missingSummary2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingSummary)
                    done()
                })
        })

        it('Missing image cover',(done) => {
            missingImage2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingImage)
                    done()
                })
        })

        it('Missing startLocation coordinates',(done) => {
            missingStartLocation2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(400);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.missingStartLocation)
                    done()
                })
        })

        it('Unauthorized user',(done) => {
            userNotLogin2()
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.statusCode).toBe(401);
                    expect(res.body.status).toBe(errorMessagesTour.status);
                    expect(res.body.message).toBe(errorMessagesTour.userUnauthorized)
                    done()
                })
        })
    })
})