import express from 'express';
import cors from "cors";
import 'dotenv/config';
import bodyParser from "body-parser";

import {MongoClient} from 'mongodb';

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const database = client.db('feedback-db');
const feedback = database.collection('feedback_data');


const PORT = process.env.PORT;


client.connect();
console.log("MongoDB is connected");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.listen(PORT,()=>{ console.log("App is running"); });

app.get('/',async(req,res)=>{
    const allGames =  await  feedback.find().toArray();
   res.json(allGames);
});

app.post('/add/feedback', async(req, res)=>{

   let date = new Date().toLocaleDateString("de-DE");
   let userName = req.body.name;
   let feedbackDesc = req.body.description;
   let feedback_details={
    name: userName,
    feedback_description : feedbackDesc,
    data_inserted: date
   };
    await  feedback.insertOne({feedback_details});
   res.json('Item was added successfully.');

});