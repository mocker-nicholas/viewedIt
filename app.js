import express from 'express';
import path from 'path';
import ejs from 'ejs';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import fetch from 'node-fetch';

const app = express();
async function main() {
  try{
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Mongoose Connected')
  } catch (e){
    console.log(e)
  }
}
main()


app.get('/', (req, res) => {
  res.send('Hello World')
})



app.listen(3000, () => {
  console.log('Listing on Port 3000');
})