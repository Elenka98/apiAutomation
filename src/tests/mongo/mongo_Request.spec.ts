import {getUser, signUp} from "../../../helper/user";

const { MongoClient, Db, ObjectId } = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();

describe('MONGODB', () => {
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
    it('training for user', async () => {
        const users = db.collection('users');
        console.log(users, 'users')

        //Retrieve the documents in the collection
        const user = await users.findOne({name: "Rosetta85"})
        console.log(user, 'user')
    })

    it('create user - training', async () => {
        const userImport = getUser('admin');
        console.log(userImport, 'user')
        try{
            const res = await signUp(userImport);
            expect(res.statusCode).toBe(201);
            console.log(res.body)
            const users = db.collection('users');
            const userData = await users.findOne({name:userImport.name})
            console.log(userData, 'userData')
            if (!userData){
                throw new Error('User not found in the database');
            }
            expect(userData.name).toEqual(userImport.name);
            expect(userData.email).toEqual(userImport.email.toLowerCase());
            expect(userData.role).toBe('admin');
            expect(userData._id.toString()).toEqual(res.body.data.user._id);
            let deleteData = await users.deleteOne({
                _id:new ObjectId(userData._id)
            })
            console.log(deleteData, 'deleteData');
            let findUser = await users.findOne({_id: userData._id});
            console.log(findUser, 'findUser')
            expect(findUser).toBeNull(); // Ensure the user is deleted
            expect(findUser).toBe(null); // Ensure the user is deleted
        }catch(err){
            console.error('Error during user creation:', err);
            throw err; // Re-throw the error to fail the test
        }
    })

    it('Method insert One', async () => {
        const users = db.collection('users');
        const insertUser = await users.insertOne({name: 'TestUserExample', email: 'testuser@example.com'})
        console.log(insertUser, 'insertUser')
    })

    it('Method insert Many', async () => {
        const users = db.collection('users');
        const insertManyUsers = await users.insertMany([{name: 'Test User 1', email: 'testuser1@example.com'}, {name: 'Test User 2', email: 'testuser2@example.com'}, {name: 'Test User 3', email: 'testuser3@example.com'}])
        console.log(insertManyUsers, 'insertManyUsers')
    })

    it('Method find One', async () => {
        const users = db.collection('users');
        const findUser = await users.findOne({name: 'TestUserExample'})
        console.log(findUser, 'findUser')
        expect(findUser.name).toBe('TestUserExample');
    })

    it('Method find', async () => {
        const users = db.collection('users');
        const findUsers = await users.find({name: {$eq: 'John Doe'} })
        console.log(findUsers, 'findUsers')
    })

    it('Method countDocuments', async () => {
        const users = db.collection('users');
        const count = await users.countDocuments({name: "John Doe"})
        console.log(count, 'count')
    })

    it.only('Method distinct', async () => {
        const users = db.collection('users');
        const distinctUser = await users.distinct('name')
        console.log(distinctUser, 'distinctUser')
    })

    it('Method find One', async () => {})

    it('Method find One', async () => {})

    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
    it('Method find One', async () => {})
})

/*
$lt — less than

$gte — greater than or equal

$lte — less than or equal

$eq — equal

$ne — not equal
*/