import express from 'express';
import path from 'path';
import ejs from 'ejs';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import fetch from 'node-fetch';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})



app.listen(3000, () => {
  console.log('Listing on Port 3000');
})