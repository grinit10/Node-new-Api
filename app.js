const express = require('express');

const mongoose = require('mongoose');

const Book = require('./models/bookModel');

const app = express();
mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

bookRouter.get('/books', (req, res) => Book.find((err, books) => {
	if (err) { return res.send('An error occurred'); }
	return res.send(books);
}));

app.use('/api', bookRouter);

app.get('/', (req, res) => res.send('Welcome to my API'));
app.listen(port);
