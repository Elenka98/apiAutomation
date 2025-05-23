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

        it('Get all tours', async () => {
            const getTour = await request
                .get('/tours')
                .set('Cookie', cookieRes)
                .send({})
            expect(getTour.statusCode).toBe(200);
        })

        it('Get Tour By ID', async () => {
            const getTourById = await request
                .get('/tours/68229f20e31e8642244b73fa')
                .set('Cookie', cookieRes)
                .send({})
            expect(getTourById.statusCode).toBe(200);
        })

        it('Update Tour', async () => {
            const updateTour = await request
                .patch('/tours/68229f20e31e8642244b73fa')
                .set('Cookie', cookieRes)
                .field(
                    "maxGroupSize", 20
                )
                //.attach('imageCover', 'data/photo/pasv.png')
            console.log(updateTour.body)
            expect(updateTour.statusCode).toBe(200);
        })

        it('Delete Tour', async () => {
            const deleteTour = await request
                .delete('/tours/682669033897fd35e8ccf678')
                .set('Cookie', cookieRes)
            expect(deleteTour.statusCode).toBe(204);
        })

        it('Get Tours Within a Radius', async () => {
            const getRadius = await request
                .get('/tours/tours-within/3000/center/34.111745,-118.113491/unit/mi')
                .set('Cookie', cookieRes)
            expect(getRadius.statusCode).toBe(200);
        })

        it('Get Distances to All Tours', async () => {
            const getDistances = await request
                .get('/tours/distances/34.111745,-118.113491/unit/mi')
                .set('Cookie', cookieRes)
            console.log(getDistances.body)
            expect(getDistances.statusCode).toBe(200);
        })
    })
})