import {getUser, signUp} from "../../../helper/user";
const { MongoClient, Db, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('MONGODB TESTS FOR TOUR', () => {
    let connection: typeof MongoClient;
    let db: typeof Db
    beforeAll(async () => {
        try {
            connection = await MongoClient.connect(process.env.DATABASE_URL as string, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            db = await connection.db()
            console.log(process.env.DATABASE_URL, 'connection');
        }catch(err) {
            console.error('Error connecting to MongoDB:', err);
        }
    })
    afterAll(async () => {
        await connection.close();
    })

    it('create tour - first version', async () => {
        const tours = db.collection('tours');
        console.log(tours, 'tours');

        //Retrieve the documents in the collection
        const tour = await tours.findOne({name: "lorem Ipsum0"})
        console.log(tour, 'tour');
    })
})