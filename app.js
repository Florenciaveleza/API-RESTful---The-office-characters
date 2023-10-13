import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users.js'
import characters from './routes/characters.js';
import auth from './routes/auth.js';
import 'dotenv/config';

mongoose.connect('mongodb://127.0.0.1:27017/theoffice', {   
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Error establishing a database connection');
})

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', users)
app.use('/auth', auth)
app.use('/characters', characters)
app.get('/', (req, res) => {
    res.send('')
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log('Server running...')
})
