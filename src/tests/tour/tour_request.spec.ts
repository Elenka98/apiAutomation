import {faker} from "@faker-js/faker";
import * as supertest from 'supertest';
import {User} from "../../../helper/interface";
import {getUser, signUp} from "../../../helper/user";
const request = supertest('http://localhost:8001/api/v1')
let userImport: User;
let cookieRes: string;

describe('CREATE TOUR', () => {
    beforeAll(async () => {
        userImport = getUser('admin')
        const responseLogin = await signUp(userImport);
        cookieRes = responseLogin.headers['set-cookie'][0].split(';')[0]
    })
    describe('async/await', () => {
        it('Create tour', async () => {
            const tourData = {
                "name":faker.lorem.words(4),
                "duration": 10,
                "description":"Could be",
                "maxGroupSize": 10,
                "summary": "Test tour",
                "difficulty": "easy",
                "price": 100,
                "rating": 4.8,
                "imageCover": "tour-3-cover.jpg",
                "ratingsAverage": 4.9,
                "guides":[],
                "startDates":["2024-04-04"],

                "startLocation": {
                    "coordinates": [-74.005974, 40.712776]
                }
            }
            const resTour = await request
                .post('/tours')
                .set('Cookie', cookieRes)
                .send(tourData)
            console.log(resTour.body)
            expect(resTour.statusCode).toBe(201);
            expect(resTour.body.data.difficulty).toBe("easy");
            expect(resTour.body.data.summary).toBe("Test tour");
            expect(resTour.body.data.price).toBe(100);
            expect(resTour.body.data.duration).toBe(10);
        })

        it.only('Get all tours', async () => {
            const getTour = await request
                .get('/tours')
                .set('Cookie', cookieRes)
                .send({})
            expect(getTour.statusCode).toBe(200);
        })
    })
})