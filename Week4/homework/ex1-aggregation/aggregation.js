import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGODB_URI;
const COLLECTION_NAME = 'population_pyramid';


const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

// Connect to the MongoDB cluster
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('databaseWeek4');
        console.log('Connected to database');
        return db;
    }
    catch (e) {
        console.error(`Cannot connect to MongoDB: ${e}`);
    }
}

// Close the connection to the MongoDB cluster
async function closeDB() {
    await client.close();
    console.log('Disconnected from MongoDB');
}

// connect to collection
async function connectCollection(collectionName) {
    try {
        const db = await connectDB();
        return db.collection(collectionName);
    }
    catch (e) {
        console.error(`Cannot connect to collection: ${e}`);
    }
}

// aggregate total male and female population for a given country by year

async function aggregatePopulation(country) {
    const collection = await connectCollection(COLLECTION_NAME);
    const result = await collection.aggregate([
        { $match: { Country: country } },
        { $group: { _id : "$Year",
             totalPopulation: { $sum: { $add: ["$M", "$F"] } } 
            } },
        { $sort: { _id: 1 } },
    ]).toArray();
    console.log(result);
}

// find documents based on provided year and age

async function yearAge(year, age) {
    const collection = await connectCollection(COLLECTION_NAME);
    const result = await collection.aggregate([
        { $match: { Year: year, Age: age, $and: [ 
            { Country: { $regex: /^[A-Z]+$/ } },
            { Country: { $not: { $regex: /world/i } } } ] } },
        { $project: { _id: 0, Country: 1, Year: 1, Age: 1, M: 1, F: 1,
            totalPopulation: { $add: ["$M", "$F"] }
         } }
    ]).toArray();
    console.log(result);
}


// main function

async function main() {
    await aggregatePopulation('Netherlands');
    await yearAge(2020, "100+");
    await closeDB();
}

main();
