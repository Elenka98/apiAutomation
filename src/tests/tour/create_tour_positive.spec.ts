import {getUser, signUp} from "../../../helper/user";
export let cookie: string;
import * as supertest from 'supertest';
import {createTour} from "../../../helper/tour";
const request = supertest('http://localhost:8001/api/v1')

describe.only('CREATE TOUR', () => {
    it('Create tour', async () => {
        const userImport = getUser('admin')
        console.log('user', userImport);
        await signUp(userImport).then(res => {
            expect(res.status).toBe(201);
            expect(res.body.data.user.email).toEqual(userImport.email.toLowerCase());
            cookie = res.headers['set-cookie'][0].split(';')[0]
        })
        await createTour().then(tourRes => {
                console.log(tourRes.body, 'TourRes');
                expect(tourRes.status).toBe(201);
                expect(tourRes.body.data.difficulty).toBe("easy");
        })
    })
})
