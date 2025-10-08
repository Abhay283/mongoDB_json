// project:1   Building Applications with mongodb and nodejs
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1';
const client = new MongoClient(uri);
const data1 = {

    company: '673ee0e5e39005b6fb0d8190',
    price: 410,
    name: 'Diamond Ring',
    limits: [
        {
            voice: { units: 'minutes', n: 1500, over_rate: 0.08 },
            data: { n: 'unlimited', over_rate: 0 },
            sms: { n: 'unlimited', over_rate: 0 }
        }
    ],
    rating: 5,
    colors: ['#000000', '#cc6600', '#663300']
};

const main = async () => {
    await client.connect(); //connect the server client variable
    const db = client.db('students');
    const collection = db.collection('data');
    await collection.insertOne(data1)
    const data = await collection.find({ price: { $eq: 410 } }).toArray();

    console.log(data);
    
    return "done";
};

main()
.then(console.log())
.catch((e) => console.log(e))
.finally(() => client.close());