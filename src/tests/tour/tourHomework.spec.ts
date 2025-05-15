import * as supertest from 'supertest';
import {getUser, signUp} from "../../../helper/user";
import {User} from "../../../helper/interface";
import {
    emptyRequestBody,
    errorMessagesTour, missingDifficulty,
    missingDuration,
    missingMaxSize,
    missingName
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

    it.only('Missing difficulty', async () => {
        const missingDifficultyHome = await missingDifficulty();
        expect(missingDifficultyHome.statusCode).toBe(400);
        expect(missingDifficultyHome.body.status).toBe(errorMessagesTour.status);
        expect(missingDifficultyHome.body.message).toBe(errorMessagesTour.missingDifficulty)
    })

    it('Invalid difficulty', async () => {})

    it('Invalid rating (out of range)', async () => {})

    it('Discount price higher than price', async () => {})

    it('Missing summary', async () => {})

    it('Missing image cover', async () => {})

    it('Missing startLocation coordinates', async () => {})

    it('Non-numeric startLocation coordinates', async () => {})

    it('Unauthorized user', async () => {})
})