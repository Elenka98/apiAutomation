import {getUser, signUp} from "../../../helper/user";
export let cookie: string;
import * as supertest from 'supertest';
import {createTour} from "../../../helper/tour";
import {User} from "../../../helper/interface";
let userImport: User;
const request = supertest('http://localhost:8001/api/v1')

describe.only('CREATE TOUR', () => {
    beforeAll(async () => {
        userImport = getUser('admin')
        const responseLogin = await signUp(userImport);
        cookie = responseLogin.headers['set-cookie'][0].split(';')[0]
    })

    it('Create tour', async () => {
        const resTour = await createTour();
        expect(resTour.statusCode).toBe(201);
        expect(resTour.body.data.difficulty).toBe("easy");
    })
})
