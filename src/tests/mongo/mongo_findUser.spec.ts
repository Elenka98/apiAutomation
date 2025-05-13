import {getUser, signUp} from "../../../helper/user";
import {ObjectId} from "mongodb";

const { MongoClient, Db } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

describe.only('MONGODB CONNECTION', () => {
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
        } catch (error) {
            console.error(error);
        }
    })

    afterAll(async () => {
        await connection.close()
    })

    it('Connect to the collection and find user', async() => {
        const users = db.collection('users');
        console.log(users)
        //Retrieve the document in the collection
        const user = await users.findOne({name:'Violet Bradtke'})
        console.log(user)
    })

    it('Created new user with imported data', async () => {
        const userImport = getUser("admin")
        console.log(userImport)
        try{
            const res = await signUp(userImport);
            expect(res.statusCode).toBe(201)
            const users = db.collection('users');
            const userData = await users.findOne({name:userImport.name})
            if(!userData){
                throw new Error('User does not exist')
            }
            expect(userData.name).toEqual(userImport.name)
            expect(userData.email).toEqual(userImport.email.toLowerCase())
            expect(userData.role).toBe("admin")
            expect(userData._id.toString()).toEqual(res.body.data.user._id)
            let deleteData = await users.deleteOne({
                _id: new ObjectId(userData._id)
            })
            let findUser = await users.findOne({_id: userData._id})
            expect(findUser).toBe(null);
            expect(findUser).toBeNull();
        } catch (error) {
            console.error(error);
            throw error;
        }
    })
})