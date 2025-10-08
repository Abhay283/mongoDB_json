//project:2 Leveraging Mongoose with Node.js
const mongoose = require('mongoose');

// const uri = 'mongodb://127.0.0.1/students';
const uri = 'mongodb+srv://ag0083975:abcdef127.1.0.1@cluster0.y3xcn.mongodb.net/students?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri);

//we need to create a schema
const studentsSchema = new mongoose.Schema({
    _id: String,
    name: String,
    company: String,
    price: Number,
    colors: [String],
    limits: [{ Object }],
    rating: Number,
});

//we need to now create an model

const students = new mongoose.model('data', studentsSchema);

//? 2nd step while inserting the data

const data1 = {
    company: '673ee0e5e39005b6fb0d8190',
    price: 510,
    name: 'Diamond Ring1',
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
    try {
        // const data = await students.find({ price: { $eq: 510 } });
        // console.log(data);
        //insert documents
        await students.insertMany(data1);
        // const data = await students.find({ price: { $eq: 510 } });
        // console.log(data);

        //3 update query 
        // const updateQuery = await students.findOneAndUpdate({
        //     name: "Diamond Ring1", price: 510
        // },
        //     { $set: { price: 520 } });
        // const data = await students.find({ price: { $eq: 520 } });
        // console.log(data);

        //4 delete Query
        const updateQuery = await students.findOneAndDelete({
            name: "Diamond Ring1", price: 520});
        const data = await students.find({ price: { $eq: 520 } });
        console.log(data);

    }
    catch (error) {
        console.log(error)
    } finally {
        mongoose.connection.close();
    }
};

main();