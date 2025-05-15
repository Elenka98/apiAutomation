import {ObjectId} from "mongodb";
import {createNewTour2, tourHW} from "../../../helper/tour";
import {getUser, signUp} from "../../../helper/user";
import {User} from "../../../helper/interface";
let userImport: User;
export let cookieTour: string;

const { MongoClient, Db } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

describe('MONGODB CONNECTION', () => {
    let connection: typeof MongoClient;
    let db: typeof Db
    beforeAll(async () => {
        try {
            connection = await MongoClient.connect(process.env.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            db = await connection.db()
            console.log(process.env.DATABASE_URL, 'connection');

            userImport = getUser('admin')
            const responseLogin = await signUp(userImport);
            cookieTour = responseLogin.headers['set-cookie'][0].split(';')[0]
        } catch (error) {
            console.error(error);
        }
    })

    afterAll(async () => {
        await connection.close()
    })

    it('Connect to the collection and find tour', async () => {
        const tours = db.collection('tours');
        console.log(tours);
        //Retrieve the document in the collection
        const tour = await tours.findOne({name:"sui paens desparatus delego"})
        console.log(tour)
    })

    it('Created new tour with imported data', async () => {
        const resTour = await createNewTour2()
        try{
            const tours = db.collection('tours');
            const tourData = await tours.findOne({name: tourHW.name})
            if (!tourData) {
                throw new Error('Tour not found.');
            }
            //console.log(resTour, tourData)
            expect(tourData.name).toEqual(resTour._body.data.name)
        } catch (error) {
            console.error(error);
            throw error;
        }
    })
})