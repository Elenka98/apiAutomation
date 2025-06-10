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
})